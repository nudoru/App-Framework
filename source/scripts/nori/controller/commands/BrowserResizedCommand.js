define('Nori.BrowserResizedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('BrowserResizedCommand: '+data.width + 'w, ' + data.height + 'h');
    };

  });