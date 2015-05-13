APP.AppController.initializeCommand('APP.AppController.AppInitializedCommand',
  function execute(data) {

    var _browserEvents = require('nudoru.events.BrowserEvents');

    console.log('AppInitializedCommand');

    // Browser events
    APP.AppController.mapEventCommand(_browserEvents.BROWSER_RESIZED, APP.AppController.BrowserResizedCommand);
    APP.AppController.mapEventCommand(_browserEvents.BROWSER_SCROLLED, APP.AppController.BrowserScrolledCommand);

    // App events
    APP.AppController.mapEventCommand(APP.AppEvents.CHANGE_ROUTE, APP.AppController.ChangeRouteCommand);
    APP.AppController.mapEventCommand(APP.AppEvents.VIEW_CHANGED, APP.AppController.ViewChangedCommand);
    APP.AppController.mapEventCommand(APP.AppEvents.VIEW_CHANGE_TO_MOBILE, APP.AppController.ViewChangedToMobileCommand);
    APP.AppController.mapEventCommand(APP.AppEvents.VIEW_CHANGE_TO_DESKTOP, APP.AppController.ViewChangedToDesktopCommand);

    // Routes
    APP.AppController.mapRouteView('/', 'TemplateSubView', 'APP.View.TemplateSubView', false);
    APP.AppController.mapRouteView('/1', 'TestSubView', 'APP.View.TemplateSubView', false);

    APP.View.removeLoadingMessage();

    this.router.runCurrentRoute();
  });