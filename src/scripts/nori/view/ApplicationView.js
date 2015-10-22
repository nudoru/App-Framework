/* @flow weak */

import Template from '../view/Templating.js';
import DOMUtils from '../../nudoru/browser/DOMUtils.js';

let ApplicationViewModule = function () {

  /**
   * Initialize
   * @param scaffoldTemplates template IDs to attached to the body for the app
   */
  function initializeApplicationView(scaffoldTemplates) {
    $attachApplicationScaffolding(scaffoldTemplates);
  }

  /**
   * Attach app HTML structure
   * @param templates
   */
  function $attachApplicationScaffolding(templates) {
    if (!templates) {
      return;
    }

    let bodyEl        = document.querySelector('body');

    templates.forEach(function (templ) {
      bodyEl.appendChild(DOMUtils.HTMLStrToNode(Template.getSource(templ, {})));
    });
  }

  /**
   * After app initialization, remove the loading message
   */
  function removeLoadingMessage() {
    let cover   = document.querySelector('#initialization__cover'),
        message = document.querySelector('.initialization__message');

    cover.parentNode.removeChild(cover);
    cover.removeChild(message);
  }

  return {
    initializeApplicationView: initializeApplicationView,
    removeLoadingMessage     : removeLoadingMessage
  };

};


export default ApplicationViewModule;