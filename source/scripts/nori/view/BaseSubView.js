/**
 * A template for a subview/route controller
 */

define('Nori.View.BaseSubView',
  function (require, module, exports) {

    var _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _initialState,
      _currentState,
      _isMounted = false,
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    /**
     * Initialization
     * @param initObj
     */
    function initialize(initObj) {
      if(!_initObj) {
        _initObj = initObj;
        _id = initObj.id;
        _templateObj = initObj.template;
        _initialState = _currentState = mergeDataSources(initObj);
        render();
      } else {
        update(initObj);
      }

      //console.log('-------------');
      //console.log('Subview: '+_id);
      //console.log('querydata: '+JSON.stringify(initObj.queryData));
      //console.log('modeldata: '+JSON.stringify(initObj.previousStateData));
      //console.log('boundModelData: '+JSON.stringify(initObj.boundModelData));
      //console.log('-------------');

    }

    /**
     * Merge data objects into one for the state object
     * @param dataObj
     * @returns {*}
     */
    function mergeDataSources(dataObj) {
      return _.merge({}, dataObj.previousStateData, dataObj.boundModelData, dataObj.queryData);
    }

    /**
     * Update state and rerender
     * @param dataObj
     * @returns {*}
     */
    function update(dataObj) {
      _currentState = mergeDataSources(dataObj);
      console.log(_id + ', subview update state: '+JSON.stringify(_currentState));
      if(_isMounted) {
        return render();
      }
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      //console.log(_id + ', subview render');

      _html = _templateObj(_currentState);
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

      // cache state data to the model, will be restored as modelData on next show
      _emitter.publish(_appEvents.SUBVIEW_STORE_STATE, {id: _id, data:_currentState});
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