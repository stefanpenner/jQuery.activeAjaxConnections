if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n !== n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

(function(jQuery){
  var pool     = [],
      abortAll = function(){
    for(var id in this){
      this[id].abort && this[id].abort();
    }
  };

  jQuery.activeAjaxConnections = pool;
  jQuery.activeAjaxConnections.abortAll = abortAll;

  jQuery.ajaxSetup({
    beforeSend: function(request){
      pool.push(request);
    },
    ajaxComplete: function(request){
      var index = pool.indexOf(request);
      pool.splice(index,1);
    }
  });

}).call(this,jQuery);
