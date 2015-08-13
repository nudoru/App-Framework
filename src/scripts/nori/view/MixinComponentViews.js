/**
 * Mixin view that allows for component views and route mapping and display
 */

define('nori/view/MixinComponentViews',
  function (require, module, exports) {

    var _template                    = require('nori/utils/Templating'),
        _routeViewMountPoint,
        _componentViewMap            = Object.create(null),
        _currentRouteViewID,
        _componentHTMLTemplatePrefix = 'template__',
        _appEvents                   = require('nori/events/EventCreator');

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
     * @param templateID
     * @param componentModule
     * @param isRoute True | False
     */
    function mapViewComponent(templateID, componentModule, isRoute, mountPoint) {
      if (typeof componentModule === 'string') {
        componentModule = requireNew(componentModule);
      }

      _componentViewMap[templateID] = {
        htmlTemplate: _template.getTemplate(_componentHTMLTemplatePrefix + templateID),
        controller  : createComponentView(componentModule),
        isRouteView : isRoute,
        mountPoint  : mountPoint
      };
    }

    /**
     * Factory to create component view modules
     * @param extras
     * @returns {*}
     */
    function createComponentView(extras) {
      return Nori.extendWithArray({}, [
        requireNew('nori/view/ViewComponent'),
        requireNew('nori/view/MixinEventDelegator'),
        extras
      ]);
    }

    /**
     * Map a route to a module view controller
     * @param templateID
     * @param controllerModule
     */
    function mapRouteToViewComponent(templateID, controllerModule) {
      mapViewComponent(templateID, controllerModule, true, _routeViewMountPoint);
    }

    /**
     * Add a mixin for a mapped controller view
     * @param templateID
     * @param extras
     */
    function applyMixin(templateID, extras) {
      var componentView = _componentViewMap[templateID];

      if (!componentView) {
        throw new Error('No componentView mapped for id: ' + templateID);
      }

      componentView.controller = Nori.extendWithArray(componentView.controller, extras);
    }

    /**
     * Update componentView based on a change in bound model data
     * @param viewID
     */
    function updateViewComponent(viewID) {
      var componentView = _componentViewMap[viewID];

      if (componentView.controller.update) {
        componentView.controller.update();
      }
    }

    /**
     * Show a mapped componentView
     * @param templateID
     * @param dataObj
     */
    function showViewComponent(templateID) {
      var componentView = _componentViewMap[templateID];

      if (!componentView) {
        throw new Error('No componentView mapped for id: ' + templateID);
      }

      componentView.controller.initialize({
        id        : templateID,
        template  : componentView.htmlTemplate,
        mountPoint: componentView.mountPoint
      });

      componentView.controller.update();
      componentView.controller.render();
      componentView.controller.mount();
    }

    /**
     * Show a view (in response to a route change)
     * @param dataObj props: templateID, route, data (from query string)
     */
    function showRouteViewComponent(dataObj) {
      unmountCurrentRouteView();
      _currentRouteViewID = dataObj.templateID;

      showViewComponent(_currentRouteViewID);

      TweenLite.set(_routeViewMountPoint, {alpha: 0});
      TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease: Quad.easeIn});

      _appEvents.viewChanged(_currentRouteViewID);
    }

    /**
     * Remove the currently displayed view
     */
    function unmountCurrentRouteView() {
      if (_currentRouteViewID) {
        _componentViewMap[_currentRouteViewID].controller.unmount();
      }
      _currentRouteViewID = '';
    }

    /**
     * Sugar for the mapViewComponent
     * @param templateID
     * @param controllerModID
     * @param mountPoint
     */
    function createViewComponent(templateID, controllerModID, mountPoint) {
      mapViewComponent(templateID, controllerModID, false, mountPoint);
    }

    /**
     * Sugar for showViewComponent
     * @param templateID
     */
    function renderComponent(templateID) {
      showViewComponent(templateID);
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.setRouteViewMountPoint  = setRouteViewMountPoint;
    module.exports.template                = getTemplate;
    module.exports.createViewComponent     = createViewComponent;
    module.exports.renderComponent         = renderComponent;
    module.exports.mapViewComponent        = mapViewComponent;
    module.exports.showViewComponent       = showViewComponent;
    module.exports.mapRouteToViewComponent = mapRouteToViewComponent;
    module.exports.showRouteViewComponent  = showRouteViewComponent;
    module.exports.updateViewComponent     = updateViewComponent;
    module.exports.applyMixin              = applyMixin;
  });