/* @flow weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

import DOMUtils from '../../nudoru/browser/DOMUtils.js';

const MNT_REPLACE = 'replace',
      MNT_APPEND  = 'append';

export default function ({key, method, lastAdjacent, targetSelector, html, callback}) {
  let domEl,
      mountPoint = document.querySelector(targetSelector),
      currentHTML;

  method = method || MNT_REPLACE;

  if (!mountPoint) {
    console.warn('Render, target selector not found', targetSelector);
    return;
  }

  currentHTML = mountPoint.innerHTML;

  domEl = DOMUtils.HTMLStrToNode(html);
  domEl.setAttribute('data-noriKey', key);

  if (html) {
    if (html !== currentHTML) {
      if (method === MNT_REPLACE) {
        mountPoint.innerHTML = '';
        mountPoint.appendChild(domEl);
      } else {
        mountPoint.insertBefore(domEl, lastAdjacent);
      }
    }
  }

  if (callback) {
    callback(domEl);
  }

  return domEl;
}