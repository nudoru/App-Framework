APP.createNameSpace('APP.AppView.AbstractView');
APP.AppView.AbstractView = {
  state: {},

  methods: {

    eventDispatcher: nudoru.events.EventDispatcher,
    appView: APP.AppView,
    id: 'AbstractView',
    parent: undefined,
    data: [],
    children: [],
    cssClass: '',
    template: '',
    html: '',
    element: undefined,

    initialize: function(id, parent, data, template) {
      this.id = id;
      this.parent = parent;
      this.data = data;
      this.template = template;
      NDebugger.log('['+this.id+'] initialize: ' + data);
    },

    render: function() {
      this.html = '<div id="'+this.id+'" class="'+this.cssClass+'">' + data.toString() + '</div>';
    },

    getHTML: function() {
      return this.html;
    },

    addToParent: function() {
      //
    },

    removeFromParent: function() {
      //
    },

    addChildView: function(view) {
      this.children.push(view);
    },

    removeView: function(view) {
      ArrayUtils.removeItem(this.children, view);
    },

    show: function() {
      //
    },

    hide: function() {
      //
    },

    destroy: function() {
      var current;

      while(this.children.length) {
        current = this.children[0];
        if(current instanceof AbstractView) {
          current.destroy();
        }
        this.removeView(current);
      }

      this.children = [];
    }
  },

  closures: []
};

