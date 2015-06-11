/*
 Matt Perkins, 5/17/15
 Based on
 https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md

 Refernect Flux dispatcher
 https://github.com/facebook/flux/blob/master/src/Dispatcher.js
*/

define('Nori.Events.Emitter',
  function (require, module, exports) {
    var _subjectMap = {},
        _log = [];

    /**
     * Add an event as observable
     * @param evtStr Event name string
     * @param handler onNext() subscription function
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribe(evtStr, handler, once) {
      _subjectMap[evtStr] || (_subjectMap[evtStr] = []);

       var subject = new Rx.Subject();

      _subjectMap[evtStr].push({
        once: once,
        priority: 0,
        handler: handler,
        subject: subject
      });

      return subject.subscribe(handler);
    }

    /**
     * Maps a module/command's execute() function as the handler for onNext
     * @param evtStr Event name string
     * @param cmdModule Module name
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribeCommand(evtStr, cmdModule, once) {
      var cmd = require(cmdModule);
      if(cmd.hasOwnProperty('execute')) {
        return subscribe(evtStr, cmd.execute, once);
      } else {
        throw new Error('Emitter cannot map '+evtStr+' to command '+cmdModule+': must have execute()');
      }
    }

    /**
     * Publish a event to all subscribers
     * @param evtStr
     * @param data
     */
    function publish(evtStr, data) {
      var subscribers = _subjectMap[evtStr], i;

      if(!subscribers) {
        _log.push({event:evtStr, data:'NO SUBSCRIBERS'});
        return;
      }

      _log.push({event:evtStr, data:data});
      //console.log('>> ',evtStr, data);

      i = subscribers.length;

      while (i--) {

        var subjObj = subscribers[i];

        subjObj.subject.onNext(data);

        if (subjObj.once) {
          unsubscribe(evtStr, subjObj.handler);
        }

      }
    }

    function unsubscribe(evtStr, hander) {
      if (_subjectMap[evtString] === undefined) {
        return;
      }

      var subscribers = _subjectMap[evtString],
        handlerIdx = -1;

      for (var i = 0, len = subscribers.length; i < len; i++) {
        if (subscribers[i].handler === handler) {
          handlerIdx = i;
          subscribers[i].subject.onCompleted();
          subscribers[i].subject.dispose();
          subscribers[i] = null;
        }
      }

      if (handlerIdx === -1) {
        return;
      }

      subscribers.splice(handlerIdx, 1);

      if (subscribers.length === 0) {
        delete _subjectMap[evtString];
      }
    }

    /**
     * Return a copy of the log array
     * @returns {Array.<T>}
     */
    function getLog() {
      return _log.slice(0);
    }


    exports.subscribe = subscribe;
    exports.unsubscribe = unsubscribe;
    exports.subscribeCommand = subscribeCommand;
    exports.publish = publish;
    exports.getLog = getLog;

  });