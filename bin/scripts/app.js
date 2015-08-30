define('app/App',
  function (require, module, exports) {

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
      store: require('app/store/AppStore'),
      view : require('app/view/AppView'),

      /**
       * Initialize
       * Called when App is required in main.js
       */
      initialize: function () {
        this.view.initialize();

        this.store.initialize(); // store will acquire data dispatch event when complete
        this.store.subscribe('storeInitialized', this.onStoreInitialized.bind(this));
        this.store.loadStore();
      },

      /**
       * After the store data is ready
       */
      onStoreInitialized: function () {
        this.runApplication();
      },

      /**
       * Remove the "Please wait" cover and start the app
       */
      runApplication: function () {
        this.view.removeLoadingMessage();
        this.view.render();
        this.view.showViewFromURLHash(true); // Start with the route in the current URL
      }

    });

    module.exports = App;

  });

define('app/action/ActionConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    /**
     * Event name string constants
     */

    _.merge(module.exports, objUtils.keyMirror({
      MUTATION_TYPE: null
    }));
  });

define('app/Action/ActionCreator',
  function (require, module, exports) {

    var _actionConstants = require('app/action/ActionConstants');

    /**
     * Purely for convenience, an Event ("action") Creator ala Flux spec. Follow
     * guidelines for creating actions: https://github.com/acdlite/flux-standard-action
     */
    var ActionCreator = {

      mutateSomeData: function (data) {
        var actionObj = {
          type   : _actionConstants.MUTATION_TYPE,
          payload: {
            data: data
          }
        };

        return actionObj;
      }

    };

    module.exports = ActionCreator;

  });

define('app/store/AppStore',
  function (require, module, exports) {

    var _noriActionConstants    = require('nori/action/ActionConstants'),
        _mixinMapFactory        = require('nori/store/MixinMapFactory'),
        _mixinObservableSubject = require('nori/utils/MixinObservableSubject'),
        _mixinReducerStore      = require('nori/store/MixinReducerStore');

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

      mixins: [
        _mixinMapFactory,
        _mixinReducerStore,
        _mixinObservableSubject()
      ],

      initialize: function () {
        this.addReducer(this.defaultReducerFunction);
        this.initializeReducerStore();
        this.createSubject('storeInitialized');
      },

      loadStore: function () {
        // Set initial state from data contained in the config.js file
        this.setState(Nori.config());
        this.storeReady();
      },

      /**
       * Set or load any necessary data and then broadcast a initialized event.
       */
      storeReady: function () {
        this.setState({greeting: 'Hello world!'});

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
      defaultReducerFunction: function (state, action) {
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
      handleStateMutation: function () {
        console.log('Handle state mutation', this.getState());
        this.notifySubscribers();
      }

    });

    module.exports = AppStore();

  });


define('app/view/AppView',
  function (require, module, exports) {

    var _mixinApplicationView   = require('nori/view/ApplicationView'),
        _mixinNudoruControls    = require('nori/view/MixinNudoruControls'),
        _mixinComponentViews    = require('nori/view/MixinComponentViews'),
        _mixinRouteViews        = require('nori/view/MixinRouteViews'),
        _mixinEventDelegator    = require('nori/view/MixinEventDelegator'),
        _mixinObservableSubject = require('nori/utils/MixinObservableSubject');

    /**
     * View for an application.
     */

    var AppView = Nori.createView({

      mixins: [
        _mixinApplicationView,
        _mixinNudoruControls,
        _mixinComponentViews,
        _mixinRouteViews,
        _mixinEventDelegator(),
        _mixinObservableSubject()
      ],

      initialize: function () {
        this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
        this.initializeRouteViews();
        this.initializeNudoruControls();

        this.configureViews();
      },

      configureViews: function () {
        var defaultViewFactory = require('app/view/TemplateViewComponent'),
          defaultView = defaultViewFactory(),
          styleView = defaultViewFactory(),
          controlsView = defaultViewFactory();

        // Container for routed views
        this.setViewMountPoint('#contents');
        this.mapRouteToViewComponent('/', 'default', defaultView);
        this.mapRouteToViewComponent('/styles', 'debug-styletest', styleView);
        this.mapRouteToViewComponent('/controls', 'debug-controls', controlsView);
        this.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

        // Alternately, map views to different store states with MixinStoreStateViews
        //this.mapStateToViewComponent('TITLE', 'title', screenTitle);
      },

      /**
       * Draw and UI to the DOM and set events
       */
      render: function () {
        //
      }


    });

    module.exports = AppView();

  });

