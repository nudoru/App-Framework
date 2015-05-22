define('APP.SubViewStoreDataCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('SubViewStoreDataCommand, subviewid: '+data.id+', data: '+data.data);
      APP.model().storeSubViewData(data.id, data.data);
    };

  });