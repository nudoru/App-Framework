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

var noop = function () {
};

// Avoid 'console' errors in browsers that lack a console. (IE9)
//https://github.com/h5bp/html5-boilerplate/blob/master/src/js/plugins.js
(function () {
  var method;
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length  = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Handy shortcut from @wesbos
// https://twitter.com/wesbos/status/608341616173182977?t=1&cn=cmVjb3NfbmV0d29ya19kaWdlc3RfdHJpZ2dlcmVk&sig=f7a24e2255087c386d7c42c4bb248beef92d5888&al=1&refsrc=email&iid=d6b56ee25cea45dbb527d448c883ad0a&autoactions=1433905123&uid=13357322&nid=244+590
//var $ = document.querySelector.bind(document);
//var $$ = document.querySelectorAll.bind(document);

/**
 * is checking collection
 */

var is = {
  existy     : function (x) {
    return x != null;
  },
  truthy     : function (x) {
    return (x !== false) && this.existy(x);
  },
  falsey     : function (x) {
    return !this.truthy(x);
  },
  function   : function (object) {
    return typeof object === "function";
  },
  object     : function (object) {
    return Object.prototype.toString.call(object) === "[object Object]";
  },
  objectEmpty: function (object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  },
  string     : function (object) {
    return Object.prototype.toString.call(object) === "[object String]";
  },
  array      : function (object) {
    return Array.isArray(object);
    //return Object.prototype.toString.call(object) === '[object Array]';
  },
  promise    : function (promise) {
    return promise && typeof promise.then === 'function';
  },
  observable : function (observable) {
    return observable && typeof observable.subscribe === 'function';
  },
  element    : function (obj) {
    return typeof HTMLElement === 'object' ?
    obj instanceof HTMLElement || obj instanceof DocumentFragment : //DOM2
    obj && typeof obj === 'object' && obj !== null &&
    (obj.nodeType === 1 || obj.nodeType === 11) &&
    typeof obj.nodeName === 'string';
  }
};

function arrify(a) {
  return Array.prototype.slice.call(a, 0);
}

//https://javascriptweblog.wordpress.com/2010/06/14/dipping-into-wu-js-autocurry/
var autoCurry = (function () {

  var toArray = function toArray(arr, from) {
        return Array.prototype.slice.call(arr, from || 0);
      },

      curry   = function curry(fn /* variadic number of args */) {
        var args = toArray(arguments, 1);
        return function curried() {
          return fn.apply(this, args.concat(toArray(arguments)));
        };
      };

  return function autoCurry(fn, numArgs) {
    numArgs = numArgs || fn.length;
    return function autoCurried() {
      if (arguments.length < numArgs) {
        return numArgs - arguments.length > 0 ?
          autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
            numArgs - arguments.length) :
          curry.apply(this, [fn].concat(toArray(arguments)));
      }
      else {
        return fn.apply(this, arguments);
      }
    };
  };

}());


//https://www.youtube.com/watch?v=m3svKOdZijA&app=desktop
function dot(prop, obj) {
  return obj[prop];
}

//https://www.youtube.com/watch?v=m3svKOdZijA&app=desktop
function Maybe(val) {
  this.val = val;
}
Maybe.prototype.map = function (f) {
  return this.val ? Maybe(f(this.val)) : Maybe(null);
};

//https://www.youtube.com/watch?v=m3svKOdZijA&app=desktop
// Left value is the default if right is null
function Either(left, right) {
  this.left  = left;
  this.right = right;
}
Either.prototype.map = function (f) {
  return this.right ?
    Either(this.left, f(this.right)) :
    Either(f(this.left), null);
};

define('nudoru/core/ArrayUtils',
  function (require, module, exports) {

    var _numberUtils = require('nudoru/core/NumberUtils');

    module.exports = {

      // Reference: http://jhusain.github.io/learnrx/index.html
      mergeAll: function () {
        var results = [];

        this.forEach(function (subArr) {
          subArr.forEach(function (elm) {
            results.push(elm);
          });
        });

        return results;
      },

      // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
      unique: function (arry) {
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
      },

      removeIndex: function (arr, idx) {
        return arr.splice(idx, 1);
      },

      removeItem: function (arr, item) {
        var idx = arr.indexOf(item);
        if (idx > -1) {
          arr.splice(idx, 1);
        }
      },

      rndElement: function (arry) {
        return arry[_numberUtils.rndNumber(0, arry.length - 1)];
      },

      getRandomSetOfElements: function (srcarry, max) {
        var arry = [],
            i    = 0,
            len  = _numberUtils.rndNumber(1, max);

        for (; i < len; i++) {
          arry.push(this.rndElement(srcarry));
        }

        return arry;
      },

      getDifferences: function (arr1, arr2) {
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
      }

    };


  });

define('nudoru/core/NumberUtils',
  function (require, module, exports) {

    module.exports = {

      isInteger: function (str) {
        return (/^-?\d+$/.test(str));
      },

      rndNumber: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      clamp: function (val, min, max) {
        return Math.max(min, Math.min(max, val));
      },

      inRange: function (val, min, max) {
        return val > min && val < max
      },

      distanceTL: function (point1, point2) {
        var xd = (point2.left - point1.left),
            yd = (point2.top - point1.top);
        return Math.sqrt((xd * xd) + (yd * yd));
      }

    };

  });

define('nudoru/core/ObjectUtils',
  function (require, module, exports) {

    module.exports = {

      /**
       * Test for
       * Object {"": undefined}
       * Object {undefined: undefined}
       * @param obj
       * @returns {boolean}
       */
      isNull: function (obj) {
        var isnull = false;

        if (is.falsey(obj)) {
          return true;
        }

        for (var prop in obj) {
          if (prop === undefined || obj[prop] === undefined) isnull = true;
          break;
        }

        return isnull;
      },

      dynamicSort: function (property) {
        return function (a, b) {
          return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        };
      },

      searchObjects: function (obj, key, val) {
        var objects = [];
        for (var i in obj) {
          if (typeof obj[i] === 'object') {
            objects = objects.concat(searchObjects(obj[i], key, val));
          } else if (i === key && obj[key] === val) {
            objects.push(obj);
          }
        }
        return objects;
      },

      getObjectFromString: function (obj, str) {
        var i    = 0,
            path = str.split('.'),
            len  = path.length;

        for (; i < len; i++) {
          obj = obj[path[i]];
        }
        return obj;
      },

      getObjectIndexFromId: function (obj, id) {
        if (typeof obj === "object") {
          for (var i = 0; i < obj.length; i++) {
            if (typeof obj[i] !== "undefined" && typeof obj[i].id !== "undefined" && obj[i].id === id) {
              return i;
            }
          }
        }
        return false;
      },

      // extend and deep extend from http://youmightnotneedjquery.com/
      extend: function (out) {
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
      },

      deepExtend: function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
          var obj = arguments[i];

          if (!obj) {
            continue;
          }

          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (typeof obj[key] === 'object') {
                deepExtend(out[key], obj[key]);
              } else {
                out[key] = obj[key];
              }
            }
          }
        }

        return out;
      },

      /**
       * Simplified implementation of Stamps - http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
       * https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
       *
       * Prototype object requires a methods object, private closures and state is optional
       *
       * @param prototype
       * @returns New object using prototype.methods as source
       */
      basicFactory: function (prototype) {
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
      },

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
      keyMirror: function (obj) {
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
      }

    };

  });

define('nudoru/core/StringUtils',
  function (require, module, exports) {

    module.exports = {

      capitalizeFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      },

      toTitleCase: function (str) {
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
      },

      removeTags: function (str) {
        return str.replace(/(<([^>]+)>)/ig, '');
      },

      ellipses: function (len) {
        return (this.length > len) ? this.substr(0, len) + "..." : this;
      }

    };

  });