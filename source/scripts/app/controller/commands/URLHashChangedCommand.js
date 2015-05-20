define('APP.URLHashChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('URLHashChangedCommand: fragment: '+data.fragment+', routeObj: '+data.routeObj);
      APP.setCurrentRoute(data.routeObj);
    };

  });