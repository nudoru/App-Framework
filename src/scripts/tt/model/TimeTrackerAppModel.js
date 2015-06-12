define('TT.Model.TimeTrackerAppModel',
  function (require, module, exports) {

    var _self,
      _mockDataSource = require('TT.Model.MockDataCreator'),
      _peopleSourceData,
      _projectsSourceData,
      _assignmentsSourceData,
      _peopleCollection,
      _projectsCollection,
      _assignmentsCollection,
      _currentUserModel,
      _currentUserProjectsCollection,
      _appEvents = require('Nori.Events.AppEvents');
      _dispatcher = require('Nori.Events.Dispatcher');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getCurrentUserModel() {
      return _currentUserModel;
    }

    function getCurrentUserProjectsCollection() {
      return _currentUserProjectsCollection;
    }

    //----------------------------------------------------------------------------
    //
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
      this.initializeApplicationModel();
      createModel();


    }

    /**
     * Create model data
     */
    function createModel() {

      // Will init dummy data and save to local storage: mockTTData.people, mockTTData.projects, mockTTData.assignments
      _mockDataSource.initialize();

      loadApplicationData();

      _peopleCollection = _self.createModelCollection({id: 'peopleset'});
      _projectsCollection = _self.createModelCollection({id: 'projectsset'});
      _assignmentsCollection = _self.createModelCollection({id: 'assignmentsset'});

      _peopleCollection.addFromObjArray(_peopleSourceData, 'id', false);
      _projectsCollection.addFromObjArray(_projectsSourceData, 'id', false);
      _assignmentsCollection.addFromObjArray(_assignmentsSourceData, 'id', false);

      _currentUserModel = _peopleCollection.getFirst();

      _currentUserProjectsCollection = _self.createModelCollection({id:'myprojects'});
      _currentUserProjectsCollection.addStoresFromArray(_assignmentsCollection.filter('resourceName', _currentUserModel.get('name')));

      //_myProjects.forEach(function (store) {
      //  console.log(store.get('projectTitle'));
      //})
    }

    /**
     * Gets the data objects from the source
     */
    function loadApplicationData() {
      _peopleSourceData = JSON.parse(getLocalStorageObject('mockTTData.people'));
      _projectsSourceData = JSON.parse(getLocalStorageObject('mockTTData.projects'));
      _assignmentsSourceData = JSON.parse(getLocalStorageObject('mockTTData.assignments'));
    }

    //----------------------------------------------------------------------------
    //  Utility
    //----------------------------------------------------------------------------

    /**
     * Utility function
     * @param obj
     * @returns {*}
     */
    function getLocalStorageObject(obj) {
      return localStorage[obj];
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

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.getCurrentUserModel = getCurrentUserModel;
    exports.getCurrentUserProjectsCollection = getCurrentUserProjectsCollection;

  });