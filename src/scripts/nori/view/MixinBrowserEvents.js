define('nori/view/MixinBrowserEvents',
  function (require, module, exports) {

    var MixinBrowserEvents = function () {

      var _currentViewPortSize,
          _currentViewPortScroll,
          _uiUpdateLayoutStream,
          _browserScrollStream,
          _browserResizeStream,
          _positionUIElementsOnChangeCB,
          _noriEvents = require('nori/events/EventCreator');

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      function initializeBrowserWindowEventStreams() {
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
        _noriEvents.browserResized(_currentViewPortSize);
      }

      function handleViewPortScroll() {
        _noriEvents.browserScrolled(_currentViewPortScroll);
      }

      function getCurrentViewPortSize() {
        return _currentViewPortSize;
      }

      /**
       * Cache the current view port size in a var
       */
      function setCurrentViewPortSize() {
        _currentViewPortSize = {
          width : window.innerWidth,
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
            top  = scrollEL.scrollTop;

        left = left ? left : 0;
        top  = top ? top : 0;

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

      return {
        initializeBrowserWindowEventStreams: initializeBrowserWindowEventStreams,
        setPositionUIElementsOnChangeCB    : setPositionUIElementsOnChangeCB,
        getMainScrollingView               : getMainScrollingView,
        setMainScrollingView               : setMainScrollingView,
        getCurrentViewPortSize             : getCurrentViewPortSize,
        getCurrentViewPortScroll           : getCurrentViewPortScroll
      };

    };

    module.exports = MixinBrowserEvents();


  });