/**
 * Mixin view that allows for sub view and route mapping and display
 */

define('Nori.View.ViewMixinSubViewRoutes',
  function (require, module, exports) {

    var _template = require('Nori.Utils.Templating'),
      _routeViewMountPoint,
      _subViewMapping = Object.create(null),
      _currentSubView,
      _baseSubViewModuleID = 'Nori.View.BaseSubView',
      _subViewHTMLTemplatePrefix = 'template__',
      _appEventConstants = require('Nori.Events.AppEventConstants'),
      _domUtils = require('Nudoru.Browser.DOMUtils'),
      _dispatcher = require('Nori.Utils.Dispatcher');

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
      return requireExtend(_baseSubViewModuleID, extras);
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
      var subview = _subViewMapping[templateID];

      if(!subview) {
        throw new Error('No subview mapped for id: ' + templateID);
      }

      subview.controller.initialize({
        id: templateID,
        template: subview.htmlTemplate
      });

      subview.controller.render();
      subview.controller.mount(document.getElementById(subview.mountPoint));
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

      subview.controller.initialize({
        id: dataObj.templateID,
        template: subview.htmlTemplate
      });

      subview.controller.render();

      TweenLite.set(_routeViewMountPoint, {alpha: 0});

      subview.controller.mount(_routeViewMountPoint);
      _currentSubView = dataObj.templateID;

      TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease:Quad.easeIn});

      _dispatcher.publish({type:_appEventConstants.VIEW_CHANGED, payload:dataObj.templateID});
    }

    /**
     * Remove the currently displayed view
     */
    function unMountCurrentSubView() {
      if (_currentSubView) {
        var subViewController = _subViewMapping[_currentSubView].controller;
        subViewController.unmount();
      }

      _currentSubView = '';
      //removed _domUtils.removeAllElements(_routeViewMountPoint);
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