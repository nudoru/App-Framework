/**
 * Mixin view that allows for component views and route mapping and display
 */

define('nori/view/MixinComponentViews',
  function (require, module, exports) {

    var MixinComponentViews = function () {

      var _routeViewMountPoint,
          _currentRouteViewID,
          _componentViewMap            = Object.create(null),
          _routeViewIDMap              = Object.create(null),
          _componentHTMLTemplatePrefix = 'template__',
          _template                    = require('nori/utils/Templating'),
          _noriEvents                  = require('nori/events/EventCreator');

      /**
       * Set up listeners
       */
      function initializeComponentViews() {
        Nori.router().subscribe(function onRouteChange(payload) {
          handleRouteChange(payload.routeObj);
        });
      }

      /**
       * Typically on app startup, show the view assigned to the current URL hash
       * @param silent If true, will not notify subscribers of the change, prevents
       * double showing on initial load
       */
      function showViewFromURLHash(silent) {
        showRouteViewComponent(Nori.getCurrentRoute().route);
        if(!silent) {
          Nori.router().notifySubscribers();
        }
      }

      /**
       * Show route from URL hash on change
       * @param routeObj
       */
      function handleRouteChange(routeObj) {
        showRouteViewComponent(routeObj.route);
      }

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
       * @param componentIDorObj
       * @param isRoute True | False
       */
      function mapViewComponent(templateID, componentIDorObj, isRoute, mountPoint) {
        _componentViewMap[templateID] = {
          htmlTemplate: _template.getTemplate(_componentHTMLTemplatePrefix + templateID),
          controller  : createComponentView(componentIDorObj),
          isRouteView : isRoute,
          mountPoint  : isRoute ? _routeViewMountPoint : mountPoint
        };
      }

      /**
       * Factory to create component view modules
       * @param moduleID
       * @returns {*}
       */
      function createComponentView(componentIDorObj) {
        var componentObj = componentIDorObj;
        if (typeof  componentIDorObj === 'string') {
          var componentFactory = require(componentIDorObj);
          componentObj         = componentFactory();
          //componentObj = require(componentIDorObj);
        }

        var componentViewFactory  = require('nori/view/ViewComponent'),
            eventDelegatorFactory = require('nori/view/MixinEventDelegator'),
            simpleStoreFactory    = require('nori/model/SimpleStore'),
            component             = Nori.assignArray({}, [
              componentViewFactory(),
              eventDelegatorFactory(),
              simpleStoreFactory(),
              componentObj
            ]);

        // Overwrite the initialize function to add parent init
        var oldInit = component.initialize,
            newInit = function initialize(initObj) {
              component.initializeComponent(initObj);
              oldInit.call(component, initObj);
            };

        component.initialize = newInit;

        return component;
      }

      /**
       * Map a route to a module view controller
       * @param templateID
       * @param componentIDorObj
       */
      function mapRouteToViewComponent(route, templateID, componentIDorObj) {
        _routeViewIDMap[route] = templateID;
        mapViewComponent(templateID, componentIDorObj, true, _routeViewMountPoint);
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

        componentView.controller = Nori.assignArray(componentView.controller, extras);
      }

      /**
       * Show a mapped componentView
       * @param componentID
       * @param dataObj
       */
      function showViewComponent(componentID) {
        var componentView = _componentViewMap[componentID];
        if (!componentView) {
          throw new Error('No componentView mapped for id: ' + componentID);
        }

        console.log('show view component: ',componentID);

        if (!componentView.controller.isInitialized()) {
          componentView.controller.initialize({
            id        : componentID,
            template  : componentView.htmlTemplate,
            mountPoint: componentView.mountPoint
          });
          componentView.controller.renderPipeline();
          componentView.controller.mount();
        } else {
          componentView.controller.update();
          componentView.controller.renderPipeline();
          componentView.controller.mount();
        }

      }

      /**
       * Show a view (in response to a route change)
       * @param route
       */
      function showRouteViewComponent(route) {
        var routeTemplateID = _routeViewIDMap[route];
        if (!routeTemplateID) {
          console.log("No view mapped for route: " + route);
          return;
        }

        unmountCurrentRouteView();
        _currentRouteViewID = routeTemplateID;

        showViewComponent(_currentRouteViewID);

        TweenLite.set(_routeViewMountPoint, {alpha: 0});
        TweenLite.to(_routeViewMountPoint, 0.25, {alpha: 1, ease: Quad.easeIn});

        _noriEvents.viewChanged(_currentRouteViewID);
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

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        initializeComponentViews: initializeComponentViews,
        showViewFromURLHash     : showViewFromURLHash,
        setRouteViewMountPoint  : setRouteViewMountPoint,
        template                : getTemplate,
        mapViewComponent        : mapViewComponent,
        createComponentView     : createComponentView,
        showViewComponent       : showViewComponent,
        mapRouteToViewComponent : mapRouteToViewComponent,
        showRouteViewComponent  : showRouteViewComponent,
        applyMixin              : applyMixin,
      };

    };

    module.exports = MixinComponentViews();

  });