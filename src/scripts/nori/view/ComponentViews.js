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

  let _routeViewMap = {},
      _viewIDIndex  = 0,
      _routeOnURL   = false,
      _routeOnState = false,
      _currentViewComponent,
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

      template            = BuildFromMixins(customizer);
      template.__children = children;

      pDefaultProps = template.getDefaultProps;

      template.getDefaultProps = function () {
        let specs = {
          id            : id || 'vc' + _viewIDIndex,
          index         : _viewIDIndex++,
          attach        : 'append',
          autoFormEvents: true
        };
        return _.merge({}, pDefaultProps.call(template), specs, props);
      };

      final = _.assign({}, template);
      final.$componentInit.call(final);

      if (typeof final.init === 'function') {
        final.init.call(final);
      }

      return final;
    };
  }

  //----------------------------------------------------------------------------
  //  Conditional view such as routes or states
  //  Must be augmented with mixins for state and route change monitoring
  //----------------------------------------------------------------------------

  /**
   * Map a route to a module view controller
   * @param component
   * @param component
   */
  function route(condition, component) {
    _routeViewMap[condition] = component;
  }

  /**
   * Show a view (in response to a route change)
   * @param condition
   */
  function showViewForCondition(condition) {
    let view = _routeViewMap[condition];

    if (!view) {
      console.warn("No view mapped for route: " + condition);
      return;
    }

    showView(view);
  }

  /**
   * Show a mapped view
   */
  function showView(viewComponent) {
    if (viewComponent === _currentViewComponent) {
      return;
    }

    $removeCurrentView();
    _currentViewComponent = viewComponent;
    viewComponent.forceUpdate();
  }

  /**
   * Remove the currently displayed view
   */
  function $removeCurrentView() {
    if (_currentViewComponent) {
      _currentViewComponent.dispose();
    }
    _currentViewComponent = null;
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