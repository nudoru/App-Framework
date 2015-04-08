var nudoru = nudoru || {};

nudoru = (function() {
  function createNameSpace(str) {
    return NNameSpace.createNameSpace(str, nudoru, 'nudoru');
  }

  return {
    createNameSpace: createNameSpace
  };
}());

nudoru.createNameSpace('nudoru.events');
nudoru.events = (function() {
  //
}());

nudoru.createNameSpace('nudoru.utils');
nudoru.utils = (function() {
  //
}());

nudoru.createNameSpace('nudoru.components');
nudoru.components = (function() {
  //
}());


