APP.createNameSpace('APP.View');

APP.View = (function () {
  var _self,
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
    _subViewMountPoint,
    _subViewMapping = Object.create(null),
    _currentSubView,
    _subViewHTMLTemplatePrefix = 'template__',
    _eventDispatcher = APP.eventDispatcher(),
    _template = require('nudoru.utils.NTemplate'),
    _toastView = require('nudoru.components.ToastView'),
    _messageBoxView = require('nudoru.components.MessageBoxView'),
    _modalCoverView = require('nudoru.components.ModalCoverView'),
    _browserEvents = require('nudoru.events.BrowserEvents'),
    _domUtils = require('nudoru.utils.DOMUtils');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getMainScrollingView() {
    return _mainScrollEl;
  }

  function getTemplate() {
    return _template;
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;

    _eventDispatcher.publish(APP.AppEvents.VIEW_INITIALIZED);

    render();
  }

  function render() {
    defineDOMElements();
    setCurrentViewPortSize();
    setCurrentViewPortScroll();
    initializeViewComponents();
    configureUIStreams();
    configureUIEvents();

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

    _subViewMountPoint = document.getElementById('contents');
  }

  function initializeViewComponents() {
    _toastView.initialize('toast__container');
    _messageBoxView.initialize('messagebox__container');
    _modalCoverView.initialize();
  }

  /**
   * Set up events relating to UI/browser changes
   */
  function configureUIEvents() {
    // stub
  }

  /**
   * Set up RxJS streams for events
   */
  function configureUIStreams() {
    var uiresizestream = Rx.Observable.fromEvent(window, 'resize'),
      uiscrollscream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll');

    // UI layout happens immediately, while resize and scroll is throttled
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
    _eventDispatcher.publish(_browserEvents.BROWSER_RESIZED, _currentViewPortSize);
  }

  function handleViewPortScroll() {
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
   * Position UI elements that are dependant on the view port size or position
   */
  function positionUIElements() {
    //
  }

  //----------------------------------------------------------------------------
  //  SubViews
  //----------------------------------------------------------------------------

  function mapView(templateID, controller, unique) {
    _subViewMapping[templateID] = {
      htmlTemplate: _template.getTemplate(_subViewHTMLTemplatePrefix + templateID),
      controller: unique ? requireUnique(controller) : require(controller)
    };
  }

  function showView(viewObj) {
    var subview = _subViewMapping[viewObj.templateID];

    if(subview) {
      unMountCurrentSubView();
    } else {
      throw new Error('No subview mapped for route: '+viewObj.route+' > '+viewObj.templateID);
    }

    _domUtils.removeAllElements(_subViewMountPoint);

    subview.controller.initialize({
      id: viewObj.templateID,
      template: subview.htmlTemplate,
      state: {}
    });

    _subViewMountPoint.appendChild(subview.controller.getDOMElement());

    _currentSubView = viewObj.templateID;

    _eventDispatcher.publish(APP.AppEvents.VIEW_CHANGED, viewObj.templateID);
  }

  function unMountCurrentSubView() {
    if(_currentSubView) {

      var subViewController = _subViewMapping[_currentSubView].controller;

      if(subViewController.willUnMount) {
        subViewController.willUnMount();
      }

      _currentSubView = '';
    }
  }

  //----------------------------------------------------------------------------
  //  Init and messaging
  //----------------------------------------------------------------------------

  function showAlert(message) {
    _messageBoxView.add({title:'Alert', content: message, type: _messageBoxView.type().DEFAULT});
  }

  /**
   * Display a notification "toast"
   * @param title The title
   * @param message The message
   */
  function showNotification(message, title, type) {
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
    alert: showAlert,
    notify: showNotification,
    removeLoadingMessage: removeLoadingMessage,
    getMainScrollingView: getMainScrollingView,
    template: getTemplate,
    mapView: mapView,
    showView: showView
  };
}());