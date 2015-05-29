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

    /**
     * Update the UI or components when the route/subview has changed
     * @param newRoute
     */
    function updateOnRouteChange(newRoute) {
      _moduleNavView.highlightModule(newRoute.route);
    }

    exports.initialize = initialize;
    exports.updateOnRouteChange = updateOnRouteChange;

  });