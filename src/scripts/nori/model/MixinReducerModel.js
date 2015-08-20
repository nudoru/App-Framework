/**
 * Mixin for Nori models to add functionality similar to Redux' Reducer and single
 * object state tree concept. Mixin should be composed to nori/model/ApplicationModel
 * during creation of main AppModel
 *
 * https://gaearon.github.io/redux/docs/api/Store.html
 * https://gaearon.github.io/redux/docs/basics/Reducers.html
 *
 * Created 8/13/15
 */

define('nori/model/MixinReducerModel',
  function (require, module, exports) {

    var MixinReducerModel = function () {
      var _this,
          _state,
          _stateReducers      = [],
          _simpleStoreFactory = require('nori/model/SimpleStore'),
          _noriEventConstants = require('nori/events/EventConstants');

      //----------------------------------------------------------------------------
      //  Accessors
      //----------------------------------------------------------------------------

      function getState() {
        return _state.getState();
      }

      function setState(state) {
        if (!_.isEqual(state, _state)) {
          _state.setState(state);
          _this.notifySubscribers({});
        }
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
        _state = _simpleStoreFactory();

        Nori.dispatcher().registerReceiver(handleApplicationEvents);

        if (!_stateReducers) {
          throw new Error('ReducerModel, must set a reducer before initialization');
        }

        applyReducers({});
      }

      /**
       * Will receive "firehose" of all events that occur in the application. These
       * are sent to all reducers to update the state
       * @param eventObject
       */
      function handleApplicationEvents(eventObject) {
        //console.log('ReducerModel Event occurred: ', eventObject);
        if (eventObject.type === _noriEventConstants.MODEL_STATE_CHANGED || eventObject.type === _noriEventConstants.MODEL_DATA_CHANGED) {
          return;
        }
        applyReducers(eventObject);
      }

      function applyReducers(eventObject) {
        var nextState = applyReducersToState(getState(), eventObject);
        setState(nextState);
        _this.handleStateMutation();
      }

      /**
       * API hook to handle state updates
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
      //function templateReducerFunction(state, event) {
      //  state = state || {};
      //  switch (event.type) {
      //    case _noriEventConstants.MODEL_DATA_CHANGED:
      //      // can compose other reducers
      //      // return _.assign({}, state, otherStateTransformer(state));
      //      return _.assign({}, state, {prop: event.payload.value});
      //    default:
      //      return state;
      //  }
      //}

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeReducerModel : initializeReducerModel,
        getState               : getState,
        setState               : setState,
        handleApplicationEvents: handleApplicationEvents,
        setReducers            : setReducers,
        addReducer             : addReducer,
        applyReducers          : applyReducers,
        applyReducersToState   : applyReducersToState,
        handleStateMutation    : handleStateMutation
      };

    };

    module.exports = MixinReducerModel();

  });