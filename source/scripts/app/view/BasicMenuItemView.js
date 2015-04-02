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
      var noicon = '<li><button class="dd-menu-item" data-value="<%= value %>"><%= label %></button></li>',
        icon = '<li class="dd-menu-item icon-left"><button class="dd-menu-item indent" data-value="<%= value %>">'+this.iconTemplate+'<%= label %></button></li>',
        templatehtml = noicon;

      if(this.toggle) {
        templatehtml = icon;
      }

      this.template = _.template(templatehtml);
      this.renderedHTML = this.template(this.data);
      this.element = $(this.renderedHTML);
      this.iconElement = this.element.find('i');
      this.anchorElement = this.element.find('a');
    },

    select: function() {
      if(this.selected || this.element === undefined) {
        return;
      }
      this.selected = true;

      if(this.toggle) {
        this.iconElement.removeClass(this.iconDeselectedClass);
        this.iconElement.addClass(this.iconSelectedClass);
      }
    },

    showOverEffect: function() {
      TweenMax.to(this.element, 0.25, {backgroundColor:'rgba(255,255,255,.25)', ease:Circ.easeOut});
      TweenMax.to(this.anchorElement, 0.15, {boxShadow: "0px 0px 20px rgba(255,255,255,.25)", ease:Circ.easeOut});
    },

    showOutEffect: function() {
      TweenMax.killTweensOf(this.anchorElement);
      TweenMax.to(this.element, 0.5, {backgroundColor:'rgba(255,255,255,0)', ease:Circ.easeIn});
      TweenMax.to(this.anchorElement, 0.25, {boxShadow: "0px 0px 0px rgba(255,255,255,0)", ease:Circ.easeIn});
    },

    showDepressEffect: function() {
      var tl = new TimelineMax();
      tl.to(this.element,0.1, {scale:0.9, ease: Quad.easeOut});
      tl.to(this.element,0.5, {scale:1, ease: Elastic.easeOut});
    },

    deselect: function() {
      if(!this.selected || this.element === undefined) {
        return;
      }
      this.selected = false;

      if(this.toggle) {
        this.iconElement.removeClass(this.iconSelectedClass);
        this.iconElement.addClass(this.iconDeselectedClass);
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