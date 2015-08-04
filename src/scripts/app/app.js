define('APP.Application',
  function (require, module, exports) {

    /**
     * Application bootstrapper. Create the model and views and pass to the app
     * to initialize.
     */
    function initialize() {
      // 1
      this.initializeApplication({
        model: this.createApplicationModel(require('APP.Model.AppModel')),
        view: this.createApplicationView(require('APP.View.AppView'))
      });

      // 2
      this.view().initialize();
      this.model().initialize();

      // 3 Add code to wait for model initialization to complete if required
      // else, start the view
      this.view().removeLoadingMessage();
      this.view().render();

      // 4 Start it with the route in the current URL
      this.setCurrentRoute(APP.router().getCurrentRoute());
    }

    exports.initialize = initialize;

  });