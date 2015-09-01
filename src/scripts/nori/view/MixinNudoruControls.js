var MixinNudoruControls = function () {

  var _notificationView  = require('../../nudoru/components/ToastView.js'),
      _toolTipView       = require('../../nudoru/components/ToolTipView.js'),
      _messageBoxView    = require('../../nudoru/components/MessageBoxView.js'),
      _messageBoxCreator = require('../../nudoru/components/MessageBoxCreator.js'),
      _modalCoverView    = require('../../nudoru/components/ModalCoverView.js');

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

  return {
    initializeNudoruControls: initializeNudoruControls,
    mbCreator               : mbCreator,
    addMessageBox           : addMessageBox,
    removeMessageBox        : removeMessageBox,
    addNotification         : addNotification,
    alert                   : alert,
    notify                  : notify
  };

};

module.exports = MixinNudoruControls();