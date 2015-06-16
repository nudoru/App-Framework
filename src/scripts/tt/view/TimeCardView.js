define('TT.View.TimeCardView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.setProjectsModel();

        this.initializeSubView(initObj);

        this.setEvents({
          'change #tc_p_table':function(evt) {
            console.log('change',evt);
          }
        });
      }
    }

    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    function viewDidMount() {

    }

    function viewWillUnmount() {
      //
    }

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });