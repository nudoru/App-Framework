var Nori = (function () {

  var _model,
      _view,
      _dispatcher = require('nori/utils/Dispatcher'),
      _router     = require('nori/utils/Router');

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
    return _.assign({}, (window.APP_CONFIG_DATA || {}));
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

    console.log('Initializing Nori, model? '+(_model ? 'Yes' : 'No')+', view? '+(_view ? 'Yes' : 'No'));

    _view  = _view || createApplicationView({});
    _model = _model || createApplicationModel({});
  }

  //----------------------------------------------------------------------------
  //  Factories - concatenative inheritance, decorators
  //----------------------------------------------------------------------------

  /**
   * Merges a collection of objects
   * @param target
   * @param sourceArray
   * @returns {*}
   */
  function assignArray(target, sourceArray) {
    sourceArray.forEach(function (source) {
      target = _.assign(target, source);
    });
    return target;
  }

  /**
   * Create a new Nori application instance
   * @param custom
   * @returns {*}
   */
  function createApplication(custom) {
    return assignArray({}, [
      this,
      custom
    ]);
  }

  /**
   * Creates main application model
   * @param custom
   * @returns {*}
   */
  function createApplicationModel(custom) {
    var observable = require('nori/utils/MixinObservableSubject');

    _model = assignArray({}, [
      require('nori/model/MixinMapFactory'),
      observable(),
      require('nori/model/MixinReducerModel'),
      custom
    ]);

    return _model;
  }

  /**
   * Creates main application view
   * @param custom
   * @returns {*}
   */
  function createApplicationView(custom) {
    var eventDelegator = require('nori/view/MixinEventDelegator');

    _view = assignArray({}, [
      require('nori/view/ApplicationView'),
      require('nori/view/MixinNudoruControls'),
      require('nori/view/MixinComponentViews'),
      eventDelegator(),
      custom
    ]);

    return _view;
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
    initializeApplication : initializeApplication,
    config                : getConfig,
    dispatcher            : getDispatcher,
    router                : getRouter,
    model                 : getModel,
    view                  : getView,
    createApplication     : createApplication,
    createApplicationModel: createApplicationModel,
    createApplicationView : createApplicationView,
    getCurrentRoute       : getCurrentRoute,
    assignArray           : assignArray,
    prop                  : prop,
    withAttr              : withAttr
  };

}());


