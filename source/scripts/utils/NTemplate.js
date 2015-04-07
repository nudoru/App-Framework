/*
Simple wrapper for Underscore / HTML templates

Matt Perkins
4/7/15
 */

var NTemplate = (function() {

  var cache = {};

  /**
   * Get thes template html from the script tag with id
   * @param id
   * @returns {*}
   */
  function getSource(id) {
    var src = document.getElementById(id),
        srchtml = '';

    if(src) {
      srchtml = src.innerHTML;
    } else {
      console.log('Template not found: "'+id+'"');
    }

    return sanitizeHTMLStr(srchtml);
  }

  /**
   * Returns an underscore template
   * @param id
   * @returns {*}
   */
  function getTemplate(id) {
    return _.template(getSource(id));
  }

  /**
   * Processes the template and returns HTML
   * @param id
   * @param obj
   * @returns {*}
   */
  function asHTML(id, obj) {
    var temp = getTemplate(id);
    return temp(obj);
  }

  /**
   * Processes the template and returns an HTML Element
   * @param id
   * @param obj
   * @returns {*}
   */
  function asElement(id, obj) {
    return DOMUtils.HTMLStrToNode(asHTML(id, obj));
  }

  /**
   * Created for cleaning up HTML templates from script tags
   * Removes: new lines, tabs and spaces between tags
   */
  function sanitizeHTMLStr(str) {
    return str.toString().replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').trim();
  }

  /**
   * Public API
   */
  return {
    getSource: getSource,
    getTemplate: getTemplate,
    asHTML: asHTML,
    asElement: asElement
  };

}());
