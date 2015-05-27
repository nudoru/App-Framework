define('APP.InitializeAppCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      var _browserEvents = require('nudoru.events.BrowserEvents'),
          _appEvents = require('APP.AppEvents');

      console.log('InitializeAppCommand');

      // Core commands mapped in APP postInitialize()

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