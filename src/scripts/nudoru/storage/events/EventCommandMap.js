/*
 Matt Perkins, 1/3/15
 With gentle nudges from Kevin Carmody
 */

define('Nudoru.events.EventCommandMap',
  function (require, module, exports) {

    var _eventDispatcher = require('Nudoru.events.EventDispatcher'),
      _commandMap = Object.create(null);

    /**
     * Register the event to a command
     * @param evt Event string
     * @param command Command class
     * @param once  Umap after the first event publish
     */
    function map(evt, command, once) {

      if (hasCommand(evt, command)) {
        return;
      }

      if (_commandMap[evt] === undefined) {
        _commandMap[evt] = {};
      }

      var evtCommandMap = _commandMap[evt];

      var callback = function (args) {
        routeToCommand(evt, command, args, once);
      };

      evtCommandMap[command] = callback;

      _eventDispatcher.subscribe(evt, callback);
    }

    /**
     * Routes the event to the command
     * @param evt
     * @param command
     * @param args
     * @param once
     */
    function routeToCommand(evt, command, args, once) {
      var cmd = command;
      cmd.execute.apply(command, [args]);
      cmd = null;
      if (once) {
        unmap(evt, command);
      }
    }

    /**
     * Unregister a command from an event
     * @param evt
     * @param command
     */
    function unmap(evt, command) {
      if (hasCommand(evt, command)) {
        var callbacksByCommand = _commandMap[evt],
          callback = callbacksByCommand[command];
        _eventDispatcher.unsubscribe(evt, callback);
        delete callbacksByCommand[command];
      }
    }

    /**
     * Determine if a command has been mapped to an event
     * @param evt
     * @param command
     * @returns {boolean}
     */
    function hasCommand(evt, command) {
      var callbacksByCommand = _commandMap[evt];
      if (callbacksByCommand === undefined) {
        return false;
      }
      var callback = callbacksByCommand[command];
      return callback !== undefined;
    }

    exports.map = map;
    exports.unmap = unmap;

  });