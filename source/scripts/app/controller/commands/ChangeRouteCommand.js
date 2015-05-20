define('APP.ChangeRouteCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ChangeRouteCommand, route: '+data.route);
      APP.setCurrentRoute(data);
    };

  });