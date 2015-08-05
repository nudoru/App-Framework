/**
 * Created by matt on 12/1/14
 * last updated 5/5/15
 */

define('Nudoru.Component.ToastView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _types = {
        DEFAULT : 'default',
        INFORMATION : 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default' : '',
        'information' : 'toast__information',
        'success' : 'toast__success',
        'warning' : 'toast__warning',
        'danger' : 'toast__danger'
      },
      _mountPoint,
      _template = require('Nudoru.Component.Templating'),
      _browserInfo = require('Nudoru.Browser.BrowserInfo'),
      _domUtils = require('Nudoru.Browser.DOMUtils'),
      _componentUtils = require('Nudoru.Component.ComponentViewUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var toastObj = createToastObject(initObj.title, initObj.message);

      _children.push(toastObj);

      _mountPoint.insertBefore(toastObj.element, _mountPoint.firstChild);

      assignTypeClassToElement(initObj.type, toastObj.element);

      _componentUtils.apply3DToContainer(_mountPoint);
      _componentUtils.apply3DToComponentElement(toastObj.element);

      var closeBtn = toastObj.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = Rx.Observable.fromEvent(closeBtn, _browserInfo.mouseClickEvtStr()),
        expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);

      toastObj.defaultButtonStream = Rx.Observable.merge(closeBtnSteam, expireTimeStream).take(1)
        .subscribe(function () {
          remove(toastObj.id);
        });

      transitionIn(toastObj.element);

      return toastObj.id;
    }

    function assignTypeClassToElement(type, element) {
      if(type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    function createToastObject(title, message) {
      var id = 'js__toast-toastitem-' + (_counter++).toString(),
        obj = {
          id: id,
          element: _template.asElement('template__component--toast', {
            id: id,
            title: title,
            message: message
          }),
          defaultButtonStream: null
        };

      return obj;
    }

    function remove(id) {
      var idx = getObjIndexByID(id),
        toast;

      if (idx > -1) {
        toast = _children[idx];
        rearrange(idx);
        transitionOut(toast.element);
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
          toastObj = _children[idx];

      toastObj.defaultButtonStream.dispose();

      _mountPoint.removeChild(el);
      _children[idx] = null;
      _children.splice(idx, 1);
    }

    function rearrange(ignore) {
      var i = _children.length - 1,
        current,
        y = 0;

      for (; i > -1; i--) {
        if (i === ignore) {
          continue;
        }
        current = _children[i];
        TweenLite.to(current.element, 0.75, {y: y, ease: Bounce.easeOut});
        y += 10 + current.element.clientHeight;
      }
    }

    function getObjIndexByID(id) {
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    module.exports.initialize = initialize;
    module.exports.add = add;
    module.exports.remove = remove;
    module.exports.type = function() { return _types };

  });