// Simple replacement for Lodash ForOwn method
// https://lodash.com/docs#forOwn
// Matt Perkins 11/18/14

export default function (object, fn) {
  Object.keys(object).forEach(key => {
    fn.call(null, object[key], key);
  });
}