define('nori/store/MixinMapFactory',
  function (require, module, exports) {

    var MixinMapFactory = function () {

      var _mapCollectionList = Object.create(null),
          _mapList           = Object.create(null),
          _mapCollectionFactory = require('nori/store/MapCollection'),
          _mapFactory = require('nori/store/Map'),
          _observableFactory = require('nori/utils/MixinObservableSubject');

      /**
       * Create a new store collection and initalize
       * @param initObj
       * @param extras
       * @returns {*}
       */
      function createMapCollection(initObj, extras) {
        var m = Nori.assignArray({}, [_mapCollectionFactory(), _observableFactory(), extras]);
        m.initialize(initObj);
        return m;
      }

      /**
       * Create a new store and initialize
       * @param initObj
       * @param extras
       * @returns {*}
       */
      function createMap(initObj, extras) {
        var m = Nori.assignArray({}, [_mapFactory(), _observableFactory(), extras]);
        m.initialize(initObj);
        return m;
      }

      /**
       * Get a store from the application collection
       * @param storeID
       * @returns {void|*}
       */
      function getMap(storeID) {
        return _mapList[storeID];
      }

      /**
       * Get a store collection from the application collection
       * @param storeID
       * @returns {void|*}
       */
      function getMapCollection(storeID) {
        return _mapCollectionList[storeID];
      }

      return {
        createMapCollection: createMapCollection,
        createMap          : createMap,
        getMap             : getMap,
        getMapCollection   : getMapCollection
      };

    };


    module.exports = MixinMapFactory();

  });