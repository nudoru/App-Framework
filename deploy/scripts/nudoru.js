/**
 * Typically modules would be in separate files and smushed together with a build
 * tools like Webpack or Browserify. I'm maintaining my own concat with Grunt so
 * all of the modules will be in a file already.
 * This establishes a object map and look up system.
 *
 * Example:
 *  define('moduleID',
 *    function(require, module, exports){
 *       exports.method = function(str) {
 *         //
 *       };
  *  });
 *
 *
 * @param id
 * @param moduleCode
 */
function define(id, moduleCode) {
  if(id in define.cache) {
    return;
  }
  define.cache[id] = moduleCode;
}
define.cache = Object.create(null);


/**
 * To require, it must have been mapped in the module map
 *
 * Refer to this later
 * https://github.com/substack/browser-pack/blob/d29fddc8a9207d5f967664935073b50971aff708/prelude.js
 *
 * @param id
 * @returns {*}
 */
function require(id) {
  if (id in require.cache) {
    return require.cache[id];
  }

  var moduleCode = define.cache[id],
    exports = {},
    module = {exports: exports};

  if(!moduleCode) {
    throw new Error('Require: module not found: "'+id+'"');
  }

  // TODO set scope to exports instead of moduleCode?
  moduleCode.call(moduleCode, require, module, exports);
  require.cache[id] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);

// Gets a new copy
function requireUnique(id) {
  var moduleCode = define.cache[id],
    exports = {},
    module = {exports: exports};

  if(!moduleCode) {
    throw new Error('requireUnique: module not found: "'+id+'"');
  }

  moduleCode.call(moduleCode, require, module, exports);
  return module.exports;
};define('nudoru.utils.ArrayUtils',
  function (require, module, exports) {

    var _numberUtils = require('nudoru.utils.NumberUtils');

    exports.isArray = function(test) {
      return Object.prototype.toString.call(test) === "[object Array]";
    };

    // Reference: http://jhusain.github.io/learnrx/index.html
    exports.mergeAll = function () {
      var results = [];

      this.forEach(function (subArr) {
        subArr.forEach(function (elm) {
          results.push(elm);
        });
      });

      return results;
    };

    // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
    exports.unique = function (arry) {
      var o = {},
        i,
        l = arry.length,
        r = [];
      for (i = 0; i < l; i += 1) {
        o[arry[i]] = arry[i];
      }
      for (i in o) {
        r.push(o[i]);
      }
      return r;
    };

    exports.removeIndex = function (arr, idx) {
      return arr.splice(idx, 1);
    };

    exports.removeItem = function (arr, item) {
      var idx = arr.indexOf(item);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    };

    exports.rndElement = function (arry) {
      return arry[_numberUtils.rndNumber(0, arry.length - 1)];
    };

    exports.getRandomSetOfElements = function (srcarry, max) {
      var arry = [],
        i = 0,
        len = _numberUtils.rndNumber(1, max);

      for (; i < len; i++) {
        arry.push(this.rndElement(srcarry));
      }

      return arry;
    };

    exports.getDifferences = function (arr1, arr2) {
      var dif = [];

      arr1.forEach(function (value) {
        var present = false,
          i = 0,
          len = arr2.length;

        for (; i < len; i++) {
          if (value === arr2[i]) {
            present = true;
            break;
          }
        }

        if (!present) {
          dif.push(value);
        }

      });

      return dif;
    };

  });;define('nudoru.utils.BrowserInfo',
  function (require, module, exports) {

    exports.appVersion = navigator.appVersion;
    exports.userAgent = navigator.userAgent;
    exports.isIE = -1 < navigator.userAgent.indexOf("MSIE ");
    exports.isIE6 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 6");
    exports.isIE7 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 7");
    exports.isIE8 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 8");
    exports.isIE9 = exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 9");
    exports.isFF = -1 < navigator.userAgent.indexOf("Firefox/");
    exports.isChrome = -1 < navigator.userAgent.indexOf("Chrome/");
    exports.isMac = -1 < navigator.userAgent.indexOf("Macintosh;");
    exports.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");

    exports.hasTouch = 'ontouchstart' in document.documentElement;
    exports.notSupported = this.isIE6 || this.isIE7 || this.isIE8;

    exports.mobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          this.Android()
          || this.BlackBerry()
          || this.iOS()
          || this.Opera()
          || this.Windows()
          ) !== null
      }

    };

    // TODO filter for IE > 9
    exports.enhanced = function() {
      return !_browserInfo.isIE && !_browserInfo.mobile.any();
    };

    exports.mouseDownEvtStr = function () {
      return this.mobile.any() ? "touchstart" : "mousedown";
    };

    exports.mouseUpEvtStr = function () {
      return this.mobile.any() ? "touchend" : "mouseup";
    };

    exports.mouseClickEvtStr = function () {
      return this.mobile.any() ? "touchend" : "click";
    };

    exports.mouseMoveEvtStr = function () {
      return this.mobile.any() ? "touchmove" : "mousemove";
    };

  });;define('nudoru.utils.DOMUtils',
  function(require, module, exports) {
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    // element must be entirely on screen
    exports.isElementEntirelyInViewport = function (el) {
      var rect = el.getBoundingClientRect();
      return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // element may be partialy on screen
    exports.isElementInViewport = function (el) {
      var rect = el.getBoundingClientRect();
      return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth)  &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
    };

    exports.isDomObj = function(obj) {
      return !!(obj.nodeType || (obj === window));
    };

    exports.position = function(el) {
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    };

    // from http://jsperf.com/jquery-offset-vs-offsetparent-loop
    exports.offset = function(el) {
      var ol = 0,
        ot = 0;
      if (el.offsetParent) {
        do {
          ol += el.offsetLeft;
          ot += el.offsetTop;
        } while (el = el.offsetParent); // jshint ignore:line
      }
      return {
        left: ol,
        top: ot
      };
    };

    exports.removeAllElements = function(el) {
      while(el.firstChild) {
        el.removeChild(el.firstChild);
      }
    };

    //http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    exports.HTMLStrToNode = function (str) {
      var temp = document.createElement('div');
      temp.innerHTML = str;
      return temp.firstChild;
    };

    exports.wrapElement = function(wrapperStr, el) {
      var wrapperEl = this.HTMLStrToNode(wrapperStr),
        elParent = el.parentNode;

      wrapperEl.appendChild(el);
      elParent.appendChild(wrapperEl);
      return wrapperEl;
    };

    // http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
    exports.closest = function(el, selector) {
      var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        if (matchesSelector.bind(el)(selector)) {
          return el;
        } else {
          el = el.parentElement;
        }
      }
      return false;
    };

    // from youmightnotneedjquery.com
    exports.hasClass = function(el, className) {
      if (el.classList) {
        el.classList.contains(className);
      } else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    };

    exports.addClass = function(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    };

    exports.removeClass = function(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    };

    exports.toggleClass = function(el, className) {
      if(this.hasClass(el, className)) {
        this.removeClass(el, className);
      } else {
        this.addClass(el, className);
      }
    };

    /**
     * Get an array of elements in the container returned as Array instead of a Node list
     */
    exports.getQSElementsAsArray = function(el, cls) {
      return Array.prototype.slice.call(el.querySelectorAll(cls));
    };

    exports.centerElementInViewPort = function(el) {
      var vpH = window.innerHeight,
        vpW = window.innerWidth,
        elR = el.getBoundingClientRect(),
        elH = elR.height,
        elW = elR.width;

      el.style.left = (vpW/2) - (elW/2)+'px';
      el.style.top = (vpH/2) - (elH/2)+'px';
    };

  });;// Simple debugger, Matt Perkins
