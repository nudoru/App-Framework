/**
 * Must be extended from Nori.View module
 *
 * this._super refers to Nori.View
 */

define('TT.View.TimeTrackerAppView',
  function (require, module, exports) {

    var _self,
        _helpView      = require('Nudoru.Component.CoachMarksView'),
        _moduleNavView = require('TT.View.ModuleNavView'),
        _toolTip       = require('Nudoru.Component.ToolTipView'),
        _appEvents     = require('Nori.Events.AppEventCreator');

    function initialize() {
      _self = this;
      _self.initializeApplicationView();
      _self.setRouteViewMountPoint('#contents');

      mapRoutes();
      mapComponentViews();
      configureUIEvents();
      configureHelpCoachmarks();
      //configureToolTips();

      _helpView.initialize('coachmarks__container');
      _moduleNavView.initialize();
      _appEvents.applicationViewInitialized();
    }

    /**
     * Set up the view to routes
     */
    function mapRoutes() {
      // Default route
      // TODO fix this duplicate controller view
      TT.mapRouteView('/', 'Timecard', 'TT.View.TimeCardView');

      TT.mapRouteView('/Assignments', 'Assignments', 'TT.View.AssignmentsView');
      TT.mapRouteView('/Timecard', 'Timecard', 'TT.View.TimeCardView');
      TT.mapRouteView('/Forecast', 'Forecast', 'TT.View.CapacityForecastView');

      // Decorate the base subview modules with additional common functionality
      _self.extendSubViewController('Assignments', [requireNew('TT.View.ModuleCommon')]);
      _self.extendSubViewController('Timecard', [requireNew('TT.View.ModuleCommon')]);
      _self.extendSubViewController('Forecast', [requireNew('TT.View.ModuleCommon')]);
    }

    function render() {
      _self.showView('UserProfilePanel');
    }

    function mapComponentViews() {
      _self.mapView('UserProfilePanel', 'TT.View.UserProfilePanelView', false, '#userprofilepanel');
    }

    function configureUIEvents() {
      _self.setEvents({
        'click #btn_main_projects': handleProjectsButton,
        'click #btn_main_people'  : handlePeopleButton,
        'click #btn_main_help'    : handleHelpButton
      });
      _self.delegateEvents();
    }

    function handleProjectsButton() {
      _self.addMessageBox({
        title  : 'Projects',
        content: 'This feature is still in development!',
        type   : 'default',
        modal  : true,
        width  : 350
      });
    }

    function handlePeopleButton() {
      _self.addMessageBox({
        title  : 'People',
        content: 'This feature is still in development!',
        type   : 'default',
        modal  : true,
        width  : 350
      });
    }

    function handleHelpButton() {
      _helpView.show();
    }

    /**
     * Configure the coach marks help
     */
    function configureHelpCoachmarks() {
      _helpView.outlineElement('#module_navigation', {
        shape: 'rect',
        label: 'Access different module of the application: Adding and removing projects, entering time weekly and viewing your capacity (coming soon). ',
        labelWidth: 200,
        labelPosition: 'R'
      });
      _helpView.outlineElement('#main_navigation', {
        shape: 'rect',
        label: 'Access the master projects and people SharePoint lists.',
        labelPosition: 'B'
      });
      _helpView.outlineElement('#userprofilepanel', {
        shape: 'rect',
        label: 'Information about you.',
        labelPosition: 'B'
      });
      _helpView.outlineElement('#contents', {
        shape: 'rect',
        label: 'Different application modules will appear here.',
        labelPosition: 'B',
        height: 200
      });
    }

    /**
     * Update the UI or components when the route/subview has changed
     * @param newRoute
     */
    function updateOnRouteChange(newRoute) {
      _moduleNavView.highlightModule(newRoute.route);
    }

    exports.initialize          = initialize;
    exports.render              = render;
    exports.updateOnRouteChange = updateOnRouteChange;

  });