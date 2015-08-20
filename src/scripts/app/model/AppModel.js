define('app/model/AppModel',
  function (require, module, exports) {

    var _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    var AppModel = Nori.createApplicationModel({
      initialize: function () {
        this.initializeReducers();

        // load data and then dispatch this
        _noriEvents.applicationModelInitialized();
      },

      initializeReducers: function () {
        this.addReducer(this.baseReducerFunction);
        this.initializeReducerModel();
      },

      handleStateMutation: function () {
        //console.log('handle possible state mutation');
      },

      baseReducerFunction: function (state, event) {
        state = state || {};
        //console.log('baseReducerFunction', state, event);
        // add switch for every event type that needs to mutate state
        switch (event.type) {
          case _noriEventConstants.CHANGE_MODEL_STATE:
            // can compose other reducers
            // return _.assign({}, state, otherStateTransformer(state));
            return _.assign({}, state, {prop: event.payload});
          default:
            return state;
        }
      }

    });

    module.exports = AppModel;

  });
