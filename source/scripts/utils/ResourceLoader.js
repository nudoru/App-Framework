var ResourceLoader = (function() {
  var resources = [],
    onProgressCallback,
    onCompletedCallback,
    onErrorCallback,
    totalResources,
    loadTimer,
    loadDelay = 10,
    currentResource;

  function load(resourceArr, progressCallback, completedCallback, errCallback) {
    resources = resourceArr;
    totalResources = resources.length;
    onProgressCallback = progressCallback;
    onCompletedCallback = completedCallback;
    onErrorCallback = errCallback;

    loadNextResource();
  }

  function loadNextResource() {

    onProgressCallback.call(getPercentDependenciesLoaded());

    if(resources.length === 0) {
      onCompletedCallback.call();
      return;
    }

    currentResource = resources.shift();
    var dependencyType = currentResource.substr(currentResource.length-3);

    if(dependencyType === '.js') {
      attachScript(currentResource);
    } else {
      cacheImage(currentResource);
    }
  }

  function getPercentDependenciesLoaded() {
    return (100 - (resources.length / totalResources * 100)).toFixed(0);
  }

  function attachScript(url) {
    DEBUGGER.log('ResourceLoader - Attaching script: '+url);
    $.ajax({
      type: 'GET',
      url: url,
      success: onDependencyLoaded,
      error: onDependencyLoadError,
      dataType: 'script',
      cache: true
    });
  }

  function cacheImage(url) {
    DEBUGGER.log('ResourceLoader - Caching image: '+url);
    var img = new Image();
    img.onload = onDependencyLoaded;
    img.src = url + "?" + Math.random();
    $('#cache').append("<img src='" + url + "'/>"); //Keep for IE
  }

  function onDependencyLoaded() {
    loadTimer = setTimeout(loadDependencies, loadDelay);
  }

  function onDependencyLoadError(data, status, jqxhr) {
    DEBUGGER.log('ResourceLoader - Failed to load dependency: '+status);
    onErrorCallback.call(currentResource);
  }

  return {
    getPercentLoaded: getPercentDependenciesLoaded(),
    load: load
  };

}());