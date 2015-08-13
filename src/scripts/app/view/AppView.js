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

      APP.mapRouteToViewComponent('/', 'default', 'app/view/ComponentView');

      // For testing
      APP.mapRouteToViewComponent('/styles', 'debug-styletest', 'app/view/ComponentView');
      APP.mapRouteToViewComponent('/controls', 'debug-controls', 'app/view/ComponentView');
      APP.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

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