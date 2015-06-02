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

      // BUG - scope not correct to set parentcollection to this, is Window
      //if(initObj.models) {
      //  addStoresFromArray(initObj.models);
      //}
    }

    function addStoresFromArray(sArry) {
      sArry.forEach(function(store) {
        add(store);
      })
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

    function getStore(storeID) {
      return _children.filter(function(store) {
        return store.getID() === storeID;
      })[0];
    }

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

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.getID = getID;
    exports.add = add;
    exports.remove = remove;
    exports.getStore = getStore;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.publishChange = publishChange;

  });