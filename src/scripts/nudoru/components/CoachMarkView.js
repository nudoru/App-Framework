define('Nudoru.Component.CoachMarksView',
  function (require, module, exports) {

    var _children        = [],
        _counter         = 0,
        _highestZ        = 1000,
        _markedObjects   = [],
        _mountPoint,
        _modalCloseSubscriber,
        _shapeTemplate   = '<div id="#js__coachmark-element-<%= id%>" class="coachmark__shape-<%= props.shape%>"></div>',
        _template        = require('Nudoru.Component.Templating'),
        _modal           = require('Nudoru.Component.ModalCoverView'),
        _domUtils        = require('Nudoru.Browser.DOMUtils'),
        _componentUtils  = require('Nudoru.Component.ComponentViewUtils'),
        _dispatcher      = require('Nudoru.Component.Dispatcher'),
        _componentEvents = require('Nudoru.Component.ComponentEvents');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    function outlineElement(selector, props) {
      var el = document.querySelector(selector);
      _markedObjects.push({
        targetElement: el,
        id           : _highestZ++,
        shape        : null,
        label        : null,
        props        : props
      });
    }

    function renderMarkedObjects() {
      _markedObjects.forEach(function (object) {
        console.log(object);
      });
    }

    function show() {
      _modalCloseSubscriber = _dispatcher.subscribe(_componentEvents.MODAL_COVER_HIDE, hide);
      _modal.show(true);
    }

    function hide() {
      console.log('coachmarks hide');
      _modal.hide(true);
      _modalCloseSubscriber.dispose();
      _modalCloseSubscriber = null;
    }

    exports.initialize     = initialize;
    exports.outlineElement = outlineElement;
    exports.show           = show;
    exports.hide           = hide;

  });