define('Nori.Controller.Commands.ViewChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedCommand: '+data);
    };

  });