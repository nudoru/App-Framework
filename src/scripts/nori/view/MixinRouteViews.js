/* @flow weak */

import _router from '../utils/Router.js';

/**
 * Mixin view that allows for component views to be display on routing changes
 */

export default function () {

  /**
   * Set up listeners
   */
  function initializeRouteViews() {
    _router.subscribe($onRouteChange.bind(this));
  }

  function $onRouteChange(payload) {
    this.showViewForCondition(payload.routeObj.route);
  }

  /**
   * Typically on app startup, show the view assigned to the current URL hash
   *
   * @param silent If true, will not notify subscribers of the change, prevents
   * double showing on initial load
   */
  function showViewForChangedCondition(silent) {
    this.showViewForCondition(_router.getCurrentRoute().route);
    if (!silent) {
      _router.notifySubscribers();
    }
  }

  return {
    initializeRouteViews,
    showViewForChangedCondition
  };

}
