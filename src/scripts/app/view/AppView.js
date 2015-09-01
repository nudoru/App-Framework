var _mixinApplicationView   = require('../../nori/view/ApplicationView.js'),
    _mixinNudoruControls    = require('../../nori/view/MixinNudoruControls.js'),
    _mixinComponentViews    = require('../../nori/view/MixinComponentViews.js'),
    _mixinRouteViews        = require('../../nori/view/MixinRouteViews.js'),
    _mixinEventDelegator    = require('../../nori/view/MixinEventDelegator.js'),
    _mixinObservableSubject = require('../../nori/utils/MixinObservableSubject.js');

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
    var defaultViewFactory = require('./TemplateViewComponent.js'),
        defaultView        = defaultViewFactory(),
        styleView          = defaultViewFactory(),
        controlsView       = defaultViewFactory(),
        debugView          = this.createComponentView(require('./DebugControlsTestingSubView.js'))();

    // Container for routed views
    this.setViewMountPoint('#contents');
    this.mapRouteToViewComponent('/', 'default', defaultView);
    this.mapRouteToViewComponent('/styles', 'debug-styletest', styleView);
    this.mapRouteToViewComponent('/controls', 'debug-controls', controlsView);
    this.mapRouteToViewComponent('/comps', 'debug-components', debugView);

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