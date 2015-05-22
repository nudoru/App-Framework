/*

 */


define('APP.ChangeRouteCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ChangeRouteCommand, route: '+data.route);
      data.fromApp = true;
      APP.setCurrentRoute(data);
    };

  });