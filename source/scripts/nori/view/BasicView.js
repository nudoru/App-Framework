define('Nori.View.BasicView',
  function (require, module, exports) {

    var _self,
      _eventDispatcher = Nori.eventDispatcher();

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
      _eventDispatcher.publish(Nori.AppEvents.VIEW_INITIALIZED);
      render();
    }

    function render() {
      _eventDispatcher.publish(Nori.AppEvents.VIEW_RENDERED);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.render = render;

  });