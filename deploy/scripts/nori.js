define('Nori.Events.AppEvents',
  function (require, module, exports) {
    exports.APP_INITIALIZED = 'APP_INITIALIZED';
    exports.MODEL_DATA_WAITING = 'MODEL_DATA_WAITING';
    exports.MODEL_DATA_READY = 'MODEL_DATA_READY';
    exports.MODEL_DATA_CHANGED = 'MODEL_DATA_CHANGED';
    exports.MODEL_DATA_SAVED = 'MODEL_DATA_SAVED';
    exports.MODEL_DATA_DESTROYED = 'MODEL_DATA_DESTROYED';
    exports.UPDATE_MODEL_DATA = 'UPDATE_MODEL_DATA';
    exports.RESUME_FROM_MODEL_STATE = 'RESUME_FROM_MODEL_STATE';
    exports.VIEW_INITIALIZED = 'VIEW_INITIALIZED';
    exports.VIEW_RENDERED = 'VIEW_RENDERED';
    exports.VIEW_CHANGED = 'VIEW_CHANGED';
    exports.VIEW_CHANGE_TO_MOBILE = 'VIEW_CHANGE_TO_MOBILE';
    exports.VIEW_CHANGE_TO_DESKTOP = 'VIEW_CHANGE_TO_DESKTOP';
    exports.ROUTE_CHANGED = 'ROUTE_CHANGED';
    exports.CHANGE_ROUTE = 'CHANGE_ROUTE';
    exports.SUBVIEW_STORE_STATE = 'SUBVIEW_STORE_STATE';
  });;define('Nori.Events.Emitter',
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

  });;define('Nori.Model',
  function (require, module, exports) {

    var _id,
      _changed = false,
      _entries = [],
      _store = {},
      _silent = false,
      _parentCollection,
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if(!initObj.id) {
        throw new Error('Model must be init\'d with an id');
      }

      _id = initObj.id;

      _silent = initObj.silent || false;

      if(initObj.store) {
        // set inital data silently
        //set(initObj.store, {silent: true});
        _changed = true;
        _store = initObj.store;
      }

    }

    function getID() {
      return _id;
    }

    function clear() {
      _store = {};
      _changed = true;
    }

    /**
     * Set property or merge in new data
     * @param key String = name of property to set, Object = will merge new props
     * @param options String = value of property to set, Object = options: silent
     */
    function set(key, options) {
      var silentSet = false;

      if(typeof key === 'object') {
        if(options !== null && typeof options === 'object') {
          silentSet = options.silent || false;
        }
        _store = _.merge({}, _store, key);
      } else {
        _store[key] = options;
      }

      // Mark changed
      _changed = true;

      if(!silentSet) {
        publishChange();
      }
    }

    /**
     * Returns a copy of the data
     * @returns *
     */
    function get(key) {
      return has(key) ? _store[key] : undefined;
    }

    /**
     * Returns true of the key is present in the store
     * @param key
     * @returns {boolean}
     */
    function has(key) {
      return _store.hasOwnProperty(key);
    }

    /**
     * Returns an array of the key/values. Results are cached and only regenerated
     * if changed (set)
     * @returns {Array}
     */
    function entries() {
      if(!_changed && _entries) {
        return _entries;
      }

      var arry = [];
      for(var key in _store) {
        arry.push({key:key, value:_store[key]});
      }

      _entries = arry;
      _changed = false;

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
     * Returns an array of all keys in the store
     * @returns {Array}
     */
    function keys() {
      //return entries().map(function(entry) {
      //  return entry.key;
      //});
      return Object.keys(_store);
    }

    /**
     * Returns an array of all vaules in the store
     * @returns {Array}
     */
    function values() {
      return entries().map(function(entry) {
        return entry.value;
      });
    }

    /**
     * Remove a value
     * @param key
     */
    function remove(key) {
      delete _store[key];
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
      return e[e.length-1];
    }

    function getAtIndex(i) {
      return entries()[i];
    }

    /**
     * Returns a copy of the data store
     * @returns {void|*}
     */
    function getStore() {
      return _.merge({},_store);
    }

    /**
     * Return a new object by "translating" the properties of the store from one key to another
     * @param tObj {currentProp, newProp}
     */
    function transform(tObj) {
      var transformed = {};

      for(var prop in tObj) {
        if(_store.hasOwnProperty(prop)) {
          transformed[tObj[prop]] = _store[prop];
        }
      }

      return transformed;
    }

    /**
     * Validates the store properties
     * key: {required: true|false, minLength: num, maxLength: num}
     * @param vObj
     */
    function validate(vObj) {
      return true;

      //var validation = {};
      //
      //for(var prop in vObj) {
      //  // TODO test store hasownprop
      //  var tests = vObj[prop],
      //      storeProp = _store[prop];
      //  for(var testProp in tests) {
      //    console.log('test '+prop+', for: '+testProp);
      //  }
      //}
      //
      //return validation;
    }

    /**
     * On change, emit event globally
     */
    function publishChange() {
      if(!_silent) {
        _emitter.publish(_appEvents.MODEL_DATA_CHANGED, {id:_id, storeType:'model',  store:getStore()});
      }

      if(_parentCollection) {
        _parentCollection.publishChange({id:_id, store:getStore()});
      }

    }

    function save() {
      //
    }

    function destroy() {
      _store = null;
      _parentCollection = null;
    }

    function toJSON() {
      return JSON.stringify(_store);
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

    exports.initialize = initialize;
    exports.getID = getID;
    exports.clear = clear;
    exports.set = set;
    exports.get = get;
    exports.has = has;
    exports.remove = remove;
    exports.keys = keys;
    exports.values = values;
    exports.entries = entries;
    exports.filterValues = filterValues;
    exports.size = size;
    exports.getFirst = getFirst;
    exports.getLast = getLast;
    exports.getAtIndex = getAtIndex;
    exports.getStore = getStore;
    exports.transform = transform;
    exports.validate = validate;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });;define('Nori.ModelCollection',
  function (require, module, exports) {

    var _id,
      _children = [],
      _silent = false,
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize(initObj) {
      if(!initObj.id) {
        throw new Error('ModelCollection must be init\'d with an id');
      }

      _id = initObj.id;
      _silent = initObj.silent || false;

      // BUG - call with this scope, calling from Nori.init scope is Window
      //if(initObj.models) {
      //  addStoresFromArray.call(this, initObj.models);
      //}
    }

    /**
     * Add an array of Model instances
     * @param sArry
     */
    function addStoresFromArray(sArry) {
      sArry.forEach(function(store) {
        add(store);
      });
    }

    /**
     * Create an add child Model stores from an array of objects
     * @param array Array of objects
     * @param idKey Key on each object to use for the ID of that Model store
     */
    function addFromObjArray(oArry, idKey, silent) {
      oArry.forEach(function(obj) {

        var id;

        if(obj.hasOwnProperty(idKey)) {
          id = obj[idKey];
        } else {
          id = _id +'child' + _children.length;
        }

        add(Nori.createModel({id:id, silent: silent, store: obj}));
      });

    }

    function getID() {
      return _id;
    }

    function add(store) {
      var currIdx = getStoreIndex(store.getID());

      store.setParentCollection(this);

      if(currIdx >= 0) {
        _children[currIdx] = store;
      } else {
        _children.push(store);
      }
    }

    function remove(storeID) {
      var currIdx = getStoreIndex(store.getID());
      if(currIdx >= 0) {
        _children[currIdx].setParentCollection(null);
        _children[currIdx] = null;
        _children.splice(currIdx,1);
      } else {
        console.log(_id +' remove, model not in collection: '+storeID);
      }
    }

    /**
     * Gets the Model by ID
     * @param storeID
     * @returns {T}
     */
    function getStore(storeID) {
      return _children.filter(function(store) {
        return store.getID() === storeID;
      })[0];
    }

    /**
     * Get the index in _children array by Model's ID
     * @param storeID
     * @returns {number}
     */
    function getStoreIndex(storeID) {
      return _children.map(function(store) {
        return store.getID();
      }).indexOf(storeID);
    }

    /**
     * On change, emit event globally
     */
    function publishChange(data) {
      if(!_silent) {
        _emitter.publish(_appEvents.MODEL_DATA_CHANGED, {id:_id, storeType:'collection', storeID: data.id, store:data.store});
      }

      // what will this send up?
      //if(_parentCollection) {
      //  _parentCollection.publishChange({id:_id, store:getStore()});
      //}

    }

    function hasModel(storeID) {
      if(_children[storeID]) {
        return true;
      }
      return false;
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
      return _children[_children.length-1];
    }

    function getAtIndex(i) {
      return _children[i];
    }

    /**
     * Runs a predidate on each child store
     * @param predicate
     * @returns {Array.<T>}
     */
    function filterCustom(predicate) {
      return _children.filter(predicate);
    }

    /**
     * Returns stores where the filter matches the prop / value pair
     * @param prop
     * @param value
     * @returns {Array.<T>}
     */
    function filter(prop, value) {
      return _children.filter(function(store) {
        return store.get(prop) === value;
      });
    }

    /**
     * Return an array of entries of each store
     * @returns {Array}
     */
    function entries() {
      var arry = [];
      _children.forEach(function(store){
        arry.push(store.entries());
      });
      return arry;
    }

    function save() {
      //
    }

    function destroy() {
      //
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

    exports.initialize = initialize;
    exports.getID = getID;
    exports.add = add;
    exports.addStoresFromArray = addStoresFromArray;
    exports.addFromObjArray = addFromObjArray;
    exports.remove = remove;
    exports.getStore = getStore;
    exports.hasModel = hasModel;
    exports.size = size;
    exports.getFirst = getFirst;
    exports.getLast = getLast;
    exports.getAtIndex = getAtIndex;
    exports.filterCustom = filterCustom;
    exports.filter = filter;
    exports.entries = entries;
    exports.save = save;
    exports.destroy = destroy;
    exports.toJSON = toJSON;
    exports.publishChange = publishChange;
    exports.setParentCollection = setParentCollection;
    exports.getParentCollection = getParentCollection;

  });;define('Nori.ApplicationView',
  function (require, module, exports) {

    var _appContainerEl,
      _appEl,
      _notificationView = require('nudoru.components.ToastView'),
      _toolTipView = require('nudoru.components.ToolTipView'),
      _messageBoxView = require('nudoru.components.MessageBoxView'),
      _modalCoverView = require('nudoru.components.ModalCoverView');

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

    function initialize() {
      initializeApplicationElements();
      initializeComponents();
    }

    function render() {
      ///
    }

    function initializeApplicationElements() {
      _appContainerEl = document.getElementById('app__container');
      _appEl = document.getElementById('app__contents');
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

    /**
     * Show a message box
     * @param obj
     */
    function addMessageBox(obj) {
      _messageBoxView.add(obj);
    }

    /**
     * Show a popup message box
     * @param message
     */
    function showAlert(message) {
      addMessageBox({
        title: 'Alert',
        content: message,
        type: _messageBoxView.type().DEFAULT,
        modal: false
      });
    }

    /**
     * Show notificiation
     * @param obj
     */
    function addNotification(obj) {
      _notificationView.add(obj);
    }

    /**
     * Display a notification "toast"
     * @param title The title
     * @param message The message
     */
    function showNotification(message, title, type) {
      addNotification({
        title: title || "Notification",
        type: type || _notificationView.type().DEFAULT,
        message: message
      });
    }

    /**
     * After app initialization, remove the loading message
     */
    function removeLoadingMessage() {
      var cover = document.getElementById('initialization__cover'),
        message = document.getElementsByClassName('initialization__message')[0];

      TweenLite.to(cover, 1, {
        alpha: 0, ease: Quad.easeOut, onComplete: function () {
          document.body.removeChild(cover);
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

    exports.initialize = initialize;

    exports.initializeApplicationElements = initializeApplicationElements;
    exports.initializeComponents = initializeComponents;

    exports.addMessageBox = addMessageBox;
    exports.addNotification = addNotification;
    exports.alert = showAlert;
    exports.notify = showNotification;
    exports.removeLoadingMessage = removeLoadingMessage;
    exports.layoutUI = layoutUI;
    exports.getAppContainerEl = getAppContainerEl;
    exports.getAppEl = getAppEl;

  });;define('Nori.View.BaseSubView',
  function (require, module, exports) {

    var _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _initialState,
      _currentState,
      _isMounted = false,
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents');

    /**
     * Initialization
     * @param initObj
     */
    function initialize(initObj) {
      if(!_initObj) {
        _initObj = initObj;
        _id = initObj.id;
        _templateObj = initObj.template;
        _initialState = _currentState = mergeDataSources(initObj);
        render();
      } else {
        update(initObj);
      }

      //console.log('-------------');
      //console.log('Subview: '+_id);
      //console.log('querydata: '+JSON.stringify(initObj.queryData));
      //console.log('modeldata: '+JSON.stringify(initObj.previousStateData));
      //console.log('boundModelData: '+JSON.stringify(initObj.boundModelData));
      //console.log('-------------');

    }

    /**
     * Merge data objects into one for the state object
     * @param dataObj
     * @returns {*}
     */
    function mergeDataSources(dataObj) {
      return _.merge({}, dataObj.previousStateData, dataObj.boundModelData, dataObj.queryData);
    }

    /**
     * Update state and rerender
     * @param dataObj
     * @returns {*}
     */
    function update(dataObj) {
      _currentState = mergeDataSources(dataObj);
      console.log(_id + ', subview update state: '+JSON.stringify(_currentState));
      if(_isMounted) {
        return render();
      }
    }

    /**
     * Render it, need to add it to a parent container, handled in higher level view
     * @returns {*}
     */
    function render() {
      //console.log(_id + ', subview render');

      _html = _templateObj(_currentState);
      _DOMElement = _domUtils.HTMLStrToNode(_html);
      return _DOMElement;
    }

    /**
     * Call after it's been added to a view
     */
    function viewDidMount() {
      //console.log(_id + ', subview did mount');
      _isMounted = true;
    }

    /**
     * Call when unloading and switching views
     */
    function viewWillUnMount() {
      //console.log(_id + ', subview will unmount');

      _isMounted = false;

      // cache state data to the model, will be restored as modelData on next show
      _emitter.publish(_appEvents.SUBVIEW_STORE_STATE, {id: _id, data:_currentState});
    }

    /**
     * Accessor for ID prop
     * @returns {*}
     */
    function getID() {
      return _id;
    }

    /**
     * Accessor for the DOM element
     * @returns {*}
     */
    function getDOMElement() {
      return _DOMElement;
    }

    exports.initialize = initialize;
    exports.update = update;
    exports.render = render;
    exports.getID = getID;
    exports.getDOMElement = getDOMElement;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnMount = viewWillUnMount;

  });;define('Nori.BasicView',
  function (require, module, exports) {

    var _self,
      _eventDispatcher = Nori.eventDispatcher();

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
      _eventDispatcher.publish(Nori.AppEvents.VIEW_INITIALIZED);
      render();
    }

    function render() {
      _eventDispatcher.publish(Nori.AppEvents.VIEW_RENDERED);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.render = render;

  });;define('Nori.View.BrowserEventsView',
  function (require, module, exports) {

    var _currentViewPortSize,
      _currentViewPortScroll,
      _uiUpdateLayoutStream,
      _browserScrollStream,
      _browserResizeStream,
      _positionUIElementsOnChangeCB,
      _emitter = require('Nori.Events.Emitter'),
      _browserEvents = require('nudoru.events.BrowserEvents');


    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initializeEventStreams() {
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
      _emitter.publish(_browserEvents.BROWSER_RESIZED, _currentViewPortSize);
    }

    function handleViewPortScroll() {
      _emitter.publish(_browserEvents.BROWSER_SCROLLED, _currentViewPortScroll);
    }

    function getCurrentViewPortSize() {
      return _currentViewPortSize;
    }

    /**
     * Cache the current view port size in a var
     */
    function setCurrentViewPortSize() {
      _currentViewPortSize = {
        width: window.innerWidth,
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
        top = scrollEL.scrollTop;

      left = left ? left : 0;
      top = top ? top : 0;

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

    exports.initializeEventStreams = initializeEventStreams;
    exports.setPositionUIElementsOnChangeCB = setPositionUIElementsOnChangeCB;
    exports.getMainScrollingView = getMainScrollingView;
    exports.setMainScrollingView = setMainScrollingView;
    exports.getCurrentViewPortSize = getCurrentViewPortSize;
    exports.getCurrentViewPortScroll = getCurrentViewPortScroll;

  });;define('Nori.View.MultiDeviceView',
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
      _appEvents = require('Nori.Events.AppEvents'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _emitter = require('nudoru.events.EventDispatcher');

    function initialize(initObj) {
      _isMobile = false;
      _tabletBreakWidth = 750;
      _phoneBreakWidth = 475;
      _drawerWidth = 250;
      _isDrawerOpen = false;

      _appEl = document.getElementById('app__contents');
      _drawerEl = document.getElementById('drawer');
      _drawerToggleButtonEl = document.querySelector('.drawer__menu-spinner-button > input');

      if(_drawerEl) {
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

      if(_drawerToggleButtonEl) {
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
        width: window.innerWidth,
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
      _emitter.publish(_appEvents.VIEW_CHANGE_TO_MOBILE);
    }

    function switchToDesktopView() {
      if (!_isMobile) {
        return;
      }
      _isMobile = false;
      closeDrawer();
      _emitter.publish(_appEvents.VIEW_CHANGE_TO_DESKTOP);
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

    exports.initialize = initialize;
    exports.openDrawer = openDrawer;
    exports.closeDrawer = closeDrawer;
    exports.checkForMobile = checkForMobile;
});;define('Nori.View.SubRouteViews',
  function (require, module, exports) {

    var _template = require('Nori.View.Template'),
      _routeViewMountPoint,
      _subViewMapping = Object.create(null),
      _currentSubView,
      _baseSubViewModuleID = 'Nori.View.BaseSubView',
      _subViewHTMLTemplatePrefix = 'template__',
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('Nori.Events.Emitter');

    /**
     * Set the location for the view to append, any contents will be removed prior
     * @param elID
     */
    function setRouteViewMountPoint(elID) {
      _routeViewMountPoint = document.getElementById(elID);
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
     * The controller module is extended from the Nori.View.BaseSubView module
     * @param templateID
     * @param controllerModID
     * @param route True | False, is is a subview
     */
    function mapView(templateID, controllerModID, isRoute, mountPoint) {
      _subViewMapping[templateID] = {
        htmlTemplate: _template.getTemplate(_subViewHTMLTemplatePrefix + templateID),
        controller: createSubView(requireUnique(controllerModID)),
        isRouteView: isRoute,
        mountPoint: mountPoint
      };
    }

    /**
     * Factory to create subview modules
     * @param extras
     * @returns {*}
     */
    function createSubView(extras) {
      return Nori.extend(extras, requireUnique(_baseSubViewModuleID));
    }

    /**
     * Map a route to a module view controller
     * The controller module is extended from the Nori.View.BaseSubView module
     * @param templateID
     * @param controllerModID
     */
    function mapRouteView(templateID, controllerModID) {
      mapView(templateID, controllerModID, true, _routeViewMountPoint);
    }

    /**
     * Update subview based on a change in bound model data
     * @param viewID
     * @param modelID
     * @param storeData
     */
    function updateViewData(viewID, storeData) {
      var subview = _subViewMapping[viewID];

      if (subview.controller.update) {
        subview.controller.update({boundModelData: storeData});
      }
    }

    /**
     * Show a mapped subview
     * @param templateID
     * @param dataObj
     */
    function showView(templateID, dataObj) {
      var subview = _subViewMapping[templateID],
          mountEl;

      if(!subview) {
        throw new Error('No subview mapped for id: ' + dataObj.templateID);
      }

      subview.controller.initialize({
        id: templateID,
        template: subview.htmlTemplate,
        queryData: dataObj
      });

      mountEl = document.getElementById(subview.mountPoint);
      mountEl.appendChild(subview.controller.getDOMElement());

      if(subview.controller.viewDidMount) {
        subview.controller.viewDidMount();
      }
    }

    /**
     * Show a view (in response to a route change)
     * @param dataObj props: templateID, route, data (from query string)
     * @param previousStateData previous state data from the model
     */
    function showRouteView(dataObj, previousStateData) {
      if(!_routeViewMountPoint) {
        throw new Error('No subview mount point set');
      }

      var subview = _subViewMapping[dataObj.templateID];

      if (subview) {
        unMountCurrentSubView();
      } else {
        throw new Error('No subview mapped for route: ' + dataObj.route + ' > ' + dataObj.templateID);
      }

      // state is from query string
      // modeldata is saved state from the last time the view was unloaded
      subview.controller.initialize({
        id: dataObj.templateID,
        template: subview.htmlTemplate,
        queryData: dataObj.queryData,
        previousStateData: previousStateData
      });

      TweenLite.set(_routeViewMountPoint, {alpha: 0});

      _routeViewMountPoint.appendChild(subview.controller.getDOMElement());
      _currentSubView = dataObj.templateID;

      if(subview.controller.viewDidMount) {
        subview.controller.viewDidMount();
      }

      TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease:Quad.easeIn});

      _emitter.publish(_appEvents.VIEW_CHANGED, dataObj.templateID);
    }

    /**
     * Remove the currently displayed view
     */
    function unMountCurrentSubView() {
      if (_currentSubView) {
        var subViewController = _subViewMapping[_currentSubView].controller;
        if (subViewController.viewWillUnMount) {
          subViewController.viewWillUnMount();
        }
      }

      _currentSubView = '';
      _domUtils.removeAllElements(_routeViewMountPoint);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.setRouteViewMountPoint = setRouteViewMountPoint;
    exports.template = getTemplate;
    exports.createSubView = createSubView;
    exports.mapView = mapView;
    exports.showView = showView;
    exports.mapRouteView = mapRouteView;
    exports.showRouteView = showRouteView;
    exports.updateViewData = updateViewData;
  });;define('Nori.View.Template',
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
;define('Nori.Router',
  function (require, module, exports) {

    var _routeMap = Object.create(null),
      _emitter = require('Nori.Events.Emitter'),
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
          queryData: queryStrObj
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

  });;define('Nori.BrowserResizedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('BrowserResizedCommand: '+data.width + 'w, ' + data.height + 'h');
    };

  });;define('Nori.BrowserScrolledCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('BrowserScrolledCommand: '+data.left + 'l, ' + data.top + 't');
    };

  });;define('Nori.ChangeRouteCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('ChangeRouteCommand, route: '+data.route);
      data.fromApp = true;
      Nori.setCurrentRoute(data);
    };

  });;define('Nori.InitializeAppCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      var _browserEvents = require('nudoru.events.BrowserEvents'),
          _appEvents = require('Nori.Events.AppEvents');

      console.log('InitializeAppCommand');

      // Core commands mapped in APP postInitialize()

      // Map route args:
      // url fragment for route, ID (template id), module name for controller, use singleton module

      // Default route
      Nori.mapRouteView('/', 'ControlsTesting', 'Nori.View.ControlsTestingSubView', false);

      // Other routes
      Nori.mapRouteView('/test', 'TestSubView', 'Nori.View.TemplateSubView', true);
      Nori.mapRouteView('/one', 'TestSubView1', 'Nori.View.TemplateSubView', true);
      Nori.mapRouteView('/two', 'TestSubView2', 'Nori.View.TemplateSubView', true);
      Nori.mapRouteView('/three', 'TestSubView3', 'Nori.View.TemplateSubView', true);

      Nori.view().removeLoadingMessage();

      //Nori.router().setRoute('/foo',{
      //  bar:'baz',
      //  baz:'foo'
      //});

      Nori.setCurrentRoute(Nori.router().getCurrentRoute());
    };

  });;define('Nori.ModelDataChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('ModelDataChanged, id: '+data.id+' ('+data.storeType+'), store data: '+JSON.stringify(data.store));
      //console.table(data.store);

      if(data.storeType === 'model') {
        Nori.notifyBoundViewsOfModelUpdate(data.id, data.store);
      }

    };

  });;define('Nori.RouteChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('RouteChangedCommand, route: '+data.route+', data: '+data.data);
    };

  });;define('Nori.SubViewStoreDataCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('SubViewStoreDataCommand, subviewid: '+data.id+', data: '+data.data);
      Nori.storeSubViewData(data.id, data.data);
    };

  });;define('Nori.URLHashChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('URLHashChangedCommand: fragment: '+data.fragment+', routeObj: '+data.routeObj);
      Nori.setCurrentRoute(data.routeObj);
    };

  });;define('Nori.UpdateModelDataCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('UpdateModelDataCommand, model id: '+data.id+', with data:');
      console.table(data.data);
    };

  });;define('Nori.ViewChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedCommand: '+data);
    };

  });;define('Nori.ViewChangedToDesktopCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedToDesktopCommand: '+data);
    };

  });;define('Nori.ViewChangedToMobileCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      console.log('ViewChangedToMobileCommand: '+data);
    };

  });;var Nori = (function () {
  var _config,
    _view,
    _appModelCollection,
    _emitterCommandMap = Object.create(null),
    _subviewDataModel,
    _modelViewBindingMap = Object.create(null),
    _appEvents = require('Nori.Events.AppEvents'),
    _browserEvents = require('nudoru.events.BrowserEvents'),
    _objectUtils = require('nudoru.utils.ObjectUtils'),
    _emitter = require('Nori.Events.Emitter'),
    _router = require('Nori.Router');

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getEmitter() {
    return _emitter;
  }

  function getRouter() {
    return _router;
  }

  function getView() {
    return _view;
  }

  function getConfig() {
    return _objectUtils.extend({}, _config);
  }

  //----------------------------------------------------------------------------
  //  Initialize
  //----------------------------------------------------------------------------

  /**
   * Init the app and inject the model and view
   * @param model
   * @param view
   */
  function initialize(initObj) {
    initializeConfig();
    _router.initialize();

    _view = initObj.view;

    initializeModels();

    initializeView();
    postInitialize();
  }

  /**
   * Initialize the global vars
   */
  function initializeConfig() {
    _config = {
      appConfig: APP_CONFIG_DATA,
      routes: [],
      currentRoute: {
        route: '/',
        data: undefined
      }
    };
  }

  function initializeModels() {
    _subviewDataModel = createModel({id:'SubViewDataModel', store:{}, noisy: true});

    _appModelCollection = createModelCollection({id:'GlobalModelCollection', silent: false});
    addModel(_subviewDataModel);
  }

  function initializeView() {
    _view.initialize();
  }

  function postInitialize() {
    bootStrapCommands();
    _emitter.publish(_appEvents.APP_INITIALIZED);
  }

  /**
   * Core APP command mapping
   */
  function bootStrapCommands() {
    // Browser events
    // unused mapEventCommand(_browserEvents.BROWSER_RESIZED, 'Nori.BrowserResizedCommand');
    // unused mapEventCommand(_browserEvents.BROWSER_SCROLLED, 'Nori.BrowserScrolledCommand');

    // App events
    // unused mapEventCommand(_appEvents.ROUTE_CHANGED, 'Nori.RouteChangedCommand');
    // unused mapEventCommand(_appEvents.VIEW_CHANGED, 'Nori.ViewChangedCommand');
    // unused mapEventCommand(_appEvents.VIEW_CHANGE_TO_MOBILE, 'Nori.ViewChangedToMobileCommand');
    // unused mapEventCommand(_appEvents.VIEW_CHANGE_TO_DESKTOP, 'Nori.ViewChangedToDesktopCommand');

    // Model
    mapEventCommand(_appEvents.MODEL_DATA_CHANGED, 'Nori.ModelDataChangedCommand');
    mapEventCommand(_appEvents.UPDATE_MODEL_DATA, 'Nori.UpdateModelDataCommand');

    // Subviews
    mapEventCommand(_browserEvents.URL_HASH_CHANGED, 'Nori.URLHashChangedCommand');
    mapEventCommand(_appEvents.CHANGE_ROUTE, 'Nori.ChangeRouteCommand');
    mapEventCommand(_appEvents.SUBVIEW_STORE_STATE, 'Nori.SubViewStoreDataCommand');
  }

  //----------------------------------------------------------------------------
  //  Models
  //  Simple model collection
  //----------------------------------------------------------------------------



  /**
   * Add a model to the application collection
   * @param name
   * @param store
   */
  function addModel(store) {
    _appModelCollection.add(store);
  }

  /**
   * Get a model from the application collection
   * @param storeID
   * @returns {void|*}
   */
  function getModel(storeID) {
    return _appModelCollection.get(storeID);
  }

  //----------------------------------------------------------------------------
  //  Factories - concatenative inheritance
  //----------------------------------------------------------------------------

  /**
   * Merges objects
   * @param dest Destination object
   * @param src Source
   * @returns {*}
   */
  function extend(dest, src) {
    dest = _.assign({}, src, dest);
    dest._super = src;
    return dest;
  }

  /**
   * Create a new Nori application instance
   * @param extras
   * @returns {*}
   */
  function createApplication(extras) {
    return extend(extras, this);
  }

  /**
   * Create a new model collection and initalize
   * @param initObj
   * @param extras
   * @returns {*}
   */
  function createModelCollection(initObj, extras) {
    var m = requireExtend('Nori.ModelCollection', extras);
    m.initialize(initObj);
    return m;
  }

  /**
   * Create a new model and initialize
   * @param initObj
   * @param extras
   * @returns {*}
   */
  function createModel(initObj, extras) {
    var m = requireExtend('Nori.Model', extras);
    m.initialize(initObj);
    return m;
  }

  /**
   * Creates main application view
   * @param extras
   * @returns {*}
   */
  function createApplicationView(extras) {

    // Concat main view with mixins
    var appView = _.assign({},
      require('Nori.ApplicationView'),
      require('Nori.View.SubRouteViews'));

    return extend(extras, appView);
    //return extend(extras, require('Nori.ApplicationView'));
  }

  //----------------------------------------------------------------------------
  //  Route Validation
  //  Route obj is {route: '/whatever', data:{var:value,...}
  //----------------------------------------------------------------------------

  /**
   * Add route to the list of valid routes
   * @param route
   */
  function addRouteToConfig(route) {
    _config.routes.push(route);
  }

  /**
   * Determine if the route has been mapped
   * @param route
   * @returns {boolean}
   */
  function isValidRoute(route) {
    return _config.routes.indexOf(route) > -1;
  }

  /**
   * Allow the router to run the route view mapping if it's valid. Typically reached from
   * the ChangeRouteCommand via an emitted event:
   *  _emitter.publish(_appEvents.CHANGE_ROUTE, {route:'/route', data:{}});
   * When the route is changed in this way, this method will fire twice, once for the
   * _router.setRoute and once when the URL hash change event (URLHashChangedCommand).
   * The route changed event is only published on this 2nd call which will trigger the
   * RouteChangedCommand to update views, etc.
   * @param routeObj props: route, data, fromApp
   */
  function setCurrentRoute(routeObj) {
    if (isValidRoute(routeObj.route)) {
      _config.currentRoute = routeObj;

      // fromApp prop is set in ChangeRouteCommand, indicates it's app not URL generated
      // else is a URL change and just execute current mapping
      if (routeObj.fromApp) {
        _router.setRoute(_config.currentRoute.route, _config.currentRoute.data);
      } else {
        _router.runCurrentRoute();
        _emitter.publish(_appEvents.ROUTE_CHANGED, routeObj);
      }
    } else {
      _router.setRoute(_config.currentRoute.route, _config.currentRoute.data);
    }
  }

  //----------------------------------------------------------------------------
  //  Wiring Services
  //----------------------------------------------------------------------------

  /**
   * Maps an event to trigger a command when it's published
   * @param evt The event string
   * @param cmdModuleName Module name of a command object, req execute(dataObj) function
   */
  function mapEventCommand(evt, cmdModuleName) {
    _emitterCommandMap[evt] = _emitter.subscribeCommand(evt, cmdModuleName);
  }

  /**
   * Set the router to execute the command when on the route
   * @param route
   * @param templateID
   * @param command
   */
  function mapRouteCommand(route, templateID, command) {
    _router.when(route, {
      templateID: templateID,
      controller: function executeRouteCommand(dataObj) {
        command.execute(dataObj);
      }
    });
  }

  /**
   * Maps a route to a view controller
   * @param route
   * @param templateID
   * @param controller
   * @param unique Should it be a singleton controller (false) or unique instance (true)
   */
  function mapRouteView(route, templateID, controller) {
    addRouteToConfig(route);

    _view.mapRouteView(templateID, controller);

    _router.when(route, {
      templateID: templateID,
      controller: function routeToViewController(dataObj) {
        // dataObj is from the router:
        // route: route,
        // templateID: routeObj.templateID,
        // queryData: queryStrObj
        showRouteView(dataObj);
      }
    });
  }

  /**
   * Pass to the view to show the subview. injects any previous data from the model
   * @param dataObj
   */
  function showRouteView(dataObj) {
    _view.showRouteView(dataObj, retrieveSubViewData(dataObj.templateID));
  }

  //----------------------------------------------------------------------------
  //  Subview data
  //----------------------------------------------------------------------------

  /**
   * Store state data from a subview, called from StoreSubViewDataCommand
   * @param id
   * @param dataObj
   */
  function storeSubViewData(id, dataObj) {
    _subviewDataModel.set(id, dataObj);
  }

  /**
   * Retrieve subview data for reinsertion, called from APP mapping of route/when()
   * @param id
   * @returns {*|{}}
   */
  function retrieveSubViewData(id) {
    return _subviewDataModel.get(id) || {};
  }

  //----------------------------------------------------------------------------
  //  Model & View Binding
  //----------------------------------------------------------------------------

  /**
   * Associate a model with an array of possilbe views. When notifyBoundViewsOfModelUpdate
   * is called, each view will be notified of the new data
   * @param modelID
   * @param viewID
   */
  function bindModelView(modelID, viewID) {
    var viewArry = _modelViewBindingMap[modelID];

    if(viewArry) {
      if(viewArry.indexOf(viewID) === -1) {
        viewArry.push(viewID);
      }
    } else {
      viewArry = [viewID];
    }

    _modelViewBindingMap[modelID] = viewArry;
  }

  /**
   * Notify any bound views on model change, not collection change
   * @param modelID
   * @param data
   */
  function notifyBoundViewsOfModelUpdate(modelID, data) {
    var viewArry = _modelViewBindingMap[modelID];

    if(viewArry) {
      viewArry.forEach(function (view) {
        _view.updateViewData(view, data);
      });
    }
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initialize: initialize,
    config: getConfig,
    getEmitter: getEmitter,
    router: getRouter,
    view: getView,
    createModelCollection: createModelCollection,
    createModel: createModel,
    addModel: addModel,
    getModel: getModel,
    createApplicationView: createApplicationView,
    setCurrentRoute: setCurrentRoute,
    mapRouteView: mapRouteView,
    mapRouteCommand: mapRouteCommand,
    mapEventCommand: mapEventCommand,
    extend: extend,
    createApplication: createApplication,
    storeSubViewData: storeSubViewData,
    retrieveSubViewData: retrieveSubViewData,
    bindModelView: bindModelView,
    notifyBoundViewsOfModelUpdate: notifyBoundViewsOfModelUpdate
  };

}
());