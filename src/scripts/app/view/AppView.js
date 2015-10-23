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
    this.registerViewCondition('/', 'default', TemplateViewFactory(), '#contents');
    this.registerViewCondition('/styles', 'debug-styletest', TemplateViewFactory(), '#contents');
    this.registerViewCondition('/controls', 'debug-controls', TemplateViewFactory(), '#contents');
    this.registerViewCondition('/comps', 'debug-components', ComponentTesting(), '#contents');
  },

  /**
   * Attach app HTML structure
   * @param templates
   */
    attachTemplatesToEl(mountSelector, templateArray) {
    let mountEl = document.querySelector(mountSelector);

    if (!templateArray) {
      return;
    }

    templateArray.forEach(function (templ) {
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
  }

});

let AppView = AppViewModule();

export default AppView;