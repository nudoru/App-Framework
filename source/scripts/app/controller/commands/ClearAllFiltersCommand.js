APP.AppController.initializeCommand('APP.AppController.ClearAllFiltersCommand',
  function execute(data) {
    this.appModel.removeAllFilters();
    this.appView.clearAllFilters();
  });