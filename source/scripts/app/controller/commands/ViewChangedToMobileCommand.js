APP.createNameSpace('APP.AppController.ViewChangedToMobileCommand');
APP.AppController.ViewChangedToMobileCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedToMobileCommand.execute = function(data) {
  DEBUGGER.log('ViewChangedToMobileCommand: '+data);

  // Searching isn't support in mobile views yet
  this.appModel.setCurrentFreeTextFilter('');
  this.appView.clearFreeTextFilter();
};