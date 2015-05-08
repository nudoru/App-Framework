APP.AppController.initializeCommand('APP.AppController.RouteChangedCommand',
  function execute(data) {

    console.log('RouteChangedCommand, route: '+data.route+', templateID: '+data.templateID);

  });