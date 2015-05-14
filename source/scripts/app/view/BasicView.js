define('APP.BasicView',
  function (require, module, exports) {

    var _self,
      _eventDispatcher = APP.eventDispatcher();

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
      _eventDispatcher.publish(APP.AppEvents.VIEW_INITIALIZED);
      render();
    }

    function render() {
      _eventDispatcher.publish(APP.AppEvents.VIEW_RENDERED);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.render = render;

  });