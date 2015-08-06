/**
 * Typically modules would be in separate files and smushed together with a build
 * tools like Webpack or Browserify. I'm maintaining my own concat with Grunt so
 * all of the modules will be in a file already.
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

/**
 * Gets a defined module with no caching
 *
 * @param id
 * @returns {{}|exports}
 */
function requireNew(id) {
  var moduleCode = define.cache[id],
      exports    = {},
      module     = {exports: exports};

  if (!moduleCode) {
    throw new Error('requireNew: module not found: "' + id + '"');
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
      exports    = {},
      module     = {exports: exports};

  if (!moduleCode) {
    throw new Error('requireNew: module not found: "' + id + '"');
  }

  moduleCode.call(moduleCode, require, module, exports);
  _.assign(module.exports, extendProps);
  return module.exports;
}

// from: https://github.com/funjs/book-source/blob/master/chapter01.js

function existy(x) {
  return x != null;
}

function truthy(x) {
  return (x !== false) && existy(x);
}

function falsey(x) {
  return !truthy(x);
}

define('nudoru/core/ArrayUtils',
  function (require, module, exports) {

    var _numberUtils = require('nudoru/core/NumberUtils');

    module.exports.isArray = function (test) {
      return Object.prototype.toString.call(test) === "[object Array]";
    };

    // Reference: http://jhusain.github.io/learnrx/index.html
    module.exports.mergeAll = function () {
      var results = [];

      this.forEach(function (subArr) {
        subArr.forEach(function (elm) {
          results.push(elm);
        });
      });

      return results;
    };

    // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
    module.exports.unique = function (arry) {
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

    module.exports.removeIndex = function (arr, idx) {
      return arr.splice(idx, 1);
    };

    module.exports.removeItem = function (arr, item) {
      var idx = arr.indexOf(item);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    };

    module.exports.rndElement = function (arry) {
      return arry[_numberUtils.rndNumber(0, arry.length - 1)];
    };

    module.exports.getRandomSetOfElements = function (srcarry, max) {
      var arry = [],
          i    = 0,
          len  = _numberUtils.rndNumber(1, max);

      for (; i < len; i++) {
        arry.push(this.rndElement(srcarry));
      }

      return arry;
    };

    module.exports.getDifferences = function (arr1, arr2) {
      var dif = [];

      arr1.forEach(function (value) {
        var present = false,
            i       = 0,
            len     = arr2.length;

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

  });

define('nudoru/core/NumberUtils',
  function (require, module, exports) {

    module.exports.isInteger = function (str) {
      return (/^-?\d+$/.test(str));
    };

    module.exports.rndNumber = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    module.exports.clamp = function (val, min, max) {
      return Math.max(min, Math.min(max, val));
    };

    module.exports.inRange = function (val, min, max) {
      return val > min && val < max
    };

    module.exports.distanceTL = function (point1, point2) {
      var xd = (point2.left - point1.left),
          yd = (point2.top - point1.top);

      return Math.sqrt((xd * xd) + (yd * yd));
    };

  });

define('nudoru/core/ObjectUtils',
  function (require, module, exports) {

    /**
     * Test for
     * Object {"": undefined}
     * Object {undefined: undefined}
     * @param obj
     * @returns {boolean}
     */
    module.exports.isNull = function (obj) {
      var isnull = false;

      if (falsey(obj)) {
        return true;
      }

      for (var prop in obj) {
        if (prop === undefined || obj[prop] === undefined) isnull = true;
        break;
      }

      return isnull;
    };

    module.exports.dynamicSort = function (property) {
      return function (a, b) {
        return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      };
    };

    module.exports.searchObjects = function (obj, key, val) {
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

    module.exports.getObjectFromString = function (obj, str) {
      var i    = 0,
          path = str.split('.'),
          len  = path.length;

      for (; i < len; i++) {
        obj = obj[path[i]];
      }
      return obj;
    };

    module.exports.getObjectIndexFromId = function (obj, id) {
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
    module.exports.extend = function (out) {
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

    module.exports.deepExtend = function (out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if (!obj) {
          continue;
        }

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              module.exports.deepExtend(out[key], obj[key]);
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
    module.exports.basicFactory = function (prototype) {
      var proto = prototype,
          obj   = Object.create(proto.methods);

      if (proto.hasOwnProperty('closure')) {
        proto.closures.forEach(function (closure) {
          closure.call(obj);
        });
      }

      if (proto.hasOwnProperty('state')) {
        for (var key in proto.state) {
          obj[key] = proto.state[key];
        }
      }

      return obj;
    };

    /**
     * Copyright 2013-2014 Facebook, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */
    /**
     * Constructs an enumeration with keys equal to their value.
     *
     * https://github.com/STRML/keymirror
     *
     * For example:
     *
     *   var COLORS = keyMirror({blue: null, red: null});
     *   var myColor = COLORS.blue;
     *   var isColorValid = !!COLORS[myColor];
     *
     * The last line could not be performed if the values of the generated enum were
     * not equal to their keys.
     *
     *   Input:  {key1: val1, key2: val2}
     *   Output: {key1: key1, key2: key2}
     *
     * @param {object} obj
     * @return {object}
     */
    module.exports.keyMirror = function (obj) {
      var ret = {};
      var key;
      if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('keyMirror(...): Argument must be an object.');
      }
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = key;
        }
      }
      return ret;
    };

  });


define('nudoru/core/StringUtils',
  function (require, module, exports) {

    module.exports.capitalizeFirstLetter = function (str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };

    module.exports.toTitleCase = function (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    };

    module.exports.removeTags = function (str) {
      return str.replace(/(<([^>]+)>)/ig, '');
    };

    module.exports.ellipses = function (len) {
      return (this.length > len) ? this.substr(0, len) + "..." : this;
    };

  });