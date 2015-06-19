define('TT.View.AssignmentsView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.setProjectsModel();
        this.initializeSubView(initObj);
      }
    }

    /*
     var opt = [];

     for(var i=0; i<300; i++) {
     opt.push({
     value:'data'+i,
     selected:'false',
     label:'Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data '+i
     });
     }

     this.mbCreator().choice('Add Project',
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
     */

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