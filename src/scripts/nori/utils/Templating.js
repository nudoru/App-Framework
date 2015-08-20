/*
 Simple wrapper for Underscore / HTML templates
 Matt Perkins
 4/7/15
 */
define('nori/utils/Templating',
  function (require, module, exports) {

    var Templating = function () {

      var _templateMap = Object.create(null),
          _templateHTMLCache = Object.create(null),
          _templateCache     = Object.create(null),
          _DOMUtils          = require('nudoru/browser/DOMUtils');

      function addTemplate(id,html) {
        _templateMap[id] = html;
      }

      function getSourceFromTemplateMap(id) {
        var source = _templateMap[id];
        if(source) {
          return cleanTemplateHTML(source);
        }
        return;
      }

      function getSourceFromHTML(id) {
        var src = document.getElementById(id),
            srchtml;

        if (src) {
          srchtml = src.innerHTML;
        } else {
          throw new Error('nudoru/core/Templating, template not found: "' + id + '"');
        }

        return cleanTemplateHTML(srchtml);
      }

      /**
       * Get the template html from the script tag with id
       * @param id
       * @returns {*}
       */
      function getSource(id) {
        if (_templateHTMLCache[id]) {
          return _templateHTMLCache[id];
        }

        var sourcehtml = getSourceFromTemplateMap(id);

        if(!sourcehtml) {
          sourcehtml = getSourceFromHTML(id);
        }

        _templateHTMLCache[id] = sourcehtml;
        return sourcehtml;
      }

      /**
       * Returns all IDs belonging to text/template type script tags
       * @returns {Array}
       */
      function getAllTemplateIDs() {
        var scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'), 0);

        return scriptTags.filter(function (tag) {
          return tag.getAttribute('type') === 'text/template';
        }).map(function (tag) {
          return tag.getAttribute('id');
        });
      }

      /**
       * Returns an underscore template
       * @param id
       * @returns {*}
       */
      function getTemplate(id) {
        if (_templateCache[id]) {
          return _templateCache[id];
        }
        var templ          = _.template(getSource(id));
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
        return str.trim();
      }

      /**
       * Remove returns, spaces and tabs
       * @param str
       * @returns {XML|string}
       */
      function removeWhiteSpace(str) {
        return str.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/>\s+</g, '><');
      }

      /**
       * Iterate over all templates, clean them up and log
       * Util for SharePoint projects, <script> blocks aren't allowed
       * So this helps create the blocks for insertion in to the DOM
       */
      function processForDOMInsertion() {
        var ids = getAllTemplateIDs();
        ids.forEach(function (id) {
          var src = removeWhiteSpace(getSource(id));
          console.log(id, src);
        });
      }

      /**
       * Add a template script tag to the DOM
       * Util for SharePoint projects, <script> blocks aren't allowed
       * @param id
       * @param html
       */
      //function addClientSideTemplateToDOM(id, html) {
      //  var s       = document.createElement('script');
      //  s.type      = 'text/template';
      //  s.id        = id;
      //  s.innerHTML = html;
      //  document.getElementsByTagName('head')[0].appendChild(s);
      //}

      return {
        addTemplate           : addTemplate,
        getSource             : getSource,
        getAllTemplateIDs     : getAllTemplateIDs,
        processForDOMInsertion: processForDOMInsertion,
        getTemplate           : getTemplate,
        asHTML                : asHTML,
        asElement             : asElement
      };

    };

    module.exports = Templating();

  });
