import Is from '../../nudoru/util/is.js';

/**
 * DOM manipulation and animation helpers for ViewComponents
 */
export default function () {

  let _tweenedEls = [],
      _zIndex     = 1000;

  /**
   * Returns the element. If passed a string will query DOM and return.
   * @param selector
   * @returns {*}
   */
  function getElement(selector) {
    let el;

    if (Is.string(selector)) {
      el = document.querySelector(selector);
    } else {
      el = selector;
    }

    if (!el) {
      console.warn('MixinDOMManipulation, selector not found ' + selector);
    }

    return el;
  }

  function toTop(selector) {
    let el = document.querySelector(selector);
    if (el) {
      el.style.zIndex = _zIndex++;
    }
    console.warn('MixinDOMManipulation, to top, selector not found ' + selector);
  }

  function addTweenedElement(selector) {
    let el = getElement(selector);

    if (el) {
      _tweenedEls.push(el);
      return el;
    }

    return null;
  }

  function tweenTo(selector, dur, props) {
    let el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.to(el, dur, props);
  }

  function tweenFrom(selector, dur, props) {
    let el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.from(el, dur, props);
  }

  function tweenFromTo(selector, dur, startprops, endprops) {
    let el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.fromTo(el, dur, startprops, endprops);
  }

  function killTweens() {
    _tweenedEls.forEach(el => {
      TweenLite.killTweensOf(el);
    });

    _tweenedEls = [];
  }

  function hideEl(selector) {
    tweenSet(selector, {
      alpha  : 0,
      display: 'none'
    });
  }

  function showEl(selector) {
    tweenSet(selector, {
      alpha  : 1,
      display: 'block'
    });
  }

  function tweenSet(selector, props) {
    let el = getElement(selector);
    if (el) {
      TweenLite.set(el, props);
    }
  }

  return {
    toTop,
    showEl,
    hideEl,
    tweenSet,
    tweenTo,
    tweenFrom,
    tweenFromTo,
    killTweens
  };

}