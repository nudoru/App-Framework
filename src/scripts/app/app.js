define('APP.Application',
  function (require, module, exports) {

    var _this;

    function initialize() {
      var appModel, appView;

      _this = this;

      appModel = this.createApplicationModel(require('APP.Model.AppModel'));
      appView = this.createApplicationView(require('APP.View.AppView'));

      this.initializeApplication({model:appModel, view:appView});

      this.view().initialize();
      this.model().initialize();

      // Could wait for model initialization to complete
      this.view().removeLoadingMessage();
      this.view().render();

      // Start it with the route in the URL
      this.setCurrentRoute(APP.router().getCurrentRoute());
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;

  });