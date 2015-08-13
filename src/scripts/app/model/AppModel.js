define('app/model/AppModel',
  function (require, module, exports) {

    var _this,
        _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    //----------------------------------------------------------------------------
    //  Init
    //----------------------------------------------------------------------------

    function initialize() {
      _this = this;

      initializeReducers();

      // load data and then dispatch this
      _noriEvents.applicationModelInitialized();
    }



    //----------------------------------------------------------------------------
    //  State / reducers
    //----------------------------------------------------------------------------

    /**
     * Initialize 'nori/model/MixinReducerModel' functionality
     */
    function initializeReducers() {
      _this.initializeReducerModel();
      _this.addReducer(templateReducerFunction);
    }

    /**
     * Handle possible state changes after reducers run
     */
    function handleStateMutation() {
      //
    }

    /**
     * Template reducer function
     * Model state isn't modified, current state is passed in and mutated state returned
     */
    function templateReducerFunction(state, event) {
      state = state || {};

      console.log('templateReducerFunction',state,event);

      switch (event.type) {
        case _noriEventConstants.MODEL_DATA_CHANGED:
          // can compose other reducers
          // return _.assign({}, state, otherStateTransformer(state));
          return _.assign({}, state, {prop: event.payload.value});
        default:
          return state;
      }
    }

    //----------------------------------------------------------------------------
    //  Utility
    //----------------------------------------------------------------------------

    /**
     * Utility function
     * @param obj
     * @returns {*}
     */
    function getLocalStorageObject(obj) {
      return localStorage[obj];
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;
    module.exports.handleStateMutation = handleStateMutation;
  });
