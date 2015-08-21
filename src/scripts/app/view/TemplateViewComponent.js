define('app/view/TemplateViewComponent',
  function (require, module, exports) {

    /**
     * Module for a dynamic application view for a route or a persistent view
     */

    var Component = Nori.view().createComponentView({

      /**
       * Initialize and bind, called once on first render. Parent component is
       * initialized from app view
       * @param configProps
       */
      initialize: function (configProps) {
        //Bind to a map, update will be called on changes to the map
        //this.bindMap(map id string or map object);
        //this.bindMap(APP.model());
        //custom init below here
      },

      /**
       * Set initial state properties. Call once on first render
       */
      getInitialState: function() {
        return {
          greeting: 'Hello world!'
        };
      },

      /**
       * State change on bound models (map, etc.) Update the component state
       */
      componentWillUpdate: function () {
        //console.log(APP.model().getState());
        //var obj = {};
        // set props
        //this.setState(obj);
      },

      /**
       * Component HTML was attached to the DOM
       */
      componentDidMount: function () {
        /* Sample event delegator syntax
         this.setEvents({
         'click #button-id': handleButton
         });
         _this.delegateEvents();
         */
      },

      /**
       * Component will be removed from the DOM
       */
      componentWillUnmount: function () {
        // Clean up
      }

    });

    module.exports = Component;

  });