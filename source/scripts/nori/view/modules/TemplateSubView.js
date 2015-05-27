/**
 * A template for a subview/route controller
 */

define('Nori.View.TemplateSubView',
  function (require, module, exports) {

    var _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _initialState,
      _currentState,
      _modelData,
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('nudoru.events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    /**
     * Initialization
     * @param initObj
     */
    function initialize(initObj) {
      console.log(initObj.id + ', subview init');

      console.log('subview state',initObj.state);
      console.log('subview modeldata',initObj.modelData);

      _modelData = initObj.modelData;

      if(!_initObj) {
        _initObj = initObj;
        _id = initObj.id;
        _templateObj = initObj.template;
        _initialState = _currentState = initObj.state;

        render();
      } else {
        console.log(_id + ', subview already init\'d');
        update(initObj.state);
      }
    }

    /**
     * Update state and rerender
     * @param state
     * @returns {*}
     */
    function update(state) {
      console.log(_id + ', subview update');
      _currentState = state;
      return render();
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      console.log(_id + ', subview render');

      _html = _templateObj(_currentState);
      _DOMElement = _domUtils.HTMLStrToNode(_html);
      return _DOMElement;
    }

    /**
     * Call after it's been added to a view
     */
    function viewDidMount() {
      console.log(_id + ', subview did mount');
    }

    /**
     * Call when unloading and switching views
     */
    function viewWillUnMount() {
      console.log(_id + ', subview will unmount');
      // cache state data to the model, will be restored as modelData on next show
      _emitter.publish(_appEvents.SUBVIEW_STORE_DATA, {id: _id, data:_currentState});
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

    exports.initialize = initialize;
    exports.update = update;
    exports.render = render;
    exports.getID = getID;
    exports.getDOMElement = getDOMElement;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnMount = viewWillUnMount;

  });