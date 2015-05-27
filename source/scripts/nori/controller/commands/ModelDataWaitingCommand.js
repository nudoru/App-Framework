define('Nori.ModelDataWaitingCommand',
  function (require, module, exports) {

    /**
     * Should inject some real data here
     * @param data
     */
    exports.execute = function(data) {
      console.log('ModelDataWaitingCommand, injecting data');

      Nori.model().setData({});
    };

  });