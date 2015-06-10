define('TT.Commands.RouteChangedCommand',
  function (require, module, exports) {

    exports.execute = function(data) {
      //console.log('TT RouteChangedCommand, route: '+data.route+', data: '+data.data);

      TT.view().updateOnRouteChange(data);
    };

  });;define('TT.Model.FakeData',

  function(require, module, exports) {
    "use strict";

    var _id = 1,
      _people= [],
      _projects = [],
      _assignments = [],
      _possibleManagers = [],
      _possibleRoles = ['ITD','ID','Consultant'],
      _possibleTasks = ['Analysis', 'Design', 'Develop', 'Implement','Evaluate','Consult'],
      _possibleLobs = ['Information Technology', 'Asset Management', 'Human Resources', 'Institutional', 'A&O', 'Client Services', 'Finance', 'Internal Audit', 'Marketing', 'Risk Management'],
      _lorem = require('nudoru.utils.NLorem'),
      _arrayUtils = require('nudoru.utils.ArrayUtils'),
      _stringUtils = require('nudoru.utils.StringUtils'),
      _numberUtils = require('nudoru.utils.NumberUtils');

    function getPeople() {
      return _people;
    }

    function getProjects() {
      return _projects;
    }

    function getAssignments() {
      return _assignments;
    }

    function initialize() {

      _lorem.initialize();

      var numPeople = 70,
          numProjects = 500,
          numAssignments = 5000;

      for(var a = 0; a<10; a++) {
        _possibleManagers.push(_lorem.getFLName());
      }


      for(var i = 0; i<numPeople; i++) {
        _people.push(createPerson());
      }

      for(var j = 0; j<numProjects; j++) {
        _projects.push(createProject());
      }

      for(var k = 0; k<numAssignments; k++) {
        _assignments.push(createAssignment());
      }

    }

    function createPerson() {
      return {
        id: _lorem.fakeGUID(),
        name: _lorem.getFLName(),
        manager: _arrayUtils.rndElement(_possibleManagers),
        type: 'type_b',
        team: 'Dev Team',
        brlTeamManager: _arrayUtils.rndElement(_possibleManagers),
        brlSrLeader: _arrayUtils.rndElement(_possibleManagers),
        jobTitle: _arrayUtils.rndElement(_possibleRoles),
        primaryRole: _arrayUtils.rndElement(_possibleTasks),
        secondaryRole: _arrayUtils.rndElement(_possibleTasks),
        active: 'Y',
        inActiveDate: '',
        keySkills: _arrayUtils.rndElement(_possibleTasks),
        comments: 'No comments',
        photoURL: 'img/animals/kowala.jpg'
      };
    }

    function createProject() {
      return {
        id: _lorem.fakeGUID(),
        title: _lorem.getText(3,6),
        description: getParas(2),
        status: 'active',
        workType: 'Develop',
        requester: _lorem.getFLName(),
        audience: _arrayUtils.rndElement(_possibleLobs),
        audienceSize: _numberUtils.rndNumber(10, 500).toString(),
        projectLead: _lorem.getFLName(),
        startDate: _lorem.getDate().string,
        endDate: _lorem.getDate().string,
        deploymentDate: _lorem.getDate().string,
        finishDate: _lorem.getDate().string,
        comments: getParas(1),
        teamLeading: 'Dev Team',
        duration: _numberUtils.rndNumber(1, 5).toString()
      };

    }

    function createAssignment() {

      var person = _arrayUtils.rndElement(_people),
          project = _arrayUtils.rndElement(_projects);

      return {
        id: _lorem.fakeGUID(),
        resourceID: person.id,
        resourceName: person.name,
        projectID: project.id,
        projectTitle: project.title,
        startDate: _lorem.getDate().string,
        endDate: _lorem.getDate().string,
        role: person.primaryRole,
        allocation: _numberUtils.rndNumber(10, 25).toString(),
        comments: _lorem.getText(3,6),
        timeData: '',
        allocationData: ''
      };
    }

    function getParas(max) {
      var para = '',
        numPara = _numberUtils.rndNumber(1, max),
        i = 0;

      for (; i < numPara; i++) {
        para += '<p>' + _lorem.getParagraph(3, 7) + '</p>';
      }

      return para;
    }

    /*
    function createItem() {
      var o = Object.create(APP.AppModel.ItemVO.properties),
        additionalImages = [],
        additionalNumImages = _numberUtils.rndNumber(1, 10),
        description = '',
        descriptionNumParas = _numberUtils.rndNumber(1, 5),
        i = 0;

      for (; i < descriptionNumParas; i++) {
        description += '<p>' + _lorem.getParagraph(3, 7) + '</p>';
      }

      for (i = 0; i < additionalNumImages; i++) {
        additionalImages.push('img/' + _arrayUtils.rndElement(_possiblePreviewImages));
      }

      o.title = _stringUtils.capitalizeFirstLetter(_lorem.getText(3, 10));
      o.shortTitle = o.title.substr(0, 10) + '...';
      o.description = description;
      o.images = additionalImages;
      o.previewImage = additionalImages[0];
      o.id = '' + _id++;
      o.dateStarted = 'January 1, 2010';
      o.dateCompleted = 'December 31, 2014';
      o.quarter = 'Q' + _numberUtils.rndNumber(1, 4).toString();
      o.duration = _numberUtils.rndNumber(1, 5).toString() + ' hour(s)';
      o.contributors = _arrayUtils.getRandomSetOfElements(_possibleContributors, 5);
      o.categories = _arrayUtils.getRandomSetOfElements(_possibleCategories, 1);
      o.types = _arrayUtils.getRandomSetOfElements(_possibleTypes, 3);
      o.companyArea = _arrayUtils.rndElement(_possibleLobs);
      o.complexity = _arrayUtils.rndElement(_possibleComplexity);
      o.links = _arrayUtils.getRandomSetOfElements(_possibleLinks, 5);
      o.tags = _arrayUtils.getRandomSetOfElements(_possibleTags, 3);
      return o;
    }
    */

    exports.initialize = initialize;
    exports.getPeople = getPeople;
    exports.getProjects = getProjects;
    exports.getAssignments = getAssignments;

  });;define('TT.Model.TimeTrackerAppModel',
  function (require, module, exports) {

    function initialize() {
      this._super.initialize();
    }

    exports.initialize = initialize;

  });;define('TT.View.ControlsTestingSubView',
  function (require, module, exports) {

    var _lIpsum = require('nudoru.utils.NLorem'),
      _toolTip = require('nudoru.components.ToolTipView'),
      _emitter = require('Nori.Events.Emitter'),
      _appEvents = require('Nori.Events.AppEvents'),
      _actionOneEl,
      _actionTwoEl,
      _actionThreeEl,
      _actionFourEl,
      _actionFiveEl,
      _actionSixEl;

    function initialize(initObj) {
      _lIpsum.initialize();

      this._super.initialize(initObj);
    }


    function viewDidMount() {
      console.log(this.getID() + ', subview did mount');

      _actionOneEl = document.getElementById('action-one');
      _actionTwoEl = document.getElementById('action-two');
      _actionThreeEl = document.getElementById('action-three');
      _actionFourEl = document.getElementById('action-four');
      _actionFiveEl = document.getElementById('action-five');
      _actionSixEl = document.getElementById('action-six');

      //_toolTip.add({title:'', content:"This is a button, it's purpose is unknown.", position:'TR', targetEl: _actionFourEl, type:'information'});
      //_toolTip.add({title:'', content:"This is a button, click it and rainbows will appear.", position:'BR', targetEl: _actionFourEl, type:'success'});
      //_toolTip.add({title:'', content:"This is a button, it doesn't make a sound.", position:'BL', targetEl: _actionFourEl, type:'warning'});
      //_toolTip.add({title:'', content:"This is a button, behold the magic and mystery.", position:'TL', targetEl: _actionFourEl, type:'danger'});

      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. ", position:'L', targetEl: _actionFourEl, type:'information'});
      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. ", position:'B', targetEl: _actionFourEl, type:'information'});
      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ", position:'R', targetEl: _actionFourEl, type:'information'});
      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ", position:'T', targetEl: _actionFourEl, type:'information'});


      _actionOneEl.addEventListener('click', function actOne(e) {
        Nori.view().addMessageBox({
          title: _lIpsum.getSentence(2,4),
          content: _lIpsum.getParagraph(2, 4),
          type: 'warning',
          modal: true,
          width: 500
        });
      });

      _actionTwoEl.addEventListener('click', function actTwo(e) {
        Nori.view().addMessageBox({
          title: _lIpsum.getSentence(10,20),
          content: _lIpsum.getParagraph(2, 4),
          type: 'default',
          modal: false,
          buttons: [
            {
              label: 'Yes',
              id: 'yes',
              type: 'default',
              icon: 'check',
              onClick: function() {
                console.log('yes');
              }
            },
            {
              label: 'Maybe',
              id: 'maybe',
              type: 'positive',
              icon:'cog',
              onClick: function() {
                console.log('maybe');
              }
            },
            {
              label: 'Nope',
              id: 'nope',
              type: 'negative',
              icon: 'times'
            }
          ]
        });
      });

      _actionThreeEl.addEventListener('click', function actThree(e) {
        Nori.view().addNotification({
          title: _lIpsum.getSentence(3,6),
          type: 'information',
          content: _lIpsum.getParagraph(1, 2)
        });

        _toolTip.remove(_actionFourEl);
      });

      _actionFourEl.addEventListener('click', function actFour(e) {
        console.log('Four');
      });

      _actionFiveEl.addEventListener('click', function actFour(e) {
        _emitter.publish(_appEvents.CHANGE_ROUTE, {route: '/one',data: {prop:'some data',moar:'25'}});
      });

      _actionSixEl.addEventListener('click', function actFour(e) {
        _emitter.publish(_appEvents.CHANGE_ROUTE, {route: '/two'});
      });

    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;

  });;define('TT.View.ModuleNavView',
  function (require, module, exports) {

    var _buttonMap = Object.create(null),
      _browserInfo = require('nudoru.utils.BrowserInfo'),
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('Nori.Events.Emitter');

    function initialize() {
      mapButton('btn_assignments', '/Assignments');
      mapButton('btn_timecard', '/Timecard');
      mapButton('btn_forecast', '/Forecast');
    }

    /**
     * Set up data for a button
     * @param elID
     * @param route
     */
    function mapButton(elID, route) {
      var buttonEl = document.getElementById(elID),
        liEl =buttonEl.parentNode;

      _buttonMap[elID] = {
        buttonEl: buttonEl,
        liEl: liEl,
        route: route,
        clickStream: Rx.Observable.fromEvent(buttonEl, _browserInfo.mouseClickEvtStr())
          .subscribe(function () {
            handleButton(elID);
          })
      };
    }

    /**
     * Change the appliation route when a button is pressed
     * @param id
     */
    function handleButton(id) {
      _emitter.publish(_appEvents.CHANGE_ROUTE, {route: _buttonMap[id].route});
    }

    /**
     * Highlight a button in response to a view change
     * @param route
     */
    function highlightModule(route) {
      for (var p in _buttonMap) {
        var btn = _buttonMap[p];
        if (btn.route === route) {
          _domUtils.addClass(btn.liEl, 'active');
        } else {
          _domUtils.removeClass(btn.liEl, 'active');
        }
      }
    }

    exports.initialize = initialize;
    exports.highlightModule = highlightModule;

  });;define('TT.View.TemplateSubView',
  function (require, module, exports) {



  });;define('TT.View.TimeTrackerAppView',
  function (require, module, exports) {

    var _self,
      _moduleNavView = require('TT.View.ModuleNavView'),
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
      _self.mapView('UserProfilePanel', 'TT.View.UserProfilePanelView', false, 'userprofilepanel');
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

  });;define('TT.View.UserProfilePanelView',
  function (require, module, exports) {

    var _browserInfo = require('nudoru.utils.BrowserInfo'),
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('Nori.Events.Emitter');

    function initialize(initObj) {
      this._super.initialize(initObj);
    }

    function viewDidMount() {
      console.log(this.getID() + ', subview did mount');
    }

    exports.initialize = initialize;
    exports.viewDidMount = viewDidMount;

  });;(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo');

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

  // Initialize the window
  window.onload = function() {

    var appView;

    // Create the application instance
    window.TT = Nori.createApplication();

    // Create the view
    appView = TT.createApplicationView(require('TT.View.TimeTrackerAppView'));

    // Initialize app with the view
    // App muse be initialized with view for route mapping to work
    TT.initialize({view:appView});

    mapEvents();
    mapRoutes();
    createModel();

    // Everything is ready!
    TT.view().removeLoadingMessage();

    // Execute the route on the URL
    TT.setCurrentRoute(TT.router().getCurrentRoute());

    // Model testing-
    //testModel();
  };

  /**
   * Set up commands / events
   */
  function mapEvents() {
    var _appEvents = require('Nori.Events.AppEvents');
    TT.mapEventCommand(_appEvents.ROUTE_CHANGED, 'TT.Commands.RouteChangedCommand');
  }

  /**
   * Set up the view to routes
   */
  function mapRoutes() {
    // Default route
    TT.mapRouteView('/', 'Timecard', 'TT.View.TemplateSubView');

    // Other routes
    TT.mapRouteView('/controls', 'ControlsTesting', 'TT.View.ControlsTestingSubView');
    TT.mapRouteView('/test', 'TestSubView', 'TT.View.TemplateSubView');
    TT.mapRouteView('/one', 'TestSubView1', 'TT.View.TemplateSubView');
    TT.mapRouteView('/two', 'TestSubView2', 'TT.View.TemplateSubView');
    TT.mapRouteView('/three', 'TestSubView3', 'TT.View.TemplateSubView');

    // Timecard mock
    TT.mapRouteView('/Forecast', 'Forecast', 'TT.View.TemplateSubView');
    TT.mapRouteView('/Assignments', 'Assignments', 'TT.View.TemplateSubView');
    TT.mapRouteView('/Timecard', 'Timecard', 'TT.View.TemplateSubView');
  }

  /**
   * Create the mock model
   */
  function createModel() {
    console.time('Gen fake');
    var dataSource = require('TT.Model.FakeData');
    dataSource.initialize();
    console.timeEnd('Gen fake');

    var _peopleSet = TT.createModelCollection({id:'peopleset'}),
      _projectsSet = TT.createModelCollection({id:'projectsset'}),
      _assignmentsSet = TT.createModelCollection({id:'assignmentsset'});

    console.time('Create set');
    _peopleSet.addFromObjArray(dataSource.getPeople(), 'id', false);
    _projectsSet.addFromObjArray(dataSource.getProjects(), 'id', false);
    _assignmentsSet.addFromObjArray(dataSource.getAssignments(), 'id', false);
    console.timeEnd('Create set');

    var fakeMe = _peopleSet.getFirst(),
      myName = fakeMe.get('name'),
      myProjects;

    myProjects = _assignmentsSet.filter('resourceName', myName);

    //myProjects.forEach(
    //  function listMyProjects(store) {
    //    console.log(store.get('projectTitle')+', dev: '+store.get('resourceName'));
    //  }
    //);

    //var devs = _peopleSet.filterValues(
    //  function (store) {
    //    return store.get('jobTitle') === 'ITD';
    //  }).forEach(
    //  function(store) {
    //    console.log(store.get('name')+', '+store.get('jobTitle'));
    //  });
  }

  /**
   * Testing for not model functionality
   */
  function testModel() {

    //var testMod = requireExtend('Nori.Model.Model', {
    //  make: function() {
    //    this.initialize({id: 'MockModel', store: {name: 'Matt', age: 37}, silent: false});
    //  },
    //
    //  newFunc: function() {
    //    return this.getStore();
    //  }
    //});
    //
    //testMod.make();
    //
    //console.log(testMod.newFunc());

    var test1 = TT.createModel({id: 'MockModel', store: {name: 'Matt', age: 37}, silent: false});
    var test2 = TT.createModel({id: 'AnotherModel', store: {name: 'June', useid:'x1234', age: 27}, silent: false});

    //console.log(test1.transform({name:'first',age:'oldage'}));
    //console.log(test1.validate({name:{required: true}}));


    //console.log(test1.toJSON());
    //console.log(test2.toJSON());
    //console.log('get first: '+test2.getFirst());
    //console.log('get index: '+test2.getAtIndex(1));
    //console.log('get last: '+test2.getLast());

    //TT.addModel(test1);
    //TT.addModel(test2);

    //console.log('test has: '+test1.has('name'));
    //console.log('test keys: '+test1.keys());
    //console.log('test values: '+test1.values());
    //
    //console.log('filter: '+test1.filterValues(function(val) { return val ==='Matt';}));
    //
    //console.log('test entries: '+JSON.stringify(test1.entries()));
  }

}());