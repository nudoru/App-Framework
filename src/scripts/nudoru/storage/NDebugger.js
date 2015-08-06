// Simple debugger, Matt Perkins
define('nudoru/core/NDebugger',
  function(require, module, exports) {

    var _messages = [],
        _broadcast = true;

    module.exports.log = function(text, source) {
      _messages.push({
        source: source,
        text: text
      });

      if(_broadcast) {
        console.log(createLogOutputString(_messages[_messages.length-1]));
      }
    };

    function createLogOutputString(entry) {
      return '> '+entry.text;
    }

  });