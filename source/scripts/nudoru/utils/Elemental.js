/**
 * Playing with a DOM helper kinda like React.js
 *
 * refnerence
 * https://scotch.io/tutorials/learning-react-getting-started-and-concepts
 *
 */

var Elemental = (function () {

  var _elements = [],
    _classes = [],
    _components = [];


  function newElement(mount, id, html, state) {
    var elmnt = requireUnique('ElementalElement');
    elmnt.create(mount,id,html,state);
    _elements[id] = elmnt;
    return elmnt;
  }

  return {
    newElement: newElement
  };

}());

define('ElementalElement',
  function (require, module, exports) {

    var _id,
      _html,
      _DOMElement,
      _mountPoint,
      _initialState,
      _currentState,
      _willRenderCB,
      _didRenderCB,
      _willMountCB,
      _didMountCB,
      _willUnMountCB,
      _didUnMountCB,
      _template = require('com.nudoru.NTempate');

    function setWillRender(cb) {
      _willRenderCB = cb;
    }

    function setDidRender(cb) {
      _didRenderCB = cb;
    }

    function setWillMount(cb) {
      _willMountCB = cb;
    }

    function setDidMount(cb) {
      _didMountCB = cb;
    }

    function setWillUnMount(cb) {
      _willUnMountCB = cb;
    }

    function setDidUnMount(cb) {
      _didUnMountCB = cb;
    }

    function create(mount, id, html, state) {
      _mountPoint = mount;
      _id = id;
      _html = html;
      _initialState = _currentState = state;
    }

    function isHTMLCode(str) {
       return (str.charAt(0) === '<')
    }

    function validateElement() {
      if(!_DOMElement) {
        throw new Error('Elemental: Element not created');
      }

      return true;
    }

    function render(state) {
      _currentState = state || _initialState;
      exeuteCB(_willRenderCB);
      unmount();

      // if it's HTML, need to get template from ntemplate
      // should ntemplate cache raw html?
      // convert html to dom

      exeuteCB(_didRenderCB);
      mount();
      return _DOMElement;
    }

    function mount() {
      validateElement();
      exeuteCB(_willMountCB);
      // do it
      exeuteCB(_didMountCB);
    }

    function unmount() {
      validateElement();
      exeuteCB(_willUnMountCB);
      // do it
      exeuteCB(_didUnMountCB);
    }

    function exeuteCB(cb) {
      if(!cb) return;
      cb.apply(this,[_id,_currentState]);
    }

    exports.create = create;
    exports.render = render;
    exports.setWillRender = setWillRender;
    exports.setDidRender = setDidRender;

  });

/*
define('ElementalClass',
  function (require, module, exports) {

    var _id,
      _html,
      _DOMElement,
      _mountPoint,
      _initialState,
      _currentState,
      _willRenderCB,
      _didRenderCB,
      _willMountCB,
      _didMountCB,
      _willUnMountCB,
      _didUnMountCB,
      _template = require('com.nudoru.NTempate');

    function create(srcObj) {

    }

  });

define('ElementalComponent',
  function (require, module, exports) {
    //
  });
*/