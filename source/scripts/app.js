(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo');

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

  // Initialize the window
  window.onload = function() {

    var _appEvents = require('Nori.Events.AppEvents'),
      _model, _view;

    // Create the application instance
    window.TT = Nori.create();

    // Map view routes and other app initialization here
    TT.mapEventCommand(_appEvents.APP_INITIALIZED, 'TT.RunApplicationCommand', true);


    // Create the view
    _view = Nori.extend(require('TT.TimeTrackerAppView'), require('Nori.View'));

    /*
     * Initialize the application by injecting the model and view
     * After the application is initialized (view and model data loaded), the
     * _appEvents.APP_INITIALIZED event is emitted and the mapped command runs.
     * Typically, app/commands/TT.RunApplicationCommand
     */
    TT.initialize({view:_view});
  }

}());