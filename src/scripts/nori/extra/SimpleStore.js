/* @flow weak */

import ObjectAssign from '../../nudoru/util/ObjectAssign.js';

export default function () {
  let _internalState = Object.create(null);

  /**
   * Return a copy of the state
   */
  function getState() {
    return ObjectAssign({}, _internalState);
  }

  /**
   * Returns the full state object
   */
  function dangerousGetState() {
    return _internalState;
  }

  /**
   * Prevent future changes to state
   */
  function freeze() {
    Object.freeze(_internalState);
  }

  /**
   * Sets the state
   * @param nextState
   */
  function setState(nextState) {
    _internalState = ObjectAssign({}, _internalState, nextState);
  }

  function toJSON() {
    return JSON.stringify(getState());
  }

  function fromJSON(data) {
    try {
      setState(JSON.parse(data));
    } catch (e) {
      console.warn('SimpleStore, could not parse JSON');
      setState({});
    }
  }

  return {
    getState,
    setState,
    dangerousGetState,
    freeze,
    toJSON,
    fromJSON
  };

}