(function () {

  var _browserInfo = require('nudoru/browser/BrowserInfo');

  if(_browserInfo.notSupported || _browserInfo.isIE9) {
    // Lock out older browsers
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {
    // Initialize the window
    window.onload = function() {

      // Create the application instance
      window.Nori = require('nori/Nori');
      window.APP = Nori.createApplication(require('app/App'));

      // Might need this janky timeout in some situations
      setTimeout(startApplication, 1);

      function startApplication() {
        // Kick off the bootstrapping process
        APP.initialize();
      }

    };
  }

}());