import _appActions from './action/ActionCreator.js';
import _appActionConstants from './action/ActionConstants.js';
import _noriActions from '../nori/action/ActionCreator.js';
import _appStore from './store/AppStore.js';
import _appView from './view/AppView.js';



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
    _appView.initialize();
    _appStore.initialize();

    this.runApplication();
  },

  /**
   * Remove the "Please wait" cover and start the app
   */
  runApplication: function () {
    _appView.removeLoadingMessage();
    _appView.showViewFromURLHash(true); // Start with the route in the current URL
  }

});

export default App;