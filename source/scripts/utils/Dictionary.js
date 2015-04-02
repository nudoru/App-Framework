//http://stackoverflow.com/questions/17787754/creating-a-net-like-dictionary-object-in-javascript
function Dictionary(values) {
  this.values = values || {};

  var forEachIn = function (object, action) {
    for (var property in object) {
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        action(property, object[property]);
      }
    }
  };

  Dictionary.prototype.containsKey = function(key) {
    return Object.prototype.hasOwnProperty.call(this.values, key) &&
      Object.prototype.propertyIsEnumerable.call(this.values, key);
  };

  Dictionary.prototype.forEach = function(action) {
    forEachIn(this.values, action);
  };

  Dictionary.prototype.lookup = function(key) {
    return this.values[key];
  };

  Dictionary.prototype.add = function(key, value) {
    this.values[key] = value;
  };
}