/* @flow weak */

import MixinReducerStore from './store/ReducerStore.js';
import MixinComponentViews from './view/MixinComponentViews.js';
import AssignArray from './utils/AssignArray.js';
import BuildFromMixins from './utils/BuildFromMixins.js';
import CreateClass from './utils/CreateClass.js';
import _ from '../vendor/lodash.min.js';

export default {

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  /**
   * Convenience mapping to create component views
   */
  _viewTemplate : null,

  view() {
    if(!this._viewTemplate) {
      this._viewTemplate = MixinComponentViews();
    }
    return this._viewTemplate;
  },

  /**
   * Allow for optional external configuration data from outside of the compiled
   * app bundle. For easy of settings tweaks after the build by non technical devs
   * @returns {void|*}
   */
  config() {
    return _.assign({}, (window.APP_CONFIG_DATA || {}));
  },

  //----------------------------------------------------------------------------
  //  Factories
  //----------------------------------------------------------------------------

  createClass(customizer) {
    return CreateClass({}, customizer);
  },

  /**
   * Create a new Nori application instance
   * @param customizer
   * @returns {*}
   */
  createApplication(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push(this);
    return CreateClass({}, customizer)();
  },

  /**
   * Creates main application store
   * @param customizer
   * @returns {*}
   */
  createStore(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push(MixinReducerStore());
    return CreateClass({}, customizer);
  },

  /**
   * Creates main application view
   * @param customizer
   * @returns {*}
   */
  createView(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push(MixinComponentViews());
    return CreateClass({}, customizer);
  }
}