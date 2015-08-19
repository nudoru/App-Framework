/**
 * Add RxJS Subject to a module
 */

define('nori/utils/MixinObservableSubject',

  function (require, module, exports) {

    var MixinObservableSubject = (function () {
      //https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md
      var _subject = new Rx.BehaviorSubject();

      /**
       * Subscribe handler to updates
       * @param handler
       * @returns {*}
       */
      function subscribe(handler) {
        return _subject.subscribe(handler);
      }

      /**
       * Called from update or whatever function to dispatch to subscribers
       * @param payload
       */
      function notifySubscribers(payload) {
        _subject.onNext(payload);
      }

      /**
       * Gets the last payload that was dispatched to subscribers
       * @returns {*}
       */
      function getLastNotification() {
        return _subject.getValue();
      }

      return {
        subscribe          : subscribe,
        notifySubscribers  : notifySubscribers,
        getLastNotification: getLastNotification
      };

    }());

    module.exports = MixinObservableSubject;

  });