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

define('nudoru.utils.Router',
  function(require, module, exports) {

    var _routeMap = Object.create(null),
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _browserEvents = require('nudoru.events.BrowserEvents');

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

    // Should the route or event run first?
    function onHashChange(evt) {
      runCurrentRoute();
      _eventDispatcher.publish(_browserEvents.URL_HASH_CHANGED, getURLFragment());
    }

    /**
     * Runs the route currently on the URL
     * Primarily used window.load
     */
    function runCurrentRoute() {
      var fragment = getURLFragment();
      runRoute(fragment);
    }

    /**
     * Executes the controller function for the given route
     * @param route
     */
    function runRoute(route) {
      var routeObj = _routeMap[route];

      if(routeObj) {
        routeObj.controller.call(window, {route: route, templateID: routeObj.templateID});
      } else {
       console.log('No Route mapped for: "'+route+'"');
      }
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
      return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    function updateURLFragment(path) {
      window.location.hash = path;
    }

    exports.initialize = initialize;
    exports.when = when;
    exports.runCurrentRoute = runCurrentRoute;
    exports.setRoute = updateURLFragment;

  });