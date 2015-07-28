/**
 * Base module for app subviews for components
 * Must be extended with custom modules
 */

define('Nori.View.ApplicationSubView',
  function (require, module, exports) {

    var _isInitialized = false,
        _initObj,
        _id,
        _templateObj,
        _html,
        _DOMElement,
        _mountPoint,
        _state         = {},
        _children      = [],
        _isMounted     = false,
        _appEvents     = require('Nori.Events.AppEventCreator');

    /**
     * Initialization
     * @param initObj
     */
    function initializeSubView(initObj) {
      if (!isInitialized()) {
        _initObj     = initObj;
        _id          = initObj.id;
        _templateObj = initObj.template;
        _mountPoint  = initObj.mountPoint;
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
      // make a copy of last state
      var previousState = _.merge({}, this.getState());

      // state will update here
      this.viewWillUpdate();

      _children.forEach(function updateChild(child) {
        child.update();
      });

      if (_isMounted) {
        if (this.viewShouldRender(previousState)) {
          this.unmount();
          this.render();
          this.mount();
        }
      }

      this.viewDidUpdate();
    }

    /**
     * Determin if the view should rerender on update
     * @returns {boolean}
     */
    function viewShouldRender(previousState) {
      return true;
    }

    /**
     * After the view updates and a rerender occurred
     */
    function viewDidUpdate() {
      // stub
    }

    function viewWillRender() {
      // stub
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      if (this.viewWillRender) {
        this.viewWillRender();
      }

      _children.forEach(function renderChild(child) {
        child.render();
      });

      _html = _templateObj(_state);

      if (this.viewDidRender) {
        this.viewDidRender();
      }
    }

    function viewDidRender() {
      // stub
    }

    /**
     * Call before it's been added to a view
     */
    function viewWillMount() {
      // stub
    }

    /**
     * Append it to a parent element
     * @param mountEl
     */
    function mount() {
      if (!_html) {
        throw new Error('SubView ' + _id + ' cannot mount with no HTML. Call render() first');
      }

      if (this.viewWillMount) {
        this.viewWillMount();
      }

      _isMounted = true;

      // Go out to the standard render function. DOM element is returned in callback
      // Needs to be bound to 'this' context
      _appEvents.renderView(_mountPoint, _html, _id, (function (domEl) {
        setDOMElement(domEl);
        // from the ViewMixinEventDelegator
        if (this.delegateEvents) {
          this.delegateEvents();
        }
      }).bind(this));

      if (this.viewDidMount) {
        this.viewDidMount();
      }
    }

    /**
     * Call after it's been added to a view
     */
    function viewDidMount() {
      // stub
    }

    /**
     * Call when unloading and switching views
     */
    function viewWillUnmount() {
      // stub
    }

    function unmount() {
      this.viewWillUnmount();
      _isMounted = false;
      _appEvents.renderView(_mountPoint, '', _id);

      // from the ViewMixinEventDelegator
      if (this.undelegateEvents) {
        this.undelegateEvents();
      }

      setDOMElement(null);
      this.viewDidUnmount();
    }

    function viewDidUnmount() {
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

    exports.initializeSubView = initializeSubView;

    exports.isInitialized = isInitialized;
    exports.setState      = setState;
    exports.getState      = getState;
    exports.getID         = getID;
    exports.getTemplate   = getTemplate;
    exports.getHTML       = getHTML;
    exports.setHTML       = setHTML;
    exports.getDOMElement = getDOMElement;
    exports.setDOMElement = setDOMElement;

    exports.viewWillUpdate = viewWillUpdate;
    exports.update         = update;
    exports.viewDidUpdate  = viewDidUpdate;

    exports.viewShouldRender = viewShouldRender;
    exports.viewWillRender   = viewWillRender;
    exports.render           = render;
    exports.viewDidRender    = viewDidRender;

    exports.viewWillMount = viewWillMount;
    exports.mount         = mount;
    exports.viewDidMount  = viewDidMount;

    exports.viewWillUnmount = viewWillUnmount;
    exports.unmount         = unmount;
    exports.viewDidUnmount  = viewDidUnmount;

    exports.addChild    = addChild;
    exports.removeChild = removeChild;
    exports.getChildren = getChildren;

  });