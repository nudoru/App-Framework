/**
 * Initial file for the Application
 */

import BrowserInfo from './nudoru/browser/BrowserInfo.js';
import App from './app/App.js';

(function () {

  if (BrowserInfo.notSupported || BrowserInfo.isIE9) {
    document.querySelector('body').innerHTML = '<h3>For the best experience, please use Internet Explorer 10+, Firefox, Chrome or Safari to view this application.</h3>';
  } else {

    window.onload = function () {
      App.initialize();
    };

  }

}());