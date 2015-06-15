define('TT.View.CapacityForecastView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.initializeSubView(initObj);
      }
    }

    function viewDidMount() {
      this.showAlert('Capacity Forecast functionality is coming later in the year.');
    }

    function viewWillUnmount() {
      this.closeAllAlerts();
    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });