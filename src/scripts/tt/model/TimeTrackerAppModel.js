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
        _currentUserAssignmentsCollection,
        _appEvents      = require('Nori.Events.AppEventCreator'),
        _dispatcher            = require('Nori.Utils.Dispatcher'),
        _ttEventConstants     = require('TT.Events.TTEventConstants');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getCurrentUserModel() {
      return _currentUserMap;
    }

    function getCurrentUserAssignmentsCollection() {
      return _currentUserAssignmentsCollection;
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

      _dispatcher.subscribe(_ttEventConstants.ADD_ASSIGNMENT, handleAddAssignment);
      _dispatcher.subscribe(_ttEventConstants.ARCHIVE_ASSIGNMENT, handleArchiveAssignment);
      _dispatcher.subscribe(_ttEventConstants.UPDATE_ASSIGNMENTS, handleUpdateAssignments);
      _dispatcher.subscribe(_ttEventConstants.SUBMIT_TIMECARD, handleSubmitTimeCard);
      _dispatcher.subscribe(_ttEventConstants.UNLOCK_TIMECARD, handleUnlockTimeCard);
      _dispatcher.subscribe(_ttEventConstants.UPDATE_TIMECARD, handleUpdateTimeCard);
      _dispatcher.subscribe(_ttEventConstants.TIMECARD_WEEKFORWARD, handleWeekForward);
      _dispatcher.subscribe(_ttEventConstants.TIMECARD_WEEKBACKWARD, handleWeekBackward);
    }

    //----------------------------------------------------------------------------
    //  Handle Events
    //----------------------------------------------------------------------------

    function handleModelDataChanged(dataObj) {
      console.log('handleModelDataChanged', dataObj.payload);
    }

    function handleUpdateModelData(dataObj) {
      console.log('handleUpdateModelData', dataObj.payload);
    }

    function handleAddAssignment(dataObj) {
      console.log('handleAddAssignment',dataObj.payload);
    }

    function handleArchiveAssignment(dataObj) {
      console.log('handleArchiveAssignment',dataObj.payload);
      if(dataObj.payload) {
        //console.log(_currentUserProjectsCollection.toJSON());
        _currentUserAssignmentsCollection.remove(dataObj.payload.assignmentID);
        //console.log(_currentUserProjectsCollection.toJSON());
      }
    }

    function handleUpdateAssignments(dataObj) {
      console.log('handleUpdateAssignments',dataObj.payload);
    }

    function handleSubmitTimeCard(dataObj) {
      console.log('handleSubmitTimeCard',dataObj.payload);
    }

    function handleUnlockTimeCard(dataObj) {
      console.log('handleUnlockTimeCard',dataObj.payload);
    }

    function handleUpdateTimeCard(dataObj) {
      console.log('handleUpdateTimeCard',dataObj.payload);
    }

    function handleWeekForward(dataObj) {
      console.log('handleWeekForward',dataObj.payload);
    }

    function handleWeekBackward(dataObj) {
      console.log('handleWeekBackward',dataObj.payload);
    }

    //----------------------------------------------------------------------------
    //  Data Handling
    //----------------------------------------------------------------------------

    /**
     * Create model data
     */
    function createMapStores() {
      _mockDataSource.initialize();

      loadApplicationData();

      _peopleCollection      = _self.createMapCollection({id: 'peopleCollection'});
      _projectsCollection    = _self.createMapCollection({id: 'projectsCollection'});
      _assignmentsCollection = _self.createMapCollection({id: 'assignmentsCollection'});

      _peopleCollection.addFromObjArray(_peopleSourceData, 'id', false);
      _projectsCollection.addFromObjArray(_projectsSourceData, 'id', false);
      _assignmentsCollection.addFromObjArray(_assignmentsSourceData, 'id', false);

      _currentUserMap = _peopleCollection.getFirst();

      _currentUserAssignmentsCollection = _self.createMapCollection({id: 'currentUserAssignments'});
      _currentUserAssignmentsCollection.addMapsFromArray(_assignmentsCollection.filterByKey('resourceName', _currentUserMap.get('name')));
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
    function getAssignmentMapForID(id) {
      return _currentUserAssignmentsCollection.getMap(id);
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
    exports.getCurrentUserAssignmentsCollection = getCurrentUserAssignmentsCollection;
    exports.handleModelDataChanged           = handleModelDataChanged;
    exports.handleUpdateModelData            = handleUpdateModelData;
    exports.getProjectsAndIDList             = getProjectsAndIDList;
    exports.getAssignmentMapForID               = getAssignmentMapForID;
  });
