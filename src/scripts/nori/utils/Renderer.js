/**
 * Utility to handle all view DOM attachment tasks
 *
 * TODO - implement virutal-dom
 *  https://github.com/Matt-Esch/virtual-dom
 *  https://github.com/twilson63/html2hscript, https://www.npmjs.com/package/html2hyperscript
 */

define('nori/utils/Renderer',
  function (require, module, exports) {

    var Renderer = function () {
      var _domUtils           = require('nudoru/browser/DOMUtils');

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

  });