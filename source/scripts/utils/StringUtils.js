var StringUtils = {

  capitalizeFirstLetter: function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  },

  removeTags: function(str) {
     return str.replace(/(<([^>]+)>)/ig, '');
  },

};