ndefine('app/action/ActionConstants',
  function (nrequire, module, exports) {
    var objUtils = nrequire('nudoru/core/ObjectUtils');

    /**
     * Event name string constants
     */

    _.merge(module.exports, objUtils.keyMirror({
      MUTATION_TYPE: null
    }));
  });