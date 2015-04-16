define('nudoru.utils.ObjectUtils',
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
              deepExtend(out[key], obj[key]);
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
