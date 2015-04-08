//String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};

String.prototype.stripHTMLTags = function() {return this.replace(/<[^>]+>/gi,"");};
String.prototype.ellipses = function(len) {return (this.length > len) ? this.substr(0, len) + "..." : this; };

/**
 * Reference: http://jhusain.github.io/learnrx/index.html
 *
 * @return Array
 */
Array.prototype.mergeAll = function() {
  var results = [];

  this.forEach(function(subArr) {
    subArr.forEach(function(elm) {
      results.push(elm);
    });
  });

  return results;
};