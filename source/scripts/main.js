//------------------------------------------------------------------------------
//  Initialization
//------------------------------------------------------------------------------



(function () {

  window.onload = APP.initialize();

  if(APP.globals().notSupported) {
    alert("Your browser is not supported! Please use Firefox, Chrome or Safari.");
  }

}());