var Nori = (function () {
  var _config,
    _view,
    _appModelCollection,
    _dispatcherCommandMap = Object.create(null),
    _modelViewBindingMap = Object.create(null),
    _appEvents = require('Nori.Events.AppEvents'),
    _browserEvents = require('Nudoru.Browser.BrowserEvents'),
    _objectUtils = require('Nudoru.Core.ObjectUtils'),
    _dispatcher = require('Nori.Events.Dispatcher'),
    _router = require('Nori.Controller.Router');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getDispatcher() {
    return _dispatcher;
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

  function getCurrentRoute() {
    return _.merge({}, _config.currentRoute);
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
    _appModelCollection = createModelCollection({id:'GlobalModelCollection', silent: false});
  }

  function initializeView() {
    _view.initialize();
  }

  function postInitialize() {
    // Model
    _dispatcher.subscribe(_appEvents.MODEL_DATA_CHANGED, function execute(data) {
      handleModelUpdate(data);
    });

    _dispatcher.subscribe(_appEvents.UPDATE_MODEL_DATA, function execute(data) {
      console.log('Update model data, model id: ',data.id, data.data);
    });

    // Subviews
    _dispatcher.subscribe(_browserEvents.URL_HASH_CHANGED, function execute(data) {
      setCurrentRoute(data.routeObj);
    });

    _dispatcher.subscribe(_appEvents.CHANGE_ROUTE, function execute(data) {
      data.fromApp = true;
      setCurrentRoute(data);
    });

    _dispatcher.publish({type:_appEvents.APP_INITIALIZED, payload:{}});
  }


  //----------------------------------------------------------------------------
  //  Models
  //  Simple model collection
  //----------------------------------------------------------------------------

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
  //  Factories - concatenative inheritance
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
   * Create a new Nori application instance
   * @param extras
   * @returns {*}
   */
  function createApplication(extras) {
    return extend(extras, this);
  }

  /**
   * Create a new model collection and initalize
   * @param initObj
   * @param extras
   * @returns {*}
   */
  function createModelCollection(initObj, extras) {
    var m = requireExtend('Nori.Model.ModelCollection', extras);
    m.initialize(initObj);
    return m;
  }

  /**
   * Create a new model and initialize
   * @param initObj
   * @param extras
   * @returns {*}
   */
  function createModel(initObj, extras) {
    var m = requireExtend('Nori.Model.Model', extras);
    m.initialize(initObj);
    return m;
  }

  /**
   * Creates main application view
   * @param extras
   * @returns {*}
   */
  function createApplicationView(extras) {

    // Concat main view with mixins
    var appView = _.assign({},
      require('Nori.View.ApplicationView'),
      require('Nori.View.SubRouteViews'));

    return extend(extras, appView);
    //return extend(extras, require('Nori.View.ApplicationView'));
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
   *  _dispatcher.publish(_appEvents.CHANGE_ROUTE, {route:'/route', data:{}});
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
        _dispatcher.publish({type:_appEvents.ROUTE_CHANGED, payload: routeObj});
      }
    } else {
      _router.setRoute(_config.currentRoute.route, _config.currentRoute.data);
    }
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
    _dispatcherCommandMap[evt] = _dispatcher.subscribeCommand(evt, cmdModuleName);
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
   */
  function mapRouteView(route, templateID, controller) {
    addRouteToConfig(route);

    _view.mapRouteView(templateID, controller);

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
    _view.showRouteView(dataObj);
  }

  //----------------------------------------------------------------------------
  //  Model & View Binding
  //----------------------------------------------------------------------------

  /**
   * Associate a model with an array of views. When notifyBoundViewsOfModelUpdate
   * is called, each view will be notified of the new data
   * @param modelID
   * @param viewID
   */
  function registerForModelChanges(modelID, viewID) {
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
   * @param dataObj
   * {id:storeid, storeType:'model',  store:getStore(), changed:_lastChangeResult}
   * {id:collectionid, storeType:'collection', storeID: data.id, store:data.store}
   */
  function handleModelUpdate(dataObj) {
    var viewArry = _modelViewBindingMap[dataObj.id];

    if(viewArry) {
      viewArry.forEach(function (view) {
        _view.updateView(view);
      });
    }
  }


  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    config: getConfig,
    dispatcher: getDispatcher,
    router: getRouter,
    view: getView,
    createModelCollection: createModelCollection,
    createModel: createModel,
    addModel: addModel,
    getModel: getModel,
    createApplicationView: createApplicationView,
    setCurrentRoute: setCurrentRoute,
    getCurrentRoute: getCurrentRoute,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand,
    extend: extend,
    createApplication: createApplication,
    registerForModelChanges: registerForModelChanges,
    handleModelUpdate: handleModelUpdate
  };

}
());