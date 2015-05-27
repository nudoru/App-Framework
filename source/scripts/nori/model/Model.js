/**
 * Object.oberve polyfill:
 * https://github.com/MaxArt2501/object-observe/blob/master/doc/index.md
 * http://www.html5rocks.com/en/tutorials/es7/observe/
 */


define('Nori.Model',
  function (require, module, exports) {

    var _data,
      _subviewDataMap = Object.create(null),
      _emitter = require('nudoru.events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _emitter.publish(_appEvents.MODEL_DATA_WAITING);
    }

    //----------------------------------------------------------------------------
    //  Data
    //----------------------------------------------------------------------------

    /**
     * Set the data for the model
     * @param dataObj
     */
    function setData(dataObj) {
      _data = dataObj;
      _emitter.publish(_appEvents.MODEL_DATA_READY);
    }

    /**
     * Returns a copy of the data
     * @returns *
     */
    function getData() {
      return _data.slice(0);
    }

    //----------------------------------------------------------------------------
    //  Subview data
    //----------------------------------------------------------------------------

    /**
     * Store state data from a subview, called from StoreSubViewDataCommand
     * @param id
     * @param dataObj
     */
    function storeSubViewData(id, dataObj) {
      _subviewDataMap[id] = dataObj;
    }

    /**
     * Retrieve subview data for reinsertion, called from APP mapping of route/when()
     * @param id
     * @returns {*|{}}
     */
    function retrieveSubViewData(id) {
      return _subviewDataMap[id] || {};
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------


    exports.initialize = initialize;
    exports.setData = setData;
    exports.getData = getData;
    exports.storeSubViewData = storeSubViewData;
    exports.retrieveSubViewData = retrieveSubViewData;

  });