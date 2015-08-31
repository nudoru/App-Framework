ndefine('nori/utils/Cookie',
  function (nrequire, module, exports) {

    var Cookie = function () {

      function create(name, value, days) {
        var expires = "", date;
        if (days) {
          date    = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
      }

      function read(name) {
        var nameEQ = name + "=",
            ca     = document.cookie.split(';'),
            i, c;

        i = ca.length;
        while (i--) {
          c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }
        return null;
      }

      function remove(name) {
        create(name, '', -1);
      }

      return {
        create: create,
        read  : read,
        remove: remove
      };

    };

    module.exports = Cookie();

  });