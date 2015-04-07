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

      this.iconTemplate = '<i class="fa fa-circle-thin"></i>';

      this.render();

      this.selected = false;
    },

    render: function() {
      var noicon = '<li><button class="js__menu-item" data-value="<%= value %>"><%= label %></button></li>',
        icon = '<li class="js__menu-item icon-left"><button class="js__menu-item menu__indent" data-value="<%= value %>">'+this.iconTemplate+'<%= label %></button></li>',
        templatehtml = noicon;

      if(this.toggle) {
        templatehtml = icon;
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
      //TweenLite.to(this.anchorElement, 0.15, {boxShadow: "0px 0px 20px rgba(255,255,255,.25)", ease:Circ.easeOut});
    },

    showOutEffect: function() {
      //TweenLite.killTweensOf(this.anchorElement);
      TweenLite.to(this.element, 0.25, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
      //TweenLite.to(this.anchorElement, 0.25, {boxShadow: "0px 0px 0px rgba(255,255,255,0)", ease:Circ.easeIn});
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