define('app/view/TemplateViewComponentFactory',
  function (require, module, exports) {

    var Component = function () {

      /**
       * Initialize subview
       * @param initObj {id, template, mountPoint}
       */
      function initialize(initObj) {
        if (!this.isInitialized()) {
          this.initializeComponent(initObj);
          //this.bindMap(map id string or map object);
          // custom init below here
        }
      }

      /**
       * Update has been triggered due a change in the bound model
       */
      function componentWillUpdate() {
        var obj = Object.create(null);
        // Update state from stores
        this.setState(obj);
      }

      /**
       * Updated view has been rendered and added to the DOM. Manipulate it here
       */
      function componentDidMount() {
        // good place to assign events or post render
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         this.delegateEvents();
         */
      }

      /**
       * Remove event handlers and perform other cleanup
       */
      function componentWillUnmount() {
        // cleanup
      }

      return {
        initialize          : initialize,
        componentWillUpdate : componentWillUpdate,
        componentDidMount   : componentDidMount,
        componentWillUnmount: componentWillUnmount
      };

    };

    module.exports = Component;

  });