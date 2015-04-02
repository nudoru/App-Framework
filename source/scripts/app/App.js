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
    _globals = {};

    _globals.isIE = -1 < navigator.userAgent.indexOf("MSIE ");
    _globals.isIE8 = _globals.isIE && -1 < navigator.appVersion.indexOf("MSIE 8");
    _globals.isIE9 = _globals.isIE && -1 < navigator.appVersion.indexOf("MSIE 9");
    _globals.isFF = -1 < navigator.userAgent.indexOf("Firefox/");
    _globals.isChrome = -1 < navigator.userAgent.indexOf("Chrome/");
    _globals.isMac = -1 < navigator.userAgent.indexOf("Macintosh;");
    _globals.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");

    //http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
    _globals.hasTouch = 'ontouchstart' in document.documentElement;
    _globals.mobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (
        _globals.mobile.Android()
          || _globals.mobile.BlackBerry()
          || _globals.mobile.iOS()
          || _globals.mobile.Opera()
          || _globals.mobile.Windows()
          || _globals.hasTouch
        );
      }
    };

    _globals.mouseDownEvtStr = _globals.mobile.any() ? "touchstart" : "mousedown";
    _globals.mouseUpEvtStr = _globals.mobile.any() ? "touchend" : "mouseup";
    _globals.mouseClickEvtStr = _globals.mobile.any() ? "touchend" : "click";
    _globals.mouseMoveEvtStr = _globals.mobile.any() ? "touchmove" : "mousemove";

  }

  /**
   * Return a copy of the globals
   * @returns {void|*}
   */
  function globals() {
    return $.extend({}, _globals);
  }

  //----------------------------------------------------------------------------
  //  Run
  //----------------------------------------------------------------------------

  function run() {
    _self.AppController.run();
  }



  //http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
  function createNameSpace(ns_string) {
    var parts = ns_string.split('.'),
      parent = APP,
      parentStr = "APP",
      len;

    if(parts[0] === parentStr) {
      parts = parts.slice(1);
    }

    len = parts.length;

    for(var i=0 ;i<len; i++) {
      var moduleName = parts[i];
      if(typeof parent[moduleName] === 'undefined') {
        parent[moduleName] = {};
      }
      parent = parent[moduleName];
    }

    return parent;
  }

  return {
    initialize: initialize,
    run: run,
    createNameSpace: createNameSpace,
    globals: globals
  };

}(this, document));