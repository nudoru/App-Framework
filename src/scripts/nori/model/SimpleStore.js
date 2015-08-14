define('nori/model/SimpleStore',
  function (require, module, exports) {
    var _state   = Object.create(null),
        _subject = new Rx.Subject();

    /**
     * subscribe a handler for changes
     * @param handler
     * @returns {*}
     */
    function subscribe(handler) {
      return _subject.subscribe(handler);
    }

    /**
     * Return a copy of the state
     * @returns {void|*}
     */
    function getState() {
      return _.assign({}, _state);
    }

    /**
     * Sets the state
     * @param state
     */
    function setState(state) {
      _state = state;
      _subject.onNext();
    }

    module.exports.subscribe = subscribe;
    module.exports.getState  = getState;
    module.exports.setState  = setState;

  });