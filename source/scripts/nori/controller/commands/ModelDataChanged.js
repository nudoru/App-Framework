define('Nori.ModelDataChanged',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ModelDataChanged, id: '+data.id);
      console.table(data.store);
    };

  });