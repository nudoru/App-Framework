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