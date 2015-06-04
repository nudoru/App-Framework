var Nori = (function () {
  var _config,
    _view,
    _appModelCollection,
    _emitterCommandMap = Object.create(null),
    _subviewDataModel,
    _modelViewBindingMap = Object.create(null),
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
    initializeConfig();
    _router.initialize();

    _view = initObj.view;

    initializeModels();

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

  function initializeModels() {
    _subviewDataModel = createModel({id:'SubViewDataModel', store:{}, noisy: true});

    _appModelCollection = createModelCollection({id:'GlobalModelCollection', silent: false});
    addModel(_subviewDataModel);
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
    mapEventCommand(_appEvents.SUBVIEW_STORE_STATE, 'Nori.SubViewStoreDataCommand');
  }

  //----------------------------------------------------------------------------
  //  Models
  //  Simple model collection
  //----------------------------------------------------------------------------

  /**
   * Helper to create a new model collection and initalize
   * @param initObj
   * @param extras
   * @returns {*}
   */
  function createModelCollection(initObj, extras) {
    var m = requireExtend('Nori.ModelCollection', extras);
    m.initialize(initObj);
    return m;
  }

  /**
   * Helper to create a new model and initialize
   * @param initObj
   * @param extras
   * @returns {*}
   */
  function createModel(initObj, extras) {
    var m = requireExtend('Nori.Model', extras);
    m.initialize(initObj);
    return m;
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
    if (isValidRoute(routeObj.route)) {
      _config.currentRoute = routeObj;

      // fromApp prop is set in ChangeRouteCommand, indicates it's app not URL generated
      // else is a URL change and just execute current mapping
      if (routeObj.fromApp) {
        _router.setRoute(_config.currentRoute.route, _config.currentRoute.data);
      } else {
        _router.runCurrentRoute();
        _emitter.publish(_appEvents.ROUTE_CHANGED, routeObj);
      }
    } else {
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

  /**
   * Modified a little from from Backbone.js
   * http://backbonejs.org/docs/backbone.html
   * @param protoProps
   * @param staticProps
   * @returns {*}
   */
  //function bextend(src, protoProps, staticProps) {
  //  var parent = src,
  //    child,
  //    Surrogate;
  //
  //  if(protoProps && _.has(protoProps, 'constructor')) {
  //    child = protoProps.constructor;
  //  } else {
  //    child = function() { return parent.apply(this, arguments); };
  //  }
  //
  //  _.assign(child, parent, staticProps);
  //
  //  Surrogate = function() { this.constructor = child; };
  //  Surrogate.prototype = parent.prototype;
  //  child.prototype = new Surrogate;
  //
  //  if(protoProps) {
  //    _.assign(child.prototype, protoProps);
  //  }
  //
  //  child._super = parent.prototype;
  //
  //  return child;
  //}

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
        // dataObj is from the router:
        // route: route,
        // templateID: routeObj.templateID,
        // queryData: queryStrObj
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
  //  Subview data
  //----------------------------------------------------------------------------

  /**
   * Store state data from a subview, called from StoreSubViewDataCommand
   * @param id
   * @param dataObj
   */
  function storeSubViewData(id, dataObj) {
    _subviewDataModel.set(id, dataObj);
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
  //  Model & View Binding
  //----------------------------------------------------------------------------

  /**
   * Associate a model with an array of possilbe views. When notifyBoundViewsOfModelUpdate
   * is called, each view will be notified of the new data
   * @param modelID
   * @param viewID
   */
  function bindModelView(modelID, viewID) {
    var viewArry = _modelViewBindingMap[modelID];

    if(viewArry) {
      if(viewArry.indexOf(viewID) === -1) {
        viewArry.push(viewID);
      }
    } else {
      viewArry = [viewID];
    }

    _modelViewBindingMap[modelID] = viewArry;
  }

  /**
   * Notify any bound views on model change, not collection change
   * @param modelID
   * @param data
   */
  function notifyBoundViewsOfModelUpdate(modelID, data) {
    var viewArry = _modelViewBindingMap[modelID];

    if(viewArry) {
      viewArry.forEach(function (view) {
        _view.updateSubViewData(view, modelID, data);
      });
    }
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
    createModelCollection: createModelCollection,
    createModel: createModel,
    addModel: addModel,
    getModel: getModel,
    setCurrentRoute: setCurrentRoute,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand,
    extend: extend,
    //bextend: bextend,
    create: create,
    storeSubViewData: storeSubViewData,
    retrieveSubViewData: retrieveSubViewData,
    bindModelView: bindModelView,
    notifyBoundViewsOfModelUpdate: notifyBoundViewsOfModelUpdate
  };

}
());