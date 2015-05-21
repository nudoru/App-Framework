/**
 * Created by matt on 5/21/15
 * last updated 5/5/15
 */

define('nudoru.components.ToolTipView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultWidth = 200,
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
      _positions = {
        T: 'T',
        TR: 'TR',
        R: 'R',
        BR: 'BR',
        B: 'B',
        BL: 'BL',
        L: 'L',
        TL: 'TL'
      },
      _positionMap = {
        'T': 'tooltip__top',
        'TR': 'tooltip__topright',
        'R': 'tooltip__right',
        'BR': 'tooltip__bottomright',
        'B': 'tooltip__bottom',
        'BL': 'tooltip__bottomleft',
        'L': 'tooltip__left',
        'TL': 'tooltip__topleft'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _domUtils = require('nudoru.utils.DOMUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type, obj.target, obj.position
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var tooltipObj = createToolTipObject(initObj.title,
        initObj.content,
        initObj.position,
        initObj.targetEl);

      _children.push(tooltipObj);
      _mountPoint.appendChild(tooltipObj.element);

      assignTypeClassToElement(initObj.type, initObj.position, tooltipObj.element);



      TweenLite.set(tooltipObj.element, {
        css: {
          autoAlpha: 0,
          transformPerspective: 200,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          width: initObj.width ? initObj.width : _defaultWidth
        }
      });

      // cache these values, 3d transforms will alter size
      tooltipObj.width = tooltipObj.element.getBoundingClientRect().width;
      tooltipObj.height = tooltipObj.element.getBoundingClientRect().height;

      TweenLite.set(tooltipObj.element, {
        css: {rotationX: -45}
      });

      assignEventsToTargetEl(tooltipObj);
      positionToolTip(tooltipObj);

      return tooltipObj.id;
    }

    function assignTypeClassToElement(type, position, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
      _domUtils.addClass(element, _positionMap[position]);
    }

    function createToolTipObject(title, message, position, target) {
      var id = 'js__tooltip-tooltipitem-' + (_counter++).toString(),
        obj = {
          id: id,
          position: position,
          targetEl: target,
          elOverStream: null,
          elOutStream: null,
          height: 0,
          width: 0,
          element: _template.asElement('template__component--tooltip', {
            id: id,
            title: title,
            message: message
          })
        };

      return obj;
    }

    function assignEventsToTargetEl(ttObj) {
      ttObj.elOverStream = Rx.Observable.fromEvent(ttObj.targetEl, 'mouseover')
        .subscribe(function (evt) {
          showToolTip(ttObj.id);
        });

      ttObj.elOutStream = Rx.Observable.fromEvent(ttObj.targetEl, 'mouseout')
        .subscribe(function (evt) {
          hideToolTip(ttObj.id);
        });
    }

    function showToolTip(id) {
      var ttObj = getObjByID(id);
      positionToolTip(ttObj);
      transitionIn(ttObj.element);
    }

    function positionToolTip(ttObj) {
      var gutter = 10,
          xPos = 0,
          yPos = 0,
          tgtProps = ttObj.targetEl.getBoundingClientRect();

      if(ttObj.position === _positions.TL) {
        xPos = tgtProps.left - ttObj.width;
        yPos = tgtProps.top - ttObj.height;
      } else if(ttObj.position === _positions.T) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (ttObj.width / 2));
        yPos = tgtProps.top - ttObj.height - gutter;
      } else if(ttObj.position === _positions.TR) {
        xPos = tgtProps.right;
        yPos = tgtProps.top - ttObj.height;
      } else if(ttObj.position === _positions.R) {
        xPos = tgtProps.right + gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (ttObj.height / 2));
      } else if(ttObj.position === _positions.BR) {
        xPos = tgtProps.right;
        yPos = tgtProps.bottom;
      } else if(ttObj.position === _positions.B) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (ttObj.width / 2));
        yPos = tgtProps.bottom + gutter;
      } else if(ttObj.position === _positions.BL) {
        xPos = tgtProps.left - ttObj.width;
        yPos = tgtProps.bottom;
      } else if(ttObj.position === _positions.L) {
        xPos = tgtProps.left - ttObj.width - gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (ttObj.height / 2));
      }

      TweenLite.set(ttObj.element, {x: xPos, y: yPos});
    }

    function hideToolTip(id) {
      var ttObj = getObjByID(id);
      transitionOut(ttObj.element);
    }

    function transitionIn(el) {
      TweenLite.to(el,0.25, {autoAlpha: 1,
        rotationX: 0,
        ease: Quad.easeOut
      });
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        rotationX: -45,
        autoAlpha: 0,
        ease: Quad.easeIn
      });
    }

    function remove(id) {
      var idx = getObjIndexByID(id),
        tooltip;

      if (idx > -1) {
        tooltip = _children[idx];
        tooltip.elOverStream.dispose();
        tooltip.elOutStream.dispose();

        _mountPoint.removeChild(el);
        _children[idx] = null;
        _children.splice(idx, 1);
      }
    }

    function getObjByID(id) {
      return _children.filter(function(child) {
        return child.id === id;
      })[0];
    }

    // TODO rewrite with filter
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
      return _positions
    };

  });