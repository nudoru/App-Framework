define('app/App',
  function (require, module, exports) {

    var _noriEventConstants = require('nori/events/EventConstants');

    /**
     * "Controller" for a Nori application. The controller is responsible for
     * bootstrapping the app and possibly handling socket/server interaction.
     * Any additional functionality should be handled in a specific module.
     */
    var App = Nori.createApplication({

      /**
       * Create the main Nori App model and view.
       */
      appModel: require('app/model/AppModel'),
      appView : require('app/view/AppView'),

      /**
       * Intialize the appilcation, view and model
       */
      initialize: function () {
        // listen for the model loaded event
        Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, this.onModelInitialized.bind(this), true);

        this.initializeApplication(); // validates setup
        this.view().initialize();
        this.model().initialize(); // model will acquire data dispatch event when complete
      },

      /**
       * After the model data is ready
       */
      onModelInitialized: function () {
        this.runApplication();
      },

      /**
       * Remove the "Please wait" cover and start the app
       */
      runApplication: function() {
        this.view().removeLoadingMessage();
        this.view().render();
        this.view().showViewFromURLHash(); // Start with the route in the current URL
      }

    });

    module.exports = App;

  });