define('TT.UserProfilePanelView',
  function (require, module, exports) {

    var _browserInfo = require('nudoru.utils.BrowserInfo'),
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('Nori.Events.Emitter');

    function initialize(initObj) {
      this._super.initialize(initObj);
    }

    function viewDidMount() {
      console.log(this.getID() + ', subview did mount');
    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;

  });