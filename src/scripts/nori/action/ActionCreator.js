/* @flow weak */

/**
 * Action Creator
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */
import NoriActionConstants from './ActionConstants.js';

export default {

  changeStoreState: function (data) {
    return {
      type   : NoriActionConstants.CHANGE_STORE_STATE,
      payload: {
        data: data
      }
    };
  }

};