define('app/view/DebugControlsTestingSubView',
  function (require, module, exports) {

    /**
     * Module for testing Nudoru component classes and any thing else
     */
    var DebugComponent = function () {

      var _lIpsum             = require('nudoru/browser/Lorem'),
          _toolTip            = require('nudoru/component/ToolTipView'),
          _appView             = require('app/view/AppView'),
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

        _actionOneEl   = document.getElementById('action-one');
        _actionTwoEl   = document.getElementById('action-two');
        _actionThreeEl = document.getElementById('action-three');
        _actionFourEl  = document.getElementById('action-four');
        _actionFiveEl  = document.getElementById('action-five');
        _actionSixEl   = document.getElementById('action-six');

        //_toolTip.add({title:'', content:"This is a button, it's purpose is unknown.", position:'TR', targetEl: _actionFourEl, type:'information'});
        //_toolTip.add({title:'', content:"This is a button, click it and rainbows will appear.", position:'BR', targetEl: _actionFourEl, type:'success'});
        //_toolTip.add({title:'', content:"This is a button, it doesn't make a sound.", position:'BL', targetEl: _actionFourEl, type:'warning'});
        //_toolTip.add({title:'', content:"This is a button, behold the magic and mystery.", position:'TL', targetEl: _actionFourEl, type:'danger'});

        _toolTip.add({
          title   : '',
          content : "This is a button, you click it dummy. This is a button, you click it dummy. ",
          position: 'L',
          targetEl: _actionFourEl,
          type    : 'information'
        });
        _toolTip.add({
          title   : '',
          content : "This is a button, you click it dummy. This is a button, you click it dummy. ",
          position: 'B',
          targetEl: _actionFourEl,
          type    : 'information'
        });
        _toolTip.add({
          title   : '',
          content : "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
          position: 'R',
          targetEl: _actionFourEl,
          type    : 'information'
        });
        _toolTip.add({
          title   : '',
          content : "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
          position: 'T',
          targetEl: _actionFourEl,
          type    : 'information'
        });


        _actionOneEl.addEventListener('click', function actOne(e) {
          _appView.addMessageBox({
            title  : _lIpsum.getSentence(2, 4),
            content: _lIpsum.getParagraph(2, 4),
            type   : 'warning',
            modal  : true,
            width  : 500
          });
        });

        _actionTwoEl.addEventListener('click', function actTwo(e) {
          _appView.addMessageBox({
            title  : _lIpsum.getSentence(10, 20),
            content: _lIpsum.getParagraph(2, 4),
            type   : 'default',
            modal  : false,
            buttons: [
              {
                label  : 'Yes',
                id     : 'yes',
                type   : 'default',
                icon   : 'check',
                onClick: function () {
                  console.log('yes');
                }
              },
              {
                label  : 'Maybe',
                id     : 'maybe',
                type   : 'positive',
                icon   : 'cog',
                onClick: function () {
                  console.log('maybe');
                }
              },
              {
                label: 'Nope',
                id   : 'nope',
                type : 'negative',
                icon : 'times'
              }
            ]
          });
        });

        _actionThreeEl.addEventListener('click', function actThree(e) {
          _appView.addNotification({
            title  : _lIpsum.getSentence(3, 6),
            type   : 'information',
            content: _lIpsum.getParagraph(1, 2)
          });

          _toolTip.remove(_actionFourEl);
        });

        _actionFourEl.addEventListener('click', function actFour(e) {
          console.log('Four');
        });

        _actionFiveEl.addEventListener('click', function actFour(e) {
          Nori.router().set('/styles',{prop: 'some data', moar: '25'});
        });

        _actionSixEl.addEventListener('click', function actFour(e) {
          console.log('nothing yet');
        });

      }

      return {
        initialize       : initialize,
        componentDidMount: componentDidMount
      };

    };

    module.exports = DebugComponent;


  });

define('app/view/TemplateViewComponent',
  function (require, module, exports) {

    var view = require('app/view/AppView');

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
      initialize: function (configProps) {
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
      getInitialState: function () {
        return APP.store.getState();
      },

      /**
       * State change on bound stores (map, etc.) Return nextState object
       */
      componentWillUpdate: function () {
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
      componentDidMount: function () {
        //
      },

      /**
       * Component will be removed from the DOM
       */
      componentWillUnmount: function () {
        // Clean up
      }

    });

    module.exports = Component;

  });

(function () {

  var _browserInfo = require('nudoru/browser/BrowserInfo');

  /**
   * IE versions 9 and under are blocked, others are allowed to proceed
   */
  if(_browserInfo.notSupported || _browserInfo.isIE9) {

    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';

  } else {

    /**
     * Create the application module and initialize
     */
    window.onload = function() {
      window.APP = require('app/App');
      APP.initialize()
    };

  }

}());