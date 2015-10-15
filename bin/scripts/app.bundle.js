(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionActionCreatorJs = require('./action/ActionCreator.js');

var _actionActionCreatorJs2 = _interopRequireDefault(_actionActionCreatorJs);

var _actionActionConstantsJs = require('./action/ActionConstants.js');

var _actionActionConstantsJs2 = _interopRequireDefault(_actionActionConstantsJs);

var _noriActionActionCreatorJs = require('../nori/action/ActionCreator.js');

var _noriActionActionCreatorJs2 = _interopRequireDefault(_noriActionActionCreatorJs);

var _storeAppStoreJs = require('./store/AppStore.js');

var _storeAppStoreJs2 = _interopRequireDefault(_storeAppStoreJs);

var _viewAppViewJs = require('./view/AppView.js');

var _viewAppViewJs2 = _interopRequireDefault(_viewAppViewJs);

/**
 * "Controller" for a Nori application. The controller is responsible for
 * bootstrapping the app and possibly handling socket/server interaction.
 * Any additional functionality should be handled in a specific module.
 */
var App = Nori.createApplication({

  mixins: [],

  /**
   * Initialize
   * Called when App is required in main.js
   */
  initialize: function initialize() {
    _viewAppViewJs2['default'].initialize();
    _storeAppStoreJs2['default'].initialize();

    this.runApplication();
  },

  /**
   * Remove the "Please wait" cover and start the app
   */
  runApplication: function runApplication() {
    _viewAppViewJs2['default'].removeLoadingMessage();
    _viewAppViewJs2['default'].showViewForChangedCondition(true); // Start with the route in the current URL
  }

});

exports['default'] = App;
module.exports = exports['default'];

},{"../nori/action/ActionCreator.js":11,"./action/ActionConstants.js":3,"./action/ActionCreator.js":4,"./store/AppStore.js":5,"./view/AppView.js":6}],3:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  MUTATION_TYPE: 'MUTATION_TYPE'
};
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ActionConstantsJs = require('./ActionConstants.js');

var _ActionConstantsJs2 = _interopRequireDefault(_ActionConstantsJs);

/**
 * Purely for convenience, an Event ("action") Creator ala Flux spec. Follow
 * guidelines for creating actions: https://github.com/acdlite/flux-standard-action
 */
var ActionCreator = {

  mutateSomeData: function mutateSomeData(data) {
    var actionObj = {
      type: _ActionConstantsJs2['default'].MUTATION_TYPE,
      payload: {
        data: data
      }
    };

    return actionObj;
  }

};

exports['default'] = ActionCreator;
module.exports = exports['default'];

},{"./ActionConstants.js":3}],5:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriActionActionConstantsJs = require('../../nori/action/ActionConstants.js');

var _noriActionActionConstantsJs2 = _interopRequireDefault(_noriActionActionConstantsJs);

var _actionActionConstantsJs = require('../action/ActionConstants.js');

var _actionActionConstantsJs2 = _interopRequireDefault(_actionActionConstantsJs);

var _nudoruCoreStringUtilsJs = require('../../nudoru/core/StringUtils.js');

var _nudoruCoreStringUtilsJs2 = _interopRequireDefault(_nudoruCoreStringUtilsJs);

var _nudoruCoreNumberUtilsJs = require('../../nudoru/core/NumberUtils.js');

var _nudoruCoreNumberUtilsJs2 = _interopRequireDefault(_nudoruCoreNumberUtilsJs);

var _nudoruCoreArrayUtilsJs = require('../../nudoru/core/ArrayUtils.js');

var _nudoruCoreArrayUtilsJs2 = _interopRequireDefault(_nudoruCoreArrayUtilsJs);

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
var AppStoreModule = Nori.createStore({

  mixins: [],

  initialize: function initialize() {
    this.addReducer(this.appStateReducerFunction);
    this.initializeReducerStore();

    this.setState();
  },

  initialState: function initialState() {
    return {
      currentState: 'chillin',
      greeting: 'Hello world!'
    };
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
  appStateReducerFunction: function appStateReducerFunction(state, action) {
    state = state || {};

    switch (action.type) {

      case _noriActionActionConstantsJs2['default'].CHANGE_STORE_STATE:
        return _.merge({}, state, action.payload.data);

      default:
        return state;
    }
  }

});

var AppStore = AppStoreModule();

exports['default'] = AppStore;
module.exports = exports['default'];

},{"../../nori/action/ActionConstants.js":10,"../../nudoru/core/ArrayUtils.js":36,"../../nudoru/core/NumberUtils.js":37,"../../nudoru/core/StringUtils.js":39,"../action/ActionConstants.js":3}],6:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _storeAppStoreJs = require('../store/AppStore.js');

var _storeAppStoreJs2 = _interopRequireDefault(_storeAppStoreJs);

var _noriViewApplicationViewJs = require('../../nori/view/ApplicationView.js');

var _noriViewApplicationViewJs2 = _interopRequireDefault(_noriViewApplicationViewJs);

var _noriViewMixinNudoruControlsJs = require('../../nori/view/MixinNudoruControls.js');

var _noriViewMixinNudoruControlsJs2 = _interopRequireDefault(_noriViewMixinNudoruControlsJs);

var _noriViewMixinRouteViewsJs = require('../../nori/view/MixinRouteViews.js');

var _noriViewMixinRouteViewsJs2 = _interopRequireDefault(_noriViewMixinRouteViewsJs);

var _TemplateViewComponentJs = require('./TemplateViewComponent.js');

var _TemplateViewComponentJs2 = _interopRequireDefault(_TemplateViewComponentJs);

/**
 * View for an application.
 */

var AppViewModule = Nori.createView({

  mixins: [_noriViewApplicationViewJs2['default'], _noriViewMixinNudoruControlsJs2['default'], _noriViewMixinRouteViewsJs2['default']],

  initialize: function initialize() {
    // Initialize mixed in views
    this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
    this.initializeRouteViews();
    this.initializeNudoruControls();

    this.configureViews();
  },

  configureViews: function configureViews() {
    // Container for routed views
    this.setViewMountPoint('#contents');
    this.mapConditionToViewComponent('/', 'default', (0, _TemplateViewComponentJs2['default'])());
    this.mapConditionToViewComponent('/styles', 'debug-styletest', (0, _TemplateViewComponentJs2['default'])());
    this.mapConditionToViewComponent('/controls', 'debug-controls', (0, _TemplateViewComponentJs2['default'])());

    // Alternately, map views to different store states with MixinStoreStateViews
    //this.mapStateToViewComponent(state, templateID, componentIDorObj);
  }

});

var AppView = AppViewModule();

exports['default'] = AppView;
module.exports = exports['default'];

},{"../../nori/view/ApplicationView.js":21,"../../nori/view/MixinNudoruControls.js":25,"../../nori/view/MixinRouteViews.js":26,"../store/AppStore.js":5,"./TemplateViewComponent.js":7}],7:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noriActionActionCreator = require('../../nori/action/ActionCreator');

var _noriActionActionCreator2 = _interopRequireDefault(_noriActionActionCreator);

var _AppView = require('./AppView');

var _AppView2 = _interopRequireDefault(_AppView);

var _storeAppStore = require('../store/AppStore');

var _storeAppStore2 = _interopRequireDefault(_storeAppStore);

var _noriUtilsTemplatingJs = require('../../nori/utils/Templating.js');

var _noriUtilsTemplatingJs2 = _interopRequireDefault(_noriUtilsTemplatingJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var _noriViewMixinDOMManipulationJs = require('../../nori/view/MixinDOMManipulation.js');

var _noriViewMixinDOMManipulationJs2 = _interopRequireDefault(_noriViewMixinDOMManipulationJs);

/**
 * Module for a dynamic application view for a route or a persistent view
 */

var Component = Nori.view().createComponentView({
  /**
   * Mixins are other modules/objects that multiple components share, provides
   * common functionality between then.
   */
  mixins: [_noriViewMixinDOMManipulationJs2['default']],

  /**
   * Initialize and bind, called once on first render. Parent component is
   * initialized from app view
   * @param initProps
   */
  initialize: function initialize(initProps) {
    //Bind to a map, update will be called on changes to the map
    //this.bind(AppStore); // Reducer store, map id string or map object

    // Bind changes in state or prop to functions
    this.state.onChange = this._stateChange;
    // this.props.onChange = function() {};
  },

  _stateChange: function _stateChange() {
    console.log(this.getID(), 'the state was changed', this.state);
  },

  /**
   * Default returns AppStore.getState():
   */
  //getInitialState() {},

  /**
   * Sub view components. Provide config props as param to factory method
   * @returns {{regionID: *}}
   */
  //defineRegions() {},

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here.
   *
   * The method is called only on the first render and cached to speed up renders
   *
   * @returns {Function}
   */
  //template: function() {},

  /**
   * Create an object to be used to define events on DOM elements
   * @returns {}
   */
  //defineEvents: function() {
  //  return {
  //    'evtstring selector': this._handlerFunc
  //  };
  //},

  /**
   * Set initial state properties. Call once on first render
   */
  getInitialState: function getInitialState() {
    return _storeAppStore2['default'].getState();
  },

  /**
   * State change on bound stores. Return nextState object
   */
  componentWillUpdate: function componentWillUpdate() {
    var nextState = _storeAppStore2['default'].getState();
    nextState.greeting += ' (updated)';
    return nextState;
  },

  /**
   * Component HTML was attached to the DOM
   */
  componentDidMount: function componentDidMount() {
    var el = this.getDOMElement();
  },

  /**
   * Component will be removed from the DOM
   */
  componentWillUnmount: function componentWillUnmount() {}

});

exports['default'] = Component;
module.exports = exports['default'];

},{"../../nori/action/ActionCreator":11,"../../nori/utils/Templating.js":20,"../../nori/view/MixinDOMManipulation.js":23,"../../nudoru/browser/DOMUtils.js":29,"../store/AppStore":5,"./AppView":6}],8:[function(require,module,exports){
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

},{"./app/App.js":2,"./nori/Nori.js":9,"./nudoru/browser/BrowserInfo.js":28}],9:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

var _utilsMixinObservableSubjectJs = require('./utils/MixinObservableSubject.js');

var _utilsMixinObservableSubjectJs2 = _interopRequireDefault(_utilsMixinObservableSubjectJs);

var _storeMixinReducerStoreJs = require('./store/MixinReducerStore.js');

var _storeMixinReducerStoreJs2 = _interopRequireDefault(_storeMixinReducerStoreJs);

var _viewMixinComponentViewsJs = require('./view/MixinComponentViews.js');

var _viewMixinComponentViewsJs2 = _interopRequireDefault(_viewMixinComponentViewsJs);

var _viewMixinEventDelegatorJs = require('./view/MixinEventDelegator.js');

var _viewMixinEventDelegatorJs2 = _interopRequireDefault(_viewMixinEventDelegatorJs);

var _utilsDispatcherJs = require('./utils/Dispatcher.js');

var _utilsDispatcherJs2 = _interopRequireDefault(_utilsDispatcherJs);

var _utilsRouterJs = require('./utils/Router.js');

var _utilsRouterJs2 = _interopRequireDefault(_utilsRouterJs);

var Nori = function Nori() {

  var _storeTemplate = undefined,
      _viewTemplate = undefined;

  // Switch Lodash to use Mustache style templates
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getDispatcher() {
    return _utilsDispatcherJs2['default'];
  }

  function getRouter() {
    return _utilsRouterJs2['default'];
  }

  /**
   * Allow for optional external configuration data from outside of the compiled
   * app bundle. For easy of settings tweaks after the build by non technical devs
   * @returns {void|*}
   */
  function getConfig() {
    return _.assign({}, window.APP_CONFIG_DATA || {});
  }

  function getCurrentRoute() {
    return _utilsRouterJs2['default'].getCurrentRoute();
  }

  function view() {
    return _viewTemplate;
  }

  function store() {
    return _storeTemplate;
  }

  //----------------------------------------------------------------------------
  //  Template parts
  //----------------------------------------------------------------------------

  _storeTemplate = createStore({
    mixins: [_storeMixinReducerStoreJs2['default'], (0, _utilsMixinObservableSubjectJs2['default'])()]
  })();

  _viewTemplate = createView({
    mixins: [_viewMixinComponentViewsJs2['default'], (0, _viewMixinEventDelegatorJs2['default'])(), (0, _utilsMixinObservableSubjectJs2['default'])()]
  })();

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
    return sourceArray.reduce(function (tgt, mixin) {
      return _.assign(tgt, mixin);
    }, target);
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
      return _.assign({}, _storeTemplate, buildFromMixins(custom));
    };
  }

  /**
   * Creates main application view
   * @param custom
   * @returns {*}
   */
  function createView(custom) {
    return function cv() {
      return _.assign({}, _viewTemplate, buildFromMixins(custom));
    };
  }

  /**
   * Mixes in the modules specified in the custom application object
   * @param sourceObject
   * @returns {*}
   */
  function buildFromMixins(sourceObject) {
    var mixins = undefined;

    if (sourceObject.mixins) {
      mixins = sourceObject.mixins;
    }

    mixins.push(sourceObject);
    return assignArray({}, mixins);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    config: getConfig,
    dispatcher: getDispatcher,
    router: getRouter,
    view: view,
    store: store,
    createApplication: createApplication,
    createStore: createStore,
    createView: createView,
    buildFromMixins: buildFromMixins,
    getCurrentRoute: getCurrentRoute,
    assignArray: assignArray
  };
};

exports['default'] = Nori();
module.exports = exports['default'];

},{"./store/MixinReducerStore.js":13,"./utils/Dispatcher.js":15,"./utils/MixinObservableSubject.js":16,"./utils/Router.js":18,"./view/MixinComponentViews.js":22,"./view/MixinEventDelegator.js":24}],10:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
/*  weak */

exports['default'] = {
  CHANGE_STORE_STATE: 'CHANGE_STORE_STATE'
};
module.exports = exports['default'];

},{}],11:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Action Creator
 * Based on Flux Actions
 * For more information and guidelines: https://github.com/acdlite/flux-standard-action
 */

var _ActionConstantsJs = require('./ActionConstants.js');

var _ActionConstantsJs2 = _interopRequireDefault(_ActionConstantsJs);

var NoriActionCreator = {

  changeStoreState: function changeStoreState(data, id) {
    return {
      type: _ActionConstantsJs2['default'].CHANGE_STORE_STATE,
      payload: {
        id: id,
        data: data
      }
    };
  }

};

exports['default'] = NoriActionCreator;
module.exports = exports['default'];

},{"./ActionConstants.js":10}],12:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Wraps Immutable.js's OrderedMap in the same syntax as the SimpleStore module
 *
 * View Docs http://facebook.github.io/immutable-js/docs/#/Map
 */

var _vendorImmutableMinJs = require('../../vendor/immutable.min.js');

var _vendorImmutableMinJs2 = _interopRequireDefault(_vendorImmutableMinJs);

var ImmutableMap = function ImmutableMap() {
  var _map = _vendorImmutableMinJs2['default'].Map();

  /**
   * Returns the Map object
   * @returns {*}
   */
  function getMap() {
    return _map;
  }

  /**
   * Return a copy of the state
   * @returns {void|*}
   */
  function getState() {
    return _map.toJS();
  }

  /**
   * Sets the state
   * @param next
   */
  function setState(next) {
    //let c = getState(),
    //    d = _.assign({}, c, next);
    //
    //_map  = immutable.Map(immutable.fromJS(d));
    _map = _map.merge(next);
  }

  function toJSON() {
    return JSON.stringify(getState());
  }

  function fromJSON(data) {
    try {
      setState(JSON.parse(data));
    } catch (e) {
      console.warn('Nori, ImmutableMap, could not parse JSON');
      setState({});
    }
  }

  return {
    getState: getState,
    setState: setState,
    getMap: getMap,
    toJSON: toJSON,
    fromJSON: fromJSON
  };
};

exports['default'] = ImmutableMap;
module.exports = exports['default'];

},{"../../vendor/immutable.min.js":41}],13:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

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

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

var _SimpleStoreJs = require('./SimpleStore.js');

var _SimpleStoreJs2 = _interopRequireDefault(_SimpleStoreJs);

var _ImmutableMapJs = require('./ImmutableMap.js');

var _ImmutableMapJs2 = _interopRequireDefault(_ImmutableMapJs);

var MixinReducerStore = function MixinReducerStore() {
  var _this = undefined,
      _state = undefined,
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

  /**
   * Set the state of the store. Will default to initial state shape returned from
   * initialState() function. Will only update the state if it's not equal to
   * current
   * @param nextstate
   */
  function setState() {
    var nextstate = arguments.length <= 0 || arguments[0] === undefined ? this.initialState() : arguments[0];

    if (!_.isEqual(nextstate, getState())) {
      _state.setState(nextstate);
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

    _this = this;
    //_state = _stateObjFactory();
    _state = (0, _ImmutableMapJs2['default'])();

    //if (!_stateReducers) {
    //  throw new Error('ReducerStore, must set a reducer before initialization');
    //}
    // Set initial state from empty event
    //applyReducers({});
  }

  function initialState() {
    return {};
  }

  /**
   * Apply the action object to the reducers to change state
   * are sent to all reducers to update the state
   * @param actionObjOrArry Array of actions or a single action to reduce from
   */
  function apply(actionObjOrArry) {
    if (_nudoruUtilIsJs2['default'].array(actionObjOrArry)) {
      actionObjOrArry.forEach(function (actionObj) {
        return applyReducers(actionObj);
      });
    } else {
      applyReducers(actionObjOrArry);
    }
  }

  function applyReducers(actionObject) {
    var nextState = applyReducersToState(getState(), actionObject);
    setState(nextState);
  }

  /**
   * Creates a new state from the combined reduces and action object
   * Store state isn't modified, current state is passed in and mutated state returned
   * @param state
   * @param action
   * @returns {*|{}}
   */
  function applyReducersToState(state, action) {
    state = state || {};
    return _stateReducers.reduce(function (nextState, reducerFunc) {
      return reducerFunc(nextState, action);
    }, state);
  }

  /**
   * Template reducer function
   * Store state isn't modified, current state is passed in and mutated state returned
   function templateReducerFunction(state, event) {
        state = state || {};
        switch (event.type) {
          case _noriActionConstants.MODEL_DATA_CHANGED:
            // can compose other reducers
            // return _.merge({}, state, otherStateTransformer(state));
            return _.merge({}, state, {prop: event.payload.value});
          case undefined:
            return state;
          default:
            console.warn('Reducer store, unhandled event type: '+event.type);
            return state;
        }
      }
   */

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeReducerStore: initializeReducerStore,
    initialState: initialState,
    getState: getState,
    setState: setState,
    apply: apply,
    setReducers: setReducers,
    addReducer: addReducer,
    applyReducers: applyReducers,
    applyReducersToState: applyReducersToState
  };
};

exports['default'] = MixinReducerStore();
module.exports = exports['default'];

},{"../../nudoru/util/is.js":40,"./ImmutableMap.js":12,"./SimpleStore.js":14}],14:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
/*  weak */

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
    _internalState = _.assign({}, _internalState, nextState);
  }

  function toJSON() {
    return JSON.stringify(getState());
  }

  function fromJSON(data) {
    try {
      setState(JSON.parse(data));
    } catch (e) {
      console.warn('Nori, SimpleStore, could not parse JSON');
      setState({});
    }
  }

  return {
    getState: getState,
    setState: setState,
    toJSON: toJSON,
    fromJSON: fromJSON
  };
};

exports['default'] = SimpleStore;
module.exports = exports['default'];

},{}],15:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

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

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var Dispatcher = function Dispatcher() {

  var _subjectMap = {},
      _receiverMap = {},
      _id = 0,
      _log = [],
      _queue = [],
      _timerObservable = undefined,
      _timerSubscription = undefined,
      _timerPausable = undefined;

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

    var subject = new _vendorRxjsRxLiteMinJs2['default'].Subject();

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

    _timerPausable = new _vendorRxjsRxLiteMinJs2['default'].Subject();
    _timerObservable = _vendorRxjsRxLiteMinJs2['default'].Observable.interval(1).pausable(_timerPausable);
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

exports['default'] = Dispatcher();
module.exports = exports['default'];

},{"../../vendor/rxjs/rx.lite.min.js":42}],16:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Add RxJS Subject to a module.
 *
 * Add one simple observable subject or more complex ability to create others for
 * more complex eventing needs.
 */

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var MixinObservableSubject = function MixinObservableSubject() {

  var _subject = new _vendorRxjsRxLiteMinJs2['default'].Subject(),
      _subjectMap = {};

  /**
   * Create a new subject
   * @param name
   * @returns {*}
   */
  function createSubject(name) {
    if (!_subjectMap.hasOwnProperty(name)) {
      _subjectMap[name] = new _vendorRxjsRxLiteMinJs2['default'].Subject();
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
    if (_nudoruUtilIsJs2['default'].string(handlerOrName)) {
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

exports['default'] = MixinObservableSubject;
module.exports = exports['default'];

},{"../../nudoru/util/is.js":40,"../../vendor/rxjs/rx.lite.min.js":42}],17:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var Renderer = function Renderer() {
  function render(_ref) {
    var target = _ref.target;
    var html = _ref.html;
    var callback = _ref.callback;

    var domEl = undefined,
        mountPoint = document.querySelector(target),
        currentHTML = mountPoint.innerHTML;

    if (html) {
      domEl = _nudoruBrowserDOMUtilsJs2['default'].HTMLStrToNode(html);
      if (html !== currentHTML) {
        // TODO experiment with the jsdiff function
        mountPoint.innerHTML = '';
        mountPoint.appendChild(domEl);
      } else {
        console.log('> is SAME');
      }
    }

    if (callback) {
      callback(domEl);
    }

    return domEl;
  }

  return {
    render: render
  };
};

exports['default'] = Renderer();
module.exports = exports['default'];

},{"../../nudoru/browser/DOMUtils.js":29}],18:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Simple router
 * Supporting IE9 so using hashes instead of the history API for now
 */

var _nudoruCoreObjectUtilsJs = require('../../nudoru/core/ObjectUtils.js');

var _nudoruCoreObjectUtilsJs2 = _interopRequireDefault(_nudoruCoreObjectUtilsJs);

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var Router = function Router() {

  var _subject = new _vendorRxjsRxLiteMinJs2['default'].Subject(),
      _hashChangeObservable = undefined;

  /**
   * Set event handlers
   */
  function initialize() {
    _hashChangeObservable = _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(window, 'hashchange').subscribe(notifySubscribers);
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

    // TODO refactor with Array.reduce
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
    if (!_nudoruCoreObjectUtilsJs2['default'].isNull(dataObj)) {
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

exports['default'] = r;
module.exports = exports['default'];

},{"../../nudoru/core/ObjectUtils.js":38,"../../vendor/rxjs/rx.lite.min.js":42}],19:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * RxJS Helpers
 * @type {{dom: Function, from: Function, interval: Function, doEvery: Function, just: Function, empty: Function}}
 */

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var _vendorRxjsRxLiteMinJs2 = _interopRequireDefault(_vendorRxjsRxLiteMinJs);

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

exports['default'] = {
  dom: function dom(selector, event) {
    var el = document.querySelector(selector);
    if (!el) {
      console.warn('nori/utils/Rx, dom, invalid DOM selector: ' + selector);
      return;
    }
    return _vendorRxjsRxLiteMinJs2['default'].Observable.fromEvent(el, event.trim());
  },

  from: function from(ittr) {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.from(ittr);
  },

  interval: function interval(ms) {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.interval(ms);
  },

  doEvery: function doEvery(ms) {
    if (_nudoruUtilIsJs2['default'].func(arguments[1])) {
      return this.interval(ms).subscribe(arguments[1]);
    }
    return this.interval(ms).take(arguments[1]).subscribe(arguments[2]);
  },

  just: function just(value) {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.just(value);
  },

  empty: function empty() {
    return _vendorRxjsRxLiteMinJs2['default'].Observable.empty();
  }

};
module.exports = exports['default'];

},{"../../nudoru/util/is.js":40,"../../vendor/rxjs/rx.lite.min.js":42}],20:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/*
 Simple wrapper for Underscore / HTML templates
 Matt Perkins
 4/7/15
 */

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var Templating = function Templating() {

  var _templateMap = Object.create(null),
      _templateHTMLCache = Object.create(null),
      _templateCache = Object.create(null);

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
        srchtml = undefined;

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
    return _nudoruBrowserDOMUtilsJs2['default'].HTMLStrToNode(asHTML(id, obj));
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

exports['default'] = Templating();
module.exports = exports['default'];

},{"../../nudoru/browser/DOMUtils.js":29}],21:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

var _utilsTemplatingJs = require('../utils/Templating.js');

var _utilsTemplatingJs2 = _interopRequireDefault(_utilsTemplatingJs);

var _nudoruBrowserDOMUtilsJs = require('../../nudoru/browser/DOMUtils.js');

var _nudoruBrowserDOMUtilsJs2 = _interopRequireDefault(_nudoruBrowserDOMUtilsJs);

var ApplicationView = function ApplicationView() {

  //----------------------------------------------------------------------------
  //  Initialization
  //----------------------------------------------------------------------------

  /**
   * Initialize
   * @param scaffoldTemplates template IDs to attached to the body for the app
   */
  function initializeApplicationView(scaffoldTemplates) {
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
      bodyEl.appendChild(_nudoruBrowserDOMUtilsJs2['default'].HTMLStrToNode(_utilsTemplatingJs2['default'].getSource(templ, {})));
    });
  }

  /**
   * After app initialization, remove the loading message
   */
  function removeLoadingMessage() {
    var cover = document.querySelector('#initialization__cover'),
        message = document.querySelector('.initialization__message');

    cover.parentNode.removeChild(cover);
    cover.removeChild(message);
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeApplicationView: initializeApplicationView,
    removeLoadingMessage: removeLoadingMessage
  };
};

exports['default'] = ApplicationView();
module.exports = exports['default'];

},{"../../nudoru/browser/DOMUtils.js":29,"../utils/Templating.js":20}],22:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Mixin view that allows for component views
 */

var _ViewComponentJs = require('./ViewComponent.js');

var _ViewComponentJs2 = _interopRequireDefault(_ViewComponentJs);

var _MixinEventDelegatorJs = require('./MixinEventDelegator.js');

var _MixinEventDelegatorJs2 = _interopRequireDefault(_MixinEventDelegatorJs);

var MixinComponentViews = function MixinComponentViews() {

  var _componentViewMap = Object.create(null),
      _componentViewKeyIndex = 0;

  /**
   * Map a component to a mounting point. If a string is passed,
   * the correct object will be created from the factory method, otherwise,
   * the passed component object is used.
   *
   * @param componentID
   * @param componentIDorObj
   * @param mountPoint
   */
  function mapViewComponent(componentID, componentObj, mountPoint) {
    _componentViewMap[componentID] = {
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
    return function (initProps) {

      var componentAssembly = undefined,
          finalComponent = undefined,
          previousInitialize = undefined;

      componentAssembly = [(0, _ViewComponentJs2['default'])(), (0, _MixinEventDelegatorJs2['default'])(), componentSource];

      if (componentSource.mixins) {
        componentAssembly = componentAssembly.concat(componentSource.mixins);
      }

      finalComponent = Nori.assignArray({}, componentAssembly);
      finalComponent.key = _componentViewKeyIndex++;

      // Compose a new initialize function by inserting call to component super module
      previousInitialize = finalComponent.initialize;

      finalComponent.initialize = function initialize(initObj) {
        finalComponent.initializeComponent(initObj);
        previousInitialize.call(finalComponent, initObj);
      };

      if (initProps) {
        // Overwrite the function in the component
        finalComponent.getDefaultProps = function () {
          return initProps;
        };
      }

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
    mapViewComponent: mapViewComponent,
    createComponentView: createComponentView,
    showViewComponent: showViewComponent,
    getComponentViewMap: getComponentViewMap
  };
};

exports['default'] = MixinComponentViews();
module.exports = exports['default'];

},{"./MixinEventDelegator.js":24,"./ViewComponent.js":27}],23:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

/**
 * DOM manipulation and animation helpers for ViewComponents
 */
var MixinDOMManipulation = function MixinDOMManipulation() {

  var _tweenedEls = [],
      _zIndex = 1000;

  /**
   * Returns the element. If passed a string will query DOM and return.
   * @param selector
   * @returns {*}
   */
  function getElement(selector) {
    var el = undefined;

    if (_nudoruUtilIsJs2['default'].string(selector)) {
      el = document.querySelector(selector);
    } else {
      el = selector;
    }

    if (!el) {
      console.warn('MixinDOMManipulation, selector not found ' + selector);
    }

    return el;
  }

  function toTop(selector) {
    var el = document.querySelector(selector);
    if (el) {
      el.style.zIndex = _zIndex++;
    }
    console.warn('MixinDOMManipulation, to top, selector not found ' + selector);
  }

  function addTweenedElement(selector) {
    var el = getElement(selector);

    if (el) {
      _tweenedEls.push(el);
      return el;
    }

    return null;
  }

  function tweenTo(selector, dur, props) {
    var el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.to(el, dur, props);
  }

  function tweenFrom(selector, dur, props) {
    var el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.from(el, dur, props);
  }

  function tweenFromTo(selector, dur, startprops, endprops) {
    var el = addTweenedElement(selector);

    if (!el) {
      return;
    }
    return TweenLite.fromTo(el, dur, startprops, endprops);
  }

  function killTweens() {
    _tweenedEls.forEach(function (el) {
      TweenLite.killTweensOf(el);
    });

    _tweenedEls = [];
  }

  function hideEl(selector) {
    tweenSet(selector, {
      alpha: 0,
      display: 'none'
    });
  }

  function showEl(selector) {
    tweenSet(selector, {
      alpha: 1,
      display: 'block'
    });
  }

  function tweenSet(selector, props) {
    var el = getElement(selector);
    if (el) {
      TweenLite.set(el, props);
    }
  }

  return {
    toTop: toTop,
    showEl: showEl,
    hideEl: hideEl,
    tweenSet: tweenSet,
    tweenTo: tweenTo,
    tweenFrom: tweenFrom,
    tweenFromTo: tweenFromTo,
    killTweens: killTweens
  };
};

exports['default'] = MixinDOMManipulation();
module.exports = exports['default'];

},{"../../nudoru/util/is.js":40}],24:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

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

var _utilsRxJs = require('../utils/Rx.js');

