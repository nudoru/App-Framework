import AppStore from '../store/AppStore.js';
import MixinApplicationView from '../../nori/view/ApplicationView.js';
import MixinNudoruControls from '../../nori/view/MixinNudoruControls.js';
import MixinRouteViews from '../../nori/view/MixinRouteViews.js';
import TemplateViewFactory from './TemplateViewComponent.js';

/**
 * View for an application.
 */

let AppViewModule = Nori.createView({

  mixins: [
    MixinApplicationView,
    MixinNudoruControls,
    MixinRouteViews
  ],

  initialize: function () {
    this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.configureViews();
  },

  configureViews() {
    // Container for routed views
    this.setViewMountPoint('#contents');
    this.mapRouteToViewComponent('/', 'default', TemplateViewFactory());
    this.mapRouteToViewComponent('/styles', 'debug-styletest', TemplateViewFactory());
    this.mapRouteToViewComponent('/controls', 'debug-controls', TemplateViewFactory());

    // Alternately, map views to different store states with MixinStoreStateViews
    //this.mapStateToViewComponent('TITLE', 'title', screenTitle);
  },

});

let AppView = AppViewModule();

export default AppView;