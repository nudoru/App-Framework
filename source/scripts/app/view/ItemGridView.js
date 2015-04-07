/**
 * Created by matt on 12/5/14.
 */

APP.createNameSpace('APP.AppView.ItemGridView');
APP.AppView.ItemGridView = (function(){

  var _self,
      _eventDispatcher,
      _containerEl,
      _appGlobals,
      _containerElID,
      _data,
      _packery,
      _isLayingOut,
      _children = [],
      _numItemsVisible,
      _itemOverStream,
      _itemOutStream,
      _itemSelectStream,
      _highestZ,
      _imagesLoaded,
      _firstTouchPosition = [],
      _lastTouchPosition = [],
      _touchDeltaTolerance = 10,
      _shouldProcessTouchEnd;

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getNumItemsVisible() {
    return _numItemsVisible;
  }

  function setNumItemsVisible(number) {
    if(_numItemsVisible === number) {
      return;
    }
    _numItemsVisible = number;
    _eventDispatcher.publish(APP.Events.GRID_VIEW_ITEMS_CHANGED, _numItemsVisible);
  }

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  function initialize(elID, data) {
    _self = this;
    _eventDispatcher = APP.EventDispatcher;
    _appGlobals = APP.globals();
    _containerElID = elID;
    _containerEl = document.getElementById(_containerElID);
    _data = data;

    _isLayingOut = false;

    render();

    if(_appGlobals.mobile.any()) {
      configureMobileStreams();
    } else {
      configureStreams();
    }

    _highestZ = _children.length;

    setNumItemsVisible(_children.length);
  }

  function render() {

    //initImagesLoaded();

    _data.forEach(function(item){
      var itemobj = ObjectUtils.basicFactory(APP.AppView.ItemGridView.AbstractGridItem);
      itemobj.initialize(item);
      _containerEl.appendChild(itemobj.element);
      itemobj.postRender();
      _children.push(itemobj);
    });

    // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
    if(APP.globals().isIE) {
      _containerEl.onselectstart = function() {
        return false;
      };
    }

    initPackery();

    staggerFrom(getItemsInView(), 0.5, {alpha: 0, ease:Quad.easeOut}, 0.15);
  }

  function staggerFrom(elList, dur, props, interval) {
    var i= 0,len=elList.length;
    for(;i<len;i++) {
      props.delay = (i+1) * interval;
      TweenLite.from(elList[i], dur, props);
    }
  }

  /**
   * Images loaded control - not used yet
   * http://imagesloaded.desandro.com/
   */
  //function initImagesLoaded() {
  //  _imagesLoaded = imagesLoaded(_containerElID, function(instance) {
  //    console.log('[ItemGridView] All images loaded');
  //  });
  //
  //  _imagesLoaded.on('fail', function(instance) {
  //    console.log('[ItemGridView] All images loaded, with errors');
  //    _eventDispatcher.publish(APP.Events.GRID_VIEW_IMAGE_LOAD_ERROR);
  //  });
  //}

  /**
   * Init Packery view for the grid
   */
  function initPackery() {
    var packeryGutter = _appGlobals.mobile.any() ? 10 : 33,
        packeryTransDuration = _appGlobals.mobile.any() ? '0.5s' : '0.75s';

    _packery = new Packery('#'+_containerElID, {
      itemSelector: '.item',
      gutter: packeryGutter,
      transitionDuration: packeryTransDuration
    });

    _packery.on('layoutComplete', onPackeryLayoutComplete);
  }

  /**
   * If the view is rearranging, we don't want to handle events from the iteme
   * because it would cause display issues. So ignore them with the isLayingOut
   * toggle until the layout has been completed
   * @param packery
   * @param items
   */
  function onPackeryLayoutComplete(packery, items) {
    _isLayingOut = false;

    _eventDispatcher.publish(APP.Events.GRID_VIEW_LAYOUT_COMPLETE);
  }

  /**
   * Gets an ojbect to pass to packery
   * @param item
   * @returns {*}
   */
  function getPackeryItem(item) {
    return item.element;
    //return item.element[0];
  }

  /**
   * Users RxJS streams rather than typical JS events. Allows for better
   * sorting and readability
   */
  function configureStreams() {

    _itemOverStream = Rx.Observable.fromEvent(_containerEl, 'mouseover')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function (id) {
        selectItemByID(id);
      });

    _itemOutStream = Rx.Observable.fromEvent(_containerEl, 'mouseout')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function (id) {
        deselectItemByID(id);
      });

    _itemSelectStream = Rx.Observable.fromEvent(_containerEl, 'click')
      .filter(filterForMouseEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function(id) {
        depressItemByID(id);
        _eventDispatcher.publish(APP.Events.ITEM_SELECT, id);
      });

  }

  function filterForMouseEventsOnItems(evt) {
    evt.preventDefault();

    var target = evt.target;

    if(target === null) {
      return false;
    }

    // Need to traverse up the DOM for IE9
    var el = getTargetElMatching(target, '.item__content');
    if(el){
      return el.tagName.toLowerCase() === 'ul';
    }
    return false;
  }

  function getMouseEventTargetID(evt) {
    var target = getTargetElMatching(evt.target, '.item__content');
    return target.getAttribute('data-value');
  }

  function getTargetElMatching(el, cls) {
    return DOMUtils.closest(el, cls);
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
    _containerEl.addEventListener('touchstart', function(evt) {
      _firstTouchPosition = _lastTouchPosition = TouchUtils.getCoords(evt);
      _shouldProcessTouchEnd = false;
    }, false);

    _containerEl.addEventListener('touchmove', function(evt) {
      _lastTouchPosition = TouchUtils.getCoords(evt);
    }, false);

    _itemSelectStream = Rx.Observable.fromEvent(_containerEl, 'touchend')
      .filter(processTouchEndEventsOnItems)
      .map(getMouseEventTargetID)
      .subscribe(function(id) {
        if(_shouldProcessTouchEnd) {
          depressItemByID(id);
          _eventDispatcher.publish(APP.Events.ITEM_SELECT, id);
        }
      });

  }

  function processTouchEndEventsOnItems(evt) {
    var deltaX = Math.abs(_lastTouchPosition[0] - _firstTouchPosition[0]),
        deltaY = Math.abs(_lastTouchPosition[1] - _firstTouchPosition[1]);

    if(deltaX <= _touchDeltaTolerance && deltaY <= _touchDeltaTolerance) {
      _shouldProcessTouchEnd = true;
    }

    return filterForMouseEventsOnItems(evt);
  }

  //----------------------------------------------------------------------------
  //  Items
  //----------------------------------------------------------------------------

  function getItemsInView() {
    return _children
      .filter(function(item) {
        return item.isInViewport();
      })
      .filter(function(item) {
        return item.visible;
      })
      .map(function(item) {
        return item.element;
      });
  }

  function getItemByID(id) {
    var i = 0,
        len = _children.length;
    for(; i<len; i++ ) {
      if(_children[i].getID() === id) {
        return _children[i];
      }
    }

    return null;
  }

  function deselectAllItems() {
    var i = 0,
        len = _children.length;
    for(; i<len; i++ ) {
      _children[i].deselect();
    }
  }

  function selectItemByID(id) {
    if(_isLayingOut) {
      return;
    }

    var item = getItemByID(id);
    if(item !== null) {
      deselectAllItems();
      elementToTop(item.element);
      item.select();
      resetOtherItems(item.element);
    }
  }

  function deselectItemByID(id) {
    if(_isLayingOut) {
      return;
    }

    var item = getItemByID(id);
    if(item !== null) {
      item.deselect();
      unfadeOtherItems(item.element);
    }
  }

  function depressItemByID(id) {
    if(_isLayingOut) {
      return;
    }

    var item = getItemByID(id);
    if(item !== null) {
      item.depress();
      unfadeOtherItems(item.element);
    }
  }

  /**
   * Raises an item to the top of the view stack so it appears above other items
   * @param element
   */
  function elementToTop(element) {
    element.style.zIndex = ++_highestZ;
  }

  //----------------------------------------------------------------------------
  //  Fade items OTHER than the one your mouse is over
  //----------------------------------------------------------------------------

  /**
   * Gets a list of all items in the viewport excluding a certain one.
   * Used to fade other items on mouse over
   * @param excluded
   * @returns {*}
   */
  function getItemsInViewExcluding(excluded) {
    var items = getItemsInView(),
      idx = items.indexOf(excluded);

    if(idx > -1) {
      items.splice(idx, 1);
    }

    return items;
  }

  function fadeOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenLite.killDelayedCallsTo(otheritems);
    TweenLite.to(otheritems, 5, {scale:0.9, alpha:0.25, ease:Quad.easeIn, delay: 1});
  }

  // TODO merge this with unfade
  function resetOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenLite.killDelayedCallsTo(otheritems);
    TweenLite.to(otheritems, 0.25, {scale:1, alpha:1, ease:Quad.easeOut, onComplete: fadeOtherItems, onCompleteParams: [itemel]});
  }

  function unfadeOtherItems(itemel) {
    if(_isLayingOut) {
      return;
    }

    var otheritems = getItemsInViewExcluding(itemel);
    TweenLite.killDelayedCallsTo(otheritems);
    TweenLite.to(otheritems, 0.25, {scale:1, alpha:1, ease:Quad.easeOut});
  }

  //----------------------------------------------------------------------------
  //  Updates
  //----------------------------------------------------------------------------

  /**
   * Shows or hides an item based on it's presence in the visibleArray.
   * Items NOT in in the array are hidden. This array is generated in the model
   * based on filtering criteria
   * @param visibleArray
   */
  function updateItemVisibility(visibleArray) {
    var len = visibleArray.length;

    _children.forEach(function(item) {
      var i = 0,
          found = false;

      for(; i<len; i++) {
        if(item.getID() === visibleArray[i].id) {
          found = true;
          break;
        }
      }

      if(found) {
        showItem(item);
      } else {
        hideItem(item);
      }
    });

    setNumItemsVisible(visibleArray.length);

    _isLayingOut = true;

    _packery.layout();
  }

  function showItem(item) {
    _packery.unignore(getPackeryItem(item));
    item.show();
  }

  function hideItem(item) {
    // Raised to top so that the fade out animation is visible over shown items
    elementToTop(item.element);
    _packery.ignore(getPackeryItem(item));
    item.hide();
  }

  function showAllItems() {
    _children.forEach(function(item) {
      showItem(item);
    });

    setNumItemsVisible(_children.length);

    _packery.layout();
  }

  return {
    initialize: initialize,
    render: render,
    showAllItems: showAllItems,
    updateItemVisibility: updateItemVisibility,
    getNumItemsVisible: getNumItemsVisible
  };

}());

