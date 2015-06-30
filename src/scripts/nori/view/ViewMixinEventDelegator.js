/**
 * Convenience mixin that makes events easier for views
 *
 * Based on Backbone
 * Review this http://blog.marionettejs.com/2015/02/12/understanding-the-event-hash/index.html
 *
 * Example:
 * this.setEvents({
 *        'click #btn_main_projects': handleProjectsButton,
 *        'click #btn_main_people': handlePeopleButton,
 *        'click #btn_main_help': handleHelpButton
 *        'click #btn_foo, click #btn_bar': handleFooBarButtons
 *      });
 * this.delegateEvents();
 *
 */

define('Nori.View.ViewMixinEventDelegator',
  function (require, module, exports) {
    var _eventsMap,
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
    function delegateEvents() {
      if (!_eventsMap) {
        return;
      }

      _eventSubscribers = Object.create(null);

      for (var evtStrings in _eventsMap) {
        if (_eventsMap.hasOwnProperty(evtStrings)) {

          var mappings = evtStrings.split(',');

          mappings.forEach(function(evtMap) {
            evtMap = evtMap.trim();

            var eventStr = evtMap.split(' ')[0].trim(),
                selector = evtMap.split(' ')[1].trim(),
                element  = document.querySelector(selector);

            if (!element) {
              console.log('Cannot add event to invalid DOM element: ' + selector);
            } else {
              _eventSubscribers[evtStrings] = Rx.Observable.fromEvent(element, eventStr).subscribe(_eventsMap[evtStrings]);
            }

          });

        }
      }
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

    exports.setEvents        = setEvents;
    exports.getEvents        = getEvents;
    exports.undelegateEvents = undelegateEvents;
    exports.delegateEvents   = delegateEvents;
  });

