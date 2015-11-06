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
import Template from './Templating.js';
import Renderer from './Renderer.js';
import EventDelegator from './RxEventDelegator.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import Invariant from '../utils/Invariant.js';

const LS_NO_INIT   = 0,
      LS_INITED    = 1,
      LS_RENDERING = 2,
      LS_MOUNTED   = 3,
      LS_UNMOUNTED = 4,
      MNT_REPLACE  = 'replace',
      MNT_APPEND   = 'append',
      CLASS_PREFIX = 'js__vc';

let reservedProps = ['key', 'id', 'type'];

export default function () {

  // Properties added to component on creation:
  // __id__, __index__, __type__

  let _internalState  = {},
      _internalProps  = {},
      _lastState      = {},
      _lastProps      = {},
      state           = {},
      props           = {},
      html,
      _lifecycleState = LS_NO_INIT,
      _children,
      _templateCache,
      _elementCache,
      Events          = EventDelegator();

  /**
   * Subclasses can override.
   */
  function initialize(initProps) {
    this.initializeComponent(initProps, this);
  }

  /**
   * Initialization
   * @param initProps
   */
  function initializeComponent(initProps) {
    this.setProps(_.assign({}, this.getDefaultProps(), initProps));

    _internalProps.id    = _internalProps.id || this.__id__;
    _internalProps.index = this.__index__;
    _internalProps.type  = this.__type__;

    this.validateProps();

    if (typeof this.defineChildren === 'function') {
      this.addChildren(this.defineChildren());
    }

    this.setState(this.getDefaultState());

    this.$initializeChildren();

    _lifecycleState = LS_INITED;
  }

  function validateProps() {
    if (!_internalProps.hasOwnProperty('mount')) {
      console.warn(this.id(), 'Component without a mount selector');
    }
    if (!_internalProps.hasOwnProperty('mountMethod')) {
      _internalProps.mountMethod = MNT_REPLACE;
    }
  }

  //----------------------------------------------------------------------------
  //  Props and state
  //----------------------------------------------------------------------------

  /**
   * Override to set default props
   *
   * For a region, which is instantiated from the factory with props, this function
   * will be overwritten by the code in MixinComponentView to return the passed
   * initProps object
   * @returns {undefined}
   */
  function getDefaultProps() {
    return {
      autoFormEvents: true
    };
  }

  /**
   * Get the initial state of the component
   * @returns {{}}
   */
  function getDefaultState() {
    return {};
  }

  /**
   * Compares next state and props, returns true if one or both are different than current
   * @param nextState
   * @param nextProps
   * @returns {boolean}
   */
  function shouldComponentUpdate(nextProps, nextState) {
    nextProps = nextProps || _internalProps;
    nextState = nextState || _internalState;

    let isStateEq = _.isEqual(nextState, _internalState),
        isPropsEq = _.isEqual(nextProps, _internalProps);

    return !(isStateEq) || !(isPropsEq);
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

    if (!this.shouldComponentUpdate(null, nextState)) {
      return;
    }

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(props, nextState);
    }

    _lastState     = _.assign({}, _internalState);
    _internalState = _.assign({}, _internalState, nextState);
    state          = _.assign(state, _internalState);

    if (typeof state.onChange === 'function') {
      state.onChange.apply(this);
    }

    this.$renderAfterPropsOrStateChange();
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

    if (!this.shouldComponentUpdate(nextProps, null)) {
      return;
    }

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(nextProps, _internalState);
    }

    _lastProps     = _.assign({}, _internalProps);
    _internalProps = _.merge({}, _internalProps, nextProps);
    props          = _.assign(props, _internalProps);

    if (typeof props.onChange === 'function') {
      props.onChange.apply(this);
    }

    this.$renderAfterPropsOrStateChange();
  }

  //----------------------------------------------------------------------------
  //  Rendering HTML
  //----------------------------------------------------------------------------

  /**
   * Handle rerendering after props or state change
   */
  function $renderAfterPropsOrStateChange() {
    if (_lifecycleState > LS_INITED) {
      this.$renderComponent();

      if (this.isMounted()) {
        this.$mountComponent();
      }

      if (typeof this.componentDidUpdate === 'function') {
        this.componentDidUpdate(_lastProps, _lastState);
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
      _templateCache = this.template(this.props, this.state);
    }

    this.$renderChildren();

    html = this.render(this.props, this.state);
  }

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here. Mustache style delimiters used.
   */
  function template() {
    let templateId = _internalProps.type || this.id();
    return Template.getTemplate(templateId);
  }

  /**
   * May be overridden in a submodule for custom rendering
   * Should return HTML
   */
  function render() {
    let combined     = _.merge({}, this.props, this.state),
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
      lastAdjacentNode = this.element().nextSibling;
      this.unmount();
    }

    _lifecycleState = LS_MOUNTED;

    _elementCache = Renderer({
      uniqueCls     : this.className(),
      method        : _internalProps.mountMethod,
      lastAdjacent  : lastAdjacentNode,
      targetSelector: _internalProps.mount,
      html          : html
    });

    if (this.shouldDelegateEvents() && typeof this.getDOMEvents === 'function') {
      Events.delegateEvents(this.element(), this.getDOMEvents(), this.props.autoFormEvents);
    }
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
      Events.undelegateEvents(this.getDOMEvents());
    }

    if (!this.props.mountMethod || this.props.mountMethod === MNT_REPLACE) {
      DOMUtils.removeAllElements(document.querySelector(this.props.mount));
    } else {
      DOMUtils.removeElement(this.element());
    }

    _elementCache = null;

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

  /**
   * Unsafe because it returns the object rather than a copy
   */
  function unsafeGetChildren() {
    return _children;
  }

  function addChildren(childObjs) {
    if (childObjs) {
      _.forOwn(childObjs, (child, id) => {
        if (childObjs.hasOwnProperty(id)) {
          this.addChild(id, child, false);
        }
      });
      $forceChildren.bind(this)();
    } else {
      _children = null;
    }
  }

  function addChild(id, child, update) {
    _children = _children || {};

    if (_children.hasOwnProperty(id)) {
      console.warn('Component already has child with id', id);
      return;
    }

    _children[id] = child;

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
      _.forOwn(_children, child => {
        if (!child.isMounted()) {
          child.initialize({parent: this});
          child.$renderComponent();
          child.mount();
        }
      });
    }
  }

  function disposeChild(id) {
    if (_children.hasOwnProperty(id)) {
      _children[id].dispose();
      delete _children[id];
    } else {
      console.warn('Cannot remove child. ', id, 'not found');
    }
  }

  function child(id) {
    if (_children.hasOwnProperty(id)) {
      return _children[id];
    }
    console.warn(this.id(), 'Child not found', id);
    return null;
  }

  function $initializeChildren() {
    _.forOwn(_children, child => {
      child.initialize({parent: this});
    });
  }

  function $renderChildren() {
    _.forOwn(_children, child => {
      child.$renderComponent();
    });
  }

  function $getChildHTMLObject() {
    return _.reduce(_children, (htmlObj, current, key) => {
      htmlObj[key] = current.getHTML();
      return htmlObj;
    }, {});
  }

  function $mountChildren() {
    _.forOwn(_children, child => {
      child.$mountComponent();
    });
  }

  function $unmountChildren() {
    _.forOwn(_children, child => {
      child.unmount();
    });
  }

  function $disposeChildren() {
    _.forOwn(_children, child => {
      child.dispose();
    });
    _children = null;
  }

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function isInitialized() {
    return _lifecycleState > LS_NO_INIT;
  }

  function isMounted() {
    return !!this.element();
  }

  function id() {
    return _internalProps.id;
  }

  function element() {
    if (!_elementCache) {
      _elementCache = document.querySelector('.' + this.className());
    }
    return _elementCache;
  }

  function className() {
    return CLASS_PREFIX + _internalProps.index;
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
  //function defineChildren() {}
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
    initialize,
    initializeComponent,
    validateProps,
    setProps,
    getDefaultState,
    setState,
    getDefaultProps,
    isInitialized,
    id,
    template,
    element,
    isMounted,
    tmpl,
    shouldComponentUpdate,
    $renderAfterPropsOrStateChange,
    $renderComponent,
    render,
    $mountComponent,
    mount,
    className,
    shouldDelegateEvents,
    unmount,
    dispose,
    unsafeGetChildren,
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