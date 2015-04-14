//----------------------------------------------------------------------------
//  A menu
//----------------------------------------------------------------------------

nudoru.createNameSpace('nudoru.components.DDMenuView');
nudoru.components.DDMenuView = {
  state: {
    visible: false,
    selected: false
  },

  methods: {
    eventDispatcher: nudoru.events.EventDispatcher,
    data: null,
    items: null,
    element: null,
    anchorElement: null,
    ddMenuEl: null,
    menuOpenHeight: 0,
    menuOverStream: null,
    menuOutStream: null,
    menuClickStream: null,
    fadeOutComplete: null,
    isKeepOpen: false,
    firstTouchPosition: [],
    lastTouchPosition: [],
    touchDeltaTolerance: 10,
    shouldProcessTouchEnd: false,

    initialize: function(data, keep) {

      this.data = data;
      this.data.value = this.data.value || this.data.label.split(' ').join('_').toLowerCase();
      this.items = [];

      // Should the menu ever collapse or remain open always?
      this.isKeepOpen = keep ? true : false;

      this.render();

      if(BrowserInfo.mobile.any()) {
        this.configureMobileStreams();
      } else {
        this.configureStreams();
      }
    },

    render: function() {
      this.element = nudoru.utils.NTemplate.asElement('template__menu-header', this.data);
      this.ddMenuEl = this.element.querySelector('ul');
      this.anchorElement = this.element.querySelector('button');
      this.data.items.forEach(this.buildMenuItems.bind(this));  // ensure proper scope!
      this.fadeOutComplete = true;
    },

    postRender: function() {
      // Need a little delay to get the height of the menu
      setTimeout(this.setMenuState.bind(this), 1);
    },

    setMenuState: function() {
      // not able to get the true height from CSS, 39px is the height of a single line item
      var guessHeight = this.data.items.length * 39,
          cssHeight = parseInt(window.getComputedStyle(this.ddMenuEl,null).getPropertyValue("height"), 10);

      // use the highest measure
      this.menuOpenHeight = Math.max(guessHeight, cssHeight);

      if(this.isKeepOpen) {
        this.visible = true;
      } else {
        this.visible = false;
        this.ddMenuEl.style.height = '0px';
        TweenLite.to(this.ddMenuEl, 0, {autoAlpha: 0});
      }
    },

    buildMenuItems: function(item) {
      var menuitem = nudoru.utils.ObjectUtils.basicFactory(nudoru.components.BasicMenuItemView);
      menuitem.initialize(item);
      this.ddMenuEl.appendChild(menuitem.element);
      this.items.push(menuitem);
    },

    configureStreams: function() {
      this.menuOverStream = Rx.Observable.fromEvent(this.element, 'mouseover')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuOver.bind(this));

      this.menuOutStream = Rx.Observable.fromEvent(this.element, 'mouseout')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuOut.bind(this));

      this.menuClickStream = Rx.Observable.fromEvent(this.element, 'click')
        .filter(this.filterForMouseEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(this.handleMenuClick.bind(this));
    },

    filterForMouseEventsOnItems: function(evt) {
      var target = evt.target;
      if(target === null) {
        return false;
      }
      // Need to traverse up the DOM for IE9
      var el = this.getTargetElMatching(target, '.js__menu-item');
      if(el){
        return el.tagName.toLowerCase() === 'button';
      }
      return false;
    },

    getMouseEventTargetValue: function(evt) {
      var target = this.getTargetElMatching(evt.target, '.js__menu-item');
      return target.getAttribute('data-value');
    },

    getTargetElMatching: function(el, cls) {
      return nudoru.utils.DOMUtils.closest(el, cls);
    },

    /**
     * The rationale here
     * 1. on start, register where the finger was on the screen
     * 2. update position on touch move
     * 3. on end, compare that the where the finger was
     * 4. if it's less than the tolerance, show the item
     * 5. if not, then it was probably a drag/scroll and ignore it
     * based on https://github.com/filamentgroup/tappy/blob/master/tappy.js
     */
    configureMobileStreams: function() {
      // Note - had problems getting RxJS to work correctly here, used events
      this.element.addEventListener('touchstart', (function(evt) {
        this.firstTouchPosition = this.lastTouchPosition = nudoru.utils.TouchUtils.getCoords(evt);
        this.shouldProcessTouchEnd = false;
      }).bind(this), false);

      this.element.addEventListener('touchmove', (function(evt) {
        this.lastTouchPosition = nudoru.utils.TouchUtils.getCoords(evt);
      }).bind(this), false);

      var touchPressFunction = function(arg) {
        if(this.shouldProcessTouchEnd) {
          this.handleMenuClick(arg);
        }
      };

      this.menuClickStream = Rx.Observable.fromEvent(this.element, 'touchend')
        .filter(this.processTouchEndEventsOnItems.bind(this))
        .map(this.getMouseEventTargetValue.bind(this))
        .subscribe(touchPressFunction.bind(this));
    },

    processTouchEndEventsOnItems: function(evt) {
      var deltaX = Math.abs(this.lastTouchPosition[0] - this.firstTouchPosition[0]),
          deltaY = Math.abs(this.lastTouchPosition[1] - this.firstTouchPosition[1]);

      if(deltaX <= this.touchDeltaTolerance && deltaY <= this.touchDeltaTolerance) {
        this.shouldProcessTouchEnd = true;
      }

      return this.filterForMouseEventsOnItems(evt);
    },

    handleMenuOver: function(data) {
      this.open();
      if(this.isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = this.getItemByValue(data);
        item.showOverEffect();
      }
    },

    handleMenuOut: function(data) {
      this.close();
      if(this.isHeaderObject(data)) {
        // nothing on header
      } else {
        var item = this.getItemByValue(data);
        item.showOutEffect();
      }
    },

    handleMenuClick: function(data) {
      if(this.isHeaderObject(data)) {
        // Toggle visibility on mobile/tablet
        if(BrowserInfo.mobile.any()) {
          this.toggleMenu();
        }
      } else {
        var item = this.getItemByValue(data);
        item.toggleSelect();
        item.showDepressEffect();
        this.eventDispatcher.publish(nudoru.events.ComponentEvents.MENU_SELECT, data);
      }
    },

    isHeaderObject: function(data) {
      return data === this.data.value;
    },

    toggleMenu: function() {
      if(this.isKeepOpen) {
        return;
      }

      if(this.visible) {
        this.close();
      } else {
        this.open();
      }
    },

    getAllItemElements: function() {
      var itemsarry = [];
      this.items.forEach(function(item) {
        itemsarry.push(item.element);
      });
      return itemsarry;
    },

    getItemByValue: function(value) {
      return this.items.filter(function(item) {
        if(item.data.value === value) {
          return true;
        } else {
          return false;
        }
      })[0];
    },

    deselectAllItems: function() {
      this.items.forEach(function(item) {
        item.deselect();
      });
    },

    setSelections: function(data) {
      this.deselectAllItems();

      this.items.forEach(function(item) {
        data.forEach(function(selection) {
          if(item.label === selection) {
            item.select();
          }
        });
      });
    },

    open: function() {
      if(this.visible || this.element === undefined || this.isKeepOpen) {
        return;
      }

      this.visible = true;

      //this.ddMenuEl.style.height = 'auto';

      TweenLite.killTweensOf(this.anchorElement);
      TweenLite.killTweensOf(this.ddMenuEl);

      TweenLite.to(this.anchorElement, 0.25, {paddingTop:'10px', ease:Circ.easeOut});
      TweenLite.to(this.ddMenuEl, 0.5, {autoAlpha: 1, height:this.menuOpenHeight, top:'0', ease:Circ.easeOut});
    },

    close: function() {
      if(!this.visible || this.element === undefined || this.isKeepOpen) {
        return;
      }
      this.visible = false;

      this.fadeOutComplete = false;

      var closeCompleteFunc = this.closeComplete.bind(this);

      TweenLite.to(this.anchorElement, 0.25, {paddingTop:'0px', ease:Circ.easeIn, delay:0.1});
      TweenLite.to(this.ddMenuEl,0.1, {autoAlpha: 0, height: 0, ease:Circ.easeIn, onComplete: closeCompleteFunc, delay:0.1});
    },

    closeComplete: function() {
      //this.ddMenuEl.style.height = '0px';
      this.fadeOutComplete = true;
    }

  }
};

