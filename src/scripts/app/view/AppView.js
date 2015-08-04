define('APP.View.AppView',
  function (require, module, exports) {

    var _this,
        _appEvents = require('Nori.Events.AppEventCreator'),
        _dispatcher            = require('Nori.Utils.Dispatcher'),
        _appEventConstants     = require('Nori.Events.AppEventConstants'),
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

    exports.initialize = initialize;
    exports.render     = render;
  });