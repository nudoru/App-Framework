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
 *  define('moduleID',
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
function define(id, moduleCode) {
  if (id in define.cache) {
    return;
  }
  define.cache[id] = moduleCode;
}
define.cache = Object.create(null);


/**
 * Gets a defined module. Since it's cached, it's a singleton
 * @param id
 * @returns {*}
 */
function require(id) {
  if (id in require.cache) {
    return require.cache[id];
  }

  var moduleCode    = define.cache[id],
      exports       = {},
      module        = {exports: exports};

  if (!moduleCode) {
    throw new Error('Require: module not found: "' + id + '"');
  }

  moduleCode.call(moduleCode, require, module, exports);
  require.cache[id] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);