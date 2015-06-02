var Nori = (function () {
  var _config,
    _view,
    _appModelCollection = requireUnique('Nori.ModelCollection'),
    _emitterCommandMap = Object.create(null),
    _subviewDataModel,
    _appEvents = require('Nori.Events.AppEvents'),
    _browserEvents = require('nudoru.events.BrowserEvents'),
    _objectUtils = require('nudoru.utils.ObjectUtils'),
    _emitter = require('Nori.Events.Emitter'),
    _router = require('Nori.Router');

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
  function initialize(initObj) {
    console.log('Nori: Initialize');

    initializeConfig();
    _router.initialize();

    _view = initObj.view;



    _subviewDataModel = createModel({});
    _subviewDataModel.initialize({id:'NoriSubViewDataModel', store:{}, noisy: true});

    _appModelCollection.initialize({id:'NoriGlobalModelCollection', silent: false});
    addModel(_subviewDataModel);



    initializeView();
    postInitialize();
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

  function initializeView() {
    _view.initialize();
  }

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

    // Model
    mapEventCommand(_appEvents.MODEL_DATA_CHANGED, 'Nori.ModelDataChangedCommand');
    mapEventCommand(_appEvents.UPDATE_MODEL_DATA, 'Nori.UpdateModelDataCommand');

    // Subviews
    mapEventCommand(_browserEvents.URL_HASH_CHANGED, 'Nori.URLHashChangedCommand');
    mapEventCommand(_appEvents.CHANGE_ROUTE, 'Nori.ChangeRouteCommand');
    mapEventCommand(_appEvents.SUBVIEW_STORE_DATA, 'Nori.SubViewStoreDataCommand');
  }

  //----------------------------------------------------------------------------
  //  Models
  //  Simple model collection
  //----------------------------------------------------------------------------

  function createModel() {
   // return extend(src, requireUnique('Nori.Model'));
    return _.assign({}, requireUnique('Nori.Model'));
  }

  /**
   * Add a model to the application collection
   * @param name
   * @param store
   */
  function addModel(store) {
    _appModelCollection.add(store);
  }

  /**
   * Get a model from the application collection
   * @param storeID
   * @returns {void|*}
   */
  function getModel(storeID) {
    return _appModelCollection.get(storeID);
  }

  //----------------------------------------------------------------------------
  //  Subview data
  //  Little bit of model creep
  //----------------------------------------------------------------------------

  /**
   * Store state data from a subview, called from StoreSubViewDataCommand
   * @param id
   * @param dataObj
   */
  function storeSubViewData(id, dataObj) {
    _subviewDataModel.set(id, dataObj);

    console.log('Store subview data: '+_subviewDataModel.toJSON());
  }

  /**
   * Retrieve subview data for reinsertion, called from APP mapping of route/when()
   * @param id
   * @returns {*|{}}
   */
  function retrieveSubViewData(id) {
    return _subviewDataModel.get(id) || {};
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
    if (isValidRoute(routeObj.route)) {
      _config.currentRoute = routeObj;

      // fromApp prop is set in ChangeRouteCommand, indicates it's app not URL generated
      // else is a URL change and just execute current mapping
      if (routeObj.fromApp) {
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
  //  Subclassing utils, somewhat inspired by Ember using concatenative inheritance
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
    _router.when(route, {
      templateID: templateID,
      controller: function executeRouteCommand(dataObj) {
        command.execute(dataObj);
      }
    });
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

    _router.when(route, {
      templateID: templateID,
      controller: function routeToViewController(dataObj) {
        // dataObj is from the router
        showRouteView(dataObj);
      }
    });
  }

  /**
   * Pass to the view to show the subview. injects any previous data from the model
   * @param dataObj
   */
  function showRouteView(dataObj) {
    _view.showView(dataObj, retrieveSubViewData(dataObj.templateID));
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
    createModel: createModel,
    addModel: addModel,
    getModel: getModel,
    setCurrentRoute: setCurrentRoute,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand,
    extend: extend,
    create: create,
    storeSubViewData: storeSubViewData,
    retrieveSubViewData: retrieveSubViewData
  };

}
());