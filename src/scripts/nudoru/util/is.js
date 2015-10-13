export default {
  existy     : function (x) {
    return x !== null;
  },
  truthy     : function (x) {
    return (x !== false) && this.existy(x);
  },
  falsey     : function (x) {
    return !this.truthy(x);
  },
  func       : function (object) {
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