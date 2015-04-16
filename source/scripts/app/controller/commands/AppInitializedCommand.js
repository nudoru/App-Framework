APP.createNameSpace('APP.AppController.AppInitializedCommand');
APP.AppController.AppInitializedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.AppInitializedCommand.execute = function(data) {
  var _appGlobals = APP.globals();


  this.appController.postIntialize();


  this.appView.removeLoadingMessage();

  this.appView.initializeMenus(this.appModel.getMenuData());
  this.appView.initializeGridView(this.appModel.getData());

  var initialRoute = this.urlRouter.getRoute();

  if (initialRoute.length > 0) {
    this.appModel.parseFiltersFromUrl(initialRoute);
  } else {
    if(_appGlobals.appConfig.welcome.enabled === 'true') {
      this.appView.showBigMessage(_appGlobals.appConfig.welcome.title, _appGlobals.appConfig.welcome.text);
    }
  }

  //console.log('Doing Perf ...');
  //var iterations = 10000;
  //var testObj = this.appModel.getData()[0];
  //console.time('Method');
  //for(var i = 0; i < iterations; i++) {
  //  nudoru.utils.NTemplate.asElement('template__item-tile', testObj);
  //  //nudoru.utils.NTemplate.getTemplate('template__item-tile');
  //}
  //console.timeEnd('Method')

};

