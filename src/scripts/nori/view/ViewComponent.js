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

const LS_NO_INIT   = 0,
      LS_INITED    = 1,
      LS_RENDERING = 2,
      LS_MOUNTED   = 3,
      LS_UNMOUNTED = 4,
      MNT_REPLACE  = 'replace',
      MNT_APPEND   = 'append';

let Events        = EventDelegator(),
    reservedProps = ['key', 'id', 'template'];


export default function () {

  // Properties added to component on creation:
  // __id, __key, __template

  let __state         = {},
      __props         = {},
      _publicState    = {},
      _publicProps    = {},
      _lastState      = {},
      _lastProps      = {},
      _lifecycleState = LS_NO_INIT,
      _children,
      _templateCache,
      _html,
      _DOMElement,
      __parent,
      __mountPoint;

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

    __props.id       = this.__id;
    __props.key      = this.__key;
    __props.template = this.__template;

    this.validateProps();

    this.addChildren(this.defineChildren());
    this.setState(this.getDefaultState());
    this.$initializeChildren();

    _lifecycleState = LS_INITED;
  }

  function validateProps() {
    if (__props.hasOwnProperty('mount')) {
      __mountPoint = __props.mount;
    } else {
      console.warn(this.__id, 'Component without a mount selector');
    }

    if (!__props.hasOwnProperty('mountMethod')) {
      __props.mountMethod = MNT_REPLACE;
    }

    if (__props.hasOwnProperty('parent')) {
      __parent = __props.parent;
    }
  }

  //function validateObjectForReservedKeys(obj) {
  //  _reservedPros.forEach(key => {
  //    if (obj.hasOwnProperty(key)) {
  //      console.warn(this.getID(), 'props contain reserved key:', key);
  //    }
  //  });
  //  return true;
  //}

  /**
   * Override in implementation
   *
   * Define DOM events to be attached after the element is mounted
   * @returns {undefined}
   */
  function getDOMEvents() {
    return null;
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
    nextProps = nextProps || __props;
    nextState = nextState || __state;

    let isStateEq = _.isEqual(nextState, __state),
        isPropsEq = _.isEqual(nextProps, __props);

    return !(isStateEq) || !(isPropsEq);
  }

  /**
   * Sets the next state and trigger a rerender
   * @param nextState
   */
  function setState(nextState) {
    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update state during rendering', this.getID());
      return;
    }

    nextState = nextState || this.getDefaultState();

    if (!shouldComponentUpdate(null, nextState)) {
      return;
    }

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(_publicProps, nextState);
    }

    _lastState   = _.assign({}, __state);
    __state      = _.assign({}, __state, nextState);
    _publicState = _.assign(_publicState, __state);

    if (typeof _publicState.onChange === 'function') {
      _publicState.onChange.apply(this);
    }

    this.$renderAfterPropsOrStateChange();
  }

  /**
   * Before new props are updated
   */
  function componentWillReceiveProps(nextProps) {
  }

  /**
   * Set new props and trigger rerender
   * @param nextProps
   */
  function setProps(nextProps) {
    if (_lifecycleState === LS_RENDERING) {
      console.warn('Can\'t update props during rendering', this.getID());
      return;
    }

    // ensure this runs only after initial init
    if (typeof this.componentWillReceiveProps === 'function' && _lifecycleState >= LS_INITED) {
      this.componentWillReceiveProps(nextProps);
    }

    if (!shouldComponentUpdate(nextProps, null)) {
      return;
    }

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(nextProps, __state);
    }

    _lastProps   = _.assign({}, __props);
    __props      = _.merge({}, __props, nextProps);
    _publicProps = _.assign(_publicProps, __props);

    if (typeof _publicProps.onChange === 'function') {
      _publicProps.onChange.apply(this);
    }

    this.$renderAfterPropsOrStateChange();
  }

  /**
   * Handle rerendering after props or state change
   */
  function $renderAfterPropsOrStateChange() {
    if (_lifecycleState > LS_INITED) {
      this.$renderComponent();

      if (this.isMounted()) {
        //this.unmount();
        this.mount();
      }

      if (typeof this.componentDidUpdate === 'function') {
        this.componentDidUpdate(_lastProps, _lastState);
      }
    }
  }

  /**
   * Before the view updates and a rerender occurs
   */
  function componentWillUpdate(nextProps, nextState) {
  }

  /**
   * After the updates render to the DOM
   */
  function componentDidUpdate(lastProps, lastState) {
  }

  /**
   * Render it, need to add it to a parent container, handled in higher level view
   * @param force If true, will force a render
   * @returns {*}
   */
  function $renderComponent(force = false) {
    _lifecycleState = LS_RENDERING;

    if (!_templateCache) {
      _templateCache = this.template(this.props, this.state);
    }

    this.$renderChildren();

    _html = this.render(this.props, this.state);
  }

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here. Mustache style delimiters used.
   */
  function template(props, state) {
    let templateId = this.__template || this.getID();
    return Template.getTemplate(templateId);
  }

  /**
   * May be overridden in a submodule for custom rendering
   * Should return HTML
   */
  function render(props, state) {
    let combined = _.merge({}, props, state),
        template = _templateCache || this.template(props, state);

    return template(combined);
  }

  /**
   * Append it to a parent element
   */
  function mount() {
    let lastAdjacent;

    if (!this.getHTML() || this.getHTML().length === 0) {
      console.warn('Component ' + this.getID() + ' cannot mount with no HTML. Call render() first?');
      return;
    }

    if (isMounted()) {
      lastAdjacent = _DOMElement.nextSibling;
      this.unmount();
    }

    _lifecycleState = LS_MOUNTED;

    _DOMElement = Renderer({
      key           : this.__key,
      method        : this.props.mountMethod,
      lastAdjacent  : lastAdjacent,
      targetSelector: __mountPoint,
      html          : this.getHTML()
    });

    if (this.shouldDelegateEvents(this.props, this.state)) {
      Events.delegateEvents(this.getDOMElement(), this.getDOMEvents(), this.props.autoFormEvents);
    }

    this.$mountChildren();

    if (typeof this.componentDidMount === 'function') {
      this.componentDidMount();
    }
  }

  /**
   * Override to delegate events or not based on some state trigger
   * @returns {boolean}
   */
  function shouldDelegateEvents(props, state) {
    return true;
  }

  /**
   * Call after it's been added to a view
   */
  function componentDidMount() {
  }

  /**
   * Call when unloading
   */
  function componentWillUnmount() {
  }

  function unmount() {
    if (typeof this.componentWillUnmount === 'function') {
      this.componentWillUnmount();
    }

    $unmountChildren();

    Events.undelegateEvents(this.getDOMEvents());

    if (!this.props.mountMethod || this.props.mountMethod === MNT_REPLACE) {
      DOMUtils.removeAllElements(document.querySelector(__mountPoint));
    } else {
      DOMUtils.removeElement(_DOMElement);
    }

    _DOMElement = null;

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

  function componentWillDispose() {
    //
  }

  //----------------------------------------------------------------------------
  //  Children
  //----------------------------------------------------------------------------

  function unsafeGetChildren() {
    return _children;
  }

  /**
   * Called in initializeComponent to create children during the initialization phase
   */
  function defineChildren() {
    return null;
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
        if (child.getLifeCycleState() !== LS_MOUNTED) {
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
    console.warn(this.getID(), 'Child not found', id);
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

  function $getChildHTMLObj() {
    return _.reduce(_children, (htmlObj, current, key) => {
      htmlObj[key] = current.getHTML();
      return htmlObj;
    }, {});
  }

  function $mountChildren() {
    _.forOwn(_children, child => {
      child.mount();
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

  function getLifeCycleState() {
    return _lifecycleState;
  }

  function isInitialized() {
    return _lifecycleState > LS_NO_INIT;
  }

  function isMounted() {
    return !!_DOMElement;
  }

  function getID() {
    return this.__id;
  }

  function getHTML() {
    return _html;
  }

  function getDOMElement() {
    return _DOMElement;
  }

  function getMountPoint() {
    return __mountPoint;
  }

  //----------------------------------------------------------------------------
  //  Utility
  //----------------------------------------------------------------------------


  function from(html) {
    return Template.getTemplateFromHTML(html);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    state: _publicState,
    props: _publicProps,
    initialize,
    initializeComponent,
    validateProps,
    setProps,
    getDefaultState,
    setState,
    getDefaultProps,
    defineChildren,
    getDOMEvents,
    getLifeCycleState,
    isInitialized,
    getID,
    template,
    getDOMElement,
    getHTML,
    getMountPoint,
    isMounted,
    from,
    componentWillReceiveProps,
    componentWillUpdate,
    componentDidUpdate,
    shouldComponentUpdate,
    $renderAfterPropsOrStateChange,
    $renderComponent,
    render,
    mount,
    shouldDelegateEvents,
    componentDidMount,
    componentWillUnmount,
    unmount,
    dispose,
    componentWillDispose,
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