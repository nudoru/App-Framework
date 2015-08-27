/**
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */

define('nori/events/EventCreator',
  function (require, module, exports) {

    var _noriEventConstants    = require('nori/events/EventConstants');

    var NoriEventCreator = {

      notifyUser: function (title, message, type) {
        var evtObj = {
          type   : _noriEventConstants.NOTIFY_USER,
          payload: {
            title  : title,
            message: message,
            type   : type || 'default'
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      alertUser: function (title, message, type) {
        var evtObj = {
          type   : _noriEventConstants.ALERT_USER,
          payload: {
            title  : title,
            message: message,
            type   : type || 'default'
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      warnUser: function (title, message, type) {
        var evtObj = {
          type   : _noriEventConstants.WARN_USER,
          payload: {
            title  : title,
            message: message,
            type   : type || 'danger'
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      changeModelState: function (modelID, data) {
        var evtObj = {
          type   : _noriEventConstants.CHANGE_MODEL_STATE,
          payload: {
            id  : modelID,
            data: data
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      modelStateChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.MODEL_STATE_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      }
    };

    module.exports = NoriEventCreator;

  });