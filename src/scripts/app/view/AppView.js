define('app/view/AppView',
  function (require, module, exports) {

    var _noriActionConstants     = require('nori/action/ActionConstants'),
        _mixinApplicationView   = require('nori/view/ApplicationView'),
        _mixinNudoruControls    = require('nori/view/MixinNudoruControls'),
        _mixinComponentViews    = require('nori/view/MixinComponentViews'),
        _mixinRouteViews        = require('nori/view/MixinRouteViews'),
        _mixinEventDelegator    = require('nori/view/MixinEventDelegator'),
        _mixinObservableSubject = require('nori/utils/MixinObservableSubject');

    /**
     * View for an application.
     */

    var AppView = Nori.createApplicationView({

      mixins: [
        _mixinApplicationView,
        _mixinNudoruControls,
        _mixinComponentViews,
        _mixinRouteViews,
        _mixinEventDelegator(),
        _mixinObservableSubject()
      ],

      initialize: function () {
        this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
        this.initializeRouteViews();
        this.initializeNudoruControls();

        this.configureViews();
      },

      configureViews: function () {
        var defaultViewFactory = require('app/view/TemplateViewComponent'),
          defaultView = defaultViewFactory(),
          styleView = defaultViewFactory(),
          controlsView = defaultViewFactory();

        // Container for routed views
        this.setViewMountPoint('#contents');
        this.mapRouteToViewComponent('/', 'default', defaultView);
        this.mapRouteToViewComponent('/styles', 'debug-styletest', styleView);
        this.mapRouteToViewComponent('/controls', 'debug-controls', controlsView);
        this.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

        // Alternately, map views to different model states with MixinModelStateViews
        //this.mapStateToViewComponent('TITLE', 'title', screenTitle);
      },

      /**
       * Draw and UI to the DOM and set events
       */
      render: function () {
        //
      }


    });

    module.exports = AppView;

  });