define('APP.ViewChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedCommand: '+data);
    };

  });