export default function element(props, state, parent, children) {
  return {
    props: props,
    state: state,
    parent: parent || null,
    children: children || [],
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
    setState(nextState) {
      if(shouldUpdate(null, nextState)) {
        this.state = nextState;
      }
    },
    setProps(nextProps) {
      if(shouldUpdate(nextProps, null)) {
        this.props = nextProps;
      }
    },
    getParent() {
      return this.parent;
    },
    setParent(newParent) {
      if(!_.isEqual(newParent, this.parent)) {
        this.parent = newParent;
      }
    },
    getChildren() {
      return this.children;
    },
    addChild(newChild) {
      this.children.push(newChild);
    }
  }
}