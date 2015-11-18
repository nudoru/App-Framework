// Simple replacement for Lodash ForOwn method
// https://lodash.com/docs#forOwn
// https://github.com/lodash/lodash/blob/master/lodash.js#L3831 createBaseFor
// Matt Perkins 11/18/14

export default function (object, fn) {
  // almost 2x faster than above iterating over keys w/ forEach
  let keys = Object.keys(object),
      len = keys.length,
      i = -1;
  while (++i < len) {
    let key = keys[i];
    fn.call(null, object[key], key);
  }
}