/* @flow weak */

/**
 * Mixin view that allows for component views
 */

import _ from '../../vendor/lodash.min.js';
import ViewComponentFactory from './ViewComponent.js';
import EventDelegatorFactory from './MixinEventDelegator.js';
import BuildFromMixins from '../utils/BuildFromMixins.js';

export default function () {

  let _viewMap      = Object.create(null),
      _viewIDMap    = Object.create(null),
      _viewKeyIndex = 0,
      _currentViewID;

  /**
   * Map a component to a mounting point. If a string is passed,
   * the correct object will be created from the factory method, otherwise,
   * the passed component object is used.
   *
   * @param componentID
   * @param componentIDorObj
   * @param mountPoint
   */
  function registerView(componentID, componentObj, mountPoint) {
    _viewMap[componentID] = {
      controller: componentObj,
      mountPoint: mountPoint
    };
  }

  /**
   * Factory to create component view modules by concating multiple source objects
   * @param customizer Custom module source
   * @returns {*}
   */
  function createComponent(customizer) {
    return function (initProps) {
      let finalComponent, previousInitialize, previousGetDefaultProps;

      customizer.mixins = customizer.mixins || [];
      customizer.mixins.push(ViewComponentFactory());
      customizer.mixins.push(EventDelegatorFactory());

      finalComponent     = BuildFromMixins(customizer);
      finalComponent.key = _viewKeyIndex++;

      // Compose a new initialize function by inserting call to component super module
      previousInitialize      = finalComponent.initialize;
      previousGetDefaultProps = finalComponent.getDefaultProps;

      finalComponent.initialize = function initialize(props) {
        finalComponent.initializeComponent(props);
        previousInitialize.call(finalComponent, props);
      };

      if (initProps) {
        // Overwrite the function in the component
        finalComponent.getDefaultProps = function () {
          return _.merge({}, previousGetDefaultProps.call(finalComponent), initProps);
        };
      }

      return _.assign({}, finalComponent);
    };
  }

  /**
   * Show a mapped view
   * @param componentID
   * @param dataObj
   */
  function showView(componentID, mountPoint) {
    let view = _viewMap[componentID];
    if (!view) {
      console.warn('No view mapped for id: ' + componentID);
      return;
    }

    if (!view.controller.isInitialized()) {
      // Not initialized, set props
      mountPoint = mountPoint || view.mountPoint;
      view.controller.initialize({
        id        : componentID,
        template  : view.htmlTemplate,
        mountPoint: mountPoint
      });
    }

    // Force render
    view.controller.$renderComponent(true);
    // wasn't mounted before, so mount it
    view.controller.mount();
  }

  /**
   * Returns a copy of the map object for component views
   * @returns {null}
   */
  function getViewMap() {
    return _.assign({}, _viewMap);
  }

  //----------------------------------------------------------------------------
  //  Conditional view such as routes or states
  //  Must be augmented with mixins for state and route change monitoring
  //----------------------------------------------------------------------------

  /**
   * Map a route to a module view controller
   * @param templateID
   * @param component
   */
  function route(condition, templateID, component, selector) {
    _viewIDMap[condition] = templateID;
    registerView(templateID, component, selector);
  }

  /**
   * Show a view (in response to a route change)
   * @param condition
   */
  function showViewForCondition(condition) {
    let componentID = _viewIDMap[condition];
    if (!componentID) {
      console.warn("No view mapped for route: " + condition);
      return;
    }

    $removeCurrentView();

    _currentViewID = componentID;
    showView(_currentViewID);
  }

  /**
   * Remove the currently displayed view
   */
  function $removeCurrentView() {
    if (_currentViewID) {
      getViewMap()[_currentViewID].controller.dispose();
    }
    _currentViewID = '';
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    registerView,
    createComponent,
    showView,
    getViewMap,
    showViewForCondition,
    route
  };

}