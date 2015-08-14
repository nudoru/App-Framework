define('nori/utils/Cookie',
  function(require, module, exports) {

    module.exports.create = function(name, value, days) {
      var expires = "", date;
      if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    };

    module.exports.read = function(name) {
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
    };

    module.exports.remove = function(name) {
      module.exports.create(name, '', -1);
    };

  });

define('nori/utils/Dispatcher',
  function (require, module, exports) {
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

    module.exports.subscribe          = subscribe;
    module.exports.unsubscribe        = unsubscribe;
    module.exports.publish            = publish;
    module.exports.getLog             = getLog;
    module.exports.registerReceiver   = registerReceiver;
    module.exports.unregisterReceiver = unregisterReceiver;

  });

define('nori/utils/Renderer',
  function (require, module, exports) {

    var _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants'),
        _domUtils          = require('nudoru/browser/DOMUtils');

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

    module.exports.initialize = initialize;

  });

define('nori/utils/Router',
  function (require, module, exports) {

    var _routeMap           = Object.create(null),
        _subject            = new Rx.Subject(),
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
     * reference- http://lea.verou.me/2011/05/get-your-hash-the-bulletproof-way/
     *
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

    module.exports.initialize           = initialize;
    module.exports.subscribe            = subscribe;
    module.exports.getCurrentRoute      = getCurrentRoute;
    module.exports.set                  = set;

  });