//----------------------------------------------------------------------------
//  Grid Items
//----------------------------------------------------------------------------

APP.createNameSpace('APP.AppView.ItemGridView.AbstractGridItem');
APP.AppView.ItemGridView.AbstractGridItem = {
  state: {
    visible: true,
    selected: false
  },

  methods: {
    eventDispatcher: APP.EventDispatcher,
    data: null,
    template: '',
    renderedHTML: null,
    element: null,
    elementContent: null,
    dataEl: null,
    imageEl: null,
    imageAlphaTarget: 0.25,

    getID: function() {
      if(this.data) {
        return this.data.id;
      }

      return null;
    },

    initialize: function(data) {
      this.data = data;
      this.render();
    },

    render: function() {
      var templateHTML = '<div class="item"><ul class="item__content <%= categories[0] %>" data-value="<%= id %>">' +
        '<li class="item__image"><div class="item__image-wrapper"><img src="<%= previewImage %>"></div></li>' +
        '<ul class="item__data">' +
        '<li class="item__data-title"><%= title %></li>' +
        '<ul class="item__data-metadata">' +
        '<li class="left">' +
        '<% _.each(categories, function(cat) { %>' +
        '<i class="fa fa-cube"></i><%= cat %>' +
        '<% }); %>' +
        '</li>' +
        '<li class="right"><i class="fa fa-puzzle-piece"></i><%= complexity %></li>' +
        '</ul>' +
        '</ul>' +
        '</li>' +
        '</ul></div>';
      this.template = _.template(templateHTML);

      this.renderedHTML = this.template(this.data);

      this.element = DOMUtils.HTMLStrToNode(this.renderedHTML);
      this.elementContent = this.element.querySelector('.item__content');
      this.dataEl = this.element.querySelector('.item__data');
      this.imageEl = this.element.querySelector('.item__image-wrapper');
    },

    /**
     * Calculations needed after the items is added to the container is on the DOM
     */
    postRender: function() {
      this.imageAlphaTarget = window.getComputedStyle(this.imageEl,null).getPropertyValue('opacity');
    },

    isInViewport: function() {
      return DOMUtils.isElementInViewport(this.element);
    },

    show: function() {
      if(this.visible || this.element === undefined) {
        return;
      }
      this.visible = true;

      if(this.isInViewport()) {
        TweenLite.to(this.element, 0.25, { autoAlpha: 1, scale:1, ease: Circ.easeOut});
      } else {
        TweenLite.to(this.element, 0, { autoAlpha: 1, scale: 1});
      }
    },

    hide: function() {
      if(!this.visible || this.element === undefined) {
        return;
      }
      this.visible = false;

      if(this.isInViewport()) {
        TweenLite.to(this.element, 1, {autoAlpha: 0, scale:0.25, ease: Expo.easeOut, onComplete:this.resetHiddenItemSize.bind(this)});
      } else {
        TweenLite.to(this.element, 0, {autoAlpha: 0, scale:0.25, onComplete:this.resetHiddenItemSize.bind(this)});
      }

    },

    /**
     * Resetting the elements size prevents odd packery behavior as it tries to fit resizing items
     */
    resetHiddenItemSize: function() {
      TweenLite.to(this.element, 0, { scale: 1});
    },

    toggleVisibility: function() {
      if(this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },

    /**
     * On item mouse over
     */
    select: function() {
      if(this.selected || this.element === undefined || !this.visible) {
        return;
      }
      this.selected = true;

      //boxShadow: "5px 5px 20px rgba(0,0,0,.25)",
      TweenLite.to(this.element,0.25, {scale: 1.05, ease:Back.easeOut});
      TweenLite.to(this.imageEl, 1, {alpha: 1, scale: 1.25, ease:Circ.easeOut});
    },

    /**
     * On item click / tap
     */
    depress: function() {
      if(this.element === undefined || !this.visible) {
        return;
      }

      var tl = new TimelineLite();
      tl.to(this.element,0.1, {scale:0.8, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});

      TweenLite.to(this.imageEl,0.5, {alpha:this.imageAlphaTarget, scale: 1, ease:Circ.easeOut});
    },

    /**
     * On item mouse out
     */
    deselect: function() {
      if(!this.selected || this.element === undefined || !this.visible) {
        return;
      }
      this.selected = false;

      //boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      TweenLite.to(this.element,0.5, {scale: 1, ease:Back.easeOut});
      TweenLite.to(this.imageEl,0.5, {alpha:this.imageAlphaTarget, scale: 1, ease:Circ.easeOut});
    },

    toggleSelect: function() {
      if(this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }

  },

  closures: []
};