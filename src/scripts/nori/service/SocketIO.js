/* @flow weak */

import _events from './SocketIOEvents.js';
import Rxjs from '../../vendor/rxjs/rx.lite.min.js';

let SocketIOConnector = function () {

  let _subject  = new Rxjs.Subject(),
      _socketIO = io(),
      _log      = [],
      _connectionID;

  function initialize() {
    _socketIO.on(_events.NOTIFY_CLIENT, onNotifyClient);
  }

  /**
   * All notifications from Socket.io come here
   * @param payload {type, id, time, payload}
   */
  function onNotifyClient(payload) {
    _log.push(payload);

    let {type} = payload;

    if (type === _events.PING) {
      notifyServer(_events.PONG, {});
    } else if (type === _events.PONG) {
      console.log('SOCKET.IO PONG!');
    } else if (type === _events.CONNECT) {
      _connectionID = payload.id;
    }
    notifySubscribers(payload);
  }

  function ping() {
    notifyServer(_events.PING, {});
  }

  /**
   * All communications to the server should go through here
   * @param type
   * @param payload
   */
  function notifyServer(type, payload) {
    //console.log('notify server',type,payload);
    _socketIO.emit(_events.NOTIFY_SERVER, {
      type        : type,
      connectionID: _connectionID,
      payload     : payload
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
    ping               : ping,
    notifyServer       : notifyServer,
    subscribe          : subscribe,
    notifySubscribers  : notifySubscribers,
    getLastNotification: getLastNotification
  };

};

export default SocketIOConnector();