define('nori/view/ApplicationView',
  function (require, module, exports) {

    var ApplicationView = function () {

      var _this,
          _renderer = require('nori/utils/Renderer'),
          _domUtils = require('nudoru/browser/DOMUtils');

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      /**
       * Initialize
       * @param scaffoldTemplates template IDs to attached to the body for the app
       */
      function initializeApplicationView(scaffoldTemplates) {
        _this = this;
        _renderer.initialize();

        attachApplicationScaffolding(scaffoldTemplates);

        _this.initializeComponentViews();
        _this.initializeNudoruControls();
      }

      /**
       * Attach app HTML structure
       * @param templates
       */
      function attachApplicationScaffolding(templates) {
        if (!templates) {
          return;
        }

        var bodyEl = document.querySelector('body');

        templates.forEach(function (templ) {
          bodyEl.appendChild(_domUtils.HTMLStrToNode(_this.template().getSource('template__' + templ, {})));
        });
      }

      /**
       * After app initialization, remove the loading message
       */
      function removeLoadingMessage() {
        var cover   = document.querySelector('#initialization__cover'),
            message = document.querySelector('.initialization__message');

        TweenLite.to(cover, 1, {
          alpha: 0, ease: Quad.easeOut, onComplete: function () {
            cover.parentNode.removeChild(cover);
          }
        });

        TweenLite.to(message, 2, {
          top: "+=50px", ease: Quad.easeIn, onComplete: function () {
            cover.removeChild(message);
          }
        });
      }

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeApplicationView: initializeApplicationView,
        removeLoadingMessage     : removeLoadingMessage
      };

    };

    module.exports = ApplicationView();

  });