define('app/App',
  function (require, module, exports) {

    var _this,
        _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    /**
     * Application bootstrapper. Create the model and views and pass to the app
     * to initialize.
     */
    function initialize() {
      _this = this;

      // Error handling
      Nori.dispatcher().subscribe(_noriEventConstants.APP_WARNING, onAppWarning.bind(this));
      Nori.dispatcher().subscribe(_noriEventConstants.APP_ERROR, onAppError.bind(this));

      Nori.dispatcher().subscribe(_noriEventConstants.APP_MODEL_INITIALIZED, onModelInitialized.bind(this), true);

      // 1
      this.initializeApplication({
        model: this.createApplicationModel(require('app/model/AppModel')),
        view : this.createApplicationView(require('app/view/AppView'))
      });

      // 2
      this.view().initialize();
      // model will acquire data as needed and dispatch event when complete
      this.model().initialize();
    }

    /**
     * When model data has been loaded
     */
    function onModelInitialized() {
      // 3
      this.view().removeLoadingMessage();
      this.view().render();

      // 4 Start it with the route in the current URL
      this.setCurrentRoute(APP.router().getCurrentRoute());

      //restTesting();
    }

    /**
     * Testing
     */
    function restTesting() {
      var request = require('nori/service/rest');

      request.request({method: 'GET', url: '/items', json: true}).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({
        method: 'POST',
        url   : '/items',
        data  : JSON.stringify({key: 'value'}),
        json  : true
      }).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({
        method: 'PUT',
        url   : '/items/42',
        data  : JSON.stringify({key: 'value'}),
        json  : true
      }).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({method: 'DELETE', url: '/items/42', json: true}).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });
    }

    //----------------------------------------------------------------------------
    //  Handle server or incoming events
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  Errors
    //----------------------------------------------------------------------------

    /**
     * Handle application warning
     * @param eventObject
     */
    function onAppWarning(eventObject) {
      console.log('appWarning', eventObject);
    }

    /**
     * Handle application error
     * @param eventObject
     */
    function onAppError(eventObject) {
      console.log('appError', eventObject);
      throw eventObject.payload;
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;

  });

define('app/events/EventConstants',
  function (require, module, exports) {
    var objUtils = require('nudoru/core/ObjectUtils');

    _.merge(exports, objUtils.keyMirror({
      SOMETHING_HAPPENED: null
    }));
  });

define('app/events/EventCreator',
  function (require, module, exports) {

    var _eventConstants = require('app/events/EventConstants');

    module.exports.someEvent = function (data) {
      var evtObj = {
        type   : _eventConstants.SOMETHING_HAPPENED,
        payload: {
          theData: data
        }
      };

      Nori.dispatcher().publish(evtObj);
      return evtObj;
    };

  });

define('app/model/AppModel',
  function (require, module, exports) {

    var _this,
        _state              = Object.create(null),// Basic applicaiton state, could be a Map or a MapCollection
        _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getState() {
      return _.assign({}, _state);
    }

    function setState(nextState) {
      _state = nextState;
    }

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;
      Nori.dispatcher().registerReceiver(receiveEvents);

      _noriEvents.applicationModelInitialized();
    }

    /**
     * Will receive "firehose" of all events that occur
     * @param eventObject
     */
    function receiveEvents(eventObject) {
      //console.log('Event occured: ',eventObject);
      // setState(reducerFunction(getCurrentState(), eventObject));
    }

    /**
     * Experimental reducer function based on Redux
     * https://gaearon.github.io/redux/docs/basics/Reducers.html
     */

    function reducerFunction(state, event) {
      state = state || {}; // default value

      switch (event.type) {
        case _noriEventConstants.MODEL_DATA_CHANGED:
          return _.assign({}, state, {prop: event.payload.value});
        default:
          return state;
      }
    }

    //----------------------------------------------------------------------------
    //  Utility
    //----------------------------------------------------------------------------

    /**
     * Utility function
     * @param obj
     * @returns {*}
     */
    function getLocalStorageObject(obj) {
      return localStorage[obj];
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;
    module.exports.getState   = getState;
  });


