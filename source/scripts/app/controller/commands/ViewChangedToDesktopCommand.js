define('APP.ViewChangedToDesktopCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedToDesktopCommand: '+data);
    };

  });