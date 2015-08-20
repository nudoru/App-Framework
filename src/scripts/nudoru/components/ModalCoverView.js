/**
 * Created 2/?/15
 * Last updated 7/9/15
 */

define('nudoru/component/ModalCoverView',
  function (require, module, exports) {

    var ModalCoverView = function () {

      var _mountPoint      = document,
          _modalCoverEl,
          _modalBackgroundEl,
          _modalCloseButtonEl,
          _modalClickStream,
          _isVisible,
          _notDismissable,
          _browserInfo     = require('nudoru/browser/BrowserInfo');

      function initialize() {

        _isVisible = true;

        _modalCoverEl       = _mountPoint.getElementById('modal__cover');
        _modalBackgroundEl  = _mountPoint.querySelector('.modal__background');
        _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

        var modalBGClick     = Rx.Observable.fromEvent(_modalBackgroundEl, _browserInfo.mouseClickEvtStr()),
            modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, _browserInfo.mouseClickEvtStr());

        _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick)
          .subscribe(function () {
            onModalClick();
          });

        hide(false);
      }

      function getIsVisible() {
        return _isVisible;
      }

      function onModalClick() {
        if (_notDismissable) return;
        hide(true);
      }

      function showModalCover(shouldAnimate) {
        _isVisible   = true;
        var duration = shouldAnimate ? 0.25 : 0;
        TweenLite.to(_modalCoverEl, duration, {
          autoAlpha: 1,
          ease     : Quad.easeOut
        });
        TweenLite.to(_modalBackgroundEl, duration, {
          alpha: 1,
          ease : Quad.easeOut
        });
      }

      function show(shouldAnimate) {
        if (_isVisible) {
          return;
        }

        _notDismissable = false;

        showModalCover(shouldAnimate);

        TweenLite.set(_modalCloseButtonEl, {scale: 2, alpha: 0});
        TweenLite.to(_modalCloseButtonEl, 1, {
          autoAlpha: 1,
          scale    : 1,
          ease     : Bounce.easeOut,
          delay    : 1
        });
      }

      /**
       * A 'hard' modal view cannot be dismissed with a click, must be via code
       * @param shouldAnimate
       */
      function showNonDismissable(shouldAnimate) {
        if (_isVisible) {
          return;
        }

        _notDismissable = true;

        showModalCover(shouldAnimate);
        TweenLite.to(_modalCloseButtonEl, 0, {autoAlpha: 0});
      }

      function hide(shouldAnimate) {
        if (!_isVisible) {
          return;
        }
        _isVisible      = false;
        _notDismissable = false;
        var duration    = shouldAnimate ? 0.25 : 0;
        TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
        TweenLite.to(_modalCoverEl, duration, {
          autoAlpha: 0,
          ease     : Quad.easeOut
        });
        TweenLite.to(_modalCloseButtonEl, duration / 2, {
          autoAlpha: 0,
          ease     : Quad.easeOut
        });

      }

      function setOpacity(opacity) {
        if (opacity < 0 || opacity > 1) {
          console.log('nudoru/component/ModalCoverView: setOpacity: opacity should be between 0 and 1');
          opacity = 1;
        }
        TweenLite.to(_modalBackgroundEl, 0.25, {
          alpha: opacity,
          ease : Quad.easeOut
        });
      }

      function setColor(r, g, b) {
        TweenLite.to(_modalBackgroundEl, 0.25, {
          backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')',
          ease           : Quad.easeOut
        });
      }

      return {
        initialize        : initialize,
        show              : show,
        showNonDismissable: showNonDismissable,
        hide              : hide,
        visible           : getIsVisible,
        setOpacity        : setOpacity,
        setColor          : setColor
      };

    };

    module.exports = ModalCoverView();

  });