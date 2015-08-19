define('nudoru/browser/BrowserInfo',
  function (require, module, exports) {

    module.exports.appVersion  = navigator.appVersion;
    module.exports.userAgent   = navigator.userAgent;
    module.exports.isIE        = -1 < navigator.userAgent.indexOf("MSIE ");
    module.exports.isIE6       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 6");
    module.exports.isIE7       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 7");
    module.exports.isIE8       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 8");
    module.exports.isIE9       = module.exports.isIE && -1 < navigator.appVersion.indexOf("MSIE 9");
    module.exports.isFF        = -1 < navigator.userAgent.indexOf("Firefox/");
    module.exports.isChrome    = -1 < navigator.userAgent.indexOf("Chrome/");
    module.exports.isMac       = -1 < navigator.userAgent.indexOf("Macintosh;");
    module.exports.isMacSafari = -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome");

    module.exports.hasTouch     = 'ontouchstart' in document.documentElement;
    module.exports.notSupported = this.isIE6 || this.isIE7 || this.isIE8 || this.isIE9;

    module.exports.mobile = {
      Android   : function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
      },
      iOS       : function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera     : function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows   : function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any       : function () {
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
    module.exports.enhanced = function () {
      return !_browserInfo.isIE && !_browserInfo.mobile.any();
    };

    module.exports.mouseDownEvtStr = function () {
      return this.mobile.any() ? "touchstart" : "mousedown";
    };

    module.exports.mouseUpEvtStr = function () {
      return this.mobile.any() ? "touchend" : "mouseup";
    };

    module.exports.mouseClickEvtStr = function () {
      return this.mobile.any() ? "touchend" : "click";
    };

    module.exports.mouseMoveEvtStr = function () {
      return this.mobile.any() ? "touchmove" : "mousemove";
    };

  });

define('nudoru/browser/DOMUtils',
  function (require, module, exports) {
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    // element must be entirely on screen
    module.exports.isElementEntirelyInViewport = function (el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // element may be partialy on screen
    module.exports.isElementInViewport = function (el) {
      var rect = el.getBoundingClientRect();
      return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
    };

    module.exports.isDomObj = function (obj) {
      return !!(obj.nodeType || (obj === window));
    };

    module.exports.position = function (el) {
      return {
        left: el.offsetLeft,
        top : el.offsetTop
      };
    };

    // from http://jsperf.com/jquery-offset-vs-offsetparent-loop
    module.exports.offset = function (el) {
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
        top : ot
      };
    };

    module.exports.removeAllElements = function (el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    };

    //http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    module.exports.HTMLStrToNode = function (str) {
      var temp       = document.createElement('div');
      temp.innerHTML = str;
      return temp.firstChild;
    };

    module.exports.wrapElement = function (wrapperStr, el) {
      var wrapperEl = this.HTMLStrToNode(wrapperStr),
          elParent  = el.parentNode;

      wrapperEl.appendChild(el);
      elParent.appendChild(wrapperEl);
      return wrapperEl;
    };

    // http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
    module.exports.closest = function (el, selector) {
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
    module.exports.hasClass = function (el, className) {
      if (el.classList) {
        el.classList.contains(className);
      } else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    };

    module.exports.addClass = function (el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    };

    module.exports.removeClass = function (el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    };

    module.exports.toggleClass = function (el, className) {
      if (this.hasClass(el, className)) {
        this.removeClass(el, className);
      } else {
        this.addClass(el, className);
      }
    };

    /**
     * Get an array of elements in the container returned as Array instead of a Node list
     */
    module.exports.getQSElementsAsArray = function (el, cls) {
      return Array.prototype.slice.call(el.querySelectorAll(cls), 0);
    };

    module.exports.centerElementInViewPort = function (el) {
      var vpH = window.innerHeight,
          vpW = window.innerWidth,
          elR = el.getBoundingClientRect(),
          elH = elR.height,
          elW = elR.width;

      el.style.left = (vpW / 2) - (elW / 2) + 'px';
      el.style.top  = (vpH / 2) - (elH / 2) + 'px';
    };

    /**
     * Creates an object from the name (or id) attribs and data of a form
     * @param el
     * @returns {null}
     */
    module.exports.captureFormData = function (el) {
      var dataObj = Object.create(null),
          textareaEls, inputEls, selectEls;

      textareaEls = Array.prototype.slice.call(el.querySelectorAll('textarea'), 0);
      inputEls    = Array.prototype.slice.call(el.querySelectorAll('input'), 0);
      selectEls   = Array.prototype.slice.call(el.querySelectorAll('select'), 0);

      textareaEls.forEach(getInputFormData);
      inputEls.forEach(getInputFormData);
      selectEls.forEach(getSelectFormData);

      return dataObj;

      function getInputFormData(formEl) {
        dataObj[getElNameOrID(formEl)] = formEl.value;
      }

      function getSelectFormData(formEl) {
        var sel = formEl.selectedIndex, val = '';
        if (sel >= 0) {
          val = formEl.options[sel].value;
        }
        dataObj[getElNameOrID(formEl)] = val;
      }

      function getElNameOrID(formEl) {
        var name = 'no_name';
        if (formEl.getAttribute('name')) {
          name = formEl.getAttribute('name');
        } else if (formEl.getAttribute('id')) {
          name = formEl.getAttribute('id');
        }
        return name;
      }

    };

  });

define('nudoru/browser/EventConstants',
  function (require, module, exports) {

    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      URL_HASH_CHANGED: null,
      BROWSER_RESIZED : null,
      BROWSER_SCROLLED: null
    }));

  });

