// Simple debugger, Matt Perkins
var NDebugger = (function() {
  var _messages = [],
    _broadcast = true;

  function log(text, source) {
    _messages.push({
      source: source,
      text: text
    });

    if(_broadcast) {
      console.log(createLogOutputString(_messages[_messages.length-1]));
    }
  }

  function createLogOutputString(entry) {
    return '> '+entry.text;
  }

  return {
    log: log
  };

}());