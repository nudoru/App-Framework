/*
Commands used for most controller functionality.
 */


APP.createNameSpace('APP.AppController');
APP.AppController = function () {
  var _appScope,
      _globalScope,
      _viewParent,
      _model,
      _view,
      _eventDispatcher,
      _router,
      _self;

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize(app, global, viewParent) {
    _appScope = app;
    _globalScope = global;
    _viewParent = viewParent;
    _self = this;
    _eventDispatcher = APP.EventDispatcher;
    _router = APP.AppController.Router;

    _router.initialize();

    mapCommand(APP.Events.CONTROLLER_INITIALIZED, _self.AppInitializedCommand, true);

    initializeView();
  }

  function mapCommand(evt, command, once) {
    once = once || false;
    APP.EventCommandMap.map(evt, command, once);
  }

  function initializeView() {
    _view = APP.AppView;
    _eventDispatcher.subscribe(APP.Events.VIEW_INITIALIZED, onViewInitalized, true);
    _eventDispatcher.subscribe(APP.Events.VIEW_RENDERED, onViewRendered, true);
    _view.initialize(_appScope, _viewParent);
  }

  function onViewInitalized() {
    _view.render();
  }

  function onViewRendered() {
    initializeModel();
  }

  function initializeModel() {
    _model = APP.AppModel;
    _eventDispatcher.subscribe(APP.Events.MODEL_INITIALIZED, onModelInitialized, true);
    _eventDispatcher.subscribe(APP.Events.MODEL_DATA_LOADED, onModelDataLoaded, true);
    _model.initialize();
  }

  function onModelInitialized() {
    _model.loadModelData();
  }

  function onModelDataLoaded() {
    _eventDispatcher.publish(APP.Events.CONTROLLER_INITIALIZED);

    //AppInitializedCommand takes over here
  }

  function postInitialize() {
    mapCommand(APP.Events.URL_HASH_CHANGED, _self.URLHashChangedCommand);
    //mapCommand(APP.Events.VIEW_CHANGED, _self.ViewChangedCommand);
    mapCommand(APP.Events.VIEW_CHANGE_TO_MOBILE, _self.ViewChangedToMobileCommand);
    mapCommand(APP.Events.VIEW_CHANGE_TO_DESKTOP, _self.ViewChangedToDesktopCommand);

    mapCommand(APP.Events.BROWSER_RESIZED, _self.BrowserResizedCommand);
    mapCommand(APP.Events.BROWSER_SCROLLED, _self.BrowserScrolledCommand);

    mapCommand(APP.Events.SEARCH_INPUT, _self.SearchInputCommand);
    mapCommand(APP.Events.GRID_VIEW_ITEMS_CHANGED, _self.GridViewItemsVisibleChangedCommand);
    mapCommand(APP.Events.ITEM_SELECT, _self.ItemSelectCommand);
    mapCommand(APP.Events.MENU_SELECT, _self.MenuSelectionCommand);
    mapCommand(APP.Events.VIEW_ALL_FILTERS_CLEARED, _self.ClearAllFiltersCommand);
    mapCommand(APP.Events.DATA_FILTER_CHANGED, _self.DataFiltersChangedCommand);

    mapCommand(APP.Events.RESUME_FROM_MODEL_STATE, _self.ResumeFromModelStateCommand);
  }

  return {
    initialize: initialize,
    postIntialize: postInitialize,
    createCommand: ObjectUtils.basicFactory
  };

}();