/**
 * Utility to handle all view DOM attachment tasks
 */

ndefine('nori/utils/Renderer',
  function (nrequire, module, exports) {

    var Renderer = function () {
      var _domUtils = nrequire('nudoru/browser/DOMUtils');

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