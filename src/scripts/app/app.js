define('app/App',
  function (require, module, exports) {

    var _noriActionCreator = require('nori/action/ActionCreator');

    /**
     * "Controller" for a Nori application. The controller is responsible for
     * bootstrapping the app and possibly handling socket/server interaction.
     * Any additional functionality should be handled in a specific module.
     */
    var App = Nori.createApplication({

      mixins: [],

      /**
       * Create the main Nori App model and view.
       */
      appModel: require('app/model/AppModel'),
      appView : require('app/view/AppView'),

      /**
       * Initialize the application, view and model
       */
      initialize: function () {
        this.initializeApplication(); // validates setup

        this.view().initialize();

        this.model().initialize(); // model will acquire data dispatch event when complete
        this.model().subscribe('storeInitialized', this.onStoreInitialized.bind(this));
        this.model().loadStore();
      },

      /**
       * After the model data is ready
       */
      onStoreInitialized: function () {
        this.runApplication();
      },

      /**
       * Remove the "Please wait" cover and start the app
       */
      runApplication: function () {
        this.view().removeLoadingMessage();
        this.view().render();
        this.view().showViewFromURLHash(true); // Start with the route in the current URL
      }

    });

    module.exports = App;

  });