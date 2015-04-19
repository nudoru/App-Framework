APP.AppController.initializeCommand('APP.AppController.ViewChangedToMobileCommand',
  function(data) {
  //console.log('ViewChangedToMobileCommand: '+data);

  // Searching isn't support in mobile views yet
  this.appModel.setCurrentFreeTextFilter('');
  this.appView.clearFreeTextFilter();

  this.appView.updateDrawerMenuSelections(this.appModel.getFiltersForTagBar());
});