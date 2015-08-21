define('app/App',
  function (require, module, exports) {

    var _noriEventConstants = require('nori/events/EventConstants');

    /**
     * "Controller" for a Nori application. The controller is responsible for
     * bootstrapping the app and possibly handling socket/server interaction.
     * Any additional functionality should be handled in a specific module.
     */
    var App = Nori.createApplication({

      /**
       * Create the main Nori App model and view.
       */
      appModel: require('app/model/AppModel'),
      appView : require('app/view/AppView'),

      /**
       * Intialize the appilcation, view and model
       */
      initialize: function () {
        // listen for the model loaded event
        Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, this.onModelInitialized.bind(this), true);

        this.initializeApplication(); // validates setup
        this.view().initialize();
        this.model().initialize(); // model will acquire data dispatch event when complete
      },

      /**
       * After the model data is ready
       */
      onModelInitialized: function () {
        this.runApplication();
      },

      /**
       * Remove the "Please wait" cover and start the app
       */
      runApplication: function() {
        this.view().removeLoadingMessage();
        this.view().render();
        this.view().showViewFromURLHash(); // Start with the route in the current URL
      }

    });

    module.exports = App;

  });

define('app/events/EventConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    /**
     * Event name string constants
     */

    _.merge(module.exports, objUtils.keyMirror({
      SOMETHING_HAPPENED: null
    }));
  });

define('app/events/EventCreator',
  function (require, module, exports) {

    var _eventConstants = require('app/events/EventConstants');

    /**
     * Purely for convenience, an Event ("action") Creator ala Flux spec. Follow
     * guidelines for creating actions: https://github.com/acdlite/flux-standard-action
     */
    var EventCreator = {

      someEvent: function (data) {
        var evtObj = {
          type   : _eventConstants.SOMETHING_HAPPENED,
          payload: {
            theData: data
          }
        };

        Nori.dispatcher().publish(evtObj);
        return evtObj;
      }

    };

    module.exports = EventCreator;

  });

define('app/model/AppModel',
  function (require, module, exports) {

    var _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    /**
     * This application model contains "reducer model" functionality based on Redux.
     * The model state may only be changed from events as applied in reducer functions.
     * The model received all events from the event bus and forwards them to all
     * reducer functions to modify state as needed. Once they have run, the
     * handleStateMutation function is called to dispatch an event to the bus, or
     * notify subscribers via an observable.
     *
     * Events => handleApplicationEvents => applyReducers => handleStateMutation => Notify
     */
    var AppModel = Nori.createApplicationModel({

      initialize: function () {
        this.addReducer(this.defaultReducerFunction);
        this.initializeReducerModel();
        this.modelReady();
      },

      /**
       * Set or load any necessary data and then broadcast a initialized event.
       */
      modelReady: function() {
        _noriEvents.applicationModelInitialized();
      },

      /**
       * Modify state based on incoming events. Returns a copy of the modified
       * state and does not modify the state directly.
       * Can compose state transformations
       * return _.assign({}, state, otherStateTransformer(state));
       * @param state
       * @param event
       * @returns {*}
       */
      defaultReducerFunction: function (state, event) {
        state = state || {};

        switch (event.type) {

          case _noriEventConstants.CHANGE_MODEL_STATE:
            return _.assign({}, state, event.payload.data);

          default:
            return state;
        }
      },

      /**
       * Called after all reducers have run to broadcast possible updates. Does
       * not check to see if the state was actually updated.
       */
      handleStateMutation: function () {
        //_noriEvents.modelStateChanged(); // Eventbus
        this.notifySubscribers();
      }

    });

    module.exports = AppModel;

  });


define('app/view/AppView',
  function (require, module, exports) {

    var _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    /**
     * View for an application.
     */

    var AppView = Nori.createApplicationView({

      initialize: function () {
        this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);

        this.configureApplicationViewEvents();

        var defaultViewComponent = require('app/view/TemplateViewComponent');

        this.setRouteViewMountPoint('#contents'); // Container for routed views

        this.mapRouteToViewComponent('/', 'default', defaultViewComponent);
        this.mapRouteToViewComponent('/styles', 'debug-styletest', 'app/view/TemplateViewComponentFactory');
        this.mapRouteToViewComponent('/controls', 'debug-controls', 'app/view/TemplateViewComponentFactory');
        this.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

        _noriEvents.applicationViewInitialized();
      },

      /**
       * Draw and UI to the DOM and set events
       */
      render: function () {
        /* Sample event delegator syntax
         this.setEvents({
         'click #button-id': handleButton
         });
         this.delegateEvents();
         */
      },

      /**
       * Listen for notification and alert events and show to user
       */
      configureApplicationViewEvents: function () {
        Nori.dispatcher().subscribe(_noriEventConstants.NOTIFY_USER, function onNotiftUser(payload) {
          this.notify(payload.payload.message, payload.payload.title, payload.payload.type);
        });
        Nori.dispatcher().subscribe(_noriEventConstants.ALERT_USER, function onAlertUser(payload) {
          this.alert(payload.payload.message, payload.payload.title);
        });
      }

    });

    module.exports = AppView;

  });

