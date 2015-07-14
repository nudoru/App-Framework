define('TT.Model.TimeTrackerAppModel',
  function (require, module, exports) {

    var _self,
        _peopleSourceData,
        _projectsSourceData,
        _assignmentsSourceData,
        _peopleCollection,
        _projectsCollection,
        _assignmentsCollection,
        _currentUserMap,
        _timeModel        = require('TT.Model.TimeModel'),
        _dataCreator      = require('TT.Model.MockDataCreator'),
        _appEvents        = require('Nori.Events.AppEventCreator'),
        _dispatcher       = require('Nori.Utils.Dispatcher'),
        _ttEventConstants = require('TT.Events.TTEventConstants');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getCurrentUserModel() {
      return _currentUserMap;
    }

    function getTimeModelObj() {
      return {
        currentWeek: _timeModel.getCurrentWeek(),
        currentYear: _timeModel.getCurrentYear(),
        date       : _timeModel.getDateString(),
        prettyDate : _timeModel.getPrettyDateString()
      };
    }

    function getNow() {
      return _timeModel.now();
    }

    function getPrettyNow() {
      return _timeModel.prettyNow();
    }

    //----------------------------------------------------------------------------
    //
    //----------------------------------------------------------------------------

    function initialize() {
      _self = this;
      this.initializeApplicationModel();
      this.subscribeToModelEvents();

      _timeModel.initialize();

      createDataCollections();

      _appEvents.applicationModelInitialized();

      _dispatcher.subscribe(_ttEventConstants.ADD_ASSIGNMENT, handleAddAssignment);
      _dispatcher.subscribe(_ttEventConstants.ARCHIVE_ASSIGNMENT, handleArchiveAssignment);
      _dispatcher.subscribe(_ttEventConstants.UPDATE_ASSIGNMENTS, handleUpdateAssignments);
      _dispatcher.subscribe(_ttEventConstants.SUBMIT_TIMECARD, handleSubmitTimeCard);
      _dispatcher.subscribe(_ttEventConstants.UNLOCK_TIMECARD, handleUnlockTimeCard);
      _dispatcher.subscribe(_ttEventConstants.UPDATE_TIMECARD, handleUpdateTimeCard);
      _dispatcher.subscribe(_ttEventConstants.TIMECARD_WEEKFORWARD, handleWeekForward);
      _dispatcher.subscribe(_ttEventConstants.TIMECARD_WEEKBACKWARD, handleWeekBackward);

      publishUpdateNotification('Mock data created successfully');
    }

    function publishUpdateNotification(message) {
      _appEvents.notifyUser('Model', message);
    }

    //----------------------------------------------------------------------------
    //  Handle Events
    //----------------------------------------------------------------------------

    /**
     * The model data was changed
     * @param dataObj
     */
    function handleModelDataChanged(dataObj) {
      //console.log('handleModelDataChanged', dataObj.payload);
    }

    /**
     * Execute and action to change the model data
     * @param dataObj
     */
    function handleUpdateModelData(dataObj) {
      //console.log('handleUpdateModelData', dataObj.payload);
    }

    //----------------------------------------------------------------------------
    //  Handle Application Events
    //----------------------------------------------------------------------------

    function handleAddAssignment(dataObj) {
      addAssignmentForCurrentUser(dataObj.payload.projectID);
    }


    function handleArchiveAssignment(dataObj) {
      archiveAssignmentForCurrentUser(dataObj.payload.assignmentID);
    }

    function handleUpdateAssignments(dataObj) {
      updateAssignmentDataFromForm(dataObj.payload.data.form);
    }

    function handleSubmitTimeCard(dataObj) {
      submitCurrentTimeCard();
    }

    function handleUnlockTimeCard(dataObj) {
      unlockCurrentTimeCard(dataObj.payload.comments);
    }

    function handleUpdateTimeCard(dataObj) {
      updateTimeCardDataFromForm(dataObj.payload.data.form);
    }

    function handleWeekForward(dataObj) {
      _timeModel.forwardWeek();
    }

    function handleWeekBackward(dataObj) {
      _timeModel.backwardWeek();
    }

    //----------------------------------------------------------------------------
    //  Data Handling
    //----------------------------------------------------------------------------

    /**
     * Create model data
     */
    function createDataCollections() {
      _dataCreator.initialize();

      _peopleSourceData      = JSON.parse(getLocalStorageObject('mockTTData.people'));
      _projectsSourceData    = JSON.parse(getLocalStorageObject('mockTTData.projects'));
      _assignmentsSourceData = JSON.parse(getLocalStorageObject('mockTTData.assignments'));

      _peopleCollection      = _self.createMapCollection({id: 'peopleCollection'});
      _projectsCollection    = _self.createMapCollection({id: 'projectsCollection'});
      _assignmentsCollection = _self.createMapCollection({id: 'assignmentsCollection'});

      _peopleCollection.addFromObjArray(_peopleSourceData, 'id', false);
      _projectsCollection.addFromObjArray(_projectsSourceData, 'id', false);
      _assignmentsCollection.addFromObjArray(_assignmentsSourceData, 'id', false);

      _currentUserMap = getCurrentUserMap();
    }

    /**
     * Determine the current user properties
     */
    function getCurrentUserMap() {
      // Mock - just pull the first user
      return _peopleCollection.getFirst();
    }

    //----------------------------------------------------------------------------
    //  Assignments
    //----------------------------------------------------------------------------

    /**
     * For a given user, return an array of assignment maps
     * @param user
     * @returns {*|Array.<T>}
     */
    function getAssignmentsForUser(user) {
      return _assignmentsCollection.filterByKey('resourceName', user);
    }

    /**
     * For a given user name, return an array of assignment ID's that person has
     * @param user
     * @returns {Array}
     */
    function getAssignmentsIDArrayForUser(user) {
      return getAssignmentsForUser(user).map(function (assignment) {
        return assignment.get('id');
      });
    }

    /**
     * Returns an array of assignment maps for the current user
     * @returns {*|Array.<T>}
     */
    function getAssignmentsForCurrentUser() {
      return getAssignmentsForUser(_currentUserMap.get('name'));
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
     * Used by Assignments view add assignment popup. Format
     * [{value:'data1',selected:'false',label:'Data 1'}, ...]
     */
    function getNonAssignedProjectsAndIDList() {
      return getProjectsAndIDList().filter(function (project) {
        return !hasActiveAssignmentProjectID(project.value);
      });
    }

    /**
     * Retrieve the project matching the ID
     * @param id
     * @returns {*|void|*|T}
     */
    function getAssignmentMapForID(id) {
      return _assignmentsCollection.getMap(id);
    }

    /**
     * Returns the assignment for the given project ID
     * @param projectID
     * @returns {T}
     */
    function getAssignmentMapForProjectID(projectID) {
      return getAssignmentsForCurrentUser().filter(function (map) {
        return projectID === map.get('projectID');
      })[0];
    }

    /**
     * Return true if a project with ID exists as an assignment already
     * @param projectID
     * @returns {*}
     */
    function hasActiveAssignmentProjectID(projectID) {
      return getAssignmentsForCurrentUser().filter(function (map) {
        return map.get('active') === true && projectID === map.get('projectID');
      }).length;
    }

    /**
     * Return true if a project with ID exists as an assignment already
     * @param projectID
     * @returns {*}
     */
    function hasInactiveAssignmentProjectID(projectID) {
      return getAssignmentsForCurrentUser().filter(function (map) {
        return map.get('active') === false && projectID === map.get('projectID');
      }).length;
    }

    /**
     * Update assignment data
     * @param id
     */
    function updateAssignmentData(id, data) {
      getAssignmentMapForID(id).set({
        'startDate' : data.startDate,
        'endDate'   : data.endDate,
        'role'      : data.primaryRole,
        'allocation': data.allocation
      });
    }

    /**
     * Adds an assignment to the active list
     * Either reactive an archived project or create a new assignment and add it
     * @param projectID
     */
    function addAssignmentForCurrentUser(projectID) {
      if (hasActiveAssignmentProjectID(projectID)) {
        console.log('A project with id ' + projectID + ' already exists as an active assignment');
        return;
      }

      if (hasInactiveAssignmentProjectID(projectID)) {
        getAssignmentMapForProjectID(projectID).set({active: true});
        publishUpdateNotification('Project successfully unarchived.');
      } else {
        var project    = _projectsCollection.getMap(projectID).toObject(),
            person     = _currentUserMap.toObject(),
            assignment = _dataCreator.createAssignment(person, project);

        _assignmentsCollection.addFromObjArray([assignment], 'id', false);
        publishUpdateNotification('Project successfully added to assignments.');
      }
    }

    /**
     * Set and assignment to inactive
     * @param assignmentID
     */
    function archiveAssignmentForCurrentUser(assignmentID) {
      _assignmentsCollection.getMap(assignmentID).set({active: false});
      publishUpdateNotification('Project successfully archived.');
    }

    /**
     * Form has one key, assignment id, and value is object with keys: allocation, endDate, primaryCole, startDate
     * @param dataObj
     */
    function updateAssignmentDataFromForm(formObj) {
      formObj.forEach(function (dataRow) {
        var assignmentID = Object.keys(dataRow)[0];
        updateAssignmentData(assignmentID, dataRow[assignmentID]);
      });

      publishUpdateNotification('Assignments updated successfully.');
    }

    //----------------------------------------------------------------------------
    //  Time Card
    //----------------------------------------------------------------------------

    /**
     * Update assignment timecard data. Data added to the 'timeCardData' key as
     * a new key/value '2015_29':form_data
     * @param id
     */
    // TODO set it as JSON data?
    function updateAssignmentTimeCardData(id, data) {
      getAssignmentMapForID(id).setKeyProp('timeCardData', getTimeModelObj().date, data);
    }

    function isCurrentWeekTimeCardLocked() {
      var currentWeek = _currentUserMap.getKeyProp('timeCardHistory', getTimeModelObj().date);

      if(currentWeek) {
        return currentWeek.submitted;
      }

      return false;
    }

    function getCurrentTimeCardSubmitMetaData() {
      var obj = {};
      if(isCurrentWeekTimeCardLocked()) {
        obj = _.merge({},_currentUserMap.getKeyProp('timeCardHistory', getTimeModelObj().date));
      }
      return obj;
    }

    function submitCurrentTimeCard() {
      _currentUserMap.setKeyProp('timeCardHistory', getTimeModelObj().date, {
        submitted: true,
        time     : getPrettyNow()
      });

      console.log(JSON.stringify(_currentUserMap.get('timeCardHistory')));
      publishUpdateNotification('Time card submitted successfully ');
    }

    function unlockCurrentTimeCard(comments) {
      _currentUserMap.setKeyProp('timeCardHistory', getTimeModelObj().date, {
        submitted: false,
        comments : comments,
        time     : getPrettyNow()
      });

      console.log(JSON.stringify(_currentUserMap.get('timeCardHistory')));
      publishUpdateNotification('Time card unlocked successfully ');
    }

    function updateTimeCardDataFromForm(formObj) {
      formObj.forEach(function (dataRow) {
        var assignmentID = Object.keys(dataRow)[0];
        updateAssignmentTimeCardData(assignmentID, dataRow[assignmentID]);
      });

      //publishUpdateNotification('Time card updated successfully.');
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

    exports.initialize                      = initialize;
    exports.getCurrentUserModel             = getCurrentUserModel;
    exports.getTimeModelObj                 = getTimeModelObj;
    exports.getNow                          = getNow;
    exports.handleModelDataChanged          = handleModelDataChanged;
    exports.handleUpdateModelData           = handleUpdateModelData;
    exports.getProjectsAndIDList            = getProjectsAndIDList;
    exports.getNonAssignedProjectsAndIDList = getNonAssignedProjectsAndIDList;
    exports.getAssignmentMapForID           = getAssignmentMapForID;
    exports.getAssignmentsForCurrentUser    = getAssignmentsForCurrentUser;
    exports.isCurrentWeekTimeCardLocked     = isCurrentWeekTimeCardLocked;
    exports.getCurrentTimeCardSubmitMetaData = getCurrentTimeCardSubmitMetaData;
  });
