define('TT.View.UserProfilePanelView',
  function (require, module, exports) {

    var _currentUserModel;
      _browserInfo = require('Nudoru.Browser.BrowserInfo'),
      _appEvents = require('Nori.Events.AppEventConstants'),
      _domUtils = require('Nudoru.Browser.DOMUtils'),
      _dispatcher = require('Nori.Events.Dispatcher');

    function initialize(initObj) {
      if(!this.isInitialized()) {
        _currentUserModel = TT.model().getCurrentUserModel();
      }

      this.initializeSubView(initObj);
    }

    function viewWillUpdate() {
      this.setState({
        userName: _currentUserModel.get('name')
      });
    }

    function viewDidMount() {
      //console.log(this.getID() + ', subview did mount');
    }

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
    exports.viewDidMount = viewDidMount;

  });