define('nudoru/browser/Lorem',
  function (require, module, exports) {

    var Lorem = (function () {

      var _currentText      = [],
          _textSets         = [],
          _maleFirstNames   = [],
          _femaleFirstNames = [],
          _lastNames        = [],
          _punctuation      = [],
          _months,
          _days,
          _initialized      = false,
          _arrayUtils       = require('nudoru/core/ArrayUtils'),
          _stringUtils      = require('nudoru/core/StringUtils'),
          _numberUtils      = require('nudoru/core/NumberUtils');

      _textSets = [
        "Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible"
      ];

      _lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy'.split(' ');

      _maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

      _femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephin Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

      _punctuation = ['.', '.', '.', '.', '?', '!'];

      _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

      function initialize() {
        if (_initialized) return;
        setCurrentTextSet(0);
        _initialized = true;
      }

      function setCurrentTextSet(index) {
        var _current = _textSets[index].toLowerCase();
        _currentText = _current.split(' ');
      }

      function getSentence(min, max) {
        var sentence = getText(min, max);

        return _stringUtils.capitalizeFirstLetter(sentence) + getRandomItem(_punctuation);
      }

      function getParagraph(min, max) {
        var str   = "",
            delim = " ",
            len   = _numberUtils.rndNumber(min, max),
            i     = 0;

        for (; i < len; i++) {
          if (i === len - 1) {
            delim = "";
          }
          str += getSentence(1, 10) + delim;
        }

        return str;
      }

      function getText(min, max) {
        var str   = "",
            delim = " ",
            len   = _numberUtils.rndNumber(min, max),
            i     = 0;

        for (; i < len; i++) {
          if (i === len - 1) {
            delim = "";
          }
          str += getRandomItem(_currentText) + delim;
        }

        return str;
      }

      function getRandomItem(arry) {
        var min = 0;
        var max = arry.length - 1;
        return arry[_numberUtils.rndNumber(min, max)];
      }

      function getFirstName() {
        return _numberUtils.rndNumber(0, 1) ? getRandomItem(_maleFirstNames) : getRandomItem(_femaleFirstNames);
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
        var month = _numberUtils.rndNumber(0, 11),
            wkday = _numberUtils.rndNumber(0, 4),
            date  = {
              monthNumber  : month + 1,
              monthName    : _months[month],
              monthDay     : _numberUtils.rndNumber(1, 28),
              weekDayNumber: wkday + 1,
              weekDay      : _days[wkday],
              year         : _arrayUtils.rndElement(['2010', '2011', '2012', '2013', '2014', '2015', '2016'])
            };

        date.string = date.monthName + ' ' + date.monthDay + ', ' + date.year;

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

      return {
        initialize  : initialize,
        getText     : getText,
        getSentence : getSentence,
        getParagraph: getParagraph,
        getFLName   : getFLName,
        getLFName   : getLFName,
        getDate     : getDate,
        fakeGUID    : fakeGUID
      };

    }());

    module.exports = Lorem;


  });

define('nudoru/browser/TouchUtils',
  function (require, module, exports) {

    module.exports = {

      // https://github.com/filamentgroup/tappy/blob/master/tappy.js
      getCoords: function (evt) {
        var ev      = evt.originalEvent || evt,
            touches = ev.touches || ev.targetTouches;

        if (touches) {
          return [touches[0].pageX, touches[0].pageY];
        }
        else {
          return null;
        }
      }

    };

  });
