(function () {

  var _browserInfo = require('Nudoru.Browser.BrowserInfo');

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

  // Initialize the window
  window.onload = function() {



    // Create the application instance
    window.TT = Nori.createApplication(require('TT.TimeTrackerApplication'));

    // Kick off the bootstrapping process
    TT.initialize();



  };


}());