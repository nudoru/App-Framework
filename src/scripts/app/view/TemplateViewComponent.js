import Nori from '../../nori/Nori.js';
import NoriActions from '../../nori/action/ActionCreator';
import AppView from './AppView';
import AppStore from '../store/AppStore';
import Template from '../../nori/view/Templating.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import MixinDOMManipulation from '../../nori/view/Tweens.js';

/**
 * Module for a dynamic application view for a route or a persistent view
 */

export default Nori.createComponent('default', {

  mixins: [
    MixinDOMManipulation
  ],

  initialize(initProps) {
    // Bind changes in state or prop to functions
    this.state.onChange = this._stateChange;
    // this.props.onChange = function() {};
  },

  _stateChange() {
    console.log(this.getID(), 'the state was changed', this.state);
  },

  getDefaultProps() {
    return {};
  },

  getDefaultState() {
    return AppStore.getState();
  },

  //defineChildren() {},

  //getDOMEvents() {
  //  return {
  //    'evtstring selector': this._handlerFunc
  //  };
  //},

  //componentWillReceiveProps(nextProps){
  //},

  //componentWillUpdate(nextProps, nextState) {
  //},

  //componentDidUpdate(lastProps, lastState) {
  //},

  // Return a _.template object
  template() {
    return this.tmpl(`
      <div class="padded">
        <h1>{{ greeting }}</h1>
        <p>Default subview template.</p>
      </div>
    `);
  },

  // Return HTML
  //render() {
  //  let combined = _.merge({}, this.props, this.state);
  //},

  //componentDidMount() {
  //  let el = this.dom();
  //},

  //componentWillUnmount() {
  //},

  //componentWillDispose() {
  //},

});