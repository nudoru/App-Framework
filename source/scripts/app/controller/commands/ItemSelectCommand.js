APP.createNameSpace('APP.AppController.ItemSelectCommand');
APP.AppController.ItemSelectCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ItemSelectCommand.execute = function(data) {
  //DEBUGGER.log('ItemSelectCommand: '+data);

  if(data) {
    var itemObject = this.appModel.getItemObjectForID(data);

    if(itemObject !== null) {
      this.appModel.setCurrentItem(itemObject.id);
      this.appView.showItemDetailView(itemObject);
    } else {
      DEBUGGER.log('[ItemSelectCommand] Cannot show details for item id "'+data+'", not found.');
    }
  } else {
    this.appModel.setCurrentItem('');
  }

  APP.AppController.Router.setRoute(this.appModel.getFiltersForURL());
};