var _utilsRxJs2 = _interopRequireDefault(_utilsRxJs);

var _nudoruBrowserBrowserInfoJs = require('../../nudoru/browser/BrowserInfo.js');

var _nudoruBrowserBrowserInfoJs2 = _interopRequireDefault(_nudoruBrowserBrowserInfoJs);

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

var MixinEventDelegator = function MixinEventDelegator() {

  var _eventsMap = undefined,
      _eventSubscribers = undefined;

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
  function delegateEvents(autoForm) {
    if (!_eventsMap) {
      return;
    }

    _eventSubscribers = Object.create(null);

    for (var evtStrings in _eventsMap) {
      if (_eventsMap.hasOwnProperty(evtStrings)) {
        var _ret = (function () {

          var mappings = evtStrings.split(','),
              eventHandler = _eventsMap[evtStrings];

          if (!_nudoruUtilIsJs2['default'].func(eventHandler)) {
            console.warn('EventDelegator, handler for ' + evtStrings + ' is not a function');
            return {
              v: undefined
            };
          }

          /* jshint -W083 */
          // https://jslinterrors.com/dont-make-functions-within-a-loop
          mappings.forEach(function (evtMap) {
            evtMap = evtMap.trim();

            var eventStr = evtMap.split(' ')[0].trim(),
                selector = evtMap.split(' ')[1].trim();

            if (_nudoruBrowserBrowserInfoJs2['default'].mobile.any()) {
              eventStr = convertMouseToTouchEventStr(eventStr);
            }

            _eventSubscribers[evtMap] = createHandler(selector, eventStr, eventHandler, autoForm);
          });
          /* jshint +W083 */
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
    }
  }

  /**
   * Map common mouse events to touch equivalents
   * @param eventStr
   * @returns {*}
   */
  function convertMouseToTouchEventStr(eventStr) {
    switch (eventStr) {
      case 'click':
        return 'touchend';
      case 'mousedown':
        return 'touchstart';
      case 'mouseup':
        return 'touchend';
      case 'mousemove':
        return 'touchmove';
      default:
        return eventStr;
    }
  }

  /**
   * Returns an observable subscription
   * @param selector DOM element
   * @param eventStr Event to watch
   * @param handler Subscriber to handle the event
   * @param autoForm True to automatically pass common form element data to the handler
   * @returns {*}
   */
  function createHandler(selector, eventStr, handler, autoForm) {
    var observable = _utilsRxJs2['default'].dom(selector, eventStr),
        el = document.querySelector(selector),
        tag = undefined,
        type = undefined;

    if (!el) {
      console.warn('MixinEventDelegator, createHandler, Element not found:', selector);
      return;
    }

    tag = el.tagName.toLowerCase();
    type = el.getAttribute('type');

    if (autoForm) {
      if (tag === 'input' || tag === 'textarea') {
        if (!type || type === 'text') {
          if (eventStr === 'blur' || eventStr === 'focus') {
            return observable.map(function (evt) {
              return evt.target.value;
            }).subscribe(handler);
          } else if (eventStr === 'keyup' || eventStr === 'keydown') {
            return observable.throttle(100).map(function (evt) {
              return evt.target.value;
            }).subscribe(handler);
          }
        } else if (type === 'radio' || type === 'checkbox') {
          if (eventStr === 'click') {
            return observable.map(function (evt) {
              return evt.target.checked;
            }).subscribe(handler);
          }
        }
      } else if (tag === 'select') {
        if (eventStr === 'change') {
          return observable.map(function (evt) {
            return evt.target.value;
          }).subscribe(handler);
        }
      }
    }

    return observable.subscribe(handler);
  }

  /**
   * Cleanly remove events
   */
  function undelegateEvents() {
    if (!_eventsMap) {
      return;
    }

    for (var event in _eventSubscribers) {
      if (_eventSubscribers[event]) {
        _eventSubscribers[event].dispose();
      } else {
        console.warn('MixinEventDelegator, undelegateEvents, not a valid observable: ', event);
      }
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

exports['default'] = MixinEventDelegator;
module.exports = exports['default'];

},{"../../nudoru/browser/BrowserInfo.js":28,"../../nudoru/util/is.js":40,"../utils/Rx.js":19}],25:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

var _nudoruComponentsToastViewJs = require('../../nudoru/components/ToastView.js');

var _nudoruComponentsToastViewJs2 = _interopRequireDefault(_nudoruComponentsToastViewJs);

var _nudoruComponentsToolTipViewJs = require('../../nudoru/components/ToolTipView.js');

var _nudoruComponentsToolTipViewJs2 = _interopRequireDefault(_nudoruComponentsToolTipViewJs);

var _nudoruComponentsMessageBoxViewJs = require('../../nudoru/components/MessageBoxView.js');

var _nudoruComponentsMessageBoxViewJs2 = _interopRequireDefault(_nudoruComponentsMessageBoxViewJs);

var _nudoruComponentsMessageBoxCreatorJs = require('../../nudoru/components/MessageBoxCreator.js');

var _nudoruComponentsMessageBoxCreatorJs2 = _interopRequireDefault(_nudoruComponentsMessageBoxCreatorJs);

var _nudoruComponentsModalCoverViewJs = require('../../nudoru/components/ModalCoverView.js');

var _nudoruComponentsModalCoverViewJs2 = _interopRequireDefault(_nudoruComponentsModalCoverViewJs);

var MixinNudoruControls = function MixinNudoruControls() {

  var _alerts = [];

  function initializeNudoruControls() {
    _nudoruComponentsToolTipViewJs2['default'].initialize('tooltip__container');
    _nudoruComponentsToastViewJs2['default'].initialize('toast__container');
    _nudoruComponentsMessageBoxViewJs2['default'].initialize('messagebox__container');
    _nudoruComponentsModalCoverViewJs2['default'].initialize();
  }

  function mbCreator() {
    return _nudoruComponentsMessageBoxCreatorJs2['default'];
  }

  function addMessageBox(obj) {
    return _nudoruComponentsMessageBoxViewJs2['default'].add(obj);
  }

  function removeMessageBox(id) {
    _nudoruComponentsMessageBoxViewJs2['default'].remove(id);
  }

  function alert(message) {
    _alerts.push(customAlert(message, 'Alert', 'danger'));
  }

  function positiveAlert(message, title) {
    _alerts.push(customAlert(message, title, 'success'));
  }

  function negativeAlert(message, title) {
    _alerts.push(customAlert(message, title, 'warning'));
  }

  function customAlert(message, title, type) {
    return _nudoruComponentsMessageBoxViewJs2['default'].add({
      title: title,
      content: '<p>' + message + '</p>',
      type: type,
      modal: false,
      width: 400,
      buttons: [{
        label: 'Close',
        id: 'Close',
        type: '',
        icon: 'times',
        onClick: null
      }]
    });
  }

  function closeAllAlerts() {
    _alerts.forEach(function (id) {
      removeMessageBox(id);
    });
    _alerts = [];
  }

  function addNotification(obj) {
    return _nudoruComponentsToastViewJs2['default'].add(obj);
  }

  function notify(message, title, type) {
    return addNotification({
      title: title || '',
      type: type || _nudoruComponentsToastViewJs2['default'].type().DEFAULT,
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
    positiveAlert: positiveAlert,
    negativeAlert: negativeAlert,
    closeAllAlerts: closeAllAlerts,
    notify: notify
  };
};

exports['default'] = MixinNudoruControls();
module.exports = exports['default'];

},{"../../nudoru/components/MessageBoxCreator.js":31,"../../nudoru/components/MessageBoxView.js":32,"../../nudoru/components/ModalCoverView.js":33,"../../nudoru/components/ToastView.js":34,"../../nudoru/components/ToolTipView.js":35}],26:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
/*  weak */

/**
 * Mixin view that allows for component views to be display on routing changes
 */

var MixinRouteViews = function MixinRouteViews() {

  var _this = undefined,
      _currentViewID = undefined,
      _defaultMountPoint = undefined,
      _viewIDMap = Object.create(null);

  /**
   * Set up listeners
   */
  function initializeRouteViews() {
    _this = this; // mitigation, Due to events, scope may be set to the window object

    this.createSubject('viewChange');

    Nori.router().subscribe(function onRouteChange(payload) {
      handleChange(payload.routeObj);
    });
  }

  /**
   * Show route from URL hash on change
   * @param routeObj
   */
  function handleChange(routeObj) {
    showViewForCondition.bind(_this)(routeObj.route);
  }

  /**
   * Typically on app startup, show the view assigned to the current URL hash
   *
   * @param silent If true, will not notify subscribers of the change, prevents
   * double showing on initial load
   */
  function showViewForChangedCondition(silent) {
    this.showViewForCondition(Nori.getCurrentRoute().route);
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
    _defaultMountPoint = elID;
  }

  function getViewMountPoint() {
    return _defaultMountPoint;
  }

  /**
   * Map a route to a module view controller
   * @param templateID
   * @param component
   */
  function mapConditionToViewComponent(condition, templateID, component) {
    _viewIDMap[condition] = templateID;
    this.mapViewComponent(templateID, component, _defaultMountPoint);
  }

  /**
   * Show a view (in response to a route change)
   * @param condition
   */
  function showViewForCondition(condition) {
    var componentID = _viewIDMap[condition];
    if (!componentID) {
      console.warn("No view mapped for route: " + condition);
      return;
    }

    removeCurrentRouteView();

    _currentViewID = componentID;
    this.showViewComponent(_currentViewID);

    // Transition new view in
    TweenLite.set(_defaultMountPoint, { alpha: 0 });
    TweenLite.to(_defaultMountPoint, 0.25, { alpha: 1, ease: Quad.easeOut });

    this.notifySubscribersOf('viewChange', componentID);
  }

  /**
   * Remove the currently displayed view
   */
  function removeCurrentRouteView() {
    if (_currentViewID) {
      _this.getComponentViewMap()[_currentViewID].controller.dispose();
    }
    _currentViewID = '';
  }

  return {
    initializeRouteViews: initializeRouteViews,
    showViewForChangedCondition: showViewForChangedCondition,
    showViewForCondition: showViewForCondition,
    setViewMountPoint: setViewMountPoint,
    getViewMountPoint: getViewMountPoint,
    mapConditionToViewComponent: mapConditionToViewComponent
  };
};

exports['default'] = MixinRouteViews();
module.exports = exports['default'];

},{}],27:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*  weak */

/**
 * Base module for components
 * Must be extended with custom modules
 */

var _utilsTemplatingJs = require('../utils/Templating.js');

var _utilsTemplatingJs2 = _interopRequireDefault(_utilsTemplatingJs);

var _utilsRendererJs = require('../utils/Renderer.js');

var _utilsRendererJs2 = _interopRequireDefault(_utilsRendererJs);

var _nudoruUtilIsJs = require('../../nudoru/util/is.js');

var _nudoruUtilIsJs2 = _interopRequireDefault(_nudoruUtilIsJs);

// Lifecycle state constants
var LS_NO_INIT = 0,
    LS_INITED = 1,
    LS_UPDATING = 2,
    LS_RENDERING = 3,
    LS_MOUNTED = 4,
    LS_UNMOUNTED = 5,
    LS_DISPOSED = 9;

var ViewComponent = function ViewComponent() {

  var _internalState = {},
      _internalProps = {},
      _publicState = {},
      _publicProps = {},
      _lifecycleState = LS_NO_INIT,
      _isMounted = false,
      _regions = {},
      _id = undefined,
      _templateObjCache = undefined,
      _html = undefined,
      _DOMElement = undefined,
      _mountPoint = undefined,
      _mountDelay = undefined;

  /**
   * Initialization
   * @param initProps
   */
  function initializeComponent(initProps) {
    setProps(_.assign({}, this.getDefaultProps(), initProps));
    this.setState(this.getInitialState());
    this.setEvents(this.defineEvents());

    _id = _internalProps.id;
    _mountPoint = _internalProps.mountPoint;

    _regions = this.defineRegions();

    this.initializeRegions();

    _lifecycleState = LS_INITED;
  }

  /**
   * Override to set default props
   *
   * For a region, which is instantiated from the factory with props, this function
   * will be overwritten by the code in MixinComponentView to return the passed
   * initProps object
   * @returns {undefined}
   */
  function getDefaultProps() {
    return undefined;
  }

  /**
   * Override in implementation
   *
   * Define DOM events to be attached after the element is mounted
   * @returns {undefined}
   */
  function defineEvents() {
    return undefined;
  }

  /**
   * Bind updates to the map ID to this view's update
   * @param observableStore Object to subscribe to or ID. Should implement nori/store/MixinObservableStore
   */
  function bind(observableStore) {
    if (!_nudoruUtilIsJs2['default'].func(observableStore.subscribe)) {
      console.warn('ViewComponent bind, must be observable: ' + observableStore);
      return;
    }

    observableStore.subscribe(this.update.bind(this));
  }

  /**
   * Before the view updates and a rerender occurs
   * Returns nextState of component
   */
  function componentWillUpdate() {
    return this.getState();
  }

  function update() {
    _lifecycleState = LS_UPDATING;

    var nextState = this.componentWillUpdate();

    if (this.shouldComponentUpdate(nextState)) {
      this.setState(nextState);

      if (_isMounted) {
        this.unmount();
        this.componentRender();
        this.mount();
      }

      this.updateRegions();
    }

    if (_lifecycleState === LS_UPDATING) {
      _lifecycleState = LS_INITED;
    }
  }

  /**
   * Compare current state and next state to determine if updating should occur
   * If the next state exists and it's not equal to the current state
   * @param nextState
   * @returns {*}
   */
  function shouldComponentUpdate(nextState) {
    return !_.isEqual(this.getState(), nextState);
  }

  /**
   * Render it, need to add it to a parent container, handled in higher level view
   * @returns {*}
   */
  function componentRender() {
    _lifecycleState = LS_RENDERING;

    if (!_templateObjCache) {
      _templateObjCache = this.template(this.getState());
    }

    _html = this.render(this.getState());

    this.renderRegions();
  }

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here.
   *
   * The method is called only on the first render and cached to speed up renders
   *
   * @returns {Function}
   */
  function template(state) {
    // assumes the template ID matches the component's ID as passed on initialize
    var html = _utilsTemplatingJs2['default'].getSource(this.getID());
    return _.template(html);
  }

  /**
   * May be overridden in a submodule for custom rendering
   * Should return HTML
   * @returns {*}
   */
  function render(state) {
    return _templateObjCache(state);
  }

  /**
   * Append it to a parent element
   * @param mountEl
   */
  function mount() {
    if (!_html || _html.length === 0) {
      console.warn('Component ' + _id + ' cannot mount with no HTML. Call render() first?');
      return;
    }

    _lifecycleState = LS_MOUNTED;

    _isMounted = true;

    _DOMElement = _utilsRendererJs2['default'].render({
      target: _mountPoint,
      html: _html
    });

    if (this.delegateEvents) {
      if (this.shouldDelegateEvents()) {
        // True to automatically pass form element handlers the elements value or other status
        this.delegateEvents(true);
      }
    }

    if (this.componentDidMount) {
      //this.componentDidMount.bind(this);
      _mountDelay = _.delay(this.mountAfterDelay.bind(this), 1);
    }
  }

  /**
   * HACK
   * Experiencing issues with animations running in componentDidMount
   * after renders and state changes. This delay fixes the issues.
   */
  function mountAfterDelay() {
    if (_mountDelay) {
      window.clearTimeout(_mountDelay);
    }

    this.componentDidMount();
    this.mountRegions();
  }

  /**
   * Override to delegate events or not based on some state trigger
   * @returns {boolean}
   */
  function shouldDelegateEvents() {
    return true;
  }

  /**
   * Call after it's been added to a view
   */
  function componentDidMount() {}

  /**
   * Call when unloading
   */
  function componentWillUnmount() {}

  function unmount() {
    if (_mountDelay) {
      window.clearTimeout(_mountDelay);
    }

    // Tweens are present in the MixinDOMManipulation. This is convenience
    if (this.killTweens) {
      this.killTweens();
    }

    this.componentWillUnmount();

    // NO
    //this.unmountRegions();

    _isMounted = false;

    if (this.undelegateEvents) {
      this.undelegateEvents();
    }

    _utilsRendererJs2['default'].render({
      target: _mountPoint,
      html: ''
    });

    _html = '';
    _DOMElement = null;

    _lifecycleState = LS_UNMOUNTED;
  }

  function dispose() {
    this.componentWillDispose();
    this.disposeRegions();
    this.unmount();

    _lifecycleState = LS_DISPOSED;
  }

  function componentWillDispose() {}
  //

  //----------------------------------------------------------------------------
  //  Regions
  //----------------------------------------------------------------------------

  //TODO reduce code repetition

  function defineRegions() {
    return undefined;
  }

  function getRegion(id) {
    return _regions[id];
  }

  function getRegionIDs() {
    return _regions ? Object.keys(_regions) : [];
  }

  function initializeRegions() {
    getRegionIDs().forEach(function (region) {
      _regions[region].initialize();
    });
  }

  function updateRegions() {
    getRegionIDs().forEach(function (region) {
      _regions[region].update();
    });
  }

  function renderRegions() {
    getRegionIDs().forEach(function (region) {
      _regions[region].componentRender();
    });
  }

  function mountRegions() {
    getRegionIDs().forEach(function (region) {
      _regions[region].mount();
    });
  }

  function unmountRegions() {
    getRegionIDs().forEach(function (region) {
      _regions[region].unmount();
    });
  }

  function disposeRegions() {
    getRegionIDs().forEach(function (region) {
      _regions[region].dispose();
    });
  }

  //----------------------------------------------------------------------------
  //  Props and state
  //----------------------------------------------------------------------------

  function getInitialState() {
    this.setState({});
  }

  function getState() {
    return _.assign({}, _internalState);
  }

  function setState(nextState) {
    if (_.isEqual(_internalState, nextState)) {
      return;
    }

    _internalState = _.assign({}, _internalState, nextState);
    // keeping the object reference
    _publicState = _.assign(_publicState, _internalState);

    if (typeof _publicState.onChange === 'function') {
      _publicState.onChange.apply(this);
    }
  }

  function getProps() {
    return _.assign({}, _internalProps);
  }

  function setProps(nextProps) {
    if (_.isEqual(_internalProps, nextProps)) {
      return;
    }

    if (this.componentWillReceiveProps && _lifecycleState > LS_INITED) {
      this.componentWillReceiveProps(nextProps);
    }

    _internalProps = _.merge({}, _internalProps, nextProps);
    // keeping the object reference
    _publicProps = _.assign(_publicProps, _internalProps);

    if (typeof _publicProps.onChange === 'function') {
      _publicProps.onChange.apply(this);
    }
  }

  function componentWillReceiveProps(nextProps) {}

  //----------------------------------------------------------------------------
  //  Accessors
  //----------------------------------------------------------------------------

  function getLifeCycleState() {
    return _lifecycleState;
  }

  function isInitialized() {
    return _lifecycleState > LS_NO_INIT;
  }

  function isMounted() {
    return _isMounted;
  }

  function getID() {
    return _id;
  }

  function getDOMElement() {
    return _DOMElement;
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    initializeComponent: initializeComponent,
    state: _publicState,
    props: _publicProps,
    getProps: getProps,
    setProps: setProps,
    getInitialState: getInitialState,
    getState: getState,
    setState: setState,
    getDefaultProps: getDefaultProps,
    defineRegions: defineRegions,
    defineEvents: defineEvents,
    getLifeCycleState: getLifeCycleState,
    isInitialized: isInitialized,
    getID: getID,
    template: template,
    getDOMElement: getDOMElement,
    isMounted: isMounted,
    bind: bind,
    componentWillReceiveProps: componentWillReceiveProps,
    componentWillUpdate: componentWillUpdate,
    shouldComponentUpdate: shouldComponentUpdate,
    update: update,
    componentRender: componentRender,
    render: render,
    mount: mount,
    shouldDelegateEvents: shouldDelegateEvents,
    mountAfterDelay: mountAfterDelay,
    componentDidMount: componentDidMount,
    componentWillUnmount: componentWillUnmount,
    unmount: unmount,
    dispose: dispose,
    componentWillDispose: componentWillDispose,
    getRegion: getRegion,
    getRegionIDs: getRegionIDs,
    initializeRegions: initializeRegions,
    updateRegions: updateRegions,
    renderRegions: renderRegions,
    mountRegions: mountRegions,
    unmountRegions: unmountRegions,
    disposeRegions: disposeRegions
  };
};

exports['default'] = ViewComponent;
module.exports = exports['default'];

},{"../../nudoru/util/is.js":40,"../utils/Renderer.js":17,"../utils/Templating.js":20}],28:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports["default"] = browserInfo;
module.exports = exports["default"];

},{}],29:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

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
module.exports = exports['default'];

},{}],30:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

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
module.exports = exports["default"];

},{}],31:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
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

