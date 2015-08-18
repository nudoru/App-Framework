/**
 * Base module for components
 * Must be extended with custom modules
 */

define('nori/view/ViewComponent',
  function (require, module, exports) {

    var _isInitialized = false,
        _id,
        _templateObj,
        _html,
        _DOMElement,
        _mountPoint,
        _state         = {},
        _children      = [],
        _isMounted     = false,
        _noriEvents    = require('nori/events/EventCreator');

    /**
     * Initialization
     * @param initObj
     */
    function initializeComponent(initObj) {
      if (!isInitialized()) {
        _id          = initObj.id;
        _templateObj = initObj.template;
        _mountPoint  = initObj.mountPoint;
      }
      this.update();
      _isInitialized = true;
    }

    /**
     * Bind updates to the map ID to this view's update
     * @param mapIDorObj Object to subscribe to or ID. Should implement nori/model/MixinObservableModel
     */
    function bindMap(mapIDorObj) {
      var map;

      if (isObject(mapIDorObj)) {
        map = mapIDorObj;
      } else {
        map = Nori.model().getMap(mapIDorObj) || Nori.model().getMapCollection(mapIDorObj);
      }

      if (!map) {
        throw new Error('ViewComponent bindMap, map or mapcollection not found: ' + mapIDorObj);
      }

      map.subscribe(this.update.bind(this));
    }

    /**
     * Add a child
     * @param child
     */
    function addChild(child) {
      _children.push(child);
    }

    /**
     * Remove a child
     * @param child
     */
    function removeChild(child) {
      var idx = _children.indexOf(child);
      _children[idx].dispose();
      _children.splice(idx, 1);
    }

    /**
     * Before the iew updates and a rerender occurs
     */
    function componentWillUpdate() {
      // update state
    }

    /**
     * Update state and rerender
     * @param dataObj
     * @returns {*}
     */
    function update() {
      // make a copy of last state
      var previousState = _.assign({}, this.getState());

      // state will update here
      this.componentWillUpdate();

      _children.forEach(function updateChild(child) {
        child.update();
      });

      if (_isMounted) {
        if (this.componentShouldRender(previousState)) {
          this.unmount();
          this.render();
          this.mount();
        }
      }

      this.componentDidUpdate();
    }

    /**
     * Determine if the view should rerender on update
     * TODO implement
     * @returns {boolean}
     */
    function componentShouldRender(previousState) {
      return !_.isEqual(previousState, this.getState());
      //return true;
    }

    /**
     * After the view updates and a rerender occurred
     */
    function componentDidUpdate() {
      // stub
    }

    function componentWillRender() {
      // stub
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      if (this.componentWillRender) {
        this.componentWillRender();
      }

      _children.forEach(function renderChild(child) {
        child.render();
      });

      _html = _templateObj(_state);

      if (this.componentDidRender) {
        this.componentDidRender();
      }
    }

    function componentDidRender() {
      // stub
    }

    /**
     * Call before it's been added to a view
     */
    function componentWillMount() {
      // stub
    }

    /**
     * Append it to a parent element
     * @param mountEl
     */
    function mount() {
      if (!_html) {
        throw new Error('Component ' + _id + ' cannot mount with no HTML. Call render() first');
      }

      if (this.componentWillMount) {
        this.componentWillMount();
      }

      _isMounted = true;

      // Go out to the standard render function. DOM element is returned in callback
      _noriEvents.renderView(_mountPoint, _html, _id, onViewRendered.bind(this));
    }

    /**
     * Handler for the renderer module
     * @param domEl
     */
    function onViewRendered(domEl) {
      setDOMElement(domEl);
      // from the ViewMixinEventDelegator
      if (this.delegateEvents) {
        this.delegateEvents();
      }

      if (this.componentDidMount) {
        this.componentDidMount();
      }
    }

    /**
     * Call after it's been added to a view
     */
    function componentDidMount() {
      // stub
    }

    /**
     * Call when unloading and switching views
     */
    function componentWillUnmount() {
      // stub
    }

    function unmount() {
      this.componentWillUnmount();
      _isMounted = false;
      _noriEvents.renderView(_mountPoint, '', _id);

      // from the ViewMixinEventDelegator
      if (this.undelegateEvents) {
        this.undelegateEvents();
      }

      setDOMElement(null);
      this.componentDidUnmount();
    }

    function componentDidUnmount() {
      // stub
    }

    /**
     * Remove a view and cleanup
     */
    function dispose() {
      this.unmount();
    }

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function isInitialized() {
      return _isInitialized;
    }

    function isMounted() {
      return _isMounted;
    }

    function setState(obj) {
      _state = obj;
    }

    function getState() {
      return _.cloneDeep(_state);
    }

    function getID() {
      return _id;
    }

    function getTemplate() {
      return _templateObj;
    }

    function getDOMElement() {
      return _DOMElement;
    }

    function setDOMElement(el) {
      _DOMElement = el;
    }

    function getHTML() {
      return _html;
    }

    function setHTML(str) {
      _html = str;
    }

    function getChildren() {
      return _children.slice(0);
    }


    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initializeComponent = initializeComponent;

    module.exports.isInitialized = isInitialized;
    module.exports.setState      = setState;
    module.exports.getState      = getState;
    module.exports.getID         = getID;
    module.exports.getTemplate   = getTemplate;
    module.exports.getHTML       = getHTML;
    module.exports.setHTML       = setHTML;
    module.exports.getDOMElement = getDOMElement;
    module.exports.setDOMElement = setDOMElement;
    module.exports.isMounted     = isMounted;

    module.exports.bindMap             = bindMap;
    module.exports.componentWillUpdate = componentWillUpdate;
    module.exports.update              = update;
    module.exports.componentDidUpdate  = componentDidUpdate;

    module.exports.componentShouldRender = componentShouldRender;
    module.exports.componentWillRender   = componentWillRender;
    module.exports.render                = render;
    module.exports.componentDidRender    = componentDidRender;

    module.exports.componentWillMount = componentWillMount;
    module.exports.mount              = mount;
    module.exports.componentDidMount  = componentDidMount;

    module.exports.componentWillUnmount = componentWillUnmount;
    module.exports.unmount              = unmount;
    module.exports.componentDidUnmount  = componentDidUnmount;

    module.exports.addChild    = addChild;
    module.exports.removeChild = removeChild;
    module.exports.getChildren = getChildren;

  });