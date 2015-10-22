/* @flow weak */

import MixinReducerStore from './store/ReducerStore.js';
import MixinComponentViews from './view/MixinComponentViews.js';
import AssignArray from '../nudoru/core/AssignArray.js';
import BuildFromMixins from '../nudoru/core/BuildFromMixins.js';
import CreateClass from '../nudoru/core/CreateClass.js';
import _ from '../vendor/lodash.min.js';

let Nori = function () {

  let _storeTemplate,
      _viewTemplate;


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
      MixinReducerStore()
    ]
  })();

  _viewTemplate = createView({
    mixins: [
      MixinComponentViews()
    ]
  })();

  //----------------------------------------------------------------------------
  //  Factories
  //----------------------------------------------------------------------------

  function createClass(customizer) {
    return CreateClass({}, customizer);
  }

  /**
   * Create a new Nori application instance
   * @param customizer
   * @returns {*}
   */
  function createApplication(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push(this);
    return CreateClass({}, customizer)();
  }

  /**
   * Creates main application store
   * @param customizer
   * @returns {*}
   */
  function createStore(customizer) {
    return CreateClass(_storeTemplate, customizer);
  }

  /**
   * Creates main application view
   * @param customizer
   * @returns {*}
   */
  function createView(customizer) {
    return CreateClass(_viewTemplate, customizer);
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
    createView       : createView
  };

};

export default Nori();