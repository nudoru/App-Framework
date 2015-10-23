import AppStore from '../store/AppStore.js';
import MixinNudoruControls from '../../nudoru/components/MixinNudoruControls.js';
import MixinRouteViews from '../../nori/view/MixinRouteViews.js';
import TemplateViewFactory from './TemplateViewComponent.js';
import ComponentTesting from './ComponentsTesting.js';
import Template from '../../nori/view/Templating.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';

/**
 * View for an application.
 */

let AppViewModule = Nori.createView({

  mixins: [
    MixinNudoruControls(),
    MixinRouteViews()
  ],

  initialize: function () {
    this.attachTemplatesToEl('body', ['applicationscaffold', 'applicationcomponentsscaffold']);

    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.configureViews();
  },

  configureViews() {
    this.setViewMountPoint('#contents');
    this.mapConditionToViewComponent('/', 'default', TemplateViewFactory());
    this.mapConditionToViewComponent('/styles', 'debug-styletest', TemplateViewFactory());
    this.mapConditionToViewComponent('/controls', 'debug-controls', TemplateViewFactory());
    this.mapConditionToViewComponent('/comps', 'debug-components', ComponentTesting());
  },

  /**
   * Attach app HTML structure
   * @param templates
   */
    attachTemplatesToEl(mountSelector, templatArray) {
    let mountEl = document.querySelector(mountSelector);

    if (!templatArray) {
      return;
    }

    templatArray.forEach(function (templ) {
      mountEl.appendChild(DOMUtils.HTMLStrToNode(Template.getSource(templ, {})));
    });
  },

  /**
   * After app initialization, remove the loading message
   */
    removeLoadingMessage() {
    let cover   = document.querySelector('#initialization__cover'),
        message = document.querySelector('.initialization__message');

    cover.parentNode.removeChild(cover);
    cover.removeChild(message);
  },

});

let AppView = AppViewModule();

export default AppView;