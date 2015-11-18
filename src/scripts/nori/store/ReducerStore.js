/* @flow weak */

/**
 * Store modeled after Redux
 */

import Is from '../../nudoru/util/is.js';
import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import ObjectAssign from '../../nudoru/util/ObjectAssign.js';
import DeepEqual from '../../nudoru/util/DeepEqual.js';
import DeepCopy from '../../nudoru/util/DeepCopy.js';
import isPlainObject from '../../vendor/is-plain-object.min.js';

const STORE_INITIALIZE_TYPE = '$$$initstore$$$';

export default function () {
  let _internalState,
      _stateReducers = [],
      _subject       = new Rxjs.Subject();

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getState() {
    return DeepCopy(_internalState);
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
   * Run the the reducers with the default state
   */
  function initializeReducerStore() {
    this.apply({type: STORE_INITIALIZE_TYPE});
  }

  /**
   * Returns the default state "shape"
   */
  function getDefaultState() {
    return {};
  }

  /**
   * Apply the action object to the reducers to change state
   * are sent to all reducers to update the state
   */
  function apply(action) {
    if(!_stateReducers.length) {
      throw new Error('ReducerStore must have at least one reducer set');
    }

    if(isValidAction(action)) {
      // Apply called as the result of an event/subscription. Fix context back to
      // correct scope
      applyReducers.bind(this)(action, _internalState);
    }
  }

  function isValidAction(action) {
    if(!isPlainObject(action)) {
      console.warn('ReducerStore, action must be plain JS object', action);
      return false;
    }

    if (typeof action.type === 'undefined') {
      console.warn('Reducer store, cannot apply undefined action type');
      return false;
    }

    return true;
  }

  function applyReducers(action, state) {
    state = state || this.getDefaultState();

    let nextState = this.reduceToNextState(action, state);

    // Don't update the state if it's the same
    if (!DeepEqual(_internalState, nextState)) {
      _internalState = nextState;
      this.notify(action.type, this.getState());
    }
  }

  /**
   * Creates a new state from the combined reduces and action object
   * Store state isn't modified, current state is passed in and mutated state returned
   * @param state
   * @param action
   * @returns {*|{}}
   */
  function reduceToNextState(action, state) {
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
            // return ObjectAssign({}, state, otherStateTransformer(state));
            return ObjectAssign({}, state, {prop: event.payload.value});
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

  function notify(type, state) {
    _subject.onNext({type: type, state:state});
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
    reduceToNextState,
    subscribe,
    notify
  };

}