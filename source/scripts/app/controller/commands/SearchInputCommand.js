APP.AppController.initializeCommand('APP.AppController.SearchInputCommand',
  function execute(data) {

    this.appModel.setCurrentFreeTextFilter(data);

    //if(data.length > 2) {
    //  var filteredData = this.appModel.getDataMatchingFreeText(data);
    //  this.appView.updateGridItemVisibility(filteredData);
    //} else {
    //  this.appView.removeFreeTextFilter();
    //}

  });