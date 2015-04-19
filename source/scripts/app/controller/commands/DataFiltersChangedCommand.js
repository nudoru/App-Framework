APP.AppController.initializeCommand('APP.AppController.DataFiltersChangedCommand',
  function execute(data) {

    //console.log('Filters: '+this.appModel.getFiltersForTagBar());

    var filterList = this.appModel.getFiltersForTagBar();

    this.appView.updateUIOnFilterChanges();
    this.appView.updateTagBarDisplay(filterList);
    this.appView.updateGridItemVisibility(this.appModel.getDataMatchingFilters());

    this.urlRouter.setRoute(this.appModel.getFiltersForURL());
  });