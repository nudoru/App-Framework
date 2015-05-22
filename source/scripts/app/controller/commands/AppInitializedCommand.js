define('APP.AppInitializedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      var _browserEvents = require('nudoru.events.BrowserEvents'),
          _appEvents = require('APP.AppEvents');

      console.log('AppInitializedCommand');

      // Browser events
      APP.mapEventCommand(_browserEvents.BROWSER_RESIZED, 'APP.BrowserResizedCommand');
      APP.mapEventCommand(_browserEvents.BROWSER_SCROLLED, 'APP.BrowserScrolledCommand');
      APP.mapEventCommand(_browserEvents.URL_HASH_CHANGED, 'APP.URLHashChangedCommand');

      // App events
      APP.mapEventCommand(_appEvents.ROUTE_CHANGED, 'APP.RouteChangedCommand');
      APP.mapEventCommand(_appEvents.CHANGE_ROUTE, 'APP.ChangeRouteCommand');
      APP.mapEventCommand(_appEvents.VIEW_CHANGED, 'APP.ViewChangedCommand');
      APP.mapEventCommand(_appEvents.VIEW_CHANGE_TO_MOBILE, 'APP.ViewChangedToMobileCommand');
      APP.mapEventCommand(_appEvents.VIEW_CHANGE_TO_DESKTOP, 'APP.ViewChangedToDesktopCommand');

      // Subviews
      APP.mapEventCommand(_appEvents.SUBVIEW_STORE_DATA, 'APP.SubViewStoreDataCommand');

      // Map route args:
      // url fragment for route, ID (template id), module name for controller, use singleton module

      // Default route
      APP.mapRouteView('/', 'ControlsTesting', 'APP.View.ControlsTestingSubView', false);

      // Other routes
      APP.mapRouteView('/test', 'TestSubView', 'APP.View.TemplateSubView', true);
      APP.mapRouteView('/one', 'TestSubView1', 'APP.View.TemplateSubView', true);
      APP.mapRouteView('/two', 'TestSubView2', 'APP.View.TemplateSubView', true);
      APP.mapRouteView('/three', 'TestSubView3', 'APP.View.TemplateSubView', true);

      APP.view().removeLoadingMessage();

      //APP.router().setRoute('/foo',{
      //  bar:'baz',
      //  baz:'foo'
      //});

      APP.setCurrentRoute(APP.router().getCurrentRoute());
    };

  });