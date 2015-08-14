/**
 * Application controller
 * The control is only responsible for bootstrapping the application. All other
 * functionality should reside in other modules.
 *
 * Startup steps are numbered below
 */

define('app/App',
  function (require, module, exports) {

    var _this,
        _noriEventConstants = require('nori/events/EventConstants');

    /**
     * Application bootstrapper. Create the model and views and pass to the app
     * to initialize.
     */
    function initialize() {
      _this = this;

      Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, onModelInitialized.bind(this), true);

      // 1
      this.initializeApplication({
        model: this.createApplicationModel(require('app/model/AppModel')),
        view : this.createApplicationView(require('app/view/AppView'))
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

      // 4 Start with the route in the current URL
      //this.router().executeCurrent();
      this.view().loadCurrentRoute();
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;

  });