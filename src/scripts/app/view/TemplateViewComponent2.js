define('app/view/TemplateViewComponent2',
  function (require, module, exports) {

    var TemplateViewComponent2 = Nori.view().createComponentView({
      initialize: function (initObj) {
        console.log('testcomp init');
        if (!this.isInitialized()) {
          this.initializeComponent(initObj);
          //this.bindMap(map id string or map object);
          // custom init below here
        }
      },

      componentWillUpdate: function () {
        console.log('testcomp will update');
        var obj = Object.create(null);
        // Update state from stores
        this.setState(obj);
      },

      componentDidMount: function () {
        console.log('testcomp did mount',this);
        // good place to assign events or post render
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         _this.delegateEvents();
         */
      },

      componentWillUnmount: function () {
        console.log('testcomp will unmount');
      }
    });

    module.exports = TemplateViewComponent2;

  });