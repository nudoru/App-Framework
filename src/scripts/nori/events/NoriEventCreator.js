define('Nori.Events.NoriEventCreator',
  function (require, module, exports) {

    var _dispatcher            = require('Nori.Utils.Dispatcher'),
        _appEventConstants     = require('Nori.Events.NoriEventConstants'),
        _browserEventConstants = require('Nudoru.Browser.BrowserEventConstants');

    exports.applicationInitialized = function (payload) {
      _dispatcher.publish({
        type   : _appEventConstants.APP_INITIALIZED,
        payload: payload
      });
    };

    exports.notifyUser = function (title, message, type) {
      _dispatcher.publish({
        type   : _appEventConstants.NOTIFY_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'default'
        }
      });
    };

    exports.alertUser = function (title, message, type) {
      _dispatcher.publish({
        type   : _appEventConstants.ALERT_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'default'
        }
      });
    };

    exports.warnUser = function (title, message, type) {
      _dispatcher.publish({
        type   : _appEventConstants.WARN_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'danger'
        }
      });
    };

    exports.applicationModelInitialized = function (payload) {
      _dispatcher.publish({
        type   : _appEventConstants.APP_MODEL_INITIALIZED,
        payload: payload
      });
    };

    exports.applicationViewInitialized = function (payload) {
      _dispatcher.publish({
        type   : _appEventConstants.APP_VIEW_INITIALIZED,
        payload: payload
      });
    };

    exports.urlHashChanged = function (payload) {
      _dispatcher.publish({
        type   : _browserEventConstants.URL_HASH_CHANGED,
        payload: payload
      });
    };

    exports.viewChanged = function (payload) {
      _dispatcher.publish({
        type   : _appEventConstants.VIEW_CHANGED,
        payload: payload
      });
    };

    exports.routeChanged = function (payload) {
      _dispatcher.publish({
        type   : _appEventConstants.ROUTE_CHANGED,
        payload: payload
      });
    };

    exports.updateModelData = function (modelID, data) {
      _dispatcher.publish({
        type   : _appEventConstants.UPDATE_MODEL_DATA,
        payload: {
          id  : modelID,
          data: data
        }
      });
    };

    exports.modelChanged = function (payload) {
      _dispatcher.publish({
        type   : _appEventConstants.MODEL_DATA_CHANGED,
        payload: payload
      });
    };

    exports.renderView = function (targetSelector, htmlStr, id, callback) {
      _dispatcher.publish({
        type   : _appEventConstants.RENDER_VIEW,
        payload: {
          target  : targetSelector,
          html    : htmlStr,
          id      : id,
          callback: callback
        }
      });
    };

    exports.viewRendered = function (targetSelector, id) {
      _dispatcher.publish({
        type   : _appEventConstants.VIEW_RENDERED,
        payload: {
          target: targetSelector,
          id    : id
        }
      });
    };

  });