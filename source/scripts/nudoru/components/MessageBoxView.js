/**
 * Simple popup message box module
 *
 * Created by matt on 5/5/15
 * last updated 5/7/15
 */

define('nudoru.components.MessageBoxView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _types = {
        DEFAULT: 'default',
        INFORMATION: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default': '',
        'information': 'messagebox__information',
        'success': 'messagebox__success',
        'warning': 'messagebox__warning',
        'danger': 'messagebox__danger'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _modal = require('nudoru.components.ModalCoverView'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    function add(initObj) {
      var type = initObj.type || _types.DEFAULT;

      var boxOjb = createBoxObject(initObj.title, initObj.content, initObj.modal);

      _children.push(boxOjb);

      _mountPoint.appendChild(boxOjb.element);

      assignTypeClassToElement(type, boxOjb.element);

      _domUtils.centerElementInViewPort(boxOjb.element);

      TweenLite.set(boxOjb.element, {
        css: {
          transformPerspective: 800,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden"
        }
      });

      Draggable.create('#' + boxOjb.id, {
        bounds: window
      });

      console.log(Draggable.zIndex);

      var closeBtn = boxOjb.element.querySelector('.footer button');

      boxOjb.closeStream = Rx.Observable.fromEvent(closeBtn, _browserInfo.mouseClickEvtStr())
        .subscribe(function () {
          remove(boxOjb.id);
        });

      transitionIn(boxOjb.element);

      if (initObj.modal) {
        _modal.showHard(true);
      }

      return boxOjb.id;
    }

    function assignTypeClassToElement(type, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    function createBoxObject(title, content, modal) {
      var id = 'js__messagebox-' + (_counter++).toString(),
        obj = {
          id: id,
          modal: modal,
          element: _template.asElement('template__messagebox--default', {
            id: id,
            title: title,
            content: content
          }),
          closeStream: null
        };

      return obj;
    }

    function remove(id) {
      var idx = getObjIndexByID(id),
        boxObj;

      if (idx > -1) {
        boxObj = _children[idx];
        transitionOut(boxObj.element);
      }
    }

    function checkModalStatus() {
      var isModal = false;

      _children.forEach(function (boxObj) {
        if (boxObj.modal) {
          isModal = true;
        }
      });

      if (!isModal) {
        _modal.hide(true);
      }
    }

    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0, rotationX: 45});
      TweenLite.to(el, 1, {alpha: 1, rotationX: 0, ease: Circ.easeOut});
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        alpha: 0,
        rotationX: -45,
        ease: Circ.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
        boxObj = _children[idx];

      boxObj.closeStream.dispose();

      Draggable.get('#' + boxObj.id).disable();

      _mountPoint.removeChild(el);

      _children[idx] = null;
      _children.splice(idx, 1);

      checkModalStatus();
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

  });