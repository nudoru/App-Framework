/**
 * Add RxJS BehaviorSubject to a module.
 *
 * Add one simple observable subject or more complex ability to create others for
 * more complex eventing needs.
 *
 * Behavior Subjects remember their list message. For more information:
 * https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md
 */

define('nori/utils/MixinObservableSubject',

  function (require, module, exports) {

    var MixinObservableSubject = function () {

      var _subject    = new Rx.BehaviorSubject(),
          _subjectMap = {};

      /**
       * Create a new subject
       * @param name
       * @returns {*}
       */
      function createSubject(name) {
        if (!_subjectMap.hasOwnProperty(name)) {
          _subjectMap[name] = new Rx.BehaviorSubject();
        }
        return _subjectMap[name];
      }

      /**
       * Subscribe handler to updates. If the handler is a string, the new subject
       * will be created.
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

      /**
       * Gets the last payload that was dispatched to subscribers
       * @returns {*}
       */
      function getLastNotificationOf(name) {
        return _subjectMap[name].getValue();
      }

      return {
        subscribe            : subscribe,
        createSubject        : createSubject,
        notifySubscribers    : notifySubscribers,
        notifySubscribersOf  : notifySubscribersOf,
        getLastNotification  : getLastNotification,
        getLastNotificationOf: getLastNotificationOf
      };

    };

    module.exports = MixinObservableSubject;

  });