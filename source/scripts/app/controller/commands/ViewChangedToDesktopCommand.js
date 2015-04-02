APP.createNameSpace('APP.AppController.ViewChangedToDesktopCommand');
APP.AppController.ViewChangedToDesktopCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedToDesktopCommand.execute = function(data) {
  DEBUGGER.log('ViewChangedToDesktopCommand: '+data);
};