//----------------------------------------------------------------------------
//  A menu item
//----------------------------------------------------------------------------

nudoru.createNameSpace('nudoru.components.BasicMenuItemView');
nudoru.components.BasicMenuItemView = {
  state: {
    visible: true,
    selected: false
  },

  methods: {
    eventDispatcher: nudoru.events.EventDispatcher,
    data: null,
    label: '',
    element: null,
    iconElement: null,
    anchorElement: null,
    labelOverStream: null,
    labelOutStream: null,
    labelSelectStream: null,
    iconDeselectedClass: null,
    iconSelectedClass: null,
    toggle: null,

    initialize: function(data) {
      this.data = data;

      if(this.data.toggle) {
        this.toggle = true;
        this.iconSelectedClass = 'fa-check';
        this.iconDeselectedClass = 'fa-circle-thin';
      }

      data.label = nudoru.utils.StringUtils.toTitleCase(data.label);

      this.label = data.label;

      this.render();

      this.selected = false;
    },

    render: function() {
      if(this.toggle) {
        this.element = nudoru.utils.NTemplate.asElement('template__menu-item-icon', this.data);
      } else {
        this.element = nudoru.utils.NTemplate.asElement('template__menu-item', this.data);
      }

      this.iconElement = this.element.querySelector('i');
      this.anchorElement = this.element.querySelector('button');
    },

    select: function() {
      if(this.selected || this.element === undefined) {
        return;
      }
      this.selected = true;

      if(this.toggle) {
        nudoru.utils.DOMUtils.removeClass(this.iconElement, this.iconDeselectedClass);
        nudoru.utils.DOMUtils.addClass(this.iconElement, this.iconSelectedClass);
      }
    },

    showOverEffect: function() {
      TweenLite.to(this.element, 0.1, {backgroundColor:'rgba(255,255,255,.25)', ease:Circ.easeOut});
    },

    showOutEffect: function() {
      TweenLite.to(this.element, 0.25, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
    },

    showDepressEffect: function() {
      var tl = new TimelineLite();
      tl.to(this.element,0.1, {scale:0.9, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});
    },

    deselect: function() {
      if(!this.selected || this.element === undefined) {
        return;
      }
      this.selected = false;

      if(this.toggle) {
        nudoru.utils.DOMUtils.removeClass(this.iconElement, this.iconSelectedClass);
        nudoru.utils.DOMUtils.addClass(this.iconElement, this.iconDeselectedClass);
      }
    },

    toggleSelect: function() {
      if(this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }

  }
};