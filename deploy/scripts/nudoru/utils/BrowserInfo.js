var BrowserInfo = {
  appVersion:  navigator.appVersion,
  userAgent:  navigator.userAgent,
  isIE:  -1 < this.userAgent.indexOf("MSIE "),
  isIE6:  this.isIE && -1 < this.appVersion.indexOf("MSIE 6"),
  isIE7:  this.isIE && -1 < this.appVersion.indexOf("MSIE 7"),
  isIE8: this.isIE && -1 < this.appVersion.indexOf("MSIE 8"),
  isIE9:  this.isIE && -1 < this.appVersion.indexOf("MSIE 9"),
  isFF:  -1 < this.userAgent.indexOf("Firefox/"),
  isChrome:  -1 < this.userAgent.indexOf("Chrome/"),
  isMac:  -1 < this.userAgent.indexOf("Macintosh;"),
  isMacSafari:  -1 < this.userAgent.indexOf("Safari") && -1 < this.userAgent.indexOf("Mac") && -1 === this.userAgent.indexOf("Chrome"),

  mobile: {
    Android: function() {
      return userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return userAgent.match(/BlackBerry/i) || userAgent.match(/BB10; Touch/);
    },
    iOS: function() {
      return userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (
      mobile.Android()
        || mobile.BlackBerry()
        || mobile.iOS()
        || mobile.Opera()
        || mobile.Windows()
        ) !== null
    }
  },

  notSupported: this.isIE6 || this.isIE7 || this.isIE8,
  hasTouch:  'ontouchstart' in document.documentElement,
  //enhanced:  !this.mobile.any() && !this.isIE,
  //mouseDownEvtStr: this.mobile.any() ? "touchstart" : "mousedown",
  //mouseUpEvtStr: this.mobile.any() ? "touchend" : "mouseup",
  //mouseClickEvtStr: this.mobile.any() ? "touchend" : "click",
  //mouseMoveEvtStr: this.mobile.any() ? "touchmove" : "mousemove"

}