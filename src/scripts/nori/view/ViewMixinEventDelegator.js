/**
 * Convenience mixin that makes events easier for views
 *
 * Based on Backbone
 * Review this http://blog.marionettejs.com/2015/02/12/understanding-the-event-hash/index.html
 *
 * Example:
 * this.setEvents({
 *        'click #btn_main_projects':handleProjectsButton,
 *        'click #btn_main_people':handlePeopleButton,
 *        'click #btn_main_help':handleHelpButton
 *      });
 * this.delegateEvents();
 *
 */

define('Nori.View.ViewMixinEventDelegator',
  function (require, module, exports) {
    var _events,
      _eventSubscribers;

    function setEvents(events) {
      _events = events;
    }

    function getEvents() {
      return _events;
    }

    /**
     * Automates setting events on DOM elements.
     * 'evtStr selector':callback,
     */
    function delegateEvents() {
      if(!_events) {
        return;
      }

      _eventSubscribers = Object.create(null);

      for(event in _events) {


        if(_events.hasOwnProperty(event)) {

          var eventStr = event.split(' ')[0],
            selector = event.split(' ')[1],
            element = document.querySelector(selector);

          if(!element) {
            console.log('Cannot add event to invalid DOM element: '+selector);
            continue;
          }

          _eventSubscribers[event] = Rx.Observable.fromEvent(element, eventStr).subscribe(_events[event]);
        }
      }
    }

    /**
     * Cleanly remove events
     */
    function undelegateEvents() {
      if(!_events) {
        return;
      }

      for(event in _eventSubscribers) {
        _eventSubscribers[event].dispose();
        delete _eventSubscribers[event];
      }

      _eventSubscribers = Object.create(null);
    }

    exports.setEvents = setEvents;
    exports.getEvents = getEvents;
    exports.undelegateEvents = undelegateEvents;
    exports.delegateEvents = delegateEvents;
  });

