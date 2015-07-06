define('TT.View.AssignmentsView',
  function (require, module, exports) {

    var _self,
        _prefix        = 'asn_p_',
        _dateFields    = [],
        _removeButtons = [],
        _datePickers   = [],
        _domUtils      = require('Nudoru.Browser.DOMUtils'),
        _ttEvents      = require('TT.Events.TTEventCreator');

    function initialize(initObj) {
      _self = this;
      if (!this.isInitialized()) {
        this.setAssignmentsModel();
        this.initializeSubView(initObj);
        this.setEvents({
          'change #asn_p_table'  : handleInputChangeEvent,
          'click #asn_btn-addnew': handleAddNewClick
        });
        TT.registerViewForModelChanges('currentUserAssignments',this.getID());
      }
    }

    /**
     * Update from the model
     */
    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    /**
     * When state updates, trigger rerender only if the number of assignments change
     * @param previousState
     * @returns {boolean}
     */
    function viewShouldRender(previousState) {
      var prevNumAssignments = Object.keys(previousState.assignments).length,
          newNumAssignments = Object.keys(this.getState().assignments).length;

      return prevNumAssignments !== newNumAssignments;
    }

    /**
     * Render and set from the DOM elements
     */
    function viewDidMount() {
      this.buildAssignmentRows(_prefix);
      this.setProjectTitleCellToolTips(_prefix);
      _dateFields = getDateFieldsList();
      assignRemoveButtonEvents();
      assignDatePickers();

      populateFormData();

      if(this.getAssignmentRows().length === 0) {
        this.showAlert('You don\'t have any active assignments. Click on the <strong>Add New Assignment</strong> button to add them.');
      }
    }

    /**
     * View is going away, remove anything that it created: Cleanup
     */
    function viewWillUnmount() {
      this.closeAllAlerts();

      _removeButtons.forEach(function (buttonObj) {
        buttonObj.subscriber.dispose();
      });

      _removeButtons = [];
    }

    //--------------------------------------------------------------------------
    // Custom
    //--------------------------------------------------------------------------

    function populateFormData() {
      var assignments = _self.getState().assignments,
        assignmentIDs = Object.keys(assignments);

      assignmentIDs.forEach(function(aid) {
        var assignment = assignments[aid];
        document.getElementById('asn_p_start_'+aid).value = assignment.startDate;
        document.getElementById('asn_p_end_'+aid).value = assignment.endDate;
        document.getElementById('asn_p_role_'+aid).value = assignment.role;
        document.getElementById('asn_p_alloc_'+aid).value = assignment.allocation;
      });
    }

    /**
     * Update sums, data when a field changes and looses focus
     * @param evt
     */
    function handleInputChangeEvent(evt) {
      _self.flashAssignmentRow(evt.target.getAttribute('id'));

      _ttEvents.updateAssignments(_self.getAssignmentRowData(_prefix));
    }

    /**
     * Add a new project to the list
     */
    function handleAddNewClick() {
      var projects = TT.model().getProjectsAndIDList();

      TT.view().mbCreator().choice('Add Project',
        'Select a new project to add to your active list and click Proceed',
        projects,
        function (project) {
          _ttEvents.addAssignment(project.selection);
        },
        true);
    }

    /**
     * Remove an assignment from the current user
     * @param assignmentID
     */
    function promptToRemoveAssignment(assignmentID) {
      var projectTitle = TT.model().getAssignmentMapForID(assignmentID).get('projectTitle');
      TT.view().mbCreator().confirm('Are you sure?',
        'Archiving the entered data for <strong>' + projectTitle + '</strong> will remove it from your active list. You will no longer be able to enter time against it or see it on your forecast view.<br><br>Ready to archive this assignment?',
        function () {
          _ttEvents.archiveAssignment(assignmentID);
        },
        true);
    }

    /**
     * Build a list of all start and end date input fields
     */
    function getDateFieldsList() {
      return _domUtils.getQSElementsAsArray(_self.getDOMElement(), 'input').filter(function (inputEl) {
        var id = inputEl.getAttribute('id');
        if (!id) {
          return false;
        }
        return id.indexOf('start') > 0 || id.indexOf('end') > 0;
      });
    }

    /**
     * Configure the remove buttons
     */
    function assignRemoveButtonEvents() {
      var buttons    = _domUtils.getQSElementsAsArray(_self.getDOMElement(), 'button').filter(function (inputEl) {
            var id = inputEl.getAttribute('id');
            if (!id) {
              return false;
            }
            return id.indexOf('removebtn') > 0;
          }),
          projectIDs = buttons.map(function (buttonEl) {
            return _.last(buttonEl.getAttribute('id').split('_'));
          });

      buttons.forEach(function (buttonEl, i) {
        _removeButtons.push({
          buttonEl  : buttonEl,
          projectID : projectIDs[i],
          subscriber: Rx.Observable.fromEvent(buttonEl, 'click').subscribe(
            function () {
              promptToRemoveAssignment(projectIDs[i]);
            }
          )
        });
      });

    }

    /**
     * Create and assign Pikaday picker instances to all of the start and end date fields
     * See docs https://github.com/dbushell/Pikaday
     * Refer to momentjs formatting http://momentjs.com
     */
    function assignDatePickers() {
      _dateFields.forEach(function (el) {
        var picker = new Pikaday({
          field          : el,
          format         : 'l',
          disableWeekends: true,
          minDate        : new Date(2014, 0, 1), // Jan 1, 2014
          onSelect       : function () {
            //el.value = picker.toString();
            el.value = picker.getMoment().format('l');
          }
        });
        //el.parentNode.insertBefore(picker.el, el.nextSibling);
        _datePickers.push(picker);
      });
    }

    function showNotImplementedWarning() {
      _self.showAlert('This doesn\'t work yet');
    }

    //--------------------------------------------------------------------------
    // API
    //--------------------------------------------------------------------------

    exports.initialize      = initialize;
    exports.viewWillUpdate  = viewWillUpdate;
    exports.viewShouldRender = viewShouldRender;
    exports.viewDidMount    = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });