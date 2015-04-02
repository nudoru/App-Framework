/**
 Image light box view functionality based on Medium.com
 https://medium.com/designing-medium/image-zoom-on-medium-24d146fc0c20

 Based on this implemention
 http://www.jqueryscript.net/demo/Medium-Style-jQuery-Image-Enlargement-Plugin-Fluidbox/

 Dependencies
  - jQuery
  - GSAP (TweenMax)
  - RxJS
*/


APP.createNameSpace('APP.AppView.FloatImageView');
APP.AppView.FloatImageView = (function() {

  var _coverDivID = '#floatimage__cover',
      _floatingImageClass = '.floatimage__srcimage',
      _zoomedImageClass = 'floatimage__zoomedimage',
      _viewPortCoverEl,
      _viewPortCoverClickStream,
      _captionEl,
      _currentImageElement,
      _window = $(window);

  /**
   * Entry point, initialize elements and hide cover
   */
  function initialize() {
    _viewPortCoverEl = $(_coverDivID);

    _captionEl = _viewPortCoverEl.find('.floatimage__caption');

    hideFloatImageCover();

    _viewPortCoverClickStream = Rx.Observable.fromEvent(_viewPortCoverEl[0], APP.globals().mouseClickEvtStr)
      .subscribe(function() {
        hideFloatImageCover();
      });
  }

  /**
   * Apply functionality to div/container of div>img 's
   * @param container
   */
  function apply(container) {
    getFloatingElementsInContainer(container).forEach(function(el) {
      $(el).wrapInner('<div class="floatimage__wrapper" />');
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
      _currentImageElement = $(imageEl).find('img');
    } else {
      _currentImageElement = $(imageEl);
    }

    // Calculations
    var vpFill = 0.75,
        imgSrc = _currentImageElement.attr('src'),
        imgAlt = _currentImageElement.attr('alt'),
        imgWidth = _currentImageElement.width(),
        imgHeight = _currentImageElement.height(),
        imgPosition = _currentImageElement.offset(),
        imgRatio = imgWidth/imgHeight,
        imgTargetScale = 1,
        vpWidth = _window.width(),
        vpHeight = _window.height(),
        vpScrollTop = _window.scrollTop(),
        vpScrollLeft = _window.scrollLeft(),
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

    var zoomImage = $('<div class="'+_zoomedImageClass+'"></div>');
    zoomImage.css({ 'background-image': 'url("'+imgSrc+'")',
      'top': imgOriginY,
      'left': imgOriginX,
      'width': imgWidth,
      'height': imgHeight });

    _viewPortCoverEl.append(zoomImage);

    // Animate
    TweenMax.to(_currentImageElement, 0.25, {alpha:0, ease:Circ.easeOut});
    TweenMax.to(zoomImage, 0.5, {width: imgTargetWidth, height: imgTargetHeight, x: imgTargetX, y: imgTargetY, ease:Circ.easeOut});
    showFloatImageCover();

    // Caption
    if(imgAlt.length >= 1) {
      _captionEl.html('<p>'+imgAlt+'</p>');
    } else {
      _captionEl.html('');
    }

  }

  /**
   * Remove functionality to div/container of div>img 's
   * @param container
   */
  function remove(container) {
    if(!container) {
      console.log('[FloatingImagesView] nothing to remove from');
      return;
    }

    getFloatingElementsInContainer(container).forEach(function(el) {
      $(el).unwrap();
      el.removeEventListener('click', onImageClick);
    });
  }

  /**
   * Validate that the container is a jQuery object
   * @param container
   * @returns {*}
   */
  function validateFloatingContainer(container) {
    if(container instanceof jQuery) {
      return container;
    } else {
      // TODO test for a string? etc?
      console.log('[FloatingImagesView] Container is not a jQuery object');
      return null;
    }
  }

  /**
   * Get array of a's to apply functionality to
   * @param container
   * @returns {*}
   */
  function getFloatingElementsInContainer(container) {
    return validateFloatingContainer(container).find(_floatingImageClass).toArray();
  }

  /**
   * Show the div covering the UI
   */
  function showFloatImageCover() {
    TweenMax.to(_viewPortCoverEl,0.25, {autoAlpha: 1, ease:Circ.easeOut});
  }

  /**
   * Hide the div covering the UI
   */
  function hideFloatImageCover() {
    if(_currentImageElement) {
      TweenMax.to(_currentImageElement, 0.1, {alpha:1, ease:Circ.easeOut});
      _currentImageElement = null;
    }

    TweenMax.to(_viewPortCoverEl,0.25, {autoAlpha: 0, ease:Circ.easeOut, onComplete:hideFloatImageCoverComplete});
  }

  /**
   * The enlarged image is present during the cover fade out, remove it when that's completed
   */
  function hideFloatImageCoverComplete() {
    _viewPortCoverEl.find('.'+_zoomedImageClass).remove();
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