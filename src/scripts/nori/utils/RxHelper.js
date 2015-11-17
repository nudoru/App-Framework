/* @flow weak */

/**
 * RxJS Helpers
 * @type {{dom: Function, from: Function, interval: Function, doEvery: Function, just: Function, empty: Function}}
 */

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import Is from '../../nudoru/util/is.js';

export default {
  dom (selector, event) {
    let el = selector;

    if(Is.string(selector)) {
      el = document.querySelector(selector);
    }

    if (!el) {
      console.warn('nori/utils/Rx, dom, invalid DOM selector: ' + selector);
      return;
    }
    return Rxjs.Observable.fromEvent(el, event.trim());
  },

  doEvery (ms, ...args) {
    if(Is.func(args[0])) {
      return this.interval(ms).subscribe(args[0]);
    }
    return this.interval(ms).take(args[0]).subscribe(args[1]);
  },

  from (ittr) {
    return Rxjs.Observable.from(ittr);
  },

  interval (ms) {
    return Rxjs.Observable.interval(ms);
  },

  just (value) {
    return Rxjs.Observable.just(value);
  },

  empty () {
    return Rxjs.Observable.empty();
  }

};