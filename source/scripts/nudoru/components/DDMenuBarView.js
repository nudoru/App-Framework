/**
 * Created by matt on 1/15/15
 */


define('nudoru.components.DDMenuBarView',
  function (require, module, exports) {

    var _containerEl = null,
      _barEl = null,
      _data = null,
      _children = null,
      _isKeepOpen = false,
      _DOMUtils = require('nudoru.utils.DOMUtils'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize(elID, idata, keep) {
      _containerEl = document.getElementById(elID);
      _data = idata;

      _isKeepOpen = keep ? true : false;

      render();
    }

    function render() {
      var i = 0,
        len = _data.length;

      _children = [];

      _barEl = _DOMUtils.HTMLStrToNode('<ul></ul>');
      for (; i < len; i++) {
        var menuobj = requireCopy('nudoru.components.DDMenuView');
        menuobj.initialize(_data[i], _isKeepOpen);

        _barEl.appendChild(menuobj.getElement());
        _children.push(menuobj);
      }

      _containerEl.insertBefore(_barEl, _containerEl.firstChild);

      // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
      if (_browserInfo.isIE) {
        _containerEl.onselectstart = function () {
          return false;
        };
      }

    }

    function resetAllSelections() {
      _children.forEach(function (menu) {
        menu.deselectAllItems();
      });
    }

    function setMenuSelections(data) {
      _children.forEach(function (menu) {
        menu.setSelections(data);
      });
    }

    exports.initialize = initialize;
    exports.resetAllSelections = resetAllSelections;
    exports.setMenuSelections = setMenuSelections;

  });