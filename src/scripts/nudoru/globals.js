/**
 Handy global functions
 */

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