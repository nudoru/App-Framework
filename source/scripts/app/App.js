var APP = {};

APP = (function () {
  var _self,
    _config,
    _model,
    _view,
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

  function initialize(model, view) {
    console.log('APP: Initialize');

    initializeConfig();

    _self = this;
    _model = model;
    _view = view;

    _router.initialize(_eventDispatcher);

    mapEventCommand(APP.AppEvents.CONTROLLER_INITIALIZED, _self.AppInitializedCommand, true);

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

  function initializeView() {
    _view.initialize();
    initializeModel();
  }

  function initializeModel() {
    _eventDispatcher.subscribe(APP.AppEvents.MODEL_DATA_WAITING, onModelDataWaiting, true);
    _eventDispatcher.subscribe(APP.AppEvents.MODEL_DATA_READY, onModelDataReady, true);
    _model.initialize();
  }

  function onModelDataWaiting() {
    _model.setData({});
  }

  function onModelDataReady() {
    postInitialize();
  }

  /**
   * All APP initialization is complete, pass over to AppInitialzedCommand
   */
  function postInitialize() {
    _eventDispatcher.publish(APP.AppEvents.CONTROLLER_INITIALIZED);
  }

  //----------------------------------------------------------------------------
  //  Wiring Services
  //----------------------------------------------------------------------------

  /**
   * Name space creation utility function
   * @param str
   * @returns {*}
   */
  function createNameSpace(str) {
    return NNameSpace.createNameSpace(str, APP, "APP");
  }

  /**
   * Maps an event to trigger a command when it's published
   * @param evt The event string
   * @param command The command object
   * @param once True if should only execute once, will be unmapped automatically
   */
  function mapEventCommand(evt, command, once) {
    once = once || false;
    _eventCommandMap.map(evt, command, once);
  }

  /**
   * Utility function
   *  1. Create the namespace
   *  2. Picks the last segment of the namespace
   *  3. Sets that to the command class w/ new execute()
   * @param nsStr format: 'APP.Part', only 2 deep
   * @param execCode
   */
  function initializeCommand(nsStr, execCode) {
    var parts = nsStr.split('.');
    APP.createNameSpace(nsStr);
    APP[parts[parts.length-1]] = createAndExtendCommand(execCode);
  }

  /**
   * Instantiate the command object and set exececute() function
   * @param execCode
   * @returns {APP.AbstractCommand.methods}
   */
  function createAndExtendCommand(execCode) {
    var cmd = Object.create(APP.AbstractCommand.methods);
    cmd.execute = execCode;
    return cmd;
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

  return {
    initialize: initialize,
    createNameSpace: createNameSpace,
    config: getConfig,
    eventDispatcher: getEventDispatcher,
    eventCommandMap: getEventCommandMap,
    router: getRouter,
    view: getView,
    model: getModel,
    initializeCommand: initializeCommand,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand
  };

}());