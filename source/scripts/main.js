(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo');

  window.onload = APP.initialize();

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

}());