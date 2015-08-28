define('nori/action/ActionConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      CHANGE_MODEL_STATE     : null
    }));

  });