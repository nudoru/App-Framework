/* @flow weak */

/**
 * Store modeled after Redux
 */

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import _ from '../../vendor/lodash.min.js';
import Is from '../../nudoru/util/is.js';
import ImmutableStoreFactory from './ImmutableStore.js';

let ReducerStore = function () {
  let _this,
      _isReducing    = false,
      _queue         = [],
      _stateObject   = ImmutableStoreFactory(),
      _stateReducers = [],
      _subject       = new Rxjs.Subject();

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  /**
   * _stateObject might not exist if subscribers are added before this store is initialized
   */
  function getState() {
    return _stateObject.getState();
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
      _queue = _queue.concat(actionObjOrArry);
    } else {
      _queue.push(actionObjOrArry);
    }

    processActionQueue(getState());
  }

  function processActionQueue(state) {
    while (_queue.length) {
      let actionObject = _queue.shift();
      applyReducers(state, actionObject);
    }
  }

  function applyReducers(state, actionObject) {
    if (typeof actionObject.type === 'undefined') {
      console.warn('Reducer store, cannot apply undefined action type');
      return;
    }
    let nextState = applyReducersToState(state, actionObject);
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
    let nextState;

    // TODO {} or this.getDefaultState()?
    state = state || {};

    try {
      nextState = _stateReducers.reduce((nextState, reducerFunc) => reducerFunc(nextState, action), state);
    } catch (e) {
      console.warn('Reducer store, error applying reducers', e);
      nextState = state;
    }

    return nextState;
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

  function subscribe(handler) {
    return _subject.subscribe(handler);
  }

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