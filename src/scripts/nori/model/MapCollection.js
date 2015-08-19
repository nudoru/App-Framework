/**
 * Map Collection - an array of maps
 */

define('nori/model/MapCollection',
  function (require, module, exports) {

    var MapCollection = (function () {
      var _this,
          _id,
          _parentCollection,
          _caret    = 0,
          _children = [];

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      function initialize(initObj) {
        if (!initObj.id) {
          throw new Error('ModelCollection must be init\'d with an id');
        }

        _this = this;
        _id   = initObj.id;

        // TODO test
        if (initObj.models) {
          addMapsFromArray.call(_this, initObj.models);
        }
      }

      //----------------------------------------------------------------------------
      //  Iterator
      //----------------------------------------------------------------------------

      function next() {
        var ret = {};
        if (hasNext()) {
          ret = {value: _children[_caret++], done: !hasNext()};
        } else {
          ret = current();
        }

        return ret;
      }

      function current() {
        return {value: _children[_caret], done: !hasNext()};
      }

      function rewind() {
        _caret = 0;
        return _children[_caret];
      }

      function hasNext() {
        return _caret < _children.length;
      }

      //----------------------------------------------------------------------------
      //  Impl
      //----------------------------------------------------------------------------

      function isDirty() {
        var dirty = false;
        forEach(function checkDirty(map) {
          if (map.isDirty()) {
            dirty = true;
          }
        });
        return dirty;
      }

      function markClean() {
        forEach(function checkDirty(map) {
          map.markClean();
        });
      }

      /**
       * Add an array of Model instances
       * @param sArry
       */
      function addMapsFromArray(sArry) {
        sArry.forEach(function (store) {
          add(store);
        });
      }

      /**
       * Create an add child Model stores from an array of objects
       * @param array Array of objects
       * @param idKey Key on each object to use for the ID of that Model store
       */
      function addFromObjArray(oArry, idKey) {
        oArry.forEach(function (obj) {

          var id;

          if (obj.hasOwnProperty(idKey)) {
            id = obj[idKey];
          } else {
            id = _id + 'child' + _children.length;
          }

          add(Nori.model().createMap({id: id, store: obj}));
        });
        dispatchChange(_id, 'add_map');
      }

      function addFromJSONArray(json, idKey) {
        json.forEach(function (jstr) {

          var id, obj;

          try {
            obj = JSON.parse(jstr);
          } catch (e) {
            throw new Error('MapCollection, error parsing JSON:', jstr, e);
          }

          if (obj.hasOwnProperty(idKey)) {
            id = obj[idKey];
          } else {
            id = _id + 'child' + _children.length;
          }

          add(Nori.model().createMap({id: id, store: obj}));
        });
        dispatchChange(_id, 'add_map');
      }

      function getID() {
        return _id;
      }

      function add(store) {
        var currIdx = getMapIndex(store.getID());

        store.setParentCollection(_this);

        if (currIdx >= 0) {
          _children[currIdx] = store;
        } else {
          _children.push(store);
        }

        dispatchChange(_id, 'add_map');
      }

      /**
       * Remove a store from the collection
       * @param storeID
       */
      function remove(storeID) {
        var currIdx = getMapIndex(storeID);
        if (currIdx >= 0) {
          _children[currIdx].setParentCollection(null);
          _children[currIdx] = null;
          _children.splice(currIdx, 1);
          dispatchChange(_id, 'remove_map');
        } else {
          console.log(_id + ' remove, model not in collection: ' + storeID);
        }
      }

      /**
       * Remove all stores from the array
       */
      function removeAll() {
        _children.forEach(function (map) {
          map.setParentCollection(null);
        });

        _children = [];
        dispatchChange(_id, 'remove_map');
      }

      /**
       * Gets the Model by ID
       * @param storeID
       * @returns {T}
       */
      function getMap(storeID) {
        return _children.filter(function (store) {
          return store.getID() === storeID;
        })[0];
      }

      /**
       * Get the index in _children array by Model's ID
       * @param storeID
       * @returns {number}
       */
      function getMapIndex(storeID) {
        return _children.map(function (store) {
          return store.getID();
        }).indexOf(storeID);
      }

      /**
       * On change, emit event globally
       */
      function dispatchChange(data, type) {
        var payload = {
          id     : _id,
          type   : type || '',
          mapType: 'collection',
          mapID  : data.id
        };

        _this.notifySubscribers(payload);

        if (_parentCollection) {
          _parentCollection.dispatchChange({id: _id, store: getMap()});
        }
      }

      function hasMap(storeID) {
        return _children[storeID];
      }

      /**
       * Number of entries
       * @returns {Number}
       */
      function size() {
        return _children.length;
      }

      function first() {
        return _children[0];
      }

      function last() {
        return _children[_children.length - 1];
      }

      function atIndex(i) {
        return _children[i];
      }

      /**
       * Runs a predidate on each child map
       * @param predicate
       * @returns {Array.<T>}
       */
      function filter(predicate) {
        return _children.filter(predicate);
      }

      /**
       * Returns maps where the filter matches the prop / value pair
       * @param key
       * @param value
       * @returns {Array.<T>}
       */
      function filterByKey(key, value) {
        return _children.filter(function (map) {
          return map.get(key) === value;
        });
      }

      function forEach(func) {
        return _children.forEach(func);
      }

      function map(func) {
        return _children.map(func);
      }

      /**
       * Return an array of entries of each map
       * @returns {Array}
       */
      function entries() {
        var arry = [];
        _children.forEach(function (map) {
          arry.push(map.entries());
        });
        return arry;
      }

      function toJSON() {
        return JSON.stringify(_children);
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
        current            : current,
        next               : next,
        hasNext            : hasNext,
        rewind             : rewind,
        getID              : getID,
        isDirty            : isDirty,
        markClean          : markClean,
        add                : add,
        addMapsFromArray   : addMapsFromArray,
        addFromObjArray    : addFromObjArray,
        addFromJSONArray   : addFromJSONArray,
        remove             : remove,
        removeAll          : removeAll,
        getMap             : getMap,
        hasMap             : hasMap,
        size               : size,
        first              : first,
        last               : last,
        atIndex            : atIndex,
        filter             : filter,
        filterByKey        : filterByKey,
        forEach            : forEach,
        map                : map,
        entries            : entries,
        toJSON             : toJSON,
        dispatchChange     : dispatchChange,
        setParentCollection: setParentCollection,
        getParentCollection: getParentCollection
      };
    }());

    module.exports = MapCollection;

  });