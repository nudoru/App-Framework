APP.createNameSpace('APP.AppController.BrowserScrolledCommand');
APP.AppController.BrowserScrolledCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.BrowserScrolledCommand.execute = function(data) {
  //NDebugger.log('BrowserScrolledCommand: '+data.left + 'l, ' + data.top + 't');
};