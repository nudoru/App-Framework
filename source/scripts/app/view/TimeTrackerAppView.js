/**
 * Must be extended from APP.View module
 *
 * this._super refers to APP.View
 */

define('APP.TimeTrackerAppView',
  function (require, module, exports) {

    function initialize() {
      console.log('tt app view');
      this._super.initialize();
    }

    exports.initialize = initialize;

  });