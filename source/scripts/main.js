//------------------------------------------------------------------------------
//  Initialization
//------------------------------------------------------------------------------



(function () {

  function preInitialize() {
    APP.initialize();

    if(APP.globals().isIE) {
      var appv = navigator.appVersion;

      if(appv.indexOf("MSIE 6") > -1 || appv.indexOf("MSIE 7") > -1 || appv.indexOf("MSIE 8") > -1) {
        alert("Your browser is not supported by this site. Please use Firefox, Chrome or Safari.");
      } else if(appv.indexOf("MSIE 9") > -1) {
        //alert("It looks like you're using Internet Explorer.\n\nConsider using Firefox, Chrome or Safari.");
      }

    }

  }

  preInitialize();
}());