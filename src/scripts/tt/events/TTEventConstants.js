define('TT.Events.TTEventConstants',
  function (require, module, exports) {
    var objUtils = require('Nudoru.Core.ObjectUtils');

    _.merge(exports, objUtils.keyMirror({
      ADD_ASSIGNMENT       : null,
      ARCHIVE_ASSIGNMENT   : null,
      UPDATE_ASSIGNMENTS   : null,
      SUBMIT_TIMECARD      : null,
      UNLOCK_TIMECARD      : null,
      UPDATE_TIMECARD      : null,
      TIMECARD_WEEKFORWARD : null,
      TIMECARD_WEEKBACKWARD: null
    }));
  });