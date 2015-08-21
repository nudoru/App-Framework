define('nori/utils/Cookie',
  function (require, module, exports) {

    var Cookie = function () {

      function create(name, value, days) {
        var expires = "", date;
        if (days) {
          date    = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
      }

      function read(name) {
        var nameEQ = name + "=",
            ca     = document.cookie.split(';'),
            i, c;

        i = ca.length;
        while (i--) {
          c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }
        return null;
      }

      function remove(name) {
        create(name, '', -1);
      }

      return {
        create: create,
        read  : read,
        remove: remove
      };

    };

    module.exports = Cookie();

  });

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

        if (falsey(evtStr)) {
          throw new Error('Fasley event string passed for handler', handler);
        }

        if (falsey(handler)) {
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
          //console.log('Procesing event: ',evt);
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

define('nori/utils/Keyboard',
  function (require, module, exports) {

    /**
     * Maps keyboard presses to a handler function
     * Dependencies: RxJS
     *
     * TODO Implement modifiers
     *
     * Example
     var Keyboard = require('nori/utils/Keyboard'),
     kb = Keyboard();
     kb.initialize();
     kb.mapKey(['a','b'],function(key){
          console.log('Pressed: '+key);
          kb.unmapKey(['b']);
        });
     */

    var Keyboard = function () {

      var _callbackMap = {},
          _subscription,
          _keyCodes    = {
            'backspace'       : '8',
            'tab'             : '9',
            'enter'           : '13',
            'shift'           : '16',
            'ctrl'            : '17',
            'alt'             : '18',
            'pause_break'     : '19',
            'caps_lock'       : '20',
            'escape'          : '27',
            'page_up'         : '33',
            'page down'       : '34',
            'end'             : '35',
            'home'            : '36',
            'left'            : '37',
            'up'              : '38',
            'right'           : '39',
            'down'            : '40',
            'insert'          : '45',
            'delete'          : '46',
            '0'               : '48',
            '1'               : '49',
            '2'               : '50',
            '3'               : '51',
            '4'               : '52',
            '5'               : '53',
            '6'               : '54',
            '7'               : '55',
            '8'               : '56',
            '9'               : '57',
            'a'               : '65',
            'b'               : '66',
            'c'               : '67',
            'd'               : '68',
            'e'               : '69',
            'f'               : '70',
            'g'               : '71',
            'h'               : '72',
            'i'               : '73',
            'j'               : '74',
            'k'               : '75',
            'l'               : '76',
            'm'               : '77',
            'n'               : '78',
            'o'               : '79',
            'p'               : '80',
            'q'               : '81',
            'r'               : '82',
            's'               : '83',
            't'               : '84',
            'u'               : '85',
            'v'               : '86',
            'w'               : '87',
            'x'               : '88',
            'y'               : '89',
            'z'               : '90',
            'left_window key' : '91',
            'right_window key': '92',
            'select_key'      : '93',
            'numpad 0'        : '96',
            'numpad 1'        : '97',
            'numpad 2'        : '98',
            'numpad 3'        : '99',
            'numpad 4'        : '100',
            'numpad 5'        : '101',
            'numpad 6'        : '102',
            'numpad 7'        : '103',
            'numpad 8'        : '104',
            'numpad 9'        : '105',
            'multiply'        : '106',
            'add'             : '107',
            'subtract'        : '109',
            'decimal point'   : '110',
            'divide'          : '111',
            'f1'              : '112',
            'f2'              : '113',
            'f3'              : '114',
            'f4'              : '115',
            'f5'              : '116',
            'f6'              : '117',
            'f7'              : '118',
            'f8'              : '119',
            'f9'              : '120',
            'f10'             : '121',
            'f11'             : '122',
            'f12'             : '123',
            'num_lock'        : '144',
            'scroll_lock'     : '145',
            'semi_colon'      : '186',
            'equal_sign'      : '187',
            'comma'           : '188',
            'dash'            : '189',
            'period'          : '190',
            'forward_slash'   : '191',
            'grave_accent'    : '192',
            'open_bracket'    : '219',
            'backslash'       : '220',
            'closebracket'    : '221',
            'single_quote'    : '222'
          };

      /**
       * Initialize
       * @param context On which element to listen for key preses on
       * @param evt 'keydown' or 'keyup'
       */
      function initialize(context, evt) {

        context = context || document;
        evt     = evt || 'keydown';

        var source = Rx.Observable.fromEvent(context, evt);

        _subscription = source.map(function (evt) {
          return evt.keyCode;
        }).map(function (code) {
          return getKeyNameFromCode(code);
        }).subscribe(handleKeyDown);

      }

      /**
       * Returns the keymap
       * @returns {void|*}
       */
      function getKeyCodes() {
        return _.assign({}, _keyCodes);
      }

      /**
       * Determines if the key is present in the map
       * @param key
       * @returns {boolean}
       */
      function isValid(key) {
        return _keyCodes.hasOwnProperty(key);
      }

      /**
       * Maps a string key or array to callback function
       * @param key string or array
       * @param callback function to execute when pressed
       * @param context scope to execute
       */
      function mapKey(key, callback, context) {
        if (typeof key === 'string') {
          key = [key];
        }

        key.forEach(function (k) {
          addKeyCallBack(k, callback, context);
        });
      }

      function addKeyCallBack(key, callback, context) {
        if (isValid(key)) {
          context           = context || window;
          _callbackMap[key] = callback.bind(context);
        }
      }

      /**
       * Removes a mapping
       * @param key string or array
       */
      function unmapKey(key) {
        if (typeof key === 'string') {
          key = [key];
        }

        key.forEach(function (k) {
          removeKeyCallBack(k);
        });
      }

      function removeKeyCallBack(key) {
        delete _callbackMap[key];
      }

      /**
       * Execute the callback for a key
       * @param code
       */
      function handleKeyDown(code) {
        if (_callbackMap.hasOwnProperty(code)) {
          _callbackMap[code](code);
        }
      }

      /**
       * Gets the name for the key from the key map
       * @param code
       * @returns {*}
       */
      function getKeyNameFromCode(code) {
        for (var keyname in _keyCodes) {
          if (_keyCodes[keyname] === ('' + code)) {
            return keyname;
          }
        }
        return undefined;
      }

      return {
        initialize : initialize,
        getKeyCodes: getKeyCodes,
        mapKey     : mapKey,
        unmapKey   : unmapKey
      };

    };

    module.exports = Keyboard;

  });


define('nori/utils/MixinObservableSubject',

  function (require, module, exports) {

    var MixinObservableSubject = function () {
      //https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md
      var _subject = new Rx.BehaviorSubject();

      /**
       * Subscribe handler to updates
       * @param handler
       * @returns {*}
       */
      function subscribe(handler) {
        return _subject.subscribe(handler);
      }

      /**
       * Called from update or whatever function to dispatch to subscribers
       * @param payload
       */
      function notifySubscribers(payload) {
        _subject.onNext(payload);
      }

      /**
       * Gets the last payload that was dispatched to subscribers
       * @returns {*}
       */
      function getLastNotification() {
        return _subject.getValue();
      }

      return {
        subscribe          : subscribe,
        notifySubscribers  : notifySubscribers,
        getLastNotification: getLastNotification
      };

    };

    module.exports = MixinObservableSubject;

  });

define('nori/utils/Renderer',
  function (require, module, exports) {

    var Renderer = function () {
      var _noriEvents         = require('nori/events/EventCreator'),
          _noriEventConstants = require('nori/events/EventConstants'),
          _domUtils           = require('nudoru/browser/DOMUtils');

      function initialize() {
        Nori.dispatcher().subscribe(_noriEventConstants.RENDER_VIEW, render);
      }

      function render(payload) {
        var targetSelector = payload.payload.target,
            html           = payload.payload.html,
            domEl,
            mountPoint     = document.querySelector(targetSelector),
            cb             = payload.payload.callback;

        mountPoint.innerHTML = '';

        if (html) {
          domEl = _domUtils.HTMLStrToNode(html);
          mountPoint.appendChild(domEl);
        }

        // Send the created DOM element back to the caller
        if (cb) {
          cb(domEl);
        }

        _noriEvents.viewRendered(targetSelector, payload.payload.id);
      }

      return {
        initialize: initialize
      };

    };

    module.exports = Renderer();

  });

define('nori/utils/Router',
  function (require, module, exports) {

    var Router = function () {

      var _subject            = new Rx.Subject(),
          _objUtils           = require('nudoru/core/ObjectUtils'),
          _noriEventConstants = require('nori/events/EventConstants');

      /**
       * Set event handlers
       */
      function initialize() {
        window.addEventListener('hashchange', notifySubscribers, false);
        Nori.dispatcher().subscribe(_noriEventConstants.CHANGE_ROUTE, handleAppRouteChangeRequests);
      }

      /**
       * Handle application route change requests
       * @param payload
       */
      function handleAppRouteChangeRequests(payload) {
        set(payload.payload.route, payload.payload.data);
      }

      /**
       * subscribe a handler to the url change events
       * @param handler
       * @returns {*}
       */
      function subscribe(handler) {
        return _subject.subscribe(handler);
      }

      /**
       * Notify of a change in route
       * @param fromApp True if the route was caused by an app event not URL or history change
       */
      function notifySubscribers() {
        var eventPayload = {
          routeObj: getCurrentRoute(), // { route:, data: }
          fragment: getURLFragment()
        };

        _subject.onNext(eventPayload);
      }

      /**
       * Parses the route and query string from the current URL fragment
       * @returns {{route: string, query: {}}}
       */
      function getCurrentRoute() {
        var fragment    = getURLFragment(),
            parts       = fragment.split('?'),
            route       = '/' + parts[0],
            queryStr    = decodeURIComponent(parts[1]),
            queryStrObj = parseQueryStr(queryStr);

        if (queryStr === '=undefined') {
          queryStrObj = {};
        }

        return {route: route, data: queryStrObj};
      }

      /**
       * Parses a query string into key/value pairs
       * @param queryStr
       * @returns {{}}
       */
      function parseQueryStr(queryStr) {
        var obj   = {},
            parts = queryStr.split('&');

        parts.forEach(function (pairStr) {
          var pairArr     = pairStr.split('=');
          obj[pairArr[0]] = pairArr[1];
        });

        return obj;
      }

      /**
       * Combines a route and data object into a proper URL hash fragment
       * @param route
       * @param dataObj
       */
      function set(route, dataObj) {
        var path = route,
            data = [];
        if (!_objUtils.isNull(dataObj)) {
          path += "?";
          for (var prop in dataObj) {
            if (prop !== 'undefined' && dataObj.hasOwnProperty(prop)) {
              data.push(prop + '=' + encodeURIComponent(dataObj[prop]));
            }
          }
          path += data.join('&');
        }

        updateURLFragment(path);
      }

      /**
       * Returns everything after the 'whatever.html#' in the URL
       * Leading and trailing slashes are removed
       * @returns {string}
       */
      function getURLFragment() {
        var fragment = location.hash.slice(1);
        return fragment.toString().replace(/\/$/, '').replace(/^\//, '');
      }

      /**
       * Set the URL hash fragment
       * @param path
       */
      function updateURLFragment(path) {
        window.location.hash = path;
      }

      return {
        initialize       : initialize,
        subscribe        : subscribe,
        notifySubscribers: notifySubscribers,
        getCurrentRoute  : getCurrentRoute,
        set              : set
      };

    };

    module.exports = Router();

  });

define('nori/utils/Templating',
  function (require, module, exports) {

    var Templating = function () {

      var _templateMap = Object.create(null),
          _templateHTMLCache = Object.create(null),
          _templateCache     = Object.create(null),
          _DOMUtils          = require('nudoru/browser/DOMUtils');

      function addTemplate(id,html) {
        _templateMap[id] = html;
      }

      function getSourceFromTemplateMap(id) {
        var source = _templateMap[id];
        if(source) {
          return cleanTemplateHTML(source);
        }
        return;
      }

      function getSourceFromHTML(id) {
        var src = document.getElementById(id),
            srchtml;

        if (src) {
          srchtml = src.innerHTML;
        } else {
          console.warn('nudoru/core/Templating, template not found: "' + id + '"');
          srchtml = '<div>Template not found: '+id+'</div>';
        }

        return cleanTemplateHTML(srchtml);
      }

      /**
       * Get the template html from the script tag with id
       * @param id
       * @returns {*}
       */
      function getSource(id) {
        if (_templateHTMLCache[id]) {
          return _templateHTMLCache[id];
        }

        var sourcehtml = getSourceFromTemplateMap(id);

        if(!sourcehtml) {
          sourcehtml = getSourceFromHTML(id);
        }

        _templateHTMLCache[id] = sourcehtml;
        return sourcehtml;
      }

      /**
       * Returns all IDs belonging to text/template type script tags
       * @returns {Array}
       */
      function getAllTemplateIDs() {
        var scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'), 0);

        return scriptTags.filter(function (tag) {
          return tag.getAttribute('type') === 'text/template';
        }).map(function (tag) {
          return tag.getAttribute('id');
        });
      }

      /**
       * Returns an underscore template
       * @param id
       * @returns {*}
       */
      function getTemplate(id) {
        if (_templateCache[id]) {
          return _templateCache[id];
        }
        var templ          = _.template(getSource(id));
        _templateCache[id] = templ;
        return templ;
      }

      /**
       * Processes the template and returns HTML
       * @param id
       * @param obj
       * @returns {*}
       */
      function asHTML(id, obj) {
        var temp = getTemplate(id);
        return temp(obj);
      }

      /**
       * Processes the template and returns an HTML Element
       * @param id
       * @param obj
       * @returns {*}
       */
      function asElement(id, obj) {
        return _DOMUtils.HTMLStrToNode(asHTML(id, obj));
      }

      /**
       * Cleans template HTML
       */
      function cleanTemplateHTML(str) {
        return str.trim();
      }

      /**
       * Remove returns, spaces and tabs
       * @param str
       * @returns {XML|string}
       */
      function removeWhiteSpace(str) {
        return str.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/>\s+</g, '><');
      }

      /**
       * Iterate over all templates, clean them up and log
       * Util for SharePoint projects, <script> blocks aren't allowed
       * So this helps create the blocks for insertion in to the DOM
       */
      function processForDOMInsertion() {
        var ids = getAllTemplateIDs();
        ids.forEach(function (id) {
          var src = removeWhiteSpace(getSource(id));
          console.log(id, src);
        });
      }

      /**
       * Add a template script tag to the DOM
       * Util for SharePoint projects, <script> blocks aren't allowed
       * @param id
       * @param html
       */
      //function addClientSideTemplateToDOM(id, html) {
      //  var s       = document.createElement('script');
      //  s.type      = 'text/template';
      //  s.id        = id;
      //  s.innerHTML = html;
      //  document.getElementsByTagName('head')[0].appendChild(s);
      //}

      return {
        addTemplate           : addTemplate,
        getSource             : getSource,
        getAllTemplateIDs     : getAllTemplateIDs,
        processForDOMInsertion: processForDOMInsertion,
        getTemplate           : getTemplate,
        asHTML                : asHTML,
        asElement             : asElement
      };

    };

    module.exports = Templating();

  });


define('nori/events/EventConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      APP_WARNING            : null,
      APP_ERROR              : null,
      APP_INITIALIZED        : null,
      APP_MODEL_INITIALIZED  : null,
      APP_VIEW_INITIALIZED   : null,
      ALERT_USER             : null,
      WARN_USER              : null,
      NOTIFY_USER            : null,
      MODEL_DATA_WAITING     : null,
      MODEL_DATA_READY       : null,
      MODEL_DATA_CHANGED     : null,
      MODEL_DATA_SAVED       : null,
      MODEL_DATA_DESTROYED   : null,
      MODEL_STATE_CHANGED    : null,
      CHANGE_MODEL_STATE      : null,
      RESUME_FROM_MODEL_STATE: null,
      VIEW_INITIALIZED       : null,
      VIEW_RENDERED          : null,
      VIEW_CHANGED           : null,
      VIEW_CHANGE_TO_MOBILE  : null,
      VIEW_CHANGE_TO_DESKTOP : null,
      ROUTE_CHANGED          : null,
      CHANGE_ROUTE           : null,
      RENDER_VIEW            : null
    }));

  });

