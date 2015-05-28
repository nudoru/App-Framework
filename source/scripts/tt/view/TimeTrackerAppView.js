/**
 * Must be extended from Nori.View module
 *
 * this._super refers to Nori.View
 */

define('TT.TimeTrackerAppView',
  function (require, module, exports) {

    var _moduleNavView = require('TT.ModuleNavView');

    function initialize() {
      this._super.initialize();

      _moduleNavView.initialize();
    }

    function updateOnRouteChange(newRoute) {
      console.log('TTAV, updateonRoutechange: '+newRoute.route);
    }

    exports.initialize = initialize;
    exports.updateOnRouteChange = updateOnRouteChange;

  });