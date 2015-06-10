define('Nudoru.Browser.DOMUtils',
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

  });