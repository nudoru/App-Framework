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
     title: _stringUtils.toTitleCase(_lorem.getText(2,6)),
     description: getParas(2),
     status: 'active',
     workType: 'Develop',
     requester: _lorem.getFLName(),
     audience: _arrayUtils.rndElement(_possibleLobs),
     audienceSize: _numberUtils.rndNumber(10, 500).toString(),
     projectLead: _lorem.getFLName(),
     startDate: _lorem.getDate().string,
     endDate: _lorem.getDate().string,
     deploymentDate: _lorem.getDate().string,
     finishDate: _lorem.getDate().string,
     comments: getParas(1),
     teamLeading: 'Dev Team',
     duration: _numberUtils.rndNumber(1, 5).toString()
     */
    function updateStateFromProjectsModel() {
      var obj = Object.create(null);



      this.setState(obj);
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