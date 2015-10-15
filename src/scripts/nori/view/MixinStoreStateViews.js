/* @flow weak */

/**
 * Mixin view that allows for component views to be display on store state changes
 */

let MixinStoreStateViews = function () {

  let _this,
      _currentViewID,
      _defaultMountPoint,
      _viewIDMap = Object.create(null),
      _watchedStore,
      _currentStoreState;

  /**
   * Set up listeners
   */
  function initializeStateViews(store) {
    _this = this; // mitigation, Due to events, scope may be set to the window object
    _watchedStore = store;

    this.createSubject('viewChange');

    _watchedStore.subscribe(function onStateChange() {
      handleChange();
    });
  }

  /**
   * Show route from URL hash on change
   * @param routeObj
   */
  function handleChange() {
    showViewForChangedCondition();
  }

  function showViewForChangedCondition() {
    let state = _watchedStore.getState().currentState;
    if (state) {
      if (state !== _currentStoreState) {
        _currentStoreState = state;
        showViewForCondition.bind(_this)(_currentStoreState);
      }
    }
  }

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
    this.mapViewComponent(templateID, component, _defaultMountPoint);
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
    this.showViewComponent(_currentViewID);

    // Transition new view in
    TweenLite.set(_defaultMountPoint, {alpha: 0});
    TweenLite.to(_defaultMountPoint, 0.25, {alpha: 1, ease: Quad.easeOut});

    this.notifySubscribersOf('viewChange', componentID);
  }

  /**
   * Remove the currently displayed view
   */
  function removeCurrentView() {
    if (_currentViewID) {
      _this.getComponentViewMap()[_currentViewID].controller.dispose();
    }
    _currentViewID = '';
  }

  return {
    initializeStateViews       : initializeStateViews,
    showViewForChangedState    : showViewForChangedCondition,
    showViewForCondition       : showViewForCondition,
    setViewMountPoint          : setViewMountPoint,
    getViewMountPoint          : getViewMountPoint,
    mapConditionToViewComponent: mapConditionToViewComponent
  };

};

export default MixinStoreStateViews();