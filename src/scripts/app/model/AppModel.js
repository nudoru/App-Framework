define('APP.Model.AppModel',
  function (require, module, exports) {

    var _this,
        _appEvents  = require('Nori.Events.NoriEventCreator'),
        _dispatcher = require('Nori.Utils.Dispatcher');

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;
      _appEvents.applicationModelInitialized();
    }

    //----------------------------------------------------------------------------
    //  Utility
    //----------------------------------------------------------------------------

    /**
     * Utility function
     * @param obj
     * @returns {*}
     */
    function getLocalStorageObject(obj) {
      return localStorage[obj];
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;
  });
