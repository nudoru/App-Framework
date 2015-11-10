/* @flow weak */

import _notificationView from '../../nudoru/components/ToastView.js';
import _toolTipView from '../../nudoru/components/ToolTipView.js';
import _messageBoxView from '../../nudoru/components/MessageBoxView.js';
import _messageBoxCreator from '../../nudoru/components/MessageBoxCreator.js';
import _modalCoverView from '../../nudoru/components/ModalCoverView.js';

let MixinNudoruControls = function () {

  var _alerts = [];

  function initializeNudoruControls() {
    _toolTipView.initialize('tooltip__container');
    _notificationView.initialize('toast__container');
    _messageBoxView.initialize('messagebox__container');
    _modalCoverView.initialize('modal__container');
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

  function alert(message) {
    _alerts.push(customAlert(message, 'Alert', 'danger'));
  }

  function positiveAlert(message, title) {
    _alerts.push(customAlert(message, title, 'success'));
  }

  function negativeAlert(message, title) {
    _alerts.push(customAlert(message, title, 'warning'));
  }

  function customAlert(message, title, type) {
    return _messageBoxView.add({
      title  : title,
      content: '<p>' + message + '</p>',
      type   : type,
      modal  : false,
      width  : 400,
      buttons: [
        {
          label  : 'Close',
          id     : 'Close',
          type   : '',
          icon   : 'times',
          onClick: null
        }
      ]
    });
  }


  function closeAllAlerts() {
    _alerts.forEach(id => {
      removeMessageBox(id);
    });
    _alerts = [];
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
    positiveAlert           : positiveAlert,
    negativeAlert           : negativeAlert,
    closeAllAlerts          : closeAllAlerts,
    notify                  : notify
  };

};

export default MixinNudoruControls;