APP.AppController.initializeCommand('APP.AppController.ViewChangedToDesktopCommand',
  function execute(data) {
  //console.log('ViewChangedToDesktopCommand: '+data);
  this.appView.updateHeaderMenuSelections(this.appModel.getFiltersForTagBar());
});