/**
 * Simple router
 * Supporting IE9 so using hashes instead of the history API for now
 */

define('nori/utils/Router',
  function (require, module, exports) {

    var _subject            = new Rx.Subject(),
        _objUtils           = require('nudoru/core/ObjectUtils'),
        _noriEventConstants = require('nori/events/EventConstants');

    /**
     * Set event handlers
     */
    function initialize() {
      window.addEventListener('hashchange', notifySubscribers, false);
      Nori.dispatcher().subscribe(_noriEventConstants.CHANGE_ROUTE, handleAppRouteChangeRequests);
    }

    /**
     * Handle application route change requests
     * @param payload
     */
    function handleAppRouteChangeRequests(payload) {
      set(payload.payload.route, payload.payload.data);
    }

    /**
     * subscribe a handler to the url change events
     * @param handler
     * @returns {*}
     */
    function subscribe(handler) {
      return _subject.subscribe(handler);
    }

    /**
     * Notify of a change in route
     * @param fromApp True if the route was caused by an app event not URL or history change
     */
    function notifySubscribers() {
      var eventPayload = {
        routeObj: getCurrentRoute(), // { route:, data: }
        fragment: getURLFragment()
      };

      _subject.onNext(eventPayload);
    }

    /**
     * Parses the route and query string from the current URL fragment
     * @returns {{route: string, query: {}}}
     */
    function getCurrentRoute() {
      var fragment    = getURLFragment(),
          parts       = fragment.split('?'),
          route       = '/' + parts[0],
          queryStr    = decodeURIComponent(parts[1]),
          queryStrObj = parseQueryStr(queryStr);

      if (queryStr === '=undefined') {
        queryStrObj = {};
      }

      return {route: route, data: queryStrObj};
    }

    /**
     * Parses a query string into key/value pairs
     * @param queryStr
     * @returns {{}}
     */
    function parseQueryStr(queryStr) {
      var obj   = {},
          parts = queryStr.split('&');

      parts.forEach(function (pairStr) {
        var pairArr     = pairStr.split('=');
        obj[pairArr[0]] = pairArr[1];
      });

      return obj;
    }

    /**
     * Combines a route and data object into a proper URL hash fragment
     * @param route
     * @param dataObj
     */
    function set(route, dataObj) {
      var path = route,
          data = [];
      if (!_objUtils.isNull(dataObj)) {
        path += "?";
        for (var prop in dataObj) {
          if (prop !== 'undefined' && dataObj.hasOwnProperty(prop)) {
            data.push(prop + '=' + encodeURIComponent(dataObj[prop]));
          }
        }
        path += data.join('&');
      }

      updateURLFragment(path);
    }

    /**
     * Returns everything after the 'whatever.html#' in the URL
     * Leading and trailing slashes are removed
     * @returns {string}
     */
    function getURLFragment() {
      var fragment = location.hash.slice(1);
      return fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    /**
     * Set the URL hash fragment
     * @param path
     */
    function updateURLFragment(path) {
      window.location.hash = path;
    }

    module.exports.initialize        = initialize;
    module.exports.subscribe         = subscribe;
    module.exports.notifySubscribers = notifySubscribers;
    module.exports.getCurrentRoute   = getCurrentRoute;
    module.exports.set               = set;

  });