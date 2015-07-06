define('TT.Model.TimeModel',

  function (require, module, exports) {
    var _moment,
        _id,
        _appEvents = require('Nori.Events.AppEventCreator');

    function initialize() {
      _moment = moment();
      _id     = 'timemodel';
    }

    function getCurrentWeek() {
      return _moment.week();
    }

    function getCurrentYear() {
      return _moment.year();
    }

    function resetToCurrent() {
      _moment = moment();
      dispatchChange();
    }

    function forwardWeek() {
      var wk = _moment.week();
      _moment.week(++wk);
      dispatchChange();
    }

    function backwardWeek() {
      var wk = _moment.week();
      _moment.week(--wk);
      dispatchChange();
    }

    function debug() {
      console.log(getCurrentWeek(), getCurrentYear(), getPrettyDateString(), getDateString());
    }

    function getDateString() {
      return getCurrentYear() + '_' + getCurrentWeek();
    }

    function getPrettyDateString(format) {
      format = format || 'MMM Do, YYYY';
      return _moment.format(format);
    }

    function dispatchChange() {
      //debug();
      _appEvents.modelChanged({
        id     : _id,
        type   : 'time_move',
        mapType: 'time',
        mapID  : ''
      });
    }

    exports.initialize          = initialize;
    exports.getPrettyDateString = getPrettyDateString;
    exports.getDateString       = getDateString;
    exports.getCurrentWeek      = getCurrentWeek;
    exports.getCurrentYear      = getCurrentYear;
    exports.resetToCurrent      = resetToCurrent;
    exports.forwardWeek         = forwardWeek;
    exports.backwardWeek        = backwardWeek;

  });