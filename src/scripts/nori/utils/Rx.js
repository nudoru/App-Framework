/* @flow weak */

/**
 * RxJS Helpers
 * @type {{dom: Function, from: Function, interval: Function, doEvery: Function, just: Function, empty: Function}}
 */

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';
import is from '../../nudoru/util/is.js';

export default {
  dom: function (selector, event) {
    let el = document.querySelector(selector);
    if (!el) {
      console.warn('nori/utils/Rx, dom, invalid DOM selector: ' + selector);
      return;
    }
    return Rxjs.Observable.fromEvent(el, event.trim());
  },

  from: function (ittr) {
    return Rxjs.Observable.from(ittr);
  },

  interval: function (ms) {
    return Rxjs.Observable.interval(ms);
  },

  doEvery: function (ms, ...args) {
    if(is.func(args[0])) {
      return this.interval(ms).subscribe(args[0]);
    }
    return this.interval(ms).take(args[0]).subscribe(args[1]);
  },

  just: function (value) {
    return Rxjs.Observable.just(value);
  },

  empty: function () {
    return Rxjs.Observable.empty();
  }

};