define('APP.View.AppView',
  function (require, module, exports) {

    var _self,
        _appEvents             = require('Nori.Events.AppEventCreator'),
        _dispatcher            = require('Nori.Utils.Dispatcher'),
        _appEventConstants     = require('Nori.Events.AppEventConstants'),
        _browserEventConstants = require('Nudoru.Browser.BrowserEventConstants');

    function initialize() {
      _self = this;
      _self.initializeApplicationView();
      _self.setRouteViewMountPoint('#contents');

      APP.mapRouteView('/', '', 'APP.View.');

      //_self.setEvents({
      //  'click #btn_main_projects': handleProjectsButton
      //});
      //_self.delegateEvents();

      _appEvents.applicationViewInitialized();
    }

    exports.initialize          = initialize;
  });