exports['default'] = MessageBoxCreator();
module.exports = exports['default'];

},{"./MessageBoxView":32}],32:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var Rxjs = _interopRequireWildcard(_vendorRxjsRxLiteMinJs);

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
      _buttonIconTemplateID = 'messagebox--button-icon',
      _buttonNoIconTemplateID = 'messagebox--button-noicon',
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
      element: _template.asElement('messagebox--default', {
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

      var btnStream = Rxjs.Observable.fromEvent(buttonEl, _browserInfo.mouseClickEvtStr()).subscribe(function () {
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

exports['default'] = MessageBoxView();
module.exports = exports['default'];

},{"../../nori/utils/Templating.js":20,"../../nudoru/browser/BrowserInfo.js":28,"../../nudoru/browser/DOMUtils.js":29,"../../nudoru/browser/ThreeDTransforms.js":30,"../../vendor/rxjs/rx.lite.min.js":42,"./ModalCoverView.js":33}],33:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var Rxjs = _interopRequireWildcard(_vendorRxjsRxLiteMinJs);

var ModalCoverView = function ModalCoverView() {

  var _mountPoint = document,
      _modalCoverEl,
      _modalBackgroundEl,
      _modalCloseButtonEl,
      _modalClickStream,
      _isVisible,
      _notDismissible,
      _browserInfo = require('../../nudoru/browser/BrowserInfo.js');

  function initialize() {

    _isVisible = true;

    _modalCoverEl = _mountPoint.getElementById('modal__cover');
    _modalBackgroundEl = _mountPoint.querySelector('.modal__background');
    _modalCloseButtonEl = _mountPoint.querySelector('.modal__close-button');

    var modalBGClick = Rxjs.Observable.fromEvent(_modalBackgroundEl, _browserInfo.mouseClickEvtStr()),
        modalButtonClick = Rxjs.Observable.fromEvent(_modalCloseButtonEl, _browserInfo.mouseClickEvtStr());

    _modalClickStream = Rxjs.Observable.merge(modalBGClick, modalButtonClick).subscribe(function () {
      onModalClick();
    });

    hide(false);
  }

  function getIsVisible() {
    return _isVisible;
  }

  function onModalClick() {
    if (_notDismissible) {
      return;
    }
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

    _notDismissible = false;

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

    _notDismissible = true;

    showModalCover(shouldAnimate);
    TweenLite.to(_modalCloseButtonEl, 0, { autoAlpha: 0 });
  }

  function hide(shouldAnimate) {
    if (!_isVisible) {
      return;
    }
    _isVisible = false;
    _notDismissible = false;
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

exports['default'] = ModalCoverView();
module.exports = exports['default'];

},{"../../nudoru/browser/BrowserInfo.js":28,"../../vendor/rxjs/rx.lite.min.js":42}],34:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var Rxjs = _interopRequireWildcard(_vendorRxjsRxLiteMinJs);

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
        closeBtnSteam = Rxjs.Observable.fromEvent(closeBtn, _browserInfo.mouseClickEvtStr()),
        expireTimeStream = Rxjs.Observable.interval(_defaultExpireDuration);

    toastObj.defaultButtonStream = Rxjs.Observable.merge(closeBtnSteam, expireTimeStream).take(1).subscribe(function () {
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
      element: _template.asElement('component--toast', {
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

exports['default'] = ToastView();
module.exports = exports['default'];

},{"../../nori/utils/Templating.js":20,"../../nudoru/browser/BrowserInfo.js":28,"../../nudoru/browser/DOMUtils.js":29,"../../nudoru/browser/ThreeDTransforms.js":30,"../../vendor/rxjs/rx.lite.min.js":42}],35:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _vendorRxjsRxLiteMinJs = require('../../vendor/rxjs/rx.lite.min.js');

var Rxjs = _interopRequireWildcard(_vendorRxjsRxLiteMinJs);

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
      element: _template.asElement('component--tooltip', {
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

    tooltipObj.elOverStream = Rxjs.Observable.fromEvent(tooltipObj.targetEl, 'mouseover').subscribe(function (evt) {
      showToolTip(tooltipObj.id);
    });

    tooltipObj.elOutStream = Rxjs.Observable.fromEvent(tooltipObj.targetEl, 'mouseout').subscribe(function (evt) {
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

exports['default'] = ToolTipView();
module.exports = exports['default'];

},{"../../nori/utils/Templating.js":20,"../../nudoru/browser/DOMUtils.js":29,"../../vendor/rxjs/rx.lite.min.js":42}],36:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
var _numberUtils = require('./NumberUtils.js');

exports['default'] = {

  arrify: function arrify(a) {
    return Array.prototype.slice.call(a, 0);
  },

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
module.exports = exports['default'];

},{"./NumberUtils.js":37}],37:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

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
module.exports = exports["default"];

},{}],38:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

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
      if (prop === undefined || obj[prop] === undefined) {
        isnull = true;
      }
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
module.exports = exports['default'];

},{}],39:[function(require,module,exports){
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

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
  },

  // From https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L426
  stripTags: function stripTags(str) {
    return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  },

  // From https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L426
  unescapeHTML: function unescapeHTML(str) {
    // Warning: In 1.7 String#unescapeHTML will no longer call String#stripTags.
    return this.stripTags(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  },

  capitalize: function capitalize(str) {
    return str.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  },

  underscore: function underscore(str) {
    return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase();
  },

  dasherize: function dasherize(str) {
    return str.replace(/_/g, '-');
  },

  DOMtoCSSStyle: function DOMtoCSSStyle(str) {
    return this.dasherize(this.underscore(str));
  }

};
module.exports = exports['default'];

},{}],40:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  existy: function existy(x) {
    return x !== null;
  },
  truthy: function truthy(x) {
    return x !== false && this.existy(x);
  },
  falsey: function falsey(x) {
    return !this.truthy(x);
  },
  func: function func(object) {
    return typeof object === "function";
  },
  object: function object(_object) {
    return Object.prototype.toString.call(_object) === "[object Object]";
  },
  objectEmpty: function objectEmpty(object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  },
  string: function string(object) {
    return Object.prototype.toString.call(object) === "[object String]";
  },
  array: function array(object) {
    return Array.isArray(object);
    //return Object.prototype.toString.call(object) === '[object Array]';
  },
  promise: function promise(_promise) {
    return _promise && typeof _promise.then === 'function';
  },
  observable: function observable(_observable) {
    return _observable && typeof _observable.subscribe === 'function';
  },
  element: function element(obj) {
    return typeof HTMLElement === 'object' ? obj instanceof HTMLElement || obj instanceof DocumentFragment : //DOM2
    obj && typeof obj === 'object' && obj !== null && (obj.nodeType === 1 || obj.nodeType === 11) && typeof obj.nodeName === 'string';
  }
};
module.exports = exports["default"];

},{}],41:[function(require,module,exports){
/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Immutable = e();
})(this, function () {
  "use strict";function t(t, e) {
    e && (t.prototype = Object.create(e.prototype)), t.prototype.constructor = t;
  }function e(t) {
    return (t.value = !1, t);
  }function r(t) {
    t && (t.value = !0);
  }function n() {}function i(t, e) {
    e = e || 0;for (var r = Math.max(0, t.length - e), n = Array(r), i = 0; r > i; i++) n[i] = t[i + e];return n;
  }function o(t) {
    return (void 0 === t.size && (t.size = t.__iterate(s)), t.size);
  }function u(t, e) {
    if ("number" != typeof e) {
      var r = e >>> 0;if ("" + r !== e || 4294967295 === r) return NaN;e = r;
    }return 0 > e ? o(t) + e : e;
  }function s() {
    return !0;
  }function a(t, e, r) {
    return (0 === t || void 0 !== r && -r >= t) && (void 0 === e || void 0 !== r && e >= r);
  }function h(t, e) {
    return c(t, e, 0);
  }function f(t, e) {
    return c(t, e, e);
  }function c(t, e, r) {
    return void 0 === t ? r : 0 > t ? Math.max(0, e + t) : void 0 === e ? t : Math.min(e, t);
  }function _(t) {
    return y(t) ? t : O(t);
  }function p(t) {
    return d(t) ? t : x(t);
  }function v(t) {
    return m(t) ? t : k(t);
  }function l(t) {
    return y(t) && !g(t) ? t : A(t);
  }function y(t) {
    return !(!t || !t[vr]);
  }function d(t) {
    return !(!t || !t[lr]);
  }function m(t) {
    return !(!t || !t[yr]);
  }function g(t) {
    return d(t) || m(t);
  }function w(t) {
    return !(!t || !t[dr]);
  }function S(t) {
    this.next = t;
  }function z(t, e, r, n) {
    var i = 0 === t ? e : 1 === t ? r : [e, r];return (n ? n.value = i : n = { value: i, done: !1 }, n);
  }function I() {
    return { value: void 0, done: !0 };
  }function b(t) {
    return !!M(t);
  }function q(t) {
    return t && "function" == typeof t.next;
  }function D(t) {
    var e = M(t);return e && e.call(t);
  }function M(t) {
    var e = t && (Sr && t[Sr] || t[zr]);return "function" == typeof e ? e : void 0;
  }function E(t) {
    return t && "number" == typeof t.length;
  }function O(t) {
    return null === t || void 0 === t ? T() : y(t) ? t.toSeq() : C(t);
  }function x(t) {
    return null === t || void 0 === t ? T().toKeyedSeq() : y(t) ? d(t) ? t.toSeq() : t.fromEntrySeq() : W(t);
  }function k(t) {
    return null === t || void 0 === t ? T() : y(t) ? d(t) ? t.entrySeq() : t.toIndexedSeq() : B(t);
  }function A(t) {
    return (null === t || void 0 === t ? T() : y(t) ? d(t) ? t.entrySeq() : t : B(t)).toSetSeq();
  }function j(t) {
    this._array = t, this.size = t.length;
  }function R(t) {
    var e = Object.keys(t);this._object = t, this._keys = e, this.size = e.length;
  }function U(t) {
    this._iterable = t, this.size = t.length || t.size;
  }function K(t) {
    this._iterator = t, this._iteratorCache = [];
  }function L(t) {
    return !(!t || !t[br]);
  }function T() {
    return qr || (qr = new j([]));
  }function W(t) {
    var e = Array.isArray(t) ? new j(t).fromEntrySeq() : q(t) ? new K(t).fromEntrySeq() : b(t) ? new U(t).fromEntrySeq() : "object" == typeof t ? new R(t) : void 0;if (!e) throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: " + t);return e;
  }function B(t) {
    var e = J(t);if (!e) throw new TypeError("Expected Array or iterable object of values: " + t);return e;
  }function C(t) {
    var e = J(t) || "object" == typeof t && new R(t);if (!e) throw new TypeError("Expected Array or iterable object of values, or keyed object: " + t);return e;
  }function J(t) {
    return E(t) ? new j(t) : q(t) ? new K(t) : b(t) ? new U(t) : void 0;
  }function N(t, e, r, n) {
    var i = t._cache;if (i) {
      for (var o = i.length - 1, u = 0; o >= u; u++) {
        var s = i[r ? o - u : u];if (e(s[1], n ? s[0] : u, t) === !1) return u + 1;
      }return u;
    }return t.__iterateUncached(e, r);
  }function P(t, e, r, n) {
    var i = t._cache;if (i) {
      var o = i.length - 1,
          u = 0;return new S(function () {
        var t = i[r ? o - u : u];return u++ > o ? I() : z(e, n ? t[0] : u - 1, t[1]);
      });
    }return t.__iteratorUncached(e, r);
  }function H() {
    throw TypeError("Abstract");
  }function V() {}function Y() {}function Q() {}function X(t, e) {
    if (t === e || t !== t && e !== e) return !0;if (!t || !e) return !1;if ("function" == typeof t.valueOf && "function" == typeof e.valueOf) {
      if ((t = t.valueOf(), e = e.valueOf(), t === e || t !== t && e !== e)) return !0;if (!t || !e) return !1;
    }return "function" == typeof t.equals && "function" == typeof e.equals && t.equals(e) ? !0 : !1;
  }function F(t, e) {
    return e ? G(e, t, "", { "": t }) : Z(t);
  }function G(t, e, r, n) {
    return Array.isArray(e) ? t.call(n, r, k(e).map(function (r, n) {
      return G(t, r, n, e);
    })) : $(e) ? t.call(n, r, x(e).map(function (r, n) {
      return G(t, r, n, e);
    })) : e;
  }function Z(t) {
    return Array.isArray(t) ? k(t).map(Z).toList() : $(t) ? x(t).map(Z).toMap() : t;
  }function $(t) {
    return t && (t.constructor === Object || void 0 === t.constructor);
  }function tt(t) {
    return t >>> 1 & 1073741824 | 3221225471 & t;
  }function et(t) {
    if (t === !1 || null === t || void 0 === t) return 0;if ("function" == typeof t.valueOf && (t = t.valueOf(), t === !1 || null === t || void 0 === t)) return 0;if (t === !0) return 1;var e = typeof t;if ("number" === e) {
      var r = 0 | t;for (r !== t && (r ^= 4294967295 * t); t > 4294967295;) t /= 4294967295, r ^= t;return tt(r);
    }if ("string" === e) return t.length > jr ? rt(t) : nt(t);if ("function" == typeof t.hashCode) return t.hashCode();if ("object" === e) return it(t);if ("function" == typeof t.toString) return nt("" + t);throw Error("Value type " + e + " cannot be hashed.");
  }function rt(t) {
    var e = Kr[t];return (void 0 === e && (e = nt(t), Ur === Rr && (Ur = 0, Kr = {}), Ur++, Kr[t] = e), e);
  }function nt(t) {
    for (var e = 0, r = 0; t.length > r; r++) e = 31 * e + t.charCodeAt(r) | 0;return tt(e);
  }function it(t) {
    var e;if (xr && (e = Dr.get(t), void 0 !== e)) return e;if ((e = t[Ar], void 0 !== e)) return e;if (!Or) {
      if ((e = t.propertyIsEnumerable && t.propertyIsEnumerable[Ar], void 0 !== e)) return e;if ((e = ot(t), void 0 !== e)) return e;
    }if ((e = ++kr, 1073741824 & kr && (kr = 0), xr)) Dr.set(t, e);else {
      if (void 0 !== Er && Er(t) === !1) throw Error("Non-extensible objects are not allowed as keys.");if (Or) Object.defineProperty(t, Ar, { enumerable: !1, configurable: !1, writable: !1, value: e });else if (void 0 !== t.propertyIsEnumerable && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable) t.propertyIsEnumerable = function () {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      }, t.propertyIsEnumerable[Ar] = e;else {
        if (void 0 === t.nodeType) throw Error("Unable to set a non-enumerable property on object.");t[Ar] = e;
      }
    }return e;
  }function ot(t) {
    if (t && t.nodeType > 0) switch (t.nodeType) {case 1:
        return t.uniqueID;case 9:
        return t.documentElement && t.documentElement.uniqueID;}
  }function ut(t, e) {
    if (!t) throw Error(e);
  }function st(t) {
    ut(t !== 1 / 0, "Cannot perform this action with an infinite size.");
  }function at(t, e) {
    this._iter = t, this._useKeys = e, this.size = t.size;
  }function ht(t) {
    this._iter = t, this.size = t.size;
  }function ft(t) {
    this._iter = t, this.size = t.size;
  }function ct(t) {
    this._iter = t, this.size = t.size;
  }function _t(t) {
    var e = jt(t);return (e._iter = t, e.size = t.size, e.flip = function () {
      return t;
    }, e.reverse = function () {
      var e = t.reverse.apply(this);return (e.flip = function () {
        return t.reverse();
      }, e);
    }, e.has = function (e) {
      return t.includes(e);
    }, e.includes = function (e) {
      return t.has(e);
    }, e.cacheResult = Rt, e.__iterateUncached = function (e, r) {
      var n = this;return t.__iterate(function (t, r) {
        return e(r, t, n) !== !1;
      }, r);
    }, e.__iteratorUncached = function (e, r) {
      if (e === wr) {
        var n = t.__iterator(e, r);return new S(function () {
          var t = n.next();if (!t.done) {
            var e = t.value[0];t.value[0] = t.value[1], t.value[1] = e;
          }return t;
        });
      }return t.__iterator(e === gr ? mr : gr, r);
    }, e);
  }function pt(t, e, r) {
    var n = jt(t);return (n.size = t.size, n.has = function (e) {
      return t.has(e);
    }, n.get = function (n, i) {
      var o = t.get(n, cr);return o === cr ? i : e.call(r, o, n, t);
    }, n.__iterateUncached = function (n, i) {
      var o = this;return t.__iterate(function (t, i, u) {
        return n(e.call(r, t, i, u), i, o) !== !1;
      }, i);
    }, n.__iteratorUncached = function (n, i) {
      var o = t.__iterator(wr, i);return new S(function () {
        var i = o.next();if (i.done) return i;var u = i.value,
            s = u[0];return z(n, s, e.call(r, u[1], s, t), i);
      });
    }, n);
  }function vt(t, e) {
    var r = jt(t);return (r._iter = t, r.size = t.size, r.reverse = function () {
      return t;
    }, t.flip && (r.flip = function () {
      var e = _t(t);return (e.reverse = function () {
        return t.flip();
      }, e);
    }), r.get = function (r, n) {
      return t.get(e ? r : -1 - r, n);
    }, r.has = function (r) {
      return t.has(e ? r : -1 - r);
    }, r.includes = function (e) {
      return t.includes(e);
    }, r.cacheResult = Rt, r.__iterate = function (e, r) {
      var n = this;return t.__iterate(function (t, r) {
        return e(t, r, n);
      }, !r);
    }, r.__iterator = function (e, r) {
      return t.__iterator(e, !r);
    }, r);
  }function lt(t, e, r, n) {
    var i = jt(t);return (n && (i.has = function (n) {
      var i = t.get(n, cr);return i !== cr && !!e.call(r, i, n, t);
    }, i.get = function (n, i) {
      var o = t.get(n, cr);return o !== cr && e.call(r, o, n, t) ? o : i;
    }), i.__iterateUncached = function (i, o) {
      var u = this,
          s = 0;return (t.__iterate(function (t, o, a) {
        return e.call(r, t, o, a) ? (s++, i(t, n ? o : s - 1, u)) : void 0;
      }, o), s);
    }, i.__iteratorUncached = function (i, o) {
      var u = t.__iterator(wr, o),
          s = 0;return new S(function () {
        for (;;) {
          var o = u.next();if (o.done) return o;var a = o.value,
              h = a[0],
              f = a[1];if (e.call(r, f, h, t)) return z(i, n ? h : s++, f, o);
        }
      });
    }, i);
  }function yt(t, e, r) {
    var n = Lt().asMutable();return (t.__iterate(function (i, o) {
      n.update(e.call(r, i, o, t), 0, function (t) {
        return t + 1;
      });
    }), n.asImmutable());
  }function dt(t, e, r) {
    var n = d(t),
        i = (w(t) ? Ie() : Lt()).asMutable();
    t.__iterate(function (o, u) {
      i.update(e.call(r, o, u, t), function (t) {
        return (t = t || [], t.push(n ? [u, o] : o), t);
      });
    });var o = At(t);return i.map(function (e) {
      return Ot(t, o(e));
    });
  }function mt(_x, _x2, _x3, _x4) {
    var _again = true;

    _function: while (_again) {
      var t = _x,
          e = _x2,
          r = _x3,
          n = _x4;
      i = o = s = c = _ = p = undefined;
      _again = false;
      var i = t.size;if ((void 0 !== e && (e = 0 | e), void 0 !== r && (r = 0 | r), a(e, r, i))) return t;var o = h(e, i),
          s = f(r, i);if (o !== o || s !== s) {
        _x = t.toSeq().cacheResult();
        _x2 = e;
        _x3 = r;
        _x4 = n;
        _again = true;
        continue _function;
      }var c,
          _ = s - o;_ === _ && (c = 0 > _ ? 0 : _);var p = jt(t);return (p.size = 0 === c ? c : t.size && c || void 0, !n && L(t) && c >= 0 && (p.get = function (e, r) {
        return (e = u(this, e), e >= 0 && c > e ? t.get(e + o, r) : r);
      }), p.__iterateUncached = function (e, r) {
        var i = this;if (0 === c) return 0;if (r) return this.cacheResult().__iterate(e, r);var u = 0,
            s = !0,
            a = 0;return (t.__iterate(function (t, r) {
          return s && (s = u++ < o) ? void 0 : (a++, e(t, n ? r : a - 1, i) !== !1 && a !== c);
        }), a);
      }, p.__iteratorUncached = function (e, r) {
        if (0 !== c && r) return this.cacheResult().__iterator(e, r);var i = 0 !== c && t.__iterator(e, r),
            u = 0,
            s = 0;return new S(function () {
          for (; u++ < o;) i.next();if (++s > c) return I();var t = i.next();return n || e === gr ? t : e === mr ? z(e, s - 1, void 0, t) : z(e, s - 1, t.value[1], t);
        });
      }, p);
    }
  }function gt(t, e, r) {
    var n = jt(t);return (n.__iterateUncached = function (n, i) {
      var o = this;if (i) return this.cacheResult().__iterate(n, i);var u = 0;return (t.__iterate(function (t, i, s) {
        return e.call(r, t, i, s) && ++u && n(t, i, o);
      }), u);
    }, n.__iteratorUncached = function (n, i) {
      var o = this;if (i) return this.cacheResult().__iterator(n, i);var u = t.__iterator(wr, i),
          s = !0;return new S(function () {
        if (!s) return I();var t = u.next();if (t.done) return t;var i = t.value,
            a = i[0],
            h = i[1];return e.call(r, h, a, o) ? n === wr ? t : z(n, a, h, t) : (s = !1, I());
      });
    }, n);
  }function wt(t, e, r, n) {
    var i = jt(t);return (i.__iterateUncached = function (i, o) {
      var u = this;if (o) return this.cacheResult().__iterate(i, o);var s = !0,
          a = 0;return (t.__iterate(function (t, o, h) {
        return s && (s = e.call(r, t, o, h)) ? void 0 : (a++, i(t, n ? o : a - 1, u));
      }), a);
    }, i.__iteratorUncached = function (i, o) {
      var u = this;if (o) return this.cacheResult().__iterator(i, o);var s = t.__iterator(wr, o),
          a = !0,
          h = 0;return new S(function () {
        var t, o, f;do {
          if ((t = s.next(), t.done)) return n || i === gr ? t : i === mr ? z(i, h++, void 0, t) : z(i, h++, t.value[1], t);var c = t.value;o = c[0], f = c[1], a && (a = e.call(r, f, o, u));
        } while (a);
        return i === wr ? t : z(i, o, f, t);
      });
    }, i);
  }function St(t, e) {
    var r = d(t),
        n = [t].concat(e).map(function (t) {
      return (y(t) ? r && (t = p(t)) : t = r ? W(t) : B(Array.isArray(t) ? t : [t]), t);
    }).filter(function (t) {
      return 0 !== t.size;
    });if (0 === n.length) return t;if (1 === n.length) {
      var i = n[0];if (i === t || r && d(i) || m(t) && m(i)) return i;
    }var o = new j(n);return (r ? o = o.toKeyedSeq() : m(t) || (o = o.toSetSeq()), o = o.flatten(!0), o.size = n.reduce(function (t, e) {
      if (void 0 !== t) {
        var r = e.size;if (void 0 !== r) return t + r;
      }
    }, 0), o);
  }function zt(t, e, r) {
    var n = jt(t);return (n.__iterateUncached = function (n, i) {
      function o(t, a) {
        var h = this;t.__iterate(function (t, i) {
          return ((!e || e > a) && y(t) ? o(t, a + 1) : n(t, r ? i : u++, h) === !1 && (s = !0), !s);
        }, i);
      }var u = 0,
          s = !1;return (o(t, 0), u);
    }, n.__iteratorUncached = function (n, i) {
      var o = t.__iterator(n, i),
          u = [],
          s = 0;return new S(function () {
        for (; o;) {
          var t = o.next();if (t.done === !1) {
            var a = t.value;if ((n === wr && (a = a[1]), e && !(e > u.length) || !y(a))) return r ? t : z(n, s++, a, t);u.push(o), o = a.__iterator(n, i);
          } else o = u.pop();
        }return I();
      });
    }, n);
  }function It(t, e, r) {
    var n = At(t);return t.toSeq().map(function (i, o) {
      return n(e.call(r, i, o, t));
    }).flatten(!0);
  }function bt(t, e) {
    var r = jt(t);return (r.size = t.size && 2 * t.size - 1, r.__iterateUncached = function (r, n) {
      var i = this,
          o = 0;return (t.__iterate(function (t) {
        return (!o || r(e, o++, i) !== !1) && r(t, o++, i) !== !1;
      }, n), o);
    }, r.__iteratorUncached = function (r, n) {
      var i,
          o = t.__iterator(gr, n),
          u = 0;return new S(function () {
        return (!i || u % 2) && (i = o.next(), i.done) ? i : u % 2 ? z(r, u++, e) : z(r, u++, i.value, i);
      });
    }, r);
  }function qt(t, e, r) {
    e || (e = Ut);var n = d(t),
        i = 0,
        o = t.toSeq().map(function (e, n) {
      return [n, e, i++, r ? r(e, n, t) : e];
    }).toArray();return (o.sort(function (t, r) {
      return e(t[3], r[3]) || t[2] - r[2];
    }).forEach(n ? function (t, e) {
      o[e].length = 2;
    } : function (t, e) {
      o[e] = t[1];
    }), n ? x(o) : m(t) ? k(o) : A(o));
  }function Dt(t, e, r) {
    if ((e || (e = Ut), r)) {
      var n = t.toSeq().map(function (e, n) {
        return [e, r(e, n, t)];
      }).reduce(function (t, r) {
        return Mt(e, t[1], r[1]) ? r : t;
      });return n && n[0];
    }return t.reduce(function (t, r) {
      return Mt(e, t, r) ? r : t;
    });
  }function Mt(t, e, r) {
    var n = t(r, e);return 0 === n && r !== e && (void 0 === r || null === r || r !== r) || n > 0;
  }function Et(t, e, r) {
    var n = jt(t);return (n.size = new j(r).map(function (t) {
      return t.size;
    }).min(), n.__iterate = function (t, e) {
      for (var r, n = this.__iterator(gr, e), i = 0; !(r = n.next()).done && t(r.value, i++, this) !== !1;);return i;
    }, n.__iteratorUncached = function (t, n) {
      var i = r.map(function (t) {
        return (t = _(t), D(n ? t.reverse() : t));
      }),
          o = 0,
          u = !1;return new S(function () {
        var r;return (u || (r = i.map(function (t) {
          return t.next();
        }), u = r.some(function (t) {
          return t.done;
        })), u ? I() : z(t, o++, e.apply(null, r.map(function (t) {
          return t.value;
        }))));
      });
    }, n);
  }function Ot(t, e) {
    return L(t) ? e : t.constructor(e);
  }function xt(t) {
    if (t !== Object(t)) throw new TypeError("Expected [K, V] tuple: " + t);
  }function kt(t) {
    return (st(t.size), o(t));
  }function At(t) {
    return d(t) ? p : m(t) ? v : l;
  }function jt(t) {
    return Object.create((d(t) ? x : m(t) ? k : A).prototype);
  }function Rt() {
    return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : O.prototype.cacheResult.call(this);
  }function Ut(t, e) {
    return t > e ? 1 : e > t ? -1 : 0;
  }function Kt(t) {
    var e = D(t);if (!e) {
      if (!E(t)) throw new TypeError("Expected iterable or array-like: " + t);e = D(_(t));
    }return e;
  }function Lt(t) {
    return null === t || void 0 === t ? Qt() : Tt(t) && !w(t) ? t : Qt().withMutations(function (e) {
      var r = p(t);st(r.size), r.forEach(function (t, r) {
        return e.set(r, t);
      });
    });
  }function Tt(t) {
    return !(!t || !t[Lr]);
  }function Wt(t, e) {
    this.ownerID = t, this.entries = e;
  }function Bt(t, e, r) {
    this.ownerID = t, this.bitmap = e, this.nodes = r;
  }function Ct(t, e, r) {
    this.ownerID = t, this.count = e, this.nodes = r;
  }function Jt(t, e, r) {
    this.ownerID = t, this.keyHash = e, this.entries = r;
  }function Nt(t, e, r) {
    this.ownerID = t, this.keyHash = e, this.entry = r;
  }function Pt(t, e, r) {
    this._type = e, this._reverse = r, this._stack = t._root && Vt(t._root);
  }function Ht(t, e) {
    return z(t, e[0], e[1]);
  }function Vt(t, e) {
    return { node: t, index: 0, __prev: e };
  }function Yt(t, e, r, n) {
    var i = Object.create(Tr);return (i.size = t, i._root = e, i.__ownerID = r, i.__hash = n, i.__altered = !1, i);
  }function Qt() {
    return Wr || (Wr = Yt(0));
  }function Xt(t, r, n) {
    var i, o;if (t._root) {
      var u = e(_r),
          s = e(pr);if ((i = Ft(t._root, t.__ownerID, 0, void 0, r, n, u, s), !s.value)) return t;o = t.size + (u.value ? n === cr ? -1 : 1 : 0);
    } else {
      if (n === cr) return t;o = 1, i = new Wt(t.__ownerID, [[r, n]]);
    }return t.__ownerID ? (t.size = o, t._root = i, t.__hash = void 0, t.__altered = !0, t) : i ? Yt(o, i) : Qt();
  }function Ft(t, e, n, i, o, u, s, a) {
    return t ? t.update(e, n, i, o, u, s, a) : u === cr ? t : (r(a), r(s), new Nt(e, i, [o, u]));
  }function Gt(t) {
    return t.constructor === Nt || t.constructor === Jt;
  }function Zt(t, e, r, n, i) {
    if (t.keyHash === n) return new Jt(e, n, [t.entry, i]);var o,
        u = (0 === r ? t.keyHash : t.keyHash >>> r) & fr,
        s = (0 === r ? n : n >>> r) & fr,
        a = u === s ? [Zt(t, e, r + ar, n, i)] : (o = new Nt(e, n, i), s > u ? [t, o] : [o, t]);return new Bt(e, 1 << u | 1 << s, a);
  }function $t(t, e, r, i) {
    t || (t = new n());for (var o = new Nt(t, et(r), [r, i]), u = 0; e.length > u; u++) {
      var s = e[u];o = o.update(t, 0, void 0, s[0], s[1]);
    }return o;
  }function te(t, e, r, n) {
    for (var i = 0, o = 0, u = Array(r), s = 0, a = 1, h = e.length; h > s; s++, a <<= 1) {
      var f = e[s];void 0 !== f && s !== n && (i |= a, u[o++] = f);
    }return new Bt(t, i, u);
  }function ee(t, e, r, n, i) {
    for (var o = 0, u = Array(hr), s = 0; 0 !== r; s++, r >>>= 1) u[s] = 1 & r ? e[o++] : void 0;return (u[n] = i, new Ct(t, o + 1, u));
  }function re(t, e, r) {
    for (var n = [], i = 0; r.length > i; i++) {
      var o = r[i],
          u = p(o);y(o) || (u = u.map(function (t) {
        return F(t);
      })), n.push(u);
    }return ie(t, e, n);
  }function ne(t) {
    return function (e, r, n) {
      return e && e.mergeDeepWith && y(r) ? e.mergeDeepWith(t, r) : t ? t(e, r, n) : r;
    };
  }function ie(t, e, r) {
    return (r = r.filter(function (t) {
      return 0 !== t.size;
    }), 0 === r.length ? t : 0 !== t.size || t.__ownerID || 1 !== r.length ? t.withMutations(function (t) {
      for (var n = e ? function (r, n) {
        t.update(n, cr, function (t) {
          return t === cr ? r : e(t, r, n);
        });
      } : function (e, r) {
        t.set(r, e);
      }, i = 0; r.length > i; i++) r[i].forEach(n);
    }) : t.constructor(r[0]));
  }function oe(t, e, r, n) {
    var i = t === cr,
        o = e.next();if (o.done) {
      var u = i ? r : t,
          s = n(u);return s === u ? t : s;
    }ut(i || t && t.set, "invalid keyPath");var a = o.value,
        h = i ? cr : t.get(a, cr),
        f = oe(h, e, r, n);return f === h ? t : f === cr ? t.remove(a) : (i ? Qt() : t).set(a, f);
  }function ue(t) {
    return (t -= t >> 1 & 1431655765, t = (858993459 & t) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, t += t >> 8, t += t >> 16, 127 & t);
  }function se(t, e, r, n) {
    var o = n ? t : i(t);return (o[e] = r, o);
  }function ae(t, e, r, n) {
    var i = t.length + 1;if (n && e + 1 === i) return (t[e] = r, t);for (var o = Array(i), u = 0, s = 0; i > s; s++) s === e ? (o[s] = r, u = -1) : o[s] = t[s + u];return o;
  }function he(t, e, r) {
    var n = t.length - 1;if (r && e === n) return (t.pop(), t);for (var i = Array(n), o = 0, u = 0; n > u; u++) u === e && (o = 1), i[u] = t[u + o];return i;
  }function fe(t) {
    var e = le();if (null === t || void 0 === t) return e;if (ce(t)) return t;var r = v(t),
        n = r.size;return 0 === n ? e : (st(n), n > 0 && hr > n ? ve(0, n, ar, null, new _e(r.toArray())) : e.withMutations(function (t) {
      t.setSize(n), r.forEach(function (e, r) {
        return t.set(r, e);
      });
    }));
  }function ce(t) {
    return !(!t || !t[Nr]);
  }function _e(t, e) {
    this.array = t, this.ownerID = e;
  }function pe(t, e) {
    function r(t, e, r) {
      return 0 === e ? n(t, r) : i(t, e, r);
    }function n(t, r) {
      var n = r === s ? a && a.array : t && t.array,
          i = r > o ? 0 : o - r,
          h = u - r;return (h > hr && (h = hr), function () {
        if (i === h) return Vr;var t = e ? --h : i++;return n && n[t];
      });
    }function i(t, n, i) {
      var s,
          a = t && t.array,
          h = i > o ? 0 : o - i >> n,
          f = (u - i >> n) + 1;return (f > hr && (f = hr), function () {
        for (;;) {
          if (s) {
            var t = s();if (t !== Vr) return t;s = null;
          }if (h === f) return Vr;var o = e ? --f : h++;s = r(a && a[o], n - ar, i + (o << n));
        }
      });
    }var o = t._origin,
        u = t._capacity,
        s = ze(u),
        a = t._tail;return r(t._root, t._level, 0);
  }function ve(t, e, r, n, i, o, u) {
    var s = Object.create(Pr);return (s.size = e - t, s._origin = t, s._capacity = e, s._level = r, s._root = n, s._tail = i, s.__ownerID = o, s.__hash = u, s.__altered = !1, s);
  }function le() {
    return Hr || (Hr = ve(0, 0, ar));
  }function ye(t, r, n) {
    if ((r = u(t, r), r !== r)) return t;if (r >= t.size || 0 > r) return t.withMutations(function (t) {
      0 > r ? we(t, r).set(0, n) : we(t, 0, r + 1).set(r, n);
    });r += t._origin;var i = t._tail,
        o = t._root,
        s = e(pr);return (r >= ze(t._capacity) ? i = de(i, t.__ownerID, 0, r, n, s) : o = de(o, t.__ownerID, t._level, r, n, s), s.value ? t.__ownerID ? (t._root = o, t._tail = i, t.__hash = void 0, t.__altered = !0, t) : ve(t._origin, t._capacity, t._level, o, i) : t);
  }function de(t, e, n, i, o, u) {
    var s = i >>> n & fr,
        a = t && t.array.length > s;if (!a && void 0 === o) return t;var h;if (n > 0) {
      var f = t && t.array[s],
          c = de(f, e, n - ar, i, o, u);return c === f ? t : (h = me(t, e), h.array[s] = c, h);
    }return a && t.array[s] === o ? t : (r(u), h = me(t, e), void 0 === o && s === h.array.length - 1 ? h.array.pop() : h.array[s] = o, h);
  }function me(t, e) {
    return e && t && e === t.ownerID ? t : new _e(t ? t.array.slice() : [], e);
  }function ge(t, e) {
    if (e >= ze(t._capacity)) return t._tail;if (1 << t._level + ar > e) {
      for (var r = t._root, n = t._level; r && n > 0;) r = r.array[e >>> n & fr], n -= ar;return r;
    }
  }function we(t, e, r) {
    void 0 !== e && (e = 0 | e), void 0 !== r && (r = 0 | r);var i = t.__ownerID || new n(),
        o = t._origin,
        u = t._capacity,
        s = o + e,
        a = void 0 === r ? u : 0 > r ? u + r : o + r;
    if (s === o && a === u) return t;if (s >= a) return t.clear();for (var h = t._level, f = t._root, c = 0; 0 > s + c;) f = new _e(f && f.array.length ? [void 0, f] : [], i), h += ar, c += 1 << h;c && (s += c, o += c, a += c, u += c);for (var _ = ze(u), p = ze(a); p >= 1 << h + ar;) f = new _e(f && f.array.length ? [f] : [], i), h += ar;var v = t._tail,
        l = _ > p ? ge(t, a - 1) : p > _ ? new _e([], i) : v;if (v && p > _ && u > s && v.array.length) {
      f = me(f, i);for (var y = f, d = h; d > ar; d -= ar) {
        var m = _ >>> d & fr;y = y.array[m] = me(y.array[m], i);
      }y.array[_ >>> ar & fr] = v;
    }if ((u > a && (l = l && l.removeAfter(i, 0, a)), s >= p)) s -= p, a -= p, h = ar, f = null, l = l && l.removeBefore(i, 0, s);else if (s > o || _ > p) {
      for (c = 0; f;) {
        var g = s >>> h & fr;if (g !== p >>> h & fr) break;g && (c += (1 << h) * g), h -= ar, f = f.array[g];
      }f && s > o && (f = f.removeBefore(i, h, s - c)), f && _ > p && (f = f.removeAfter(i, h, p - c)), c && (s -= c, a -= c);
    }return t.__ownerID ? (t.size = a - s, t._origin = s, t._capacity = a, t._level = h, t._root = f, t._tail = l, t.__hash = void 0, t.__altered = !0, t) : ve(s, a, h, f, l);
  }function Se(t, e, r) {
    for (var n = [], i = 0, o = 0; r.length > o; o++) {
      var u = r[o],
          s = v(u);s.size > i && (i = s.size), y(u) || (s = s.map(function (t) {
        return F(t);
      })), n.push(s);
    }return (i > t.size && (t = t.setSize(i)), ie(t, e, n));
  }function ze(t) {
    return hr > t ? 0 : t - 1 >>> ar << ar;
  }function Ie(t) {
    return null === t || void 0 === t ? De() : be(t) ? t : De().withMutations(function (e) {
      var r = p(t);st(r.size), r.forEach(function (t, r) {
        return e.set(r, t);
      });
    });
  }function be(t) {
    return Tt(t) && w(t);
  }function qe(t, e, r, n) {
    var i = Object.create(Ie.prototype);return (i.size = t ? t.size : 0, i._map = t, i._list = e, i.__ownerID = r, i.__hash = n, i);
  }function De() {
    return Yr || (Yr = qe(Qt(), le()));
  }function Me(t, e, r) {
    var n,
        i,
        o = t._map,
        u = t._list,
        s = o.get(e),
        a = void 0 !== s;if (r === cr) {
      if (!a) return t;u.size >= hr && u.size >= 2 * o.size ? (i = u.filter(function (t, e) {
        return void 0 !== t && s !== e;
      }), n = i.toKeyedSeq().map(function (t) {
        return t[0];
      }).flip().toMap(), t.__ownerID && (n.__ownerID = i.__ownerID = t.__ownerID)) : (n = o.remove(e), i = s === u.size - 1 ? u.pop() : u.set(s, void 0));
    } else if (a) {
      if (r === u.get(s)[1]) return t;n = o, i = u.set(s, [e, r]);
    } else n = o.set(e, u.size), i = u.set(u.size, [e, r]);return t.__ownerID ? (t.size = n.size, t._map = n, t._list = i, t.__hash = void 0, t) : qe(n, i);
  }function Ee(t) {
    return null === t || void 0 === t ? ke() : Oe(t) ? t : ke().unshiftAll(t);
  }function Oe(t) {
    return !(!t || !t[Qr]);
  }function xe(t, e, r, n) {
    var i = Object.create(Xr);return (i.size = t, i._head = e, i.__ownerID = r, i.__hash = n, i.__altered = !1, i);
  }function ke() {
    return Fr || (Fr = xe(0));
  }function Ae(t) {
    return null === t || void 0 === t ? Ke() : je(t) && !w(t) ? t : Ke().withMutations(function (e) {
      var r = l(t);st(r.size), r.forEach(function (t) {
        return e.add(t);
      });
    });
  }function je(t) {
    return !(!t || !t[Gr]);
  }function Re(t, e) {
    return t.__ownerID ? (t.size = e.size, t._map = e, t) : e === t._map ? t : 0 === e.size ? t.__empty() : t.__make(e);
  }function Ue(t, e) {
    var r = Object.create(Zr);return (r.size = t ? t.size : 0, r._map = t, r.__ownerID = e, r);
  }function Ke() {
    return $r || ($r = Ue(Qt()));
  }function Le(t) {
    return null === t || void 0 === t ? Be() : Te(t) ? t : Be().withMutations(function (e) {
      var r = l(t);st(r.size), r.forEach(function (t) {
        return e.add(t);
      });
    });
  }function Te(t) {
    return je(t) && w(t);
  }function We(t, e) {
    var r = Object.create(tn);return (r.size = t ? t.size : 0, r._map = t, r.__ownerID = e, r);
  }function Be() {
    return en || (en = We(De()));
  }function Ce(t, e) {
    var r,
        n = function n(o) {
      if (o instanceof n) return o;if (!(this instanceof n)) return new n(o);if (!r) {
        r = !0;var u = Object.keys(t);Pe(i, u), i.size = u.length, i._name = e, i._keys = u, i._defaultValues = t;
      }this._map = Lt(o);
    },
        i = n.prototype = Object.create(rn);return (i.constructor = n, n);
  }function Je(t, e, r) {
    var n = Object.create(Object.getPrototypeOf(t));return (n._map = e, n.__ownerID = r, n);
  }function Ne(t) {
    return t._name || t.constructor.name || "Record";
  }function Pe(t, e) {
    try {
      e.forEach(He.bind(void 0, t));
    } catch (r) {}
  }function He(t, e) {
    Object.defineProperty(t, e, { get: function get() {
        return this.get(e);
      }, set: function set(t) {
        ut(this.__ownerID, "Cannot set on an immutable record."), this.set(e, t);
      } });
  }function Ve(t, e) {
    if (t === e) return !0;if (!y(e) || void 0 !== t.size && void 0 !== e.size && t.size !== e.size || void 0 !== t.__hash && void 0 !== e.__hash && t.__hash !== e.__hash || d(t) !== d(e) || m(t) !== m(e) || w(t) !== w(e)) return !1;if (0 === t.size && 0 === e.size) return !0;var r = !g(t);if (w(t)) {
      var n = t.entries();return e.every(function (t, e) {
        var i = n.next().value;return i && X(i[1], t) && (r || X(i[0], e));
      }) && n.next().done;
    }var i = !1;if (void 0 === t.size) if (void 0 === e.size) "function" == typeof t.cacheResult && t.cacheResult();else {
      i = !0;var o = t;t = e, e = o;
    }var u = !0,
        s = e.__iterate(function (e, n) {
      return (r ? t.has(e) : i ? X(e, t.get(n, cr)) : X(t.get(n, cr), e)) ? void 0 : (u = !1, !1);
    });return u && t.size === s;
  }function Ye(t, e, r) {
    if (!(this instanceof Ye)) return new Ye(t, e, r);if ((ut(0 !== r, "Cannot step a Range by 0"), t = t || 0, void 0 === e && (e = 1 / 0), r = void 0 === r ? 1 : Math.abs(r), t > e && (r = -r), this._start = t, this._end = e, this._step = r, this.size = Math.max(0, Math.ceil((e - t) / r - 1) + 1), 0 === this.size)) {
      if (nn) return nn;nn = this;
    }
  }function Qe(t, e) {
    if (!(this instanceof Qe)) return new Qe(t, e);if ((this._value = t, this.size = void 0 === e ? 1 / 0 : Math.max(0, e), 0 === this.size)) {
      if (on) return on;on = this;
    }
  }function Xe(t, e) {
    var r = function r(_r2) {
      t.prototype[_r2] = e[_r2];
    };return (Object.keys(e).forEach(r), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(e).forEach(r), t);
  }function Fe(t, e) {
    return e;
  }function Ge(t, e) {
    return [e, t];
  }function Ze(t) {
    return function () {
      return !t.apply(this, arguments);
    };
  }function $e(t) {
    return function () {
      return -t.apply(this, arguments);
    };
  }function tr(t) {
    return "string" == typeof t ? JSON.stringify(t) : t;
  }function er() {
    return i(arguments);
  }function rr(t, e) {
    return e > t ? 1 : t > e ? -1 : 0;
  }function nr(t) {
    if (t.size === 1 / 0) return 0;var e = w(t),
        r = d(t),
        n = e ? 1 : 0,
        i = t.__iterate(r ? e ? function (t, e) {
      n = 31 * n + or(et(t), et(e)) | 0;
    } : function (t, e) {
      n = n + or(et(t), et(e)) | 0;
    } : e ? function (t) {
      n = 31 * n + et(t) | 0;
    } : function (t) {
      n = n + et(t) | 0;
    });return ir(i, n);
  }function ir(t, e) {
    return (e = Mr(e, 3432918353), e = Mr(e << 15 | e >>> -15, 461845907), e = Mr(e << 13 | e >>> -13, 5), e = (e + 3864292196 | 0) ^ t, e = Mr(e ^ e >>> 16, 2246822507), e = Mr(e ^ e >>> 13, 3266489909), e = tt(e ^ e >>> 16));
  }function or(t, e) {
    return t ^ e + 2654435769 + (t << 6) + (t >> 2) | 0;
  }var ur = Array.prototype.slice,
      sr = "delete",
      ar = 5,
      hr = 1 << ar,
      fr = hr - 1,
      cr = {},
      _r = { value: !1 },
      pr = { value: !1 };t(p, _), t(v, _), t(l, _), _.isIterable = y, _.isKeyed = d, _.isIndexed = m, _.isAssociative = g, _.isOrdered = w, _.Keyed = p, _.Indexed = v, _.Set = l;var vr = "@@__IMMUTABLE_ITERABLE__@@",
      lr = "@@__IMMUTABLE_KEYED__@@",
      yr = "@@__IMMUTABLE_INDEXED__@@",
      dr = "@@__IMMUTABLE_ORDERED__@@",
      mr = 0,
      gr = 1,
      wr = 2,
      Sr = "function" == typeof Symbol && Symbol.iterator,
      zr = "@@iterator",
      Ir = Sr || zr;S.prototype.toString = function () {
    return "[Iterator]";
  }, S.KEYS = mr, S.VALUES = gr, S.ENTRIES = wr, S.prototype.inspect = S.prototype.toSource = function () {
    return "" + this;
  }, S.prototype[Ir] = function () {
    return this;
  }, t(O, _), O.of = function () {
    return O(arguments);
  }, O.prototype.toSeq = function () {
    return this;
  }, O.prototype.toString = function () {
    return this.__toString("Seq {", "}");
  }, O.prototype.cacheResult = function () {
    return (!this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this);
  }, O.prototype.__iterate = function (t, e) {
    return N(this, t, e, !0);
  }, O.prototype.__iterator = function (t, e) {
    return P(this, t, e, !0);
  }, t(x, O), x.prototype.toKeyedSeq = function () {
    return this;
  }, t(k, O), k.of = function () {
    return k(arguments);
  }, k.prototype.toIndexedSeq = function () {
    return this;
  }, k.prototype.toString = function () {
    return this.__toString("Seq [", "]");
  }, k.prototype.__iterate = function (t, e) {
    return N(this, t, e, !1);
  }, k.prototype.__iterator = function (t, e) {
    return P(this, t, e, !1);
  }, t(A, O), A.of = function () {
    return A(arguments);
  }, A.prototype.toSetSeq = function () {
    return this;
  }, O.isSeq = L, O.Keyed = x, O.Set = A, O.Indexed = k;var br = "@@__IMMUTABLE_SEQ__@@";O.prototype[br] = !0, t(j, k), j.prototype.get = function (t, e) {
    return this.has(t) ? this._array[u(this, t)] : e;
  }, j.prototype.__iterate = function (t, e) {
    for (var r = this._array, n = r.length - 1, i = 0; n >= i; i++) if (t(r[e ? n - i : i], i, this) === !1) return i + 1;return i;
  }, j.prototype.__iterator = function (t, e) {
    var r = this._array,
        n = r.length - 1,
        i = 0;return new S(function () {
      return i > n ? I() : z(t, i, r[e ? n - i++ : i++]);
    });
  }, t(R, x), R.prototype.get = function (t, e) {
    return void 0 === e || this.has(t) ? this._object[t] : e;
  }, R.prototype.has = function (t) {
    return this._object.hasOwnProperty(t);
  }, R.prototype.__iterate = function (t, e) {
    for (var r = this._object, n = this._keys, i = n.length - 1, o = 0; i >= o; o++) {
      var u = n[e ? i - o : o];if (t(r[u], u, this) === !1) return o + 1;
    }return o;
  }, R.prototype.__iterator = function (t, e) {
    var r = this._object,
        n = this._keys,
        i = n.length - 1,
        o = 0;return new S(function () {
      var u = n[e ? i - o : o];return o++ > i ? I() : z(t, u, r[u]);
    });
  }, R.prototype[dr] = !0, t(U, k), U.prototype.__iterateUncached = function (t, e) {
    if (e) return this.cacheResult().__iterate(t, e);var r = this._iterable,
        n = D(r),
        i = 0;if (q(n)) for (var o; !(o = n.next()).done && t(o.value, i++, this) !== !1;);
    return i;
  }, U.prototype.__iteratorUncached = function (t, e) {
    if (e) return this.cacheResult().__iterator(t, e);var r = this._iterable,
        n = D(r);if (!q(n)) return new S(I);var i = 0;return new S(function () {
      var e = n.next();return e.done ? e : z(t, i++, e.value);
    });
  }, t(K, k), K.prototype.__iterateUncached = function (t, e) {
    if (e) return this.cacheResult().__iterate(t, e);for (var r = this._iterator, n = this._iteratorCache, i = 0; n.length > i;) if (t(n[i], i++, this) === !1) return i;for (var o; !(o = r.next()).done;) {
      var u = o.value;if ((n[i] = u, t(u, i++, this) === !1)) break;
    }return i;
  }, K.prototype.__iteratorUncached = function (t, e) {
    if (e) return this.cacheResult().__iterator(t, e);var r = this._iterator,
        n = this._iteratorCache,
        i = 0;return new S(function () {
      if (i >= n.length) {
        var e = r.next();if (e.done) return e;n[i] = e.value;
      }return z(t, i, n[i++]);
    });
  };var qr;t(H, _), t(V, H), t(Y, H), t(Q, H), H.Keyed = V, H.Indexed = Y, H.Set = Q;var Dr,
      Mr = "function" == typeof Math.imul && -2 === Math.imul(4294967295, 2) ? Math.imul : function (t, e) {
    t = 0 | t, e = 0 | e;var r = 65535 & t,
        n = 65535 & e;return r * n + ((t >>> 16) * n + r * (e >>> 16) << 16 >>> 0) | 0;
  },
      Er = Object.isExtensible,
      Or = (function () {
    try {
      return (Object.defineProperty({}, "@", {}), !0);
    } catch (t) {
      return !1;
    }
  })(),
      xr = "function" == typeof WeakMap;xr && (Dr = new WeakMap());var kr = 0,
      Ar = "__immutablehash__";"function" == typeof Symbol && (Ar = Symbol(Ar));var jr = 16,
      Rr = 255,
      Ur = 0,
      Kr = {};t(at, x), at.prototype.get = function (t, e) {
    return this._iter.get(t, e);
  }, at.prototype.has = function (t) {
    return this._iter.has(t);
  }, at.prototype.valueSeq = function () {
    return this._iter.valueSeq();
  }, at.prototype.reverse = function () {
    var t = this,
        e = vt(this, !0);return (this._useKeys || (e.valueSeq = function () {
      return t._iter.toSeq().reverse();
    }), e);
  }, at.prototype.map = function (t, e) {
    var r = this,
        n = pt(this, t, e);return (this._useKeys || (n.valueSeq = function () {
      return r._iter.toSeq().map(t, e);
    }), n);
  }, at.prototype.__iterate = function (t, e) {
    var r,
        n = this;return this._iter.__iterate(this._useKeys ? function (e, r) {
      return t(e, r, n);
    } : (r = e ? kt(this) : 0, function (i) {
      return t(i, e ? --r : r++, n);
    }), e);
  }, at.prototype.__iterator = function (t, e) {
    if (this._useKeys) return this._iter.__iterator(t, e);var r = this._iter.__iterator(gr, e),
        n = e ? kt(this) : 0;
    return new S(function () {
      var i = r.next();return i.done ? i : z(t, e ? --n : n++, i.value, i);
    });
  }, at.prototype[dr] = !0, t(ht, k), ht.prototype.includes = function (t) {
    return this._iter.includes(t);
  }, ht.prototype.__iterate = function (t, e) {
    var r = this,
        n = 0;return this._iter.__iterate(function (e) {
      return t(e, n++, r);
    }, e);
  }, ht.prototype.__iterator = function (t, e) {
    var r = this._iter.__iterator(gr, e),
        n = 0;return new S(function () {
      var e = r.next();return e.done ? e : z(t, n++, e.value, e);
    });
  }, t(ft, A), ft.prototype.has = function (t) {
    return this._iter.includes(t);
  }, ft.prototype.__iterate = function (t, e) {
    var r = this;return this._iter.__iterate(function (e) {
      return t(e, e, r);
    }, e);
  }, ft.prototype.__iterator = function (t, e) {
    var r = this._iter.__iterator(gr, e);return new S(function () {
      var e = r.next();return e.done ? e : z(t, e.value, e.value, e);
    });
  }, t(ct, x), ct.prototype.entrySeq = function () {
    return this._iter.toSeq();
  }, ct.prototype.__iterate = function (t, e) {
    var r = this;return this._iter.__iterate(function (e) {
      if (e) {
        xt(e);var n = y(e);return t(n ? e.get(1) : e[1], n ? e.get(0) : e[0], r);
      }
    }, e);
  }, ct.prototype.__iterator = function (t, e) {
    var r = this._iter.__iterator(gr, e);return new S(function () {
      for (;;) {
        var e = r.next();if (e.done) return e;var n = e.value;if (n) {
          xt(n);var i = y(n);return z(t, i ? n.get(0) : n[0], i ? n.get(1) : n[1], e);
        }
      }
    });
  }, ht.prototype.cacheResult = at.prototype.cacheResult = ft.prototype.cacheResult = ct.prototype.cacheResult = Rt, t(Lt, V), Lt.prototype.toString = function () {
    return this.__toString("Map {", "}");
  }, Lt.prototype.get = function (t, e) {
    return this._root ? this._root.get(0, void 0, t, e) : e;
  }, Lt.prototype.set = function (t, e) {
    return Xt(this, t, e);
  }, Lt.prototype.setIn = function (t, e) {
    return this.updateIn(t, cr, function () {
      return e;
    });
  }, Lt.prototype.remove = function (t) {
    return Xt(this, t, cr);
  }, Lt.prototype.deleteIn = function (t) {
    return this.updateIn(t, function () {
      return cr;
    });
  }, Lt.prototype.update = function (t, e, r) {
    return 1 === arguments.length ? t(this) : this.updateIn([t], e, r);
  }, Lt.prototype.updateIn = function (t, e, r) {
    r || (r = e, e = void 0);var n = oe(this, Kt(t), e, r);return n === cr ? void 0 : n;
  }, Lt.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = !0, this) : Qt();
  }, Lt.prototype.merge = function () {
    return re(this, void 0, arguments);
  }, Lt.prototype.mergeWith = function (t) {
    var e = ur.call(arguments, 1);return re(this, t, e);
  }, Lt.prototype.mergeIn = function (t) {
    var e = ur.call(arguments, 1);return this.updateIn(t, Qt(), function (t) {
      return "function" == typeof t.merge ? t.merge.apply(t, e) : e[e.length - 1];
    });
  }, Lt.prototype.mergeDeep = function () {
    return re(this, ne(void 0), arguments);
  }, Lt.prototype.mergeDeepWith = function (t) {
    var e = ur.call(arguments, 1);return re(this, ne(t), e);
  }, Lt.prototype.mergeDeepIn = function (t) {
    var e = ur.call(arguments, 1);return this.updateIn(t, Qt(), function (t) {
      return "function" == typeof t.mergeDeep ? t.mergeDeep.apply(t, e) : e[e.length - 1];
    });
  }, Lt.prototype.sort = function (t) {
    return Ie(qt(this, t));
  }, Lt.prototype.sortBy = function (t, e) {
    return Ie(qt(this, e, t));
  }, Lt.prototype.withMutations = function (t) {
    var e = this.asMutable();return (t(e), e.wasAltered() ? e.__ensureOwner(this.__ownerID) : this);
  }, Lt.prototype.asMutable = function () {
    return this.__ownerID ? this : this.__ensureOwner(new n());
  }, Lt.prototype.asImmutable = function () {
    return this.__ensureOwner();
  }, Lt.prototype.wasAltered = function () {
    return this.__altered;
  }, Lt.prototype.__iterator = function (t, e) {
    return new Pt(this, t, e);
  }, Lt.prototype.__iterate = function (t, e) {
    var r = this,
        n = 0;return (this._root && this._root.iterate(function (e) {
      return (n++, t(e[1], e[0], r));
    }, e), n);
  }, Lt.prototype.__ensureOwner = function (t) {
    return t === this.__ownerID ? this : t ? Yt(this.size, this._root, t, this.__hash) : (this.__ownerID = t, this.__altered = !1, this);
  }, Lt.isMap = Tt;var Lr = "@@__IMMUTABLE_MAP__@@",
      Tr = Lt.prototype;Tr[Lr] = !0, Tr[sr] = Tr.remove, Tr.removeIn = Tr.deleteIn, Wt.prototype.get = function (t, e, r, n) {
    for (var i = this.entries, o = 0, u = i.length; u > o; o++) if (X(r, i[o][0])) return i[o][1];return n;
  }, Wt.prototype.update = function (t, e, n, o, u, s, a) {
    for (var h = u === cr, f = this.entries, c = 0, _ = f.length; _ > c && !X(o, f[c][0]); c++);var p = _ > c;if (p ? f[c][1] === u : h) return this;if ((r(a), (h || !p) && r(s), !h || 1 !== f.length)) {
      if (!p && !h && f.length >= Br) return $t(t, f, o, u);var v = t && t === this.ownerID,
          l = v ? f : i(f);return (p ? h ? c === _ - 1 ? l.pop() : l[c] = l.pop() : l[c] = [o, u] : l.push([o, u]), v ? (this.entries = l, this) : new Wt(t, l));
    }
  }, Bt.prototype.get = function (t, e, r, n) {
    void 0 === e && (e = et(r));var i = 1 << ((0 === t ? e : e >>> t) & fr),
        o = this.bitmap;return 0 === (o & i) ? n : this.nodes[ue(o & i - 1)].get(t + ar, e, r, n);
  }, Bt.prototype.update = function (t, e, r, n, i, o, u) {
    void 0 === r && (r = et(n));var s = (0 === e ? r : r >>> e) & fr,
        a = 1 << s,
        h = this.bitmap,
        f = 0 !== (h & a);if (!f && i === cr) return this;var c = ue(h & a - 1),
        _ = this.nodes,
        p = f ? _[c] : void 0,
        v = Ft(p, t, e + ar, r, n, i, o, u);if (v === p) return this;if (!f && v && _.length >= Cr) return ee(t, _, h, s, v);if (f && !v && 2 === _.length && Gt(_[1 ^ c])) return _[1 ^ c];if (f && v && 1 === _.length && Gt(v)) return v;var l = t && t === this.ownerID,
        y = f ? v ? h : h ^ a : h | a,
        d = f ? v ? se(_, c, v, l) : he(_, c, l) : ae(_, c, v, l);return l ? (this.bitmap = y, this.nodes = d, this) : new Bt(t, y, d);
  }, Ct.prototype.get = function (t, e, r, n) {
    void 0 === e && (e = et(r));var i = (0 === t ? e : e >>> t) & fr,
        o = this.nodes[i];return o ? o.get(t + ar, e, r, n) : n;
  }, Ct.prototype.update = function (t, e, r, n, i, o, u) {
    void 0 === r && (r = et(n));var s = (0 === e ? r : r >>> e) & fr,
        a = i === cr,
        h = this.nodes,
        f = h[s];if (a && !f) return this;var c = Ft(f, t, e + ar, r, n, i, o, u);if (c === f) return this;var _ = this.count;if (f) {
      if (!c && (_--, Jr > _)) return te(t, h, _, s);
    } else _++;var p = t && t === this.ownerID,
        v = se(h, s, c, p);return p ? (this.count = _, this.nodes = v, this) : new Ct(t, _, v);
  }, Jt.prototype.get = function (t, e, r, n) {
    for (var i = this.entries, o = 0, u = i.length; u > o; o++) if (X(r, i[o][0])) return i[o][1];return n;
  }, Jt.prototype.update = function (t, e, n, o, u, s, a) {
    void 0 === n && (n = et(o));var h = u === cr;if (n !== this.keyHash) return h ? this : (r(a), r(s), Zt(this, t, e, n, [o, u]));for (var f = this.entries, c = 0, _ = f.length; _ > c && !X(o, f[c][0]); c++);var p = _ > c;if (p ? f[c][1] === u : h) return this;if ((r(a), (h || !p) && r(s), h && 2 === _)) return new Nt(t, this.keyHash, f[1 ^ c]);var v = t && t === this.ownerID,
        l = v ? f : i(f);return (p ? h ? c === _ - 1 ? l.pop() : l[c] = l.pop() : l[c] = [o, u] : l.push([o, u]), v ? (this.entries = l, this) : new Jt(t, this.keyHash, l));
  }, Nt.prototype.get = function (t, e, r, n) {
    return X(r, this.entry[0]) ? this.entry[1] : n;
  }, Nt.prototype.update = function (t, e, n, i, o, u, s) {
    var a = o === cr,
        h = X(i, this.entry[0]);return (h ? o === this.entry[1] : a) ? this : (r(s), a ? void r(u) : h ? t && t === this.ownerID ? (this.entry[1] = o, this) : new Nt(t, this.keyHash, [i, o]) : (r(u), Zt(this, t, e, et(i), [i, o])));
  }, Wt.prototype.iterate = Jt.prototype.iterate = function (t, e) {
    for (var r = this.entries, n = 0, i = r.length - 1; i >= n; n++) if (t(r[e ? i - n : n]) === !1) return !1;
  }, Bt.prototype.iterate = Ct.prototype.iterate = function (t, e) {
    for (var r = this.nodes, n = 0, i = r.length - 1; i >= n; n++) {
      var o = r[e ? i - n : n];if (o && o.iterate(t, e) === !1) return !1;
    }
  }, Nt.prototype.iterate = function (t) {
    return t(this.entry);
  }, t(Pt, S), Pt.prototype.next = function () {
    for (var t = this._type, e = this._stack; e;) {
      var r,
          n = e.node,
          i = e.index++;if (n.entry) {
        if (0 === i) return Ht(t, n.entry);
      } else if (n.entries) {
        if ((r = n.entries.length - 1, r >= i)) return Ht(t, n.entries[this._reverse ? r - i : i]);
      } else if ((r = n.nodes.length - 1, r >= i)) {
        var o = n.nodes[this._reverse ? r - i : i];if (o) {
          if (o.entry) return Ht(t, o.entry);e = this._stack = Vt(o, e);
        }continue;
      }e = this._stack = this._stack.__prev;
    }return I();
  };var Wr,
      Br = hr / 4,
      Cr = hr / 2,
      Jr = hr / 4;t(fe, Y), fe.of = function () {
    return this(arguments);
  }, fe.prototype.toString = function () {
    return this.__toString("List [", "]");
  }, fe.prototype.get = function (t, e) {
    if ((t = u(this, t), t >= 0 && this.size > t)) {
      t += this._origin;var r = ge(this, t);return r && r.array[t & fr];
    }return e;
  }, fe.prototype.set = function (t, e) {
    return ye(this, t, e);
  }, fe.prototype.remove = function (t) {
    return this.has(t) ? 0 === t ? this.shift() : t === this.size - 1 ? this.pop() : this.splice(t, 1) : this;
  }, fe.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = ar, this._root = this._tail = null, this.__hash = void 0, this.__altered = !0, this) : le();
  }, fe.prototype.push = function () {
    var t = arguments,
        e = this.size;return this.withMutations(function (r) {
      we(r, 0, e + t.length);for (var n = 0; t.length > n; n++) r.set(e + n, t[n]);
    });
  }, fe.prototype.pop = function () {
    return we(this, 0, -1);
  }, fe.prototype.unshift = function () {
    var t = arguments;return this.withMutations(function (e) {
      we(e, -t.length);for (var r = 0; t.length > r; r++) e.set(r, t[r]);
    });
  }, fe.prototype.shift = function () {
    return we(this, 1);
  }, fe.prototype.merge = function () {
    return Se(this, void 0, arguments);
  }, fe.prototype.mergeWith = function (t) {
    var e = ur.call(arguments, 1);return Se(this, t, e);
  }, fe.prototype.mergeDeep = function () {
    return Se(this, ne(void 0), arguments);
  }, fe.prototype.mergeDeepWith = function (t) {
    var e = ur.call(arguments, 1);return Se(this, ne(t), e);
  }, fe.prototype.setSize = function (t) {
    return we(this, 0, t);
  }, fe.prototype.slice = function (t, e) {
    var r = this.size;return a(t, e, r) ? this : we(this, h(t, r), f(e, r));
  }, fe.prototype.__iterator = function (t, e) {
    var r = 0,
        n = pe(this, e);return new S(function () {
      var e = n();return e === Vr ? I() : z(t, r++, e);
    });
  }, fe.prototype.__iterate = function (t, e) {
    for (var r, n = 0, i = pe(this, e); (r = i()) !== Vr && t(r, n++, this) !== !1;);return n;
  }, fe.prototype.__ensureOwner = function (t) {
    return t === this.__ownerID ? this : t ? ve(this._origin, this._capacity, this._level, this._root, this._tail, t, this.__hash) : (this.__ownerID = t, this);
  }, fe.isList = ce;var Nr = "@@__IMMUTABLE_LIST__@@",
      Pr = fe.prototype;Pr[Nr] = !0, Pr[sr] = Pr.remove, Pr.setIn = Tr.setIn, Pr.deleteIn = Pr.removeIn = Tr.removeIn, Pr.update = Tr.update, Pr.updateIn = Tr.updateIn, Pr.mergeIn = Tr.mergeIn, Pr.mergeDeepIn = Tr.mergeDeepIn, Pr.withMutations = Tr.withMutations, Pr.asMutable = Tr.asMutable, Pr.asImmutable = Tr.asImmutable, Pr.wasAltered = Tr.wasAltered, _e.prototype.removeBefore = function (t, e, r) {
    if (r === e ? 1 << e : 0 === this.array.length) return this;var n = r >>> e & fr;if (n >= this.array.length) return new _e([], t);var i,
        o = 0 === n;if (e > 0) {
      var u = this.array[n];if ((i = u && u.removeBefore(t, e - ar, r), i === u && o)) return this;
    }if (o && !i) return this;var s = me(this, t);if (!o) for (var a = 0; n > a; a++) s.array[a] = void 0;return (i && (s.array[n] = i), s);
  }, _e.prototype.removeAfter = function (t, e, r) {
    if (r === (e ? 1 << e : 0) || 0 === this.array.length) return this;var n = r - 1 >>> e & fr;if (n >= this.array.length) return this;var i;if (e > 0) {
      var o = this.array[n];if ((i = o && o.removeAfter(t, e - ar, r), i === o && n === this.array.length - 1)) return this;
    }var u = me(this, t);return (u.array.splice(n + 1), i && (u.array[n] = i), u);
  };var Hr,
      Vr = {};t(Ie, Lt), Ie.of = function () {
    return this(arguments);
  }, Ie.prototype.toString = function () {
    return this.__toString("OrderedMap {", "}");
  }, Ie.prototype.get = function (t, e) {
    var r = this._map.get(t);return void 0 !== r ? this._list.get(r)[1] : e;
  }, Ie.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this) : De();
  }, Ie.prototype.set = function (t, e) {
    return Me(this, t, e);
  }, Ie.prototype.remove = function (t) {
    return Me(this, t, cr);
  }, Ie.prototype.wasAltered = function () {
    return this._map.wasAltered() || this._list.wasAltered();
  }, Ie.prototype.__iterate = function (t, e) {
    var r = this;return this._list.__iterate(function (e) {
      return e && t(e[1], e[0], r);
    }, e);
  }, Ie.prototype.__iterator = function (t, e) {
    return this._list.fromEntrySeq().__iterator(t, e);
  }, Ie.prototype.__ensureOwner = function (t) {
    if (t === this.__ownerID) return this;var e = this._map.__ensureOwner(t),
        r = this._list.__ensureOwner(t);return t ? qe(e, r, t, this.__hash) : (this.__ownerID = t, this._map = e, this._list = r, this);
  }, Ie.isOrderedMap = be, Ie.prototype[dr] = !0, Ie.prototype[sr] = Ie.prototype.remove;var Yr;t(Ee, Y), Ee.of = function () {
    return this(arguments);
  }, Ee.prototype.toString = function () {
    return this.__toString("Stack [", "]");
  }, Ee.prototype.get = function (t, e) {
    var r = this._head;for (t = u(this, t); r && t--;) r = r.next;return r ? r.value : e;
  }, Ee.prototype.peek = function () {
    return this._head && this._head.value;
  }, Ee.prototype.push = function () {
    if (0 === arguments.length) return this;for (var t = this.size + arguments.length, e = this._head, r = arguments.length - 1; r >= 0; r--) e = { value: arguments[r], next: e };return this.__ownerID ? (this.size = t, this._head = e, this.__hash = void 0, this.__altered = !0, this) : xe(t, e);
  }, Ee.prototype.pushAll = function (t) {
    if ((t = v(t), 0 === t.size)) return this;st(t.size);var e = this.size,
        r = this._head;return (t.reverse().forEach(function (t) {
      e++, r = { value: t, next: r };
    }), this.__ownerID ? (this.size = e, this._head = r, this.__hash = void 0, this.__altered = !0, this) : xe(e, r));
  }, Ee.prototype.pop = function () {
    return this.slice(1);
  }, Ee.prototype.unshift = function () {
    return this.push.apply(this, arguments);
  }, Ee.prototype.unshiftAll = function (t) {
    return this.pushAll(t);
  }, Ee.prototype.shift = function () {
    return this.pop.apply(this, arguments);
  }, Ee.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = !0, this) : ke();
  }, Ee.prototype.slice = function (t, e) {
    if (a(t, e, this.size)) return this;var r = h(t, this.size),
        n = f(e, this.size);if (n !== this.size) return Y.prototype.slice.call(this, t, e);
    for (var i = this.size - r, o = this._head; r--;) o = o.next;return this.__ownerID ? (this.size = i, this._head = o, this.__hash = void 0, this.__altered = !0, this) : xe(i, o);
  }, Ee.prototype.__ensureOwner = function (t) {
    return t === this.__ownerID ? this : t ? xe(this.size, this._head, t, this.__hash) : (this.__ownerID = t, this.__altered = !1, this);
  }, Ee.prototype.__iterate = function (t, e) {
    if (e) return this.reverse().__iterate(t);for (var r = 0, n = this._head; n && t(n.value, r++, this) !== !1;) n = n.next;return r;
  }, Ee.prototype.__iterator = function (t, e) {
    if (e) return this.reverse().__iterator(t);var r = 0,
        n = this._head;return new S(function () {
      if (n) {
        var e = n.value;return (n = n.next, z(t, r++, e));
      }return I();
    });
  }, Ee.isStack = Oe;var Qr = "@@__IMMUTABLE_STACK__@@",
      Xr = Ee.prototype;Xr[Qr] = !0, Xr.withMutations = Tr.withMutations, Xr.asMutable = Tr.asMutable, Xr.asImmutable = Tr.asImmutable, Xr.wasAltered = Tr.wasAltered;var Fr;t(Ae, Q), Ae.of = function () {
    return this(arguments);
  }, Ae.fromKeys = function (t) {
    return this(p(t).keySeq());
  }, Ae.prototype.toString = function () {
    return this.__toString("Set {", "}");
  }, Ae.prototype.has = function (t) {
    return this._map.has(t);
  }, Ae.prototype.add = function (t) {
    return Re(this, this._map.set(t, !0));
  }, Ae.prototype.remove = function (t) {
    return Re(this, this._map.remove(t));
  }, Ae.prototype.clear = function () {
    return Re(this, this._map.clear());
  }, Ae.prototype.union = function () {
    var t = ur.call(arguments, 0);return (t = t.filter(function (t) {
      return 0 !== t.size;
    }), 0 === t.length ? this : 0 !== this.size || this.__ownerID || 1 !== t.length ? this.withMutations(function (e) {
      for (var r = 0; t.length > r; r++) l(t[r]).forEach(function (t) {
        return e.add(t);
      });
    }) : this.constructor(t[0]));
  }, Ae.prototype.intersect = function () {
    var t = ur.call(arguments, 0);if (0 === t.length) return this;t = t.map(function (t) {
      return l(t);
    });var e = this;return this.withMutations(function (r) {
      e.forEach(function (e) {
        t.every(function (t) {
          return t.includes(e);
        }) || r.remove(e);
      });
    });
  }, Ae.prototype.subtract = function () {
    var t = ur.call(arguments, 0);if (0 === t.length) return this;t = t.map(function (t) {
      return l(t);
    });var e = this;return this.withMutations(function (r) {
      e.forEach(function (e) {
        t.some(function (t) {
          return t.includes(e);
        }) && r.remove(e);
      });
    });
  }, Ae.prototype.merge = function () {
    return this.union.apply(this, arguments);
  }, Ae.prototype.mergeWith = function () {
    var t = ur.call(arguments, 1);return this.union.apply(this, t);
  }, Ae.prototype.sort = function (t) {
    return Le(qt(this, t));
  }, Ae.prototype.sortBy = function (t, e) {
    return Le(qt(this, e, t));
  }, Ae.prototype.wasAltered = function () {
    return this._map.wasAltered();
  }, Ae.prototype.__iterate = function (t, e) {
    var r = this;return this._map.__iterate(function (e, n) {
      return t(n, n, r);
    }, e);
  }, Ae.prototype.__iterator = function (t, e) {
    return this._map.map(function (t, e) {
      return e;
    }).__iterator(t, e);
  }, Ae.prototype.__ensureOwner = function (t) {
    if (t === this.__ownerID) return this;var e = this._map.__ensureOwner(t);return t ? this.__make(e, t) : (this.__ownerID = t, this._map = e, this);
  }, Ae.isSet = je;var Gr = "@@__IMMUTABLE_SET__@@",
      Zr = Ae.prototype;Zr[Gr] = !0, Zr[sr] = Zr.remove, Zr.mergeDeep = Zr.merge, Zr.mergeDeepWith = Zr.mergeWith, Zr.withMutations = Tr.withMutations, Zr.asMutable = Tr.asMutable, Zr.asImmutable = Tr.asImmutable, Zr.__empty = Ke, Zr.__make = Ue;var $r;t(Le, Ae), Le.of = function () {
    return this(arguments);
  }, Le.fromKeys = function (t) {
    return this(p(t).keySeq());
  }, Le.prototype.toString = function () {
    return this.__toString("OrderedSet {", "}");
  }, Le.isOrderedSet = Te;var tn = Le.prototype;tn[dr] = !0, tn.__empty = Be, tn.__make = We;var en;t(Ce, V), Ce.prototype.toString = function () {
    return this.__toString(Ne(this) + " {", "}");
  }, Ce.prototype.has = function (t) {
    return this._defaultValues.hasOwnProperty(t);
  }, Ce.prototype.get = function (t, e) {
    if (!this.has(t)) return e;var r = this._defaultValues[t];return this._map ? this._map.get(t, r) : r;
  }, Ce.prototype.clear = function () {
    if (this.__ownerID) return (this._map && this._map.clear(), this);var t = this.constructor;return t._empty || (t._empty = Je(this, Qt()));
  }, Ce.prototype.set = function (t, e) {
    if (!this.has(t)) throw Error('Cannot set unknown key "' + t + '" on ' + Ne(this));var r = this._map && this._map.set(t, e);return this.__ownerID || r === this._map ? this : Je(this, r);
  }, Ce.prototype.remove = function (t) {
    if (!this.has(t)) return this;var e = this._map && this._map.remove(t);return this.__ownerID || e === this._map ? this : Je(this, e);
  }, Ce.prototype.wasAltered = function () {
    return this._map.wasAltered();
  }, Ce.prototype.__iterator = function (t, e) {
    var r = this;return p(this._defaultValues).map(function (t, e) {
      return r.get(e);
    }).__iterator(t, e);
  }, Ce.prototype.__iterate = function (t, e) {
    var r = this;return p(this._defaultValues).map(function (t, e) {
      return r.get(e);
    }).__iterate(t, e);
  }, Ce.prototype.__ensureOwner = function (t) {
    if (t === this.__ownerID) return this;var e = this._map && this._map.__ensureOwner(t);return t ? Je(this, e, t) : (this.__ownerID = t, this._map = e, this);
  };var rn = Ce.prototype;rn[sr] = rn.remove, rn.deleteIn = rn.removeIn = Tr.removeIn, rn.merge = Tr.merge, rn.mergeWith = Tr.mergeWith, rn.mergeIn = Tr.mergeIn, rn.mergeDeep = Tr.mergeDeep, rn.mergeDeepWith = Tr.mergeDeepWith, rn.mergeDeepIn = Tr.mergeDeepIn, rn.setIn = Tr.setIn, rn.update = Tr.update, rn.updateIn = Tr.updateIn, rn.withMutations = Tr.withMutations, rn.asMutable = Tr.asMutable, rn.asImmutable = Tr.asImmutable, t(Ye, k), Ye.prototype.toString = function () {
    return 0 === this.size ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step > 1 ? " by " + this._step : "") + " ]";
  }, Ye.prototype.get = function (t, e) {
    return this.has(t) ? this._start + u(this, t) * this._step : e;
  }, Ye.prototype.includes = function (t) {
    var e = (t - this._start) / this._step;return e >= 0 && this.size > e && e === Math.floor(e);
  }, Ye.prototype.slice = function (t, e) {
    return a(t, e, this.size) ? this : (t = h(t, this.size), e = f(e, this.size), t >= e ? new Ye(0, 0) : new Ye(this.get(t, this._end), this.get(e, this._end), this._step));
  }, Ye.prototype.indexOf = function (t) {
    var e = t - this._start;if (e % this._step === 0) {
      var r = e / this._step;if (r >= 0 && this.size > r) return r;
    }return -1;
  }, Ye.prototype.lastIndexOf = function (t) {
    return this.indexOf(t);
  }, Ye.prototype.__iterate = function (t, e) {
    for (var r = this.size - 1, n = this._step, i = e ? this._start + r * n : this._start, o = 0; r >= o; o++) {
      if (t(i, o, this) === !1) return o + 1;i += e ? -n : n;
    }return o;
  }, Ye.prototype.__iterator = function (t, e) {
    var r = this.size - 1,
        n = this._step,
        i = e ? this._start + r * n : this._start,
        o = 0;return new S(function () {
      var u = i;return (i += e ? -n : n, o > r ? I() : z(t, o++, u));
    });
  }, Ye.prototype.equals = function (t) {
    return t instanceof Ye ? this._start === t._start && this._end === t._end && this._step === t._step : Ve(this, t);
  };var nn;t(Qe, k), Qe.prototype.toString = function () {
    return 0 === this.size ? "Repeat []" : "Repeat [ " + this._value + " " + this.size + " times ]";
  }, Qe.prototype.get = function (t, e) {
    return this.has(t) ? this._value : e;
  }, Qe.prototype.includes = function (t) {
    return X(this._value, t);
  }, Qe.prototype.slice = function (t, e) {
    var r = this.size;return a(t, e, r) ? this : new Qe(this._value, f(e, r) - h(t, r));
  }, Qe.prototype.reverse = function () {
    return this;
  }, Qe.prototype.indexOf = function (t) {
    return X(this._value, t) ? 0 : -1;
  }, Qe.prototype.lastIndexOf = function (t) {
    return X(this._value, t) ? this.size : -1;
  }, Qe.prototype.__iterate = function (t) {
    for (var e = 0; this.size > e; e++) if (t(this._value, e, this) === !1) return e + 1;return e;
  }, Qe.prototype.__iterator = function (t) {
    var e = this,
        r = 0;return new S(function () {
      return e.size > r ? z(t, r++, e._value) : I();
    });
  }, Qe.prototype.equals = function (t) {
    return t instanceof Qe ? X(this._value, t._value) : Ve(t);
  };var on;_.Iterator = S, Xe(_, { toArray: function toArray() {
      st(this.size);var t = Array(this.size || 0);return (this.valueSeq().__iterate(function (e, r) {
        t[r] = e;
      }), t);
    }, toIndexedSeq: function toIndexedSeq() {
      return new ht(this);
    }, toJS: function toJS() {
      return this.toSeq().map(function (t) {
        return t && "function" == typeof t.toJS ? t.toJS() : t;
      }).__toJS();
    }, toJSON: function toJSON() {
      return this.toSeq().map(function (t) {
        return t && "function" == typeof t.toJSON ? t.toJSON() : t;
      }).__toJS();
    }, toKeyedSeq: function toKeyedSeq() {
      return new at(this, !0);
    }, toMap: function toMap() {
      return Lt(this.toKeyedSeq());
    }, toObject: function toObject() {
      st(this.size);var t = {};return (this.__iterate(function (e, r) {
        t[r] = e;
      }), t);
    }, toOrderedMap: function toOrderedMap() {
      return Ie(this.toKeyedSeq());
    }, toOrderedSet: function toOrderedSet() {
      return Le(d(this) ? this.valueSeq() : this);
    }, toSet: function toSet() {
      return Ae(d(this) ? this.valueSeq() : this);
    }, toSetSeq: function toSetSeq() {
      return new ft(this);
    }, toSeq: function toSeq() {
      return m(this) ? this.toIndexedSeq() : d(this) ? this.toKeyedSeq() : this.toSetSeq();
    }, toStack: function toStack() {
      return Ee(d(this) ? this.valueSeq() : this);
    }, toList: function toList() {
      return fe(d(this) ? this.valueSeq() : this);
    }, toString: function toString() {
      return "[Iterable]";
    }, __toString: function __toString(t, e) {
      return 0 === this.size ? t + e : t + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e;
    }, concat: function concat() {
      var t = ur.call(arguments, 0);return Ot(this, St(this, t));
    }, includes: function includes(t) {
      return this.some(function (e) {
        return X(e, t);
      });
    }, entries: function entries() {
      return this.__iterator(wr);
    }, every: function every(t, e) {
      st(this.size);var r = !0;return (this.__iterate(function (n, i, o) {
        return t.call(e, n, i, o) ? void 0 : (r = !1, !1);
      }), r);
    }, filter: function filter(t, e) {
      return Ot(this, lt(this, t, e, !0));
    }, find: function find(t, e, r) {
      var n = this.findEntry(t, e);return n ? n[1] : r;
    }, findEntry: function findEntry(t, e) {
      var r;return (this.__iterate(function (n, i, o) {
        return t.call(e, n, i, o) ? (r = [i, n], !1) : void 0;
      }), r);
    }, findLastEntry: function findLastEntry(t, e) {
      return this.toSeq().reverse().findEntry(t, e);
    }, forEach: function forEach(t, e) {
      return (st(this.size), this.__iterate(e ? t.bind(e) : t));
    }, join: function join(t) {
      st(this.size), t = void 0 !== t ? "" + t : ",";var e = "",
          r = !0;return (this.__iterate(function (n) {
        r ? r = !1 : e += t, e += null !== n && void 0 !== n ? "" + n : "";
      }), e);
    }, keys: function keys() {
      return this.__iterator(mr);
    }, map: function map(t, e) {
      return Ot(this, pt(this, t, e));
    }, reduce: function reduce(t, e, r) {
      st(this.size);var n, i;return (arguments.length < 2 ? i = !0 : n = e, this.__iterate(function (e, o, u) {
        i ? (i = !1, n = e) : n = t.call(r, n, e, o, u);
      }), n);
    }, reduceRight: function reduceRight() {
      var t = this.toKeyedSeq().reverse();return t.reduce.apply(t, arguments);
    }, reverse: function reverse() {
      return Ot(this, vt(this, !0));
    }, slice: function slice(t, e) {
      return Ot(this, mt(this, t, e, !0));
    }, some: function some(t, e) {
      return !this.every(Ze(t), e);
    }, sort: function sort(t) {
      return Ot(this, qt(this, t));
    }, values: function values() {
      return this.__iterator(gr);
    }, butLast: function butLast() {
      return this.slice(0, -1);
    }, isEmpty: function isEmpty() {
      return void 0 !== this.size ? 0 === this.size : !this.some(function () {
        return !0;
      });
    }, count: function count(t, e) {
      return o(t ? this.toSeq().filter(t, e) : this);
    }, countBy: function countBy(t, e) {
      return yt(this, t, e);
    }, equals: function equals(t) {
      return Ve(this, t);
    }, entrySeq: function entrySeq() {
      var t = this;if (t._cache) return new j(t._cache);var e = t.toSeq().map(Ge).toIndexedSeq();return (e.fromEntrySeq = function () {
        return t.toSeq();
      }, e);
    }, filterNot: function filterNot(t, e) {
      return this.filter(Ze(t), e);
    }, findLast: function findLast(t, e, r) {
      return this.toKeyedSeq().reverse().find(t, e, r);
    }, first: function first() {
      return this.find(s);
    }, flatMap: function flatMap(t, e) {
      return Ot(this, It(this, t, e));
    }, flatten: function flatten(t) {
      return Ot(this, zt(this, t, !0));
    }, fromEntrySeq: function fromEntrySeq() {
      return new ct(this);
    }, get: function get(t, e) {
      return this.find(function (e, r) {
        return X(r, t);
      }, void 0, e);
    }, getIn: function getIn(t, e) {
      for (var r, n = this, i = Kt(t); !(r = i.next()).done;) {
        var o = r.value;if ((n = n && n.get ? n.get(o, cr) : cr, n === cr)) return e;
      }return n;
    }, groupBy: function groupBy(t, e) {
      return dt(this, t, e);
    }, has: function has(t) {
      return this.get(t, cr) !== cr;
    }, hasIn: function hasIn(t) {
      return this.getIn(t, cr) !== cr;
    }, isSubset: function isSubset(t) {
      return (t = "function" == typeof t.includes ? t : _(t), this.every(function (e) {
        return t.includes(e);
      }));
    }, isSuperset: function isSuperset(t) {
      return (t = "function" == typeof t.isSubset ? t : _(t), t.isSubset(this));
    }, keySeq: function keySeq() {
      return this.toSeq().map(Fe).toIndexedSeq();
    }, last: function last() {
      return this.toSeq().reverse().first();
    }, max: function max(t) {
      return Dt(this, t);
    }, maxBy: function maxBy(t, e) {
      return Dt(this, e, t);
    }, min: function min(t) {
      return Dt(this, t ? $e(t) : rr);
    }, minBy: function minBy(t, e) {
      return Dt(this, e ? $e(e) : rr, t);
    }, rest: function rest() {
      return this.slice(1);
    }, skip: function skip(t) {
      return this.slice(Math.max(0, t));
    }, skipLast: function skipLast(t) {
      return Ot(this, this.toSeq().reverse().skip(t).reverse());
    }, skipWhile: function skipWhile(t, e) {
      return Ot(this, wt(this, t, e, !0));
    }, skipUntil: function skipUntil(t, e) {
      return this.skipWhile(Ze(t), e);
    }, sortBy: function sortBy(t, e) {
      return Ot(this, qt(this, e, t));
    }, take: function take(t) {
      return this.slice(0, Math.max(0, t));
    }, takeLast: function takeLast(t) {
      return Ot(this, this.toSeq().reverse().take(t).reverse());
    }, takeWhile: function takeWhile(t, e) {
      return Ot(this, gt(this, t, e));
    }, takeUntil: function takeUntil(t, e) {
      return this.takeWhile(Ze(t), e);
    }, valueSeq: function valueSeq() {
      return this.toIndexedSeq();
    }, hashCode: function hashCode() {
      return this.__hash || (this.__hash = nr(this));
    } });var un = _.prototype;un[vr] = !0, un[Ir] = un.values, un.__toJS = un.toArray, un.__toStringMapper = tr, un.inspect = un.toSource = function () {
    return "" + this;
  }, un.chain = un.flatMap, un.contains = un.includes, (function () {
    try {
      Object.defineProperty(un, "length", { get: function get() {
          if (!_.noLengthWarning) {
            var t;try {
              throw Error();
            } catch (e) {
              t = e.stack;
            }if (-1 === t.indexOf("_wrapObject")) return (console && console.warn && console.warn("iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. " + t), this.size);
          }
        } });
    } catch (t) {}
  })(), Xe(p, { flip: function flip() {
      return Ot(this, _t(this));
    }, findKey: function findKey(t, e) {
      var r = this.findEntry(t, e);return r && r[0];
    }, findLastKey: function findLastKey(t, e) {
      return this.toSeq().reverse().findKey(t, e);
    }, keyOf: function keyOf(t) {
      return this.findKey(function (e) {
        return X(e, t);
      });
    }, lastKeyOf: function lastKeyOf(t) {
      return this.findLastKey(function (e) {
        return X(e, t);
      });
    }, mapEntries: function mapEntries(t, e) {
      var r = this,
          n = 0;return Ot(this, this.toSeq().map(function (i, o) {
        return t.call(e, [o, i], n++, r);
      }).fromEntrySeq());
    }, mapKeys: function mapKeys(t, e) {
      var r = this;return Ot(this, this.toSeq().flip().map(function (n, i) {
        return t.call(e, n, i, r);
      }).flip());
    } });var sn = p.prototype;sn[lr] = !0, sn[Ir] = un.entries, sn.__toJS = un.toObject, sn.__toStringMapper = function (t, e) {
    return JSON.stringify(e) + ": " + tr(t);
  }, Xe(v, { toKeyedSeq: function toKeyedSeq() {
      return new at(this, !1);
    }, filter: function filter(t, e) {
      return Ot(this, lt(this, t, e, !1));
    }, findIndex: function findIndex(t, e) {
      var r = this.findEntry(t, e);return r ? r[0] : -1;
    }, indexOf: function indexOf(t) {
      var e = this.toKeyedSeq().keyOf(t);return void 0 === e ? -1 : e;
    }, lastIndexOf: function lastIndexOf(t) {
      return this.toSeq().reverse().indexOf(t);
    }, reverse: function reverse() {
      return Ot(this, vt(this, !1));
    }, slice: function slice(t, e) {
      return Ot(this, mt(this, t, e, !1));
    }, splice: function splice(t, e) {
      var r = arguments.length;if ((e = Math.max(0 | e, 0), 0 === r || 2 === r && !e)) return this;t = h(t, 0 > t ? this.count() : this.size);var n = this.slice(0, t);return Ot(this, 1 === r ? n : n.concat(i(arguments, 2), this.slice(t + e)));
    }, findLastIndex: function findLastIndex(t, e) {
      var r = this.toKeyedSeq().findLastKey(t, e);return void 0 === r ? -1 : r;
    }, first: function first() {
      return this.get(0);
    }, flatten: function flatten(t) {
      return Ot(this, zt(this, t, !1));
    }, get: function get(t, e) {
      return (t = u(this, t), 0 > t || this.size === 1 / 0 || void 0 !== this.size && t > this.size ? e : this.find(function (e, r) {
        return r === t;
      }, void 0, e));
    }, has: function has(t) {
      return (t = u(this, t), t >= 0 && (void 0 !== this.size ? this.size === 1 / 0 || this.size > t : -1 !== this.indexOf(t)));
    }, interpose: function interpose(t) {
      return Ot(this, bt(this, t));
    }, interleave: function interleave() {
      var t = [this].concat(i(arguments)),
          e = Et(this.toSeq(), k.of, t),
          r = e.flatten(!0);return (e.size && (r.size = e.size * t.length), Ot(this, r));
    }, last: function last() {
      return this.get(-1);
    }, skipWhile: function skipWhile(t, e) {
      return Ot(this, wt(this, t, e, !1));
    }, zip: function zip() {
      var t = [this].concat(i(arguments));return Ot(this, Et(this, er, t));
    }, zipWith: function zipWith(t) {
      var e = i(arguments);return (e[0] = this, Ot(this, Et(this, t, e)));
    } }), v.prototype[yr] = !0, v.prototype[dr] = !0, Xe(l, { get: function get(t, e) {
      return this.has(t) ? t : e;
    }, includes: function includes(t) {
      return this.has(t);
    }, keySeq: function keySeq() {
      return this.valueSeq();
    } }), l.prototype.has = un.includes, Xe(x, p.prototype), Xe(k, v.prototype), Xe(A, l.prototype), Xe(V, p.prototype), Xe(Y, v.prototype), Xe(Q, l.prototype);var an = { Iterable: _, Seq: O, Collection: H, Map: Lt, OrderedMap: Ie, List: fe, Stack: Ee, Set: Ae, OrderedSet: Le, Record: Ce, Range: Ye, Repeat: Qe, is: X, fromJS: F };return an;
});

},{}],42:[function(require,module,exports){
(function (process,global){
/* Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.*/
(function (a) {
  function b(a) {
    for (var b = a.length, c = new Array(b), d = 0; b > d; d++) c[d] = a[d];return c;
  }function c(a) {
    return function () {
      try {
        return a.apply(this, arguments);
      } catch (b) {
        return (sa.e = b, sa);
      }
    };
  }function d(a) {
    throw a;
  }function e(a, b) {
    if (ua && b.stack && "object" == typeof a && null !== a && a.stack && -1 === a.stack.indexOf(ya)) {
      for (var c = [], d = b; d; d = d.source) d.stack && c.unshift(d.stack);c.unshift(a.stack);var e = c.join("\n" + ya + "\n");a.stack = f(e);
    }
  }function f(a) {
    for (var b = a.split("\n"), c = [], d = 0, e = b.length; e > d; d++) {
      var f = b[d];g(f) || h(f) || !f || c.push(f);
    }return c.join("\n");
  }function g(a) {
    var b = j(a);if (!b) return !1;var c = b[0],
        d = b[1];return c === wa && d >= xa && ed >= d;
  }function h(a) {
    return -1 !== a.indexOf("(module.js:") || -1 !== a.indexOf("(node.js:");
  }function i() {
    if (ua) try {
      throw new Error();
    } catch (a) {
      var b = a.stack.split("\n"),
          c = b[0].indexOf("@") > 0 ? b[1] : b[2],
          d = j(c);if (!d) return;return (wa = d[0], d[1]);
    }
  }function j(a) {
    var b = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if (b) return [b[1], Number(b[2])];var c = /at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if (c) return [c[1], Number(c[2])];var d = /.*@(.+):(\d+)$/.exec(a);return d ? [d[1], Number(d[2])] : void 0;
  }function k(a) {
    var b = [];if (!gb(a)) return b;fb.nonEnumArgs && a.length && hb(a) && (a = jb.call(a));var c = fb.enumPrototypes && "function" == typeof a,
        d = fb.enumErrorProps && (a === _a || a instanceof Error);for (var e in a) c && "prototype" == e || d && ("message" == e || "name" == e) || b.push(e);if (fb.nonEnumShadows && a !== ab) {
      var f = a.constructor,
          g = -1,
          h = Na;if (a === (f && f.prototype)) var i = a === bb ? Xa : a === _a ? Sa : Ya.call(a),
          j = eb[i];for (; ++g < h;) e = Ma[g], j && j[e] || !Za.call(a, e) || b.push(e);
    }return b;
  }function l(a, b, c) {
    for (var d = -1, e = c(a), f = e.length; ++d < f;) {
      var g = e[d];if (b(a[g], g, a) === !1) break;
    }return a;
  }function m(a, b) {
    return l(a, b, k);
  }function n(a) {
    return "function" != typeof a.toString && "string" == typeof (a + "");
  }function o(a, b, c, d) {
    if (a === b) return 0 !== a || 1 / a == 1 / b;var e = typeof a,
        f = typeof b;if (a === a && (null == a || null == b || "function" != e && "object" != e && "function" != f && "object" != f)) return !1;var g = Ya.call(a),
        h = Ya.call(b);if ((g == Oa && (g = Va), h == Oa && (h = Va), g != h)) return !1;switch (g) {case Qa:case Ra:
        return +a == +b;case Ua:
        return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;case Wa:case Xa:
        return a == String(b);}var i = g == Pa;if (!i) {
      if (g != Va || !fb.nodeClass && (n(a) || n(b))) return !1;var j = !fb.argsObject && hb(a) ? Object : a.constructor,
          k = !fb.argsObject && hb(b) ? Object : b.constructor;if (!(j == k || Za.call(a, "constructor") && Za.call(b, "constructor") || ra(j) && j instanceof j && ra(k) && k instanceof k || !("constructor" in a && "constructor" in b))) return !1;
    }c || (c = []), d || (d = []);for (var l = c.length; l--;) if (c[l] == a) return d[l] == b;var p = 0,
        q = !0;if ((c.push(a), d.push(b), i)) {
      if ((l = a.length, p = b.length, q = p == l)) for (; p--;) {
        var r = b[p];if (!(q = o(a[p], r, c, d))) break;
      }
    } else m(b, function (b, e, f) {
      return Za.call(f, e) ? (p++, q = Za.call(a, e) && o(a[e], b, c, d)) : void 0;
    }), q && m(a, function (a, b, c) {
      return Za.call(c, b) ? q = --p > -1 : void 0;
    });return (c.pop(), d.pop(), q);
  }function p(a, b) {
    for (var c = new Array(a), d = 0; a > d; d++) c[d] = b();return c;
  }function q(a) {
    this._s = a;
  }function r(a) {
    this._s = a, this._l = a.length, this._i = 0;
  }function s(a) {
    this._a = a;
  }function t(a) {
    this._a = a, this._l = x(a), this._i = 0;
  }function u(a) {
    return "number" == typeof a && ia.isFinite(a);
  }function v(b) {
    var c,
        d = b[Ga];if (!d && "string" == typeof b) return (c = new q(b), c[Ga]());if (!d && b.length !== a) return (c = new s(b), c[Ga]());if (!d) throw new TypeError("Object is not iterable");return b[Ga]();
  }function w(a) {
    var b = +a;return 0 === b ? b : isNaN(b) ? b : 0 > b ? -1 : 1;
  }function x(a) {
    var b = +a.length;return isNaN(b) ? 0 : 0 !== b && u(b) ? (b = w(b) * Math.floor(Math.abs(b)), 0 >= b ? 0 : b > gc ? gc : b) : b;
  }function y(a, b) {
    this.observer = a, this.parent = b;
  }function z(a, b) {
    return (yb(a) || (a = Cb), new ic(b, a));
  }function A(a, b) {
    this.observer = a, this.parent = b;
  }function B(a, b) {
    this.observer = a, this.parent = b;
  }function C(a, b) {
    return new Yc(function (c) {
      var d = new tb(),
          e = new ub();return (e.setDisposable(d), d.setDisposable(a.subscribe(new uc(c, e, b))), e);
    }, a);
  }function D() {
    return !1;
  }function E() {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return b;
  }function D() {
    return !1;
  }function D() {
    return !1;
  }function F() {
    return [];
  }function E() {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return b;
  }function D() {
    return !1;
  }function F() {
    return [];
  }function E() {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return b;
  }function G(a) {
    return function (b) {
      return a.subscribe(b);
    };
  }function H(a, b) {
    this.o = a, this.accumulator = b.accumulator, this.hasSeed = b.hasSeed, this.seed = b.seed, this.hasAccumulation = !1, this.accumulation = null, this.hasValue = !1, this.isStopped = !1;
  }function I(b, c) {
    return function (d) {
      for (var e = d, f = 0; c > f; f++) {
        var g = e[b[f]];if ("undefined" == typeof g) return a;e = g;
      }return e;
    };
  }function J(a, b, c, d) {
    var e = new ad();return (d.push(K(e, b, c)), a.apply(b, d), e.asObservable());
  }function K(a, b, c) {
    return function () {
      for (var d = arguments.length, e = new Array(d), f = 0; d > f; f++) e[f] = arguments[f];if (ra(c)) {
        if ((e = ta(c).apply(b, e), e === sa)) return a.onError(e.e);a.onNext(e);
      } else e.length <= 1 ? a.onNext(e[0]) : a.onNext(e);a.onCompleted();
    };
  }function L(a, b, c, d) {
    var e = new ad();return (d.push(M(e, b, c)), a.apply(b, d), e.asObservable());
  }function M(a, b, c) {
    return function () {
      var d = arguments[0];if (d) return a.onError(d);for (var e = arguments.length, f = [], g = 1; e > g; g++) f[g - 1] = arguments[g];if (ra(c)) {
        var f = ta(c).apply(b, f);if (f === sa) return a.onError(f.e);a.onNext(f);
      } else f.length <= 1 ? a.onNext(f[0]) : a.onNext(f);a.onCompleted();
    };
  }function N(a, b, c) {
    this._e = a, this._n = b, this._fn = c, this._e.addEventListener(this._n, this._fn, !1), this.isDisposed = !1;
  }function O(a, b, c) {
    var d = new mb(),
        e = Object.prototype.toString.call(a);if ("[object NodeList]" === e || "[object HTMLCollection]" === e) for (var f = 0, g = a.length; g > f; f++) d.add(O(a.item(f), b, c));else a && d.add(new N(a, b, c));return d;
  }function P(a, b) {
    return function () {
      var c = arguments[0];return ra(b) && (c = ta(b).apply(null, arguments), c === sa) ? a.onError(c.e) : void a.onNext(c);
    };
  }function Q(a, b) {
    return new Yc(function (c) {
      return b.scheduleWithAbsolute(a, function () {
        c.onNext(0), c.onCompleted();
      });
    });
  }function R(a, b, c) {
    return new Yc(function (d) {
      var e = a,
          f = xb(b);return c.scheduleRecursiveWithAbsoluteAndState(0, e, function (a, b) {
        if (f > 0) {
          var g = c.now();e += f, g >= e && (e = g + f);
        }d.onNext(a), b(a + 1, e);
      });
    });
  }function S(a, b) {
    return new Yc(function (c) {
      return b.scheduleWithRelative(xb(a), function () {
        c.onNext(0), c.onCompleted();
      });
    });
  }function T(a, b, c) {
    return a === b ? new Yc(function (a) {
      return c.schedulePeriodicWithState(0, b, function (b) {
        return (a.onNext(b), b + 1);
      });
    }) : ac(function () {
      return R(c.now() + a, b, c);
    });
  }function U(a, b, c) {
    return new Yc(function (d) {
      var e,
          f = !1,
          g = new ub(),
          h = null,
          i = [],
          j = !1;return (e = a.materialize().timestamp(c).subscribe(function (a) {
        var e, k;"E" === a.value.kind ? (i = [], i.push(a), h = a.value.exception, k = !j) : (i.push({ value: a.value, timestamp: a.timestamp + b }), k = !f, f = !0), k && (null !== h ? d.onError(h) : (e = new tb(), g.setDisposable(e), e.setDisposable(c.scheduleRecursiveWithRelative(b, function (a) {
          var b, e, g, k;if (null === h) {
            j = !0;do g = null, i.length > 0 && i[0].timestamp - c.now() <= 0 && (g = i.shift().value), null !== g && g.accept(d); while (null !== g);k = !1, e = 0, i.length > 0 ? (k = !0, e = Math.max(0, i[0].timestamp - c.now())) : f = !1, b = h, j = !1, null !== b ? d.onError(b) : k && a(e);
          }
        }))));
      }), new mb(e, g));
    }, a);
  }function V(a, b, c) {
    return ac(function () {
      return U(a, b - c.now(), c);
    });
  }function W(a, b, c) {
    var d, e;return (ra(b) ? e = b : (d = b, e = c), new Yc(function (b) {
      function c() {
        i.setDisposable(a.subscribe(function (a) {
          var c = ta(e)(a);if (c === sa) return b.onError(c.e);var d = new tb();g.add(d), d.setDisposable(c.subscribe(function () {
            b.onNext(a), g.remove(d), f();
          }, function (a) {
            b.onError(a);
          }, function () {
            b.onNext(a), g.remove(d), f();
          }));
        }, function (a) {
          b.onError(a);
        }, function () {
          h = !0, i.dispose(), f();
        }));
      }function f() {
        h && 0 === g.length && b.onCompleted();
      }var g = new mb(),
          h = !1,
          i = new ub();return (d ? i.setDisposable(d.subscribe(c, function (a) {
        b.onError(a);
      }, c)) : c(), new mb(i, g));
    }, this));
  }function X(a, b, c) {
    return (yb(c) || (c = Hb), new Yc(function (d) {
      var e,
          f = new ub(),
          g = !1,
          h = 0,
          i = a.subscribe(function (a) {
        g = !0, e = a, h++;var i = h,
            j = new tb();f.setDisposable(j), j.setDisposable(c.scheduleWithRelative(b, function () {
          g && h === i && d.onNext(e), g = !1;
        }));
      }, function (a) {
        f.dispose(), d.onError(a), g = !1, h++;
      }, function () {
        f.dispose(), g && d.onNext(e), d.onCompleted(), g = !1, h++;
      });return new mb(i, f);
    }, this));
  }function Y(a, b) {
    return new Yc(function (c) {
      var d,
          e = !1,
          f = new ub(),
          g = 0,
          h = a.subscribe(function (a) {
        var h = ta(b)(a);if (h === sa) return c.onError(h.e);qa(h) && (h = Qc(h)), e = !0, d = a, g++;var i = g,
            j = new tb();f.setDisposable(j), j.setDisposable(h.subscribe(function () {
          e && g === i && c.onNext(d), e = !1, j.dispose();
        }, function (a) {
          c.onError(a);
        }, function () {
          e && g === i && c.onNext(d), e = !1, j.dispose();
        }));
      }, function (a) {
        f.dispose(), c.onError(a), e = !1, g++;
      }, function () {
        f.dispose(), e && c.onNext(d), c.onCompleted(), e = !1, g++;
      });return new mb(h, f);
    }, a);
  }function Z(a, b) {
    return new Yc(function (c) {
      function d() {
        g && (g = !1, c.onNext(e)), f && c.onCompleted();
      }var e,
          f = !1,
          g = !1,
          h = new tb();return (h.setDisposable(a.subscribe(function (a) {
        g = !0, e = a;
      }, function (a) {
        c.onError(a);
      }, function () {
        f = !0, h.dispose();
      })), new mb(h, b.subscribe(d, function (a) {
        c.onError(a);
      }, d)));
    }, a);
  }function $(a, b, c, d) {
    return (ra(b) && (d = c, c = b, b = mc()), d || (d = tc(new Tc())), new Yc(function (e) {
      function f(a) {
        var b = k,
            c = new tb();i.setDisposable(c), c.setDisposable(a.subscribe(function () {
          k === b && h.setDisposable(d.subscribe(e)), c.dispose();
        }, function (a) {
          k === b && e.onError(a);
        }, function () {
          k === b && h.setDisposable(d.subscribe(e));
        }));
      }function g() {
        var a = !l;return (a && k++, a);
      }var h = new ub(),
          i = new ub(),
          j = new tb();h.setDisposable(j);var k = 0,
          l = !1;return (f(b), j.setDisposable(a.subscribe(function (a) {
        if (g()) {
          e.onNext(a);var b = ta(c)(a);if (b === sa) return e.onError(b.e);f(qa(b) ? Qc(b) : b);
        }
      }, function (a) {
        g() && e.onError(a);
      }, function () {
        g() && e.onCompleted();
      })), new mb(h, i));
    }, a));
  }function _(a, b, c, d) {
    if (null == c) throw new Error("other or scheduler must be specified");yb(c) && (d = c, c = tc(new Tc())), c instanceof Error && (c = tc(c)), yb(d) || (d = Hb);var e = b instanceof Date ? "scheduleWithAbsolute" : "scheduleWithRelative";return new Yc(function (f) {
      function g() {
        var a = h;l.setDisposable(d[e](b, function () {
          h === a && (qa(c) && (c = Qc(c)), j.setDisposable(c.subscribe(f)));
        }));
      }var h = 0,
          i = new tb(),
          j = new ub(),
          k = !1,
          l = new ub();return (j.setDisposable(i), g(), i.setDisposable(a.subscribe(function (a) {
        k || (h++, f.onNext(a), g());
      }, function (a) {
        k || (h++, f.onError(a));
      }, function () {
        k || (h++, f.onCompleted());
      })), new mb(j, l));
    }, a);
  }function aa(a, b, c) {
    return new Yc(function (d) {
      function e(a, b) {
        if ((j[b] = a, g[b] = !0, h || (h = g.every(la)))) {
          if (f) return d.onError(f);var e = ta(c).apply(null, j);if (e === sa) return d.onError(e.e);d.onNext(e);
        }i && j[1] && d.onCompleted();
      }var f,
          g = [!1, !1],
          h = !1,
          i = !1,
          j = new Array(2);return new mb(a.subscribe(function (a) {
        e(a, 0);
      }, function (a) {
        j[1] ? d.onError(a) : f = a;
      }, function () {
        i = !0, j[1] && d.onCompleted();
      }), b.subscribe(function (a) {
        e(a, 1);
      }, function (a) {
        d.onError(a);
      }, function () {
        i = !0, e(!0, 1);
      }));
    }, a);
  }var ba = { "function": !0, object: !0 },
      ca = ba[typeof exports] && exports && !exports.nodeType && exports,
      da = ba[typeof self] && self.Object && self,
      ea = ba[typeof window] && window && window.Object && window,
      fa = ba[typeof module] && module && !module.nodeType && module,
      ga = fa && fa.exports === ca && ca,
      ha = ca && fa && "object" == typeof global && global && global.Object && global,
      ia = ia = ha || ea !== (this && this.window) && ea || da || this,
      ja = { internals: {}, config: { Promise: ia.Promise }, helpers: {} },
      ka = ja.helpers.noop = function () {},
      la = ja.helpers.identity = function (a) {
    return a;
  },
      ma = ja.helpers.defaultNow = Date.now,
      na = ja.helpers.defaultComparer = function (a, b) {
    return ib(a, b);
  },
      oa = ja.helpers.defaultSubComparer = function (a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
  },
      pa = (ja.helpers.defaultKeySerializer = function (a) {
    return a.toString();
  }, ja.helpers.defaultError = function (a) {
    throw a;
  }),
      qa = ja.helpers.isPromise = function (a) {
    return !!a && "function" != typeof a.subscribe && "function" == typeof a.then;
  },
      ra = ja.helpers.isFunction = (function () {
    var a = function a(_a2) {
      return "function" == typeof _a2 || !1;
    };return (a(/x/) && (a = function (a) {
      return "function" == typeof a && "[object Function]" == Ya.call(a);
    }), a);
  })(),
      sa = { e: {} },
      ta = ja.internals.tryCatch = function (a) {
    if (!ra(a)) throw new TypeError("fn must be a function");return c(a);
  };ja.config.longStackSupport = !1;var ua = !1,
      va = ta(function () {
    throw new Error();
  })();ua = !!va.e && !!va.e.stack;var wa,
      xa = i(),
      ya = "From previous event:",
      za = ja.EmptyError = function () {
    this.message = "Sequence contains no elements.", this.name = "EmptyError", Error.call(this);
  };za.prototype = Object.create(Error.prototype);var Aa = ja.ObjectDisposedError = function () {
    this.message = "Object has been disposed", this.name = "ObjectDisposedError", Error.call(this);
  };Aa.prototype = Object.create(Error.prototype);var Ba = ja.ArgumentOutOfRangeError = function () {
    this.message = "Argument out of range", this.name = "ArgumentOutOfRangeError", Error.call(this);
  };Ba.prototype = Object.create(Error.prototype);var Ca = ja.NotSupportedError = function (a) {
    this.message = a || "This operation is not supported", this.name = "NotSupportedError", Error.call(this);
  };Ca.prototype = Object.create(Error.prototype);var Da = ja.NotImplementedError = function (a) {
    this.message = a || "This operation is not implemented", this.name = "NotImplementedError", Error.call(this);
  };Da.prototype = Object.create(Error.prototype);var Ea = ja.helpers.notImplemented = function () {
    throw new Da();
  },
      Fa = ja.helpers.notSupported = function () {
    throw new Ca();
  },
      Ga = "function" == typeof Symbol && Symbol.iterator || "_es6shim_iterator_";ia.Set && "function" == typeof new ia.Set()["@@iterator"] && (Ga = "@@iterator");var Ha = ja.doneEnumerator = { done: !0, value: a },
      Ia = ja.helpers.isIterable = function (b) {
    return b[Ga] !== a;
  },
      Ja = ja.helpers.isArrayLike = function (b) {
    return b && b.length !== a;
  };ja.helpers.iterator = Ga;var Ka,
      La = ja.internals.bindCallback = function (a, b, c) {
    if ("undefined" == typeof b) return a;switch (c) {case 0:
        return function () {
          return a.call(b);
        };case 1:
        return function (c) {
          return a.call(b, c);
        };case 2:
        return function (c, d) {
          return a.call(b, c, d);
        };case 3:
        return function (c, d, e) {
          return a.call(b, c, d, e);
        };}return function () {
      return a.apply(b, arguments);
    };
  },
      Ma = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
      Na = Ma.length,
      Oa = "[object Arguments]",
      Pa = "[object Array]",
      Qa = "[object Boolean]",
      Ra = "[object Date]",
      Sa = "[object Error]",
      Ta = "[object Function]",
      Ua = "[object Number]",
      Va = "[object Object]",
      Wa = "[object RegExp]",
      Xa = "[object String]",
      Ya = Object.prototype.toString,
      Za = Object.prototype.hasOwnProperty,
      $a = Ya.call(arguments) == Oa,
      _a = Error.prototype,
      ab = Object.prototype,
      bb = String.prototype,
      cb = ab.propertyIsEnumerable;try {
    Ka = !(Ya.call(document) == Va && !({ toString: 0 } + ""));
  } catch (db) {
    Ka = !0;
  }var eb = {};eb[Pa] = eb[Ra] = eb[Ua] = { constructor: !0, toLocaleString: !0, toString: !0, valueOf: !0 }, eb[Qa] = eb[Xa] = { constructor: !0, toString: !0, valueOf: !0 }, eb[Sa] = eb[Ta] = eb[Wa] = { constructor: !0, toString: !0 }, eb[Va] = { constructor: !0 };var fb = {};!(function () {
    var a = function a() {
      this.x = 1;
    },
        b = [];a.prototype = { valueOf: 1, y: 1 };for (var c in new a()) b.push(c);for (c in arguments);fb.enumErrorProps = cb.call(_a, "message") || cb.call(_a, "name"), fb.enumPrototypes = cb.call(a, "prototype"), fb.nonEnumArgs = 0 != c, fb.nonEnumShadows = !/valueOf/.test(b);
  })(1);var gb = ja.internals.isObject = function (a) {
    var b = typeof a;return a && ("function" == b || "object" == b) || !1;
  },
      hb = function hb(a) {
    return a && "object" == typeof a ? Ya.call(a) == Oa : !1;
  };$a || (hb = function (a) {
    return a && "object" == typeof a ? Za.call(a, "callee") : !1;
  });var ib = ja.internals.isEqual = function (a, b) {
    return o(a, b, [], []);
  },
      jb = (({}).hasOwnProperty, Array.prototype.slice),
      kb = ja.internals.inherits = function (a, b) {
    function c() {
      this.constructor = a;
    }c.prototype = b.prototype, a.prototype = new c();
  },
      lb = ja.internals.addProperties = function (a) {
    for (var b = [], c = 1, d = arguments.length; d > c; c++) b.push(arguments[c]);for (var e = 0, f = b.length; f > e; e++) {
      var g = b[e];for (var h in g) a[h] = g[h];
    }
  },
      mb = (ja.internals.addRef = function (a, b) {
    return new Yc(function (c) {
      return new mb(b.getDisposable(), a.subscribe(c));
    });
  }, ja.CompositeDisposable = function () {
    var a,
        b,
        c = [];if (Array.isArray(arguments[0])) c = arguments[0], b = c.length;else for (b = arguments.length, c = new Array(b), a = 0; b > a; a++) c[a] = arguments[a];for (a = 0; b > a; a++) if (!rb(c[a])) throw new TypeError("Not a disposable");this.disposables = c, this.isDisposed = !1, this.length = c.length;
  }),
      nb = mb.prototype;nb.add = function (a) {
    this.isDisposed ? a.dispose() : (this.disposables.push(a), this.length++);
  }, nb.remove = function (a) {
    var b = !1;if (!this.isDisposed) {
      var c = this.disposables.indexOf(a);-1 !== c && (b = !0, this.disposables.splice(c, 1), this.length--, a.dispose());
    }return b;
  }, nb.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = !0;for (var a = this.disposables.length, b = new Array(a), c = 0; a > c; c++) b[c] = this.disposables[c];for (this.disposables = [], this.length = 0, c = 0; a > c; c++) b[c].dispose();
    }
  };var ob = ja.Disposable = function (a) {
    this.isDisposed = !1, this.action = a || ka;
  };ob.prototype.dispose = function () {
    this.isDisposed || (this.action(), this.isDisposed = !0);
  };var pb = ob.create = function (a) {
    return new ob(a);
  },
      qb = ob.empty = { dispose: ka },
      rb = ob.isDisposable = function (a) {
    return a && ra(a.dispose);
  },
      sb = ob.checkDisposed = function (a) {
    if (a.isDisposed) throw new Aa();
  },
      tb = ja.SingleAssignmentDisposable = function () {
    this.isDisposed = !1, this.current = null;
  };tb.prototype.getDisposable = function () {
    return this.current;
  }, tb.prototype.setDisposable = function (a) {
    if (this.current) throw new Error("Disposable has already been assigned");var b = this.isDisposed;!b && (this.current = a), b && a && a.dispose();
  }, tb.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = !0;var a = this.current;this.current = null;
    }a && a.dispose();
  };var ub = ja.SerialDisposable = function () {
    this.isDisposed = !1, this.current = null;
  };ub.prototype.getDisposable = function () {
    return this.current;
  }, ub.prototype.setDisposable = function (a) {
    var b = this.isDisposed;if (!b) {
      var c = this.current;this.current = a;
    }c && c.dispose(), b && a && a.dispose();
  }, ub.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = !0;var a = this.current;this.current = null;
    }a && a.dispose();
  };var vb = (ja.RefCountDisposable = (function () {
    function a(a) {
      this.disposable = a, this.disposable.count++, this.isInnerDisposed = !1;
    }function b(a) {
      this.underlyingDisposable = a, this.isDisposed = !1, this.isPrimaryDisposed = !1, this.count = 0;
    }return (a.prototype.dispose = function () {
      this.disposable.isDisposed || this.isInnerDisposed || (this.isInnerDisposed = !0, this.disposable.count--, 0 === this.disposable.count && this.disposable.isPrimaryDisposed && (this.disposable.isDisposed = !0, this.disposable.underlyingDisposable.dispose()));
    }, b.prototype.dispose = function () {
      this.isDisposed || this.isPrimaryDisposed || (this.isPrimaryDisposed = !0, 0 === this.count && (this.isDisposed = !0, this.underlyingDisposable.dispose()));
    }, b.prototype.getDisposable = function () {
      return this.isDisposed ? qb : new a(this);
    }, b);
  })(), ja.internals.ScheduledItem = function (a, b, c, d, e) {
    this.scheduler = a, this.state = b, this.action = c, this.dueTime = d, this.comparer = e || oa, this.disposable = new tb();
  });vb.prototype.invoke = function () {
    this.disposable.setDisposable(this.invokeCore());
  }, vb.prototype.compareTo = function (a) {
    return this.comparer(this.dueTime, a.dueTime);
  }, vb.prototype.isCancelled = function () {
    return this.disposable.isDisposed;
  }, vb.prototype.invokeCore = function () {
    return this.action(this.scheduler, this.state);
  };var wb = ja.Scheduler = (function () {
    function a(a, b, c, d) {
      this.now = a, this._schedule = b, this._scheduleRelative = c, this._scheduleAbsolute = d;
    }function b(a, b) {
      return (b(), qb);
    }a.isScheduler = function (b) {
      return b instanceof a;
    };var c = a.prototype;return (c.schedule = function (a) {
      return this._schedule(a, b);
    }, c.scheduleWithState = function (a, b) {
      return this._schedule(a, b);
    }, c.scheduleWithRelative = function (a, c) {
      return this._scheduleRelative(c, a, b);
    }, c.scheduleWithRelativeAndState = function (a, b, c) {
      return this._scheduleRelative(a, b, c);
    }, c.scheduleWithAbsolute = function (a, c) {
      return this._scheduleAbsolute(c, a, b);
    }, c.scheduleWithAbsoluteAndState = function (a, b, c) {
      return this._scheduleAbsolute(a, b, c);
    }, a.now = ma, a.normalize = function (a) {
      return (0 > a && (a = 0), a);
    }, a);
  })(),
      xb = wb.normalize,
      yb = wb.isScheduler;!(function (a) {
    function b(a, b) {
      function c(b) {
        function d(a, b) {
          return (g ? f.remove(i) : h = !0, e(b, c), qb);
        }var g = !1,
            h = !1,
            i = a.scheduleWithState(b, d);h || (f.add(i), g = !0);
      }var d = b[0],
          e = b[1],
          f = new mb();return (e(d, c), f);
    }function c(a, b, c) {
      function d(b, e) {
        function h(a, b) {
          return (i ? g.remove(k) : j = !0, f(b, d), qb);
        }var i = !1,
            j = !1,
            k = a[c](b, e, h);j || (g.add(k), i = !0);
      }var e = b[0],
          f = b[1],
          g = new mb();return (f(e, d), g);
    }function d(a, b) {
      return c(a, b, "scheduleWithRelativeAndState");
    }function e(a, b) {
      return c(a, b, "scheduleWithAbsoluteAndState");
    }function f(a, b) {
      a(function (c) {
        b(a, c);
      });
    }a.scheduleRecursive = function (a) {
      return this.scheduleRecursiveWithState(a, f);
    }, a.scheduleRecursiveWithState = function (a, c) {
      return this.scheduleWithState([a, c], b);
    }, a.scheduleRecursiveWithRelative = function (a, b) {
      return this.scheduleRecursiveWithRelativeAndState(b, a, f);
    }, a.scheduleRecursiveWithRelativeAndState = function (a, b, c) {
      return this._scheduleRelative([a, c], b, d);
    }, a.scheduleRecursiveWithAbsolute = function (a, b) {
      return this.scheduleRecursiveWithAbsoluteAndState(b, a, f);
    }, a.scheduleRecursiveWithAbsoluteAndState = function (a, b, c) {
      return this._scheduleAbsolute([a, c], b, e);
    };
  })(wb.prototype), (function (a) {
    wb.prototype.schedulePeriodic = function (a, b) {
      return this.schedulePeriodicWithState(null, a, b);
    }, wb.prototype.schedulePeriodicWithState = function (a, b, c) {
      if ("undefined" == typeof ia.setInterval) throw new Ca();b = xb(b);var d = a,
          e = ia.setInterval(function () {
        d = c(d);
      }, b);return pb(function () {
        ia.clearInterval(e);
      });
    };
  })(wb.prototype);var zb,
      Ab,
      Bb = wb.immediate = (function () {
    function a(a, b) {
      return b(this, a);
    }return new wb(ma, a, Fa, Fa);
  })(),
      Cb = wb.currentThread = (function () {
    function a() {
      for (; c.length > 0;) {
        var a = c.shift();!a.isCancelled() && a.invoke();
      }
    }function b(b, e) {
      var f = new vb(this, b, e, this.now());if (c) c.push(f);else {
        c = [f];var g = ta(a)();if ((c = null, g === sa)) return d(g.e);
      }return f.disposable;
    }var c,
        e = new wb(ma, b, Fa, Fa);return (e.scheduleRequired = function () {
      return !c;
    }, e);
  })(),
      Db = (ja.internals.SchedulePeriodicRecursive = (function () {
    function a(a, b) {
      b(0, this._period);try {
        this._state = this._action(this._state);
      } catch (c) {
        throw (this._cancel.dispose(), c);
      }
    }function b(a, b, c, d) {
      this._scheduler = a, this._state = b, this._period = c, this._action = d;
    }return (b.prototype.start = function () {
      var b = new tb();return (this._cancel = b, b.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, a.bind(this))), b);
    }, b);
  })(), (function () {
    var a,
        b = ka;if (ia.setTimeout) a = ia.setTimeout, b = ia.clearTimeout;else {
      if (!ia.WScript) throw new Ca();a = function (a, b) {
        ia.WScript.Sleep(b), a();
      };
    }return { setTimeout: a, clearTimeout: b };
  })()),
      Eb = Db.setTimeout,
      Fb = Db.clearTimeout;!(function () {
    function a(b) {
      if (g) Eb(function () {
        a(b);
      }, 0);else {
        var c = f[b];if (c) {
          g = !0;var e = ta(c)();if ((Ab(b), g = !1, e === sa)) return d(e.e);
        }
      }
    }function b() {
      if (!ia.postMessage || ia.importScripts) return !1;var a = !1,
          b = ia.onmessage;return (ia.onmessage = function () {
        a = !0;
      }, ia.postMessage("", "*"), ia.onmessage = b, a);
    }function c(b) {
      "string" == typeof b.data && b.data.substring(0, j.length) === j && a(b.data.substring(j.length));
    }var e = 1,
        f = {},
        g = !1;Ab = function (a) {
      delete f[a];
    };var h = RegExp("^" + String(Ya).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
        i = "function" == typeof (i = ha && ga && ha.setImmediate) && !h.test(i) && i;if (ra(i)) zb = function (b) {
      var c = e++;return (f[c] = b, i(function () {
        a(c);
      }), c);
    };else if ("undefined" != typeof process && "[object process]" === ({}).toString.call(process)) zb = function (b) {
      var c = e++;return (f[c] = b, process.nextTick(function () {
        a(c);
      }), c);
    };else if (b()) {
      var j = "ms.rx.schedule" + Math.random();ia.addEventListener ? ia.addEventListener("message", c, !1) : ia.attachEvent ? ia.attachEvent("onmessage", c) : ia.onmessage = c, zb = function (a) {
        var b = e++;return (f[b] = a, ia.postMessage(j + currentId, "*"), b);
      };
    } else if (ia.MessageChannel) {
      var k = new ia.MessageChannel();k.port1.onmessage = function (b) {
        a(b.data);
      }, zb = function (a) {
        var b = e++;return (f[b] = a, k.port2.postMessage(b), b);
      };
    } else zb = "document" in ia && "onreadystatechange" in ia.document.createElement("script") ? function (b) {
      var c = ia.document.createElement("script"),
          d = e++;return (f[d] = b, c.onreadystatechange = function () {
        a(d), c.onreadystatechange = null, c.parentNode.removeChild(c), c = null;
      }, ia.document.documentElement.appendChild(c), d);
    } : function (b) {
      var c = e++;return (f[c] = b, Eb(function () {
        a(c);
      }, 0), c);
    };
  })();var Gb,
      Hb = wb.timeout = wb["default"] = (function () {
    function a(a, b) {
      var c = this,
          d = new tb(),
          e = zb(function () {
        !d.isDisposed && d.setDisposable(b(c, a));
      });return new mb(d, pb(function () {
        Ab(e);
      }));
    }function b(a, b, c) {
      var d = this,
          e = wb.normalize(b),
          f = new tb();if (0 === e) return d.scheduleWithState(a, c);var g = Eb(function () {
        !f.isDisposed && f.setDisposable(c(d, a));
      }, e);return new mb(f, pb(function () {
        Fb(g);
      }));
    }function c(a, b, c) {
      return this.scheduleWithRelativeAndState(a, b - this.now(), c);
    }return new wb(ma, a, b, c);
  })(),
      Ib = ja.Notification = (function () {
    function a(a, b, c, d, e, f) {
      this.kind = a, this.value = b, this.exception = c, this._accept = d, this._acceptObservable = e, this.toString = f;
    }return (a.prototype.accept = function (a, b, c) {
      return a && "object" == typeof a ? this._acceptObservable(a) : this._accept(a, b, c);
    }, a.prototype.toObservable = function (a) {
      var b = this;return (yb(a) || (a = Bb), new Yc(function (c) {
        return a.scheduleWithState(b, function (a, b) {
          b._acceptObservable(c), "N" === b.kind && c.onCompleted();
        });
      }));
    }, a);
  })(),
      Jb = Ib.createOnNext = (function () {
    function a(a) {
      return a(this.value);
    }function b(a) {
      return a.onNext(this.value);
    }function c() {
      return "OnNext(" + this.value + ")";
    }return function (d) {
      return new Ib("N", d, null, a, b, c);
    };
  })(),
      Kb = Ib.createOnError = (function () {
    function a(a, b) {
      return b(this.exception);
    }function b(a) {
      return a.onError(this.exception);
    }function c() {
      return "OnError(" + this.exception + ")";
    }return function (d) {
      return new Ib("E", null, d, a, b, c);
    };
  })(),
      Lb = Ib.createOnCompleted = (function () {
    function a(a, b, c) {
      return c();
    }function b(a) {
      return a.onCompleted();
    }function c() {
      return "OnCompleted()";
    }return function () {
      return new Ib("C", null, null, a, b, c);
    };
  })(),
      Mb = ja.Observer = function () {},
      Nb = Mb.create = function (a, b, c) {
    return (a || (a = ka), b || (b = pa), c || (c = ka), new Pb(a, b, c));
  },
      Ob = ja.internals.AbstractObserver = (function (a) {
    function b() {
      this.isStopped = !1;
    }return (kb(b, a), b.prototype.next = Ea, b.prototype.error = Ea, b.prototype.completed = Ea, b.prototype.onNext = function (a) {
      !this.isStopped && this.next(a);
    }, b.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.error(a));
    }, b.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.completed());
    }, b.prototype.dispose = function () {
      this.isStopped = !0;
    }, b.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.error(a), !0);
    }, b);
  })(Mb),
      Pb = ja.AnonymousObserver = (function (a) {
    function b(b, c, d) {
      a.call(this), this._onNext = b, this._onError = c, this._onCompleted = d;
    }return (kb(b, a), b.prototype.next = function (a) {
      this._onNext(a);
    }, b.prototype.error = function (a) {
      this._onError(a);
    }, b.prototype.completed = function () {
      this._onCompleted();
    }, b);
  })(Ob),
      Qb = ja.Observable = (function () {
    function a(a, b) {
      return function (c) {
        var d = c.onError;return (c.onError = function (b) {
          e(b, a), d.call(c, b);
        }, b.call(a, c));
      };
    }function b(b) {
      if (ja.config.longStackSupport && ua) {
        var c = ta(d)(new Error()).e;this.stack = c.stack.substring(c.stack.indexOf("\n") + 1), this._subscribe = a(this, b);
      } else this._subscribe = b;
    }return (Gb = b.prototype, b.isObservable = function (a) {
      return a && ra(a.subscribe);
    }, Gb.subscribe = Gb.forEach = function (a, b, c) {
      return this._subscribe("object" == typeof a ? a : Nb(a, b, c));
    }, Gb.subscribeOnNext = function (a, b) {
      return this._subscribe(Nb("undefined" != typeof b ? function (c) {
        a.call(b, c);
      } : a));
    }, Gb.subscribeOnError = function (a, b) {
      return this._subscribe(Nb(null, "undefined" != typeof b ? function (c) {
        a.call(b, c);
      } : a));
    }, Gb.subscribeOnCompleted = function (a, b) {
      return this._subscribe(Nb(null, null, "undefined" != typeof b ? function () {
        a.call(b);
      } : a));
    }, b);
  })(),
      Rb = ja.internals.ScheduledObserver = (function (a) {
    function b(b, c) {
      a.call(this), this.scheduler = b, this.observer = c, this.isAcquired = !1, this.hasFaulted = !1, this.queue = [], this.disposable = new ub();
    }return (kb(b, a), b.prototype.next = function (a) {
      var b = this;this.queue.push(function () {
        b.observer.onNext(a);
      });
    }, b.prototype.error = function (a) {
      var b = this;this.queue.push(function () {
        b.observer.onError(a);
      });
    }, b.prototype.completed = function () {
      var a = this;this.queue.push(function () {
        a.observer.onCompleted();
      });
    }, b.prototype.ensureActive = function () {
      var a = !1;!this.hasFaulted && this.queue.length > 0 && (a = !this.isAcquired, this.isAcquired = !0), a && this.disposable.setDisposable(this.scheduler.scheduleRecursiveWithState(this, function (a, b) {
        var c;if (!(a.queue.length > 0)) return void (a.isAcquired = !1);c = a.queue.shift();var e = ta(c)();return e === sa ? (a.queue = [], a.hasFaulted = !0, d(e.e)) : void b(a);
      }));
    }, b.prototype.dispose = function () {
      a.prototype.dispose.call(this), this.disposable.dispose();
    }, b);
  })(Ob),
      Sb = ja.ObservableBase = (function (a) {
    function b(a) {
      return a && ra(a.dispose) ? a : ra(a) ? pb(a) : qb;
    }function c(a, c) {
      var e = c[0],
          f = c[1],
          g = ta(f.subscribeCore).call(f, e);return g !== sa || e.fail(sa.e) ? void e.setDisposable(b(g)) : d(sa.e);
    }function e(a) {
      var b = new Zc(a),
          d = [b, this];return (Cb.scheduleRequired() ? Cb.scheduleWithState(d, c) : c(null, d), b);
    }function f() {
      a.call(this, e);
    }return (kb(f, a), f.prototype.subscribeCore = Ea, f);
  })(Qb),
      Tb = (function (a) {
    function b(b, c, d, e) {
      this.resultSelector = ja.helpers.isFunction(d) ? d : null, this.selector = ja.internals.bindCallback(ja.helpers.isFunction(c) ? c : function () {
        return c;
      }, e, 3), this.source = b, a.call(this);
    }function c(a, b, c, d) {
      this.i = 0, this.selector = b, this.resultSelector = c, this.source = d, this.isStopped = !1, this.o = a;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a, this.selector, this.resultSelector, this));
    }, c.prototype._wrapResult = function (a, b, c) {
      return this.resultSelector ? a.map(function (a, d) {
        return this.resultSelector(b, a, c, d);
      }, this) : a;
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = this.i++,
            c = ta(this.selector)(a, b, this.source);if (c === sa) return this.o.onError(c.e);ja.helpers.isPromise(c) && (c = ja.Observable.fromPromise(c)), (ja.helpers.isArrayLike(c) || ja.helpers.isIterable(c)) && (c = ja.Observable.from(c)), this.o.onNext(this._wrapResult(c, a, b));
      }
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, b);
  })(Sb),
      Ub = ja.internals.Enumerable = function () {},
      Vb = (function (a) {
    function b(b) {
      this.sources = b, a.call(this);
    }function c(a, b, c) {
      this.o = a, this.s = b, this.e = c, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b,
          d = new ub(),
          e = Bb.scheduleRecursiveWithState(this.sources[Ga](), function (e, f) {
        if (!b) {
          var g = ta(e.next).call(e);if (g === sa) return a.onError(g.e);if (g.done) return a.onCompleted();var h = g.value;qa(h) && (h = Qc(h));var i = new tb();d.setDisposable(i), i.setDisposable(h.subscribe(new c(a, f, e)));
        }
      });return new mb(d, e, pb(function () {
        b = !0;
      }));
    }, c.prototype.onNext = function (a) {
      this.isStopped || this.o.onNext(a);
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.s(this.e));
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Ub.prototype.concat = function () {
    return new Vb(this);
  };var Wb = (function (a) {
    function b(b) {
      this.sources = b, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b,
          c = this.sources[Ga](),
          d = new ub(),
          e = Bb.scheduleRecursiveWithState(null, function (e, f) {
        if (!b) {
          var g = ta(c.next).call(c);if (g === sa) return a.onError(g.e);if (g.done) return null !== e ? a.onError(e) : a.onCompleted();var h = g.value;qa(h) && (h = Qc(h));var i = new tb();d.setDisposable(i), i.setDisposable(h.subscribe(function (b) {
            a.onNext(b);
          }, f, function () {
            a.onCompleted();
          }));
        }
      });return new mb(d, e, pb(function () {
        b = !0;
      }));
    }, b);
  })(Sb);Ub.prototype.catchError = function () {
    return new Wb(this);
  }, Ub.prototype.catchErrorWhen = function (a) {
    var b = this;return new Yc(function (c) {
      var d,
          e,
          f = new _c(),
          g = new _c(),
          h = a(f),
          i = h.subscribe(g),
          j = b[Ga](),
          k = new ub(),
          l = Bb.scheduleRecursive(function (a) {
        if (!d) {
          var b = ta(j.next).call(j);if (b === sa) return c.onError(b.e);if (b.done) return void (e ? c.onError(e) : c.onCompleted());var h = b.value;qa(h) && (h = Qc(h));var i = new tb(),
              l = new tb();k.setDisposable(new mb(l, i)), i.setDisposable(h.subscribe(function (a) {
            c.onNext(a);
          }, function (b) {
            l.setDisposable(g.subscribe(a, function (a) {
              c.onError(a);
            }, function () {
              c.onCompleted();
            })), f.onNext(b);
          }, function () {
            c.onCompleted();
          }));
        }
      });return new mb(i, k, l, pb(function () {
        d = !0;
      }));
    });
  };var Xb = (function (a) {
    function b(a, b) {
      this.v = a, this.c = null == b ? -1 : b;
    }function c(a) {
      this.v = a.v, this.l = a.c;
    }return (kb(b, a), b.prototype[Ga] = function () {
      return new c(this);
    }, c.prototype.next = function () {
      return 0 === this.l ? Ha : (this.l > 0 && this.l--, { done: !1, value: this.v });
    }, b);
  })(Ub),
      Yb = Ub.repeat = function (a, b) {
    return new Xb(a, b);
  },
      Zb = (function (a) {
    function b(a, b, c) {
      this.s = a, this.fn = b ? La(b, c, 3) : null;
    }function c(a) {
      this.i = -1, this.s = a.s, this.l = this.s.length, this.fn = a.fn;
    }return (kb(b, a), b.prototype[Ga] = function () {
      return new c(this);
    }, c.prototype.next = function () {
      return ++this.i < this.l ? { done: !1, value: this.fn ? this.fn(this.s[this.i], this.i, this.s) : this.s[this.i] } : Ha;
    }, b);
  })(Ub),
      $b = Ub.of = function (a, b, c) {
    return new Zb(a, b, c);
  },
      _b = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a) {
      this.o = a, this.a = [], this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a));
    }, c.prototype.onNext = function (a) {
      this.isStopped || this.a.push(a);
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onNext(this.a), this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.toArray = function () {
    return new _b(this);
  }, Qb.create = function (a, b) {
    return new Yc(a, b);
  };var ac = Qb.defer = function (a) {
    return new Yc(function (b) {
      var c;try {
        c = a();
      } catch (d) {
        return tc(d).subscribe(b);
      }return (qa(c) && (c = Qc(c)), c.subscribe(b));
    });
  },
      bc = (function (a) {
    function b(b) {
      this.scheduler = b, a.call(this);
    }function c(a, b) {
      this.observer = a, this.scheduler = b;
    }function d(a, b) {
      return (b.onCompleted(), qb);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(a, this.scheduler);return b.run();
    }, c.prototype.run = function () {
      return this.scheduler.scheduleWithState(this.observer, d);
    }, b);
  })(Sb),
      cc = new bc(Bb),
      dc = Qb.empty = function (a) {
    return (yb(a) || (a = Bb), a === Bb ? cc : new bc(a));
  },
      ec = (function (a) {
    function b(b, c, d) {
      this.iterable = b, this.mapper = c, this.scheduler = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new fc(a, this);return b.run();
    }, b);
  })(Sb),
      fc = (function () {
    function a(a, b) {
      this.o = a, this.parent = b;
    }return (a.prototype.run = function () {
      function a(a, b) {
        var f = ta(c.next).call(c);if (f === sa) return d.onError(f.e);if (f.done) return d.onCompleted();var g = f.value;return ra(e) && (g = ta(e)(g, a), g === sa) ? d.onError(g.e) : (d.onNext(g), void b(a + 1));
      }var b = Object(this.parent.iterable),
          c = v(b),
          d = this.o,
          e = this.parent.mapper;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
    }, a);
  })(),
      gc = Math.pow(2, 53) - 1;q.prototype[Ga] = function () {
    return new r(this._s);
  }, r.prototype[Ga] = function () {
    return this;
  }, r.prototype.next = function () {
    return this._i < this._l ? { done: !1, value: this._s.charAt(this._i++) } : Ha;
  }, s.prototype[Ga] = function () {
    return new t(this._a);
  }, t.prototype[Ga] = function () {
    return this;
  }, t.prototype.next = function () {
    return this._i < this._l ? { done: !1, value: this._a[this._i++] } : Ha;
  };var hc = Qb.from = function (a, b, c, d) {
    if (null == a) throw new Error("iterable cannot be null.");if (b && !ra(b)) throw new Error("mapFn when provided must be a function");if (b) var e = La(b, c, 2);return (yb(d) || (d = Cb), new ec(a, e, d));
  },
      ic = (function (a) {
    function b(b, c) {
      this.args = b, this.scheduler = c, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new y(a, this);return b.run();
    }, b);
  })(Sb);y.prototype.run = function () {
    function a(a, e) {
      d > a ? (b.onNext(c[a]), e(a + 1)) : b.onCompleted();
    }var b = this.observer,
        c = this.parent.args,
        d = c.length;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
  };var jc = Qb.fromArray = function (a, b) {
    return (yb(b) || (b = Cb), new ic(a, b));
  },
      kc = (function (a) {
    function b() {
      a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return qb;
    }, b);
  })(Sb),
      lc = new kc(),
      mc = Qb.never = function () {
    return lc;
  };Qb.of = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return new ic(b, Cb);
  }, Qb.ofWithScheduler = function (a) {
    for (var b = arguments.length, c = new Array(b - 1), d = 1; b > d; d++) c[d - 1] = arguments[d];return new ic(c, a);
  };var nc = (function (a) {
    function b(b, c) {
      this.obj = b, this.keys = Object.keys(b), this.scheduler = c, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new A(a, this);return b.run();
    }, b);
  })(Sb);A.prototype.run = function () {
    function a(a, f) {
      if (e > a) {
        var g = d[a];b.onNext([g, c[g]]), f(a + 1);
      } else b.onCompleted();
    }var b = this.observer,
        c = this.parent.obj,
        d = this.parent.keys,
        e = d.length;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
  }, Qb.pairs = function (a, b) {
    return (b || (b = Cb), new nc(a, b));
  };var oc = (function (a) {
    function b(b, c, d) {
      this.start = b, this.rangeCount = c, this.scheduler = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new pc(a, this);return b.run();
    }, b);
  })(Sb),
      pc = (function () {
    function a(a, b) {
      this.observer = a, this.parent = b;
    }return (a.prototype.run = function () {
      function a(a, e) {
        c > a ? (d.onNext(b + a), e(a + 1)) : d.onCompleted();
      }var b = this.parent.start,
          c = this.parent.rangeCount,
          d = this.observer;return this.parent.scheduler.scheduleRecursiveWithState(0, a);
    }, a);
  })();Qb.range = function (a, b, c) {
    return (yb(c) || (c = Cb), new oc(a, b, c));
  };var qc = (function (a) {
    function b(b, c, d) {
      this.value = b, this.repeatCount = null == c ? -1 : c, this.scheduler = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new B(a, this);return b.run();
    }, b);
  })(Sb);B.prototype.run = function () {
    function a(a, d) {
      return ((-1 === a || a > 0) && (b.onNext(c), a > 0 && a--), 0 === a ? b.onCompleted() : void d(a));
    }var b = this.observer,
        c = this.parent.value;return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount, a);
  }, Qb.repeat = function (a, b, c) {
    return (yb(c) || (c = Cb), new qc(a, b, c));
  };var rc = (function (a) {
    function b(b, c) {
      this.value = b, this.scheduler = c, a.call(this);
    }function c(a, b, c) {
      this.observer = a, this.value = b, this.scheduler = c;
    }function d(a, b) {
      var c = b[0],
          d = b[1];return (d.onNext(c), d.onCompleted(), qb);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(a, this.value, this.scheduler);return b.run();
    }, c.prototype.run = function () {
      var a = [this.value, this.observer];return this.scheduler === Bb ? d(null, a) : this.scheduler.scheduleWithState(a, d);
    }, b);
  })(Sb),
      sc = (Qb["return"] = Qb.just = function (a, b) {
    return (yb(b) || (b = Bb), new rc(a, b));
  }, (function (a) {
    function b(b, c) {
      this.error = b, this.scheduler = c, a.call(this);
    }function c(a, b) {
      this.o = a, this.p = b;
    }function d(a, b) {
      var c = b[0],
          d = b[1];d.onError(c);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(a, this);return b.run();
    }, c.prototype.run = function () {
      return this.p.scheduler.scheduleWithState([this.p.error, this.o], d);
    }, b);
  })(Sb)),
      tc = Qb["throw"] = function (a, b) {
    return (yb(b) || (b = Bb), new sc(a, b));
  },
      uc = (function (a) {
    function b(b, c, d) {
      this._o = b, this._s = c, this._fn = d, a.call(this);
    }return (kb(b, a), b.prototype.next = function (a) {
      this._o.onNext(a);
    }, b.prototype.completed = function () {
      return this._o.onCompleted();
    }, b.prototype.error = function (a) {
      var b = ta(this._fn)(a);if (b === sa) return this._o.onError(b.e);qa(b) && (b = Qc(b));var c = new tb();this._s.setDisposable(c), c.setDisposable(b.subscribe(this._o));
    }, b);
  })(Ob);Gb["catch"] = function (a) {
    return ra(a) ? C(this, a) : vc([this, a]);
  };var vc = Qb["catch"] = function () {
    var a;if (Array.isArray(arguments[0])) a = arguments[0];else {
      var b = arguments.length;a = new Array(b);for (var c = 0; b > c; c++) a[c] = arguments[c];
    }return $b(a).catchError();
  };Gb.combineLatest = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];return (Array.isArray(b[0]) ? b[0].unshift(this) : b.unshift(this), wc.apply(this, b));
  };var wc = Qb.combineLatest = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = ra(b[a - 1]) ? b.pop() : E;return (Array.isArray(b[0]) && (b = b[0]), new Yc(function (a) {
      function c(b) {
        if ((g[b] = !0, h || (h = g.every(la)))) {
          try {
            var c = d.apply(null, j);
          } catch (e) {
            return a.onError(e);
          }a.onNext(c);
        } else i.filter(function (a, c) {
          return c !== b;
        }).every(la) && a.onCompleted();
      }function e(b) {
        i[b] = !0, i.every(la) && a.onCompleted();
      }for (var f = b.length, g = p(f, D), h = !1, i = p(f, D), j = new Array(f), k = new Array(f), l = 0; f > l; l++) !(function (d) {
        var f = b[d],
            g = new tb();qa(f) && (f = Qc(f)), g.setDisposable(f.subscribe(function (a) {
          j[d] = a, c(d);
        }, function (b) {
          a.onError(b);
        }, function () {
          e(d);
        })), k[d] = g;
      })(l);return new mb(k);
    }, this));
  };Gb.concat = function () {
    for (var a = [], b = 0, c = arguments.length; c > b; b++) a.push(arguments[b]);return (a.unshift(this), yc.apply(null, a));
  };var xc = (function (a) {
    function b(b) {
      this.sources = b, a.call(this);
    }function c(a, b) {
      this.sources = a, this.o = b;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new c(this.sources, a);return b.run();
    }, c.prototype.run = function () {
      var a,
          b = new ub(),
          c = this.sources,
          d = c.length,
          e = this.o,
          f = Bb.scheduleRecursiveWithState(0, function (f, g) {
        if (!a) {
          if (f === d) return e.onCompleted();var h = c[f];qa(h) && (h = Qc(h));var i = new tb();b.setDisposable(i), i.setDisposable(h.subscribe(function (a) {
            e.onNext(a);
          }, function (a) {
            e.onError(a);
          }, function () {
            g(f + 1);
          }));
        }
      });return new mb(b, f, pb(function () {
        a = !0;
      }));
    }, b);
  })(Sb),
      yc = Qb.concat = function () {
    var a;if (Array.isArray(arguments[0])) a = arguments[0];else {
      a = new Array(arguments.length);for (var b = 0, c = arguments.length; c > b; b++) a[b] = arguments[b];
    }return new xc(a);
  };Gb.concatAll = function () {
    return this.merge(1);
  };var zc = (function (a) {
    function b(b, c) {
      this.source = b, this.maxConcurrent = c, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new mb();return (b.add(this.source.subscribe(new Ac(a, this.maxConcurrent, b))), b);
    }, b);
  })(Sb),
      Ac = (function () {
    function a(a, b, c) {
      this.o = a, this.max = b, this.g = c, this.done = !1, this.q = [], this.activeCount = 0, this.isStopped = !1;
    }function b(a, b) {
      this.parent = a, this.sad = b, this.isStopped = !1;
    }return (a.prototype.handleSubscribe = function (a) {
      var c = new tb();this.g.add(c), qa(a) && (a = Qc(a)), c.setDisposable(a.subscribe(new b(this, c)));
    }, a.prototype.onNext = function (a) {
      this.isStopped || (this.activeCount < this.max ? (this.activeCount++, this.handleSubscribe(a)) : this.q.push(a));
    }, a.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, a.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.done = !0, 0 === this.activeCount && this.o.onCompleted());
    }, a.prototype.dispose = function () {
      this.isStopped = !0;
    }, a.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b.prototype.onNext = function (a) {
      this.isStopped || this.parent.o.onNext(a);
    }, b.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.parent.o.onError(a));
    }, b.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = !0;var a = this.parent;a.g.remove(this.sad), a.q.length > 0 ? a.handleSubscribe(a.q.shift()) : (a.activeCount--, a.done && 0 === a.activeCount && a.o.onCompleted());
      }
    }, b.prototype.dispose = function () {
      this.isStopped = !0;
    }, b.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.parent.o.onError(a), !0);
    }, a);
  })();Gb.merge = function (a) {
    return "number" != typeof a ? Bc(this, a) : new zc(this, a);
  };var Bc = Qb.merge = function () {
    var a,
        b,
        c = [],
        d = arguments.length;if (arguments[0]) if (yb(arguments[0])) for (a = arguments[0], b = 1; d > b; b++) c.push(arguments[b]);else for (a = Bb, b = 0; d > b; b++) c.push(arguments[b]);else for (a = Bb, b = 1; d > b; b++) c.push(arguments[b]);return (Array.isArray(c[0]) && (c = c[0]), z(a, c).mergeAll());
  },
      Cc = ja.CompositeError = function (a) {
    this.name = "NotImplementedError", this.innerErrors = a, this.message = "This contains multiple errors. Check the innerErrors", Error.call(this);
  };Cc.prototype = Error.prototype, Qb.mergeDelayError = function () {
    var a;if (Array.isArray(arguments[0])) a = arguments[0];else {
      var b = arguments.length;a = new Array(b);for (var c = 0; b > c; c++) a[c] = arguments[c];
    }var d = z(null, a);return new Yc(function (a) {
      function b() {
        0 === g.length ? a.onCompleted() : 1 === g.length ? a.onError(g[0]) : a.onError(new Cc(g));
      }var c = new mb(),
          e = new tb(),
          f = !1,
          g = [];return (c.add(e), e.setDisposable(d.subscribe(function (d) {
        var e = new tb();c.add(e), qa(d) && (d = Qc(d)), e.setDisposable(d.subscribe(function (b) {
          a.onNext(b);
        }, function (a) {
          g.push(a), c.remove(e), f && 1 === c.length && b();
        }, function () {
          c.remove(e), f && 1 === c.length && b();
        }));
      }, function (a) {
        g.push(a), f = !0, 1 === c.length && b();
      }, function () {
        f = !0, 1 === c.length && b();
      })), c);
    });
  };var Dc = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a, b) {
      this.o = a, this.g = b, this.isStopped = !1, this.done = !1;
    }function d(a, b) {
      this.parent = a, this.sad = b, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new mb(),
          d = new tb();return (b.add(d), d.setDisposable(this.source.subscribe(new c(a, b))), b);
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = new tb();this.g.add(b), qa(a) && (a = Qc(a)), b.setDisposable(a.subscribe(new d(this, b)));
      }
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.done = !0, 1 === this.g.length && this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, d.prototype.onNext = function (a) {
      this.isStopped || this.parent.o.onNext(a);
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.parent.o.onError(a));
    }, d.prototype.onCompleted = function () {
      if (!this.isStopped) {
        var a = this.parent;this.isStopped = !0, a.g.remove(this.sad), a.done && 1 === a.g.length && a.o.onCompleted();
      }
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.parent.o.onError(a), !0);
    }, b);
  })(Sb);Gb.mergeAll = function () {
    return new Dc(this);
  }, Gb.skipUntil = function (a) {
    var b = this;return new Yc(function (c) {
      var d = !1,
          e = new mb(b.subscribe(function (a) {
        d && c.onNext(a);
      }, function (a) {
        c.onError(a);
      }, function () {
        d && c.onCompleted();
      }));qa(a) && (a = Qc(a));var f = new tb();return (e.add(f), f.setDisposable(a.subscribe(function () {
        d = !0, f.dispose();
      }, function (a) {
        c.onError(a);
      }, function () {
        f.dispose();
      })), e);
    }, b);
  };var Ec = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a, b) {
      this.o = a, this.inner = b, this.stopped = !1, this.latest = 0, this.hasLatest = !1, this.isStopped = !1;
    }function d(a, b) {
      this.parent = a, this.id = b, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      var b = new ub(),
          d = this.source.subscribe(new c(a, b));return new mb(d, b);
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = new tb(),
            c = ++this.latest;this.hasLatest = !0, this.inner.setDisposable(b), qa(a) && (a = Qc(a)), b.setDisposable(a.subscribe(new d(this, c)));
      }
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.stopped = !0, !this.hasLatest && this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, d.prototype.onNext = function (a) {
      this.isStopped || this.parent.latest === this.id && this.parent.o.onNext(a);
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.parent.latest === this.id && this.parent.o.onError(a));
    }, d.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.parent.latest === this.id && (this.parent.hasLatest = !1, this.parent.isStopped && this.parent.o.onCompleted()));
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.parent.o.onError(a), !0);
    }, b);
  })(Sb);Gb["switch"] = Gb.switchLatest = function () {
    return new Ec(this);
  };var Fc = (function (a) {
    function b(b, c) {
      this.source = b, this.other = qa(c) ? Qc(c) : c, a.call(this);
    }function c(a) {
      this.o = a, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return new mb(this.source.subscribe(a), this.other.subscribe(new c(a)));
    }, c.prototype.onNext = function (a) {
      this.isStopped || this.o.onCompleted();
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      !this.isStopped && (this.isStopped = !0);
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.takeUntil = function (a) {
    return new Fc(this, a);
  }, Gb.withLatestFrom = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = b.pop(),
        e = this;return (Array.isArray(b[0]) && (b = b[0]), new Yc(function (a) {
      for (var c = b.length, f = p(c, D), g = !1, h = new Array(c), i = new Array(c + 1), j = 0; c > j; j++) !(function (c) {
        var d = b[c],
            e = new tb();qa(d) && (d = Qc(d)), e.setDisposable(d.subscribe(function (a) {
          h[c] = a, f[c] = !0, g = f.every(la);
        }, function (b) {
          a.onError(b);
        }, ka)), i[c] = e;
      })(j);var k = new tb();return (k.setDisposable(e.subscribe(function (b) {
        var c = [b].concat(h);if (g) {
          var e = ta(d).apply(null, c);return e === sa ? a.onError(e.e) : void a.onNext(e);
        }
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      })), i[c] = k, new mb(i));
    }, this));
  }, Gb.zip = function () {
    if (0 === arguments.length) throw new Error("invalid arguments");for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = ra(b[a - 1]) ? b.pop() : E;Array.isArray(b[0]) && (b = b[0]);var e = this;return (b.unshift(e), new Yc(function (a) {
      for (var c = b.length, f = p(c, F), g = p(c, D), h = new Array(c), i = 0; c > i; i++) !(function (c) {
        var i = b[c],
            j = new tb();qa(i) && (i = Qc(i)), j.setDisposable(i.subscribe(function (b) {
          if ((f[c].push(b), f.every(function (a) {
            return a.length > 0;
          }))) {
            var h = f.map(function (a) {
              return a.shift();
            }),
                i = ta(d).apply(e, h);if (i === sa) return a.onError(i.e);a.onNext(i);
          } else g.filter(function (a, b) {
            return b !== c;
          }).every(la) && a.onCompleted();
        }, function (b) {
          a.onError(b);
        }, function () {
          g[c] = !0, g.every(la) && a.onCompleted();
        })), h[c] = j;
      })(i);return new mb(h);
    }, e));
  }, Qb.zip = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];Array.isArray(b[0]) && (b = ra(b[1]) ? b[0].concat(b[1]) : b[0]);var d = b.shift();return d.zip.apply(d, b);
  }, Gb.zipIterable = function () {
    if (0 === arguments.length) throw new Error("invalid arguments");for (var a = arguments.length, b = new Array(a), c = 0; a > c; c++) b[c] = arguments[c];var d = ra(b[a - 1]) ? b.pop() : E,
        e = this;return (b.unshift(e), new Yc(function (a) {
      for (var c = b.length, f = p(c, F), g = p(c, D), h = new Array(c), i = 0; c > i; i++) !(function (c) {
        var i = b[c],
            j = new tb();(Ja(i) || Ia(i)) && (i = hc(i)), j.setDisposable(i.subscribe(function (b) {
          if ((f[c].push(b), f.every(function (a) {
            return a.length > 0;
          }))) {
            var h = f.map(function (a) {
              return a.shift();
            }),
                i = ta(d).apply(e, h);if (i === sa) return a.onError(i.e);a.onNext(i);
          } else g.filter(function (a, b) {
            return b !== c;
          }).every(la) && a.onCompleted();
        }, function (b) {
          a.onError(b);
        }, function () {
          g[c] = !0, g.every(la) && a.onCompleted();
        })), h[c] = j;
      })(i);return new mb(h);
    }, e));
  }, Gb.asObservable = function () {
    return new Yc(G(this), this);
  }, Gb.dematerialize = function () {
    var a = this;return new Yc(function (b) {
      return a.subscribe(function (a) {
        return a.accept(b);
      }, function (a) {
        b.onError(a);
      }, function () {
        b.onCompleted();
      });
    }, this);
  };var Gc = (function (a) {
    function b(b, c, d) {
      this.source = b, this.keyFn = c, this.comparer = d, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new Hc(a, this.keyFn, this.comparer));
    }, b);
  })(Sb),
      Hc = (function (a) {
    function b(b, c, d) {
      this.o = b, this.keyFn = c, this.comparer = d, this.hasCurrentKey = !1, this.currentKey = null, a.call(this);
    }return (kb(b, a), b.prototype.next = function (a) {
      var b,
          c = a;return ra(this.keyFn) && (c = ta(this.keyFn)(a), c === sa) ? this.o.onError(c.e) : this.hasCurrentKey && (b = ta(this.comparer)(this.currentKey, c), b === sa) ? this.o.onError(b.e) : void (this.hasCurrentKey && b || (this.hasCurrentKey = !0, this.currentKey = c, this.o.onNext(a)));
    }, b.prototype.error = function (a) {
      this.o.onError(a);
    }, b.prototype.completed = function () {
      this.o.onCompleted();
    }, b);
  })(Ob);Gb.distinctUntilChanged = function (a, b) {
    return (b || (b = na), new Gc(this, a, b));
  };var Ic = (function (a) {
    function b(b, c, d, e) {
      this.source = b, this._oN = c, this._oE = d, this._oC = e, a.call(this);
    }function c(a, b) {
      this.o = a, this.t = !b._oN || ra(b._oN) ? Nb(b._oN || ka, b._oE || ka, b._oC || ka) : b._oN, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a, this));
    }, c.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = ta(this.t.onNext).call(this.t, a);b === sa && this.o.onError(b.e), this.o.onNext(a);
      }
    }, c.prototype.onError = function (a) {
      if (!this.isStopped) {
        this.isStopped = !0;var b = ta(this.t.onError).call(this.t, a);if (b === sa) return this.o.onError(b.e);this.o.onError(a);
      }
    }, c.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = !0;var a = ta(this.t.onCompleted).call(this.t);if (a === sa) return this.o.onError(a.e);this.o.onCompleted();
      }
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb["do"] = Gb.tap = Gb.doAction = function (a, b, c) {
    return new Ic(this, a, b, c);
  }, Gb.doOnNext = Gb.tapOnNext = function (a, b) {
    return this.tap("undefined" != typeof b ? function (c) {
      a.call(b, c);
    } : a);
  }, Gb.doOnError = Gb.tapOnError = function (a, b) {
    return this.tap(ka, "undefined" != typeof b ? function (c) {
      a.call(b, c);
    } : a);
  }, Gb.doOnCompleted = Gb.tapOnCompleted = function (a, b) {
    return this.tap(ka, null, "undefined" != typeof b ? function () {
      a.call(b);
    } : a);
  }, Gb["finally"] = function (a) {
    var b = this;return new Yc(function (c) {
      var e = ta(b.subscribe).call(b, c);return e === sa ? (a(), d(e.e)) : pb(function () {
        var b = ta(e.dispose).call(e);a(), b === sa && d(b.e);
      });
    }, this);
  };var Jc = (function (a) {
    function b(b) {
      this.source = b, a.call(this);
    }function c(a) {
      this.o = a, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a));
    }, c.prototype.onNext = ka, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.observer.onError(a), !0);
    }, b);
  })(Sb);Gb.ignoreElements = function () {
    return new Jc(this);
  }, Gb.materialize = function () {
    var a = this;return new Yc(function (b) {
      return a.subscribe(function (a) {
        b.onNext(Jb(a));
      }, function (a) {
        b.onNext(Kb(a)), b.onCompleted();
      }, function () {
        b.onNext(Lb()), b.onCompleted();
      });
    }, a);
  }, Gb.repeat = function (a) {
    return Yb(this, a).concat();
  }, Gb.retry = function (a) {
    return Yb(this, a).catchError();
  }, Gb.retryWhen = function (a) {
    return Yb(this).catchErrorWhen(a);
  };var Kc = (function (a) {
    function b(b, c, d, e) {
      this.source = b, this.accumulator = c, this.hasSeed = d, this.seed = e, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new H(a, this));
    }, b);
  })(Sb);H.prototype = { onNext: function onNext(a) {
      return this.isStopped ? void 0 : (!this.hasValue && (this.hasValue = !0), this.hasAccumulation ? this.accumulation = ta(this.accumulator)(this.accumulation, a) : (this.accumulation = this.hasSeed ? ta(this.accumulator)(this.seed, a) : a, this.hasAccumulation = !0), this.accumulation === sa ? this.o.onError(this.accumulation.e) : void this.o.onNext(this.accumulation));
    }, onError: function onError(a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, onCompleted: function onCompleted() {
      this.isStopped || (this.isStopped = !0, !this.hasValue && this.hasSeed && this.o.onNext(this.seed), this.o.onCompleted());
    }, dispose: function dispose() {
      this.isStopped = !0;
    }, fail: function fail(a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    } }, Gb.scan = function () {
    var a,
        b = !1,
        c = arguments[0];return (2 === arguments.length && (b = !0, a = arguments[1]), new Kc(this, c, b, a));
  }, Gb.skipLast = function (a) {
    if (0 > a) throw new Ba();var b = this;return new Yc(function (c) {
      var d = [];return b.subscribe(function (b) {
        d.push(b), d.length > a && c.onNext(d.shift());
      }, function (a) {
        c.onError(a);
      }, function () {
        c.onCompleted();
      });
    }, b);
  }, Gb.startWith = function () {
    var a,
        b = 0;arguments.length && yb(arguments[0]) ? (a = arguments[0], b = 1) : a = Bb;for (var c = [], d = b, e = arguments.length; e > d; d++) c.push(arguments[d]);return $b([jc(c, a), this]).concat();
  }, Gb.takeLast = function (a) {
    if (0 > a) throw new Ba();var b = this;return new Yc(function (c) {
      var d = [];return b.subscribe(function (b) {
        d.push(b), d.length > a && d.shift();
      }, function (a) {
        c.onError(a);
      }, function () {
        for (; d.length > 0;) c.onNext(d.shift());c.onCompleted();
      });
    }, b);
  }, Gb.flatMapConcat = Gb.concatMap = function (a, b, c) {
    return new Tb(this, a, b, c).merge(1);
  };var Lc = (function (a) {
    function b(b, c, d) {
      this.source = b, this.selector = La(c, d, 3), a.call(this);
    }function c(a, b) {
      return function (c, d, e) {
        return a.call(this, b.selector(c, d, e), d, e);
      };
    }function d(a, b, c) {
      this.o = a, this.selector = b, this.source = c, this.i = 0, this.isStopped = !1;
    }return (kb(b, a), b.prototype.internalMap = function (a, d) {
      return new b(this.source, c(a, this), d);
    }, b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new d(a, this.selector, this));
    }, d.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = ta(this.selector)(a, this.i++, this.source);return b === sa ? this.o.onError(b.e) : void this.o.onNext(b);
      }
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, d.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.map = Gb.select = function (a, b) {
    var c = "function" == typeof a ? a : function () {
      return a;
    };return this instanceof Lc ? this.internalMap(c, b) : new Lc(this, c, b);
  }, Gb.pluck = function () {
    var a = arguments.length,
        b = new Array(a);if (0 === a) throw new Error("List of properties cannot be empty.");for (var c = 0; a > c; c++) b[c] = arguments[c];return this.map(I(b, a));
  }, Gb.flatMap = Gb.selectMany = function (a, b, c) {
    return new Tb(this, a, b, c).mergeAll();
  }, ja.Observable.prototype.flatMapLatest = function (a, b, c) {
    return new Tb(this, a, b, c).switchLatest();
  };var Mc = (function (a) {
    function b(b, c) {
      this.source = b, this.skipCount = c, a.call(this);
    }function c(a, b) {
      this.c = b, this.r = b, this.o = a, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new c(a, this.skipCount));
    }, c.prototype.onNext = function (a) {
      this.isStopped || (this.r <= 0 ? this.o.onNext(a) : this.r--);
    }, c.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, c.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, c.prototype.dispose = function () {
      this.isStopped = !0;
    }, c.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.skip = function (a) {
    if (0 > a) throw new Ba();return new Mc(this, a);
  }, Gb.skipWhile = function (a, b) {
    var c = this,
        d = La(a, b, 3);return new Yc(function (a) {
      var b = 0,
          e = !1;return c.subscribe(function (f) {
        if (!e) try {
          e = !d(f, b++, c);
        } catch (g) {
          return void a.onError(g);
        }e && a.onNext(f);
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      });
    }, c);
  }, Gb.take = function (a, b) {
    if (0 > a) throw new Ba();if (0 === a) return dc(b);var c = this;return new Yc(function (b) {
      var d = a;return c.subscribe(function (a) {
        d-- > 0 && (b.onNext(a), 0 >= d && b.onCompleted());
      }, function (a) {
        b.onError(a);
      }, function () {
        b.onCompleted();
      });
    }, c);
  }, Gb.takeWhile = function (a, b) {
    var c = this,
        d = La(a, b, 3);return new Yc(function (a) {
      var b = 0,
          e = !0;return c.subscribe(function (f) {
        if (e) {
          try {
            e = d(f, b++, c);
          } catch (g) {
            return void a.onError(g);
          }e ? a.onNext(f) : a.onCompleted();
        }
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      });
    }, c);
  };var Nc = (function (a) {
    function b(b, c, d) {
      this.source = b, this.predicate = La(c, d, 3), a.call(this);
    }function c(a, b) {
      return function (c, d, e) {
        return b.predicate(c, d, e) && a.call(this, c, d, e);
      };
    }function d(a, b, c) {
      this.o = a, this.predicate = b, this.source = c, this.i = 0, this.isStopped = !1;
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return this.source.subscribe(new d(a, this.predicate, this));
    }, b.prototype.internalFilter = function (a, d) {
      return new b(this.source, c(a, this), d);
    }, d.prototype.onNext = function (a) {
      if (!this.isStopped) {
        var b = ta(this.predicate)(a, this.i++, this.source);return b === sa ? this.o.onError(b.e) : void (b && this.o.onNext(a));
      }
    }, d.prototype.onError = function (a) {
      this.isStopped || (this.isStopped = !0, this.o.onError(a));
    }, d.prototype.onCompleted = function () {
      this.isStopped || (this.isStopped = !0, this.o.onCompleted());
    }, d.prototype.dispose = function () {
      this.isStopped = !0;
    }, d.prototype.fail = function (a) {
      return this.isStopped ? !1 : (this.isStopped = !0, this.o.onError(a), !0);
    }, b);
  })(Sb);Gb.filter = Gb.where = function (a, b) {
    return this instanceof Nc ? this.internalFilter(a, b) : new Nc(this, a, b);
  }, Qb.fromCallback = function (a, b, c) {
    return function () {
      "undefined" == typeof b && (b = this);for (var d = arguments.length, e = new Array(d), f = 0; d > f; f++) e[f] = arguments[f];return J(a, b, c, e);
    };
  }, Qb.fromNodeCallback = function (a, b, c) {
    return function () {
      "undefined" == typeof b && (b = this);for (var d = arguments.length, e = new Array(d), f = 0; d > f; f++) e[f] = arguments[f];return L(a, b, c, e);
    };
  }, N.prototype.dispose = function () {
    this.isDisposed || (this._e.removeEventListener(this._n, this._fn, !1), this.isDisposed = !0);
  }, ja.config.useNativeEvents = !1, Qb.fromEvent = function (a, b, c) {
    return a.addListener ? Oc(function (c) {
      a.addListener(b, c);
    }, function (c) {
      a.removeListener(b, c);
    }, c) : ja.config.useNativeEvents || "function" != typeof a.on || "function" != typeof a.off ? new Yc(function (d) {
      return O(a, b, P(d, c));
    }).publish().refCount() : Oc(function (c) {
      a.on(b, c);
    }, function (c) {
      a.off(b, c);
    }, c);
  };var Oc = Qb.fromEventPattern = function (a, b, c, d) {
    return (yb(d) || (d = Bb), new Yc(function (d) {
      function e() {
        var a = arguments[0];return ra(c) && (a = ta(c).apply(null, arguments), a === sa) ? d.onError(a.e) : void d.onNext(a);
      }var f = a(e);return pb(function () {
        ra(b) && b(e, f);
      });
    }).publish().refCount());
  },
      Pc = (function (a) {
    function b(b) {
      this.p = b, a.call(this);
    }return (kb(b, a), b.prototype.subscribeCore = function (a) {
      return (this.p.then(function (b) {
        a.onNext(b), a.onCompleted();
      }, function (b) {
        a.onError(b);
      }), qb);
    }, b);
  })(Sb),
      Qc = Qb.fromPromise = function (a) {
    return new Pc(a);
  };Gb.toPromise = function (a) {
    if ((a || (a = ja.config.Promise), !a)) throw new Ca("Promise type not provided nor in Rx.config.Promise");var b = this;return new a(function (a, c) {
      var d,
          e = !1;b.subscribe(function (a) {
        d = a, e = !0;
      }, c, function () {
        e && a(d);
      });
    });
  }, Qb.startAsync = function (a) {
    var b;try {
      b = a();
    } catch (c) {
      return tc(c);
    }return Qc(b);
  }, Gb.multicast = function (a, b) {
    var c = this;return "function" == typeof a ? new Yc(function (d) {
      var e = c.multicast(a());return new mb(b(e).subscribe(d), e.connect());
    }, c) : new Rc(c, a);
  }, Gb.publish = function (a) {
    return a && ra(a) ? this.multicast(function () {
      return new _c();
    }, a) : this.multicast(new _c());
  }, Gb.share = function () {
    return this.publish().refCount();
  }, Gb.publishLast = function (a) {
    return a && ra(a) ? this.multicast(function () {
      return new ad();
    }, a) : this.multicast(new ad());
  }, Gb.publishValue = function (a, b) {
    return 2 === arguments.length ? this.multicast(function () {
      return new cd(b);
    }, a) : this.multicast(new cd(a));
  }, Gb.shareValue = function (a) {
    return this.publishValue(a).refCount();
  }, Gb.replay = function (a, b, c, d) {
    return a && ra(a) ? this.multicast(function () {
      return new dd(b, c, d);
    }, a) : this.multicast(new dd(b, c, d));
  }, Gb.shareReplay = function (a, b, c) {
    return this.replay(null, a, b, c).refCount();
  };var Rc = ja.ConnectableObservable = (function (a) {
    function b(b, c) {
      var d,
          e = !1,
          f = b.asObservable();this.connect = function () {
        return (e || (e = !0, d = new mb(f.subscribe(c), pb(function () {
          e = !1;
        }))), d);
      }, a.call(this, function (a) {
        return c.subscribe(a);
      });
    }return (kb(b, a), b.prototype.refCount = function () {
      var a,
          b = 0,
          c = this;return new Yc(function (d) {
        var e = 1 === ++b,
            f = c.subscribe(d);return (e && (a = c.connect()), function () {
          f.dispose(), 0 === --b && a.dispose();
        });
      });
    }, b);
  })(Qb),
      Sc = Qb.interval = function (a, b) {
    return T(a, a, yb(b) ? b : Hb);
  };Qb.timer = function (b, c, d) {
    var e;return (yb(d) || (d = Hb), null != c && "number" == typeof c ? e = c : yb(c) && (d = c), b instanceof Date && e === a ? Q(b.getTime(), d) : b instanceof Date && e !== a ? R(b.getTime(), c, d) : e === a ? S(b, d) : T(b, e, d));
  };Gb.delay = function () {
    if ("number" == typeof arguments[0] || arguments[0] instanceof Date) {
      var a = arguments[0],
          b = arguments[1];return (yb(b) || (b = Hb), a instanceof Date ? V(this, a, b) : U(this, a, b));
    }if (ra(arguments[0])) return W(this, arguments[0], arguments[1]);throw new Error("Invalid arguments");
  }, Gb.debounce = function () {
    if (ra(arguments[0])) return Y(this, arguments[0]);if ("number" == typeof arguments[0]) return X(this, arguments[0], arguments[1]);throw new Error("Invalid arguments");
  }, Gb.timestamp = function (a) {
    return (yb(a) || (a = Hb), this.map(function (b) {
      return { value: b, timestamp: a.now() };
    }));
  }, Gb.sample = Gb.throttleLatest = function (a, b) {
    return (yb(b) || (b = Hb), "number" == typeof a ? Z(this, Sc(a, b)) : Z(this, a));
  };var Tc = ja.TimeoutError = function (a) {
    this.message = a || "Timeout has occurred", this.name = "TimeoutError", Error.call(this);
  };Tc.prototype = Object.create(Error.prototype), Gb.timeout = function () {
    var a = arguments[0];if (a instanceof Date || "number" == typeof a) return _(this, a, arguments[1], arguments[2]);if (Qb.isObservable(a) || ra(a)) return $(this, a, arguments[1], arguments[2]);throw new Error("Invalid arguments");
  }, Gb.throttle = function (a, b) {
    yb(b) || (b = Hb);var c = +a || 0;if (0 >= c) throw new RangeError("windowDuration cannot be less or equal zero.");var d = this;return new Yc(function (a) {
      var e = 0;return d.subscribe(function (d) {
        var f = b.now();(0 === e || f - e >= c) && (e = f, a.onNext(d));
      }, function (b) {
        a.onError(b);
      }, function () {
        a.onCompleted();
      });
    }, d);
  };var Uc = (function (a) {
    function b(a) {
      var b = this.source.publish(),
          c = b.subscribe(a),
          d = qb,
          e = this.pauser.distinctUntilChanged().subscribe(function (a) {
        a ? d = b.connect() : (d.dispose(), d = qb);
      });return new mb(c, d, e);
    }function c(c, d) {
      this.source = c, this.controller = new _c(), d && d.subscribe ? this.pauser = this.controller.merge(d) : this.pauser = this.controller, a.call(this, b, c);
    }return (kb(c, a), c.prototype.pause = function () {
      this.controller.onNext(!1);
    }, c.prototype.resume = function () {
      this.controller.onNext(!0);
    }, c);
  })(Qb);Gb.pausable = function (a) {
    return new Uc(this, a);
  };var Vc = (function (b) {
    function c(b) {
      function c() {
        for (; e.length > 0;) b.onNext(e.shift());
      }var d,
          e = [],
          f = aa(this.source, this.pauser.startWith(!1).distinctUntilChanged(), function (a, b) {
        return { data: a, shouldFire: b };
      }).subscribe(function (f) {
        d !== a && f.shouldFire != d ? (d = f.shouldFire, f.shouldFire && c()) : (d = f.shouldFire, f.shouldFire ? b.onNext(f.data) : e.push(f.data));
      }, function (a) {
        c(), b.onError(a);
      }, function () {
        c(), b.onCompleted();
      });return f;
    }function d(a, d) {
      this.source = a, this.controller = new _c(), d && d.subscribe ? this.pauser = this.controller.merge(d) : this.pauser = this.controller, b.call(this, c, a);
    }return (kb(d, b), d.prototype.pause = function () {
      this.controller.onNext(!1);
    }, d.prototype.resume = function () {
      this.controller.onNext(!0);
    }, d);
  })(Qb);Gb.pausableBuffered = function (a) {
    return new Vc(this, a);
  };var Wc = (function (a) {
    function b(a) {
      return this.source.subscribe(a);
    }function c(c, d, e) {
      a.call(this, b, c), this.subject = new Xc(d, e), this.source = c.multicast(this.subject).refCount();
    }return (kb(c, a), c.prototype.request = function (a) {
      return this.subject.request(null == a ? -1 : a);
    }, c);
  })(Qb),
      Xc = (function (a) {
    function b(a) {
      return this.subject.subscribe(a);
    }function c(c, d) {
      null == c && (c = !0), a.call(this, b), this.subject = new _c(), this.enableQueue = c, this.queue = c ? [] : null, this.requestedCount = 0, this.requestedDisposable = null, this.error = null, this.hasFailed = !1, this.hasCompleted = !1, this.scheduler = d || Cb;
    }return (kb(c, a), lb(c.prototype, Mb, { onCompleted: function onCompleted() {
        this.hasCompleted = !0, this.enableQueue && 0 !== this.queue.length ? this.queue.push(Ib.createOnCompleted()) : (this.subject.onCompleted(), this.disposeCurrentRequest());
      }, onError: function onError(a) {
        this.hasFailed = !0, this.error = a, this.enableQueue && 0 !== this.queue.length ? this.queue.push(Ib.createOnError(a)) : (this.subject.onError(a), this.disposeCurrentRequest());
      }, onNext: function onNext(a) {
        this.requestedCount <= 0 ? this.enableQueue && this.queue.push(Ib.createOnNext(a)) : (0 === this.requestedCount-- && this.disposeCurrentRequest(), this.subject.onNext(a));
      }, _processRequest: function _processRequest(a) {
        if (this.enableQueue) for (; this.queue.length > 0 && (a > 0 || "N" !== this.queue[0].kind);) {
          var b = this.queue.shift();b.accept(this.subject), "N" === b.kind ? a-- : (this.disposeCurrentRequest(), this.queue = []);
        }return a;
      }, request: function request(a) {
        this.disposeCurrentRequest();var b = this;return (this.requestedDisposable = this.scheduler.scheduleWithState(a, function (a, c) {
          var d = b._processRequest(c),
              e = b.hasCompleted || b.hasFailed;return !e && d > 0 ? (b.requestedCount = d, pb(function () {
            b.requestedCount = 0;
          })) : void 0;
        }), this.requestedDisposable);
      }, disposeCurrentRequest: function disposeCurrentRequest() {
        this.requestedDisposable && (this.requestedDisposable.dispose(), this.requestedDisposable = null);
      } }), c);
  })(Qb);Gb.controlled = function (a, b) {
    return (a && yb(a) && (b = a, a = !0), null == a && (a = !0), new Wc(this, a, b));
  }, Gb.pipe = function (a) {
    function b() {
      c.resume();
    }var c = this.pausableBuffered();return (a.addListener("drain", b), c.subscribe(function (b) {
      !a.write(String(b)) && c.pause();
    }, function (b) {
      a.emit("error", b);
    }, function () {
      !a._isStdio && a.end(), a.removeListener("drain", b);
    }), c.resume(), a);
  }, Gb.transduce = function (a) {
    function b(a) {
      return { "@@transducer/init": function transducerInit() {
          return a;
        }, "@@transducer/step": function transducerStep(a, b) {
          return a.onNext(b);
        }, "@@transducer/result": function transducerResult(a) {
          return a.onCompleted();
        } };
    }var c = this;return new Yc(function (d) {
      var e = a(b(d));return c.subscribe(function (a) {
        var b = ta(e["@@transducer/step"]).call(e, d, a);b === sa && d.onError(b.e);
      }, function (a) {
        d.onError(a);
      }, function () {
        e["@@transducer/result"](d);
      });
    }, c);
  };var Yc = ja.AnonymousObservable = (function (a) {
    function b(a) {
      return a && ra(a.dispose) ? a : ra(a) ? pb(a) : qb;
    }function c(a, c) {
      var e = c[0],
          f = c[1],
          g = ta(f.__subscribe).call(f, e);return g !== sa || e.fail(sa.e) ? void e.setDisposable(b(g)) : d(sa.e);
    }function e(a) {
      var b = new Zc(a),
          d = [b, this];return (Cb.scheduleRequired() ? Cb.scheduleWithState(d, c) : c(null, d), b);
    }function f(b, c) {
      this.source = c, this.__subscribe = b, a.call(this, e);
    }return (kb(f, a), f);
  })(Qb),
      Zc = (function (a) {
    function b(b) {
      a.call(this), this.observer = b, this.m = new tb();
    }kb(b, a);var c = b.prototype;return (c.next = function (a) {
      var b = ta(this.observer.onNext).call(this.observer, a);b === sa && (this.dispose(), d(b.e));
    }, c.error = function (a) {
      var b = ta(this.observer.onError).call(this.observer, a);this.dispose(), b === sa && d(b.e);
    }, c.completed = function () {
      var a = ta(this.observer.onCompleted).call(this.observer);this.dispose(), a === sa && d(a.e);
    }, c.setDisposable = function (a) {
      this.m.setDisposable(a);
    }, c.getDisposable = function () {
      return this.m.getDisposable();
    }, c.dispose = function () {
      a.prototype.dispose.call(this), this.m.dispose();
    }, b);
  })(Ob),
      $c = function $c(a, b) {
    this.subject = a, this.observer = b;
  };$c.prototype.dispose = function () {
    if (!this.subject.isDisposed && null !== this.observer) {
      var a = this.subject.observers.indexOf(this.observer);this.subject.observers.splice(a, 1), this.observer = null;
    }
  };var _c = ja.Subject = (function (a) {
    function c(a) {
      return (sb(this), this.isStopped ? this.hasError ? (a.onError(this.error), qb) : (a.onCompleted(), qb) : (this.observers.push(a), new $c(this, a)));
    }function d() {
      a.call(this, c), this.isDisposed = !1, this.isStopped = !1, this.observers = [], this.hasError = !1;
    }return (kb(d, a), lb(d.prototype, Mb.prototype, { hasObservers: function hasObservers() {
        return this.observers.length > 0;
      }, onCompleted: function onCompleted() {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;for (var a = 0, c = b(this.observers), d = c.length; d > a; a++) c[a].onCompleted();this.observers.length = 0;
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.error = a, this.hasError = !0;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onError(a);this.observers.length = 0;
        }
      }, onNext: function onNext(a) {
        if ((sb(this), !this.isStopped)) for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onNext(a);
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null;
      } }), d.create = function (a, b) {
      return new bd(a, b);
    }, d);
  })(Qb),
      ad = ja.AsyncSubject = (function (a) {
    function c(a) {
      return (sb(this), this.isStopped ? (this.hasError ? a.onError(this.error) : this.hasValue ? (a.onNext(this.value), a.onCompleted()) : a.onCompleted(), qb) : (this.observers.push(a), new $c(this, a)));
    }function d() {
      a.call(this, c), this.isDisposed = !1, this.isStopped = !1, this.hasValue = !1, this.observers = [], this.hasError = !1;
    }return (kb(d, a), lb(d.prototype, Mb, { hasObservers: function hasObservers() {
        return (sb(this), this.observers.length > 0);
      }, onCompleted: function onCompleted() {
        var a, c;if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;var d = b(this.observers),
              c = d.length;if (this.hasValue) for (a = 0; c > a; a++) {
            var e = d[a];e.onNext(this.value), e.onCompleted();
          } else for (a = 0; c > a; a++) d[a].onCompleted();this.observers.length = 0;
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.hasError = !0, this.error = a;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onError(a);this.observers.length = 0;
        }
      }, onNext: function onNext(a) {
        sb(this), this.isStopped || (this.value = a, this.hasValue = !0);
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null, this.exception = null, this.value = null;
      } }), d);
  })(Qb),
      bd = ja.AnonymousSubject = (function (a) {
    function b(a) {
      return this.observable.subscribe(a);
    }function c(c, d) {
      this.observer = c, this.observable = d, a.call(this, b);
    }return (kb(c, a), lb(c.prototype, Mb.prototype, { onCompleted: function onCompleted() {
        this.observer.onCompleted();
      }, onError: function onError(a) {
        this.observer.onError(a);
      }, onNext: function onNext(a) {
        this.observer.onNext(a);
      } }), c);
  })(Qb),
      cd = ja.BehaviorSubject = (function (a) {
    function c(a) {
      return (sb(this), this.isStopped ? (this.hasError ? a.onError(this.error) : a.onCompleted(), qb) : (this.observers.push(a), a.onNext(this.value), new $c(this, a)));
    }function d(b) {
      a.call(this, c), this.value = b, this.observers = [], this.isDisposed = !1, this.isStopped = !1, this.hasError = !1;
    }return (kb(d, a), lb(d.prototype, Mb, { getValue: function getValue() {
        if ((sb(this), this.hasError)) throw this.error;return this.value;
      }, hasObservers: function hasObservers() {
        return this.observers.length > 0;
      }, onCompleted: function onCompleted() {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;for (var a = 0, c = b(this.observers), d = c.length; d > a; a++) c[a].onCompleted();this.observers.length = 0;
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.hasError = !0, this.error = a;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onError(a);this.observers.length = 0;
        }
      }, onNext: function onNext(a) {
        if ((sb(this), !this.isStopped)) {
          this.value = a;for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) d[c].onNext(a);
        }
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null, this.value = null, this.exception = null;
      } }), d);
  })(Qb),
      dd = ja.ReplaySubject = (function (a) {
    function c(a, b) {
      return pb(function () {
        b.dispose(), !a.isDisposed && a.observers.splice(a.observers.indexOf(b), 1);
      });
    }function d(a) {
      var b = new Rb(this.scheduler, a),
          d = c(this, b);sb(this), this._trim(this.scheduler.now()), this.observers.push(b);for (var e = 0, f = this.q.length; f > e; e++) b.onNext(this.q[e].value);return (this.hasError ? b.onError(this.error) : this.isStopped && b.onCompleted(), b.ensureActive(), d);
    }function e(b, c, e) {
      this.bufferSize = null == b ? f : b, this.windowSize = null == c ? f : c, this.scheduler = e || Cb, this.q = [], this.observers = [], this.isStopped = !1, this.isDisposed = !1, this.hasError = !1, this.error = null, a.call(this, d);
    }var f = Math.pow(2, 53) - 1;return (kb(e, a), lb(e.prototype, Mb.prototype, { hasObservers: function hasObservers() {
        return this.observers.length > 0;
      }, _trim: function _trim(a) {
        for (; this.q.length > this.bufferSize;) this.q.shift();for (; this.q.length > 0 && a - this.q[0].interval > this.windowSize;) this.q.shift();
      }, onNext: function onNext(a) {
        if ((sb(this), !this.isStopped)) {
          var c = this.scheduler.now();this.q.push({ interval: c, value: a }), this._trim(c);for (var d = 0, e = b(this.observers), f = e.length; f > d; d++) {
            var g = e[d];g.onNext(a), g.ensureActive();
          }
        }
      }, onError: function onError(a) {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0, this.error = a, this.hasError = !0;var c = this.scheduler.now();this._trim(c);for (var d = 0, e = b(this.observers), f = e.length; f > d; d++) {
            var g = e[d];g.onError(a), g.ensureActive();
          }this.observers.length = 0;
        }
      }, onCompleted: function onCompleted() {
        if ((sb(this), !this.isStopped)) {
          this.isStopped = !0;var a = this.scheduler.now();this._trim(a);for (var c = 0, d = b(this.observers), e = d.length; e > c; c++) {
            var f = d[c];f.onCompleted(), f.ensureActive();
          }this.observers.length = 0;
        }
      }, dispose: function dispose() {
        this.isDisposed = !0, this.observers = null;
      } }), e);
  })(Qb);ja.Pauser = (function (a) {
    function b() {
      a.call(this);
    }return (kb(b, a), b.prototype.pause = function () {
      this.onNext(!1);
    }, b.prototype.resume = function () {
      this.onNext(!0);
    }, b);
  })(_c), "function" == typeof define && "object" == typeof define.amd && define.amd ? (ia.Rx = ja, define(function () {
    return ja;
  })) : ca && fa ? ga ? (fa.exports = ja).Rx = ja : ca.Rx = ja : ia.Rx = ja;var ed = i();
}).call(this);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":1}]},{},[8]);
