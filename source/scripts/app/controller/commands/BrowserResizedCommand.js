APP.initializeCommand('APP.BrowserResizedCommand',
  function execute(data) {
    console.log('BrowserResizedCommand: '+data.width + 'w, ' + data.height + 'h');
  });