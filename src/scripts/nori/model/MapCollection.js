/**
 * Map Collection - an array of maps
 */


define('Nori.Model.MapCollection',
  function (require, module, exports) {

    var _id,
      _children = [],
      _silent = false,
      _appEvents = require('Nori.Events.AppEventCreator');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if (!initObj.id) {
        throw new Error('ModelCollection must be init\'d with an id');
      }

      _id = initObj.id;
      _silent = initObj.silent || false;

      // BUG - call with this scope, calling from Nori.init scope is Window
      //if(initObj.models) {
      //  addMapsFromArray.call(this, initObj.models);
      //}
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
    function addFromObjArray(oArry, idKey, silent) {
      oArry.forEach(function (obj) {

        var id;

        if (obj.hasOwnProperty(idKey)) {
          id = obj[idKey];
        } else {
          id = _id + 'child' + _children.length;
        }

        add(Nori.model().createMap({id: id, silent: silent, store: obj}));
      });

    }

    function getID() {
      return _id;
    }

    function add(store) {
      var currIdx = getMapIndex(store.getID());

      store.setParentCollection(this);

      if (currIdx >= 0) {
        _children[currIdx] = store;
      } else {
        _children.push(store);
      }
    }

    function remove(storeID) {
      var currIdx = getMapIndex(storeID);
      if (currIdx >= 0) {
        _children[currIdx].setParentCollection(null);
        _children[currIdx] = null;
        _children.splice(currIdx, 1);
        dispatchChange(_id);
      } else {
        console.log(_id + ' remove, model not in collection: ' + storeID);
      }
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
    function dispatchChange(data) {
      if (!_silent) {
        _appEvents.modelChanged({
          id: _id,
          mapType: 'collection',
          mapID: data.id
        });
      }

      // what will this send up?
      //if(_parentCollection) {
      //  _parentCollection.dispatchChange({id:_id, store:getMap()});
      //}

    }

    function hasMap(storeID) {
      if (_children[storeID]) {
        return true;
      }
      return false;
    }

    /**
     * Number of entries
     * @returns {Number}
     */
    function size() {
      return _children.length;
    }

    function getFirst() {
      return _children[0];
    }

    function getLast() {
      return _children[_children.length - 1];
    }

    function getAtIndex(i) {
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

    function save() {
      //
    }

    function destroy() {
      //
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

    exports.initialize = initialize;
    exports.getID = getID;
    exports.add = add;
    exports.addMapsFromArray = addMapsFromArray;
    exports.addFromObjArray = addFromObjArray;
    exports.remove = remove;
    exports.getMap = getMap;
    exports.hasMap = hasMap;
    exports.size = size;
    exports.getFirst = getFirst;
    exports.getLast = getLast;
    exports.getAtIndex = getAtIndex;
    exports.filter = filter;
    exports.filterByKey = filterByKey;
    exports.forEach = forEach;
    exports.map = map;
    exports.entries = entries;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.dispatchChange = dispatchChange;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });