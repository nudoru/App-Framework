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
       * Create the main Nori App store and view.
       */
      appStore: require('app/store/AppStore'),
      appView : require('app/view/AppView'),

      /**
       * Initialize the application, view and store
       */
      initialize: function () {
        this.initializeApplication(); // validates setup

        this.view().initialize();

        this.store().initialize(); // store will acquire data dispatch event when complete
        this.store().subscribe('storeInitialized', this.onStoreInitialized.bind(this));
        this.store().loadStore();
      },

      /**
       * After the store data is ready
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