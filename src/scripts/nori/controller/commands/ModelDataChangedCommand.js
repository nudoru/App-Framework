define('Nori.Controller.Commands.ModelDataChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('ModelDataChanged, id: '+data.id+' ('+data.storeType+'), store data: '+JSON.stringify(data.store));

      if(data.storeType === 'model') {
        //{id:_id, storeType:'model',  store:getStore(), changed:_lastChangeResult}
        Nori.handleModelUpdate(data);
      } else {
        //{id:_id, storeType:'collection', storeID: data.id, store:data.store}
        Nori.handleModelCollectionUpdate(data)
      }

    };

  });