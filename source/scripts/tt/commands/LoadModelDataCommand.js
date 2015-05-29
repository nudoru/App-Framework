define('TT.LoadModelDataCommand',
  function (require, module, exports) {

    /**
     * Should inject some real data here
     * @param data
     */
    exports.execute = function(data) {
      console.log('TT Load model data, injecting data');

      var dataSource = require('TT.FakeData');
      dataSource.initialize();

      TT.model().setData(dataSource);
    };

  });