/* @flow weak */

import SocketIOEvents from './SocketIOEvents.js';
import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import ObjectAssign from '../../nudoru/util/ObjectAssign.js';

let SocketIOConnectorModule = function () {

  let _subject  = new Rxjs.Subject(),
      _socketIO = io(),
      _log      = [],
      _connectionID;

  function initialize() {
    _socketIO.on(SocketIOEvents.NOTIFY_CLIENT, onNotifyClient);
  }

  /**
   * All notifications from Socket.io come here
   * @param payload {type, id, time, payload}
   */
  function onNotifyClient(payload) {
    _log.push(payload);

    let {type} = payload;

    if (type === SocketIOEvents.PING) {
      notifyServer(SocketIOEvents.PONG, {});
    } else if (type === SocketIOEvents.PONG) {
      console.log('SOCKET.IO PONG!');
    } else if (type === SocketIOEvents.CONNECT) {
      _connectionID = payload.id;
    }
    notifySubscribers(payload);
  }

  function ping() {
    notifyServer(SocketIOEvents.PING, {});
  }

  /**
   * All communications to the server should go through here
   * @param type
   * @param payload
   */
  function notifyServer(type, payload) {
    //console.log('notify server',type,payload);
    _socketIO.emit(SocketIOEvents.NOTIFY_SERVER, {
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


  function events() {
    return ObjectAssign({}, SocketIOEvents);
  }

  return {
    events             : events,
    initialize         : initialize,
    ping               : ping,
    notifyServer       : notifyServer,
    subscribe          : subscribe,
    notifySubscribers  : notifySubscribers
  };

};

let SocketIOConnector = SocketIOConnectorModule();

export default SocketIOConnector;