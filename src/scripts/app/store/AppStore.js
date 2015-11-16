import Nori from '../../nori/Nori.js';
import NoriActionConstants from '../../nori/action/ActionConstants.js';
import AppActionConstants from '../action/ActionConstants.js';
import StringUtils from '../../nudoru/core/StringUtils.js';
import NumUtils from '../../nudoru/core/NumberUtils.js';
import ArrayUtils from '../../nudoru/core/ArrayUtils.js';
import _ from '../../vendor/lodash.min.js';

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
let AppStoreModule = Nori.createStore({

  mixins: [],

  initialize() {
    this.addReducer(this.appStateReducerFunction);
    this.initializeReducerStore();
  },

  /**
   * Starting application state
   */
  getDefaultState() {
    return {
      currentState: 'chillin',
      greeting: 'Hello world!'
    };
  },

  /**
   * Modify state based on incoming events. Returns a copy of the modified
   * state and does not modify the state directly.
   * Can compose state transformations
   * return _.assign({}, state, otherStateTransformer(state));
   */
  appStateReducerFunction(state, action) {
    state = state || {};

    switch (action.type) {

      case NoriActionConstants.CHANGE_STORE_STATE:
        return _.merge({}, state, action.payload);

      default:
        return state;
    }
  },


});

let AppStore = AppStoreModule();

export default AppStore;