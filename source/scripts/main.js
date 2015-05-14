(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo'),
      _model = require('APP.Model'),
      _view = require('APP.View');

  window.onload = APP.initialize(_model, _view);

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

}());