define('APP.Model',
  function(require, module, exports) {

  var _self,
    _data,
    _appEvents = require('APP.AppEvents'),
    _eventDispatcher = require('nudoru.events.EventDispatcher');

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;
    _eventDispatcher.publish(_appEvents.MODEL_DATA_WAITING);
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
    _eventDispatcher.publish(_appEvents.MODEL_DATA_READY);
  }

  /**
   * Returns a copy of the data
   * @returns *
   */
  function getData() {
    return _data.slice(0);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------


  exports.initialize = initialize;
  exports.setData = setData;
  exports.getData = getData;

});