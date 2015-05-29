var Nori = (function () {
  var _config,
    _model,
    _view,
    _emitterCommandMap = Object.create(null),
    _appEvents = require('Nori.Events.AppEvents'),
    _browserEvents = require('nudoru.events.BrowserEvents'),
    _objectUtils = require('nudoru.utils.ObjectUtils'),
    _emitter = require('nudoru.events.Emitter'),
    _router = require('nudoru.utils.Router');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getEmitter() {
    return _emitter;
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
    console.log('Nori: Initialize');

    initializeConfig();
    _router.initialize();

    _model = model;
    _view = view;

    // Commands used in application loading / core initialization
    // Set by new app
    //mapEventCommand(_appEvents.MODEL_DATA_WAITING, 'Nori.ModelDataWaitingCommand', true);
    //mapEventCommand(_appEvents.APP_INITIALIZED, 'Nori.InitializeAppCommand', true);

    initializeView();
  }

  /**
   * Initialize the global vars
   */
  function initializeConfig() {
    _config = {
      appConfig: APP_CONFIG_DATA,
      routes: [],
      currentRoute: {
        route: '/',
        data: undefined
      }
    };
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
   * A MODEL_DATA_WAITING event will dispatch, data should be injected to the model
   * from a command
   */
  function initializeModel() {
    _emitter.subscribe(_appEvents.MODEL_DATA_READY, onModelDataReady, true);
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
    bootStrapCommands();
    _emitter.publish(_appEvents.APP_INITIALIZED);
  }

  /**
   * Core APP command mapping
   */
  function bootStrapCommands() {
    // Browser events
    // unused mapEventCommand(_browserEvents.BROWSER_RESIZED, 'Nori.BrowserResizedCommand');
    // unused mapEventCommand(_browserEvents.BROWSER_SCROLLED, 'Nori.BrowserScrolledCommand');

    // App events
    // unused mapEventCommand(_appEvents.ROUTE_CHANGED, 'Nori.RouteChangedCommand');
    // unused mapEventCommand(_appEvents.VIEW_CHANGED, 'Nori.ViewChangedCommand');
    // unused mapEventCommand(_appEvents.VIEW_CHANGE_TO_MOBILE, 'Nori.ViewChangedToMobileCommand');
    // unused mapEventCommand(_appEvents.VIEW_CHANGE_TO_DESKTOP, 'Nori.ViewChangedToDesktopCommand');

    // Subviews
    mapEventCommand(_browserEvents.URL_HASH_CHANGED, 'Nori.URLHashChangedCommand');
    mapEventCommand(_appEvents.CHANGE_ROUTE, 'Nori.ChangeRouteCommand');
    mapEventCommand(_appEvents.SUBVIEW_STORE_DATA, 'Nori.SubViewStoreDataCommand');
  }
  
  //----------------------------------------------------------------------------
  //  Route Validation
  //  Route obj is {route: '/whatever', data:{var:value,...}
  //----------------------------------------------------------------------------

  /**
   * Add route to the list of valid routes
   * @param route
   */
  function addRouteToConfig(route) {
    _config.routes.push(route);
  }

  /**
   * Determine if the route has been mapped
   * @param route
   * @returns {boolean}
   */
  function isValidRoute(route) {
    return _config.routes.indexOf(route) > -1;
  }

  /**
   * Allow the router to run the route view mapping if it's valid. Typically reached from
   * the ChangeRouteCommand via an emitted event:
   *  _emitter.publish(_appEvents.CHANGE_ROUTE, {route:'/route', data:{}});
   * When the route is changed in this way, this method will fire twice, once for the
   * _router.setRoute and once when the URL hash change event (URLHashChangedCommand).
   * The route changed event is only published on this 2nd call which will trigger the
   * RouteChangedCommand to update views, etc.
   * @param routeObj props: route, data, fromApp
   */
  function setCurrentRoute(routeObj) {
    //console.log('Nori.setCurrentRoute, route: '+routeObj.route+', data: '+routeObj.data);
    if(isValidRoute(routeObj.route)) {
      _config.currentRoute = routeObj;

      // fromApp prop is set in ChangeRouteCommand, indicates it's app not URL generated
      // else is a URL change and just execute current mapping
      if(routeObj.fromApp) {
        //console.log('Routing from app');
        _router.setRoute(_config.currentRoute.route, _config.currentRoute.data);
      } else {
        //console.log('Routing from URL');
        _router.runCurrentRoute();
        _emitter.publish(_appEvents.ROUTE_CHANGED, routeObj);
      }
    } else {
      //console.log('Nori.setCurrentRoute, not a valid route: '+routeObj.route);
      _router.setRoute(_config.currentRoute.route, _config.currentRoute.data);
    }
  }

  //----------------------------------------------------------------------------
  //  Subclassing utils, somewhat inspired by Ember
  //----------------------------------------------------------------------------

  /**
   * Merges objects
   * @param dest Destination object
   * @param src Source
   * @returns {*}
   */
  function extend(dest, src) {
    dest = _.assign({}, src, dest);
    dest._super = src;
    return dest;
  }

  /**
   * Returns a new Nori application instance by extending a base if specified
   * @param ext
   * @returns {*}
   */
  function create(ext) {
    return extend(ext, this);
  }

  //----------------------------------------------------------------------------
  //  Wiring Services
  //----------------------------------------------------------------------------

  /**
   * Maps an event to trigger a command when it's published
   * @param evt The event string
   * @param cmdModuleName Module name of a command object, req execute(dataObj) function
   */
  function mapEventCommand(evt, cmdModuleName) {
    _emitterCommandMap[evt] = _emitter.subscribeCommand(evt, cmdModuleName);
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
  function mapRouteView(route, templateID, controller) {
    addRouteToConfig(route);

    _view.mapView(templateID, controller);

    _router.when(route,{templateID:templateID, controller:function routeToViewController(dataObj) {
      // dataObj is from the router
      showRouteView(dataObj);
    }});
  }

  /**
   * Pass to the view to show the subview. injects any previous data from the model
   * @param dataObj
   */
  function showRouteView(dataObj) {
     _view.showView(dataObj, _model.retrieveSubViewData(dataObj.templateID));
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    config: getConfig,
    getEmitter: getEmitter,
    router: getRouter,
    view: getView,
    model: getModel,
    setCurrentRoute: setCurrentRoute,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand,
    extend: extend,
    create: create
  };

}());