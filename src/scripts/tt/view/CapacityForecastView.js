define('TT.View.CapacityForecastView',
  function (require, module, exports) {

    var _alertID;

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.initializeSubView(initObj);
      }
    }

    function viewDidMount() {
      _alertID = TT.view().alert('Capacity Forecast functionality is coming later in the year.')
    }

    function viewWillUnmount() {
      TT.view().removeMessageBox(_alertID);
    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });