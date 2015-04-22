APP.AppController.initializeCommand('APP.AppController.AppInitializedCommand',
  function execute(data) {
    var _appGlobals = APP.globals();

    this.appView.removeLoadingMessage();
    this.appView.initializeMenus(this.appModel.getMenuData());
    this.appView.initializeGridView(this.appModel.getData());

    var initialRoute = this.urlRouter.getRoute();

    if (initialRoute.length > 0) {
      this.appModel.parseFiltersFromUrl(initialRoute);
    } else {
      if (_appGlobals.appConfig.welcome.enabled === 'true') {
        this.appView.showBigMessage(_appGlobals.appConfig.welcome.title, _appGlobals.appConfig.welcome.text);
      }
    }

  });