var APP = {};

APP = (function(global, rootView) {
  var _globalScope = global,
      _rootView = rootView,
      _self,
      _globals;

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  function initialize() {
    _self = this;

    initGlobals();

    this.AppController.initialize(this, _globalScope, _rootView);
  }

  /**
   * Initialize the global vars
   */
  function initGlobals() {
    _globals = nudoru.utils.ObjectUtils.extend(BrowserInfo, {});

    _globals.appConfig = APP_CONFIG_DATA;

    _globals.enhanced = !BrowserInfo.isIE && !BrowserInfo.mobile.any();
  }

  /**
   * Return a copy of the globals
   * @returns {void|*}
   */
  function globals() {
    return nudoru.utils.ObjectUtils.extend({}, _globals);
  }

  //----------------------------------------------------------------------------
  //  Run
  //----------------------------------------------------------------------------

  function run() {
    _self.AppController.run();
  }

  function createNameSpace(str) {
    return NNameSpace.createNameSpace(str, APP, "APP");
  }

  return {
    initialize: initialize,
    run: run,
    createNameSpace: createNameSpace,
    globals: globals
  };

}(this, document));