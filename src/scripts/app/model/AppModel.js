define('app/model/AppModel',
  function (require, module, exports) {

    var _this,
        _state              = Object.create(null),// Basic applicaiton state, could be a Map or a MapCollection
        _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getState() {
      return _.assign({}, _state);
    }

    function setState(nextState) {
      _state = nextState;
    }

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;
      Nori.dispatcher().registerReceiver(receiveEvents);

      testReducerIdea();

      // load data and then dispatch this
      _noriEvents.applicationModelInitialized();
    }

    /**
     * Will receive "firehose" of all events that occur
     * @param eventObject
     */
    function receiveEvents(eventObject) {
      //console.log('Event occured: ',eventObject);
      // setState(reducerFunction(getCurrentState(), eventObject));
    }

    function testReducerIdea() {
      var _stateReducers = [],
          _myState       = {someProp: 'important'};

      function reducer(state, event) {
        state = state || {}; // default value
        console.log('reduce', state, event);
        switch (event.type) {
          case 'DO_THE_THING':
            return _.assign({}, state, {prop: event.payload});
          default:
            return state;
        }
      }

      function combineReducers(reducerArray) {
        _stateReducers = reducerArray;
      }

      function update(state, event) {
        state = state || {};
        _stateReducers.forEach(function (reducerFunc) {
          state = reducerFunc(state, event);
        });
        return state;
      }

      combineReducers([reducer, reducer, reducer]);

      _myState = update(_myState, {type: 'DO_THE_THING', payload: 'test'});
      console.log(_myState);
    }

    /**
     * Experimental reducer function based on Redux
     * Model state isn't modified, current state is passed in and mutated state returned
     * https://gaearon.github.io/redux/docs/basics/Reducers.html
     */

    function reducerFunction(state, event) {
      state = state || {}; // default value

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
    module.exports.getState   = getState;
  });
