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
      _changed = false,
      _entries = [],
      _store = {},
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
        //set(initObj.store, {silent: true});
        _store = initObj.store;
      }

    }

    function getID() {
      return _id;
    }

    function clear() {
      _store = {};
      _changed = true;
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
        _store = _.merge({}, _store, key);
      } else {
        _store[key] = options;
      }

      // Mark changed
      _changed = true;

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
     * Returns true of the key is present in the store
     * @param key
     * @returns {boolean}
     */
    function has(key) {
      return _store.hasOwnProperty(key);
    }

    /**
     * Returns an array of the key/values. Results are cached and only regenerated
     * if changed (set)
     * @returns {Array}
     */
    function entries() {

      if(!_changed && _entries) {
        return _entries;
      }

      var arry = [];
      for(var key in _store) {
        arry.push({key:key, value:_store[key]});
      }

      _entries = arry;
      _changed = false;

      return arry;
    }

    /**
     * Number of entries
     * @returns {Number}
     */
    function length() {
      return entries().length;
    }

    /**
     * Returns an array of all keys in the store
     * @returns {Array}
     */
    function keys() {
      return entries().map(function(entry) {
        return entry.key;
      });
    }

    /**
     * Returns an array of all vaules in the store
     * @returns {Array}
     */
    function values() {
      return entries().map(function(entry) {
        return entry.value;
      });
    }

    /**
     * Returns matches to the predicate function
     * @param predicate
     * @returns {Array.<T>}
     */
    function filterValues(predicate) {
      return values().filter(predicate);
    }

    function getFirst() {
      return entries()[0];
    }

    function getLast() {
      var e = entries();
      return e[e.length-1];
    }

    function getAtIndex(i) {
      return entries()[i];
    }

    /**
     * Returns a copy of the data store
     * @returns {void|*}
     */
    function getStore() {
      return _.merge({},_store);
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
    exports.clear = clear;
    exports.set = set;
    exports.get = get;
    exports.has = has;
    exports.keys = keys;
    exports.values = values;
    exports.entries = entries;
    exports.filterValues = filterValues;
    exports.length = length;
    exports.getFirst = getFirst;
    exports.getLast = getLast;
    exports.getAtIndex = getAtIndex;
    exports.getStore = getStore;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });