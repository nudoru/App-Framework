define('Nori.Controller.Commands.URLHashChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('URLHashChangedCommand: fragment: '+data.fragment+', routeObj: '+data.routeObj);
      Nori.setCurrentRoute(data.routeObj);
    };

  });