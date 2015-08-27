define('nori/events/EventConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      ALERT_USER             : null,
      WARN_USER              : null,
      NOTIFY_USER            : null,
      MODEL_STATE_CHANGED    : null,
      CHANGE_MODEL_STATE     : null
    }));

  });