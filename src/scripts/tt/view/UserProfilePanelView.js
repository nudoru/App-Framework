define('TT.View.UserProfilePanelView',
  function (require, module, exports) {

    var _currentUserModel;

    function initialize(initObj) {
      if(!this.isInitialized()) {
        _currentUserModel = TT.model().getCurrentUserModel();
        this.initializeSubView(initObj);
      }
    }

    function viewWillUpdate() {
      this.setState({
        userName: _currentUserModel.get('name')
      });
    }

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
  });