/**
 * Playing with a DOM helper kinda sorta like React.js
 *
 * Started 4/20/15 Matt Perkins
 * last updated 4/21
 *
 * Dependencies - Underscore (templates)
 *
 * Completely untested and inprogress
 *
 * Ref
 * https://scotch.io/tutorials/learning-react-getting-started-and-concepts
 *
 */

var Elemental = (function () {

  var _initialized = false,
    _templateHTMLMap = Object.create(null),
    _templateObjectMap = Object.create(null),
    _elements = [],
    _collections = [];

  function initialize() {
    if(_initialized) {
      return;
    }

    _initialized = true;

    buildTemplateHTMLMap();
    buildTemplateObjectMap();
  }

  function buildTemplateHTMLMap() {
    var els = getAllTemplateElements();
    els.forEach(function(el) {
      console.log();
      _templateHTMLMap[el.getAttribute('id')] = el.innerHTML;
    });
  }

  /**
   * Scans the HTML source for <script id="blah" type="text/template">
   */
  function getAllTemplateElements() {
    var allElsWithType = Array.prototype.slice.call(document.querySelectorAll('[type]'));
      matchingEls = [];
    allElsWithType.forEach(function(el) {
      if(el.getAttribute('type') === 'text/template') {
        matchingEls.push(el)
      }
    });
    return matchingEls;
  }

  function buildTemplateObjectMap() {
    for(var id in _templateHTMLMap) {
      _templateObjectMap[id] = _.template(_templateHTMLMap[id]);
    }
  }

  function getTemplateObjByID(id) {
    return _templateObjectMap[id];
  }

  function newElement(initObj) {
    if(!_initialized) {
      initialize();
    }

    var element = requireUnique('ElementalElement');
    element.create(initObj);
    _elements[initObj.id] = element;
    return element;
  }

  function newCollection(initObj) {
    if(!_initialized) {
      initialize();
    }

    var collection = requireUnique('ElementalCollection');
    collection.create(initObj);
    _collections[initObj.id] = collection;
    return collection;
  }

  return {
    initialize: initialize,
    getTemplateObjByID: getTemplateObjByID,
    newElement: newElement,
    newCollection: newCollection
  };

}());

define('ElementalCollection',
  function (require, module, exports) {

    var _initObj,
      _id,
      _mountPoint,
      _children = [];

    function create(initObj) {
      _initObj = initObj;
      _id = _initObj.id;
      _mountPoint = initObj.mount;
    }

    function getChildren() {
      return _children;
    }

    function getChildByID(id) {
      var i = 0,
          len = _children.length;

      for(;i<len;i++) {
        if(_children[i].getID() === id) {
          return _children[i];
        }
      }

      return null;
    }

    function getChildIndexByID(id) {
      var i = 0,
        len = _children.length;

      for(;i<len;i++) {
        if(_children[i].getID() === id) {
          return i;
        }
      }

      return -1;
    }

    // TODO check if it's already a child element and move it to the front
    function prependChild(elElmnt) {
      _children.push(elElmnt);
      _mountPoint.insertBefore(elElmnt.getElement(), _mountPoint.firstChild);
    }

    // TODO check if it's already a child element and move it to the end
    function appendChild(elElmnt) {
      _children.push(elElmnt);
      _mountPoint.appendChild(elElmnt.getElement());
    }

    function removeChild(elElmnt) {
      var idx = _children.indexOf(elElmnt);
      elElmnt.unmount();
      _children.splice(idx, 1);
    }

    exports.create = create;
    exports.prependChild = prependChild;
    exports.appendChild = appendChild;
    exports.removeChild = removeChild;
    exports.getChildren = getChildren;
    exports.getChildByID = getChildByID;

  });

define('ElementalElement',
  function (require, module, exports) {

    var _initObj,
        _id,
        _html,
        _templateID,
        _templateObj,
        _DOMElement,
        _mountPoint,
        _initialState,
        _currentState,
        _willRenderCB,
        _didRenderCB,
        _willMountCB,
        _didMountCB,
        _willUnMountCB,
        _didUnMountCB;

    function create(initObj) {
      _initObj = initObj;
      _mountPoint = initObj.mount;
      _id = initObj.id;
      _html = initObj.html;
      _templateID = initObj.template;
      _initialState = _currentState = initObj.state;
      _willRenderCB = initObj.willRender;
      _didRenderCB = initObj.didRender;
      _willMountCB = initObj.willMount;
      _didMountCB = initObj.didMount;
      _willUnMountCB = initObj.willUnMount;
      _didUnMountCB = initObj.didUnMount;

      if(_templateID) {
        _templateObj = Elemental.getTemplateObjByID(_id);
      } else {
        _templateObj = _.template(_html);
      }
    }

    function update(state) {
      _currentState = state;
    }

    function render() {
      unmount();
      exeuteCB(_willRenderCB);
      _DOMElement = _templateObj(_currentState);
      exeuteCB(_didRenderCB);
      mount();
      return _DOMElement;
    }

    function mount() {
      validateElement();
      exeuteCB(_willMountCB);
      _mountPoint.appendChild(_DOMElement);
      exeuteCB(_didMountCB);
    }

    function unmount() {
      validateElement();
      exeuteCB(_willUnMountCB);
      _mountPoint.removeChild(_DOMElement);
      exeuteCB(_didUnMountCB);
    }

    function getID() {
      return _id;
    }

    function getDOMElement() {
      return _DOMElement;
    }

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

    function validateElement() {
      if(!_DOMElement) {
        throw new Error('Elemental: Element not created');
      }

      return true;
    }

    function exeuteCB(cb) {
      if(!cb) {
        return;
      }
      cb.apply(this,[_DOMElement, _id, _currentState]);
    }

    exports.create = create;
    exports.update = update;
    exports.render = render;
    exports.mount = mount;
    exports.unmount = unmount;
    exports.getID = getID;
    exports.getDOMElement = getDOMElement;
    exports.setWillRender = setWillRender;
    exports.setDidRender = setDidRender;
    exports.setWillMount = setWillMount;
    exports.setDidMount = setDidMount;
    exports.setWillUnMount = setWillUnMount;
    exports.setDidUnMount = setDidUnMount;

  });