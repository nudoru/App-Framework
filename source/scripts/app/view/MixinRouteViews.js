define('APP.View.MixinRouteViews',
  function (require, module, exports) {

    var _template = require('nudoru.utils.NTemplate'),
      _subViewMountPoint,
      _subViewMapping = Object.create(null),
      _currentSubView,
      _subViewHTMLTemplatePrefix = 'template__',
      _appEvents = require('APP.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _eventDispatcher = APP.eventDispatcher();

    function setSubViewMountPoint(elID) {
      _subViewMountPoint = document.getElementById(elID);
    }

    function getTemplate() {
      return _template;
    }

    function mapView(templateID, controller, unique) {
      _subViewMapping[templateID] = {
        htmlTemplate: _template.getTemplate(_subViewHTMLTemplatePrefix + templateID),
        controller: unique ? requireUnique(controller) : require(controller)
      };
    }

    function showView(viewObj) {
      if(!_subViewMountPoint) {
        throw new Error('No subview mount point set');
      }

      var subview = _subViewMapping[viewObj.templateID];

      if (subview) {
        unMountCurrentSubView();
      } else {
        throw new Error('No subview mapped for route: ' + viewObj.route + ' > ' + viewObj.templateID);
      }

      _domUtils.removeAllElements(_subViewMountPoint);

      subview.controller.initialize({
        id: viewObj.templateID,
        template: subview.htmlTemplate,
        state: {}
      });

      _subViewMountPoint.appendChild(subview.controller.getDOMElement());
      _currentSubView = viewObj.templateID;
      _eventDispatcher.publish(_appEvents.VIEW_CHANGED, viewObj.templateID);
    }

    function unMountCurrentSubView() {
      if (_currentSubView) {
        var subViewController = _subViewMapping[_currentSubView].controller;
        if (subViewController.willUnMount) {
          subViewController.willUnMount();
        }
        _currentSubView = '';
      }
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.setSubViewMountPoint = setSubViewMountPoint;
    exports.template = getTemplate;
    exports.mapView = mapView;
    exports.showView = showView;

  });