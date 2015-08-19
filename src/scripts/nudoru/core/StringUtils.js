define('nudoru/core/StringUtils',
  function (require, module, exports) {

    module.exports = {

      capitalizeFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      },

      toTitleCase: function (str) {
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
      },

      removeTags: function (str) {
        return str.replace(/(<([^>]+)>)/ig, '');
      },

      ellipses: function (len) {
        return (this.length > len) ? this.substr(0, len) + "..." : this;
      }

    };

  });