define('TT.TimeTrackerApplication',
  function (require, module, exports) {

    var _self,
      _appEventConstants = require('Nori.Events.AppEventConstants'),
      _dispatcher = require('Nori.Utils.Dispatcher');

    function initialize() {
      var appModel, appView;

      _self = this;

      appModel = this.createApplicationModel(require('TT.Model.TimeTrackerAppModel'));
      appView = this.createApplicationView(require('TT.View.TimeTrackerAppView'));

      this.initializeApplication({model:appModel, view:appView});

      configureTTEvents();

      this.view().initialize();
      this.model().initialize();
      this.view().removeLoadingMessage();
      this.view().render();
      this.setCurrentRoute(TT.router().getCurrentRoute());
    }

    function configureTTEvents() {
      _dispatcher.subscribe(_appEventConstants.ROUTE_CHANGED, function(payload) {
        _self.view().updateOnRouteChange(payload.payload);
      });
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;

  });