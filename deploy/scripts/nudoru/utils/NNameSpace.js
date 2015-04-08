var NNameSpace = {
  //http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
  createNameSpace: function(ns_string, parent, parentStr) {
    var parts = ns_string.split('.'),
        len;

    if(parts[0] === parentStr) {
      parts = parts.slice(1);
    }

    len = parts.length;

    for(var i=0 ;i<len; i++) {
      var moduleName = parts[i];
      if(typeof parent[moduleName] === 'undefined') {
        parent[moduleName] = {};
      }
      parent = parent[moduleName];
    }

    return parent;
  }
};