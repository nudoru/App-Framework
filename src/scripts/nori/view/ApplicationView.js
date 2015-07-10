define('Nori.View.ApplicationView',
  function (require, module, exports) {

    var _appContainerEl,
        _appEl,
        _renderer          = require('Nori.View.Renderer'),
        _notificationView  = require('Nudoru.Component.ToastView'),
        _toolTipView       = require('Nudoru.Component.ToolTipView'),
        _messageBoxView    = require('Nudoru.Component.MessageBoxView'),
        _messageBoxCreator = require('Nudoru.Component.MessageBoxCreator'),
        _modalCoverView    = require('Nudoru.Component.ModalCoverView');

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

    function initializeApplicationView() {
      _renderer.initialize();

      initializeApplicationElements();
      initializeComponents();
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
      var cover   = document.getElementById('initialization__cover'),
          message = document.getElementsByClassName('initialization__message')[0];

      TweenLite.to(cover, 1, {
        alpha: 0, ease: Quad.easeOut, onComplete: function () {
          document.body.removeChild(cover);
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

    exports.initializeApplicationView     = initializeApplicationView;
    exports.initializeApplicationElements = initializeApplicationElements;
    exports.initializeComponents          = initializeComponents;
    exports.mbCreator            = mbCreator;
    exports.addMessageBox        = addMessageBox;
    exports.removeMessageBox     = removeMessageBox;
    exports.addNotification      = addNotification;
    exports.alert                = alert;
    exports.notify               = notify;
    exports.removeLoadingMessage = removeLoadingMessage;
    exports.layoutUI             = layoutUI;
    exports.getAppContainerEl    = getAppContainerEl;
    exports.getAppEl             = getAppEl;

  });