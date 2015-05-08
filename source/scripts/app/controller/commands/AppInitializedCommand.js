APP.AppController.initializeCommand('APP.AppController.AppInitializedCommand',
  function execute(data) {
    console.log('AppInitializedCommand');

    var _appGlobals = APP.globals();

    this.appView.removeLoadingMessage();

    this.router.runCurrentRoute();
  });