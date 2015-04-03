APP.createNameSpace('APP.AppController.AppInitializedCommand');
APP.AppController.AppInitializedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.AppInitializedCommand.execute = function(data) {
  var _appGlobals = APP.globals();


  this.appController.postIntialize();


  this.appView.removeLoadingMessage();

  this.appView.initializeMenus(this.appModel.getMenuData());
  this.appView.initializeGridView(this.appModel.getData());

  var initialRoute = APP.AppController.Router.getRoute();

  console.log('Initial route: '+initialRoute);

  //var initialRoute = 'Human_Resources/Information_Technology/item-category2/item-category4/High/1_hour(z)/paper_based';

  // Code also present in URLHashChangeCommand
  if (initialRoute.length > 0) {
    this.appModel.parseFiltersFromUrl(initialRoute);
  } else {
    if(_appGlobals.appConfig.welcome.enabled === 'true') {
      this.appView.showBigMessage(_appGlobals.appConfig.welcome.title, _appGlobals.appConfig.welcome.text);
    }
  }

};

