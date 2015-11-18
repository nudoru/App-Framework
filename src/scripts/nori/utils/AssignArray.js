/**
 * Merges a collection of objects
 * @param target
 * @param sourceArray
 * @returns {*}
 */

import ObjectAssign from '../../nudoru/util/ObjectAssign.js';

export default function (target, sourceArray) {
  return sourceArray.reduce((tgt, mixin) => {
    return ObjectAssign(tgt, mixin);
  }, target);
}