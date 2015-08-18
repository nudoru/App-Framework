define('nori/model/MixinMapFactory',
  function (require, module, exports) {

    var _mapCollectionList = Object.create(null),
        _mapList           = Object.create(null);

    /**
     * Create a new model collection and initalize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createMapCollection(initObj, extras) {
      var m = Nori.assignArray({}, [requireNew('nori/model/MapCollection'), requireNew('nori/utils/MixinObservableSubject'), extras]);
      m.initialize(initObj);
      return m;
    }

    /**
     * Create a new model and initialize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createMap(initObj, extras) {
      var m = Nori.assignArray({}, [requireNew('nori/model/Map'), requireNew('nori/utils/MixinObservableSubject'), extras]);
      m.initialize(initObj);
      return m;
    }

    /**
     * Get a model from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getMap(storeID) {
      return _mapList[storeID];
    }

    /**
     * Get a model collection from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getMapCollection(storeID) {
      return _mapCollectionList[storeID];
    }

    module.exports.createMapCollection = createMapCollection;
    module.exports.createMap           = createMap;
    module.exports.getMap              = getMap;
    module.exports.getMapCollection    = getMapCollection;
  });