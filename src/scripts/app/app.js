import Nori from '../nori/Nori.js';
import StoreWatcher from '../nori/extra/StoreWatcher.js';
import AppActions from './action/ActionCreator.js';
import AppActionConstants from './action/ActionConstants.js';
import NoriActions from '../nori/action/ActionCreator.js';
import AppStore from './store/AppStore.js';
import AppView from './view/AppView.js';
import ForOwn from '../nudoru/util/ForOwn.js';

/**
 * "Controller" for a Nori application. The controller is responsible for
 * bootstrapping the app and possibly handling socket/server interaction.
 * Any additional functionality should be handled in a specific module.
 */
let App = Nori.createClass({

  // Add ability to watch store mutations and act as a dispatcher
  mixins: [StoreWatcher()],

  /**
   * Initialize
   * Called when App is required in main.js
   */
  initialize() {
    AppView.initialize();
    AppStore.initialize();

    this.watchStore(AppStore);

    this.runApplication();
  },

  /**
   * Remove the "Please wait" cover and start the app
   */
  runApplication() {
    AppView.removeLoadingMessage();
    AppView.showViewForChangedCondition(true); // Start with the route in the current URL
  }

})();

export default App;