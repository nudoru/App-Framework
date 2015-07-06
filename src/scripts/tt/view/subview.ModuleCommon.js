/**
 * This module defines common functionality that Assignments, Time Card and
 * Capacity Forecast share
 */

define('TT.View.ModuleCommon',
  function (require, module, exports) {

    var _messageBoxIDs = [],
        _myAssignmentsModel,
        _assignmentRows   = [],
        _domUtils      = require('Nudoru.Browser.DOMUtils'),
        _toolTip       = require('Nudoru.Component.ToolTipView');

    function initializeCommon() {
      //
    }

    //----------------------------------------------------------------------------
    //  Date Model
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //  Projects Model
    //----------------------------------------------------------------------------

    function setAssignmentsModel() {
      _myAssignmentsModel = TT.model().getCurrentUserAssignmentsCollection();
    }

    function getAssignmentsModel() {
      return _myAssignmentsModel;
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

      obj.assignments = Object.create(null);

      _myAssignmentsModel.forEach(function (assignment) {
        obj.assignments[assignment.get('id')] = {
          assignmentID      : assignment.get('id'),
          projectTitle      : assignment.get('projectTitle'),
          projectID         : assignment.get('projectID'),
          projectDescription: assignment.get('projectDescription'),
          role              : assignment.get('role'),
          startDate         : assignment.get('startDate'),
          endDate           : assignment.get('endDate'),
          allocation        : assignment.get('allocation'),
          weekData          : assignment.get('timeCardData')
        };
      });

      // TESTING
      obj.calendar = TT.model().getTimeModelObj();

      console.log(obj.calendar);

      this.setState(obj);
    }

    /**
     * Build an array of table > tr's that pertain to project data
     * @param prefix For timecard: 'tc_p_', for assignments: 'asn_p_'
     */
    function buildAssignmentRows(prefix) {
      _assignmentRows = getTRElementsWithIDMatchingPrefix.call(this,prefix);
    }

    function getTRElementsWithIDMatchingPrefix(prefix) {
      return _domUtils.getQSElementsAsArray(this.getDOMElement(), 'tr').filter(function (row) {
        var rowid = row.getAttribute('id');
        if (!rowid) {
          return false;
        }
        return rowid.indexOf(prefix) === 0;
      });
    }

    function getAssignmentRows() {
      return _assignmentRows;
    }

    /**
     * Returns an array of objects: key is ID, prop is object of form data inputs
     * @returns {Array}
     */
    function getAssignmentRowData(prefix) {
      var packet = Object.create(null),
          arry   = [];
      this.getAssignmentRows().forEach(function (row) {
        var id  = row.getAttribute('id').split(prefix)[1],
            obj = Object.create(null);
        obj[id] = _domUtils.captureFormData(row);
        arry.push(obj);
      });

      //packet.year      = this.getState().calendar.currentYear;
      //packet.weekNum   = this.getState().calendar.currentWeekNum;
      packet.state = this.getState();
      packet.form = arry;

      return packet;
    }

    /**
     * Set tool tips to display on hover of project name
     */
    function setProjectTitleCellToolTips(prefix) {
      var state = this.getState();
      this.getAssignmentRows().forEach(function (el) {
        var projectID     = el.getAttribute('id').split(prefix)[1],
            headingCellEl = el.querySelector('th');

        _toolTip.add({
          title   : '',
          content : state.assignments[projectID].projectDescription,
          position: 'R',
          targetEl: headingCellEl,
          type    : 'information',
          width   : 350
        });
      });
    }

    /**
     * Visual indicator, flash the
     * @param elIDStr
     */
    function flashAssignmentRow(elIDStr) {
      var row, animTimeLine;

      elIDStr = parseProjectID(elIDStr);

      row = this.getAssignmentRows().filter(function (rowEl) {
        if (rowEl.getAttribute('id').indexOf(elIDStr) > 0) {
          return true;
        }
        return false;
      });

      if (row) {
        animTimeLine = new TimelineLite();
        animTimeLine.to(row, 0.25, {
          boxShadow: "0 0 2px 2px rgba(0,94,184,0.25) inset",
          ease     : Circ.easeOut
        });
        animTimeLine.to(row, 0.5, {
          boxShadow: "0 0 0px 0px rgba(0,94,184,0) inset",
          ease     : Circ.easeOut
        });
        animTimeLine.play();
      }
    }

    /**
     * Returns the project id from a element ID
     * Element id's on the forms are similar to: 'tc_p_#####'
     * @param elIDStr
     * @returns {*}
     */
    function parseProjectID(elIDStr) {
      return _.last(elIDStr.split('_'));
    }

    /**
     * Disable all elements on the form
     */
    function disableForm() {
      var inputs       = _domUtils.getQSElementsAsArray(this.getDOMElement(), 'input'),
          selects      = _domUtils.getQSElementsAsArray(this.getDOMElement(), 'select'),
          formElements = inputs.concat(selects);

      formElements.forEach(function (els) {
        els.disabled = true;
      });

    }

    /**
     * Enable all elements on the form
     */
    function enableForm() {
      var inputs       = _domUtils.getQSElementsAsArray(this.getDOMElement(), 'input'),
          selects      = _domUtils.getQSElementsAsArray(this.getDOMElement(), 'select'),
          formElements = inputs.concat(selects);

      formElements.forEach(function (els) {
        els.disabled = false;
      });

    }

    //----------------------------------------------------------------------------
    //  Utility
    //----------------------------------------------------------------------------

    function showAlert(message) {
      _messageBoxIDs.push(TT.view().mbCreator().alert('Alert', message));
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

    exports.initializeCommon             = initializeCommon;
    exports.setAssignmentsModel             = setAssignmentsModel;
    exports.getAssignmentsModel             = getAssignmentsModel;
    exports.updateStateFromProjectsModel = updateStateFromProjectsModel;
    exports.showAlert                    = showAlert;
    exports.closeAllAlerts               = closeAllAlerts;
    exports.buildAssignmentRows             = buildAssignmentRows;
    exports.getAssignmentRows               = getAssignmentRows;
    exports.getAssignmentRowData            = getAssignmentRowData;
    exports.setProjectTitleCellToolTips  = setProjectTitleCellToolTips;
    exports.flashAssignmentRow              = flashAssignmentRow;
    exports.parseProjectID               = parseProjectID;
    exports.disableForm                  = disableForm;
    exports.enableForm                   = enableForm;

  });