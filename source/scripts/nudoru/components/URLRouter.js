/*
Simple router, IE9 needs to be supported so using hashes
 */


nudoru.createNameSpace('nudoru.components.URLRouter');
nudoru.components.URLRouter = function () {
  var _eventDispatcher,
      _lastSetPath;

  function initialize() {
    _eventDispatcher = nudoru.events.EventDispatcher;
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

    _eventDispatcher.publish(nudoru.events.BrowserEvents.URL_HASH_CHANGED, hash);
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

  return {
    initialize: initialize,
    getRoute: getURLHash,
    setRoute: updateURLHash
  };

}();