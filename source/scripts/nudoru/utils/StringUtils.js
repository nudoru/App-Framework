//nudoru.createNameSpace('nudoru.utils.StringUtils');
//nudoru.utils.StringUtils = {
//
//  capitalizeFirstLetter: function(str) {
//    return str.charAt(0).toUpperCase() + str.substring(1);
//  },
//
//  toTitleCase: function(str) {
//    return str.replace(/\w\S*/g, function(txt){
//      return txt.charAt(0).toUpperCase() + txt.substr(1);
//    });
//  },
//
//  removeTags: function(str) {
//     return str.replace(/(<([^>]+)>)/ig, '');
//  },
//
//  stripHTMLTags: function() {
//    return this.replace(/<[^>]+>/gi,"");
//  },
//
//  ellipses: function(len) {
//    return (this.length > len) ? this.substr(0, len) + "..." : this;
//  }
//
//
//};

//http://eloquentjavascript.net/10_modules.html
function require(name) {
  if (name in require.cache) {
    return require.cache[name];
  }

  var code = new Function("exports, module", readFile(name));
  var exports = {}, module = {exports: exports};
  code(exports, module);

  require.cache[name] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);




nudoru.createNameSpace('nudoru.utils.StringUtils');
nudoru.utils.StringUtils = {};

(function(require, module, exports){
  exports.capitalizeFirstLetter = function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

  exports.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
  };

  exports.removeTags = function(str) {
    return str.replace(/(<([^>]+)>)/ig, '');
  };

  exports.stripHTMLTags = function() {
    return this.replace(/<[^>]+>/gi,"");
  };

  exports.ellipses = function(len) {
    return (this.length > len) ? this.substr(0, len) + "..." : this;
  };

})(null, null, nudoru.utils.StringUtils);