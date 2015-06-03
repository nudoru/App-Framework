define('TT.RouteChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('TT RouteChangedCommand, route: '+data.route+', data: '+data.data);

      TT.view().updateOnRouteChange(data);
    };

  });