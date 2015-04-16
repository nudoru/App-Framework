APP.createNameSpace('APP.AppController.BrowserResizedCommand');
APP.AppController.BrowserResizedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.BrowserResizedCommand.execute = function(data) {
  //console.log('BrowserResizedCommand: '+data.width + 'w, ' + data.height + 'h');
};