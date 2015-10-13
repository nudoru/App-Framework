export default {

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
  },

  // From https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L426
  stripTags: function (str) {
    return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  },

  // From https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L426
  unescapeHTML: function (str) {
    // Warning: In 1.7 String#unescapeHTML will no longer call String#stripTags.
    return this.stripTags(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  },

  capitalize: function (str) {
    return str.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  },

  underscore: function (str) {
    return str.replace(/::/g, '/')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/-/g, '_')
      .toLowerCase();
  },

  dasherize : function (str) {
    return str.replace(/_/g, '-');
  },

  DOMtoCSSStyle: function(str) {
    return this.dasherize(this.underscore(str));
  }

};