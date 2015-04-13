var ObjectUtils = {
  describeObject: function (obj) {
    $.each(obj, function (index, value) {
      NDebugger.log('DESCRIBE: '+index + ': ' + value);
    });
  },

  dynamicSort: function (property) {
    return function (a, b) {
      return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    };
  },

  searchObjects: function(obj, key, val) {
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
  extend: function(out) {
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

  deepExtend: function(out) {
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

  // From flightjs
  // returns new object representing multiple objects merged together
  // optional final argument is boolean which specifies if merge is recursive
  // original objects are unmodified
  //
  // usage:
  //   var base = {a:2, b:6};
  //   var extra = {b:3, c:4};
  //   merge(base, extra); //{a:2, b:3, c:4}
  //   base; //{a:2, b:6}
  //
  //   var base = {a:2, b:6};
  //   var extra = {b:3, c:4};
  //   var extraExtra = {a:4, d:9};
  //   merge(base, extra, extraExtra); //{a:4, b:3, c:4. d: 9}
  //   base; //{a:2, b:6}
  //
  //   var base = {a:2, b:{bb:4, cc:5}};
  //   var extra = {a:4, b:{cc:7, dd:1}};
  //   merge(base, extra, true); //{a:4, b:{bb:4, cc:7, dd:1}}
  //   base; //{a:2, b:6}

  merge: function(/*obj1, obj2,....deepCopy*/) {
    // unpacking arguments by hand benchmarked faster
    var l = arguments.length,
      args = new Array(l + 1);

    if (l === 0) {
      return {};
    }

    for (var i = 0; i < l; i++) {
      args[i + 1] = arguments[i];
    }

    //start with empty object so a copy is created
    args[0] = {};

    if (args[args.length - 1] === true) {
      //jquery extend requires deep copy as first arg
      args.pop();
      args.unshift(true);
    }

    return $.extend.apply(undefined, args);
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
  //
  //
  basicFactory: function(prototype) {
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
  }

};