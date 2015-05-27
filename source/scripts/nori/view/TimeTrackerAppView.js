/**
 * Must be extended from Nori.View module
 *
 * this._super refers to Nori.View
 */

define('Nori.TimeTrackerAppView',
  function (require, module, exports) {

    function initialize() {
      console.log('tt app view');
      this._super.initialize();
    }

    exports.initialize = initialize;

  });