define('nudoru.utils.NDebugger',
  function(require, module, exports) {

    var _messages = [],
        _broadcast = true;

    exports.log = function(text, source) {
      _messages.push({
        source: source,
        text: text
      });

      if(_broadcast) {
        console.log(createLogOutputString(_messages[_messages.length-1]));
      }
    };

    function createLogOutputString(entry) {
      return '> '+entry.text;
    }

  });;define('nudoru.utils.NLorem',
  function(require, module, exports) {

    var _currentText = [],
      _textSets = [],
      _maleFirstNames = [],
      _femaleFirstNames = [],
      _lastNames = [],
      _punctuation = [],
      _months,
      _days,
      _initialized = false,
      _arrayUtils = require('nudoru.utils.ArrayUtils'),
      _stringUtils = require('nudoru.utils.StringUtils'),
      _numberUtils = require('nudoru.utils.NumberUtils');

    _textSets = [
      "Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible"
    ];

    _lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy'.split(' ');

    _maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

    _femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephin Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

    _punctuation = ['.','.','.','.','?','!'];

    _months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    _days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

    function initialize() {
      if(_initialized) return;
      setCurrentTextSet(0);
      _initialized = true;
    }

    function setCurrentTextSet(index) {
      var _current = _textSets[index].toLowerCase();
      _currentText= _current.split(' ');
    }

    function getSentence(min,max) {
      var sentence = getText(min, max);

      return _stringUtils.capitalizeFirstLetter(sentence) + getRandomItem(_punctuation);
    }

    function getParagraph(min, max) {
      var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
        i= 0;

      for(; i<len; i++) {
        if(i === len-1) {
          delim = "";
        }
        str += getSentence(1,10) + delim;
      }

      return str;
    }

    function getText(min, max) {
      var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
        i= 0;

      for(; i<len; i++) {
        if(i === len-1) {
          delim = "";
        }
        str += getRandomItem(_currentText) + delim;
      }

      return str;
    }

    function getRandomItem(arry) {
      var min = 0;
      var max = arry.length-1;
      return arry[_numberUtils.rndNumber(min, max)];
    }

    function getFirstName() {
      return _numberUtils.rndNumber(0,1) ? getRandomItem(_maleFirstNames) : getRandomItem(_femaleFirstNames);
    }

    function getLastName() {
      return getRandomItem(_lastNames);
    }

    function getFLName() {
      return getFirstName() + " " + getLastName();
    }

    function getLFName() {
      return getLastName() + ", " + getFirstName();
    }

    /**
     * Better implementation http://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
     * @returns {{monthNumber: *, monthName: *, monthDay, weekDayNumber: *, weekDay: *, year}}
     */
    function getDate() {
      var month = _numberUtils.rndNumber(0,11),
        wkday = _numberUtils.rndNumber(0,4),
        date = {
        monthNumber: month + 1,
        monthName: _months[month],
        monthDay: _numberUtils.rndNumber(1,28),
        weekDayNumber: wkday + 1,
        weekDay: _days[wkday],
        year: _arrayUtils.rndElement(['2010','2011','2012','2013','2014','2015','2016'])
      };

      date.string = date.monthName+' '+date.monthDay+', '+date.year;

      return date;

    }

    /**
     * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     * @returns {string}
     */
    function fakeGUID() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    exports.initialize = initialize;
    exports.getText = getText;
    exports.getSentence = getSentence;
    exports.getParagraph = getParagraph;
    exports.getFLName = getFLName;
    exports.getLFName = getLFName;
    exports.getDate = getDate;
    exports.fakeGUID = fakeGUID;

  });;define('nudoru.utils.NTemplate',
  function(require, module, exports) {

    var _templateHTMLCache = Object.create(null),
      _templateCache = Object.create(null),
      _DOMUtils = require('nudoru.utils.DOMUtils');

    /**
     * Get the template html from the script tag with id
     * @param id
     * @returns {*}
     */
    function getSource(id) {
      if(_templateHTMLCache[id]) {
        return _templateHTMLCache[id];
      }

      var src = document.getElementById(id),
        srchtml = '',
        cleanhtml = '';

      if(src) {
        srchtml = src.innerHTML;
      } else {
        throw new Error('nudoru.utils.NTemplate, template not found: "'+id+'"');
      }

      cleanhtml = cleanTemplateHTML(srchtml);
      _templateHTMLCache[id] = cleanhtml;
      return cleanhtml;
    }

    /**
     * Returns an underscore template
     * @param id
     * @returns {*}
     */
    function getTemplate(id) {
      if(_templateCache[id]) {
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
      //replace(/(\r\n|\n|\r|\t)/gm,'').replace(/>\s+</g,'><').
      return str.trim();
    }

    exports.getSource = getSource;
    exports.getTemplate = getTemplate;
    exports.asHTML = asHTML;
    exports.asElement = asElement;

  });
;define('nudoru.utils.NumberUtils',
  function (require, module, exports) {

    exports.isInteger = function (str) {
      return (/^-?\d+$/.test(str));
    };

    exports.rndNumber = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    exports.clamp = function (val, min, max) {
      return Math.max(min, Math.min(max, val));
    };

    exports.inRange = function (val, min, max) {
      return val > min && val < max
    };

    exports.distanceTL = function (point1, point2) {
      var xd = (point2.left - point1.left),
        yd = (point2.top - point1.top);

      return Math.sqrt((xd * xd) + (yd * yd));
    };

  });;define('nudoru.utils.ObjectUtils',
  function(require, module, exports) {

    exports.dynamicSort = function (property) {
      return function (a, b) {
        return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      };
    };

    exports.searchObjects = function(obj, key, val) {
      var objects = [];
      for (var i in obj) {
        if (typeof obj[i] === 'object') {
          objects = objects.concat(searchObjects(obj[i], key, val));
        } else if (i === key && obj[key] === val) {
          objects.push(obj);
        }
      }
      return objects;
    };

    exports.getObjectFromString = function (obj, str) {
      var i = 0,
        path = str.split('.'),
        len = path.length;

      for (; i < len; i++) {
        obj = obj[path[i]];
      }
      return obj;
    };

    exports.getObjectIndexFromId = function (obj, id) {
      if (typeof obj === "object") {
        for (var i = 0; i < obj.length; i++) {
          if (typeof obj[i] !== "undefined" && typeof obj[i].id !== "undefined" && obj[i].id === id) {
            return i;
          }
        }
      }
      return false;
    };

    // extend and deep extend from http://youmightnotneedjquery.com/
    exports.extend = function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            out[key] = arguments[i][key];
          }
        }
      }

      return out;
    };

    exports.deepExtend = function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if (!obj) {
          continue;
        }

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              exports.deepExtend(out[key], obj[key]);
            } else {
              out[key] = obj[key];
            }
          }
        }
      }

      return out;
    };

    /**
     * Simplified implementation of Stamps - http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
     * https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
     *
     * Prototype object requires a methods object, private closures and state is optional
     *
     * @param prototype
     * @returns New object using prototype.methods as source
     */
    exports.basicFactory = function(prototype) {
      var proto = prototype,
        obj = Object.create(proto.methods);

      if(proto.hasOwnProperty('closure')) {
        proto.closures.forEach(function(closure) {
          closure.call(obj);
        });
      }

      if(proto.hasOwnProperty('state')) {
        for(var key in proto.state) {
          obj[key] = proto.state[key];
        }
      }

      return obj;
    };

  });
