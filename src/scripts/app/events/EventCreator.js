define('app/events/EventCreator',
  function (require, module, exports) {

    var _eventConstants = require('app/events/EventConstants');

    /**
     * Purely for convenience, an Event ("action") Creator ala Flux spec. Follow
     * guidelines for creating actions: https://github.com/acdlite/flux-standard-action
     */
    var EventCreator = {

      someEvent: function (data) {
        var evtObj = {
          type   : _eventConstants.SOMETHING_HAPPENED,
          payload: {
            theData: data
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      }

    };

    module.exports = EventCreator;

  });