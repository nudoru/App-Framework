(function () {

  var _browserInfo = require('Nudoru.Browser.BrowserInfo');

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
    var _appEvents = require('Nori.Events.AppEvents'),
        _emitter = require('Nori.Events.Emitter');

    _emitter.subscribe(_appEvents.ROUTE_CHANGED, function(data) {
      TT.view().updateOnRouteChange(data);
    });

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

    myProjects[0].set({name:'Bob'});

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