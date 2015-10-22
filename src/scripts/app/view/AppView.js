import AppStore from '../store/AppStore.js';
import MixinApplicationView from '../../nori/view/ApplicationView.js';
import MixinNudoruControls from '../../nudoru/components/MixinNudoruControls.js';
import MixinRouteViews from '../../nori/view/MixinRouteViews.js';
import TemplateViewFactory from './TemplateViewComponent.js';

/**
 * View for an application.
 */

let AppViewModule = Nori.createView({

  mixins: [
    MixinApplicationView(),
    MixinNudoruControls(),
    MixinRouteViews()
  ],

  initialize: function () {
    this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.configureViews();
  },

  configureViews() {
    this.setViewMountPoint('#contents');
    this.mapConditionToViewComponent('/', 'default', TemplateViewFactory());
    this.mapConditionToViewComponent('/styles', 'debug-styletest', TemplateViewFactory());
    this.mapConditionToViewComponent('/controls', 'debug-controls', TemplateViewFactory());
  },

});

let AppView = AppViewModule();

export default AppView;