//----------------------------------------------------------------------------
//  A menu item
//----------------------------------------------------------------------------

APP.createNameSpace('APP.AppView.BasicMenuItemView');
APP.AppView.BasicMenuItemView = {
  state: {
    visible: true,
    selected: false
  },

  methods: {
    eventDispatcher: APP.EventDispatcher,
    data: null,
    label: '',
    template: '',
    renderedHTML: null,
    element: null,
    iconElement: null,
    anchorElement: null,
    labelOverStream: null,
    labelOutStream: null,
    labelSelectStream: null,
    iconTemplate: null,
    iconDeselectedClass: null,
    iconSelectedClass: null,
    toggle: null,

    initialize: function(data) {
      this.data = data;

      if(this.data.toggle) {
        this.toggle = true;
        this.iconSelectedClass = 'fa-check';
        this.iconDeselectedClass = 'fa-circle-thin';
      }

      this.label = data.label;

      this.iconTemplate = '';

      this.render();

      this.selected = false;
    },

    render: function() {
      var templatehtml = DOMUtils.getHTMLTemplate('template__menu-item');

      if(this.toggle) {
        templatehtml = DOMUtils.getHTMLTemplate('template__menu-item-icon');
      }

      this.template = _.template(templatehtml);
      this.renderedHTML = this.template(this.data);
      this.element = DOMUtils.HTMLStrToNode(this.renderedHTML);
      this.iconElement = this.element.querySelector('i');
      this.anchorElement = this.element.querySelector('button');
    },

    select: function() {
      if(this.selected || this.element === undefined) {
        return;
      }
      this.selected = true;

      if(this.toggle) {
        DOMUtils.removeClass(this.iconElement, this.iconDeselectedClass);
        DOMUtils.addClass(this.iconElement, this.iconSelectedClass);
      }
    },

    showOverEffect: function() {
      TweenLite.to(this.element, 0.1, {backgroundColor:'rgba(255,255,255,.25)', ease:Circ.easeOut});
    },

    showOutEffect: function() {
      TweenLite.to(this.element, 0.25, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
    },

    showDepressEffect: function() {
      var tl = new TimelineLite();
      tl.to(this.element,0.1, {scale:0.9, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});
    },

    deselect: function() {
      if(!this.selected || this.element === undefined) {
        return;
      }
      this.selected = false;

      if(this.toggle) {
        DOMUtils.removeClass(this.iconElement, this.iconSelectedClass);
        DOMUtils.addClass(this.iconElement, this.iconDeselectedClass);
      }
    },

    toggleSelect: function() {
      if(this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }

  },

  closures: []
};