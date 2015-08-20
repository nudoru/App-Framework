define('app/view/AppView',
  function (require, module, exports) {

    var AppView = function () {

      var _this,
          _noriEvents         = require('nori/events/EventCreator'),
          _noriEventConstants = require('nori/events/EventConstants');

      //----------------------------------------------------------------------------
      //  Initialization
      //----------------------------------------------------------------------------

      function initialize() {
        _this = this;

        _this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
        _this.setRouteViewMountPoint('#contents');

        configureApplicationViewEvents();

        _this.mapRouteToViewComponent('/', 'default', 'app/view/TemplateViewComponent');

        var testComponent = require('app/view/TemplateViewComponent2');

        // For testing
        _this.mapRouteToViewComponent('/styles', 'debug-styletest', testComponent);
        _this.mapRouteToViewComponent('/controls', 'debug-controls', 'app/view/TemplateViewComponent');
        _this.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');

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

      return {
        initialize: initialize,
        render    : render
      };

    };

    module.exports = AppView();

  });