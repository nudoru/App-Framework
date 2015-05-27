/**
 *
 */

define('TT.RunApplicationCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('TT.RunApplicationCommand');

      // Core commands mapped in Nori postInitialize()

      // Map route args:
      // url fragment for route, ID (template id), module name for controller, use singleton module

      // Default route

      // Other routes
      TT.mapRouteView('/controls', 'ControlsTesting', 'TT.View.ControlsTestingSubView');
      TT.mapRouteView('/test', 'TestSubView', 'TT.View.TemplateSubView');
      TT.mapRouteView('/one', 'TestSubView1', 'TT.View.TemplateSubView');
      TT.mapRouteView('/two', 'TestSubView2', 'TT.View.TemplateSubView');
      TT.mapRouteView('/three', 'TestSubView3', 'TT.View.TemplateSubView');

      TT.view().removeLoadingMessage();

      TT.setCurrentRoute(TT.router().getCurrentRoute());
    };

  });