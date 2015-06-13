define('Nori.Events.AppEventCreator',
  function (require, module, exports) {

    var _dispatcher = require('Nori.Utils.Dispatcher'),
      _appEventConstants = require('Nori.Events.AppEventConstants'),
      _browserEvents = require('Nudoru.Browser.BrowserEventConstants');

    exports.applicationInitialized = function (payload) {
      _dispatcher.publish({
        type: _appEventConstants.APP_INITIALIZED,
        payload: payload});
    };

    exports.applicationModelInitialized = function (payload) {
      _dispatcher.publish({
        type: _appEventConstants.APP_MODEL_INITIALIZED,
        payload: payload
      });
    };

    exports.applicationViewInitialized = function (payload) {
      _dispatcher.publish({
        type: _appEventConstants.APP_VIEW_INITIALIZED,
        payload: payload
      });
    };

    exports.urlHashChanged = function(payload) {
      _dispatcher.publish({
        type: _browserEvents.URL_HASH_CHANGED,
        payload: payload
      });
    };

    exports.routeChanged = function(payload) {
      _dispatcher.publish({
        type: _appEventConstants.ROUTE_CHANGED,
        payload: payload
      });
    };

    exports.updateModelData = function(payload) {
      _dispatcher.publish({
        type: _appEventConstants.UPDATE_MODEL_DATA,
        payload: payload
      });
    };

    exports.modelChanged = function(payload) {
      _dispatcher.publish({
        type: _appEventConstants.MODEL_DATA_CHANGED,
        payload: payload
      });
    };


  });