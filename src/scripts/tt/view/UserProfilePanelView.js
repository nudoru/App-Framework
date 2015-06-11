define('TT.View.UserProfilePanelView',
  function (require, module, exports) {

    var _browserInfo = require('Nudoru.Browser.BrowserInfo'),
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('Nudoru.Browser.DOMUtils'),
      _dispatcher = require('Nori.Events.Dispatcher');

    function initialize(initObj) {
      this._super.initialize(initObj);
    }

    function viewDidMount() {
      console.log(this.getID() + ', subview did mount');
    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;

  });