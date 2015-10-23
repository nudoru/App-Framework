/* @flow weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

import DOMUtils from '../../nudoru/browser/DOMUtils.js';

let RendererModule = function () {
  function render({target, html, callback}) {
    let domEl,
        mountPoint  = document.querySelector(target),
        currentHTML;

    if(!mountPoint) {
      console.warn('Render, target selector not found',target);
      return;
    }

    currentHTML = mountPoint.innerHTML;

    if (html) {
      domEl = DOMUtils.HTMLStrToNode(html);
      if (html !== currentHTML) {
        // TODO experiment with the jsdiff function
        mountPoint.innerHTML = '';
        mountPoint.appendChild(domEl);
      } else {
        console.log('> is SAME');
      }
    }

    if (callback) {
      callback(domEl);
    }

    return domEl;
  }

  return {
    render: render
  };

};

let Renderer = RendererModule();

export default Renderer;