/**
 * A template for a subview/route controller
 */

define('APP.View.ControlsTestingSubView',
  function (require, module, exports) {

    var _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _initialState,
      _currentState,
      _domUtils = require('nudoru.utils.DOMUtils'),
      _lIpsum = require('nudoru.utils.NLorem'),
      _toolTip = require('nudoru.components.ToolTipView'),
      _actionOneEl,
      _actionTwoEl,
      _actionThreeEl,
      _actionFourEl;

    function initialize(initObj) {
      console.log(initObj.id + ', subview init');

      console.log('subview state',initObj.state);

      if(!_initObj) {
        _initObj = initObj;
        _id = initObj.id;
        _templateObj = initObj.template;
        _initialState = _currentState = initObj.state;

        _lIpsum.initialize();

        render();
      } else {
        console.log(_id + ', subview already init\'d');
        update(initObj.state);
      }
    }

    function update(state) {
      console.log(_id + ', subview update');
      _currentState = state;
      return render();
    }

    function render() {
      console.log(_id + ', subview render');

      _html = _templateObj(_currentState);
      _DOMElement = _domUtils.HTMLStrToNode(_html);

      return _DOMElement;
    }

    function viewDidMount() {
      console.log(_id + ', subview did mount');

      _actionOneEl = document.getElementById('action-one');
      _actionTwoEl = document.getElementById('action-two');
      _actionThreeEl = document.getElementById('action-three');
      _actionFourEl = document.getElementById('action-four');

      //_toolTip.add({title:'', content:"This is a button, it's purpose is unknown.", position:'TR', targetEl: _actionFourEl, type:'information'});
      //_toolTip.add({title:'', content:"This is a button, click it and rainbows will appear.", position:'BR', targetEl: _actionFourEl, type:'success'});
      //_toolTip.add({title:'', content:"This is a button, it doesn't make a sound.", position:'BL', targetEl: _actionFourEl, type:'warning'});
      //_toolTip.add({title:'', content:"This is a button, behold the magic and mystery.", position:'TL', targetEl: _actionFourEl, type:'danger'});

      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. ", position:'L', targetEl: _actionFourEl, type:'information'});
      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. ", position:'B', targetEl: _actionFourEl, type:'information'});
      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ", position:'R', targetEl: _actionFourEl, type:'information'});
      _toolTip.add({title:'', content:"This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. This is a button, you click it dummy. ", position:'T', targetEl: _actionFourEl, type:'information'});


      _actionOneEl.addEventListener('click', function actOne(e) {
        APP.view().addMessageBox({
          title: _lIpsum.getSentence(2,4),
          content: _lIpsum.getParagraph(2, 4),
          type: 'default',
          modal: true,
          width: 200
        });
      });

      _actionTwoEl.addEventListener('click', function actTwo(e) {
        APP.view().addMessageBox({
          title: _lIpsum.getSentence(10,20),
          content: _lIpsum.getParagraph(2, 4),
          type: 'default',
          modal: false,
          buttons: [
            {
              label: 'Yes',
              id: 'yes',
              type: 'default',
              icon: 'check',
              onClick: function() {
                console.log('yes');
              }
            },
            {
              label: 'Maybe',
              id: 'maybe',
              type: 'positive',
              icon:'cog',
              onClick: function() {
                console.log('maybe');
              }
            },
            {
              label: 'Nope',
              id: 'nope',
              type: 'negative',
              icon: 'times'
            },
            {
              label: 'WTF',
              id: 'neutral',
              type: 'neutral',
              onClick: function() {
                console.log('neutral');
              }
            }
          ]
        });
      });

      _actionThreeEl.addEventListener('click', function actThree(e) {
        APP.view().addNotification({
          title: _lIpsum.getSentence(3,6),
          type: 'information',
          content: _lIpsum.getParagraph(1, 2)
        });

        _toolTip.remove(_actionFourEl);
      });

      _actionFourEl.addEventListener('click', function actFour(e) {
        console.log('Four');
      });
      
    }

    function viewWillUnMount() {
      console.log(_id + ', subview will unmount');
    }

    function getID() {
      return _id;
    }

    function getDOMElement() {
      return _DOMElement;
    }

    exports.initialize = initialize;
    exports.update = update;
    exports.render = render;
    exports.getID = getID;
    exports.getDOMElement = getDOMElement;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnMount = viewWillUnMount;

  });