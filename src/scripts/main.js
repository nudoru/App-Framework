(function () {

  var _browserInfo = require('nudoru/browser/BrowserInfo');

  if(_browserInfo.notSupported || _browserInfo.isIE9) {
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {
    window.onload = function() {
      window.APP = require('app/App');
      APP.initialize()
    };
  }

}());