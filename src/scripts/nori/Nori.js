var Nori = (function () {
  var _model,
      _view,
      _objectUtils = require('nudoru/core/ObjectUtils'),
      _dispatcher  = require('nori/utils/Dispatcher'),
      _router      = require('nori/utils/Router');

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
    _view  = initObj.view || createApplicationView({});
    _model = initObj.model || createApplicationModel({});
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
      require('nori/model/MixinMapFactory'),
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
    extend                : extend,
    extendWithArray       : extendWithArray,
    prop                  : prop,
    withAttr              : withAttr
  };

}());