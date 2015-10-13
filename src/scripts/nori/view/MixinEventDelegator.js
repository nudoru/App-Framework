/* @flow weak */

/**
 * Convenience mixin that makes events easier for views
 *
 * Based on Backbone
 * Review this http://blog.marionettejs.com/2015/02/12/understanding-the-event-hash/index.html
 *
 * Example:
 * this.setEvents({
 *        'click #btn_main_projects': handleProjectsButton,
 *        'click #btn_foo, click #btn_bar': handleFooBarButtons
 *      });
 * this.delegateEvents();
 *
 */

import _rx from '../utils/Rx.js';
import _browserInfo from '../../nudoru/browser/BrowserInfo.js';
import is from '../../nudoru/util/is.js';

let MixinEventDelegator = function () {

  let _eventsMap,
      _eventSubscribers;

  function setEvents(evtObj) {
    _eventsMap = evtObj;
  }

  function getEvents() {
    return _eventsMap;
  }

  /**
   * Automates setting events on DOM elements.
   * 'evtStr selector':callback
   * 'evtStr selector, evtStr selector': sharedCallback
   */
  function delegateEvents(autoForm) {
    if (!_eventsMap) {
      return;
    }

    _eventSubscribers = Object.create(null);

    for (var evtStrings in _eventsMap) {
      if (_eventsMap.hasOwnProperty(evtStrings)) {

        let mappings     = evtStrings.split(','),
            eventHandler = _eventsMap[evtStrings];

        if (!is.func(eventHandler)) {
          console.warn('EventDelegator, handler for ' + evtStrings + ' is not a function');
          return;
        }

        /* jshint -W083 */
        // https://jslinterrors.com/dont-make-functions-within-a-loop
        mappings.forEach(evtMap => {
          evtMap = evtMap.trim();

          let eventStr = evtMap.split(' ')[0].trim(),
              selector = evtMap.split(' ')[1].trim();

          if (_browserInfo.mobile.any()) {
            eventStr = convertMouseToTouchEventStr(eventStr);
          }

          _eventSubscribers[evtMap] = createHandler(selector, eventStr, eventHandler, autoForm);
        });
        /* jshint +W083 */
      }
    }
  }

  /**
   * Map common mouse events to touch equivalents
   * @param eventStr
   * @returns {*}
   */
  function convertMouseToTouchEventStr(eventStr) {
    switch (eventStr) {
      case('click'):
        return 'touchend';
      case('mousedown'):
        return 'touchstart';
      case('mouseup'):
        return 'touchend';
      case('mousemove'):
        return 'touchmove';
      default:
        return eventStr;
    }
  }

  /**
   * Returns an observable subscription
   * @param selector DOM element
   * @param eventStr Event to watch
   * @param handler Subscriber to handle the event
   * @param autoForm True to automatically pass common form element data to the handler
   * @returns {*}
   */
  function createHandler(selector, eventStr, handler, autoForm) {
    let observable = _rx.dom(selector, eventStr),
        el         = document.querySelector(selector),
        tag, type;

    if (!el) {
      console.warn('MixinEventDelegator, createHandler, Element not found:', selector);
      return;
    }

    tag  = el.tagName.toLowerCase();
    type = el.getAttribute('type');

    if (autoForm) {
      if (tag === 'input' || tag === 'textarea') {
        if (!type || type === 'text') {
          if (eventStr === 'blur' || eventStr === 'focus') {
            return observable.map(evt => evt.target.value).subscribe(handler);
          } else if (eventStr === 'keyup' || eventStr === 'keydown') {
            return observable.throttle(100).map(evt => evt.target.value).subscribe(handler);
          }
        } else if (type === 'radio' || type === 'checkbox') {
          if (eventStr === 'click') {
            return observable.map(evt => evt.target.checked).subscribe(handler);
          }
        }
      } else if (tag === 'select') {
        if (eventStr === 'change') {
          return observable.map(evt => evt.target.value).subscribe(handler);
        }
      }
    }

    return observable.subscribe(handler);
  }

  /**
   * Cleanly remove events
   */
  function undelegateEvents() {
    if (!_eventsMap) {
      return;
    }

    for (var event in _eventSubscribers) {
      if(_eventSubscribers[event]) {
        _eventSubscribers[event].dispose();
      } else {
        console.warn('MixinEventDelegator, undelegateEvents, not a valid observable: ',event);
      }
      delete _eventSubscribers[event];
    }

    _eventSubscribers = Object.create(null);
  }

  return {
    setEvents       : setEvents,
    getEvents       : getEvents,
    undelegateEvents: undelegateEvents,
    delegateEvents  : delegateEvents
  };

};

export default MixinEventDelegator;