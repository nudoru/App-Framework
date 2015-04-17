define('nudoru.components.ModalCoverView',
  function (require, module, exports) {
    var _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _componentEvents = require('nudoru.events.ComponentEvents'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize() {

      _isVisible = true;

      _modalCoverEl = document.getElementById('modal__cover');
      _modalBackgroundEl = document.querySelector('.modal__background');
      _modalCloseButtonEl = document.querySelector('.modal__close-button');

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
      hide(true);
    }

    function show(animate) {
      if (_isVisible) {
        return;
      }
      _isVisible = true;
      var duration = animate ? 0.25 : 0;
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 1, ease: Quad.easeOut});
      TweenLite.to(_modalCloseButtonEl, duration * 2, {
        autoAlpha: 1,
        top: 22,
        ease: Back.easeOut,
        delay: 2
      });

      _eventDispatcher.publish(_componentEvents.MODAL_COVER_SHOW);
    }

    function hide(animate) {
      if (!_isVisible) {
        return;
      }
      _isVisible = false;
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
    exports.hide = hide;
    exports.visible = getIsVisible;

  });