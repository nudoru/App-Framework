APP.createNameSpace('APP.AppController.SearchInputCommand');
APP.AppController.SearchInputCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.SearchInputCommand.execute = function(data) {

  this.appModel.setCurrentFreeTextFilter(data);

  //if(data.length > 2) {
  //  var filteredData = this.appModel.getDataMatchingFreeText(data);
  //  this.appView.updateGridItemVisibility(filteredData);
  //} else {
  //  this.appView.removeFreeTextFilter();
  //}

};