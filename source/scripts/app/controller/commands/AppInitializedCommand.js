APP.AppController.initializeCommand('APP.AppController.AppInitializedCommand',
  function execute(data) {
    var _appGlobals = APP.globals();

    this.appView.removeLoadingMessage();

    var initialRoute = this.urlRouter.getRoute();

    if (initialRoute.length > 0) {
      //
    } else {
      if (_appGlobals.appConfig.welcome.enabled === 'true') {
        //show a meesage (_appGlobals.appConfig.welcome.title, _appGlobals.appConfig.welcome.text);
      }
    }

  });