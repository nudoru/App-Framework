/**
 * Must be extended from Nori.View module
 *
 * this._super refers to Nori.View
 */

define('TT.View.TimeTrackerAppView',
  function (require, module, exports) {

    var _self,
      _moduleNavView = require('TT.View.ModuleNavView'),
      _toolTip = require('Nudoru.Component.ToolTipView'),
      _appEvents = require('Nori.Events.AppEventCreator');

    function initialize() {
      _self = this;
      _self.initializeApplicationView();
      _self.setRouteViewMountPoint('#contents');

      mapRoutes();
      mapComponentViews();
      configureUIEvents();
      //configureToolTips();

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

      // TESTING routes
      //TT.mapRouteView('/controls', 'ControlsTesting', 'TT.View.ControlsTestingSubView');

      TT.mapRouteView('/Assignments', 'Assignments', 'TT.View.AssignmentsView');
      TT.mapRouteView('/Timecard', 'Timecard', 'TT.View.TimeCardView');
      TT.mapRouteView('/Forecast', 'Forecast', 'TT.View.CapacityForecastView');

      // Decorate the base subview modules with additional common functionality
      _self.decorateSubViewController('Assignments', [requireNew('TT.View.TTSubViewModuleCommon')]);
      _self.decorateSubViewController('Timecard', [requireNew('TT.View.TTSubViewModuleCommon')]);
      _self.decorateSubViewController('Forecast', [requireNew('TT.View.TTSubViewModuleCommon')]);

    }

    function render() {
      _self.showView('UserProfilePanel');

      //this.mbCreator().alert('Alert','Somehting happened, oop!')
      //
      //this.mbCreator().confirm('Read to submit this time card?',
      //  'Only submit your time card when all data for the week has been entered. Editing a submitted time card will require justification.<br><br>Ready to submit?',
      //  function() {
      //    console.log('yes');
      //  },
      //  true);
      //
      this.mbCreator().prompt('Modify Time Card',
        'This time card has been submitted. Why you are modifying it?',
        function(data) {
          console.log('yes',data);
        },
        true);

      //var opt = [];
      //
      //for(var i=0; i<300; i++) {
      //  opt.push({
      //    value:'data'+i,
      //    selected:'false',
      //    label:'Data Data Data Data Data Data Data Data Data Data Data Data Data Data Data '+i
      //  });
      //}

      this.mbCreator().choice('Add Project',
        'Choose a new project to add to your active list',
        [{value:'data1',selected:'false',label:'Data 1'},
          {value:'data2',selected:'true',label:'Data 2'},
          {value:'data3',selected:'false',label:'Data 3'}
        ],
        function(data) {
          console.log('selected',data);
        },
        true);


    }

    function mapComponentViews() {
      _self.mapView('UserProfilePanel', 'TT.View.UserProfilePanelView', false, '#userprofilepanel');
    }

    function configureUIEvents() {
      _self.setEvents({
        'click #btn_main_projects': handleProjectsButton,
        'click #btn_main_people': handlePeopleButton,
        'click #btn_main_help': handleHelpButton
      });
      _self.delegateEvents();
    }

    function handleProjectsButton() {
      _self.addMessageBox({
        title: 'Projects',
        content: 'This feature is still in development!',
        type: 'default',
        modal: true,
        width: 350
      });
    }

    function handlePeopleButton() {
      _self.addMessageBox({
        title: 'People',
        content: 'This feature is still in development!',
        type: 'default',
        modal: true,
        width: 350
      });
    }

    function handleHelpButton() {
      _self.addMessageBox({
        title: 'How Do I?',
        content: 'This feature is still in development!',
        type: 'information',
        modal: true,
        width: 550
      });
    }

    function configureToolTips() {
      _toolTip.add({
        title: '',
        content: 'View Projects List',
        position: 'B',
        targetEl: _buttonProjects,
        type: 'information',
        width: 75
      });
      _toolTip.add({
        title: '',
        content: 'View People List',
        position: 'B',
        targetEl: _buttonPeople,
        type: 'information',
        width: 75
      });
      _toolTip.add({
        title: '',
        content: 'Access information for performing common tasks',
        position: 'B',
        targetEl: _buttonHelp,
        type: 'information',
        width: 75
      });

      _toolTip.add({
        title: '',
        content: 'Add and remove assignments from your active list',
        position: 'R',
        targetEl: document.getElementById('btn_assignments'),
        type: 'information'
      });
      _toolTip.add({
        title: '',
        content: 'Log time to assignments on your active list',
        position: 'R',
        targetEl: document.getElementById('btn_timecard'),
        type: 'information'
      });
      _toolTip.add({
        title: '',
        content: 'View capacity based on your estimated alloation',
        position: 'R',
        targetEl: document.getElementById('btn_forecast'),
        type: 'information'
      });
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