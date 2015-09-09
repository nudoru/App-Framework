/* @flow weak */

var MixinBrowserEvents = function () {

  var _scrollableAppContainer,
      _browserScrollStream,
      _browserResizeStream;

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initializeBrowserEvents(scrollcontainer) {
    if (!this.createSubject) {
      console.warn('nori/view/MixinBrowserEvents needs nori/utils/MixinObservableSubject to notify');
    }

    if (scrollcontainer) {
      setMainScrollingView(scrollcontainer);
    } else {
      _scrollableAppContainer = document;
    }

    createBrowserEventStreams.bind(this)();

    this.createSubject('browserScroll');
    this.createSubject('browserResize');
  }

  /**
   * Set up RxJS streams for events
   */
  function createBrowserEventStreams() {
    _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
      .throttle(100)
      .subscribe(handleViewPortResize.bind(this));

    _browserScrollStream = Rx.Observable.fromEvent(_scrollableAppContainer, 'scroll')
      .throttle(100)
      .subscribe(handleViewPortScroll.bind(this));
  }

  function handleViewPortResize() {
    this.notifySubscribersOf('browserResize', getCurrentViewPortSize());
  }

  function handleViewPortScroll() {
    this.notifySubscribersOf('browserScroll', getCurrentViewPortScroll());
  }

  function getCurrentViewPortSize() {
    return {
      width : window.innerWidth,
      height: window.innerHeight
    };
  }

  function getCurrentViewPortScroll() {
    var scrollEL = _scrollableAppContainer ? _scrollableAppContainer : document.body;

    var left = scrollEL.scrollLeft,
        top  = scrollEL.scrollTop;

    left = left ? left : 0;
    top  = top ? top : 0;

    return {left: left, top: top};
  }

  function getMainScrollingView() {
    return _scrollableAppContainer;
  }

  function setMainScrollingView(elID) {
    _scrollableAppContainer = document.querySelector(elID);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeBrowserEvents : initializeBrowserEvents,
    getMainScrollingView    : getMainScrollingView,
    setMainScrollingView    : setMainScrollingView,
    getCurrentViewPortSize  : getCurrentViewPortSize,
    getCurrentViewPortScroll: getCurrentViewPortScroll
  };

};

module.exports = MixinBrowserEvents();