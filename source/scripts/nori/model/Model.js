/**
 * Object.oberve polyfill:
 * https://github.com/MaxArt2501/object-observe/blob/master/doc/index.md
 * http://www.html5rocks.com/en/tutorials/es7/observe/
 */


define('Nori.Model',
  function (require, module, exports) {

    var _id,
      _store,
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(id, obj) {
      if(!id) {
        throw new Error('Model must be init\'d with an id');
      }

      _id = id;

      if(obj) {
        set(obj);
      }
    }

    /**
     * Set the data for the model
     * @param dataObj
     */
    function set(dataObj) {
      _store = dataObj;
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
     * Update a value in the store
     * @param key
     * @param newValue
     */
    function update(key, newValue) {
      _store[key] = newValue;
      publishChange();
    }

    /**
     * On change, emit event
     */
    function publishChange() {
      _emitter.publish(_appEvents.MODEL_DATA_CHANGED, {id:_id, store:getStore()});
    }

    function save() {
      //
    }

    function destroy() {
      //
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.set = set;
    exports.get = get;
    exports.getStore = getStore;
    exports.update = update;

  });