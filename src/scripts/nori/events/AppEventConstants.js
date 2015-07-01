define('Nori.Events.AppEventConstants',
  function (require, module, exports) {
    exports.APP_INITIALIZED = 'APP_INITIALIZED';
    exports.APP_VIEW_INITIALIZED = 'APP_VIEW_INITIALIZED';
    exports.APP_MODEL_INITIALIZED = 'APP_MODEL_INITIALIZED';
    exports.MODEL_DATA_WAITING = 'MODEL_DATA_WAITING';
    exports.MODEL_DATA_READY = 'MODEL_DATA_READY';
    exports.MODEL_DATA_CHANGED = 'MODEL_DATA_CHANGED';
    exports.MODEL_DATA_SAVED = 'MODEL_DATA_SAVED';
    exports.MODEL_DATA_DESTROYED = 'MODEL_DATA_DESTROYED';
    exports.UPDATE_MODEL_DATA = 'UPDATE_MODEL_DATA';
    exports.RESUME_FROM_MODEL_STATE = 'RESUME_FROM_MODEL_STATE';
    exports.VIEW_INITIALIZED = 'VIEW_INITIALIZED';
    exports.RENDER_VIEW = 'RENDER_VIEW';
    exports.VIEW_RENDERED = 'VIEW_RENDERED';
    exports.VIEW_CHANGED = 'VIEW_CHANGED';
    exports.VIEW_CHANGE_TO_MOBILE = 'VIEW_CHANGE_TO_MOBILE';
    exports.VIEW_CHANGE_TO_DESKTOP = 'VIEW_CHANGE_TO_DESKTOP';
    exports.ROUTE_CHANGED = 'ROUTE_CHANGED';
    exports.CHANGE_ROUTE = 'CHANGE_ROUTE';
    exports.SUBVIEW_STORE_STATE = 'SUBVIEW_STORE_STATE';
  });

//define('Nori.Events.AppEventConstants',
//  function (require, module, exports) {
//    var objUtils = require('Nudoru.Core.ObjectUtils'), consts;
//
//    exports = objUtils.keyMirror({
//      APP_INITIALIZED: null,
//      MODEL_DATA_WAITING: null,
//      MODEL_DATA_READY: null,
//      MODEL_DATA_CHANGED: null,
//      MODEL_DATA_SAVED: null,
//      MODEL_DATA_DESTROYED: null,
//      UPDATE_MODEL_DATA: null,
//      RESUME_FROM_MODEL_STATE: null,
//      VIEW_INITIALIZED: null,
//      VIEW_RENDERED: null,
//      VIEW_CHANGED: null,
//      VIEW_CHANGE_TO_MOBILE: null,
//      VIEW_CHANGE_TO_DESKTOP: null,
//      ROUTE_CHANGED: null,
//      CHANGE_ROUTE: null,
//      SUBVIEW_STORE_STATE: null
//    });
//
//  });

