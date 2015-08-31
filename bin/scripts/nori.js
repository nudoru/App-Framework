"use strict";

ndefine('nori/utils/Cookie', function (nrequire, module, exports) {

  var Cookie = function Cookie() {

    function create(name, value, days) {
      var expires = "",
          date;
      if (days) {
        date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toGMTString();
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }

    function read(name) {
      var nameEQ = name + "=",
          ca = document.cookie.split(';'),
          i,
          c;

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
      read: read,
      remove: remove
    };
  };

  module.exports = Cookie();
});

/*
 Matt Perkins, 6/12/15

 publish payload object

 {
 type: EVT_TYPE,
 payload: {
 key: value
 }
 }

 */

'use strict';

ndefine('nori/utils/Dispatcher', function (nrequire, module, exports) {

  var Dispatcher = function Dispatcher() {

    var _subjectMap = {},
        _receiverMap = {},
        _id = 0,
        _log = [],
        _queue = [],
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
        console.warn('Dispatcher: Fasley event string passed for handler', handler);
      }

      if (is.falsey(handler)) {
        console.warn('Dispatcher: Fasley handler passed for event string', evtStr);
      }

      if (onceOrContext || onceOrContext === false) {
        if (onceOrContext === true || onceOrContext === false) {
          once = onceOrContext;
        } else {
          handlerContext = onceOrContext;
        }
      }

      if (!_subjectMap[evtStr]) {
        _subjectMap[evtStr] = [];
      }

      var subject = new Rx.Subject();

      _subjectMap[evtStr].push({
        once: once,
        priority: 0,
        handler: handler,
        context: handlerContext,
        subject: subject,
        type: 0
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

      _timerPausable = new Rx.Subject();
      _timerObservable = Rx.Observable.interval(1).pausable(_timerPausable);
      _timerSubscription = _timerObservable.subscribe(processNextEvent);
    }

    /**
     * Shift next event to handle off of the queue and dispatch it
     */
    function processNextEvent() {
      var evt = _queue.shift();
      if (evt) {
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
      var subscribers = _subjectMap[payload.type],
          i;
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
          handlerIdx = -1;

      for (var i = 0, len = subscribers.length; i < len; i++) {
        if (subscribers[i].handler === handler) {
          handlerIdx = i;
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
      var id = 'ID_' + _id++;
      _receiverMap[id] = {
        id: id,
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
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      publish: publish,
      getLog: getLog,
      registerReceiver: registerReceiver,
      unregisterReceiver: unregisterReceiver
    };
  };

  module.exports = Dispatcher();
});

'use strict';

ndefine('nori/utils/Keyboard', function (nrequire, module, exports) {

  /**
   * Maps keyboard presses to a handler function
   * Dependencies: RxJS
   *
   * TODO Implement modifiers
   *
   * Example
   var Keyboard = nrequire('nori/utils/Keyboard'),
   kb = Keyboard();
   kb.initialize();
   kb.mapKey(['a','b'],function(key){
        console.log('Pressed: '+key);
        kb.unmapKey(['b']);
      });
   */

  var Keyboard = function Keyboard() {

    var _callbackMap = {},
        _subscription,
        _keyCodes = {
      'backspace': '8',
      'tab': '9',
      'enter': '13',
      'shift': '16',
      'ctrl': '17',
      'alt': '18',
      'pause_break': '19',
      'caps_lock': '20',
      'escape': '27',
      'page_up': '33',
      'page down': '34',
      'end': '35',
      'home': '36',
      'left': '37',
      'up': '38',
      'right': '39',
      'down': '40',
      'insert': '45',
      'delete': '46',
      '0': '48',
      '1': '49',
      '2': '50',
      '3': '51',
      '4': '52',
      '5': '53',
      '6': '54',
      '7': '55',
      '8': '56',
      '9': '57',
      'a': '65',
      'b': '66',
      'c': '67',
      'd': '68',
      'e': '69',
      'f': '70',
      'g': '71',
      'h': '72',
      'i': '73',
      'j': '74',
      'k': '75',
      'l': '76',
      'm': '77',
      'n': '78',
      'o': '79',
      'p': '80',
      'q': '81',
      'r': '82',
      's': '83',
      't': '84',
      'u': '85',
      'v': '86',
      'w': '87',
      'x': '88',
      'y': '89',
      'z': '90',
      'left_window key': '91',
      'right_window key': '92',
      'select_key': '93',
      'numpad 0': '96',
      'numpad 1': '97',
      'numpad 2': '98',
      'numpad 3': '99',
      'numpad 4': '100',
      'numpad 5': '101',
      'numpad 6': '102',
      'numpad 7': '103',
      'numpad 8': '104',
      'numpad 9': '105',
      'multiply': '106',
      'add': '107',
      'subtract': '109',
      'decimal point': '110',
      'divide': '111',
      'f1': '112',
      'f2': '113',
      'f3': '114',
      'f4': '115',
      'f5': '116',
      'f6': '117',
      'f7': '118',
      'f8': '119',
      'f9': '120',
      'f10': '121',
      'f11': '122',
      'f12': '123',
      'num_lock': '144',
      'scroll_lock': '145',
      'semi_colon': '186',
      'equal_sign': '187',
      'comma': '188',
      'dash': '189',
      'period': '190',
      'forward_slash': '191',
      'grave_accent': '192',
      'open_bracket': '219',
      'backslash': '220',
      'closebracket': '221',
      'single_quote': '222'
    };

    /**
     * Initialize
     * @param context On which element to listen for key preses on
     * @param evt 'keydown' or 'keyup'
     */
    function initialize(context, evt) {

      context = context || document;
      evt = evt || 'keydown';

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
        context = context || window;
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
        if (_keyCodes[keyname] === '' + code) {
          return keyname;
        }
      }
      return undefined;
    }

    function dispose() {
      _callbackMap = undefined;
      _subscription.dispose();
    }

    return {
      initialize: initialize,
      getKeyCodes: getKeyCodes,
      mapKey: mapKey,
      unmapKey: unmapKey,
      dispose: dispose
    };
  };

  module.exports = Keyboard;
});

/**
 * Add RxJS Subject to a module.
 *
 * Add one simple observable subject or more complex ability to create others for
 * more complex eventing needs.
 */

'use strict';

ndefine('nori/utils/MixinObservableSubject', function (nrequire, module, exports) {

  var MixinObservableSubject = function MixinObservableSubject() {

    var _subject = new Rx.Subject(),
        _subjectMap = {};

    /**
     * Create a new subject
     * @param name
     * @returns {*}
     */
    function createSubject(name) {
      if (!_subjectMap.hasOwnProperty(name)) {
        _subjectMap[name] = new Rx.Subject();
      }
      return _subjectMap[name];
    }

    /**
     * Subscribe handler to updates. If the handler is a string, the new subject
     * will be created.
     * @param handler
     * @returns {*}
     */
    function subscribe(handlerOrName, optHandler) {
      if (is.string(handlerOrName)) {
        return createSubject(handlerOrName).subscribe(optHandler);
      } else {
        return _subject.subscribe(handlerOrName);
      }
    }

    /**
     * Dispatch updated to subscribers
     * @param payload
     */
    function notifySubscribers(payload) {
      _subject.onNext(payload);
    }

    /**
     * Dispatch updated to named subscribers
     * @param name
     * @param payload
     */
    function notifySubscribersOf(name, payload) {
      if (_subjectMap.hasOwnProperty(name)) {
        _subjectMap[name].onNext(payload);
      } else {
        console.warn('MixinObservableSubject, no subscribers of ' + name);
      }
    }

    return {
      subscribe: subscribe,
      createSubject: createSubject,
      notifySubscribers: notifySubscribers,
      notifySubscribersOf: notifySubscribersOf
    };
  };

  module.exports = MixinObservableSubject;
});

/**
 * Utility to handle all view DOM attachment tasks
 */

'use strict';

ndefine('nori/utils/Renderer', function (nrequire, module, exports) {

  var Renderer = function Renderer() {
    var _domUtils = nrequire('nudoru/browser/DOMUtils');

    function render(payload) {
      var targetSelector = payload.target,
          html = payload.html,
          domEl,
          mountPoint = document.querySelector(targetSelector),
          cb = payload.callback;

      mountPoint.innerHTML = '';

      if (html) {
        domEl = _domUtils.HTMLStrToNode(html);
        mountPoint.appendChild(domEl);
      }

      if (cb) {
        cb(domEl);
      }

      return domEl;
    }

    return {
      render: render
    };
  };

  module.exports = Renderer();
});

/**
 * Simple router
 * Supporting IE9 so using hashes instead of the history API for now
 */

'use strict';

ndefine('nori/utils/Router', function (nrequire, module, exports) {

  var Router = function Router() {

    var _subject = new Rx.Subject(),
        _hashChangeObservable,
        _objUtils = nrequire('nudoru/core/ObjectUtils');

    /**
     * Set event handlers
     */
    function initialize() {
      _hashChangeObservable = Rx.Observable.fromEvent(window, 'hashchange').subscribe(notifySubscribers);
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
      var fragment = getURLFragment(),
          parts = fragment.split('?'),
          route = '/' + parts[0],
          queryStr = decodeURIComponent(parts[1]),
          queryStrObj = parseQueryStr(queryStr);

      if (queryStr === '=undefined') {
        queryStrObj = {};
      }

      return { route: route, data: queryStrObj };
    }

    /**
     * Parses a query string into key/value pairs
     * @param queryStr
     * @returns {{}}
     */
    function parseQueryStr(queryStr) {
      var obj = {},
          parts = queryStr.split('&');

      parts.forEach(function (pairStr) {
        var pairArr = pairStr.split('=');
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
      initialize: initialize,
      subscribe: subscribe,
      notifySubscribers: notifySubscribers,
      getCurrentRoute: getCurrentRoute,
      set: set
    };
  };

  var r = Router();
  r.initialize();

  module.exports = r;
});

'use strict';

ndefine('nori/utils/Rx', function (nrequire, module, exports) {

  module.exports = {
    dom: function dom(selector, event) {
      var el = document.querySelector(selector);
      if (!el) {
        console.warn('nori/utils/Rx, dom, invalid DOM selector: ' + selector);
        return;
      }
      return Rx.Observable.fromEvent(el, event.trim());
    },

    from: function from(ittr) {
      return Rx.Observable.from(ittr);
    },

    interval: function interval(ms) {
      return Rx.Observable.interval(ms);
    },

    doEvery: function doEvery(ms, handler) {
      return this.interval(ms).subscribe(handler);
    },

    just: function just(value) {
      return Rx.Observable.just(value);
    },

    empty: function empty() {
      return Rx.Observable.empty();
    }

  };
});

/*
 Simple wrapper for Underscore / HTML templates
 Matt Perkins
 4/7/15
 */
'use strict';

ndefine('nori/utils/Templating', function (nrequire, module, exports) {

  var Templating = function Templating() {

    var _templateMap = Object.create(null),
        _templateHTMLCache = Object.create(null),
        _templateCache = Object.create(null),
        _DOMUtils = nrequire('nudoru/browser/DOMUtils');

    function addTemplate(id, html) {
      _templateMap[id] = html;
    }

    function getSourceFromTemplateMap(id) {
      var source = _templateMap[id];
      if (source) {
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
        srchtml = '<div>Template not found: ' + id + '</div>';
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

      if (!sourcehtml) {
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
      var templ = _.template(getSource(id));
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
      addTemplate: addTemplate,
      getSource: getSource,
      getAllTemplateIDs: getAllTemplateIDs,
      processForDOMInsertion: processForDOMInsertion,
      getTemplate: getTemplate,
      asHTML: asHTML,
      asElement: asElement
    };
  };

  module.exports = Templating();
});

'use strict';

ndefine('nori/action/ActionConstants', function (nrequire, module, exports) {
  var objUtils = nrequire('nudoru/core/ObjectUtils');

  _.merge(module.exports, objUtils.keyMirror({
    CHANGE_STORE_STATE: null
  }));
});

/**
 * Action Creator
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */

'use strict';

ndefine('nori/action/ActionCreator', function (nrequire, module, exports) {

  var _noriActionConstants = nrequire('nori/action/ActionConstants');

  var NoriActionCreator = {

    changeStoreState: function changeStoreState(data, id) {
      var action = {
        type: _noriActionConstants.CHANGE_STORE_STATE,
        payload: {
          id: id,
          data: data
        }
      };

      return action;
    }

  };

  module.exports = NoriActionCreator;
});

/**
 * Ajax / Rest module.
 * Returns an RxJS Obervable
 *
 * Usage:
 *
 var request = nrequire('nori/service/Rest');

 var getSub = request.request({
        method: 'GET',
        url   : '/items',
        json  : true
      }).subscribe(
 function success(data) {
          console.log('ok', data);
        },
 function error(data) {
          console.log('err', data);
        });

 var postSub = request.request({
        method: 'POST',
        url   : '/items',
        data  : JSON.stringify({key: 'value'}),
        json  : true
      }).subscribe(
 function success(data) {
          console.log('ok', data);
        },
 function error(data) {
          console.log('err', data);
        });

 var putSub = request.request({
        method: 'PUT',
        url   : '/items/42',
        data  : JSON.stringify({key: 'value'}),
        json  : true
      }).subscribe(
 function success(data) {
          console.log('ok', data);
        },
 function error(data) {
          console.log('err', data);
        });

 var delSub = request.request({
        method: 'DELETE',
        url   : '/items/42',
        json  : true
      }).subscribe(
 function success(data) {
          console.log('ok', data);
        },
 function error(data) {
          console.log('err', data);
        });
 *
 */

'use strict';

ndefine('nori/service/Rest', function (nrequire, module, exports) {

  /**
   * Ajax requst using Promises
   * @param reqObj
   * @param success
   * @param error
   */
  var Rest = function Rest() {

    function request(reqObj) {

      var xhr = new XMLHttpRequest(),
          json = reqObj.json || false,
          method = reqObj.method.toUpperCase() || 'GET',
          url = reqObj.url,
          data = reqObj.data || null;

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
              } catch (e) {
                handleError('Result', 'Error parsing result. Status: ' + xhr.status + ', Response: ' + xhr.response);
              }
            } else {
              handleError(xhr.status, xhr.statusText);
            }
          }
        };

        xhr.onerror = function () {
          handleError('Network error');
        };
        xhr.ontimeout = function () {
          handleError('Timeout');
        };
        xhr.onabort = function () {
          handleError('About');
        };

        // set non json header? 'application/x-www-form-urlencoded; charset=UTF-8'
        if (json && method !== "GET") {
          xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        } else if (json && method === "GET") {
          //, text/*
          xhr.setRequestHeader("Accept", "application/json; odata=verbose"); // odata param for Sharepoint
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

'use strict';

ndefine('nori/service/SocketIO', function (nrequire, module, exports) {

  var SocketIOConnector = function SocketIOConnector() {

    var _subject = new Rx.BehaviorSubject(),
        _socketIO = io(),
        _events = {
      PING: 'ping',
      PONG: 'pong',
      NOTIFY_CLIENT: 'notify_client',
      NOTIFY_SERVER: 'notify_server',
      CONNECT: 'connect',
      DROPPED: 'dropped',
      USER_CONNECTED: 'user_connected',
      USER_DISCONNECTED: 'user_disconnected',
      EMIT: 'emit',
      BROADCAST: 'broadcast',
      SYSTEM_MESSAGE: 'system_message',
      MESSAGE: 'message',
      CREATE_ROOM: 'create_room',
      JOIN_ROOM: 'join_room',
      LEAVE_ROOM: 'leave_room'
    };

    function initialize() {
      _socketIO.on(_events.NOTIFY_CLIENT, onNotifyClient);
    }

    /**
     * All notifications from Socket.io come here
     * @param payload {type, id, time, payload}
     */
    function onNotifyClient(payload) {
      if (payload.type === _events.PING) {
        notifyServer(_events.PONG, {});
      } else if (payload.type === _events.PONG) {
        console.log('SOCKET.IO PONG!');
      }
      notifySubscribers(payload);
    }

    function ping() {
      notifyServer(_events.PING, {});
    }

    /**
     * All communications to the server should go through here
     * @param type
     * @param payload
     */
    function notifyServer(type, payload) {
      _socketIO.emit(_events.NOTIFY_SERVER, {
        type: type,
        payload: payload
      });
    }

    //function emit(message, payload) {
    //  message = message || _events.MESSAGE;
    //  payload = payload || {};
    //  _socketIO.emit(message, payload);
    //}
    //
    //function on(event, handler) {
    //  _socketIO.on(event, handler);
    //}

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

    function getEventConstants() {
      return _.assign({}, _events);
    }

    return {
      events: getEventConstants,
      initialize: initialize,
      ping: ping,
      notifyServer: notifyServer,
      subscribe: subscribe,
      notifySubscribers: notifySubscribers,
      getLastNotification: getLastNotification
    };
  };

  module.exports = SocketIOConnector();
});

/**
 * Map data type
 */

'use strict';

ndefine('nori/store/Map', function (nrequire, module, exports) {

  var Map = function Map() {
    var _this,
        _id,
        _parentCollection,
        _dirty = false,
        _entries = [],
        _map = Object.create(null);

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if (!initObj.id) {
        throw new Error('Store must be init\'d with an id');
      }

      _this = this;
      _id = initObj.id;

      if (initObj.store) {
        _dirty = true;
        _map = initObj.store;
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
      _map = {};
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
          value = null;

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
        arry.push({ key: key, value: _map[key] });
      }

      _entries = arry;
      _dirty = false;

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
        id: _id,
        mapType: 'store'
      };

      _this.notifySubscribers(payload);

      if (_parentCollection.dispatchChange) {
        _parentCollection.dispatchChange({
          id: _id
        }, type || 'map');
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
      initialize: initialize,
      getID: getID,
      clear: clear,
      isDirty: isDirty,
      markClean: markClean,
      setJSON: setJSON,
      set: set,
      setKeyProp: setKeyProp,
      get: get,
      getKeyProp: getKeyProp,
      has: has,
      remove: remove,
      keys: keys,
      values: values,
      entries: entries,
      filterValues: filterValues,
      size: size,
      first: first,
      last: last,
      getAtIndex: getAtIndex,
      toObject: toObject,
      transform: transform,
      toJSON: toJSON,
      setParentCollection: setParentCollection,
      getParentCollection: getParentCollection
    };
  };

  module.exports = Map;
});

/**
 * Map Collection - an array of maps
 */

'use strict';

ndefine('nori/store/MapCollection', function (nrequire, module, exports) {

  var MapCollection = function MapCollection() {
    var _this,
        _id,
        _parentCollection,
        _caret = 0,
        _children = [];

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if (!initObj.id) {
        throw new Error('StoreCollection must be init\'d with an id');
      }

      _this = this;
      _id = initObj.id;

      // TODO test
      if (initObj.stores) {
        addMapsFromArray.call(_this, initObj.stores);
      }
    }

    //----------------------------------------------------------------------------
    //  Iterator
    //----------------------------------------------------------------------------

    function next() {
      var ret = {};
      if (hasNext()) {
        ret = { value: _children[_caret++], done: !hasNext() };
      } else {
        ret = current();
      }

      return ret;
    }

    function current() {
      return { value: _children[_caret], done: !hasNext() };
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
     * Add an array of Store instances
     * @param sArry
     */
    function addMapsFromArray(sArry) {
      sArry.forEach(function (store) {
        add(store);
      });
    }

    /**
     * Create an add child Store stores from an array of objects
     * @param array Array of objects
     * @param idKey Key on each object to use for the ID of that Store store
     */
    function addFromObjArray(oArry, idKey) {
      oArry.forEach(function (obj) {

        var id;

        if (obj.hasOwnProperty(idKey)) {
          id = obj[idKey];
        } else {
          id = _id + 'child' + _children.length;
        }

        add(Nori.store().createMap({ id: id, store: obj }));
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

        add(Nori.store().createMap({ id: id, store: obj }));
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
        console.log(_id + ' remove, store not in collection: ' + storeID);
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
     * Gets the Store by ID
     * @param storeID
     * @returns {T}
     */
    function getMap(storeID) {
      return _children.filter(function (store) {
        return store.getID() === storeID;
      })[0];
    }

    /**
     * Get the index in _children array by Store's ID
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
        id: _id,
        type: type || '',
        mapType: 'collection',
        mapID: data.id
      };

      _this.notifySubscribers(payload);

      if (_parentCollection) {
        _parentCollection.dispatchChange({ id: _id, store: getMap() });
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
      initialize: initialize,
      current: current,
      next: next,
      hasNext: hasNext,
      rewind: rewind,
      getID: getID,
      isDirty: isDirty,
      markClean: markClean,
      add: add,
      addMapsFromArray: addMapsFromArray,
      addFromObjArray: addFromObjArray,
      addFromJSONArray: addFromJSONArray,
      remove: remove,
      removeAll: removeAll,
      getMap: getMap,
      hasMap: hasMap,
      size: size,
      first: first,
      last: last,
      atIndex: atIndex,
      filter: filter,
      filterByKey: filterByKey,
      forEach: forEach,
      map: map,
      entries: entries,
      toJSON: toJSON,
      dispatchChange: dispatchChange,
      setParentCollection: setParentCollection,
      getParentCollection: getParentCollection
    };
  };

  module.exports = MapCollection;
});

'use strict';

ndefine('nori/store/MixinMapFactory', function (nrequire, module, exports) {

  var MixinMapFactory = function MixinMapFactory() {

    var _mapCollectionList = Object.create(null),
        _mapList = Object.create(null),
        _mapCollectionFactory = nrequire('nori/store/MapCollection'),
        _mapFactory = nrequire('nori/store/Map'),
        _observableFactory = nrequire('nori/utils/MixinObservableSubject');

    /**
     * Create a new store collection and initalize
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
     * Create a new store and initialize
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
     * Get a store from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getMap(storeID) {
      return _mapList[storeID];
    }

    /**
     * Get a store collection from the application collection
     * @param storeID
     * @returns {void|*}
     */
    function getMapCollection(storeID) {
      return _mapCollectionList[storeID];
    }

    return {
      createMapCollection: createMapCollection,
      createMap: createMap,
      getMap: getMap,
      getMapCollection: getMapCollection
    };
  };

  module.exports = MixinMapFactory();
});

/**
 * Mixin for Nori stores to add functionality similar to Redux' Reducer and single
 * object state tree concept. Mixin should be composed to nori/store/ApplicationStore
 * during creation of main AppStore
 *
 * https://gaearon.github.io/redux/docs/api/Store.html
 * https://gaearon.github.io/redux/docs/basics/Reducers.html
 *
 * Created 8/13/15
 */

'use strict';

ndefine('nori/store/MixinReducerStore', function (nrequire, module, exports) {

  var MixinReducerStore = function MixinReducerStore() {
    var _this,
        _state,
        _stateReducers = [],
        _noriActionConstants = nrequire('nori/action/ActionConstants');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    /**
     * _state might not exist if subscribers are added before this store is initialized
     */
    function getState() {
      if (_state) {
        return _state.getState();
      }
      return {};
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
    function initializeReducerStore() {
      if (!this.createSubject) {
        console.warn('nori/store/MixinReducerStore needs nori/utils/MixinObservableSubject to notify');
      }

      var simpleStoreFactory = nrequire('nori/store/SimpleStore');

      _this = this;
      _state = simpleStoreFactory();

      if (!_stateReducers) {
        throw new Error('ReducerStore, must set a reducer before initialization');
      }

      // Set initial state from empty event
      applyReducers({});
    }

    /**
     * Apply the action object to the reducers to change state
     * are sent to all reducers to update the state
     * @param actionObject
     */
    function apply(actionObject) {
      console.log('ReducerStore Apply: ', actionObject.type, actionObject.payload);
      applyReducers(actionObject);
    }

    function applyReducers(actionObject) {
      var nextState = applyReducersToState(getState(), actionObject);
      setState(nextState);
      _this.handleStateMutation();
    }

    /**
     * API hook to handle state updates
     */
    function handleStateMutation() {}
    // override this

    /**
     * Creates a new state from the combined reduces and action object
     * Store state isn't modified, current state is passed in and mutated state returned
     * @param state
     * @param action
     * @returns {*|{}}
     */
    function applyReducersToState(state, action) {
      state = state || {};
      // TODO should this actually use array.reduce()?
      _stateReducers.forEach(function applyStateReducerFunction(reducerFunc) {
        state = reducerFunc(state, action);
      });
      return state;
    }

    /**
     * Template reducer function
     * Store state isn't modified, current state is passed in and mutated state returned
      function templateReducerFunction(state, event) {
      state = state || {};
      switch (event.type) {
        case _noriActionConstants.MODEL_DATA_CHANGED:
          // can compose other reducers
          // return _.assign({}, state, otherStateTransformer(state));
          return _.assign({}, state, {prop: event.payload.value});
        default:
          return state;
      }
    }
     */

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    return {
      initializeReducerStore: initializeReducerStore,
      getState: getState,
      setState: setState,
      apply: apply,
      setReducers: setReducers,
      addReducer: addReducer,
      applyReducers: applyReducers,
      applyReducersToState: applyReducersToState,
      handleStateMutation: handleStateMutation
    };
  };

  module.exports = MixinReducerStore();
});

'use strict';

ndefine('nori/store/SimpleStore', function (nrequire, module, exports) {

  var SimpleStore = function SimpleStore() {
    var _internalState = Object.create(null);

    /**
     * Return a copy of the state
     * @returns {void|*}
     */
    function getState() {
      return _.assign({}, _internalState);
    }

    /**
     * Sets the state
     * @param nextState
     */
    function setState(nextState) {
      _internalState = _.assign(_internalState, nextState);
    }

    return {
      getState: getState,
      setState: setState
    };
  };

  module.exports = SimpleStore;
});

'use strict';

ndefine('nori/view/ApplicationView', function (nrequire, module, exports) {

  var ApplicationView = function ApplicationView() {

    var _this,
        _domUtils = nrequire('nudoru/browser/DOMUtils');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    /**
     * Initialize
     * @param scaffoldTemplates template IDs to attached to the body for the app
     */
    function initializeApplicationView(scaffoldTemplates) {
      _this = this;

      attachApplicationScaffolding(scaffoldTemplates);
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
      var cover = document.querySelector('#initialization__cover'),
          message = document.querySelector('.initialization__message');

      TweenLite.to(cover, 1, {
        alpha: 0, ease: Quad.easeOut, onComplete: function onComplete() {
          cover.parentNode.removeChild(cover);
        }
      });

      TweenLite.to(message, 2, {
        top: "+=50px", ease: Quad.easeIn, onComplete: function onComplete() {
          cover.removeChild(message);
        }
      });
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    return {
      initializeApplicationView: initializeApplicationView,
      removeLoadingMessage: removeLoadingMessage
    };
  };

  module.exports = ApplicationView();
});

'use strict';

ndefine('nori/view/MixinBrowserEvents', function (nrequire, module, exports) {

  var MixinBrowserEvents = function MixinBrowserEvents() {

    var _scrollableAppContainer, _browserScrollStream, _browserResizeStream;

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initializeBrowserEvents(scrollcontainer) {
      if (!this.createSubject) {
        console.warn('nori/view/MixinBrowserEvents needs nori/utils/MixinObservableSubject to notify');
      }

      if (scrollcontainer) {
        setMainScrollingView(scrollcontainer);
      } else {
        _scrollableAppContainer = document;
      }

      createBrowserEventStreams.bind(this)();

      this.createSubject('browserScroll');
      this.createSubject('browserResize');
    }

    /**
     * Set up RxJS streams for events
     */
    function createBrowserEventStreams() {
      _browserResizeStream = Rx.Observable.fromEvent(window, 'resize').throttle(100).subscribe(handleViewPortResize.bind(this));

      _browserScrollStream = Rx.Observable.fromEvent(_scrollableAppContainer, 'scroll').throttle(100).subscribe(handleViewPortScroll.bind(this));
    }

    function handleViewPortResize() {
      this.notifySubscribersOf('browserResize', getCurrentViewPortSize());
    }

    function handleViewPortScroll() {
      this.notifySubscribersOf('browserScroll', getCurrentViewPortScroll());
    }

    function getCurrentViewPortSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }

    function getCurrentViewPortScroll() {
      var scrollEL = _scrollableAppContainer ? _scrollableAppContainer : document.body;

      var left = scrollEL.scrollLeft,
          top = scrollEL.scrollTop;

      left = left ? left : 0;
      top = top ? top : 0;

      return { left: left, top: top };
    }

    function getMainScrollingView() {
      return _scrollableAppContainer;
    }

    function setMainScrollingView(elID) {
      _scrollableAppContainer = document.querySelector(elID);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    return {
      initializeBrowserEvents: initializeBrowserEvents,
      getMainScrollingView: getMainScrollingView,
      setMainScrollingView: setMainScrollingView,
      getCurrentViewPortSize: getCurrentViewPortSize,
      getCurrentViewPortScroll: getCurrentViewPortScroll
    };
  };

  module.exports = MixinBrowserEvents();
});

/**
 * Mixin view that allows for component views
 */

'use strict';

ndefine('nori/view/MixinComponentViews', function (nrequire, module, exports) {

  var MixinComponentViews = function MixinComponentViews() {

    var _componentViewMap = Object.create(null),
        _componentHTMLTemplatePrefix = 'template__',
        _template = nrequire('nori/utils/Templating');

    /**
     * Return the template object
     * @returns {*}
     */
    function getTemplate() {
      return _template;
    }

    /**
     * Map a component to a mounting point. If a string is passed,
     * the correct object will be created from the factory method, otherwise,
     * the passed component object is used.
     *
     * @param componentID
     * @param componentIDorObj
     * @param mountPoint
     */
    function mapViewComponent(componentID, componentIDorObj, mountPoint) {
      var componentObj;

      if (typeof componentIDorObj === 'string') {
        var componentFactory = require(componentIDorObj);
        componentObj = createComponentView(componentFactory())();
      } else {
        componentObj = componentIDorObj;
      }

      _componentViewMap[componentID] = {
        htmlTemplate: _template.getTemplate(_componentHTMLTemplatePrefix + componentID),
        controller: componentObj,
        mountPoint: mountPoint
      };
    }

    /**
     * Factory to create component view modules by concating multiple source objects
     * @param componentSource Custom module source
     * @returns {*}
     */
    function createComponentView(componentSource) {
      return function () {
        var componentViewFactory = nrequire('nori/view/ViewComponent'),
            eventDelegatorFactory = nrequire('nori/view/MixinEventDelegator'),
            observableFactory = nrequire('nori/utils/MixinObservableSubject'),
            simpleStoreFactory = nrequire('nori/store/SimpleStore'),
            componentAssembly,
            finalComponent,
            previousInitialize;

        componentAssembly = [componentViewFactory(), eventDelegatorFactory(), observableFactory(), simpleStoreFactory(), componentSource];

        if (componentSource.mixins) {
          componentAssembly = componentAssembly.concat(componentSource.mixins);
        }

        finalComponent = Nori.assignArray({}, componentAssembly);

        // Compose a new initialize function by inserting call to component super module
        previousInitialize = finalComponent.initialize;
        finalComponent.initialize = function initialize(initObj) {
          finalComponent.initializeComponent(initObj);
          previousInitialize.call(finalComponent, initObj);
        };

        return _.assign({}, finalComponent);
      };
    }

    /**
     * Show a mapped componentView
     * @param componentID
     * @param dataObj
     */
    function showViewComponent(componentID, mountPoint) {
      var componentView = _componentViewMap[componentID];
      if (!componentView) {
        console.warn('No componentView mapped for id: ' + componentID);
        return;
      }

      if (!componentView.controller.isInitialized()) {
        mountPoint = mountPoint || componentView.mountPoint;
        componentView.controller.initialize({
          id: componentID,
          template: componentView.htmlTemplate,
          mountPoint: mountPoint
        });
      } else {
        componentView.controller.update();
      }

      componentView.controller.componentRender();
      componentView.controller.mount();
    }

    /**
     * Returns a copy of the map object for component views
     * @returns {null}
     */
    function getComponentViewMap() {
      return _.assign({}, _componentViewMap);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    return {
      template: getTemplate,
      mapViewComponent: mapViewComponent,
      createComponentView: createComponentView,
      showViewComponent: showViewComponent,
      getComponentViewMap: getComponentViewMap
    };
  };

  module.exports = MixinComponentViews();
});

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

'use strict';

ndefine('nori/view/MixinEventDelegator', function (nrequire, module, exports) {

  var MixinEventDelegator = function MixinEventDelegator() {

    var _eventsMap,
        _eventSubscribers,
        _rx = nrequire('nori/utils/Rx');

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

          var mappings = evtStrings.split(','),
              eventHandler = _eventsMap[evtStrings];

          if (!is['function'](eventHandler)) {
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
      setEvents: setEvents,
      getEvents: getEvents,
      undelegateEvents: undelegateEvents,
      delegateEvents: delegateEvents
    };
  };

  module.exports = MixinEventDelegator;
});

/**
 * Mixin view that allows for component views to be display on store state changes
 */

'use strict';

ndefine('nori/view/MixinStoreStateViews', function (nrequire, module, exports) {

  var MixinStoreStateViews = function MixinStoreStateViews() {

    var _this,
        _watchedStore,
        _currentViewID,
        _currentStoreState,
        _stateViewMountPoint,
        _stateViewIDMap = Object.create(null);

    /**
     * Set up listeners
     */
    function initializeStateViews(store) {
      _this = this; // mitigation, Due to events, scope may be set to the window object
      _watchedStore = store;

      this.createSubject('viewChange');

      _watchedStore.subscribe(function onStateChange() {
        handleStateChange();
      });
    }

    /**
     * Show route from URL hash on change
     * @param routeObj
     */
    function handleStateChange() {
      showViewForCurrentStoreState();
    }

    function showViewForCurrentStoreState() {
      var state = _watchedStore.getState().currentState;
      if (state) {
        if (state !== _currentStoreState) {
          _currentStoreState = state;
          showStateViewComponent.bind(_this)(_currentStoreState);
        }
      }
    }

    /**
     * Set the location for the view to mount on route changes, any contents will
     * be removed prior
     * @param elID
     */
    function setViewMountPoint(elID) {
      _stateViewMountPoint = elID;
    }

    function getViewMountPoint() {
      return _stateViewMountPoint;
    }

    /**
     * Map a route to a module view controller
     * @param templateID
     * @param componentIDorObj
     */
    function mapStateToViewComponent(state, templateID, componentIDorObj) {
      _stateViewIDMap[state] = templateID;
      this.mapViewComponent(templateID, componentIDorObj, _stateViewMountPoint);
    }

    /**
     * Show a view (in response to a route change)
     * @param state
     */
    function showStateViewComponent(state) {
      var componentID = _stateViewIDMap[state];
      if (!componentID) {
        console.warn("No view mapped for route: " + state);
        return;
      }

      removeCurrentView();

      _currentViewID = componentID;
      this.showViewComponent(_currentViewID);

      // Transition new view in
      TweenLite.set(_stateViewMountPoint, { alpha: 0 });
      TweenLite.to(_stateViewMountPoint, 0.25, { alpha: 1, ease: Quad.easeIn });

      this.notifySubscribersOf('viewChange', componentID);
    }

    /**
     * Remove the currently displayed view
     */
    function removeCurrentView() {
      if (_currentViewID) {
        _this.getComponentViewMap()[_currentViewID].controller.unmount();
      }
      _currentViewID = '';
    }

    return {
      initializeStateViews: initializeStateViews,
      showViewForCurrentStoreState: showViewForCurrentStoreState,
      showStateViewComponent: showStateViewComponent,
      setViewMountPoint: setViewMountPoint,
      getViewMountPoint: getViewMountPoint,
      mapStateToViewComponent: mapStateToViewComponent
    };
  };

  module.exports = MixinStoreStateViews();
});

'use strict';

ndefine('nori/view/MixinNudoruControls', function (nrequire, module, exports) {

  var MixinNudoruControls = function MixinNudoruControls() {

    var _notificationView = nrequire('nudoru/component/ToastView'),
        _toolTipView = nrequire('nudoru/component/ToolTipView'),
        _messageBoxView = nrequire('nudoru/component/MessageBoxView'),
        _messageBoxCreator = nrequire('nudoru/component/MessageBoxCreator'),
        _modalCoverView = nrequire('nudoru/component/ModalCoverView');

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
        title: title || '',
        type: type || _notificationView.type().DEFAULT,
        message: message
      });
    }

    return {
      initializeNudoruControls: initializeNudoruControls,
      mbCreator: mbCreator,
      addMessageBox: addMessageBox,
      removeMessageBox: removeMessageBox,
      addNotification: addNotification,
      alert: alert,
      notify: notify
    };
  };

  module.exports = MixinNudoruControls();
});

/**
 * Mixin view that allows for component views to be display on routing changes
 */

'use strict';

ndefine('nori/view/MixinRouteViews', function (nrequire, module, exports) {

  var MixinRouteViews = function MixinRouteViews() {

    var _this,
        _currentRouteViewID,
        _routeViewMountPoint,
        _routeViewIDMap = Object.create(null);

    /**
     * Set up listeners
     */
    function initializeRouteViews() {
      _this = this; // mitigation, Due to events, scope may be set to the window object

      this.createSubject('viewChange');

      Nori.router().subscribe(function onRouteChange(payload) {
        handleRouteChange(payload.routeObj);
      });
    }

    /**
     * Show route from URL hash on change
     * @param routeObj
     */
    function handleRouteChange(routeObj) {
      showRouteViewComponent.bind(_this)(routeObj.route);
    }

    /**
     * Typically on app startup, show the view assigned to the current URL hash
     *
     * @param silent If true, will not notify subscribers of the change, prevents
     * double showing on initial load
     */
    function showViewFromURLHash(silent) {
      this.showRouteViewComponent(Nori.getCurrentRoute().route);
      if (!silent) {
        Nori.router().notifySubscribers();
      }
    }

    /**
     * Set the location for the view to mount on route changes, any contents will
     * be removed prior
     * @param elID
     */
    function setViewMountPoint(elID) {
      _routeViewMountPoint = elID;
    }

    function getViewMountPoint() {
      return _routeViewMountPoint;
    }

    /**
     * Map a route to a module view controller
     * @param templateID
     * @param componentIDorObj
     */
    function mapRouteToViewComponent(route, templateID, componentIDorObj) {
      _routeViewIDMap[route] = templateID;
      this.mapViewComponent(templateID, componentIDorObj, _routeViewMountPoint);
    }

    /**
     * Show a view (in response to a route change)
     * @param route
     */
    function showRouteViewComponent(route) {
      var componentID = _routeViewIDMap[route];
      if (!componentID) {
        console.warn("No view mapped for route: " + route);
        return;
      }

      removeCurrentRouteView();

      _currentRouteViewID = componentID;
      this.showViewComponent(_currentRouteViewID);

      // Transition new view in
      TweenLite.set(_routeViewMountPoint, { alpha: 0 });
      TweenLite.to(_routeViewMountPoint, 0.25, { alpha: 1, ease: Quad.easeIn });

      this.notifySubscribersOf('viewChange', componentID);
    }

    /**
     * Remove the currently displayed view
     */
    function removeCurrentRouteView() {
      if (_currentRouteViewID) {
        _this.getComponentViewMap()[_currentRouteViewID].controller.unmount();
      }
      _currentRouteViewID = '';
    }

    return {
      initializeRouteViews: initializeRouteViews,
      showViewFromURLHash: showViewFromURLHash,
      showRouteViewComponent: showRouteViewComponent,
      setViewMountPoint: setViewMountPoint,
      getViewMountPoint: getViewMountPoint,
      mapRouteToViewComponent: mapRouteToViewComponent
    };
  };

  module.exports = MixinRouteViews();
});

/**
 * Base module for components
 * Must be extended with custom modules
 */

'use strict';

ndefine('nori/view/ViewComponent', function (nrequire, module, exports) {

  var ViewComponent = function ViewComponent() {

    var _isInitialized = false,
        _configProps,
        _id,
        _templateObj,
        _html,
        _DOMElement,
        _mountPoint,
        _children = [],
        _isMounted = false,
        _renderer = nrequire('nori/utils/Renderer');

    /**
     * Initialization
     * @param configProps
     */
    function initializeComponent(configProps) {
      _configProps = configProps;
      _id = configProps.id;
      _templateObj = configProps.template;
      _mountPoint = configProps.mountPoint;

      this.setState(this.getInitialState());
      this.setEvents(this.defineEvents());

      this.createSubject('update');
      this.createSubject('mount');
      this.createSubject('unmount');

      _isInitialized = true;
    }

    function defineEvents() {
      return undefined;
    }

    /**
     * Bind updates to the map ID to this view's update
     * @param mapIDorObj Object to subscribe to or ID. Should implement nori/store/MixinObservableStore
     */
    function bindMap(mapIDorObj) {
      var map;

      if (is.object(mapIDorObj)) {
        map = mapIDorObj;
      } else {
        map = Nori.store().getMap(mapIDorObj) || Nori.store().getMapCollection(mapIDorObj);
      }

      if (!map) {
        console.warn('ViewComponent bindMap, map or mapcollection not found: ' + mapIDorObj);
        return;
      }

      if (!is['function'](map.subscribe)) {
        console.warn('ViewComponent bindMap, map or mapcollection must be observable: ' + mapIDorObj);
        return;
      }

      map.subscribe(this.update.bind(this));
    }

    /**
     * Add a child
     * @param child
     */
    //function addChild(child) {
    //  _children.push(child);
    //}

    /**
     * Remove a child
     * @param child
     */
    //function removeChild(child) {
    //  var idx = _children.indexOf(child);
    //  _children[idx].unmount();
    //  _children.splice(idx, 1);
    //}

    /**
     * Before the view updates and a rerender occurs
     * Returns nextState of component
     */
    function componentWillUpdate() {
      return this.getState();
    }

    function update() {
      var currentState = this.getState();
      var nextState = this.componentWillUpdate();

      if (this.shouldComponentUpdate(nextState)) {
        this.setState(nextState);
        //_children.forEach(function updateChild(child) {
        //  child.update();
        //});

        if (_isMounted) {
          if (this.shouldComponentRender(currentState)) {
            this.unmount();
            this.componentRender();
            this.mount();
          }
        }
        this.notifySubscribersOf('update', this.getID());
      }
    }

    /**
     * Compare current state and next state to determine if updating should occur
     * @param nextState
     * @returns {*}
     */
    function shouldComponentUpdate(nextState) {
      return is.existy(nextState);
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function componentRender() {
      //_children.forEach(function renderChild(child) {
      //  child.componentRender();
      //});

      _html = this.render(this.getState());
    }

    /**
     * May be overridden in a submodule for custom rendering
     * Should return HTML
     * @returns {*}
     */
    function render(state) {
      return _templateObj(state);
    }

    /**
     * Append it to a parent element
     * @param mountEl
     */
    function mount() {
      if (!_html) {
        throw new Error('Component ' + _id + ' cannot mount with no HTML. Call render() first?');
      }

      _isMounted = true;

      _DOMElement = _renderer.render({
        target: _mountPoint,
        html: _html
      });

      if (this.delegateEvents) {
        this.delegateEvents();
      }

      if (this.componentDidMount) {
        this.componentDidMount();
      }

      this.notifySubscribersOf('mount', this.getID());
    }

    /**
     * Call after it's been added to a view
     */
    function componentDidMount() {}
    // stub

    /**
     * Call when unloading
     */
    function componentWillUnmount() {
      // stub
    }

    function unmount() {
      this.componentWillUnmount();
      _isMounted = false;

      if (this.undelegateEvents) {
        this.undelegateEvents();
      }

      _renderer.render({
        target: _mountPoint,
        html: ''
      });

      _html = '';
      _DOMElement = null;
      this.notifySubscribersOf('unmount', this.getID());
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

    function getDOMElement() {
      return _DOMElement;
    }

    function getTemplate() {
      return _templateObj;
    }

    function setTemplate(html) {
      _templateObj = _.template(html);
    }

    //function getChildren() {
    //  return _children.slice(0);
    //}

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    return {
      initializeComponent: initializeComponent,
      defineEvents: defineEvents,
      isInitialized: isInitialized,
      getConfigProps: getConfigProps,
      getInitialState: getInitialState,
      getID: getID,
      getTemplate: getTemplate,
      setTemplate: setTemplate,
      getDOMElement: getDOMElement,
      isMounted: isMounted,

      bindMap: bindMap,

      componentWillUpdate: componentWillUpdate,
      shouldComponentUpdate: shouldComponentUpdate,
      update: update,

      componentRender: componentRender,
      render: render,

      mount: mount,
      componentDidMount: componentDidMount,

      componentWillUnmount: componentWillUnmount,
      unmount: unmount

      //addChild   : addChild,
      //removeChild: removeChild,
      //getChildren: getChildren
    };
  };

  module.exports = ViewComponent;
});

'use strict';

var Nori = (function () {

  var _dispatcher = nrequire('nori/utils/Dispatcher'),
      _router = nrequire('nori/utils/Router');

  // Switch Lodash to use Mustache style templates
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getDispatcher() {
    return _dispatcher;
  }

  function getRouter() {
    return _router;
  }

  function getConfig() {
    return _.assign({}, window.APP_CONFIG_DATA || {});
  }

  function getCurrentRoute() {
    return _router.getCurrentRoute();
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
    custom.mixins.push(this);
    return buildFromMixins(custom);
  }

  /**
   * Creates main application store
   * @param custom
   * @returns {*}
   */
  function createStore(custom) {
    return function cs() {
      return _.assign({}, buildFromMixins(custom));
    };
  }

  /**
   * Creates main application view
   * @param custom
   * @returns {*}
   */
  function createView(custom) {
    return function cv() {
      return _.assign({}, buildFromMixins(custom));
    };
  }

  /**
   * Mixes in the modules specified in the custom application object
   * @param sourceObject
   * @returns {*}
   */
  function buildFromMixins(sourceObject) {
    var mixins;

    if (sourceObject.mixins) {
      mixins = sourceObject.mixins;
    }

    mixins.push(sourceObject);
    return assignArray({}, mixins);
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
    var gettersetter = function gettersetter() {
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
          cntx = context || this;

      callback.call(cntx, prop in currentTarget ? currentTarget[prop] : currentTarget.getAttribute(prop));
    };
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    config: getConfig,
    dispatcher: getDispatcher,
    router: getRouter,
    createApplication: createApplication,
    createStore: createStore,
    createView: createView,
    buildFromMixins: buildFromMixins,
    getCurrentRoute: getCurrentRoute,
    assignArray: assignArray,
    prop: prop,
    withAttr: withAttr
  };
})();