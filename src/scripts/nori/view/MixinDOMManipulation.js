var MixinDOMManipulation = function () {

  function hideEl(selector) {
    TweenLite.set(document.querySelector(selector), {
      alpha  : 0,
      display: 'none'
    });
  }

  function showEl(selector) {
    TweenLite.set(document.querySelector(selector), {
      alpha  : 1,
      display: 'block'
    });
  }

  return {
    showEl: showEl,
    hideEl: hideEl
  };

};

module.exports = MixinDOMManipulation();