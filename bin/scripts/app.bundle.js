(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * "Controller" for a Nori application. The controller is responsible for
 * bootstrapping the app and possibly handling socket/server interaction.
 * Any additional functionality should be handled in a specific module.
 */
var App = Nori.createApplication({

  mixins: [],

  /**
   * Create the main Nori App store and view.
   */
  store: require('./store/AppStore.js'),
  view: require('./view/AppView.js'),

  /**
   * Initialize
   * Called when App is required in main.js
   */
  initialize: function initialize() {
    this.view.initialize();

    this.store.initialize(); // store will acquire data dispatch event when complete
    this.store.subscribe('storeInitialized', this.onStoreInitialized.bind(this));
    this.store.loadStore();
  },

  /**
   * After the store data is ready
   */
  onStoreInitialized: function onStoreInitialized() {
    this.runApplication();
  },

  /**
   * Remove the "Please wait" cover and start the app
   */
  runApplication: function runApplication() {
    this.view.removeLoadingMessage();
    this.view.render();
    this.view.showViewFromURLHash(true); // Start with the route in the current URL
  }

});

module.exports = App;

},{"./store/AppStore.js":2,"./view/AppView.js":3}],2:[function(require,module,exports){
var _noriActionConstants = require('../../nori/action/ActionConstants.js'),
    _mixinMapFactory = require('../../nori/store/MixinMapFactory.js'),
    _mixinObservableSubject = require('../../nori/utils/MixinObservableSubject.js'),
    _mixinReducerStore = require('../../nori/store/MixinReducerStore.js');

/**
 * This application store contains "reducer store" functionality based on Redux.
 * The store state may only be changed from events as applied in reducer functions.
 * The store received all events from the event bus and forwards them to all
 * reducer functions to modify state as needed. Once they have run, the
 * handleStateMutation function is called to dispatch an event to the bus, or
 * notify subscribers via an observable.
 *
 * Events => handleApplicationEvents => applyReducers => handleStateMutation => Notify
 */
var AppStore = Nori.createStore({

  mixins: [_mixinMapFactory, _mixinReducerStore, _mixinObservableSubject()],

  initialize: function initialize() {
    this.addReducer(this.defaultReducerFunction);
    this.initializeReducerStore();
    this.createSubject('storeInitialized');
  },

  loadStore: function loadStore() {
    // Set initial state from data contained in the config.js file
    this.setState(Nori.config());
    this.storeReady();
  },

  /**
   * Set or load any necessary data and then broadcast a initialized event.
   */
  storeReady: function storeReady() {
    this.setState({ greeting: 'Hello world!' });

    // Testing
    console.log('Initial app state:', this.getState());

    this.notifySubscribersOf('storeInitialized');
  },

  /**
   * Modify state based on incoming events. Returns a copy of the modified
   * state and does not modify the state directly.
   * Can compose state transformations
   * return _.assign({}, state, otherStateTransformer(state));
   * @param state
   * @param action
   * @returns {*}
   */
  defaultReducerFunction: function defaultReducerFunction(state, action) {
    state = state || {};

    switch (action.type) {

      case _noriActionConstants.CHANGE_STORE_STATE:
        return _.assign({}, state, action.payload.data);

      default:
        return state;
    }
  },

  /**
   * Called after all reducers have run to broadcast possible updates. Does
   * not check to see if the state was actually updated.
   */
  handleStateMutation: function handleStateMutation() {
    console.log('Handle state mutation', this.getState());
    this.notifySubscribers();
  }

});

module.exports = AppStore();

},{"../../nori/action/ActionConstants.js":8,"../../nori/store/MixinMapFactory.js":11,"../../nori/store/MixinReducerStore.js":12,"../../nori/utils/MixinObservableSubject.js":15}],3:[function(require,module,exports){
var _mixinApplicationView = require('../../nori/view/ApplicationView.js'),
    _mixinNudoruControls = require('../../nori/view/MixinNudoruControls.js'),
    _mixinComponentViews = require('../../nori/view/MixinComponentViews.js'),
    _mixinRouteViews = require('../../nori/view/MixinRouteViews.js'),
    _mixinEventDelegator = require('../../nori/view/MixinEventDelegator.js'),
    _mixinObservableSubject = require('../../nori/utils/MixinObservableSubject.js');

/**
 * View for an application.
 */

var AppView = Nori.createView({

  mixins: [_mixinApplicationView, _mixinNudoruControls, _mixinComponentViews, _mixinRouteViews, _mixinEventDelegator(), _mixinObservableSubject()],

  initialize: function initialize() {
    this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.configureViews();
  },

  configureViews: function configureViews() {
    var defaultViewFactory = require('./TemplateViewComponent.js'),
        defaultView = defaultViewFactory(),
        styleView = defaultViewFactory(),
        controlsView = defaultViewFactory(),
        debugView = this.createComponentView(require('./DebugControlsTestingSubView.js'))();

    // Container for routed views
    this.setViewMountPoint('#contents');
    this.mapRouteToViewComponent('/', 'default', defaultView);
    this.mapRouteToViewComponent('/styles', 'debug-styletest', styleView);
    this.mapRouteToViewComponent('/controls', 'debug-controls', controlsView);
    this.mapRouteToViewComponent('/comps', 'debug-components', debugView);

    // Alternately, map views to different store states with MixinStoreStateViews
    //this.mapStateToViewComponent('TITLE', 'title', screenTitle);
  },

  /**
   * Draw and UI to the DOM and set events
   */
  render: function render() {
    //
  }

});

module.exports = AppView();

},{"../../nori/utils/MixinObservableSubject.js":15,"../../nori/view/ApplicationView.js":20,"../../nori/view/MixinComponentViews.js":21,"../../nori/view/MixinEventDelegator.js":22,"../../nori/view/MixinNudoruControls.js":23,"../../nori/view/MixinRouteViews.js":24,"./DebugControlsTestingSubView.js":4,"./TemplateViewComponent.js":5}],4:[function(require,module,exports){
/**
 * Module for testing Nudoru component classes and any thing else
 */
var DebugComponent = function DebugComponent() {

  var _lIpsum = require('../../nudoru/browser/Lorem.js'),
      _toolTip = require('../../nudoru/components/ToolTipView.js'),
      _appView = require('./AppView.js'),
      _actionOneEl,
      _actionTwoEl,
      _actionThreeEl,
      _actionFourEl,
      _actionFiveEl,
      _actionSixEl;

  function initialize(initObj) {
    _lIpsum.initialize();
  }

  function componentDidMount() {
    console.log(this.getID() + ', subview did mount');

    _actionOneEl = document.getElementById('action-one');
    _actionTwoEl = document.getElementById('action-two');
    _actionThreeEl = document.getElementById('action-three');
    _actionFourEl = document.getElementById('action-four');
    _actionFiveEl = document.getElementById('action-five');
    _actionSixEl = document.getElementById('action-six');

    //_toolTip.add({title:'', content:"This is a button, it's purpose is unknown.", position:'TR', targetEl: _actionFourEl, type:'information'});
    //_toolTip.add({title:'', content:"This is a button, click it and rainbows will appear.", position:'BR', targetEl: _actionFourEl, type:'success'});
    //_toolTip.add({title:'', content:"This is a button, it doesn't make a sound.", position:'BL', targetEl: _actionFourEl, type:'warning'});
    //_toolTip.add({title:'', content:"This is a button, behold the magic and mystery.", position:'TL', targetEl: _actionFourEl, type:'danger'});

    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'L',
      targetEl: _actionFourEl,
      type: 'information'
    });
    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'B',
      targetEl: _actionFourEl,
      type: 'information'
    });
    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'R',
      targetEl: _actionFourEl,
      type: 'information'
    });
    _toolTip.add({
      title: '',
      content: "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
      position: 'T',
      targetEl: _actionFourEl,
      type: 'information'
    });

    _actionOneEl.addEventListener('click', function actOne(e) {
      _appView.addMessageBox({
        title: _lIpsum.getSentence(2, 4),
        content: _lIpsum.getParagraph(2, 4),
        type: 'warning',
        modal: true,
        width: 500
      });
    });

    _actionTwoEl.addEventListener('click', function actTwo(e) {
      _appView.addMessageBox({
        title: _lIpsum.getSentence(10, 20),
        content: _lIpsum.getParagraph(2, 4),
        type: 'default',
        modal: false,
        buttons: [{
          label: 'Yes',
          id: 'yes',
          type: 'default',
          icon: 'check',
          onClick: function onClick() {
            console.log('yes');
          }
        }, {
          label: 'Maybe',
          id: 'maybe',
          type: 'positive',
          icon: 'cog',
          onClick: function onClick() {
            console.log('maybe');
          }
        }, {
          label: 'Nope',
          id: 'nope',
          type: 'negative',
          icon: 'times'
        }]
      });
    });

    _actionThreeEl.addEventListener('click', function actThree(e) {
      _appView.addNotification({
        title: _lIpsum.getSentence(3, 6),
        type: 'information',
        content: _lIpsum.getParagraph(1, 2)
      });

      _toolTip.remove(_actionFourEl);
    });

    _actionFourEl.addEventListener('click', function actFour(e) {
      console.log('Four');
    });

    _actionFiveEl.addEventListener('click', function actFour(e) {
      Nori.router().set('/styles', { prop: 'some data', moar: '25' });
    });

    _actionSixEl.addEventListener('click', function actFour(e) {
      console.log('nothing yet');
    });
  }

  return {
    initialize: initialize,
    componentDidMount: componentDidMount
  };
};

