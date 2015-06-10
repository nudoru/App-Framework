define('Nori.Controller.Commands.BrowserScrolledCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('BrowserScrolledCommand: '+data.left + 'l, ' + data.top + 't');
    };

  });