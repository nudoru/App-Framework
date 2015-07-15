define('APP.Application',
  function (require, module, exports) {

    var _self,
      _appEventConstants = require('Nori.Events.AppEventConstants'),
      _dispatcher = require('Nori.Utils.Dispatcher');

    function initialize() {
      var appModel, appView;

      _self = this;

      appModel = this.createApplicationModel(require('APP.Model.AppModel'));
      appView = this.createApplicationView(require('APP.View.AppView'));

      this.initializeApplication({model:appModel, view:appView});

      configureAPPEvents();

      this.view().initialize();
      this.model().initialize();
      this.view().removeLoadingMessage();
      this.view().render();
      this.setCurrentRoute(APP.router().getCurrentRoute());
    }

    function configureAPPEvents() {
      _dispatcher.subscribe(_appEventConstants.ROUTE_CHANGED, function(payload) {
        _self.view().updateOnRouteChange(payload.payload);
      });
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;

  });