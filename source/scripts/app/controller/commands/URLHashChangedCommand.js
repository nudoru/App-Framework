APP.createNameSpace('APP.AppController.URLHashChangedCommand');
APP.AppController.URLHashChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.URLHashChangedCommand.execute = function(data) {

  if (data !== undefined) {
    this.appModel.parseFiltersFromUrl(data);
    this.appView.updateMenuSelections(this.appModel.getFiltersForTagBar());
  }

};