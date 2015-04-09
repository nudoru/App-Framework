var NumberUtils = {
  isInteger: function(str) {
    return (/^-?\d+$/.test(str));
  },

  rndNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  clamp: function(val,min,max){
    return Math.max(min,Math.min(max,val));
  }

};