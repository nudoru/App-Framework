/**
 * Simple router
 * Supporting IE9 so using hashes instead of the history API for now
 *
 * Basic usage:
 * _router.when('/',{templateID:'test', controller:function(obj) {
      console.log('Running route: '+obj.route+', with template: '+obj.templateID);
    }});
 *
 * Check this out for using a regex match
 * http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 *
 */

define('Nori.Controller.Router',
  function (require, module, exports) {

    var _routeMap = Object.create(null),
      _emitter = require('Nori.Events.Dispatcher'),
      _browserEvents = require('Nudoru.Browser.BrowserEvents');

    function initialize() {
      window.addEventListener('hashchange', onHashChange, false);
    }

    /**
     * Map a route to a given controller function
     * The controller funtion will be passed an object with the route and templateID
     * @param route
     * @param conObj
     */
    function when(route, conObj) {
      _routeMap[route] = {
        templateID: conObj.templateID,
        controller: conObj.controller
      };
    }

    /**
     * Broadcast the change event and let the application determine how to handle
     * @param evt
     */
    function onHashChange(evt) {
      _emitter.publish(_browserEvents.URL_HASH_CHANGED, {
        routeObj: getCurrentRoute(),
        fragment: getURLFragment()
      });
    }

    /**
     * Parses the route and query string from the current URL fragment
     * @returns {{route: string, query: {}}}
     */
    function getCurrentRoute() {
      var fragment = getURLFragment(),
        parts = fragment.split('?'),
        route = '/' + parts[0],
        queryStr = decodeURIComponent(parts[1]),
        queryStrObj = parseQueryStr(queryStr);

      return {route: route, data: queryStrObj};
    }

    /**
     * Runs the route currently on the URL
     * Primarily used window.load
     */
    function runCurrentRoute() {
      var current = getCurrentRoute();
      runRoute(current.route, current.data);
    }

    /**
     * Parses a query string into key/value pairs
     * @param queryStr
     * @returns {{}}
     */
    function parseQueryStr(queryStr) {
      var obj = {},
        parts = queryStr.split('&');

      parts.forEach(function (pairStr) {
        var pairArr = pairStr.split('=');
        obj[pairArr[0]] = pairArr[1];
      });

      return obj;
    }

    /**
     * Executes the controller function for the given route
     * @param route
     * @param queryStrObj
     */
    function runRoute(route, queryStrObj) {
      var routeObj = _routeMap[route];

      if (routeObj) {
        routeObj.controller.call(window, {
          route: route,
          templateID: routeObj.templateID,
          queryData: queryStrObj
        });
      } else {
        console.log('No Route mapped for: "' + route + '"');
      }
    }

    /**
     * Combines a route and data object into a proper URL hash fragment
     * @param route
     * @param dataObj
     */
    function setRoute(route, dataObj) {
      var path = route,
          data = [];
      if (dataObj !== null && dataObj !== undefined) {
        path += "?";
        for (var prop in dataObj) {
          if (prop !== 'undefined' && dataObj.hasOwnProperty(prop)) {
            data.push(prop + '=' + encodeURIComponent(dataObj[prop]));
          }
        }
        path += data.join('&');
      }

      //console.log('Router, setting URL fragment to: ' + path);

      updateURLFragment(path);
    }

    /**
     * Returns everything after the 'whatever.html#' in the URL
     * Leading and trailing slashes are removed
     * reference- http://lea.verou.me/2011/05/get-your-hash-the-bulletproof-way/
     *
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

    exports.initialize = initialize;
    exports.when = when;
    exports.getCurrentRoute = getCurrentRoute;
    exports.runCurrentRoute = runCurrentRoute;
    exports.setRoute = setRoute;

  });