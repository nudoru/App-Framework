/**
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */

define('nori/events/EventCreator',
  function (require, module, exports) {

    var _noriEventConstants    = require('nori/events/EventConstants'),
        _browserEventConstants = require('nudoru/browser/EventConstants');

    var NoriEventCreator = {

      applicationWarning: function (message) {
        var evtObj = {
          type   : _noriEventConstants.APP_WARNING,
          error  : false,
          payload: {
            message: message
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      applicationError: function (message) {
        var evtObj = {
          type   : _noriEventConstants.APP_ERROR,
          error  : true,
          payload: new Error(message)
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      applicationInitialized: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.APP_INITIALIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

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

      applicationModelInitialized: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.APP_MODEL_INITIALIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      applicationViewInitialized: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.APP_VIEW_INITIALIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      urlHashChanged: function (payload) {
        var evtObj = {
          type   : _browserEventConstants.URL_HASH_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      changeRoute: function (route, data) {
        var evtObj = {
          type   : _noriEventConstants.CHANGE_ROUTE,
          payload: {
            route: route,
            data : data
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      routeChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.ROUTE_CHANGED,
          payload: payload
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

      modelChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.MODEL_DATA_CHANGED,
          payload: payload
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
      },

      renderView: function (targetSelector, htmlStr, id, callback) {
        var evtObj = {
          type   : _noriEventConstants.RENDER_VIEW,
          payload: {
            target  : targetSelector,
            html    : htmlStr,
            id      : id,
            callback: callback
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewRendered: function (targetSelector, id) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_RENDERED,
          payload: {
            target: targetSelector,
            id    : id
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewChangedToMobile: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_CHANGE_TO_MOBILE,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewChangedToDesktop: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_CHANGE_TO_DESKTOP,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      browserScrolled: function (payload) {
        var evtObj = {
          type   : _browserEventConstants.BROWSER_SCROLLED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      browserResized: function (payload) {
        var evtObj = {
          type   : _browserEventConstants.BROWSER_RESIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },
    };

    module.exports = NoriEventCreator;

  });