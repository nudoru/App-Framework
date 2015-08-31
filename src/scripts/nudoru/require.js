/*******************************************************************************
 * Module management. Inspired by CommonJS and AMD
 *
 * Based on
 * http://eloquentjavascript.net/10_modules.html
 * http://benclinkinbeard.com/posts/how-browserify-works/
 * https://github.com/substack/browser-pack/blob/d29fddc8a9207d5f967664935073b50971aff708/prelude.js
 *
 ******************************************************************************/

/**
 * This establishes a object map and look up system.
 *
 * Example:
 *  ndefine('moduleID',
 *    function(require, module, exports){
 *       module.exports.method = function(str) {
 *         //
 *       };
  *  });
 *
 *
 * @param id
 * @param moduleCode
 */
function ndefine(id, moduleCode) {
  if (id in ndefine.cache) {
    return;
  }
  ndefine.cache[id] = moduleCode;
}
ndefine.cache = Object.create(null);


/**
 * Gets a defined module. Since it's cached, it's a singleton
 * @param id
 * @returns {*}
 */
function nrequire(id) {
  if (id in nrequire.cache) {
    return nrequire.cache[id];
  }

  var moduleCode    = ndefine.cache[id],
      exports       = {},
      module        = {exports: exports};

  if (!moduleCode) {
    throw new Error('Require: module not found: "' + id + '"');
  }

  moduleCode.call(moduleCode, nrequire, module, exports);
  nrequire.cache[id] = module.exports;
  return module.exports;
}
nrequire.cache = Object.create(null);