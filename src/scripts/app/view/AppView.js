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
    let vcDefault    = TemplateViewFactory('default', {template: 'default'}),
        vcStyles     = TemplateViewFactory('styles', {template: 'debug-styletest'}),
        vcControls   = TemplateViewFactory('controls', {template: 'debug-controls'}),
        vcComponents = ComponentTesting('components', {template: 'debug-components'});

    //let vcBase = TemplateViewFactory().$clone(),
    //    vcDefault    = vcBase('default', {template: 'default'}),
    //    vcStyles     = vcBase('styles', {template: 'debug-styletest'}),
    //    vcControls   = vcBase('controls', {template: 'debug-controls'}),
    //    vcComponents = ComponentTesting('components', {template: 'debug-components'});
    //
    //console.log(vcBase);

    // map id's with instances and mount location selector
    this.set('default', vcDefault, '#contents');
    this.set('styles', vcStyles, '#contents');
    this.set('controls', vcControls, '#contents');
    this.set('components', vcComponents, '#contents');

    // condition, component ID
    this.route('/', 'default');
    this.route('/styles', 'styles');
    this.route('/controls', 'controls');
    this.route('/comps', 'components');
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