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