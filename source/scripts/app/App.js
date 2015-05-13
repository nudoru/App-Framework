var APP = {};

APP = (function () {
  var _self,
    _globals,
    _objectUtils = require('nudoru.utils.ObjectUtils');

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  function initialize() {
    console.log('APP: Initialize');

    _self = this;
    initGlobals();
    this.AppController.initialize();
  }

  /**
   * Initialize the global vars
   */
  function initGlobals() {
    _globals = {};
    _globals.appConfig = APP_CONFIG_DATA;
  }

  /**
   * Return a copy of the globals
   * @returns {void|*}
   */
  function globals() {
    return _objectUtils.extend({}, _globals);
  }


  function createNameSpace(str) {
    return NNameSpace.createNameSpace(str, APP, "APP");
  }

  return {
    initialize: initialize,
    createNameSpace: createNameSpace,
    globals: globals
  };

}());