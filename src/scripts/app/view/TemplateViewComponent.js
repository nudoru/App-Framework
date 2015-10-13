import _noriActions from '../../nori/action/ActionCreator';
import _appView from './AppView';
import _appStore from '../store/AppStore';
import _template from '../../nori/utils/Templating.js';
import _domUtils from '../../nudoru/browser/DOMUtils.js';
import _mixinDOMManipulation from '../../nori/view/MixinDOMManipulation.js';

/**
 * Module for a dynamic application view for a route or a persistent view
 */

let Component = Nori.view().createComponentView({
  /**
   * Mixins are other modules/objects that multiple components share, provides
   * common functionality between then.
   */
  mixins: [
    _mixinDOMManipulation
  ],

  /**
   * Initialize and bind, called once on first render. Parent component is
   * initialized from app view
   * @param initProps
   */
  initialize(initProps) {
    //Bind to a map, update will be called on changes to the map
    //this.bind(_appStore); // Reducer store, map id string or map object
  },

  /**
   * Sub view components. Provide config props as param to factory method
   * @returns {{regionID: *}}
   */
  //defineRegions() {
  //  return {
  //    regionID : _regionModule({
  //      id        : 'game__playerstats',
  //      mountPoint: '#game__localplayerstats'
  //    })
  //  };
  //},

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here.
   *
   * The method is called only on the first render and cached to speed up renders
   *
   * @returns {Function}
   */
  //template: function() {
  //  // assumes the template ID matches the component's ID as passed on initialize
  //  var html = _template.getSource(this.getID());
  //  return _.template(html);
  //},

  /**
   * Create an object to be used to define events on DOM elements
   * @returns {}
   */
  //defineEvents: function() {
  //  return {
  //    'click #button-id': handleButton
  //  };
  //},

  /**
   * Set initial state properties. Call once on first render
   */
  getInitialState() {
    return _appStore.getState();
  },

  /**
   * State change on bound stores (map, etc.) Return nextState object
   */
  componentWillUpdate() {
    var nextState = _appStore.getState();
    nextState.greeting += ' (updated)';
    return nextState;
  },

  /**
   * Component HTML was attached to the DOM
   */
  componentDidMount() {
    //
  },

  /**
   * Component will be removed from the DOM
   */
  componentWillUnmount() {
    // Clean up
  }

});

export default Component;