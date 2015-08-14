var Nori = (function () {
  var _model,
      _view,
      _modelViewBindingMap = Object.create(null),
      _noriEvents          = require('nori/events/EventCreator'),
      _noriEventConstants  = require('nori/events/EventConstants'),
      _objectUtils         = require('nudoru/core/ObjectUtils'),
      _dispatcher          = require('nori/utils/Dispatcher'),
      _router              = require('nori/utils/Router');

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
    return _objectUtils.extend({}, (window.APP_CONFIG_DATA || {}));
  }

  function getCurrentRoute() {
    return _router.getCurrentRoute();
  }

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  /**
   * Init the app and inject the model and view
   * @param initObj view, model
   */
  function initializeApplication(initObj) {
    _router.initialize();

    _view = initObj.view || createApplicationView({});
    _model = initObj.model || createApplicationModel({});

    configureApplicationEvents();

    _noriEvents.applicationInitialized();
  }

  function configureApplicationEvents() {
    // This triggers views to update on model changes
    _dispatcher.subscribe(_noriEventConstants.MODEL_DATA_CHANGED, function execute(payload) {
      handleModelUpdate(payload.payload);
    });

    // Route changed
    _router.subscribe(function onRouteChange(payload) {
      _noriEvents.routeChanged(payload.routeObj);
    });
  }

  //----------------------------------------------------------------------------
  //  Model binding
  //----------------------------------------------------------------------------

  /**
   * Associate a model with a component view. When notifyBoundViewsOfModelUpdate
   * is called, each view will be notified of the new data
   * @param modelID
   * @param viewID
   */
  function bindToMap(modelID, viewID) {
    if (!modelID || !viewID) {
      throw new Error('Nori, bindToMap: Model ID and View ID must be defined.', modelID, viewID);
    }

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
   * {id:mapid, mapType:'model'}
   * {id:collectionid, mapType:'collection', mapID: data.id}
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
        _view.updateViewComponent(view);
      });
    }
  }

  //----------------------------------------------------------------------------
  //  Factories - concatenative inheritance, decorators
  //----------------------------------------------------------------------------

  /**
   * Merges objects
   * @param base Destination object
   * @param extra Source
   * @returns {*}
   */
  function extend(base, extra) {
    return _.assign({}, base, extra);
  }

  /**
   * Merges a collection of objects
   * @param base
   * @param extArry
   * @returns {*}
   */
  function extendWithArray(base, extArry) {
    while (extArry.length) {
      base = _.assign(base, extArry.shift());
    }
    return base;
  }

  /**
   * Create a new Nori application instance
   * @param extras
   * @returns {*}
   */
  function createApplication(extras) {
    return extendWithArray({}, [
      this,
      extras
    ]);
  }

  /**
   * Creates main application model
   * @param extras
   * @returns {*}
   */
  function createApplicationModel(extras) {
    return extendWithArray({}, [
      require('nori/model/ApplicationModel'),
      require('nori/model/MixinReducerModel'),
      extras
    ]);
  }

  /**
   * Creates main application view
   * @param extras
   * @returns {*}
   */
  function createApplicationView(extras) {
    return extendWithArray({}, [
      require('nori/view/ApplicationView'),
      require('nori/view/MixinComponentViews'),
      requireNew('nori/view/MixinEventDelegator'),
      extras
    ]);
  }

  //----------------------------------------------------------------------------
  // Functional utils from Mithril
  //  https://github.com/lhorie/mithril.js/blob/next/mithril.js
  //----------------------------------------------------------------------------

  // http://mithril.js.org/mithril.prop.html
  function prop(store) {
    //if (isFunction(store.then)) {
    //  // handle a promise
    //}
    var gettersetter = function () {
      if (arguments.length) {
        store = arguments[0];
      }
      return store;
    };

    gettersetter.toJSON = function () {
      return store;
    };

    return gettersetter;
  }

  // http://mithril.js.org/mithril.withAttr.html
  function withAttr(prop, callback, context) {
    return function (e) {
      e = e || event;

      var currentTarget = e.currentTarget || this,
          cntx          = context || this;

      callback.call(cntx, prop in currentTarget ? currentTarget[prop] : currentTarget.getAttribute(prop));
    };
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeApplication  : initializeApplication,
    config                 : getConfig,
    dispatcher             : getDispatcher,
    router                 : getRouter,
    model                  : getModel,
    view                   : getView,
    createApplication      : createApplication,
    createApplicationModel : createApplicationModel,
    createApplicationView  : createApplicationView,
    getCurrentRoute        : getCurrentRoute,
    extend                 : extend,
    extendWithArray        : extendWithArray,
    bindToMap              : bindToMap,
    handleModelUpdate      : handleModelUpdate,
    prop                   : prop,
    withAttr               : withAttr
  };

}
());