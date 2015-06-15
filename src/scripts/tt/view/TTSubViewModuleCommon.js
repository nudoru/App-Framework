/**
 * This module defines common functionality that Assignments, Time Card and
 * Capacity Forecast share
 */

define('TT.View.TTSubViewModuleCommon',
  function (require, module, exports) {

    var _messageBoxIDs = [],
        _myProjectsModel;

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
        obj.projects[project.get('id')] = {
          projectTitle:project.get('projectTitle'),
          projectID:project.get('projectID'),
          projectDescription:project.get('projectDescription'),
          role:project.get('role'),
          startDate:project.get('startDate'),
          endData:project.get('endDate')
        }
      });

      obj.calendar = {
        currentYear: '2015',
        currentWeek: 'June 15-June 19'
      };

      this.setState(obj);

      console.log(this.getState());
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

  });