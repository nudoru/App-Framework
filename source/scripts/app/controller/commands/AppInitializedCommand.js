APP.createNameSpace('APP.AppController.AppInitializedCommand');
APP.AppController.AppInitializedCommand = APP.AppController.createCommand(APP.AppController.AbstractCommand);
APP.AppController.AppInitializedCommand.execute = function(data) {
  this.appController.postIntialize();


  this.appView.removeLoadingMessage();

  this.appView.initializeMenus(this.appModel.getMenuData());
  this.appView.initializeGridView(this.appModel.getData());

  var initialRoute = APP.AppController.Router.getRoute();

  console.log('Initial route: '+initialRoute);

  //var initialRoute = 'Human_Resources/Information_Technology/item-category2/item-category4/High/1_hour(z)/paper_based';

  // Code also present in URLHashChangeCommand
  if (initialRoute !== undefined) {
    this.appModel.parseFiltersFromUrl(initialRoute);

  } else {
    //this.appView.showBigMessage('Welcome to the ALPHA BR&L Solutions Gallery', '<p>Here you will find a selection of the work produced by the Business Readiness and Learning team.</p><p>To get started, click anywhere in the blue area to the left and browse.</p><p><em>This is still a work in progress. For comments, please email Matt Perkins.</em></p>');
  }

};

