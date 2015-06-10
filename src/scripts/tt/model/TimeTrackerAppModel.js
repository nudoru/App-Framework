/**
 * Must be extended from Nori.Model module
 *
 * this._super refers to Nori.Model
 */

define('TT.Model.TimeTrackerAppModel',
  function (require, module, exports) {

    function initialize() {
      this._super.initialize();
    }

    exports.initialize = initialize;

  });