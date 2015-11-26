import Is from '../../nudoru/util/is.js';

/**
 * DOM manipulation and animation helpers
 */

let _tweenedEls = [],
    _zIndex     = 1000;

export default {
  
  /**
   * Returns the element. If passed a string will query DOM and return.
   * @param selector
   * @returns {*}
   */
  getElement(selector) {
    let el;

    if (Is.string(selector)) {
      el = document.querySelector(selector);
    } else {
      el = selector;
    }

    if (!el) {
      console.warn('Tweens, selector not found ' + selector);
    }

    return el;
  },

  toTop(selector) {
    let el = this.getElement(selector);
    if (el) {
      el.style.zIndex = _zIndex++;
    }
    console.warn('Tweens, to top, selector not found ' + selector);
  },

  addTweenedElement(selector) {
    let el = this.getElement(selector);

    if (el) {
      _tweenedEls.push(el);
      return el;
    }

    return null;
  },

  tweenTo(selector, dur, props) {
    let el = this.addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.to(el, dur, props);
  },

  tweenFrom(selector, dur, props) {
    let el = this.addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.from(el, dur, props);
  },

  tweenFromTo(selector, dur, startprops, endprops) {
    let el = this.addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.fromTo(el, dur, startprops, endprops);
  },

  killTweens() {
    _tweenedEls.forEach(el => {
      TweenLite.killTweensOf(el);
    });

    _tweenedEls = [];
  },

  hideEl(selector) {
    this.tweenSet(selector, {
      alpha  : 0,
      display: 'none'
    });
  },

  showEl(selector) {
    this.tweenSet(selector, {
      alpha  : 1,
      display: 'block'
    });
  },

  tweenSet(selector, props) {
    let el = this.getElement(selector);
    if (el) {
      TweenLite.set(el, props);
    }
  }

}