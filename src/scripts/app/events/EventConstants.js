define('app/events/EventConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(exports, objUtils.keyMirror({
      SOMETHING_HAPPENED: null
    }));
  });