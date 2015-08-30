/**
 * Map data type
 */


define('nori/store/Map',
  function (require, module, exports) {

    var Map = function () {
      var _this,
          _id,
          _parentCollection,
          _dirty   = false,
          _entries = [],
          _map     = Object.create(null);

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      function initialize(initObj) {
        if (!initObj.id) {
          throw new Error('Store must be init\'d with an id');
        }

        _this = this;
        _id   = initObj.id;

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

      /**
       * Erase it
       */
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
       * @param value String = value of property to set
       */
      function set(key, value) {

        if (typeof key === 'object') {
          _map = _.merge({}, _map, key);
        } else {
          _map[key] = value;
        }

        // Mark changed
        _dirty = true;

        dispatchChange('set_key');
      }

      /**
       * Assuming that _map[key] is an object, this will set a property on it
       * @param key
       * @param prop
       * @param data
       */
      function setKeyProp(key, prop, data) {
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

      function first() {
        return entries()[0];
      }

      function last() {
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
        var payload = {
          id     : _id,
          mapType: 'store'
        };

        _this.notifySubscribers(payload);

        if (_parentCollection.dispatchChange) {
          _parentCollection.dispatchChange({
            id: _id
          }, (type || 'map'));
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

      return {
        initialize         : initialize,
        getID              : getID,
        clear              : clear,
        isDirty            : isDirty,
        markClean          : markClean,
        setJSON            : setJSON,
        set                : set,
        setKeyProp         : setKeyProp,
        get                : get,
        getKeyProp         : getKeyProp,
        has                : has,
        remove             : remove,
        keys               : keys,
        values             : values,
        entries            : entries,
        filterValues       : filterValues,
        size               : size,
        first              : first,
        last               : last,
        getAtIndex         : getAtIndex,
        toObject           : toObject,
        transform          : transform,
        toJSON             : toJSON,
        setParentCollection: setParentCollection,
        getParentCollection: getParentCollection
      };

    };

    module.exports = Map;

  });