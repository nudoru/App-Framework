/**
 * https://github.com/NV/objectDiff.js
 */

var objectDiff = typeof exports != 'undefined' ? exports : {};

/**
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
objectDiff.diff = function diff(a, b) {

  if (a === b) {
    return {
      changed: 'equal',
      value: a
    }
  }

  var value = {};
  var equal = true;

  for (var key in a) {
    if (key in b) {
      if (a[key] === b[key]) {
        value[key] = {
          changed: 'equal',
          value: a[key]
        }
      } else {
        var typeA = typeof a[key];
        var typeB = typeof b[key];
        if (a[key] && b[key] && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function')) {
          var valueDiff = diff(a[key], b[key]);
          if (valueDiff.changed == 'equal') {
            value[key] = {
              changed: 'equal',
              value: a[key]
            }
          } else {
            equal = false;
            value[key] = valueDiff;
          }
        } else {
          equal = false;
          value[key] = {
            changed: 'primitive change',
            removed: a[key],
            added: b[key]
          }
        }
      }
    } else {
      equal = false;
      value[key] = {
        changed: 'removed',
        value: a[key]
      }
    }
  }

  for (key in b) {
    if (!(key in a)) {
      equal = false;
      value[key] = {
        changed: 'added',
        value: b[key]
      }
    }
  }

  if (equal) {
    return {
      changed: 'equal',
      value: a
    }
  } else {
    return {
      changed: 'object change',
      value: value
    }
  }
};


/**
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
objectDiff.diffOwnProperties = function diffOwnProperties(a, b) {

  if (a === b) {
    return {
      changed: 'equal',
      value: a
    }
  }

  var diff = {};
  var equal = true;
  var keys = Object.keys(a);

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    if (b.hasOwnProperty(key)) {
      if (a[key] === b[key]) {
        diff[key] = {
          changed: 'equal',
          value: a[key]
        }
      } else {
        var typeA = typeof a[key];
        var typeB = typeof b[key];
        if (a[key] && b[key] && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function')) {
          var valueDiff = diffOwnProperties(a[key], b[key]);
          if (valueDiff.changed == 'equal') {
            diff[key] = {
              changed: 'equal',
              value: a[key]
            }
          } else {
            equal = false;
            diff[key] = valueDiff;
          }
        } else {
          equal = false;
          diff[key] = {
            changed: 'primitive change',
            removed: a[key],
            added: b[key]
          }
        }
      }
    } else {
      equal = false;
      diff[key] = {
        changed: 'removed',
        value: a[key]
      }
    }
  }

  keys = Object.keys(b);

  for (i = 0, length = keys.length; i < length; i++) {
    key = keys[i];
    if (!a.hasOwnProperty(key)) {
      equal = false;
      diff[key] = {
        changed: 'added',
        value: b[key]
      }
    }
  }

  if (equal) {
    return {
      value: a,
      changed: 'equal'
    }
  } else {
    return {
      changed: 'object change',
      value: diff
    }
  }
};