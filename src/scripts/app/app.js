/**
 * Application controller
 */

define('APP.Application',
  function (require, module, exports) {

    var _this,
        _appEventConstants = require('Nori.Events.NoriEventConstants'),
        _dispatcher        = require('Nori.Utils.Dispatcher');

    /**
     * Application bootstrapper. Create the model and views and pass to the app
     * to initialize.
     */
    function initialize() {
      _this = this;

      _dispatcher.subscribe(_appEventConstants.APP_MODEL_INITIALIZED, onModelInitialized.bind(this), true);

      // 1
      this.initializeApplication({
        model: this.createApplicationModel(require('APP.Model.AppModel')),
        view : this.createApplicationView(require('APP.View.AppView'))
      });

      // 2
      this.view().initialize();
      // model will acquire data as needed and dispatch event when complete
      this.model().initialize();
    }

    /**
     * When model data has been loaded
     */
    function onModelInitialized() {
      // 3
      this.view().removeLoadingMessage();
      this.view().render();

      // 4 Start it with the route in the current URL
      this.setCurrentRoute(APP.router().getCurrentRoute());
    }

    //----------------------------------------------------------------------------
    //  Handle server or incoming events
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;

  });