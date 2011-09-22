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
