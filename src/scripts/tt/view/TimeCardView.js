define('TT.View.TimeCardView',
  function (require, module, exports) {

    var _domUtils = require('Nudoru.Browser.DOMUtils');

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.setProjectsModel();

        this.initializeSubView(initObj);

        this.getProjectsModel().forEach(function(store){
          console.log(store.get('projectTitle'),store.get('resourceName'));
        });
      }
    }

    function viewWillUpdate() {
      this.updateStateFromProjectsModel();
    }

    function render() {
      this.viewWillRender();
      this.setHTML(this.getTemplate()(this.getState()));
      //DOM elemetn created in mount() this.setDOMElement(_domUtils.HTMLStrToNode(this.getHTML()));
      this.viewDidRender();
    }

    function viewDidMount() {
      //
    }

    function viewWillUnmount() {
      //
    }

    exports.initialize = initialize;
    exports.render = render;
    exports.viewDidMount = viewDidMount;
    exports.viewWillUnmount = viewWillUnmount;
  });