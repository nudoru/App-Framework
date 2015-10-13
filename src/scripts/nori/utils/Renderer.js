/* @flow weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

import _domUtils from '../../nudoru/browser/DOMUtils.js';

let Renderer = function () {
  function render({target, html, callback}) {
    let domEl,
        mountPoint  = document.querySelector(target),
        currentHTML = mountPoint.innerHTML;

    if (html) {
      domEl = _domUtils.HTMLStrToNode(html);
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

export default Renderer();