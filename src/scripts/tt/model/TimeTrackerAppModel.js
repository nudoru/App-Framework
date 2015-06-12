/**
 * Must be extended from Nori.Model module
 *
 * this._super refers to Nori.Model
 */

define('TT.Model.TimeTrackerAppModel',
  function (require, module, exports) {

    var _mockDataSource = require('TT.Model.MockDataCreator'),
      _peopleSet,
      _projectsSet,
      _assignmentsSet,
      _meCurrentUser,
      _myProjects;

    function initialize() {
      this.initializeApplicationModel();

      createModel();
    }


    /**
     * Create the mock model
     */
    function createModel() {

      _mockDataSource.initialize();

      _peopleSet = TT.model().createModelCollection({id: 'peopleset'});
      _projectsSet = TT.model().createModelCollection({id: 'projectsset'});
      _assignmentsSet = TT.model().createModelCollection({id: 'assignmentsset'});

      _peopleSet.addFromObjArray(_mockDataSource.getPeople(), 'id', false);
      _projectsSet.addFromObjArray(_mockDataSource.getProjects(), 'id', false);
      _assignmentsSet.addFromObjArray(_mockDataSource.getAssignments(), 'id', false);

      _meCurrentUser = _peopleSet.getFirst();

      var myName = _meCurrentUser.get('name');

      _myProjects = _assignmentsSet.filter('resourceName', myName);

      _myProjects[0].set({name: 'Bob'});

      //_myProjects.forEach(
      //  function listMyProjects(store) {
      //    console.log(store.get('projectTitle') + ', dev: ' + store.get('resourceName'));
      //  }
      //);

      // filter values was removed
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

      var test1 = TT.model().createModel({
        id: 'MockModel',
        store: {name: 'Matt', age: 37},
        silent: false
      });
      var test2 = TT.model().createModel({
        id: 'AnotherModel',
        store: {name: 'June', useid: 'x1234', age: 27},
        silent: false
      });

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

    exports.initialize = initialize;

  });