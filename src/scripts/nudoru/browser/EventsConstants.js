ndefine('nudoru/browser/EventConstants',
  function (nrequire, module, exports) {

    var objUtils = nrequire('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      URL_HASH_CHANGED: null,
      BROWSER_RESIZED : null,
      BROWSER_SCROLLED: null
    }));

  });