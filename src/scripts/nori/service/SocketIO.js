define('nori/service/SocketIO',
  function (require, module, exports) {

    var SocketIOConnector = function () {

      var _subject  = new Rx.BehaviorSubject(),
          _socketIO = io(),
          _events   = {
            NOTIFY_CLIENT    : 'notify_client',
            NOTIFY_SERVER    : 'notify_server',
            CONNECT          : 'connect',
            DROPPED          : 'dropped',
            USER_CONNECTED   : 'user_connected',
            USER_DISCONNECTED: 'user_disconnected',
            EMIT             : 'emit',
            BROADCAST        : 'broadcast',
            SYSTEM_MESSAGE   : 'system_message',
            MESSAGE          : 'message',
            CREATE_ROOM      : 'create_room',
            JOIN_ROOM        : 'join_room',
            LEAVE_ROOM       : 'leave_room'
          };


      function initialize() {
        _socketIO.on(_events.NOTIFY_CLIENT, onNotifyClient);
      }

      /**
       * All notifications from Socket.io come here
       * @param payload {type, id, time, payload}
       */
      function onNotifyClient(payload) {
        notifySubscribers(payload);
        //notifyServer(_events.CONNECT,'hi!');
      }

      /**
       * All communications to the server should go through here
       * @param type
       * @param payload
       */
      function notifyServer(type, payload) {
        _socketIO.emit(_events.NOTIFY_SERVER, {
          type   : type,
          payload: payload
        });
      }

      //function emit(message, payload) {
      //  message = message || _events.MESSAGE;
      //  payload = payload || {};
      //  _socketIO.emit(message, payload);
      //}
      //
      //function on(event, handler) {
      //  _socketIO.on(event, handler);
      //}

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

      function getEventConstants() {
        return _.assign({}, _events);
      }

      return {
        events             : getEventConstants,
        initialize         : initialize,
        //on                 : on,
        //emit               : emit,
        notifyServer       : notifyServer,
        subscribe          : subscribe,
        notifySubscribers  : notifySubscribers,
        getLastNotification: getLastNotification
      };

    };

    module.exports = SocketIOConnector();

  });