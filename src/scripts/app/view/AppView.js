define('app/view/AppView',
  function (require, module, exports) {

    var _noriEvents           = require('nori/events/EventCreator'),
        _noriEventConstants   = require('nori/events/EventConstants'),
        _mixinApplicationView = require('nori/view/ApplicationView'),
        _mixinNudoruControls  = require('nori/view/MixinNudoruControls'),
        _mixinComponentViews  = require('nori/view/MixinComponentViews'),
        _mixinRouteViews      = require('nori/view/MixinRouteViews'),
        _mixinEventDelegator  = require('nori/view/MixinEventDelegator');

    /**
     * View for an application.
     */

    var AppView = Nori.createApplicationView({

      mixins: [
        _mixinApplicationView,
        _mixinNudoruControls,
        _mixinComponentViews,
        _mixinRouteViews,
        _mixinEventDelegator()
      ],

      initialize: function () {
        this.initializeApplicationView(['applicationscaffold', 'applicationcomponentsscaffold']);
        this.initializeRouteViews();
        this.initializeNudoruControls();

        this.configureApplicationViewEvents();
        this.configureViews();

        _noriEvents.applicationViewInitialized();
      },

      configureViews: function () {
        var viewFactory = require('app/view/TemplateViewComponent');

        // Container for routed views
        this.setRouteViewMountPoint('#contents');

        this.mapRouteToViewComponent('/', 'default', viewFactory());
        this.mapRouteToViewComponent('/styles', 'debug-styletest', viewFactory());
        this.mapRouteToViewComponent('/controls', 'debug-controls', 'app/view/TemplateViewComponentFactory');
        this.mapRouteToViewComponent('/comps', 'debug-components', 'app/view/DebugControlsTestingSubView');
      },

      /**
       * Draw and UI to the DOM and set events
       */
      render: function () {
        /* Sample event delegator syntax
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
        }.bind(this));
        Nori.dispatcher().subscribe(_noriEventConstants.ALERT_USER, function onAlertUser(payload) {
          this.alert(payload.payload.message, payload.payload.title);
        }.bind(this));
      }

    });

    module.exports = AppView;

  });