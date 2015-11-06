/* @flow weak */

import ReducerStore from './store/ReducerStore.js';
import ComponentViews from './view/ComponentViews.js';
import AssignArray from './utils/AssignArray.js';
import BuildFromMixins from './utils/BuildFromMixins.js';
import CreateClass from './utils/CreateClass.js';
import _ from '../vendor/lodash.min.js';

export default {

  _componentViews: null,

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
   * Creates an application store
   * @param customizer
   * @returns {*}
   */
  createStore(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push(ReducerStore());
    return CreateClass({}, customizer);
  },

  /**
   * Creates a application view
   * @param customizer
   * @returns {*}
   */
  createView(customizer) {
    customizer.mixins = customizer.mixins || [];
    customizer.mixins.push(ComponentViews());
    return CreateClass({}, customizer);
  },

  createComponent(...args) {
    if(!this._componentViews) {
      this._componentViews = ComponentViews();
    }
    return this._componentViews.createComponent(args[0], args[1]);
  }
}