/* @flow weak */

import DOMUtils from '../../nudoru/browser/DOMUtils.js';

export default function (component, lastAdjacent) {

  let domEl, currentHTML,
      html = component.html(),
      mountPoint = document.querySelector(component.props.mount);

  if (!mountPoint) {
    console.warn('Component',component.id(),'invalid mount', component.props.mount);
    return;
  }

  domEl = DOMUtils.HTMLStrToNode(html);
  DOMUtils.addClass(domEl, 'nori__vc');
  DOMUtils.addClass(domEl, component.className());

  if (component.props.mountMethod === 'replace') {
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