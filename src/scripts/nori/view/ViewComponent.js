/* @flow weak */

/**
 * Base module for components
 * Must be extended with custom modules
 *
 * Functions beginning with $ should be treated as private
 */

import _ from '../../vendor/lodash.min.js';
import Template from '../view/Templating.js';
import Renderer from '../view/Renderer.js';
import Is from '../../nudoru/util/is.js';

// Lifecycle state constants
const LS_NO_INIT   = 0,
      LS_INITED    = 1,
      LS_RENDERING = 2,
      LS_MOUNTED   = 3,
      LS_UNMOUNTED = 4,
      LS_DISPOSED  = 9;

var ViewComponent = function () {

  let _internalState  = {},
      _internalProps  = {},
      _publicState    = {},
      _publicProps    = {},
      _lastState      = {},
      _lastProps      = {},
      _lifecycleState = LS_NO_INIT,
      _isMounted      = false,
      _regions        = {},
      _id,
      _templateObjCache,
      _html,
      _DOMElement,
      _mountPoint,
      _mountDelay;

  /**
   * Initialization
   * @param initProps
   */
  function initializeComponent(initProps) {
    this.setProps(_.assign({}, this.getDefaultProps(), initProps));

    _id = _internalProps.id;
    if (!_id) {
      throw new Error('Cannot initialize Component without an ID');
    }

    _mountPoint = _internalProps.mountPoint;
    _regions    = this.defineRegions();

    this.setState(this.getInitialState());
    //this.setEvents(this.getDOMEvents());

    this.$initializeRegions();

    _lifecycleState = LS_INITED;
  }

  /**
   * Override in implementation
   *
   * Define DOM events to be attached after the element is mounted
   * @returns {undefined}
   */
  function getDOMEvents() {
    return undefined;
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
  function getInitialState() {
    return {};
  }

  /**
   * Get the current state
   * @returns {void|*}
   */
  function getState() {
    return _.assign({}, _internalState);
  }

  /**
   * Get the current props
   * @returns {void|*}
   */
  function getProps() {
    return _.assign({}, _internalProps);
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

    nextState = nextState || this.getInitialState();

    if (!shouldComponentUpdate(null, nextState)) {
      return;
    }

    if (typeof this.componentWillUpdate === 'function' && _lifecycleState > LS_INITED) {
      this.componentWillUpdate(_publicProps, nextState);
    }

    _lastState     = _.assign({}, _internalState);
    _internalState = _.assign({}, _internalState, nextState);
    _publicState = _.assign(_publicState, _internalState);

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
    _publicProps = _.assign(_publicProps, _internalProps);

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
    let wasMounted = _isMounted;

    if (wasMounted) {
      this.unmount();
    }

    _lifecycleState = LS_RENDERING;

    if (!_templateObjCache) {
      _templateObjCache = this.template(this.getProps(), this.getState());
    }

    _html = this.render(this.getProps(), this.getState());

    if (wasMounted) {
      this.mount();
    }

    this.$renderRegions();
  }

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here.
   *
   * The method is called only on the first render and cached to speed up renders
   *
   * @returns {Function}
   */
  function template(props, state) {
    // assumes the template ID matches the component's ID as passed on initialize
    let templateId = props.template || this.getID();
    return Template.getTemplate(templateId);
  }

  /**
   * May be overridden in a submodule for custom rendering
   * Should return HTML
   * @returns {*}
   */
  function render(props, state) {
    return _templateObjCache(state);
  }

  /**
   * Append it to a parent element
   * @param mountEl
   */
  function mount() {
    // TODO why aren't components unmounting on change first?
    if (_isMounted) {
      //console.warn('Component ' + _id + ' is already mounted');
      return;
    }

    if (!_html || _html.length === 0) {
      console.warn('Component ' + _id + ' cannot mount with no HTML. Call render() first?');
      return;
    }

    _lifecycleState = LS_MOUNTED;

    _DOMElement = (Renderer.render({
      target: _mountPoint,
      html  : _html
    }));

    _isMounted = true;

    if (typeof this.delegateEvents === 'function') {
      if (this.shouldDelegateEvents(this.getProps(), this.getState())) {
        // True to automatically pass form element handlers the elements value or other status
        this.delegateEvents(this.getDOMEvents(), this.getProps().autoFormEvents);
      }
    }

    if (typeof this.componentDidMount === 'function') {
      _mountDelay = _.delay(this.$mountAfterDelay.bind(this), 1);
    }
  }

  /**
   * HACK
   * Experiencing issues with animations running in componentDidMount
   * after renders and state changes. This delay fixes the issues.
   */
  function $mountAfterDelay() {
    if (_mountDelay) {
      window.clearTimeout(_mountDelay);
    }

    this.componentDidMount();
    this.$mountRegions();
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
    if (_mountDelay) {
      window.clearTimeout(_mountDelay);
    }

    // Tweens are present in the MixinDOMManipulation. For convenience, killing here
    if (typeof this.killTweens === 'function') {
      this.killTweens();
    }

    this.componentWillUnmount();

    _isMounted = false;

    if (typeof this.undelegateEvents === 'function') {
      this.undelegateEvents(this.getDOMEvents());
    }

    // Just clear the contents
    Renderer.render({
      target: _mountPoint,
      html  : ''
    });

    _html       = '';
    _DOMElement = null;

    _lifecycleState = LS_UNMOUNTED;
  }

  function dispose() {
    this.componentWillDispose();
    this.$disposeRegions();
    this.unmount();

    _lifecycleState = LS_DISPOSED;
  }

  function componentWillDispose() {
    //
  }

  //----------------------------------------------------------------------------
  //  Regions
  //----------------------------------------------------------------------------

  //TODO reduce code repetition

  function defineRegions() {
    return undefined;
  }

  function getRegion(id) {
    return _regions[id];
  }

  function getRegionIDs() {
    return _regions ? Object.keys(_regions) : [];
  }

  function $initializeRegions() {
    getRegionIDs().forEach(region => {
      _regions[region].initialize();
    });
  }

  function $renderRegions() {
    getRegionIDs().forEach(region => {
      _regions[region].$renderComponent();
    });
  }

  function $mountRegions() {
    getRegionIDs().forEach(region => {
      _regions[region].mount();
    });
  }

  function $unmountRegions() {
    getRegionIDs().forEach(region => {
      _regions[region].unmount();
    });
  }

  function $disposeRegions() {
    getRegionIDs().forEach(region => {
      _regions[region].dispose();
    });
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
    return _isMounted;
  }

  function getID() {
    return _id;
  }

  function getDOMElement() {
    return _DOMElement;
  }

  //----------------------------------------------------------------------------
  //  Utility
  //----------------------------------------------------------------------------

  /**
   * Bind updates from a store to a function
   * @param observable Object to subscribe to or ID. Should implement nori/store/MixinObservableStore
   */
  function bind(observable, func) {
    if (!Is.func(observable.subscribe)) {
      console.warn('ViewComponent bind, must be observable: ' + observable);
      return;
    }

    observable.subscribe(func);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeComponent           : initializeComponent,
    state                         : _publicState,
    props                         : _publicProps,
    getProps                      : getProps,
    setProps                      : setProps,
    getInitialState               : getInitialState,
    getState                      : getState,
    setState                      : setState,
    getDefaultProps               : getDefaultProps,
    defineRegions                 : defineRegions,
    getDOMEvents                  : getDOMEvents,
    getLifeCycleState             : getLifeCycleState,
    isInitialized                 : isInitialized,
    getID                         : getID,
    template                      : template,
    getDOMElement                 : getDOMElement,
    isMounted                     : isMounted,
    bind                          : bind,
    componentWillReceiveProps     : componentWillReceiveProps,
    componentWillUpdate           : componentWillUpdate,
    componentDidUpdate            : componentDidUpdate,
    shouldComponentUpdate         : shouldComponentUpdate,
    $renderAfterPropsOrStateChange: $renderAfterPropsOrStateChange,
    $renderComponent              : $renderComponent,
    render                        : render,
    mount                         : mount,
    shouldDelegateEvents          : shouldDelegateEvents,
    $mountAfterDelay              : $mountAfterDelay,
    componentDidMount             : componentDidMount,
    componentWillUnmount          : componentWillUnmount,
    unmount                       : unmount,
    dispose                       : dispose,
    componentWillDispose          : componentWillDispose,
    getRegion                     : getRegion,
    getRegionIDs                  : getRegionIDs,
    $initializeRegions            : $initializeRegions,
    $renderRegions                : $renderRegions,
    $mountRegions                 : $mountRegions,
    $unmountRegions               : $unmountRegions,
    $disposeRegions               : $disposeRegions
  };

};

export default ViewComponent;