define('app/view/AppSubView',
  function (require, module, exports) {

    var _this;

    /**
     * Initialize subview
     * @param initObj {id, template, mountPoint}
     */
    function initialize(initObj) {
      if(!this.isInitialized()) {
        _this = this;
        this.initializeSubView(initObj);
        // associate with stores. viewWillUpdate() fires when it changes
        //this.bindMap('SomeCollection');
        // custom init below here
      }
    }

    /**
     * Update has been triggered due a change in the bound model
     */
    function viewWillUpdate() {
      // Update state from stores
      var obj = Object.create(null);
      // build it
      _this.setState(obj);
    }

    // Example of custom render
    //function render() {
    //  this.viewWillRender();
    //  this.setHTML(this.getTemplate()(this.getState()));
    //  // created in mount this.setDOMElement(_domUtils.HTMLStrToNode(this.getHTML()));
    //  this.viewDidRender();
    //}

    /**
     * Updated view has been rendered and added to the DOM. Manipulate it here
     */
    function viewDidMount() {
      // good place to assign events or post render
      /*
       _this.setEvents({
       'click #button-id': handleButton
       });
       _this.delegateEvents();
       */
    }

    /**
     * Remove event handlers and perform other cleanup
     */
    function viewWillUnmount() {
      // remove events
    }

    module.exports.initialize = initialize;
    module.exports.viewWillUpdate = viewWillUpdate;
    module.exports.viewDidMount = viewDidMount;
    module.exports.viewWillUnmount = viewWillUnmount;

    // Other possible lifecycle hooks
    //module.exports.viewDidUpdate = viewDidUpdate;
    //module.exports.viewWillRender = viewWillRender;
    //module.exports.viewDidRender = viewDidRender;
    //module.exports.viewWillMount = viewWillMount;
    //module.exports.viewDidUnmount = viewDidUnmount;
  });

define('app/view/AppView',
  function (require, module, exports) {

    var _this,
        _noriEvents            = require('nori/events/EventCreator'),
        _noriEventConstants    = require('nori/events/EventConstants'),
        _browserEventConstants = require('nudoru/browser/EventConstants');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;

      _this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
      _this.setRouteViewMountPoint('#contents');

      configureApplicationViewEvents();

      APP.mapRouteView('/', 'default', 'app/view/AppSubView');

      // For testing
      APP.mapRouteView('/styles', 'debug-styletest', 'app/view/AppSubView');
      APP.mapRouteView('/controls', 'debug-controls', 'app/view/AppSubView');
      APP.mapRouteView('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

      _noriEvents.applicationViewInitialized();
    }

    function render() {
      /*
       _this.setEvents({
       'click #button-id': handleButton
       });
       _this.delegateEvents();
       */
    }

    function configureApplicationViewEvents() {
      Nori.dispatcher().subscribe(_noriEventConstants.NOTIFY_USER, function onNotiftUser(payload) {
        _this.notify(payload.payload.message, payload.payload.title, payload.payload.type);
      });

      Nori.dispatcher().subscribe(_noriEventConstants.ALERT_USER, function onAlertUser(payload) {
        _this.alert(payload.payload.message, payload.payload.title);
      });
    }

    //----------------------------------------------------------------------------
    //  Custom
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;
    module.exports.render     = render;
  });

define('app/view/DebugControlsTestingSubView',
  function (require, module, exports) {

    var _lIpsum            = require('nudoru/browser/NLorem'),
        _toolTip           = require('nudoru/component/ToolTipView'),
        _appEventConstants = require('nori/events/EventConstants'),
        _actionOneEl,
        _actionTwoEl,
        _actionThreeEl,
        _actionFourEl,
        _actionFiveEl,
        _actionSixEl;

    function initialize(initObj) {
      if (!this.isInitialized()) {
        _lIpsum.initialize();
        this.initializeSubView(initObj);
      }
    }


    function viewDidMount() {
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
          type   : _appEventConstants.CHANGE_ROUTE,
          payload: {
            route: '/one',
            data : {prop: 'some data', moar: '25'}
          }
        });
      });

      _actionSixEl.addEventListener('click', function actFour(e) {
        Nori.dispatcher().publish({
          type   : _appEventConstants.CHANGE_ROUTE,
          payload: {route: '/two'}
        });
      });

    }

    module.exports.initialize   = initialize;
    module.exports.viewDidMount = viewDidMount;

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
      window.APP = Nori.createApplication(require('app/App'));

      // Kick off the bootstrapping process
      APP.initialize();

    };
  }

}());