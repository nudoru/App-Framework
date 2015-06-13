/**
 * Object.oberve polyfill:
 * https://github.com/MaxArt2501/object-observe/blob/master/doc/index.md
 * http://www.html5rocks.com/en/tutorials/es7/observe/
 *
 * Immutable
 * http://facebook.github.io/immutable-js/
 */


define('Nori.Model.Model',
  function (require, module, exports) {

    var _id,
      _changed = false,
      _entries = [],
      _store = {},
      _lastChangeResult,
      _silent = false,
      _parentCollection,
      _appEvents = require('Nori.Events.AppEventCreator');

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
        // set inital data silently
        //set(initObj.store, {silent: true});
        _changed = true;
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

    function getChanged() {
      return _changed;
    }

    /**
     * Set property or merge in new data
     * @param key String = name of property to set, Object = will merge new props
     * @param options String = value of property to set, Object = options: silent
     */
    function set(key, options) {
      var silentSet = false,
        previousStore = _.merge({}, _store);

      if (typeof key === 'object') {
        if (options !== null && typeof options === 'object') {
          silentSet = options.silent || false;
        }
        _store = _.merge({}, _store, key);
      } else {
        _store[key] = options;
      }

      // Mark changed
      _changed = true;

      //https://github.com/flitbit/diff
      _lastChangeResult = objectDiff.diff(previousStore, _store);

      if (!silentSet) {
        dispatchChange();
      }
    }

    /**
     * Returns a copy of the data
     * @returns *
     */
    function get(key) {
      var value = has(key) ? _store[key] : undefined;

      if(value) {
        value = _.cloneDeep(value);
      }

      return value;
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
      if (!_changed && _entries) {
        return _entries;
      }

      var arry = [];
      for (var key in _store) {
        arry.push({key: key, value: _store[key]});
      }

      _entries = arry;
      _changed = false;

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
     * Returns an array of all keys in the store
     * @returns {Array}
     */
    function keys() {
      //return entries().map(function(entry) {
      //  return entry.key;
      //});
      return Object.keys(_store);
    }

    /**
     * Returns an array of all vaules in the store
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
      delete _store[key];
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
     * Returns a copy of the data store
     * @returns {void|*}
     */
    function toObject() {
      return _.merge({}, _store);
    }

    /**
     * Return a new object by "translating" the properties of the store from one key to another
     * @param tObj {currentProp, newProp}
     */
    function transform(tObj) {
      var transformed = {};

      for (var prop in tObj) {
        if (_store.hasOwnProperty(prop)) {
          transformed[tObj[prop]] = _store[prop];
        }
      }

      return transformed;
    }

    /**
     * Validates the store properties
     * key: {required: true|false, minLength: num, maxLength: num}
     * @param vObj
     */
    function validate(vObj) {
      return true;

      //var validation = {};
      //
      //for(var prop in vObj) {
      //  // TODO test store hasownprop
      //  var tests = vObj[prop],
      //      storeProp = _store[prop];
      //  for(var testProp in tests) {
      //    console.log('test '+prop+', for: '+testProp);
      //  }
      //}
      //
      //return validation;
    }

    /**
     * On change, emit event globally
     */
    function dispatchChange() {
      if (!_silent) {
        _appEvents.modelChanged({
          id: _id,
          storeType: 'model',
          store: toObject(),
          changed: _lastChangeResult
        });
      }

      if (_parentCollection.dispatchChange) {
        _parentCollection.dispatchChange({
          id: _id,
          store: toObject(),
          changed: _lastChangeResult
        });
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
    exports.changed = getChanged;
    exports.set = set;
    exports.get = get;
    exports.has = has;
    exports.remove = remove;
    exports.keys = keys;
    exports.values = values;
    exports.entries = entries;
    exports.filterValues = filterValues;
    exports.size = size;
    exports.getFirst = getFirst;
    exports.getLast = getLast;
    exports.getAtIndex = getAtIndex;
    exports.toObject = toObject;
    exports.transform = transform;
    exports.validate = validate;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });