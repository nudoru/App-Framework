APP.createNameSpace('APP.AppController.ViewChangedCommand');
APP.AppController.ViewChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedCommand.execute = function(data) {
  console.log('ViewChangedCommand: '+data);
};