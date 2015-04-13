APP.createNameSpace('APP.AppController.ItemSelectCommand');
APP.AppController.ItemSelectCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.ItemSelectCommand.execute = function(data) {
  //NDebugger.log('ItemSelectCommand: '+data);

  if(data) {
    var itemObject = this.appModel.getItemObjectForID(data);

    if(itemObject !== null) {
      this.appModel.setCurrentItem(itemObject.id);
      this.appView.showItemDetailView(itemObject);
    } else {
      NDebugger.log('[ItemSelectCommand] Cannot show details for item id "'+data+'", not found.');
    }
  } else {
    this.appModel.setCurrentItem('');
  }

  nudoru.components.URLRouter.setRoute(this.appModel.getFiltersForURL());
};