define('nori/view/ApplicationView',
  function (require, module, exports) {

    var _this,
        _appContainerEl,
        _appEl,
        _renderer          = require('nori/utils/Renderer'),
        _domUtils          = require('nudoru/browser/DOMUtils'),
        _notificationView  = require('nudoru/component/ToastView'),
        _toolTipView       = require('nudoru/component/ToolTipView'),
        _messageBoxView    = require('nudoru/component/MessageBoxView'),
        _messageBoxCreator = require('nudoru/component/MessageBoxCreator'),
        _modalCoverView    = require('nudoru/component/ModalCoverView');

    //----------------------------------------------------------------------------
    //  Accessors
    //----------------------------------------------------------------------------

    function getAppContainerEl() {
      return _appContainerEl;
    }

    function getAppEl() {
      return _appEl;
    }

    //----------------------------------------------------------------------------
    //  Initialization
    //----------------------------------------------------------------------------

    function initializeApplicationView(scaffoldTemplates) {
      _this = this;

      _renderer.initialize();

      attachApplicationScaffolding(scaffoldTemplates);

      _this.initializeComponentViews();

      initializeApplicationElements();
      initializeComponents();
    }

    function attachApplicationScaffolding(templates) {
      if(!templates) {
        return;
      }

      var bodyEl = document.querySelector('body');

      templates.forEach(function (templ) {
        bodyEl.appendChild(_domUtils.HTMLStrToNode(_this.template().getSource('template__' + templ, {})));
      });
    }

    function initializeApplicationElements() {
      _appContainerEl = document.getElementById('app__container');
      _appEl          = document.getElementById('app__contents');
    }

    function initializeComponents() {
      _toolTipView.initialize('tooltip__container');
      _notificationView.initialize('toast__container');
      _messageBoxView.initialize('messagebox__container');
      _modalCoverView.initialize();
    }

    /**
     * Alter the UI on resize or scroll
     * @param sizeObj Props: width, height
     * @param scrollObj Props: left, top
     */
    function layoutUI(sizeObj, scrollObj) {
      //
    }

    //----------------------------------------------------------------------------
    //  Messaging
    //----------------------------------------------------------------------------

    function mbCreator() {
      return _messageBoxCreator;
    }

    /**
     * Show a message box
     * @param obj
     */
    function addMessageBox(obj) {
      return _messageBoxView.add(obj);
    }

    function removeMessageBox(id) {
      _messageBoxView.remove(id);
    }

    /**
     * Show a popup message box
     * @param message
     */
    function alert(message, title) {
      return mbCreator().alert(title || 'Alert', message);
    }

    /**
     * Show notificiation
     * @param obj
     */
    function addNotification(obj) {
      return _notificationView.add(obj);
    }

    /**
     * Display a notification "toast"
     * @param title The title
     * @param message The message
     */
    function notify(message, title, type) {
      return addNotification({
        title  : title || '',
        type   : type || _notificationView.type().DEFAULT,
        message: message
      });
    }

    /**
     * After app initialization, remove the loading message
     */
    function removeLoadingMessage() {
      var cover   = document.querySelector('#initialization__cover'),
          message = document.querySelector('.initialization__message');

      TweenLite.to(cover, 1, {
        alpha: 0, ease: Quad.easeOut, onComplete: function () {
          cover.parentNode.removeChild(cover);
        }
      });

      TweenLite.to(message, 2, {
        top: "+=50px", ease: Quad.easeIn, onComplete: function () {
          cover.removeChild(message);
        }
      });
    }

    //----------------------------------------------------------------------------
    //  API
    //----------------------------------------------------------------------------

    module.exports.initializeApplicationView     = initializeApplicationView;
    module.exports.initializeApplicationElements = initializeApplicationElements;
    module.exports.initializeComponents          = initializeComponents;
    module.exports.mbCreator                     = mbCreator;
    module.exports.addMessageBox                 = addMessageBox;
    module.exports.removeMessageBox              = removeMessageBox;
    module.exports.addNotification               = addNotification;
    module.exports.alert                         = alert;
    module.exports.notify                        = notify;
    module.exports.removeLoadingMessage          = removeLoadingMessage;
    module.exports.layoutUI                      = layoutUI;
    module.exports.getAppContainerEl             = getAppContainerEl;
    module.exports.getAppEl                      = getAppEl;

  });