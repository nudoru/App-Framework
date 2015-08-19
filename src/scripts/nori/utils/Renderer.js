/**
 * Utility to handle all view DOM attachment tasks
 *
 * TODO - implement virutal-dom
 *  https://github.com/Matt-Esch/virtual-dom
 *  https://github.com/twilson63/html2hscript, https://www.npmjs.com/package/html2hyperscript
 */

define('nori/utils/Renderer',
  function (require, module, exports) {

    var Renderer = (function () {
      var _noriEvents         = require('nori/events/EventCreator'),
          _noriEventConstants = require('nori/events/EventConstants'),
          _domUtils           = require('nudoru/browser/DOMUtils');

      function initialize() {
        Nori.dispatcher().subscribe(_noriEventConstants.RENDER_VIEW, render);
      }

      function render(payload) {
        var targetSelector = payload.payload.target,
            html           = payload.payload.html,
            domEl,
            mountPoint     = document.querySelector(targetSelector),
            cb             = payload.payload.callback;

        mountPoint.innerHTML = '';

        if (html) {
          domEl = _domUtils.HTMLStrToNode(html);
          mountPoint.appendChild(domEl);
        }

        // Send the created DOM element back to the caller
        if (cb) {
          cb(domEl);
        }

        _noriEvents.viewRendered(targetSelector, payload.payload.id);
      }

      return {
        initialize: initialize
      };

    }());

    module.exports = Renderer;

  });