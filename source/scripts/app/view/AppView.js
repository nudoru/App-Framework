APP.createNameSpace('APP.AppView');

APP.AppView = (function() {
  var _appScope,
      _viewRoot,
      _self,
      _appGlobals,
      _eventDispatcher,
      _currentView,
      _currentViewPortSize,
      _currentViewPortScroll,
      _mainScrollEl,
      _mainSearchInputEl,
      _searchHeaderEl,
      _clearAllButtonEl,
      _appContainerEl,
      _appEl,
      _drawerEl,
      _mainHeaderEl,
      _mainFooterEl,
      _drawerToggleButtonEl,
      _toastView,
      _modalCoverView,
      _ddMenuView,
      _drawerMenuView,
      _itemGridView,
      _itemDetailView,
      _tagBarView,
      _uiUpdateLayoutStream,
      _searchInputStream,
      _clearAllButtonStream,
      _browserScrollStream,
      _browserResizeStream,
      _disablePointerEventsOnScrollTimerStream,
      _isScrollingTimerStream,
      _drawerToggleButtonStream,
      _isMobile,
      _tabletBreakWidth,
      _phoneBreakWidth,
      _drawerWidth,
      _isDrawerOpen;

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getCurrentView() {
    return _currentView;
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize(appScope, viewRoot) {
    _appScope = appScope;
    _viewRoot = viewRoot;

    _self = this;
    _appGlobals = APP.globals();
    _eventDispatcher = APP.EventDispatcher;

    _isMobile = false;
    _tabletBreakWidth = 750;
    _phoneBreakWidth = 475;
    _drawerWidth = 250;
    _isDrawerOpen = false;

    _eventDispatcher.publish(APP.Events.VIEW_INITIALIZED);
  }

  function render() {
    setCurrentViewPortSize();
    setCurrentViewPortScroll();
    defineViewElements();

    initializeComponents();

    configureUIStreams();

    configureUIEvents();

    checkForMobile();
    hideModalCover();
    positionUIElements();

    updateAppTitle();

    _eventDispatcher.publish(APP.Events.VIEW_RENDERED);
  }

  function updateAppTitle() {
    _mainHeaderEl.find('h1').html(_appGlobals.appConfig.title);
    document.title = StringUtils.removeTags(_appGlobals.appConfig.title);
  }

  function defineViewElements() {
    // ui parts
    _appContainerEl = $('#app__container');
    _appEl = $('#app__contents');
    // listen for scroll on the app container not window or body
    _mainScrollEl = _appEl;
    _drawerEl = $('#drawer');
    _drawerToggleButtonEl = $('.header__drawer-toggle button');

    _mainHeaderEl = $('#header');
    _mainFooterEl = $('#footer');

    // item grid header
    _mainSearchInputEl = $('.grid__header .grid__header-search input');
    _searchHeaderEl = $('.grid__header h1');
    _clearAllButtonEl = $('#clearall-button');
  }

  function initializeComponents() {
    _toastView = _self.ToastView;
    _toastView.initialize('#toast__container');

    _modalCoverView = _self.ModalCoverView;
    _modalCoverView.initialize();

    // init on these called later
    _ddMenuView = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView); //_self.DDMenuBarView;
    _drawerMenuView = ObjectUtils.basicFactory(APP.AppView.DDMenuBarView);
    _itemGridView = _self.ItemGridView;

    _itemDetailView = _self.ItemDetailView;
    _itemDetailView.initialize('#details');

    _tagBarView = _self.TagBarView;
    _tagBarView.initialize('#tagbar__container');

    TweenMax.to(_drawerEl, 0, {x:_drawerWidth*-1});
  }

  function configureUIEvents() {
    _eventDispatcher.subscribe(APP.Events.MODAL_COVER_HIDE, hideModalContent);
    //_eventDispatcher.subscribe(APP.Events.GRID_VIEW_LAYOUT_COMPLETE, onGridViewLayoutComplete);
  }

  function configureUIStreams() {
    var uiresizestream = Rx.Observable.fromEvent(window, 'resize'),
        uiscrollscream = Rx.Observable.fromEvent(_mainScrollEl[0], 'scroll');

    _uiUpdateLayoutStream = Rx.Observable.merge(uiresizestream, uiscrollscream)
      .throttle(25)
      .subscribe(function() {
        positionUIElementsOnChange();
      });

    _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
      .throttle(100)
      .subscribe(function() {
        handleViewPortResize();
      });

    _browserScrollStream = Rx.Observable.fromEvent(_mainScrollEl[0], 'scroll')
      .throttle(100)
      .subscribe(function() {
        handleViewPortScroll();
      });

    _searchInputStream = Rx.Observable.fromEvent(_mainSearchInputEl[0], 'keyup')
      .throttle(150)
      .map(function (evt) { return evt.target.value; })
      .subscribe(function (value) {
        _eventDispatcher.publish(APP.Events.SEARCH_INPUT, value);
      });

    _clearAllButtonStream = Rx.Observable.fromEvent(_clearAllButtonEl[0], _appGlobals.mouseClickEvtStr)
      .subscribe(function() {
        _eventDispatcher.publish(APP.Events.VIEW_ALL_FILTERS_CLEARED);
      });

    _drawerToggleButtonStream = Rx.Observable.fromEvent(_drawerToggleButtonEl[0], _appGlobals.mouseClickEvtStr)
      .subscribe(function() {
        toggleDrawer();
      });

  }

  function handleViewPortResize() {
    checkForMobile();
    _eventDispatcher.publish(APP.Events.BROWSER_RESIZED, _currentViewPortSize);
  }

  function handleViewPortScroll() {
    disablePointerEventsOnScroll();
    _eventDispatcher.publish(APP.Events.BROWSER_SCROLLED, _currentViewPortScroll);
  }

  // http://www.thecssninja.com/css/pointer-events-60fps
  function disablePointerEventsOnScroll() {
    if(_disablePointerEventsOnScrollTimerStream) {
      _disablePointerEventsOnScrollTimerStream.dispose();
    }

    $('body').addClass('ignore-pointer-events');

    _disablePointerEventsOnScrollTimerStream = Rx.Observable.timer(250)
      .pluck('interval')
      .take(1)
      .subscribe(function() {
        $('body').removeClass('ignore-pointer-events');
      });
  }

  /**
   * Display a notification "toast"
   * @param title The title
   * @param message The message
   */
  function showNotification(title, message) {
    title = title || "Notification";
    _toastView.add(title, message);
  }

  //----------------------------------------------------------------------------
  //  Views
  //----------------------------------------------------------------------------

  /**
   * Cache the current view port size in a var
   */
  function setCurrentViewPortSize() {
    _currentViewPortSize = {width: $(window).width(), height: $(window).height()};
  }

  /**
   * Cache the current view port scroll in a var
   */
  function setCurrentViewPortScroll() {
    var left = $(_mainScrollEl).scrollLeft(),
        top =  $(_mainScrollEl).scrollTop();

    left = left ? left : 0;
    top = top ? top : 0;

    _currentViewPortScroll = {left:left, top:top};
  }

  /**
   * Reposition the UI elements on a UI change, scroll, resize, etc.
   */
  function positionUIElementsOnChange() {
    setCurrentViewPortScroll();
    setCurrentViewPortSize();

    startIsScrollingTimer();
    hideElementsOnScrollStart();
  }

  /**
   * Position UI elements that are dependant on the view port
   */
  function positionUIElements() {
    TweenMax.to(_mainHeaderEl, 0, {top: _currentViewPortScroll.top});
    TweenMax.to(_mainFooterEl, 0, {top: _currentViewPortSize.height + _currentViewPortScroll.top - _mainFooterEl.height()});
  }

  /**
   * Update on filters changed
   */
  function updateUIOnFilterChanges() {
    TweenMax.to(_mainScrollEl, 1, {scrollTop: 0, ease: Quad.easeIn});
  }

  /**
   * Start a timer monitor when scrolling stops
   */
  function startIsScrollingTimer() {
    if(_isScrollingTimerStream) {
      _isScrollingTimerStream.dispose();
    }

    _isScrollingTimerStream = Rx.Observable.timer(500)
      .pluck('interval')
      .take(1)
      .subscribe(showElementsOnScrollEnd);
  }


  /**
   * Hide UI elements
   */
  function hideElementsOnScrollStart() {
    TweenMax.to(_mainHeaderEl, 0, {autoAlpha: 0, ease:Circ.easeOut});
    TweenMax.to(_mainFooterEl, 0, {autoAlpha: 0, ease:Circ.easeOut});
  }

  /**
   * Show UI elements
   */
  function showElementsOnScrollEnd() {
    positionUIElements();

    TweenMax.to(_mainHeaderEl, 0.1, {autoAlpha: 1, ease:Circ.easeOut});
    TweenMax.to(_mainFooterEl, 0.1, {autoAlpha: 1, ease:Circ.easeOut});
  }

  //----------------------------------------------------------------------------
  //  Mobile
  //----------------------------------------------------------------------------

  /**
   * Usually on resize, check to see if we're in mobile
   */
  function checkForMobile() {
    if(_currentViewPortSize.width <= _tabletBreakWidth || _appGlobals.mobile.any()) {
      switchToMobileView();
    } else if(_currentViewPortSize.width > _tabletBreakWidth) {
      switchToDesktopView();
    }
  }

  function switchToMobileView() {
    if(_isMobile) {
      return;
    }

    _isMobile = true;
    _eventDispatcher.publish(APP.Events.VIEW_CHANGE_TO_MOBILE);
  }

  function switchToDesktopView() {
    if(!_isMobile) {
      return;
    }

    _isMobile = false;
    closeDrawer();
    _eventDispatcher.publish(APP.Events.VIEW_CHANGE_TO_DESKTOP);
  }

  function toggleDrawer() {
    if(_isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function openDrawer() {
    _isDrawerOpen = true;
    TweenMax.to(_drawerEl, 0.5, {x:0, ease:Quad.easeOut});
    TweenMax.to(_appEl, 0.5, {x: _drawerWidth, ease:Quad.easeOut});
  }

  function closeDrawer() {
    _isDrawerOpen = false;
    TweenMax.to(_drawerEl, 0.5, {x:_drawerWidth*-1, ease:Quad.easeOut});
    TweenMax.to(_appEl, 0.5, {x: 0, ease:Quad.easeOut});
  }

  //----------------------------------------------------------------------------
  //  Menus
  //----------------------------------------------------------------------------

  function initializeMenus(data) {
    _ddMenuView.initialize('#header__navigation', data);
    _drawerMenuView.initialize('#drawer__navigation', data, true);
  }

  function updateMenuSelections(data) {
    _ddMenuView.setMenuSelections(data);
    _drawerMenuView.setMenuSelections(data);
  }

  //----------------------------------------------------------------------------
  //  Tar Bar
  //----------------------------------------------------------------------------

  function updateTagBarDisplay(tags) {
    _tagBarView.update(tags);

    // Updating will change the height of the bar, reposition
    positionUIElements();
  }

  //----------------------------------------------------------------------------
  //  Item Grid
  //----------------------------------------------------------------------------


  function initializeGridView(data) {
    _itemGridView.initialize('#grid__item-container', data);
  }

  function onGridViewLayoutComplete() {
    //console.log('gridview layout complete');
  }

  function  updateGridItemVisibility(data) {
    _itemGridView.updateItemVisibility(data);
  }

  /**
   * Set the item grid search header
   * @param message
   */
  function updateSearchHeader(message) {
    _searchHeaderEl[0].innerHTML = message;
  }

  function clearAllFilters() {
    clearFreeTextFilter();
    _ddMenuView.resetAllSelections();
    _drawerMenuView.resetAllSelections();
    _tagBarView.update([]);
    showAllGridViewItems();
  }

  function clearFreeTextFilter() {
    _mainSearchInputEl[0].value = '';
  }

  function setFreeTextFilterValue(str) {
    _mainSearchInputEl[0].value = str;
    _eventDispatcher.publish(APP.Events.SEARCH_INPUT, str);
  }

  function showAllGridViewItems() {
    _itemGridView.showAllItems();
  }

  function showItemDetailView(item) {
    _itemDetailView.showItem(item);
    showModalCover(true);
  }

  //----------------------------------------------------------------------------
  //  Modal
  //----------------------------------------------------------------------------

  function showBigMessage(title, message) {
    _itemDetailView.showMessage({title: title, description: message});
    showModalCover(true);
  }

  function removeLoadingMessage() {
    TweenMax.to($('#initialization__cover'), 1, {alpha: 0, ease: Quad.easeOut, onComplete: function() {
      $('#initialization__cover').remove();
    }});

    TweenMax.to($('.initialization__message'), 2, {top:"+=50px", ease: Quad.easeIn, onComplete: function() {
      $('.initialization__message').remove();
    }});
  }

  function showModalCover(animate) {
    _modalCoverView.show(animate);
  }

  function hideModalCover(animate) {
    _modalCoverView.hide(animate);
  }

  function hideModalContent() {
    _itemDetailView.hide();
    _eventDispatcher.publish(APP.Events.ITEM_SELECT,'');
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    render: render,
    showNotification: showNotification,
    currentView: getCurrentView,
    removeLoadingMessage: removeLoadingMessage,
    createView: ObjectUtils.basicFactory,
    updateSearchHeader: updateSearchHeader,
    showBigMessage: showBigMessage,
    initializeMenus: initializeMenus,
    initializeGridView: initializeGridView,
    showItemDetailView: showItemDetailView,
    clearAllFilters: clearAllFilters,
    clearFreeTextFilter: clearFreeTextFilter,
    setFreeTextFilterValue: setFreeTextFilterValue,
    showAllGridViewItems: showAllGridViewItems,
    updateGridItemVisibility:  updateGridItemVisibility,
    updateTagBarDisplay: updateTagBarDisplay,
    updateMenuSelections: updateMenuSelections,
    updateUIOnFilterChanges: updateUIOnFilterChanges
  };
}());