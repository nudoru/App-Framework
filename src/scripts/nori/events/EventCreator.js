/**
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */

define('nori/events/EventCreator',
  function (require, module, exports) {

    var _appEventConstants     = require('nori/events/EventConstants'),
        _browserEventConstants = require('nudoru/browser/EventConstants');

    module.exports.applicationWarning = function (message) {
      var evtObj = {
        type   : _appEventConstants.APP_WARNING,
        error  : false,
        payload: {
          message: message
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationError = function (message) {
      var evtObj = {
        type   : _appEventConstants.APP_ERROR,
        error  : true,
        payload: new Error(message)
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationInitialized = function (payload) {
      var evtObj = {
        type   : _appEventConstants.APP_INITIALIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.notifyUser = function (title, message, type) {
      var evtObj = {
        type   : _appEventConstants.NOTIFY_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'default'
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.alertUser = function (title, message, type) {
      var evtObj = {
        type   : _appEventConstants.ALERT_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'default'
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.warnUser = function (title, message, type) {
      var evtObj = {
        type   : _appEventConstants.WARN_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'danger'
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationModelInitialized = function (payload) {
      var evtObj = {
        type   : _appEventConstants.APP_MODEL_INITIALIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationViewInitialized = function (payload) {
      var evtObj = {
        type   : _appEventConstants.APP_VIEW_INITIALIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.urlHashChanged = function (payload) {
      var evtObj = {
        type   : _browserEventConstants.URL_HASH_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.VIEW_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.changeRoute = function (route, data) {
      var evtObj = {
        type   : _appEventConstants.CHANGE_ROUTE,
        payload: {
          route: route,
          data : data
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.routeChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.ROUTE_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.changeModelState = function (modelID, data) {
      var evtObj = {
        type   : _appEventConstants.CHANGE_MODEL_STATE,
        payload: {
          id  : modelID,
          data: data
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.modelChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.MODEL_DATA_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.modelStateChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.MODEL_STATE_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.renderView = function (targetSelector, htmlStr, id, callback) {
      var evtObj = {
        type   : _appEventConstants.RENDER_VIEW,
        payload: {
          target  : targetSelector,
          html    : htmlStr,
          id      : id,
          callback: callback
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewRendered = function (targetSelector, id) {
      var evtObj = {
        type   : _appEventConstants.VIEW_RENDERED,
        payload: {
          target: targetSelector,
          id    : id
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewChangedToMobile = function (payload) {
      var evtObj = {
        type   : _appEventConstants.VIEW_CHANGE_TO_MOBILE,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewChangedToDesktop = function (payload) {
      var evtObj = {
        type   : _appEventConstants.VIEW_CHANGE_TO_DESKTOP,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.browserScrolled = function (payload) {
      var evtObj = {
        type   : _browserEventConstants.BROWSER_SCROLLED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.browserResized = function (payload) {
      var evtObj = {
        type   : _browserEventConstants.BROWSER_RESIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

  });