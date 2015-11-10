import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import BrowserInfo  from '../../nudoru/browser/BrowserInfo.js';
import Template from '../../nori/view/Templating.js';

let ModalCoverViewModule = function () {

  let _mountPoint,
      _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _notDismissible;

  function initialize(elID) {

    _mountPoint = document.getElementById(elID);
    defineTemplates();
    _mountPoint.appendChild(Template.asElement('modal--container', {}));

    _isVisible = true;

    _modalCoverEl       = _mountPoint.querySelector('#modal__cover');
    _modalBackgroundEl  = _mountPoint.querySelector('.modal__background');
    _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

    let modalBGClick     = Rxjs.Observable.fromEvent(_modalBackgroundEl, BrowserInfo.mouseClickEvtStr()),
        modalButtonClick = Rxjs.Observable.fromEvent(_modalCloseButtonEl, BrowserInfo.mouseClickEvtStr());

    _modalClickStream = Rxjs.Observable.merge(modalBGClick, modalButtonClick)
      .subscribe(function () {
        onModalClick();
      });

    hide(false);
  }

  function defineTemplates() {
    Template.addTemplate('modal--container', `<div id="modal__cover">
              <div class="modal__background"></div>
              <div class="modal__close-button"><i class="fa fa-remove"></i></div>
          </div>`);
  }

  function getIsVisible() {
    return _isVisible;
  }

  function onModalClick() {
    if (_notDismissible) {
      return;
    }
    hide(true);
  }

  function showModalCover(shouldAnimate) {
    _isVisible = true;

    var duration = shouldAnimate ? 0.25 : 0;

    TweenLite.to(_modalCoverEl, duration, {
      autoAlpha: 1,
      ease     : Quad.easeOut
    });

    TweenLite.to(_modalBackgroundEl, duration, {
      alpha: 1,
      ease : Quad.easeOut
    });
  }

  function show(shouldAnimate) {
    if (_isVisible) {
      return;
    }

    _notDismissible = false;

    showModalCover(shouldAnimate);

    TweenLite.set(_modalCloseButtonEl, {scale: 2, alpha: 0});
    TweenLite.to(_modalCloseButtonEl, 1, {
      autoAlpha: 1,
      scale    : 1,
      ease     : Bounce.easeOut,
      delay    : 1
    });
  }

  /**
   * Cannot be dismissed with a click, must be via code
   * @param shouldAnimate
   */
  function showNonDismissable(shouldAnimate) {
    if (_isVisible) {
      return;
    }

    _notDismissible = true;

    showModalCover(shouldAnimate);
    TweenLite.to(_modalCloseButtonEl, 0, {autoAlpha: 0});
  }

  function hide(shouldAnimate) {
    if (!_isVisible) {
      return;
    }
    _isVisible      = false;
    _notDismissible = false;
    var duration    = shouldAnimate ? 0.25 : 0;
    TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
    TweenLite.to(_modalCoverEl, duration, {
      autoAlpha: 0,
      ease     : Quad.easeOut
    });
    TweenLite.to(_modalCloseButtonEl, duration / 2, {
      autoAlpha: 0,
      ease     : Quad.easeOut
    });

  }

  function setOpacity(opacity) {
    if (opacity < 0 || opacity > 1) {
      console.log('nudoru/component/ModalCoverView: setOpacity: opacity should be between 0 and 1');
      opacity = 1;
    }
    TweenLite.to(_modalBackgroundEl, 0.25, {
      alpha: opacity,
      ease : Quad.easeOut
    });
  }

  function setColor(r, g, b) {
    TweenLite.to(_modalBackgroundEl, 0.25, {
      backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')',
      ease           : Quad.easeOut
    });
  }

  return {
    initialize        : initialize,
    show              : show,
    showNonDismissable: showNonDismissable,
    hide              : hide,
    visible           : getIsVisible,
    setOpacity        : setOpacity,
    setColor          : setColor
  };

};

let ModalCoverView = ModalCoverViewModule();

export default ModalCoverView;