/**
 * Return a new Nori class by combining a template and customizer with mixins
 * @param template
 * @param customizer
 * @returns {Function}
 */

import buildFromMixins from './BuildFromMixins.js';
import ObjectAssign from '../../nudoru/util/ObjectAssign.js';

export default function(template, customizer) {
  template = template || {};
  return function factory() {
    return ObjectAssign({}, template, buildFromMixins(customizer));
  };
}