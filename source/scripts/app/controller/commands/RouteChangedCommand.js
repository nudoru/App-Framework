APP.initializeCommand('APP.RouteChangedCommand',
  function execute(data) {

    console.log('RouteChangedCommand, route: '+data.route+', templateID: '+data.templateID);

    APP.view().showView(data);

  });