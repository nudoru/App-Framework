/*
Matt Perkins, 1/3/15
Based on
 https://github.com/michd/step-sequencer/blob/master/assets/js/eventdispatcher.js
 */

nudoru.createNameSpace('nudoru.events.EventDispatcher');
nudoru.events.EventDispatcher = function () {

  var _eventMap = Object.create(null);

  function subscribe(evtString, callback, once) {
    if(_eventMap[evtString] === undefined) {
      _eventMap[evtString] = [];
    }

    _eventMap[evtString].push({
      evtstring: evtString,
      callback: callback,
      once: once,
      priority: 0
    });
  }

  function unsubscribe(evtString, callback) {
    if(_eventMap[evtString] === undefined) {
      return;
    }

    var listeners = _eventMap[evtString],
        callbackIdx = -1;

    for(var i= 0, len=listeners.length; i<len; i++) {
      if(listeners[i].callback === callback) {
        callbackIdx = i;
      }
    }

    if(callbackIdx === -1) {
      return;
    }

    listeners.splice(callbackIdx, 1);

    if(listeners.length === 0) {
      delete _eventMap[evtString];
    }
  }

  function publish(evtString, data, context) {
    if(_eventMap[evtString] === undefined) {
      return;
    }

    var listeners = _eventMap[evtString],
        i = listeners.length;

    data = (data instanceof Array) ? data : [data];

    while(i--) {

      var listenerObj = listeners[i];

      var cnxt = context || listenerObj.callback;
      listenerObj.callback.apply(cnxt, data);
      if(listenerObj.once) {
        unsubscribe(listenerObj.evtstring, listenerObj.callback);
      }

    }
  }

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish
  };

}();