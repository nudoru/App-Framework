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
    mapCommand(APP.AppEvents.CONTROLLER_INITIALIZED, _self.AppInitializedCommand, true);
    initializeView();
  }

  function mapCommand(evt, command, once) {
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
    mapCommand(_browserEvents.BROWSER_RESIZED, _self.BrowserResizedCommand);
    mapCommand(_browserEvents.BROWSER_SCROLLED, _self.BrowserScrolledCommand);

    // App events
    mapCommand(APP.AppEvents.VIEW_CHANGE_TO_MOBILE, _self.ViewChangedToMobileCommand);
    mapCommand(APP.AppEvents.VIEW_CHANGE_TO_DESKTOP, _self.ViewChangedToDesktopCommand);

    // Routes
    //mapRouteCommand('/', 'TemplateSubView', _self.RouteChangedCommand);
    //mapRouteCommand('/1', 'TestSubView', _self.RouteChangedCommand);

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

    mapView(templateID, false);
  }

  /**
   * Set up mapping between route to html template and sub view module in a 1:1 relationship
   * @param templateID
   * @param unique
   */
  function mapView(templateID, unique) {
    _view.mapView(templateID, unique);
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
    initializeCommand: initializeCommand
  };

}();