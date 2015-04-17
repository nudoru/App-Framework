/*
 Simple router, IE9 needs to be supported so using hashes
 */

define('nudoru.utils.URLRouter',
  function(require, module, exports) {

    var _lastSetPath,
      _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _browserEvents = require('nudoru.events.BrowserEvents');

    function initialize(evtDispatcher) {
      _lastSetPath = '';

      configureStreams();
    }

    function configureStreams() {
      window.addEventListener('hashchange', onHashChange, false);
    }

    function onHashChange(evt) {
      var hash = getURLHash();
      if(hash === _lastSetPath) {
        return;
      }

      if(!_eventDispatcher) {
        throw new Error('URLRouter: must set event dispatcher');
      }

      _eventDispatcher.publish(_browserEvents.URL_HASH_CHANGED, hash);
    }

    /**
     * Returns everything after the 'whatever.html#' in the URL
     * Leading and trailing slashes are removed
     * reference- http://lea.verou.me/2011/05/get-your-hash-the-bulletproof-way/
     *
     * @returns {string}
     */
    function getURLHash() {
      var hash = location.hash.slice(1);
      return hash.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    function updateURLHash(path) {
      _lastSetPath = path;
      window.location.hash = path;
    }

    exports.initialize = initialize;
    exports.getRoute = getURLHash;
    exports.setRoute = updateURLHash;

  });