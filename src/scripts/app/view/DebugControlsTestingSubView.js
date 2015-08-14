/**
 * A template for a subview/route controller
 */

define('app/view/DebugControlsTestingSubView',
  function (require, module, exports) {

    var _lIpsum            = require('nudoru/browser/NLorem'),
        _toolTip           = require('nudoru/component/ToolTipView'),
        _appEventConstants = require('nori/events/EventConstants'),
        _actionOneEl,
        _actionTwoEl,
        _actionThreeEl,
        _actionFourEl,
        _actionFiveEl,
        _actionSixEl;

    function initialize(initObj) {
      if (!this.isInitialized()) {
        _lIpsum.initialize();
        this.initializeComponent(initObj);
      }
    }


    function viewDidMount() {
      console.log(this.getID() + ', subview did mount');

      _actionOneEl   = document.getElementById('action-one');
      _actionTwoEl   = document.getElementById('action-two');
      _actionThreeEl = document.getElementById('action-three');
      _actionFourEl  = document.getElementById('action-four');
      _actionFiveEl  = document.getElementById('action-five');
      _actionSixEl   = document.getElementById('action-six');

      //_toolTip.add({title:'', content:"This is a button, it's purpose is unknown.", position:'TR', targetEl: _actionFourEl, type:'information'});
      //_toolTip.add({title:'', content:"This is a button, click it and rainbows will appear.", position:'BR', targetEl: _actionFourEl, type:'success'});
      //_toolTip.add({title:'', content:"This is a button, it doesn't make a sound.", position:'BL', targetEl: _actionFourEl, type:'warning'});
      //_toolTip.add({title:'', content:"This is a button, behold the magic and mystery.", position:'TL', targetEl: _actionFourEl, type:'danger'});

      _toolTip.add({
        title   : '',
        content : "This is a button, you click it dummy. This is a button, you click it dummy. ",
        position: 'L',
        targetEl: _actionFourEl,
        type    : 'information'
      });
      _toolTip.add({
        title   : '',
        content : "This is a button, you click it dummy. This is a button, you click it dummy. ",
        position: 'B',
        targetEl: _actionFourEl,
        type    : 'information'
      });
      _toolTip.add({
        title   : '',
        content : "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
        position: 'R',
        targetEl: _actionFourEl,
        type    : 'information'
      });
      _toolTip.add({
        title   : '',
        content : "This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ",
        position: 'T',
        targetEl: _actionFourEl,
        type    : 'information'
      });


      _actionOneEl.addEventListener('click', function actOne(e) {
        Nori.view().addMessageBox({
          title  : _lIpsum.getSentence(2, 4),
          content: _lIpsum.getParagraph(2, 4),
          type   : 'warning',
          modal  : true,
          width  : 500
        });
      });

      _actionTwoEl.addEventListener('click', function actTwo(e) {
        Nori.view().addMessageBox({
          title  : _lIpsum.getSentence(10, 20),
          content: _lIpsum.getParagraph(2, 4),
          type   : 'default',
          modal  : false,
          buttons: [
            {
              label  : 'Yes',
              id     : 'yes',
              type   : 'default',
              icon   : 'check',
              onClick: function () {
                console.log('yes');
              }
            },
            {
              label  : 'Maybe',
              id     : 'maybe',
              type   : 'positive',
              icon   : 'cog',
              onClick: function () {
                console.log('maybe');
              }
            },
            {
              label: 'Nope',
              id   : 'nope',
              type : 'negative',
              icon : 'times'
            }
          ]
        });
      });

      _actionThreeEl.addEventListener('click', function actThree(e) {
        Nori.view().addNotification({
          title  : _lIpsum.getSentence(3, 6),
          type   : 'information',
          content: _lIpsum.getParagraph(1, 2)
        });

        _toolTip.remove(_actionFourEl);
      });

      _actionFourEl.addEventListener('click', function actFour(e) {
        console.log('Four');
      });

      _actionFiveEl.addEventListener('click', function actFour(e) {
        Nori.dispatcher().publish({
          type   : _appEventConstants.CHANGE_ROUTE,
          payload: {
            route: '/one',
            data : {prop: 'some data', moar: '25'}
          }
        });
      });

      _actionSixEl.addEventListener('click', function actFour(e) {
        Nori.dispatcher().publish({
          type   : _appEventConstants.CHANGE_ROUTE,
          payload: {route: '/styles', data:'test'}
        });
      });

    }

    module.exports.initialize   = initialize;
    module.exports.viewDidMount = viewDidMount;

  });