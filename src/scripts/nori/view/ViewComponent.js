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


// Lifecycle state constants
const LS_NO_INIT   = 0,
      LS_INITED    = 1,
      LS_RENDERING = 2,
      LS_MOUNTED   = 3,
      LS_UNMOUNTED = 4,
      LS_DISPOSED  = 99,
      MNT_REPLACE  = 'replace',
      MNT_APPEND   = 'append';

export default function () {

  // Properties added to component on creation:
  // __id, __key, __template

  let _internalState  = {},
      _internalProps  = {},
      _publicState    = {},
      _publicProps    = {},
      _lastState      = {},
      _lastProps      = {},
      _lifecycleState = LS_NO_INIT,
      _events         = EventDelegator(),
      _children,
      _parent,
      _templateObjCache,
      _html,
      _DOMElement,
      _lastAdjacentNode,
      _mountPoint;

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
    initProps.id       = this.__id;
    initProps.key      = this.__key;
    initProps.template = this.__template;

    this.setProps(_.assign({}, this.getDefaultProps(), initProps));

    if (_internalProps.hasOwnProperty('mount')) {
      _mountPoint = _internalProps.mount;
    } else {
      console.warn(this.__id, 'Component without a mount selector');
    }

    if (!_internalProps.hasOwnProperty('mountMethod')) {
      _internalProps.mountMethod = MNT_REPLACE;
    }

    if (_internalProps.hasOwnProperty('parent')) {
      _parent = _internalProps.parent;
    }

    this.addChildren(this.defineChildren());
    this.setState(this.getDefaultState());
    this.$initializeChildren();
    _lifecycleState = LS_INITED;
  }

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

    _lastState     = _.assign({}, _internalState);
    _internalState = _.assign({}, _internalState, nextState);
    _publicState   = _.assign(_publicState, _internalState);

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
      this.componentWillUpdate(nextProps, _internalState);
    }

    _lastProps     = _.assign({}, _internalProps);
    _internalProps = _.merge({}, _internalProps, nextProps);
    _publicProps   = _.assign(_publicProps, _internalProps);

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
        this.unmount();
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

    if (!_templateObjCache) {
      _templateObjCache = this.template(this.props, this.state);
    }

    this.$renderChildren();

    this.setHTML(this.render(this.props, this.state));
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
        template = _templateObjCache || this.template(props, state);

    return template(combined);
  }

  /**
   * Append it to a parent element
   */
  function mount() {
    if (isMounted()) {
      console.warn('Component ' + this.getID() + ' is already mounted');
      return;
    }

    if (!this.getHTML() || this.getHTML().length === 0) {
      console.warn('Component ' + this.getID() + ' cannot mount with no HTML. Call render() first?');
      return;
    }

    _lifecycleState = LS_MOUNTED;

    _DOMElement = Renderer({
      key           : this.__key,
      method        : this.props.mountMethod,
      lastAdjacent  : _lastAdjacentNode,
      targetSelector: _mountPoint,
      html          : this.getHTML()
    });

    if (this.shouldDelegateEvents(this.props, this.state)) {
      _events.delegateEvents(this.getDOMElement(), this.getDOMEvents(), this.props.autoFormEvents);
    }

    this.$mountChildren();
    this.componentDidMount();
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
    _lastAdjacentNode = _DOMElement.nextSibling;

    this.componentWillUnmount();

    _events.undelegateEvents(this.getDOMEvents());

    if (!this.props.mountMethod || this.props.mountMethod === MNT_REPLACE) {
      DOMUtils.removeAllElements(document.querySelector(_mountPoint));
    } else {
      DOMUtils.removeElement(_DOMElement);
    }

    _DOMElement = null;

    _lifecycleState = LS_UNMOUNTED;
  }

  function dispose() {
    this.componentWillDispose();
    this.$disposeChildren();
    this.unmount();

    _lastAdjacentNode = null;
    _templateObjCache = null;

    _lifecycleState = LS_NO_INIT;
  }

  function componentWillDispose() {
    //
  }

  //----------------------------------------------------------------------------
  //  Children
  //----------------------------------------------------------------------------

  // TODO warn MUTABLE
  function getChildren() {
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
      Object.keys(childObjs).forEach(id => {
        if (childObjs.hasOwnProperty(id)) {
          this.addChild(id, childObjs[id], false);
        }
      });
      $forceChildren();
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

    this[$getLocalVCID(id)] = child;

    if (update) {
      $forceChildren();
    }
  }

  /**
   * Force init, render and mount of all children. Called after a new child is added
   * IF the current view is mounted and the children aren't
   */
  function $forceChildren() {
    if (_lifecycleState === LS_MOUNTED) {
      getChildIDs().forEach(id => {
        var isMounted = _children[id].getLifeCycleState() === LS_MOUNTED;
        if (!isMounted) {
          _children[id].initialize({parent: this});
          _children[id].$renderComponent();
          _children[id].mount();
        }
      });
    }
  }

  // before attaching to this, clean it up a little
  function $getLocalVCID(id) {
    return 'C' + _.camelCase(id);
  }

  function disposeChild(id) {
    if (_children.hasOwnProperty(id)) {
      _children[id].dispose();
      delete _children[id];
      if (this.hasOwnProperty($getLocalVCID(id))) {
        delete this[$getLocalVCID(id)];
      }
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

  function getChildIDs() {
    return _children ? Object.keys(_children) : [];
  }

  //TODO reduce code repetition ------------------------------------------------

  function $initializeChildren() {
    getChildIDs().forEach(id => {
      _children[id].initialize({parent: this});
    });
  }

  function $renderChildren() {
    getChildIDs().forEach(id => {
      _children[id].$renderComponent();
    });
  }

  function $getChildHTMLObj() {
    var htmlObj = {};
    getChildIDs().forEach(id => {
      htmlObj[id] = _children[id].getHTML();
    });
    return htmlObj;
  }

  function $mountChildren() {
    getChildIDs().forEach(id => {
      _children[id].mount();
    });
  }

  function $unmountChildren() {
    getChildIDs().forEach(id => {
      _children[id].unmount();
    });
  }

  function $disposeChildren() {
    getChildIDs().forEach(id => {
      _children[id].dispose();
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

  function getKey() {
    return this.__key;
  }

  function setKey(newKey) {
    this.__key = newKey;
  }

  function getHTML() {
    return _html;
  }

  function setHTML(html) {
    _html = html;
  }

  function getDOMElement() {
    return _DOMElement;
  }

  function getMountPoint() {
    return _mountPoint;
  }

  function getLastAdjacentNode() {
    return _lastAdjacentNode;
  }

  //----------------------------------------------------------------------------
  //  Utility
  //----------------------------------------------------------------------------

  /**
   * Bind updates from a store to a function
   * @param observable Object to subscribe to or ID. Should implement nori/store/MixinObservableStore
   */
  function bind(observable, func) {
    if (typeof observable.subscribe !== 'function') {
      console.warn('ViewComponent bind, must be observable: ' + observable);
      return;
    }

    observable.subscribe(func);
  }

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
    setProps,
    getDefaultState,
    setState,
    getDefaultProps,
    defineChildren,
    getDOMEvents,
    getLifeCycleState,
    isInitialized,
    getID,
    getKey,
    setKey,
    template,
    getDOMElement,
    getHTML,
    setHTML,
    getMountPoint,
    getLastAdjacentNode,
    isMounted,
    bind,
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
    getChildren,
    addChild,
    addChildren,
    disposeChild,
    child,
    $getLocalVCID,
    getChildIDs,
    $initializeChildren,
    $renderChildren,
    $mountChildren,
    $unmountChildren,
    $disposeChildren
  };
}