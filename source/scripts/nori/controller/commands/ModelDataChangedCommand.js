define('Nori.ModelDataChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ModelDataChanged, id: '+data.id+'('+data.storeType+'), store data: '+JSON.stringify(data.store));
      //console.table(data.store);
    };

  });