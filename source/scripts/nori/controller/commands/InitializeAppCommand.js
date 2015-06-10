define('Nori.Controller.Commands.InitializeAppCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      var _browserEvents = require('nudoru.events.BrowserEvents'),
          _appEvents = require('Nori.Events.AppEvents');

      console.log('InitializeAppCommand');

      // Core commands mapped in APP postInitialize()

      // Map route args:
      // url fragment for route, ID (template id), module name for controller, use singleton module

      // Default route
      Nori.mapRouteView('/', 'ControlsTesting', 'Nori.View.ControlsTestingSubView', false);

      // Other routes
      Nori.mapRouteView('/test', 'TestSubView', 'Nori.View.TemplateSubView', true);
      Nori.mapRouteView('/one', 'TestSubView1', 'Nori.View.TemplateSubView', true);
      Nori.mapRouteView('/two', 'TestSubView2', 'Nori.View.TemplateSubView', true);
      Nori.mapRouteView('/three', 'TestSubView3', 'Nori.View.TemplateSubView', true);

      Nori.view().removeLoadingMessage();

      //Nori.router().setRoute('/foo',{
      //  bar:'baz',
      //  baz:'foo'
      //});

      Nori.setCurrentRoute(Nori.router().getCurrentRoute());
    };

  });