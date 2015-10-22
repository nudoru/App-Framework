/* @flow weak */

/**
 * Simple router
 * Supporting IE9 so using hashes instead of the history API for now
 */

import ObjUtils from '../../nudoru/core/ObjectUtils.js';
import Rxjs from '../../vendor/rxjs/rx.lite.min.js';

let Router = function () {

  let _subject = new Rxjs.Subject(),
      _hashChangeObservable;

  /**
   * Set event handlers
   */
  function initialize() {
    _hashChangeObservable = Rxjs.Observable.fromEvent(window, 'hashchange').subscribe(notify);
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
  function notify() {
    let eventPayload = {
      routeObj: getCurrentRoute(), // { route:, data: }
      fragment: $getURLFragment()
    };

    _subject.onNext(eventPayload);
  }

  /**
   * Parses the route and query string from the current URL fragment
   * @returns {{route: string, query: {}}}
   */
  function getCurrentRoute() {
    let fragment    = $getURLFragment(),
        parts       = fragment.split('?'),
        route       = '/' + parts[0],
        queryStr    = decodeURIComponent(parts[1]),
        queryStrObj = $parseQueryStr(queryStr);

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
  function $parseQueryStr(queryStr) {
    let obj   = {},
        parts = queryStr.split('&');

    // TODO refactor with Array.reduce
    parts.forEach(pairStr => {
      let pairArr     = pairStr.split('=');
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
    let path = route,
        data = [];
    if (!ObjUtils.isNull(dataObj)) {
      path += "?";
      for (var prop in dataObj) {
        if (prop !== 'undefined' && dataObj.hasOwnProperty(prop)) {
          data.push(prop + '=' + encodeURIComponent(dataObj[prop]));
        }
      }
      path += data.join('&');
    }

    $updateURLFragment(path);
  }

  /**
   * Returns everything after the 'whatever.html#' in the URL
   * Leading and trailing slashes are removed
   * @returns {string}
   */
  function $getURLFragment() {
    let fragment = location.hash.slice(1);
    return fragment.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  /**
   * Set the URL hash fragment
   * @param path
   */
  function $updateURLFragment(path) {
    window.location.hash = path;
  }

  return {
    initialize     : initialize,
    subscribe      : subscribe,
    notify         : notify,
    getCurrentRoute: getCurrentRoute,
    set            : set
  };

};

let r = Router();
r.initialize();

export default r;