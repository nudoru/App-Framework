define('app/events/EventConstants',
  function (require, module, exports) {
    var objUtils = require('Nudoru.Core.ObjectUtils');

    _.merge(exports, objUtils.keyMirror({
      SOMETHING_HAPPENED: null
    }));
  });