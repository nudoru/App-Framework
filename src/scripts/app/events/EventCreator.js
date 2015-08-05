define('App.Events.EventCreator',
  function (require, module, exports) {

    var _dispatcher     = require('Nori.Utils.Dispatcher'),
        _eventConstants = require('App.Events.EventConstants');

    module.exports.someEvent = function (data) {
      _dispatcher.publish({
        type   : _eventConstants.SOMETHING_HAPPENED,
        payload: {
          theData: data
        }
      });
    };

  });