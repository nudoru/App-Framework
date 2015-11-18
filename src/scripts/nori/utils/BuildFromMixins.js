/**
 * Mixes in the modules specified in the custom application object
 * @param customizer
 * @returns {*}
 */

import AssignArray from './AssignArray.js';

export default function(customizer) {
  let mixins = customizer.mixins || [];
  mixins.push(customizer);
  return AssignArray({}, mixins);
}