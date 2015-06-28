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
        _currentUserMap,
        _currentUserProjectsCollection,
        _appEvents      = require('Nori.Events.AppEventCreator');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getCurrentUserModel() {
      return _currentUserMap;
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

      createMapStores();

      _appEvents.applicationModelInitialized();

      //_currentUserMap.set({test:'dummy'});
      //_appEvents.updateModelData('model',{foo:'bar'});
    }

    function handleModelDataChanged(dataObj) {
      console.log('TT, handlemodeldatachange', dataObj);
    }

    function handleUpdateModelData(dataObj) {
      console.log('TT, handleupdatemodeldata', dataObj);
    }

    /**
     * Create model data
     */
    function createMapStores() {
      _mockDataSource.initialize();

      loadApplicationData();

      _peopleCollection      = _self.createMapCollection({id: 'peopleset'});
      _projectsCollection    = _self.createMapCollection({id: 'projectsset'});
      _assignmentsCollection = _self.createMapCollection({id: 'assignmentsset'});

      _peopleCollection.addFromObjArray(_peopleSourceData, 'id', false);
      _projectsCollection.addFromObjArray(_projectsSourceData, 'id', false);
      _assignmentsCollection.addFromObjArray(_assignmentsSourceData, 'id', false);

      _currentUserMap = _peopleCollection.getFirst();

      _currentUserProjectsCollection = _self.createMapCollection({id: 'myprojects'});
      _currentUserProjectsCollection.addMapsFromArray(_assignmentsCollection.filterByKey('resourceName', _currentUserMap.get('name')));

      //_myProjects.forEach(function (store) {
      //  console.log(store.get('projectTitle'));
      //})
    }

    /**
     * Gets the data objects from the source
     */
    function loadApplicationData() {
      _peopleSourceData      = JSON.parse(getLocalStorageObject('mockTTData.people'));
      _projectsSourceData    = JSON.parse(getLocalStorageObject('mockTTData.projects'));
      _assignmentsSourceData = JSON.parse(getLocalStorageObject('mockTTData.assignments'));
    }

    /**
     * Used by Assignments view add assignment popup. Format
     * [{value:'data1',selected:'false',label:'Data 1'}, ...]
     */
    function getProjectsAndIDList() {
      var arry = [];

      _projectsCollection.forEach(function (map) {
        arry.push({
          value   : map.get('id'),
          label   : map.get('title'),
          selected: 'false'
        });
      });

      return arry;
    }

    /**
     * Retrieve the project matching the ID
     * @param id
     * @returns {*|void|*|T}
     */
    function getProjectMapForID(id) {
      return _projectsCollection.getMap(id);
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

    exports.initialize                       = initialize;
    exports.getCurrentUserModel              = getCurrentUserModel;
    exports.getCurrentUserProjectsCollection = getCurrentUserProjectsCollection;
    exports.handleModelDataChanged           = handleModelDataChanged;
    exports.handleUpdateModelData            = handleUpdateModelData;
    exports.getProjectsAndIDList             = getProjectsAndIDList;
    exports.getProjectMapForID               = getProjectMapForID;
  });
