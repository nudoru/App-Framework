/* @flow weak */

import _mixinObservableSubject from './utils/MixinObservableSubject.js';
import _mixinReducerStore from './store/ReducerStore.js';
import _mixinComponentViews from './view/MixinComponentViews.js';
import _mixinEventDelegator from './view/MixinEventDelegator.js';

let Nori = function () {

  let _storeTemplate,
      _viewTemplate;

  // Switch Lodash to use Mustache style templates
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  /**
   * Allow for optional external configuration data from outside of the compiled
   * app bundle. For easy of settings tweaks after the build by non technical devs
   * @returns {void|*}
   */
  function getConfig() {
    return _.assign({}, (window.APP_CONFIG_DATA || {}));
  }

  function view() {
    return _viewTemplate;
  }

  function store() {
    return _storeTemplate;
  }

  //----------------------------------------------------------------------------
  //  Templates
  //----------------------------------------------------------------------------

  _storeTemplate = createStore({
    mixins: [
      _mixinReducerStore,
      _mixinObservableSubject()
    ]
  })();

  _viewTemplate = createView({
    mixins: [
      _mixinComponentViews,
      _mixinEventDelegator(),
      _mixinObservableSubject()
    ]
  })();

  //----------------------------------------------------------------------------
  //  Factories
  //----------------------------------------------------------------------------

  /**
   * Merges a collection of objects
   * @param target
   * @param sourceArray
   * @returns {*}
   */
  function assignArray(target, sourceArray) {
    return sourceArray.reduce((tgt, mixin) => {
      return _.assign(tgt, mixin);
    }, target);
  }

  /**
   * Return a new Nori class by combining a template and customizer with mixins
   * @param template
   * @param customizer
   * @returns {Function}
   */
  function createClass(template, customizer) {
    template = template || {};
    return function factory() {
      return _.assign({}, template, buildFromMixins(customizer));
    };
  }

  /**
   * Mixes in the modules specified in the custom application object
   * @param customizer
   * @returns {*}
   */
  function buildFromMixins(customizer) {
    let mixins = customizer.mixins || [];
    mixins.push(customizer);
    return assignArray({}, mixins);
  }

  /**
   * Create a new Nori application instance
   * @param customizer
   * @returns {*}
   */
  function createApplication(customizer) {
    customizer.mixins.push(this);
    return createClass({}, customizer)();
  }

  /**
   * Creates main application store
   * @param customizer
   * @returns {*}
   */
  function createStore(customizer) {
    return createClass(_storeTemplate, customizer);
  }

  /**
   * Creates main application view
   * @param customizer
   * @returns {*}
   */
  function createView(customizer) {
    return createClass(_viewTemplate, customizer);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    config           : getConfig,
    view             : view,
    store            : store,
    createClass      : createClass,
    createApplication: createApplication,
    createStore      : createStore,
    createView       : createView,
    buildFromMixins  : buildFromMixins,
    assignArray      : assignArray
  };

};

export default Nori();