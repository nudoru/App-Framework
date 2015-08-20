/**
 * Application controller
 */

define('app/App',
  function (require, module, exports) {

    var _noriEventConstants = require('nori/events/EventConstants');

    var App = Nori.createApplication({

      // The main app model and view are created in these modules
      appModel: require('app/model/AppModel'),
      appView : require('app/view/AppView'),

      initialize: function () {
        Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, this.onModelInitialized.bind(this), true);
        this.initializeApplication(); // validates setup
        this.view().initialize();
        this.model().initialize(); // model will acquire data dispatch event when complete
      },

      onModelInitialized: function () {
        this.runApplication();
      },

      runApplication: function() {
        this.view().removeLoadingMessage();
        this.view().render();
        this.view().showViewFromURLHash(); // Start with the route in the current URL
      }

    });

    module.exports = App;

  });