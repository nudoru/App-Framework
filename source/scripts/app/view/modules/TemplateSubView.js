/**
 * A template for a subview/route controller
 */

define('APP.View.TemplateSubView',
  function (require, module, exports) {

    var _initObj,
      _id,
      _templateObj,
      _html,
      _DOMElement,
      _initialState,
      _currentState,
      _domUtils = require('nudoru.utils.DOMUtils');

    function initialize(initObj) {
      _initObj = initObj;
      _id = initObj.id;
      _templateObj = initObj.template;
      _initialState = _currentState = initObj.state;

      render();
    }

    function update(state) {
      _currentState = state;
      return render();
    }

    function render() {
      console.log(_id + ', subview render');

      _html = _templateObj(_currentState);
      _DOMElement = _domUtils.HTMLStrToNode(_html);
      return _DOMElement;
    }

    function willUnMount() {
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
    exports.willUnMount = willUnMount;

  });