/* @flow weak */

/**
 * Base module for components
 * Must be extended with custom modules
 *
 * Functions beginning with $ should be treated as private
 *
 * Lifecycle should match React:
 *
 * First render: getDefaultProps, getInitialState, componentWillMount, render, componentDidMount
 * Props change: componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, (render), componentDidUpdate
 * State change: shouldComponentUpdate, componentWillUpdate, (render), componentDidUpdate
 * Unmount: componentWillUnmount
 */

import _ from '../../vendor/lodash.min.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import Template from './Templating.js';
import Renderer from './Renderer.js';
import EventDelegator from './RxEventDelegator.js';
import ComponentElement from './ComponentElement.js';

const LS_NO_INIT   = 0,
      LS_INITED    = 1,
      LS_RENDERING = 2,
      LS_MOUNTED   = 3,
      LS_UNMOUNTED = 4,
      MNT_REPLACE  = 'replace',
      MNT_APPEND   = 'append',
      CLASS_PREFIX = 'js__vc';

export default function () {

  let _element,
      _events,
      _lifecycleState,
      _templateCache,
      _domElementCache,
      state,
      props,
      html;

  /**
   * Initialization
   * @param initProps
   */
  function initializeComponent(initProps) {
    _element        = ComponentElement(this.__type__, this.getDefaultProps(), this.getDefaultState(), initProps.parent, {});
    _events         = EventDelegator();
    _lifecycleState = LS_NO_INIT;
    state           = {};
    props           = {};
    html            = '';

    this.setProps(_.assign({}, initProps, {
      id            : initProps.id || this.__id__,
      index         : this.__index__,
      type          : this.__type__,
      mountMethod   : initProps.mountMethod || MNT_APPEND, // TODO should be replace?
      autoFormEvents: true
    }));

    if (this.__children__) {
      this.__children__.forEach(child => {
        let childObj = child;
        if (typeof child === 'function') {
          childObj = child();
        }
        this.addChild(childObj.__id__, childObj);
      });
    }

    this.$updatePropsAndState();
    this.$initializeChildren();
    _lifecycleState = LS_INITED;
  }

  //----------------------------------------------------------------------------
  //  Props and state
  //----------------------------------------------------------------------------

  /**
   * Override to set default props
   *
   * For a region, which is instantiated from the factory with props, this function
   * will be overwritten by the code in ComponentView to return the passed
   * initProps object
   * @returns {undefined}
   */
  function getDefaultProps() {
    return {};
  }

  /**
   * Get the initial state of the component
   * @returns {{}}
   */
  function getDefaultState() {
    return {};
  }

  /**
   * Sets the next state and trigger a rerender
   * @param nextState
   */
  function setState(nextState) {
    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update state during rendering', this.id());
      return;
    }

    nextState = nextState || this.getDefaultState();

    if (!_element.shouldUpdate(null, nextState)) {
      return;
    }

    this.$updatePropsAndState(null, nextState);
  }

  /**
   * Set new props and trigger rerender
   * @param nextProps
   */
  function setProps(nextProps) {
    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update props during rendering', this.id());
      return;
    }

    // ensure this runs only after initial init
    if (typeof this.componentWillReceiveProps === 'function' && _lifecycleState >= LS_INITED) {
      this.componentWillReceiveProps(nextProps);
    }

    if (!_element.shouldUpdate(nextProps, null)) {
      return;
    }

    this.$updatePropsAndState(nextProps, null);
  }

  function $updatePropsAndState(nextProps, nextState) {
    nextProps = nextProps || _element.props;
    nextState = nextState || _element.state;

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(nextProps, nextState);
    }

    _element.setProps(nextProps);
    _element.setState(nextState);
    props = _.assign(props, _element.props);
    state = _.assign(state, _element.state);

    this.$renderAfterPropsOrStateChange();

    if (typeof this.componentDidUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentDidUpdate(_element.lastProps, _element.lastState);
    }
  }

  //----------------------------------------------------------------------------
  //  Rendering HTML
  //----------------------------------------------------------------------------

  /**
   * Handle rendering after props or state change
   */
  function $renderAfterPropsOrStateChange() {
    if (_lifecycleState > LS_INITED) {
      this.$renderComponent();
      if (this.isMounted()) {
        this.$mountComponent();
      }
    }
  }

  /**
   * Render it, need to add it to a parent container, handled in higher level view
   * @param force If true, will force a render
   * @returns {*}
   */
  function $renderComponent() {
    _lifecycleState = LS_RENDERING;

    if (!_templateCache) {
      _templateCache = this.template(_element.props, _element.state);
    }

    this.$renderChildren();

    html = this.render();
  }

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here. Mustache style delimiters used.
   */
  function template() {
    let templateId = _element.props.type || this.id();
    return Template.getTemplate(templateId);
  }

  /**
   * May be overridden in a submodule for custom rendering
   * Should return HTML
   */
  function render() {
    let combined     = _.merge({}, _element.props, _element.state),
        templateFunc = _templateCache || this.template();

    return templateFunc(combined);
  }

  //----------------------------------------------------------------------------
  //  Mounting to the DOM
  //----------------------------------------------------------------------------

  function $mountComponent() {
    if (!html || html.length === 0) {
      console.warn('Component ' + this.id() + ' cannot mount with no HTML. Call render() first?');
      return;
    }

    this.mount();

    this.$mountChildren();

    if (typeof this.componentDidMount === 'function') {
      this.componentDidMount();
    }
  }

  /**
   * Append it to a parent element
   */
  function mount() {
    let lastAdjacentNode;

    if (this.isMounted()) {
      lastAdjacentNode = this.dom().nextSibling;
      this.unmount();
    }

    _domElementCache = Renderer({
      uniqueCls     : this.className(),
      method        : _element.props.mountMethod,
      lastAdjacent  : lastAdjacentNode,
      targetSelector: _element.props.mount,
      html          : html
    });

    if (this.shouldDelegateEvents() && typeof this.getDOMEvents === 'function') {
      _events.delegateEvents(this.dom(), this.getDOMEvents(), _element.props.autoFormEvents);
    }

    _lifecycleState = LS_MOUNTED;
  }

  /**
   * Override to delegate events or not based on some state trigger
   * @returns {boolean}
   */
  function shouldDelegateEvents() {
    return true;
  }

  function unmount() {
    if (typeof this.componentWillUnmount === 'function') {
      this.componentWillUnmount();
    }

    this.$unmountChildren();

    if (typeof this.getDOMEvents === 'function') {
      _events.undelegateEvents(this.getDOMEvents());
    }

    if (!_element.props.mountMethod || _element.props.mountMethod === MNT_REPLACE) {
      DOMUtils.removeAllElements(document.querySelector(_element.props.mount));
    } else {
      DOMUtils.removeElement(this.dom());
    }

    _domElementCache = null;

    _lifecycleState = LS_UNMOUNTED;
  }

  function dispose() {
    if (typeof this.componentWillDispose === 'function') {
      this.componentWillDispose();
    }

    this.$disposeChildren();
    this.unmount();

    _templateCache = null;

    _lifecycleState = LS_NO_INIT;
  }


  //----------------------------------------------------------------------------
  //  Children
  //----------------------------------------------------------------------------

  function addChildren(childObjs) {
    if (childObjs) {
      _.forOwn(childObjs, (child, id) => {
        if (childObjs.hasOwnProperty(id)) {
          this.addChild(id, child, false);
        }
      });
      $forceChildren.bind(this)();
    } else {
      _element.children = {};
    }
  }

  function addChild(id, child, update) {
    _element.addChild(id, child);

    if (update) {
      $forceChildren.bind(this)();
    }
  }

  /**
   * Force init, render and mount of all children. Called after a new child is added
   * IF the current view is mounted and the children aren't
   */
  function $forceChildren() {
    if (_lifecycleState === LS_MOUNTED) {
      _.forOwn(_element.children, child => {
        if (!child.isMounted()) {
          child.initialize({parent: this});
          child.$renderComponent();
          child.mount();
        }
      });
    }
  }

  function disposeChild(id) {
    if (_element.children.hasOwnProperty(id)) {
      _element.children[id].dispose();
      delete _element.children[id];
    } else {
      console.warn('Cannot remove child. ', id, 'not found');
    }
  }

  function child(id) {
    if (_element.children.hasOwnProperty(id)) {
      return _element.children[id];
    }
    console.warn(this.id(), 'Child not found', id);
    return null;
  }

  function $initializeChildren() {
    _.forOwn(_element.children, child => {
      child.initialize({parent: this});
    });
  }

  function $renderChildren() {
    _.forOwn(_element.children, child => {
      child.$renderComponent();
    });
  }

  function $getChildHTMLObject() {
    return _.reduce(_element.children, (htmlObj, current, key) => {
      htmlObj[key] = current.getHTML();
      return htmlObj;
    }, {});
  }

  function $mountChildren() {
    _.forOwn(_element.children, child => {
      child.$mountComponent();
    });
  }

  function $unmountChildren() {
    _.forOwn(_element.children, child => {
      child.unmount();
    });
  }

  function $disposeChildren() {
    _.forOwn(_element.children, child => {
      child.dispose();
      _element.removeChild(child.id());
    });
    _element.children = {};
  }

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function isInitialized() {
    return _lifecycleState > LS_NO_INIT;
  }

  /**
   * Will error if called before initializeComponent called
   */
  function isMounted() {
    let hasDomEl;
    try {
      hasDomEl = !!this.dom();
    } catch (e) {
      hasDomEl = false;
    }
    return hasDomEl;
  }

  function id() {
    return _element.props.id;
  }

  function dom() {
    if (!_domElementCache) {
      _domElementCache = document.querySelector('.' + this.className());
    }
    return _domElementCache;
  }

  function className() {
    return CLASS_PREFIX + _element.props.index;
  }

  //----------------------------------------------------------------------------
  //  Utility
  //----------------------------------------------------------------------------

  function tmpl(html) {
    return Template.getTemplateFromHTML(html);
  }

  //----------------------------------------------------------------------------
  //  Lifecycle stubs
  //----------------------------------------------------------------------------

  //function getDOMEvents() {}
  //function componentWillReceiveProps(nextProps) {}
  //function componentWillUpdate(nextProps, nextState) {}
  //function componentDidUpdate(lastProps, lastState) {}
  //function componentDidMount() {}
  //function componentWillUnmount() {}
  //function componentWillDispose() {}

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    state: state,
    props: props,
    html : html,
    initializeComponent,
    setProps,
    getDefaultState,
    setState,
    getDefaultProps,
    $updatePropsAndState,
    isInitialized,
    id,
    template,
    dom,
    isMounted,
    tmpl,
    $renderAfterPropsOrStateChange,
    $renderComponent,
    render,
    $mountComponent,
    mount,
    className,
    shouldDelegateEvents,
    unmount,
    dispose,
    addChild,
    addChildren,
    disposeChild,
    child,
    $initializeChildren,
    $renderChildren,
    $mountChildren,
    $unmountChildren,
    $disposeChildren
  };
}