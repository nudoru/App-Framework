/**
 * Must be extended from Nori.Model module
 *
 * this._super refers to Nori.Model
 */

define('Nori.TimeTrackerAppModel',
  function (require, module, exports) {

    function initialize() {
      console.log('tt app model');
      this._super.initialize();
    }

    exports.initialize = initialize;

  });