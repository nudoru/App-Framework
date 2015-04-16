/*
 Simple wrapper for Underscore / HTML templates

 Matt Perkins
 4/7/15

 Refer - http://ejohn.org/blog/javascript-micro-templating/

 Performance
 Before cache
 10000 x NTemplate.getTemplate('template__item-tile')          = 2218.643ms
 10000 x NTemplate.asElement('template__item-tile', testObj)   = 3294.082ms

 Template HTML Caching
 10000 x NTemplate.getTemplate('template__item-tile')          = 1904.079ms

 Template HTML and Template Caching
 10000 x NTemplate.getTemplate('template__item-tile')          = 0.3ms
 10000 x NTemplate.asElement('template__item-tile', testObj)   = 614.038ms
 */
define('nudoru.utils.NTemplate',
  function(require, module, exports) {

    var _templateHTMLCache = {},
      _templateCache = {},
      _DOMUtils = require('nudoru.utils.DOMUtils');

    /**
     * Get the template html from the script tag with id
     * @param id
     * @returns {*}
     */
    function getSource(id) {
      if(_templateHTMLCache[id]) {
        return _templateHTMLCache[id];
      }

      var src = document.getElementById(id),
        srchtml = '',
        cleanhtml = '';

      if(src) {
        srchtml = src.innerHTML;
      } else {
        console.log('Template not found: "'+id+'"');
        return '';
      }

      cleanhtml = cleanTemplateHTML(srchtml);
      _templateHTMLCache[id] = cleanhtml;
      return cleanhtml;
    }

    /**
     * Returns an underscore template
     * @param id
     * @returns {*}
     */
    function getTemplate(id) {
      if(_templateCache[id]) {
        return _templateCache[id];
      }
      var templ = _.template(getSource(id));
      _templateCache[id] = templ;
      return templ;
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
      return _DOMUtils.HTMLStrToNode(asHTML(id, obj));
    }

    /**
     * Cleans template HTML
     */
    function cleanTemplateHTML(str) {
      //replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').
      return str.trim();
    }


    exports.getSource = getSource;
    exports.getTemplate = getTemplate;
    exports.asHTML = asHTML;
    exports.asElement = asElement;

  });
