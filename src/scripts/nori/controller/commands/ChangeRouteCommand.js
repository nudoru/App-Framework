define('Nori.Controller.Commands.ChangeRouteCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      data.fromApp = true;
      Nori.setCurrentRoute(data);
    };

  });