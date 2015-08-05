/**
 * Map data type
 */


define('Nori.Model.Map',
  function (require, module, exports) {

    var _id,
        _dirty     = false,
        _entries   = [],
        _map       = Object.create(null),
        _silent    = false,
        _parentCollection,
        _appEvents = require('Nori.Events.NoriEventCreator');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if (!initObj.id) {
        throw new Error('Model must be init\'d with an id');
      }

      _id = initObj.id;

      _silent = initObj.silent || false;

      if (initObj.store) {
        _dirty = true;
        _map   = initObj.store;
      } else if (initObj.json) {
        setJSON(initObj.json);
      }

    }

    /**
     * Set map store from a JSON object
     * @param jstr
     */
    function setJSON(jstr) {
      _dirty = true;
      try {
        _map = JSON.parse(jstr);
      } catch (e) {
        throw new Error('MapCollection, error parsing JSON:', jstr, e);
      }
    }

    function getID() {
      return _id;
    }

    function clear() {
      _map   = {};
      _dirty = true;
    }

    function isDirty() {
      return _dirty;
    }

    function markClean() {
      _dirty = false;
    }

    /**
     * Set property or merge in new data
     * @param key String = name of property to set, Object = will merge new props
     * @param options String = value of property to set, Object = options: silent
     */
    function set(key, options) {
      var silentSet = false;

      if (typeof key === 'object') {
        if (options !== null && typeof options === 'object') {
          silentSet = options.silent || false;
        }
        _map = _.merge({}, _map, key);
      } else {
        _map[key] = options;
      }

      // Mark changed
      _dirty = true;

      if (!silentSet) {
        dispatchChange('set_key');
      }
    }

    /**
     * Assuming that _map[key] is an object, this will set a property on it
     * @param key
     * @param prop
     * @param data
     */
    function setKeyProp(key, prop, data, silent) {
      _map[key][prop] = data;

      _dirty = true;
      dispatchChange('set_key');
    }

    /**
     * Returns a copy of the data
     * @returns *
     */
    function get(key) {
      var value = has(key) ? _map[key] : undefined;

      if (value) {
        value = _.cloneDeep(value);
      }

      return value;
    }

    /**
     * Assuming that _map[key] is an object, this will get value
     * @param key
     * @param prop
     * @returns {*}
     */
    function getKeyProp(key, prop) {
      var valueObj = has(key) ? _map[key] : undefined,
          value    = null;

      if (valueObj) {
        value = _.cloneDeep(valueObj[prop]);
      }

      return value;
    }

    /**
     * Returns true of the key is present in the map
     * @param key
     * @returns {boolean}
     */
    function has(key) {
      return _map.hasOwnProperty(key);
    }

    /**
     * Returns an array of the key/values. Results are cached and only regenerated
     * if changed (set)
     * @returns {Array}
     */
    function entries() {
      if (!_dirty && _entries) {
        return _entries;
      }

      var arry = [];
      for (var key in _map) {
        arry.push({key: key, value: _map[key]});
      }

      _entries = arry;
      _dirty   = false;

      return arry;
    }

    /**
     * Number of entries
     * @returns {Number}
     */
    function size() {
      return keys().length;
    }

    /**
     * Returns an array of all keys in the map
     * @returns {Array}
     */
    function keys() {
      return Object.keys(_map);
    }

    /**
     * Returns an array of all vaules in the map
     * @returns {Array}
     */
    function values() {
      return entries().map(function (entry) {
        return entry.value;
      });
    }

    /**
     * Remove a value
     * @param key
     */
    function remove(key) {
      delete _map[key];
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
      return e[e.length - 1];
    }

    function getAtIndex(i) {
      return entries()[i];
    }

    /**
     * Returns a copy of the data map
     * @returns {void|*}
     */
    function toObject() {
      return _.merge({}, _map);
    }

    /**
     * Return a new object by "translating" the properties of the map from one key to another
     * @param tObj {currentProp, newProp}
     */
    function transform(tObj) {
      var transformed = Object.create(null);

      for (var prop in tObj) {
        if (_map.hasOwnProperty(prop)) {
          transformed[tObj[prop]] = _map[prop];
        }
      }

      return transformed;
    }

    /**
     * On change, emit event globally
     */
    function dispatchChange(type) {
      type = type || 'map';

      if (!_silent) {
        _appEvents.modelChanged({
          id     : _id,
          mapType: 'model'
        });
      }

      if (_parentCollection.dispatchChange) {
        _parentCollection.dispatchChange({
          id: _id
        }, type);
      }

    }

    function toJSON() {
      return JSON.stringify(_map);
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

    exports.initialize          = initialize;
    exports.getID               = getID;
    exports.clear               = clear;
    exports.isDirty             = isDirty;
    exports.markClean           = markClean;
    exports.setJSON             = setJSON;
    exports.set                 = set;
    exports.setKeyProp          = setKeyProp;
    exports.get                 = get;
    exports.getKeyProp          = getKeyProp;
    exports.has                 = has;
    exports.remove              = remove;
    exports.keys                = keys;
    exports.values              = values;
    exports.entries             = entries;
    exports.filterValues        = filterValues;
    exports.size                = size;
    exports.getFirst            = getFirst;
    exports.getLast             = getLast;
    exports.getAtIndex          = getAtIndex;
    exports.toObject            = toObject;
    exports.transform           = transform;
    exports.toJSON              = toJSON;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });