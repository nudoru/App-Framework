/**
 * Created by matt on 7/9/15
 * last updated 7/9/15
 */

define('nudoru/component/CoachMarksView',
  function (require, module, exports) {

    var _counter           = 1,
        _markedObjects     = [],
        _gutter            = 5,
        _labelWidth        = 250,
        _mountPoint,
        _modalCloseSubscriber,
        _shapeTemplateHTML = '<div id="#js__coachmark-shape-<%= id%>" class="coachmark__shape-<%= props.shape%>"></div>',
        _shapeTemplate,
        _toolTip           = require('nudoru/component/ToolTipView'),
        _modal             = require('nudoru/component/ModalCoverView'),
        _domUtils          = require('nudoru/browser/DOMUtils'),
        _dispatcher        = require('nudoru/component/Dispatcher'),
        _componentEvents   = require('nudoru/component/ComponentEvents');

    function initialize(elID) {
      _mountPoint    = document.getElementById(elID);
      _shapeTemplate = _.template(_shapeTemplateHTML);
    }

    function outlineElement(selector, props) {
      _markedObjects.push({
        targetSelector: selector,
        id            : _counter++,
        shape         : null,
        label         : null,
        props         : props
      });
    }

    function renderMarkedObjects() {
      _markedObjects.forEach(function (object, i) {
        var el      = document.querySelector(object.targetSelector),
            elProps = el.getBoundingClientRect(),
            shape   = _domUtils.HTMLStrToNode(_shapeTemplate(object)),
            tooltip;

        object.shape = shape;

        _mountPoint.appendChild(object.shape);

        TweenLite.set(object.shape, {
          alpha : 0,
          x     : elProps.left - _gutter,
          y     : elProps.top - _gutter,
          width : object.props.width || elProps.width + (_gutter * 2),
          height: object.props.height || elProps.height + (_gutter * 2)
        });

        tooltip = _toolTip.add({
          title        : '',
          content      : object.props.label,
          position     : object.props.labelPosition,
          targetEl     : object.shape,
          width        : object.props.labelWidth || _labelWidth,
          gutter       : 3,
          alwaysVisible: true,
          type         : 'coachmark'
        });

        TweenLite.set(tooltip, {alpha:0});

        TweenLite.to([tooltip, object.shape], 1, {
          alpha: 1,
          ease : Quad.easeOut,
          delay: 0.5 * i
        });

      });
    }

    function show() {
      _modalCloseSubscriber = _dispatcher.subscribe(_componentEvents.MODAL_COVER_HIDE, hide);
      _modal.show(true);
      _modal.setOpacity(0.25);
      renderMarkedObjects();
    }

    /**
     * Hide triggered by clicking on the modal mask or the modal close button
     */
    function hide() {
      _modal.hide(true);
      _modalCloseSubscriber.dispose();
      _modalCloseSubscriber = null;

      _markedObjects.forEach(function (object) {
        TweenLite.killDelayedCallsTo(object.shape);
        _toolTip.remove(object.shape);
        _mountPoint.removeChild(object.shape);
        delete object.shape;
      });
    }

    module.exports.initialize     = initialize;
    module.exports.outlineElement = outlineElement;
    module.exports.show           = show;
    module.exports.hide           = hide;

  });