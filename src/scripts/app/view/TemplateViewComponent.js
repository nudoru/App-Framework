import Nori from '../../nori/Nori.js';
import NoriActions from '../../nori/action/ActionCreator';
import AppView from './AppView';
import AppStore from '../store/AppStore';
import Template from '../../nori/view/Templating.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';
import ObjectAssign from '../../nudoru/util/ObjectAssign.js';

/**
 * Module for a dynamic application view for a route or a persistent view
 */

export default Nori.createComponent({

  mixins: [],

  //init() {
  //},

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

  // Return HTML
  // Cache the template function for improved performance
  render() {
    let combined     = ObjectAssign({}, this.props, this.state),
        templateFunc = this.tmpl(`
          <div class="padded">
            <h1>Hola</h1>
            <p>Default subview template.</p>
          </div>
        `);

    return templateFunc(combined);
  },

  //componentDidMount() {
  //  let el = this.dom();
  //},

  //componentWillUnmount() {
  //},

  //componentWillDispose() {
  //},

});