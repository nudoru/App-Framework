/**
 * Add RxJS Subject to a module.
 *
 * Add one simple observable subject or more complex ability to create others for
 * more complex eventing needs.
 */

define('nori/utils/MixinObservableSubject',

  function (require, module, exports) {

    var MixinObservableSubject = function () {

      var _subject    = new Rx.Subject(),
          _subjectMap = {};

      /**
       * Create a new subject
       * @param name
       * @returns {*}
       */
      function createSubject(name) {
        if (!_subjectMap.hasOwnProperty(name)) {
          _subjectMap[name] = new Rx.Subject();
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

      return {
        subscribe            : subscribe,
        createSubject        : createSubject,
        notifySubscribers    : notifySubscribers,
        notifySubscribersOf  : notifySubscribersOf
      };

    };

    module.exports = MixinObservableSubject;

  });