/**
 * Created by matt on 5/21/15
 * last updated 5/5/15
 */

define('nudoru.components.ToolTip',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _types = {
        DEFAULT: 'default',
        INFORMATION: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default': '',
        'information': 'tooltip__information',
        'success': 'tooltip__success',
        'warning': 'tooltip__warning',
        'danger': 'tooltip__danger'
      },
      _positionMap = {
        TL: '0',
        T: '1',
        TR: '2',
        R: '3',
        BR: '4',
        B: '5',
        BL: '6',
        L: '7'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var tooltipObj = createToolTipObject(initObj.title, initObj.content);

      _children.push(tooltipObj);

      _mountPoint.insertBefore(tooltipObj.element, _mountPoint.firstChild);

      assignTypeClassToElement(initObj.type, tooltipObj.element);

      TweenLite.set(tooltipObj.element, {
        css: {
          transformPerspective: 800,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden"
        }
      });

      transitionIn(tooltipObj.element);

      return tooltipObj.id;
    }

    function assignTypeClassToElement(type, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    function createToolTipObject(title, message) {
      var id = 'js__tooltip-tooltipitem-' + (_counter++).toString(),
        obj = {
          id: id,
          element: _template.asElement('template__component--tooltip', {
            id: id,
            title: title,
            message: message
          })
        };

      return obj;
    }

    function remove(id) {
      var idx = getObjIndexByID(id),
        tooltip;

      if (idx > -1) {
        tooltip = _children[idx];
        rearrange(idx);
        transitionOut(tooltip.element);
      }
    }

    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0});
      TweenLite.to(el, 1, {alpha: 1, ease: Quad.easeOut});
      rearrange();
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        rotationX: -45,
        alpha: 0,
        ease: Quad.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
        tooltipObj = _children[idx];

      _mountPoint.removeChild(el);
      _children[idx] = null;
      _children.splice(idx, 1);
    }

    function getObjIndexByID(id) {
      var len = _children.length,
        i = 0;

      for (; i < len; i++) {
        if (_children[i].id === id) {
          return i;
        }
      }

      return -1;
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function () {
      return _types
    };
    exports.position = function () {
      return _positionMap
    };

  });