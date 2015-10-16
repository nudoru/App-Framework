/* @flow weak */

/**
 * Mixin view that allows for component views
 */

import _componentViewFactory from './ViewComponent.js';
import _eventDelegatorFactory from './MixinEventDelegator.js';

let MixinComponentViews = function () {

  let _componentViewMap      = Object.create(null),
      _componentViewKeyIndex = 0,
      _currentViewID,
      _defaultMountPoint,
      _viewIDMap             = Object.create(null);

  /**
   * Map a component to a mounting point. If a string is passed,
   * the correct object will be created from the factory method, otherwise,
   * the passed component object is used.
   *
   * @param componentID
   * @param componentIDorObj
   * @param mountPoint
   */
  function mapViewComponent(componentID, componentObj, mountPoint) {
    _componentViewMap[componentID] = {
      controller: componentObj,
      mountPoint: mountPoint
    };
  }

  /**
   * Factory to create component view modules by concating multiple source objects
   * @param customizer Custom module source
   * @returns {*}
   */
  function createComponentView(customizer) {
    return function (initProps) {

      let finalComponent, previousInitialize;

      customizer.mixins = customizer.mixins || [];
      customizer.mixins.push(_componentViewFactory());
      customizer.mixins.push(_eventDelegatorFactory());

      finalComponent     = Nori.buildFromMixins(customizer);
      finalComponent.key = _componentViewKeyIndex++;

      // Compose a new initialize function by inserting call to component super module
      previousInitialize = finalComponent.initialize;

      finalComponent.initialize = function initialize(props) {
        finalComponent.initializeComponent(props);
        previousInitialize.call(finalComponent, props);
      };

      if (initProps) {
        // Overwrite the function in the component
        finalComponent.getDefaultProps = function () {
          return initProps;
        };
      }

      return _.assign({}, finalComponent);
    };
  }

  /**
   * Show a mapped componentView
   * @param componentID
   * @param dataObj
   */
  function showViewComponent(componentID, mountPoint) {
    let componentView = _componentViewMap[componentID];
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

    componentView.controller.componentRender();
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
  //  Conditional view such as routes or states
  //  Must be augmented with mixins for state and route change monitoring
  //----------------------------------------------------------------------------

  /**
   * Set the location for the view to mount on route changes, any contents will
   * be removed prior
   * @param elID
   */
  function setViewMountPoint(elID) {
    _defaultMountPoint = elID;
  }

  function getViewMountPoint() {
    return _defaultMountPoint;
  }

  /**
   * Map a route to a module view controller
   * @param templateID
   * @param component
   */
  function mapConditionToViewComponent(condition, templateID, component) {
    _viewIDMap[condition] = templateID;
    mapViewComponent(templateID, component, _defaultMountPoint);
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

    removeCurrentView();

    _currentViewID = componentID;
    showViewComponent(_currentViewID);

    // Transition new view in
    TweenLite.set(_defaultMountPoint, {alpha: 0});
    TweenLite.to(_defaultMountPoint, 0.25, {alpha: 1, ease: Quad.easeOut});
  }

  /**
   * Remove the currently displayed view
   */
  function removeCurrentView() {
    if (_currentViewID) {
      getComponentViewMap()[_currentViewID].controller.dispose();
    }
    _currentViewID = '';
  }

  //----------------------------------------------------------------------------
  //  API
  //----------------------------------------------------------------------------

  return {
    mapViewComponent           : mapViewComponent,
    createComponentView        : createComponentView,
    showViewComponent          : showViewComponent,
    getComponentViewMap        : getComponentViewMap,
    showViewForCondition       : showViewForCondition,
    setViewMountPoint          : setViewMountPoint,
    getViewMountPoint          : getViewMountPoint,
    mapConditionToViewComponent: mapConditionToViewComponent
  };

};

export default MixinComponentViews();