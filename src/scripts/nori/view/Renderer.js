/* @flow weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

import DOMUtils from '../../nudoru/browser/DOMUtils.js';

const MNT_REPLACE = 'replace',
      MNT_APPEND  = 'append';

export default function ({key, method, lastAdjacent, targetSelector, html}) {

  let domEl,
      mountPoint = document.querySelector(targetSelector),
      currentHTML;

  method = method || MNT_REPLACE;
  key = key || 'nk';

  if (!mountPoint) {
    console.warn('Render, target selector not found', targetSelector);
    return;
  }

  if (html) {
    let jsClass = 'js__nvc'+key;
    domEl = DOMUtils.HTMLStrToNode(html);
    domEl.setAttribute('data-norivcid', key);
    DOMUtils.addClass(domEl, 'nori__vc');
    DOMUtils.addClass(domEl, jsClass);

    if (method === MNT_REPLACE) {
      currentHTML = mountPoint.innerHTML;
      if (html !== currentHTML) {
        mountPoint.innerHTML = '';
        mountPoint.appendChild(domEl);
      }
    } else {
      mountPoint.insertBefore(domEl, lastAdjacent);
    }
  }

  return domEl;
}