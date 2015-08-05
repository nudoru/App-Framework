define('Nudoru.Browser.BrowserInfo',
  function (require, module, exports) {

    module.exports.appVersion  = navigator.appVersion;
    module.exports.userAgent   = navigator.userAgent;
    module.exports.isIE        = -1 < navigator.userAgent.indexOf("MSIE ");
    module.exports.isIE6       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 6");
    module.exports.isIE7       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 7");
    module.exports.isIE8       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 8");
    module.exports.isIE9       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 9");
    module.exports.isFF        = -1 < navigator.userAgent.indexOf("Firefox/");
    module.exports.isChrome    = -1 < navigator.userAgent.indexOf("Chrome/");
    module.exports.isMac       = -1 < navigator.userAgent.indexOf("Macintosh;");
    module.exports.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");

    module.exports.hasTouch     = 'ontouchstart' in document.documentElement;
    module.exports.notSupported = this.isIE6 || this.isIE7 || this.isIE8 || this.isIE9;

    module.exports.mobile = {
      Android   : function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
      },
      iOS       : function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera     : function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows   : function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any       : function () {
        return (
            this.Android()
            || this.BlackBerry()
            || this.iOS()
            || this.Opera()
            || this.Windows()
          ) !== null
      }

    };

    // TODO filter for IE > 9
    module.exports.enhanced = function () {
      return !_browserInfo.isIE && !_browserInfo.mobile.any();
    };

    module.exports.mouseDownEvtStr = function () {
      return this.mobile.any() ? "touchstart" : "mousedown";
    };

    module.exports.mouseUpEvtStr = function () {
      return this.mobile.any() ? "touchend" : "mouseup";
    };

    module.exports.mouseClickEvtStr = function () {
      return this.mobile.any() ? "touchend" : "click";
    };

    module.exports.mouseMoveEvtStr = function () {
      return this.mobile.any() ? "touchmove" : "mousemove";
    };

  });