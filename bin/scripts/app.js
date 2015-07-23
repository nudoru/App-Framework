define('APP.Application',
  function (require, module, exports) {

    var _self;

    function initialize() {
      var appModel, appView;

      _self = this;

      appModel = this.createApplicationModel(require('APP.Model.AppModel'));
      appView = this.createApplicationView(require('APP.View.AppView'));

      this.initializeApplication({model:appModel, view:appView});

      this.view().initialize();
      this.model().initialize();

      // Could wait for model initialization to complete
      this.view().removeLoadingMessage();
      this.view().render();

      // Start it with the route in the URL
      this.setCurrentRoute(APP.router().getCurrentRoute());
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;

  });;define('APP.Model.AppModel',
  function (require, module, exports) {

    var _self,
        _appEvents  = require('Nori.Events.AppEventCreator'),
        _dispatcher = require('Nori.Utils.Dispatcher');

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
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

    exports.initialize = initialize;
  });
;define('APP.View.AppSubView',
  function (require, module, exports) {

    function initialize(initObj) {
      if(!this.isInitialized()) {
        // associate with stores

        this.initializeSubView(initObj);
      }
    }

    function viewWillUpdate() {
      // Update state from stores
    }

    // Example of custom render
    //function render() {
    //  this.viewWillRender();
    //  this.setHTML(this.getTemplate()(this.getState()));
    //  // created in mount this.setDOMElement(_domUtils.HTMLStrToNode(this.getHTML()));
    //  this.viewDidRender();
    //}

    //function viewDidMount() {
    //  // good place to assign events or post render
    //}
    //
    //function viewWillUnmount() {
    //  // remove events
    //}

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;

    //exports.viewDidUpdate = viewDidUpdate;
    //exports.viewWillRender = viewWillRender;
    //exports.viewDidRender = viewDidRender;
    //exports.viewWillMount = viewWillMount;
    //exports.viewDidMount = viewDidMount;
    //exports.viewWillUnmount = viewWillUnmount;
    //exports.viewDidUnmount = viewDidUnmount;
  });;define('APP.View.AppView',
  function (require, module, exports) {

    var _self,
        _appEvents = require('Nori.Events.AppEventCreator');

    function initialize() {
      _self = this;

      _self.initializeApplicationView(['applicationscaffold','applicationcomponentsscaffold']);
      _self.setRouteViewMountPoint('#contents');

      APP.mapRouteView('/', 'default', 'APP.View.AppSubView');

      // For testing
      APP.mapRouteView('/styles', 'debug-styletest', 'APP.View.AppSubView');
      APP.mapRouteView('/controls', 'debug-controls', 'APP.View.AppSubView');
      APP.mapRouteView('/comps', 'debug-components', 'APP.View.DebugControlsTestingSubView');

      _appEvents.applicationViewInitialized();
    }

    function render() {
      // implement
    }

    exports.initialize = initialize;
    exports.render     = render;
  });;define('APP.View.DebugControlsTestingSubView',
  function (require, module, exports) {

    var _lIpsum            = require('Nudoru.Browser.NLorem'),
        _toolTip           = require('Nudoru.Component.ToolTipView'),
        _dispatcher        = require('Nori.Utils.Dispatcher'),
        _appEventConstants = require('Nori.Events.AppEventConstants'),
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

    exports.initialize   = initialize;
    exports.viewDidMount = viewDidMount;

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