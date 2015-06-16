define('TT.View.AssignmentsView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.setProjectsModel();
        this.initializeSubView(initObj);
      }
    }

    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    function viewDidMount() {
      this.showAlert('Assignments coming soon!');
    }

    function viewWillUnmount() {
      this.closeAllAlerts();
    }

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });