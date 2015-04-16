nudoru.createNameSpace('nudoru.utils.TouchUtils');
nudoru.utils.TouchUtils = {

  // https://github.com/filamentgroup/tappy/blob/master/tappy.js
  getCoords: function( evt ){
    var ev = evt.originalEvent || evt,
        touches = ev.touches || ev.targetTouches;

    if( touches ){
      return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
    }
    else {
      return null;
    }
  }

};

//nudoru.createNameSpace('nudoru.utils.TouchUtils');
//nudoru.utils.TouchUtils = {};
//
//(function(exports){
//
//  // https://github.com/filamentgroup/tappy/blob/master/tappy.js
//  exports.getCoords = function( evt ){
//    var ev = evt.originalEvent || evt,
//      touches = ev.touches || ev.targetTouches;
//
//    if( touches ){
//      return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
//    }
//    else {
//      return null;
//    }
//  };
//
//})(nudoru.utils.TouchUtils);
