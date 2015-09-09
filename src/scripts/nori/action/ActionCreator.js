/* @flow weak */

/**
 * Action Creator
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */
var _noriActionConstants = require('./ActionConstants.js');

var NoriActionCreator = {

  changeStoreState: function (data, id) {
    return {
      type   : _noriActionConstants.CHANGE_STORE_STATE,
      payload: {
        id  : id,
        data: data
      }
    };
  }

};

module.exports = NoriActionCreator;