define('Nudoru.Browser.BrowserEventConstants',
  function (require, module, exports) {

    var objUtils = require('Nudoru.Core.ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      URL_HASH_CHANGED: null,
      BROWSER_RESIZED : null,
      BROWSER_SCROLLED: null
    }));

  });