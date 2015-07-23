define('APP.View.AppView',
  function (require, module, exports) {

    var _self,
        _appEvents = require('Nori.Events.AppEventCreator');

    function initialize() {
      _self = this;

      _self.initializeApplicationView(['applicationscaffold','applicationcomponentsscaffold']);
      _self.setRouteViewMountPoint('#contents');

      APP.mapRouteView('/', 'default', 'APP.View.AppSubView');

      _appEvents.applicationViewInitialized();
    }

    function render() {
      // implement
    }

    exports.initialize = initialize;
    exports.render     = render;
  });