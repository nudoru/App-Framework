/**
 * Object.oberve polyfill:
 * https://github.com/MaxArt2501/object-observe/blob/master/doc/index.md
 * http://www.html5rocks.com/en/tutorials/es7/observe/
 */


define('Nori.Model',
  function (require, module, exports) {

    var _store,
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(obj) {
      if(obj) {
        set(obj);
      }
    }

    //----------------------------------------------------------------------------
    //  Data
    //----------------------------------------------------------------------------

    /**
     * Set the data for the model
     * @param dataObj
     */
    function set(dataObj) {
      _store = dataObj;
    }

    /**
     * Returns a copy of the data
     * @returns *
     */
    function get(key) {
      return _store[key];
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.set = set;
    exports.get = get;

  });