//----------------------------------------------------------------------------
//  Grid Items
//----------------------------------------------------------------------------

define('APP.AppView.ItemGridView.GridViewItem',
  function(require, module, exports) {
    var _visible = true,
      _selected = false,
      _fancyEffects = false,
      _animating = false,
      _data = null,
      _element = null,
      _elementContent = null,
      _dataEl = null,
      _imageEl = null,
      _imageAlphaTarget = 0.25,
      _DOMUtils = require('nudoru.utils.DOMUtils'),
      _template = require('nudoru.utils.NTemplate');

    function initialize(idata) {
      _data = idata;
      _fancyEffects = APP.globals().enhanced;
      render();
    }

    function render() {
      _element = _template.asElement('template__item-tile', _data);
      _elementContent = _element.querySelector('.item__content');
      _dataEl = _element.querySelector('.item__data');
      _imageEl = _element.querySelector('.item__image-wrapper');
    }

    function getID() {
      if (_data) {
        return _data.id;
      }

      return null;
    }

    function getElement() {
      return _element;
    }

    function isVisible() {
      return _visible;
    }

    function setIsAnimating(state) {
      _animating = state;
    }

    function getIsAnimating() {
      return _animating;
    }

    /**
     * Calculations needed after the items is added to the container is on the DOM
     */
    function postRender() {
      _imageAlphaTarget = window.getComputedStyle(_imageEl, null).getPropertyValue('opacity');

      if (_fancyEffects) {
        TweenLite.set(_element, {
          css: {
            transformPerspective: 800,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }
        });
      }
    }

    function isInViewport() {
      return _DOMUtils.isElementInViewport(_element);
    }

    function show() {
      if (_visible || _element === undefined) {
        return;
      }
      _visible = true;

      if (isInViewport()) {

        if (_fancyEffects) {
          TweenLite.to(_element, 0.25, {
            autoAlpha: 1,
            rotationY: 0,
            transformOrigin: 'right',
            scale: 1,
            ease: Circ.easeOut
          });
        } else {
          TweenLite.to(_element, 0.25, {
            autoAlpha: 1,
            scale: 1,
            ease: Circ.easeOut
          });
        }

      } else {
        TweenLite.to(_element, 0, {autoAlpha: 1, scale: 1});
      }
    }

    function hide() {
      if (!_visible || _element === undefined) {
        return;
      }
      _visible = false;

      if (isInViewport()) {

        if (_fancyEffects) {
          TweenLite.to(_element, 1, {
            autoAlpha: 0,
            rotationY: 90,
            transformOrigin: 'right',
            scale: 1,
            ease: Expo.easeOut,
            onComplete: resetHiddenItemSize.bind(this)
          });
        } else {
          TweenLite.to(_element, 1, {
            autoAlpha: 0,
            scale: 0.25,
            ease: Expo.easeOut,
            onComplete: resetHiddenItemSize.bind(this)
          });
        }


      } else {
        TweenLite.to(_element, 0, {
          autoAlpha: 0,
          scale: 0.25,
          onComplete: resetHiddenItemSize.bind(this)
        });
      }

    }

    /**
     * Resetting the elements size prevents odd packery behavior as it tries to fit resizing items
     */
    function resetHiddenItemSize() {
      TweenLite.to(_element, 0, {scale: 1});
    }

    /**
     * On item mouse over
     */
    function select() {
      if (_selected || _element === undefined || !_visible || _animating) {
        return;
      }
      _selected = true;

      if (_fancyEffects) {
        TweenLite.to(_element, 0.25, {scale: 1.05, ease: Back.easeOut});
        TweenLite.to(_imageEl, 0.5, {
          alpha: 1,
          scale: 1.25,
          ease: Circ.easeOut
        });
      } else {
        TweenLite.to(_element, 0.25, {scale: 1.05, ease: Back.easeOut});
        TweenLite.to(_imageEl, 0.5, {
          alpha: 1,
          scale: 1.25,
          ease: Circ.easeOut
        });
      }

    }

    /**
     * On item mouse out
     */
    function deselect() {
      if (!_selected || _element === undefined || !_visible || _animating) {
        return;
      }
      _selected = false;

      if (_fancyEffects) {
        TweenLite.to(_element, 0.5, {
          rotationY: 0,
          scale: 1,
          ease: Back.easeOut
        });
        TweenLite.to(_imageEl, 0.5, {
          alpha: _imageAlphaTarget,
          scale: 1,
          ease: Circ.easeOut
        });
      } else {
        TweenLite.to(_element, 0.5, {scale: 1, ease: Back.easeOut});
        TweenLite.to(_imageEl, 0.5, {
          alpha: _imageAlphaTarget,
          scale: 1,
          ease: Circ.easeOut
        });
      }

    }

    /**
     * On item click / tap
     */
    function depress() {
      if (_element === undefined || !_visible) {
        return;
      }

      var tl = new TimelineLite();
      tl.to(_element, 0.1, {scale: 0.8, ease: Quad.easeOut});
      tl.to(_element, 0.5, {scale: 1, ease: Elastic.easeOut});

      TweenLite.to(_imageEl, 0.5, {
        alpha: _imageAlphaTarget,
        scale: 1,
        ease: Circ.easeOut
      });
    }

    exports.initialize = initialize;
    exports.render = render;
    exports.postRender = postRender;
    exports.getElement = getElement;
    exports.getID = getID;
    exports.isVisible = isVisible;
    exports.isInViewport = isInViewport;
    exports.getIsAnimating = getIsAnimating;
    exports.setIsAnimating = setIsAnimating;
    exports.show = show;
    exports.hide = hide;
    exports.select = select;
    exports.deselect = deselect;
    exports.depress = depress;

  });