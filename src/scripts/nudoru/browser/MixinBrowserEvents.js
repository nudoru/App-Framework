/* @flow weak */

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';

let MixinBrowserEvents = function () {

  let _scrollableAppContainer,
      _browserScrollStream,
      _browserResizeStream;

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
  }

  /**
   * Set up RxJS streams for events
   */
  function createBrowserEventStreams() {
    _browserResizeStream = Rxjs.Observable.fromEvent(window, 'resize')
      .throttle(100)
      .subscribe(handleViewPortResize.bind(this));

    _browserScrollStream = Rxjs.Observable.fromEvent(_scrollableAppContainer, 'scroll')
      .throttle(100)
      .subscribe(handleViewPortScroll.bind(this));
  }

  function handleViewPortResize() {
    //this.notifySubscribersOf('browserResize', getCurrentViewPortSize());
  }

  function handleViewPortScroll() {
    //this.notifySubscribersOf('browserScroll', getCurrentViewPortScroll());
  }

  function getCurrentViewPortSize() {
    return {
      width : window.innerWidth,
      height: window.innerHeight
    };
  }

  function getCurrentViewPortScroll() {
    let scrollEL = _scrollableAppContainer ? _scrollableAppContainer : document.body,
        left     = scrollEL.scrollLeft,
        top      = scrollEL.scrollTop;

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

  return {
    initializeBrowserEvents : initializeBrowserEvents,
    getMainScrollingView    : getMainScrollingView,
    setMainScrollingView    : setMainScrollingView,
    getCurrentViewPortSize  : getCurrentViewPortSize,
    getCurrentViewPortScroll: getCurrentViewPortScroll
  };

};

export default MixinBrowserEvents;