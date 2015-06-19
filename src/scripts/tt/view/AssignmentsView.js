define('TT.View.AssignmentsView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.setProjectsModel();
        this.initializeSubView(initObj);
        this.setEvents({
          'click #asn_btn-update': handleNotImpl,
          'click #asn_btn-addnew': handleAddNew
        });
      }
    }

    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    function viewDidMount() {
      //
    }

    function viewWillUnmount() {
      //
    }

    //--------------------------------------------------------------------------
    // Custom
    //--------------------------------------------------------------------------

    function handleAddNew() {
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