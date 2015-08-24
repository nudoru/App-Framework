define('app/view/TemplateViewComponentFactory',
  function (require, module, exports) {

    /**
     * Module for a dynamic application view for a route or a persistent view
     * implemented as a factory module.
     *
     * THIS STYLE IS CURRENTLY DEPRECIATED
     */
    var Component = function () {

      /**
       * Initialize subview
       * @param configProps {id, template, mountPoint}
       */
      function initialize(configProps) {
        //this.bindMap(map id string or map object);
        // custom init below here
      }

      /**
       * State change on bound models (map, etc.) Update the component state
       */
      function componentWillUpdate() {
        var obj = Object.create(null);
        // Update state from stores
        this.setState(obj);
      }

      /**
       * Component HTML was attached to the DOM
       */
      function componentDidMount() {
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         this.delegateEvents();
         */
      }

      /**
       * Component will be removed from the DOM
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