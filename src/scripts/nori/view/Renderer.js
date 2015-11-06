/* @flow weak */

/**
 * Utility to handle all view DOM attachment tasks
 */

import DOMUtils from '../../nudoru/browser/DOMUtils.js';

const MNT_REPLACE = 'replace',
      MNT_APPEND  = 'append';

export default function ({uniqueCls, method, lastAdjacent, targetSelector, html}) {

  let domEl, currentHTML,
      mountPoint = document.querySelector(targetSelector);

  if (!mountPoint) {
    console.warn('Render, target selector not found', targetSelector);
    return;
  }

  method    = method || MNT_REPLACE;
  uniqueCls = uniqueCls || '';
  html      = html || '<div></div>';


  domEl = DOMUtils.HTMLStrToNode(html);
  DOMUtils.addClass(domEl, 'nori__vc');
  DOMUtils.addClass(domEl, uniqueCls);

  if (method === MNT_REPLACE) {
    currentHTML = mountPoint.innerHTML;
    if (html !== currentHTML) {
      mountPoint.innerHTML = '';
      mountPoint.appendChild(domEl);
    }
  } else {
    mountPoint.insertBefore(domEl, lastAdjacent);
  }


  return domEl;
}