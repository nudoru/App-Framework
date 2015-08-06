//----------------------------------------------------------------------------
//  A menu
//----------------------------------------------------------------------------

define('nudoru/component/DDMenuView',
  function(require, module, exports) {

    var _visible = false,
      _data = null,
      _children = [],
      _element = null,
      _anchorElement = null,
      _ddMenuEl = null,
      _menuOpenHeight = 0,
      _menuOverStream = null,
      _menuOutStream = null,
      _menuClickStream = null,
      _fadeOutComplete = null,
      _isKeepOpen = false,
      _firstTouchPosition = [],
      _lastTouchPosition = [],
      _touchDeltaTolerance = 10,
      _shouldProcessTouchEnd = false,
      _eventDispatcher = require('Nudoru.events.EventDispatcher'),
      _DOMUtils = require('nudoru/browser/DOMUtils'),
      _touchUtils = require('nudoru/browser/TouchUtils'),
      _componentEvents = require('nudoru/component/ComponentEvents'),
      _template = require('nudoru/component/NTemplate'),
      _browserInfo = require('nudoru/browser/BrowserInfo');

    function initialize(idata, keep) {
      _data = idata;
      _data.value = _data.value || _data.label.split(' ').join('_').toLowerCase();

      // Should the menu ever collapse or remain open always?
      _isKeepOpen = keep ? true : false;

      render();

      if(_browserInfo.mobile.any()) {
        configureMobileStreams();
      } else {
        configureStreams();
      }
    }

    function render() {
      _element = _template.asElement('template__menu-header', _data);
      _ddMenuEl = _element.querySelector('ul');
      _anchorElement = _element.querySelector('button');

      _data.items.forEach(buildMenuItems);

      _fadeOutComplete = true;

      // Need a little delay to get the height of the menu
      setTimeout(setMenuState, 1);
    }

    function buildMenuItems(item) {
      var menuitem = requireNew('nudoru/component/BasicMenuItemView');
      menuitem.initialize(item);
      _ddMenuEl.appendChild(menuitem.getElement());
      _children.push(menuitem);
    }

    function getElement() {
      return _element;
    }

    function getValue() {
      return _data.value;
    }

    function setMenuState() {
      // not able to get the true height from CSS, 39px is the height of a single line item
      var guessHeight = _data.items.length * 39,
        cssHeight = parseInt(window.getComputedStyle(_ddMenuEl,null).getPropertyValue("height"), 10);

      // use the highest measure
      _menuOpenHeight = Math.max(guessHeight, cssHeight);

      if(_isKeepOpen) {
        _visible = true;
      } else {
        _visible = false;
        _ddMenuEl.style.height = '0px';
        TweenLite.to(_ddMenuEl, 0, {autoAlpha: 0});
      }
    }

    function configureStreams() {
      _menuOverStream = Rx.Observable.fromEvent(_element, 'mouseover')
        .filter(filterForMouseEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(handleMenuOver);

      _menuOutStream = Rx.Observable.fromEvent(_element, 'mouseout')
        .filter(filterForMouseEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(handleMenuOut);

      _menuClickStream = Rx.Observable.fromEvent(_element, 'click')
        .filter(filterForMouseEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(handleMenuClick);
    }

    function filterForMouseEventsOnItems(evt) {
      var target = evt.target;
      if(target === null) {
        return false;
      }
      // Need to traverse up the DOM for IE9
      var el = getTargetElMatching(target, '.js__menu-item');
      if(el){
        return el.tagName.toLowerCase() === 'button';
      }
      return false;
    }

    function getMouseEventTargetValue(evt) {
      var target = getTargetElMatching(evt.target, '.js__menu-item');
      return target.getAttribute('data-value');
    }

    function getTargetElMatching(el, cls) {
      return _DOMUtils.closest(el, cls);
    }

    /**
     * The rationale here
     * 1. on start, register where the finger was on the screen
     * 2. update position on touch move
     * 3. on end, compare that the where the finger was
     * 4. if it's less than the tolerance, show the item
     * 5. if not, then it was probably a drag/scroll and ignore it
     * based on https://github.com/filamentgroup/tappy/blob/master/tappy.js
     */
    function configureMobileStreams() {
      // Note - had problems getting RxJS to work correctly here, used events
      _element.addEventListener('touchstart', (function(evt) {
        _firstTouchPosition = _lastTouchPosition = _touchUtils.getCoords(evt);
        _shouldProcessTouchEnd = false;
      }), false);

      _element.addEventListener('touchmove', (function(evt) {
        _lastTouchPosition = _touchUtils.getCoords(evt);
      }), false);

      var touchPressFunction = function(arg) {
        if(_shouldProcessTouchEnd) {
          handleMenuClick(arg);
        }
      };

      _menuClickStream = Rx.Observable.fromEvent(_element, 'touchend')
        .filter(processTouchEndEventsOnItems)
        .map(getMouseEventTargetValue)
        .subscribe(touchPressFunction);
    }

    function processTouchEndEventsOnItems(evt) {
      var deltaX = Math.abs(_lastTouchPosition[0] - _firstTouchPosition[0]),
        deltaY = Math.abs(_lastTouchPosition[1] - _firstTouchPosition[1]);

      if(deltaX <= _touchDeltaTolerance && deltaY <= _touchDeltaTolerance) {
        _shouldProcessTouchEnd = true;
      }

      return filterForMouseEventsOnItems(evt);
    }

    function handleMenuOver(data) {
      open();
      if(isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = getItemByValue(data);
        item.showOverEffect();
      }
    }

    function handleMenuOut(data) {
      close();
      if(isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = getItemByValue(data);
        item.showOutEffect();
      }
    }

    function handleMenuClick(data) {
      if(isHeaderObject(data)) {
        // Toggle visibility on mobile/tablet
        if(_browserInfo.mobile.any()) {
          toggleMenu();
        }
      } else {
        var item = getItemByValue(data);
        item.toggleSelect();
        item.showDepressEffect();
        _eventDispatcher.publish(_componentEvents.MENU_SELECT, data);
      }
    }

    function isHeaderObject(data) {
      return data === _data.value;
    }

    function toggleMenu() {
      if(_isKeepOpen) {
        return;
      }

      if(_visible) {
        close();
      } else {
        open();
      }
    }

    function getItemByValue(value) {
      return _children.filter(function(item) {
        return (item.getValue() === value);
      })[0];
    }

    function deselectAllItems() {
      _children.forEach(function(item) {
        item.deselect();
      });
    }

    function setSelections(data) {
      deselectAllItems();

      _children.forEach(function(item) {
        data.forEach(function(selection) {
          if(item.getLabel() === selection) {
            item.select();
          }
        });
      });
    }

    function open() {
      if(_visible || _element === undefined || _isKeepOpen) {
        return;
      }

      _visible = true;

      TweenLite.killTweensOf(_anchorElement);
      TweenLite.killTweensOf(_ddMenuEl);

      TweenLite.to(_anchorElement, 0.25, {paddingTop:'10px', ease:Circ.easeOut});
      TweenLite.to(_ddMenuEl, 0.5, {autoAlpha: 1, height:_menuOpenHeight, top:'0', ease:Circ.easeOut});
    }

    function close() {
      if(!_visible || _element === undefined || _isKeepOpen) {
        return;
      }
      _visible = false;

      _fadeOutComplete = false;

      var closeCompleteFunc = closeComplete;

      TweenLite.to(_anchorElement, 0.25, {paddingTop:'0px', ease:Circ.easeIn, delay:0.1});
      TweenLite.to(_ddMenuEl,0.1, {autoAlpha: 0, height: 0, ease:Circ.easeIn, onComplete: closeCompleteFunc, delay:0.1});
    }

    function closeComplete() {
      _fadeOutComplete = true;
    }

    module.exports.initialize = initialize;
    module.exports.getElement = getElement;
    module.exports.getValue = getValue;
    module.exports.open = open;
    module.exports.close = close;
    module.exports.toggleMenu = toggleMenu;
    module.exports.setSelections = setSelections;
    module.exports.deselectAllItems = deselectAllItems;

  });
