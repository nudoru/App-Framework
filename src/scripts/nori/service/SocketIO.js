define('app/service/SocketIO',
  function (require, module, exports) {

    var SocketIOConnector = function () {

      var _subject = new Rx.BehaviorSubject(),
          _socketIO = io();

      //_socketIO.on('message', handleMessageReceived);

      function emit(message, payload) {
        payload = payload || {};
        _socketIO.emit(message, payload);
      }

      function messageReceived() {

      }

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
        emit               : emit,
        messageReceived    : messageReceived,
        subscribe          : subscribe,
        notifySubscribers  : notifySubscribers,
        getLastNotification: getLastNotification
      };

    };

    module.exports = SocketIOConnector();

  });