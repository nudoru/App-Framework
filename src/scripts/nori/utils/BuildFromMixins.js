/**
 * Mixes in the modules specified in the custom application object
 * @param customizer
 * @returns {*}
 */

import assignArray from './AssignArray.js';

export default function(customizer) {
  let mixins = customizer.mixins || [];
  mixins.push(customizer);
  return assignArray({}, mixins);
}