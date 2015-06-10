define('Nori.Controller.Commands.SubViewStoreDataCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('SubViewStoreDataCommand, subviewid: '+data.id+', data: '+data.data);
      Nori.storeSubViewData(data.id, data.data);
    };

  });