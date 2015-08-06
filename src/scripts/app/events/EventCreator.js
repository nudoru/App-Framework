define('app/events/EventCreator',
  function (require, module, exports) {

    var _dispatcher     = require('nori/utils/Dispatcher'),
        _eventConstants = require('app/events/EventConstants');

    module.exports.someEvent = function (data) {
      _dispatcher.publish({
        type   : _eventConstants.SOMETHING_HAPPENED,
        payload: {
          theData: data
        }
      });
    };

  });