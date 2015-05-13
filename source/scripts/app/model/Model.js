APP.createNameSpace('APP.Model');

APP.Model = (function () {
  var _self,
    _data,
    _eventDispatcher = require('nudoru.events.EventDispatcher');

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;
    _eventDispatcher.publish(APP.AppEvents.MODEL_DATA_WAITING);
  }

  //----------------------------------------------------------------------------
  //  Data
  //----------------------------------------------------------------------------

  /**
   * Set the datat for the model
   * @param dataObj
   */
  function setData(dataObj) {
    _data = dataObj;
    _eventDispatcher.publish(APP.AppEvents.MODEL_DATA_READY);
  }

  /**
   * Returns a copy of the data
   * @returns {Blob|ArrayBuffer|Array.<T>|string|*}
   */
  function getData() {
    return _data.slice(0);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    setData: setData,
    getData: getData
  };

}());