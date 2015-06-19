/**
 * This module defines common functionality that Assignments, Time Card and
 * Capacity Forecast share
 */

define('TT.View.TTSubViewModuleCommon',
  function (require, module, exports) {

    var _messageBoxIDs = [],
        _myProjectsModel,
        _projectRows = [],
        _domUtils = require('Nudoru.Browser.DOMUtils');

    function initializeCommon() {
      //
    }

    //----------------------------------------------------------------------------
    //  Date Model
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  Projects Model
    //----------------------------------------------------------------------------

    function setProjectsModel() {
      _myProjectsModel = TT.model().getCurrentUserProjectsCollection();
    }

    function getProjectsModel() {
      return _myProjectsModel;
    }

    /*
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
     */
    function updateStateFromProjectsModel() {
      var obj = Object.create(null);

      obj.projects = Object.create(null);

      _myProjectsModel.forEach(function(project){
        obj.projects[project.get('projectID')] = {
          projectTitle:project.get('projectTitle'),
          projectID:project.get('projectID'),
          projectDescription:project.get('projectDescription'),
          role:project.get('role'),
          startDate:project.get('startDate'),
          endData:project.get('endDate')
        };
      });

      obj.calendar = {
        currentYear: '2015',
        currentWeek: 'June 15-June 19'
      };

      this.setState(obj);

      //console.log(this.getState());
    }

    /**
     * Build an array of table > tr's that pertain to project data
     */
    function buildProjectRows() {
      _projectRows = _domUtils.getQSElementsAsArray(this.getDOMElement(), 'tr').filter(function(row) {
        var rowid = row.getAttribute('id');
        if(!rowid) {
          return false;
        }
        return rowid.indexOf('tc_p_') === 0;
      });
    }

    function getProjectRows() {
      return _projectRows;
    }

    /**
     * Returns an array of objects: key is ID, prop is object of form data inputs
     * @returns {Array}
     */
    function getProjectRowData() {
      var arry = [];
      this.getProjectRows().forEach(function (row) {
        var id = row.getAttribute('id').split('tc_p_')[1],
          obj = Object.create(null);
        obj[id] = _domUtils.captureFormData(row);
        arry.push(obj);
      });
      return arry;
    }

    //----------------------------------------------------------------------------
    //  Utility
    //----------------------------------------------------------------------------

    function showAlert(message) {
      _messageBoxIDs.push(TT.view().alert(message));
    }

    function closeAllAlerts() {
      _messageBoxIDs.forEach(function (id) {
        TT.view().removeMessageBox(id);
      });
      _messageBoxIDs = [];
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.initializeCommon = initializeCommon;
    exports.setProjectsModel = setProjectsModel;
    exports.getProjectsModel = getProjectsModel;
    exports.updateStateFromProjectsModel = updateStateFromProjectsModel;

    exports.showAlert = showAlert;
    exports.closeAllAlerts = closeAllAlerts;

    exports.buildProjectRows = buildProjectRows;
    exports.getProjectRows = getProjectRows;
    exports.getProjectRowData = getProjectRowData;

  });