/**
 * Merges a collection of objects
 * @param target
 * @param sourceArray
 * @returns {*}
 */

import _ from '../../vendor/lodash.min.js';

export default function (target, sourceArray) {
  return sourceArray.reduce((tgt, mixin) => {
    return _.assign(tgt, mixin);
  }, target);
}