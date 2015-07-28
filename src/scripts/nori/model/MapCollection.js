/**
 * Map Collection - an array of maps
 */


define('Nori.Model.MapCollection',
  function (require, module, exports) {

    var _self,
        _id,
        _children  = [],
        _silent    = false,
        _appEvents = require('Nori.Events.AppEventCreator');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if (!initObj.id) {
        throw new Error('ModelCollection must be init\'d with an id');
      }

      _self   = this;
      _id     = initObj.id;
      _silent = initObj.silent || false;

      // TODO test
      if(initObj.models) {
        addMapsFromArray.call(_self, initObj.models);
      }
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
      dispatchChange(_id, 'add_map');
    }

    function getID() {
      return _id;
    }

    function add(store) {
      var currIdx = getMapIndex(store.getID());

      store.setParentCollection(_self);

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
      _children.forEach(function(map) {
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
      if (!_silent) {
        type = type || '';
        _appEvents.modelChanged({
          id     : _id,
          type   : type,
          mapType: 'collection',
          mapID  : data.id
        });
      }

      // TODO Collections of Collections
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

    exports.initialize          = initialize;
    exports.getID               = getID;
    exports.add                 = add;
    exports.addMapsFromArray    = addMapsFromArray;
    exports.addFromObjArray     = addFromObjArray;
    exports.remove              = remove;
    exports.removeAll           = removeAll;
    exports.getMap              = getMap;
    exports.hasMap              = hasMap;
    exports.size                = size;
    exports.getFirst            = getFirst;
    exports.getLast             = getLast;
    exports.getAtIndex          = getAtIndex;
    exports.filter              = filter;
    exports.filterByKey         = filterByKey;
    exports.forEach             = forEach;
    exports.map                 = map;
    exports.entries             = entries;
    exports.save                = save;
    exports.destroy             = destroy;
    exports.toJSON              = toJSON;
    exports.dispatchChange      = dispatchChange;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });