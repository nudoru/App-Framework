/**
 * Created by matt on 1/15/15
 */

nudoru.createNameSpace('nudoru.components.DDMenuBarView');
nudoru.components.DDMenuBarView = {
  methods: {
    containerEl: null,
    barEl: null,
    data: null,
    children: null,
    isKeepOpen: false,
    DOMUtils: require('nudoru.utils.DOMUtils'),
    objectUtils: require('nudoru.utils.ObjectUtils'),

    initialize: function(elID, data, keep) {
      this.containerEl = document.getElementById(elID);
      this.data = data;

      this.isKeepOpen = keep ? true : false;

      this.render();
    },

    render: function() {
      var i = 0,
          len = this.data.length;

      this.children = [];

      this.barEl = this.DOMUtils.HTMLStrToNode('<ul></ul>');
      for(; i<len; i++) {
        var menuobj = this.objectUtils.basicFactory(nudoru.components.DDMenuView);
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