module.exports = DebugComponent;

},{"../../nudoru/browser/Lorem.js":28,"../../nudoru/components/ToolTipView.js":34,"./AppView.js":3}],5:[function(require,module,exports){
var view = require('./AppView.js');

/**
 * Module for a dynamic application view for a route or a persistent view
 */

var Component = view.createComponentView({
  /**
   * Mixins are other modules/objects that multiple components share, provides
   * common functionality between then.
   */
  //mixins: [
  //  {
  //    render: function () {
  //      return '<h1>MIXIN!</h1>';
  //    }
  //  }
  //],

  /**
   * Initialize and bind, called once on first render. Parent component is
   * initialized from app view
   * @param configProps
   */
  initialize: function initialize(configProps) {
    //Bind to a map, update will be called on changes to the map
    //this.bindMap(APP.store()); // Reducer store, map id string or map object

    //custom init below here
    //this.setTemplate('<h1>{{ greeting }}</h1>'); // set custom HTML template
  },

  /**
   * Create an object to be used to define events on DOM elements
   * @returns {}
   */
  //defineEvents: function() {
  //  return {
  //    'click #button-id': handleButton
  //  };
  //},

  /**
   * Set initial state properties. Call once on first render
   */
  getInitialState: function getInitialState() {
    return APP.store.getState();
  },

  /**
   * State change on bound stores (map, etc.) Return nextState object
   */
  componentWillUpdate: function componentWillUpdate() {
    var nextState = APP.store.getState();
    nextState.greeting += ' (updated)';
    return nextState;
  },

  /**
   * Determine if update/redraw should occur
   * @param nextState
   * @returns {*}
   */
  //shouldComponentUpdate: function(nextState) {
  //  // Test for differences between nextState and this.getState()
  //},

  /**
   * Render override must return HTML.
   */
  //render: function(state) {
  //  return '<h1>'+state.greeting+'</h1>';
  //},

  /**
   * Component HTML was attached to the DOM
   */
  componentDidMount: function componentDidMount() {
    //
  },

  /**
   * Component will be removed from the DOM
   */
  componentWillUnmount: function componentWillUnmount() {
    // Clean up
  }

});

module.exports = Component;

},{"./AppView.js":3}],6:[function(require,module,exports){
/**
 * Initial file for the Application
 */

(function () {

  var _browserInfo = require('./nudoru/browser/BrowserInfo.js');

  /**
   * IE versions 9 and under are blocked, others are allowed to proceed
   */
  if (_browserInfo.notSupported || _browserInfo.isIE9) {
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {

    /**
     * Create the application module and initialize
     */
    window.onload = function () {
      window.Nori = require('./nori/Nori.js');
      window.APP = require('./app/App.js');
      APP.initialize();
    };
  }
})();

},{"./app/App.js":1,"./nori/Nori.js":7,"./nudoru/browser/BrowserInfo.js":26}],7:[function(require,module,exports){
var Nori = function Nori() {

  var _dispatcher = require('./utils/Dispatcher.js'),
      _router = require('./utils/Router.js');

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
};

module.exports = Nori();

},{"./utils/Dispatcher.js":14,"./utils/Router.js":17}],8:[function(require,module,exports){
module.exports = {
  CHANGE_STORE_STATE: 'CHANGE_STORE_STATE'
};

},{}],9:[function(require,module,exports){
/**
 * Map data type
 */

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

},{}],10:[function(require,module,exports){
/**
 * Map Collection - an array of maps
 */
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
    console.warn('MapCollection, addFromObjArry, need to be fixed to remove reference to Nori.store()');
    oArry.forEach(function (obj) {

      var id;

      if (obj.hasOwnProperty(idKey)) {
        id = obj[idKey];
      } else {
        id = _id + 'child' + _children.length;
      }

      //add(Nori.store().createMap({id: id, store: obj}));
    });
    dispatchChange(_id, 'add_map');
  }

  function addFromJSONArray(json, idKey) {
    console.warn('MapCollection, addFromJSONArry, need to be fixed to remove reference to Nori.store()');
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

      //add(Nori.store().createMap({id: id, store: obj}));
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

},{}],11:[function(require,module,exports){
var MixinMapFactory = function MixinMapFactory() {

  var _mapCollectionList = Object.create(null),
      _mapList = Object.create(null),
      _mapCollectionFactory = require('./MapCollection.js'),
      _mapFactory = require('./Map.js'),
      _observableFactory = require('../utils/MixinObservableSubject.js');

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

},{"../utils/MixinObservableSubject.js":15,"./Map.js":9,"./MapCollection.js":10}],12:[function(require,module,exports){
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
var MixinReducerStore = function MixinReducerStore() {
  var _this,
      _state,
      _stateReducers = [];

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

    var simpleStoreFactory = require('./SimpleStore.js');

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

},{"./SimpleStore.js":13}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
/**
 * Add RxJS Subject to a module.
 *
 * Add one simple observable subject or more complex ability to create others for
 * more complex eventing needs.
 */
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

},{}],16:[function(require,module,exports){
/**
 * Utility to handle all view DOM attachment tasks
 */

var Renderer = function Renderer() {
  var _domUtils = require('../../nudoru/browser/DOMUtils.js');

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

},{"../../nudoru/browser/DOMUtils.js":27}],17:[function(require,module,exports){
/**
 * Simple router
 * Supporting IE9 so using hashes instead of the history API for now
 */

var Router = function Router() {

  var _subject = new Rx.Subject(),
      _hashChangeObservable,
      _objUtils = require('../../nudoru/core/ObjectUtils.js');

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

},{"../../nudoru/core/ObjectUtils.js":37}],18:[function(require,module,exports){
/**
 * RxJS Helpers
 * @type {{dom: Function, from: Function, interval: Function, doEvery: Function, just: Function, empty: Function}}
 */

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

},{}],19:[function(require,module,exports){
/*
 Simple wrapper for Underscore / HTML templates
 Matt Perkins
 4/7/15
 */
var Templating = function Templating() {

  var _templateMap = Object.create(null),
      _templateHTMLCache = Object.create(null),
      _templateCache = Object.create(null),
      _DOMUtils = require('../../nudoru/browser/DOMUtils.js');

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

},{"../../nudoru/browser/DOMUtils.js":27}],20:[function(require,module,exports){
var ApplicationView = function ApplicationView() {

  var _this,
      _domUtils = require('../../nudoru/browser/DOMUtils.js');

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

},{"../../nudoru/browser/DOMUtils.js":27}],21:[function(require,module,exports){
/**
 * Mixin view that allows for component views
 */

var MixinComponentViews = function MixinComponentViews() {

  var _componentViewMap = Object.create(null),
      _componentHTMLTemplatePrefix = 'template__',
      _template = require('../utils/Templating.js');

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
      var componentViewFactory = require('./ViewComponent.js'),
          eventDelegatorFactory = require('./MixinEventDelegator.js'),
          observableFactory = require('../utils/MixinObservableSubject.js'),
          simpleStoreFactory = require('../store/SimpleStore.js'),
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

},{"../store/SimpleStore.js":13,"../utils/MixinObservableSubject.js":15,"../utils/Templating.js":19,"./MixinEventDelegator.js":22,"./ViewComponent.js":25}],22:[function(require,module,exports){
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

var MixinEventDelegator = function MixinEventDelegator() {

  var _eventsMap,
      _eventSubscribers,
      _rx = require('../utils/Rx');

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

},{"../utils/Rx":18}],23:[function(require,module,exports){
var MixinNudoruControls = function MixinNudoruControls() {

  var _notificationView = require('../../nudoru/components/ToastView.js'),
      _toolTipView = require('../../nudoru/components/ToolTipView.js'),
      _messageBoxView = require('../../nudoru/components/MessageBoxView.js'),
      _messageBoxCreator = require('../../nudoru/components/MessageBoxCreator.js'),
      _modalCoverView = require('../../nudoru/components/ModalCoverView.js');

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

},{"../../nudoru/components/MessageBoxCreator.js":30,"../../nudoru/components/MessageBoxView.js":31,"../../nudoru/components/ModalCoverView.js":32,"../../nudoru/components/ToastView.js":33,"../../nudoru/components/ToolTipView.js":34}],24:[function(require,module,exports){
/**
 * Mixin view that allows for component views to be display on routing changes
 */

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

},{}],25:[function(require,module,exports){
/**
 * Base module for components
 * Must be extended with custom modules
 */

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
      _renderer = require('../utils/Renderer');

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

},{"../utils/Renderer":16}],26:[function(require,module,exports){
var browserInfo = {

  appVersion: navigator.appVersion,
  userAgent: navigator.userAgent,
  isIE: -1 < navigator.userAgent.indexOf("MSIE "),
  isIE6: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 6"),
  isIE7: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 7"),
  isIE8: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 8"),
  isIE9: this.isIE && -1 < navigator.appVersion.indexOf("MSIE 9"),
  isFF: -1 < navigator.userAgent.indexOf("Firefox/"),
  isChrome: -1 < navigator.userAgent.indexOf("Chrome/"),
  isMac: -1 < navigator.userAgent.indexOf("Macintosh,"),
  isMacSafari: -1 < navigator.userAgent.indexOf("Safari") && -1 < navigator.userAgent.indexOf("Mac") && -1 === navigator.userAgent.indexOf("Chrome"),

  hasTouch: 'ontouchstart' in document.documentElement,
  notSupported: this.isIE6 || this.isIE7 || this.isIE8 || this.isIE9,

  mobile: {
    Android: function Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
    },
    iOS: function iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) !== null;
    }

  },

  // TODO filter for IE > 9
  enhanced: function enhanced() {
    return !_browserInfo.isIE && !_browserInfo.mobile.any();
  },

  mouseDownEvtStr: function mouseDownEvtStr() {
    return this.mobile.any() ? "touchstart" : "mousedown";
  },

  mouseUpEvtStr: function mouseUpEvtStr() {
    return this.mobile.any() ? "touchend" : "mouseup";
  },

  mouseClickEvtStr: function mouseClickEvtStr() {
    return this.mobile.any() ? "touchend" : "click";
  },

  mouseMoveEvtStr: function mouseMoveEvtStr() {
    return this.mobile.any() ? "touchmove" : "mousemove";
  }

};

module.exports = browserInfo;

},{}],27:[function(require,module,exports){
module.exports = {

  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  // element must be entirely on screen
  isElementEntirelyInViewport: function isElementEntirelyInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  },

  // element may be partialy on screen
  isElementInViewport: function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
  },

  isDomObj: function isDomObj(obj) {
    return !!(obj.nodeType || obj === window);
  },

  position: function position(el) {
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  },

  // from http://jsperf.com/jquery-offset-vs-offsetparent-loop
  offset: function offset(el) {
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
  },

  removeAllElements: function removeAllElements(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  },

  //http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  HTMLStrToNode: function HTMLStrToNode(str) {
    var temp = document.createElement('div');
    temp.innerHTML = str;
    return temp.firstChild;
  },

  wrapElement: function wrapElement(wrapperStr, el) {
    var wrapperEl = this.HTMLStrToNode(wrapperStr),
        elParent = el.parentNode;

    wrapperEl.appendChild(el);
    elParent.appendChild(wrapperEl);
    return wrapperEl;
  },

  // http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
  closest: function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.bind(el)(selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return false;
  },

  // from youmightnotneedjquery.com
  hasClass: function hasClass(el, className) {
    if (el.classList) {
      el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  },

  addClass: function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },

  removeClass: function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  toggleClass: function toggleClass(el, className) {
    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  },

  // From impress.js
  applyCSS: function applyCSS(el, props) {
    var key, pkey;
    for (key in props) {
      if (props.hasOwnProperty(key)) {
        el.style[key] = props[key];
      }
    }
    return el;
  },

  // from impress.js
  // `computeWindowScale` counts the scale factor between window size and size
  // defined for the presentation in the config.
  computeWindowScale: function computeWindowScale(config) {
    var hScale = window.innerHeight / config.height,
        wScale = window.innerWidth / config.width,
        scale = hScale > wScale ? wScale : hScale;

    if (config.maxScale && scale > config.maxScale) {
      scale = config.maxScale;
    }

    if (config.minScale && scale < config.minScale) {
      scale = config.minScale;
    }

    return scale;
  },

  /**
   * Get an array of elements in the container returned as Array instead of a Node list
   */
  getQSElementsAsArray: function getQSElementsAsArray(el, cls) {
    return Array.prototype.slice.call(el.querySelectorAll(cls), 0);
  },

  centerElementInViewPort: function centerElementInViewPort(el) {
    var vpH = window.innerHeight,
        vpW = window.innerWidth,
        elR = el.getBoundingClientRect(),
        elH = elR.height,
        elW = elR.width;

    el.style.left = vpW / 2 - elW / 2 + 'px';
    el.style.top = vpH / 2 - elH / 2 + 'px';
  },

  /**
   * Creates an object from the name (or id) attribs and data of a form
   * @param el
   * @returns {null}
   */
  captureFormData: function captureFormData(el) {
    var dataObj = Object.create(null),
        textareaEls,
        inputEls,
        selectEls;

    textareaEls = Array.prototype.slice.call(el.querySelectorAll('textarea'), 0);
    inputEls = Array.prototype.slice.call(el.querySelectorAll('input'), 0);
    selectEls = Array.prototype.slice.call(el.querySelectorAll('select'), 0);

    textareaEls.forEach(getInputFormData);
    inputEls.forEach(getInputFormData);
    selectEls.forEach(getSelectFormData);

    return dataObj;

    function getInputFormData(formEl) {
      dataObj[getElNameOrID(formEl)] = formEl.value;
    }

    function getSelectFormData(formEl) {
      var sel = formEl.selectedIndex,
          val = '';
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
  }

};

},{}],28:[function(require,module,exports){
var Lorem = function Lorem() {

  var _currentText = [],
      _textSets = [],
      _maleFirstNames = [],
      _femaleFirstNames = [],
      _lastNames = [],
      _punctuation = [],
      _months,
      _days,
      _initialized = false,
      _arrayUtils = require('../core/ArrayUtils.js'),
      _stringUtils = require('../core/StringUtils.js'),
      _numberUtils = require('../core/NumberUtils.js');

  _textSets = ["Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible"];

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
    var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
        i = 0;

    for (; i < len; i++) {
      if (i === len - 1) {
        delim = "";
      }
      str += getSentence(1, 10) + delim;
    }

    return str;
  }

  function getText(min, max) {
    var str = "",
        delim = " ",
        len = _numberUtils.rndNumber(min, max),
        i = 0;

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
        date = {
      monthNumber: month + 1,
      monthName: _months[month],
      monthDay: _numberUtils.rndNumber(1, 28),
      weekDayNumber: wkday + 1,
      weekDay: _days[wkday],
      year: _arrayUtils.rndElement(['2010', '2011', '2012', '2013', '2014', '2015', '2016'])
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
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  return {
    initialize: initialize,
    getText: getText,
    getSentence: getSentence,
    getParagraph: getParagraph,
    getFLName: getFLName,
    getLFName: getLFName,
    getDate: getDate,
    fakeGUID: fakeGUID
  };
};

module.exports = Lorem();

},{"../core/ArrayUtils.js":35,"../core/NumberUtils.js":36,"../core/StringUtils.js":38}],29:[function(require,module,exports){
module.exports = {

  /**
   * Create shared 3d perspective for all children
   * @param el
   */
  apply3DToContainer: function apply3DToContainer(el) {
    TweenLite.set(el, {
      css: {
        perspective: 800,
        perspectiveOrigin: '50% 50%'
      }
    });
  },

  /**
   * Apply basic CSS props
   * @param el
   */
  apply3DToElement: function apply3DToElement(el) {
    TweenLite.set(el, {
      css: {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transformOrigin: '50% 50%'
      }
    });
  },

  /**
   * Apply basic 3d props and set unique perspective for children
   * @param el
   */
  applyUnique3DToElement: function applyUnique3DToElement(el) {
    TweenLite.set(el, {
      css: {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transformPerspective: 600,
        transformOrigin: '50% 50%'
      }
    });
  }

};

},{}],30:[function(require,module,exports){
var MessageBoxCreator = function MessageBoxCreator() {

  var _messageBoxView = require('./MessageBoxView');

  function alert(title, message, modal, cb) {
    return _messageBoxView.add({
      title: title,
      content: '<p>' + message + '</p>',
      type: _messageBoxView.type().DANGER,
      modal: modal,
      width: 400,
      buttons: [{
        label: 'Close',
        id: 'Close',
        type: '',
        icon: 'times',
        onClick: cb
      }]
    });
  }

  function confirm(title, message, okCB, modal) {
    return _messageBoxView.add({
      title: title,
      content: '<p>' + message + '</p>',
      type: _messageBoxView.type().DEFAULT,
      modal: modal,
      width: 400,
      buttons: [{
        label: 'Cancel',
        id: 'Cancel',
        type: 'negative',
        icon: 'times'
      }, {
        label: 'Proceed',
        id: 'proceed',
        type: 'positive',
        icon: 'check',
        onClick: okCB
      }]
    });
  }

  function prompt(title, message, okCB, modal) {
    return _messageBoxView.add({
      title: title,
      content: '<p class="text-center padding-bottom-double">' + message + '</p><textarea name="response" class="input-text" type="text" style="width:400px; height:75px; resize: none" autofocus="true"></textarea>',
      type: _messageBoxView.type().DEFAULT,
      modal: modal,
      width: 450,
      buttons: [{
        label: 'Cancel',
        id: 'Cancel',
        type: 'negative',
        icon: 'times'
      }, {
        label: 'Proceed',
        id: 'proceed',
        type: 'positive',
        icon: 'check',
        onClick: okCB
      }]
    });
  }

  function choice(title, message, selections, okCB, modal) {
    var selectHTML = '<select class="spaced" style="width:450px;height:200px" name="selection" autofocus="true" size="20">';

    selections.forEach(function (opt) {
      selectHTML += '<option value="' + opt.value + '" ' + (opt.selected === 'true' ? 'selected' : '') + '>' + opt.label + '</option>';
    });

    selectHTML += '</select>';

    return _messageBoxView.add({
      title: title,
      content: '<p class="text-center padding-bottom-double">' + message + '</p><div class="text-center">' + selectHTML + '</div>',
      type: _messageBoxView.type().DEFAULT,
      modal: modal,
      width: 500,
      buttons: [{
        label: 'Cancel',
        id: 'Cancel',
        type: 'negative',
        icon: 'times'
      }, {
        label: 'OK',
        id: 'ok',
        type: 'positive',
        icon: 'check',
        onClick: okCB
      }]
    });
  }

  return {
    alert: alert,
    confirm: confirm,
    prompt: prompt,
    choice: choice
  };
};

module.exports = MessageBoxCreator();

},{"./MessageBoxView":31}],31:[function(require,module,exports){
var MessageBoxView = function MessageBoxView() {

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
      _template = require('../../nori/utils/Templating.js'),
      _modal = require('./ModalCoverView.js'),
      _browserInfo = require('../../nudoru/browser/BrowserInfo.js'),
      _domUtils = require('../../nudoru/browser/DOMUtils.js'),
      _componentUtils = require('../../nudoru/browser/ThreeDTransforms.js');

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

    _componentUtils.applyUnique3DToElement(boxObj.element);

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
      onPress: function onPress() {
        _highestZ = Draggable.zIndex;
      }
    });

    // Show it
    transitionIn(boxObj.element);

    // Show the modal cover
    if (initObj.modal) {
      _modal.showNonDismissable(true);
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
    if (!buttonData) {
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

      if (buttonObj.hasOwnProperty('icon')) {
        buttonEl = _template.asElement(_buttonIconTemplateID, buttonObj);
      } else {
        buttonEl = _template.asElement(_buttonNoIconTemplateID, buttonObj);
      }

      buttonContainer.appendChild(buttonEl);

      var btnStream = Rx.Observable.fromEvent(buttonEl, _browserInfo.mouseClickEvtStr()).subscribe(function () {
        if (buttonObj.hasOwnProperty('onClick')) {
          if (buttonObj.onClick) {
            buttonObj.onClick.call(this, captureFormData(boxObj.id));
          }
        }
        remove(boxObj.id);
      });
      boxObj.streams.push(btnStream);
    });
  }

  /**
   * Returns data from the form on the box contents
   * @param boxID
   * @returns {*}
   */
  function captureFormData(boxID) {
    return _domUtils.captureFormData(getObjByID(boxID).element);
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
    TweenLite.to(el, 0, { alpha: 0, rotationX: 45, scale: 2 });
    TweenLite.to(el, 0.5, {
      alpha: 1,
      rotationX: 0,
      scale: 1,
      ease: Circ.easeOut
    });
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
      ease: Circ.easeIn, onComplete: function onComplete() {
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

    boxObj.streams.forEach(function (stream) {
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
   * Utility to get the box object index by ID
   * @param id
   * @returns {number}
   */
  function getObjIndexByID(id) {
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  /**
   * Utility to get the box object by ID
   * @param id
   * @returns {number}
   */
  function getObjByID(id) {
    return _children.filter(function (child) {
      return child.id === id;
    })[0];
  }

  function getTypes() {
    return _types;
  }

  return {
    initialize: initialize,
    add: add,
    remove: remove,
    type: getTypes
  };
};

module.exports = MessageBoxView();

},{"../../nori/utils/Templating.js":19,"../../nudoru/browser/BrowserInfo.js":26,"../../nudoru/browser/DOMUtils.js":27,"../../nudoru/browser/ThreeDTransforms.js":29,"./ModalCoverView.js":32}],32:[function(require,module,exports){
var ModalCoverView = function ModalCoverView() {

  var _mountPoint = document,
      _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _notDismissable,
      _browserInfo = require('../../nudoru/browser/BrowserInfo.js');

  function initialize() {

    _isVisible = true;

    _modalCoverEl = _mountPoint.getElementById('modal__cover');
    _modalBackgroundEl = _mountPoint.querySelector('.modal__background');
    _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

    var modalBGClick = Rx.Observable.fromEvent(_modalBackgroundEl, _browserInfo.mouseClickEvtStr()),
        modalButtonClick = Rx.Observable.fromEvent(_modalCloseButtonEl, _browserInfo.mouseClickEvtStr());

    _modalClickStream = Rx.Observable.merge(modalBGClick, modalButtonClick).subscribe(function () {
      onModalClick();
    });

    hide(false);
  }

  function getIsVisible() {
    return _isVisible;
  }

  function onModalClick() {
    if (_notDismissable) return;
    hide(true);
  }

  function showModalCover(shouldAnimate) {
    _isVisible = true;
    var duration = shouldAnimate ? 0.25 : 0;
    TweenLite.to(_modalCoverEl, duration, {
      autoAlpha: 1,
      ease: Quad.easeOut
    });
    TweenLite.to(_modalBackgroundEl, duration, {
      alpha: 1,
      ease: Quad.easeOut
    });
  }

  function show(shouldAnimate) {
    if (_isVisible) {
      return;
    }

    _notDismissable = false;

    showModalCover(shouldAnimate);

    TweenLite.set(_modalCloseButtonEl, { scale: 2, alpha: 0 });
    TweenLite.to(_modalCloseButtonEl, 1, {
      autoAlpha: 1,
      scale: 1,
      ease: Bounce.easeOut,
      delay: 1
    });
  }

  /**
   * A 'hard' modal view cannot be dismissed with a click, must be via code
   * @param shouldAnimate
   */
  function showNonDismissable(shouldAnimate) {
    if (_isVisible) {
      return;
    }

    _notDismissable = true;

    showModalCover(shouldAnimate);
    TweenLite.to(_modalCloseButtonEl, 0, { autoAlpha: 0 });
  }

  function hide(shouldAnimate) {
    if (!_isVisible) {
      return;
    }
    _isVisible = false;
    _notDismissable = false;
    var duration = shouldAnimate ? 0.25 : 0;
    TweenLite.killDelayedCallsTo(_modalCloseButtonEl);
    TweenLite.to(_modalCoverEl, duration, {
      autoAlpha: 0,
      ease: Quad.easeOut
    });
    TweenLite.to(_modalCloseButtonEl, duration / 2, {
      autoAlpha: 0,
      ease: Quad.easeOut
    });
  }

  function setOpacity(opacity) {
    if (opacity < 0 || opacity > 1) {
      console.log('nudoru/component/ModalCoverView: setOpacity: opacity should be between 0 and 1');
      opacity = 1;
    }
    TweenLite.to(_modalBackgroundEl, 0.25, {
      alpha: opacity,
      ease: Quad.easeOut
    });
  }

  function setColor(r, g, b) {
    TweenLite.to(_modalBackgroundEl, 0.25, {
      backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')',
      ease: Quad.easeOut
    });
  }

  return {
    initialize: initialize,
    show: show,
    showNonDismissable: showNonDismissable,
    hide: hide,
    visible: getIsVisible,
    setOpacity: setOpacity,
    setColor: setColor
  };
};

module.exports = ModalCoverView();

},{"../../nudoru/browser/BrowserInfo.js":26}],33:[function(require,module,exports){
var ToastView = function ToastView() {

  var _children = [],
      _counter = 0,
      _defaultExpireDuration = 7000,
      _types = {
    DEFAULT: 'default',
    INFORMATION: 'information',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger'
  },
      _typeStyleMap = {
    'default': '',
    'information': 'toast__information',
    'success': 'toast__success',
    'warning': 'toast__warning',
    'danger': 'toast__danger'
  },
      _mountPoint,
      _template = require('../../nori/utils/Templating.js'),
      _browserInfo = require('../../nudoru/browser/BrowserInfo.js'),
      _domUtils = require('../../nudoru/browser/DOMUtils.js'),
      _componentUtils = require('../../nudoru/browser/ThreeDTransforms.js');

  function initialize(elID) {
    _mountPoint = document.getElementById(elID);
  }

  //obj.title, obj.content, obj.type
  function add(initObj) {
    initObj.type = initObj.type || _types.DEFAULT;

    var toastObj = createToastObject(initObj.title, initObj.message);

    _children.push(toastObj);

    _mountPoint.insertBefore(toastObj.element, _mountPoint.firstChild);

    assignTypeClassToElement(initObj.type, toastObj.element);

    _componentUtils.apply3DToContainer(_mountPoint);
    _componentUtils.apply3DToElement(toastObj.element);

    var closeBtn = toastObj.element.querySelector('.toast__item-controls > button'),
        closeBtnSteam = Rx.Observable.fromEvent(closeBtn, _browserInfo.mouseClickEvtStr()),
        expireTimeStream = Rx.Observable.interval(_defaultExpireDuration);

    toastObj.defaultButtonStream = Rx.Observable.merge(closeBtnSteam, expireTimeStream).take(1).subscribe(function () {
      remove(toastObj.id);
    });

    transitionIn(toastObj.element);

    return toastObj.id;
  }

  function assignTypeClassToElement(type, element) {
    if (type !== 'default') {
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
    TweenLite.to(el, 0, { alpha: 0 });
    TweenLite.to(el, 1, { alpha: 1, ease: Quad.easeOut });
    rearrange();
  }

  function transitionOut(el) {
    TweenLite.to(el, 0.25, {
      rotationX: -45,
      alpha: 0,
      ease: Quad.easeIn, onComplete: function onComplete() {
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
      TweenLite.to(current.element, 0.75, { y: y, ease: Bounce.easeOut });
      y += 10 + current.element.clientHeight;
    }
  }

  function getObjIndexByID(id) {
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  function getTypes() {
    return _types;
  }

  return {
    initialize: initialize,
    add: add,
    remove: remove,
    type: getTypes
  };
};

module.exports = ToastView();

},{"../../nori/utils/Templating.js":19,"../../nudoru/browser/BrowserInfo.js":26,"../../nudoru/browser/DOMUtils.js":27,"../../nudoru/browser/ThreeDTransforms.js":29}],34:[function(require,module,exports){
var ToolTipView = function ToolTipView() {

  var _children = [],
      _counter = 0,
      _defaultWidth = 200,
      _types = {
    DEFAULT: 'default',
    INFORMATION: 'information',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    COACHMARK: 'coachmark'
  },
      _typeStyleMap = {
    'default': '',
    'information': 'tooltip__information',
    'success': 'tooltip__success',
    'warning': 'tooltip__warning',
    'danger': 'tooltip__danger',
    'coachmark': 'tooltip__coachmark'
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
      _template = require('../../nori/utils/Templating.js'),
      _domUtils = require('../../nudoru/browser/DOMUtils.js');

  function initialize(elID) {
    _mountPoint = document.getElementById(elID);
  }

  //obj.title, obj.content, obj.type, obj.target, obj.position
  function add(initObj) {
    initObj.type = initObj.type || _types.DEFAULT;

    var tooltipObj = createToolTipObject(initObj.title, initObj.content, initObj.position, initObj.targetEl, initObj.gutter, initObj.alwaysVisible);

    _children.push(tooltipObj);
    _mountPoint.appendChild(tooltipObj.element);

    tooltipObj.arrowEl = tooltipObj.element.querySelector('.arrow');
    assignTypeClassToElement(initObj.type, initObj.position, tooltipObj.element);

    TweenLite.set(tooltipObj.element, {
      css: {
        autoAlpha: tooltipObj.alwaysVisible ? 1 : 0,
        width: initObj.width ? initObj.width : _defaultWidth
      }
    });

    // cache these values, 3d transforms will alter size
    tooltipObj.width = tooltipObj.element.getBoundingClientRect().width;
    tooltipObj.height = tooltipObj.element.getBoundingClientRect().height;

    assignEventsToTargetEl(tooltipObj);
    positionToolTip(tooltipObj);

    if (tooltipObj.position === _positions.L || tooltipObj.position === _positions.R) {
      centerArrowVertically(tooltipObj);
    }

    if (tooltipObj.position === _positions.T || tooltipObj.position === _positions.B) {
      centerArrowHorizontally(tooltipObj);
    }

    return tooltipObj.element;
  }

  function assignTypeClassToElement(type, position, element) {
    if (type !== 'default') {
      _domUtils.addClass(element, _typeStyleMap[type]);
    }
    _domUtils.addClass(element, _positionMap[position]);
  }

  function createToolTipObject(title, message, position, target, gutter, alwaysVisible) {
    var id = 'js__tooltip-tooltipitem-' + (_counter++).toString(),
        obj = {
      id: id,
      position: position,
      targetEl: target,
      alwaysVisible: alwaysVisible || false,
      gutter: gutter || 15,
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
    if (tooltipObj.alwaysVisible) {
      return;
    }

    tooltipObj.elOverStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseover').subscribe(function (evt) {
      showToolTip(tooltipObj.id);
    });

    tooltipObj.elOutStream = Rx.Observable.fromEvent(tooltipObj.targetEl, 'mouseout').subscribe(function (evt) {
      hideToolTip(tooltipObj.id);
    });
  }

  function showToolTip(id) {
    var tooltipObj = getObjByID(id);

    if (tooltipObj.alwaysVisible) {
      return;
    }

    positionToolTip(tooltipObj);
    transitionIn(tooltipObj.element);
  }

  function positionToolTip(tooltipObj) {
    var gutter = tooltipObj.gutter,
        xPos = 0,
        yPos = 0,
        tgtProps = tooltipObj.targetEl.getBoundingClientRect();

    if (tooltipObj.position === _positions.TL) {
      xPos = tgtProps.left - tooltipObj.width;
      yPos = tgtProps.top - tooltipObj.height;
    } else if (tooltipObj.position === _positions.T) {
      xPos = tgtProps.left + (tgtProps.width / 2 - tooltipObj.width / 2);
      yPos = tgtProps.top - tooltipObj.height - gutter;
    } else if (tooltipObj.position === _positions.TR) {
      xPos = tgtProps.right;
      yPos = tgtProps.top - tooltipObj.height;
    } else if (tooltipObj.position === _positions.R) {
      xPos = tgtProps.right + gutter;
      yPos = tgtProps.top + (tgtProps.height / 2 - tooltipObj.height / 2);
    } else if (tooltipObj.position === _positions.BR) {
      xPos = tgtProps.right;
      yPos = tgtProps.bottom;
    } else if (tooltipObj.position === _positions.B) {
      xPos = tgtProps.left + (tgtProps.width / 2 - tooltipObj.width / 2);
      yPos = tgtProps.bottom + gutter;
    } else if (tooltipObj.position === _positions.BL) {
      xPos = tgtProps.left - tooltipObj.width;
      yPos = tgtProps.bottom;
    } else if (tooltipObj.position === _positions.L) {
      xPos = tgtProps.left - tooltipObj.width - gutter;
      yPos = tgtProps.top + (tgtProps.height / 2 - tooltipObj.height / 2);
    }

    TweenLite.set(tooltipObj.element, {
      x: xPos,
      y: yPos
    });
  }

  function centerArrowHorizontally(tooltipObj) {
    var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
    TweenLite.set(tooltipObj.arrowEl, { x: tooltipObj.width / 2 - arrowProps.width / 2 });
  }

  function centerArrowVertically(tooltipObj) {
    var arrowProps = tooltipObj.arrowEl.getBoundingClientRect();
    TweenLite.set(tooltipObj.arrowEl, { y: tooltipObj.height / 2 - arrowProps.height / 2 - 2 });
  }

  function hideToolTip(id) {
    var tooltipObj = getObjByID(id);

    if (tooltipObj.alwaysVisible) {
      return;
    }

    transitionOut(tooltipObj.element);
  }

  function transitionIn(el) {
    TweenLite.to(el, 0.5, {
      autoAlpha: 1,
      ease: Circ.easeOut
    });
  }

  function transitionOut(el) {
    TweenLite.to(el, 0.05, {
      autoAlpha: 0,
      ease: Circ.easeOut
    });
  }

  function remove(el) {
    getObjByElement(el).forEach(function (tooltip) {
      if (tooltip.elOverStream) {
        tooltip.elOverStream.dispose();
      }
      if (tooltip.elOutStream) {
        tooltip.elOutStream.dispose();
      }

      TweenLite.killDelayedCallsTo(tooltip.element);

      _mountPoint.removeChild(tooltip.element);

      var idx = getObjIndexByID(tooltip.id);

      _children[idx] = null;
      _children.splice(idx, 1);
    });
  }

  function getObjByID(id) {
    return _children.filter(function (child) {
      return child.id === id;
    })[0];
  }

  function getObjIndexByID(id) {
    return _children.map(function (child) {
      return child.id;
    }).indexOf(id);
  }

  function getObjByElement(el) {
    return _children.filter(function (child) {
      return child.targetEl === el;
    });
  }

  function getTypes() {
    return _types;
  }

  function getPositions() {
    return _positions;
  }

  return {
    initialize: initialize,
    add: add,
    remove: remove,
    type: getTypes,
    position: getPositions
  };
};

module.exports = ToolTipView();

},{"../../nori/utils/Templating.js":19,"../../nudoru/browser/DOMUtils.js":27}],35:[function(require,module,exports){
var _numberUtils = require('./NumberUtils.js');

module.exports = {

  // Reference: http://jhusain.github.io/learnrx/index.html
  mergeAll: function mergeAll() {
    var results = [];

    this.forEach(function (subArr) {
      subArr.forEach(function (elm) {
        results.push(elm);
      });
    });

    return results;
  },

  // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
  unique: function unique(arry) {
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
  },

  removeIndex: function removeIndex(arr, idx) {
    return arr.splice(idx, 1);
  },

  removeItem: function removeItem(arr, item) {
    var idx = arr.indexOf(item);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
  },

  rndElement: function rndElement(arry) {
    return arry[_numberUtils.rndNumber(0, arry.length - 1)];
  },

  getRandomSetOfElements: function getRandomSetOfElements(srcarry, max) {
    var arry = [],
        i = 0,
        len = _numberUtils.rndNumber(1, max);

    for (; i < len; i++) {
      arry.push(this.rndElement(srcarry));
    }

    return arry;
  },

  getDifferences: function getDifferences(arr1, arr2) {
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
  }

};

},{"./NumberUtils.js":36}],36:[function(require,module,exports){
module.exports = {

  isInteger: function isInteger(str) {
    return (/^-?\d+$/.test(str)
    );
  },

  rndNumber: function rndNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  clamp: function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  },

  inRange: function inRange(val, min, max) {
    return val > min && val < max;
  },

  distanceTL: function distanceTL(point1, point2) {
    var xd = point2.left - point1.left,
        yd = point2.top - point1.top;
    return Math.sqrt(xd * xd + yd * yd);
  }

};

},{}],37:[function(require,module,exports){
module.exports = {

  /**
   * Test for
   * Object {"": undefined}
   * Object {undefined: undefined}
   * @param obj
   * @returns {boolean}
   */
  isNull: function isNull(obj) {
    var isnull = false;

    if (is.falsey(obj)) {
      return true;
    }

    for (var prop in obj) {
      if (prop === undefined || obj[prop] === undefined) isnull = true;
      break;
    }

    return isnull;
  },

  dynamicSort: function dynamicSort(property) {
    return function (a, b) {
      return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    };
  },

  searchObjects: (function (_searchObjects) {
    function searchObjects(_x, _x2, _x3) {
      return _searchObjects.apply(this, arguments);
    }

    searchObjects.toString = function () {
      return _searchObjects.toString();
    };

    return searchObjects;
  })(function (obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (typeof obj[i] === 'object') {
        objects = objects.concat(searchObjects(obj[i], key, val));
      } else if (i === key && obj[key] === val) {
        objects.push(obj);
      }
    }
    return objects;
  }),

  getObjectFromString: function getObjectFromString(obj, str) {
    var i = 0,
        path = str.split('.'),
        len = path.length;

    for (; i < len; i++) {
      obj = obj[path[i]];
    }
    return obj;
  },

  getObjectIndexFromId: function getObjectIndexFromId(obj, id) {
    if (typeof obj === "object") {
      for (var i = 0; i < obj.length; i++) {
        if (typeof obj[i] !== "undefined" && typeof obj[i].id !== "undefined" && obj[i].id === id) {
          return i;
        }
      }
    }
    return false;
  },

  // extend and deep extend from http://youmightnotneedjquery.com/
  extend: function extend(out) {
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
  },

  deepExtend: (function (_deepExtend) {
    function deepExtend(_x4) {
      return _deepExtend.apply(this, arguments);
    }

    deepExtend.toString = function () {
      return _deepExtend.toString();
    };

    return deepExtend;
  })(function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj) {
        continue;
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            deepExtend(out[key], obj[key]);
          } else {
            out[key] = obj[key];
          }
        }
      }
    }

    return out;
  }),

  /**
   * Simplified implementation of Stamps - http://ericleads.com/2014/02/prototypal-inheritance-with-stamps/
   * https://www.barkweb.co.uk/blog/object-composition-and-prototypical-inheritance-in-javascript
   *
   * Prototype object requires a methods object, private closures and state is optional
   *
   * @param prototype
   * @returns New object using prototype.methods as source
   */
  basicFactory: function basicFactory(prototype) {
    var proto = prototype,
        obj = Object.create(proto.methods);

    if (proto.hasOwnProperty('closure')) {
      proto.closures.forEach(function (closure) {
        closure.call(obj);
      });
    }

    if (proto.hasOwnProperty('state')) {
      for (var key in proto.state) {
        obj[key] = proto.state[key];
      }
    }

    return obj;
  },

  /**
   * Copyright 2013-2014 Facebook, Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   */
  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * https://github.com/STRML/keymirror
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  keyMirror: function keyMirror(obj) {
    var ret = {};
    var key;
    if (!(obj instanceof Object && !Array.isArray(obj))) {
      throw new Error('keyMirror(...): Argument must be an object.');
    }
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        ret[key] = key;
      }
    }
    return ret;
  }

};

},{}],38:[function(require,module,exports){
module.exports = {

  capitalizeFirstLetter: function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  },

  toTitleCase: function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
  },

  removeTags: function removeTags(str) {
    return str.replace(/(<([^>]+)>)/ig, '');
  },

  ellipses: function ellipses(len) {
    return this.length > len ? this.substr(0, len) + "..." : this;
  }

};

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvYXBwL0FwcC5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9hcHAvc3RvcmUvQXBwU3RvcmUuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvYXBwL3ZpZXcvQXBwVmlldy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9hcHAvdmlldy9EZWJ1Z0NvbnRyb2xzVGVzdGluZ1N1YlZpZXcuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvYXBwL3ZpZXcvVGVtcGxhdGVWaWV3Q29tcG9uZW50LmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL21haW4uanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbm9yaS9Ob3JpLmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL25vcmkvYWN0aW9uL0FjdGlvbkNvbnN0YW50cy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9ub3JpL3N0b3JlL01hcC5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9ub3JpL3N0b3JlL01hcENvbGxlY3Rpb24uanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbm9yaS9zdG9yZS9NaXhpbk1hcEZhY3RvcnkuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbm9yaS9zdG9yZS9NaXhpblJlZHVjZXJTdG9yZS5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9ub3JpL3N0b3JlL1NpbXBsZVN0b3JlLmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL25vcmkvdXRpbHMvRGlzcGF0Y2hlci5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9ub3JpL3V0aWxzL01peGluT2JzZXJ2YWJsZVN1YmplY3QuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbm9yaS91dGlscy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9ub3JpL3V0aWxzL1JvdXRlci5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9ub3JpL3V0aWxzL1J4LmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL25vcmkvdXRpbHMvVGVtcGxhdGluZy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9ub3JpL3ZpZXcvQXBwbGljYXRpb25WaWV3LmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL25vcmkvdmlldy9NaXhpbkNvbXBvbmVudFZpZXdzLmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL25vcmkvdmlldy9NaXhpbkV2ZW50RGVsZWdhdG9yLmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL25vcmkvdmlldy9NaXhpbk51ZG9ydUNvbnRyb2xzLmpzIiwiL1VzZXJzL21hdHQvRHJvcGJveC9Xb3JrL1BlcnNvbmFsIFdvcmsvQXBwIEZyYW1ld29yay9jb2RlL3NyYy9zY3JpcHRzL25vcmkvdmlldy9NaXhpblJvdXRlVmlld3MuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbm9yaS92aWV3L1ZpZXdDb21wb25lbnQuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbnVkb3J1L2Jyb3dzZXIvQnJvd3NlckluZm8uanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbnVkb3J1L2Jyb3dzZXIvRE9NVXRpbHMuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbnVkb3J1L2Jyb3dzZXIvTG9yZW0uanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbnVkb3J1L2Jyb3dzZXIvVGhyZWVEVHJhbnNmb3Jtcy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9udWRvcnUvY29tcG9uZW50cy9NZXNzYWdlQm94Q3JlYXRvci5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9udWRvcnUvY29tcG9uZW50cy9NZXNzYWdlQm94Vmlldy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9udWRvcnUvY29tcG9uZW50cy9Nb2RhbENvdmVyVmlldy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9udWRvcnUvY29tcG9uZW50cy9Ub2FzdFZpZXcuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbnVkb3J1L2NvbXBvbmVudHMvVG9vbFRpcFZpZXcuanMiLCIvVXNlcnMvbWF0dC9Ecm9wYm94L1dvcmsvUGVyc29uYWwgV29yay9BcHAgRnJhbWV3b3JrL2NvZGUvc3JjL3NjcmlwdHMvbnVkb3J1L2NvcmUvQXJyYXlVdGlscy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9udWRvcnUvY29yZS9OdW1iZXJVdGlscy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9udWRvcnUvY29yZS9PYmplY3RVdGlscy5qcyIsIi9Vc2Vycy9tYXR0L0Ryb3Bib3gvV29yay9QZXJzb25hbCBXb3JrL0FwcCBGcmFtZXdvcmsvY29kZS9zcmMvc2NyaXB0cy9udWRvcnUvY29yZS9TdHJpbmdVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDS0EsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDOztBQUUvQixRQUFNLEVBQUUsRUFBRTs7Ozs7QUFLVixPQUFLLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0FBQ3JDLE1BQUksRUFBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7Ozs7OztBQU1uQyxZQUFVLEVBQUUsc0JBQVk7QUFDdEIsUUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7QUFFdkIsUUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN4QixRQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0UsUUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztHQUN4Qjs7Ozs7QUFLRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixRQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDdkI7Ozs7O0FBS0QsZ0JBQWMsRUFBRSwwQkFBWTtBQUMxQixRQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7QUFDakMsUUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQixRQUFJLENBQUMsSUFBSSxDQUFD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LENBQUM7R0FDWjs7Q0FFRixDQUFDOzs7QUN6TEYsTUFBTSxDQUFDLE9BQU8sR0FBRzs7QUFFZix1QkFBcUIsRUFBRSwrQkFBVSxHQUFHLEVBQUU7QUFDcEMsV0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDdkQ7O0FBRUQsYUFBVyxFQUFFLHFCQUFVLEdBQUcsRUFBRTtBQUMxQixXQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQzFDLGFBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BELENBQUMsQ0FBQztHQUNKOztBQUVELFlBQVUsRUFBRSxvQkFBVSxHQUFHLEVBQUU7QUFDekIsV0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztHQUN6Qzs7QUFFRCxVQUFRLEVBQUUsa0JBQVUsR0FBRyxFQUFFO0FBQ3ZCLFdBQU8sQUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0dBQ2pFOztDQUVGLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBcIkNvbnRyb2xsZXJcIiBmb3IgYSBOb3JpIGFwcGxpY2F0aW9uLiBUaGUgY29udHJvbGxlciBpcyByZXNwb25zaWJsZSBmb3JcbiAqIGJvb3RzdHJhcHBpbmcgdGhlIGFwcCBhbmQgcG9zc2libHkgaGFuZGxpbmcgc29ja2V0L3NlcnZlciBpbnRlcmFjdGlvbi5cbiAqIEFueSBhZGRpdGlvbmFsIGZ1bmN0aW9uYWxpdHkgc2hvdWxkIGJlIGhhbmRsZWQgaW4gYSBzcGVjaWZpYyBtb2R1bGUuXG4gKi9cbnZhciBBcHAgPSBOb3JpLmNyZWF0ZUFwcGxpY2F0aW9uKHtcblxuICBtaXhpbnM6IFtdLFxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIG1haW4gTm9yaSBBcHAgc3RvcmUgYW5kIHZpZXcuXG4gICAqL1xuICBzdG9yZTogcmVxdWlyZSgnLi9zdG9yZS9BcHBTdG9yZS5qcycpLFxuICB2aWV3IDogcmVxdWlyZSgnLi92aWV3L0FwcFZpZXcuanMnKSxcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZVxuICAgKiBDYWxsZWQgd2hlbiBBcHAgaXMgcmVxdWlyZWQgaW4gbWFpbi5qc1xuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudmlldy5pbml0aWFsaXplKCk7XG5cbiAgICB0aGlzLnN0b3JlLmluaXRpYWxpemUoKTsgLy8gc3RvcmUgd2lsbCBhY3F1aXJlIGRhdGEgZGlzcGF0Y2ggZXZlbnQgd2hlbiBjb21wbGV0ZVxuICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKCdzdG9yZUluaXRpYWxpemVkJywgdGhpcy5vblN0b3JlSW5pdGlhbGl6ZWQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdG9yZS5sb2FkU3RvcmUoKTtcbiAgfSxcblxuICAvKipcbiAgICogQWZ0ZXIgdGhlIHN0b3JlIGRhdGEgaXMgcmVhZHlcbiAgICovXG4gIG9uU3RvcmVJbml0aWFsaXplZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucnVuQXBwbGljYXRpb24oKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBcIlBsZWFzZSB3YWl0XCIgY292ZXIgYW5kIHN0YXJ0IHRoZSBhcHBcbiAgICovXG4gIHJ1bkFwcGxpY2F0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy52aWV3LnJlbW92ZUxvYWRpbmdNZXNzYWdlKCk7XG4gICAgdGhpcy52aWV3LnJlbmRlcigpO1xuICAgIHRoaXMudmlldy5zaG93Vmlld0Zyb21VUkxIYXNoKHRydWUpOyAvLyBTdGFydCB3aXRoIHRoZSByb3V0ZSBpbiB0aGUgY3VycmVudCBVUkxcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7IiwidmFyIF9ub3JpQWN0aW9uQ29uc3RhbnRzICAgID0gcmVxdWlyZSgnLi4vLi4vbm9yaS9hY3Rpb24vQWN0aW9uQ29uc3RhbnRzLmpzJyksXG4gICAgX21peGluTWFwRmFjdG9yeSAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9ub3JpL3N0b3JlL01peGluTWFwRmFjdG9yeS5qcycpLFxuICAgIF9taXhpbk9ic2VydmFibGVTdWJqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbm9yaS91dGlscy9NaXhpbk9ic2VydmFibGVTdWJqZWN0LmpzJyksXG4gICAgX21peGluUmVkdWNlclN0b3JlICAgICAgPSByZXF1aXJlKCcuLi8uLi9ub3JpL3N0b3JlL01peGluUmVkdWNlclN0b3JlLmpzJyk7XG5cbi8qKlxuICogVGhpcyBhcHBsaWNhdGlvbiBzdG9yZSBjb250YWlucyBcInJlZHVjZXIgc3RvcmVcIiBmdW5jdGlvbmFsaXR5IGJhc2VkIG9uIFJlZHV4LlxuICogVGhlIHN0b3JlIHN0YXRlIG1heSBvbmx5IGJlIGNoYW5nZWQgZnJvbSBldmVudHMgYXMgYXBwbGllZCBpbiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqIFRoZSBzdG9yZSByZWNlaXZlZCBhbGwgZXZlbnRzIGZyb20gdGhlIGV2ZW50IGJ1cyBhbmQgZm9yd2FyZHMgdGhlbSB0byBhbGxcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRvIG1vZGlmeSBzdGF0ZSBhcyBuZWVkZWQuIE9uY2UgdGhleSBoYXZlIHJ1biwgdGhlXG4gKiBoYW5kbGVTdGF0ZU11dGF0aW9uIGZ1bmN0aW9uIGlzIGNhbGxlZCB0byBkaXNwYXRjaCBhbiBldmVudCB0byB0aGUgYnVzLCBvclxuICogbm90aWZ5IHN1YnNjcmliZXJzIHZpYSBhbiBvYnNlcnZhYmxlLlxuICpcbiAqIEV2ZW50cyA9PiBoYW5kbGVBcHBsaWNhdGlvbkV2ZW50cyA9PiBhcHBseVJlZHVjZXJzID0+IGhhbmRsZVN0YXRlTXV0YXRpb24gPT4gTm90aWZ5XG4gKi9cbnZhciBBcHBTdG9yZSA9IE5vcmkuY3JlYXRlU3RvcmUoe1xuXG4gIG1peGluczogW1xuICAgIF9taXhpbk1hcEZhY3RvcnksXG4gICAgX21peGluUmVkdWNlclN0b3JlLFxuICAgIF9taXhpbk9ic2VydmFibGVTdWJqZWN0KClcbiAgXSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hZGRSZWR1Y2VyKHRoaXMuZGVmYXVsdFJlZHVjZXJGdW5jdGlvbik7XG4gICAgdGhpcy5pbml0aWFsaXplUmVkdWNlclN0b3JlKCk7XG4gICAgdGhpcy5jcmVhdGVTdWJqZWN0KCdzdG9yZUluaXRpYWxpemVkJyk7XG4gIH0sXG5cbiAgbG9hZFN0b3JlOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gU2V0IGluaXRpYWwgc3RhdGUgZnJvbSBkYXRhIGNvbnRhaW5lZCBpbiB0aGUgY29uZmlnLmpzIGZpbGVcbiAgICB0aGlzLnNldFN0YXRlKE5vcmkuY29uZmlnKCkpO1xuICAgIHRoaXMuc3RvcmVSZWFkeSgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXQgb3IgbG9hZCBhbnkgbmVjZXNzYXJ5IGRhdGEgYW5kIHRoZW4gYnJvYWRjYXN0IGEgaW5pdGlhbGl6ZWQgZXZlbnQuXG4gICAqL1xuICBzdG9yZVJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Z3JlZXRpbmc6ICdIZWxsbyB3b3JsZCEnfSk7XG5cbiAgICAvLyBUZXN0aW5nXG4gICAgY29uc29sZS5sb2coJ0luaXRpYWwgYXBwIHN0YXRlOicsIHRoaXMuZ2V0U3RhdGUoKSk7XG5cbiAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzT2YoJ3N0b3JlSW5pdGlhbGl6ZWQnKTtcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZ5IHN0YXRlIGJhc2VkIG9uIGluY29taW5nIGV2ZW50cy4gUmV0dXJucyBhIGNvcHkgb2YgdGhlIG1vZGlmaWVkXG4gICAqIHN0YXRlIGFuZCBkb2VzIG5vdCBtb2RpZnkgdGhlIHN0YXRlIGRpcmVjdGx5LlxuICAgKiBDYW4gY29tcG9zZSBzdGF0ZSB0cmFuc2Zvcm1hdGlvbnNcbiAgICogcmV0dXJuIF8uYXNzaWduKHt9LCBzdGF0ZSwgb3RoZXJTdGF0ZVRyYW5zZm9ybWVyKHN0YXRlKSk7XG4gICAqIEBwYXJhbSBzdGF0ZVxuICAgKiBAcGFyYW0gYWN0aW9uXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZGVmYXVsdFJlZHVjZXJGdW5jdGlvbjogZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IHt9O1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgICBjYXNlIF9ub3JpQWN0aW9uQ29uc3RhbnRzLkNIQU5HRV9TVE9SRV9TVEFURTpcbiAgICAgICAgcmV0dXJuIF8uYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLnBheWxvYWQuZGF0YSk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENhbGxlZCBhZnRlciBhbGwgcmVkdWNlcnMgaGF2ZSBydW4gdG8gYnJvYWRjYXN0IHBvc3NpYmxlIHVwZGF0ZXMuIERvZXNcbiAgICogbm90IGNoZWNrIHRvIHNlZSBpZiB0aGUgc3RhdGUgd2FzIGFjdHVhbGx5IHVwZGF0ZWQuXG4gICAqL1xuICBoYW5kbGVTdGF0ZU11dGF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ0hhbmRsZSBzdGF0ZSBtdXRhdGlvbicsIHRoaXMuZ2V0U3RhdGUoKSk7XG4gICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycygpO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcFN0b3JlKCk7IiwidmFyIF9taXhpbkFwcGxpY2F0aW9uVmlldyAgID0gcmVxdWlyZSgnLi4vLi4vbm9yaS92aWV3L0FwcGxpY2F0aW9uVmlldy5qcycpLFxuICAgIF9taXhpbk51ZG9ydUNvbnRyb2xzICAgID0gcmVxdWlyZSgnLi4vLi4vbm9yaS92aWV3L01peGluTnVkb3J1Q29udHJvbHMuanMnKSxcbiAgICBfbWl4aW5Db21wb25lbnRWaWV3cyAgICA9IHJlcXVpcmUoJy4uLy4uL25vcmkvdmlldy9NaXhpbkNvbXBvbmVudFZpZXdzLmpzJyksXG4gICAgX21peGluUm91dGVWaWV3cyAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9ub3JpL3ZpZXcvTWl4aW5Sb3V0ZVZpZXdzLmpzJyksXG4gICAgX21peGluRXZlbnREZWxlZ2F0b3IgICAgPSByZXF1aXJlKCcuLi8uLi9ub3JpL3ZpZXcvTWl4aW5FdmVudERlbGVnYXRvci5qcycpLFxuICAgIF9taXhpbk9ic2VydmFibGVTdWJqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbm9yaS91dGlscy9NaXhpbk9ic2VydmFibGVTdWJqZWN0LmpzJyk7XG5cbi8qKlxuICogVmlldyBmb3IgYW4gYXBwbGljYXRpb24uXG4gKi9cblxudmFyIEFwcFZpZXcgPSBOb3JpLmNyZWF0ZVZpZXcoe1xuXG4gIG1peGluczogW1xuICAgIF9taXhpbkFwcGxpY2F0aW9uVmlldyxcbiAgICBfbWl4aW5OdWRvcnVDb250cm9scyxcbiAgICBfbWl4aW5Db21wb25lbnRWaWV3cyxcbiAgICBfbWl4aW5Sb3V0ZVZpZXdzLFxuICAgIF9taXhpbkV2ZW50RGVsZWdhdG9yKCksXG4gICAgX21peGluT2JzZXJ2YWJsZVN1YmplY3QoKVxuICBdLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVBcHBsaWNhdGlvblZpZXcoWydhcHBsaWNhdGlvbnNjYWZmb2xkJywgJ2FwcGxpY2F0aW9uY29tcG9uZW50c3NjYWZmb2xkJ10pO1xuICAgIHRoaXMuaW5pdGlhbGl6ZVJvdXRlVmlld3MoKTtcbiAgICB0aGlzLmluaXRpYWxpemVOdWRvcnVDb250cm9scygpO1xuXG4gICAgdGhpcy5jb25maWd1cmVWaWV3cygpO1xuICB9LFxuXG4gIGNvbmZpZ3VyZVZpZXdzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRlZmF1bHRWaWV3RmFjdG9yeSA9IHJlcXVpcmUoJy4vVGVtcGxhdGVWaWV3Q29tcG9uZW50LmpzJyksXG4gICAgICAgIGRlZmF1bHRWaWV3ICAgICAgICA9IGRlZmF1bHRWaWV3RmFjdG9yeSgpLFxuICAgICAgICBzdHlsZVZpZXcgICAgICAgICAgPSBkZWZhdWx0Vmlld0ZhY3RvcnkoKSxcbiAgICAgICAgY29udHJvbHNWaWV3ICAgICAgID0gZGVmYXVsdFZpZXdGYWN0b3J5KCksXG4gICAgICAgIGRlYnVnVmlldyAgICAgICAgICA9IHRoaXMuY3JlYXRlQ29tcG9uZW50VmlldyhyZXF1aXJlKCcuL0RlYnVnQ29udHJvbHNUZXN0aW5nU3ViVmlldy5qcycpKSgpO1xuXG4gICAgLy8gQ29udGFpbmVyIGZvciByb3V0ZWQgdmlld3NcbiAgICB0aGlzLnNldFZpZXdNb3VudFBvaW50KCcjY29udGVudHMnKTtcbiAgICB0aGlzLm1hcFJvdXRlVG9WaWV3Q29tcG9uZW50KCcvJywgJ2RlZmF1bHQnLCBkZWZhdWx0Vmlldyk7XG4gICAgdGhpcy5tYXBSb3V0ZVRvVmlld0NvbXBvbmVudCgnL3N0eWxlcycsICdkZWJ1Zy1zdHlsZXRlc3QnLCBzdHlsZVZpZXcpO1xuICAgIHRoaXMubWFwUm91dGVUb1ZpZXdDb21wb25lbnQoJy9jb250cm9scycsICdkZWJ1Zy1jb250cm9scycsIGNvbnRyb2xzVmlldyk7XG4gICAgdGhpcy5tYXBSb3V0ZVRvVmlld0NvbXBvbmVudCgnL2NvbXBzJywgJ2RlYnVnLWNvbXBvbmVudHMnLCBkZWJ1Z1ZpZXcpO1xuXG4gICAgLy8gQWx0ZXJuYXRlbHksIG1hcCB2aWV3cyB0byBkaWZmZXJlbnQgc3RvcmUgc3RhdGVzIHdpdGggTWl4aW5TdG9yZVN0YXRlVmlld3NcbiAgICAvL3RoaXMubWFwU3RhdGVUb1ZpZXdDb21wb25lbnQoJ1RJVExFJywgJ3RpdGxlJywgc2NyZWVuVGl0bGUpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEcmF3IGFuZCBVSSB0byB0aGUgRE9NIGFuZCBzZXQgZXZlbnRzXG4gICAqL1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAvL1xuICB9XG5cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwVmlldygpOyIsIi8qKlxuICogTW9kdWxlIGZvciB0ZXN0aW5nIE51ZG9ydSBjb21wb25lbnQgY2xhc3NlcyBhbmQgYW55IHRoaW5nIGVsc2VcbiAqL1xudmFyIERlYnVnQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfbElwc3VtICA9IHJlcXVpcmUoJy4uLy4uL251ZG9ydS9icm93c2VyL0xvcmVtLmpzJyksXG4gICAgICBfdG9vbFRpcCA9IHJlcXVpcmUoJy4uLy4uL251ZG9ydS9jb21wb25lbnRzL1Rvb2xUaXBWaWV3LmpzJyksXG4gICAgICBfYXBwVmlldyA9IHJlcXVpcmUoJy4vQXBwVmlldy5qcycpLFxuICAgICAgX2FjdGlvbk9uZUVsLFxuICAgICAgX2FjdGlvblR3b0VsLFxuICAgICAgX2FjdGlvblRocmVlRWwsXG4gICAgICBfYWN0aW9uRm91ckVsLFxuICAgICAgX2FjdGlvbkZpdmVFbCxcbiAgICAgIF9hY3Rpb25TaXhFbDtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplKGluaXRPYmopIHtcbiAgICBfbElwc3VtLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0SUQoKSArICcsIHN1YnZpZXcgZGlkIG1vdW50Jyk7XG5cbiAgICBfYWN0aW9uT25lRWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY3Rpb24tb25lJyk7XG4gICAgX2FjdGlvblR3b0VsICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWN0aW9uLXR3bycpO1xuICAgIF9hY3Rpb25UaHJlZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjdGlvbi10aHJlZScpO1xuICAgIF9hY3Rpb25Gb3VyRWwgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjdGlvbi1mb3VyJyk7XG4gICAgX2FjdGlvbkZpdmVFbCAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWN0aW9uLWZpdmUnKTtcbiAgICBfYWN0aW9uU2l4RWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY3Rpb24tc2l4Jyk7XG5cbiAgICAvL190b29sVGlwLmFkZCh7dGl0bGU6JycsIGNvbnRlbnQ6XCJUaGlzIGlzIGEgYnV0dG9uLCBpdCdzIHB1cnBvc2UgaXMgdW5rbm93bi5cIiwgcG9zaXRpb246J1RSJywgdGFyZ2V0RWw6IF9hY3Rpb25Gb3VyRWwsIHR5cGU6J2luZm9ybWF0aW9uJ30pO1xuICAgIC8vX3Rvb2xUaXAuYWRkKHt0aXRsZTonJywgY29udGVudDpcIlRoaXMgaXMgYSBidXR0b24sIGNsaWNrIGl0IGFuZCByYWluYm93cyB3aWxsIGFwcGVhci5cIiwgcG9zaXRpb246J0JSJywgdGFyZ2V0RWw6IF9hY3Rpb25Gb3VyRWwsIHR5cGU6J3N1Y2Nlc3MnfSk7XG4gICAgLy9fdG9vbFRpcC5hZGQoe3RpdGxlOicnLCBjb250ZW50OlwiVGhpcyBpcyBhIGJ1dHRvbiwgaXQgZG9lc24ndCBtYWtlIGEgc291bmQuXCIsIHBvc2l0aW9uOidCTCcsIHRhcmdldEVsOiBfYWN0aW9uRm91ckVsLCB0eXBlOid3YXJuaW5nJ30pO1xuICAgIC8vX3Rvb2xUaXAuYWRkKHt0aXRsZTonJywgY29udGVudDpcIlRoaXMgaXMgYSBidXR0b24sIGJlaG9sZCB0aGUgbWFnaWMgYW5kIG15c3RlcnkuXCIsIHBvc2l0aW9uOidUTCcsIHRhcmdldEVsOiBfYWN0aW9uRm91ckVsLCB0eXBlOidkYW5nZXInfSk7XG5cbiAgICBfdG9vbFRpcC5hZGQoe1xuICAgICAgdGl0bGUgICA6ICcnLFxuICAgICAgY29udGVudCA6IFwiVGhpcyBpcyBhIGJ1dHRvbiwgeW91IGNsaWNrIGl0IGR1bW15LiBUaGlzIGlzIGEgYnV0dG9uLCB5b3UgY2xpY2sgaXQgZHVtbXkuIFwiLFxuICAgICAgcG9zaXRpb246ICdMJyxcbiAgICAgIHRhcmdldEVsOiBfYWN0aW9uRm91ckVsLFxuICAgICAgdHlwZSAgICA6ICdpbmZvcm1hdGlvbidcbiAgICB9KTtcbiAgICBfdG9vbFRpcC5hZGQoe1xuICAgICAgdGl0bGUgICA6ICcnLFxuICAgICAgY29udGVudCA6IFwiVGhpcyBpcyBhIGJ1dHRvbiwgeW91IGNsaWNrIGl0IGR1bW15LiBUaGlzIGlzIGEgYnV0dG9uLCB5b3UgY2xpY2sgaXQgZHVtbXkuIFwiLFxuICAgICAgcG9zaXRpb246ICdCJyxcbiAgICAgIHRhcmdldEVsOiBfYWN0aW9uRm91ckVsLFxuICAgICAgdHlwZSAgICA6ICdpbmZvcm1hdGlvbidcbiAgICB9KTtcbiAgICBfdG9vbFRpcC5hZGQoe1xuICAgICAgdGl0bGUgICA6ICcnLFxuICAgICAgY29udGVudCA6IFwiVGhpcyBpcyBhIGJ1dHRvbiwgeW91IGNsaWNrIGl0IGR1bW15LiBUaGlzIGlzIGEgYnV0dG9uLCB5b3UgY2xpY2sgaXQgZHVtbXkuIFRoaXMgaXMgYSBidXR0b24sIHlvdSBjbGljayBpdCBkdW1teS4gXCIsXG4gICAgICBwb3NpdGlvbjogJ1InLFxuICAgICAgdGFyZ2V0RWw6IF9hY3Rpb25Gb3VyRWwsXG4gICAgICB0eXBlICAgIDogJ2luZm9ybWF0aW9uJ1xuICAgIH0pO1xuICAgIF90b29sVGlwLmFkZCh7XG4gICAgICB0aXRsZSAgIDogJycsXG4gICAgICBjb250ZW50IDogXCJUaGlzIGlzIGEgYnV0dG9uLCB5b3UgY2xpY2sgaXQgZHVtbXkuIFRoaXMgaXMgYSBidXR0b24sIHlvdSBjbGljayBpdCBkdW1teS4gVGhpcyBpcyBhIGJ1dHRvbiwgeW91IGNsaWNrIGl0IGR1bW15LiBUaGlzIGlzIGEgYnV0dG9uLCB5b3UgY2xpY2sgaXQgZHVtbXkuIFwiLFxuICAgICAgcG9zaXRpb246ICdUJyxcbiAgICAgIHRhcmdldEVsOiBfYWN0aW9uRm91ckVsLFxuICAgICAgdHlwZSAgICA6ICdpbmZvcm1hdGlvbidcbiAgICB9KTtcblxuXG4gICAgX2FjdGlvbk9uZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gYWN0T25lKGUpIHtcbiAgICAgIF9hcHBWaWV3LmFkZE1lc3NhZ2VCb3goe1xuICAgICAgICB0aXRsZSAgOiBfbElwc3VtLmdldFNlbnRlbmNlKDIsIDQpLFxuICAgICAgICBjb250ZW50OiBfbElwc3VtLmdldFBhcmFncmFwaCgyLCA0KSxcbiAgICAgICAgdHlwZSAgIDogJ3dhcm5pbmcnLFxuICAgICAgICBtb2RhbCAgOiB0cnVlLFxuICAgICAgICB3aWR0aCAgOiA1MDBcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgX2FjdGlvblR3b0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gYWN0VHdvKGUpIHtcbiAgICAgIF9hcHBWaWV3LmFkZE1lc3NhZ2VCb3goe1xuICAgICAgICB0aXRsZSAgOiBfbElwc3VtLmdldFNlbnRlbmNlKDEwLCAyMCksXG4gICAgICAgIGNvbnRlbnQ6IF9sSXBzdW0uZ2V0UGFyYWdyYXBoKDIsIDQpLFxuICAgICAgICB0eXBlICAgOiAnZGVmYXVsdCcsXG4gICAgICAgIG1vZGFsICA6IGZhbHNlLFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWwgIDogJ1llcycsXG4gICAgICAgICAgICBpZCAgICAgOiAneWVzJyxcbiAgICAgICAgICAgIHR5cGUgICA6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgIGljb24gICA6ICdjaGVjaycsXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd5ZXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsICA6ICdNYXliZScsXG4gICAgICAgICAgICBpZCAgICAgOiAnbWF5YmUnLFxuICAgICAgICAgICAgdHlwZSAgIDogJ3Bvc2l0aXZlJyxcbiAgICAgICAgICAgIGljb24gICA6ICdjb2cnLFxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWF5YmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnTm9wZScsXG4gICAgICAgICAgICBpZCAgIDogJ25vcGUnLFxuICAgICAgICAgICAgdHlwZSA6ICduZWdhdGl2ZScsXG4gICAgICAgICAgICBpY29uIDogJ3RpbWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBfYWN0aW9uVGhyZWVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIGFjdFRocmVlKGUpIHtcbiAgICAgIF9hcHBWaWV3LmFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHRpdGxlICA6IF9sSXBzdW0uZ2V0U2VudGVuY2UoMywgNiksXG4gICAgICAgIHR5cGUgICA6ICdpbmZvcm1hdGlvbicsXG4gICAgICAgIGNvbnRlbnQ6IF9sSXBzdW0uZ2V0UGFyYWdyYXBoKDEsIDIpXG4gICAgICB9KTtcblxuICAgICAgX3Rvb2xUaXAucmVtb3ZlKF9hY3Rpb25Gb3VyRWwpO1xuICAgIH0pO1xuXG4gICAgX2FjdGlvbkZvdXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIGFjdEZvdXIoZSkge1xuICAgICAgY29uc29sZS5sb2coJ0ZvdXInKTtcbiAgICB9KTtcblxuICAgIF9hY3Rpb25GaXZlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBhY3RGb3VyKGUpIHtcbiAgICAgIE5vcmkucm91dGVyKCkuc2V0KCcvc3R5bGVzJywge3Byb3A6ICdzb21lIGRhdGEnLCBtb2FyOiAnMjUnfSk7XG4gICAgfSk7XG5cbiAgICBfYWN0aW9uU2l4RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBhY3RGb3VyKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdub3RoaW5nIHlldCcpO1xuICAgIH0pO1xuXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUgICAgICAgOiBpbml0aWFsaXplLFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBjb21wb25lbnREaWRNb3VudFxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlYnVnQ29tcG9uZW50OyIsInZhciB2aWV3ID0gcmVxdWlyZSgnLi9BcHBWaWV3LmpzJyk7XG5cbi8qKlxuICogTW9kdWxlIGZvciBhIGR5bmFtaWMgYXBwbGljYXRpb24gdmlldyBmb3IgYSByb3V0ZSBvciBhIHBlcnNpc3RlbnQgdmlld1xuICovXG5cbnZhciBDb21wb25lbnQgPSB2aWV3LmNyZWF0ZUNvbXBvbmVudFZpZXcoe1xuICAvKipcbiAgICogTWl4aW5zIGFyZSBvdGhlciBtb2R1bGVzL29iamVjdHMgdGhhdCBtdWx0aXBsZSBjb21wb25lbnRzIHNoYXJlLCBwcm92aWRlc1xuICAgKiBjb21tb24gZnVuY3Rpb25hbGl0eSBiZXR3ZWVuIHRoZW4uXG4gICAqL1xuICAvL21peGluczogW1xuICAvLyAge1xuICAvLyAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgICByZXR1cm4gJzxoMT5NSVhJTiE8L2gxPic7XG4gIC8vICAgIH1cbiAgLy8gIH1cbiAgLy9dLFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGFuZCBiaW5kLCBjYWxsZWQgb25jZSBvbiBmaXJzdCByZW5kZXIuIFBhcmVudCBjb21wb25lbnQgaXNcbiAgICogaW5pdGlhbGl6ZWQgZnJvbSBhcHAgdmlld1xuICAgKiBAcGFyYW0gY29uZmlnUHJvcHNcbiAgICovXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChjb25maWdQcm9wcykge1xuICAgIC8vQmluZCB0byBhIG1hcCwgdXBkYXRlIHdpbGwgYmUgY2FsbGVkIG9uIGNoYW5nZXMgdG8gdGhlIG1hcFxuICAgIC8vdGhpcy5iaW5kTWFwKEFQUC5zdG9yZSgpKTsgLy8gUmVkdWNlciBzdG9yZSwgbWFwIGlkIHN0cmluZyBvciBtYXAgb2JqZWN0XG5cbiAgICAvL2N1c3RvbSBpbml0IGJlbG93IGhlcmVcbiAgICAvL3RoaXMuc2V0VGVtcGxhdGUoJzxoMT57eyBncmVldGluZyB9fTwvaDE+Jyk7IC8vIHNldCBjdXN0b20gSFRNTCB0ZW1wbGF0ZVxuICB9LFxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gb2JqZWN0IHRvIGJlIHVzZWQgdG8gZGVmaW5lIGV2ZW50cyBvbiBET00gZWxlbWVudHNcbiAgICogQHJldHVybnMge31cbiAgICovXG4gIC8vZGVmaW5lRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgLy8gIHJldHVybiB7XG4gIC8vICAgICdjbGljayAjYnV0dG9uLWlkJzogaGFuZGxlQnV0dG9uXG4gIC8vICB9O1xuICAvL30sXG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIHN0YXRlIHByb3BlcnRpZXMuIENhbGwgb25jZSBvbiBmaXJzdCByZW5kZXJcbiAgICovXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBUFAuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgfSxcblxuICAvKipcbiAgICogU3RhdGUgY2hhbmdlIG9uIGJvdW5kIHN0b3JlcyAobWFwLCBldGMuKSBSZXR1cm4gbmV4dFN0YXRlIG9iamVjdFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXh0U3RhdGUgPSBBUFAuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBuZXh0U3RhdGUuZ3JlZXRpbmcgKz0gJyAodXBkYXRlZCknO1xuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERldGVybWluZSBpZiB1cGRhdGUvcmVkcmF3IHNob3VsZCBvY2N1clxuICAgKiBAcGFyYW0gbmV4dFN0YXRlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgLy9zaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRTdGF0ZSkge1xuICAvLyAgLy8gVGVzdCBmb3IgZGlmZmVyZW5jZXMgYmV0d2VlbiBuZXh0U3RhdGUgYW5kIHRoaXMuZ2V0U3RhdGUoKVxuICAvL30sXG5cbiAgLyoqXG4gICAqIFJlbmRlciBvdmVycmlkZSBtdXN0IHJldHVybiBIVE1MLlxuICAgKi9cbiAgLy9yZW5kZXI6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIC8vICByZXR1cm4gJzxoMT4nK3N0YXRlLmdyZWV0aW5nKyc8L2gxPic7XG4gIC8vfSxcblxuICAvKipcbiAgICogQ29tcG9uZW50IEhUTUwgd2FzIGF0dGFjaGVkIHRvIHRoZSBET01cbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgLy9cbiAgfSxcblxuICAvKipcbiAgICogQ29tcG9uZW50IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBET01cbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ2xlYW4gdXBcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiLyoqXG4gKiBJbml0aWFsIGZpbGUgZm9yIHRoZSBBcHBsaWNhdGlvblxuICovXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9icm93c2VySW5mbyA9IHJlcXVpcmUoJy4vbnVkb3J1L2Jyb3dzZXIvQnJvd3NlckluZm8uanMnKTtcblxuICAvKipcbiAgICogSUUgdmVyc2lvbnMgOSBhbmQgdW5kZXIgYXJlIGJsb2NrZWQsIG90aGVycyBhcmUgYWxsb3dlZCB0byBwcm9jZWVkXG4gICAqL1xuICBpZihfYnJvd3NlckluZm8ubm90U3VwcG9ydGVkIHx8IF9icm93c2VySW5mby5pc0lFOSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbm5lckhUTUwgPSAnPGgzPkZvciB0aGUgYmVzdCBleHBlcmllbmNlLCBwbGVhc2UgdXNlIEludGVybmV0IEV4cGxvcmVyIDEwKywgRmlyZWZveCwgQ2hyb21lIG9yIFNhZmFyaSB0byB2aWV3IHRoaXMgYXBwbGljYXRpb24uPC9oMz4nO1xuICB9IGVsc2Uge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBtb2R1bGUgYW5kIGluaXRpYWxpemVcbiAgICAgKi9cbiAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuTm9yaSA9IHJlcXVpcmUoJy4vbm9yaS9Ob3JpLmpzJyk7XG4gICAgICB3aW5kb3cuQVBQID0gcmVxdWlyZSgnLi9hcHAvQXBwLmpzJyk7XG4gICAgICBBUFAuaW5pdGlhbGl6ZSgpO1xuICAgIH07XG5cbiAgfVxuXG59KCkpOyIsInZhciBOb3JpID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfZGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4vdXRpbHMvRGlzcGF0Y2hlci5qcycpLFxuICAgICAgX3JvdXRlciAgICAgPSByZXF1aXJlKCcuL3V0aWxzL1JvdXRlci5qcycpO1xuXG4gIC8vIFN3aXRjaCBMb2Rhc2ggdG8gdXNlIE11c3RhY2hlIHN0eWxlIHRlbXBsYXRlc1xuICBfLnRlbXBsYXRlU2V0dGluZ3MuaW50ZXJwb2xhdGUgPSAve3soW1xcc1xcU10rPyl9fS9nO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgQWNjZXNzb3JzXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGZ1bmN0aW9uIGdldERpc3BhdGNoZXIoKSB7XG4gICAgcmV0dXJuIF9kaXNwYXRjaGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Um91dGVyKCkge1xuICAgIHJldHVybiBfcm91dGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29uZmlnKCkge1xuICAgIHJldHVybiBfLmFzc2lnbih7fSwgKHdpbmRvdy5BUFBfQ09ORklHX0RBVEEgfHwge30pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRSb3V0ZSgpIHtcbiAgICByZXR1cm4gX3JvdXRlci5nZXRDdXJyZW50Um91dGUoKTtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgRmFjdG9yaWVzIC0gY29uY2F0ZW5hdGl2ZSBpbmhlcml0YW5jZSwgZGVjb3JhdG9yc1xuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogTWVyZ2VzIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIHNvdXJjZUFycmF5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZnVuY3Rpb24gYXNzaWduQXJyYXkodGFyZ2V0LCBzb3VyY2VBcnJheSkge1xuICAgIHNvdXJjZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgdGFyZ2V0ID0gXy5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0pO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IE5vcmkgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgICogQHBhcmFtIGN1c3RvbVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUFwcGxpY2F0aW9uKGN1c3RvbSkge1xuICAgIGN1c3RvbS5taXhpbnMucHVzaCh0aGlzKTtcbiAgICByZXR1cm4gYnVpbGRGcm9tTWl4aW5zKGN1c3RvbSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBtYWluIGFwcGxpY2F0aW9uIHN0b3JlXG4gICAqIEBwYXJhbSBjdXN0b21cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVTdG9yZShjdXN0b20pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY3MoKSB7XG4gICAgICByZXR1cm4gXy5hc3NpZ24oe30sIGJ1aWxkRnJvbU1peGlucyhjdXN0b20pKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgbWFpbiBhcHBsaWNhdGlvbiB2aWV3XG4gICAqIEBwYXJhbSBjdXN0b21cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVWaWV3KGN1c3RvbSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBjdigpIHtcbiAgICAgIHJldHVybiBfLmFzc2lnbih7fSwgYnVpbGRGcm9tTWl4aW5zKGN1c3RvbSkpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTWl4ZXMgaW4gdGhlIG1vZHVsZXMgc3BlY2lmaWVkIGluIHRoZSBjdXN0b20gYXBwbGljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSBzb3VyY2VPYmplY3RcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBidWlsZEZyb21NaXhpbnMoc291cmNlT2JqZWN0KSB7XG4gICAgdmFyIG1peGlucztcblxuICAgIGlmIChzb3VyY2VPYmplY3QubWl4aW5zKSB7XG4gICAgICBtaXhpbnMgPSBzb3VyY2VPYmplY3QubWl4aW5zO1xuICAgIH1cblxuICAgIG1peGlucy5wdXNoKHNvdXJjZU9iamVjdCk7XG4gICAgcmV0dXJuIGFzc2lnbkFycmF5KHt9LCBtaXhpbnMpO1xuICB9XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEZ1bmN0aW9uYWwgdXRpbHMgZnJvbSBNaXRocmlsXG4gIC8vICBodHRwczovL2dpdGh1Yi5jb20vbGhvcmllL21pdGhyaWwuanMvYmxvYi9uZXh0L21pdGhyaWwuanNcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gaHR0cDovL21pdGhyaWwuanMub3JnL21pdGhyaWwucHJvcC5odG1sXG4gIGZ1bmN0aW9uIHByb3Aoc3RvcmUpIHtcbiAgICAvL2lmIChpc0Z1bmN0aW9uKHN0b3JlLnRoZW4pKSB7XG4gICAgLy8gIC8vIGhhbmRsZSBhIHByb21pc2VcbiAgICAvL31cbiAgICB2YXIgZ2V0dGVyc2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgc3RvcmUgPSBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmU7XG4gICAgfTtcblxuICAgIGdldHRlcnNldHRlci50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RvcmU7XG4gICAgfTtcblxuICAgIHJldHVybiBnZXR0ZXJzZXR0ZXI7XG4gIH1cblxuICAvLyBodHRwOi8vbWl0aHJpbC5qcy5vcmcvbWl0aHJpbC53aXRoQXR0ci5odG1sXG4gIGZ1bmN0aW9uIHdpdGhBdHRyKHByb3AsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlID0gZSB8fCBldmVudDtcblxuICAgICAgdmFyIGN1cnJlbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgfHwgdGhpcyxcbiAgICAgICAgICBjbnR4ICAgICAgICAgID0gY29udGV4dCB8fCB0aGlzO1xuXG4gICAgICBjYWxsYmFjay5jYWxsKGNudHgsIHByb3AgaW4gY3VycmVudFRhcmdldCA/IGN1cnJlbnRUYXJnZXRbcHJvcF0gOiBjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShwcm9wKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgQVBJXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHJldHVybiB7XG4gICAgY29uZmlnICAgICAgICAgICA6IGdldENvbmZpZyxcbiAgICBkaXNwYXRjaGVyICAgICAgIDogZ2V0RGlzcGF0Y2hlcixcbiAgICByb3V0ZXIgICAgICAgICAgIDogZ2V0Um91dGVyLFxuICAgIGNyZWF0ZUFwcGxpY2F0aW9uOiBjcmVhdGVBcHBsaWNhdGlvbixcbiAgICBjcmVhdGVTdG9yZSAgICAgIDogY3JlYXRlU3RvcmUsXG4gICAgY3JlYXRlVmlldyAgICAgICA6IGNyZWF0ZVZpZXcsXG4gICAgYnVpbGRGcm9tTWl4aW5zICA6IGJ1aWxkRnJvbU1peGlucyxcbiAgICBnZXRDdXJyZW50Um91dGUgIDogZ2V0Q3VycmVudFJvdXRlLFxuICAgIGFzc2lnbkFycmF5ICAgICAgOiBhc3NpZ25BcnJheSxcbiAgICBwcm9wICAgICAgICAgICAgIDogcHJvcCxcbiAgICB3aXRoQXR0ciAgICAgICAgIDogd2l0aEF0dHJcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3JpKCk7XG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIENIQU5HRV9TVE9SRV9TVEFURTogJ0NIQU5HRV9TVE9SRV9TVEFURSdcbn07IiwiLyoqXG4gKiBNYXAgZGF0YSB0eXBlXG4gKi9cblxudmFyIE1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzLFxuICAgICAgX2lkLFxuICAgICAgX3BhcmVudENvbGxlY3Rpb24sXG4gICAgICBfZGlydHkgICA9IGZhbHNlLFxuICAgICAgX2VudHJpZXMgPSBbXSxcbiAgICAgIF9tYXAgICAgID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gIEluaXRpYWxpemF0aW9uXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoaW5pdE9iaikge1xuICAgIGlmICghaW5pdE9iai5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yZSBtdXN0IGJlIGluaXRcXCdkIHdpdGggYW4gaWQnKTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IHRoaXM7XG4gICAgX2lkICAgPSBpbml0T2JqLmlkO1xuXG4gICAgaWYgKGluaXRPYmouc3RvcmUpIHtcbiAgICAgIF9kaXJ0eSA9IHRydWU7XG4gICAgICBfbWFwICAgPSBpbml0T2JqLnN0b3JlO1xuICAgIH0gZWxzZSBpZiAoaW5pdE9iai5qc29uKSB7XG4gICAgICBzZXRKU09OKGluaXRPYmouanNvbik7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogU2V0IG1hcCBzdG9yZSBmcm9tIGEgSlNPTiBvYmplY3RcbiAgICogQHBhcmFtIGpzdHJcbiAgICovXG4gIGZ1bmN0aW9uIHNldEpTT04oanN0cikge1xuICAgIF9kaXJ0eSA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIF9tYXAgPSBKU09OLnBhcnNlKGpzdHIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFwQ29sbGVjdGlvbiwgZXJyb3IgcGFyc2luZyBKU09OOicsIGpzdHIsIGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElEKCkge1xuICAgIHJldHVybiBfaWQ7XG4gIH1cblxuICAvKipcbiAgICogRXJhc2UgaXRcbiAgICovXG4gIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIF9tYXAgICA9IHt9O1xuICAgIF9kaXJ0eSA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RpcnR5KCkge1xuICAgIHJldHVybiBfZGlydHk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrQ2xlYW4oKSB7XG4gICAgX2RpcnR5ID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHByb3BlcnR5IG9yIG1lcmdlIGluIG5ldyBkYXRhXG4gICAqIEBwYXJhbSBrZXkgU3RyaW5nID0gbmFtZSBvZiBwcm9wZXJ0eSB0byBzZXQsIE9iamVjdCA9IHdpbGwgbWVyZ2UgbmV3IHByb3BzXG4gICAqIEBwYXJhbSB2YWx1ZSBTdHJpbmcgPSB2YWx1ZSBvZiBwcm9wZXJ0eSB0byBzZXRcbiAgICovXG4gIGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG5cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIF9tYXAgPSBfLm1lcmdlKHt9LCBfbWFwLCBrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfbWFwW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBNYXJrIGNoYW5nZWRcbiAgICBfZGlydHkgPSB0cnVlO1xuXG4gICAgZGlzcGF0Y2hDaGFuZ2UoJ3NldF9rZXknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3N1bWluZyB0aGF0IF9tYXBba2V5XSBpcyBhbiBvYmplY3QsIHRoaXMgd2lsbCBzZXQgYSBwcm9wZXJ0eSBvbiBpdFxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSBwcm9wXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBmdW5jdGlvbiBzZXRLZXlQcm9wKGtleSwgcHJvcCwgZGF0YSkge1xuICAgIF9tYXBba2V5XVtwcm9wXSA9IGRhdGE7XG5cbiAgICBfZGlydHkgPSB0cnVlO1xuICAgIGRpc3BhdGNoQ2hhbmdlKCdzZXRfa2V5Jyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIGRhdGFcbiAgICogQHJldHVybnMgKlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHZhciB2YWx1ZSA9IGhhcyhrZXkpID8gX21hcFtrZXldIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IF8uY2xvbmVEZWVwKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQXNzdW1pbmcgdGhhdCBfbWFwW2tleV0gaXMgYW4gb2JqZWN0LCB0aGlzIHdpbGwgZ2V0IHZhbHVlXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHByb3BcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRLZXlQcm9wKGtleSwgcHJvcCkge1xuICAgIHZhciB2YWx1ZU9iaiA9IGhhcyhrZXkpID8gX21hcFtrZXldIDogdW5kZWZpbmVkLFxuICAgICAgICB2YWx1ZSAgICA9IG51bGw7XG5cbiAgICBpZiAodmFsdWVPYmopIHtcbiAgICAgIHZhbHVlID0gXy5jbG9uZURlZXAodmFsdWVPYmpbcHJvcF0pO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgb2YgdGhlIGtleSBpcyBwcmVzZW50IGluIHRoZSBtYXBcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICByZXR1cm4gX21hcC5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGtleS92YWx1ZXMuIFJlc3VsdHMgYXJlIGNhY2hlZCBhbmQgb25seSByZWdlbmVyYXRlZFxuICAgKiBpZiBjaGFuZ2VkIChzZXQpXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgaWYgKCFfZGlydHkgJiYgX2VudHJpZXMpIHtcbiAgICAgIHJldHVybiBfZW50cmllcztcbiAgICB9XG5cbiAgICB2YXIgYXJyeSA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBfbWFwKSB7XG4gICAgICBhcnJ5LnB1c2goe2tleToga2V5LCB2YWx1ZTogX21hcFtrZXldfSk7XG4gICAgfVxuXG4gICAgX2VudHJpZXMgPSBhcnJ5O1xuICAgIF9kaXJ0eSAgID0gZmFsc2U7XG5cbiAgICByZXR1cm4gYXJyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgZW50cmllc1xuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gc2l6ZSgpIHtcbiAgICByZXR1cm4ga2V5cygpLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBrZXlzIGluIHRoZSBtYXBcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoX21hcCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdmF1bGVzIGluIHRoZSBtYXBcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiBlbnRyaWVzKCkubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgcmV0dXJuIGVudHJ5LnZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHZhbHVlXG4gICAqIEBwYXJhbSBrZXlcbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICBkZWxldGUgX21hcFtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgbWF0Y2hlcyB0byB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICogQHJldHVybnMge0FycmF5LjxUPn1cbiAgICovXG4gIGZ1bmN0aW9uIGZpbHRlclZhbHVlcyhwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gdmFsdWVzKCkuZmlsdGVyKHByZWRpY2F0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJzdCgpIHtcbiAgICByZXR1cm4gZW50cmllcygpWzBdO1xuICB9XG5cbiAgZnVuY3Rpb24gbGFzdCgpIHtcbiAgICB2YXIgZSA9IGVudHJpZXMoKTtcbiAgICByZXR1cm4gZVtlLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXRJbmRleChpKSB7XG4gICAgcmV0dXJuIGVudHJpZXMoKVtpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY29weSBvZiB0aGUgZGF0YSBtYXBcbiAgICogQHJldHVybnMge3ZvaWR8Kn1cbiAgICovXG4gIGZ1bmN0aW9uIHRvT2JqZWN0KCkge1xuICAgIHJldHVybiBfLm1lcmdlKHt9LCBfbWFwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBuZXcgb2JqZWN0IGJ5IFwidHJhbnNsYXRpbmdcIiB0aGUgcHJvcGVydGllcyBvZiB0aGUgbWFwIGZyb20gb25lIGtleSB0byBhbm90aGVyXG4gICAqIEBwYXJhbSB0T2JqIHtjdXJyZW50UHJvcCwgbmV3UHJvcH1cbiAgICovXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybSh0T2JqKSB7XG4gICAgdmFyIHRyYW5zZm9ybWVkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIGZvciAodmFyIHByb3AgaW4gdE9iaikge1xuICAgICAgaWYgKF9tYXAuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgdHJhbnNmb3JtZWRbdE9ialtwcm9wXV0gPSBfbWFwW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2Zvcm1lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBjaGFuZ2UsIGVtaXQgZXZlbnQgZ2xvYmFsbHlcbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoQ2hhbmdlKHR5cGUpIHtcbiAgICB2YXIgcGF5bG9hZCA9IHtcbiAgICAgIGlkICAgICA6IF9pZCxcbiAgICAgIG1hcFR5cGU6ICdzdG9yZSdcbiAgICB9O1xuXG4gICAgX3RoaXMubm90aWZ5U3Vic2NyaWJlcnMocGF5bG9hZCk7XG5cbiAgICBpZiAoX3BhcmVudENvbGxlY3Rpb24uZGlzcGF0Y2hDaGFuZ2UpIHtcbiAgICAgIF9wYXJlbnRDb2xsZWN0aW9uLmRpc3BhdGNoQ2hhbmdlKHtcbiAgICAgICAgaWQ6IF9pZFxuICAgICAgfSwgKHR5cGUgfHwgJ21hcCcpKTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoX21hcCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRQYXJlbnRDb2xsZWN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICBfcGFyZW50Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYXJlbnRDb2xsZWN0aW9uKCkge1xuICAgIHJldHVybiBfcGFyZW50Q29sbGVjdGlvbjtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgQVBJXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZSAgICAgICAgIDogaW5pdGlhbGl6ZSxcbiAgICBnZXRJRCAgICAgICAgICAgICAgOiBnZXRJRCxcbiAgICBjbGVhciAgICAgICAgICAgICAgOiBjbGVhcixcbiAgICBpc0RpcnR5ICAgICAgICAgICAgOiBpc0RpcnR5LFxuICAgIG1hcmtDbGVhbiAgICAgICAgICA6IG1hcmtDbGVhbixcbiAgICBzZXRKU09OICAgICAgICAgICAgOiBzZXRKU09OLFxuICAgIHNldCAgICAgICAgICAgICAgICA6IHNldCxcbiAgICBzZXRLZXlQcm9wICAgICAgICAgOiBzZXRLZXlQcm9wLFxuICAgIGdldCAgICAgICAgICAgICAgICA6IGdldCxcbiAgICBnZXRLZXlQcm9wICAgICAgICAgOiBnZXRLZXlQcm9wLFxuICAgIGhhcyAgICAgICAgICAgICAgICA6IGhhcyxcbiAgICByZW1vdmUgICAgICAgICAgICAgOiByZW1vdmUsXG4gICAga2V5cyAgICAgICAgICAgICAgIDoga2V5cyxcbiAgICB2YWx1ZXMgICAgICAgICAgICAgOiB2YWx1ZXMsXG4gICAgZW50cmllcyAgICAgICAgICAgIDogZW50cmllcyxcbiAgICBmaWx0ZXJWYWx1ZXMgICAgICAgOiBmaWx0ZXJWYWx1ZXMsXG4gICAgc2l6ZSAgICAgICAgICAgICAgIDogc2l6ZSxcbiAgICBmaXJzdCAgICAgICAgICAgICAgOiBmaXJzdCxcbiAgICBsYXN0ICAgICAgICAgICAgICAgOiBsYXN0LFxuICAgIGdldEF0SW5kZXggICAgICAgICA6IGdldEF0SW5kZXgsXG4gICAgdG9PYmplY3QgICAgICAgICAgIDogdG9PYmplY3QsXG4gICAgdHJhbnNmb3JtICAgICAgICAgIDogdHJhbnNmb3JtLFxuICAgIHRvSlNPTiAgICAgICAgICAgICA6IHRvSlNPTixcbiAgICBzZXRQYXJlbnRDb2xsZWN0aW9uOiBzZXRQYXJlbnRDb2xsZWN0aW9uLFxuICAgIGdldFBhcmVudENvbGxlY3Rpb246IGdldFBhcmVudENvbGxlY3Rpb25cbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXA7IiwiLyoqXG4gKiBNYXAgQ29sbGVjdGlvbiAtIGFuIGFycmF5IG9mIG1hcHNcbiAqL1xudmFyIE1hcENvbGxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpcyxcbiAgICAgIF9pZCxcbiAgICAgIF9wYXJlbnRDb2xsZWN0aW9uLFxuICAgICAgX2NhcmV0ICAgID0gMCxcbiAgICAgIF9jaGlsZHJlbiA9IFtdO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgSW5pdGlhbGl6YXRpb25cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZShpbml0T2JqKSB7XG4gICAgaWYgKCFpbml0T2JqLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JlQ29sbGVjdGlvbiBtdXN0IGJlIGluaXRcXCdkIHdpdGggYW4gaWQnKTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IHRoaXM7XG4gICAgX2lkICAgPSBpbml0T2JqLmlkO1xuXG4gICAgLy8gVE9ETyB0ZXN0XG4gICAgaWYgKGluaXRPYmouc3RvcmVzKSB7XG4gICAgICBhZGRNYXBzRnJvbUFycmF5LmNhbGwoX3RoaXMsIGluaXRPYmouc3RvcmVzKTtcbiAgICB9XG4gIH1cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gIEl0ZXJhdG9yXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgdmFyIHJldCA9IHt9O1xuICAgIGlmIChoYXNOZXh0KCkpIHtcbiAgICAgIHJldCA9IHt2YWx1ZTogX2NoaWxkcmVuW19jYXJldCsrXSwgZG9uZTogIWhhc05leHQoKX07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCA9IGN1cnJlbnQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgZnVuY3Rpb24gY3VycmVudCgpIHtcbiAgICByZXR1cm4ge3ZhbHVlOiBfY2hpbGRyZW5bX2NhcmV0XSwgZG9uZTogIWhhc05leHQoKX07XG4gIH1cblxuICBmdW5jdGlvbiByZXdpbmQoKSB7XG4gICAgX2NhcmV0ID0gMDtcbiAgICByZXR1cm4gX2NoaWxkcmVuW19jYXJldF07XG4gIH1cblxuICBmdW5jdGlvbiBoYXNOZXh0KCkge1xuICAgIHJldHVybiBfY2FyZXQgPCBfY2hpbGRyZW4ubGVuZ3RoO1xuICB9XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vICBJbXBsXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGZ1bmN0aW9uIGlzRGlydHkoKSB7XG4gICAgdmFyIGRpcnR5ID0gZmFsc2U7XG4gICAgZm9yRWFjaChmdW5jdGlvbiBjaGVja0RpcnR5KG1hcCkge1xuICAgICAgaWYgKG1hcC5pc0RpcnR5KCkpIHtcbiAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkaXJ0eTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtDbGVhbigpIHtcbiAgICBmb3JFYWNoKGZ1bmN0aW9uIGNoZWNrRGlydHkobWFwKSB7XG4gICAgICBtYXAubWFya0NsZWFuKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGFycmF5IG9mIFN0b3JlIGluc3RhbmNlc1xuICAgKiBAcGFyYW0gc0FycnlcbiAgICovXG4gIGZ1bmN0aW9uIGFkZE1hcHNGcm9tQXJyYXkoc0FycnkpIHtcbiAgICBzQXJyeS5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgYWRkKHN0b3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gYWRkIGNoaWxkIFN0b3JlIHN0b3JlcyBmcm9tIGFuIGFycmF5IG9mIG9iamVjdHNcbiAgICogQHBhcmFtIGFycmF5IEFycmF5IG9mIG9iamVjdHNcbiAgICogQHBhcmFtIGlkS2V5IEtleSBvbiBlYWNoIG9iamVjdCB0byB1c2UgZm9yIHRoZSBJRCBvZiB0aGF0IFN0b3JlIHN0b3JlXG4gICAqL1xuICBmdW5jdGlvbiBhZGRGcm9tT2JqQXJyYXkob0FycnksIGlkS2V5KSB7XG4gICAgY29uc29sZS53YXJuKCdNYXBDb2xsZWN0aW9uLCBhZGRGcm9tT2JqQXJyeSwgbmVlZCB0byBiZSBmaXhlZCB0byByZW1vdmUgcmVmZXJlbmNlIHRvIE5vcmkuc3RvcmUoKScpO1xuICAgIG9BcnJ5LmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuXG4gICAgICB2YXIgaWQ7XG5cbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaWRLZXkpKSB7XG4gICAgICAgIGlkID0gb2JqW2lkS2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkID0gX2lkICsgJ2NoaWxkJyArIF9jaGlsZHJlbi5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIC8vYWRkKE5vcmkuc3RvcmUoKS5jcmVhdGVNYXAoe2lkOiBpZCwgc3RvcmU6IG9ian0pKTtcbiAgICB9KTtcbiAgICBkaXNwYXRjaENoYW5nZShfaWQsICdhZGRfbWFwJyk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRGcm9tSlNPTkFycmF5KGpzb24sIGlkS2V5KSB7XG4gICAgY29uc29sZS53YXJuKCdNYXBDb2xsZWN0aW9uLCBhZGRGcm9tSlNPTkFycnksIG5lZWQgdG8gYmUgZml4ZWQgdG8gcmVtb3ZlIHJlZmVyZW5jZSB0byBOb3JpLnN0b3JlKCknKTtcbiAgICBqc29uLmZvckVhY2goZnVuY3Rpb24gKGpzdHIpIHtcblxuICAgICAgdmFyIGlkLCBvYmo7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG9iaiA9IEpTT04ucGFyc2UoanN0cik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWFwQ29sbGVjdGlvbiwgZXJyb3IgcGFyc2luZyBKU09OOicsIGpzdHIsIGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGlkS2V5KSkge1xuICAgICAgICBpZCA9IG9ialtpZEtleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9IF9pZCArICdjaGlsZCcgKyBfY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICAvL2FkZChOb3JpLnN0b3JlKCkuY3JlYXRlTWFwKHtpZDogaWQsIHN0b3JlOiBvYmp9KSk7XG4gICAgfSk7XG4gICAgZGlzcGF0Y2hDaGFuZ2UoX2lkLCAnYWRkX21hcCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SUQoKSB7XG4gICAgcmV0dXJuIF9pZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChzdG9yZSkge1xuICAgIHZhciBjdXJySWR4ID0gZ2V0TWFwSW5kZXgoc3RvcmUuZ2V0SUQoKSk7XG5cbiAgICBzdG9yZS5zZXRQYXJlbnRDb2xsZWN0aW9uKF90aGlzKTtcblxuICAgIGlmIChjdXJySWR4ID49IDApIHtcbiAgICAgIF9jaGlsZHJlbltjdXJySWR4XSA9IHN0b3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBfY2hpbGRyZW4ucHVzaChzdG9yZSk7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDaGFuZ2UoX2lkLCAnYWRkX21hcCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHN0b3JlIGZyb20gdGhlIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIHN0b3JlSURcbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZShzdG9yZUlEKSB7XG4gICAgdmFyIGN1cnJJZHggPSBnZXRNYXBJbmRleChzdG9yZUlEKTtcbiAgICBpZiAoY3VycklkeCA+PSAwKSB7XG4gICAgICBfY2hpbGRyZW5bY3VycklkeF0uc2V0UGFyZW50Q29sbGVjdGlvbihudWxsKTtcbiAgICAgIF9jaGlsZHJlbltjdXJySWR4XSA9IG51bGw7XG4gICAgICBfY2hpbGRyZW4uc3BsaWNlKGN1cnJJZHgsIDEpO1xuICAgICAgZGlzcGF0Y2hDaGFuZ2UoX2lkLCAncmVtb3ZlX21hcCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhfaWQgKyAnIHJlbW92ZSwgc3RvcmUgbm90IGluIGNvbGxlY3Rpb246ICcgKyBzdG9yZUlEKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBzdG9yZXMgZnJvbSB0aGUgYXJyYXlcbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZUFsbCgpIHtcbiAgICBfY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAobWFwKSB7XG4gICAgICBtYXAuc2V0UGFyZW50Q29sbGVjdGlvbihudWxsKTtcbiAgICB9KTtcblxuICAgIF9jaGlsZHJlbiA9IFtdO1xuICAgIGRpc3BhdGNoQ2hhbmdlKF9pZCwgJ3JlbW92ZV9tYXAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBTdG9yZSBieSBJRFxuICAgKiBAcGFyYW0gc3RvcmVJRFxuICAgKiBAcmV0dXJucyB7VH1cbiAgICovXG4gIGZ1bmN0aW9uIGdldE1hcChzdG9yZUlEKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICByZXR1cm4gc3RvcmUuZ2V0SUQoKSA9PT0gc3RvcmVJRDtcbiAgICB9KVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGluZGV4IGluIF9jaGlsZHJlbiBhcnJheSBieSBTdG9yZSdzIElEXG4gICAqIEBwYXJhbSBzdG9yZUlEXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRNYXBJbmRleChzdG9yZUlEKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICByZXR1cm4gc3RvcmUuZ2V0SUQoKTtcbiAgICB9KS5pbmRleE9mKHN0b3JlSUQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGNoYW5nZSwgZW1pdCBldmVudCBnbG9iYWxseVxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2hDaGFuZ2UoZGF0YSwgdHlwZSkge1xuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgaWQgICAgIDogX2lkLFxuICAgICAgdHlwZSAgIDogdHlwZSB8fCAnJyxcbiAgICAgIG1hcFR5cGU6ICdjb2xsZWN0aW9uJyxcbiAgICAgIG1hcElEICA6IGRhdGEuaWRcbiAgICB9O1xuXG4gICAgX3RoaXMubm90aWZ5U3Vic2NyaWJlcnMocGF5bG9hZCk7XG5cbiAgICBpZiAoX3BhcmVudENvbGxlY3Rpb24pIHtcbiAgICAgIF9wYXJlbnRDb2xsZWN0aW9uLmRpc3BhdGNoQ2hhbmdlKHtpZDogX2lkLCBzdG9yZTogZ2V0TWFwKCl9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYXNNYXAoc3RvcmVJRCkge1xuICAgIHJldHVybiBfY2hpbGRyZW5bc3RvcmVJRF07XG4gIH1cblxuICAvKipcbiAgICogTnVtYmVyIG9mIGVudHJpZXNcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIHNpemUoKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJzdCgpIHtcbiAgICByZXR1cm4gX2NoaWxkcmVuWzBdO1xuICB9XG5cbiAgZnVuY3Rpb24gbGFzdCgpIHtcbiAgICByZXR1cm4gX2NoaWxkcmVuW19jaGlsZHJlbi5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF0SW5kZXgoaSkge1xuICAgIHJldHVybiBfY2hpbGRyZW5baV07XG4gIH1cblxuICAvKipcbiAgICogUnVucyBhIHByZWRpZGF0ZSBvbiBlYWNoIGNoaWxkIG1hcFxuICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAqIEByZXR1cm5zIHtBcnJheS48VD59XG4gICAqL1xuICBmdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5maWx0ZXIocHJlZGljYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG1hcHMgd2hlcmUgdGhlIGZpbHRlciBtYXRjaGVzIHRoZSBwcm9wIC8gdmFsdWUgcGFpclxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgZnVuY3Rpb24gZmlsdGVyQnlLZXkoa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBfY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgIHJldHVybiBtYXAuZ2V0KGtleSkgPT09IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yRWFjaChmdW5jKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5mb3JFYWNoKGZ1bmMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwKGZ1bmMpIHtcbiAgICByZXR1cm4gX2NoaWxkcmVuLm1hcChmdW5jKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgZW50cmllcyBvZiBlYWNoIG1hcFxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgIHZhciBhcnJ5ID0gW107XG4gICAgX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG1hcCkge1xuICAgICAgYXJyeS5wdXNoKG1hcC5lbnRyaWVzKCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnJ5O1xuICB9XG5cbiAgZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShfY2hpbGRyZW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0UGFyZW50Q29sbGVjdGlvbihjb2xsZWN0aW9uKSB7XG4gICAgX3BhcmVudENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFyZW50Q29sbGVjdGlvbigpIHtcbiAgICByZXR1cm4gX3BhcmVudENvbGxlY3Rpb247XG4gIH1cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gIEFQSVxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUgICAgICAgICA6IGluaXRpYWxpemUsXG4gICAgY3VycmVudCAgICAgICAgICAgIDogY3VycmVudCxcbiAgICBuZXh0ICAgICAgICAgICAgICAgOiBuZXh0LFxuICAgIGhhc05leHQgICAgICAgICAgICA6IGhhc05leHQsXG4gICAgcmV3aW5kICAgICAgICAgICAgIDogcmV3aW5kLFxuICAgIGdldElEICAgICAgICAgICAgICA6IGdldElELFxuICAgIGlzRGlydHkgICAgICAgICAgICA6IGlzRGlydHksXG4gICAgbWFya0NsZWFuICAgICAgICAgIDogbWFya0NsZWFuLFxuICAgIGFkZCAgICAgICAgICAgICAgICA6IGFkZCxcbiAgICBhZGRNYXBzRnJvbUFycmF5ICAgOiBhZGRNYXBzRnJvbUFycmF5LFxuICAgIGFkZEZyb21PYmpBcnJheSAgICA6IGFkZEZyb21PYmpBcnJheSxcbiAgICBhZGRGcm9tSlNPTkFycmF5ICAgOiBhZGRGcm9tSlNPTkFycmF5LFxuICAgIHJlbW92ZSAgICAgICAgICAgICA6IHJlbW92ZSxcbiAgICByZW1vdmVBbGwgICAgICAgICAgOiByZW1vdmVBbGwsXG4gICAgZ2V0TWFwICAgICAgICAgICAgIDogZ2V0TWFwLFxuICAgIGhhc01hcCAgICAgICAgICAgICA6IGhhc01hcCxcbiAgICBzaXplICAgICAgICAgICAgICAgOiBzaXplLFxuICAgIGZpcnN0ICAgICAgICAgICAgICA6IGZpcnN0LFxuICAgIGxhc3QgICAgICAgICAgICAgICA6IGxhc3QsXG4gICAgYXRJbmRleCAgICAgICAgICAgIDogYXRJbmRleCxcbiAgICBmaWx0ZXIgICAgICAgICAgICAgOiBmaWx0ZXIsXG4gICAgZmlsdGVyQnlLZXkgICAgICAgIDogZmlsdGVyQnlLZXksXG4gICAgZm9yRWFjaCAgICAgICAgICAgIDogZm9yRWFjaCxcbiAgICBtYXAgICAgICAgICAgICAgICAgOiBtYXAsXG4gICAgZW50cmllcyAgICAgICAgICAgIDogZW50cmllcyxcbiAgICB0b0pTT04gICAgICAgICAgICAgOiB0b0pTT04sXG4gICAgZGlzcGF0Y2hDaGFuZ2UgICAgIDogZGlzcGF0Y2hDaGFuZ2UsXG4gICAgc2V0UGFyZW50Q29sbGVjdGlvbjogc2V0UGFyZW50Q29sbGVjdGlvbixcbiAgICBnZXRQYXJlbnRDb2xsZWN0aW9uOiBnZXRQYXJlbnRDb2xsZWN0aW9uXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcENvbGxlY3Rpb247IiwidmFyIE1peGluTWFwRmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX21hcENvbGxlY3Rpb25MaXN0ICAgID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIF9tYXBMaXN0ICAgICAgICAgICAgICA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBfbWFwQ29sbGVjdGlvbkZhY3RvcnkgPSByZXF1aXJlKCcuL01hcENvbGxlY3Rpb24uanMnKSxcbiAgICAgIF9tYXBGYWN0b3J5ICAgICAgICAgICA9IHJlcXVpcmUoJy4vTWFwLmpzJyksXG4gICAgICBfb2JzZXJ2YWJsZUZhY3RvcnkgICAgPSByZXF1aXJlKCcuLi91dGlscy9NaXhpbk9ic2VydmFibGVTdWJqZWN0LmpzJyk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBzdG9yZSBjb2xsZWN0aW9uIGFuZCBpbml0YWxpemVcbiAgICogQHBhcmFtIGluaXRPYmpcbiAgICogQHBhcmFtIGV4dHJhc1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZU1hcENvbGxlY3Rpb24oaW5pdE9iaiwgZXh0cmFzKSB7XG4gICAgdmFyIG0gPSBOb3JpLmFzc2lnbkFycmF5KHt9LCBbX21hcENvbGxlY3Rpb25GYWN0b3J5KCksIF9vYnNlcnZhYmxlRmFjdG9yeSgpLCBleHRyYXNdKTtcbiAgICBtLmluaXRpYWxpemUoaW5pdE9iaik7XG4gICAgcmV0dXJuIG07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHN0b3JlIGFuZCBpbml0aWFsaXplXG4gICAqIEBwYXJhbSBpbml0T2JqXG4gICAqIEBwYXJhbSBleHRyYXNcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVNYXAoaW5pdE9iaiwgZXh0cmFzKSB7XG4gICAgdmFyIG0gPSBOb3JpLmFzc2lnbkFycmF5KHt9LCBbX21hcEZhY3RvcnkoKSwgX29ic2VydmFibGVGYWN0b3J5KCksIGV4dHJhc10pO1xuICAgIG0uaW5pdGlhbGl6ZShpbml0T2JqKTtcbiAgICByZXR1cm4gbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzdG9yZSBmcm9tIHRoZSBhcHBsaWNhdGlvbiBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBzdG9yZUlEXG4gICAqIEByZXR1cm5zIHt2b2lkfCp9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRNYXAoc3RvcmVJRCkge1xuICAgIHJldHVybiBfbWFwTGlzdFtzdG9yZUlEXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzdG9yZSBjb2xsZWN0aW9uIGZyb20gdGhlIGFwcGxpY2F0aW9uIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIHN0b3JlSURcbiAgICogQHJldHVybnMge3ZvaWR8Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldE1hcENvbGxlY3Rpb24oc3RvcmVJRCkge1xuICAgIHJldHVybiBfbWFwQ29sbGVjdGlvbkxpc3Rbc3RvcmVJRF07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZU1hcENvbGxlY3Rpb246IGNyZWF0ZU1hcENvbGxlY3Rpb24sXG4gICAgY3JlYXRlTWFwICAgICAgICAgIDogY3JlYXRlTWFwLFxuICAgIGdldE1hcCAgICAgICAgICAgICA6IGdldE1hcCxcbiAgICBnZXRNYXBDb2xsZWN0aW9uICAgOiBnZXRNYXBDb2xsZWN0aW9uXG4gIH07XG5cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNaXhpbk1hcEZhY3RvcnkoKTsiLCIvKipcbiAqIE1peGluIGZvciBOb3JpIHN0b3JlcyB0byBhZGQgZnVuY3Rpb25hbGl0eSBzaW1pbGFyIHRvIFJlZHV4JyBSZWR1Y2VyIGFuZCBzaW5nbGVcbiAqIG9iamVjdCBzdGF0ZSB0cmVlIGNvbmNlcHQuIE1peGluIHNob3VsZCBiZSBjb21wb3NlZCB0byBub3JpL3N0b3JlL0FwcGxpY2F0aW9uU3RvcmVcbiAqIGR1cmluZyBjcmVhdGlvbiBvZiBtYWluIEFwcFN0b3JlXG4gKlxuICogaHR0cHM6Ly9nYWVhcm9uLmdpdGh1Yi5pby9yZWR1eC9kb2NzL2FwaS9TdG9yZS5odG1sXG4gKiBodHRwczovL2dhZWFyb24uZ2l0aHViLmlvL3JlZHV4L2RvY3MvYmFzaWNzL1JlZHVjZXJzLmh0bWxcbiAqXG4gKiBDcmVhdGVkIDgvMTMvMTVcbiAqL1xudmFyIE1peGluUmVkdWNlclN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMsXG4gICAgICBfc3RhdGUsXG4gICAgICBfc3RhdGVSZWR1Y2VycyA9IFtdO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgQWNjZXNzb3JzXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBfc3RhdGUgbWlnaHQgbm90IGV4aXN0IGlmIHN1YnNjcmliZXJzIGFyZSBhZGRlZCBiZWZvcmUgdGhpcyBzdG9yZSBpcyBpbml0aWFsaXplZFxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgaWYgKF9zdGF0ZSkge1xuICAgICAgcmV0dXJuIF9zdGF0ZS5nZXRTdGF0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmICghXy5pc0VxdWFsKHN0YXRlLCBfc3RhdGUpKSB7XG4gICAgICBfc3RhdGUuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgX3RoaXMubm90aWZ5U3Vic2NyaWJlcnMoe30pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFJlZHVjZXJzKHJlZHVjZXJBcnJheSkge1xuICAgIF9zdGF0ZVJlZHVjZXJzID0gcmVkdWNlckFycmF5O1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVkdWNlcihyZWR1Y2VyKSB7XG4gICAgX3N0YXRlUmVkdWNlcnMucHVzaChyZWR1Y2VyKTtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgSW5pdFxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogU2V0IHVwIGV2ZW50IGxpc3RlbmVyL3JlY2VpdmVyXG4gICAqL1xuICBmdW5jdGlvbiBpbml0aWFsaXplUmVkdWNlclN0b3JlKCkge1xuICAgIGlmICghdGhpcy5jcmVhdGVTdWJqZWN0KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ25vcmkvc3RvcmUvTWl4aW5SZWR1Y2VyU3RvcmUgbmVlZHMgbm9yaS91dGlscy9NaXhpbk9ic2VydmFibGVTdWJqZWN0IHRvIG5vdGlmeScpO1xuICAgIH1cblxuICAgIHZhciBzaW1wbGVTdG9yZUZhY3RvcnkgPSByZXF1aXJlKCcuL1NpbXBsZVN0b3JlLmpzJyk7XG5cbiAgICBfdGhpcyAgPSB0aGlzO1xuICAgIF9zdGF0ZSA9IHNpbXBsZVN0b3JlRmFjdG9yeSgpO1xuXG4gICAgaWYgKCFfc3RhdGVSZWR1Y2Vycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyU3RvcmUsIG11c3Qgc2V0IGEgcmVkdWNlciBiZWZvcmUgaW5pdGlhbGl6YXRpb24nKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgaW5pdGlhbCBzdGF0ZSBmcm9tIGVtcHR5IGV2ZW50XG4gICAgYXBwbHlSZWR1Y2Vycyh7fSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhlIGFjdGlvbiBvYmplY3QgdG8gdGhlIHJlZHVjZXJzIHRvIGNoYW5nZSBzdGF0ZVxuICAgKiBhcmUgc2VudCB0byBhbGwgcmVkdWNlcnMgdG8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgKiBAcGFyYW0gYWN0aW9uT2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBhcHBseShhY3Rpb25PYmplY3QpIHtcbiAgICBjb25zb2xlLmxvZygnUmVkdWNlclN0b3JlIEFwcGx5OiAnLCBhY3Rpb25PYmplY3QudHlwZSwgYWN0aW9uT2JqZWN0LnBheWxvYWQpO1xuICAgIGFwcGx5UmVkdWNlcnMoYWN0aW9uT2JqZWN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5UmVkdWNlcnMoYWN0aW9uT2JqZWN0KSB7XG4gICAgdmFyIG5leHRTdGF0ZSA9IGFwcGx5UmVkdWNlcnNUb1N0YXRlKGdldFN0YXRlKCksIGFjdGlvbk9iamVjdCk7XG4gICAgc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgICBfdGhpcy5oYW5kbGVTdGF0ZU11dGF0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogQVBJIGhvb2sgdG8gaGFuZGxlIHN0YXRlIHVwZGF0ZXNcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVN0YXRlTXV0YXRpb24oKSB7XG4gICAgLy8gb3ZlcnJpZGUgdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgc3RhdGUgZnJvbSB0aGUgY29tYmluZWQgcmVkdWNlcyBhbmQgYWN0aW9uIG9iamVjdFxuICAgKiBTdG9yZSBzdGF0ZSBpc24ndCBtb2RpZmllZCwgY3VycmVudCBzdGF0ZSBpcyBwYXNzZWQgaW4gYW5kIG11dGF0ZWQgc3RhdGUgcmV0dXJuZWRcbiAgICogQHBhcmFtIHN0YXRlXG4gICAqIEBwYXJhbSBhY3Rpb25cbiAgICogQHJldHVybnMgeyp8e319XG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVJlZHVjZXJzVG9TdGF0ZShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCB7fTtcbiAgICAvLyBUT0RPIHNob3VsZCB0aGlzIGFjdHVhbGx5IHVzZSBhcnJheS5yZWR1Y2UoKT9cbiAgICBfc3RhdGVSZWR1Y2Vycy5mb3JFYWNoKGZ1bmN0aW9uIGFwcGx5U3RhdGVSZWR1Y2VyRnVuY3Rpb24ocmVkdWNlckZ1bmMpIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlckZ1bmMoc3RhdGUsIGFjdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbXBsYXRlIHJlZHVjZXIgZnVuY3Rpb25cbiAgICogU3RvcmUgc3RhdGUgaXNuJ3QgbW9kaWZpZWQsIGN1cnJlbnQgc3RhdGUgaXMgcGFzc2VkIGluIGFuZCBtdXRhdGVkIHN0YXRlIHJldHVybmVkXG5cbiAgIGZ1bmN0aW9uIHRlbXBsYXRlUmVkdWNlckZ1bmN0aW9uKHN0YXRlLCBldmVudCkge1xuICAgICAgICBzdGF0ZSA9IHN0YXRlIHx8IHt9O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICBjYXNlIF9ub3JpQWN0aW9uQ29uc3RhbnRzLk1PREVMX0RBVEFfQ0hBTkdFRDpcbiAgICAgICAgICAgIC8vIGNhbiBjb21wb3NlIG90aGVyIHJlZHVjZXJzXG4gICAgICAgICAgICAvLyByZXR1cm4gXy5hc3NpZ24oe30sIHN0YXRlLCBvdGhlclN0YXRlVHJhbnNmb3JtZXIoc3RhdGUpKTtcbiAgICAgICAgICAgIHJldHVybiBfLmFzc2lnbih7fSwgc3RhdGUsIHtwcm9wOiBldmVudC5wYXlsb2FkLnZhbHVlfSk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgKi9cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gIEFQSVxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemVSZWR1Y2VyU3RvcmU6IGluaXRpYWxpemVSZWR1Y2VyU3RvcmUsXG4gICAgZ2V0U3RhdGUgICAgICAgICAgICAgIDogZ2V0U3RhdGUsXG4gICAgc2V0U3RhdGUgICAgICAgICAgICAgIDogc2V0U3RhdGUsXG4gICAgYXBwbHkgICAgICAgICAgICAgICAgIDogYXBwbHksXG4gICAgc2V0UmVkdWNlcnMgICAgICAgICAgIDogc2V0UmVkdWNlcnMsXG4gICAgYWRkUmVkdWNlciAgICAgICAgICAgIDogYWRkUmVkdWNlcixcbiAgICBhcHBseVJlZHVjZXJzICAgICAgICAgOiBhcHBseVJlZHVjZXJzLFxuICAgIGFwcGx5UmVkdWNlcnNUb1N0YXRlICA6IGFwcGx5UmVkdWNlcnNUb1N0YXRlLFxuICAgIGhhbmRsZVN0YXRlTXV0YXRpb24gICA6IGhhbmRsZVN0YXRlTXV0YXRpb25cbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNaXhpblJlZHVjZXJTdG9yZSgpOyIsInZhciBTaW1wbGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF9pbnRlcm5hbFN0YXRlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvKipcbiAgICogUmV0dXJuIGEgY29weSBvZiB0aGUgc3RhdGVcbiAgICogQHJldHVybnMge3ZvaWR8Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBfLmFzc2lnbih7fSwgX2ludGVybmFsU3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHN0YXRlXG4gICAqIEBwYXJhbSBuZXh0U3RhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9pbnRlcm5hbFN0YXRlID0gXy5hc3NpZ24oX2ludGVybmFsU3RhdGUsIG5leHRTdGF0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICBzZXRTdGF0ZTogc2V0U3RhdGVcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVTdG9yZTsiLCIvKlxuIE1hdHQgUGVya2lucywgNi8xMi8xNVxuXG4gcHVibGlzaCBwYXlsb2FkIG9iamVjdFxuXG4ge1xuIHR5cGU6IEVWVF9UWVBFLFxuIHBheWxvYWQ6IHtcbiBrZXk6IHZhbHVlXG4gfVxuIH1cblxuICovXG52YXIgRGlzcGF0Y2hlciA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX3N1YmplY3RNYXAgID0ge30sXG4gICAgICBfcmVjZWl2ZXJNYXAgPSB7fSxcbiAgICAgIF9pZCAgICAgICAgICA9IDAsXG4gICAgICBfbG9nICAgICAgICAgPSBbXSxcbiAgICAgIF9xdWV1ZSAgICAgICA9IFtdLFxuICAgICAgX3RpbWVyT2JzZXJ2YWJsZSxcbiAgICAgIF90aW1lclN1YnNjcmlwdGlvbixcbiAgICAgIF90aW1lclBhdXNhYmxlO1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXZlbnQgYXMgb2JzZXJ2YWJsZVxuICAgKiBAcGFyYW0gZXZ0U3RyIEV2ZW50IG5hbWUgc3RyaW5nXG4gICAqIEBwYXJhbSBoYW5kbGVyIG9uTmV4dCgpIHN1YnNjcmlwdGlvbiBmdW5jdGlvblxuICAgKiBAcGFyYW0gb25jZU9yQ29udGV4dCBvcHRpb25hbCwgZWl0aGVyIHRoZSBjb250ZXh0IHRvIGV4ZWN1dGUgdGhlIGhhbmRlciBvciBvbmNlIGJvb2xcbiAgICogQHBhcmFtIG9uY2Ugd2lsbCBjb21wbGV0ZS9kaXNwb3NlIGFmdGVyIG9uZSBmaXJlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2dFN0ciwgaGFuZGxlciwgb25jZU9yQ29udGV4dCwgb25jZSkge1xuICAgIHZhciBoYW5kbGVyQ29udGV4dCA9IHdpbmRvdztcblxuICAgIC8vY29uc29sZS5sb2coJ2Rpc3BhdGNoZXIgc3Vic2NyaWJlJywgZXZ0U3RyLCBoYW5kbGVyLCBvbmNlT3JDb250ZXh0LCBvbmNlKTtcblxuICAgIGlmIChpcy5mYWxzZXkoZXZ0U3RyKSkge1xuICAgICAgY29uc29sZS53YXJuKCdEaXNwYXRjaGVyOiBGYXNsZXkgZXZlbnQgc3RyaW5nIHBhc3NlZCBmb3IgaGFuZGxlcicsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlmIChpcy5mYWxzZXkoaGFuZGxlcikpIHtcbiAgICAgIGNvbnNvbGUud2FybignRGlzcGF0Y2hlcjogRmFzbGV5IGhhbmRsZXIgcGFzc2VkIGZvciBldmVudCBzdHJpbmcnLCBldnRTdHIpO1xuICAgIH1cblxuICAgIGlmIChvbmNlT3JDb250ZXh0IHx8IG9uY2VPckNvbnRleHQgPT09IGZhbHNlKSB7XG4gICAgICBpZiAob25jZU9yQ29udGV4dCA9PT0gdHJ1ZSB8fCBvbmNlT3JDb250ZXh0ID09PSBmYWxzZSkge1xuICAgICAgICBvbmNlID0gb25jZU9yQ29udGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZXJDb250ZXh0ID0gb25jZU9yQ29udGV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIV9zdWJqZWN0TWFwW2V2dFN0cl0pIHtcbiAgICAgIF9zdWJqZWN0TWFwW2V2dFN0cl0gPSBbXTtcbiAgICB9XG5cbiAgICB2YXIgc3ViamVjdCA9IG5ldyBSeC5TdWJqZWN0KCk7XG5cbiAgICBfc3ViamVjdE1hcFtldnRTdHJdLnB1c2goe1xuICAgICAgb25jZSAgICA6IG9uY2UsXG4gICAgICBwcmlvcml0eTogMCxcbiAgICAgIGhhbmRsZXIgOiBoYW5kbGVyLFxuICAgICAgY29udGV4dCA6IGhhbmRsZXJDb250ZXh0LFxuICAgICAgc3ViamVjdCA6IHN1YmplY3QsXG4gICAgICB0eXBlICAgIDogMFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YmplY3Quc3Vic2NyaWJlKGhhbmRsZXIuYmluZChoYW5kbGVyQ29udGV4dCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGV2ZW50IHByb2Nlc3NpbmcgdGltZXIgb3IgcmVzdW1lIGEgcGF1c2VkIHRpbWVyXG4gICAqL1xuICBmdW5jdGlvbiBpbml0VGltZXIoKSB7XG4gICAgaWYgKF90aW1lck9ic2VydmFibGUpIHtcbiAgICAgIF90aW1lclBhdXNhYmxlLm9uTmV4dCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBfdGltZXJQYXVzYWJsZSAgICAgPSBuZXcgUnguU3ViamVjdCgpO1xuICAgIF90aW1lck9ic2VydmFibGUgICA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMSkucGF1c2FibGUoX3RpbWVyUGF1c2FibGUpO1xuICAgIF90aW1lclN1YnNjcmlwdGlvbiA9IF90aW1lck9ic2VydmFibGUuc3Vic2NyaWJlKHByb2Nlc3NOZXh0RXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IG5leHQgZXZlbnQgdG8gaGFuZGxlIG9mZiBvZiB0aGUgcXVldWUgYW5kIGRpc3BhdGNoIGl0XG4gICAqL1xuICBmdW5jdGlvbiBwcm9jZXNzTmV4dEV2ZW50KCkge1xuICAgIHZhciBldnQgPSBfcXVldWUuc2hpZnQoKTtcbiAgICBpZiAoZXZ0KSB7XG4gICAgICBkaXNwYXRjaFRvUmVjZWl2ZXJzKGV2dCk7XG4gICAgICBkaXNwYXRjaFRvU3Vic2NyaWJlcnMoZXZ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3RpbWVyUGF1c2FibGUub25OZXh0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaCBldmVudCB0byB0aGUgc3RhY2sgYW5kIGJlZ2luIGV4ZWN1dGlvblxuICAgKiBAcGFyYW0gcGF5bG9hZE9iaiB0eXBlOlN0cmluZywgcGF5bG9hZDpkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBmdW5jdGlvbiBwdWJsaXNoKHBheWxvYWRPYmopIHtcbiAgICBfbG9nLnB1c2gocGF5bG9hZE9iaik7XG4gICAgX3F1ZXVlLnB1c2gocGF5bG9hZE9iaik7XG5cbiAgICBpbml0VGltZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIHRoZSBwYXlsb2FkIHRvIGFsbCByZWNlaXZlcnNcbiAgICogQHBhcmFtIHBheWxvYWRcbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoVG9SZWNlaXZlcnMocGF5bG9hZCkge1xuICAgIGZvciAodmFyIGlkIGluIF9yZWNlaXZlck1hcCkge1xuICAgICAgX3JlY2VpdmVyTWFwW2lkXS5oYW5kbGVyKHBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVycyByZWNlaXZlIGFsbCBwYXlsb2FkcyBmb3IgYSBnaXZlbiBldmVudCB0eXBlIHdoaWxlIGhhbmRsZXJzIGFyZSB0YXJnZXRlZFxuICAgKiBAcGFyYW0gcGF5bG9hZFxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2hUb1N1YnNjcmliZXJzKHBheWxvYWQpIHtcbiAgICB2YXIgc3Vic2NyaWJlcnMgPSBfc3ViamVjdE1hcFtwYXlsb2FkLnR5cGVdLCBpO1xuICAgIGlmICghc3Vic2NyaWJlcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpID0gc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFyIHN1YmpPYmogPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgIGlmIChzdWJqT2JqLnR5cGUgPT09IDApIHtcbiAgICAgICAgc3Viak9iai5zdWJqZWN0Lm9uTmV4dChwYXlsb2FkKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdWJqT2JqLm9uY2UpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUocGF5bG9hZC50eXBlLCBzdWJqT2JqLmhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBoYW5kbGVyXG4gICAqIEBwYXJhbSBldnRTdHJcbiAgICogQHBhcmFtIGhhbmRlclxuICAgKi9cbiAgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZXZ0U3RyLCBoYW5kbGVyKSB7XG4gICAgaWYgKF9zdWJqZWN0TWFwW2V2dFN0cl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzdWJzY3JpYmVycyA9IF9zdWJqZWN0TWFwW2V2dFN0cl0sXG4gICAgICAgIGhhbmRsZXJJZHggID0gLTE7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3Vic2NyaWJlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzdWJzY3JpYmVyc1tpXS5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgIGhhbmRsZXJJZHggICAgID0gaTtcbiAgICAgICAgc3Vic2NyaWJlcnNbaV0uc3ViamVjdC5vbkNvbXBsZXRlZCgpO1xuICAgICAgICBzdWJzY3JpYmVyc1tpXS5zdWJqZWN0LmRpc3Bvc2UoKTtcbiAgICAgICAgc3Vic2NyaWJlcnNbaV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYW5kbGVySWR4ID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN1YnNjcmliZXJzLnNwbGljZShoYW5kbGVySWR4LCAxKTtcblxuICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGRlbGV0ZSBfc3ViamVjdE1hcFtldnRTdHJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBjb3B5IG9mIHRoZSBsb2cgYXJyYXlcbiAgICogQHJldHVybnMge0FycmF5LjxUPn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldExvZygpIHtcbiAgICByZXR1cm4gX2xvZy5zbGljZSgwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNpbXBsZSByZWNlaXZlciBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBGbHV4XG4gICAqIFJlZ2lzdGVyZWQgcmVjZWl2ZXJzIHdpbGwgZ2V0IGV2ZXJ5IHB1Ymxpc2hlZCBldmVudFxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmx1eC9ibG9iL21hc3Rlci9zcmMvRGlzcGF0Y2hlci5qc1xuICAgKlxuICAgKiBVc2FnZTpcbiAgICpcbiAgICogX2Rpc3BhdGNoZXIucmVnaXN0ZXJSZWNlaXZlcihmdW5jdGlvbiAocGF5bG9hZCkge1xuICAgICAgICogICAgY29uc29sZS5sb2coJ3JlY2VpdmluZywgJyxwYXlsb2FkKTtcbiAgICAgICAqIH0pO1xuICAgKlxuICAgKiBAcGFyYW0gaGFuZGxlclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVnaXN0ZXJSZWNlaXZlcihoYW5kbGVyKSB7XG4gICAgdmFyIGlkICAgICAgICAgICA9ICdJRF8nICsgX2lkKys7XG4gICAgX3JlY2VpdmVyTWFwW2lkXSA9IHtcbiAgICAgIGlkICAgICA6IGlkLFxuICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgIH07XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cblxuICAvKipcbiAgICogUmVtb3ZlIGEgcmVjZWl2ZXIgaGFuZGxlclxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJSZWNlaXZlcihpZCkge1xuICAgIGlmIChfcmVjZWl2ZXJNYXAuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICBkZWxldGUgX3JlY2VpdmVyTWFwW2lkXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN1YnNjcmliZSAgICAgICAgIDogc3Vic2NyaWJlLFxuICAgIHVuc3Vic2NyaWJlICAgICAgIDogdW5zdWJzY3JpYmUsXG4gICAgcHVibGlzaCAgICAgICAgICAgOiBwdWJsaXNoLFxuICAgIGdldExvZyAgICAgICAgICAgIDogZ2V0TG9nLFxuICAgIHJlZ2lzdGVyUmVjZWl2ZXIgIDogcmVnaXN0ZXJSZWNlaXZlcixcbiAgICB1bnJlZ2lzdGVyUmVjZWl2ZXI6IHVucmVnaXN0ZXJSZWNlaXZlclxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXIoKTsiLCIvKipcbiAqIEFkZCBSeEpTIFN1YmplY3QgdG8gYSBtb2R1bGUuXG4gKlxuICogQWRkIG9uZSBzaW1wbGUgb2JzZXJ2YWJsZSBzdWJqZWN0IG9yIG1vcmUgY29tcGxleCBhYmlsaXR5IHRvIGNyZWF0ZSBvdGhlcnMgZm9yXG4gKiBtb3JlIGNvbXBsZXggZXZlbnRpbmcgbmVlZHMuXG4gKi9cbnZhciBNaXhpbk9ic2VydmFibGVTdWJqZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfc3ViamVjdCAgICA9IG5ldyBSeC5TdWJqZWN0KCksXG4gICAgICBfc3ViamVjdE1hcCA9IHt9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgc3ViamVjdFxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZVN1YmplY3QobmFtZSkge1xuICAgIGlmICghX3N1YmplY3RNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIF9zdWJqZWN0TWFwW25hbWVdID0gbmV3IFJ4LlN1YmplY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIF9zdWJqZWN0TWFwW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSBoYW5kbGVyIHRvIHVwZGF0ZXMuIElmIHRoZSBoYW5kbGVyIGlzIGEgc3RyaW5nLCB0aGUgbmV3IHN1YmplY3RcbiAgICogd2lsbCBiZSBjcmVhdGVkLlxuICAgKiBAcGFyYW0gaGFuZGxlclxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShoYW5kbGVyT3JOYW1lLCBvcHRIYW5kbGVyKSB7XG4gICAgaWYgKGlzLnN0cmluZyhoYW5kbGVyT3JOYW1lKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZVN1YmplY3QoaGFuZGxlck9yTmFtZSkuc3Vic2NyaWJlKG9wdEhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gX3N1YmplY3Quc3Vic2NyaWJlKGhhbmRsZXJPck5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCB1cGRhdGVkIHRvIHN1YnNjcmliZXJzXG4gICAqIEBwYXJhbSBwYXlsb2FkXG4gICAqL1xuICBmdW5jdGlvbiBub3RpZnlTdWJzY3JpYmVycyhwYXlsb2FkKSB7XG4gICAgX3N1YmplY3Qub25OZXh0KHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIHVwZGF0ZWQgdG8gbmFtZWQgc3Vic2NyaWJlcnNcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIHBheWxvYWRcbiAgICovXG4gIGZ1bmN0aW9uIG5vdGlmeVN1YnNjcmliZXJzT2YobmFtZSwgcGF5bG9hZCkge1xuICAgIGlmIChfc3ViamVjdE1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgX3N1YmplY3RNYXBbbmFtZV0ub25OZXh0KHBheWxvYWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ01peGluT2JzZXJ2YWJsZVN1YmplY3QsIG5vIHN1YnNjcmliZXJzIG9mICcgKyBuYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN1YnNjcmliZSAgICAgICAgICA6IHN1YnNjcmliZSxcbiAgICBjcmVhdGVTdWJqZWN0ICAgICAgOiBjcmVhdGVTdWJqZWN0LFxuICAgIG5vdGlmeVN1YnNjcmliZXJzICA6IG5vdGlmeVN1YnNjcmliZXJzLFxuICAgIG5vdGlmeVN1YnNjcmliZXJzT2Y6IG5vdGlmeVN1YnNjcmliZXJzT2ZcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNaXhpbk9ic2VydmFibGVTdWJqZWN0OyIsIi8qKlxuICogVXRpbGl0eSB0byBoYW5kbGUgYWxsIHZpZXcgRE9NIGF0dGFjaG1lbnQgdGFza3NcbiAqL1xuXG52YXIgUmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfZG9tVXRpbHMgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvYnJvd3Nlci9ET01VdGlscy5qcycpO1xuXG4gIGZ1bmN0aW9uIHJlbmRlcihwYXlsb2FkKSB7XG4gICAgdmFyIHRhcmdldFNlbGVjdG9yID0gcGF5bG9hZC50YXJnZXQsXG4gICAgICAgIGh0bWwgICAgICAgICAgID0gcGF5bG9hZC5odG1sLFxuICAgICAgICBkb21FbCxcbiAgICAgICAgbW91bnRQb2ludCAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgY2IgICAgICAgICAgICAgPSBwYXlsb2FkLmNhbGxiYWNrO1xuXG4gICAgbW91bnRQb2ludC5pbm5lckhUTUwgPSAnJztcblxuICAgIGlmIChodG1sKSB7XG4gICAgICBkb21FbCA9IF9kb21VdGlscy5IVE1MU3RyVG9Ob2RlKGh0bWwpO1xuICAgICAgbW91bnRQb2ludC5hcHBlbmRDaGlsZChkb21FbCk7XG4gICAgfVxuXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYihkb21FbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbUVsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXI6IHJlbmRlclxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyKCk7IiwiLyoqXG4gKiBTaW1wbGUgcm91dGVyXG4gKiBTdXBwb3J0aW5nIElFOSBzbyB1c2luZyBoYXNoZXMgaW5zdGVhZCBvZiB0aGUgaGlzdG9yeSBBUEkgZm9yIG5vd1xuICovXG5cbnZhciBSb3V0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9zdWJqZWN0ICA9IG5ldyBSeC5TdWJqZWN0KCksXG4gICAgICBfaGFzaENoYW5nZU9ic2VydmFibGUsXG4gICAgICBfb2JqVXRpbHMgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvY29yZS9PYmplY3RVdGlscy5qcycpO1xuXG4gIC8qKlxuICAgKiBTZXQgZXZlbnQgaGFuZGxlcnNcbiAgICovXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgX2hhc2hDaGFuZ2VPYnNlcnZhYmxlID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQod2luZG93LCAnaGFzaGNoYW5nZScpLnN1YnNjcmliZShub3RpZnlTdWJzY3JpYmVycyk7XG4gIH1cblxuICAvKipcbiAgICogc3Vic2NyaWJlIGEgaGFuZGxlciB0byB0aGUgdXJsIGNoYW5nZSBldmVudHNcbiAgICogQHBhcmFtIGhhbmRsZXJcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUoaGFuZGxlcikge1xuICAgIHJldHVybiBfc3ViamVjdC5zdWJzY3JpYmUoaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogTm90aWZ5IG9mIGEgY2hhbmdlIGluIHJvdXRlXG4gICAqIEBwYXJhbSBmcm9tQXBwIFRydWUgaWYgdGhlIHJvdXRlIHdhcyBjYXVzZWQgYnkgYW4gYXBwIGV2ZW50IG5vdCBVUkwgb3IgaGlzdG9yeSBjaGFuZ2VcbiAgICovXG4gIGZ1bmN0aW9uIG5vdGlmeVN1YnNjcmliZXJzKCkge1xuICAgIHZhciBldmVudFBheWxvYWQgPSB7XG4gICAgICByb3V0ZU9iajogZ2V0Q3VycmVudFJvdXRlKCksIC8vIHsgcm91dGU6LCBkYXRhOiB9XG4gICAgICBmcmFnbWVudDogZ2V0VVJMRnJhZ21lbnQoKVxuICAgIH07XG5cbiAgICBfc3ViamVjdC5vbk5leHQoZXZlbnRQYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHJvdXRlIGFuZCBxdWVyeSBzdHJpbmcgZnJvbSB0aGUgY3VycmVudCBVUkwgZnJhZ21lbnRcbiAgICogQHJldHVybnMge3tyb3V0ZTogc3RyaW5nLCBxdWVyeToge319fVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFJvdXRlKCkge1xuICAgIHZhciBmcmFnbWVudCAgICA9IGdldFVSTEZyYWdtZW50KCksXG4gICAgICAgIHBhcnRzICAgICAgID0gZnJhZ21lbnQuc3BsaXQoJz8nKSxcbiAgICAgICAgcm91dGUgICAgICAgPSAnLycgKyBwYXJ0c1swXSxcbiAgICAgICAgcXVlcnlTdHIgICAgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0pLFxuICAgICAgICBxdWVyeVN0ck9iaiA9IHBhcnNlUXVlcnlTdHIocXVlcnlTdHIpO1xuXG4gICAgaWYgKHF1ZXJ5U3RyID09PSAnPXVuZGVmaW5lZCcpIHtcbiAgICAgIHF1ZXJ5U3RyT2JqID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyb3V0ZTogcm91dGUsIGRhdGE6IHF1ZXJ5U3RyT2JqfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgYSBxdWVyeSBzdHJpbmcgaW50byBrZXkvdmFsdWUgcGFpcnNcbiAgICogQHBhcmFtIHF1ZXJ5U3RyXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHIocXVlcnlTdHIpIHtcbiAgICB2YXIgb2JqICAgPSB7fSxcbiAgICAgICAgcGFydHMgPSBxdWVyeVN0ci5zcGxpdCgnJicpO1xuXG4gICAgcGFydHMuZm9yRWFjaChmdW5jdGlvbiAocGFpclN0cikge1xuICAgICAgdmFyIHBhaXJBcnIgICAgID0gcGFpclN0ci5zcGxpdCgnPScpO1xuICAgICAgb2JqW3BhaXJBcnJbMF1dID0gcGFpckFyclsxXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgYSByb3V0ZSBhbmQgZGF0YSBvYmplY3QgaW50byBhIHByb3BlciBVUkwgaGFzaCBmcmFnbWVudFxuICAgKiBAcGFyYW0gcm91dGVcbiAgICogQHBhcmFtIGRhdGFPYmpcbiAgICovXG4gIGZ1bmN0aW9uIHNldChyb3V0ZSwgZGF0YU9iaikge1xuICAgIHZhciBwYXRoID0gcm91dGUsXG4gICAgICAgIGRhdGEgPSBbXTtcbiAgICBpZiAoIV9vYmpVdGlscy5pc051bGwoZGF0YU9iaikpIHtcbiAgICAgIHBhdGggKz0gXCI/XCI7XG4gICAgICBmb3IgKHZhciBwcm9wIGluIGRhdGFPYmopIHtcbiAgICAgICAgaWYgKHByb3AgIT09ICd1bmRlZmluZWQnICYmIGRhdGFPYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICBkYXRhLnB1c2gocHJvcCArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhT2JqW3Byb3BdKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBhdGggKz0gZGF0YS5qb2luKCcmJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlVVJMRnJhZ21lbnQocGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBldmVyeXRoaW5nIGFmdGVyIHRoZSAnd2hhdGV2ZXIuaHRtbCMnIGluIHRoZSBVUkxcbiAgICogTGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyBhcmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VVJMRnJhZ21lbnQoKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gbG9jYXRpb24uaGFzaC5zbGljZSgxKTtcbiAgICByZXR1cm4gZnJhZ21lbnQudG9TdHJpbmcoKS5yZXBsYWNlKC9cXC8kLywgJycpLnJlcGxhY2UoL15cXC8vLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBVUkwgaGFzaCBmcmFnbWVudFxuICAgKiBAcGFyYW0gcGF0aFxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlVVJMRnJhZ21lbnQocGF0aCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZSAgICAgICA6IGluaXRpYWxpemUsXG4gICAgc3Vic2NyaWJlICAgICAgICA6IHN1YnNjcmliZSxcbiAgICBub3RpZnlTdWJzY3JpYmVyczogbm90aWZ5U3Vic2NyaWJlcnMsXG4gICAgZ2V0Q3VycmVudFJvdXRlICA6IGdldEN1cnJlbnRSb3V0ZSxcbiAgICBzZXQgICAgICAgICAgICAgIDogc2V0XG4gIH07XG5cbn07XG5cbnZhciByID0gUm91dGVyKCk7XG5yLmluaXRpYWxpemUoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByOyIsIi8qKlxuICogUnhKUyBIZWxwZXJzXG4gKiBAdHlwZSB7e2RvbTogRnVuY3Rpb24sIGZyb206IEZ1bmN0aW9uLCBpbnRlcnZhbDogRnVuY3Rpb24sIGRvRXZlcnk6IEZ1bmN0aW9uLCBqdXN0OiBGdW5jdGlvbiwgZW1wdHk6IEZ1bmN0aW9ufX1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZG9tOiBmdW5jdGlvbiAoc2VsZWN0b3IsIGV2ZW50KSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgaWYgKCFlbCkge1xuICAgICAgY29uc29sZS53YXJuKCdub3JpL3V0aWxzL1J4LCBkb20sIGludmFsaWQgRE9NIHNlbGVjdG9yOiAnICsgc2VsZWN0b3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZWwsIGV2ZW50LnRyaW0oKSk7XG4gIH0sXG5cbiAgZnJvbTogZnVuY3Rpb24gKGl0dHIpIHtcbiAgICByZXR1cm4gUnguT2JzZXJ2YWJsZS5mcm9tKGl0dHIpO1xuICB9LFxuXG4gIGludGVydmFsOiBmdW5jdGlvbiAobXMpIHtcbiAgICByZXR1cm4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbChtcyk7XG4gIH0sXG5cbiAgZG9FdmVyeTogZnVuY3Rpb24gKG1zLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWwobXMpLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgfSxcblxuICBqdXN0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gUnguT2JzZXJ2YWJsZS5qdXN0KHZhbHVlKTtcbiAgfSxcblxuICBlbXB0eTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBSeC5PYnNlcnZhYmxlLmVtcHR5KCk7XG4gIH1cblxufTsiLCIvKlxuIFNpbXBsZSB3cmFwcGVyIGZvciBVbmRlcnNjb3JlIC8gSFRNTCB0ZW1wbGF0ZXNcbiBNYXR0IFBlcmtpbnNcbiA0LzcvMTVcbiAqL1xudmFyIFRlbXBsYXRpbmcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF90ZW1wbGF0ZU1hcCAgICAgICA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBfdGVtcGxhdGVIVE1MQ2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgX3RlbXBsYXRlQ2FjaGUgICAgID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIF9ET01VdGlscyAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL251ZG9ydS9icm93c2VyL0RPTVV0aWxzLmpzJyk7XG5cbiAgZnVuY3Rpb24gYWRkVGVtcGxhdGUoaWQsIGh0bWwpIHtcbiAgICBfdGVtcGxhdGVNYXBbaWRdID0gaHRtbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNvdXJjZUZyb21UZW1wbGF0ZU1hcChpZCkge1xuICAgIHZhciBzb3VyY2UgPSBfdGVtcGxhdGVNYXBbaWRdO1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBjbGVhblRlbXBsYXRlSFRNTChzb3VyY2UpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTb3VyY2VGcm9tSFRNTChpZCkge1xuICAgIHZhciBzcmMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksXG4gICAgICAgIHNyY2h0bWw7XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICBzcmNodG1sID0gc3JjLmlubmVySFRNTDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdudWRvcnUvY29yZS9UZW1wbGF0aW5nLCB0ZW1wbGF0ZSBub3QgZm91bmQ6IFwiJyArIGlkICsgJ1wiJyk7XG4gICAgICBzcmNodG1sID0gJzxkaXY+VGVtcGxhdGUgbm90IGZvdW5kOiAnICsgaWQgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICByZXR1cm4gY2xlYW5UZW1wbGF0ZUhUTUwoc3JjaHRtbCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0ZW1wbGF0ZSBodG1sIGZyb20gdGhlIHNjcmlwdCB0YWcgd2l0aCBpZFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRTb3VyY2UoaWQpIHtcbiAgICBpZiAoX3RlbXBsYXRlSFRNTENhY2hlW2lkXSkge1xuICAgICAgcmV0dXJuIF90ZW1wbGF0ZUhUTUxDYWNoZVtpZF07XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZWh0bWwgPSBnZXRTb3VyY2VGcm9tVGVtcGxhdGVNYXAoaWQpO1xuXG4gICAgaWYgKCFzb3VyY2VodG1sKSB7XG4gICAgICBzb3VyY2VodG1sID0gZ2V0U291cmNlRnJvbUhUTUwoaWQpO1xuICAgIH1cblxuICAgIF90ZW1wbGF0ZUhUTUxDYWNoZVtpZF0gPSBzb3VyY2VodG1sO1xuICAgIHJldHVybiBzb3VyY2VodG1sO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIElEcyBiZWxvbmdpbmcgdG8gdGV4dC90ZW1wbGF0ZSB0eXBlIHNjcmlwdCB0YWdzXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEFsbFRlbXBsYXRlSURzKCkge1xuICAgIHZhciBzY3JpcHRUYWdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLCAwKTtcblxuICAgIHJldHVybiBzY3JpcHRUYWdzLmZpbHRlcihmdW5jdGlvbiAodGFnKSB7XG4gICAgICByZXR1cm4gdGFnLmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAndGV4dC90ZW1wbGF0ZSc7XG4gICAgfSkubWFwKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIHJldHVybiB0YWcuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gdW5kZXJzY29yZSB0ZW1wbGF0ZVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRUZW1wbGF0ZShpZCkge1xuICAgIGlmIChfdGVtcGxhdGVDYWNoZVtpZF0pIHtcbiAgICAgIHJldHVybiBfdGVtcGxhdGVDYWNoZVtpZF07XG4gICAgfVxuICAgIHZhciB0ZW1wbCAgICAgICAgICA9IF8udGVtcGxhdGUoZ2V0U291cmNlKGlkKSk7XG4gICAgX3RlbXBsYXRlQ2FjaGVbaWRdID0gdGVtcGw7XG4gICAgcmV0dXJuIHRlbXBsO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyB0aGUgdGVtcGxhdGUgYW5kIHJldHVybnMgSFRNTFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGFzSFRNTChpZCwgb2JqKSB7XG4gICAgdmFyIHRlbXAgPSBnZXRUZW1wbGF0ZShpZCk7XG4gICAgcmV0dXJuIHRlbXAob2JqKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgdGhlIHRlbXBsYXRlIGFuZCByZXR1cm5zIGFuIEhUTUwgRWxlbWVudFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGFzRWxlbWVudChpZCwgb2JqKSB7XG4gICAgcmV0dXJuIF9ET01VdGlscy5IVE1MU3RyVG9Ob2RlKGFzSFRNTChpZCwgb2JqKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW5zIHRlbXBsYXRlIEhUTUxcbiAgICovXG4gIGZ1bmN0aW9uIGNsZWFuVGVtcGxhdGVIVE1MKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSByZXR1cm5zLCBzcGFjZXMgYW5kIHRhYnNcbiAgICogQHBhcmFtIHN0clxuICAgKiBAcmV0dXJucyB7WE1MfHN0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZVdoaXRlU3BhY2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFxyXFxufFxcbnxcXHJ8XFx0KS9nbSwgJycpLnJlcGxhY2UoLz5cXHMrPC9nLCAnPjwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRlbXBsYXRlcywgY2xlYW4gdGhlbSB1cCBhbmQgbG9nXG4gICAqIFV0aWwgZm9yIFNoYXJlUG9pbnQgcHJvamVjdHMsIDxzY3JpcHQ+IGJsb2NrcyBhcmVuJ3QgYWxsb3dlZFxuICAgKiBTbyB0aGlzIGhlbHBzIGNyZWF0ZSB0aGUgYmxvY2tzIGZvciBpbnNlcnRpb24gaW4gdG8gdGhlIERPTVxuICAgKi9cbiAgZnVuY3Rpb24gcHJvY2Vzc0ZvckRPTUluc2VydGlvbigpIHtcbiAgICB2YXIgaWRzID0gZ2V0QWxsVGVtcGxhdGVJRHMoKTtcbiAgICBpZHMuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHZhciBzcmMgPSByZW1vdmVXaGl0ZVNwYWNlKGdldFNvdXJjZShpZCkpO1xuICAgICAgY29uc29sZS5sb2coaWQsIHNyYyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgdGVtcGxhdGUgc2NyaXB0IHRhZyB0byB0aGUgRE9NXG4gICAqIFV0aWwgZm9yIFNoYXJlUG9pbnQgcHJvamVjdHMsIDxzY3JpcHQ+IGJsb2NrcyBhcmVuJ3QgYWxsb3dlZFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGh0bWxcbiAgICovXG4gIC8vZnVuY3Rpb24gYWRkQ2xpZW50U2lkZVRlbXBsYXRlVG9ET00oaWQsIGh0bWwpIHtcbiAgLy8gIHZhciBzICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIC8vICBzLnR5cGUgICAgICA9ICd0ZXh0L3RlbXBsYXRlJztcbiAgLy8gIHMuaWQgICAgICAgID0gaWQ7XG4gIC8vICBzLmlubmVySFRNTCA9IGh0bWw7XG4gIC8vICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICAvL31cblxuICByZXR1cm4ge1xuICAgIGFkZFRlbXBsYXRlICAgICAgICAgICA6IGFkZFRlbXBsYXRlLFxuICAgIGdldFNvdXJjZSAgICAgICAgICAgICA6IGdldFNvdXJjZSxcbiAgICBnZXRBbGxUZW1wbGF0ZUlEcyAgICAgOiBnZXRBbGxUZW1wbGF0ZUlEcyxcbiAgICBwcm9jZXNzRm9yRE9NSW5zZXJ0aW9uOiBwcm9jZXNzRm9yRE9NSW5zZXJ0aW9uLFxuICAgIGdldFRlbXBsYXRlICAgICAgICAgICA6IGdldFRlbXBsYXRlLFxuICAgIGFzSFRNTCAgICAgICAgICAgICAgICA6IGFzSFRNTCxcbiAgICBhc0VsZW1lbnQgICAgICAgICAgICAgOiBhc0VsZW1lbnRcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0aW5nKCk7IiwidmFyIEFwcGxpY2F0aW9uVmlldyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX3RoaXMsXG4gICAgICBfZG9tVXRpbHMgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvYnJvd3Nlci9ET01VdGlscy5qcycpO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgSW5pdGlhbGl6YXRpb25cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVcbiAgICogQHBhcmFtIHNjYWZmb2xkVGVtcGxhdGVzIHRlbXBsYXRlIElEcyB0byBhdHRhY2hlZCB0byB0aGUgYm9keSBmb3IgdGhlIGFwcFxuICAgKi9cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZUFwcGxpY2F0aW9uVmlldyhzY2FmZm9sZFRlbXBsYXRlcykge1xuICAgIF90aGlzID0gdGhpcztcblxuICAgIGF0dGFjaEFwcGxpY2F0aW9uU2NhZmZvbGRpbmcoc2NhZmZvbGRUZW1wbGF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhcHAgSFRNTCBzdHJ1Y3R1cmVcbiAgICogQHBhcmFtIHRlbXBsYXRlc1xuICAgKi9cbiAgZnVuY3Rpb24gYXR0YWNoQXBwbGljYXRpb25TY2FmZm9sZGluZyh0ZW1wbGF0ZXMpIHtcbiAgICBpZiAoIXRlbXBsYXRlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBib2R5RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICB0ZW1wbGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAodGVtcGwpIHtcbiAgICAgIGJvZHlFbC5hcHBlbmRDaGlsZChfZG9tVXRpbHMuSFRNTFN0clRvTm9kZShfdGhpcy50ZW1wbGF0ZSgpLmdldFNvdXJjZSgndGVtcGxhdGVfXycgKyB0ZW1wbCwge30pKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgYXBwIGluaXRpYWxpemF0aW9uLCByZW1vdmUgdGhlIGxvYWRpbmcgbWVzc2FnZVxuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGluZ01lc3NhZ2UoKSB7XG4gICAgdmFyIGNvdmVyICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5pdGlhbGl6YXRpb25fX2NvdmVyJyksXG4gICAgICAgIG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5pdGlhbGl6YXRpb25fX21lc3NhZ2UnKTtcblxuICAgIFR3ZWVuTGl0ZS50byhjb3ZlciwgMSwge1xuICAgICAgYWxwaGE6IDAsIGVhc2U6IFF1YWQuZWFzZU91dCwgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb3Zlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvdmVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byhtZXNzYWdlLCAyLCB7XG4gICAgICB0b3A6IFwiKz01MHB4XCIsIGVhc2U6IFF1YWQuZWFzZUluLCBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvdmVyLnJlbW92ZUNoaWxkKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vICBBUElcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplQXBwbGljYXRpb25WaWV3OiBpbml0aWFsaXplQXBwbGljYXRpb25WaWV3LFxuICAgIHJlbW92ZUxvYWRpbmdNZXNzYWdlICAgICA6IHJlbW92ZUxvYWRpbmdNZXNzYWdlXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb25WaWV3KCk7IiwiLyoqXG4gKiBNaXhpbiB2aWV3IHRoYXQgYWxsb3dzIGZvciBjb21wb25lbnQgdmlld3NcbiAqL1xuXG52YXIgTWl4aW5Db21wb25lbnRWaWV3cyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2NvbXBvbmVudFZpZXdNYXAgICAgICAgICAgICA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBfY29tcG9uZW50SFRNTFRlbXBsYXRlUHJlZml4ID0gJ3RlbXBsYXRlX18nLFxuICAgICAgX3RlbXBsYXRlICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL1RlbXBsYXRpbmcuanMnKTtcblxuICAvKipcbiAgICogUmV0dXJuIHRoZSB0ZW1wbGF0ZSBvYmplY3RcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gX3RlbXBsYXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBhIGNvbXBvbmVudCB0byBhIG1vdW50aW5nIHBvaW50LiBJZiBhIHN0cmluZyBpcyBwYXNzZWQsXG4gICAqIHRoZSBjb3JyZWN0IG9iamVjdCB3aWxsIGJlIGNyZWF0ZWQgZnJvbSB0aGUgZmFjdG9yeSBtZXRob2QsIG90aGVyd2lzZSxcbiAgICogdGhlIHBhc3NlZCBjb21wb25lbnQgb2JqZWN0IGlzIHVzZWQuXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRJRFxuICAgKiBAcGFyYW0gY29tcG9uZW50SURvck9ialxuICAgKiBAcGFyYW0gbW91bnRQb2ludFxuICAgKi9cbiAgZnVuY3Rpb24gbWFwVmlld0NvbXBvbmVudChjb21wb25lbnRJRCwgY29tcG9uZW50SURvck9iaiwgbW91bnRQb2ludCkge1xuICAgIHZhciBjb21wb25lbnRPYmo7XG5cbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudElEb3JPYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgY29tcG9uZW50RmFjdG9yeSA9IHJlcXVpcmUoY29tcG9uZW50SURvck9iaik7XG4gICAgICBjb21wb25lbnRPYmogICAgICAgICA9IGNyZWF0ZUNvbXBvbmVudFZpZXcoY29tcG9uZW50RmFjdG9yeSgpKSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnRPYmogPSBjb21wb25lbnRJRG9yT2JqO1xuICAgIH1cblxuICAgIF9jb21wb25lbnRWaWV3TWFwW2NvbXBvbmVudElEXSA9IHtcbiAgICAgIGh0bWxUZW1wbGF0ZTogX3RlbXBsYXRlLmdldFRlbXBsYXRlKF9jb21wb25lbnRIVE1MVGVtcGxhdGVQcmVmaXggKyBjb21wb25lbnRJRCksXG4gICAgICBjb250cm9sbGVyICA6IGNvbXBvbmVudE9iaixcbiAgICAgIG1vdW50UG9pbnQgIDogbW91bnRQb2ludFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRmFjdG9yeSB0byBjcmVhdGUgY29tcG9uZW50IHZpZXcgbW9kdWxlcyBieSBjb25jYXRpbmcgbXVsdGlwbGUgc291cmNlIG9iamVjdHNcbiAgICogQHBhcmFtIGNvbXBvbmVudFNvdXJjZSBDdXN0b20gbW9kdWxlIHNvdXJjZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudFZpZXcoY29tcG9uZW50U291cmNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb21wb25lbnRWaWV3RmFjdG9yeSAgPSByZXF1aXJlKCcuL1ZpZXdDb21wb25lbnQuanMnKSxcbiAgICAgICAgICBldmVudERlbGVnYXRvckZhY3RvcnkgPSByZXF1aXJlKCcuL01peGluRXZlbnREZWxlZ2F0b3IuanMnKSxcbiAgICAgICAgICBvYnNlcnZhYmxlRmFjdG9yeSAgICAgPSByZXF1aXJlKCcuLi91dGlscy9NaXhpbk9ic2VydmFibGVTdWJqZWN0LmpzJyksXG4gICAgICAgICAgc2ltcGxlU3RvcmVGYWN0b3J5ICAgID0gcmVxdWlyZSgnLi4vc3RvcmUvU2ltcGxlU3RvcmUuanMnKSxcbiAgICAgICAgICBjb21wb25lbnRBc3NlbWJseSwgZmluYWxDb21wb25lbnQsIHByZXZpb3VzSW5pdGlhbGl6ZTtcblxuICAgICAgY29tcG9uZW50QXNzZW1ibHkgPSBbXG4gICAgICAgIGNvbXBvbmVudFZpZXdGYWN0b3J5KCksXG4gICAgICAgIGV2ZW50RGVsZWdhdG9yRmFjdG9yeSgpLFxuICAgICAgICBvYnNlcnZhYmxlRmFjdG9yeSgpLFxuICAgICAgICBzaW1wbGVTdG9yZUZhY3RvcnkoKSxcbiAgICAgICAgY29tcG9uZW50U291cmNlXG4gICAgICBdO1xuXG4gICAgICBpZiAoY29tcG9uZW50U291cmNlLm1peGlucykge1xuICAgICAgICBjb21wb25lbnRBc3NlbWJseSA9IGNvbXBvbmVudEFzc2VtYmx5LmNvbmNhdChjb21wb25lbnRTb3VyY2UubWl4aW5zKTtcbiAgICAgIH1cblxuICAgICAgZmluYWxDb21wb25lbnQgPSBOb3JpLmFzc2lnbkFycmF5KHt9LCBjb21wb25lbnRBc3NlbWJseSk7XG5cbiAgICAgIC8vIENvbXBvc2UgYSBuZXcgaW5pdGlhbGl6ZSBmdW5jdGlvbiBieSBpbnNlcnRpbmcgY2FsbCB0byBjb21wb25lbnQgc3VwZXIgbW9kdWxlXG4gICAgICBwcmV2aW91c0luaXRpYWxpemUgICAgICAgID0gZmluYWxDb21wb25lbnQuaW5pdGlhbGl6ZTtcbiAgICAgIGZpbmFsQ29tcG9uZW50LmluaXRpYWxpemUgPSBmdW5jdGlvbiBpbml0aWFsaXplKGluaXRPYmopIHtcbiAgICAgICAgZmluYWxDb21wb25lbnQuaW5pdGlhbGl6ZUNvbXBvbmVudChpbml0T2JqKTtcbiAgICAgICAgcHJldmlvdXNJbml0aWFsaXplLmNhbGwoZmluYWxDb21wb25lbnQsIGluaXRPYmopO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIF8uYXNzaWduKHt9LCBmaW5hbENvbXBvbmVudCk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IGEgbWFwcGVkIGNvbXBvbmVudFZpZXdcbiAgICogQHBhcmFtIGNvbXBvbmVudElEXG4gICAqIEBwYXJhbSBkYXRhT2JqXG4gICAqL1xuICBmdW5jdGlvbiBzaG93Vmlld0NvbXBvbmVudChjb21wb25lbnRJRCwgbW91bnRQb2ludCkge1xuICAgIHZhciBjb21wb25lbnRWaWV3ID0gX2NvbXBvbmVudFZpZXdNYXBbY29tcG9uZW50SURdO1xuICAgIGlmICghY29tcG9uZW50Vmlldykge1xuICAgICAgY29uc29sZS53YXJuKCdObyBjb21wb25lbnRWaWV3IG1hcHBlZCBmb3IgaWQ6ICcgKyBjb21wb25lbnRJRCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjb21wb25lbnRWaWV3LmNvbnRyb2xsZXIuaXNJbml0aWFsaXplZCgpKSB7XG4gICAgICBtb3VudFBvaW50ID0gbW91bnRQb2ludCB8fCBjb21wb25lbnRWaWV3Lm1vdW50UG9pbnQ7XG4gICAgICBjb21wb25lbnRWaWV3LmNvbnRyb2xsZXIuaW5pdGlhbGl6ZSh7XG4gICAgICAgIGlkICAgICAgICA6IGNvbXBvbmVudElELFxuICAgICAgICB0ZW1wbGF0ZSAgOiBjb21wb25lbnRWaWV3Lmh0bWxUZW1wbGF0ZSxcbiAgICAgICAgbW91bnRQb2ludDogbW91bnRQb2ludFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudFZpZXcuY29udHJvbGxlci51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRWaWV3LmNvbnRyb2xsZXIuY29tcG9uZW50UmVuZGVyKCk7XG4gICAgY29tcG9uZW50Vmlldy5jb250cm9sbGVyLm1vdW50KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIG1hcCBvYmplY3QgZm9yIGNvbXBvbmVudCB2aWV3c1xuICAgKiBAcmV0dXJucyB7bnVsbH1cbiAgICovXG4gIGZ1bmN0aW9uIGdldENvbXBvbmVudFZpZXdNYXAoKSB7XG4gICAgcmV0dXJuIF8uYXNzaWduKHt9LCBfY29tcG9uZW50Vmlld01hcCk7XG4gIH1cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gIEFQSVxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICByZXR1cm4ge1xuICAgIHRlbXBsYXRlICAgICAgICAgICA6IGdldFRlbXBsYXRlLFxuICAgIG1hcFZpZXdDb21wb25lbnQgICA6IG1hcFZpZXdDb21wb25lbnQsXG4gICAgY3JlYXRlQ29tcG9uZW50VmlldzogY3JlYXRlQ29tcG9uZW50VmlldyxcbiAgICBzaG93Vmlld0NvbXBvbmVudCAgOiBzaG93Vmlld0NvbXBvbmVudCxcbiAgICBnZXRDb21wb25lbnRWaWV3TWFwOiBnZXRDb21wb25lbnRWaWV3TWFwXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWl4aW5Db21wb25lbnRWaWV3cygpOyIsIi8qKlxuICogQ29udmVuaWVuY2UgbWl4aW4gdGhhdCBtYWtlcyBldmVudHMgZWFzaWVyIGZvciB2aWV3c1xuICpcbiAqIEJhc2VkIG9uIEJhY2tib25lXG4gKiBSZXZpZXcgdGhpcyBodHRwOi8vYmxvZy5tYXJpb25ldHRlanMuY29tLzIwMTUvMDIvMTIvdW5kZXJzdGFuZGluZy10aGUtZXZlbnQtaGFzaC9pbmRleC5odG1sXG4gKlxuICogRXhhbXBsZTpcbiAqIHRoaXMuc2V0RXZlbnRzKHtcbiAqICAgICAgICAnY2xpY2sgI2J0bl9tYWluX3Byb2plY3RzJzogaGFuZGxlUHJvamVjdHNCdXR0b24sXG4gKiAgICAgICAgJ2NsaWNrICNidG5fZm9vLCBjbGljayAjYnRuX2Jhcic6IGhhbmRsZUZvb0JhckJ1dHRvbnNcbiAqICAgICAgfSk7XG4gKiB0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG4gKlxuICovXG5cbnZhciBNaXhpbkV2ZW50RGVsZWdhdG9yID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfZXZlbnRzTWFwLFxuICAgICAgX2V2ZW50U3Vic2NyaWJlcnMsXG4gICAgICBfcnggPSByZXF1aXJlKCcuLi91dGlscy9SeCcpO1xuXG4gIGZ1bmN0aW9uIHNldEV2ZW50cyhldnRPYmopIHtcbiAgICBfZXZlbnRzTWFwID0gZXZ0T2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXZlbnRzKCkge1xuICAgIHJldHVybiBfZXZlbnRzTWFwO1xuICB9XG5cbiAgLyoqXG4gICAqIEF1dG9tYXRlcyBzZXR0aW5nIGV2ZW50cyBvbiBET00gZWxlbWVudHMuXG4gICAqICdldnRTdHIgc2VsZWN0b3InOmNhbGxiYWNrXG4gICAqICdldnRTdHIgc2VsZWN0b3IsIGV2dFN0ciBzZWxlY3Rvcic6IHNoYXJlZENhbGxiYWNrXG4gICAqL1xuICBmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50cygpIHtcbiAgICBpZiAoIV9ldmVudHNNYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBfZXZlbnRTdWJzY3JpYmVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKHZhciBldnRTdHJpbmdzIGluIF9ldmVudHNNYXApIHtcbiAgICAgIGlmIChfZXZlbnRzTWFwLmhhc093blByb3BlcnR5KGV2dFN0cmluZ3MpKSB7XG5cbiAgICAgICAgdmFyIG1hcHBpbmdzICAgICA9IGV2dFN0cmluZ3Muc3BsaXQoJywnKSxcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IF9ldmVudHNNYXBbZXZ0U3RyaW5nc107XG5cbiAgICAgICAgaWYgKCFpcy5mdW5jdGlvbihldmVudEhhbmRsZXIpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFdmVudERlbGVnYXRvciwgaGFuZGxlciBmb3IgJyArIGV2dFN0cmluZ3MgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoganNoaW50IC1XMDgzICovXG4gICAgICAgIC8vIGh0dHBzOi8vanNsaW50ZXJyb3JzLmNvbS9kb250LW1ha2UtZnVuY3Rpb25zLXdpdGhpbi1hLWxvb3BcbiAgICAgICAgbWFwcGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoZXZ0TWFwKSB7XG4gICAgICAgICAgZXZ0TWFwICAgICAgICAgICAgICAgICAgICAgICAgPSBldnRNYXAudHJpbSgpO1xuICAgICAgICAgIHZhciBldmVudFN0ciAgICAgICAgICAgICAgICAgID0gZXZ0TWFwLnNwbGl0KCcgJylbMF0udHJpbSgpLFxuICAgICAgICAgICAgICBzZWxlY3RvciAgICAgICAgICAgICAgICAgID0gZXZ0TWFwLnNwbGl0KCcgJylbMV0udHJpbSgpO1xuICAgICAgICAgIF9ldmVudFN1YnNjcmliZXJzW2V2dFN0cmluZ3NdID0gY3JlYXRlSGFuZGxlcihzZWxlY3RvciwgZXZlbnRTdHIsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICAvKiBqc2hpbnQgK1cwODMgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVIYW5kbGVyKHNlbGVjdG9yLCBldmVudFN0ciwgZXZlbnRIYW5kbGVyKSB7XG4gICAgcmV0dXJuIF9yeC5kb20oc2VsZWN0b3IsIGV2ZW50U3RyKS5zdWJzY3JpYmUoZXZlbnRIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbmx5IHJlbW92ZSBldmVudHNcbiAgICovXG4gIGZ1bmN0aW9uIHVuZGVsZWdhdGVFdmVudHMoKSB7XG4gICAgaWYgKCFfZXZlbnRzTWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgZXZlbnQgaW4gX2V2ZW50U3Vic2NyaWJlcnMpIHtcbiAgICAgIF9ldmVudFN1YnNjcmliZXJzW2V2ZW50XS5kaXNwb3NlKCk7XG4gICAgICBkZWxldGUgX2V2ZW50U3Vic2NyaWJlcnNbZXZlbnRdO1xuICAgIH1cblxuICAgIF9ldmVudFN1YnNjcmliZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0RXZlbnRzICAgICAgIDogc2V0RXZlbnRzLFxuICAgIGdldEV2ZW50cyAgICAgICA6IGdldEV2ZW50cyxcbiAgICB1bmRlbGVnYXRlRXZlbnRzOiB1bmRlbGVnYXRlRXZlbnRzLFxuICAgIGRlbGVnYXRlRXZlbnRzICA6IGRlbGVnYXRlRXZlbnRzXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWl4aW5FdmVudERlbGVnYXRvcjsiLCJ2YXIgTWl4aW5OdWRvcnVDb250cm9scyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX25vdGlmaWNhdGlvblZpZXcgID0gcmVxdWlyZSgnLi4vLi4vbnVkb3J1L2NvbXBvbmVudHMvVG9hc3RWaWV3LmpzJyksXG4gICAgICBfdG9vbFRpcFZpZXcgICAgICAgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvY29tcG9uZW50cy9Ub29sVGlwVmlldy5qcycpLFxuICAgICAgX21lc3NhZ2VCb3hWaWV3ICAgID0gcmVxdWlyZSgnLi4vLi4vbnVkb3J1L2NvbXBvbmVudHMvTWVzc2FnZUJveFZpZXcuanMnKSxcbiAgICAgIF9tZXNzYWdlQm94Q3JlYXRvciA9IHJlcXVpcmUoJy4uLy4uL251ZG9ydS9jb21wb25lbnRzL01lc3NhZ2VCb3hDcmVhdG9yLmpzJyksXG4gICAgICBfbW9kYWxDb3ZlclZpZXcgICAgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvY29tcG9uZW50cy9Nb2RhbENvdmVyVmlldy5qcycpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemVOdWRvcnVDb250cm9scygpIHtcbiAgICBfdG9vbFRpcFZpZXcuaW5pdGlhbGl6ZSgndG9vbHRpcF9fY29udGFpbmVyJyk7XG4gICAgX25vdGlmaWNhdGlvblZpZXcuaW5pdGlhbGl6ZSgndG9hc3RfX2NvbnRhaW5lcicpO1xuICAgIF9tZXNzYWdlQm94Vmlldy5pbml0aWFsaXplKCdtZXNzYWdlYm94X19jb250YWluZXInKTtcbiAgICBfbW9kYWxDb3ZlclZpZXcuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWJDcmVhdG9yKCkge1xuICAgIHJldHVybiBfbWVzc2FnZUJveENyZWF0b3I7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRNZXNzYWdlQm94KG9iaikge1xuICAgIHJldHVybiBfbWVzc2FnZUJveFZpZXcuYWRkKG9iaik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVNZXNzYWdlQm94KGlkKSB7XG4gICAgX21lc3NhZ2VCb3hWaWV3LnJlbW92ZShpZCk7XG4gIH1cblxuICBmdW5jdGlvbiBhbGVydChtZXNzYWdlLCB0aXRsZSkge1xuICAgIHJldHVybiBtYkNyZWF0b3IoKS5hbGVydCh0aXRsZSB8fCAnQWxlcnQnLCBtZXNzYWdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE5vdGlmaWNhdGlvbihvYmopIHtcbiAgICByZXR1cm4gX25vdGlmaWNhdGlvblZpZXcuYWRkKG9iaik7XG4gIH1cblxuICBmdW5jdGlvbiBub3RpZnkobWVzc2FnZSwgdGl0bGUsIHR5cGUpIHtcbiAgICByZXR1cm4gYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHRpdGxlICA6IHRpdGxlIHx8ICcnLFxuICAgICAgdHlwZSAgIDogdHlwZSB8fCBfbm90aWZpY2F0aW9uVmlldy50eXBlKCkuREVGQVVMVCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZU51ZG9ydUNvbnRyb2xzOiBpbml0aWFsaXplTnVkb3J1Q29udHJvbHMsXG4gICAgbWJDcmVhdG9yICAgICAgICAgICAgICAgOiBtYkNyZWF0b3IsXG4gICAgYWRkTWVzc2FnZUJveCAgICAgICAgICAgOiBhZGRNZXNzYWdlQm94LFxuICAgIHJlbW92ZU1lc3NhZ2VCb3ggICAgICAgIDogcmVtb3ZlTWVzc2FnZUJveCxcbiAgICBhZGROb3RpZmljYXRpb24gICAgICAgICA6IGFkZE5vdGlmaWNhdGlvbixcbiAgICBhbGVydCAgICAgICAgICAgICAgICAgICA6IGFsZXJ0LFxuICAgIG5vdGlmeSAgICAgICAgICAgICAgICAgIDogbm90aWZ5XG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWl4aW5OdWRvcnVDb250cm9scygpOyIsIi8qKlxuICogTWl4aW4gdmlldyB0aGF0IGFsbG93cyBmb3IgY29tcG9uZW50IHZpZXdzIHRvIGJlIGRpc3BsYXkgb24gcm91dGluZyBjaGFuZ2VzXG4gKi9cblxudmFyIE1peGluUm91dGVWaWV3cyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX3RoaXMsXG4gICAgICBfY3VycmVudFJvdXRlVmlld0lELFxuICAgICAgX3JvdXRlVmlld01vdW50UG9pbnQsXG4gICAgICBfcm91dGVWaWV3SURNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8qKlxuICAgKiBTZXQgdXAgbGlzdGVuZXJzXG4gICAqL1xuICBmdW5jdGlvbiBpbml0aWFsaXplUm91dGVWaWV3cygpIHtcbiAgICBfdGhpcyA9IHRoaXM7IC8vIG1pdGlnYXRpb24sIER1ZSB0byBldmVudHMsIHNjb3BlIG1heSBiZSBzZXQgdG8gdGhlIHdpbmRvdyBvYmplY3RcblxuICAgIHRoaXMuY3JlYXRlU3ViamVjdCgndmlld0NoYW5nZScpO1xuXG4gICAgTm9yaS5yb3V0ZXIoKS5zdWJzY3JpYmUoZnVuY3Rpb24gb25Sb3V0ZUNoYW5nZShwYXlsb2FkKSB7XG4gICAgICBoYW5kbGVSb3V0ZUNoYW5nZShwYXlsb2FkLnJvdXRlT2JqKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHJvdXRlIGZyb20gVVJMIGhhc2ggb24gY2hhbmdlXG4gICAqIEBwYXJhbSByb3V0ZU9ialxuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlUm91dGVDaGFuZ2Uocm91dGVPYmopIHtcbiAgICBzaG93Um91dGVWaWV3Q29tcG9uZW50LmJpbmQoX3RoaXMpKHJvdXRlT2JqLnJvdXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUeXBpY2FsbHkgb24gYXBwIHN0YXJ0dXAsIHNob3cgdGhlIHZpZXcgYXNzaWduZWQgdG8gdGhlIGN1cnJlbnQgVVJMIGhhc2hcbiAgICpcbiAgICogQHBhcmFtIHNpbGVudCBJZiB0cnVlLCB3aWxsIG5vdCBub3RpZnkgc3Vic2NyaWJlcnMgb2YgdGhlIGNoYW5nZSwgcHJldmVudHNcbiAgICogZG91YmxlIHNob3dpbmcgb24gaW5pdGlhbCBsb2FkXG4gICAqL1xuICBmdW5jdGlvbiBzaG93Vmlld0Zyb21VUkxIYXNoKHNpbGVudCkge1xuICAgIHRoaXMuc2hvd1JvdXRlVmlld0NvbXBvbmVudChOb3JpLmdldEN1cnJlbnRSb3V0ZSgpLnJvdXRlKTtcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgTm9yaS5yb3V0ZXIoKS5ub3RpZnlTdWJzY3JpYmVycygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGxvY2F0aW9uIGZvciB0aGUgdmlldyB0byBtb3VudCBvbiByb3V0ZSBjaGFuZ2VzLCBhbnkgY29udGVudHMgd2lsbFxuICAgKiBiZSByZW1vdmVkIHByaW9yXG4gICAqIEBwYXJhbSBlbElEXG4gICAqL1xuICBmdW5jdGlvbiBzZXRWaWV3TW91bnRQb2ludChlbElEKSB7XG4gICAgX3JvdXRlVmlld01vdW50UG9pbnQgPSBlbElEO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Vmlld01vdW50UG9pbnQoKSB7XG4gICAgcmV0dXJuIF9yb3V0ZVZpZXdNb3VudFBvaW50O1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBhIHJvdXRlIHRvIGEgbW9kdWxlIHZpZXcgY29udHJvbGxlclxuICAgKiBAcGFyYW0gdGVtcGxhdGVJRFxuICAgKiBAcGFyYW0gY29tcG9uZW50SURvck9ialxuICAgKi9cbiAgZnVuY3Rpb24gbWFwUm91dGVUb1ZpZXdDb21wb25lbnQocm91dGUsIHRlbXBsYXRlSUQsIGNvbXBvbmVudElEb3JPYmopIHtcbiAgICBfcm91dGVWaWV3SURNYXBbcm91dGVdID0gdGVtcGxhdGVJRDtcbiAgICB0aGlzLm1hcFZpZXdDb21wb25lbnQodGVtcGxhdGVJRCwgY29tcG9uZW50SURvck9iaiwgX3JvdXRlVmlld01vdW50UG9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgYSB2aWV3IChpbiByZXNwb25zZSB0byBhIHJvdXRlIGNoYW5nZSlcbiAgICogQHBhcmFtIHJvdXRlXG4gICAqL1xuICBmdW5jdGlvbiBzaG93Um91dGVWaWV3Q29tcG9uZW50KHJvdXRlKSB7XG4gICAgdmFyIGNvbXBvbmVudElEID0gX3JvdXRlVmlld0lETWFwW3JvdXRlXTtcbiAgICBpZiAoIWNvbXBvbmVudElEKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJObyB2aWV3IG1hcHBlZCBmb3Igcm91dGU6IFwiICsgcm91dGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlbW92ZUN1cnJlbnRSb3V0ZVZpZXcoKTtcblxuICAgIF9jdXJyZW50Um91dGVWaWV3SUQgPSBjb21wb25lbnRJRDtcbiAgICB0aGlzLnNob3dWaWV3Q29tcG9uZW50KF9jdXJyZW50Um91dGVWaWV3SUQpO1xuXG4gICAgLy8gVHJhbnNpdGlvbiBuZXcgdmlldyBpblxuICAgIFR3ZWVuTGl0ZS5zZXQoX3JvdXRlVmlld01vdW50UG9pbnQsIHthbHBoYTogMH0pO1xuICAgIFR3ZWVuTGl0ZS50byhfcm91dGVWaWV3TW91bnRQb2ludCwgMC4yNSwge2FscGhhOiAxLCBlYXNlOiBRdWFkLmVhc2VJbn0pO1xuXG4gICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVyc09mKCd2aWV3Q2hhbmdlJywgY29tcG9uZW50SUQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgY3VycmVudGx5IGRpc3BsYXllZCB2aWV3XG4gICAqL1xuICBmdW5jdGlvbiByZW1vdmVDdXJyZW50Um91dGVWaWV3KCkge1xuICAgIGlmIChfY3VycmVudFJvdXRlVmlld0lEKSB7XG4gICAgICBfdGhpcy5nZXRDb21wb25lbnRWaWV3TWFwKClbX2N1cnJlbnRSb3V0ZVZpZXdJRF0uY29udHJvbGxlci51bm1vdW50KCk7XG4gICAgfVxuICAgIF9jdXJyZW50Um91dGVWaWV3SUQgPSAnJztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZVJvdXRlVmlld3MgICA6IGluaXRpYWxpemVSb3V0ZVZpZXdzLFxuICAgIHNob3dWaWV3RnJvbVVSTEhhc2ggICAgOiBzaG93Vmlld0Zyb21VUkxIYXNoLFxuICAgIHNob3dSb3V0ZVZpZXdDb21wb25lbnQgOiBzaG93Um91dGVWaWV3Q29tcG9uZW50LFxuICAgIHNldFZpZXdNb3VudFBvaW50ICAgICAgOiBzZXRWaWV3TW91bnRQb2ludCxcbiAgICBnZXRWaWV3TW91bnRQb2ludCAgICAgIDogZ2V0Vmlld01vdW50UG9pbnQsXG4gICAgbWFwUm91dGVUb1ZpZXdDb21wb25lbnQ6IG1hcFJvdXRlVG9WaWV3Q29tcG9uZW50XG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWl4aW5Sb3V0ZVZpZXdzKCk7IiwiLyoqXG4gKiBCYXNlIG1vZHVsZSBmb3IgY29tcG9uZW50c1xuICogTXVzdCBiZSBleHRlbmRlZCB3aXRoIGN1c3RvbSBtb2R1bGVzXG4gKi9cblxudmFyIFZpZXdDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9pc0luaXRpYWxpemVkID0gZmFsc2UsXG4gICAgICBfY29uZmlnUHJvcHMsXG4gICAgICBfaWQsXG4gICAgICBfdGVtcGxhdGVPYmosXG4gICAgICBfaHRtbCxcbiAgICAgIF9ET01FbGVtZW50LFxuICAgICAgX21vdW50UG9pbnQsXG4gICAgICBfY2hpbGRyZW4gICAgICA9IFtdLFxuICAgICAgX2lzTW91bnRlZCAgICAgPSBmYWxzZSxcbiAgICAgIF9yZW5kZXJlciAgICAgID0gcmVxdWlyZSgnLi4vdXRpbHMvUmVuZGVyZXInKTtcblxuICAvKipcbiAgICogSW5pdGlhbGl6YXRpb25cbiAgICogQHBhcmFtIGNvbmZpZ1Byb3BzXG4gICAqL1xuICBmdW5jdGlvbiBpbml0aWFsaXplQ29tcG9uZW50KGNvbmZpZ1Byb3BzKSB7XG4gICAgX2NvbmZpZ1Byb3BzID0gY29uZmlnUHJvcHM7XG4gICAgX2lkICAgICAgICAgID0gY29uZmlnUHJvcHMuaWQ7XG4gICAgX3RlbXBsYXRlT2JqID0gY29uZmlnUHJvcHMudGVtcGxhdGU7XG4gICAgX21vdW50UG9pbnQgID0gY29uZmlnUHJvcHMubW91bnRQb2ludDtcblxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRJbml0aWFsU3RhdGUoKSk7XG4gICAgdGhpcy5zZXRFdmVudHModGhpcy5kZWZpbmVFdmVudHMoKSk7XG5cbiAgICB0aGlzLmNyZWF0ZVN1YmplY3QoJ3VwZGF0ZScpO1xuICAgIHRoaXMuY3JlYXRlU3ViamVjdCgnbW91bnQnKTtcbiAgICB0aGlzLmNyZWF0ZVN1YmplY3QoJ3VubW91bnQnKTtcblxuICAgIF9pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUV2ZW50cygpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgdXBkYXRlcyB0byB0aGUgbWFwIElEIHRvIHRoaXMgdmlldydzIHVwZGF0ZVxuICAgKiBAcGFyYW0gbWFwSURvck9iaiBPYmplY3QgdG8gc3Vic2NyaWJlIHRvIG9yIElELiBTaG91bGQgaW1wbGVtZW50IG5vcmkvc3RvcmUvTWl4aW5PYnNlcnZhYmxlU3RvcmVcbiAgICovXG4gIGZ1bmN0aW9uIGJpbmRNYXAobWFwSURvck9iaikge1xuICAgIHZhciBtYXA7XG5cbiAgICBpZiAoaXMub2JqZWN0KG1hcElEb3JPYmopKSB7XG4gICAgICBtYXAgPSBtYXBJRG9yT2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXAgPSBOb3JpLnN0b3JlKCkuZ2V0TWFwKG1hcElEb3JPYmopIHx8IE5vcmkuc3RvcmUoKS5nZXRNYXBDb2xsZWN0aW9uKG1hcElEb3JPYmopO1xuICAgIH1cblxuICAgIGlmICghbWFwKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZpZXdDb21wb25lbnQgYmluZE1hcCwgbWFwIG9yIG1hcGNvbGxlY3Rpb24gbm90IGZvdW5kOiAnICsgbWFwSURvck9iaik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFpcy5mdW5jdGlvbihtYXAuc3Vic2NyaWJlKSkge1xuICAgICAgY29uc29sZS53YXJuKCdWaWV3Q29tcG9uZW50IGJpbmRNYXAsIG1hcCBvciBtYXBjb2xsZWN0aW9uIG11c3QgYmUgb2JzZXJ2YWJsZTogJyArIG1hcElEb3JPYmopO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG1hcC5zdWJzY3JpYmUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgY2hpbGRcbiAgICogQHBhcmFtIGNoaWxkXG4gICAqL1xuICAvL2Z1bmN0aW9uIGFkZENoaWxkKGNoaWxkKSB7XG4gIC8vICBfY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gIC8vfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjaGlsZFxuICAgKiBAcGFyYW0gY2hpbGRcbiAgICovXG4gIC8vZnVuY3Rpb24gcmVtb3ZlQ2hpbGQoY2hpbGQpIHtcbiAgLy8gIHZhciBpZHggPSBfY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gIC8vICBfY2hpbGRyZW5baWR4XS51bm1vdW50KCk7XG4gIC8vICBfY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gIC8vfVxuXG4gIC8qKlxuICAgKiBCZWZvcmUgdGhlIHZpZXcgdXBkYXRlcyBhbmQgYSByZXJlbmRlciBvY2N1cnNcbiAgICogUmV0dXJucyBuZXh0U3RhdGUgb2YgY29tcG9uZW50XG4gICAqL1xuICBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmdldFN0YXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIGN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICB2YXIgbmV4dFN0YXRlICAgID0gdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKCk7XG5cbiAgICBpZiAodGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFN0YXRlKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICAgICAgLy9fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiB1cGRhdGVDaGlsZChjaGlsZCkge1xuICAgICAgLy8gIGNoaWxkLnVwZGF0ZSgpO1xuICAgICAgLy99KTtcblxuICAgICAgaWYgKF9pc01vdW50ZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkQ29tcG9uZW50UmVuZGVyKGN1cnJlbnRTdGF0ZSkpIHtcbiAgICAgICAgICB0aGlzLnVubW91bnQoKTtcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlbmRlcigpO1xuICAgICAgICAgIHRoaXMubW91bnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVyc09mKCd1cGRhdGUnLCB0aGlzLmdldElEKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlIGN1cnJlbnQgc3RhdGUgYW5kIG5leHQgc3RhdGUgdG8gZGV0ZXJtaW5lIGlmIHVwZGF0aW5nIHNob3VsZCBvY2N1clxuICAgKiBAcGFyYW0gbmV4dFN0YXRlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRTdGF0ZSkge1xuICAgIHJldHVybiBpcy5leGlzdHkobmV4dFN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgaXQsIG5lZWQgdG8gYWRkIGl0IHRvIGEgcGFyZW50IGNvbnRhaW5lciwgaGFuZGxlZCBpbiBoaWdoZXIgbGV2ZWwgdmlld1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBvbmVudFJlbmRlcigpIHtcbiAgICAvL19jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIHJlbmRlckNoaWxkKGNoaWxkKSB7XG4gICAgLy8gIGNoaWxkLmNvbXBvbmVudFJlbmRlcigpO1xuICAgIC8vfSk7XG5cbiAgICBfaHRtbCA9IHRoaXMucmVuZGVyKHRoaXMuZ2V0U3RhdGUoKSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXkgYmUgb3ZlcnJpZGRlbiBpbiBhIHN1Ym1vZHVsZSBmb3IgY3VzdG9tIHJlbmRlcmluZ1xuICAgKiBTaG91bGQgcmV0dXJuIEhUTUxcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiByZW5kZXIoc3RhdGUpIHtcbiAgICByZXR1cm4gX3RlbXBsYXRlT2JqKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgaXQgdG8gYSBwYXJlbnQgZWxlbWVudFxuICAgKiBAcGFyYW0gbW91bnRFbFxuICAgKi9cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKCFfaHRtbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgJyArIF9pZCArICcgY2Fubm90IG1vdW50IHdpdGggbm8gSFRNTC4gQ2FsbCByZW5kZXIoKSBmaXJzdD8nKTtcbiAgICB9XG5cbiAgICBfaXNNb3VudGVkID0gdHJ1ZTtcblxuICAgIF9ET01FbGVtZW50ID0gKF9yZW5kZXJlci5yZW5kZXIoe1xuICAgICAgdGFyZ2V0OiBfbW91bnRQb2ludCxcbiAgICAgIGh0bWwgIDogX2h0bWxcbiAgICB9KSk7XG5cbiAgICBpZiAodGhpcy5kZWxlZ2F0ZUV2ZW50cykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbXBvbmVudERpZE1vdW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudERpZE1vdW50KCk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVyc09mKCdtb3VudCcsIHRoaXMuZ2V0SUQoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBhZnRlciBpdCdzIGJlZW4gYWRkZWQgdG8gYSB2aWV3XG4gICAqL1xuICBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBzdHViXG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB3aGVuIHVubG9hZGluZ1xuICAgKi9cbiAgZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgLy8gc3R1YlxuICB9XG5cbiAgZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgX2lzTW91bnRlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudW5kZWxlZ2F0ZUV2ZW50cykge1xuICAgICAgdGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgX3JlbmRlcmVyLnJlbmRlcih7XG4gICAgICB0YXJnZXQ6IF9tb3VudFBvaW50LFxuICAgICAgaHRtbCAgOiAnJ1xuICAgIH0pO1xuXG4gICAgX2h0bWwgICAgICAgPSAnJztcbiAgICBfRE9NRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVyc09mKCd1bm1vdW50JywgdGhpcy5nZXRJRCgpKTtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgQWNjZXNzb3JzXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGZ1bmN0aW9uIGlzSW5pdGlhbGl6ZWQoKSB7XG4gICAgcmV0dXJuIF9pc0luaXRpYWxpemVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29uZmlnUHJvcHMoKSB7XG4gICAgcmV0dXJuIF9jb25maWdQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTW91bnRlZCgpIHtcbiAgICByZXR1cm4gX2lzTW91bnRlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElEKCkge1xuICAgIHJldHVybiBfaWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRET01FbGVtZW50KCkge1xuICAgIHJldHVybiBfRE9NRWxlbWVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRlbXBsYXRlKCkge1xuICAgIHJldHVybiBfdGVtcGxhdGVPYmo7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRUZW1wbGF0ZShodG1sKSB7XG4gICAgX3RlbXBsYXRlT2JqID0gXy50ZW1wbGF0ZShodG1sKTtcbiAgfVxuXG4gIC8vZnVuY3Rpb24gZ2V0Q2hpbGRyZW4oKSB7XG4gIC8vICByZXR1cm4gX2NoaWxkcmVuLnNsaWNlKDApO1xuICAvL31cblxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgQVBJXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudDogaW5pdGlhbGl6ZUNvbXBvbmVudCxcbiAgICBkZWZpbmVFdmVudHMgICAgICAgOiBkZWZpbmVFdmVudHMsXG4gICAgaXNJbml0aWFsaXplZCAgICAgIDogaXNJbml0aWFsaXplZCxcbiAgICBnZXRDb25maWdQcm9wcyAgICAgOiBnZXRDb25maWdQcm9wcyxcbiAgICBnZXRJbml0aWFsU3RhdGUgICAgOiBnZXRJbml0aWFsU3RhdGUsXG4gICAgZ2V0SUQgICAgICAgICAgICAgIDogZ2V0SUQsXG4gICAgZ2V0VGVtcGxhdGUgICAgICAgIDogZ2V0VGVtcGxhdGUsXG4gICAgc2V0VGVtcGxhdGUgICAgICAgIDogc2V0VGVtcGxhdGUsXG4gICAgZ2V0RE9NRWxlbWVudCAgICAgIDogZ2V0RE9NRWxlbWVudCxcbiAgICBpc01vdW50ZWQgICAgICAgICAgOiBpc01vdW50ZWQsXG5cbiAgICBiaW5kTWFwOiBiaW5kTWFwLFxuXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZSAgOiBjb21wb25lbnRXaWxsVXBkYXRlLFxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogc2hvdWxkQ29tcG9uZW50VXBkYXRlLFxuICAgIHVwZGF0ZSAgICAgICAgICAgICAgIDogdXBkYXRlLFxuXG4gICAgY29tcG9uZW50UmVuZGVyOiBjb21wb25lbnRSZW5kZXIsXG4gICAgcmVuZGVyICAgICAgICAgOiByZW5kZXIsXG5cbiAgICBtb3VudCAgICAgICAgICAgIDogbW91bnQsXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGNvbXBvbmVudERpZE1vdW50LFxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGNvbXBvbmVudFdpbGxVbm1vdW50LFxuICAgIHVubW91bnQgICAgICAgICAgICAgOiB1bm1vdW50XG5cbiAgICAvL2FkZENoaWxkICAgOiBhZGRDaGlsZCxcbiAgICAvL3JlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICAvL2dldENoaWxkcmVuOiBnZXRDaGlsZHJlblxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdDb21wb25lbnQ7IiwidmFyIGJyb3dzZXJJbmZvID0ge1xuXG4gIGFwcFZlcnNpb24gOiBuYXZpZ2F0b3IuYXBwVmVyc2lvbixcbiAgdXNlckFnZW50ICA6IG5hdmlnYXRvci51c2VyQWdlbnQsXG4gIGlzSUUgICAgICAgOiAtMSA8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUUgXCIpLFxuICBpc0lFNiAgICAgIDogdGhpcy5pc0lFICYmIC0xIDwgbmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1TSUUgNlwiKSxcbiAgaXNJRTcgICAgICA6IHRoaXMuaXNJRSAmJiAtMSA8IG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNU0lFIDdcIiksXG4gIGlzSUU4ICAgICAgOiB0aGlzLmlzSUUgJiYgLTEgPCBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTVNJRSA4XCIpLFxuICBpc0lFOSAgICAgIDogdGhpcy5pc0lFICYmIC0xIDwgbmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1TSUUgOVwiKSxcbiAgaXNGRiAgICAgICA6IC0xIDwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveC9cIiksXG4gIGlzQ2hyb21lICAgOiAtMSA8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZS9cIiksXG4gIGlzTWFjICAgICAgOiAtMSA8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1hY2ludG9zaCxcIiksXG4gIGlzTWFjU2FmYXJpOiAtMSA8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAmJiAtMSA8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1hY1wiKSAmJiAtMSA9PT0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpLFxuXG4gIGhhc1RvdWNoICAgIDogJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICBub3RTdXBwb3J0ZWQ6ICh0aGlzLmlzSUU2IHx8IHRoaXMuaXNJRTcgfHwgdGhpcy5pc0lFOCB8fCB0aGlzLmlzSUU5KSxcblxuICBtb2JpbGU6IHtcbiAgICBBbmRyb2lkICAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTtcbiAgICB9LFxuICAgIEJsYWNrQmVycnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JCMTA7IFRvdWNoLyk7XG4gICAgfSxcbiAgICBpT1MgICAgICAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC9pKTtcbiAgICB9LFxuICAgIE9wZXJhICAgICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9PcGVyYSBNaW5pL2kpO1xuICAgIH0sXG4gICAgV2luZG93cyAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0lFTW9iaWxlL2kpO1xuICAgIH0sXG4gICAgYW55ICAgICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICh0aGlzLkFuZHJvaWQoKSB8fCB0aGlzLkJsYWNrQmVycnkoKSB8fCB0aGlzLmlPUygpIHx8IHRoaXMuT3BlcmEoKSB8fCB0aGlzLldpbmRvd3MoKSkgIT09IG51bGw7XG4gICAgfVxuXG4gIH0sXG5cbiAgLy8gVE9ETyBmaWx0ZXIgZm9yIElFID4gOVxuICBlbmhhbmNlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhX2Jyb3dzZXJJbmZvLmlzSUUgJiYgIV9icm93c2VySW5mby5tb2JpbGUuYW55KCk7XG4gIH0sXG5cbiAgbW91c2VEb3duRXZ0U3RyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9iaWxlLmFueSgpID8gXCJ0b3VjaHN0YXJ0XCIgOiBcIm1vdXNlZG93blwiO1xuICB9LFxuXG4gIG1vdXNlVXBFdnRTdHI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2JpbGUuYW55KCkgPyBcInRvdWNoZW5kXCIgOiBcIm1vdXNldXBcIjtcbiAgfSxcblxuICBtb3VzZUNsaWNrRXZ0U3RyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9iaWxlLmFueSgpID8gXCJ0b3VjaGVuZFwiIDogXCJjbGlja1wiO1xuICB9LFxuXG4gIG1vdXNlTW92ZUV2dFN0cjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1vYmlsZS5hbnkoKSA/IFwidG91Y2htb3ZlXCIgOiBcIm1vdXNlbW92ZVwiO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnJvd3NlckluZm87IiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjM5OTkvaG93LXRvLXRlbGwtaWYtYS1kb20tZWxlbWVudC1pcy12aXNpYmxlLWluLXRoZS1jdXJyZW50LXZpZXdwb3J0XG4gIC8vIGVsZW1lbnQgbXVzdCBiZSBlbnRpcmVseSBvbiBzY3JlZW5cbiAgaXNFbGVtZW50RW50aXJlbHlJblZpZXdwb3J0OiBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiAoXG4gICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICByZWN0LmxlZnQgPj0gMCAmJlxuICAgICAgcmVjdC5ib3R0b20gPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAmJlxuICAgICAgcmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxuICAgICk7XG4gIH0sXG5cbiAgLy8gZWxlbWVudCBtYXkgYmUgcGFydGlhbHkgb24gc2NyZWVuXG4gIGlzRWxlbWVudEluVmlld3BvcnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHJlY3QuYm90dG9tID4gMCAmJlxuICAgICAgcmVjdC5yaWdodCA+IDAgJiZcbiAgICAgIHJlY3QubGVmdCA8ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpICYmXG4gICAgICByZWN0LnRvcCA8ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gIH0sXG5cbiAgaXNEb21PYmo6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gISEob2JqLm5vZGVUeXBlIHx8IChvYmogPT09IHdpbmRvdykpO1xuICB9LFxuXG4gIHBvc2l0aW9uOiBmdW5jdGlvbiAoZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogZWwub2Zmc2V0TGVmdCxcbiAgICAgIHRvcCA6IGVsLm9mZnNldFRvcFxuICAgIH07XG4gIH0sXG5cbiAgLy8gZnJvbSBodHRwOi8vanNwZXJmLmNvbS9qcXVlcnktb2Zmc2V0LXZzLW9mZnNldHBhcmVudC1sb29wXG4gIG9mZnNldDogZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIG9sID0gMCxcbiAgICAgICAgb3QgPSAwO1xuICAgIGlmIChlbC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgb2wgKz0gZWwub2Zmc2V0TGVmdDtcbiAgICAgICAgb3QgKz0gZWwub2Zmc2V0VG9wO1xuICAgICAgfSB3aGlsZSAoZWwgPSBlbC5vZmZzZXRQYXJlbnQpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IG9sLFxuICAgICAgdG9wIDogb3RcbiAgICB9O1xuICB9LFxuXG4gIHJlbW92ZUFsbEVsZW1lbnRzOiBmdW5jdGlvbiAoZWwpIHtcbiAgICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkge1xuICAgICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9LFxuXG4gIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTQxNDMvY3JlYXRpbmctYS1uZXctZG9tLWVsZW1lbnQtZnJvbS1hbi1odG1sLXN0cmluZy11c2luZy1idWlsdC1pbi1kb20tbWV0aG9kcy1vci1wcm9cbiAgSFRNTFN0clRvTm9kZTogZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciB0ZW1wICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGVtcC5pbm5lckhUTUwgPSBzdHI7XG4gICAgcmV0dXJuIHRlbXAuZmlyc3RDaGlsZDtcbiAgfSxcblxuICB3cmFwRWxlbWVudDogZnVuY3Rpb24gKHdyYXBwZXJTdHIsIGVsKSB7XG4gICAgdmFyIHdyYXBwZXJFbCA9IHRoaXMuSFRNTFN0clRvTm9kZSh3cmFwcGVyU3RyKSxcbiAgICAgICAgZWxQYXJlbnQgID0gZWwucGFyZW50Tm9kZTtcblxuICAgIHdyYXBwZXJFbC5hcHBlbmRDaGlsZChlbCk7XG4gICAgZWxQYXJlbnQuYXBwZW5kQ2hpbGQod3JhcHBlckVsKTtcbiAgICByZXR1cm4gd3JhcHBlckVsO1xuICB9LFxuXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTUzMjkxNjcvY2xvc2VzdC1hbmNlc3Rvci1tYXRjaGluZy1zZWxlY3Rvci11c2luZy1uYXRpdmUtZG9tXG4gIGNsb3Nlc3Q6IGZ1bmN0aW9uIChlbCwgc2VsZWN0b3IpIHtcbiAgICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWwubWF0Y2hlcyB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3Rvci5iaW5kKGVsKShzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLy8gZnJvbSB5b3VtaWdodG5vdG5lZWRqcXVlcnkuY29tXG4gIGhhc0NsYXNzOiBmdW5jdGlvbiAoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIGFkZENsYXNzOiBmdW5jdGlvbiAoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChlbCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICAgIH1cbiAgfSxcblxuICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKGVsLCBjbGFzc05hbWUpIHtcbiAgICBpZiAodGhpcy5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gRnJvbSBpbXByZXNzLmpzXG4gIGFwcGx5Q1NTOiBmdW5jdGlvbiAoZWwsIHByb3BzKSB7XG4gICAgdmFyIGtleSwgcGtleTtcbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgZWwuc3R5bGVba2V5XSA9IHByb3BzW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfSxcblxuICAvLyBmcm9tIGltcHJlc3MuanNcbiAgLy8gYGNvbXB1dGVXaW5kb3dTY2FsZWAgY291bnRzIHRoZSBzY2FsZSBmYWN0b3IgYmV0d2VlbiB3aW5kb3cgc2l6ZSBhbmQgc2l6ZVxuICAvLyBkZWZpbmVkIGZvciB0aGUgcHJlc2VudGF0aW9uIGluIHRoZSBjb25maWcuXG4gIGNvbXB1dGVXaW5kb3dTY2FsZTogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHZhciBoU2NhbGUgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyBjb25maWcuaGVpZ2h0LFxuICAgICAgICB3U2NhbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIGNvbmZpZy53aWR0aCxcbiAgICAgICAgc2NhbGUgID0gaFNjYWxlID4gd1NjYWxlID8gd1NjYWxlIDogaFNjYWxlO1xuXG4gICAgaWYgKGNvbmZpZy5tYXhTY2FsZSAmJiBzY2FsZSA+IGNvbmZpZy5tYXhTY2FsZSkge1xuICAgICAgc2NhbGUgPSBjb25maWcubWF4U2NhbGU7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5taW5TY2FsZSAmJiBzY2FsZSA8IGNvbmZpZy5taW5TY2FsZSkge1xuICAgICAgc2NhbGUgPSBjb25maWcubWluU2NhbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjYWxlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgYW4gYXJyYXkgb2YgZWxlbWVudHMgaW4gdGhlIGNvbnRhaW5lciByZXR1cm5lZCBhcyBBcnJheSBpbnN0ZWFkIG9mIGEgTm9kZSBsaXN0XG4gICAqL1xuICBnZXRRU0VsZW1lbnRzQXNBcnJheTogZnVuY3Rpb24gKGVsLCBjbHMpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbChjbHMpLCAwKTtcbiAgfSxcblxuICBjZW50ZXJFbGVtZW50SW5WaWV3UG9ydDogZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIHZwSCA9IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgdnBXID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIGVsUiA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBlbEggPSBlbFIuaGVpZ2h0LFxuICAgICAgICBlbFcgPSBlbFIud2lkdGg7XG5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gKHZwVyAvIDIpIC0gKGVsVyAvIDIpICsgJ3B4JztcbiAgICBlbC5zdHlsZS50b3AgID0gKHZwSCAvIDIpIC0gKGVsSCAvIDIpICsgJ3B4JztcbiAgfSxcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvYmplY3QgZnJvbSB0aGUgbmFtZSAob3IgaWQpIGF0dHJpYnMgYW5kIGRhdGEgb2YgYSBmb3JtXG4gICAqIEBwYXJhbSBlbFxuICAgKiBAcmV0dXJucyB7bnVsbH1cbiAgICovXG4gIGNhcHR1cmVGb3JtRGF0YTogZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIGRhdGFPYmogPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICB0ZXh0YXJlYUVscywgaW5wdXRFbHMsIHNlbGVjdEVscztcblxuICAgIHRleHRhcmVhRWxzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbCgndGV4dGFyZWEnKSwgMCk7XG4gICAgaW5wdXRFbHMgICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLCAwKTtcbiAgICBzZWxlY3RFbHMgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpLCAwKTtcblxuICAgIHRleHRhcmVhRWxzLmZvckVhY2goZ2V0SW5wdXRGb3JtRGF0YSk7XG4gICAgaW5wdXRFbHMuZm9yRWFjaChnZXRJbnB1dEZvcm1EYXRhKTtcbiAgICBzZWxlY3RFbHMuZm9yRWFjaChnZXRTZWxlY3RGb3JtRGF0YSk7XG5cbiAgICByZXR1cm4gZGF0YU9iajtcblxuICAgIGZ1bmN0aW9uIGdldElucHV0Rm9ybURhdGEoZm9ybUVsKSB7XG4gICAgICBkYXRhT2JqW2dldEVsTmFtZU9ySUQoZm9ybUVsKV0gPSBmb3JtRWwudmFsdWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0Rm9ybURhdGEoZm9ybUVsKSB7XG4gICAgICB2YXIgc2VsID0gZm9ybUVsLnNlbGVjdGVkSW5kZXgsIHZhbCA9ICcnO1xuICAgICAgaWYgKHNlbCA+PSAwKSB7XG4gICAgICAgIHZhbCA9IGZvcm1FbC5vcHRpb25zW3NlbF0udmFsdWU7XG4gICAgICB9XG4gICAgICBkYXRhT2JqW2dldEVsTmFtZU9ySUQoZm9ybUVsKV0gPSB2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RWxOYW1lT3JJRChmb3JtRWwpIHtcbiAgICAgIHZhciBuYW1lID0gJ25vX25hbWUnO1xuICAgICAgaWYgKGZvcm1FbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSkge1xuICAgICAgICBuYW1lID0gZm9ybUVsLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtRWwuZ2V0QXR0cmlidXRlKCdpZCcpKSB7XG4gICAgICAgIG5hbWUgPSBmb3JtRWwuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICB9XG5cbn07IiwidmFyIExvcmVtID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfY3VycmVudFRleHQgICAgICA9IFtdLFxuICAgICAgX3RleHRTZXRzICAgICAgICAgPSBbXSxcbiAgICAgIF9tYWxlRmlyc3ROYW1lcyAgID0gW10sXG4gICAgICBfZmVtYWxlRmlyc3ROYW1lcyA9IFtdLFxuICAgICAgX2xhc3ROYW1lcyAgICAgICAgPSBbXSxcbiAgICAgIF9wdW5jdHVhdGlvbiAgICAgID0gW10sXG4gICAgICBfbW9udGhzLFxuICAgICAgX2RheXMsXG4gICAgICBfaW5pdGlhbGl6ZWQgICAgICA9IGZhbHNlLFxuICAgICAgX2FycmF5VXRpbHMgICAgICAgPSByZXF1aXJlKCcuLi9jb3JlL0FycmF5VXRpbHMuanMnKSxcbiAgICAgIF9zdHJpbmdVdGlscyAgICAgID0gcmVxdWlyZSgnLi4vY29yZS9TdHJpbmdVdGlscy5qcycpLFxuICAgICAgX251bWJlclV0aWxzICAgICAgPSByZXF1aXJlKCcuLi9jb3JlL051bWJlclV0aWxzLmpzJyk7XG5cbiAgX3RleHRTZXRzID0gW1xuICAgIFwiUGVyaGFwcyBhIHJlLWVuZ2luZWVyaW5nIG9mIHlvdXIgY3VycmVudCB3b3JsZCB2aWV3IHdpbGwgcmUtZW5lcmdpemUgeW91ciBvbmxpbmUgbm9tZW5jbGF0dXJlIHRvIGVuYWJsZSBhIG5ldyBob2xpc3RpYyBpbnRlcmFjdGl2ZSBlbnRlcnByaXNlIGludGVybmV0IGNvbW11bmljYXRpb24gc29sdXRpb24gVXBzY2FsaW5nIHRoZSByZXN1cmdlbnQgbmV0d29ya2luZyBleGNoYW5nZSBzb2x1dGlvbnMsIGFjaGlldmluZyBhIGJyZWFrYXdheSBzeXN0ZW1pYyBlbGVjdHJvbmljIGRhdGEgaW50ZXJjaGFuZ2Ugc3lzdGVtIHN5bmNocm9uaXphdGlvbiwgdGhlcmVieSBleHBsb2l0aW5nIHRlY2huaWNhbCBlbnZpcm9ubWVudHMgZm9yIG1pc3Npb24gY3JpdGljYWwgYnJvYWQgYmFzZWQgY2FwYWNpdHkgY29uc3RyYWluZWQgc3lzdGVtcyBGdW5kYW1lbnRhbGx5IHRyYW5zZm9ybWluZyB3ZWxsIGRlc2lnbmVkIGFjdGlvbmFibGUgaW5mb3JtYXRpb24gd2hvc2Ugc2VtYW50aWMgY29udGVudCBpcyB2aXJ0dWFsbHkgbnVsbCBUbyBtb3JlIGZ1bGx5IGNsYXJpZnkgdGhlIGN1cnJlbnQgZXhjaGFuZ2UsIGEgZmV3IGFnZ3JlZ2F0ZSBpc3N1ZXMgd2lsbCByZXF1aXJlIGFkZHJlc3NpbmcgdG8gZmFjaWxpdGF0ZSB0aGlzIGRpc3RyaWJ1dGVkIGNvbW11bmljYXRpb24gdmVudWUgSW4gaW50ZWdyYXRpbmcgbm9uLWFsaWduZWQgc3RydWN0dXJlcyBpbnRvIGV4aXN0aW5nIGxlZ2FjeSBzeXN0ZW1zLCBhIGhvbGlzdGljIGdhdGV3YXkgYmx1ZXByaW50IGlzIGEgYmFja3dhcmQgY29tcGF0aWJsZSBwYWNrYWdpbmcgdGFuZ2libGVcIlxuICBdO1xuXG4gIF9sYXN0TmFtZXMgPSAnU21pdGggSm9obnNvbiBXaWxsaWFtcyBKb25lcyBCcm93biBEYXZpcyBNaWxsZXIgV2lsc29uIE1vb3JlIFRheWxvciBBbmRlcnNvbiBUaG9tYXMgSmFja3NvbiBXaGl0ZSBIYXJyaXMgTWFydGluIFRob21wc29uIEdhcmNpYSBNYXJ0aW5leiBSb2JpbnNvbiBDbGFyayBSb2RyaWd1ZXogTGV3aXMgTGVlIFdhbGtlciBIYWxsIEFsbGVuIFlvdW5nIEhlcm5hbmRleiBLaW5nIFdyaWdodCBMb3BleiBIaWxsIFNjb3R0IEdyZWVuIEFkYW1zIEJha2VyIEdvbnphbGV6IE5lbHNvbiBDYXJ0ZXIgTWl0Y2hlbGwgUGVyZXogUm9iZXJ0cyBUdXJuZXIgUGhpbGxpcHMgQ2FtcGJlbGwgUGFya2VyIEV2YW5zIEVkd2FyZHMgQ29sbGlucyBTdGV3YXJ0IFNhbmNoZXogTW9ycmlzIFJvZ2VycyBSZWVkIENvb2sgTW9yZ2FuIEJlbGwgTXVycGh5Jy5zcGxpdCgnICcpO1xuXG4gIF9tYWxlRmlyc3ROYW1lcyA9ICdUaG9tYXMgQXJ0aHVyIExld2lzIENsYXJlbmNlIExlb25hcmQgQWxiZXJ0IFBhdWwgQ2FybCBSYWxwaCBSb3kgRWFybCBTYW11ZWwgSG93YXJkIFJpY2hhcmQgRnJhbmNpcyBMYXVyZW5jZSBIZXJiZXJ0IEVsbWVyIEVybmVzdCBUaGVvZG9yZSBEYXZpZCBBbGZyZWQgRG9uYWxkIFJ1c3NlbGwgRXVnZW5lIEFuZHJldyBLZW5uZXRoIEhlcm1hbiBKZXNzZSBMZXN0ZXIgRmxveWQgTWljaGFlbCBFZHdpbiBDbGlmZm9yZCBCZW5qYW1pbiBDbHlkZSBHbGVuIE9zY2FyIERhbmllbCcuc3BsaXQoJyAnKTtcblxuICBfZmVtYWxlRmlyc3ROYW1lcyA9ICdFbGl6YWJldGggQW5uIEhlbGVuIE1hcmdhcmV0IEVsbGVuIENhdGhlcmluZSBMaWx5IEZsb3JlbmNlIEFkYSBMb3UgRXRoZWwgRW1pbHkgUnV0aCBSb3NlIEZyYW5jZXMgQWxpY2UgQmVydGhhIENsYXJhIE1hYmVsIE1pbm5pZSBHcmFjZSBKYW5lIEV2ZWx5biBHZXJ0cnVkZSBFZG5hIFBlYXJsIExhdXJhIEhhemVsIEVkaXRoIEVzdGhlciBIYXJyaWV0IFNhcmFoIE1heSBNYXRpbGRhIE1hcnRoYSBNeXJ0bGUgSm9zZXBoaW4gTWF1ZCBBZ25lcyBLZXJpIEp1bGlhIElyZW5lIE1pbGRyZWQgQ29yYScuc3BsaXQoJyAnKTtcblxuICBfcHVuY3R1YXRpb24gPSBbJy4nLCAnLicsICcuJywgJy4nLCAnPycsICchJ107XG5cbiAgX21vbnRocyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuXG4gIF9kYXlzID0gWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5J107XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAoX2luaXRpYWxpemVkKSByZXR1cm47XG4gICAgc2V0Q3VycmVudFRleHRTZXQoMCk7XG4gICAgX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRUZXh0U2V0KGluZGV4KSB7XG4gICAgdmFyIF9jdXJyZW50ID0gX3RleHRTZXRzW2luZGV4XS50b0xvd2VyQ2FzZSgpO1xuICAgIF9jdXJyZW50VGV4dCA9IF9jdXJyZW50LnNwbGl0KCcgJyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTZW50ZW5jZShtaW4sIG1heCkge1xuICAgIHZhciBzZW50ZW5jZSA9IGdldFRleHQobWluLCBtYXgpO1xuXG4gICAgcmV0dXJuIF9zdHJpbmdVdGlscy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoc2VudGVuY2UpICsgZ2V0UmFuZG9tSXRlbShfcHVuY3R1YXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFyYWdyYXBoKG1pbiwgbWF4KSB7XG4gICAgdmFyIHN0ciAgID0gXCJcIixcbiAgICAgICAgZGVsaW0gPSBcIiBcIixcbiAgICAgICAgbGVuICAgPSBfbnVtYmVyVXRpbHMucm5kTnVtYmVyKG1pbiwgbWF4KSxcbiAgICAgICAgaSAgICAgPSAwO1xuXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcbiAgICAgICAgZGVsaW0gPSBcIlwiO1xuICAgICAgfVxuICAgICAgc3RyICs9IGdldFNlbnRlbmNlKDEsIDEwKSArIGRlbGltO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUZXh0KG1pbiwgbWF4KSB7XG4gICAgdmFyIHN0ciAgID0gXCJcIixcbiAgICAgICAgZGVsaW0gPSBcIiBcIixcbiAgICAgICAgbGVuICAgPSBfbnVtYmVyVXRpbHMucm5kTnVtYmVyKG1pbiwgbWF4KSxcbiAgICAgICAgaSAgICAgPSAwO1xuXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcbiAgICAgICAgZGVsaW0gPSBcIlwiO1xuICAgICAgfVxuICAgICAgc3RyICs9IGdldFJhbmRvbUl0ZW0oX2N1cnJlbnRUZXh0KSArIGRlbGltO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSYW5kb21JdGVtKGFycnkpIHtcbiAgICB2YXIgbWluID0gMDtcbiAgICB2YXIgbWF4ID0gYXJyeS5sZW5ndGggLSAxO1xuICAgIHJldHVybiBhcnJ5W19udW1iZXJVdGlscy5ybmROdW1iZXIobWluLCBtYXgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZpcnN0TmFtZSgpIHtcbiAgICByZXR1cm4gX251bWJlclV0aWxzLnJuZE51bWJlcigwLCAxKSA/IGdldFJhbmRvbUl0ZW0oX21hbGVGaXJzdE5hbWVzKSA6IGdldFJhbmRvbUl0ZW0oX2ZlbWFsZUZpcnN0TmFtZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGFzdE5hbWUoKSB7XG4gICAgcmV0dXJuIGdldFJhbmRvbUl0ZW0oX2xhc3ROYW1lcyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGTE5hbWUoKSB7XG4gICAgcmV0dXJuIGdldEZpcnN0TmFtZSgpICsgXCIgXCIgKyBnZXRMYXN0TmFtZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TEZOYW1lKCkge1xuICAgIHJldHVybiBnZXRMYXN0TmFtZSgpICsgXCIsIFwiICsgZ2V0Rmlyc3ROYW1lKCk7XG4gIH1cblxuICAvKipcbiAgICogQmV0dGVyIGltcGxlbWVudGF0aW9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTAzNTYyNy9lbGVnYW50LW1ldGhvZC10by1nZW5lcmF0ZS1hcnJheS1vZi1yYW5kb20tZGF0ZXMtd2l0aGluLXR3by1kYXRlc1xuICAgKiBAcmV0dXJucyB7e21vbnRoTnVtYmVyOiAqLCBtb250aE5hbWU6ICosIG1vbnRoRGF5LCB3ZWVrRGF5TnVtYmVyOiAqLCB3ZWVrRGF5OiAqLCB5ZWFyfX1cbiAgICovXG4gIGZ1bmN0aW9uIGdldERhdGUoKSB7XG4gICAgdmFyIG1vbnRoID0gX251bWJlclV0aWxzLnJuZE51bWJlcigwLCAxMSksXG4gICAgICAgIHdrZGF5ID0gX251bWJlclV0aWxzLnJuZE51bWJlcigwLCA0KSxcbiAgICAgICAgZGF0ZSAgPSB7XG4gICAgICAgICAgbW9udGhOdW1iZXIgIDogbW9udGggKyAxLFxuICAgICAgICAgIG1vbnRoTmFtZSAgICA6IF9tb250aHNbbW9udGhdLFxuICAgICAgICAgIG1vbnRoRGF5ICAgICA6IF9udW1iZXJVdGlscy5ybmROdW1iZXIoMSwgMjgpLFxuICAgICAgICAgIHdlZWtEYXlOdW1iZXI6IHdrZGF5ICsgMSxcbiAgICAgICAgICB3ZWVrRGF5ICAgICAgOiBfZGF5c1t3a2RheV0sXG4gICAgICAgICAgeWVhciAgICAgICAgIDogX2FycmF5VXRpbHMucm5kRWxlbWVudChbJzIwMTAnLCAnMjAxMScsICcyMDEyJywgJzIwMTMnLCAnMjAxNCcsICcyMDE1JywgJzIwMTYnXSlcbiAgICAgICAgfTtcblxuICAgIGRhdGUuc3RyaW5nID0gZGF0ZS5tb250aE5hbWUgKyAnICcgKyBkYXRlLm1vbnRoRGF5ICsgJywgJyArIGRhdGUueWVhcjtcblxuICAgIHJldHVybiBkYXRlO1xuXG4gIH1cblxuICAvKipcbiAgICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvY3JlYXRlLWd1aWQtdXVpZC1pbi1qYXZhc2NyaXB0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBmYWtlR1VJRCgpIHtcbiAgICBmdW5jdGlvbiBzNCgpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplICA6IGluaXRpYWxpemUsXG4gICAgZ2V0VGV4dCAgICAgOiBnZXRUZXh0LFxuICAgIGdldFNlbnRlbmNlIDogZ2V0U2VudGVuY2UsXG4gICAgZ2V0UGFyYWdyYXBoOiBnZXRQYXJhZ3JhcGgsXG4gICAgZ2V0RkxOYW1lICAgOiBnZXRGTE5hbWUsXG4gICAgZ2V0TEZOYW1lICAgOiBnZXRMRk5hbWUsXG4gICAgZ2V0RGF0ZSAgICAgOiBnZXREYXRlLFxuICAgIGZha2VHVUlEICAgIDogZmFrZUdVSURcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb3JlbSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBzaGFyZWQgM2QgcGVyc3BlY3RpdmUgZm9yIGFsbCBjaGlsZHJlblxuICAgKiBAcGFyYW0gZWxcbiAgICovXG4gIGFwcGx5M0RUb0NvbnRhaW5lcjogZnVuY3Rpb24gKGVsKSB7XG4gICAgVHdlZW5MaXRlLnNldChlbCwge1xuICAgICAgY3NzOiB7XG4gICAgICAgIHBlcnNwZWN0aXZlICAgICAgOiA4MDAsXG4gICAgICAgIHBlcnNwZWN0aXZlT3JpZ2luOiAnNTAlIDUwJSdcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogQXBwbHkgYmFzaWMgQ1NTIHByb3BzXG4gICAqIEBwYXJhbSBlbFxuICAgKi9cbiAgYXBwbHkzRFRvRWxlbWVudDogZnVuY3Rpb24gKGVsKSB7XG4gICAgVHdlZW5MaXRlLnNldChlbCwge1xuICAgICAgY3NzOiB7XG4gICAgICAgIHRyYW5zZm9ybVN0eWxlICAgIDogXCJwcmVzZXJ2ZS0zZFwiLFxuICAgICAgICBiYWNrZmFjZVZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbiAgIDogJzUwJSA1MCUnXG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGx5IGJhc2ljIDNkIHByb3BzIGFuZCBzZXQgdW5pcXVlIHBlcnNwZWN0aXZlIGZvciBjaGlsZHJlblxuICAgKiBAcGFyYW0gZWxcbiAgICovXG4gIGFwcGx5VW5pcXVlM0RUb0VsZW1lbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgIFR3ZWVuTGl0ZS5zZXQoZWwsIHtcbiAgICAgIGNzczoge1xuICAgICAgICB0cmFuc2Zvcm1TdHlsZSAgICAgIDogXCJwcmVzZXJ2ZS0zZFwiLFxuICAgICAgICBiYWNrZmFjZVZpc2liaWxpdHkgIDogXCJoaWRkZW5cIixcbiAgICAgICAgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IDYwMCxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luICAgICA6ICc1MCUgNTAlJ1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn07XG4iLCJ2YXIgTWVzc2FnZUJveENyZWF0b3IgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9tZXNzYWdlQm94VmlldyA9IHJlcXVpcmUoJy4vTWVzc2FnZUJveFZpZXcnKTtcblxuICBmdW5jdGlvbiBhbGVydCh0aXRsZSwgbWVzc2FnZSwgbW9kYWwsIGNiKSB7XG4gICAgcmV0dXJuIF9tZXNzYWdlQm94Vmlldy5hZGQoe1xuICAgICAgdGl0bGUgIDogdGl0bGUsXG4gICAgICBjb250ZW50OiAnPHA+JyArIG1lc3NhZ2UgKyAnPC9wPicsXG4gICAgICB0eXBlICAgOiBfbWVzc2FnZUJveFZpZXcudHlwZSgpLkRBTkdFUixcbiAgICAgIG1vZGFsICA6IG1vZGFsLFxuICAgICAgd2lkdGggIDogNDAwLFxuICAgICAgYnV0dG9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGFiZWwgIDogJ0Nsb3NlJyxcbiAgICAgICAgICBpZCAgICAgOiAnQ2xvc2UnLFxuICAgICAgICAgIHR5cGUgICA6ICcnLFxuICAgICAgICAgIGljb24gICA6ICd0aW1lcycsXG4gICAgICAgICAgb25DbGljazogY2JcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybSh0aXRsZSwgbWVzc2FnZSwgb2tDQiwgbW9kYWwpIHtcbiAgICByZXR1cm4gX21lc3NhZ2VCb3hWaWV3LmFkZCh7XG4gICAgICB0aXRsZSAgOiB0aXRsZSxcbiAgICAgIGNvbnRlbnQ6ICc8cD4nICsgbWVzc2FnZSArICc8L3A+JyxcbiAgICAgIHR5cGUgICA6IF9tZXNzYWdlQm94Vmlldy50eXBlKCkuREVGQVVMVCxcbiAgICAgIG1vZGFsICA6IG1vZGFsLFxuICAgICAgd2lkdGggIDogNDAwLFxuICAgICAgYnV0dG9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdDYW5jZWwnLFxuICAgICAgICAgIGlkICAgOiAnQ2FuY2VsJyxcbiAgICAgICAgICB0eXBlIDogJ25lZ2F0aXZlJyxcbiAgICAgICAgICBpY29uIDogJ3RpbWVzJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWwgIDogJ1Byb2NlZWQnLFxuICAgICAgICAgIGlkICAgICA6ICdwcm9jZWVkJyxcbiAgICAgICAgICB0eXBlICAgOiAncG9zaXRpdmUnLFxuICAgICAgICAgIGljb24gICA6ICdjaGVjaycsXG4gICAgICAgICAgb25DbGljazogb2tDQlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9tcHQodGl0bGUsIG1lc3NhZ2UsIG9rQ0IsIG1vZGFsKSB7XG4gICAgcmV0dXJuIF9tZXNzYWdlQm94Vmlldy5hZGQoe1xuICAgICAgdGl0bGUgIDogdGl0bGUsXG4gICAgICBjb250ZW50OiAnPHAgY2xhc3M9XCJ0ZXh0LWNlbnRlciBwYWRkaW5nLWJvdHRvbS1kb3VibGVcIj4nICsgbWVzc2FnZSArICc8L3A+PHRleHRhcmVhIG5hbWU9XCJyZXNwb25zZVwiIGNsYXNzPVwiaW5wdXQtdGV4dFwiIHR5cGU9XCJ0ZXh0XCIgc3R5bGU9XCJ3aWR0aDo0MDBweDsgaGVpZ2h0Ojc1cHg7IHJlc2l6ZTogbm9uZVwiIGF1dG9mb2N1cz1cInRydWVcIj48L3RleHRhcmVhPicsXG4gICAgICB0eXBlICAgOiBfbWVzc2FnZUJveFZpZXcudHlwZSgpLkRFRkFVTFQsXG4gICAgICBtb2RhbCAgOiBtb2RhbCxcbiAgICAgIHdpZHRoICA6IDQ1MCxcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICBpZCAgIDogJ0NhbmNlbCcsXG4gICAgICAgICAgdHlwZSA6ICduZWdhdGl2ZScsXG4gICAgICAgICAgaWNvbiA6ICd0aW1lcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsICA6ICdQcm9jZWVkJyxcbiAgICAgICAgICBpZCAgICAgOiAncHJvY2VlZCcsXG4gICAgICAgICAgdHlwZSAgIDogJ3Bvc2l0aXZlJyxcbiAgICAgICAgICBpY29uICAgOiAnY2hlY2snLFxuICAgICAgICAgIG9uQ2xpY2s6IG9rQ0JcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hvaWNlKHRpdGxlLCBtZXNzYWdlLCBzZWxlY3Rpb25zLCBva0NCLCBtb2RhbCkge1xuICAgIHZhciBzZWxlY3RIVE1MID0gJzxzZWxlY3QgY2xhc3M9XCJzcGFjZWRcIiBzdHlsZT1cIndpZHRoOjQ1MHB4O2hlaWdodDoyMDBweFwiIG5hbWU9XCJzZWxlY3Rpb25cIiBhdXRvZm9jdXM9XCJ0cnVlXCIgc2l6ZT1cIjIwXCI+JztcblxuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAob3B0KSB7XG4gICAgICBzZWxlY3RIVE1MICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIG9wdC52YWx1ZSArICdcIiAnICsgKG9wdC5zZWxlY3RlZCA9PT0gJ3RydWUnID8gJ3NlbGVjdGVkJyA6ICcnKSArICc+JyArIG9wdC5sYWJlbCArICc8L29wdGlvbj4nO1xuICAgIH0pO1xuXG4gICAgc2VsZWN0SFRNTCArPSAnPC9zZWxlY3Q+JztcblxuICAgIHJldHVybiBfbWVzc2FnZUJveFZpZXcuYWRkKHtcbiAgICAgIHRpdGxlICA6IHRpdGxlLFxuICAgICAgY29udGVudDogJzxwIGNsYXNzPVwidGV4dC1jZW50ZXIgcGFkZGluZy1ib3R0b20tZG91YmxlXCI+JyArIG1lc3NhZ2UgKyAnPC9wPjxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPicgKyBzZWxlY3RIVE1MICsgJzwvZGl2PicsXG4gICAgICB0eXBlICAgOiBfbWVzc2FnZUJveFZpZXcudHlwZSgpLkRFRkFVTFQsXG4gICAgICBtb2RhbCAgOiBtb2RhbCxcbiAgICAgIHdpZHRoICA6IDUwMCxcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICBpZCAgIDogJ0NhbmNlbCcsXG4gICAgICAgICAgdHlwZSA6ICduZWdhdGl2ZScsXG4gICAgICAgICAgaWNvbiA6ICd0aW1lcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsICA6ICdPSycsXG4gICAgICAgICAgaWQgICAgIDogJ29rJyxcbiAgICAgICAgICB0eXBlICAgOiAncG9zaXRpdmUnLFxuICAgICAgICAgIGljb24gICA6ICdjaGVjaycsXG4gICAgICAgICAgb25DbGljazogb2tDQlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFsZXJ0ICA6IGFsZXJ0LFxuICAgIGNvbmZpcm06IGNvbmZpcm0sXG4gICAgcHJvbXB0IDogcHJvbXB0LFxuICAgIGNob2ljZSA6IGNob2ljZVxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lc3NhZ2VCb3hDcmVhdG9yKCk7IiwidmFyIE1lc3NhZ2VCb3hWaWV3ID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfY2hpbGRyZW4gICAgICAgICAgICAgICA9IFtdLFxuICAgICAgX2NvdW50ZXIgICAgICAgICAgICAgICAgPSAwLFxuICAgICAgX2hpZ2hlc3RaICAgICAgICAgICAgICAgPSAxMDAwLFxuICAgICAgX2RlZmF1bHRXaWR0aCAgICAgICAgICAgPSA0MDAsXG4gICAgICBfdHlwZXMgICAgICAgICAgICAgICAgICA9IHtcbiAgICAgICAgREVGQVVMVCAgICA6ICdkZWZhdWx0JyxcbiAgICAgICAgSU5GT1JNQVRJT046ICdpbmZvcm1hdGlvbicsXG4gICAgICAgIFNVQ0NFU1MgICAgOiAnc3VjY2VzcycsXG4gICAgICAgIFdBUk5JTkcgICAgOiAnd2FybmluZycsXG4gICAgICAgIERBTkdFUiAgICAgOiAnZGFuZ2VyJ1xuICAgICAgfSxcbiAgICAgIF90eXBlU3R5bGVNYXAgICAgICAgICAgID0ge1xuICAgICAgICAnZGVmYXVsdCcgICAgOiAnJyxcbiAgICAgICAgJ2luZm9ybWF0aW9uJzogJ21lc3NhZ2Vib3hfX2luZm9ybWF0aW9uJyxcbiAgICAgICAgJ3N1Y2Nlc3MnICAgIDogJ21lc3NhZ2Vib3hfX3N1Y2Nlc3MnLFxuICAgICAgICAnd2FybmluZycgICAgOiAnbWVzc2FnZWJveF9fd2FybmluZycsXG4gICAgICAgICdkYW5nZXInICAgICA6ICdtZXNzYWdlYm94X19kYW5nZXInXG4gICAgICB9LFxuICAgICAgX21vdW50UG9pbnQsXG4gICAgICBfYnV0dG9uSWNvblRlbXBsYXRlSUQgICA9ICd0ZW1wbGF0ZV9fbWVzc2FnZWJveC0tYnV0dG9uLWljb24nLFxuICAgICAgX2J1dHRvbk5vSWNvblRlbXBsYXRlSUQgPSAndGVtcGxhdGVfX21lc3NhZ2Vib3gtLWJ1dHRvbi1ub2ljb24nLFxuICAgICAgX3RlbXBsYXRlICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9ub3JpL3V0aWxzL1RlbXBsYXRpbmcuanMnKSxcbiAgICAgIF9tb2RhbCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9Nb2RhbENvdmVyVmlldy5qcycpLFxuICAgICAgX2Jyb3dzZXJJbmZvICAgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvYnJvd3Nlci9Ccm93c2VySW5mby5qcycpLFxuICAgICAgX2RvbVV0aWxzICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvYnJvd3Nlci9ET01VdGlscy5qcycpLFxuICAgICAgX2NvbXBvbmVudFV0aWxzICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvYnJvd3Nlci9UaHJlZURUcmFuc2Zvcm1zLmpzJyk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgYW5kIHNldCB0aGUgbW91bnQgcG9pbnQgLyBib3ggY29udGFpbmVyXG4gICAqIEBwYXJhbSBlbElEXG4gICAqL1xuICBmdW5jdGlvbiBpbml0aWFsaXplKGVsSUQpIHtcbiAgICBfbW91bnRQb2ludCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsSUQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBtZXNzYWdlIGJveFxuICAgKiBAcGFyYW0gaW5pdE9ialxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGFkZChpbml0T2JqKSB7XG4gICAgdmFyIHR5cGUgICA9IGluaXRPYmoudHlwZSB8fCBfdHlwZXMuREVGQVVMVCxcbiAgICAgICAgYm94T2JqID0gY3JlYXRlQm94T2JqZWN0KGluaXRPYmopO1xuXG4gICAgLy8gc2V0dXBcbiAgICBfY2hpbGRyZW4ucHVzaChib3hPYmopO1xuICAgIF9tb3VudFBvaW50LmFwcGVuZENoaWxkKGJveE9iai5lbGVtZW50KTtcbiAgICBhc3NpZ25UeXBlQ2xhc3NUb0VsZW1lbnQodHlwZSwgYm94T2JqLmVsZW1lbnQpO1xuICAgIGNvbmZpZ3VyZUJ1dHRvbnMoYm94T2JqKTtcblxuICAgIF9jb21wb25lbnRVdGlscy5hcHBseVVuaXF1ZTNEVG9FbGVtZW50KGJveE9iai5lbGVtZW50KTtcblxuICAgIC8vIFNldCAzZCBDU1MgcHJvcHMgZm9yIGluL291dCB0cmFuc2l0aW9uXG4gICAgVHdlZW5MaXRlLnNldChib3hPYmouZWxlbWVudCwge1xuICAgICAgY3NzOiB7XG4gICAgICAgIHpJbmRleDogX2hpZ2hlc3RaLFxuICAgICAgICB3aWR0aCA6IGluaXRPYmoud2lkdGggPyBpbml0T2JqLndpZHRoIDogX2RlZmF1bHRXaWR0aFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gY2VudGVyIGFmdGVyIHdpZHRoIGhhcyBiZWVuIHNldFxuICAgIF9kb21VdGlscy5jZW50ZXJFbGVtZW50SW5WaWV3UG9ydChib3hPYmouZWxlbWVudCk7XG5cbiAgICAvLyBNYWtlIGl0IGRyYWdnYWJsZVxuICAgIERyYWdnYWJsZS5jcmVhdGUoJyMnICsgYm94T2JqLmlkLCB7XG4gICAgICBib3VuZHMgOiB3aW5kb3csXG4gICAgICBvblByZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9oaWdoZXN0WiA9IERyYWdnYWJsZS56SW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTaG93IGl0XG4gICAgdHJhbnNpdGlvbkluKGJveE9iai5lbGVtZW50KTtcblxuICAgIC8vIFNob3cgdGhlIG1vZGFsIGNvdmVyXG4gICAgaWYgKGluaXRPYmoubW9kYWwpIHtcbiAgICAgIF9tb2RhbC5zaG93Tm9uRGlzbWlzc2FibGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJveE9iai5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ24gYSB0eXBlIGNsYXNzIHRvIGl0XG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqL1xuICBmdW5jdGlvbiBhc3NpZ25UeXBlQ2xhc3NUb0VsZW1lbnQodHlwZSwgZWxlbWVudCkge1xuICAgIGlmICh0eXBlICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgIF9kb21VdGlscy5hZGRDbGFzcyhlbGVtZW50LCBfdHlwZVN0eWxlTWFwW3R5cGVdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBvYmplY3QgZm9yIGEgYm94XG4gICAqIEBwYXJhbSBpbml0T2JqXG4gICAqIEByZXR1cm5zIHt7ZGF0YU9iajogKiwgaWQ6IHN0cmluZywgbW9kYWw6ICgqfGJvb2xlYW4pLCBlbGVtZW50OiAqLCBzdHJlYW1zOiBBcnJheX19XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVCb3hPYmplY3QoaW5pdE9iaikge1xuICAgIHZhciBpZCAgPSAnanNfX21lc3NhZ2Vib3gtJyArIChfY291bnRlcisrKS50b1N0cmluZygpLFxuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgZGF0YU9iajogaW5pdE9iaixcbiAgICAgICAgICBpZCAgICAgOiBpZCxcbiAgICAgICAgICBtb2RhbCAgOiBpbml0T2JqLm1vZGFsLFxuICAgICAgICAgIGVsZW1lbnQ6IF90ZW1wbGF0ZS5hc0VsZW1lbnQoJ3RlbXBsYXRlX19tZXNzYWdlYm94LS1kZWZhdWx0Jywge1xuICAgICAgICAgICAgaWQgICAgIDogaWQsXG4gICAgICAgICAgICB0aXRsZSAgOiBpbml0T2JqLnRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogaW5pdE9iai5jb250ZW50XG4gICAgICAgICAgfSksXG4gICAgICAgICAgc3RyZWFtczogW11cbiAgICAgICAgfTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVwIHRoZSBidXR0b25zXG4gICAqIEBwYXJhbSBib3hPYmpcbiAgICovXG4gIGZ1bmN0aW9uIGNvbmZpZ3VyZUJ1dHRvbnMoYm94T2JqKSB7XG4gICAgdmFyIGJ1dHRvbkRhdGEgPSBib3hPYmouZGF0YU9iai5idXR0b25zO1xuXG4gICAgLy8gZGVmYXVsdCBidXR0b24gaWYgbm9uZVxuICAgIGlmICghYnV0dG9uRGF0YSkge1xuICAgICAgYnV0dG9uRGF0YSA9IFt7XG4gICAgICAgIGxhYmVsOiAnQ2xvc2UnLFxuICAgICAgICB0eXBlIDogJycsXG4gICAgICAgIGljb24gOiAndGltZXMnLFxuICAgICAgICBpZCAgIDogJ2RlZmF1bHQtY2xvc2UnXG4gICAgICB9XTtcbiAgICB9XG5cbiAgICB2YXIgYnV0dG9uQ29udGFpbmVyID0gYm94T2JqLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlci1idXR0b25zJyk7XG5cbiAgICBfZG9tVXRpbHMucmVtb3ZlQWxsRWxlbWVudHMoYnV0dG9uQ29udGFpbmVyKTtcblxuICAgIGJ1dHRvbkRhdGEuZm9yRWFjaChmdW5jdGlvbiBtYWtlQnV0dG9uKGJ1dHRvbk9iaikge1xuICAgICAgYnV0dG9uT2JqLmlkID0gYm94T2JqLmlkICsgJy1idXR0b24tJyArIGJ1dHRvbk9iai5pZDtcblxuICAgICAgdmFyIGJ1dHRvbkVsO1xuXG4gICAgICBpZiAoYnV0dG9uT2JqLmhhc093blByb3BlcnR5KCdpY29uJykpIHtcbiAgICAgICAgYnV0dG9uRWwgPSBfdGVtcGxhdGUuYXNFbGVtZW50KF9idXR0b25JY29uVGVtcGxhdGVJRCwgYnV0dG9uT2JqKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbkVsID0gX3RlbXBsYXRlLmFzRWxlbWVudChfYnV0dG9uTm9JY29uVGVtcGxhdGVJRCwgYnV0dG9uT2JqKTtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbkVsKTtcblxuICAgICAgdmFyIGJ0blN0cmVhbSA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGJ1dHRvbkVsLCBfYnJvd3NlckluZm8ubW91c2VDbGlja0V2dFN0cigpKVxuICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoYnV0dG9uT2JqLmhhc093blByb3BlcnR5KCdvbkNsaWNrJykpIHtcbiAgICAgICAgICAgIGlmIChidXR0b25PYmoub25DbGljaykge1xuICAgICAgICAgICAgICBidXR0b25PYmoub25DbGljay5jYWxsKHRoaXMsIGNhcHR1cmVGb3JtRGF0YShib3hPYmouaWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVtb3ZlKGJveE9iai5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgYm94T2JqLnN0cmVhbXMucHVzaChidG5TdHJlYW0pO1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkYXRhIGZyb20gdGhlIGZvcm0gb24gdGhlIGJveCBjb250ZW50c1xuICAgKiBAcGFyYW0gYm94SURcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBjYXB0dXJlRm9ybURhdGEoYm94SUQpIHtcbiAgICByZXR1cm4gX2RvbVV0aWxzLmNhcHR1cmVGb3JtRGF0YShnZXRPYmpCeUlEKGJveElEKS5lbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBib3ggZnJvbSB0aGUgc2NyZWVuIC8gY29udGFpbmVyXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlKGlkKSB7XG4gICAgdmFyIGlkeCA9IGdldE9iakluZGV4QnlJRChpZCksXG4gICAgICAgIGJveE9iajtcblxuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgYm94T2JqID0gX2NoaWxkcmVuW2lkeF07XG4gICAgICB0cmFuc2l0aW9uT3V0KGJveE9iai5lbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGUgYm94XG4gICAqIEBwYXJhbSBlbFxuICAgKi9cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkluKGVsKSB7XG4gICAgVHdlZW5MaXRlLnRvKGVsLCAwLCB7YWxwaGE6IDAsIHJvdGF0aW9uWDogNDUsIHNjYWxlOiAyfSk7XG4gICAgVHdlZW5MaXRlLnRvKGVsLCAwLjUsIHtcbiAgICAgIGFscGhhICAgIDogMSxcbiAgICAgIHJvdGF0aW9uWDogMCxcbiAgICAgIHNjYWxlICAgIDogMSxcbiAgICAgIGVhc2UgICAgIDogQ2lyYy5lYXNlT3V0XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBib3hcbiAgICogQHBhcmFtIGVsXG4gICAqL1xuICBmdW5jdGlvbiB0cmFuc2l0aW9uT3V0KGVsKSB7XG4gICAgVHdlZW5MaXRlLnRvKGVsLCAwLjI1LCB7XG4gICAgICBhbHBoYSAgICA6IDAsXG4gICAgICByb3RhdGlvblg6IC00NSxcbiAgICAgIHNjYWxlICAgIDogMC4yNSxcbiAgICAgIGVhc2UgICAgIDogQ2lyYy5lYXNlSW4sIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb25UcmFuc2l0aW9uT3V0Q29tcGxldGUoZWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuIHVwIGFmdGVyIHRoZSB0cmFuc2l0aW9uIG91dCBhbmltYXRpb25cbiAgICogQHBhcmFtIGVsXG4gICAqL1xuICBmdW5jdGlvbiBvblRyYW5zaXRpb25PdXRDb21wbGV0ZShlbCkge1xuICAgIHZhciBpZHggICAgPSBnZXRPYmpJbmRleEJ5SUQoZWwuZ2V0QXR0cmlidXRlKCdpZCcpKSxcbiAgICAgICAgYm94T2JqID0gX2NoaWxkcmVuW2lkeF07XG5cbiAgICBib3hPYmouc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICAgIHN0cmVhbS5kaXNwb3NlKCk7XG4gICAgfSk7XG5cbiAgICBEcmFnZ2FibGUuZ2V0KCcjJyArIGJveE9iai5pZCkuZGlzYWJsZSgpO1xuXG4gICAgX21vdW50UG9pbnQucmVtb3ZlQ2hpbGQoZWwpO1xuXG4gICAgX2NoaWxkcmVuW2lkeF0gPSBudWxsO1xuICAgIF9jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcblxuICAgIGNoZWNrTW9kYWxTdGF0dXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgYW55IG9wZW4gYm94ZXMgaGF2ZSBtb2RhbCB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBjaGVja01vZGFsU3RhdHVzKCkge1xuICAgIHZhciBpc01vZGFsID0gZmFsc2U7XG5cbiAgICBfY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYm94T2JqKSB7XG4gICAgICBpZiAoYm94T2JqLm1vZGFsID09PSB0cnVlKSB7XG4gICAgICAgIGlzTW9kYWwgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFpc01vZGFsKSB7XG4gICAgICBfbW9kYWwuaGlkZSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSB0byBnZXQgdGhlIGJveCBvYmplY3QgaW5kZXggYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRPYmpJbmRleEJ5SUQoaWQpIHtcbiAgICByZXR1cm4gX2NoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIHJldHVybiBjaGlsZC5pZDtcbiAgICB9KS5pbmRleE9mKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IHRvIGdldCB0aGUgYm94IG9iamVjdCBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldE9iakJ5SUQoaWQpIHtcbiAgICByZXR1cm4gX2NoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIHJldHVybiBjaGlsZC5pZCA9PT0gaWQ7XG4gICAgfSlbMF07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlcygpIHtcbiAgICByZXR1cm4gX3R5cGVzO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplLFxuICAgIGFkZCAgICAgICA6IGFkZCxcbiAgICByZW1vdmUgICAgOiByZW1vdmUsXG4gICAgdHlwZSAgICAgIDogZ2V0VHlwZXNcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlQm94VmlldygpOyIsInZhciBNb2RhbENvdmVyVmlldyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX21vdW50UG9pbnQgID0gZG9jdW1lbnQsXG4gICAgICBfbW9kYWxDb3ZlckVsLFxuICAgICAgX21vZGFsQmFja2dyb3VuZEVsLFxuICAgICAgX21vZGFsQ2xvc2VCdXR0b25FbCxcbiAgICAgIF9tb2RhbENsaWNrU3RyZWFtLFxuICAgICAgX2lzVmlzaWJsZSxcbiAgICAgIF9ub3REaXNtaXNzYWJsZSxcbiAgICAgIF9icm93c2VySW5mbyA9IHJlcXVpcmUoJy4uLy4uL251ZG9ydS9icm93c2VyL0Jyb3dzZXJJbmZvLmpzJyk7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgIF9pc1Zpc2libGUgPSB0cnVlO1xuXG4gICAgX21vZGFsQ292ZXJFbCAgICAgICA9IF9tb3VudFBvaW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbF9fY292ZXInKTtcbiAgICBfbW9kYWxCYWNrZ3JvdW5kRWwgID0gX21vdW50UG9pbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19iYWNrZ3JvdW5kJyk7XG4gICAgX21vZGFsQ2xvc2VCdXR0b25FbCA9IF9tb3VudFBvaW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UtYnV0dG9uJyk7XG5cbiAgICB2YXIgbW9kYWxCR0NsaWNrICAgICA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KF9tb2RhbEJhY2tncm91bmRFbCwgX2Jyb3dzZXJJbmZvLm1vdXNlQ2xpY2tFdnRTdHIoKSksXG4gICAgICAgIG1vZGFsQnV0dG9uQ2xpY2sgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChfbW9kYWxDbG9zZUJ1dHRvbkVsLCBfYnJvd3NlckluZm8ubW91c2VDbGlja0V2dFN0cigpKTtcblxuICAgIF9tb2RhbENsaWNrU3RyZWFtID0gUnguT2JzZXJ2YWJsZS5tZXJnZShtb2RhbEJHQ2xpY2ssIG1vZGFsQnV0dG9uQ2xpY2spXG4gICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb25Nb2RhbENsaWNrKCk7XG4gICAgICB9KTtcblxuICAgIGhpZGUoZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SXNWaXNpYmxlKCkge1xuICAgIHJldHVybiBfaXNWaXNpYmxlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Nb2RhbENsaWNrKCkge1xuICAgIGlmIChfbm90RGlzbWlzc2FibGUpIHJldHVybjtcbiAgICBoaWRlKHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd01vZGFsQ292ZXIoc2hvdWxkQW5pbWF0ZSkge1xuICAgIF9pc1Zpc2libGUgICA9IHRydWU7XG4gICAgdmFyIGR1cmF0aW9uID0gc2hvdWxkQW5pbWF0ZSA/IDAuMjUgOiAwO1xuICAgIFR3ZWVuTGl0ZS50byhfbW9kYWxDb3ZlckVsLCBkdXJhdGlvbiwge1xuICAgICAgYXV0b0FscGhhOiAxLFxuICAgICAgZWFzZSAgICAgOiBRdWFkLmVhc2VPdXRcbiAgICB9KTtcbiAgICBUd2VlbkxpdGUudG8oX21vZGFsQmFja2dyb3VuZEVsLCBkdXJhdGlvbiwge1xuICAgICAgYWxwaGE6IDEsXG4gICAgICBlYXNlIDogUXVhZC5lYXNlT3V0XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93KHNob3VsZEFuaW1hdGUpIHtcbiAgICBpZiAoX2lzVmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIF9ub3REaXNtaXNzYWJsZSA9IGZhbHNlO1xuXG4gICAgc2hvd01vZGFsQ292ZXIoc2hvdWxkQW5pbWF0ZSk7XG5cbiAgICBUd2VlbkxpdGUuc2V0KF9tb2RhbENsb3NlQnV0dG9uRWwsIHtzY2FsZTogMiwgYWxwaGE6IDB9KTtcbiAgICBUd2VlbkxpdGUudG8oX21vZGFsQ2xvc2VCdXR0b25FbCwgMSwge1xuICAgICAgYXV0b0FscGhhOiAxLFxuICAgICAgc2NhbGUgICAgOiAxLFxuICAgICAgZWFzZSAgICAgOiBCb3VuY2UuZWFzZU91dCxcbiAgICAgIGRlbGF5ICAgIDogMVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgJ2hhcmQnIG1vZGFsIHZpZXcgY2Fubm90IGJlIGRpc21pc3NlZCB3aXRoIGEgY2xpY2ssIG11c3QgYmUgdmlhIGNvZGVcbiAgICogQHBhcmFtIHNob3VsZEFuaW1hdGVcbiAgICovXG4gIGZ1bmN0aW9uIHNob3dOb25EaXNtaXNzYWJsZShzaG91bGRBbmltYXRlKSB7XG4gICAgaWYgKF9pc1Zpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBfbm90RGlzbWlzc2FibGUgPSB0cnVlO1xuXG4gICAgc2hvd01vZGFsQ292ZXIoc2hvdWxkQW5pbWF0ZSk7XG4gICAgVHdlZW5MaXRlLnRvKF9tb2RhbENsb3NlQnV0dG9uRWwsIDAsIHthdXRvQWxwaGE6IDB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUoc2hvdWxkQW5pbWF0ZSkge1xuICAgIGlmICghX2lzVmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfaXNWaXNpYmxlICAgICAgPSBmYWxzZTtcbiAgICBfbm90RGlzbWlzc2FibGUgPSBmYWxzZTtcbiAgICB2YXIgZHVyYXRpb24gICAgPSBzaG91bGRBbmltYXRlID8gMC4yNSA6IDA7XG4gICAgVHdlZW5MaXRlLmtpbGxEZWxheWVkQ2FsbHNUbyhfbW9kYWxDbG9zZUJ1dHRvbkVsKTtcbiAgICBUd2VlbkxpdGUudG8oX21vZGFsQ292ZXJFbCwgZHVyYXRpb24sIHtcbiAgICAgIGF1dG9BbHBoYTogMCxcbiAgICAgIGVhc2UgICAgIDogUXVhZC5lYXNlT3V0XG4gICAgfSk7XG4gICAgVHdlZW5MaXRlLnRvKF9tb2RhbENsb3NlQnV0dG9uRWwsIGR1cmF0aW9uIC8gMiwge1xuICAgICAgYXV0b0FscGhhOiAwLFxuICAgICAgZWFzZSAgICAgOiBRdWFkLmVhc2VPdXRcbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gc2V0T3BhY2l0eShvcGFjaXR5KSB7XG4gICAgaWYgKG9wYWNpdHkgPCAwIHx8IG9wYWNpdHkgPiAxKSB7XG4gICAgICBjb25zb2xlLmxvZygnbnVkb3J1L2NvbXBvbmVudC9Nb2RhbENvdmVyVmlldzogc2V0T3BhY2l0eTogb3BhY2l0eSBzaG91bGQgYmUgYmV0d2VlbiAwIGFuZCAxJyk7XG4gICAgICBvcGFjaXR5ID0gMTtcbiAgICB9XG4gICAgVHdlZW5MaXRlLnRvKF9tb2RhbEJhY2tncm91bmRFbCwgMC4yNSwge1xuICAgICAgYWxwaGE6IG9wYWNpdHksXG4gICAgICBlYXNlIDogUXVhZC5lYXNlT3V0XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRDb2xvcihyLCBnLCBiKSB7XG4gICAgVHdlZW5MaXRlLnRvKF9tb2RhbEJhY2tncm91bmRFbCwgMC4yNSwge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnKScsXG4gICAgICBlYXNlICAgICAgICAgICA6IFF1YWQuZWFzZU91dFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplICAgICAgICA6IGluaXRpYWxpemUsXG4gICAgc2hvdyAgICAgICAgICAgICAgOiBzaG93LFxuICAgIHNob3dOb25EaXNtaXNzYWJsZTogc2hvd05vbkRpc21pc3NhYmxlLFxuICAgIGhpZGUgICAgICAgICAgICAgIDogaGlkZSxcbiAgICB2aXNpYmxlICAgICAgICAgICA6IGdldElzVmlzaWJsZSxcbiAgICBzZXRPcGFjaXR5ICAgICAgICA6IHNldE9wYWNpdHksXG4gICAgc2V0Q29sb3IgICAgICAgICAgOiBzZXRDb2xvclxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsQ292ZXJWaWV3KCk7IiwidmFyIFRvYXN0VmlldyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2NoaWxkcmVuICAgICAgICAgICAgICA9IFtdLFxuICAgICAgX2NvdW50ZXIgICAgICAgICAgICAgICA9IDAsXG4gICAgICBfZGVmYXVsdEV4cGlyZUR1cmF0aW9uID0gNzAwMCxcbiAgICAgIF90eXBlcyAgICAgICAgICAgICAgICAgPSB7XG4gICAgICAgIERFRkFVTFQgICAgOiAnZGVmYXVsdCcsXG4gICAgICAgIElORk9STUFUSU9OOiAnaW5mb3JtYXRpb24nLFxuICAgICAgICBTVUNDRVNTICAgIDogJ3N1Y2Nlc3MnLFxuICAgICAgICBXQVJOSU5HICAgIDogJ3dhcm5pbmcnLFxuICAgICAgICBEQU5HRVIgICAgIDogJ2RhbmdlcidcbiAgICAgIH0sXG4gICAgICBfdHlwZVN0eWxlTWFwICAgICAgICAgID0ge1xuICAgICAgICAnZGVmYXVsdCcgICAgOiAnJyxcbiAgICAgICAgJ2luZm9ybWF0aW9uJzogJ3RvYXN0X19pbmZvcm1hdGlvbicsXG4gICAgICAgICdzdWNjZXNzJyAgICA6ICd0b2FzdF9fc3VjY2VzcycsXG4gICAgICAgICd3YXJuaW5nJyAgICA6ICd0b2FzdF9fd2FybmluZycsXG4gICAgICAgICdkYW5nZXInICAgICA6ICd0b2FzdF9fZGFuZ2VyJ1xuICAgICAgfSxcbiAgICAgIF9tb3VudFBvaW50LFxuICAgICAgX3RlbXBsYXRlICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL25vcmkvdXRpbHMvVGVtcGxhdGluZy5qcycpLFxuICAgICAgX2Jyb3dzZXJJbmZvICAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL251ZG9ydS9icm93c2VyL0Jyb3dzZXJJbmZvLmpzJyksXG4gICAgICBfZG9tVXRpbHMgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vbnVkb3J1L2Jyb3dzZXIvRE9NVXRpbHMuanMnKSxcbiAgICAgIF9jb21wb25lbnRVdGlscyAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvYnJvd3Nlci9UaHJlZURUcmFuc2Zvcm1zLmpzJyk7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZShlbElEKSB7XG4gICAgX21vdW50UG9pbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbElEKTtcbiAgfVxuXG4gIC8vb2JqLnRpdGxlLCBvYmouY29udGVudCwgb2JqLnR5cGVcbiAgZnVuY3Rpb24gYWRkKGluaXRPYmopIHtcbiAgICBpbml0T2JqLnR5cGUgPSBpbml0T2JqLnR5cGUgfHwgX3R5cGVzLkRFRkFVTFQ7XG5cbiAgICB2YXIgdG9hc3RPYmogPSBjcmVhdGVUb2FzdE9iamVjdChpbml0T2JqLnRpdGxlLCBpbml0T2JqLm1lc3NhZ2UpO1xuXG4gICAgX2NoaWxkcmVuLnB1c2godG9hc3RPYmopO1xuXG4gICAgX21vdW50UG9pbnQuaW5zZXJ0QmVmb3JlKHRvYXN0T2JqLmVsZW1lbnQsIF9tb3VudFBvaW50LmZpcnN0Q2hpbGQpO1xuXG4gICAgYXNzaWduVHlwZUNsYXNzVG9FbGVtZW50KGluaXRPYmoudHlwZSwgdG9hc3RPYmouZWxlbWVudCk7XG5cbiAgICBfY29tcG9uZW50VXRpbHMuYXBwbHkzRFRvQ29udGFpbmVyKF9tb3VudFBvaW50KTtcbiAgICBfY29tcG9uZW50VXRpbHMuYXBwbHkzRFRvRWxlbWVudCh0b2FzdE9iai5lbGVtZW50KTtcblxuICAgIHZhciBjbG9zZUJ0biAgICAgICAgID0gdG9hc3RPYmouZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudG9hc3RfX2l0ZW0tY29udHJvbHMgPiBidXR0b24nKSxcbiAgICAgICAgY2xvc2VCdG5TdGVhbSAgICA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGNsb3NlQnRuLCBfYnJvd3NlckluZm8ubW91c2VDbGlja0V2dFN0cigpKSxcbiAgICAgICAgZXhwaXJlVGltZVN0cmVhbSA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoX2RlZmF1bHRFeHBpcmVEdXJhdGlvbik7XG5cbiAgICB0b2FzdE9iai5kZWZhdWx0QnV0dG9uU3RyZWFtID0gUnguT2JzZXJ2YWJsZS5tZXJnZShjbG9zZUJ0blN0ZWFtLCBleHBpcmVUaW1lU3RyZWFtKS50YWtlKDEpXG4gICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlKHRvYXN0T2JqLmlkKTtcbiAgICAgIH0pO1xuXG4gICAgdHJhbnNpdGlvbkluKHRvYXN0T2JqLmVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHRvYXN0T2JqLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNzaWduVHlwZUNsYXNzVG9FbGVtZW50KHR5cGUsIGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZSAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICBfZG9tVXRpbHMuYWRkQ2xhc3MoZWxlbWVudCwgX3R5cGVTdHlsZU1hcFt0eXBlXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVG9hc3RPYmplY3QodGl0bGUsIG1lc3NhZ2UpIHtcbiAgICB2YXIgaWQgID0gJ2pzX190b2FzdC10b2FzdGl0ZW0tJyArIChfY291bnRlcisrKS50b1N0cmluZygpLFxuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgaWQgICAgICAgICAgICAgICAgIDogaWQsXG4gICAgICAgICAgZWxlbWVudCAgICAgICAgICAgIDogX3RlbXBsYXRlLmFzRWxlbWVudCgndGVtcGxhdGVfX2NvbXBvbmVudC0tdG9hc3QnLCB7XG4gICAgICAgICAgICBpZCAgICAgOiBpZCxcbiAgICAgICAgICAgIHRpdGxlICA6IHRpdGxlLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGRlZmF1bHRCdXR0b25TdHJlYW06IG51bGxcbiAgICAgICAgfTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUoaWQpIHtcbiAgICB2YXIgaWR4ID0gZ2V0T2JqSW5kZXhCeUlEKGlkKSxcbiAgICAgICAgdG9hc3Q7XG5cbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHRvYXN0ID0gX2NoaWxkcmVuW2lkeF07XG4gICAgICByZWFycmFuZ2UoaWR4KTtcbiAgICAgIHRyYW5zaXRpb25PdXQodG9hc3QuZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkluKGVsKSB7XG4gICAgVHdlZW5MaXRlLnRvKGVsLCAwLCB7YWxwaGE6IDB9KTtcbiAgICBUd2VlbkxpdGUudG8oZWwsIDEsIHthbHBoYTogMSwgZWFzZTogUXVhZC5lYXNlT3V0fSk7XG4gICAgcmVhcnJhbmdlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uT3V0KGVsKSB7XG4gICAgVHdlZW5MaXRlLnRvKGVsLCAwLjI1LCB7XG4gICAgICByb3RhdGlvblg6IC00NSxcbiAgICAgIGFscGhhICAgIDogMCxcbiAgICAgIGVhc2UgICAgIDogUXVhZC5lYXNlSW4sIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb25UcmFuc2l0aW9uT3V0Q29tcGxldGUoZWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25UcmFuc2l0aW9uT3V0Q29tcGxldGUoZWwpIHtcbiAgICB2YXIgaWR4ICAgICAgICA9IGdldE9iakluZGV4QnlJRChlbC5nZXRBdHRyaWJ1dGUoJ2lkJykpLFxuICAgICAgICB0b2FzdE9iaiAgID0gX2NoaWxkcmVuW2lkeF07XG5cbiAgICB0b2FzdE9iai5kZWZhdWx0QnV0dG9uU3RyZWFtLmRpc3Bvc2UoKTtcblxuICAgIF9tb3VudFBvaW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICBfY2hpbGRyZW5baWR4XSA9IG51bGw7XG4gICAgX2NoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhcnJhbmdlKGlnbm9yZSkge1xuICAgIHZhciBpID0gX2NoaWxkcmVuLmxlbmd0aCAtIDEsXG4gICAgICAgIGN1cnJlbnQsXG4gICAgICAgIHkgPSAwO1xuXG4gICAgZm9yICg7IGkgPiAtMTsgaS0tKSB7XG4gICAgICBpZiAoaSA9PT0gaWdub3JlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IF9jaGlsZHJlbltpXTtcbiAgICAgIFR3ZWVuTGl0ZS50byhjdXJyZW50LmVsZW1lbnQsIDAuNzUsIHt5OiB5LCBlYXNlOiBCb3VuY2UuZWFzZU91dH0pO1xuICAgICAgeSArPSAxMCArIGN1cnJlbnQuZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T2JqSW5kZXhCeUlEKGlkKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQuaWQ7XG4gICAgfSkuaW5kZXhPZihpZCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlcygpIHtcbiAgICByZXR1cm4gX3R5cGVzO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplLFxuICAgIGFkZCAgICAgICA6IGFkZCxcbiAgICByZW1vdmUgICAgOiByZW1vdmUsXG4gICAgdHlwZSAgICAgIDogZ2V0VHlwZXNcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb2FzdFZpZXcoKTsiLCJ2YXIgVG9vbFRpcFZpZXcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9jaGlsZHJlbiAgICAgPSBbXSxcbiAgICAgIF9jb3VudGVyICAgICAgPSAwLFxuICAgICAgX2RlZmF1bHRXaWR0aCA9IDIwMCxcbiAgICAgIF90eXBlcyAgICAgICAgPSB7XG4gICAgICAgIERFRkFVTFQgICAgOiAnZGVmYXVsdCcsXG4gICAgICAgIElORk9STUFUSU9OOiAnaW5mb3JtYXRpb24nLFxuICAgICAgICBTVUNDRVNTICAgIDogJ3N1Y2Nlc3MnLFxuICAgICAgICBXQVJOSU5HICAgIDogJ3dhcm5pbmcnLFxuICAgICAgICBEQU5HRVIgICAgIDogJ2RhbmdlcicsXG4gICAgICAgIENPQUNITUFSSyAgOiAnY29hY2htYXJrJ1xuICAgICAgfSxcbiAgICAgIF90eXBlU3R5bGVNYXAgPSB7XG4gICAgICAgICdkZWZhdWx0JyAgICA6ICcnLFxuICAgICAgICAnaW5mb3JtYXRpb24nOiAndG9vbHRpcF9faW5mb3JtYXRpb24nLFxuICAgICAgICAnc3VjY2VzcycgICAgOiAndG9vbHRpcF9fc3VjY2VzcycsXG4gICAgICAgICd3YXJuaW5nJyAgICA6ICd0b29sdGlwX193YXJuaW5nJyxcbiAgICAgICAgJ2RhbmdlcicgICAgIDogJ3Rvb2x0aXBfX2RhbmdlcicsXG4gICAgICAgICdjb2FjaG1hcmsnICA6ICd0b29sdGlwX19jb2FjaG1hcmsnXG4gICAgICB9LFxuICAgICAgX3Bvc2l0aW9ucyAgICA9IHtcbiAgICAgICAgVCA6ICdUJyxcbiAgICAgICAgVFI6ICdUUicsXG4gICAgICAgIFIgOiAnUicsXG4gICAgICAgIEJSOiAnQlInLFxuICAgICAgICBCIDogJ0InLFxuICAgICAgICBCTDogJ0JMJyxcbiAgICAgICAgTCA6ICdMJyxcbiAgICAgICAgVEw6ICdUTCdcbiAgICAgIH0sXG4gICAgICBfcG9zaXRpb25NYXAgID0ge1xuICAgICAgICAnVCcgOiAndG9vbHRpcF9fdG9wJyxcbiAgICAgICAgJ1RSJzogJ3Rvb2x0aXBfX3RvcHJpZ2h0JyxcbiAgICAgICAgJ1InIDogJ3Rvb2x0aXBfX3JpZ2h0JyxcbiAgICAgICAgJ0JSJzogJ3Rvb2x0aXBfX2JvdHRvbXJpZ2h0JyxcbiAgICAgICAgJ0InIDogJ3Rvb2x0aXBfX2JvdHRvbScsXG4gICAgICAgICdCTCc6ICd0b29sdGlwX19ib3R0b21sZWZ0JyxcbiAgICAgICAgJ0wnIDogJ3Rvb2x0aXBfX2xlZnQnLFxuICAgICAgICAnVEwnOiAndG9vbHRpcF9fdG9wbGVmdCdcbiAgICAgIH0sXG4gICAgICBfbW91bnRQb2ludCxcbiAgICAgIF90ZW1wbGF0ZSAgICAgPSByZXF1aXJlKCcuLi8uLi9ub3JpL3V0aWxzL1RlbXBsYXRpbmcuanMnKSxcbiAgICAgIF9kb21VdGlscyAgICAgPSByZXF1aXJlKCcuLi8uLi9udWRvcnUvYnJvd3Nlci9ET01VdGlscy5qcycpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoZWxJRCkge1xuICAgIF9tb3VudFBvaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxJRCk7XG4gIH1cblxuICAvL29iai50aXRsZSwgb2JqLmNvbnRlbnQsIG9iai50eXBlLCBvYmoudGFyZ2V0LCBvYmoucG9zaXRpb25cbiAgZnVuY3Rpb24gYWRkKGluaXRPYmopIHtcbiAgICBpbml0T2JqLnR5cGUgPSBpbml0T2JqLnR5cGUgfHwgX3R5cGVzLkRFRkFVTFQ7XG5cbiAgICB2YXIgdG9vbHRpcE9iaiA9IGNyZWF0ZVRvb2xUaXBPYmplY3QoaW5pdE9iai50aXRsZSxcbiAgICAgIGluaXRPYmouY29udGVudCxcbiAgICAgIGluaXRPYmoucG9zaXRpb24sXG4gICAgICBpbml0T2JqLnRhcmdldEVsLFxuICAgICAgaW5pdE9iai5ndXR0ZXIsXG4gICAgICBpbml0T2JqLmFsd2F5c1Zpc2libGUpO1xuXG4gICAgX2NoaWxkcmVuLnB1c2godG9vbHRpcE9iaik7XG4gICAgX21vdW50UG9pbnQuYXBwZW5kQ2hpbGQodG9vbHRpcE9iai5lbGVtZW50KTtcblxuICAgIHRvb2x0aXBPYmouYXJyb3dFbCA9IHRvb2x0aXBPYmouZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3cnKTtcbiAgICBhc3NpZ25UeXBlQ2xhc3NUb0VsZW1lbnQoaW5pdE9iai50eXBlLCBpbml0T2JqLnBvc2l0aW9uLCB0b29sdGlwT2JqLmVsZW1lbnQpO1xuXG4gICAgVHdlZW5MaXRlLnNldCh0b29sdGlwT2JqLmVsZW1lbnQsIHtcbiAgICAgIGNzczoge1xuICAgICAgICBhdXRvQWxwaGE6IHRvb2x0aXBPYmouYWx3YXlzVmlzaWJsZSA/IDEgOiAwLFxuICAgICAgICB3aWR0aCAgICA6IGluaXRPYmoud2lkdGggPyBpbml0T2JqLndpZHRoIDogX2RlZmF1bHRXaWR0aFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gY2FjaGUgdGhlc2UgdmFsdWVzLCAzZCB0cmFuc2Zvcm1zIHdpbGwgYWx0ZXIgc2l6ZVxuICAgIHRvb2x0aXBPYmoud2lkdGggID0gdG9vbHRpcE9iai5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIHRvb2x0aXBPYmouaGVpZ2h0ID0gdG9vbHRpcE9iai5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICAgIGFzc2lnbkV2ZW50c1RvVGFyZ2V0RWwodG9vbHRpcE9iaik7XG4gICAgcG9zaXRpb25Ub29sVGlwKHRvb2x0aXBPYmopO1xuXG4gICAgaWYgKHRvb2x0aXBPYmoucG9zaXRpb24gPT09IF9wb3NpdGlvbnMuTCB8fCB0b29sdGlwT2JqLnBvc2l0aW9uID09PSBfcG9zaXRpb25zLlIpIHtcbiAgICAgIGNlbnRlckFycm93VmVydGljYWxseSh0b29sdGlwT2JqKTtcbiAgICB9XG5cbiAgICBpZiAodG9vbHRpcE9iai5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9ucy5UIHx8IHRvb2x0aXBPYmoucG9zaXRpb24gPT09IF9wb3NpdGlvbnMuQikge1xuICAgICAgY2VudGVyQXJyb3dIb3Jpem9udGFsbHkodG9vbHRpcE9iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvb2x0aXBPYmouZWxlbWVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzc2lnblR5cGVDbGFzc1RvRWxlbWVudCh0eXBlLCBwb3NpdGlvbiwgZWxlbWVudCkge1xuICAgIGlmICh0eXBlICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgIF9kb21VdGlscy5hZGRDbGFzcyhlbGVtZW50LCBfdHlwZVN0eWxlTWFwW3R5cGVdKTtcbiAgICB9XG4gICAgX2RvbVV0aWxzLmFkZENsYXNzKGVsZW1lbnQsIF9wb3NpdGlvbk1hcFtwb3NpdGlvbl0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVG9vbFRpcE9iamVjdCh0aXRsZSwgbWVzc2FnZSwgcG9zaXRpb24sIHRhcmdldCwgZ3V0dGVyLCBhbHdheXNWaXNpYmxlKSB7XG4gICAgdmFyIGlkICA9ICdqc19fdG9vbHRpcC10b29sdGlwaXRlbS0nICsgKF9jb3VudGVyKyspLnRvU3RyaW5nKCksXG4gICAgICAgIG9iaiA9IHtcbiAgICAgICAgICBpZCAgICAgICAgICAgOiBpZCxcbiAgICAgICAgICBwb3NpdGlvbiAgICAgOiBwb3NpdGlvbixcbiAgICAgICAgICB0YXJnZXRFbCAgICAgOiB0YXJnZXQsXG4gICAgICAgICAgYWx3YXlzVmlzaWJsZTogYWx3YXlzVmlzaWJsZSB8fCBmYWxzZSxcbiAgICAgICAgICBndXR0ZXIgICAgICAgOiBndXR0ZXIgfHwgMTUsXG4gICAgICAgICAgZWxPdmVyU3RyZWFtIDogbnVsbCxcbiAgICAgICAgICBlbE91dFN0cmVhbSAgOiBudWxsLFxuICAgICAgICAgIGhlaWdodCAgICAgICA6IDAsXG4gICAgICAgICAgd2lkdGggICAgICAgIDogMCxcbiAgICAgICAgICBlbGVtZW50ICAgICAgOiBfdGVtcGxhdGUuYXNFbGVtZW50KCd0ZW1wbGF0ZV9fY29tcG9uZW50LS10b29sdGlwJywge1xuICAgICAgICAgICAgaWQgICAgIDogaWQsXG4gICAgICAgICAgICB0aXRsZSAgOiB0aXRsZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBhcnJvd0VsICAgICAgOiBudWxsXG4gICAgICAgIH07XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNzaWduRXZlbnRzVG9UYXJnZXRFbCh0b29sdGlwT2JqKSB7XG4gICAgaWYgKHRvb2x0aXBPYmouYWx3YXlzVmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvb2x0aXBPYmouZWxPdmVyU3RyZWFtID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQodG9vbHRpcE9iai50YXJnZXRFbCwgJ21vdXNlb3ZlcicpXG4gICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgc2hvd1Rvb2xUaXAodG9vbHRpcE9iai5pZCk7XG4gICAgICB9KTtcblxuICAgIHRvb2x0aXBPYmouZWxPdXRTdHJlYW0gPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudCh0b29sdGlwT2JqLnRhcmdldEVsLCAnbW91c2VvdXQnKVxuICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGhpZGVUb29sVGlwKHRvb2x0aXBPYmouaWQpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93VG9vbFRpcChpZCkge1xuICAgIHZhciB0b29sdGlwT2JqID0gZ2V0T2JqQnlJRChpZCk7XG5cbiAgICBpZiAodG9vbHRpcE9iai5hbHdheXNWaXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcG9zaXRpb25Ub29sVGlwKHRvb2x0aXBPYmopO1xuICAgIHRyYW5zaXRpb25Jbih0b29sdGlwT2JqLmVsZW1lbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zaXRpb25Ub29sVGlwKHRvb2x0aXBPYmopIHtcbiAgICB2YXIgZ3V0dGVyICAgPSB0b29sdGlwT2JqLmd1dHRlcixcbiAgICAgICAgeFBvcyAgICAgPSAwLFxuICAgICAgICB5UG9zICAgICA9IDAsXG4gICAgICAgIHRndFByb3BzID0gdG9vbHRpcE9iai50YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmICh0b29sdGlwT2JqLnBvc2l0aW9uID09PSBfcG9zaXRpb25zLlRMKSB7XG4gICAgICB4UG9zID0gdGd0UHJvcHMubGVmdCAtIHRvb2x0aXBPYmoud2lkdGg7XG4gICAgICB5UG9zID0gdGd0UHJvcHMudG9wIC0gdG9vbHRpcE9iai5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmICh0b29sdGlwT2JqLnBvc2l0aW9uID09PSBfcG9zaXRpb25zLlQpIHtcbiAgICAgIHhQb3MgPSB0Z3RQcm9wcy5sZWZ0ICsgKCh0Z3RQcm9wcy53aWR0aCAvIDIpIC0gKHRvb2x0aXBPYmoud2lkdGggLyAyKSk7XG4gICAgICB5UG9zID0gdGd0UHJvcHMudG9wIC0gdG9vbHRpcE9iai5oZWlnaHQgLSBndXR0ZXI7XG4gICAgfSBlbHNlIGlmICh0b29sdGlwT2JqLnBvc2l0aW9uID09PSBfcG9zaXRpb25zLlRSKSB7XG4gICAgICB4UG9zID0gdGd0UHJvcHMucmlnaHQ7XG4gICAgICB5UG9zID0gdGd0UHJvcHMudG9wIC0gdG9vbHRpcE9iai5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmICh0b29sdGlwT2JqLnBvc2l0aW9uID09PSBfcG9zaXRpb25zLlIpIHtcbiAgICAgIHhQb3MgPSB0Z3RQcm9wcy5yaWdodCArIGd1dHRlcjtcbiAgICAgIHlQb3MgPSB0Z3RQcm9wcy50b3AgKyAoKHRndFByb3BzLmhlaWdodCAvIDIpIC0gKHRvb2x0aXBPYmouaGVpZ2h0IC8gMikpO1xuICAgIH0gZWxzZSBpZiAodG9vbHRpcE9iai5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9ucy5CUikge1xuICAgICAgeFBvcyA9IHRndFByb3BzLnJpZ2h0O1xuICAgICAgeVBvcyA9IHRndFByb3BzLmJvdHRvbTtcbiAgICB9IGVsc2UgaWYgKHRvb2x0aXBPYmoucG9zaXRpb24gPT09IF9wb3NpdGlvbnMuQikge1xuICAgICAgeFBvcyA9IHRndFByb3BzLmxlZnQgKyAoKHRndFByb3BzLndpZHRoIC8gMikgLSAodG9vbHRpcE9iai53aWR0aCAvIDIpKTtcbiAgICAgIHlQb3MgPSB0Z3RQcm9wcy5ib3R0b20gKyBndXR0ZXI7XG4gICAgfSBlbHNlIGlmICh0b29sdGlwT2JqLnBvc2l0aW9uID09PSBfcG9zaXRpb25zLkJMKSB7XG4gICAgICB4UG9zID0gdGd0UHJvcHMubGVmdCAtIHRvb2x0aXBPYmoud2lkdGg7XG4gICAgICB5UG9zID0gdGd0UHJvcHMuYm90dG9tO1xuICAgIH0gZWxzZSBpZiAodG9vbHRpcE9iai5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9ucy5MKSB7XG4gICAgICB4UG9zID0gdGd0UHJvcHMubGVmdCAtIHRvb2x0aXBPYmoud2lkdGggLSBndXR0ZXI7XG4gICAgICB5UG9zID0gdGd0UHJvcHMudG9wICsgKCh0Z3RQcm9wcy5oZWlnaHQgLyAyKSAtICh0b29sdGlwT2JqLmhlaWdodCAvIDIpKTtcbiAgICB9XG5cbiAgICBUd2VlbkxpdGUuc2V0KHRvb2x0aXBPYmouZWxlbWVudCwge1xuICAgICAgeDogeFBvcyxcbiAgICAgIHk6IHlQb3NcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlckFycm93SG9yaXpvbnRhbGx5KHRvb2x0aXBPYmopIHtcbiAgICB2YXIgYXJyb3dQcm9wcyA9IHRvb2x0aXBPYmouYXJyb3dFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBUd2VlbkxpdGUuc2V0KHRvb2x0aXBPYmouYXJyb3dFbCwge3g6ICh0b29sdGlwT2JqLndpZHRoIC8gMikgLSAoYXJyb3dQcm9wcy53aWR0aCAvIDIpfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjZW50ZXJBcnJvd1ZlcnRpY2FsbHkodG9vbHRpcE9iaikge1xuICAgIHZhciBhcnJvd1Byb3BzID0gdG9vbHRpcE9iai5hcnJvd0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIFR3ZWVuTGl0ZS5zZXQodG9vbHRpcE9iai5hcnJvd0VsLCB7eTogKHRvb2x0aXBPYmouaGVpZ2h0IC8gMikgLSAoYXJyb3dQcm9wcy5oZWlnaHQgLyAyKSAtIDJ9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVUb29sVGlwKGlkKSB7XG4gICAgdmFyIHRvb2x0aXBPYmogPSBnZXRPYmpCeUlEKGlkKTtcblxuICAgIGlmICh0b29sdGlwT2JqLmFsd2F5c1Zpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uT3V0KHRvb2x0aXBPYmouZWxlbWVudCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uSW4oZWwpIHtcbiAgICBUd2VlbkxpdGUudG8oZWwsIDAuNSwge1xuICAgICAgYXV0b0FscGhhOiAxLFxuICAgICAgZWFzZSAgICAgOiBDaXJjLmVhc2VPdXRcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25PdXQoZWwpIHtcbiAgICBUd2VlbkxpdGUudG8oZWwsIDAuMDUsIHtcbiAgICAgIGF1dG9BbHBoYTogMCxcbiAgICAgIGVhc2UgICAgIDogQ2lyYy5lYXNlT3V0XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUoZWwpIHtcbiAgICBnZXRPYmpCeUVsZW1lbnQoZWwpLmZvckVhY2goZnVuY3Rpb24gKHRvb2x0aXApIHtcbiAgICAgIGlmICh0b29sdGlwLmVsT3ZlclN0cmVhbSkge1xuICAgICAgICB0b29sdGlwLmVsT3ZlclN0cmVhbS5kaXNwb3NlKCk7XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcC5lbE91dFN0cmVhbSkge1xuICAgICAgICB0b29sdGlwLmVsT3V0U3RyZWFtLmRpc3Bvc2UoKTtcbiAgICAgIH1cblxuICAgICAgVHdlZW5MaXRlLmtpbGxEZWxheWVkQ2FsbHNUbyh0b29sdGlwLmVsZW1lbnQpO1xuXG4gICAgICBfbW91bnRQb2ludC5yZW1vdmVDaGlsZCh0b29sdGlwLmVsZW1lbnQpO1xuXG4gICAgICB2YXIgaWR4ID0gZ2V0T2JqSW5kZXhCeUlEKHRvb2x0aXAuaWQpO1xuXG4gICAgICBfY2hpbGRyZW5baWR4XSA9IG51bGw7XG4gICAgICBfY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPYmpCeUlEKGlkKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQuaWQgPT09IGlkO1xuICAgIH0pWzBdO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T2JqSW5kZXhCeUlEKGlkKSB7XG4gICAgcmV0dXJuIF9jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQuaWQ7XG4gICAgfSkuaW5kZXhPZihpZCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPYmpCeUVsZW1lbnQoZWwpIHtcbiAgICByZXR1cm4gX2NoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIHJldHVybiBjaGlsZC50YXJnZXRFbCA9PT0gZWw7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlcygpIHtcbiAgICByZXR1cm4gX3R5cGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UG9zaXRpb25zKCkge1xuICAgIHJldHVybiBfcG9zaXRpb25zO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplLFxuICAgIGFkZCAgICAgICA6IGFkZCxcbiAgICByZW1vdmUgICAgOiByZW1vdmUsXG4gICAgdHlwZSAgICAgIDogZ2V0VHlwZXMsXG4gICAgcG9zaXRpb24gIDogZ2V0UG9zaXRpb25zXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbFRpcFZpZXcoKTsiLCJ2YXIgX251bWJlclV0aWxzID0gcmVxdWlyZSgnLi9OdW1iZXJVdGlscy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvLyBSZWZlcmVuY2U6IGh0dHA6Ly9qaHVzYWluLmdpdGh1Yi5pby9sZWFybnJ4L2luZGV4Lmh0bWxcbiAgbWVyZ2VBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJBcnIpIHtcbiAgICAgIHN1YkFyci5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGVsbSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9LFxuXG4gIC8vIGh0dHA6Ly93d3cuc2hhbWFzaXMubmV0LzIwMDkvMDkvZmFzdC1hbGdvcml0aG0tdG8tZmluZC11bmlxdWUtaXRlbXMtaW4tamF2YXNjcmlwdC1hcnJheS9cbiAgdW5pcXVlOiBmdW5jdGlvbiAoYXJyeSkge1xuICAgIHZhciBvID0ge30sXG4gICAgICAgIGksXG4gICAgICAgIGwgPSBhcnJ5Lmxlbmd0aCxcbiAgICAgICAgciA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDEpIHtcbiAgICAgIG9bYXJyeVtpXV0gPSBhcnJ5W2ldO1xuICAgIH1cbiAgICBmb3IgKGkgaW4gbykge1xuICAgICAgci5wdXNoKG9baV0pO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfSxcblxuICByZW1vdmVJbmRleDogZnVuY3Rpb24gKGFyciwgaWR4KSB7XG4gICAgcmV0dXJuIGFyci5zcGxpY2UoaWR4LCAxKTtcbiAgfSxcblxuICByZW1vdmVJdGVtOiBmdW5jdGlvbiAoYXJyLCBpdGVtKSB7XG4gICAgdmFyIGlkeCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgYXJyLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfSxcblxuICBybmRFbGVtZW50OiBmdW5jdGlvbiAoYXJyeSkge1xuICAgIHJldHVybiBhcnJ5W19udW1iZXJVdGlscy5ybmROdW1iZXIoMCwgYXJyeS5sZW5ndGggLSAxKV07XG4gIH0sXG5cbiAgZ2V0UmFuZG9tU2V0T2ZFbGVtZW50czogZnVuY3Rpb24gKHNyY2FycnksIG1heCkge1xuICAgIHZhciBhcnJ5ID0gW10sXG4gICAgICAgIGkgICAgPSAwLFxuICAgICAgICBsZW4gID0gX251bWJlclV0aWxzLnJuZE51bWJlcigxLCBtYXgpO1xuXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJyeS5wdXNoKHRoaXMucm5kRWxlbWVudChzcmNhcnJ5KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycnk7XG4gIH0sXG5cbiAgZ2V0RGlmZmVyZW5jZXM6IGZ1bmN0aW9uIChhcnIxLCBhcnIyKSB7XG4gICAgdmFyIGRpZiA9IFtdO1xuXG4gICAgYXJyMS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdmFyIHByZXNlbnQgPSBmYWxzZSxcbiAgICAgICAgICBpICAgICAgID0gMCxcbiAgICAgICAgICBsZW4gICAgID0gYXJyMi5sZW5ndGg7XG5cbiAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBhcnIyW2ldKSB7XG4gICAgICAgICAgcHJlc2VudCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFwcmVzZW50KSB7XG4gICAgICAgIGRpZi5wdXNoKHZhbHVlKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpZjtcbiAgfVxuXG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGlzSW50ZWdlcjogZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiAoL14tP1xcZCskLy50ZXN0KHN0cikpO1xuICB9LFxuXG4gIHJuZE51bWJlcjogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIH0sXG5cbiAgY2xhbXA6IGZ1bmN0aW9uICh2YWwsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2YWwpKTtcbiAgfSxcblxuICBpblJhbmdlOiBmdW5jdGlvbiAodmFsLCBtaW4sIG1heCkge1xuICAgIHJldHVybiB2YWwgPiBtaW4gJiYgdmFsIDwgbWF4O1xuICB9LFxuXG4gIGRpc3RhbmNlVEw6IGZ1bmN0aW9uIChwb2ludDEsIHBvaW50Mikge1xuICAgIHZhciB4ZCA9IChwb2ludDIubGVmdCAtIHBvaW50MS5sZWZ0KSxcbiAgICAgICAgeWQgPSAocG9pbnQyLnRvcCAtIHBvaW50MS50b3ApO1xuICAgIHJldHVybiBNYXRoLnNxcnQoKHhkICogeGQpICsgKHlkICogeWQpKTtcbiAgfVxuXG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qKlxuICAgKiBUZXN0IGZvclxuICAgKiBPYmplY3Qge1wiXCI6IHVuZGVmaW5lZH1cbiAgICogT2JqZWN0IHt1bmRlZmluZWQ6IHVuZGVmaW5lZH1cbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzTnVsbDogZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBpc251bGwgPSBmYWxzZTtcblxuICAgIGlmIChpcy5mYWxzZXkob2JqKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQgfHwgb2JqW3Byb3BdID09PSB1bmRlZmluZWQpIGlzbnVsbCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gaXNudWxsO1xuICB9LFxuXG4gIGR5bmFtaWNTb3J0OiBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBhW3Byb3BlcnR5XSA8IGJbcHJvcGVydHldID8gLTEgOiBhW3Byb3BlcnR5XSA+IGJbcHJvcGVydHldID8gMSA6IDA7XG4gICAgfTtcbiAgfSxcblxuICBzZWFyY2hPYmplY3RzOiBmdW5jdGlvbiAob2JqLCBrZXksIHZhbCkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvYmplY3RzID0gb2JqZWN0cy5jb25jYXQoc2VhcmNoT2JqZWN0cyhvYmpbaV0sIGtleSwgdmFsKSk7XG4gICAgICB9IGVsc2UgaWYgKGkgPT09IGtleSAmJiBvYmpba2V5XSA9PT0gdmFsKSB7XG4gICAgICAgIG9iamVjdHMucHVzaChvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cztcbiAgfSxcblxuICBnZXRPYmplY3RGcm9tU3RyaW5nOiBmdW5jdGlvbiAob2JqLCBzdHIpIHtcbiAgICB2YXIgaSAgICA9IDAsXG4gICAgICAgIHBhdGggPSBzdHIuc3BsaXQoJy4nKSxcbiAgICAgICAgbGVuICA9IHBhdGgubGVuZ3RoO1xuXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgb2JqID0gb2JqW3BhdGhbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9LFxuXG4gIGdldE9iamVjdEluZGV4RnJvbUlkOiBmdW5jdGlvbiAob2JqLCBpZCkge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIG9ialtpXSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygb2JqW2ldLmlkICE9PSBcInVuZGVmaW5lZFwiICYmIG9ialtpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLy8gZXh0ZW5kIGFuZCBkZWVwIGV4dGVuZCBmcm9tIGh0dHA6Ly95b3VtaWdodG5vdG5lZWRqcXVlcnkuY29tL1xuICBleHRlbmQ6IGZ1bmN0aW9uIChvdXQpIHtcbiAgICBvdXQgPSBvdXQgfHwge307XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFhcmd1bWVudHNbaV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgb3V0W2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH0sXG5cbiAgZGVlcEV4dGVuZDogZnVuY3Rpb24gKG91dCkge1xuICAgIG91dCA9IG91dCB8fCB7fTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBpZiAoIW9iaikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZGVlcEV4dGVuZChvdXRba2V5XSwgb2JqW2tleV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNpbXBsaWZpZWQgaW1wbGVtZW50YXRpb24gb2YgU3RhbXBzIC0gaHR0cDovL2VyaWNsZWFkcy5jb20vMjAxNC8wMi9wcm90b3R5cGFsLWluaGVyaXRhbmNlLXdpdGgtc3RhbXBzL1xuICAgKiBodHRwczovL3d3dy5iYXJrd2ViLmNvLnVrL2Jsb2cvb2JqZWN0LWNvbXBvc2l0aW9uLWFuZC1wcm90b3R5cGljYWwtaW5oZXJpdGFuY2UtaW4tamF2YXNjcmlwdFxuICAgKlxuICAgKiBQcm90b3R5cGUgb2JqZWN0IHJlcXVpcmVzIGEgbWV0aG9kcyBvYmplY3QsIHByaXZhdGUgY2xvc3VyZXMgYW5kIHN0YXRlIGlzIG9wdGlvbmFsXG4gICAqXG4gICAqIEBwYXJhbSBwcm90b3R5cGVcbiAgICogQHJldHVybnMgTmV3IG9iamVjdCB1c2luZyBwcm90b3R5cGUubWV0aG9kcyBhcyBzb3VyY2VcbiAgICovXG4gIGJhc2ljRmFjdG9yeTogZnVuY3Rpb24gKHByb3RvdHlwZSkge1xuICAgIHZhciBwcm90byA9IHByb3RvdHlwZSxcbiAgICAgICAgb2JqICAgPSBPYmplY3QuY3JlYXRlKHByb3RvLm1ldGhvZHMpO1xuXG4gICAgaWYgKHByb3RvLmhhc093blByb3BlcnR5KCdjbG9zdXJlJykpIHtcbiAgICAgIHByb3RvLmNsb3N1cmVzLmZvckVhY2goZnVuY3Rpb24gKGNsb3N1cmUpIHtcbiAgICAgICAgY2xvc3VyZS5jYWxsKG9iaik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJvdG8uaGFzT3duUHJvcGVydHkoJ3N0YXRlJykpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm90by5zdGF0ZSkge1xuICAgICAgICBvYmpba2V5XSA9IHByb3RvLnN0YXRlW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfSxcblxuICAvKipcbiAgICogQ29weXJpZ2h0IDIwMTMtMjAxNCBGYWNlYm9vaywgSW5jLlxuICAgKlxuICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgKlxuICAgKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAgICpcbiAgICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICAgKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gICAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICAgKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gICAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICAgKlxuICAgKi9cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICAgKlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vU1RSTUwva2V5bWlycm9yXG4gICAqXG4gICAqIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICAgKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gICAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICAgKlxuICAgKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICAgKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAgICpcbiAgICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICAgKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKi9cbiAga2V5TWlycm9yOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHJldCA9IHt9O1xuICAgIHZhciBrZXk7XG4gICAgaWYgKCEob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgcmV0W2tleV0gPSBrZXk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxuICBjYXBpdGFsaXplRmlyc3RMZXR0ZXI6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTtcbiAgfSxcblxuICB0b1RpdGxlQ2FzZTogZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFx3XFxTKi9nLCBmdW5jdGlvbiAodHh0KSB7XG4gICAgICByZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKTtcbiAgICB9KTtcbiAgfSxcblxuICByZW1vdmVUYWdzOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oPChbXj5dKyk+KS9pZywgJycpO1xuICB9LFxuXG4gIGVsbGlwc2VzOiBmdW5jdGlvbiAobGVuKSB7XG4gICAgcmV0dXJuICh0aGlzLmxlbmd0aCA+IGxlbikgPyB0aGlzLnN1YnN0cigwLCBsZW4pICsgXCIuLi5cIiA6IHRoaXM7XG4gIH1cblxufTsiXX0=
