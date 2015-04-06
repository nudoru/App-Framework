/*
Matt Perkins, 1/3/15
With gentle nudges from Kevin Carmody
 */

APP.createNameSpace('APP.EventCommandMap');
APP.EventCommandMap = (function(){
  var _eventDispatcher = APP.EventDispatcher,
      _commandMap = {};

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

  return {
    map: map,
    unmap: unmap
  };

}());