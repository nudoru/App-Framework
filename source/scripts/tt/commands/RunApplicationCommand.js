define('TT.RunApplicationCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('TT.RunApplicationCommand');

      // Core commands mapped in APP postInitialize()

      // Map route args:
      // url fragment for route, ID (template id), module name for controller, use singleton module

      // Default route
      TT.mapRouteView('/', 'ControlsTesting', 'Nori.View.ControlsTestingSubView', false);

      // Other routes
      TT.mapRouteView('/test', 'TestSubView', 'Nori.View.TemplateSubView', true);
      TT.mapRouteView('/one', 'TestSubView1', 'Nori.View.TemplateSubView', true);
      TT.mapRouteView('/two', 'TestSubView2', 'Nori.View.TemplateSubView', true);
      TT.mapRouteView('/three', 'TestSubView3', 'Nori.View.TemplateSubView', true);

      TT.view().removeLoadingMessage();

      TT.setCurrentRoute(TT.router().getCurrentRoute());
    };

  });