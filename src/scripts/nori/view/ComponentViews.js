/* @flow weak */

/**
 * Mixin view that allows for component views
 */

import _ from '../../vendor/lodash.min.js';
import ViewComponentFactory from './ViewComponent.js';
import BuildFromMixins from '../utils/BuildFromMixins.js';
import Router from '../utils/Router.js';
//import ComponentMount from '../experimental/ComponentMount.js';

export default function () {

  let _viewMap      = {},
      _routeViewMap = {},
      _viewIDIndex  = 0,
      _routeOnURL   = false,
      _routeOnState = false,
      _currentViewID,
      _observedStore,
      _currentStoreState;

  /**
   * Factory to create component view modules by concating multiple source objects
   * @param customizer Custom module source
   * @returns {*}
   */
  function createComponent(source) {
    return function (id, props, ...children) {
      let customizer,
          template,
          final,
          pDefaultProps;

      customizer = _.cloneDeep(source);

      customizer.mixins = customizer.mixins || [];
      customizer.mixins.unshift(ViewComponentFactory());

      template              = BuildFromMixins(customizer);
      template.__index__    = _viewIDIndex++;
      template.__id__       = id || 'norivc' + _viewIDIndex;
      template.__children__ = children;

      // Merges passed props with default props
      if (props) {
        pDefaultProps = template.getDefaultProps;
        template.getDefaultProps = function () {
          return _.merge({}, pDefaultProps.call(template), props);
        };
      }

      final = _.assign({}, template);
      final.$componentInit.call(final);

      if(typeof  final.init === 'function') {
        final.init.call(final);
      }

      return final;
    };
  }

  function set(id, controller) {
    _viewMap[id] = {
      controller: controller
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
   */
  function showView(componentID) {
    let view = _viewMap[componentID];

    if (!view) {
      console.warn('No view mapped for id: ' + componentID);
      return;
    }

    view.controller.forceUpdate();

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
  //  Routing
  //----------------------------------------------------------------------------

  function showViewForChangedCondition(options) {
    if (_routeOnURL) {
      showViewForChangedURL(options);
    } else if (_routeOnState) {
      showViewForChangedState(options);
    }
  }

  //----------------------------------------------------------------------------
  //  URL Fragment Route
  //----------------------------------------------------------------------------

  function initializeRouteViews() {
    _routeOnURL   = true;
    _routeOnState = false;

    Router.subscribe($onRouteChange.bind(this));
  }

  function $onRouteChange(payload) {
    showViewForCondition(payload.routeObj.route);
  }

  /**
   * Typically on app startup, show the view assigned to the current URL hash
   *
   * @param silent If true, will not notify subscribers of the change, prevents
   * double showing on initial load
   */
  function showViewForChangedURL(silent) {
    showViewForCondition(Router.getCurrentRoute().route);
    if (!silent) {
      Router.notifySubscribers();
    }
  }

  //----------------------------------------------------------------------------
  //  Store State Route
  //----------------------------------------------------------------------------

  function initializeStateViews(store) {
    _routeOnURL   = false;
    _routeOnState = true;

    _observedStore = store;
    _observedStore.subscribe($onStateChange.bind(this));
  }

  function $onStateChange() {
    showViewForChangedState.bind(this)();
  }

  function showViewForChangedState() {
    let state = _observedStore.getState().currentState;
    if (state) {
      if (state !== _currentStoreState) {
        _currentStoreState = state;
        showViewForCondition(_currentStoreState);
      }
    }
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    createComponent,
    set,
    showView,
    showViewForCondition,
    route,
    showViewForChangedCondition,
    initializeRouteViews,
    showViewForChangedURL,
    initializeStateViews,
    showViewForChangedState
  };

}