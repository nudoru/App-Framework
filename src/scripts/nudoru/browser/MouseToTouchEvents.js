/**
 * Converts mouse event strings to touch based equivalents
 * @param eventStr
 * @returns {*}
 */

export default function (eventStr) {
  switch (eventStr) {
    case('click'):
      return 'touchend';
    case('mousedown'):
      return 'touchstart';
    case('mouseup'):
      return 'touchend';
    case('mousemove'):
      return 'touchmove';
    default:
      return eventStr;
  }
}