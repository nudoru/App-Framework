APP.initializeCommand('APP.AppInitializedCommand',
  function execute(data) {

    var _browserEvents = require('nudoru.events.BrowserEvents');

    console.log('AppInitializedCommand');

    // Browser events
    APP.mapEventCommand(_browserEvents.BROWSER_RESIZED, APP.BrowserResizedCommand);
    APP.mapEventCommand(_browserEvents.BROWSER_SCROLLED, APP.BrowserScrolledCommand);

    // App events
    APP.mapEventCommand(APP.AppEvents.CHANGE_ROUTE, APP.ChangeRouteCommand);
    APP.mapEventCommand(APP.AppEvents.VIEW_CHANGED, APP.ViewChangedCommand);
    APP.mapEventCommand(APP.AppEvents.VIEW_CHANGE_TO_MOBILE, APP.ViewChangedToMobileCommand);
    APP.mapEventCommand(APP.AppEvents.VIEW_CHANGE_TO_DESKTOP, APP.ViewChangedToDesktopCommand);

    // Routes
    APP.mapRouteView('/', 'TemplateSubView', 'APP.View.TemplateSubView', false);
    APP.mapRouteView('/1', 'TestSubView', 'APP.View.TemplateSubView', false);

    APP.view().removeLoadingMessage();

    APP.router().runCurrentRoute();
  });