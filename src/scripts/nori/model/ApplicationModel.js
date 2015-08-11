define('nori/model/ApplicationModel',
  function (require, module, exports) {

    var _this,
      _appMapCollectionList = Object.create(null),
      _appMapList = Object.create(null),
      _appEventConstants = require('nori/events/EventConstants');

    function initializeApplicationModel() {
      _this = this;
    }

    function subscribeToModelEvents() {
      if (!_this) {
        throw new Error('nori/model/ApplicationModel, cannot subscribeToModelEvents() without initializeApplicationModel() first');
      }

      _dispatcher.subscribe(_appEventConstants.MODEL_DATA_CHANGED, function execute(payload) {
        _this.handleModelDataChanged(payload);
      });
      _dispatcher.subscribe(_appEventConstants.UPDATE_MODEL_DATA, function execute(payload) {
        _this.handleUpdateModelData(payload);
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
      var m = Nori.extendWithArray({},[requireNew('nori/model/MapCollection'), extras]);
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
      var m = Nori.extendWithArray({},[requireNew('nori/model/Map'), extras]);
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

    module.exports.initializeApplicationModel = initializeApplicationModel;
    module.exports.subscribeToModelEvents = subscribeToModelEvents;
    module.exports.handleModelDataChanged = handleModelDataChanged;
    module.exports.handleUpdateModelData = handleUpdateModelData;
    module.exports.createMapCollection = createMapCollection;
    module.exports.createMap = createMap;
    module.exports.getMap = getMap;
    module.exports.getMapCollection = getMapCollection;
  });