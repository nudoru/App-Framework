define('app/view/TemplateViewComponent',
  function (require, module, exports) {

    var Component = Nori.view().createComponentView({

      initialize: function (initObj) {
        //Bind to a map, update will be called on changes to the map
        //this.bindMap(map id string or map object);
        //custom init below here
      },

      componentWillUpdate: function () {
        var obj = Object.create(null);
        obj.greeting = 'Hello world!';
        this.setState(obj);
      },

      componentDidMount: function () {
        // Assign events or post render
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         _this.delegateEvents();
         */
      },

      componentWillUnmount: function () {
        // Clean up
      }

    });

    module.exports = Component;

  });