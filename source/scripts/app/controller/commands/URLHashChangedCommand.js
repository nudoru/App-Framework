APP.AppController.initializeCommand('APP.AppController.URLHashChangedCommand',
  function execute(data) {

    if (data !== undefined) {
      this.appModel.parseFiltersFromUrl(data);
      this.appView.updateMenuSelections(this.appModel.getFiltersForTagBar());
    }

  });