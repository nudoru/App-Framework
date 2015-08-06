/**
 * Reference
 * https://lhorie.github.io/mithril/mithril.request.html
 */

define('nori/service/rest',
  function (require, module, exports) {

    function request(reqObj, success, error) {
      var xhr    = new XMLHttpRequest(),
          json   = reqObj.json || false,
          method = reqObj.method.toUpperCase() || 'GET',
          url    = reqObj.url,
          data   = reqObj.data || null;

      xhr.open(method, url, true, reqObj.user, reqObj.password);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              success.call(window, JSON.parse(xhr.responseText));
            }
            catch (e) {
              error.call(window, reqObj);
            }
          } else {
            error.call(window, reqObj);
          }
        }
      };

      if (json && method !== "GET") {
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      } else if (json && method === "GET") {
        xhr.setRequestHeader("Accept", "application/json, text/*");
      }

      xhr.send(data);
    }

    module.exports.request = request;

  });