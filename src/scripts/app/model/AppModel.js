define('app/model/AppModel',
  function (require, module, exports) {

    var _noriEventConstants     = require('nori/events/EventConstants'),
        _mixinMapFactory        = require('nori/model/MixinMapFactory'),
        _mixinObservableSubject = require('nori/utils/MixinObservableSubject'),
        _mixinReducerModel      = require('nori/model/MixinReducerModel');

    /**
     * This application model contains "reducer model" functionality based on Redux.
     * The model state may only be changed from events as applied in reducer functions.
     * The model received all events from the event bus and forwards them to all
     * reducer functions to modify state as needed. Once they have run, the
     * handleStateMutation function is called to dispatch an event to the bus, or
     * notify subscribers via an observable.
     *
     * Events => handleApplicationEvents => applyReducers => handleStateMutation => Notify
     */
    var AppModel = Nori.createApplicationModel({

      mixins: [
        _mixinMapFactory,
        _mixinReducerModel,
        _mixinObservableSubject()
      ],

      initialize: function () {
        this.addReducer(this.defaultReducerFunction);
        this.initializeReducerModel();
        this.createSubject('storeInitialized');
      },

      loadStore: function() {
        // Set initial state from data contained in the config.js file
        this.setState(Nori.config());
        this.storeReady();
      },

      /**
       * Set or load any necessary data and then broadcast a initialized event.
       */
      storeReady: function () {
        this.setState({greeting: 'Hello world!'});

        // Testing
        console.log('Initial app state:', this.getState());

        this.notifySubscribersOf('storeInitialized');
      },

      /**
       * Modify state based on incoming events. Returns a copy of the modified
       * state and does not modify the state directly.
       * Can compose state transformations
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
       * Called after all reducers have run to broadcast possible updates. Does
       * not check to see if the state was actually updated.
       */
      handleStateMutation: function () {
        this.notifySubscribers();
      }

    });

    module.exports = AppModel;

  });
