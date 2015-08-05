define('APP.Application',
  function (require, module, exports) {

    var _this,
        _appEventConstants = require('Nori.Events.NoriEventConstants'),
        _dispatcher        = require('Nori.Utils.Dispatcher');

    /**
     * Application bootstrapper. Create the model and views and pass to the app
     * to initialize.
     */
    function initialize() {
      _this = this;

      _dispatcher.subscribe(_appEventConstants.APP_MODEL_INITIALIZED, onModelInitialized.bind(this), true);

      // 1
      this.initializeApplication({
        model: this.createApplicationModel(require('APP.Model.AppModel')),
        view : this.createApplicationView(require('APP.View.AppView'))
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
    }

    //----------------------------------------------------------------------------
    //  Handle server or incoming events
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;

  });;define('App.Events.EventConstants',
  function (require, module, exports) {
    var objUtils = require('Nudoru.Core.ObjectUtils');

    _.merge(exports, objUtils.keyMirror({
      SOMETHING_HAPPENED: null
    }));
  });;define('App.Events.EventCreator',
  function (require, module, exports) {

    var _dispatcher     = require('Nori.Utils.Dispatcher'),
        _eventConstants = require('App.Events.EventConstants');

    module.exports.someEvent = function (data) {
      _dispatcher.publish({
        type   : _eventConstants.SOMETHING_HAPPENED,
        payload: {
          theData: data
        }
      });
    };

  });;define('APP.Model.AppModel',
  function (require, module, exports) {

    var _this,
        _appEvents  = require('Nori.Events.NoriEventCreator'),
        _dispatcher = require('Nori.Utils.Dispatcher');

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;
      _appEvents.applicationModelInitialized();
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
  });
;define('APP.View.AppSubView',
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
  });;define('APP.View.AppView',
  function (require, module, exports) {

    var _this,
        _appEvents = require('Nori.Events.NoriEventCreator'),
        _dispatcher            = require('Nori.Utils.Dispatcher'),
        _appEventConstants     = require('Nori.Events.NoriEventConstants'),
        _browserEventConstants = require('Nudoru.Browser.BrowserEventConstants');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;

      _this.initializeApplicationView(['applicationscaffold','applicationcomponentsscaffold']);
      _this.setRouteViewMountPoint('#contents');

      configureApplicationViewEvents();

      APP.mapRouteView('/', 'default', 'APP.View.AppSubView');

      // For testing
      APP.mapRouteView('/styles', 'debug-styletest', 'APP.View.AppSubView');
      APP.mapRouteView('/controls', 'debug-controls', 'APP.View.AppSubView');
      APP.mapRouteView('/comps', 'debug-components', 'APP.View.DebugControlsTestingSubView');

      _appEvents.applicationViewInitialized();
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
      _dispatcher.subscribe(_appEventConstants.NOTIFY_USER, function onNotiftUser(payload) {
        _this.notify(payload.payload.message, payload.payload.title, payload.payload.type);
      });

      _dispatcher.subscribe(_appEventConstants.ALERT_USER, function onAlertUser(payload) {
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
  });;define('APP.View.DebugControlsTestingSubView',
  function (require, module, exports) {

    var _lIpsum            = require('Nudoru.Browser.NLorem'),
        _toolTip           = require('Nudoru.Component.ToolTipView'),
        _dispatcher        = require('Nori.Utils.Dispatcher'),
        _appEventConstants = require('Nori.Events.NoriEventConstants'),
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
        _dispatcher.publish({
          type   : _appEventConstants.CHANGE_ROUTE,
          payload: {
            route: '/one',
            data : {prop: 'some data', moar: '25'}
          }
        });
      });

      _actionSixEl.addEventListener('click', function actFour(e) {
        _dispatcher.publish({
          type   : _appEventConstants.CHANGE_ROUTE,
          payload: {route: '/two'}
        });
      });

    }

    module.exports.initialize   = initialize;
    module.exports.viewDidMount = viewDidMount;

  });;(function () {

  var _browserInfo = require('Nudoru.Browser.BrowserInfo');

  if(_browserInfo.notSupported || _browserInfo.isIE9) {
    // Lock out older browsers
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {
    // Initialize the window
    window.onload = function() {

      // Create the application instance
      window.APP = Nori.createApplication(require('APP.Application'));

      // Kick off the bootstrapping process
      APP.initialize();

    };
  }

}());