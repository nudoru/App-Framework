define('Nori.View.MixinBrowserEvents',
  function (require, module, exports) {

    var _currentViewPortSize,
      _currentViewPortScroll,
      _uiUpdateLayoutStream,
      _browserScrollStream,
      _browserResizeStream,
      _positionUIElementsOnChangeCB,
      _emitter = require('Nori.Events.Emitter'),
      _browserEvents = require('nudoru.events.BrowserEvents');


    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initializeEventStreams() {
      setCurrentViewPortSize();
      setCurrentViewPortScroll();
      configureUIStreams();
    }

    function setPositionUIElementsOnChangeCB(cb) {
      _positionUIElementsOnChangeCB = cb;
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

    function getMainScrollingView() {
      return _mainScrollEl;
    }

    function setMainScrollingView(elID) {
      _mainScrollEl = document.getElementById(elID);
    }

    //----------------------------------------------------------------------------
    //  Viewport and UI elements
    //----------------------------------------------------------------------------

    function handleViewPortResize() {
      _emitter.publish(_browserEvents.BROWSER_RESIZED, _currentViewPortSize);
    }

    function handleViewPortScroll() {
      _emitter.publish(_browserEvents.BROWSER_SCROLLED, _currentViewPortScroll);
    }

    function getCurrentViewPortSize() {
      return _currentViewPortSize;
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

    function getCurrentViewPortScroll() {
      return _currentViewPortScroll;
    }

    /**
     * Cache the current view port scroll in a var
     */
    function setCurrentViewPortScroll() {
      var scrollEL = _mainScrollEl ? _mainScrollEl : document.body;

      var left = scrollEL.scrollLeft,
        top = scrollEL.scrollTop;

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

      _positionUIElementsOnChangeCB.call(this, _currentViewPortSize, _currentViewPortScroll);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initializeEventStreams = initializeEventStreams;
    exports.setPositionUIElementsOnChangeCB = setPositionUIElementsOnChangeCB;
    exports.getMainScrollingView = getMainScrollingView;
    exports.setMainScrollingView = setMainScrollingView;
    exports.getCurrentViewPortSize = getCurrentViewPortSize;
    exports.getCurrentViewPortScroll = getCurrentViewPortScroll;

  });