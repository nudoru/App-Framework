/**
 * Template for an app subview or module. Override lifecycle function hooks.
 * Extended from Nori.View.ApplicationSubView
 */

define('app/view/AppSubView',
  function (require, module, exports) {

    var _this;

    /**
     * Initialize subview
     * @param initObj {id, template, mountPoint}
     */
    function initialize(initObj) {
      if(!this.isInitialized()) {
        _this = this;
        this.initializeSubView(initObj);
        // associate with stores. viewWillUpdate() fires when it changes
        //this.bindMap('SomeCollection');
        // custom init below here
      }
    }

    /**
     * Update has been triggered due a change in the bound model
     */
    function viewWillUpdate() {
      // Update state from stores
      var obj = Object.create(null);
      // build it
      _this.setState(obj);
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
      /*
       _this.setEvents({
       'click #button-id': handleButton
       });
       _this.delegateEvents();
       */
    }

    /**
     * Remove event handlers and perform other cleanup
     */
    function viewWillUnmount() {
      // remove events
    }

    module.exports.initialize = initialize;
    module.exports.viewWillUpdate = viewWillUpdate;
    module.exports.viewDidMount = viewDidMount;
    module.exports.viewWillUnmount = viewWillUnmount;

    // Other possible lifecycle hooks
    //module.exports.viewDidUpdate = viewDidUpdate;
    //module.exports.viewWillRender = viewWillRender;
    //module.exports.viewDidRender = viewDidRender;
    //module.exports.viewWillMount = viewWillMount;
    //module.exports.viewDidUnmount = viewDidUnmount;
  });