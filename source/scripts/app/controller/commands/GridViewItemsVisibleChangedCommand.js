APP.createNameSpace('APP.AppController.GridViewItemsVisibleChangedCommand');
APP.AppController.GridViewItemsVisibleChangedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.GridViewItemsVisibleChangedCommand.execute = function(data) {
  var message = data ? 'Showing '+data+' matches' : 'No matches found';
  this.appView.updateSearchHeader(message);
};