/**
 * Mixin for Nori models to add functionality similar to Redux' Reducer and single
 * object state tree concept. Mixin should be composed to nori/model/ApplicationModel
 * during creation of main AppModel
 *
 * https://gaearon.github.io/redux/docs/basics/Reducers.html
 *
 * Created 8.13.15
 */

define('nori/model/MixinReducerModel',
  function (require, module, exports) {

    var _this,
        _state              = Object.create(null),// Basic applicaiton state, could be a Map or a MapCollection
        _stateReducers      = [],
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

    function setReducers(reducerArray) {
      _stateReducers = reducerArray;
    }

    function addReducer(reducer) {
      _stateReducers.push(reducer);
    }

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    /**
     * Set up event listener/receiver
     */
    function initializeReducerModel() {
      _this = this;
      Nori.dispatcher().registerReceiver(handleApplicationEvents);

      _this.setState({});
    }

    /**
     * Will receive "firehose" of all events that occur in the application. These
     * are sent to all reducers to update the state
     * @param eventObject
     */
    function handleApplicationEvents(eventObject) {
      console.log('ReducerModel Event occured: ', eventObject);
      var nextState = applyReducersToState(getState(), eventObject);
      setState(nextState);

      _this.handleStateMutation();
    }

    /**
     * API hook to handled state updates
     */
    function handleStateMutation() {
      // override this
    }

    /**
     * Creates a new state from the combined reduces and event object
     * Model state isn't modified, current state is passed in and mutated state returned
     * @param state
     * @param event
     * @returns {*|{}}
     */
    function applyReducersToState(state, event) {
      state = state || {};
      _stateReducers.forEach(function applyStateReducerFunction(reducerFunc) {
        state = reducerFunc(state, event);
      });
      return state;
    }

    /**
     * Template reducer function
     * Model state isn't modified, current state is passed in and mutated state returned
     */

    function templateReducerFunction(state, event) {
      state = state || {};
      switch (event.type) {
        case _noriEventConstants.MODEL_DATA_CHANGED:
          // can compose other reducers
          // return _.assign({}, state, otherStateTransformer(state));
          return _.assign({}, state, {prop: event.payload.value});
        default:
          return state;
      }
    }

    /*
     function testReducerIdea() {
     var ,
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

     function reducerTwo(state, event) {
     state = state || {}; // default value
     console.log('reduce', state, event);
     switch (event.type) {
     case 'DO_THE_THING':
     if (event.payload === 'test') {
     return _.assign({}, state, {propAlso: event.payload});
     } else {
     return _.assign({}, state, {propNope: event.payload});
     }
     default:
     return state;
     }
     }



     setReducers([reducer, reducerTwo, reducer]);

     _myState = applyReducersToState(_myState, {type: 'DO_THE_THING', payload: 'test'});
     console.log(_myState);
     }
     */

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initializeReducerModel  = initializeReducerModel;
    module.exports.getState                = getState;
    module.exports.setState                = setState;
    module.exports.handleApplicationEvents = handleApplicationEvents;
    module.exports.setReducers             = setReducers;
    module.exports.addReducer              = addReducer;
    module.exports.applyReducersToState    = applyReducersToState;
    module.exports.handleStateMutation     = handleStateMutation;


  });