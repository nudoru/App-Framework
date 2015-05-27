(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo'),
      _model = Nori.extend(require('TT.TimeTrackerAppModel'), require('Nori.Model')),
      _view = Nori.extend(require('TT.TimeTrackerAppView'), require('Nori.View'));

  window.onload = Nori.initialize(_model, _view);

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

}());