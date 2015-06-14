define('TT.View.TimeCardView',
  function (require, module, exports) {

    var _domUtils = require('Nudoru.Browser.DOMUtils');

    function initialize(initObj) {
      if(!this.isInitialized()) {
        this.initializeSubView(initObj);
      }
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