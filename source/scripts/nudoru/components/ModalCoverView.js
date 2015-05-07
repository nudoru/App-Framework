/**
 * Created 2/?/15
 * Last updated 5/5/15
 */

define('nudoru.components.ModalCoverView',
  function (require, module, exports) {
    var _mountPoint = document,
      _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _isHard,
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _componentEvents = require('nudoru.events.ComponentEvents'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize() {

      _isVisible = true;

      _modalCoverEl = _mountPoint.getElementById('modal__cover');
      _modalBackgroundEl = _mountPoint.querySelector('.modal__background');
      _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

      var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl, _browserInfo.mouseClickEvtStr()),
        modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, _browserInfo.mouseClickEvtStr());

      _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick)
        .subscribe(function () {
          onModalClick();
        });
    }

    function getIsVisible() {
      return _isVisible;
    }

    function onModalClick() {
      if(_isHard) return;
      hide(true);
    }

    function showModalCover(animate) {
      _isVisible = true;
      var duration = animate ? 0.25 : 0;
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 1, ease: Quad.easeOut});
    }

    function show(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = false;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, duration * 2, {
        autoAlpha: 1,
        top: 22,
        ease: Back.easeOut,
        delay: 2
      });

      _eventDispatcher.publish(_componentEvents.MODAL_COVER_SHOW);
    }

    /**
     * A 'hard' modal view cannot be dismissed with a click, must be via code
     * @param animate
     */
    function showHard(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = true;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, 0, {autoAlpha: 0});
    }

    function hide(animate) {
      if (!_isVisible) {
        return;
      }
      _isVisible = false;
      _isHard = false;
      var duration = animate ? 0.25 : 0;
      TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 0, ease: Quad.easeOut});
      TweenLite.to(_modalCloseButtonEl, duration / 2, {
        autoAlpha: 0,
        top: -50,
        ease: Quad.easeOut
      });

      _eventDispatcher.publish(_componentEvents.MODAL_COVER_HIDE);
    }

    exports.initialize = initialize;
    exports.show = show;
    exports.showHard = showHard;
    exports.hide = hide;
    exports.visible = getIsVisible;

  });