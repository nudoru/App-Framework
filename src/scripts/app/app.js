import AppActions from './action/ActionCreator.js';
import AppActionConstants from './action/ActionConstants.js';
import NoriActions from '../nori/action/ActionCreator.js';
import AppStore from './store/AppStore.js';
import AppView from './view/AppView.js';

/**
 * "Controller" for a Nori application. The controller is responsible for
 * bootstrapping the app and possibly handling socket/server interaction.
 * Any additional functionality should be handled in a specific module.
 */
let App = Nori.createApplication({

  mixins: [],

  /**
   * Initialize
   * Called when App is required in main.js
   */
  initialize: function () {
    AppView.initialize();
    AppStore.initialize();

    this.runApplication();
  },

  /**
   * Remove the "Please wait" cover and start the app
   */
  runApplication: function () {
    AppView.removeLoadingMessage();
    AppView.showViewForChangedCondition(true); // Start with the route in the current URL
  }

});

export default App;