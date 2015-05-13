APP.initializeCommand('APP.ChangeRouteCommand',
  function execute(data) {

    console.log('ChangeRouteCommand, route: '+data.route);

    APP.router().setRoute(data.route);

  });