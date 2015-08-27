/**
 * Mixin view that allows for component views to be display on routing changes
 */

define('nori/view/MixinRouteViews',
  function (require, module, exports) {

    var MixinRouteViews = function () {

      var _this,
          _currentRouteViewID,
          _routeViewMountPoint,
          _routeViewIDMap = Object.create(null),
          _noriEvents     = require('nori/events/EventCreator');

      /**
       * Set up listeners
       */
      function initializeRouteViews() {
        _this = this; // mitigation, Due to events, scope may be set to the window object
        Nori.router().subscribe(function onRouteChange(payload) {
          handleRouteChange(payload.routeObj);
        });
      }

      /**
       * Show route from URL hash on change
       * @param routeObj
       */
      function handleRouteChange(routeObj) {
        showRouteViewComponent.bind(_this)(routeObj.route);
      }

      /**
       * Typically on app startup, show the view assigned to the current URL hash
       *
       * @param silent If true, will not notify subscribers of the change, prevents
       * double showing on initial load
       */
      function showViewFromURLHash(silent) {
        this.showRouteViewComponent(Nori.getCurrentRoute().route);
        if (!silent) {
          Nori.router().notifySubscribers();
        }
      }

      /**
       * Set the location for the view to mount on route changes, any contents will
       * be removed prior
       * @param elID
       */
      function setViewMountPoint(elID) {
        _routeViewMountPoint = elID;
      }

      function getViewMountPoint() {
        return _routeViewMountPoint;
      }

      /**
       * Map a route to a module view controller
       * @param templateID
       * @param componentIDorObj
       */
      function mapRouteToViewComponent(route, templateID, componentIDorObj) {
        _routeViewIDMap[route] = templateID;
        this.mapViewComponent(templateID, componentIDorObj, _routeViewMountPoint);
      }

      /**
       * Show a view (in response to a route change)
       * @param route
       */
      function showRouteViewComponent(route) {
        var componentID = _routeViewIDMap[route];
        if (!componentID) {
          console.warn("No view mapped for route: " + route);
          return;
        }

        removeCurrentRouteView();

        _currentRouteViewID = componentID;
        this.showViewComponent(_currentRouteViewID);

        // Transition new view in
        TweenLite.set(_routeViewMountPoint, {alpha: 0});
        TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease: Quad.easeIn});

        _noriEvents.viewChanged(_currentRouteViewID);
      }

      /**
       * Remove the currently displayed view
       */
      function removeCurrentRouteView() {
        if (_currentRouteViewID) {
          _this.getComponentViewMap()[_currentRouteViewID].controller.unmount();
        }
        _currentRouteViewID = '';
      }

      return {
        initializeRouteViews   : initializeRouteViews,
        showViewFromURLHash    : showViewFromURLHash,
        showRouteViewComponent : showRouteViewComponent,
        setViewMountPoint : setViewMountPoint,
        getViewMountPoint : getViewMountPoint,
        mapRouteToViewComponent: mapRouteToViewComponent
      };

    };

    module.exports = MixinRouteViews();

  });