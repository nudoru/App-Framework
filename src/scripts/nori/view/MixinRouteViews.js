/* @flow weak */

/**
 * Mixin view that allows for component views to be display on routing changes
 */

let MixinRouteViews = function () {

  let _this,
      _currentViewID,
      _defaultMountPoint,
      _viewIDMap = Object.create(null);

  /**
   * Set up listeners
   */
  function initializeRouteViews() {
    _this = this; // mitigation, Due to events, scope may be set to the window object

    this.createSubject('viewChange');

    Nori.router().subscribe(function onRouteChange(payload) {
      handleChange(payload.routeObj);
    });
  }

  /**
   * Show route from URL hash on change
   * @param routeObj
   */
  function handleChange(routeObj) {
    showViewForCondition.bind(_this)(routeObj.route);
  }

  /**
   * Typically on app startup, show the view assigned to the current URL hash
   *
   * @param silent If true, will not notify subscribers of the change, prevents
   * double showing on initial load
   */
  function showViewForChangedCondition(silent) {
    this.showViewForCondition(Nori.getCurrentRoute().route);
    if (!silent) {
      Nori.router().notifySubscribers();
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

    removeCurrentRouteView();

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
  function removeCurrentRouteView() {
    if (_currentViewID) {
      _this.getComponentViewMap()[_currentViewID].controller.dispose();
    }
    _currentViewID = '';
  }

  return {
    initializeRouteViews       : initializeRouteViews,
    showViewForChangedCondition: showViewForChangedCondition,
    showViewForCondition       : showViewForCondition,
    setViewMountPoint          : setViewMountPoint,
    getViewMountPoint          : getViewMountPoint,
    mapConditionToViewComponent: mapConditionToViewComponent
  };

};

export default MixinRouteViews();