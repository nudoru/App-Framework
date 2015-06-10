define('Nori.Controller.Commands.ChangeRouteCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('ChangeRouteCommand, route: '+data.route);
      data.fromApp = true;
      Nori.setCurrentRoute(data);
    };

  });