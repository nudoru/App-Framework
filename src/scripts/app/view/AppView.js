ndefine('app/view/AppView',
  function (nrequire, module, exports) {

    var _mixinApplicationView   = nrequire('nori/view/ApplicationView'),
        _mixinNudoruControls    = nrequire('nori/view/MixinNudoruControls'),
        _mixinComponentViews    = nrequire('nori/view/MixinComponentViews'),
        _mixinRouteViews        = nrequire('nori/view/MixinRouteViews'),
        _mixinEventDelegator    = nrequire('nori/view/MixinEventDelegator'),
        _mixinObservableSubject = nrequire('nori/utils/MixinObservableSubject');

    /**
     * View for an application.
     */

    var AppView = Nori.createView({

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
        var defaultViewFactory = nrequire('app/view/TemplateViewComponent'),
          defaultView = defaultViewFactory(),
          styleView = defaultViewFactory(),
          controlsView = defaultViewFactory();

        // Container for routed views
        this.setViewMountPoint('#contents');
        this.mapRouteToViewComponent('/', 'default', defaultView);
        this.mapRouteToViewComponent('/styles', 'debug-styletest', styleView);
        this.mapRouteToViewComponent('/controls', 'debug-controls', controlsView);
        this.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

        // Alternately, map views to different store states with MixinStoreStateViews
        //this.mapStateToViewComponent('TITLE', 'title', screenTitle);
      },

      /**
       * Draw and UI to the DOM and set events
       */
      render: function () {
        //
      }


    });

    module.exports = AppView();

  });