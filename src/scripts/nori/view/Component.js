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

import Is from '../../nudoru/util/is.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import Template from './Templating.js';
import ComponentRenderer from './ComponentRenderer.js';
import EventDelegator from './ComponentEventDelegator.js';
import ComponentElement from './ComponentElement.js';
import ObjectAssign from '../../nudoru/util/ObjectAssign.js';
import ForOwn from '../../nudoru/util/ForOwn.js';

const LS_NO_INIT   = 0,
      LS_INITED    = 1,
      LS_RENDERING = 2,
      LS_MOUNTED   = 3,
      LS_UNMOUNTED = 4,
      CLASS_PREFIX = 'js__vc';

export default function () {

  let _stateElement,
      _events         = EventDelegator(),
      _lifecycleState = LS_NO_INIT,
      state           = {},
      props           = {},
      _html,
      _domElementCache;

  /**
   * Initialization
   * @param initProps
   */
  function $componentInit() {
    _stateElement = ComponentElement(this.getDefaultProps(), this.getDefaultState(), {});
    this.$processChildren();
    this.$setPublicPropsAndState();
    _lifecycleState = LS_INITED;
  }

  function $processChildren() {
    if (this.__children) {
      this.__children.forEach(child => {
        let childObj = child;
        if (typeof child === 'function') {
          childObj = child();
        }
        this.addChild(childObj.id(), childObj);
      });
    }
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
   */
  function getDefaultProps() {
    return {};
  }

  /**
   * Get the initial state of the component
   */
  function getDefaultState() {
    return {};
  }

  /**
   * Sets the next state and trigger a rerender
   */
  function setState(nextState) {
    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update state during rendering', this.id());
      return;
    }

    if (!Is.object(nextState)) {
      console.warn('Must call setState with an object');
      return;
    }

    // Set default state
    nextState = nextState || this.getDefaultState();

    this.$updatePropsAndState(null, nextState);
  }

  /**
   * Set new props and trigger rerender
   */
  function setProps(nextProps) {
    if (!Is.object(nextProps)) {
      console.warn('Must call setProps with an object');
      return;
    }

    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update props during rendering', this.id());
      return;
    }

    // ensure this runs only after initial init
    if (typeof this.componentWillReceiveProps === 'function' && _lifecycleState >= LS_INITED) {
      this.componentWillReceiveProps(nextProps);
    }

    this.$updatePropsAndState(nextProps, null);
  }

  function $updatePropsAndState(nextProps, nextState) {
    nextProps = nextProps || _stateElement.props;
    nextState = nextState || _stateElement.state;
    if (!_stateElement.shouldUpdate(nextProps, nextState)) {
      return;
    }

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(nextProps, nextState);
    }

    _stateElement.setProps(nextProps);
    _stateElement.setState(nextState);

    this.$setPublicPropsAndState();

    this.$renderAfterPropsOrStateChange();

    if (typeof this.componentDidUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentDidUpdate(_stateElement.lastProps, _stateElement.lastState);
    }
  }

  function $setPublicPropsAndState() {
    props = ObjectAssign(props, _stateElement.props);
    state = ObjectAssign(state, _stateElement.state);
  }

  //----------------------------------------------------------------------------
  //  Rendering HTML
  //----------------------------------------------------------------------------

  function forceUpdate() {
    this.$renderAfterPropsOrStateChange(true);
    this.$forceUpdateChildren();
  }

  /**
   * Handle rendering after props or state change
   */
  function $renderAfterPropsOrStateChange(force = false) {
    if (_lifecycleState >= LS_INITED) {
      this.$renderComponent();
      if (this.isMounted() || force) {
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
    this.$renderChildren();
    _html = this.render();
  }

  /**
   * May be overridden in a submodule for custom rendering
   * Should return HTML
   */
  function render() {
    let combined     = ObjectAssign({}, _stateElement.props, _stateElement.state),
        templateFunc = Template.getTemplate(this.id());

    return templateFunc(combined);
  }

  //----------------------------------------------------------------------------
  //  Mounting to the DOM
  //----------------------------------------------------------------------------

  function $mountComponent() {
    if (!_html || _html.length === 0) {
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
      // Capture where it was in the tree before removing so it can be replaced
      lastAdjacentNode = this.dom().nextSibling;
      this.unmount();
    }

    _domElementCache = ComponentRenderer(this, lastAdjacentNode);

    this.$addEvents();

    _lifecycleState = LS_MOUNTED;
  }

  function $addEvents() {
    if (this.shouldDelegateEvents() && typeof this.getDOMEvents === 'function') {
      _events.delegateEvents(this.dom(), this.getDOMEvents(), _stateElement.props.autoFormEvents);
    }
  }

  /**
   * Override to delegate events or not based on some state trigger
   */
  function shouldDelegateEvents() {
    return true;
  }

  function unmount() {
    if (typeof this.componentWillUnmount === 'function') {
      this.componentWillUnmount();
    }

    this.$unmountChildren();
    this.$removeEvents();

    if (_stateElement.props.attach === 'replace') {
      DOMUtils.removeAllElements(document.querySelector(_stateElement.props.target));
    } else {
      if (this.dom()) {
        DOMUtils.removeElement(this.dom());
      }
    }

    _domElementCache = null;
    _lifecycleState  = LS_UNMOUNTED;
  }

  function $removeEvents() {
    if (typeof this.getDOMEvents === 'function') {
      _events.undelegateEvents(this.getDOMEvents());
    }
  }

  function dispose() {
    if (typeof this.componentWillDispose === 'function') {
      this.componentWillDispose();
    }

    this.$disposeChildren();
    this.unmount();
    _lifecycleState = LS_INITED;
  }


  //----------------------------------------------------------------------------
  //  Children
  //----------------------------------------------------------------------------

  function addChildren(childObjs) {
    if (childObjs) {
      ForOwn(childObjs, (child, id) => {
        if (childObjs.hasOwnProperty(id)) {
          this.addChild(id, child, false);
        }
      });
      $forceUpdateChildren.bind(this)();
    } else {
      _stateElement.children = {};
    }
  }

  function addChild(id, child, update) {
    _stateElement.addChild(id, child);

    child.setParent(this);

    if (update) {
      $forceUpdateChildren.bind(this)();
    }
  }

  function setParent(parent) {
    _stateElement.setParent(parent);
  }

  function getParent() {
    return _stateElement.getParent();
  }

  /**
   * Force init, render and mount of all children. Called after a new child is added
   * IF the current view is mounted and the children aren't
   */
  function $forceUpdateChildren() {
    if (_lifecycleState === LS_MOUNTED) {
      ForOwn(_stateElement.children, child => {
        if (!child.isMounted()) {
          child.$renderComponent();
          child.mount();
        }
      });
    }
  }

  function child(id) {
    if (_stateElement.children.hasOwnProperty(id)) {
      return _stateElement.children[id];
    }
    console.warn(this.id(), 'Child not found', id);
    return null;
  }

  function $renderChildren() {
    ForOwn(_stateElement.children, child => {
      child.$renderComponent();
    });
  }

  function $getChildHTMLObject() {
    return _.reduce(_stateElement.children, (htmlObj, current, key) => {
      htmlObj[key] = current.getHTML();
      return htmlObj;
    }, {});
  }

  function $mountChildren() {
    ForOwn(_stateElement.children, child => {
      child.$mountComponent();
    });
  }

  function $unmountChildren() {
    ForOwn(_stateElement.children, child => {
      child.unmount();
    });
  }

  function $disposeChildren() {
    ForOwn(_stateElement.children, child => {
      child.dispose();
    });
  }

  function disposeChild(id) {
    if (_stateElement.children.hasOwnProperty(id)) {
      _stateElement.children[id].dispose();
    } else {
      console.warn('Cannot remove child. ', id, 'not found');
    }
  }

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function isInitialized() {
    return _lifecycleState > LS_NO_INIT;
  }

  function isMounted() {
    return !!this.dom();
  }

  function id() {
    return _stateElement.props.id;
  }

  function dom() {
    if (!_domElementCache) {
      _domElementCache = document.querySelector('.' + this.className());
    }
    return _domElementCache;
  }

  function html() {
    return _html;
  }

  function className() {
    return CLASS_PREFIX + _stateElement.props.index;
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
    // Direct obj access
    state,
    props,

    // public api
    setProps,
    getDefaultState,
    setState,
    getDefaultProps,
    isInitialized,
    id,
    //template,
    dom,
    html,
    isMounted,
    tmpl,
    forceUpdate,
    render,
    mount,
    className,
    shouldDelegateEvents,
    unmount,
    dispose,
    addChild,
    addChildren,
    disposeChild,
    child,
    setParent,
    getParent,

    // private api
    $componentInit,
    $processChildren,
    $setPublicPropsAndState,
    $updatePropsAndState,
    $renderAfterPropsOrStateChange,
    $renderComponent,
    $mountComponent,
    $addEvents,
    $removeEvents,
    $forceUpdateChildren,
    $renderChildren,
    $mountChildren,
    $unmountChildren,
    $disposeChildren
  };
}