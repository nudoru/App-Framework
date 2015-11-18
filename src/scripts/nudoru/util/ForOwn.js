// Simple replacement for Lodash ForOwn method
// https://lodash.com/docs#forOwn
// http://jsperf.com/loop-for-in-vs-object-keys-foreach/21

export default function (object, fn) {
  let keys = Object.keys(object), key;
  // FowOwnRight while (key = keys.pop()) {
  while (key = keys.shift()) {
    fn.call(null, object[key], key);
  }
}