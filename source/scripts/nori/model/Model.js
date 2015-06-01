/**
 * Object.oberve polyfill:
 * https://github.com/MaxArt2501/object-observe/blob/master/doc/index.md
 * http://www.html5rocks.com/en/tutorials/es7/observe/
 */


define('Nori.Model',
  function (require, module, exports) {

    var _id,
      _store = Object.create(null),
      _noisy = false,
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if(!initObj.id) {
        throw new Error('Model must be init\'d with an id');
      }

      _store = Object.create(null);
      _id = initObj.id;

      if(initObj.store) {
        set(initObj.store);
      }

      _noisy = initObj.noisy || false;

    }

    function getID() {
      return _id;
    }

    /**
     * Merge new data into the model
     * @param dataObj
     */
    function set(key, value) {
      if(typeof key === 'string') {
        _store[key] = value;
      } else {
        _store = _.assign({}, _store, key);
      }
      publishChange();
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
     * On change, emit event
     */
    function publishChange() {
      if(_noisy) {
        _emitter.publish(_appEvents.MODEL_DATA_CHANGED, {id:_id, store:getStore()});
      }
    }

    function save() {
      //
    }

    function destroy() {
      //
    }

    function toJSON() {
      return JSON.stringify(_store);
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

  });