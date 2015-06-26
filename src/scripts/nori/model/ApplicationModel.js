define('Nori.Model.ApplicationModel',
  function (require, module, exports) {

    var _self,
      _appMapCollectionList = Object.create(null),
      _appMapList = Object.create(null),
      _appEventConstants = require('Nori.Events.AppEventConstants'),
      _dispatcher = require('Nori.Utils.Dispatcher');

    function initializeApplicationModel() {
      _self = this;
    }

    function subscribeToModelEvents() {
      if (!_self) {
        throw new Error('Nori.Model.ApplicationModel, cannot subscribeToModelEvents() without initializeApplicationModel() first');
      }

      _dispatcher.subscribe(_appEventConstants.MODEL_DATA_CHANGED, function execute(payload) {
        _self.handleModelDataChanged(payload);
      });
      _dispatcher.subscribe(_appEventConstants.UPDATE_MODEL_DATA, function execute(payload) {
        _self.handleUpdateModelData(payload);
      });
    }

    /**
     * Respond to the event. To be implemented in sub
     * @param dataObj
     */
    function handleModelDataChanged(dataObj) {
      console.log('AM, handlemodeldatachange', dataObj);
    }

    /**
     * Respond to the event. To be implemented in sub
     * @param dataObj
     */
    function handleUpdateModelData(dataObj) {
      console.log('AM, handleupdatemodeldata', dataObj);
    }

    /**
     * Create a new model collection and initalize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createMapCollection(initObj, extras) {
      var m = Nori.extendWithArray({},[requireNew('Nori.Model.MapCollection'), extras]);
      m.initialize(initObj);
      _appMapCollectionList[initObj.id] = m;
      return m;
    }

    /**
     * Create a new model and initialize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createMap(initObj, extras) {
      var m = Nori.extendWithArray({},[requireNew('Nori.Model.Map'), extras]); //
      m.initialize(initObj);
      _appMapList[initObj.id] = m;
      return m;
    }

    /**
     * Get a model from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getMap(storeID) {
      return _appMapList[storeID];
    }

    /**
     * Get a model collection from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getMapCollection(storeID) {
      return _appMapCollectionList[storeID];
    }

    /**
     * Itterate over the keys in the specified model and build an object of the
     * matching key/value pairs
     * @param sID
     * @param keysArry
     * @returns {Object}
     */
    //function getKeysFromMap(store, keysArry) {
    //  var keysMap = Object.create();
    //
    //  // if the arg is a string, then it must be an ID
    //  if (typeof store === 'string') {
    //    store = getMap(sID);
    //  }
    //
    //  keysArry.forEach(function getKey(key) {
    //    if (store.has(key)) {
    //      keysMap[key] = store.get(key);
    //    } else {
    //      keysMap[key] = 'ERR:' + key;
    //    }
    //  });
    //
    //  return keysMap;
    //}

    exports.initializeApplicationModel = initializeApplicationModel;
    exports.subscribeToModelEvents = subscribeToModelEvents;
    exports.handleModelDataChanged = handleModelDataChanged;
    exports.handleUpdateModelData = handleUpdateModelData;
    exports.createMapCollection = createMapCollection;
    exports.createMap = createMap;
    exports.getMap = getMap;
    exports.getMapCollection = getMapCollection;
    //exports.getKeysFromMap = getKeysFromMap;

  });