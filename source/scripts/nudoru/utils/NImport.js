/**
 * Simplify usage of namespaced code but creating local vars. Eval is use for
 * simplicity.
 *
 * Usage:
 * NImport(this, ['nudoru.utils.NLorem']);
 * console.log('lorem: '+this.NLorem.getText(3,5));
 *
 * @param context object to add the property to
 * @param libArry array of name spaced objects
 */

function NImport(context, libArry) {
  libArry.forEach(function(lib) {
    var parts = lib.split('.'),
      obj = parts[parts.length-1];
    context[obj] = eval(lib);
  });
}