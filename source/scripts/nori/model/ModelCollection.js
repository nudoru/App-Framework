/**
 * Object.oberve polyfill:
 * https://github.com/MaxArt2501/object-observe/blob/master/doc/index.md
 * http://www.html5rocks.com/en/tutorials/es7/observe/
 */


define('Nori.ModelCollection',
  function (require, module, exports) {

    var _id,
      _children = [],
      _silent = false,
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if(!initObj.id) {
        throw new Error('ModelCollection must be init\'d with an id');
      }

      _id = initObj.id;
      _silent = initObj.silent || false;

      // BUG - call with this scope, calling from Nori.init scope is Window
      //if(initObj.models) {
      //  addStoresFromArray.call(this, initObj.models);
      //}
    }

    /**
     * Add an array of Model instances
     * @param sArry
     */
    function addStoresFromArray(sArry) {
      sArry.forEach(function(store) {
        add(store);
      });
    }

    /**
     * Create an add child Model stores from an array of objects
     * @param array Array of objects
     * @param idKey Key on each object to use for the ID of that Model store
     */
    function addFromObjArray(oArry, idKey, silent) {
      oArry.forEach(function(obj) {

        var id;

        if(obj.hasOwnProperty(idKey)) {
          id = obj[idKey];
        } else {
          id = _id +'child' + _children.length;
        }

        add(Nori.createModel({id:id, silent: silent, store: obj}));
      });

    }

    function getID() {
      return _id;
    }

    function add(store) {
      var currIdx = getStoreIndex(store.getID());

      store.setParentCollection(this);

      if(currIdx >= 0) {
        _children[currIdx] = store;
      } else {
        _children.push(store);
      }
    }

    function remove(storeID) {
      var currIdx = getStoreIndex(store.getID());
      if(currIdx >= 0) {
        _children[currIdx].setParentCollection(null);
        _children[currIdx] = null;
        _children.splice(currIdx,1);
      } else {
        console.log(_id +' remove, model not in collection: '+storeID);
      }
    }

    /**
     * Gets the Model by ID
     * @param storeID
     * @returns {T}
     */
    function getStore(storeID) {
      return _children.filter(function(store) {
        return store.getID() === storeID;
      })[0];
    }

    /**
     * Get the index in _children array by Model's ID
     * @param storeID
     * @returns {number}
     */
    function getStoreIndex(storeID) {
      return _children.map(function(store) {
        return store.getID();
      }).indexOf(storeID);
    }

    /**
     * On change, emit event globally
     */
    function publishChange(data) {
      if(!_silent) {
        _emitter.publish(_appEvents.MODEL_DATA_CHANGED, {id:_id, storeType:'collection', storeID: data.id, store:data.store});
      }

      // what will this send up?
      //if(_parentCollection) {
      //  _parentCollection.publishChange({id:_id, store:getStore()});
      //}

    }

    function hasModel(storeID) {
      if(_children[storeID]) {
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
      return _children[_children.length-1];
    }

    function getAtIndex(i) {
      return _children[i];
    }

    /**
     * Runs a predidate on each child store
     * @param predicate
     * @returns {Array.<T>}
     */
    function filterValues(predicate) {
      return _children.filter(predicate);
    }

    /**
     * Return an array of entries of each store
     * @returns {Array}
     */
    function entries() {
      var arry = [];
      _children.forEach(function(store){
        arry.push(store.entries());
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
    exports.addStoresFromArray = addStoresFromArray;
    exports.addFromObjArray = addFromObjArray;
    exports.remove = remove;
    exports.getStore = getStore;
    exports.hasModel = hasModel;
    exports.size = size;
    exports.getFirst = getFirst;
    exports.getLast = getLast;
    exports.getAtIndex = getAtIndex;
    exports.filterValues = filterValues;
    exports.entries = entries;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.publishChange = publishChange;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });