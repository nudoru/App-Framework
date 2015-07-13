define('TT.View.AssignmentsView',
  function (require, module, exports) {

    var _self,
        _prefix        = 'asn_p_',
        _columnNames = ['alloc'],
        _columnObj   = Object.create(null),
        _dateFields    = [],
        _removeButtons = [],
        _datePickers   = [],
        _domUtils      = require('Nudoru.Browser.DOMUtils'),
        _ttEvents      = require('TT.Events.TTEventCreator');

    function initialize(initObj) {
      _self = this;
      if (!this.isInitialized()) {
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

      buildColumnFieldsObject();
      updateColumnSums();

      if(this.getAssignmentRows().length === 0) {
        this.showAlert('You don\'t have any active assignments. Click on the <strong>Add New Assignment</strong> button to add them.');
      }
    }

    /**
     * View is going away, remove anything that it created: Cleanup
     */
    function viewWillUnmount() {
      this.closeAllAlerts();

      this.removeProjectTitleCellToolTips();

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
      updateColumnSums();

      _ttEvents.updateAssignments(_self.getAssignmentRowData(_prefix));
    }

    /**
     * Add a new project to the list
     */
    function handleAddNewClick() {
      var projects = TT.model().getNonAssignedProjectsAndIDList();

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

    /**
     * Build an array of all of the form fields on the screen
     */
    function buildColumnFieldsObject() {
      var allInputEls = _self.getDOMElement().querySelectorAll('input');
      var allInputIDs = Array.prototype.slice.call(allInputEls, 0).map(function (el) {
        return el.getAttribute('id');
      });

      _columnNames.forEach(function (col, i) {
        _columnObj[col]          = Object.create(null);
        _columnObj[col].fieldIDs = allInputIDs.filter(function (id) {
          return id.indexOf(col) > 0;
        });
        _columnObj[col].sumEl    = document.getElementById('asn_sum_' + col);
        // The first column is the allocation column
        _columnObj[col].type = i === 0 ? '%' : 'hrs';
      });

    }

    /**
     * Get a sum for a column of input fields
     * If the field has a NaN value, set it to 0
     * If it's ok, set the field to the parsed value, '6t' => '6'
     * @param idList
     * @returns {number}
     */
    function sumFieldGroup(idList) {
      var sum = 0;
      idList.forEach(function (id) {
        var inputValue = document.getElementById(id).value,
            valueFloat = parseFloat(inputValue);
        sum += valueFloat || 0;
        if (!valueFloat) {
          if (inputValue.length) {
            document.getElementById(id).value = '0';
          }
        } else {
          document.getElementById(id).value = valueFloat;
        }

      });
      return sum;
    }

    /**
     * Itterate over the columns and sum them all
     */
    function updateColumnSums() {
      _cardTotal = 0;

      for (var col in _columnObj) {
        var sum = sumFieldGroup(_columnObj[col].fieldIDs), isWarn = false;
        if (_columnObj[col].type === '%') {
          if (sum > 100) {
            isWarn = true;
          }
        }
        _columnObj[col].sumEl.innerHTML = sum + ' ' + _columnObj[col].type;

        if (isWarn) {
          _domUtils.addClass(_columnObj[col].sumEl, 'label-warning');
        } else {
          _domUtils.removeClass(_columnObj[col].sumEl, 'label-warning');
        }

      }

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