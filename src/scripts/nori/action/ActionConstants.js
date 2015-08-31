ndefine('nori/action/ActionConstants',
  function (nrequire, module, exports) {
    var objUtils = nrequire('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      CHANGE_STORE_STATE     : null
    }));

  });