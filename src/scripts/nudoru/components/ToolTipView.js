/**
 * Created by matt on 5/21/15
 * last updated 5/5/15
 */

define('Nudoru.Component.ToolTipView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultWidth = 200,
      _endRotationTransform = -20,
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
      _template = require('Nudoru.Component.NTemplate'),
      _domUtils = require('Nudoru.Browser.DOMUtils'),
      _componentUtils = require('Nudoru.Component.ComponentViewUtils');

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

      tooltipObj.arrowEl = tooltipObj.element.querySelector('.arrow');
      assignTypeClassToElement(initObj.type, initObj.position, tooltipObj.element);

      _componentUtils.apply3DToContainer(_mountPoint);
      _componentUtils.apply3DToComponentElement(tooltipObj.element);

      TweenLite.set(tooltipObj.element, {
        css: {
          autoAlpha: 0,
          width: initObj.width ? initObj.width : _defaultWidth
        }
      });

      // cache these values, 3d transforms will alter size
      tooltipObj.width = tooltipObj.element.getBoundingClientRect().width;
      tooltipObj.height = tooltipObj.element.getBoundingClientRect().height;

      // set 3d rotation
      TweenLite.set(tooltipObj.element, {
        css: { rotationX:  _endRotationTransform}
      });

      assignEventsToTargetEl(tooltipObj);
      positionToolTip(tooltipObj);

      if(tooltipObj.position === _positions.L || tooltipObj.position === _positions.R) {
        centerArrowVertically(tooltipObj)
      }

      if(tooltipObj.position === _positions.T || tooltipObj.position === _positions.B) {
        centerArrowHorizontally(tooltipObj)
      }

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
          }),
          arrowEl: null
        };

      return obj;
    }

    function assignEventsToTargetEl(tooltipObj) {
      tooltipObj.elOverStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseover')
        .subscribe(function (evt) {
          showToolTip(tooltipObj.id);
        });

      tooltipObj.elOutStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseout')
        .subscribe(function (evt) {
          hideToolTip(tooltipObj.id);
        });
    }

    function showToolTip(id) {
      var tooltipObj = getObjByID(id);
      positionToolTip(tooltipObj);
      transitionIn(tooltipObj.element);
    }

    function positionToolTip(tooltipObj) {
      var gutter = 15,
          xPos = 0,
          yPos = 0,
          tOriginH = '50%',
          tOriginV = '50%',
          tgtProps = tooltipObj.targetEl.getBoundingClientRect();

      if(tooltipObj.position === _positions.TL) {
        xPos = tgtProps.left - tooltipObj.width;
        yPos = tgtProps.top - tooltipObj.height;
        tOriginH = '100%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.T) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (tooltipObj.width / 2));
        yPos = tgtProps.top - tooltipObj.height - gutter;
        tOriginH = '50%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.TR) {
        xPos = tgtProps.right;
        yPos = tgtProps.top - tooltipObj.height;
        tOriginH = '0%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.R) {
        xPos = tgtProps.right + gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (tooltipObj.height / 2));
        tOriginH = '0%';
        tOriginV = '50%';
      } else if(tooltipObj.position === _positions.BR) {
        xPos = tgtProps.right;
        yPos = tgtProps.bottom;
        tOriginH = '0%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.B) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (tooltipObj.width / 2));
        yPos = tgtProps.bottom + gutter;
        tOriginH = '50%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.BL) {
        xPos = tgtProps.left - tooltipObj.width;
        yPos = tgtProps.bottom;
        tOriginH = '100%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.L) {
        xPos = tgtProps.left - tooltipObj.width - gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (tooltipObj.height / 2));
        tOriginH = '100%';
        tOriginV = '50%';
      }

      TweenLite.set(tooltipObj.element, {x: xPos, y: yPos, transformOrigin: tOriginH+' '+tOriginV});
    }

    function centerArrowHorizontally(tooltipObj) {
      var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
      TweenLite.set(tooltipObj.arrowEl, {x: (tooltipObj.width/2)-(arrowProps.width/2) });
    }

    function centerArrowVertically(tooltipObj) {
      var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();

      console.log(tooltipObj.height, arrowProps.height, ((tooltipObj.height/2)-(arrowProps.height/2)));

      TweenLite.set(tooltipObj.arrowEl, {y: (tooltipObj.height/2)-(arrowProps.height/2)-2 });
    }

    function hideToolTip(id) {
      var tooltipObj = getObjByID(id);
      transitionOut(tooltipObj.element);
    }

    function transitionIn(el) {
      TweenLite.to(el,0.25, {autoAlpha: 1,
         rotationX: 0,
        scaleY: 1,
        ease: Circ.easeOut
      });
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.15, {
         rotationX:  _endRotationTransform,
        autoAlpha: 0,
        scaleY: 1,
        ease: Circ.easeIn
      });
    }

    function remove(el) {
      getObjByElement(el).forEach(function(tooltip) {
        tooltip.elOverStream.dispose();
        tooltip.elOutStream.dispose();

        _mountPoint.removeChild(tooltip.element);

        var idx = getObjIndexByID(tooltip.id);

        _children[idx] = null;
        _children.splice(idx, 1);
      });
    }

    function getObjByID(id) {
      return _children.filter(function(child) {
        return child.id === id;
      })[0];
    }

    function getObjIndexByID(id) {
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    function getObjByElement(el) {
      return _children.filter(function(child) {
        return child.targetEl === el;
      });
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