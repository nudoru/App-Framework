/**
 * Template for an app component view. Override lifecycle function hooks.
 * Extended from Nori.View.ApplicationSubView
 */

define('app/view/ViewComponent',
  function (require, module, exports) {

    var _this;

    /**
     * Initialize subview
     * @param initObj {id, template, mountPoint}
     */
    function initialize(initObj) {
      if(!this.isInitialized()) {
        _this = this;
        this.initializeComponent(initObj);
        // associate with stores. componentWillUpdate() fires when it changes
        //this.bindMap('SomeCollection');
        // custom init below here
      }
    }

    /**
     * Update has been triggered due a change in the bound model
     */
    function componentWillUpdate() {
      // Update state from stores
      var obj = Object.create(null);
      // build it
      _this.setState(obj);
    }

    // Example of custom render
    //function render() {
    //  this.componentWillRender();
    //  this.setHTML(this.getTemplate()(this.getState()));
    //  // created in mount this.setDOMElement(_domUtils.HTMLStrToNode(this.getHTML()));
    //  this.componentDidRender();
    //}

    /**
     * Updated view has been rendered and added to the DOM. Manipulate it here
     */
    function componentDidMount() {
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
    function componentWillUnmount() {
      // remove events
    }

    module.exports.initialize = initialize;
    module.exports.componentWillUpdate = componentWillUpdate;
    module.exports.componentDidMount = componentDidMount;
    module.exports.componentWillUnmount = componentWillUnmount;

    // Other possible lifecycle hooks
    //module.exports.componentDidUpdate = componentDidUpdate;
    //module.exports.componentWillRender = componentWillRender;
    //module.exports.componentDidRender = componentDidRender;
    //module.exports.componentWillMount = componentWillMount;
    //module.exports.componentDidUnmount = componentDidUnmount;
  });