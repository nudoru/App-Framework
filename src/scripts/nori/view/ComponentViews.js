/* @flow weak */

/**
 * Mixin view that allows for component views
 */

import ViewComponentFactory from './Component.js';
import BuildFromMixins from '../utils/BuildFromMixins.js';
import Router from './URLRouter.js';
import DeepCopy from '../../nudoru/util/DeepCopy.js';
import ObjectAssign from '../../nudoru/util/ObjectAssign.js';
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
  const createComponent = (source = {}) => {
    return (id, props, ...children) => {
      let customizer,
          template,
          final,
          pDefaultProps;

      customizer = DeepCopy(source);

      customizer.mixins = customizer.mixins || [];
      customizer.mixins.unshift(ViewComponentFactory());

      template            = BuildFromMixins(customizer);
      template.__children = children;

      pDefaultProps = template.getDefaultProps;

      template.getDefaultProps = () => {
        // TODO test props for reserved names?
        let specs = {
          id            : id || 'vc' + _viewIDIndex,
          index         : _viewIDIndex++,
          attach        : 'append',
          // In vc RxEventDelegator, will pass values from form elements to subscribers
          autoFormEvents: true,
          // Defaults for DOM el components
          elInner         : '',
          elID          : '',
          elClass       : ''
        };
        return ObjectAssign({}, pDefaultProps.call(template), specs, props);
      };

      final = ObjectAssign({}, template);
      final.$componentInit.call(final);

      if (typeof final.init === 'function') {
        final.init.call(final);
      }

      return final;
    };
  };

  //----------------------------------------------------------------------------
  //  Conditional view such as routes or states
  //  Must be augmented with mixins for state and route change monitoring
  //----------------------------------------------------------------------------

  /**
   * Map a route to a module view controller
   * @param component
   * @param component
   */
  const route = (condition, component) => {
    _routeViewMap[condition] = component;
  };

  /**
   * Show a view (in response to a route change)
   * @param condition
   */
  const showViewForCondition = (condition) => {
    let view = _routeViewMap[condition];

    if (!view) {
      console.warn("No view mapped for route: " + condition);
      return;
    }

    showView(view);
  };

  /**
   * Show a mapped view
   */
  const showView = (viewComponent) => {
    if (viewComponent === _currentViewComponent) {
      return;
    }

    $removeCurrentView();
    _currentViewComponent = viewComponent;
    viewComponent.forceUpdate();
  };

  /**
   * Remove the currently displayed view
   */
  const $removeCurrentView = () => {
    if (_currentViewComponent) {
      _currentViewComponent.dispose();
    }
    _currentViewComponent = null;
  };

  //----------------------------------------------------------------------------
  //  Routing
  //----------------------------------------------------------------------------

  const showViewForChangedCondition = (options) => {
    if (_routeOnURL) {
      showViewForChangedURL(options);
    } else if (_routeOnState) {
      showViewForChangedState(options);
    }
  };

  //----------------------------------------------------------------------------
  //  URL Fragment Route
  //----------------------------------------------------------------------------

  const initializeRouteViews = () => {
    _routeOnURL   = true;
    _routeOnState = false;

    Router.subscribe($onRouteChange);
  };

  const $onRouteChange = (payload) => {
    showViewForCondition(payload.routeObj.route);
  };

  /**
   * Typically on app startup, show the view assigned to the current URL hash
   *
   * @param silent If true, will not notify subscribers of the change, prevents
   * double showing on initial load
   */
  const showViewForChangedURL = (silent = false) => {
    showViewForCondition(Router.getCurrentRoute().route);
    if (!silent) {
      Router.notifySubscribers();
    }
  };

  //----------------------------------------------------------------------------
  //  Store State Route
  //----------------------------------------------------------------------------

  const initializeStateViews = (store) => {
    _routeOnURL   = false;
    _routeOnState = true;

    _observedStore = store;
    _observedStore.subscribe($onStateChange.bind(this));
  };

  const $onStateChange= () => {
    showViewForChangedState.bind(this)();
  };

  const showViewForChangedState = () => {
    let state = _observedStore.getState().currentState;
    if (state) {
      if (state !== _currentStoreState) {
        _currentStoreState = state;
        showViewForCondition(_currentStoreState);
      }
    }
  };

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