

var ArrayUtils = {

  // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
  unique: function(arry) {
    var o = {},
        i,
        l = arry.length,
        r = [];
    for(i=0; i<l;i+=1) {
      o[arry[i]] = arry[i];
    }
    for(i in o) {
      r.push(o[i]);
    }
    return r;
  },

  removeIndex: function(arr, idx) {
    return arr.splice(idx,1);
  },

  removeItem: function(arr, item) {
    var idx = arr.indexOf(item);
    if(idx > -1) {
      arr.splice(idx, 1);
    }
  },

  rndElement: function(arry) {
    return arry[NumberUtils.rndNumber(0,arry.length-1)];
  },

  getRandomSetOfElements: function(srcarry, max) {
    var arry = [],
      i = 0,
      len = NumberUtils.rndNumber(1,max);

    for(;i<len;i++) {
      arry.push(ArrayUtils.rndElement(srcarry));
    }

    return arry;
  },

  getDifferences: function(arr1, arr2) {
    var dif = [];

    arr1.forEach(function(value) {
      var present = false,
        i = 0,
        len = arr2.length;

      for(; i<len; i++) {
        if(value === arr2[i]) {
          present = true;
          break;
        }
      }

      if(!present) {
        dif.push(value);
      }

    });

    return dif;
  }

};