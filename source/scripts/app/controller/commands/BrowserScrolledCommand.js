APP.AppController.initializeCommand('APP.AppController.BrowserScrolledCommand',
  function execute(data) {
    console.log('BrowserScrolledCommand: '+data.left + 'l, ' + data.top + 't');
  });