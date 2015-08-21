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
        if (!silent) {
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
       */
      function mapRouteToViewComponent(route, templateID, componentIDorObj) {
        _routeViewIDMap[route] = templateID;
        mapViewComponent(templateID, componentIDorObj, true, _routeViewMountPoint);
      }

      /**
       * Map a component to a route path and mounting point. If a string is passed,
       * the correct object will be created from the factory method, otherwise,
       * the passed component object is used.
       *
       * @param componentID
       * @param componentIDorObj
       * @param isRoute
       * @param mountPoint
       */
      function mapViewComponent(componentID, componentIDorObj, isRoute, mountPoint) {
        var componentObj;

        if (typeof componentIDorObj === 'string') {
          var componentFactory = require(componentIDorObj);
          componentObj         = createComponentView(componentFactory());
        } else {
          componentObj = componentIDorObj;
        }

        _componentViewMap[componentID] = {
          htmlTemplate: _template.getTemplate(_componentHTMLTemplatePrefix + componentID),
          controller  : componentObj,
          isRouteView : isRoute,
          mountPoint  : isRoute ? _routeViewMountPoint : mountPoint
        };
      }

      /**
       * Factory to create component view modules by concating multiple source objects
       * @param componentSource Custom module source
       * @returns {*}
       */
      function createComponentView(componentSource) {
        var componentViewFactory  = require('nori/view/ViewComponent'),
            eventDelegatorFactory = require('nori/view/MixinEventDelegator'),
            simpleStoreFactory    = require('nori/model/SimpleStore'),
            componentAssembly, component, previousInitialize;

        componentAssembly = [
          componentViewFactory(),
          eventDelegatorFactory(),
          simpleStoreFactory(),
          componentSource
        ];

        if (componentSource.mixins) {
          componentAssembly = componentAssembly.concat(componentSource.mixins);
        }

        component = Nori.assignArray({}, componentAssembly);

        // Compose a new initialize function by inserting call to component super module
        previousInitialize = component.initialize;
        component.initialize = function initialize(initObj) {
          component.initializeComponent(initObj);
          previousInitialize.call(component, initObj);
        };

        return component;
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
        showRouteViewComponent  : showRouteViewComponent
      };

    };

    module.exports = MixinComponentViews();

  });