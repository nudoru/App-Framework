/**
 * Add RxJS Subject to a model
 */

define('nori/model/MixinObservableModel',

  function (require, module, exports) {

    //https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md
    var _subject = new Rx.BehaviorSubject();

    /**
     * SUbscribe handler to updates
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

    module.exports.subscribe           = subscribe;
    module.exports.notifySubscribers   = notifySubscribers;
    module.exports.getLastNotification = getLastNotification;

  });