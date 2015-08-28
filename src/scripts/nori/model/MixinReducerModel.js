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
          _stateReducers       = [],
          _noriActionConstants = require('nori/action/ActionConstants');

      //----------------------------------------------------------------------------
      //  Accessors
      //----------------------------------------------------------------------------

      /**
       * _state might not exist if subscribers are added before this model is initialized
       */
      function getState() {
        if (_state) {
          return _state.getState();
        }
        return {};
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
        if (!this.createSubject) {
          console.warn('nori/model/MixinReducerModel needs nori/utils/MixinObservableSubject to notify');
        }

        var simpleStoreFactory = require('nori/model/SimpleStore');

        _this  = this;
        _state = simpleStoreFactory();

        if (!_stateReducers) {
          throw new Error('ReducerModel, must set a reducer before initialization');
        }

        // Set initial state from empty event
        applyReducers({});
      }

      /**
       * Apply the action object to the reducers to change state
       * are sent to all reducers to update the state
       * @param actionObject
       */
      function apply(actionObject) {
        //console.log('ReducerModel Apply: ', actionObject);
        applyReducers(actionObject);
      }

      function applyReducers(actionObject) {
        var nextState = applyReducersToState(getState(), actionObject);
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
       * Creates a new state from the combined reduces and action object
       * Model state isn't modified, current state is passed in and mutated state returned
       * @param state
       * @param action
       * @returns {*|{}}
       */
      function applyReducersToState(state, action) {
        state = state || {};
        // TODO should this actually use array.reduce()?
        _stateReducers.forEach(function applyStateReducerFunction(reducerFunc) {
          state = reducerFunc(state, action);
        });
        return state;
      }

      /**
       * Template reducer function
       * Model state isn't modified, current state is passed in and mutated state returned

       function templateReducerFunction(state, event) {
        state = state || {};
        switch (event.type) {
          case _noriActionConstants.MODEL_DATA_CHANGED:
            // can compose other reducers
            // return _.assign({}, state, otherStateTransformer(state));
            return _.assign({}, state, {prop: event.payload.value});
          default:
            return state;
        }
      }
       */

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeReducerModel: initializeReducerModel,
        getState              : getState,
        setState              : setState,
        apply                 : apply,
        setReducers           : setReducers,
        addReducer            : addReducer,
        applyReducers         : applyReducers,
        applyReducersToState  : applyReducersToState,
        handleStateMutation   : handleStateMutation
      };

    };

    module.exports = MixinReducerModel();

  });