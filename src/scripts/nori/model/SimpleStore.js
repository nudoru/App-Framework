define('nori/model/SimpleStore',
  function (require, module, exports) {

    var SimpleStore = (function () {
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

      return {
        subscribe: subscribe,
        getState : getState,
        setState : setState
      };

    }());

    module.exports = SimpleStore;

  });