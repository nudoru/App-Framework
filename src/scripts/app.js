(function () {

  var _browserInfo = require('Nudoru.Browser.BrowserInfo');

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

  // Initialize the window
  window.onload = function() {

    var appModel, appView;

    // Create the application instance
    window.TT = Nori.createApplication();

    // Create the model and view
    appModel = TT.createApplicationModel(require('TT.Model.TimeTrackerAppModel'));
    appView = TT.createApplicationView(require('TT.View.TimeTrackerAppView'));

    // Initialize app with the view
    // App muse be initialized with view for route mapping to work
    TT.initialize({model:appModel, view:appView});

    TT.model().initialize();

    mapEvents();

    // Everything is ready!
    TT.view().removeLoadingMessage();

    // Execute the route on the URL
    TT.setCurrentRoute(TT.router().getCurrentRoute());
  };

  /**
   * Set up commands / events
   */
  function mapEvents() {
    var _appEvents = require('Nori.Events.AppEvents');

    TT.dispatcher().subscribe(_appEvents.ROUTE_CHANGED, function(data) {
      TT.view().updateOnRouteChange(data);
    });

  }



}());