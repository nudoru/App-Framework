/**
 * Mixin view that allows for sub view and route mapping and display
 */

define('Nori.View.SubRouteViews',
  function (require, module, exports) {

    var _template = require('Nori.View.Template'),
      _routeViewMountPoint,
      _subViewMapping = Object.create(null),
      _currentSubView,
      _baseSubViewModuleID = 'Nori.View.BaseSubView',
      _subViewHTMLTemplatePrefix = 'template__',
      _appEvents = require('Nori.Events.AppEvents'),
      _domUtils = require('Nudoru.Browser.DOMUtils'),
      _dispatcher = require('Nori.Events.Dispatcher');

    /**
     * Set the location for the view to append, any contents will be removed prior
     * @param elID
     */
    function setRouteViewMountPoint(elID) {
      _routeViewMountPoint = document.getElementById(elID);
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
     * @param route True | False, is is a subview
     */
    function mapView(templateID, controllerModID, isRoute, mountPoint) {
      _subViewMapping[templateID] = {
        htmlTemplate: _template.getTemplate(_subViewHTMLTemplatePrefix + templateID),
        controller: createSubView(requireUnique(controllerModID)),
        isRouteView: isRoute,
        mountPoint: mountPoint
      };
    }

    /**
     * Factory to create subview modules
     * @param extras
     * @returns {*}
     */
    function createSubView(extras) {
      return Nori.extend(extras, requireUnique(_baseSubViewModuleID));
    }

    /**
     * Map a route to a module view controller
     * The controller module is extended from the Nori.View.BaseSubView module
     * @param templateID
     * @param controllerModID
     */
    function mapRouteView(templateID, controllerModID) {
      mapView(templateID, controllerModID, true, _routeViewMountPoint);
    }

    /**
     * Update subview based on a change in bound model data
     * @param viewID
     */
    function updateView(viewID) {
      var subview = _subViewMapping[viewID];

      if (subview.controller.update) {
        subview.controller.update();
      }
    }

    /**
     * Show a mapped subview
     * @param templateID
     * @param dataObj
     */
    function showView(templateID) {
      var subview = _subViewMapping[templateID],
          mountEl;

      if(!subview) {
        throw new Error('No subview mapped for id: ' + templateID);
      }

      subview.controller.initialize({
        id: templateID,
        template: subview.htmlTemplate
      });

      mountEl = document.getElementById(subview.mountPoint);
      mountEl.appendChild(subview.controller.getDOMElement());

      if(subview.controller.viewDidMount) {
        subview.controller.viewDidMount();
      }
    }

    /**
     * Show a view (in response to a route change)
     * @param dataObj props: templateID, route, data (from query string)
     */
    function showRouteView(dataObj) {
      if(!_routeViewMountPoint) {
        throw new Error('No subview mount point set');
      }

      var subview = _subViewMapping[dataObj.templateID];

      if (subview) {
        unMountCurrentSubView();
      } else {
        throw new Error('No subview mapped for route: ' + dataObj.route + ' > ' + dataObj.templateID);
      }

      // state is from query string
      // modeldata is saved state from the last time the view was unloaded
      subview.controller.initialize({
        id: dataObj.templateID,
        template: subview.htmlTemplate
      });

      TweenLite.set(_routeViewMountPoint, {alpha: 0});

      _routeViewMountPoint.appendChild(subview.controller.getDOMElement());
      _currentSubView = dataObj.templateID;

      if(subview.controller.viewDidMount) {
        subview.controller.viewDidMount();
      }

      TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease:Quad.easeIn});

      _dispatcher.publish(_appEvents.VIEW_CHANGED, dataObj.templateID);
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
      _domUtils.removeAllElements(_routeViewMountPoint);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    exports.setRouteViewMountPoint = setRouteViewMountPoint;
    exports.template = getTemplate;
    exports.createSubView = createSubView;
    exports.mapView = mapView;
    exports.showView = showView;
    exports.mapRouteView = mapRouteView;
    exports.showRouteView = showRouteView;
    exports.updateView = updateView;
  });