import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import Template from '../../nori/view/Templating.js';
import BrowserInfo from '../../nudoru/browser/BrowserInfo.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';

let ToastViewModule = function () {

  let _children              = [],
      _counter               = 0,
      _defaultExpireDuration = 7000,
      _types                 = {
        DEFAULT    : 'default',
        INFORMATION: 'information',
        SUCCESS    : 'success',
        WARNING    : 'warning',
        DANGER     : 'danger'
      },
      _typeStyleMap          = {
        'default'    : '',
        'information': 'toast__information',
        'success'    : 'toast__success',
        'warning'    : 'toast__warning',
        'danger'     : 'toast__danger'
      },
      _mountPoint;


  function initialize(elID) {
    _mountPoint = document.getElementById(elID);
    defineTemplates();
  }

  function defineTemplates() {
    Template.addTemplate('component--toast',`<div class="toast__item" id="{{ id }}">
        <div class="toast__item-content">
            <h1>{{ title }}</h1>
            <p>{{ message }}</p>
        </div>
        <div class="toast__item-controls">
            <button><i class="fa fa-close"></i></button>
        </div>
    </div>`);
  }

  //obj.title, obj.content, obj.type
  function add(initObj) {
    initObj.type = initObj.type || _types.DEFAULT;

    var toastObj = createToastObject(initObj.title, initObj.message);

    _children.push(toastObj);

    _mountPoint.insertBefore(toastObj.element, _mountPoint.firstChild);

    assignTypeClassToElement(initObj.type, toastObj.element);


    var closeBtn         = toastObj.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam    = Rxjs.Observable.fromEvent(closeBtn, BrowserInfo.mouseClickEvtStr()),
        expireTimeStream = Rxjs.Observable.interval(_defaultExpireDuration);

    toastObj.defaultButtonStream = Rxjs.Observable.merge(closeBtnSteam, expireTimeStream).take(1)
      .subscribe(function () {
        remove(toastObj.id);
      });

    transitionIn(toastObj.element);

    return toastObj.id;
  }

  function assignTypeClassToElement(type, element) {
    if (type !== 'default') {
      DOMUtils.addClass(element, _typeStyleMap[type]);
    }
  }

  function createToastObject(title, message) {
    var id  = 'js__toast-toastitem-' + (_counter++).toString(),
        obj = {
          id                 : id,
          element            : Template.asElement('component--toast', {
            id     : id,
            title  : title,
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
      alpha: 0,
      x    : '+200px',
      ease : Quad.easeIn, onComplete: function () {
        onTransitionOutComplete(el);
      }
    });
  }

  function onTransitionOutComplete(el) {
    var idx        = getObjIndexByID(el.getAttribute('id')),
        toastObj   = _children[idx];

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
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  function getTypes() {
    return _types;
  }

  return {
    initialize: initialize,
    add       : add,
    remove    : remove,
    type      : getTypes
  };

};

let ToastView = ToastViewModule();

export default ToastView;