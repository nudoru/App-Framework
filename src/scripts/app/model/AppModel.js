define('app/model/AppModel',
  function (require, module, exports) {

    var _noriEvents         = require('nori/events/EventCreator'),
        _noriEventConstants = require('nori/events/EventConstants');

    var AppModel = Nori.createApplicationModel({

      initialize: function () {
        this.addReducer(this.defaultReducerFunction);
        this.initializeReducerModel();

        this.modelReady();
      },

      modelReady: function() {
        // testing _noriEvents.changeModelState('', {foo:'bar'});
        _noriEvents.applicationModelInitialized();
      },

      /**
       * Modify the state based on incoming events. Can compose state transformations
       * return _.assign({}, state, otherStateTransformer(state));
       * @param state
       * @param event
       * @returns {*}
       */
      defaultReducerFunction: function (state, event) {
        state = state || {};

        switch (event.type) {

          case _noriEventConstants.CHANGE_MODEL_STATE:
            return _.assign({}, state, event.payload.data);

          default:
            return state;
        }
      },

      /**
       * Handled update to state, don't
       */
      handleStateMutation: function () {
        // Eventbus _noriEvents.modelStateChanged();
        this.notifySubscribers();
      }

    });

    module.exports = AppModel;

  });
