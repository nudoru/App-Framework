/* @flow weak */

import DOMUtils from '../../nudoru/browser/DOMUtils.js';

export default (component, lastAdjacent = null) => {

  let domEl, currentHTML,
      html = component.html(),
      mountPoint = document.querySelector(component.props.target);

  // For a child component that has no mount set, append to the end of the parent
  if(!mountPoint && component.getParent()) {
    console.warn(component.id() + 'has no mount point defined, attaching to parent');
    mountPoint = document.querySelector('.'+component.getParent().className());
  }

  if (!mountPoint) {
    console.warn('Component', component.id(), 'invalid mount', component.props.target);
    return;
  }

  domEl = DOMUtils.HTMLStrToNode(html);
  DOMUtils.addClass(domEl, 'nori__vc');
  DOMUtils.addClass(domEl, component.className());

  if (component.props.attach === 'replace') {
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