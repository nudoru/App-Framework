var Nori = (function () {
  var _config,
    _model,
    _view,
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

  function getModel() {
    return _model;
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
  function initializeApplication(initObj) {
    initializeConfig();
    _router.initialize();

    if(initObj.view) {
      _view = initObj.view;
    } else {
      console.log('Nori, no view. Creating default.');
      _view = createApplicationView({});
    }

    if(initObj.model) {
      _model = initObj.model;
    } else {
      console.log('Nori, no model. Creating default.');
      _model = createApplicationModel({});
    }

    configureApplicationEvents();
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

  function configureApplicationEvents() {
    // Model
    _dispatcher.subscribe(_appEvents.MODEL_DATA_CHANGED, function execute(payload) {
      handleModelUpdate(payload);
    });

    _dispatcher.subscribe(_appEvents.UPDATE_MODEL_DATA, function execute(payload) {
      console.log('Update model data, model id: ', payload.id, payload.data);
    });

    // Subviews
    _dispatcher.subscribe(_browserEvents.URL_HASH_CHANGED, function execute(payload) {
      setCurrentRoute(payload.routeObj);
    });

    _dispatcher.subscribe(_appEvents.CHANGE_ROUTE, function execute(payload) {
      payload.fromApp = true;
      setCurrentRoute(payload);
    });

    _dispatcher.publish({type: _appEvents.APP_INITIALIZED, payload: {}});
  }


  //----------------------------------------------------------------------------
  //  Model binding
  //----------------------------------------------------------------------------

  /**
   * Associate a model with an array of views. When notifyBoundViewsOfModelUpdate
   * is called, each view will be notified of the new data
   * @param modelID
   * @param viewID
   */
  function registerViewForModelChanges(modelID, viewID) {
    var viewArry = _modelViewBindingMap[modelID];

    if (viewArry) {
      if (viewArry.indexOf(viewID) === -1) {
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
    notifyViewsOfModelUpdate(dataObj.id);
  }

  /**
   * Tell views to update if they're listening to a model
   * @param modelID
   */
  function notifyViewsOfModelUpdate(modelID) {
    var viewArry = _modelViewBindingMap[modelID];

    if (viewArry) {
      viewArry.forEach(function (view) {
        _view.updateView(view);
      });
    }
  }

  //----------------------------------------------------------------------------
  //  View Routes
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
        _dispatcher.publish({
          type: _appEvents.ROUTE_CHANGED,
          payload: routeObj
        });
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
   * Creates main application model
   * @param extras
   * @returns {*}
   */
  function createApplicationModel(extras) {

    // Concat main model with mixins
    var appModel= _.assign({}, require('Nori.Model.ApplicationModel'));

    return extend(extras, appModel);
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
      require('Nori.View.ViewMixinSubViewRoutes'));

    return extend(extras, appView);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeApplication: initializeApplication,
    config: getConfig,
    dispatcher: getDispatcher,
    router: getRouter,
    model: getModel,
    view: getView,
    createApplication: createApplication,
    createApplicationModel: createApplicationModel,
    createApplicationView: createApplicationView,
    setCurrentRoute: setCurrentRoute,
    getCurrentRoute: getCurrentRoute,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand,
    extend: extend,
    registerViewForModelChanges: registerViewForModelChanges,
    handleModelUpdate: handleModelUpdate
  };

}
());