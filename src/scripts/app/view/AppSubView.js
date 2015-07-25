define('APP.View.AppSubView',
  function (require, module, exports) {

    var _self;

    function initialize(initObj) {
      if(!this.isInitialized()) {
        _self = this;
        // associate with stores
        //APP.registerViewForModelChanges('SomeCollection', this.getID());
        this.initializeSubView(initObj);
      }
    }

    function viewWillUpdate() {
      // Update state from stores
      updateState();
    }

    function updateState() {
      var obj = Object.create(null);
      // build it
      _self.setState(obj);
    }

    // Example of custom render
    //function render() {
    //  this.viewWillRender();
    //  this.setHTML(this.getTemplate()(this.getState()));
    //  // created in mount this.setDOMElement(_domUtils.HTMLStrToNode(this.getHTML()));
    //  this.viewDidRender();
    //}

    //function viewDidMount() {
    //  // good place to assign events or post render
    //}
    //
    //function viewWillUnmount() {
    //  // remove events
    //}

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;

    //exports.viewDidUpdate = viewDidUpdate;
    //exports.viewWillRender = viewWillRender;
    //exports.viewDidRender = viewDidRender;
    //exports.viewWillMount = viewWillMount;
    //exports.viewDidMount = viewDidMount;
    //exports.viewWillUnmount = viewWillUnmount;
    //exports.viewDidUnmount = viewDidUnmount;
  });