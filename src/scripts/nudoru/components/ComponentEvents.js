ndefine('nudoru/component/ComponentEvents',
  function (nrequire, module, exports) {

    var objUtils = nrequire('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      MODAL_COVER_SHOW: null,
      MODAL_COVER_HIDE: null,
      MENU_SELECT     : null
    }));


  });