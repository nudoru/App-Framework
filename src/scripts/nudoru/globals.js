// Avoid `console` errors in browsers that lack a console. (IE9)
//https://github.com/h5bp/html5-boilerplate/blob/master/src/js/plugins.js
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());


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