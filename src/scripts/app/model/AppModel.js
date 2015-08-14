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

      //initializeReducers();

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
      _this.addReducer(baseReducerFunction);
      _this.initializeReducerModel();
    }

    /**
     * Handle possible state changes after reducers run
     */
    function handleStateMutation() {
      console.log('handle possible state mutation');
    }

    /**
     * Template reducer function
     * Model state isn't modified, current state is passed in and mutated state returned
     */
    function baseReducerFunction(state, event) {
      state = state || {};
      console.log('baseReducerFunction',state,event);
      // add switch for every event type that needs to mutate state
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
    //  Handle server communication
    //----------------------------------------------------------------------------

    /**
     * Testing
     */
    function restTesting() {
      var request = require('nori/service/Rest');

      request.request({method: 'GET', url: '/items', json: true}).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({
        method: 'POST',
        url   : '/items',
        data  : JSON.stringify({key: 'value'}),
        json  : true
      }).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({
        method: 'PUT',
        url   : '/items/42',
        data  : JSON.stringify({key: 'value'}),
        json  : true
      }).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });

      request.request({method: 'DELETE', url: '/items/42', json: true}).then(
        function success(data) {
          console.log(data);
        }).catch(
        function error(data) {
          console.log(data);
        });
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initialize = initialize;
    module.exports.handleStateMutation = handleStateMutation;
  });
