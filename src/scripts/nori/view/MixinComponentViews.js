/* @flow weak */

/**
 * Mixin view that allows for component views
 */

import _ from '../../vendor/lodash.min.js';
import ViewComponentFactory from './ViewComponent.js';
import BuildFromMixins from '../utils/BuildFromMixins.js';
//import ComponentMount from '../experimental/ComponentMount.js';

export default function () {

  let _viewMap      = {},
      _routeViewMap = {},
      _viewIDIndex  = 0,
      _currentViewID;

  /**
   * Factory to create component view modules by concating multiple source objects
   * @param customizer Custom module source
   * @returns {*}
   */
  function createComponent(type, source) {
    return function (id, initProps) {
      let customizer,
          template,
          previousInitialize,
          previousGetDefaultProps;

      customizer = _.cloneDeep(source);

      customizer.mixins = customizer.mixins || [];
      customizer.mixins.unshift(ViewComponentFactory());

      template         = BuildFromMixins(customizer);
      template.__index__ = _viewIDIndex++;
      template.__id__    = id || 'vcomponent_' + _viewIDIndex;
      template.__type__  = type;

      // Compose a new initialize function by inserting call to component super module
      previousInitialize      = template.initialize;
      previousGetDefaultProps = template.getDefaultProps;

      template.initialize = function initialize(props) {
        template.initializeComponent.bind(template)(props);
        if(previousInitialize) {
          previousInitialize.call(template, props);
        }
      };

      if (initProps) {
        template.getDefaultProps = function () {
          return _.merge({}, previousGetDefaultProps.call(template), initProps);
        };
      }

      return _.assign({}, template);
    };
  }

  function set(id, controller, mountSelector) {
    _viewMap[id] = {
      controller: controller,
      mount     : mountSelector
    };
  }

  //----------------------------------------------------------------------------
  //  Conditional view such as routes or states
  //  Must be augmented with mixins for state and route change monitoring
  //----------------------------------------------------------------------------

  /**
   * Map a route to a module view controller
   * @param componentID
   * @param component
   */
  function route(condition, componentID) {
    _routeViewMap[condition] = componentID;
  }

  /**
   * Show a view (in response to a route change)
   * @param condition
   */
  function showViewForCondition(condition) {
    let componentID = _routeViewMap[condition];
    if (!componentID) {
      console.warn("No view mapped for route: " + condition);
      return;
    }

    $removeCurrentView();

    _currentViewID = componentID;
    showView(_currentViewID);
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
      mountPoint = mountPoint || view.mount;
      view.controller.initialize({
        id   : componentID,
        mount: mountPoint
      });
    }

    view.controller.$renderComponent(true);
    view.controller.$mountComponent();

    //ComponentMount.mount(view.controller);
  }

  /**
   * Remove the currently displayed view
   */
  function $removeCurrentView() {
    if (_currentViewID) {
      _viewMap[_currentViewID].controller.dispose();
    }
    _currentViewID = '';
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    createComponent,
    set,
    showView,
    showViewForCondition,
    route
  };

}