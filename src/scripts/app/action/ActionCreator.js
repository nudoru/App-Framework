define('app/Action/ActionCreator',
  function (require, module, exports) {

    var _actionConstants = require('app/action/ActionConstants');

    /**
     * Purely for convenience, an Event ("action") Creator ala Flux spec. Follow
     * guidelines for creating actions: https://github.com/acdlite/flux-standard-action
     */
    var ActionCreator = {

      mutateSomeData: function (data) {
        var actionObj = {
          type   : _actionConstants.MUTATION_TYPE,
          payload: {
            data: data
          }
        };

        return actionObj;
      }

    };

    module.exports = ActionCreator;

  });