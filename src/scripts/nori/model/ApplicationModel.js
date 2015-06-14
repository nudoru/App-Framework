define('Nori.Model.ApplicationModel',
  function (require, module, exports) {

    var _self,
      _appModelCollectionMap = Object.create(null),
      _appModelMap = Object.create(null),
      _appEventConstants = require('Nori.Events.AppEventConstants'),
      _dispatcher = require('Nori.Utils.Dispatcher');

    function initializeApplicationModel() {
      _self = this;
    }

    function subscribeToModelEvents() {
      if(!_self) {
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
      console.log('AM, handlemodeldatachange',dataObj);
    }

    /**
     * Respond to the event. To be implemented in sub
     * @param dataObj
     */
    function handleUpdateModelData(dataObj) {
      console.log('AM, handleupdatemodeldata',dataObj);
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

    /**
     * Itterate over the keys in the specified model and build an object of the
     * matching key/value pairs
     * @param sID
     * @param keysArry
     * @returns {Object}
     */
    function getKeysFromModel(store, keysArry) {
      var keysMap = Object.create();

      // if the arg is a string, then it must be an ID
      if(typeof store === 'string') {
        store = getModel(sID)
      }

      keysArry.forEach(function getKey(key) {
        if(store.has(key)) {
          keysMap[key] = store.get(key);
        } else {
          keysMap[key] = 'ERR:'+key;
        }
      });

      return keysMap;
    }

    exports.initializeApplicationModel = initializeApplicationModel;
    exports.subscribeToModelEvents = subscribeToModelEvents;
    exports.handleModelDataChanged = handleModelDataChanged;
    exports.handleUpdateModelData = handleUpdateModelData;
    exports.createModelCollection = createModelCollection;
    exports.createModel = createModel;
    exports.getModel = getModel;
    exports.getModelCollection = getModelCollection;
    exports.getKeysFromModel = getKeysFromModel;

  });