;define('nudoru.utils.Router',
  function (require, module, exports) {

    var _routeMap = Object.create(null),
      _emitter = require('nudoru.events.Emitter'),
      _browserEvents = require('nudoru.events.BrowserEvents');

    function initialize() {
      window.addEventListener('hashchange', onHashChange, false);
    }

    /**
     * Map a route to a given controller function
     * The controller funtion will be passed an object with the route and templateID
     * @param route
     * @param conObj
     */
    function when(route, conObj) {
      _routeMap[route] = {
        templateID: conObj.templateID,
        controller: conObj.controller
      };
    }

    /**
     * Broadcast the change event and let the application determine how to handle
     * @param evt
     */
    function onHashChange(evt) {
      _emitter.publish(_browserEvents.URL_HASH_CHANGED, {
        routeObj: getCurrentRoute(),
        fragment: getURLFragment()
      });
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

      return {route: route, data: queryStrObj};
    }

    /**
     * Runs the route currently on the URL
     * Primarily used window.load
     */
    function runCurrentRoute() {
      var current = getCurrentRoute();
      runRoute(current.route, current.data);
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
     * Executes the controller function for the given route
     * @param route
     * @param queryStrObj
     */
    function runRoute(route, queryStrObj) {
      var routeObj = _routeMap[route];

      if (routeObj) {
        routeObj.controller.call(window, {
          route: route,
          templateID: routeObj.templateID,
          data: queryStrObj
        });
      } else {
        console.log('No Route mapped for: "' + route + '"');
      }
    }

    /**
     * Combines a route and data object into a proper URL hash fragment
     * @param route
     * @param dataObj
     */
    function setRoute(route, dataObj) {
      var path = route,
          data = [];
      if (dataObj !== null && dataObj !== undefined) {
        path += "?";
        for (var prop in dataObj) {
          if (prop !== 'undefined' && dataObj.hasOwnProperty(prop)) {
            data.push(prop + '=' + encodeURIComponent(dataObj[prop]));
          }
        }
        path += data.join('&');
      }

      //console.log('Router, setting URL fragment to: ' + path);

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

    exports.initialize = initialize;
    exports.when = when;
    exports.getCurrentRoute = getCurrentRoute;
    exports.runCurrentRoute = runCurrentRoute;
    exports.setRoute = setRoute;

  });;define('nudoru.utils.StringUtils',
  function(require, module, exports){

    exports.capitalizeFirstLetter = function(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };

    exports.toTitleCase = function(str) {
      return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    };

    exports.removeTags = function(str) {
      return str.replace(/(<([^>]+)>)/ig, '');
    };

    exports.ellipses = function(len) {
      return (this.length > len) ? this.substr(0, len) + "..." : this;
    };

  });;define('nudoru.utils.TouchUtils',
  function(require, module, exports) {

    // https://github.com/filamentgroup/tappy/blob/master/tappy.js
    exports.getCoords = function( evt ){
      var ev = evt.originalEvent || evt,
        touches = ev.touches || ev.targetTouches;

      if( touches ){
        return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
      }
      else {
        return null;
      }
    };

  });
;define('nudoru.events.BrowserEvents',
  function(require, module, exports) {
    exports.URL_HASH_CHANGED = 'URL_HASH_CHANGED';
    exports.BROWSER_RESIZED = 'BROWSER_RESIZED';
    exports.BROWSER_SCROLLED = 'BROWSER_SCROLLED';
  });;define('nudoru.events.ComponentEvents',
  function(require, module, exports) {
    exports.MODAL_COVER_SHOW = 'MODAL_COVER_SHOW';
    exports.MODAL_COVER_HIDE = 'MODAL_COVER_HIDE';
    exports.MENU_SELECT = 'MENU_SELECT';
  });;define('nudoru.events.Emitter',
  function (require, module, exports) {
    var _subjectMap = {};

    /**
     * Add an event as observable
     * @param evtStr Event name string
     * @param handler onNext() subscription function
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribe(evtStr, handler, once) {
      _subjectMap[evtStr] || (_subjectMap[evtStr] = []);

      _subjectMap[evtStr] = {
        once: once,
        handler: handler,
        subject: new Rx.Subject()
      };

      return _subjectMap[evtStr].subject.subscribe(handler);
    }

    /**
     * Maps a module/command's execute() function as the handler for onNext
     * @param evtStr Event name string
     * @param cmdModule Module name
     * @param once will complete/dispose after one fire
     * @returns {*}
     */
    function subscribeCommand(evtStr, cmdModule, once) {
      var cmd = require(cmdModule);
      if(cmd.hasOwnProperty('execute')) {
        return subscribe(evtStr, cmd.execute, once);
      } else {
        throw new Error('Emitter cannot map '+evtStr+' to command '+cmdModule+': must have execute()');
      }
    }

    /**
     * Publish a event to all subscribers
     * @param evtStr
     * @param data
     */
    function publish(evtStr, data) {
      var subjObj = _subjectMap[evtStr];

      if(!subjObj) {
        return;
      }

      subjObj.subject.onNext(data);

      if(subjObj.once) {
        subjObj.subject.onCompleted();
        subjObj.subject.dispose();
        subjObj = null;
      }
    }

    /**
     * Cleanup
     */
    function dispose() {
      var subjects = _subjectMap;
      for (var prop in subjects) {
        if (hasOwnProp.call(subjects, prop)) {
          subjects[prop].subject.dispose();
        }
      }

      _subjectMap = {};
    }
    
    exports.subscribe = subscribe;
    exports.subscribeCommand = subscribeCommand;
    exports.publish = publish;
    exports.dispose = dispose;

  });;define('nudoru.events.EventCommandMap',
  function (require, module, exports) {

    var _eventDispatcher = require('nudoru.events.EventDispatcher'),
      _commandMap = Object.create(null);

    /**
     * Register the event to a command
     * @param evt Event string
     * @param command Command class
     * @param once  Umap after the first event publish
     */
    function map(evt, command, once) {

      if (hasCommand(evt, command)) {
        return;
      }

      if (_commandMap[evt] === undefined) {
        _commandMap[evt] = {};
      }

      var evtCommandMap = _commandMap[evt];

      var callback = function (args) {
        routeToCommand(evt, command, args, once);
      };

      evtCommandMap[command] = callback;

      _eventDispatcher.subscribe(evt, callback);
    }

    /**
     * Routes the event to the command
     * @param evt
     * @param command
     * @param args
     * @param once
     */
    function routeToCommand(evt, command, args, once) {
      var cmd = command;
      cmd.execute.apply(command, [args]);
      cmd = null;
      if (once) {
        unmap(evt, command);
      }
    }

    /**
     * Unregister a command from an event
     * @param evt
     * @param command
     */
    function unmap(evt, command) {
      if (hasCommand(evt, command)) {
        var callbacksByCommand = _commandMap[evt],
          callback = callbacksByCommand[command];
        _eventDispatcher.unsubscribe(evt, callback);
        delete callbacksByCommand[command];
      }
    }

    /**
     * Determine if a command has been mapped to an event
     * @param evt
     * @param command
     * @returns {boolean}
     */
    function hasCommand(evt, command) {
      var callbacksByCommand = _commandMap[evt];
      if (callbacksByCommand === undefined) {
        return false;
      }
      var callback = callbacksByCommand[command];
      return callback !== undefined;
    }

    exports.map = map;
    exports.unmap = unmap;

  });;define('nudoru.events.EventDispatcher',
  function (require, module, exports) {
    var _eventMap = Object.create(null);

    /**
     * Subscribe a function to an event string
     * @param evtString String for the event
     * @param callback  Callback function
     * @param once Unsubscripe after the first fire
     */
    function subscribe(evtString, callback, once) {
      if (_eventMap[evtString] === undefined) {
        _eventMap[evtString] = [];
      }

      _eventMap[evtString].push({
        evtstring: evtString,
        callback: callback,
        once: once,
        priority: 0
      });
    }

    /**
     * Stop listening to the event
     * @param evtString
     * @param callback
     */
    function unsubscribe(evtString, callback) {
      if (_eventMap[evtString] === undefined) {
        return;
      }

      var listeners = _eventMap[evtString],
        callbackIdx = -1;

      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i].callback === callback) {
          callbackIdx = i;
        }
      }

      if (callbackIdx === -1) {
        return;
      }

      listeners.splice(callbackIdx, 1);

      if (listeners.length === 0) {
        delete _eventMap[evtString];
      }
    }

    /**
     * Fire an event to all registered listeners
     * @param evtString
     * @param data
     * @param context
     */
    function publish(evtString, data, context) {
      if (_eventMap[evtString] === undefined) {
        return;
      }

      var listeners = _eventMap[evtString],
        i = listeners.length;

      data = (data instanceof Array) ? data : [data];

      while (i--) {

        var listenerObj = listeners[i];

        var cnxt = context || listenerObj.callback;
        listenerObj.callback.apply(cnxt, data);
        if (listenerObj.once) {
          unsubscribe(listenerObj.evtstring, listenerObj.callback);
        }

      }
    }

    exports.subscribe = subscribe;
    exports.unsubscribe = unsubscribe;
    exports.publish = publish;

  });;define('nudoru.components.ComponentViewUtils',
  function (require, module, exports) {

    /**
     * Create shared 3d perspective for all children
     * @param el
     */
    function apply3DToContainer(el) {
      TweenLite.set(el, {
        css: {
          perspective: 800,
          perspectiveOrigin: '50% 50%'
        }
      });
    }

    /**
     * Apply basic CSS props
     * @param el
     */
    function apply3DToComponentElement(el) {
      TweenLite.set(el, {
        css: {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformOrigin: '50% 50%'
        }
      });
    }

    /**
     * Apply basic 3d props and set unique perspective for children
     * @param el
     */
    function applyUnique3DToComponentElement(el) {
      TweenLite.set(el, {
        css: {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformPerspective: 600,
          transformOrigin: '50% 50%'
        }
      });
    }

    exports.apply3DToContainer = apply3DToContainer;
    exports.apply3DToComponentElement = apply3DToComponentElement;
    exports.applyUnique3DToComponentElement = applyUnique3DToComponentElement;

  });
