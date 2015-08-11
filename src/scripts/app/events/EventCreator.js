define('app/events/EventCreator',
  function (require, module, exports) {

    var _eventConstants = require('app/events/EventConstants');

    module.exports.someEvent = function (data) {
      var evtObj = {
        type   : _eventConstants.SOMETHING_HAPPENED,
        payload: {
          theData: data
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

  });