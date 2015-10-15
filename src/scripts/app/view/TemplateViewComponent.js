import NoriActions from '../../nori/action/ActionCreator';
import AppView from './AppView';
import AppStore from '../store/AppStore';
import Template from '../../nori/utils/Templating.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import MixinDOMManipulation from '../../nori/view/MixinDOMManipulation.js';

/**
 * Module for a dynamic application view for a route or a persistent view
 */

let Component = Nori.view().createComponentView({
  /**
   * Mixins are other modules/objects that multiple components share, provides
   * common functionality between then.
   */
  mixins: [
    MixinDOMManipulation
  ],

  /**
   * Initialize and bind, called once on first render. Parent component is
   * initialized from app view
   * @param initProps
   */
  initialize(initProps) {
    //Bind to a map, update will be called on changes to the map
    //this.bind(AppStore); // Reducer store, map id string or map object

    // Bind changes in state or prop to functions
    // this.state.onChange = function() {};
    // this.props.onChange = function() {};
  },

  /**
   * Default returns AppStore.getState():
   */
  //getInitialState() {},

  /**
   * Sub view components. Provide config props as param to factory method
   * @returns {{regionID: *}}
   */
  //defineRegions() {},

  /**
   * Returns a Lodash client side template function by getting the HTML source from
   * the matching <script type='text/template'> tag in the document. OR you may
   * specify the custom HTML to use here.
   *
   * The method is called only on the first render and cached to speed up renders
   *
   * @returns {Function}
   */
  //template: function() {},

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
    return AppStore.getState();
  },

  /**
   * State change on bound stores. Return nextState object
   */
  componentWillUpdate() {
    var nextState = AppStore.getState();
    nextState.greeting += ' (updated)';
    return nextState;
  },

  /**
   * Component HTML was attached to the DOM
   */
  componentDidMount() {
    let el = this.getDOMElement();
  },

  /**
   * Component will be removed from the DOM
   */
  componentWillUnmount() {}

});

export default Component;