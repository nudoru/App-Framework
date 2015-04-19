//----------------------------------------------------------------------------
//  Grid Items
//----------------------------------------------------------------------------

APP.createNameSpace('APP.AppView.ItemGridView.GridViewItem');
APP.AppView.ItemGridView.GridViewItem = {
  methods: {
    visible: true,
    selected: false,
    data: null,
    element: null,
    elementContent: null,
    dataEl: null,
    imageEl: null,
    imageAlphaTarget: 0.25,
    fancyEffects: false,
    animating: false,
    DOMUtils: require('nudoru.utils.DOMUtils'),
    template: require('nudoru.utils.NTemplate'),

    getID: function () {
      if (this.data) {
        return this.data.id;
      }

      return null;
    },

    initialize: function (data) {
      this.data = data;
      this.fancyEffects = APP.globals().enhanced;
      this.render();
    },

    render: function () {
      this.element = this.template.asElement('template__item-tile', this.data);
      this.elementContent = this.element.querySelector('.item__content');
      this.dataEl = this.element.querySelector('.item__data');
      this.imageEl = this.element.querySelector('.item__image-wrapper');
    },

    /**
     * Calculations needed after the items is added to the container is on the DOM
     */
    postRender: function () {
      this.imageAlphaTarget = window.getComputedStyle(this.imageEl, null).getPropertyValue('opacity');

      if (this.fancyEffects) {
        TweenLite.set(this.element, {
          css: {
            transformPerspective: 800,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }
        });
      }
    },

    isInViewport: function () {
      return this.DOMUtils.isElementInViewport(this.element);
    },

    show: function () {
      if (this.visible || this.element === undefined) {
        return;
      }
      this.visible = true;

      if (this.isInViewport()) {

        if (this.fancyEffects) {
          TweenLite.to(this.element, 0.25, {
            autoAlpha: 1,
            rotationY: 0,
            transformOrigin: 'right',
            scale: 1,
            ease: Circ.easeOut
          });
        } else {
          TweenLite.to(this.element, 0.25, {
            autoAlpha: 1,
            scale: 1,
            ease: Circ.easeOut
          });
        }

      } else {
        TweenLite.to(this.element, 0, {autoAlpha: 1, scale: 1});
      }
    },

    hide: function () {
      if (!this.visible || this.element === undefined) {
        return;
      }
      this.visible = false;

      if (this.isInViewport()) {

        if (this.fancyEffects) {
          TweenLite.to(this.element, 1, {
            autoAlpha: 0,
            rotationY: 90,
            transformOrigin: 'right',
            scale: 1,
            ease: Expo.easeOut,
            onComplete: this.resetHiddenItemSize.bind(this)
          });
        } else {
          TweenLite.to(this.element, 1, {
            autoAlpha: 0,
            scale: 0.25,
            ease: Expo.easeOut,
            onComplete: this.resetHiddenItemSize.bind(this)
          });
        }


      } else {
        TweenLite.to(this.element, 0, {
          autoAlpha: 0,
          scale: 0.25,
          onComplete: this.resetHiddenItemSize.bind(this)
        });
      }

    },

    /**
     * Resetting the elements size prevents odd packery behavior as it tries to fit resizing items
     */
    resetHiddenItemSize: function () {
      TweenLite.to(this.element, 0, {scale: 1});
    },

    toggleVisibility: function () {
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },

    /**
     * On item mouse over
     */
    select: function () {
      if (this.selected || this.element === undefined || !this.visible || this.animating) {
        return;
      }
      this.selected = true;

      if (this.fancyEffects) {
        TweenLite.to(this.element, 0.25, {scale: 1.05, ease: Back.easeOut});
        TweenLite.to(this.imageEl, 0.5, {
          alpha: 1,
          scale: 1.25,
          ease: Circ.easeOut
        });
      } else {
        TweenLite.to(this.element, 0.25, {scale: 1.05, ease: Back.easeOut});
        TweenLite.to(this.imageEl, 0.5, {
          alpha: 1,
          scale: 1.25,
          ease: Circ.easeOut
        });
      }

    },

    /**
     * On item mouse out
     */
    deselect: function () {
      if (!this.selected || this.element === undefined || !this.visible || this.animating) {
        return;
      }
      this.selected = false;

      if (this.fancyEffects) {
        TweenLite.to(this.element, 0.5, {
          rotationY: 0,
          scale: 1,
          ease: Back.easeOut
        });
        TweenLite.to(this.imageEl, 0.5, {
          alpha: this.imageAlphaTarget,
          scale: 1,
          ease: Circ.easeOut
        });
      } else {
        TweenLite.to(this.element, 0.5, {scale: 1, ease: Back.easeOut});
        TweenLite.to(this.imageEl, 0.5, {
          alpha: this.imageAlphaTarget,
          scale: 1,
          ease: Circ.easeOut
        });
      }

    },

    /**
     * On item click / tap
     */
    depress: function () {
      if (this.element === undefined || !this.visible) {
        return;
      }

      var tl = new TimelineLite();
      tl.to(this.element, 0.1, {scale: 0.8, ease: Quad.easeOut});
      tl.to(this.element, 0.5, {scale: 1, ease: Elastic.easeOut});

      TweenLite.to(this.imageEl, 0.5, {
        alpha: this.imageAlphaTarget,
        scale: 1,
        ease: Circ.easeOut
      });
    },

    toggleSelect: function () {
      if (this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }

  }
};