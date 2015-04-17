/*
 Matt Perkins, 1/3/15
 With gentle nudges from Kevin Carmody
 */

define('nudoru.events.EventCommandMap',
  function(require, module, exports) {

    var _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _commandMap = Object.create(null);

    function map(evt, command, once) {

      if(hasCommand(evt, command)) {
        return;
      }

      if(_commandMap[evt] === undefined) {
        _commandMap[evt] = {};
      }

      var evtCommandMap = _commandMap[evt];

      var callback = function(args) {
        routeToCommand(evt, command, args, once);
      };

      evtCommandMap[command] = callback;

      _eventDispatcher.subscribe(evt, callback);
    }

    function routeToCommand(evt, command, args, once) {
      var cmd = command;
      cmd.execute.apply(command, [args]);
      cmd = null;
      if(once) {
        unmap(evt, command);
      }
    }

    function unmap(evt, command) {
      if(hasCommand(evt, command)) {
        var callbacksByCommand = _commandMap[evt],
          callback = callbacksByCommand[command];
        _eventDispatcher.unsubscribe(evt, callback);
        delete callbacksByCommand[command];
      }
    }

    function hasCommand(evt, command) {
      var callbacksByCommand = _commandMap[evt];
      if(callbacksByCommand === undefined) {
        return false;
      }
      var callback = callbacksByCommand[command];
      return callback !== undefined;
    }

    exports.map = map;
    exports.unmap = unmap;

  });