define('nori/utils/Templating',
  function (require, module, exports) {

    var _templateHTMLCache = Object.create(null),
        _templateCache     = Object.create(null),
        _DOMUtils          = require('nudoru/browser/DOMUtils');

    /**
     * Get the template html from the script tag with id
     * @param id
     * @returns {*}
     */
    function getSource(id) {
      if (_templateHTMLCache[id]) {
        return _templateHTMLCache[id];
      }

      var src = document.getElementById(id),
          srchtml, cleanhtml;

      if (src) {
        srchtml = src.innerHTML;
      } else {
        throw new Error('nudoru/core/NTemplate, template not found: "' + id + '"');
      }

      cleanhtml              = cleanTemplateHTML(srchtml);
      _templateHTMLCache[id] = cleanhtml;
      return cleanhtml;
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
      //replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').
      return str.trim();
    }

    function addClientSideTemplateToDOM(id, html) {
      var s       = document.createElement('script');
      s.type      = 'text/template';
      s.id        = id;
      s.innerHTML = html;
      document.getElementsByTagName('head')[0].appendChild(s);
    }

    module.exports.getSource   = getSource;
    module.exports.getTemplate = getTemplate;
    module.exports.asHTML      = asHTML;
    module.exports.asElement   = asElement;

    module.exports.addClientSideTemplateToDOM = addClientSideTemplateToDOM;

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
      UPDATE_MODEL_DATA      : null,
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

    var _appEventConstants     = require('nori/events/EventConstants'),
        _browserEventConstants = require('nudoru/browser/EventConstants');

    module.exports.applicationWarning = function (message) {
      var evtObj = {
        type   : _appEventConstants.APP_WARNING,
        error  : false,
        payload: {
          message: message
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationError = function (message) {
      var evtObj = {
        type   : _appEventConstants.APP_ERROR,
        error  : true,
        payload: new Error(message)
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationInitialized = function (payload) {
      var evtObj = {
        type   : _appEventConstants.APP_INITIALIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.notifyUser = function (title, message, type) {
      var evtObj = {
        type   : _appEventConstants.NOTIFY_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'default'
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.alertUser = function (title, message, type) {
      var evtObj = {
        type   : _appEventConstants.ALERT_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'default'
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.warnUser = function (title, message, type) {
      var evtObj = {
        type   : _appEventConstants.WARN_USER,
        payload: {
          title  : title,
          message: message,
          type   : type || 'danger'
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationModelInitialized = function (payload) {
      var evtObj = {
        type   : _appEventConstants.APP_MODEL_INITIALIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.applicationViewInitialized = function (payload) {
      var evtObj = {
        type   : _appEventConstants.APP_VIEW_INITIALIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.urlHashChanged = function (payload) {
      var evtObj = {
        type   : _browserEventConstants.URL_HASH_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.VIEW_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.changeRoute = function (route, data) {
      var evtObj = {
        type   : _appEventConstants.CHANGE_ROUTE,
        payload: {
          route: route,
          data : data
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.routeChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.ROUTE_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.updateModelData = function (modelID, data) {
      var evtObj = {
        type   : _appEventConstants.UPDATE_MODEL_DATA,
        payload: {
          id  : modelID,
          data: data
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.modelChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.MODEL_DATA_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.modelStateChanged = function (payload) {
      var evtObj = {
        type   : _appEventConstants.MODEL_STATE_CHANGED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.renderView = function (targetSelector, htmlStr, id, callback) {
      var evtObj = {
        type   : _appEventConstants.RENDER_VIEW,
        payload: {
          target  : targetSelector,
          html    : htmlStr,
          id      : id,
          callback: callback
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewRendered = function (targetSelector, id) {
      var evtObj = {
        type   : _appEventConstants.VIEW_RENDERED,
        payload: {
          target: targetSelector,
          id    : id
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewChangedToMobile = function (payload) {
      var evtObj = {
        type   : _appEventConstants.VIEW_CHANGE_TO_MOBILE,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.viewChangedToDesktop = function (payload) {
      var evtObj = {
        type   : _appEventConstants.VIEW_CHANGE_TO_DESKTOP,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.browserScrolled = function (payload) {
      var evtObj = {
        type   : _browserEventConstants.BROWSER_SCROLLED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

    module.exports.browserResized = function (payload) {
      var evtObj = {
        type   : _browserEventConstants.BROWSER_RESIZED,
        payload: payload
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

  });

define('nori/service/rest',
  function (require, module, exports) {

    /**
     * Ajax requst using Promises
     * @param reqObj
     * @param success
     * @param error
     */
    function request(reqObj) {
      var xhr    = new XMLHttpRequest(),
          json   = reqObj.json || false,
          method = reqObj.method.toUpperCase() || 'GET',
          url    = reqObj.url,
          data   = reqObj.data || null;

      return new Promise(function (resolve, reject) {
        xhr.open(method, url, true, reqObj.user, reqObj.password);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                if (json) {
                  resolve(JSON.parse(xhr.responseText));
                } else {
                  resolve(xhr.responseText);
                }
              }
              catch (e) {
                handleError('Result', 'Error parsing JSON result');
              }
            } else {
              handleError(xhr.status, xhr.statusText);
            }
          }
        };

        xhr.onerror   = function () {
          return handleError('Network error');
        };
        xhr.ontimeout = function () {
          return handleError('Timeout');
        };
        xhr.onabort   = function () {
          return handleError('About');
        };

        // set non json header? 'application/x-www-form-urlencoded; charset=UTF-8'
        if (json && method !== "GET") {
          xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        } else if (json && method === "GET") {
          xhr.setRequestHeader("Accept", "application/json, text/*; odata=verbose");  // odata param for Sharepoint
        }

        xhr.send(data);

        function handleError(type, message) {
          message = message || '';
          reject(type + ' ' + message);
        }
      });

    }

    module.exports.request   = request;

  });

define('nori/model/ApplicationModel',
  function (require, module, exports) {

    var _mapCollectionList = Object.create(null),
        _mapList           = Object.create(null);

    /**
     * Create a new model collection and initalize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createMapCollection(initObj, extras) {
      var m = Nori.extendWithArray({}, [requireNew('nori/model/MapCollection'), extras]);

      m.initialize(initObj);
      _mapCollectionList[initObj.id] = m;
      return m;
    }

    /**
     * Create a new model and initialize
     * @param initObj
     * @param extras
     * @returns {*}
     */
    function createMap(initObj, extras) {
      var m = Nori.extendWithArray({}, [requireNew('nori/model/Map'), extras]);

      m.initialize(initObj);
      _mapList[initObj.id] = m;
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

    module.exports.createMapCollection = createMapCollection;
    module.exports.createMap           = createMap;
    module.exports.getMap              = getMap;
    module.exports.getMapCollection    = getMapCollection;
  });

define('nori/model/Map',
  function (require, module, exports) {

    var _id,
        _parentCollection,
        _dirty     = false,
        _entries   = [],
        _map       = Object.create(null),
        _silent    = false,
        _subject   = new Rx.Subject(),
        _appEvents = require('nori/events/EventCreator');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if (!initObj.id) {
        throw new Error('Model must be init\'d with an id');
      }

      _id = initObj.id;

      _silent = initObj.silent || false;

      if (initObj.store) {
        _dirty = true;
        _map   = initObj.store;
      } else if (initObj.json) {
        setJSON(initObj.json);
      }

    }

    /**
     * subscribe a handler for changes
     * @param handler
     * @returns {*}
     */
    function subscribe(handler) {
      return _subject.subscribe(handler);
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
     * @param options String = value of property to set, Object = options: silent
     */
    function set(key, options) {
      var silentSet = false;

      if (typeof key === 'object') {
        if (options !== null && typeof options === 'object') {
          silentSet = options.silent || false;
        }
        _map = _.merge({}, _map, key);
      } else {
        _map[key] = options;
      }

      // Mark changed
      _dirty = true;

      if (!silentSet) {
        dispatchChange('set_key');
      }
    }

    /**
     * Assuming that _map[key] is an object, this will set a property on it
     * @param key
     * @param prop
     * @param data
     */
    function setKeyProp(key, prop, data, silent) {
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

    function getFirst() {
      return entries()[0];
    }

    function getLast() {
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
      if (!_silent) {
        var payload = {
          id     : _id,
          mapType: 'model'
        };

        _subject.onNext(payload);
        _appEvents.modelChanged(payload);
      }

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

    module.exports.initialize          = initialize;
    module.exports.subscribe           = subscribe;
    module.exports.getID               = getID;
    module.exports.clear               = clear;
    module.exports.isDirty             = isDirty;
    module.exports.markClean           = markClean;
    module.exports.setJSON             = setJSON;
    module.exports.set                 = set;
    module.exports.setKeyProp          = setKeyProp;
    module.exports.get                 = get;
    module.exports.getKeyProp          = getKeyProp;
    module.exports.has                 = has;
    module.exports.remove              = remove;
    module.exports.keys                = keys;
    module.exports.values              = values;
    module.exports.entries             = entries;
    module.exports.filterValues        = filterValues;
    module.exports.size                = size;
    module.exports.getFirst            = getFirst;
    module.exports.getLast             = getLast;
    module.exports.getAtIndex          = getAtIndex;
    module.exports.toObject            = toObject;
    module.exports.transform           = transform;
    module.exports.toJSON              = toJSON;
    module.exports.setParentCollection = setParentCollection;
    module.exports.getParentCollection = getParentCollection;

  });

define('nori/model/MapCollection',
  function (require, module, exports) {

    var _this,
        _id,
        _parentCollection,
        _children  = [],
        _silent    = false,
        _subject   = new Rx.Subject(),
        _appEvents = require('nori/events/EventCreator');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if (!initObj.id) {
        throw new Error('ModelCollection must be init\'d with an id');
      }

      _this   = this;
      _id     = initObj.id;
      _silent = initObj.silent || false;

      // TODO test
      if (initObj.models) {
        addMapsFromArray.call(_this, initObj.models);
      }
    }

    /**
     * subscribe a handler for changes
     * @param handler
     * @returns {*}
     */
    function subscribe(handler) {
      return _subject.subscribe(handler);
    }

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
    function addFromObjArray(oArry, idKey, silent) {
      oArry.forEach(function (obj) {

        var id;

        if (obj.hasOwnProperty(idKey)) {
          id = obj[idKey];
        } else {
          id = _id + 'child' + _children.length;
        }

        add(Nori.model().createMap({id: id, silent: silent, store: obj}));
      });
      dispatchChange(_id, 'add_map');
    }


    function addFromJSONArray(json, idKey, silent) {
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

        add(Nori.model().createMap({id: id, silent: silent, store: obj}));
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
      if (!_silent) {
        var payload = {
          id     : _id,
          type   : type || '',
          mapType: 'collection',
          mapID  : data.id
        };

        _subject.onNext(payload);
        _appEvents.modelChanged(payload);
      }

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

    function getFirst() {
      return _children[0];
    }

    function getLast() {
      return _children[_children.length - 1];
    }

    function getAtIndex(i) {
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

    module.exports.initialize          = initialize;
    module.exports.subscribe           = subscribe;
    module.exports.getID               = getID;
    module.exports.isDirty             = isDirty;
    module.exports.markClean           = markClean;
    module.exports.add                 = add;
    module.exports.addMapsFromArray    = addMapsFromArray;
    module.exports.addFromObjArray     = addFromObjArray;
    module.exports.addFromJSONArray    = addFromJSONArray;
    module.exports.remove              = remove;
    module.exports.removeAll           = removeAll;
    module.exports.getMap              = getMap;
    module.exports.hasMap              = hasMap;
    module.exports.size                = size;
    module.exports.getFirst            = getFirst;
    module.exports.getLast             = getLast;
    module.exports.getAtIndex          = getAtIndex;
    module.exports.filter              = filter;
    module.exports.filterByKey         = filterByKey;
    module.exports.forEach             = forEach;
    module.exports.map                 = map;
    module.exports.entries             = entries;
    module.exports.toJSON              = toJSON;
    module.exports.dispatchChange      = dispatchChange;
    module.exports.setParentCollection = setParentCollection;
    module.exports.getParentCollection = getParentCollection;

  });

define('nori/model/MixinReducerModel',
  function (require, module, exports) {

    var _this,
        _state         = requireNew('nori/model/SimpleStore'),
        _stateReducers = [];

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getState() {
      return _state.getState();
    }

    function setState(state) {
      _state.setState(state);
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
      console.log('ReducerModel Event occured: ', eventObject);
      applyReducers(eventObject);
    }

    function applyReducers(eventObject) {
      var nextState = applyReducersToState(getState(), eventObject);
      setState(nextState);

      _this.handleStateMutation();
    }

    /**
     * API hook to handled state updates
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

    module.exports.initializeReducerModel  = initializeReducerModel;
    module.exports.getState                = getState;
    module.exports.setState                = setState;
    module.exports.handleApplicationEvents = handleApplicationEvents;
    module.exports.setReducers             = setReducers;
    module.exports.addReducer              = addReducer;
    module.exports.applyReducers           = applyReducers;
    module.exports.applyReducersToState    = applyReducersToState;
    module.exports.handleStateMutation     = handleStateMutation;
  });

define('nori/model/SimpleStore',
  function (require, module, exports) {
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
      _state = state;
      _subject.onNext();
    }

    module.exports.subscribe = subscribe;
    module.exports.getState  = getState;
    module.exports.setState  = setState;

  });

define('nori/view/ApplicationView',
  function (require, module, exports) {

    var _this,
        _appContainerEl,
        _appEl,
        _renderer          = require('nori/utils/Renderer'),
        _domUtils          = require('nudoru/browser/DOMUtils'),
        _notificationView  = require('nudoru/component/ToastView'),
        _toolTipView       = require('nudoru/component/ToolTipView'),
        _messageBoxView    = require('nudoru/component/MessageBoxView'),
        _messageBoxCreator = require('nudoru/component/MessageBoxCreator'),
        _modalCoverView    = require('nudoru/component/ModalCoverView');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getAppContainerEl() {
      return _appContainerEl;
    }

    function getAppEl() {
      return _appEl;
    }

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initializeApplicationView(scaffoldTemplates) {
      _this = this;

      _renderer.initialize();

      attachApplicationScaffolding(scaffoldTemplates);

      _this.initializeComponentViews();

      initializeApplicationElements();
      initializeComponents();
    }

    function attachApplicationScaffolding(templates) {
      if(!templates) {
        return;
      }

      var bodyEl = document.querySelector('body');

      templates.forEach(function (templ) {
        bodyEl.appendChild(_domUtils.HTMLStrToNode(_this.template().getSource('template__' + templ, {})));
      });
    }

    function initializeApplicationElements() {
      _appContainerEl = document.getElementById('app__container');
      _appEl          = document.getElementById('app__contents');
    }

    function initializeComponents() {
      _toolTipView.initialize('tooltip__container');
      _notificationView.initialize('toast__container');
      _messageBoxView.initialize('messagebox__container');
      _modalCoverView.initialize();
    }

    /**
     * Alter the UI on resize or scroll
     * @param sizeObj Props: width, height
     * @param scrollObj Props: left, top
     */
    function layoutUI(sizeObj, scrollObj) {
      //
    }

    //----------------------------------------------------------------------------
    //  Messaging
    //----------------------------------------------------------------------------

    function mbCreator() {
      return _messageBoxCreator;
    }

    /**
     * Show a message box
     * @param obj
     */
    function addMessageBox(obj) {
      return _messageBoxView.add(obj);
    }

    function removeMessageBox(id) {
      _messageBoxView.remove(id);
    }

    /**
     * Show a popup message box
     * @param message
     */
    function alert(message, title) {
      return mbCreator().alert(title || 'Alert', message);
    }

    /**
     * Show notificiation
     * @param obj
     */
    function addNotification(obj) {
      return _notificationView.add(obj);
    }

    /**
     * Display a notification "toast"
     * @param title The title
     * @param message The message
     */
    function notify(message, title, type) {
      return addNotification({
        title  : title || '',
        type   : type || _notificationView.type().DEFAULT,
        message: message
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

    module.exports.initializeApplicationView     = initializeApplicationView;
    module.exports.initializeApplicationElements = initializeApplicationElements;
    module.exports.initializeComponents          = initializeComponents;
    module.exports.mbCreator                     = mbCreator;
    module.exports.addMessageBox                 = addMessageBox;
    module.exports.removeMessageBox              = removeMessageBox;
    module.exports.addNotification               = addNotification;
    module.exports.alert                         = alert;
    module.exports.notify                        = notify;
    module.exports.removeLoadingMessage          = removeLoadingMessage;
    module.exports.layoutUI                      = layoutUI;
    module.exports.getAppContainerEl             = getAppContainerEl;
    module.exports.getAppEl                      = getAppEl;

  });

define('nori/view/MixinBrowserEvents',
  function (require, module, exports) {

    var _currentViewPortSize,
        _currentViewPortScroll,
        _uiUpdateLayoutStream,
        _browserScrollStream,
        _browserResizeStream,
        _positionUIElementsOnChangeCB,
        _appEvents = require('nori/events/EventCreator');


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
      _appEvents.browserResized(_currentViewPortSize);
    }

    function handleViewPortScroll() {
      _appEvents.browserScrolled(_currentViewPortScroll);
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

    module.exports.initializeBrowserWindowEventStreams = initializeBrowserWindowEventStreams;
    module.exports.setPositionUIElementsOnChangeCB     = setPositionUIElementsOnChangeCB;
    module.exports.getMainScrollingView                = getMainScrollingView;
    module.exports.setMainScrollingView                = setMainScrollingView;
    module.exports.getCurrentViewPortSize              = getCurrentViewPortSize;
    module.exports.getCurrentViewPortScroll            = getCurrentViewPortScroll;

  });

define('nori/view/MixinComponentViews',
  function (require, module, exports) {

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
     * @param componentModule
     * @param isRoute True | False
     */
    function mapViewComponent(templateID, componentModule, isRoute, mountPoint) {
      if (typeof componentModule === 'string') {
        componentModule = requireNew(componentModule);
      }

      _componentViewMap[templateID] = {
        htmlTemplate: _template.getTemplate(_componentHTMLTemplatePrefix + templateID),
        controller  : createComponentView(componentModule),
        isRouteView : isRoute,
        mountPoint  : isRoute ? _routeViewMountPoint : mountPoint
      };
    }

    /**
     * Factory to create component view modules
     * @param extras
     * @returns {*}
     */
    function createComponentView(extras) {
      return Nori.extendWithArray({}, [
        requireNew('nori/view/ViewComponent'),
        requireNew('nori/view/MixinEventDelegator'),
        extras
      ]);
    }

    /**
     * Map a route to a module view controller
     * @param templateID
     * @param controllerModule
     */
    function mapRouteToViewComponent(route, templateID, controllerModule) {
      _routeViewIDMap[route] = templateID;
      mapViewComponent(templateID, controllerModule, true, _routeViewMountPoint);
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

      componentView.controller = Nori.extendWithArray(componentView.controller, extras);
    }

    /**
     * Update componentView based on a change in bound model data
     * @param viewID
     */
    function updateViewComponent(viewID) {
      var componentView = _componentViewMap[viewID];

      if (componentView.controller.update) {
        componentView.controller.update();
      }
    }

    /**
     * Show a mapped componentView
     * @param templateID
     * @param dataObj
     */
    function showViewComponent(templateID) {
      var componentView = _componentViewMap[templateID];
      if (!componentView) {
        throw new Error('No componentView mapped for id: ' + templateID);
      }

      componentView.controller.initialize({
        id        : templateID,
        template  : componentView.htmlTemplate,
        mountPoint: componentView.mountPoint
      });

      componentView.controller.update();
      componentView.controller.render();
      componentView.controller.mount();
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

    module.exports.initializeComponentViews = initializeComponentViews;
    module.exports.showViewFromURLHash         = showViewFromURLHash;
    module.exports.setRouteViewMountPoint   = setRouteViewMountPoint;
    module.exports.template                 = getTemplate;
    module.exports.mapViewComponent         = mapViewComponent;
    module.exports.showViewComponent        = showViewComponent;
    module.exports.mapRouteToViewComponent  = mapRouteToViewComponent;
    module.exports.showRouteViewComponent   = showRouteViewComponent;
    module.exports.updateViewComponent      = updateViewComponent;
    module.exports.applyMixin               = applyMixin;
  });

define('nori/view/MixinEventDelegator',
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

    module.exports.setEvents        = setEvents;
    module.exports.getEvents        = getEvents;
    module.exports.undelegateEvents = undelegateEvents;
    module.exports.delegateEvents   = delegateEvents;
  });



define('nori/view/MixinMultiDevice',
  function (require, module, exports) {

    var _drawerEl,
        _drawerToggleButtonEl,
        _drawerToggleButtonStream,
        _appEl,
        _browserResizeStream,
        _isMobile,
        _tabletBreakWidth,
        _phoneBreakWidth,
        _drawerWidth,
        _isDrawerOpen,
        _currentViewPortSize,
        _appEvents = require('nori/events/EventCreator'),
        _browserInfo       = require('nudoru/browser/BrowserInfo');

    function initializeMultiDeviceView(initObj) {
      _isMobile         = false;
      _tabletBreakWidth = 750;
      _phoneBreakWidth  = 475;
      _drawerWidth      = 250;
      _isDrawerOpen     = false;

      _appEl                = document.getElementById('app__contents');
      _drawerEl             = document.getElementById('drawer');
      _drawerToggleButtonEl = document.querySelector('.drawer__menu-spinner-button > input');

      if (_drawerEl) {
        TweenLite.to(_drawerEl, 0, {x: _drawerWidth * -1});
      }

      configureStreams();
      handleViewPortResize();
    }

    function configureStreams() {
      _browserResizeStream = Rx.Observable.fromEvent(window, 'resize')
        .throttle(10)
        .subscribe(function () {
          handleViewPortResize();
        });

      if (_drawerToggleButtonEl) {
        _drawerToggleButtonStream = Rx.Observable.fromEvent(_drawerToggleButtonEl, 'change')
          .subscribe(function () {
            toggleDrawer();
          });
      }
    }

    function handleViewPortResize() {
      setViewPortSize();
      checkForMobile();
    }

    function setViewPortSize() {
      _currentViewPortSize = {
        width : window.innerWidth,
        height: window.innerHeight
      };
    }

    /**
     * Usually on resize, check to see if we're in mobile
     */
    function checkForMobile() {
      if (_currentViewPortSize.width <= _tabletBreakWidth || _browserInfo.mobile.any()) {
        switchToMobileView();
      } else if (_currentViewPortSize.width > _tabletBreakWidth) {
        switchToDesktopView();
      }
    }

    function switchToMobileView() {
      if (_isMobile) {
        return;
      }
      _isMobile = true;
      _appEvents.viewChangedToMobile();
    }

    function switchToDesktopView() {
      if (!_isMobile) {
        return;
      }
      _isMobile = false;
      closeDrawer();
      _appEvents.viewChangedToDesktop();
    }

    function toggleDrawer() {
      if (_isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    function openDrawer() {
      _isDrawerOpen = true;
      TweenLite.to(_drawerEl, 0.5, {x: 0, ease: Quad.easeOut});
      TweenLite.to(_appEl, 0.5, {x: _drawerWidth, ease: Quad.easeOut});
    }

    function closeDrawer() {
      _isDrawerOpen = false;
      TweenLite.to(_drawerEl, 0.5, {x: _drawerWidth * -1, ease: Quad.easeOut});
      TweenLite.to(_appEl, 0.5, {x: 0, ease: Quad.easeOut});
    }

    module.exports.initializeMultiDeviceView = initializeMultiDeviceView;
    module.exports.openDrawer                = openDrawer;
    module.exports.closeDrawer               = closeDrawer;
    module.exports.checkForMobile            = checkForMobile;
  });

define('nori/view/ViewComponent',
  function (require, module, exports) {

    var _isInitialized = false,
        _initObj,
        _id,
        _templateObj,
        _html,
        _DOMElement,
        _mountPoint,
        _state         = {},
        _children      = [],
        _isMounted     = false,
        _noriEvents    = require('nori/events/EventCreator');

    /**
     * Initialization
     * @param initObj
     */
    function initializeComponent(initObj) {
      if (!isInitialized()) {
        _initObj     = initObj;
        _id          = initObj.id;
        _templateObj = initObj.template;
        _mountPoint  = initObj.mountPoint;
      }
      this.update();
      _isInitialized = true;
    }

    /**
     * Bind updates to the map ID to this view's update
     * @param mapID
     */
    function bindMap(mapID) {
      Nori.bindToMap(mapID, this.getID());
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
     * Before the iew updates and a rerender occurs
     */
    function viewWillUpdate() {
      // update state
    }

    /**
     * Update state and rerender
     * @param dataObj
     * @returns {*}
     */
    function update() {
      // make a copy of last state
      var previousState = _.assign({}, this.getState());

      // state will update here
      this.viewWillUpdate();

      _children.forEach(function updateChild(child) {
        child.update();
      });

      if (_isMounted) {
        if (this.viewShouldRender(previousState)) {
          this.unmount();
          this.render();
          this.mount();
        }
      }

      this.viewDidUpdate();
    }

    /**
     * Determine if the view should rerender on update
     * TODO implement
     * @returns {boolean}
     */
    function viewShouldRender(previousState) {
      return true;
    }

    /**
     * After the view updates and a rerender occurred
     */
    function viewDidUpdate() {
      // stub
    }

    function viewWillRender() {
      // stub
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      if (this.viewWillRender) {
        this.viewWillRender();
      }

      _children.forEach(function renderChild(child) {
        child.render();
      });

      _html = _templateObj(_state);

      if (this.viewDidRender) {
        this.viewDidRender();
      }
    }

    function viewDidRender() {
      // stub
    }

    /**
     * Call before it's been added to a view
     */
    function viewWillMount() {
      // stub
    }

    /**
     * Append it to a parent element
     * @param mountEl
     */
    function mount() {
      if (!_html) {
        throw new Error('Component ' + _id + ' cannot mount with no HTML. Call render() first');
      }

      if (this.viewWillMount) {
        this.viewWillMount();
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
      setDOMElement(domEl);
      // from the ViewMixinEventDelegator
      if (this.delegateEvents) {
        this.delegateEvents();
      }

      if (this.viewDidMount) {
        this.viewDidMount();
      }
    }

    /**
     * Call after it's been added to a view
     */
    function viewDidMount() {
      // stub
    }

    /**
     * Call when unloading and switching views
     */
    function viewWillUnmount() {
      // stub
    }

    function unmount() {
      this.viewWillUnmount();
      _isMounted = false;
      _noriEvents.renderView(_mountPoint, '', _id);

      // from the ViewMixinEventDelegator
      if (this.undelegateEvents) {
        this.undelegateEvents();
      }

      setDOMElement(null);
      this.viewDidUnmount();
    }

    function viewDidUnmount() {
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

    function setState(obj) {
      _state = obj;
    }

    function getState() {
      return _.cloneDeep(_state);
    }

    function getID() {
      return _id;
    }

    function getTemplate() {
      return _templateObj;
    }

    function getDOMElement() {
      return _DOMElement;
    }

    function setDOMElement(el) {
      _DOMElement = el;
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

    module.exports.initializeComponent = initializeComponent;

    module.exports.isInitialized = isInitialized;
    module.exports.setState      = setState;
    module.exports.getState      = getState;
    module.exports.getID         = getID;
    module.exports.getTemplate   = getTemplate;
    module.exports.getHTML       = getHTML;
    module.exports.setHTML       = setHTML;
    module.exports.getDOMElement = getDOMElement;
    module.exports.setDOMElement = setDOMElement;

    module.exports.bindMap = bindMap;

    module.exports.viewWillUpdate = viewWillUpdate;
    module.exports.update         = update;
    module.exports.viewDidUpdate  = viewDidUpdate;

    module.exports.viewShouldRender = viewShouldRender;
    module.exports.viewWillRender   = viewWillRender;
    module.exports.render           = render;
    module.exports.viewDidRender    = viewDidRender;

    module.exports.viewWillMount = viewWillMount;
    module.exports.mount         = mount;
    module.exports.viewDidMount  = viewDidMount;

    module.exports.viewWillUnmount = viewWillUnmount;
    module.exports.unmount         = unmount;
    module.exports.viewDidUnmount  = viewDidUnmount;

    module.exports.addChild    = addChild;
    module.exports.removeChild = removeChild;
    module.exports.getChildren = getChildren;

  });

var Nori = (function () {
  var _model,
      _view,
      _modelViewBindingMap = Object.create(null),
      _noriEvents          = require('nori/events/EventCreator'),
      _noriEventConstants  = require('nori/events/EventConstants'),
      _objectUtils         = require('nudoru/core/ObjectUtils'),
      _dispatcher          = require('nori/utils/Dispatcher'),
      _router              = require('nori/utils/Router');

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
    return _objectUtils.extend({}, (window.APP_CONFIG_DATA || {}));
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

    _view = initObj.view || createApplicationView({});
    _model = initObj.model || createApplicationModel({});

    configureApplicationEvents();

    _noriEvents.applicationInitialized();
  }

  function configureApplicationEvents() {
    // This triggers views to update on model changes
    _dispatcher.subscribe(_noriEventConstants.MODEL_DATA_CHANGED, function execute(payload) {
      handleModelUpdate(payload.payload);
    });

    // Route changed
    _router.subscribe(function onRouteChange(payload) {
      _noriEvents.routeChanged(payload.routeObj);
    });
  }

  //----------------------------------------------------------------------------
  //  Model binding
  //----------------------------------------------------------------------------

  /**
   * Associate a model with a component view. When notifyBoundViewsOfModelUpdate
   * is called, each view will be notified of the new data
   * @param modelID
   * @param viewID
   */
  function bindToMap(modelID, viewID) {
    if (!modelID || !viewID) {
      throw new Error('Nori, bindToMap: Model ID and View ID must be defined.', modelID, viewID);
    }

    var viewArry = _modelViewBindingMap[modelID];

    if (viewArry) {
      if (viewArry.indexOf(viewID) === -1) {
        viewArry.push(viewID);
      }
    } else {
      viewArry = [viewID];
    }

    _modelViewBindingMap[modelID] = viewArry;
  }

  /**
   * Notify any bound views on model change, not collection change
   * @param dataObj
   * {id:mapid, mapType:'model'}
   * {id:collectionid, mapType:'collection', mapID: data.id}
   */
  function handleModelUpdate(dataObj) {
    notifyViewsOfModelUpdate(dataObj.id);
  }

  /**
   * Tell views to update if they're listening to a model
   * @param modelID
   */
  function notifyViewsOfModelUpdate(modelID) {
    var viewArry = _modelViewBindingMap[modelID];

    if (viewArry) {
      viewArry.forEach(function (view) {
        _view.updateViewComponent(view);
      });
    }
  }

  //----------------------------------------------------------------------------
  //  Factories - concatenative inheritance, decorators
  //----------------------------------------------------------------------------

  /**
   * Merges objects
   * @param base Destination object
   * @param extra Source
   * @returns {*}
   */
  function extend(base, extra) {
    return _.assign({}, base, extra);
  }

  /**
   * Merges a collection of objects
   * @param base
   * @param extArry
   * @returns {*}
   */
  function extendWithArray(base, extArry) {
    while (extArry.length) {
      base = _.assign(base, extArry.shift());
    }
    return base;
  }

  /**
   * Create a new Nori application instance
   * @param extras
   * @returns {*}
   */
  function createApplication(extras) {
    return extendWithArray({}, [
      this,
      extras
    ]);
  }

  /**
   * Creates main application model
   * @param extras
   * @returns {*}
   */
  function createApplicationModel(extras) {
    return extendWithArray({}, [
      require('nori/model/ApplicationModel'),
      require('nori/model/MixinReducerModel'),
      extras
    ]);
  }

  /**
   * Creates main application view
   * @param extras
   * @returns {*}
   */
  function createApplicationView(extras) {
    return extendWithArray({}, [
      require('nori/view/ApplicationView'),
      require('nori/view/MixinComponentViews'),
      requireNew('nori/view/MixinEventDelegator'),
      extras
    ]);
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
    initializeApplication  : initializeApplication,
    config                 : getConfig,
    dispatcher             : getDispatcher,
    router                 : getRouter,
    model                  : getModel,
    view                   : getView,
    createApplication      : createApplication,
    createApplicationModel : createApplicationModel,
    createApplicationView  : createApplicationView,
    getCurrentRoute        : getCurrentRoute,
    extend                 : extend,
    extendWithArray        : extendWithArray,
    bindToMap              : bindToMap,
    handleModelUpdate      : handleModelUpdate,
    prop                   : prop,
    withAttr               : withAttr
  };

}
());