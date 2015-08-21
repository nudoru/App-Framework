define('app/view/TemplateViewComponent',
  function (require, module, exports) {

    /**
     * Module for a dynamic application view for a route or a persistent view
     */

    var Component = Nori.view().createComponentView({
      /**
       * Mixins are other modules/objects that multiple components share, provides
       * common functionality between then.
       */
      //mixins: [
      //  {
      //    render: function () {
      //      return '<h1>MIXIN!</h1>';
      //    }
      //  }
      //],

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
        //this.setTemplate('<h1>{{ greeting }}</h1>'); // set custom HTML template
      },

      /**
       * Set initial state properties. Call once on first render
       */
      getInitialState: function () {
        return APP.model().getState();
      },

      /**
       * State change on bound models (map, etc.) Return nextState object
       */
      componentWillUpdate: function () {
        var nextState = APP.model().getState();
        nextState.greeting += ' (updated)';
        return nextState;
      },

      /**
       * Determine if update/redraw should occur
       * @param nextState
       * @returns {*}
       */
      //shouldComponentUpdate: function(nextState) {
      //  // Test for differences between nextState and this.getState()
      //},

      /**
       * Render override must return HTML.
       */
      //render: function() {
      //  var state = this.getState();
      //  return '<h1>'+state.greeting+'</h1>';
      //},

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