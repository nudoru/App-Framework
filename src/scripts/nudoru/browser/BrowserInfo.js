define('Nudoru.Browser.BrowserInfo',
  function (require, module, exports) {

    exports.appVersion = navigator.appVersion;
    exports.userAgent = navigator.userAgent;
    exports.isIE = -1 < navigator.userAgent.indexOf("MSIE ");
    exports.isIE6 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 6");
    exports.isIE7 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 7");
    exports.isIE8 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 8");
    exports.isIE9 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 9");
    exports.isFF = -1 < navigator.userAgent.indexOf("Firefox/");
    exports.isChrome = -1 < navigator.userAgent.indexOf("Chrome/");
    exports.isMac = -1 < navigator.userAgent.indexOf("Macintosh;");
    exports.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");

    exports.hasTouch = 'ontouchstart' in document.documentElement;
    exports.notSupported = this.isIE6 || this.isIE7 || this.isIE8 || this.isIE9;

    exports.mobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
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
    exports.enhanced = function() {
      return !_browserInfo.isIE && !_browserInfo.mobile.any();
    };

    exports.mouseDownEvtStr = function () {
      return this.mobile.any() ? "touchstart" : "mousedown";
    };

    exports.mouseUpEvtStr = function () {
      return this.mobile.any() ? "touchend" : "mouseup";
    };

    exports.mouseClickEvtStr = function () {
      return this.mobile.any() ? "touchend" : "click";
    };

    exports.mouseMoveEvtStr = function () {
      return this.mobile.any() ? "touchmove" : "mousemove";
    };

  });