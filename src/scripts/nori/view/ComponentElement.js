import ObjectAssign from '../../nudoru/util/ObjectAssign.js';
import DeepEqual from '../../nudoru/util/DeepEqual.js';

/**
 * Holds state for an Component
 */

export default function (props, state, children) {
  return {
    props    : props,
    state    : state,
    lastProps: null,
    lastState: null,
    children : children || {},

    getProps() {
      return ObjectAssign({}, this.props);
    },

    getState() {
      return ObjectAssign({}, this.state);
    },

    shouldUpdate(nextProps, nextState) {
      nextProps = nextProps || this.props;
      nextState = nextState || this.state;

      let isStateEq = DeepEqual(nextState, this.state),
          isPropsEq = DeepEqual(nextProps, this.props);

      return !(isStateEq) || !(isPropsEq);
    },

    setProps(nextProps) {
      this.lastProps = ObjectAssign({}, this.props);
      this.props     = ObjectAssign({}, this.props, nextProps);
    },

    setState(nextState) {
      this.lastState = ObjectAssign({}, this.state);
      this.state     = ObjectAssign({}, this.state, nextState);
    },

    addChild(id, newChild) {
      if (!this.children.hasOwnProperty(id)) {
        this.children[id] = newChild;
      }
    },

    removeChild(id) {
      if (this.children.hasOwnProperty(id)) {
        delete this.children[id];
      }
    }
  };
}