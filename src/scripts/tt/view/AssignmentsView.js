define('TT.View.AssignmentsView',
  function (require, module, exports) {

    var _alertID;

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.initializeSubView(initObj);
      }
    }

    function viewDidMount() {
      _alertID = TT.view().alert('Assignments is coming soon!')
    }

    function viewWillUnmount() {
      TT.view().removeMessageBox(_alertID);
    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });