import Nori from '../../nori/Nori.js';
import AppStore from '../store/AppStore.js';
import MixinNudoruControls from '../../nudoru/components/MixinNudoruControls.js';
import TemplateViewFactory from './TemplateViewComponent.js';
import ComponentTesting from './ComponentsTesting.js';
import ControlsTesting from './ControlsTesting.js';
import Template from '../../nori/view/Templating.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import ChildTest from './ChildTest.js';

/**
 * View for an application.
 */
let AppViewModule = Nori.createView({

  mixins: [
    MixinNudoruControls()
  ],

  initialize() {
    this.defineTemplates();

    this.attachTemplatesToEl('body', ['applicationscaffold']);

    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.mapRoutes();
  },

  defineTemplates() {
    Template.addTemplate('applicationscaffold', `<div>
      <div id="app__container">
          <div id="app__contents">
              <header class="app__header">
                  <div class="app__header-logo"><i class="fa fa-dashboard"></i></div>
                  <h1>Application</h1>
                  <nav class="app__header-nav">
                    <button><i class="fa fa-table"></i>Projects</button>
                    <button><i class="fa fa-users"></i>People</button>
                    <button><i class="fa fa-life-bouy"></i>How Do I?</button>
                  </nav>
              </header>
              <section class="app__content">
                <div class="app__padded-content">
                  <section id="contents"></section>
                </div>
              </section>
          </div>
          <div class="app__drawer">
            <header class="app__drawer-header">
                <h1>Sidebar</h1>
            </header>
            <div class="app__padded-content">
              <p>Woot</p>
            </div>
          </div>
      </div>
      <div id="app__components">
          <div id="initialization__cover">
              <div class="initialization__message">
                  <h1>Please Wait ...</h1><img src="img/loading_squares_g.gif" alt="Loading" class="loader">
              </div>
          </div>
          <div id="tooltip__container"></div>
          <div id="modal__container"></div>
          <div id="messagebox__container"></div>
          <div id="toast__container"></div>
      </div>
    </div>`);
  },

  mapRoutes() {
    let vcDefault    = TemplateViewFactory('default', {
          target: '#contents',
          attach: 'replace'
        }),
        vcControls   = ControlsTesting('controls', {
          target: '#contents',
          attach: 'replace'
        }),
        vcStyles     = Nori.createComponent({})('styles', {
          target: '#contents',
          attach: 'replace'
        }),
        vcComponents = ComponentTesting('components', {
            target: '#contents',
            attach: 'replace'
          },
          ChildTest('append1', {
            target: '#debug-child',
            label : 'aaAppened1'
          }),
          ChildTest('append2', {
            target: '#debug-child',
            label : 'aaAppened2'
          }),
          Nori.createComponent()('div', {
            target: '#debug-child',
            elInner: 'testing dom el temp',
            elID: 'my-el',
            elClass: 'h3-alternate'
          },ChildTest('append5', {
            label : 'On dom el'
          })));

    // condition, component ID
    this.route('/', vcDefault);
    this.route('/styles', vcStyles);
    this.route('/controls', vcControls);
    this.route('/comps', vcComponents);
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

})();

export default AppViewModule;