APP.createNameSpace('APP.AppController.DataFiltersChangedCommand');
APP.AppController.DataFiltersChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.DataFiltersChangedCommand.execute = function(data) {

  //console.log('Filters: '+this.appModel.getFiltersForTagBar());

  var filterList = this.appModel.getFiltersForTagBar();

  this.appView.updateUIOnFilterChanges();
  this.appView.updateTagBarDisplay(filterList);
  this.appView.updateGridItemVisibility(this.appModel.getDataMatchingFilters());

  APP.AppController.Router.setRoute(this.appModel.getFiltersForURL());
};