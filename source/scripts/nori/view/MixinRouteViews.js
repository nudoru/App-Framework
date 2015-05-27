define('Nori.View.MixinRouteViews',
  function (require, module, exports) {

    var _template = require('nudoru.utils.NTemplate'),
      _subViewMountPoint,
      _subViewMapping = Object.create(null),
      _currentSubView,
      _baseSubViewModuleID = 'Nori.View.BaseSubView',
      _subViewHTMLTemplatePrefix = 'template__',
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('nudoru.utils.DOMUtils'),
      _emitter = require('nudoru.events.Emitter');

    /**
     * Set the location for the view to append, any contents will be removed prior
     * @param elID
     */
    function setSubViewMountPoint(elID) {
      _subViewMountPoint = document.getElementById(elID);
    }

    /**
     * Return the template object
     * @returns {*}
     */
    function getTemplate() {
      return _template;
    }

    /**
     * Map a route to a module view controller
     * The controller module is extended from the Nori.View.BaseSubView module
     * @param templateID
     * @param controllerModID
     */
    function mapView(templateID, controllerModID) {
      var baseSubViewModule = requireUnique(_baseSubViewModuleID),
          controllerModule = requireUnique(controllerModID);

      _subViewMapping[templateID] = {
        htmlTemplate: _template.getTemplate(_subViewHTMLTemplatePrefix + templateID),
        controller: Nori.extend(controllerModule, baseSubViewModule)
      };
    }

    /**
     * Show a view (in response to a route change)
     * @param viewObj props: templateID, route, data
     * @param modelData previous state data from the model
     */
    function showView(viewObj, modelData) {
      if(!_subViewMountPoint) {
        throw new Error('No subview mount point set');
      }

      var subview = _subViewMapping[viewObj.templateID];

      if (subview) {
        unMountCurrentSubView();
      } else {
        throw new Error('No subview mapped for route: ' + viewObj.route + ' > ' + viewObj.templateID);
      }

      subview.controller.initialize({
        id: viewObj.templateID,
        template: subview.htmlTemplate,
        state: viewObj.data,
        modelData: modelData
      });

      TweenLite.set(_subViewMountPoint, {alpha: 0});

      _subViewMountPoint.appendChild(subview.controller.getDOMElement());
      _currentSubView = viewObj.templateID;

      if(subview.controller.viewDidMount) {
        subview.controller.viewDidMount();
      }

      TweenLite.to(_subViewMountPoint, 0.25, {alpha: 1, ease:Quad.easeIn});

      _emitter.publish(_appEvents.VIEW_CHANGED, viewObj.templateID);
    }

    /**
     * Remove the currently displayed view
     */
    function unMountCurrentSubView() {
      if (_currentSubView) {
        var subViewController = _subViewMapping[_currentSubView].controller;
        if (subViewController.viewWillUnMount) {
          subViewController.viewWillUnMount();
        }
      }

      _currentSubView = '';
      _domUtils.removeAllElements(_subViewMountPoint);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.setSubViewMountPoint = setSubViewMountPoint;
    exports.template = getTemplate;
    exports.mapView = mapView;
    exports.showView = showView;

  });