;define('nudoru.components.MessageBoxView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _highestZ = 1000,
      _defaultWidth = 400,
      _types = {
        DEFAULT: 'default',
        INFORMATION: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default': '',
        'information': 'messagebox__information',
        'success': 'messagebox__success',
        'warning': 'messagebox__warning',
        'danger': 'messagebox__danger'
      },
      _mountPoint,
      _buttonIconTemplateID = 'template__messagebox--button-icon',
      _buttonNoIconTemplateID = 'template__messagebox--button-noicon',
      _template = require('nudoru.utils.NTemplate'),
      _modal = require('nudoru.components.ModalCoverView'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _componentUtils = require('nudoru.components.ComponentViewUtils');

    /**
     * Initialize and set the mount point / box container
     * @param elID
     */
    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    /**
     * Add a new message box
     * @param initObj
     * @returns {*}
     */
    function add(initObj) {
      var type = initObj.type || _types.DEFAULT,
        boxObj = createBoxObject(initObj);

      // setup
      _children.push(boxObj);
      _mountPoint.appendChild(boxObj.element);
      assignTypeClassToElement(type, boxObj.element);
      configureButtons(boxObj);

      _componentUtils.applyUnique3DToComponentElement(boxObj.element);

      // Set 3d CSS props for in/out transition
      TweenLite.set(boxObj.element, {
        css: {
          zIndex: _highestZ,
          width: initObj.width ? initObj.width : _defaultWidth
        }
      });

      // center after width has been set
      _domUtils.centerElementInViewPort(boxObj.element);

      // Make it draggable
      Draggable.create('#' + boxObj.id, {
        bounds: window,
        onPress:function() {
          _highestZ = Draggable.zIndex;
        }
      });

      // Show it
      transitionIn(boxObj.element);

      // Show the modal cover
      if (initObj.modal) {
        _modal.showHard(true);
      }

      return boxObj.id;
    }

    /**
     * Assign a type class to it
     * @param type
     * @param element
     */
    function assignTypeClassToElement(type, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    /**
     * Create the object for a box
     * @param initObj
     * @returns {{dataObj: *, id: string, modal: (*|boolean), element: *, streams: Array}}
     */
    function createBoxObject(initObj) {
      var id = 'js__messagebox-' + (_counter++).toString(),
        obj = {
          dataObj: initObj,
          id: id,
          modal: initObj.modal,
          element: _template.asElement('template__messagebox--default', {
            id: id,
            title: initObj.title,
            content: initObj.content
          }),
          streams: []
        };

      return obj;
    }

    /**
     * Set up the buttons
     * @param boxObj
     */
    function configureButtons(boxObj) {
      var buttonData = boxObj.dataObj.buttons;

      // default button if none
      if(!buttonData) {
        buttonData = [{
            label: 'Close',
            type: '',
            icon: 'times',
            id: 'default-close'
          }];
      }

      var buttonContainer = boxObj.element.querySelector('.footer-buttons');

      _domUtils.removeAllElements(buttonContainer);

      buttonData.forEach(function makeButton(buttonObj) {
        buttonObj.id = boxObj.id + '-button-' + buttonObj.id;

        var buttonEl;

        if(buttonObj.hasOwnProperty('icon')) {
          buttonEl = _template.asElement(_buttonIconTemplateID, buttonObj);
        }  else {
          buttonEl = _template.asElement(_buttonNoIconTemplateID, buttonObj);
        }

        buttonContainer.appendChild(buttonEl);

        var btnStream = Rx.Observable.fromEvent(buttonEl, _browserInfo.mouseClickEvtStr())
          .subscribe(function () {
            if(buttonObj.hasOwnProperty('onClick')) {
              buttonObj.onClick.call(this);
            }
            remove(boxObj.id);
          });
        boxObj.streams.push(btnStream);
      });

    }

    /**
     * Remove a box from the screen / container
     * @param id
     */
    function remove(id) {
      var idx = getObjIndexByID(id),
        boxObj;

      if (idx > -1) {
        boxObj = _children[idx];
        transitionOut(boxObj.element);
      }
    }

    /**
     * Show the box
     * @param el
     */
    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0, rotationX: 45, scale: 2});
      TweenLite.to(el,0.5, {alpha: 1, rotationX: 0, scale: 1, ease: Circ.easeOut});
    }

    /**
     * Remove the box
     * @param el
     */
    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        alpha: 0,
        rotationX: -45,
        scale: 0.25,
        ease: Circ.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    /**
     * Clean up after the transition out animation
     * @param el
     */
    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
        boxObj = _children[idx];

      boxObj.streams.forEach(function(stream) {
        stream.dispose();
      });

      Draggable.get('#' + boxObj.id).disable();

      _mountPoint.removeChild(el);

      _children[idx] = null;
      _children.splice(idx, 1);

      checkModalStatus();
    }

    /**
     * Determine if any open boxes have modal true
     */
    function checkModalStatus() {
      var isModal = false;

      _children.forEach(function (boxObj) {
        if (boxObj.modal === true) {
          isModal = true;
        }
      });

      if (!isModal) {
        _modal.hide(true);
      }
    }

    /**
     * Utility to get the box object by ID
     * @param id
     * @returns {number}
     */
    function getObjIndexByID(id) {
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function () {
      return _types
    };

  });;define('nudoru.components.ModalCoverView',
  function (require, module, exports) {
    var _mountPoint = document,
      _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _isHard,
      _emitter = require('nudoru.events.Emitter'),
      _componentEvents = require('nudoru.events.ComponentEvents'),
      _browserInfo = require('nudoru.utils.BrowserInfo');

    function initialize() {

      _isVisible = true;

      _modalCoverEl = _mountPoint.getElementById('modal__cover');
      _modalBackgroundEl = _mountPoint.querySelector('.modal__background');
      _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

      var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl, _browserInfo.mouseClickEvtStr()),
        modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, _browserInfo.mouseClickEvtStr());

      _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick)
        .subscribe(function () {
          onModalClick();
        });

      hide(false);
    }

    function getIsVisible() {
      return _isVisible;
    }

    function onModalClick() {
      if(_isHard) return;
      hide(true);
    }

    function showModalCover(animate) {
      _isVisible = true;
      var duration = animate ? 0.25 : 0;
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 1, ease: Quad.easeOut});
    }

    function show(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = false;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, duration * 2, {
        autoAlpha: 1,
        top: 22,
        ease: Back.easeOut,
        delay: 2
      });

      _emitter.publish(_componentEvents.MODAL_COVER_SHOW);
    }

    /**
     * A 'hard' modal view cannot be dismissed with a click, must be via code
     * @param animate
     */
    function showHard(animate) {
      if (_isVisible) {
        return;
      }

      _isHard = true;

      showModalCover(animate);
      TweenLite.to(_modalCloseButtonEl, 0, {autoAlpha: 0});
    }

    function hide(animate) {
      if (!_isVisible) {
        return;
      }
      _isVisible = false;
      _isHard = false;
      var duration = animate ? 0.25 : 0;
      TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
      TweenLite.to(_modalCoverEl, duration, {autoAlpha: 0, ease: Quad.easeOut});
      TweenLite.to(_modalCloseButtonEl, duration / 2, {
        autoAlpha: 0,
        top: -50,
        ease: Quad.easeOut
      });

      _emitter.publish(_componentEvents.MODAL_COVER_HIDE);
    }

    exports.initialize = initialize;
    exports.show = show;
    exports.showHard = showHard;
    exports.hide = hide;
    exports.visible = getIsVisible;

  });;define('nudoru.components.ToastView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _types = {
        DEFAULT : 'default',
        INFORMATION : 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default' : '',
        'information' : 'toast__information',
        'success' : 'toast__success',
        'warning' : 'toast__warning',
        'danger' : 'toast__danger'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _componentUtils = require('nudoru.components.ComponentViewUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var toastObj = createToastObject(initObj.title, initObj.content);

      _children.push(toastObj);

      _mountPoint.insertBefore(toastObj.element, _mountPoint.firstChild);

      assignTypeClassToElement(initObj.type, toastObj.element);

      _componentUtils.apply3DToContainer(_mountPoint);
      _componentUtils.apply3DToComponentElement(toastObj.element);

      var closeBtn = toastObj.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = Rx.Observable.fromEvent(closeBtn, _browserInfo.mouseClickEvtStr()),
        expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);

      toastObj.defaultButtonStream = Rx.Observable.merge(closeBtnSteam, expireTimeStream).take(1)
        .subscribe(function () {
          remove(toastObj.id);
        });

      transitionIn(toastObj.element);

      return toastObj.id;
    }

    function assignTypeClassToElement(type, element) {
      if(type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
    }

    function createToastObject(title, message) {
      var id = 'js__toast-toastitem-' + (_counter++).toString(),
        obj = {
          id: id,
          element: _template.asElement('template__component--toast', {
            id: id,
            title: title,
            message: message
          }),
          defaultButtonStream: null
        };

      return obj;
    }

    function remove(id) {
      var idx = getObjIndexByID(id),
        toast;

      if (idx > -1) {
        toast = _children[idx];
        rearrange(idx);
        transitionOut(toast.element);
      }
    }

    function transitionIn(el) {
      TweenLite.to(el, 0, {alpha: 0});
      TweenLite.to(el, 1, {alpha: 1, ease: Quad.easeOut});
      rearrange();
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.25, {
        rotationX: -45,
        alpha: 0,
        ease: Quad.easeIn, onComplete: function () {
          onTransitionOutComplete(el);
        }
      });
    }

    function onTransitionOutComplete(el) {
      var idx = getObjIndexByID(el.getAttribute('id')),
          toastObj = _children[idx];

      toastObj.defaultButtonStream.dispose();

      _mountPoint.removeChild(el);
      _children[idx] = null;
      _children.splice(idx, 1);
    }

    function rearrange(ignore) {
      var i = _children.length - 1,
        current,
        y = 0;

      for (; i > -1; i--) {
        if (i === ignore) {
          continue;
        }
        current = _children[i];
        TweenLite.to(current.element, 0.75, {y: y, ease: Bounce.easeOut});
        y += 10 + current.element.clientHeight;
      }
    }

    function getObjIndexByID(id) {
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function() { return _types };

  });;define('nudoru.components.ToolTipView',
  function (require, module, exports) {

    var _children = [],
      _counter = 0,
      _defaultWidth = 200,
      _endRotationTransform = -20,
      _types = {
        DEFAULT: 'default',
        INFORMATION: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger'
      },
      _typeStyleMap = {
        'default': '',
        'information': 'tooltip__information',
        'success': 'tooltip__success',
        'warning': 'tooltip__warning',
        'danger': 'tooltip__danger'
      },
      _positions = {
        T: 'T',
        TR: 'TR',
        R: 'R',
        BR: 'BR',
        B: 'B',
        BL: 'BL',
        L: 'L',
        TL: 'TL'
      },
      _positionMap = {
        'T': 'tooltip__top',
        'TR': 'tooltip__topright',
        'R': 'tooltip__right',
        'BR': 'tooltip__bottomright',
        'B': 'tooltip__bottom',
        'BL': 'tooltip__bottomleft',
        'L': 'tooltip__left',
        'TL': 'tooltip__topleft'
      },
      _mountPoint,
      _template = require('nudoru.utils.NTemplate'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _componentUtils = require('nudoru.components.ComponentViewUtils');

    function initialize(elID) {
      _mountPoint = document.getElementById(elID);
    }

    //obj.title, obj.content, obj.type, obj.target, obj.position
    function add(initObj) {
      initObj.type = initObj.type || _types.DEFAULT;

      var tooltipObj = createToolTipObject(initObj.title,
        initObj.content,
        initObj.position,
        initObj.targetEl);

      _children.push(tooltipObj);
      _mountPoint.appendChild(tooltipObj.element);

      tooltipObj.arrowEl = tooltipObj.element.querySelector('.arrow');
      assignTypeClassToElement(initObj.type, initObj.position, tooltipObj.element);

      _componentUtils.apply3DToContainer(_mountPoint);
      _componentUtils.apply3DToComponentElement(tooltipObj.element);

      TweenLite.set(tooltipObj.element, {
        css: {
          autoAlpha: 0,
          width: initObj.width ? initObj.width : _defaultWidth
        }
      });

      // cache these values, 3d transforms will alter size
      tooltipObj.width = tooltipObj.element.getBoundingClientRect().width;
      tooltipObj.height = tooltipObj.element.getBoundingClientRect().height;

      // set 3d rotation
      TweenLite.set(tooltipObj.element, {
        css: { rotationX:  _endRotationTransform}
      });

      assignEventsToTargetEl(tooltipObj);
      positionToolTip(tooltipObj);

      if(tooltipObj.position === _positions.L || tooltipObj.position === _positions.R) {
        centerArrowVertically(tooltipObj)
      }

      if(tooltipObj.position === _positions.T || tooltipObj.position === _positions.B) {
        centerArrowHorizontally(tooltipObj)
      }

      return tooltipObj.id;
    }

    function assignTypeClassToElement(type, position, element) {
      if (type !== 'default') {
        _domUtils.addClass(element, _typeStyleMap[type]);
      }
      _domUtils.addClass(element, _positionMap[position]);
    }

    function createToolTipObject(title, message, position, target) {
      var id = 'js__tooltip-tooltipitem-' + (_counter++).toString(),
        obj = {
          id: id,
          position: position,
          targetEl: target,
          elOverStream: null,
          elOutStream: null,
          height: 0,
          width: 0,
          element: _template.asElement('template__component--tooltip', {
            id: id,
            title: title,
            message: message
          }),
          arrowEl: null
        };

      return obj;
    }

    function assignEventsToTargetEl(tooltipObj) {
      tooltipObj.elOverStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseover')
        .subscribe(function (evt) {
          showToolTip(tooltipObj.id);
        });

      tooltipObj.elOutStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseout')
        .subscribe(function (evt) {
          hideToolTip(tooltipObj.id);
        });
    }

    function showToolTip(id) {
      var tooltipObj = getObjByID(id);
      positionToolTip(tooltipObj);
      transitionIn(tooltipObj.element);
    }

    function positionToolTip(tooltipObj) {
      var gutter = 15,
          xPos = 0,
          yPos = 0,
          tOriginH = '50%',
          tOriginV = '50%',
          tgtProps = tooltipObj.targetEl.getBoundingClientRect();

      if(tooltipObj.position === _positions.TL) {
        xPos = tgtProps.left - tooltipObj.width;
        yPos = tgtProps.top - tooltipObj.height;
        tOriginH = '100%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.T) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (tooltipObj.width / 2));
        yPos = tgtProps.top - tooltipObj.height - gutter;
        tOriginH = '50%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.TR) {
        xPos = tgtProps.right;
        yPos = tgtProps.top - tooltipObj.height;
        tOriginH = '0%';
        tOriginV = '100%';
      } else if(tooltipObj.position === _positions.R) {
        xPos = tgtProps.right + gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (tooltipObj.height / 2));
        tOriginH = '0%';
        tOriginV = '50%';
      } else if(tooltipObj.position === _positions.BR) {
        xPos = tgtProps.right;
        yPos = tgtProps.bottom;
        tOriginH = '0%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.B) {
        xPos = tgtProps.left + ((tgtProps.width / 2) - (tooltipObj.width / 2));
        yPos = tgtProps.bottom + gutter;
        tOriginH = '50%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.BL) {
        xPos = tgtProps.left - tooltipObj.width;
        yPos = tgtProps.bottom;
        tOriginH = '100%';
        tOriginV = '0%';
      } else if(tooltipObj.position === _positions.L) {
        xPos = tgtProps.left - tooltipObj.width - gutter;
        yPos = tgtProps.top + ((tgtProps.height / 2) - (tooltipObj.height / 2));
        tOriginH = '100%';
        tOriginV = '50%';
      }



      TweenLite.set(tooltipObj.element, {x: xPos, y: yPos, transformOrigin: tOriginH+' '+tOriginV});
    }

    function centerArrowHorizontally(tooltipObj) {
      var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
      TweenLite.set(tooltipObj.arrowEl, {x: (tooltipObj.width/2)-(arrowProps.width/2) });
    }

    function centerArrowVertically(tooltipObj) {
      var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
      TweenLite.set(tooltipObj.arrowEl, {y: (tooltipObj.height/2)-(arrowProps.height/2)-2 });
    }

    function hideToolTip(id) {
      var tooltipObj = getObjByID(id);
      transitionOut(tooltipObj.element);
    }

    function transitionIn(el) {
      TweenLite.to(el,0.25, {autoAlpha: 1,
         rotationX: 0,
        scaleY: 1,
        ease: Circ.easeOut
      });
    }

    function transitionOut(el) {
      TweenLite.to(el, 0.5, {
         rotationX:  _endRotationTransform,
        autoAlpha: 0,
        scaleY: 1,
        ease: Circ.easeIn
      });
    }

    function remove(el) {
      //var idx = getObjIndexByID(id),
      //  tooltip;
      //
      //if (idx > -1) {
      //  tooltip = _children[idx];
      getObjByElement(el).forEach(function(tooltip) {
        tooltip.elOverStream.dispose();
        tooltip.elOutStream.dispose();

        _mountPoint.removeChild(tooltip.element);

        var idx = getObjIndexByID(tooltip.id);

        _children[idx] = null;
        _children.splice(idx, 1);
      });
    }

    function getObjByID(id) {
      return _children.filter(function(child) {
        return child.id === id;
      })[0];
    }

    function getObjIndexByID(id) {
      return _children.map(function(child) { return child.id; }).indexOf(id);
    }

    function getObjByElement(el) {
      return _children.filter(function(child) {
        return child.targetEl === el;
      });
    }

    exports.initialize = initialize;
    exports.add = add;
    exports.remove = remove;
    exports.type = function () {
      return _types
    };
    exports.position = function () {
      return _positions
    };

  });