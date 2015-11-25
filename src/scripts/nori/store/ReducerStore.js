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
  let _internalState = {},
      _stateReducers = [],
      _subject       = new Rxjs.Subject();

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  const getState = () => {
    return DeepCopy(_internalState);
  };

  const setReducers = (reducerArray) => {
    _stateReducers = reducerArray;
  };

  const addReducer = (reducer) => {
    _stateReducers.push(reducer);
  };

  //----------------------------------------------------------------------------
  //  Init
  //----------------------------------------------------------------------------

  /**
   * Run the the reducers with the default state
   */
  const initializeReducerStore = () => {
    Object.freeze(_internalState);
    apply({});
  };

  /**
   * Apply the action object to the reducers to change state
   * are sent to all reducers to update the state
   */
  const apply = (action) => {
    if (!_stateReducers.length) {
      throw new Error('ReducerStore must have at least one reducer set');
    }

    if (isPlainObject(action)) {
      applyReducers(action, _internalState);
    } else {
      console.warn('ReducerStore, action must be plain JS object', action);
    }
  };

  const applyReducers = (action, state = {}) => {
    let nextState = reduceToNextState(action, state);

    if (!DeepEqual(_internalState, nextState)) {
      _internalState = nextState;
      notify(action.type, getState());
    }
  };

  /**
   * Creates a new state from the combined reducers and action object
   * Store state isn't modified, current state is passed in and mutated state returned
   * @param state
   * @param action
   * @returns {*|{}}
   */
  const reduceToNextState = (action, state) => {
    let nextState;

    try {
      nextState = _stateReducers.reduce((nextState, reducerFunc) => reducerFunc(nextState, action), state);
    } catch (e) {
      console.warn('Reducer store, error applying reducers', e);
      nextState = state;
    }

    return nextState;
  };

  //Template reducer function
  //function templateReducerFunction(state, event) {
  //  state = state || {};
  //  switch (event.type) {
  //    case undefined:
  //      return {}; // Return default state state
  //    case _noriActionConstants.MODEL_DATA_CHANGED:
  //      // can compose other reducers
  //      // return ObjectAssign({}, state, otherStateTransformer(state));
  //      return ObjectAssign({}, state, {prop: event.payload.value});
  //    case undefined:
  //      return state;
  //    default:
  //      console.warn('Reducer store, unhandled event type: ' + event.type);
  //      return state;
  //  }
  //}

  //----------------------------------------------------------------------------
  //  Update events
  //----------------------------------------------------------------------------

  const subscribe = (handler) => {
    return _subject.subscribe(handler);
  };

  const notify = (type, state) => {
    _subject.onNext({type: type, state: state});
  };

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeReducerStore,
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