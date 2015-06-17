define('TT.View.TimeCardView',
  function (require, module, exports) {

    var _self,
        _columnNames = ['alloc','monday','tuesday','wednesday','thursday','friday'],
        _columnObj = Object.create(null),
        _cardTotal = 0,
        _submitButtonEl,
        _submitButtonLabelEl,
        _domUtils = require('Nudoru.Browser.DOMUtils'),
        _toolTip = require('Nudoru.Component.ToolTipView');

    //--------------------------------------------------------------------------
    // Core
    //--------------------------------------------------------------------------

    function initialize(initObj) {
      _self = this;

      if(!this.isInitialized()) {
        this.setProjectsModel();

        this.initializeSubView(initObj);

        this.setEvents({
          'change #tc_p_table':handleInputChangeEvent,
          'click #tc_btn-submit':handleTimeCardSubmit
        });
      }
    }

    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    function viewDidMount() {
      _submitButtonEl = document.getElementById('tc_btn-submit');
      _submitButtonLabelEl = document.getElementById('tc_btn-submit-label');

      buildFieldList();
      updateColumnSums();
      setProjectToolTips();
    }

    function viewWillUnmount() {
      this.closeAllAlerts();
    }

    //--------------------------------------------------------------------------
    // Custom
    //--------------------------------------------------------------------------

    function buildFieldList() {
      var allInputEls = _self.getDOMElement().querySelectorAll('input');
      var allInputIDs = Array.prototype.slice.call(allInputEls, 0).map(function(el) { return el.getAttribute('id')});

      _columnNames.forEach(function(col, i) {
        _columnObj[col] = Object.create(null);
        _columnObj[col].fieldIDs = allInputIDs.filter(function(id) {
          return id.indexOf(col) > 0;
        });
        _columnObj[col].sumEl = document.getElementById('tc_sum_'+col);
        _columnObj[col].type = i == 0 ? '%' : 'hrs';
      });

    }

    function sumFieldGroup(idList) {
      var sum = 0;
      idList.forEach(function(id) {
        var inputValue = document.getElementById(id).value,
            valueInt = parseFloat(inputValue);
        sum += valueInt || 0;
        if(!valueInt) {
          if(inputValue.length) {
            document.getElementById(id).value = '0';
          }
        }
      });
      return sum;
    }

    function handleInputChangeEvent(evt) {
      //var targetEl = evt.target;
      updateColumnSums();
    }

    function updateColumnSums() {
      _cardTotal = 0;

      for(var col in _columnObj) {
        var sum = sumFieldGroup(_columnObj[col].fieldIDs), isWarn = false;
        if(_columnObj[col].type === 'hrs') {
          _cardTotal += sum;
          if(sum > 9) {
            isWarn = true;
          }
        } else if(_columnObj[col].type === '%') {
          if(sum > 100) {
            isWarn = true;
          }
        }
       _columnObj[col].sumEl.innerHTML = sum + ' '+_columnObj[col].type;

        if(isWarn) {
          _domUtils.addClass(_columnObj[col].sumEl, 'label-warning');
        } else {
          _domUtils.removeClass(_columnObj[col].sumEl, 'label-warning');
        }

      }

      _submitButtonLabelEl.innerHTML = 'Submit '+_cardTotal+' hrs';

      if(_cardTotal > 50) {
        _domUtils.addClass(_submitButtonEl, 'button-warning');
      } else {
        _domUtils.removeClass(_submitButtonEl, 'button-warning');
      }

    }

    function handleTimeCardSubmit() {
      if(_cardTotal < 30) {
        _self.showAlert('Whoa there! '+_cardTotal+' hours doesn\'t seem quite right. Please enter atleast 30 hours to submit.');
        return;
      }
      TT.view().addMessageBox({
        title: 'Success',
        content: 'Your '+_cardTotal+' hours were submitted successfully! Thanks for all you do. +1xp earned.',
        type: 'default',
        modal: true,
        buttons: [
          {
            label: 'Got it',
            id: 'close',
            type: 'positive',
            icon: 'thumbs-up'
          }
        ]
      });
    }

    function setProjectToolTips() {
      var allTrEls = document.querySelectorAll('tr');
      Array.prototype.slice.call(allTrEls, 0).map(function(el) {
        var rowID = el.getAttribute('id');
        if(rowID) {
          if(rowID.indexOf('tc_p_') === 0) {
            var projectID = rowID.split('tc_p_')[1],
                projectDesc = _self.getState().projects[projectID].projectDescription,
                headingCellEl = el.querySelector('th');

            _toolTip.add({title:'', content:projectDesc, position:'R', targetEl: headingCellEl, type:'information', width: 400});
          }
        }

      });
    }

    //--------------------------------------------------------------------------
    // API
    //--------------------------------------------------------------------------

    exports.initialize = initialize;
    exports.viewWillUpdate = viewWillUpdate;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });