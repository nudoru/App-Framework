define('Nudoru.Browser.TouchUtils',
  function(require, module, exports) {

    // https://github.com/filamentgroup/tappy/blob/master/tappy.js
    module.exports.getCoords = function( evt ){
      var ev = evt.originalEvent || evt,
        touches = ev.touches || ev.targetTouches;

      if( touches ){
        return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
      }
      else {
        return null;
      }
    };

  });
