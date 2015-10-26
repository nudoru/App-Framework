/* @flow weak */

import _ from '../../vendor/lodash.min.js';

export default function () {
  let _internalState = Object.create(null);

  /**
   * Return a copy of the state
   * @returns {void|*}
   */
  function getState() {
    return _.assign({}, _internalState);
  }

  /**
   * Sets the state
   * @param nextState
   */
  function setState(nextState) {
    _internalState = _.assign({}, _internalState, nextState);
  }

  function toJSON() {
    return JSON.stringify(getState());
  }

  function fromJSON(data) {
    try {
      setState(JSON.parse(data));
    } catch (e) {
      console.warn('Nori, SimpleStore, could not parse JSON');
      setState({});
    }
  }

  return {
    getState,
    setState,
    toJSON,
    fromJSON
  };

}