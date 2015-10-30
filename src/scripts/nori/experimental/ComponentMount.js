import _ from '../../vendor/lodash.min.js';
import Template from './Templating.js';
import Renderer from './Renderer.js';
import EventDelegator from './RxEventDelegator.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';

/**
 * Playing with a few ideas in this module
 */

export default {

  mount(component) {
    this.mountComponent(component);
    Object.keys(component.getChildren()).forEach(childID => this.mountComponent(component.child(childID)));
  },

  unmount(component) {
    component.getChildren().forEach(child => unmountComponent(child));
    component.unmount(component);
  },

  mountComponent(component) {
    if (component.isMounted()) {
      console.warn('Component ' + component.getID() + ' is already mounted.');
      return;
    }

    let componentHTML = component.getHTML(),
        componentEl;

    if (componentHTML) {
      componentEl = Renderer({
        key           : component.getKey(),
        method        : component.props.mountMethod,
        lastAdjacent  : component.getLastAdjacentNode(),
        targetSelector: component.getMountPoint(),
        html          : componentHTML
      });

      //if (this.shouldDelegateEvents(this.props, this.state)) {
      //  _events.delegateEvents(this.getDOMElement(), this.getDOMEvents(), this.props.autoFormEvents);
      //}

      component.componentDidMount();
    } else {
      console.warn('Component ' + component.getID() + ' has no HTML.')
    }
  },


  unmountComponent(component) {

  },

}