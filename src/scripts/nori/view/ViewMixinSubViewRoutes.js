/**
 * Mixin view that allows for sub view and route mapping and display
 */

define('Nori.View.ViewMixinSubViewRoutes',
  function (require, module, exports) {

    var _template = require('Nori.Utils.Templating'),
      _routeViewMountPoint,
      _subViewMapping = Object.create(null),
      _currentRouteViewID,
      _subViewHTMLTemplatePrefix = 'template__',
      _appEvents = require('Nori.Events.AppEventCreator');

    /**
     * Set the location for the view to append, any contents will be removed prior
     * @param elID
     */
    function setRouteViewMountPoint(elID) {
      _routeViewMountPoint = elID;
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
      var svc = requireExtend('Nori.View.ApplicationSubView', extras);
      return _.assign(svc, requireUnique('Nori.View.ViewMixinEventDelegator'));
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
     * Add a mixin for a mapped controller view
     * @param templateID
     * @param extras
     */
    function decorateSubViewController(templateID,extras) {
      var subview = _subViewMapping[templateID];

      if(!subview) {
        throw new Error('No subview mapped for id: ' + templateID);
      }

      subview.controller = _.assign(subview.controller, requireUnique(extras));

      //bindAllFunctions(subview.controller);
    }

    function bindAllFunctions(obj) {
      for(var func in obj) {
        if(obj.hasOwnProperty(func)) {
          if(_.isFunction(func)) {
            _.bindAll(obj, func);
          }
        }
      }
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
        template: subview.htmlTemplate,
        mountPoint: subview.mountPoint
      });

      subview.controller.render();
      subview.controller.mount();
    }

    /**
     * Show a view (in response to a route change)
     * @param dataObj props: templateID, route, data (from query string)
     */
    function showRouteView(dataObj) {
      unmountCurrentRouteView();
      _currentRouteViewID = dataObj.templateID;

      showView(_currentRouteViewID);

      TweenLite.set(_routeViewMountPoint, {alpha: 0});
      TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease:Quad.easeIn});

      _appEvents.viewChanged(_currentRouteViewID);
    }

    /**
     * Remove the currently displayed view
     */
    function unmountCurrentRouteView() {
      if (_currentRouteViewID) {
        _subViewMapping[_currentRouteViewID].controller.unmount();
      }

      _currentRouteViewID = '';

      //document.querySelector(_routeViewMountPoint).innerHTML = '';
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
    exports.decorateSubViewController = decorateSubViewController;
  });