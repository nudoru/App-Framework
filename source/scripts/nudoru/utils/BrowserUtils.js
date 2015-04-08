//http://www.thespanner.co.uk/2009/01/29/detecting-browsers-javascript-hacks/
var BrowserUtils = {

  isLessThanIE: function(version) {
    if (navigator.appName === 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent,
        re = new RegExp("MSIE ([0-9]{1,}[\0-9]{0,})");
      if (re.exec(ua) !== null) {
        if (parseFloat(RegExp.$1) < version) {
          return true;
        }
      }
    }
    return false;
  }
};