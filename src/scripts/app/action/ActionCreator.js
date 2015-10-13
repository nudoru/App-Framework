import _appActionConstants from './ActionConstants.js';

/**
 * Purely for convenience, an Event ("action") Creator ala Flux spec. Follow
 * guidelines for creating actions: https://github.com/acdlite/flux-standard-action
 */
let ActionCreator = {

  mutateSomeData(data) {
    var actionObj = {
      type   : _appActionConstants.MUTATION_TYPE,
      payload: {
        data: data
      }
    };

    return actionObj;
  }

};

export default ActionCreator;