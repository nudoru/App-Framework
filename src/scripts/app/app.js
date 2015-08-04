define('APP.Application',
  function (require, module, exports) {

    var _this,
        _appEventConstants = require('Nori.Events.AppEventConstants'),
        _dispatcher        = require('Nori.Utils.Dispatcher');

    /**
     * Application bootstrapper. Create the model and views and pass to the app
     * to initialize.
     */
    function initialize() {
      _this = this;

      _dispatcher.subscribe(_appEventConstants.APP_MODEL_INITIALIZED, onModelInitialized);

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

    function onModelInitialized() {
      _dispatcher.unsubscribe(_appEventConstants.APP_MODEL_INITIALIZED, onModelInitialized);

      // 3
      _this.view().removeLoadingMessage();
      _this.view().render();

      // 4 Start it with the route in the current URL
      _this.setCurrentRoute(APP.router().getCurrentRoute());
    }

    exports.initialize = initialize;

  });