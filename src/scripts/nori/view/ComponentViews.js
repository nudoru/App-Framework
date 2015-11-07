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
  function createComponent(type, source, ...children) {
    return function (id, initProps) {
      let customizer,
          template,
          previousInitialize,
          previousGetDefaultProps;

      customizer = _.cloneDeep(source);

      customizer.mixins = customizer.mixins || [];
      customizer.mixins.unshift(ViewComponentFactory());

      template              = BuildFromMixins(customizer);
      template.__index__    = _viewIDIndex++;
      template.__id__       = id || 'norivc' + _viewIDIndex;
      template.__type__     = type;
      template.__children__ = children;

      previousInitialize      = template.initialize;
      previousGetDefaultProps = template.getDefaultProps;

      template.initialize = function initialize(props) {
        template.initializeComponent.bind(template)(props);
        if (previousInitialize) {
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

    view.controller.$renderComponent();
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