/**
 * Ajax / Rest module.
 * Returns a promise for a request
 */

define('nori/service/rest',
  function (require, module, exports) {

    /**
     * Ajax requst using Promises
     * @param reqObj
     * @param success
     * @param error
     */
    function request(reqObj) {
      var xhr    = new XMLHttpRequest(),
          json   = reqObj.json || false,
          method = reqObj.method.toUpperCase() || 'GET',
          url    = reqObj.url,
          data   = reqObj.data || null;

      return new Promise(function (resolve, reject) {
        xhr.open(method, url, true, reqObj.user, reqObj.password);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                if (json) {
                  resolve(JSON.parse(xhr.responseText));
                } else {
                  resolve(xhr.responseText);
                }
              }
              catch (e) {
                handleError('Result', 'Error parsing JSON result');
              }
            } else {
              handleError(xhr.status, xhr.statusText);
            }
          }
        };

        xhr.onerror   = function () {
          return handleError('Network error');
        };
        xhr.ontimeout = function () {
          return handleError('Timeout');
        };
        xhr.onabort   = function () {
          return handleError('About');
        };

        // set non json header? 'application/x-www-form-urlencoded; charset=UTF-8'
        if (json && method !== "GET") {
          xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        } else if (json && method === "GET") {
          xhr.setRequestHeader("Accept", "application/json, text/*; odata=verbose");  // odata param for Sharepoint
        }

        xhr.send(data);

        function handleError(type, message) {
          message = message || '';
          reject(type + ' ' + message);
        }
      });

    }

    module.exports.request   = request;

  });