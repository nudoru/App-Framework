/**
 * Utility to handle all view DOM attachment tasks
 */

var Renderer = function () {
  var _domUtils = require('../../nudoru/browser/DOMUtils.js');

  function render(payload) {
    var targetSelector = payload.target,
        html           = payload.html,
        domEl,
        mountPoint     = document.querySelector(targetSelector),
        cb             = payload.callback;

    mountPoint.innerHTML = '';

    if (html) {
      domEl = _domUtils.HTMLStrToNode(html);
      mountPoint.appendChild(domEl);
    }

    if (cb) {
      cb(domEl);
    }

    return domEl;
  }

  return {
    render: render
  };

};

module.exports = Renderer();