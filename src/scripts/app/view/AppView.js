import _appStore from '../store/AppStore.js';
import _mixinApplicationView from '../../nori/view/ApplicationView.js';
import _mixinNudoruControls from '../../nori/view/MixinNudoruControls.js';
import _mixinRouteViews from '../../nori/view/MixinRouteViews.js';
import _templateViewFactory from './TemplateViewComponent.js';

let _imagesLoadedInst,
    _preloadImages = [];

/**
 * View for an application.
 */

let AppViewModule = Nori.createView({

  mixins: [
    _mixinApplicationView,
    _mixinNudoruControls,
    _mixinRouteViews
  ],

  initialize: function () {
    this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.configureViews();
  },

  preloadImages() {
    // refer to docs http://desandro.github.io/imagesloaded/
    //imagesLoadedInst = new imagesLoaded(_preloadImages, this.imagesPreloaded.bind(this));
  },

  imagesPreloaded() {
  },

  configureViews() {
    // Container for routed views
    this.setViewMountPoint('#contents');
    this.mapRouteToViewComponent('/', 'default', _templateViewFactory());
    this.mapRouteToViewComponent('/styles', 'debug-styletest', _templateViewFactory());
    this.mapRouteToViewComponent('/controls', 'debug-controls', _templateViewFactory());

    // Alternately, map views to different store states with MixinStoreStateViews
    //this.mapStateToViewComponent('TITLE', 'title', screenTitle);
  },

});

let AppView = AppViewModule();

export default AppView;