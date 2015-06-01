/**
 * Starting point for the application after the view renders and model data is loaded
 */

define('TT.RunApplicationCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('TT.RunApplicationCommand');

      var _appEvents = require('Nori.Events.AppEvents');

      // Browser events
      // unused mapEventCommand(_browserEvents.BROWSER_RESIZED, 'Nori.BrowserResizedCommand');
      // unused mapEventCommand(_browserEvents.BROWSER_SCROLLED, 'Nori.BrowserScrolledCommand');

      // App events
      // unused mapEventCommand(_appEvents.ROUTE_CHANGED, 'Nori.RouteChangedCommand');
      // unused mapEventCommand(_appEvents.VIEW_CHANGED, 'Nori.ViewChangedCommand');
      // unused mapEventCommand(_appEvents.VIEW_CHANGE_TO_MOBILE, 'Nori.ViewChangedToMobileCommand');
      // unused mapEventCommand(_appEvents.VIEW_CHANGE_TO_DESKTOP, 'Nori.ViewChangedToDesktopCommand');

      // Commands
      TT.mapEventCommand(_appEvents.ROUTE_CHANGED, 'TT.RouteChangedCommand');

      /*
       Map route args:
       url fragment for route, ID (template id), module name for controller, use singleton module
       */

      // Default route
      TT.mapRouteView('/', 'Timecard', 'TT.View.TemplateSubView');

      // Other routes
      TT.mapRouteView('/controls', 'ControlsTesting', 'TT.View.ControlsTestingSubView');
      TT.mapRouteView('/test', 'TestSubView', 'TT.View.TemplateSubView');
      TT.mapRouteView('/one', 'TestSubView1', 'TT.View.TemplateSubView');
      TT.mapRouteView('/two', 'TestSubView2', 'TT.View.TemplateSubView');
      TT.mapRouteView('/three', 'TestSubView3', 'TT.View.TemplateSubView');

      // Timecard mock
      TT.mapRouteView('/Forecast', 'Forecast', 'TT.View.TemplateSubView');
      TT.mapRouteView('/Assignments', 'Assignments', 'TT.View.TemplateSubView');
      TT.mapRouteView('/Timecard', 'Timecard', 'TT.View.TemplateSubView');

      var dataSource = require('TT.FakeData');
      dataSource.initialize();
      _model = Nori.extend(require('TT.TimeTrackerAppModel'), require('Nori.Model'));
      _model.set(dataSource);

      TT.view().removeLoadingMessage();

      TT.setCurrentRoute(TT.router().getCurrentRoute());
    };

  });