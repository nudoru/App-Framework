/* @flow weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

import DOMUtils from '../../nudoru/browser/DOMUtils.js';

const MNT_REPLACE = 'replace',
      MNT_APPEND  = 'append';

export default function ({index, uniqueCls, method, lastAdjacent, targetSelector, html}) {

  let domEl,
      mountPoint = document.querySelector(targetSelector),
      currentHTML;

  method = method || MNT_REPLACE;
  index = index || 'nk';

  if (!mountPoint) {
    console.warn('Render, target selector not found', targetSelector);
    return;
  }

  if (html) {
    domEl = DOMUtils.HTMLStrToNode(html);
    //domEl.setAttribute('data-norivcid', index);
    DOMUtils.addClass(domEl, 'nori__vc');
    DOMUtils.addClass(domEl, uniqueCls);

    if (method === MNT_REPLACE) {
      currentHTML = mountPoint.innerHTML;
      if (html !== currentHTML) {
        //DOMUtils.removeAllElements(mountPoint);
        mountPoint.innerHTML = '';
        mountPoint.appendChild(domEl);
      }
    } else {
      mountPoint.insertBefore(domEl, lastAdjacent);
    }
  }

  return domEl;
}