define('nori/events/EventCreator',
  function (require, module, exports) {

    var _noriEventConstants    = require('nori/events/EventConstants'),
        _browserEventConstants = require('nudoru/browser/EventConstants');

    var NoriEventCreator = {

      applicationWarning: function (message) {
        var evtObj = {
          type   : _noriEventConstants.APP_WARNING,
          error  : false,
          payload: {
            message: message
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      applicationError: function (message) {
        var evtObj = {
          type   : _noriEventConstants.APP_ERROR,
          error  : true,
          payload: new Error(message)
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      applicationInitialized: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.APP_INITIALIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      notifyUser: function (title, message, type) {
        var evtObj = {
          type   : _noriEventConstants.NOTIFY_USER,
          payload: {
            title  : title,
            message: message,
            type   : type || 'default'
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      alertUser: function (title, message, type) {
        var evtObj = {
          type   : _noriEventConstants.ALERT_USER,
          payload: {
            title  : title,
            message: message,
            type   : type || 'default'
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      warnUser: function (title, message, type) {
        var evtObj = {
          type   : _noriEventConstants.WARN_USER,
          payload: {
            title  : title,
            message: message,
            type   : type || 'danger'
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      applicationModelInitialized: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.APP_MODEL_INITIALIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      applicationViewInitialized: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.APP_VIEW_INITIALIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      urlHashChanged: function (payload) {
        var evtObj = {
          type   : _browserEventConstants.URL_HASH_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      changeRoute: function (route, data) {
        var evtObj = {
          type   : _noriEventConstants.CHANGE_ROUTE,
          payload: {
            route: route,
            data : data
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      routeChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.ROUTE_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      changeModelState: function (modelID, data) {
        var evtObj = {
          type   : _noriEventConstants.CHANGE_MODEL_STATE,
          payload: {
            id  : modelID,
            data: data
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      modelChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.MODEL_DATA_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      modelStateChanged: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.MODEL_STATE_CHANGED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      renderView: function (targetSelector, htmlStr, id, callback) {
        var evtObj = {
          type   : _noriEventConstants.RENDER_VIEW,
          payload: {
            target  : targetSelector,
            html    : htmlStr,
            id      : id,
            callback: callback
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewRendered: function (targetSelector, id) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_RENDERED,
          payload: {
            target: targetSelector,
            id    : id
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewChangedToMobile: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_CHANGE_TO_MOBILE,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      viewChangedToDesktop: function (payload) {
        var evtObj = {
          type   : _noriEventConstants.VIEW_CHANGE_TO_DESKTOP,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      browserScrolled: function (payload) {
        var evtObj = {
          type   : _browserEventConstants.BROWSER_SCROLLED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },

      browserResized: function (payload) {
        var evtObj = {
          type   : _browserEventConstants.BROWSER_RESIZED,
          payload: payload
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      },
    };

    module.exports = NoriEventCreator;

  });

define('nori/service/Rest',
  function (require, module, exports) {

    /**
     * Ajax requst using Promises
     * @param reqObj
     * @param success
     * @param error
     */
    var Rest = function () {

      function request(reqObj) {

        var xhr    = new XMLHttpRequest(),
            json   = reqObj.json || false,
            method = reqObj.method.toUpperCase() || 'GET',
            url    = reqObj.url,
            data   = reqObj.data || null;

        return new Rx.Observable.create(function makeReq(observer) {
          xhr.open(method, url, true);

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  if (json) {
                    observer.onNext(JSON.parse(xhr.responseText));
                  } else {
                    observer.onError(xhr.responseText);
                  }
                }
                catch (e) {
                  handleError('Result', 'Error parsing result. Status: ' + xhr.status + ', Response: ' + xhr.response);
                }
              } else {
                handleError(xhr.status, xhr.statusText);
              }
            }
          };

          xhr.onerror   = function () {
            handleError('Network error');
          };
          xhr.ontimeout = function () {
            handleError('Timeout');
          };
          xhr.onabort   = function () {
            handleError('About');
          };

          // set non json header? 'application/x-www-form-urlencoded; charset=UTF-8'
          if (json && method !== "GET") {
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          } else if (json && method === "GET") {
            //, text/*
            xhr.setRequestHeader("Accept", "application/json; odata=verbose");  // odata param for Sharepoint
          }

          xhr.send(data);

          function handleError(type, message) {
            message = message || '';
            observer.onError(type + ' ' + message);
          }
        });
      }

      return {
        request: request
      };

    };

    module.exports = Rest();

  });

define('nori/model/Map',
  function (require, module, exports) {

    var Map = function () {
      var _this,
          _id,
          _parentCollection,
          _dirty   = false,
          _entries = [],
          _map     = Object.create(null);

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      function initialize(initObj) {
        if (!initObj.id) {
          throw new Error('Model must be init\'d with an id');
        }

        _this = this;
        _id   = initObj.id;

        if (initObj.store) {
          _dirty = true;
          _map   = initObj.store;
        } else if (initObj.json) {
          setJSON(initObj.json);
        }

      }

      /**
       * Set map store from a JSON object
       * @param jstr
       */
      function setJSON(jstr) {
        _dirty = true;
        try {
          _map = JSON.parse(jstr);
        } catch (e) {
          throw new Error('MapCollection, error parsing JSON:', jstr, e);
        }
      }

      function getID() {
        return _id;
      }

      /**
       * Erase it
       */
      function clear() {
        _map   = {};
        _dirty = true;
      }

      function isDirty() {
        return _dirty;
      }

      function markClean() {
        _dirty = false;
      }

      /**
       * Set property or merge in new data
       * @param key String = name of property to set, Object = will merge new props
       * @param value String = value of property to set
       */
      function set(key, value) {

        if (typeof key === 'object') {
          _map = _.merge({}, _map, key);
        } else {
          _map[key] = value;
        }

        // Mark changed
        _dirty = true;

        dispatchChange('set_key');
      }

      /**
       * Assuming that _map[key] is an object, this will set a property on it
       * @param key
       * @param prop
       * @param data
       */
      function setKeyProp(key, prop, data) {
        _map[key][prop] = data;

        _dirty = true;
        dispatchChange('set_key');
      }

      /**
       * Returns a copy of the data
       * @returns *
       */
      function get(key) {
        var value = has(key) ? _map[key] : undefined;

        if (value) {
          value = _.cloneDeep(value);
        }

        return value;
      }

      /**
       * Assuming that _map[key] is an object, this will get value
       * @param key
       * @param prop
       * @returns {*}
       */
      function getKeyProp(key, prop) {
        var valueObj = has(key) ? _map[key] : undefined,
            value    = null;

        if (valueObj) {
          value = _.cloneDeep(valueObj[prop]);
        }

        return value;
      }

      /**
       * Returns true of the key is present in the map
       * @param key
       * @returns {boolean}
       */
      function has(key) {
        return _map.hasOwnProperty(key);
      }

      /**
       * Returns an array of the key/values. Results are cached and only regenerated
       * if changed (set)
       * @returns {Array}
       */
      function entries() {
        if (!_dirty && _entries) {
          return _entries;
        }

        var arry = [];
        for (var key in _map) {
          arry.push({key: key, value: _map[key]});
        }

        _entries = arry;
        _dirty   = false;

        return arry;
      }

      /**
       * Number of entries
       * @returns {Number}
       */
      function size() {
        return keys().length;
      }

      /**
       * Returns an array of all keys in the map
       * @returns {Array}
       */
      function keys() {
        return Object.keys(_map);
      }

      /**
       * Returns an array of all vaules in the map
       * @returns {Array}
       */
      function values() {
        return entries().map(function (entry) {
          return entry.value;
        });
      }

      /**
       * Remove a value
       * @param key
       */
      function remove(key) {
        delete _map[key];
      }

      /**
       * Returns matches to the predicate function
       * @param predicate
       * @returns {Array.<T>}
       */
      function filterValues(predicate) {
        return values().filter(predicate);
      }

      function first() {
        return entries()[0];
      }

      function last() {
        var e = entries();
        return e[e.length - 1];
      }

      function getAtIndex(i) {
        return entries()[i];
      }

      /**
       * Returns a copy of the data map
       * @returns {void|*}
       */
      function toObject() {
        return _.merge({}, _map);
      }

      /**
       * Return a new object by "translating" the properties of the map from one key to another
       * @param tObj {currentProp, newProp}
       */
      function transform(tObj) {
        var transformed = Object.create(null);

        for (var prop in tObj) {
          if (_map.hasOwnProperty(prop)) {
            transformed[tObj[prop]] = _map[prop];
          }
        }

        return transformed;
      }

      /**
       * On change, emit event globally
       */
      function dispatchChange(type) {
        var payload = {
          id     : _id,
          mapType: 'model'
        };

        _this.notifySubscribers(payload);

        if (_parentCollection.dispatchChange) {
          _parentCollection.dispatchChange({
            id: _id
          }, (type || 'map'));
        }

      }

      function toJSON() {
        return JSON.stringify(_map);
      }

      function setParentCollection(collection) {
        _parentCollection = collection;
      }

      function getParentCollection() {
        return _parentCollection;
      }

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initialize         : initialize,
        getID              : getID,
        clear              : clear,
        isDirty            : isDirty,
        markClean          : markClean,
        setJSON            : setJSON,
        set                : set,
        setKeyProp         : setKeyProp,
        get                : get,
        getKeyProp         : getKeyProp,
        has                : has,
        remove             : remove,
        keys               : keys,
        values             : values,
        entries            : entries,
        filterValues       : filterValues,
        size               : size,
        first              : first,
        last               : last,
        getAtIndex         : getAtIndex,
        toObject           : toObject,
        transform          : transform,
        toJSON             : toJSON,
        setParentCollection: setParentCollection,
        getParentCollection: getParentCollection
      };

    };

    module.exports = Map;

  });

define('nori/model/MapCollection',
  function (require, module, exports) {

    var MapCollection = function () {
      var _this,
          _id,
          _parentCollection,
          _caret    = 0,
          _children = [];

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      function initialize(initObj) {
        if (!initObj.id) {
          throw new Error('ModelCollection must be init\'d with an id');
        }

        _this = this;
        _id   = initObj.id;

        // TODO test
        if (initObj.models) {
          addMapsFromArray.call(_this, initObj.models);
        }
      }

      //----------------------------------------------------------------------------
      //  Iterator
      //----------------------------------------------------------------------------

      function next() {
        var ret = {};
        if (hasNext()) {
          ret = {value: _children[_caret++], done: !hasNext()};
        } else {
          ret = current();
        }

        return ret;
      }

      function current() {
        return {value: _children[_caret], done: !hasNext()};
      }

      function rewind() {
        _caret = 0;
        return _children[_caret];
      }

      function hasNext() {
        return _caret < _children.length;
      }

      //----------------------------------------------------------------------------
      //  Impl
      //----------------------------------------------------------------------------

      function isDirty() {
        var dirty = false;
        forEach(function checkDirty(map) {
          if (map.isDirty()) {
            dirty = true;
          }
        });
        return dirty;
      }

      function markClean() {
        forEach(function checkDirty(map) {
          map.markClean();
        });
      }

      /**
       * Add an array of Model instances
       * @param sArry
       */
      function addMapsFromArray(sArry) {
        sArry.forEach(function (store) {
          add(store);
        });
      }

      /**
       * Create an add child Model stores from an array of objects
       * @param array Array of objects
       * @param idKey Key on each object to use for the ID of that Model store
       */
      function addFromObjArray(oArry, idKey) {
        oArry.forEach(function (obj) {

          var id;

          if (obj.hasOwnProperty(idKey)) {
            id = obj[idKey];
          } else {
            id = _id + 'child' + _children.length;
          }

          add(Nori.model().createMap({id: id, store: obj}));
        });
        dispatchChange(_id, 'add_map');
      }

      function addFromJSONArray(json, idKey) {
        json.forEach(function (jstr) {

          var id, obj;

          try {
            obj = JSON.parse(jstr);
          } catch (e) {
            throw new Error('MapCollection, error parsing JSON:', jstr, e);
          }

          if (obj.hasOwnProperty(idKey)) {
            id = obj[idKey];
          } else {
            id = _id + 'child' + _children.length;
          }

          add(Nori.model().createMap({id: id, store: obj}));
        });
        dispatchChange(_id, 'add_map');
      }

      function getID() {
        return _id;
      }

      function add(store) {
        var currIdx = getMapIndex(store.getID());

        store.setParentCollection(_this);

        if (currIdx >= 0) {
          _children[currIdx] = store;
        } else {
          _children.push(store);
        }

        dispatchChange(_id, 'add_map');
      }

      /**
       * Remove a store from the collection
       * @param storeID
       */
      function remove(storeID) {
        var currIdx = getMapIndex(storeID);
        if (currIdx >= 0) {
          _children[currIdx].setParentCollection(null);
          _children[currIdx] = null;
          _children.splice(currIdx, 1);
          dispatchChange(_id, 'remove_map');
        } else {
          console.log(_id + ' remove, model not in collection: ' + storeID);
        }
      }

      /**
       * Remove all stores from the array
       */
      function removeAll() {
        _children.forEach(function (map) {
          map.setParentCollection(null);
        });

        _children = [];
        dispatchChange(_id, 'remove_map');
      }

      /**
       * Gets the Model by ID
       * @param storeID
       * @returns {T}
       */
      function getMap(storeID) {
        return _children.filter(function (store) {
          return store.getID() === storeID;
        })[0];
      }

      /**
       * Get the index in _children array by Model's ID
       * @param storeID
       * @returns {number}
       */
      function getMapIndex(storeID) {
        return _children.map(function (store) {
          return store.getID();
        }).indexOf(storeID);
      }

      /**
       * On change, emit event globally
       */
      function dispatchChange(data, type) {
        var payload = {
          id     : _id,
          type   : type || '',
          mapType: 'collection',
          mapID  : data.id
        };

        _this.notifySubscribers(payload);

        if (_parentCollection) {
          _parentCollection.dispatchChange({id: _id, store: getMap()});
        }
      }

      function hasMap(storeID) {
        return _children[storeID];
      }

      /**
       * Number of entries
       * @returns {Number}
       */
      function size() {
        return _children.length;
      }

      function first() {
        return _children[0];
      }

      function last() {
        return _children[_children.length - 1];
      }

      function atIndex(i) {
        return _children[i];
      }

      /**
       * Runs a predidate on each child map
       * @param predicate
       * @returns {Array.<T>}
       */
      function filter(predicate) {
        return _children.filter(predicate);
      }

      /**
       * Returns maps where the filter matches the prop / value pair
       * @param key
       * @param value
       * @returns {Array.<T>}
       */
      function filterByKey(key, value) {
        return _children.filter(function (map) {
          return map.get(key) === value;
        });
      }

      function forEach(func) {
        return _children.forEach(func);
      }

      function map(func) {
        return _children.map(func);
      }

      /**
       * Return an array of entries of each map
       * @returns {Array}
       */
      function entries() {
        var arry = [];
        _children.forEach(function (map) {
          arry.push(map.entries());
        });
        return arry;
      }

      function toJSON() {
        return JSON.stringify(_children);
      }

      function setParentCollection(collection) {
        _parentCollection = collection;
      }

      function getParentCollection() {
        return _parentCollection;
      }

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initialize         : initialize,
        current            : current,
        next               : next,
        hasNext            : hasNext,
        rewind             : rewind,
        getID              : getID,
        isDirty            : isDirty,
        markClean          : markClean,
        add                : add,
        addMapsFromArray   : addMapsFromArray,
        addFromObjArray    : addFromObjArray,
        addFromJSONArray   : addFromJSONArray,
        remove             : remove,
        removeAll          : removeAll,
        getMap             : getMap,
        hasMap             : hasMap,
        size               : size,
        first              : first,
        last               : last,
        atIndex            : atIndex,
        filter             : filter,
        filterByKey        : filterByKey,
        forEach            : forEach,
        map                : map,
        entries            : entries,
        toJSON             : toJSON,
        dispatchChange     : dispatchChange,
        setParentCollection: setParentCollection,
        getParentCollection: getParentCollection
      };
    };

    module.exports = MapCollection;


  });

define('nori/model/MixinMapFactory',
  function (require, module, exports) {

    var MixinMapFactory = function () {

      var _mapCollectionList = Object.create(null),
          _mapList           = Object.create(null),
          _mapCollectionFactory = require('nori/model/MapCollection'),
          _mapFactory = require('nori/model/Map'),
          _observableFactory = require('nori/utils/MixinObservableSubject');

      /**
       * Create a new model collection and initalize
       * @param initObj
       * @param extras
       * @returns {*}
       */
      function createMapCollection(initObj, extras) {
        var m = Nori.assignArray({}, [_mapCollectionFactory(), _observableFactory(), extras]);
        m.initialize(initObj);
        return m;
      }

      /**
       * Create a new model and initialize
       * @param initObj
       * @param extras
       * @returns {*}
       */
      function createMap(initObj, extras) {
        var m = Nori.assignArray({}, [_mapFactory(), _observableFactory(), extras]);
        m.initialize(initObj);
        return m;
      }

      /**
       * Get a model from the application collection
       * @param storeID
       * @returns {void|*}
       */
      function getMap(storeID) {
        return _mapList[storeID];
      }

      /**
       * Get a model collection from the application collection
       * @param storeID
       * @returns {void|*}
       */
      function getMapCollection(storeID) {
        return _mapCollectionList[storeID];
      }

      return {
        createMapCollection: createMapCollection,
        createMap          : createMap,
        getMap             : getMap,
        getMapCollection   : getMapCollection
      };

    };


    module.exports = MixinMapFactory();

  });

define('nori/model/MixinReducerModel',
  function (require, module, exports) {

    var MixinReducerModel = function () {
      var _this,
          _state,
          _stateReducers      = [],
          _simpleStoreFactory = require('nori/model/SimpleStore'),
          _noriEventConstants = require('nori/events/EventConstants');

      //----------------------------------------------------------------------------
      //  Accessors
      //----------------------------------------------------------------------------

      function getState() {
        return _state.getState();
      }

      function setState(state) {
        if (!_.isEqual(state, _state)) {
          _state.setState(state);
          _this.notifySubscribers({});
        }
      }

      function setReducers(reducerArray) {
        _stateReducers = reducerArray;
      }

      function addReducer(reducer) {
        _stateReducers.push(reducer);
      }

      //----------------------------------------------------------------------------
      //  Init
      //----------------------------------------------------------------------------

      /**
       * Set up event listener/receiver
       */
      function initializeReducerModel() {
        _this = this;
        _state = _simpleStoreFactory();

        Nori.dispatcher().registerReceiver(handleApplicationEvents);

        if (!_stateReducers) {
          throw new Error('ReducerModel, must set a reducer before initialization');
        }

        applyReducers({});
      }

      /**
       * Will receive "firehose" of all events that occur in the application. These
       * are sent to all reducers to update the state
       * @param eventObject
       */
      function handleApplicationEvents(eventObject) {
        //console.log('ReducerModel Event occurred: ', eventObject);
        if (eventObject.type === _noriEventConstants.MODEL_STATE_CHANGED || eventObject.type === _noriEventConstants.MODEL_DATA_CHANGED) {
          return;
        }
        applyReducers(eventObject);
      }

      function applyReducers(eventObject) {
        var nextState = applyReducersToState(getState(), eventObject);
        setState(nextState);
        _this.handleStateMutation();
      }

      /**
       * API hook to handle state updates
       */
      function handleStateMutation() {
        // override this
      }

      /**
       * Creates a new state from the combined reduces and event object
       * Model state isn't modified, current state is passed in and mutated state returned
       * @param state
       * @param event
       * @returns {*|{}}
       */
      function applyReducersToState(state, event) {
        state = state || {};
        _stateReducers.forEach(function applyStateReducerFunction(reducerFunc) {
          state = reducerFunc(state, event);
        });
        return state;
      }

      /**
       * Template reducer function
       * Model state isn't modified, current state is passed in and mutated state returned
       */
      //function templateReducerFunction(state, event) {
      //  state = state || {};
      //  switch (event.type) {
      //    case _noriEventConstants.MODEL_DATA_CHANGED:
      //      // can compose other reducers
      //      // return _.assign({}, state, otherStateTransformer(state));
      //      return _.assign({}, state, {prop: event.payload.value});
      //    default:
      //      return state;
      //  }
      //}

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeReducerModel : initializeReducerModel,
        getState               : getState,
        setState               : setState,
        handleApplicationEvents: handleApplicationEvents,
        setReducers            : setReducers,
        addReducer             : addReducer,
        applyReducers          : applyReducers,
        applyReducersToState   : applyReducersToState,
        handleStateMutation    : handleStateMutation
      };

    };

    module.exports = MixinReducerModel();

  });

define('nori/model/SimpleStore',
  function (require, module, exports) {

    var SimpleStore = function () {
      var _state   = Object.create(null),
          _subject = new Rx.Subject();

      /**
       * subscribe a handler for changes
       * @param handler
       * @returns {*}
       */
      function subscribe(handler) {
        return _subject.subscribe(handler);
      }

      /**
       * Return a copy of the state
       * @returns {void|*}
       */
      function getState() {
        return _.assign({}, _state);
      }

      /**
       * Sets the state
       * @param state
       */
      function setState(state) {
        _state = _.assign(_state, state);
        _subject.onNext();
      }

      return {
        subscribe: subscribe,
        getState : getState,
        setState : setState
      };

    };

    module.exports = SimpleStore;

  });

define('nori/view/ApplicationView',
  function (require, module, exports) {

    var ApplicationView = function () {

      var _this,
          _renderer = require('nori/utils/Renderer'),
          _domUtils = require('nudoru/browser/DOMUtils');

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      /**
       * Initialize
       * @param scaffoldTemplates template IDs to attached to the body for the app
       */
      function initializeApplicationView(scaffoldTemplates) {
        _this = this;
        _renderer.initialize();

        attachApplicationScaffolding(scaffoldTemplates);

        _this.initializeComponentViews();
        _this.initializeNudoruControls();
      }

      /**
       * Attach app HTML structure
       * @param templates
       */
      function attachApplicationScaffolding(templates) {
        if (!templates) {
          return;
        }

        var bodyEl = document.querySelector('body');

        templates.forEach(function (templ) {
          bodyEl.appendChild(_domUtils.HTMLStrToNode(_this.template().getSource('template__' + templ, {})));
        });
      }

      /**
       * After app initialization, remove the loading message
       */
      function removeLoadingMessage() {
        var cover   = document.querySelector('#initialization__cover'),
            message = document.querySelector('.initialization__message');

        TweenLite.to(cover, 1, {
          alpha: 0, ease: Quad.easeOut, onComplete: function () {
            cover.parentNode.removeChild(cover);
          }
        });

        TweenLite.to(message, 2, {
          top: "+=50px", ease: Quad.easeIn, onComplete: function () {
            cover.removeChild(message);
          }
        });
      }

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeApplicationView: initializeApplicationView,
        removeLoadingMessage     : removeLoadingMessage
      };

    };

    module.exports = ApplicationView();

  });

define('nori/view/MixinBrowserEvents',
  function (require, module, exports) {

    var MixinBrowserEvents = function () {

      var _currentViewPortSize,
          _currentViewPortScroll,
          _uiUpdateLayoutStream,
          _browserScrollStream,
          _browserResizeStream,
          _positionUIElementsOnChangeCB,
          _noriEvents = require('nori/events/EventCreator');

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      function initializeBrowserWindowEventStreams() {
        setCurrentViewPortSize();
        setCurrentViewPortScroll();
        configureUIStreams();
      }

      function setPositionUIElementsOnChangeCB(cb) {
        _positionUIElementsOnChangeCB = cb;
      }

      /**
       * Set up RxJS streams for events
       */
      function configureUIStreams() {
        var uiresizestream = Rx.Observable.fromEvent(window, 'resize'),
            uiscrollscream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll');

        // UI layout happens immediately, while resize and scroll is throttled
        _uiUpdateLayoutStream = Rx.Observable.merge(uiresizestream, uiscrollscream)
          .subscribe(function () {
            positionUIElementsOnChange();
          });

        _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
          .throttle(100)
          .subscribe(function () {
            handleViewPortResize();
          });

        _browserScrollStream = Rx.Observable.fromEvent(_mainScrollEl, 'scroll')
          .throttle(100)
          .subscribe(function () {
            handleViewPortScroll();
          });
      }

      function getMainScrollingView() {
        return _mainScrollEl;
      }

      function setMainScrollingView(elID) {
        _mainScrollEl = document.getElementById(elID);
      }

      //----------------------------------------------------------------------------
      //  Viewport and UI elements
      //----------------------------------------------------------------------------

      function handleViewPortResize() {
        _noriEvents.browserResized(_currentViewPortSize);
      }

      function handleViewPortScroll() {
        _noriEvents.browserScrolled(_currentViewPortScroll);
      }

      function getCurrentViewPortSize() {
        return _currentViewPortSize;
      }

      /**
       * Cache the current view port size in a var
       */
      function setCurrentViewPortSize() {
        _currentViewPortSize = {
          width : window.innerWidth,
          height: window.innerHeight
        };
      }

      function getCurrentViewPortScroll() {
        return _currentViewPortScroll;
      }

      /**
       * Cache the current view port scroll in a var
       */
      function setCurrentViewPortScroll() {
        var scrollEL = _mainScrollEl ? _mainScrollEl : document.body;

        var left = scrollEL.scrollLeft,
            top  = scrollEL.scrollTop;

        left = left ? left : 0;
        top  = top ? top : 0;

        _currentViewPortScroll = {left: left, top: top};
      }

      /**
       * Reposition the UI elements on a UI change, scroll, resize, etc.
       */
      function positionUIElementsOnChange() {
        setCurrentViewPortScroll();
        setCurrentViewPortSize();

        _positionUIElementsOnChangeCB.call(this, _currentViewPortSize, _currentViewPortScroll);
      }

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeBrowserWindowEventStreams: initializeBrowserWindowEventStreams,
        setPositionUIElementsOnChangeCB    : setPositionUIElementsOnChangeCB,
        getMainScrollingView               : getMainScrollingView,
        setMainScrollingView               : setMainScrollingView,
        getCurrentViewPortSize             : getCurrentViewPortSize,
        getCurrentViewPortScroll           : getCurrentViewPortScroll
      };

    };

    module.exports = MixinBrowserEvents();


  });

define('nori/view/MixinComponentViews',
  function (require, module, exports) {

    var MixinComponentViews = function () {

      var _routeViewMountPoint,
          _currentRouteViewID,
          _componentViewMap            = Object.create(null),
          _routeViewIDMap              = Object.create(null),
          _componentHTMLTemplatePrefix = 'template__',
          _template                    = require('nori/utils/Templating'),
          _noriEvents                  = require('nori/events/EventCreator');

      /**
       * Set up listeners
       */
      function initializeComponentViews() {
        Nori.router().subscribe(function onRouteChange(payload) {
          handleRouteChange(payload.routeObj);
        });
      }

      /**
       * Typically on app startup, show the view assigned to the current URL hash
       */
      function showViewFromURLHash() {
        showRouteViewComponent(Nori.getCurrentRoute().route);
        Nori.router().notifySubscribers();
      }

      /**
       * Show route from URL hash on change
       * @param routeObj
       */
      function handleRouteChange(routeObj) {
        showRouteViewComponent(routeObj.route);
      }

      /**
       * Set the location for the view to append, any contents will be removed prior
       * @param elID
       */
      function setRouteViewMountPoint(elID) {
        _routeViewMountPoint = elID;
      }

      /**
       * Return the template object
       * @returns {*}
       */
      function getTemplate() {
        return _template;
      }

      /**
       * Map a route to a module view controller
       * @param templateID
       * @param componentIDorObj
       * @param isRoute True | False
       */
      function mapViewComponent(templateID, componentIDorObj, isRoute, mountPoint) {
        _componentViewMap[templateID] = {
          htmlTemplate: _template.getTemplate(_componentHTMLTemplatePrefix + templateID),
          controller  : createComponentView(componentIDorObj),
          isRouteView : isRoute,
          mountPoint  : isRoute ? _routeViewMountPoint : mountPoint
        };
      }

      /**
       * Factory to create component view modules
       * @param moduleID
       * @returns {*}
       */
      function createComponentView(componentIDorObj) {
        var componentObj = componentIDorObj;
        if (typeof  componentIDorObj === 'string') {
          var componentFactory = require(componentIDorObj);
          componentObj         = componentFactory();
          //componentObj = require(componentIDorObj);
        }

        var componentViewFactory  = require('nori/view/ViewComponent'),
            eventDelegatorFactory = require('nori/view/MixinEventDelegator'),
            simpleStoreFactory    = require('nori/model/SimpleStore'),
            component             = Nori.assignArray({}, [
              componentViewFactory(),
              eventDelegatorFactory(),
              simpleStoreFactory(),
              componentObj
            ]);

        // Overwrite the initialize function to add parent init
        var oldInit = component.initialize,
            newInit = function initialize(initObj) {
              component.initializeComponent(initObj);
              oldInit.call(component, initObj);
            };

        component.initialize = newInit;

        return component;
      }

      /**
       * Map a route to a module view controller
       * @param templateID
       * @param componentIDorObj
       */
      function mapRouteToViewComponent(route, templateID, componentIDorObj) {
        _routeViewIDMap[route] = templateID;
        mapViewComponent(templateID, componentIDorObj, true, _routeViewMountPoint);
      }

      /**
       * Add a mixin for a mapped controller view
       * @param templateID
       * @param extras
       */
      function applyMixin(templateID, extras) {
        var componentView = _componentViewMap[templateID];

        if (!componentView) {
          throw new Error('No componentView mapped for id: ' + templateID);
        }

        componentView.controller = Nori.assignArray(componentView.controller, extras);
      }

      /**
       * Show a mapped componentView
       * @param componentID
       * @param dataObj
       */
      function showViewComponent(componentID) {
        var componentView = _componentViewMap[componentID];
        if (!componentView) {
          throw new Error('No componentView mapped for id: ' + componentID);
        }

        console.log('show view component: ',componentID);

        if (!componentView.controller.isInitialized()) {
          componentView.controller.initialize({
            id        : componentID,
            template  : componentView.htmlTemplate,
            mountPoint: componentView.mountPoint
          });
          componentView.controller.renderPipeline();
          componentView.controller.mount();
        } else {
          componentView.controller.update();
          componentView.controller.renderPipeline();
          componentView.controller.mount();
        }

      }

      /**
       * Show a view (in response to a route change)
       * @param route
       */
      function showRouteViewComponent(route) {
        var routeTemplateID = _routeViewIDMap[route];
        if (!routeTemplateID) {
          console.log("No view mapped for route: " + route);
          return;
        }

        unmountCurrentRouteView();
        _currentRouteViewID = routeTemplateID;

        showViewComponent(_currentRouteViewID);

        TweenLite.set(_routeViewMountPoint, {alpha: 0});
        TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease: Quad.easeIn});

        _noriEvents.viewChanged(_currentRouteViewID);
      }

      /**
       * Remove the currently displayed view
       */
      function unmountCurrentRouteView() {
        if (_currentRouteViewID) {
          _componentViewMap[_currentRouteViewID].controller.unmount();
        }
        _currentRouteViewID = '';
      }

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeComponentViews: initializeComponentViews,
        showViewFromURLHash     : showViewFromURLHash,
        setRouteViewMountPoint  : setRouteViewMountPoint,
        template                : getTemplate,
        mapViewComponent        : mapViewComponent,
        createComponentView     : createComponentView,
        showViewComponent       : showViewComponent,
        mapRouteToViewComponent : mapRouteToViewComponent,
        showRouteViewComponent  : showRouteViewComponent,
        applyMixin              : applyMixin,
      };

    };

    module.exports = MixinComponentViews();

  });

define('nori/view/MixinEventDelegator',
  function (require, module, exports) {

    var MixinEventDelegator = function () {

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

            mappings.forEach(function (evtMap) {
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

      return {
        setEvents       : setEvents,
        getEvents       : getEvents,
        undelegateEvents: undelegateEvents,
        delegateEvents  : delegateEvents
      };

    };

    module.exports = MixinEventDelegator;

  });

define('nori/view/MixinNudoruControls',
  function (require, module, exports) {

    var MixinNudoruControls = function () {

      var _notificationView  = require('nudoru/component/ToastView'),
          _toolTipView       = require('nudoru/component/ToolTipView'),
          _messageBoxView    = require('nudoru/component/MessageBoxView'),
          _messageBoxCreator = require('nudoru/component/MessageBoxCreator'),
          _modalCoverView    = require('nudoru/component/ModalCoverView');

      function initializeNudoruControls() {
        _toolTipView.initialize('tooltip__container');
        _notificationView.initialize('toast__container');
        _messageBoxView.initialize('messagebox__container');
        _modalCoverView.initialize();
      }

      function mbCreator() {
        return _messageBoxCreator;
      }

      function addMessageBox(obj) {
        return _messageBoxView.add(obj);
      }

      function removeMessageBox(id) {
        _messageBoxView.remove(id);
      }

      function alert(message, title) {
        return mbCreator().alert(title || 'Alert', message);
      }

      function addNotification(obj) {
        return _notificationView.add(obj);
      }

      function notify(message, title, type) {
        return addNotification({
          title  : title || '',
          type   : type || _notificationView.type().DEFAULT,
          message: message
        });
      }

      return {
        initializeNudoruControls: initializeNudoruControls,
        mbCreator               : mbCreator,
        addMessageBox           : addMessageBox,
        removeMessageBox        : removeMessageBox,
        addNotification         : addNotification,
        alert                   : alert,
        notify                  : notify
      };

    };

    module.exports = MixinNudoruControls();

  });

define('nori/view/ViewComponent',
  function (require, module, exports) {

    var ViewComponent = function () {

      var _isInitialized = false,
          _configProps,
          _id,
          _templateObj,
          _html,
          _DOMNode,
          _mountPoint,
          _children      = [],
          _isMounted     = false,
          _noriEvents    = require('nori/events/EventCreator');

      /**
       * Initialization
       * @param configProps
       */
      function initializeComponent(configProps) {
        _configProps = configProps;
        _id          = configProps.id;
        _templateObj = configProps.template;
        _mountPoint  = configProps.mountPoint;

        this.setState(this.getInitialState());

        _isInitialized = true;
      }

      /**
       * Bind updates to the map ID to this view's update
       * @param mapIDorObj Object to subscribe to or ID. Should implement nori/model/MixinObservableModel
       */
      function bindMap(mapIDorObj) {
        var map;

        if (isObject(mapIDorObj)) {
          map = mapIDorObj;
        } else {
          map = Nori.model().getMap(mapIDorObj) || Nori.model().getMapCollection(mapIDorObj);
        }

        if (!map) {
          throw new Error('ViewComponent bindMap, map or mapcollection not found: ' + mapIDorObj);
        }

        if (!isFunction(map.subscribe)) {
          throw new Error('ViewComponent bindMap, map or mapcollection must be observable: ' + mapIDorObj);
        }

        map.subscribe(this.update.bind(this));
      }

      /**
       * Add a child
       * @param child
       */
      function addChild(child) {
        _children.push(child);
      }

      /**
       * Remove a child
       * @param child
       */
      function removeChild(child) {
        var idx = _children.indexOf(child);
        _children[idx].dispose();
        _children.splice(idx, 1);
      }

      /**
       * Before the wiew updates and a rerender occurs
       */
      function componentWillUpdate() {
        return undefined;
      }

      function update() {
        this.componentUpdate();
      }

      /**
       * Update state and rerender
       * @param dataObj
       * @returns {*}
       */
      function componentUpdate() {
        // make a copy of last state
        var currentState = this.getState();
        var nextState = this.componentWillUpdate();

        if (this.shouldComponentUpdate(nextState)) {
          this.setState(nextState);
          _children.forEach(function updateChild(child) {
            child.update();
          });

          if (_isMounted) {
            if (this.shouldComponentRender(currentState)) {
              this.unmount();
              this.renderPipeline();
              this.mount();
            }
          }

          this.componentDidUpdate();
        }
      }

      function shouldComponentUpdate(nextState) {
        return existy(nextState);
      }

      /**
       * Determine if the view should rerender on update
       * @returns {boolean}
       */
      function shouldComponentRender(beforeUpdateState) {
        return !_.isEqual(beforeUpdateState, this.getState());
      }

      /**
       * After the view updates and a rerender occurred
       */
      function componentDidUpdate() {
        // stub
      }

      function componentWillRender() {
        // stub
      }

      function renderPipeline() {
        this.componentRender();
      }

      function render() {
        return _templateObj(this.getState());
      }

      /**
       * Render it, need to add it to a parent container, handled in higher level view
       * @returns {*}
       */
      function componentRender() {
        if (this.componentWillRender) {
          this.componentWillRender();
        }

        _children.forEach(function renderChild(child) {
          child.renderPipeline();
        });

        _html = this.render();

        if (this.componentDidRender) {
          this.componentDidRender();
        }
      }

      function componentDidRender() {
        // stub
      }

      /**
       * Call before it's been added to a view
       */
      function componentWillMount() {
        // stub
      }

      /**
       * Append it to a parent element
       * @param mountEl
       */
      function mount() {
        if (!_html) {
          throw new Error('Component ' + _id + ' cannot mount with no HTML. Call render() first?');
        }

        if (this.componentWillMount) {
          this.componentWillMount();
        }

        _isMounted = true;

        // Go out to the standard render function. DOM element is returned in callback
        _noriEvents.renderView(_mountPoint, _html, _id, onViewRendered.bind(this));
      }

      /**
       * Handler for the renderer module
       * @param domEl
       */
      function onViewRendered(domEl) {
        setDOMNode(domEl);
        // from the ViewMixinEventDelegator
        if (this.delegateEvents) {
          this.delegateEvents();
        }

        if (this.componentDidMount) {
          this.componentDidMount();
        }
      }

      /**
       * Call after it's been added to a view
       */
      function componentDidMount() {
        // stub
      }

      /**
       * Call when unloading and switching views
       */
      function componentWillUnmount() {
        // stub
      }

      function unmount() {
        this.componentWillUnmount();
        _isMounted = false;
        _noriEvents.renderView(_mountPoint, '', _id);

        // from the ViewMixinEventDelegator
        if (this.undelegateEvents) {
          this.undelegateEvents();
        }

        setDOMNode(null);
        this.componentDidUnmount();
      }

      function componentDidUnmount() {
        // stub
      }

      /**
       * Remove a view and cleanup
       */
      function dispose() {
        this.unmount();
      }

      //----------------------------------------------------------------------------
      //  Accessors
      //----------------------------------------------------------------------------

      function isInitialized() {
        return _isInitialized;
      }

      function getConfigProps() {
        return _configProps;
      }

      function isMounted() {
        return _isMounted;
      }

      function getInitialState() {
        this.setState({});
      }

      function getID() {
        return _id;
      }

      function getTemplate() {
        return _templateObj;
      }

      function setTemplate(html) {
        _templateObj = _.template(html);
      }

      function getDOMNode() {
        return _DOMNode;
      }

      function setDOMNode(el) {
        _DOMNode = el;
      }

      function getHTML() {
        return _html;
      }

      function setHTML(str) {
        _html = str;
      }

      function getChildren() {
        return _children.slice(0);
      }


      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeComponent: initializeComponent,

        isInitialized  : isInitialized,
        getConfigProps : getConfigProps,
        getInitialState: getInitialState,
        getID          : getID,
        getTemplate    : getTemplate,
        setTemplate    : setTemplate,
        getHTML        : getHTML,
        setHTML        : setHTML,
        getDOMNode     : getDOMNode,
        setDOMNode     : setDOMNode,
        isMounted      : isMounted,

        bindMap              : bindMap,
        componentWillUpdate  : componentWillUpdate,
        shouldComponentUpdate: shouldComponentUpdate,
        componentUpdate      : componentUpdate,
        update               : update,
        componentDidUpdate   : componentDidUpdate,

        shouldComponentRender: shouldComponentRender,
        componentWillRender  : componentWillRender,
        renderPipeline       : renderPipeline,
        componentRender      : componentRender,
        render               : render,
        componentDidRender   : componentDidRender,

        componentWillMount: componentWillMount,
        mount             : mount,
        componentDidMount : componentDidMount,

        componentWillUnmount: componentWillUnmount,
        unmount             : unmount,
        componentDidUnmount : componentDidUnmount,

        addChild   : addChild,
        removeChild: removeChild,
        getChildren: getChildren
      };

    };

    module.exports = ViewComponent;

  });

var Nori = (function () {

  var _model,
      _view,
      _dispatcher = require('nori/utils/Dispatcher'),
      _router     = require('nori/utils/Router');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getDispatcher() {
    return _dispatcher;
  }

  function getRouter() {
    return _router;
  }

  function getModel() {
    return _model;
  }

  function getView() {
    return _view;
  }

  function getConfig() {
    return _.assign({}, (window.APP_CONFIG_DATA || {}));
  }

  function getCurrentRoute() {
    return _router.getCurrentRoute();
  }

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  /**
   * Init the app and inject the model and view
   * @param initObj view, model
   */
  function initializeApplication(initObj) {
    _router.initialize();

    console.log('Initializing Nori, model? '+(_model ? 'Yes' : 'No')+', view? '+(_view ? 'Yes' : 'No'));

    _view  = _view || createApplicationView({});
    _model = _model || createApplicationModel({});
  }

  //----------------------------------------------------------------------------
  //  Factories - concatenative inheritance, decorators
  //----------------------------------------------------------------------------

  /**
   * Merges a collection of objects
   * @param target
   * @param sourceArray
   * @returns {*}
   */
  function assignArray(target, sourceArray) {
    sourceArray.forEach(function (source) {
      target = _.assign(target, source);
    });
    return target;
  }

  /**
   * Create a new Nori application instance
   * @param custom
   * @returns {*}
   */
  function createApplication(custom) {
    return assignArray({}, [
      this,
      custom
    ]);
  }

  /**
   * Creates main application model
   * @param custom
   * @returns {*}
   */
  function createApplicationModel(custom) {
    var observable = require('nori/utils/MixinObservableSubject');

    _model = assignArray({}, [
      require('nori/model/MixinMapFactory'),
      observable(),
      require('nori/model/MixinReducerModel'),
      custom
    ]);

    return _model;
  }

  /**
   * Creates main application view
   * @param custom
   * @returns {*}
   */
  function createApplicationView(custom) {
    var eventDelegator = require('nori/view/MixinEventDelegator');

    _view = assignArray({}, [
      require('nori/view/ApplicationView'),
      require('nori/view/MixinNudoruControls'),
      require('nori/view/MixinComponentViews'),
      eventDelegator(),
      custom
    ]);

    return _view;
  }

  //----------------------------------------------------------------------------
  // Functional utils from Mithril
  //  https://github.com/lhorie/mithril.js/blob/next/mithril.js
  //----------------------------------------------------------------------------

  // http://mithril.js.org/mithril.prop.html
  function prop(store) {
    //if (isFunction(store.then)) {
    //  // handle a promise
    //}
    var gettersetter = function () {
      if (arguments.length) {
        store = arguments[0];
      }
      return store;
    };

    gettersetter.toJSON = function () {
      return store;
    };

    return gettersetter;
  }

  // http://mithril.js.org/mithril.withAttr.html
  function withAttr(prop, callback, context) {
    return function (e) {
      e = e || event;

      var currentTarget = e.currentTarget || this,
          cntx          = context || this;

      callback.call(cntx, prop in currentTarget ? currentTarget[prop] : currentTarget.getAttribute(prop));
    };
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeApplication : initializeApplication,
    config                : getConfig,
    dispatcher            : getDispatcher,
    router                : getRouter,
    model                 : getModel,
    view                  : getView,
    createApplication     : createApplication,
    createApplicationModel: createApplicationModel,
    createApplicationView : createApplicationView,
    getCurrentRoute       : getCurrentRoute,
    assignArray           : assignArray,
    prop                  : prop,
    withAttr              : withAttr
  };

}());


