/*******************************************************************************
 * Namespace creation utility function
 *
 * From
 * http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
 *
 * @type {{createNameSpace: Function}}
 ******************************************************************************/
var NNameSpace = {
  createNameSpace: function(ns_string, parent, parentStr) {
    var parts = ns_string.split('.'),
      len;

    if(parts[0] === parentStr) {
      parts = parts.slice(1);
    }

    len = parts.length;

    for(var i=0 ;i<len; i++) {
      var moduleName = parts[i];
      if(typeof parent[moduleName] === 'undefined') {
        parent[moduleName] = {};
      }
      parent = parent[moduleName];
    }

    return parent;
  }
};

/*******************************************************************************
 * Simplify usage of namespaced code but creating local vars. Eval is use for
 * simplicity.
 *
 * Usage:
 * NImport(this, ['nudoru.utils.NLorem']);
 * console.log('lorem: '+this.NLorem.getText(3,5));
 *
 * @param context object to add the property to
 * @param libArry array of name spaced objects
 ******************************************************************************/
function NImport(context, libArry) {
  libArry.forEach(function(lib) {
    var parts = lib.split('.'),
      obj = parts[parts.length-1];
    context[obj] = eval(lib);
  });
}

/*******************************************************************************
 * Module management. Inspired by CommonJS and AMD
 *
 * Based on
 * http://eloquentjavascript.net/10_modules.html
 * http://benclinkinbeard.com/posts/how-browserify-works/
 *
 ******************************************************************************/

/**
 * Typically modules would be in separate files and smushed together with a build
 * tools like Webpack or Browserify. I'm maintaining my own concat with Grunt so
 * all of the modules will be in a file already.
 * This establishes a object map and look up system.
 *
 * Example:
 *  define('moduleID',
 *    function(require, module, exports){
 *       exports.method = function(str) {
 *         //
 *       };
  *  });
 *
 *
 * @param id
 * @param moduleCode
 */
function define(id, moduleCode) {
  if(id in define.cache) {
    return;
  }
  define.cache[id] = moduleCode;
}
define.cache = Object.create(null);


/**
 * To require, it must have been mapped in the module map
 *
 * Refer to this later
 * https://github.com/substack/browser-pack/blob/d29fddc8a9207d5f967664935073b50971aff708/prelude.js
 *
 * @param id
 * @returns {*}
 */
function require(id) {
  if (id in require.cache) {
    return require.cache[id];
  }

  var moduleCode = define.cache[id],
      exports = {},
      module = {exports: exports};

  if(!moduleCode) {
    console.log('Require: module not found: "'+id+'"');
    return;
  }

  // set scope to exports instead of moduleCode? browserify does ...
  moduleCode.call(moduleCode, require, module, exports);
  require.cache[id] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);

function NImportNSModules(context, libArry) {
  libArry.forEach(function(lib) {
    var parts = lib.split('.'),
      obj = parts[parts.length-1];
    context[obj] = require(lib);
  });
}

/*******************************************************************************
 * Establish the nudoru namespace
 ******************************************************************************/

var nudoru = {};

nudoru = (function() {
  function createNameSpace(str) {
    return NNameSpace.createNameSpace(str, nudoru, 'nudoru');
  }

  return {
    createNameSpace: createNameSpace
  };
}());

nudoru.createNameSpace('nudoru.events');
nudoru.events = (function() {
  //
}());

nudoru.createNameSpace('nudoru.utils');
nudoru.utils = (function() {
  //
}());

nudoru.createNameSpace('nudoru.components');
nudoru.components = (function() {
  //
}());


