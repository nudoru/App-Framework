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
      _appEvents = require('Nori.Events.AppEventCreator');

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
      this.subscribeToModelEvents();

      createModelStores();

      _appEvents.applicationModelInitialized();

      //_currentUserModel.set({test:'dummy'});
      //_appEvents.updateModelData('model',{foo:'bar'});
    }

    function handleModelDataChanged(dataObj) {
      console.log('TT, handlemodeldatachange',dataObj);
    }

    function handleUpdateModelData(dataObj) {
      console.log('TT, handleupdatemodeldata',dataObj);
    }

    /**
     * Create model data
     */
    function createModelStores() {
      _mockDataSource.initialize();

      loadApplicationData();

      _peopleCollection = _self.createModelCollection({id: 'peopleset'});
      _projectsCollection = _self.createModelCollection({id: 'projectsset'});
      _assignmentsCollection = _self.createModelCollection({id: 'assignmentsset'});

      _peopleCollection.addFromObjArray(_peopleSourceData, 'id', false);
      _projectsCollection.addFromObjArray(_projectsSourceData, 'id', false);
      _assignmentsCollection.addFromObjArray(_assignmentsSourceData, 'id', false);

      _currentUserModel = _peopleCollection.getFirst();

      _currentUserProjectsCollection = _self.createModelCollection({id: 'myprojects'});
      _currentUserProjectsCollection.addStoresFromArray(_assignmentsCollection.filterByKey('resourceName', _currentUserModel.get('name')));

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


    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.getCurrentUserModel = getCurrentUserModel;
    exports.getCurrentUserProjectsCollection = getCurrentUserProjectsCollection;
    exports.handleModelDataChanged = handleModelDataChanged;
    exports.handleUpdateModelData = handleUpdateModelData;

  });