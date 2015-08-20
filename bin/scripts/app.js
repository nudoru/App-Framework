define('app/App',
  function (require, module, exports) {

    var _noriEventConstants = require('nori/events/EventConstants');

    var App = Nori.createApplication({

      /**
       * Application bootstrapper. Create the model and views and pass to the app
       * to initialize.
       */
      initialize: function () {
        var appview  = require('app/view/AppView'),
            appmodel = require('app/model/AppModel');

        Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, this.onModelInitialized.bind(this), true);

        // 1
        this.initializeApplication({
          model: appmodel,
          view : appview
        });

        // 2
        this.view().initialize();
        // model will acquire data as needed and dispatch event when complete
        this.model().initialize();
      },

      /**
       * When model data has been loaded
       */
      onModelInitialized: function () {
        // 3
        this.view().removeLoadingMessage();
        this.view().render();

        // 4 Start with the route in the current URL
        this.view().showViewFromURLHash();
      }
    });

    module.exports = App;

  });

define('app/events/EventConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(module.exports, objUtils.keyMirror({
      SOMETHING_HAPPENED: null
    }));
  });

define('app/events/EventCreator',
  function (require, module, exports) {

    var _eventConstants = require('app/events/EventConstants');

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

    var AppModel = Nori.createApplicationModel({
      initialize: function () {
        this.initializeReducers();

        // load data and then dispatch this
        _noriEvents.applicationModelInitialized();
      },

      initializeReducers: function () {
        this.addReducer(this.baseReducerFunction);
        this.initializeReducerModel();
      },

      handleStateMutation: function () {
        //console.log('handle possible state mutation');
      },

      baseReducerFunction: function (state, event) {
        state = state || {};
        //console.log('baseReducerFunction', state, event);
        // add switch for every event type that needs to mutate state
        switch (event.type) {
          case _noriEventConstants.CHANGE_MODEL_STATE:
            // can compose other reducers
            // return _.assign({}, state, otherStateTransformer(state));
            return _.assign({}, state, {prop: event.payload});
          default:
            return state;
        }
      }

    });

    module.exports = AppModel;

  });


define('app/view/AppView',
  function (require, module, exports) {

    var _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    var AppView = Nori.createApplicationView({

      initialize: function () {
        this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
        this.setRouteViewMountPoint('#contents');

        this.configureApplicationViewEvents();

        this.mapRouteToViewComponent('/', 'default', 'app/view/TemplateViewComponent');

        var testComponent = require('app/view/TemplateViewComponent2');

        // For testing
        this.mapRouteToViewComponent('/styles', 'debug-styletest', testComponent);
        this.mapRouteToViewComponent('/controls', 'debug-controls', 'app/view/TemplateViewComponent');
        this.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

        _noriEvents.applicationViewInitialized();
      },

      render: function () {
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         this.delegateEvents();
         */
      },

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
          this.initializeComponent(initObj);
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

    var Component = function () {

      /**
       * Initialize subview
       * @param initObj {id, template, mountPoint}
       */
      function initialize(initObj) {
        if (!this.isInitialized()) {
          this.initializeComponent(initObj);
          //this.bindMap(map id string or map object);
          // custom init below here
        }
      }

      /**
       * Update has been triggered due a change in the bound model
       */
      function componentWillUpdate() {
        var obj = Object.create(null);
        // Update state from stores
        this.setState(obj);
      }

      /**
       * Updated view has been rendered and added to the DOM. Manipulate it here
       */
      function componentDidMount() {
        // good place to assign events or post render
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         this.delegateEvents();
         */
      }

      /**
       * Remove event handlers and perform other cleanup
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

define('app/view/TemplateViewComponent2',
  function (require, module, exports) {

    var TemplateViewComponent2 = Nori.view().createComponentView({
      initialize: function (initObj) {
        console.log('testcomp init');
        if (!this.isInitialized()) {
          this.initializeComponent(initObj);
          //this.bindMap(map id string or map object);
          // custom init below here
        }
      },

      componentWillUpdate: function () {
        console.log('testcomp will update');
        var obj = Object.create(null);
        // Update state from stores
        this.setState(obj);
      },

      componentDidMount: function () {
        console.log('testcomp did mount',this);
        // good place to assign events or post render
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         _this.delegateEvents();
         */
      },

      componentWillUnmount: function () {
        console.log('testcomp will unmount');
      }
    });

    module.exports = TemplateViewComponent2;

  });

(function () {

  var _browserInfo = require('nudoru/browser/BrowserInfo');

  if(_browserInfo.notSupported || _browserInfo.isIE9) {
    // Lock out older browsers
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {
    // Initialize the window
    window.onload = function() {

      // Create the application instance
      window.APP = require('app/App');

      // Might need this janky timeout in some situations
      setTimeout(startApplication, 1);

      function startApplication() {
        // Kick off the bootstrapping process
        APP.initialize();
      }

    };
  }

}());