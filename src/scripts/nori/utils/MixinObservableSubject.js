/**
 * Add RxJS Subject to a module
 */

define('nori/utils/MixinObservableSubject',

  function (require, module, exports) {

    var MixinObservableSubject = function () {

      //https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md
      var _subject    = new Rx.BehaviorSubject(),
          _subjectMap = {};

      function createSubject(name) {
        if (!_subjectMap.hasOwnProperty(name)) {
          _subjectMap[name] = new Rx.BehaviorSubject();
        }
        return _subjectMap[name];
      }

      /**
       * Subscribe handler to updates
       * @param handler
       * @returns {*}
       */
      function subscribe(handlerOrName, optHandler) {
        if (is.string(handlerOrName)) {
          return createSubject(handlerOrName).subscribe(optHandler);
        } else {
          return _subject.subscribe(handlerOrName);
        }
      }

      /**
       * Dispatch updated to subscribers
       * @param payload
       */
      function notifySubscribers(payload) {
        _subject.onNext(payload);
      }

      /**
       * Dispatch updated to named subscribers
       * @param name
       * @param payload
       */
      function notifySubscribersOf(name, payload) {
        if (_subjectMap.hasOwnProperty(name)) {
          _subjectMap[name].onNext(payload);
        } else {
          console.warn('MixinObservableSubject, no subscribers of ' + name);
        }
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
        createSubject      : createSubject,
        notifySubscribers  : notifySubscribers,
        notifySubscribersOf: notifySubscribersOf,
        getLastNotification: getLastNotification
      };

    };

    module.exports = MixinObservableSubject;

  });