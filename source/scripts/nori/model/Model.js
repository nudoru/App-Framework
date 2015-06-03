/**
 * Object.oberve polyfill:
 * https://github.com/MaxArt2501/object-observe/blob/master/doc/index.md
 * http://www.html5rocks.com/en/tutorials/es7/observe/
 *
 * Immutable
 * http://facebook.github.io/immutable-js/
 */


define('Nori.Model',
  function (require, module, exports) {

    var _id,
      _store = Object.create(null),
      _silent = false,
      _parentCollection,
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if(!initObj.id) {
        throw new Error('Model must be init\'d with an id');
      }

      _id = initObj.id;

      _silent = initObj.silent || false;

      if(initObj.store) {
        // set inital data silently
        set(initObj.store, {silent: true});
      }

    }

    function getID() {
      return _id;
    }

    /**
     * Set property or merge in new data
     * @param key String = name of property to set, Object = will merge new props
     * @param options String = value of property to set, Object = options: silent
     */
    function set(key, options) {
      var silentSet = false;

      if(typeof key === 'object') {
        if(options !== null && typeof options === 'object') {
          silentSet = options.silent || false;
        }
        _store = _.assign({}, _store, key);
      } else {
        _store[key] = options;
      }

      if(!silentSet) {
        publishChange();
      }
    }

    /**
     * Returns a copy of the data
     * @returns *
     */
    function get(key) {
      return _store[key];
    }

    /**
     * Returns a copy of the data store
     * @returns {void|*}
     */
    function getStore() {
      return _.assign({},_store);
    }

    /**
     * On change, emit event globally
     */
    function publishChange() {
      if(!_silent) {
        _emitter.publish(_appEvents.MODEL_DATA_CHANGED, {id:_id, storeType:'model',  store:getStore()});
      }

      if(_parentCollection) {
        _parentCollection.publishChange({id:_id, store:getStore()});
      }

    }

    function save() {
      //
    }

    function destroy() {
      _store = null;
      _parentCollection = null;
    }

    function toJSON() {
      return JSON.stringify(_store);
    }

    function setParentCollection(collection) {
      _parentCollection = collection;
    }

    function getParentCollection() {
      return _parentCollection;
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.getID = getID;
    exports.set = set;
    exports.get = get;
    exports.store = getStore;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });