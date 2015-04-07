var StringUtils = {

  capitalizeFirstLetter: function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  },

  removeTags: function(str) {
     return str.replace(/(<([^>]+)>)/ig, '');
  },

  /**
   * Created for cleaning up HTML templates from script tags
   * Removes: new lines, tabs and spaces between tags
   */
  sanitizeHTMLStr: function(str) {
    return str.toString().replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').trim();
  }

};