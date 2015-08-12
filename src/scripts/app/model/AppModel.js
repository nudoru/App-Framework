define('app/model/AppModel',
  function (require, module, exports) {

    var _this,
        _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;
      Nori.dispatcher().registerReceiver(receiveEvents);

      _noriEvents.applicationModelInitialized();
    }

    /**
     * Will receive "firehose" of all events that occur
     * @param eventObject
     */
    function receiveEvents(eventObject) {
      //console.log('Event occured: ',eventObject);
      // newState = reducerFunction(getCurrentState(), eventObject);
    }

    /**
     * Experimental reducer function based on Redux
     * https://gaearon.github.io/redux/docs/basics/Reducers.html
     */

    function reducerFunction(state, event) {
      switch (event.type) {
        case _noriEventConstants.MODEL_DATA_CHANGED:
          return _.assign({}, state, {prop: event.payload.value});
        default:
          return state;
      }
    }

    //----------------------------------------------------------------------------
    //  Utility
    //----------------------------------------------------------------------------

    /**
     * Utility function
     * @param obj
     * @returns {*}
     */
    function getLocalStorageObject(obj) {
      return localStorage[obj];
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;
  });
