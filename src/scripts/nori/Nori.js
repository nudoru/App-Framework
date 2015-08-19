define('nori/Nori',
  function (require, module, exports) {

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
          _view  = initObj.view || createApplicationView({});
          _model = initObj.model || createApplicationModel({});
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
         * @param extras
         * @returns {*}
         */
        function createApplication(extras) {
          return assignArray({}, [
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
          return assignArray({}, [
            require('nori/model/MixinMapFactory'),
            require('nori/utils/MixinObservableSubject'),
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
          return assignArray({}, [
            require('nori/view/ApplicationView'),
            require('nori/view/MixinNudoruControls'),
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
          assignArray           : assignArray,
          prop                  : prop,
          withAttr              : withAttr
        };

      }());

    module.exports = Nori;

  });

