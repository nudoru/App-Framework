/* @flow weak */

/**
 * Mixin for Nori stores to add functionality similar to Redux' Reducer and single
 * object state tree concept. Mixin should be composed to nori/store/ApplicationStore
 * during creation of main AppStore
 *
 * https://gaearon.github.io/redux/docs/api/Store.html
 * https://gaearon.github.io/redux/docs/basics/Reducers.html
 *
 * Created 8/13/15
 */

import is from '../../nudoru/util/is.js';
import _stateObjFactory from './SimpleStore.js';
import _immutableMapFactory from './ImmutableMap.js';

let MixinReducerStore = function () {
  let _this,
      _state,
      _stateReducers = [];

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  /**
   * _state might not exist if subscribers are added before this store is initialized
   */
  function getState() {
    if (_state) {
      return _state.getState();
    }
    return {};
  }

  /**
   * Set the state of the store. Will default to initial state shape returned from
   * initialState() function. Will only update the state if it's not equal to
   * current
   * @param nextstate
   */
  function setState(nextstate = this.initialState()) {
    if (!_.isEqual(nextstate, getState())) {
      _state.setState(nextstate);
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
  function initializeReducerStore() {
    if (!this.createSubject) {
      console.warn('nori/store/MixinReducerStore needs nori/utils/MixinObservableSubject to notify');
    }

    _this = this;
    //_state = _stateObjFactory();
    _state = _immutableMapFactory();

    //if (!_stateReducers) {
    //  throw new Error('ReducerStore, must set a reducer before initialization');
    //}
    // Set initial state from empty event
    //applyReducers({});
  }

  function initialState() {
    return {};
  }

  /**
   * Apply the action object to the reducers to change state
   * are sent to all reducers to update the state
   * @param actionObjOrArry Array of actions or a single action to reduce from
   */
  function apply(actionObjOrArry) {
    if (is.array(actionObjOrArry)) {
      actionObjOrArry.forEach(actionObj => applyReducers(actionObj));
    } else {
      applyReducers(actionObjOrArry);
    }
  }

  function applyReducers(actionObject) {
    let nextState = applyReducersToState(getState(), actionObject);
    setState(nextState);
  }

  /**
   * Creates a new state from the combined reduces and action object
   * Store state isn't modified, current state is passed in and mutated state returned
   * @param state
   * @param action
   * @returns {*|{}}
   */
  function applyReducersToState(state, action) {
    state = state || {};
    return _stateReducers.reduce((nextState, reducerFunc) => reducerFunc(nextState, action), state);
  }

  /**
   * Template reducer function
   * Store state isn't modified, current state is passed in and mutated state returned
   function templateReducerFunction(state, event) {
        state = state || {};
        switch (event.type) {
          case _noriActionConstants.MODEL_DATA_CHANGED:
            // can compose other reducers
            // return _.merge({}, state, otherStateTransformer(state));
            return _.merge({}, state, {prop: event.payload.value});
          case undefined:
            return state;
          default:
            console.warn('Reducer store, unhandled event type: '+event.type);
            return state;
        }
      }
   */

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeReducerStore: initializeReducerStore,
    initialState          : initialState,
    getState              : getState,
    setState              : setState,
    apply                 : apply,
    setReducers           : setReducers,
    addReducer            : addReducer,
    applyReducers         : applyReducers,
    applyReducersToState  : applyReducersToState
  };

};

export default MixinReducerStore();