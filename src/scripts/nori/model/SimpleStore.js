define('nori/model/SimpleStore',
  function (require, module, exports) {
    var _state = Object.create(null);

    /**
     * Return a copy of the state
     * @returns {void|*}
     */
    function getState() {
      return _.assign({}, _state);
    }

    /**
     * Sets the state
     * @param state
     */
    function setState(state) {
      _state = state;
    }

    module.exports.getState = getState;
    module.exports.setState = setState;

  });