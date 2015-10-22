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

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import _ from '../../vendor/lodash.min.js';
import Is from '../../nudoru/util/is.js';
import ImmutableMapFactory from './ImmutableMap.js';

let ReducerStore = function () {
  let _this,
      _stateObject,
      _stateReducers = [],
      _subject       = new Rxjs.Subject();

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  /**
   * _stateObject might not exist if subscribers are added before this store is initialized
   */
  function getState() {
    if (_stateObject) {
      return _stateObject.getState();
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
      _stateObject.setState(nextstate);
      _this.notify({});
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
    _this = this;
    _stateObject = ImmutableMapFactory();
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
    if (Is.array(actionObjOrArry)) {
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
    // TODO should or be this.getDefaultState()?
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
  //  Update events
  //----------------------------------------------------------------------------

  /**
   * Subscribe handler to updates. If the handler is a string, the new subject
   * will be created.
   * @param handler
   * @returns {*}
   */
  function subscribe(handler) {
    return _subject.subscribe(handler);
  }

  /**
   * Dispatch updated to subscribers
   * @param payload
   */
  function notify(payload) {
    _subject.onNext(payload);
  }

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
    applyReducersToState  : applyReducersToState,
    subscribe             : subscribe,
    notify                : notify
  };

};

export default ReducerStore;