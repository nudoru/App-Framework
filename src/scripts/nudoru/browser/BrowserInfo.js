export default {

  appVersion : navigator.appVersion,
  userAgent  : navigator.userAgent,
  isIE       : -1 < navigator.userAgent.indexOf("MSIE "),
  isIE6      : -1 < navigator.appVersion.indexOf("MSIE 6"),
  isIE7      : -1 < navigator.appVersion.indexOf("MSIE 7"),
  isIE8      : -1 < navigator.appVersion.indexOf("MSIE 8"),
  isIE9      : -1 < navigator.appVersion.indexOf("MSIE 9"),
  isFF       : -1 < navigator.userAgent.indexOf("Firefox/"),
  isChrome   : -1 < navigator.userAgent.indexOf("Chrome/"),
  isMac      : -1 < navigator.userAgent.indexOf("Macintosh,"),
  isMacSafari: -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome"),

  hasTouch    : 'ontouchstart' in document.documentElement,

  mobile: {
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
      return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) !== null;
    }

  },

  // TODO filter for IE > 9
  enhanced: function () {
    return !_browserInfo.isIE && !_browserInfo.mobile.any();
  },

  mouseDownEvtStr: function () {
    return this.mobile.any() ? "touchstart" : "mousedown";
  },

  mouseUpEvtStr: function () {
    return this.mobile.any() ? "touchend" : "mouseup";
  },

  mouseClickEvtStr: function () {
    return this.mobile.any() ? "touchend" : "click";
  },

  mouseMoveEvtStr: function () {
    return this.mobile.any() ? "touchmove" : "mousemove";
  }

};