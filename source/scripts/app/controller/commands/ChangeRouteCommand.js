APP.AppController.initializeCommand('APP.AppController.ChangeRouteCommand',
  function execute(data) {

    console.log('ChangeRouteCommand, route: '+data.route);

    this.router.setRoute(data.route);

  });