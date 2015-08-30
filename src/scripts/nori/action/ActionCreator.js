/**
 * Action Creator
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */

define('nori/action/ActionCreator',
  function (require, module, exports) {

    var _noriActionConstants = require('nori/action/ActionConstants');

    var NoriActionCreator = {

      changeStoreState: function (data, id) {
        var action = {
          type   : _noriActionConstants.CHANGE_STORE_STATE,
          payload: {
            id  : id,
            data: data
          }
        };

        return action;
      }

    };

    module.exports = NoriActionCreator;

  });