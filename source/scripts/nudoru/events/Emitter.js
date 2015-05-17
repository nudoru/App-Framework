/*
 Matt Perkins, 5/17/15
 Based on
 https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md
*/

define('nudoru.events.Emitter',
  function (require, module, exports) {
    var _subjectMap = {};

    /**
     * Add an event as observable
     * @param name Event name string
     * @param handler onNext() subscription function
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribe(name, handler, once) {
      _subjectMap[name] || (_subjectMap[name] = []);

      _subjectMap[name] = {
        once: once,
        handler: handler,
        subject: new Rx.Subject()
      };

      return _subjectMap[name].subject.subscribe(handler);
    }

    /**
     * Maps a module/command's execute() function as the handler for onNext
     * @param name Event name string
     * @param cmdModule Module name
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribeCommand(name, cmdModule, once) {
      var cmd = require(cmdModule);
      if(cmd.hasOwnProperty('execute')) {
        return subscribe(name, cmd.execute, once);
      } else {
        throw new Error('Emitter cannot map '+name+' to command '+cmdModule+': must have execute()');
      }
    }

    /**
     * Publish a event to all subscribers
     * @param name
     * @param data
     */
    function publish(name, data) {
      var subjObj = _subjectMap[name];

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