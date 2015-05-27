/**
 * Manages left side module navigation
 */

define('TT.ModuleNavView',
  function (require, module, exports) {

    var _buttonMap = {},
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('nudoru.events.Emitter');

    function initialize() {

      mapButton('btn_assignments', '/Assignments');
      mapButton('btn_timecard', '/Timecard');
      mapButton('btn_forecast', '/Forecast');

    }

    function mapButton(elID, route) {
      var buttonEl = document.getElementById(elID),
        liEl =buttonEl.parentNode;

      _buttonMap[elID] = {
        buttonEl: buttonEl,
        liEl: liEl,
        route: route,
        clickStream: Rx.Observable.fromEvent(buttonEl, _browserInfo.mouseClickEvtStr())
          .subscribe(function () {
            handleButton(elID)
          })
      };
    }

    function handleButton(id) {
      console.log('handle: '+id);
      _emitter.publish(_appEvents.CHANGE_ROUTE, {route: _buttonMap[id].route});
    }

    exports.initialize = initialize;

  });