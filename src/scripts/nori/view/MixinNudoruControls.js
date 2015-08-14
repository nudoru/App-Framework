define('nori/view/MixinNudoruControls',
  function (require, module, exports) {

    var _notificationView  = require('nudoru/component/ToastView'),
        _toolTipView       = require('nudoru/component/ToolTipView'),
        _messageBoxView    = require('nudoru/component/MessageBoxView'),
        _messageBoxCreator = require('nudoru/component/MessageBoxCreator'),
        _modalCoverView    = require('nudoru/component/ModalCoverView');

    function initializeNudoruControls() {
      _toolTipView.initialize('tooltip__container');
      _notificationView.initialize('toast__container');
      _messageBoxView.initialize('messagebox__container');
      _modalCoverView.initialize();
    }

    function mbCreator() {
      return _messageBoxCreator;
    }

    function addMessageBox(obj) {
      return _messageBoxView.add(obj);
    }

    function removeMessageBox(id) {
      _messageBoxView.remove(id);
    }

    function alert(message, title) {
      return mbCreator().alert(title || 'Alert', message);
    }

    function addNotification(obj) {
      return _notificationView.add(obj);
    }

    function notify(message, title, type) {
      return addNotification({
        title  : title || '',
        type   : type || _notificationView.type().DEFAULT,
        message: message
      });
    }

    module.exports.initializeNudoruControls = initializeNudoruControls;
    module.exports.mbCreator                = mbCreator;
    module.exports.addMessageBox            = addMessageBox;
    module.exports.removeMessageBox         = removeMessageBox;
    module.exports.addNotification          = addNotification;
    module.exports.alert                    = alert;
    module.exports.notify                   = notify;
  });