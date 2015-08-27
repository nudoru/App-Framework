/**
 * Mixin view that allows for component views
 */

define('nori/view/MixinComponentViews',
  function (require, module, exports) {

    var MixinComponentViews = function () {

      var _componentViewMap            = Object.create(null),
          _componentHTMLTemplatePrefix = 'template__',
          _template                    = require('nori/utils/Templating');

      /**
       * Return the template object
       * @returns {*}
       */
      function getTemplate() {
        return _template;
      }

      /**
       * Map a component to a mounting point. If a string is passed,
       * the correct object will be created from the factory method, otherwise,
       * the passed component object is used.
       *
       * @param componentID
       * @param componentIDorObj
       * @param mountPoint
       */
      function mapViewComponent(componentID, componentIDorObj, mountPoint) {
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
          mountPoint  : mountPoint
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
            observableFactory     = require('nori/utils/MixinObservableSubject'),
            simpleStoreFactory    = require('nori/model/SimpleStore'),
            componentAssembly, component, previousInitialize;

        componentAssembly = [
          componentViewFactory(),
          eventDelegatorFactory(),
          observableFactory(),
          simpleStoreFactory(),
          componentSource
        ];

        if (componentSource.mixins) {
          componentAssembly = componentAssembly.concat(componentSource.mixins);
        }

        component = Nori.assignArray({}, componentAssembly);

        // Compose a new initialize function by inserting call to component super module
        previousInitialize   = component.initialize;
        component.initialize = function initialize(initObj) {
          component.initializeComponent(initObj);
          previousInitialize.call(component, initObj);
        };

        return function createComponentInstance() {
          return _.assign({}, component);
        };
      }

      /**
       * Show a mapped componentView
       * @param componentID
       * @param dataObj
       */
      function showViewComponent(componentID, mountPoint) {
        var componentView = _componentViewMap[componentID];
        if (!componentView) {
          console.warn('No componentView mapped for id: ' + componentID);
          return;
        }

        if (!componentView.controller.isInitialized()) {
          mountPoint = mountPoint || componentView.mountPoint;
          componentView.controller.initialize({
            id        : componentID,
            template  : componentView.htmlTemplate,
            mountPoint: mountPoint
          });
        } else {
          componentView.controller.update();
        }

        componentView.controller.renderPipeline();
        componentView.controller.mount();
      }

      /**
       * Returns a copy of the map object for component views
       * @returns {null}
       */
      function getComponentViewMap() {
        return _.assign({}, _componentViewMap);
      }

      //----------------------------------------------------------------------------
      //  API
      //----------------------------------------------------------------------------

      return {
        template           : getTemplate,
        mapViewComponent   : mapViewComponent,
        createComponentView: createComponentView,
        showViewComponent  : showViewComponent,
        getComponentViewMap: getComponentViewMap
      };

    };

    module.exports = MixinComponentViews();

  });