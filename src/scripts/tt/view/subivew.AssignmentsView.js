define('TT.View.AssignmentsView',
  function (require, module, exports) {

    var _self;

    function initialize(initObj) {
      _self = this;
      if(!this.isInitialized()) {
        this.setProjectsModel();
        this.initializeSubView(initObj);
        this.setEvents({
          'change #asn_p_table'  : handleInputChangeEvent,
          'click #asn_btn-update': handleNotImpl,
          'click #asn_btn-addnew': handleAddNewClick
        });
      }
    }

    /**
     * Update from the model
     */
    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    /**
     * Render and set from the DOM elements
     */
    function viewDidMount() {
      this.buildProjectRows('asn_p_');
      this.setProjectHeaderRowToolTips('asn_p_');
    }

    /**
     * View is going away, remove anything that it created: Cleanup
     */
    function viewWillUnmount() {
      this.closeAllAlerts();
    }

    //--------------------------------------------------------------------------
    // Custom
    //--------------------------------------------------------------------------

    /**
     * Update sums, data when a field changes and looses focus
     * @param evt
     */
    function handleInputChangeEvent(evt) {
      _self.flashProjectRow(evt.target.getAttribute('id'));

      // DEBUG
      console.log(_self.getProjectRowData());
    }

    function handleAddNewClick() {
      var opt = [];

      for(var i=0; i<300; i++) {
        opt.push({
          value:'data'+i,
          selected:'false',
          label:'Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data '+i
        });
      }

      TT.view().mbCreator().choice('Add Project',
        'Choose a new project to add to your active list',
        opt,
        function(data) {
          console.log('selected',data);
        },
        true);
      //[{value:'data1',selected:'false',label:'Data 1'},
      //  {value:'data2',selected:'true',label:'Data 2'},
      //  {value:'data3',selected:'false',label:'Data 3'}
      //]
    }

    function handleNotImpl() {
      TT.view().mbCreator().alert('Oooops!','This doesn\'t work yet');
    }

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });