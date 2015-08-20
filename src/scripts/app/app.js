/**
 * Application controller
 * The control is only responsible for bootstrapping the application. All other
 * functionality should reside in other modules.
 *
 * Startup steps are numbered below
 */

define('app/App',
  function (require, module, exports) {

    var _noriEventConstants = require('nori/events/EventConstants');

    var App = Nori.createApplication({

      /**
       * Application bootstrapper. Create the model and views and pass to the app
       * to initialize.
       */
      initialize: function () {
        var appview  = require('app/view/AppView'),
            appmodel = require('app/model/AppModel');

        Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, this.onModelInitialized.bind(this), true);

        // 1
        this.initializeApplication({
          model: appmodel,
          view : appview
        });

        // 2
        this.view().initialize();
        // model will acquire data as needed and dispatch event when complete
        this.model().initialize();
      },

      /**
       * When model data has been loaded
       */
      onModelInitialized: function () {
        // 3
        this.view().removeLoadingMessage();
        this.view().render();

        // 4 Start with the route in the current URL
        this.view().showViewFromURLHash();
      }
    });

    module.exports = App;

  });