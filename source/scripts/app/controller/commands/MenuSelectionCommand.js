APP.createNameSpace('APP.AppController.MenuSelectionCommand');
APP.AppController.MenuSelectionCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.MenuSelectionCommand.execute = function(data) {
  //DEBUGGER.log('MenuSelectionCommand: '+data);
  this.appModel.toggleFilter(data);
};