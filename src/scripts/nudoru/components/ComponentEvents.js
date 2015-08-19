define('nudoru/component/ComponentEvents',
  function (require, module, exports) {

    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      MODAL_COVER_SHOW: null,
      MODAL_COVER_HIDE: null,
      MENU_SELECT     : null
    }));


  });