export default function () {

  let _observedStore,
      _actionMap = {};

  function watchStore(store) {
    _observedStore = store;
    _observedStore.subscribe(onStateMutation.bind(this));
  }

  function mapActionType(type, handler) {
    if(_actionMap.hasOwnProperty(type)) {
      unmapActionType(type);
    }

    _actionMap[type] = handler;
  }

  function unmapActionType(type) {
    if(_actionMap.hasOwnProperty(type)) {
      _actionMap[type] = null;
      delete _actionMap[type];
    }
  }

  function onStateMutation({type, state}) {
    if(_actionMap.hasOwnProperty(type)) {
      _actionMap[type].call(state);
    }
  }

  return {
    watchStore,
    mapActionType,
    unmapActionType
  }

}