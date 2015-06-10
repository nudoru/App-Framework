define('Nori.Controller.Commands.UpdateModelDataCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('UpdateModelDataCommand, model id: '+data.id+', with data:');
      console.table(data.data);
    };

  });