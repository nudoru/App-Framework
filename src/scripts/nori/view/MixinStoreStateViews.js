/* @flow weak */

/**
 * Mixin view that allows for component views to be display on store state changes
 */

export default function () {

  let _observedStore,
      _currentStoreState;

  /**
   * Set up listeners
   */
  function initializeStateViews(store) {
    _observedStore = store;
    _observedStore.subscribe($onStateChange.bind(this));
  }

  function $onStateChange() {
    showViewForChangedCondition.bind(this)();
  }

  function showViewForChangedCondition() {
    let state = _observedStore.getState().currentState;
    if (state) {
      if (state !== _currentStoreState) {
        _currentStoreState = state;
        this.showViewForCondition(_currentStoreState);
      }
    }
  }

  return {
    initializeStateViews,
    showViewForChangedState
  };

}