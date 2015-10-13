export default {

  /**
   * Create shared 3d perspective for all children
   * @param el
   */
  apply3DToContainer: function (el) {
    TweenLite.set(el, {
      css: {
        perspective      : 800,
        perspectiveOrigin: '50% 50%'
      }
    });
  },

  /**
   * Apply basic CSS props
   * @param el
   */
  apply3DToElement: function (el) {
    TweenLite.set(el, {
      css: {
        transformStyle    : "preserve-3d",
        backfaceVisibility: "hidden",
        transformOrigin   : '50% 50%'
      }
    });
  },

  /**
   * Apply basic 3d props and set unique perspective for children
   * @param el
   */
  applyUnique3DToElement: function (el) {
    TweenLite.set(el, {
      css: {
        transformStyle      : "preserve-3d",
        backfaceVisibility  : "hidden",
        transformPerspective: 600,
        transformOrigin     : '50% 50%'
      }
    });
  }

};
