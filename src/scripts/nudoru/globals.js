// Avoid `console` errors in browsers that lack a console. (IE9)
//https://github.com/h5bp/html5-boilerplate/blob/master/src/js/plugins.js
(function () {
  var method;
  var noop    = function () {
  };
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
 Handy global functions
 */

function existy(x) {
  return x != null;
}

function truthy(x) {
  return (x !== false) && existy(x);
}

function falsey(x) {
  return !truthy(x);
}

function isFunction(object) {
  return typeof object === "function";
}

function isObject(object) {
  var type = {}.toString;
  return type.call(object) === "[object Object]";
}

function isString(object) {
  var type = {}.toString;
  return type.call(object) === "[object String]";
}

var isArray = Array.isArray || function (object) {
    var type = {}.toString;
    return type.call(object) === "[object Array]";
  };

function isPromise(promise) {
  return promise && typeof promise.then === 'function';
}

function isObservable(observable) {
  return observable && typeof observable.subscribe === 'function';
}

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