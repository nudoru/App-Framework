define('APP.View.AppView',
  function (require, module, exports) {

    var _self,
        _appEvents = require('Nori.Events.AppEventCreator');

    function initialize() {
      _self = this;

      _self.initializeApplicationView(['applicationscaffold','applicationcomponentsscaffold']);
      _self.setRouteViewMountPoint('#contents');

      APP.mapRouteView('/', 'default', 'APP.View.AppSubView');

      // For testing
      APP.mapRouteView('/styles', 'debug-styletest', 'APP.View.AppSubView');
      APP.mapRouteView('/controls', 'debug-controls', 'APP.View.AppSubView');
      APP.mapRouteView('/comps', 'debug-components', 'APP.View.DebugControlsTestingSubView');

      _appEvents.applicationViewInitialized();
    }

    function render() {
      // implement
    }

    exports.initialize = initialize;
    exports.render     = render;
  });