/**
 * Created by matt on 1/15/15
 * Modified 3/13/15
 */

nudoru.createNameSpace('nudoru.components.DDMenuBarView');
nudoru.components.DDMenuBarView = {
  methods: {

    eventDispatcher: null,
    containerEl: null,
    barEl: null,
    data: null,
    children: null,
    isKeepOpen: false,

    initialize: function(elID, data, keep) {
      this.eventDispatcher = nudoru.events.EventDispatcher;

      this.containerEl = document.getElementById(elID);
      this.data = data;

      this.isKeepOpen = keep ? true : false;

      this.render();
    },

    render: function() {
      var i = 0,
          len = this.data.length;

      this.children = [];

      this.barEl = nudoru.utils.DOMUtils.HTMLStrToNode('<ul></ul>');
      for(; i<len; i++) {
        var menuobj = nudoru.utils.ObjectUtils.basicFactory(nudoru.components.DDMenuView);
        menuobj.initialize(this.data[i], this.isKeepOpen);

        this.barEl.appendChild(menuobj.element);

        menuobj.postRender();

        this.children.push(menuobj);
      }

      this.containerEl.insertBefore(this.barEl, this.containerEl.firstChild);

      // hack to prevent clicking on menuItems from selecting text on ie since CSS isn't supported
      if(BrowserInfo.isIE) {
        this.containerEl.onselectstart = function() {
          return false;
        };
      }

    },

    resetAllSelections: function() {
      this.children.forEach(function(menu) {
        menu.deselectAllItems();
      });
    },

    setMenuSelections: function(data) {
      this.children.forEach(function(menu) {
        menu.setSelections(data);
      });
    }

  }
};
