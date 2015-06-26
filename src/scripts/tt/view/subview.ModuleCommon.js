/**
 * This module defines common functionality that Assignments, Time Card and
 * Capacity Forecast share
 */

define('TT.View.ModuleCommon',
  function (require, module, exports) {

    var _messageBoxIDs = [],
        _myProjectsModel,
        _projectRows   = [],
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

      _myProjectsModel.forEach(function (project) {
        obj.projects[project.get('projectID')] = {
          projectTitle      : project.get('projectTitle'),
          projectID         : project.get('projectID'),
          projectDescription: project.get('projectDescription'),
          role              : project.get('role'),
          startDate         : project.get('startDate'),
          endData           : project.get('endDate')
        };
      });

      // TEST
      obj.calendar = {
        currentYear   : '2015',
        currentWeekNum: '12',
        currentWeek   : 'June 15-June 19'
      };

      this.setState(obj);
    }

    /**
     * Build an array of table > tr's that pertain to project data
     * @param prefix For timecard: 'tc_p_', for assignments: 'asn_p_'
     */
    function buildProjectRows(prefix) {
      _projectRows = _domUtils.getQSElementsAsArray(this.getDOMElement(), 'tr').filter(function (row) {
        var rowid = row.getAttribute('id');
        if (!rowid) {
          return false;
        }
        return rowid.indexOf(prefix) === 0;
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
      var packet = Object.create(null),
          arry   = [];
      this.getProjectRows().forEach(function (row) {
        var id  = row.getAttribute('id').split('tc_p_')[1],
            obj = Object.create(null);
        obj[id] = _domUtils.captureFormData(row);
        arry.push(obj);
      });

      packet.year      = this.getState().calendar.currentYear;
      packet.weekNum   = this.getState().calendar.currentWeekNum;
      packet.inputData = arry;

      return packet;
    }

    /**
     * Set tool tips to display on hover of project name
     */
    function setProjectHeaderRowToolTips(prefix) {
      var state = this.getState();
      this.getProjectRows().forEach(function (el) {
        var projectID     = el.getAttribute('id').split(prefix)[1],
            headingCellEl = el.querySelector('th');

        _toolTip.add({
          title   : '',
          content : state.projects[projectID].projectDescription,
          position: 'B',
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
    function flashProjectRow(elIDStr) {
      var row, animTimeLine;

      elIDStr = parseProjectID(elIDStr);

      row = this.getProjectRows().filter(function (rowEl) {
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
    exports.setProjectsModel             = setProjectsModel;
    exports.getProjectsModel             = getProjectsModel;
    exports.updateStateFromProjectsModel = updateStateFromProjectsModel;
    exports.showAlert                    = showAlert;
    exports.closeAllAlerts               = closeAllAlerts;
    exports.buildProjectRows             = buildProjectRows;
    exports.getProjectRows               = getProjectRows;
    exports.getProjectRowData            = getProjectRowData;
    exports.setProjectHeaderRowToolTips  = setProjectHeaderRowToolTips;
    exports.flashProjectRow              = flashProjectRow;
    exports.parseProjectID               = parseProjectID;
    exports.disableForm                  = disableForm;
    exports.enableForm                   = enableForm;

  });