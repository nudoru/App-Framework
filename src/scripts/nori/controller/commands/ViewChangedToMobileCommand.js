define('Nori.Controller.Commands.ViewChangedToMobileCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedToMobileCommand: '+data);
    };

  });