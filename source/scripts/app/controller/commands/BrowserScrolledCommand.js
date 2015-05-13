APP.initializeCommand('APP.BrowserScrolledCommand',
  function execute(data) {
    console.log('BrowserScrolledCommand: '+data.left + 'l, ' + data.top + 't');
  });