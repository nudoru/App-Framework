/*******************************************************************************
 * Namespace creation utility function
 *
 * From
 * http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
 ******************************************************************************/
var NNameSpace = {
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

/**
 * Simplify usage of namespaced code but creating local vars. Eval is use for
 * simplicity.
 *
 * Usage:
 * NImport(this, ['Nudoru.Browser.NLorem']);
 * console.log('lorem: '+this.NLorem.getText(3,5));
 *
 * @param context object to add the property to
 * @param libArry array of name spaced objects
 */
//function NImport(context, libArry) {
//  libArry.forEach(function(lib) {
//    var parts = lib.split('.'),
//      obj = parts[parts.length-1];
//    context[obj] = eval(lib);
//  });
//}


