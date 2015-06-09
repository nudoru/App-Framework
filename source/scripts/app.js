(function () {

  var _browserInfo = require('nudoru.utils.BrowserInfo');

  if(_browserInfo.notSupported) {
    alert("Your browser is not supported! Please use IE 9+, Firefox, Chrome or Safari.");
  }

  // Initialize the window
  window.onload = function() {

    var appView;

    // Create the application instance
    window.TT = Nori.create();

    // Create the view
    appView = Nori.extend(require('TT.TimeTrackerAppView'), require('Nori.View'));

    // Initialize app with the view
    TT.initialize({view:appView});

    mapEvents();
    mapRoutes();

    console.time('Gen fake');
    var dataSource = require('TT.FakeData');
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


    // Everything is ready!
    TT.view().removeLoadingMessage();

    // Execute the route on the URL
    TT.setCurrentRoute(TT.router().getCurrentRoute());

    // Model testing-
    //testModel();
  };

  function mapEvents() {
    var _appEvents = require('Nori.Events.AppEvents');
    TT.mapEventCommand(_appEvents.ROUTE_CHANGED, 'TT.RouteChangedCommand');
  }

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

  function testModel() {

    //var testMod = requireExtend('Nori.Model', {
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