define('APP.View.AppSubView',
  function (require, module, exports) {

    var _self;

    /**
     * Initialize subview
     * @param initObj {id, template, mountPoint}
     */
    function initialize(initObj) {
      if(!this.isInitialized()) {
        _self = this;
        this.initializeSubView(initObj);
        // associate with stores
        //APP.registerViewForModelChanges('SomeCollection', this.getID());
      }
    }

    /**
     * Update has been triggered due a change in the registered model
     */
    function viewWillUpdate() {
      // Update state from stores
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

    /**
     * Updated view has been rendered and added to the DOM. Manipulate it here
     */
    function viewDidMount() {
      // good place to assign events or post render
    }

    /**
     * Remove event handlers and perform other cleanup
     */
    function viewWillUnmount() {
      // remove events
    }

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;

    // Other possible lifecycle hooks
    //exports.viewDidUpdate = viewDidUpdate;
    //exports.viewWillRender = viewWillRender;
    //exports.viewDidRender = viewDidRender;
    //exports.viewWillMount = viewWillMount;
    //exports.viewDidUnmount = viewDidUnmount;
  });