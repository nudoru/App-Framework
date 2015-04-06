APP.createNameSpace('APP.AppView.ModalCoverView');

APP.AppView.ModalCoverView = (function() {
  var _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _eventDispatcher;

  function initialize() {
    var appGlobals = APP.globals();

    _eventDispatcher = APP.EventDispatcher;

    _isVisible = true;

    _modalCoverEl = document.getElementById('modal__cover');
    _modalBackgroundEl = document.querySelector('.modal__background');
    _modalCloseButtonEl = document.querySelector('.modal__close-button');

    var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl, appGlobals.mouseClickEvtStr),
      modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, appGlobals.mouseClickEvtStr);

    _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick)
      .subscribe(function() {
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
    if(_isVisible) {
      return;
    }
    _isVisible = true;
    var duration = animate ? 0.25 : 0;
    TweenMax.to(_modalCoverEl, duration, {autoAlpha: 1, ease:Quad.easeOut});
    TweenMax.to(_modalCloseButtonEl, duration*2, {autoAlpha: 1, top: 22, ease:Back.easeOut, delay: 2});

    _eventDispatcher.publish(APP.Events.MODAL_COVER_SHOW);
  }

  function hide(animate) {
    if(!_isVisible) {
      return;
    }
    _isVisible = false;
    var duration = animate ? 0.25 : 0;
    TweenMax.killDelayedCallsTo(_modalCloseButtonEl);
    TweenMax.to(_modalCoverEl, duration, {autoAlpha: 0, ease:Quad.easeOut});
    TweenMax.to(_modalCloseButtonEl, duration/2, {autoAlpha: 0, top: -50, ease:Quad.easeOut});

    _eventDispatcher.publish(APP.Events.MODAL_COVER_HIDE);
  }

  return {
    initialize: initialize,
    show: show,
    hide: hide,
    visible: getIsVisible
  };

}());