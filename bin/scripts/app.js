define('app/App',
  function (require, module, exports) {

    var _noriEventConstants = require('nori/events/EventConstants');

    var App = Nori.createApplication({

      // The main app model and view are created in these modules
      appModel: require('app/model/AppModel'),
      appView : require('app/view/AppView'),

      initialize: function () {
        Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, this.onModelInitialized.bind(this), true);
        this.initializeApplication(); // validates setup
        this.view().initialize();
        this.model().initialize(); // model will acquire data dispatch event when complete
      },

      onModelInitialized: function () {
        this.runApplication();
      },

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
        this.configureApplicationViewEvents();

        var defaultViewComponent = require('app/view/TemplateViewComponent');

        this.setRouteViewMountPoint('#contents'); // Container for routed views

        this.mapRouteToViewComponent('/', 'default', defaultViewComponent);
        this.mapRouteToViewComponent('/styles', 'debug-styletest', 'app/view/TemplateViewComponentFactory');
        this.mapRouteToViewComponent('/controls', 'debug-controls', 'app/view/TemplateViewComponentFactory');
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

    var Component = Nori.view().createComponentView({

      initialize: function (initObj) {
        //Bind to a map, update will be called on changes to the map
        //this.bindMap(map id string or map object);
        //custom init below here
      },

      componentWillUpdate: function () {
        var obj = Object.create(null);
        obj.greeting = 'Hello world!';
        this.setState(obj);
      },

      componentDidMount: function () {
        // Assign events or post render
        /*
         this.setEvents({
         'click #button-id': handleButton
         });
         _this.delegateEvents();
         */
      },

      componentWillUnmount: function () {
        // Clean up
      }

    });

    module.exports = Component;

  });

define('app/view/TemplateViewComponentFactory',
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

(function () {

  var _browserInfo = require('nudoru/browser/BrowserInfo');

  if(_browserInfo.notSupported || _browserInfo.isIE9) {
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {
    window.onload = function() {
      window.APP = require('app/App');
      APP.initialize()
    };
  }

}());