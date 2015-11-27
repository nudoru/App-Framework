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

export default function () {
  let _internalState = {},
      _reducers      = [],
      _subject       = new Rxjs.Subject();

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  const getState = () => {
    return DeepCopy(_internalState);
  };

  const addReducer = (reducer) => {
    if (typeof reducer !== 'function') {
      throw new Error('Reducer must be a function.')
    }
    _reducers.push(reducer);
  };

  //----------------------------------------------------------------------------
  //  Init
  //----------------------------------------------------------------------------

  /**
   * Apply the action object to the reducers to change state
   * are sent to all reducers to update the state
   */
  const apply = (action) => {
    if (!_reducers.length) {
      throw new Error('ReducerStore must have at least one reducer set');
    }

    if (isPlainObject(action)) {
      $applyReducers(action, _internalState);
    } else {
      console.warn('ReducerStore, action must be plain JS object', action);
    }
  };

  /**
   * Creates a new state from the combined reducers and action object
   * Store state isn't modified, current state is passed in and mutated state returned
   */
  const $applyReducers = (action, state = {}) => {
    let nextState= _reducers.reduce((nextState, reducerFunc) => reducerFunc(nextState, action), state);

    if (!DeepEqual(_internalState, nextState)) {
      // Mutate/reassign internal state
      _internalState = nextState;
      notify(action.type, getState());
    }
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
    getState,
    apply,
    addReducer,
    subscribe,
    notify
  };

}