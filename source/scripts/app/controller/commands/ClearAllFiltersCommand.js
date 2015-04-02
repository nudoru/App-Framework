APP.createNameSpace('APP.AppController.ClearAllFiltersCommand');
APP.AppController.ClearAllFiltersCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ClearAllFiltersCommand.execute = function(data) {
  this.appModel.removeAllFilters();
  this.appView.clearAllFilters();
};