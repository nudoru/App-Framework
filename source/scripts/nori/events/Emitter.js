/*
 Matt Perkins, 5/17/15
 Based on
 https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md
*/

define('Nori.Events.Emitter',
  function (require, module, exports) {
    var _subjectMap = {};

    /**
     * Add an event as observable
     * @param evtStr Event name string
     * @param handler onNext() subscription function
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribe(evtStr, handler, once) {
      _subjectMap[evtStr] || (_subjectMap[evtStr] = []);

      _subjectMap[evtStr] = {
        once: once,
        handler: handler,
        subject: new Rx.Subject()
      };

      return _subjectMap[evtStr].subject.subscribe(handler);
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
      var subjObj = _subjectMap[evtStr];

      if(!subjObj) {
        return;
      }

      subjObj.subject.onNext(data);

      if(subjObj.once) {
        subjObj.subject.onCompleted();
        subjObj.subject.dispose();
        subjObj = null;
      }
    }

    /**
     * Cleanup
     */
    function dispose() {
      var subjects = _subjectMap;
      for (var prop in subjects) {
        if (hasOwnProp.call(subjects, prop)) {
          subjects[prop].subject.dispose();
        }
      }

      _subjectMap = {};
    }
    
    exports.subscribe = subscribe;
    exports.subscribeCommand = subscribeCommand;
    exports.publish = publish;
    exports.dispose = dispose;

  });