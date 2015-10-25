/* @flow weak */

/**
 * Store modeled after Redux
 */

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import _ from '../../vendor/lodash.min.js';

export default function () {
  let _this,
      _internalState,
      _actionQueue   = [],
      _stateReducers = [],
      _subject       = new Rxjs.Subject();

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getState() {
    return _.assign({}, _internalState);
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
    _this.apply({type:'@@initialize@@'});
  }

  function getDefaultState() {
    return {};
  }

  /**
   * Apply the action object to the reducers to change state
   * are sent to all reducers to update the state
   * @param actionObjOrArry Array of actions or a single action to reduce from
   */
  function apply(actionObjOrArry) {
    if(_stateReducers.length === 0) {
      throw new Error('ReducerStore must have at least one reducer set');
    }

    if (Array.isArray(actionObjOrArry)) {
      _actionQueue = _actionQueue.concat(actionObjOrArry);
    } else {
      _actionQueue.push(actionObjOrArry);
    }

    processActionQueue(_internalState);
  }

  function processActionQueue(state) {
    while (_actionQueue.length) {
      let actionObject = _actionQueue.shift();
      _this.applyReducers(state, actionObject);
    }
  }

  function applyReducers(state, actionObject) {
    if (typeof actionObject.type === 'undefined') {
      console.warn('Reducer store, cannot apply undefined action type');
      return;
    }

    let nextState = _this.reduceToState(actionObject, state);

    if(!_.isEqual(_internalState, nextState)) {
      _internalState = nextState;
      _this.notify();
    }
  }

  /**
   * Creates a new state from the combined reduces and action object
   * Store state isn't modified, current state is passed in and mutated state returned
   * @param state
   * @param action
   * @returns {*|{}}
   */
  function reduceToState(action, state = this.getDefaultState()) {
    let nextState;

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
    initializeReducerStore,
    getDefaultState,
    getState,
    apply,
    setReducers,
    addReducer,
    applyReducers,
    reduceToState,
    subscribe,
    notify
  };

};