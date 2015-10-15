/* @flow weak */

/**
 * Mixin view that allows for component views to be display on routing changes
 */

let MixinRouteViews = function () {

  /**
   * Set up listeners
   */
  function initializeRouteViews() {
    Nori.router().subscribe(onRouteChange.bind(this));
  }

  function onRouteChange(payload) {
    this.showViewForCondition(payload.routeObj.route);
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

  return {
    initializeRouteViews       : initializeRouteViews,
    showViewForChangedCondition: showViewForChangedCondition
  };

};

export default MixinRouteViews();