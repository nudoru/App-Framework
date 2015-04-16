APP.createNameSpace('APP.AppController.ViewChangedToMobileCommand');
APP.AppController.ViewChangedToMobileCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ViewChangedToMobileCommand.execute = function(data) {
  //console.log('ViewChangedToMobileCommand: '+data);

  // Searching isn't support in mobile views yet
  this.appModel.setCurrentFreeTextFilter('');
  this.appView.clearFreeTextFilter();

  this.appView.updateDrawerMenuSelections(this.appModel.getFiltersForTagBar());
};