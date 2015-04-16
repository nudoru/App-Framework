define('nudoru.utils.StringUtils',
  function(require, module, exports){

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

    exports.ellipses = function(len) {
      return (this.length > len) ? this.substr(0, len) + "..." : this;
    };

  });