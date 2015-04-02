APP.createNameSpace('APP.AppController.URLHashChangedCommand');
APP.AppController.URLHashChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.URLHashChangedCommand.execute = function(data) {
  DEBUGGER.log('URLHashChangedCommand: '+data);

  // Code also present in AppInitializedCommand
  if (data !== undefined) {
    this.appModel.parseFiltersFromUrl(data);
    this.appView.updateMenuSelections(this.appModel.getFiltersForTagBar());
  }

};