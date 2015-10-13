import _noriActionConstants from '../../nori/action/ActionConstants.js';
import _appActionConstants from '../action/ActionConstants.js';
import _stringUtils from '../../nudoru/core/StringUtils.js';
import _numUtils from '../../nudoru/core/NumberUtils.js';
import _arrayUtils from '../../nudoru/core/ArrayUtils.js';

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

    this.setState();
  },

  initialState() {
    return {
      greeting: 'Hello world!'
    };
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
  appStateReducerFunction(state, action) {
    state = state || {};

    switch (action.type) {

      case _noriActionConstants.CHANGE_STORE_STATE:
        return _.merge({}, state, action.payload.data);

      default:
        return state;
    }
  },


});

let AppStore = AppStoreModule();

export default AppStore;