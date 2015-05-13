/*
 Commands used for most controller functionality.
 */


APP.createNameSpace('APP.AppController');
APP.AppController = function () {
  var _model,
    _view,
    _self,
    _eventDispatcher = require('nudoru.events.EventDispatcher'),
    _eventCommandMap = require('nudoru.events.EventCommandMap'),
    _browserEvents = require('nudoru.events.BrowserEvents'),
    _router = require('nudoru.utils.Router');

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;

    _model = APP.AppModel;
    _view = APP.AppView;

    _router.initialize(_eventDispatcher);
    mapEventCommand(APP.AppEvents.CONTROLLER_INITIALIZED, _self.AppInitializedCommand, true);
    initializeView();
  }

  function mapEventCommand(evt, command, once) {
    once = once || false;
    _eventCommandMap.map(evt, command, once);
  }



  function initializeView() {
    _eventDispatcher.subscribe(APP.AppEvents.VIEW_INITIALIZED, onViewInitalized, true);
    _eventDispatcher.subscribe(APP.AppEvents.VIEW_RENDERED, onViewRendered, true);
    _view.initialize();
  }

  function onViewInitalized() {
    _view.render();
  }

  function onViewRendered() {
    initializeModel();
  }

  function initializeModel() {
    _eventDispatcher.subscribe(APP.AppEvents.MODEL_INITIALIZED, onModelInitialized, true);
    _eventDispatcher.subscribe(APP.AppEvents.MODEL_DATA_LOADED, onModelDataLoaded, true);
    _model.initialize();
  }

  function onModelInitialized() {
    _model.loadModelData();
  }

  function onModelDataLoaded() {
    postInitialize();
  }

  /**
   * After the application is loaded, wire events/command and start it going
   */
  function postInitialize() {
    // Browser events
    mapEventCommand(_browserEvents.BROWSER_RESIZED, _self.BrowserResizedCommand);
    mapEventCommand(_browserEvents.BROWSER_SCROLLED, _self.BrowserScrolledCommand);

    // App events
    mapEventCommand(APP.AppEvents.CHANGE_ROUTE, _self.ChangeRouteCommand);
    mapEventCommand(APP.AppEvents.VIEW_CHANGED, _self.ViewChangedCommand);
    mapEventCommand(APP.AppEvents.VIEW_CHANGE_TO_MOBILE, _self.ViewChangedToMobileCommand);
    mapEventCommand(APP.AppEvents.VIEW_CHANGE_TO_DESKTOP, _self.ViewChangedToDesktopCommand);

    // Routes
    mapRouteView('/', 'TemplateSubView', 'APP.AppView.TemplateSubView', false);
    mapRouteView('/1', 'TestSubView', 'APP.AppView.TemplateSubView', false);

    //AppInitializedCommand takes over when this fires
    _eventDispatcher.publish(APP.AppEvents.CONTROLLER_INITIALIZED);
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

  /**
   * Utility function
   *  1. Create the namespace
   *  2. Picks the last segment of the namespace
   *  3. Sets that to the command class w/ new execute()
   * @param nsStr
   * @param execCode
   */
  function initializeCommand(nsStr, execCode) {
    var parts = nsStr.split('.');
    APP.createNameSpace(nsStr);
    APP.AppController[parts[parts.length-1]] = createAndExtendCommand(execCode);
  }

  /**
   * Instatiate the command object and set exececute() function
   * @param execCode
   * @returns {APP.AppController.AbstractCommand.methods}
   */
  function createAndExtendCommand(execCode) {
    var cmd = Object.create(APP.AppController.AbstractCommand.methods);
    cmd.execute = execCode;
    return cmd;
  }

  return {
    initialize: initialize,
    postIntialize: postInitialize,
    initializeCommand: initializeCommand,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand
  };

}();