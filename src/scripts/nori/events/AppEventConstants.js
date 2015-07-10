define('Nori.Events.AppEventConstants',
  function (require, module, exports) {
    var objUtils = require('Nudoru.Core.ObjectUtils');

    _.merge(exports, objUtils.keyMirror({
      APP_INITIALIZED        : null,
      ALERT_USER             : null,
      WARN_USER              : null,
      NOTIFY_USER            : null,
      MODEL_DATA_WAITING     : null,
      MODEL_DATA_READY       : null,
      MODEL_DATA_CHANGED     : null,
      MODEL_DATA_SAVED       : null,
      MODEL_DATA_DESTROYED   : null,
      UPDATE_MODEL_DATA      : null,
      RESUME_FROM_MODEL_STATE: null,
      VIEW_INITIALIZED       : null,
      VIEW_RENDERED          : null,
      VIEW_CHANGED           : null,
      VIEW_CHANGE_TO_MOBILE  : null,
      VIEW_CHANGE_TO_DESKTOP : null,
      ROUTE_CHANGED          : null,
      CHANGE_ROUTE           : null,
      SUBVIEW_STORE_STATE    : null,
      RENDER_VIEW            : null
    }));

  });