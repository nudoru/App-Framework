define('TT.View.AssignmentsView',
  function (require, module, exports) {

    var _self,
        _prefix        = 'asn_p_',
        _dateFields    = [],
        _removeButtons = [],
        _datePickers   = [],
        _domUtils      = require('Nudoru.Browser.DOMUtils');

    function initialize(initObj) {
      _self = this;
      if (!this.isInitialized()) {
        this.setProjectsModel();
        this.initializeSubView(initObj);
        this.setEvents({
          'change #asn_p_table'  : handleInputChangeEvent,
          'click #asn_btn-addnew': handleAddNewClick
        });
      }
    }

    /**
     * Update from the model
     */
    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    /**
     * Render and set from the DOM elements
     */
    function viewDidMount() {
      this.buildProjectRows(_prefix);
      this.setProjectHeaderRowToolTips(_prefix);
      _dateFields = getDateFieldsList();
      assignRemoveButtonEvents();
      assignDatePickers();
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


    /**
     * Update sums, data when a field changes and looses focus
     * @param evt
     */
    function handleInputChangeEvent(evt) {
      _self.flashProjectRow(evt.target.getAttribute('id'));

      // DEBUG
      console.log(_self.getProjectRowData(_prefix));
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
          addNewAssignment(project.selection);
        },
        true);
    }

    /**
     * Add a new assignment to the current user
     * @param projectID
     */
    function addNewAssignment(projectID) {
      if (!projectID) {
        return;
      }
      var projectTitle = TT.model().getProjectMapForID(projectID).get('title');
      _self.showAlert('If this was implemented, I\'d add the project ' + projectTitle);
    }

    /**
     * Remove an assignment from the current user
     * @param projectID
     */
    function promptToRemoveProject(projectID) {
      var projectTitle = TT.model().getProjectMapForID(projectID).get('title');
      TT.view().mbCreator().confirm('Are you sure?',
        'Archiving the entered data for <strong>' + projectTitle + '</strong> will remove it from your active list. You will no longer be able to enter time against it or see it on your forecast view.<br><br>Ready to archive this assignment?',
        function () {
          handleArchiveProject(projectID);
        },
        true);
    }

    function handleArchiveProject(projectID) {
      var projectTitle = TT.model().getProjectMapForID(projectID).get('title');
      _self.showAlert('If this was implemented, I\'d remove the project ' + projectTitle);
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
              promptToRemoveProject(projectIDs[i]);
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
          field: el,
          format: 'l',
          disableWeekends: true,
          onSelect       : function() {
            //el.value = picker.toString();
            el.value = picker.getMoment().format('l')
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
    exports.viewDidMount    = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });