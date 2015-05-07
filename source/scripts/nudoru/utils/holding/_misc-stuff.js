/*
Collections of useful things

Possible sources:
  http://stackoverflow.com/questions/472644/javascript-collection-of-one-line-useful-functions
 http://stackoverflow.com/questions/724826/javascript-tips-and-tricks-javascript-best-practices
  https://code.google.com/p/jslibs/wiki/JavascriptTips
 */

// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
var debounce = function (func, threshold, execAsap) {
  var timeout;

  return function debounced() {
    var obj = this, args = arguments;

    function delayed() {
      if (!execAsap) {
        func.apply(obj, args);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    else if (execAsap){
      func.apply(obj, args);
    }

    timeout = setTimeout(delayed, threshold || 100);
  };
};