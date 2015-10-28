import NoriActions from '../../nori/action/ActionCreator';
import AppView from './AppView';
import AppStore from '../store/AppStore';
import Template from '../../nori/view/Templating.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import MixinDOMManipulation from '../../nori/view/MixinDOMManipulation.js';

/**
 * Module for a dynamic application view for a route or a persistent view
 */

export default Nori.view().createComponent('default', {

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
  //template(props, state) {
  //  return this.from(`<div></div>`);
  //},

  // Return HTML
  //render(props, state) {
  //  let combined = _.merge({}, props, state);
  //},

  componentDidMount() {
    let el = this.getDOMElement();
  },

  //componentWillUnmount() {
  //},

  //componentWillDispose() {
  //},

});