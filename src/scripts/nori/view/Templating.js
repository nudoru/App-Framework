/* @flow weak */

/*
 Facade for HTML templating
 Matt Perkins
 4/7/15
 Updated 11/18/15 to use Mustache
 */

import IsDOMElement from '../utils/IsDOMElement.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import Mustache from '../../vendor/mustache.min.js';

let TemplatingModule = function () {

  let _templateMap       = Object.create(null),
      _templateHTMLCache = Object.create(null),
      _templateCache     = Object.create(null);

  function addTemplate(id, html) {
    _templateMap[id] = html;
  }

  function getSourceFromTemplateMap(id) {
    let source = _templateMap[id];
    if (source) {
      return cleanTemplateHTML(source);
    }
    return;
  }

  function getSourceFromHTML(id) {
    let src = document.getElementById(id),
        srchtml;

    if (src) {
      srchtml = src.innerHTML;
    } else if (IsDOMElement(id)) {
      srchtml = '<' + id + ' id="{{elID}}" class="{{elClass}}">{{elInner}}</' + id + '>';
    } else {
      console.warn('nudoru/core/Templating, template not found: "' + id + '"');
      srchtml = '<div>Template not found: ' + id + '</div>';
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

    let sourcehtml = getSourceFromTemplateMap(id);

    if (!sourcehtml) {
      sourcehtml = getSourceFromHTML(id);
    }

    _templateHTMLCache[id] = sourcehtml;
    return sourcehtml;
  }

  /**
   * Returns all IDs belonging to text/template type script tags
   */
  function getAllTemplateIDs() {
    let scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'), 0);

    return scriptTags.filter(function (tag) {
      return tag.getAttribute('type') === 'text/template';
    }).map(function (tag) {
      return tag.getAttribute('id');
    });
  }

  /**
   * Returns an underscore template
   */
  function getTemplate(id) {
    if (_templateCache[id]) {
      return _templateCache[id];
    }

    let templ          = getTemplateFromHTML(getSource(id));
    _templateCache[id] = templ;
    return templ;
  }

  /**
   * Returns an template
   */
  function getTemplateFromHTML(html) {
    html = cleanTemplateHTML(html);
    Mustache.parse(html);
    return createRenderingFunction(html);
  }

  /**
   * Curry the Mustache rendering function
   */
  function createRenderingFunction(source) {
    return function (obj) {
      return Mustache.render(source, obj);
    };
  }

  /**
   * Processes the template and returns HTML
   */
  function asHTML(id, obj) {
    let temp = getTemplate(id);
    return temp(obj);
  }

  /**
   * Processes the template and returns an HTML Element
   */
  function asElement(id, obj) {
    return DOMUtils.HTMLStrToNode(asHTML(id, obj));
  }

  /**
   * Cleans template HTML
   */
  function cleanTemplateHTML(str) {
    return str.trim();
  }

  /**
   * Remove returns, spaces and tabs
   */
  function removeAllWhiteSpace(str) {
    return str.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/>\s+</g, '><');
  }

  return {
    addTemplate,
    getSource,
    getAllTemplateIDs,
    getTemplate,
    getTemplateFromHTML,
    asHTML,
    asElement
  };

};

let Templating = TemplatingModule();

export default Templating;