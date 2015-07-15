define('APP.Model.AppModel',
  function (require, module, exports) {

    var _self,
        _appEvents  = require('Nori.Events.AppEventCreator'),
        _dispatcher = require('Nori.Utils.Dispatcher');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
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

    exports.initialize = initialize;
  });
