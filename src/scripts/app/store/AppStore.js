define('app/store/AppStore',
  function (require, module, exports) {

    var _noriActionConstants    = require('nori/action/ActionConstants'),
        _mixinMapFactory        = require('nori/store/MixinMapFactory'),
        _mixinObservableSubject = require('nori/utils/MixinObservableSubject'),
        _mixinReducerStore      = require('nori/store/MixinReducerStore');

    /**
     * This application store contains "reducer store" functionality based on Redux.
     * The store state may only be changed from events as applied in reducer functions.
     * The store received all events from the event bus and forwards them to all
     * reducer functions to modify state as needed. Once they have run, the
     * handleStateMutation function is called to dispatch an event to the bus, or
     * notify subscribers via an observable.
     *
     * Events => handleApplicationEvents => applyReducers => handleStateMutation => Notify
     */
    var AppStore = Nori.createStore({

      mixins: [
        _mixinMapFactory,
        _mixinReducerStore,
        _mixinObservableSubject()
      ],

      initialize: function () {
        this.addReducer(this.defaultReducerFunction);
        this.initializeReducerStore();
        this.createSubject('storeInitialized');
      },

      loadStore: function () {
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
       * @param action
       * @returns {*}
       */
      defaultReducerFunction: function (state, action) {
        state = state || {};

        switch (action.type) {

          case _noriActionConstants.CHANGE_STORE_STATE:
            return _.assign({}, state, action.payload.data);

          default:
            return state;
        }
      },

      /**
       * Called after all reducers have run to broadcast possible updates. Does
       * not check to see if the state was actually updated.
       */
      handleStateMutation: function () {
        console.log('Handle state mutation', this.getState());
        this.notifySubscribers();
      }

    });

    module.exports = AppStore();

  });
