/**
 * Created by matt on 12/1/14.
 */

define('nudoru.components.ToastView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _mountPoint,
      _templateToast,
      _template = require('nudoru.utils.NTemplate'),
      _DOMUtils = require('nudoru.utils.DOMUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
      _templateToast = _template.getTemplate('template__component--toast');
    }

    function add(title, message, button) {
      button = button || 'OK';

      var newToast = createToastObject(title, message, button);

      _mountPoint.insertBefore(newToast.element, _mountPoint.firstChild);

      newToast.index = _children.length;
      newToast.height = newToast.element.clientHeight;

      var closeBtn = newToast.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = Rx.Observable.fromEvent(closeBtn, BrowserInfo.mouseClickEvtStr()),
        expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);

      newToast.lifeTimeStream = Rx.Observable.merge(closeBtnSteam, expireTimeStream).take(1)
        .subscribe(function () {
          remove(newToast.id);
        });

      _children.push(newToast);

      transitionIn(newToast.element);

      return newToast.id;
    }

    function createToastObject(title, message, button) {
      var id = 'toast' + (_counter++).toString(),
        obj = {
          id: id,
          index: -1,
          title: title,
          message: message,
          buttonLabel: button,
          status: 'new',
          html: _templateToast({id: id, title: title, message: message}),
          element: null,
          height: 0,
          lifeTimeStream: null
        };

      obj.element = _DOMUtils.HTMLStrToNode(obj.html);
      return obj;
    }

    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0});
      TweenLite.to(el, 1, {alpha: 1, ease: Quad.easeOut});
      rearrangeToasts();
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        left: '+=300', ease: Quad.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    function onTransitionOutComplete(el) {
      var toastIdx = getToastIndexByID(el.getAttribute('id')),
        toast = _children[toastIdx];

      _mountPoint.removeChild(el);

      _children[toastIdx] = null;

      _children.splice(toast.index, 1);
      reindex();
    }

    function reindex() {
      var i = 0,
        len = _children.length;

      for (; i < len; i++) {
        _children[i].index = i;
      }
    }

    function rearrangeToasts(ignore) {
      var i = _children.length - 1,
        current,
        y = 0;

      for (; i > -1; i--) {
        if (i === ignore) {
          continue;
        }
        current = _children[i];
        TweenLite.to(current.element, 0.75, {y: y, ease: Bounce.easeOut});
        y += 10 + current.height;
      }
    }

    function getToastIndexByID(id) {
      var len = _children.length,
        i = 0;

      for (; i < len; i++) {
        if (_children[i].id === id) {
          return i;
        }
      }

      return -1;
    }

    function remove(id) {
      var toastIndex = getToastIndexByID(id),
        toast;

      if (toastIndex > -1) {
        toast = _children[toastIndex];
        transitionOut(toast.element);
        rearrangeToasts(toast.index);
      }
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;

  });