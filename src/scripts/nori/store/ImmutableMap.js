/* @flow weak */

/**
 * Wraps Immutable.js's OrderedMap in the same syntax as the SimpleStore module
 *
 * View Docs http://facebook.github.io/immutable-js/docs/#/Map
 */

import Immutable from '../../vendor/immutable.min.js';
import _ from '../../vendor/lodash.min.js';

let ImmutableMap = function () {
  let _map = Immutable.Map();

  /**
   * Returns the Map object
   * @returns {*}
   */
  function getMap() {
    return _map;
  }

  /**
   * Return a copy of the state
   * @returns {void|*}
   */
  function getState() {
    return _map.toJS();
  }

  /**
   * Sets the state
   * @param next
   */
  function setState(next) {
    //let c = getState(),
    //    d = _.assign({}, c, next);
    //
    //_map  = immutable.Map(immutable.fromJS(d));
    _map = _map.merge(next);
  }

  function toJSON() {
    return JSON.stringify(getState());
  }

  function fromJSON(data) {
    try {
      setState(JSON.parse(data));
    } catch (e) {
      console.warn('Nori, ImmutableMap, could not parse JSON');
      setState({});
    }
  }

  return {
    getState: getState,
    setState: setState,
    getMap  : getMap,
    toJSON  : toJSON,
    fromJSON: fromJSON
  };

};

export default ImmutableMap;