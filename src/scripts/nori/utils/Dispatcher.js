/*
 Matt Perkins, 6/12/15
 Based on
 https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md

 publish payload object

 {
 type: EVT_TYPE,
 payload: {
 key: value
 }
 }

 */

define('nori/utils/Dispatcher',
  function (require, module, exports) {

    var Dispatcher = function () {

      var _subjectMap  = {},
          _receiverMap = {},
          _id          = 0,
          _log         = [],
          _queue       = [],
          _timerObservable,
          _timerSubscription,
          _timerPausable;

      /**
       * Add an event as observable
       * @param evtStr Event name string
       * @param handler onNext() subscription function
       * @param onceOrContext optional, either the context to execute the hander or once bool
       * @param once will complete/dispose after one fire
       * @returns {*}
       */
      function subscribe(evtStr, handler, onceOrContext, once) {
        var handlerContext = window;

        //console.log('dispatcher subscribe', evtStr, handler, onceOrContext, once);

        if (is.falsey(evtStr)) {
          throw new Error('Fasley event string passed for handler', handler);
        }

        if (is.falsey(handler)) {
          throw new Error('Fasley handler passed for event string', evtStr);
        }

        if (onceOrContext || onceOrContext === false) {
          if (onceOrContext === true || onceOrContext === false) {
            once = onceOrContext;
          } else {
            handlerContext = onceOrContext;
          }
        }

        _subjectMap[evtStr] || (_subjectMap[evtStr] = []);

        var subject = new Rx.Subject();

        _subjectMap[evtStr].push({
          once    : once,
          priority: 0,
          handler : handler,
          context : handlerContext,
          subject : subject,
          type    : 0
        });

        return subject.subscribe(handler.bind(handlerContext));
      }

      /**
       * Initialize the event processing timer or resume a paused timer
       */
      function initTimer() {
        if (_timerObservable) {
          _timerPausable.onNext(true);
          return;
        }

        _timerPausable     = new Rx.Subject();
        _timerObservable   = Rx.Observable.interval(1).pausable(_timerPausable);
        _timerSubscription = _timerObservable.subscribe(processNextEvent);
      }

      /**
       * Shift next event to handle off of the queue and dispatch it
       */
      function processNextEvent() {
        var evt = _queue.shift();
        if (evt) {
          console.log('Procesing event: ',evt);
          dispatchToReceivers(evt);
          dispatchToSubscribers(evt);
        } else {
          _timerPausable.onNext(false);
        }
      }

      /**
       * Push event to the stack and begin execution
       * @param payloadObj type:String, payload:data
       * @param data
       */
      function publish(payloadObj) {
        _log.push(payloadObj);
        _queue.push(payloadObj);

        initTimer();
      }

      /**
       * Send the payload to all receivers
       * @param payload
       */
      function dispatchToReceivers(payload) {
        for (var id in _receiverMap) {
          _receiverMap[id].handler(payload);
        }
      }

      /**
       * Subscribers receive all payloads for a given event type while handlers are targeted
       * @param payload
       */
      function dispatchToSubscribers(payload) {
        var subscribers = _subjectMap[payload.type], i;
        if (!subscribers) {
          return;
        }

        i = subscribers.length;

        while (i--) {
          var subjObj = subscribers[i];
          if (subjObj.type === 0) {
            subjObj.subject.onNext(payload);
          }
          if (subjObj.once) {
            unsubscribe(payload.type, subjObj.handler);
          }
        }
      }

      /**
       * Remove a handler
       * @param evtStr
       * @param hander
       */
      function unsubscribe(evtStr, handler) {
        if (_subjectMap[evtStr] === undefined) {
          return;
        }

        var subscribers = _subjectMap[evtStr],
            handlerIdx  = -1;

        for (var i = 0, len = subscribers.length; i < len; i++) {
          if (subscribers[i].handler === handler) {
            handlerIdx     = i;
            subscribers[i].subject.onCompleted();
            subscribers[i].subject.dispose();
            subscribers[i] = null;
          }
        }

        if (handlerIdx === -1) {
          return;
        }

        subscribers.splice(handlerIdx, 1);

        if (subscribers.length === 0) {
          delete _subjectMap[evtStr];
        }
      }

      /**
       * Return a copy of the log array
       * @returns {Array.<T>}
       */
      function getLog() {
        return _log.slice(0);
      }


      /**
       * Simple receiver implementation based on Flux
       * Registered receivers will get every published event
       * https://github.com/facebook/flux/blob/master/src/Dispatcher.js
       *
       * Usage:
       *
       * _dispatcher.registerReceiver(function (payload) {
     *    console.log('receiving, ',payload);
     * });
       *
       * @param handler
       * @returns {string}
       */
      function registerReceiver(handler) {
        var id           = 'ID_' + _id++;
        _receiverMap[id] = {
          id     : id,
          handler: handler
        };
        return id;
      }


      /**
       * Remove a receiver handler
       * @param id
       */
      function unregisterReceiver(id) {
        if (_receiverMap.hasOwnProperty(id)) {
          delete _receiverMap[id];
        }
      }

      return {
        subscribe         : subscribe,
        unsubscribe       : unsubscribe,
        publish           : publish,
        getLog            : getLog,
        registerReceiver  : registerReceiver,
        unregisterReceiver: unregisterReceiver
      };

    };

    module.exports = Dispatcher();

  });