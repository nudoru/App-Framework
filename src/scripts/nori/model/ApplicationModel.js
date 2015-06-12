define('Nori.Model.ApplicationModel',
  function (require, module, exports) {

    var _appModelCollectionMap = Object.create(null),
      _appModelMap = Object.create(null);

    function initializeApplicationModel() {
      //
    }

    /**
     * Create a new model collection and initalize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createModelCollection(initObj, extras) {
      var m = requireExtend('Nori.Model.ModelCollection', extras);
      m.initialize(initObj);

      _appModelCollectionMap[initObj.id] = m;

      return m;
    }

    /**
     * Create a new model and initialize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createModel(initObj, extras) {
      var m = requireExtend('Nori.Model.Model', extras);
      m.initialize(initObj);

      _appModelMap[initObj.id] = m;

      return m;
    }

    /**
     * Get a model from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getModel(storeID) {
      return _appModelMap[storeID];
    }

    /**
     * Get a model collection from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getModelCollection(storeID) {
      return _appModelCollectionMap[storeID];
    }

    exports.initializeApplicationModel = initializeApplicationModel;
    exports.createModelCollection = createModelCollection;
    exports.createModel = createModel;
    exports.getModel = getModel;
    exports.getModelCollection = getModelCollection;

  });