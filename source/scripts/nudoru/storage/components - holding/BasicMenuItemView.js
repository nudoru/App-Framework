//----------------------------------------------------------------------------
//  A menu item
//----------------------------------------------------------------------------

define('nudoru.components.BasicMenuItemView',
  function(require, module, exports) {

    var _selected = false,
      _data = null,
      _element = null,
      _iconElement = null,
      _anchorElement = null,
      _iconDeselectedClass = null,
      _iconSelectedClass = null,
      _toggle = null,
      _stringUtils = require('nudoru.utils.StringUtils'),
      _DOMUtils = require('nudoru.utils.DOMUtils'),
      _template = require('nudoru.utils.NTemplate');

    function initialize(idata) {
      _data = idata;

      if(_data.toggle) {
        _toggle = true;
        _iconSelectedClass = 'fa-check';
        _iconDeselectedClass = 'fa-circle-thin';
      }

      _data.label = _stringUtils.toTitleCase(_data.label);

      render();

      _selected = false;
    }

    function render() {
      if(_toggle) {
        _element = _template.asElement('template__menu-item-icon', _data);
      } else {
        _element = _template.asElement('template__menu-item', _data);
      }

      _iconElement = _element.querySelector('i');
      _anchorElement = _element.querySelector('button');
    }

    function getElement() {
      return _element;
    }

    function getLabel() {
      return _data.label;
    }

    function getValue() {
      return _data.value;
    }

    function select() {
      if(_selected || _element === undefined) {
        return;
      }
      _selected = true;

      if(_toggle) {
        _DOMUtils.removeClass(_iconElement, _iconDeselectedClass);
        _DOMUtils.addClass(_iconElement, _iconSelectedClass);
      }
    }

    function showOverEffect() {
      TweenLite.to(_element, 0.1, {backgroundColor:'rgba(255,255,255,.25)', ease:Circ.easeOut});
    }

    function showOutEffect() {
      TweenLite.to(_element, 0.25, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
    }

    function showDepressEffect() {
      var tl = new TimelineLite();
      tl.to(_element,0.1, {scale:0.9, ease: Quad.easeOut});
      tl.to(_element,0.5, {scale:1, ease: Elastic.easeOut});
    }

    function deselect() {
      if(!_selected || _element === undefined) {
        return;
      }
      _selected = false;

      if(_toggle) {
        _DOMUtils.removeClass(_iconElement, _iconSelectedClass);
        _DOMUtils.addClass(_iconElement, _iconDeselectedClass);
      }
    }

    function toggleSelect() {
      if(_selected) {
        deselect();
      } else {
        select();
      }
    }

    exports.initialize = initialize;
    exports.getElement = getElement;
    exports.getLabel = getLabel;
    exports.getValue = getValue;
    exports.select = select;
    exports.showOverEffect = showOverEffect;
    exports.showOutEffect = showOutEffect;
    exports.showDepressEffect = showDepressEffect;
    exports.deselect = deselect;
    exports.toggleSelect = toggleSelect;

  });
