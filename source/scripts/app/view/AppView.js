APP.createNameSpace('APP.AppView');

APP.AppView = (function () {
  var _self,
    _appGlobals,
    _currentViewPortSize,
    _currentViewPortScroll,
    _mainScrollEl,
    _appContainerEl,
    _appEl,
    _mainHeaderEl,
    _mainFooterEl,
    _uiUpdateLayoutStream,
    _browserScrollStream,
    _browserResizeStream,
    _eventDispatcher = require('nudoru.events.EventDispatcher'),
    _toastView = require('nudoru.components.ToastView'),
    _messageBoxView = require('nudoru.components.MessageBoxView'),
    _modalCoverView = require('nudoru.components.ModalCoverView'),
    _browserEvents = require('nudoru.events.BrowserEvents'),
    _componentEvents = require('nudoru.events.ComponentEvents');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getMainScrollingView() {
    return _mainScrollEl;
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;
    _appGlobals = APP.globals();

    _eventDispatcher.publish(APP.AppEvents.VIEW_INITIALIZED);
  }

  function render() {
    defineDOMElements();
    setCurrentViewPortSize();
    setCurrentViewPortScroll();
    initializeViewComponents();
    configureUIStreams();
    configureUIEvents();

    hideModalCover();

    positionUIElements();

    _eventDispatcher.publish(APP.AppEvents.VIEW_RENDERED);
  }

  function defineDOMElements() {
    // ui parts
    _appContainerEl = document.getElementById('app__container');
    _appEl = document.getElementById('app__contents');

    // listen for scroll on the app container not window or body
    _mainScrollEl = _appEl;

    _mainHeaderEl = document.getElementById('header');
    _mainFooterEl = document.getElementById('footer');
  }

  function initializeViewComponents() {
    _toastView.initialize('toast__container');
    _messageBoxView.initialize('messagebox__container');
    _modalCoverView.initialize();
  }

  function configureUIEvents() {
    _eventDispatcher.subscribe(_componentEvents.MODAL_COVER_HIDE, hideModalContent);
  }

  function configureUIStreams() {
    var uiresizestream = Rx.Observable.fromEvent(window, 'resize'),
      uiscrollscream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll');

    _uiUpdateLayoutStream = Rx.Observable.merge(uiresizestream, uiscrollscream)
      .subscribe(function () {
        positionUIElementsOnChange();
      });

    _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
      .throttle(100)
      .subscribe(function () {
        handleViewPortResize();
      });

    _browserScrollStream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll')
      .throttle(100)
      .subscribe(function () {
        handleViewPortScroll();
      });

  }

  //----------------------------------------------------------------------------
  //  Viewport and UI elements
  //----------------------------------------------------------------------------

  function handleViewPortResize() {
    showNotification('Resize!', 'Here we go!', _toastView.type().INFORMATION);
    _eventDispatcher.publish(_browserEvents.BROWSER_RESIZED, _currentViewPortSize);
  }

  function handleViewPortScroll() {
    showNotification('Scrolling!', 'Here we go!', _toastView.type().DEFAULT);

    _eventDispatcher.publish(_browserEvents.BROWSER_SCROLLED, _currentViewPortScroll);
  }

  /**
   * Cache the current view port size in a var
   */
  function setCurrentViewPortSize() {
    _currentViewPortSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  /**
   * Cache the current view port scroll in a var
   */
  function setCurrentViewPortScroll() {
    var left = _mainScrollEl.scrollLeft,
      top = _mainScrollEl.scrollTop;

    left = left ? left : 0;
    top = top ? top : 0;

    _currentViewPortScroll = {left: left, top: top};
  }

  /**
   * Reposition the UI elements on a UI change, scroll, resize, etc.
   */
  function positionUIElementsOnChange() {
    setCurrentViewPortScroll();
    setCurrentViewPortSize();

    positionUIElements();
  }

  /**
   * Position UI elements that are dependant on the view port
   */
  function positionUIElements() {
    //_mainHeaderEl.style.top = _currentViewPortScroll.top + 'px';
    //_mainFooterEl.style.top = (_currentViewPortSize.height + _currentViewPortScroll.top - _mainFooterEl.clientHeight) + 'px';
  }


  //----------------------------------------------------------------------------
  //  Modal View
  //----------------------------------------------------------------------------

  function showModalCover(animate) {
    _modalCoverView.show(animate);
  }

  function hideModalCover(animate) {
    _modalCoverView.hide(animate);
  }

  function hideModalContent() {
    //
  }

  //----------------------------------------------------------------------------
  //  Init and messaging
  //----------------------------------------------------------------------------

  /**
   * Display a notification "toast"
   * @param title The title
   * @param message The message
   */
  function showNotification(title, message, type) {
    title = title || "Notification";
    type = type || _toastView.type().DEFAULT;
    _toastView.add(title, message, type);
  }

  function removeLoadingMessage() {
    var cover = document.getElementById('initialization__cover'),
      message = document.getElementsByClassName('initialization__message')[0];

    TweenLite.to(cover, 1, {
      alpha: 0, ease: Quad.easeOut, onComplete: function () {
        document.body.removeChild(cover);
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
    initialize: initialize,
    render: render,
    showNotification: showNotification,
    removeLoadingMessage: removeLoadingMessage,
    getMainScrollingView: getMainScrollingView
  };
}());