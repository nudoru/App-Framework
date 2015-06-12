(function () {

  var _browserInfo = require('Nudoru.Browser.BrowserInfo');

  if(_browserInfo.notSupported || _browserInfo.isIE) {
    alert("For the best experience, please use IE10+, Firefox, Chrome or Safari to view this application.");
  }

  // Initialize the window
  window.onload = function() {

    // Create the application instance
    window.TT = Nori.createApplication(require('TT.TimeTrackerApplication'));

    // Kick off the bootstrapping process
    TT.initialize();

  };


}());