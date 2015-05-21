/**
 * Utility functions for Nudoru component views
 * last updated 5/5/15
 */

define('nudoru.components.ComponentViewUtils',
  function (require, module, exports) {

    /**
     * Create shared 3d perspective for all children
     * @param el
     */
    function apply3DToContainer(el) {
      TweenLite.set(el, {
        css: {
          perspective: 800,
          perspectiveOrigin: '50% 50%'
        }
      });
    }

    /**
     * Apply basic CSS props
     * @param el
     */
    function apply3DToComponentElement(el) {
      TweenLite.set(el, {
        css: {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformOrigin: '50% 50%'
        }
      });
    }

    /**
     * Apply basic 3d props and set unique perspective for children
     * @param el
     */
    function applyUnique3DToComponentElement(el) {
      TweenLite.set(el, {
        css: {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformPerspective: 600,
          transformOrigin: '50% 50%'
        }
      });
    }

    exports.apply3DToContainer = apply3DToContainer;
    exports.apply3DToComponentElement = apply3DToComponentElement;
    exports.applyUnique3DToComponentElement = applyUnique3DToComponentElement;

  });
