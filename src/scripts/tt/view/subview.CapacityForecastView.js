define('TT.View.CapacityForecastView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.setAssignmentsModel();
        this.initializeSubView(initObj);
      }
    }

    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    function viewDidMount() {
      this.showAlert('Capacity Forecast functionality is coming later in the year.');
    }

    function viewWillUnmount() {
      this.closeAllAlerts();
    }

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;

  });