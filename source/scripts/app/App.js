var APP = {};

APP = (function () {
  var _self,
    _config,
    _model,
    _view,
    _appEvents = require('APP.AppEvents'),
    _objectUtils = require('nudoru.utils.ObjectUtils'),
    _eventDispatcher = require('nudoru.events.EventDispatcher'),
    _eventCommandMap = require('nudoru.events.EventCommandMap'),
    _router = require('nudoru.utils.Router');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getEventDispatcher() {
    return _eventDispatcher;
  }

  function getEventCommandMap() {
    return _eventCommandMap;
  }

  function getRouter() {
    return _router;
  }

  function getView() {
    return _view;
  }

  function getModel() {
    return _model;
  }

  function getConfig() {
    return _objectUtils.extend({}, _config);
  }

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  /**
   * Init the app and inject the model and view
   * @param model
   * @param view
   */
  function initialize(model, view) {
    console.log('APP: Initialize');

    initializeConfig();

    _self = this;
    _model = model;
    _view = view;

    _router.initialize(_eventDispatcher);

    mapEventCommand(_appEvents.MODEL_DATA_WAITING, 'APP.ModelDataWaitingCommand', true);
    mapEventCommand(_appEvents.CONTROLLER_INITIALIZED, 'APP.AppInitializedCommand', true);

    initializeView();
  }

  /**
   * Initialize the global vars
   */
  function initializeConfig() {
    _config = {};
    _config.appConfig = APP_CONFIG_DATA;
  }

  //----------------------------------------------------------------------------
  //  MVC Initialization
  //----------------------------------------------------------------------------

  /**
   * Init step 1
   */
  function initializeView() {
    _view.initialize();
    initializeModel();
  }

  /**
   * Init step 2
   * A MODEL_DATA_WAITING event will dispatch, running the 'APP.ModelDataWaitingCommand'
   * which will inject data and then onModelDataReady() will run
   */
  function initializeModel() {
    _eventDispatcher.subscribe(_appEvents.MODEL_DATA_READY, onModelDataReady, true);
    _model.initialize();
  }

  /**
   * Init step 3
   */
  function onModelDataReady() {
    postInitialize();
  }

  /**
   * Init step 4
   * All APP initialization is complete, pass over to AppInitialzedCommand
   */
  function postInitialize() {
    _eventDispatcher.publish(_appEvents.CONTROLLER_INITIALIZED);
  }

  //----------------------------------------------------------------------------
  //  Wiring Services
  //----------------------------------------------------------------------------

  /**
   * Name space creation utility function
   * @param str
   * @returns {*}
   */
  //function createNameSpace(str) {
  //  return NNameSpace.createNameSpace(str, APP, "APP");
  //}

  /**
   * Maps an event to trigger a command when it's published
   * @param evt The event string
   * @param command Module name of a command object, req execute(dataObj) function
   * @param once True if should only execute once, will be unmapped automatically
   */
  function mapEventCommand(evt, cmdModuleName, once) {
    once = once || false;
    var cmdModule = require(cmdModuleName);
    _eventCommandMap.map(evt, cmdModule, once);
  }

  /**
   * Set the router to execute the command when on the route
   * @param route
   * @param templateID
   * @param command
   */
  function mapRouteCommand(route, templateID, command) {
    _router.when(route,{templateID:templateID, controller:function executeRouteCommand(dataObj) {
      command.execute(dataObj);
    }});
  }

  /**
   * Maps a route to a view controller
   * @param route
   * @param templateID
   * @param controller
   * @param unique Should it be a singleton controller (false) or unique instance (true)
   */
  function mapRouteView(route, templateID, controller, unique) {
    _view.mapView(templateID, controller, unique);

    _router.when(route,{templateID:templateID, controller:function routeToViewController(dataObj) {
      _view.showView(dataObj);
    }});
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    config: getConfig,
    eventDispatcher: getEventDispatcher,
    eventCommandMap: getEventCommandMap,
    router: getRouter,
    view: getView,
    model: getModel,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand
  };

}());