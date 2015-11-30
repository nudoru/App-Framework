/* @flow weak */

/**
 * Add RxJS Subject to a module.
 *
 * Add one simple observable subject or more complex ability to create others for
 * more complex eventing needs.
 */

import Rxjs from '../../vendor/rxjs/rx.lite.min.js';

export default function() {

  let _subjectMap = {};

  /**
   * Subscribe handler to updates. If the handler is a string, the new subject
   * will be created.
   * @param handler
   * @returns {*}
   */
  function subscribe(name, handler) {
    if (!_subjectMap.hasOwnProperty(name)) {
      _subjectMap[name] = new Rxjs.Subject();
    }
    return _subjectMap[name].subscribe(handler);
  }

  /**
   * Dispatch updated to named subscribers
   * @param name
   * @param payload
   */
  function notify(name, payload) {
    if (_subjectMap.hasOwnProperty(name)) {
      _subjectMap[name].onNext(payload);
    } else {
      console.warn('MixinObservableSubject, no subscribers of ' + name);
    }
  }

  return {
    subscribe: subscribe,
    notify   : notify
  };

}