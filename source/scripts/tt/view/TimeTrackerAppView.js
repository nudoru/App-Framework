/**
 * Must be extended from Nori.View module
 *
 * this._super refers to Nori.View
 */

define('TT.TimeTrackerAppView',
  function (require, module, exports) {

    var _self,
      _moduleNavView = require('TT.ModuleNavView'),
      _buttonProjects,
      _buttonPeople,
      _buttonHelp,
      _buttonProjectsStream,
      _buttonPeopleStream,
      _buttonHelpStream,
      _toolTip = require('nudoru.components.ToolTipView'),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('Nori.Events.Emitter');

    function initialize() {
      _self = this;

      _self.initializeApplicationElements();
      _self.initializeComponents();

      _self.setRouteViewMountPoint('contents');

      mapComponentViews();
      configureMainButtons();
      configureToolTips();

      _moduleNavView.initialize();

      render();
    }

    function render() {
      //_browserEventView.setMainScrollingView('app__contents');
      //_browserEventView.initializeEventStreams();
      //_browserEventView.setPositionUIElementsOnChangeCB(layoutUI);

      _self.showView('UserProfilePanel');
    }

    function mapComponentViews() {
      _self.mapView('UserProfilePanel', 'TT.UserProfilePanelView', false, 'userprofilepanel');
    }

    function configureMainButtons() {
      _buttonProjects = document.getElementById('btn_main_projects');
      _buttonPeople = document.getElementById('btn_main_people');
      _buttonHelp = document.getElementById('btn_main_help');

      _buttonProjectsStream = Rx.Observable.fromEvent(_buttonProjects, _browserInfo.mouseClickEvtStr())
        .subscribe(function () {
          _self.addMessageBox({
            title: 'Projects',
            content: 'This feature is still in development!',
            type: 'default',
            modal: true,
            width: 350
          });
        });
      _buttonPeopleStream  = Rx.Observable.fromEvent(_buttonPeople, _browserInfo.mouseClickEvtStr())
        .subscribe(function () {
          _self.addMessageBox({
            title: 'People',
            content: 'This feature is still in development!',
            type: 'default',
            modal: true,
            width: 350
          });
        });
      _buttonHelpStream = Rx.Observable.fromEvent(_buttonHelp, _browserInfo.mouseClickEvtStr())
        .subscribe(function () {
          _self.addMessageBox({
            title: 'How Do I?',
            content: 'This feature is still in development!',
            type: 'information',
            modal: true,
            width: 550
          });
        });
    }

    function configureToolTips() {
      _toolTip.add({title:'', content:'View Projects List', position:'B', targetEl: _buttonProjects, type:'information', width: 75});
      _toolTip.add({title:'', content:'View People List', position:'B', targetEl: _buttonPeople, type:'information', width: 75});
      _toolTip.add({title:'', content:'Access information for performing common tasks', position:'B', targetEl: _buttonHelp, type:'information', width: 75});

      _toolTip.add({title:'', content:'Add and remove assignments from your active list', position:'R', targetEl: document.getElementById('btn_assignments'), type:'information'});
      _toolTip.add({title:'', content:'Log time to assignments on your active list', position:'R', targetEl: document.getElementById('btn_timecard'), type:'information'});
      _toolTip.add({title:'', content:'View capacity based on your estimated alloation', position:'R', targetEl: document.getElementById('btn_forecast'), type:'information'});
    }

    /**
     * Update the UI or components when the route/subview has changed
     * @param newRoute
     */
    function updateOnRouteChange(newRoute) {
      _moduleNavView.highlightModule(newRoute.route);
    }

    exports.initialize = initialize;
    exports.render = render;
    exports.updateOnRouteChange = updateOnRouteChange;

  });