define('app/view/DebugControlsTestingSubView',
  function (require, module, exports) {

    /**
     * Module for testing Nudoru component classes and any thing else
     */
    var DebugComponent = function () {

      var _lIpsum             = require('nudoru/browser/Lorem'),
          _toolTip            = require('nudoru/component/ToolTipView'),
          _noriEventConstants = require('nori/events/EventConstants'),
          _actionOneEl,
          _actionTwoEl,
          _actionThreeEl,
          _actionFourEl,
          _actionFiveEl,
          _actionSixEl;

      function initialize(initObj) {
        if (!this.isInitialized()) {
          _lIpsum.initialize();
        }
      }


      function DEBUG() {
        //
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
          Nori.view().addMessageBox({
            title  : _lIpsum.getSentence(2, 4),
            content: _lIpsum.getParagraph(2, 4),
            type   : 'warning',
            modal  : true,
            width  : 500
          });
        });

        _actionTwoEl.addEventListener('click', function actTwo(e) {
          Nori.view().addMessageBox({
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
          Nori.view().addNotification({
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
          Nori.dispatcher().publish({
            type   : _noriEventConstants.CHANGE_ROUTE,
            payload: {
              route: '/one',
              data : {prop: 'some data', moar: '25'}
            }
          });
        });

        _actionSixEl.addEventListener('click', function actFour(e) {
          Nori.dispatcher().publish({
            type   : _noriEventConstants.CHANGE_ROUTE,
            payload: {route: '/styles', data: 'test'}
          });
        });

      }

      return {
        DEBUG            : DEBUG,
        initialize       : initialize,
        componentDidMount: componentDidMount
      };

    };

    module.exports = DebugComponent;


  });

define('app/view/TemplateViewComponent',
  function (require, module, exports) {

    /**
     * Module for a dynamic application view for a route or a persistent view
     */

    var Component = Nori.view().createComponentView({

      /**
       * Initialize and bind, called once on first render. Parent component is
       * initialized from app view
       * @param configProps
       */
      initialize: function (configProps) {
        //Bind to a map, update will be called on changes to the map
        //this.bindMap(map id string or map object);
        //this.bindMap(APP.model());
        //custom init below here
      },

      /**
       * Set initial state properties. Call once on first render
       */
      getInitialState: function() {
        return {
          greeting: 'Hello world!'
        };
      },

      /**
       * State change on bound models (map, etc.) Update the component state
       */
      componentWillUpdate: function () {
        //console.log(APP.model().getState());
        //var obj = {};
        // set props
        //this.setState(obj);
      },

      /**
       * Component HTML was attached to the DOM
       */
      componentDidMount: function () {
        /* Sample event delegator syntax
         this.setEvents({
         'click #button-id': handleButton
         });
         _this.delegateEvents();
         */
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

define('app/view/TemplateViewComponentFactory',
  function (require, module, exports) {

    /**
     * Module for a dynamic application view for a route or a persistent view
     * implemented as a factory module.
     */
    var Component = function () {

      /**
       * Initialize subview
       * @param configProps {id, template, mountPoint}
       */
      function initialize(configProps) {
        //this.bindMap(map id string or map object);
        // custom init below here
      }

      /**
       * State change on bound models (map, etc.) Update the component state
       */
      function componentWillUpdate() {
        var obj = Object.create(null);
        // Update state from stores
        this.setState(obj);
      }

      /**
       * Component HTML was attached to the DOM
       */
      function componentDidMount() {
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         this.delegateEvents();
         */
      }

      /**
       * Component will be removed from the DOM
       */
      function componentWillUnmount() {
        // cleanup
      }

      return {
        initialize          : initialize,
        componentWillUpdate : componentWillUpdate,
        componentDidMount   : componentDidMount,
        componentWillUnmount: componentWillUnmount
      };

    };

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