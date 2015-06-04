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
 * Gets a defined module. Since it's cached, it's a singleton
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
    throw new Error('Require: module not found: "'+id+'"');
  }

  // TODO set scope to exports instead of moduleCode?
  moduleCode.call(moduleCode, require, module, exports);
  require.cache[id] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);

/**
 * Gets a defined module with no caching
 *
 * @param id
 * @returns {{}|exports}
 */
function requireUnique(id) {
  var moduleCode = define.cache[id],
    exports = {},
    module = {exports: exports};

  if(!moduleCode) {
    throw new Error('requireUnique: module not found: "'+id+'"');
  }

  moduleCode.call(moduleCode, require, module, exports);
  return module.exports;
}

/**
 * Gets a defined module with no caching and extends it
 * @param protoProps
 * @param staticProps
 * @returns {*}
 */
function requireExtend(id, extendProps) {
  var moduleCode = define.cache[id],
    exports = {},
    module = {exports: exports};

  if(!moduleCode) {
    throw new Error('requireUnique: module not found: "'+id+'"');
  }

  moduleCode.call(moduleCode, require, module, exports);
  _.assign(module.exports, extendProps);
  return module.exports;
};define('nudoru.utils.ArrayUtils',
  function (require, module, exports) {

    var _numberUtils = require('nudoru.utils.NumberUtils');

    exports.isArray = function(test) {
      return Object.prototype.toString.call(test) === "[object Array]";
    };

    // Reference: http://jhusain.github.io/learnrx/index.html
    exports.mergeAll = function () {
      var results = [];

      this.forEach(function (subArr) {
        subArr.forEach(function (elm) {
          results.push(elm);
        });
      });

      return results;
    };

    // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
    exports.unique = function (arry) {
      var o = {},
        i,
        l = arry.length,
        r = [];
      for (i = 0; i < l; i += 1) {
        o[arry[i]] = arry[i];
      }
      for (i in o) {
        r.push(o[i]);
      }
      return r;
    };

    exports.removeIndex = function (arr, idx) {
      return arr.splice(idx, 1);
    };

    exports.removeItem = function (arr, item) {
      var idx = arr.indexOf(item);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    };

    exports.rndElement = function (arry) {
      return arry[_numberUtils.rndNumber(0, arry.length - 1)];
    };

    exports.getRandomSetOfElements = function (srcarry, max) {
      var arry = [],
        i = 0,
        len = _numberUtils.rndNumber(1, max);

      for (; i < len; i++) {
        arry.push(this.rndElement(srcarry));
      }

      return arry;
    };

    exports.getDifferences = function (arr1, arr2) {
      var dif = [];

      arr1.forEach(function (value) {
        var present = false,
          i = 0,
          len = arr2.length;

        for (; i < len; i++) {
          if (value === arr2[i]) {
            present = true;
            break;
          }
        }

        if (!present) {
          dif.push(value);
        }

      });

      return dif;
    };

  });;define('nudoru.utils.NumberUtils',
  function (require, module, exports) {

    exports.isInteger = function (str) {
      return (/^-?\d+$/.test(str));
    };

    exports.rndNumber = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    exports.clamp = function (val, min, max) {
      return Math.max(min, Math.min(max, val));
    };

    exports.inRange = function (val, min, max) {
      return val > min && val < max
    };

    exports.distanceTL = function (point1, point2) {
      var xd = (point2.left - point1.left),
        yd = (point2.top - point1.top);

      return Math.sqrt((xd * xd) + (yd * yd));
    };

  });;define('nudoru.utils.ObjectUtils',
  function(require, module, exports) {

    exports.dynamicSort = function (property) {
      return function (a, b) {
        return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      };
    };

    exports.searchObjects = function(obj, key, val) {
      var objects = [];
      for (var i in obj) {
        if (typeof obj[i] === 'object') {
          objects = objects.concat(searchObjects(obj[i], key, val));
        } else if (i === key && obj[key] === val) {
          objects.push(obj);
        }
      }
      return objects;
    };

    exports.getObjectFromString = function (obj, str) {
      var i = 0,
        path = str.split('.'),
        len = path.length;

      for (; i < len; i++) {
        obj = obj[path[i]];
      }
      return obj;
    };

    exports.getObjectIndexFromId = function (obj, id) {
      if (typeof obj === "object") {
        for (var i = 0; i < obj.length; i++) {
          if (typeof obj[i] !== "undefined" && typeof obj[i].id !== "undefined" && obj[i].id === id) {
            return i;
          }
        }
      }
      return false;
    };

    // extend and deep extend from http://youmightnotneedjquery.com/
    exports.extend = function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            out[key] = arguments[i][key];
          }
        }
      }

      return out;
    };

    exports.deepExtend = function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if (!obj) {
          continue;
        }

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              exports.deepExtend(out[key], obj[key]);
            } else {
              out[key] = obj[key];
            }
          }
        }
      }

      return out;
    };

    /**
     * Simplified implementation of Stamps - http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
     * https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
     *
     * Prototype object requires a methods object, private closures and state is optional
     *
     * @param prototype
     * @returns New object using prototype.methods as source
     */
    exports.basicFactory = function(prototype) {
      var proto = prototype,
        obj = Object.create(proto.methods);

      if(proto.hasOwnProperty('closure')) {
        proto.closures.forEach(function(closure) {
          closure.call(obj);
        });
      }

      if(proto.hasOwnProperty('state')) {
        for(var key in proto.state) {
          obj[key] = proto.state[key];
        }
      }

      return obj;
    };

  });
;define('nudoru.utils.StringUtils',
  function(require, module, exports){

    exports.capitalizeFirstLetter = function(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };

    exports.toTitleCase = function(str) {
      return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    };

    exports.removeTags = function(str) {
      return str.replace(/(<([^>]+)>)/ig, '');
    };

    exports.ellipses = function(len) {
      return (this.length > len) ? this.substr(0, len) + "..." : this;
    };

  });;var NNameSpace = {
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

/**
 * Simplify usage of namespaced code but creating local vars. Eval is use for
 * simplicity.
 *
 * Usage:
 * NImport(this, ['nudoru.utils.NLorem']);
 * console.log('lorem: '+this.NLorem.getText(3,5));
 *
 * @param context object to add the property to
 * @param libArry array of name spaced objects
 */
//function NImport(context, libArry) {
//  libArry.forEach(function(lib) {
//    var parts = lib.split('.'),
//      obj = parts[parts.length-1];
//    context[obj] = eval(lib);
//  });
//}


