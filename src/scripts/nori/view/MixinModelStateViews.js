/**
 * Mixin view that allows for component views to be display on model state changes
 */

define('nori/view/MixinModelStateViews',
  function (require, module, exports) {

    var MixinModelStateViews = function () {

      var _this,
          _currentViewID,
          _currentModelState,
          _stateViewMountPoint,
          _stateViewIDMap = Object.create(null),
          _noriEvents     = require('nori/events/EventCreator');

      /**
       * Set up listeners
       */
      function initializeStateViews() {
        _this = this; // mitigation, Due to events, scope may be set to the window object
        Nori.model().subscribe(function onStateChange() {
          handleStateChange();
        });
      }

      /**
       * Show route from URL hash on change
       * @param routeObj
       */
      function handleStateChange() {
        showViewForCurrentModelState();
      }

      function showViewForCurrentModelState() {
        var state = Nori.model().getState().currentState;
        if (state) {
          if (state !== _currentModelState) {
            _currentModelState = state;
            showStateViewComponent.bind(_this)(_currentModelState);
          }
        }
      }

      /**
       * Set the location for the view to mount on route changes, any contents will
       * be removed prior
       * @param elID
       */
      function setViewMountPoint(elID) {
        _stateViewMountPoint = elID;
      }

      function getViewMountPoint() {
        return _stateViewMountPoint;
      }

      /**
       * Map a route to a module view controller
       * @param templateID
       * @param componentIDorObj
       */
      function mapStateToViewComponent(state, templateID, componentIDorObj) {
        _stateViewIDMap[state] = templateID;
        this.mapViewComponent(templateID, componentIDorObj, _stateViewMountPoint);
      }

      /**
       * Show a view (in response to a route change)
       * @param state
       */
      function showStateViewComponent(state) {
        var componentID = _stateViewIDMap[state];
        if (!componentID) {
          console.warn("No view mapped for route: " + state);
          return;
        }

        removeCurrentView();

        _currentViewID = componentID;
        this.showViewComponent(_currentViewID);

        // Transition new view in
        TweenLite.set(_stateViewMountPoint, {alpha: 0});
        TweenLite.to(_stateViewMountPoint, 0.25, {alpha: 1, ease: Quad.easeIn});

        _noriEvents.viewChanged(_currentViewID);
      }

      /**
       * Remove the currently displayed view
       */
      function removeCurrentView() {
        if (_currentViewID) {
          _this.getComponentViewMap()[_currentViewID].controller.unmount();
        }
        _currentViewID = '';
      }

      return {
        initializeStateViews        : initializeStateViews,
        showViewForCurrentModelState: showViewForCurrentModelState,
        showStateViewComponent      : showStateViewComponent,
        setViewMountPoint           : setViewMountPoint,
        getViewMountPoint           : getViewMountPoint,
        mapStateToViewComponent     : mapStateToViewComponent
      };

    };

    module.exports = MixinModelStateViews();

  });