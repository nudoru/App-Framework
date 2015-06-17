(function () {

  var _browserInfo = require('Nudoru.Browser.BrowserInfo');

  if(_browserInfo.notSupported || _browserInfo.isIE9) {
    // Lock out older browsers
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {
    // Initialize the window
    window.onload = function() {

      // Create the application instance
      window.TT = Nori.createApplication(require('TT.TimeTrackerApplication'));

      // Kick off the bootstrapping process
      TT.initialize();

    };
  }

}());