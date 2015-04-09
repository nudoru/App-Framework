var APP = APP || {};

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
    _globals = ObjectUtils.extend(BrowserInfo, {});
    _globals.appConfig = APP_CONFIG_DATA;
    _globals.enhanced = !_globals.isIE; //!_globals.mobile.any() &&
    _globals.mouseDownEvtStr = _globals.mobile.any() ? "touchstart" : "mousedown";
    _globals.mouseUpEvtStr = _globals.mobile.any() ? "touchend" : "mouseup";
    _globals.mouseClickEvtStr = _globals.mobile.any() ? "touchend" : "click";
    _globals.mouseMoveEvtStr = _globals.mobile.any() ? "touchmove" : "mousemove";

    // Moved to BrowserInfo
    //_globals.isIE = -1 < navigator.userAgent.indexOf("MSIE ");
    //_globals.appVersion = navigator.appVersion;
    //_globals.userAgent = navigator.userAgent;
    //_globals.isIE6 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 6");
    //_globals.isIE7 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 7");
    //_globals.isIE8 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 8");
    //_globals.isIE9 = _globals.isIE && -1 < _globals.appVersion.indexOf("MSIE 9");
    //_globals.isFF = -1 < navigator.userAgent.indexOf("Firefox/");
    //_globals.isChrome = -1 < navigator.userAgent.indexOf("Chrome/");
    //_globals.isMac = -1 < navigator.userAgent.indexOf("Macintosh;");
    //_globals.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");
    //
    //_globals.notSupported = _globals.isIE6 || _globals.isIE7 || _globals.isIE8;
    //
    //_globals.hasTouch = 'ontouchstart' in document.documentElement;
    //_globals.mobile = {
    //  Android: function() {
    //    return _globals.userAgent.match(/Android/i);
    //  },
    //  BlackBerry: function() {
    //    return _globals.userAgent.match(/BlackBerry/i) || _globals.userAgent.match(/BB10; Touch/);
    //  },
    //  iOS: function() {
    //    return _globals.userAgent.match(/iPhone|iPad|iPod/i);
    //  },
    //  Opera: function() {
    //    return _globals.userAgent.match(/Opera Mini/i);
    //  },
    //  Windows: function() {
    //    return _globals.userAgent.match(/IEMobile/i);
    //  },
    //  any: function() {
    //    return (
    //      _globals.mobile.Android()
    //      || _globals.mobile.BlackBerry()
    //      || _globals.mobile.iOS()
    //      || _globals.mobile.Opera()
    //      || _globals.mobile.Windows()
    //    ) !== null;
    //  }
    //};

  }

  /**
   * Return a copy of the globals
   * @returns {void|*}
   */
  function globals() {
    return ObjectUtils.extend({}, _globals);
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