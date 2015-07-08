/**
 * Created 2/?/15
 * Last updated 5/5/15
 */

define('Nudoru.Component.ModalCoverView',
  function (require, module, exports) {
    var _mountPoint      = document,
        _modalCoverEl,
        _modalBackgroundEl,
        _modalCloseButtonEl,
        _modalClickStream,
        _isVisible,
        _isHard,
        _dispatcher      = require('Nudoru.Component.Dispatcher'),
        _componentEvents = require('Nudoru.Component.ComponentEvents'),
        _browserInfo     = require('Nudoru.Browser.BrowserInfo');

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
      if (_isHard) return;
      hide(true);
    }

    function showModalCover(shouldAnimate) {
      _isVisible   = true;
      var duration = shouldAnimate ? 0.25 : 0;
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 1, ease: Quad.easeOut});
    }

    function show(shouldAnimate) {
      if (_isVisible) {
        return;
      }

      _isHard = false;

      showModalCover(shouldAnimate);
      TweenLite.to(_modalCloseButtonEl, 0.5, {
        autoAlpha: 1,
        top      : 22,
        ease     : Back.easeOut,
        delay    : 2
      });

      _dispatcher.publish(_componentEvents.MODAL_COVER_SHOW);
    }

    /**
     * A 'hard' modal view cannot be dismissed with a click, must be via code
     * @param shouldAnimate
     */
    function showHard(shouldAnimate) {
      if (_isVisible) {
        return;
      }

      _isHard = true;

      showModalCover(shouldAnimate);
      TweenLite.to(_modalCloseButtonEl, 0, {autoAlpha: 0});
    }

    function hide(shouldAnimate) {
      if (!_isVisible) {
        return;
      }
      _isVisible   = false;
      _isHard      = false;
      var duration = shouldAnimate ? 0.25 : 0;
      TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 0, ease: Quad.easeOut});
      TweenLite.to(_modalCloseButtonEl, duration / 2, {
        autoAlpha: 0,
        top      : -50,
        ease     : Quad.easeOut
      });

      _dispatcher.publish(_componentEvents.MODAL_COVER_HIDE);
    }

    function setOpacity(opacity) {
      if (opacity < 0 || opacity > 1) {
        console.log('Nudoru.Component.ModalCoverView: setOpacity: opacity should be between 0 and 1');
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

    exports.initialize = initialize;
    exports.show       = show;
    exports.showHard   = showHard;
    exports.hide       = hide;
    exports.visible    = getIsVisible;
    exports.setOpacity = setOpacity;
    exports.setColor   = setColor;
  });