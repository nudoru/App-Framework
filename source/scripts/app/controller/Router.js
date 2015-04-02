/*
Simple router, IE9 needs to be supported so using hashes
Based on some of this
http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url

 monitorEvents(window, "hashchange")

 */


APP.createNameSpace('APP.AppController.Router');
APP.AppController.Router = function () {
  var _eventDispatcher,
      _lastSetPath;

  function initialize() {
    _eventDispatcher = APP.EventDispatcher;
    _lastSetPath = '';

    configureStreams();
  }

  function configureStreams() {
    window.addEventListener('hashchange', onHashChange, false);
  }

  function onHashChange(evt) {
    evt.preventDefault();
    var hash = getURLHash();
    if(hash === _lastSetPath) {
      return;
    }
    if(hash) {
      _eventDispatcher.publish(APP.Events.URL_HASH_CHANGED, hash);
    }
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
    DEBUGGER.log('Update URL: '+path);

    _lastSetPath = path;

    window.location.hash = path;
  }

  return {
    initialize: initialize,
    getRoute: getURLHash,
    setRoute: updateURLHash
  };

}();