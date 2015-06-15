define('TT.View.AssignmentsView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.initializeSubView(initObj);
      }
    }

    function viewDidMount() {
      this.showAlert('Assignments coming soon!');
    }

    function viewWillUnmount() {
      this.closeAllAlerts();
    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });