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

define('nori/view/MixinEventDelegator',
  function (require, module, exports) {

    var MixinEventDelegator = function () {

      var _eventsMap,
          _eventSubscribers,
          _rx = require('nori/utils/Rx');

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
      function delegateEvents() {
        if (!_eventsMap) {
          return;
        }

        _eventSubscribers = Object.create(null);

        for (var evtStrings in _eventsMap) {
          if (_eventsMap.hasOwnProperty(evtStrings)) {

            var mappings    = evtStrings.split(','),
                eventHandler = _eventsMap[evtStrings];

            if (!is.function(eventHandler)) {
              console.warn('EventDelegator, handler for ' + evtStrings + ' is not a function');
              return;
            }

            /* jshint -W083 */
            // https://jslinterrors.com/dont-make-functions-within-a-loop
            mappings.forEach(function (evtMap) {
              evtMap = evtMap.trim();
              var eventStr = evtMap.split(' ')[0].trim(),
                  selector = evtMap.split(' ')[1].trim();
              _eventSubscribers[evtStrings] = createHandler(selector, eventStr, eventHandler);
            });
            /* jshint +W083 */
          }
        }
      }

      function createHandler(selector, eventStr, eventHandler) {
        return _rx.dom(selector, eventStr).subscribe(eventHandler);
      }

      /**
       * Cleanly remove events
       */
      function undelegateEvents() {
        if (!_eventsMap) {
          return;
        }

        for (var event in _eventSubscribers) {
          _eventSubscribers[event].dispose();
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

    module.exports = MixinEventDelegator;

  });