define('app/view/AppView',
  function (require, module, exports) {

    var _this,
        _appEvents = require('nori/events/EventCreator'),
        _dispatcher            = require('nori/utils/Dispatcher'),
        _appEventConstants     = require('nori/events/EventConstants'),
        _browserEventConstants = require('nudoru/browser/EventConstants');

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;

      _this.initializeApplicationView(['applicationscaffold','applicationcomponentsscaffold']);
      _this.setRouteViewMountPoint('#contents');

      configureApplicationViewEvents();

      APP.mapRouteView('/', 'default', 'app/view/AppSubView');

      // For testing
      APP.mapRouteView('/styles', 'debug-styletest', 'app/view/AppSubView');
      APP.mapRouteView('/controls', 'debug-controls', 'app/view/AppSubView');
      APP.mapRouteView('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

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
  });