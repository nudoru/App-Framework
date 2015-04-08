/**
 Image light box view functionality based on Medium.com
 https://medium.com/designing-medium/image-zoom-on-medium-24d146fc0c20

 Based on this implemention
 http://www.jqueryscript.net/demo/Medium-Style-jQuery-Image-Enlargement-Plugin-Fluidbox/

 Dependencies
  - jQuery
  - GSAP (TweenLite)
  - RxJS
*/


nudoru.createNameSpace('nudoru.components.FloatImageView');
nudoru.components.FloatImageView = (function() {

  var _coverDivID = 'floatimage__cover',
      _floatingImageClass = '.floatimage__srcimage',
      _zoomedImageClass = 'floatimage__zoomedimage',
      _viewPortCoverEl,
      _viewPortCoverClickStream,
      _captionEl,
      _currentImageElement;

  /**
   * Entry point, initialize elements and hide cover
   */
  function initialize() {
    _viewPortCoverEl = document.getElementById(_coverDivID);

    _captionEl = _viewPortCoverEl.querySelector('.floatimage__caption');

    hideFloatImageCover();

    _viewPortCoverClickStream = Rx.Observable.fromEvent(_viewPortCoverEl, APP.globals().mouseClickEvtStr)
      .subscribe(function() {
        hideFloatImageCover();
      });
  }

  /**
   * Apply functionality to div/container of div>img 's
   * @param container
   */
  function apply(container) {
    getFloatingElementsInContainerAsArray(container).forEach(function(el) {

      //var elParent = el.parentNode;
      //elParent.
      DOMUtils.wrapElement('<div class="floatimage__wrapper" />', el);

      el.addEventListener(APP.globals().mouseClickEvtStr, onImageClick, false);
    });
  }



  /**
   * Show the image when the image element is clicked
   * @param evt
   */
  function onImageClick(evt) {
    showImage(evt.target);
  }

  /**
   * Present the image that was clicked
   * @param imageEl
   */
  function showImage(imageEl) {
    // Will happen if you click on the icon
    if(imageEl.tagName.toLowerCase() === 'div') {
      _currentImageElement = imageEl.querySelector('img');
    } else {
      _currentImageElement = imageEl;
    }

    // Calculations
    var vpFill = 0.75,
        imgSrc = _currentImageElement.getAttribute('src'),
        imgAlt = _currentImageElement.getAttribute('alt'),
        imgWidth = _currentImageElement.clientWidth,
        imgHeight = _currentImageElement.clientHeight,
        imgPosition = DOMUtils.offset(_currentImageElement),
        imgRatio = imgWidth/imgHeight,
        imgTargetScale = 1,
        vpWidth = window.innerWidth,
        vpHeight = window.innerHeight,
        vpScrollTop = document.body.scrollTop,
        vpScrollLeft = document.body.scrollLeft,
        vpRatio = vpWidth / vpHeight,
        imgOriginX = imgPosition.left - vpScrollLeft,
        imgOriginY = imgPosition.top - vpScrollTop,
        imgTargetX,
        imgTargetY,
        imgTargetWidth,
        imgTargetHeight;

    if(vpRatio > imgRatio) {
      imgTargetScale = vpHeight * vpFill / imgHeight;
    } else {
      imgTargetScale = vpWidth * vpFill / imgWidth;
    }

    imgTargetWidth = imgWidth * imgTargetScale;
    imgTargetHeight = imgHeight * imgTargetScale;

    imgTargetX = (vpWidth / 2) - (imgTargetWidth/2) - imgPosition.left + vpScrollLeft;
    imgTargetY = (vpHeight / 2) - (imgTargetHeight/2) - imgPosition.top + vpScrollTop;

    var zoomImage = DOMUtils.HTMLStrToNode('<div class="'+_zoomedImageClass+'"></div>');

    zoomImage.style.backgroundImage = 'url("'+imgSrc+'")';
    zoomImage.style.left = imgOriginX+'px';
    zoomImage.style.top = imgOriginY+'px';
    zoomImage.style.width = imgWidth+'px';
    zoomImage.style.height = imgHeight+'px';

    _viewPortCoverEl.appendChild(zoomImage);

    // Animate
    TweenLite.to(_currentImageElement, 0.25, {alpha:0, ease:Circ.easeOut});
    TweenLite.to(zoomImage, 0.5, {width: imgTargetWidth, height: imgTargetHeight, x: imgTargetX, y: imgTargetY, ease:Circ.easeOut});
    showFloatImageCover();

    // Caption
    if(imgAlt.length >= 1) {
      _captionEl.innerHTML = '<p>'+imgAlt+'</p>';
    } else {
      _captionEl.innerHTML = '';
    }

  }

  /**
   * Remove functionality to div/container of div>img 's
   * @param container
   */
  function remove(container) {
    if(!container) {
      return;
    }

    getFloatingElementsInContainerAsArray(container).forEach(function(el) {
      el.removeEventListener('click', onImageClick);
    });
  }

  /**
   * Get an array of elements in the container returned as Array instead of a Node list
   * @param container
   * @returns {*}
   */
  function getFloatingElementsInContainerAsArray(container) {
    if(!DOMUtils.isDomObj(container)) {
      return [];
    }
    return Array.prototype.slice.call(container.querySelectorAll(_floatingImageClass));
  }

  /**
   * Show the div covering the UI
   */
  function showFloatImageCover() {
    TweenLite.to(_viewPortCoverEl,0.25, {autoAlpha: 1, ease:Circ.easeOut});
  }

  /**
   * Hide the div covering the UI
   */
  function hideFloatImageCover() {
    if(_currentImageElement) {
      TweenLite.to(_currentImageElement, 0.1, {alpha:1, ease:Circ.easeOut});
      _currentImageElement = null;
    }

    TweenLite.to(_viewPortCoverEl,0.25, {autoAlpha: 0, ease:Circ.easeOut, onComplete:hideFloatImageCoverComplete});
  }

  /**
   * The enlarged image is present during the cover fade out, remove it when that's completed
   */
  function hideFloatImageCoverComplete() {
    var zoomedImage = _viewPortCoverEl.querySelector('.'+_zoomedImageClass);
    if(zoomedImage) {
      _viewPortCoverEl.removeChild(zoomedImage);
    }
  }

  /**
   * Public API
   */
  return {
    initialize: initialize,
    apply: apply,
    remove: remove
  };

}());