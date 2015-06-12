/**
 * A template for a subviews
 */

define('Nori.View.BaseSubView',
  function (require, module, exports) {

    var _isInitialized = false,
      _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _state = {},
      _children = [],
      _isMounted = false,
      _domUtils = require('Nudoru.Browser.DOMUtils');

    /**
     * Initialization
     * @param initObj
     */
    function initializeSubView(initObj) {
      if(!isInitialized()) {
        _initObj = initObj;
        _id = initObj.id;
        _templateObj = initObj.template;
      }
      this.update();
      _isInitialized = true;

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
    function viewWillUpdate() {
      // update state
    }

    /**
     * Update state and rerender
     * @param dataObj
     * @returns {*}
     */
    function update() {
      this.viewWillUpdate();

      _children.forEach(function updateChild(child) {
        child.update();
      });

      if(_isMounted) {
        render();
      }
      this.viewDidUpdate();
    }

    /**
     * After the view updates and a rerender occurred
     */
    function viewDidUpdate() {

    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      //console.log(_id + ', subview render');

      _children.forEach(function renderChild(child) {
        child.render();
      });

      _html = _templateObj(_state);
      _DOMElement = _domUtils.HTMLStrToNode(_html);
      return _DOMElement;
    }

    /**
     * Call after it's been added to a view
     */
    function viewDidMount() {
      //console.log(_id + ', subview did mount');
      _isMounted = true;
    }

    /**
     * Call when unloading and switching views
     */
    function viewWillUnMount() {
      //console.log(_id + ', subview will unmount');
      _isMounted = false;
    }

    /**
     * Remove a view and cleanup
     */
    function dispose() {
      console.log(_id + ', subview DISPOSE');
      // Unmount
    }

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function isInitialized() {
      return _isInitialized;
    }

    function setState(obj) {
      _state = obj;
    }

    function getState() {
      return _state;
    }

    /**
     * Accessor for ID prop
     * @returns {*}
     */
    function getID() {
      return _id;
    }

    /**
     * Accessor for the DOM element
     * @returns {*}
     */
    function getDOMElement() {
      return _DOMElement;
    }

    /**
     * Get a copy of the children
     */
    function getChildren() {
      return _children.slice(0);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initializeSubView = initializeSubView;
    exports.isInitialized = isInitialized;
    exports.setState = setState;
    exports.getState = getState;
    exports.viewWillUpdate = viewWillUpdate;
    exports.update = update;
    exports.viewDidUpdate = viewDidUpdate;
    exports.render = render;
    exports.getID = getID;
    exports.getDOMElement = getDOMElement;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnMount = viewWillUnMount;
    exports.addChild = addChild;
    exports.removeChild = removeChild;
    exports.getChildren = getChildren;

  });