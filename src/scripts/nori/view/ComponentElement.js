import _ from '../../vendor/lodash.min.js';

export default function element(type, props, state, parent, children) {
  return {
    type     : type,
    props    : props,
    state    : state,
    lastProps: null,
    lastState: null,
    parent   : null,
    children : children || {},

    getProps() {
      return _.assign({}, this.props);
    },

    getState() {
      return _.assign({}, this.state);
    },

    shouldUpdate(nextProps, nextState) {
      nextProps = nextProps || this.props;
      nextState = nextState || this.state;

      let isStateEq = _.isEqual(nextState, this.state),
          isPropsEq = _.isEqual(nextProps, this.props);

      return !(isStateEq) || !(isPropsEq);
    },

    setProps(nextProps) {
      this.lastProps = _.assign({}, this.props);
      this.props     = _.assign({}, this.props, nextProps);
    },

    setState(nextState) {
      this.lastState = _.assign({}, this.state);
      this.state     = _.assign({}, this.state, nextState);
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
    },
  }
}