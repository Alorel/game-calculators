define([
         'jquery',
         'bootstrap'
       ], function ($) {
  var localStorage = 'localStorage' in window ? localStorage : null;

  Math.roundToTwo = function (num) {
    return +(Math.round(num + "e+2") + "e-2");
  };

  Number.prototype.format = function () {
    var n = this,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+this || 0).toFixed(0)) + "",
        j = i.length;
    j     = j > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",");
  };

  window.async = function (cb) {
    setTimeout(cb, 0);
  };

  window.parseGET = function () {
    var ret    = {},
        search = location.search.split("&"),
        i      = 0,
        item;

    if (search.length) {
      search[0] = search[0].substr(1, search[0].length);

      for (; i < search.length; i++) {
        item                             = search[i].split("=");
        ret[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
      }
    }

    return ret;
  };

  $("[data-tooltip]").tooltip({
                                container: 'body',
                                html     : true
                              });

  $(".nav-tabs [data-toggle=tab]").click(function () {
    location.hash = $(this).attr("href");
  });

  if (location.hash) {
    $("a[href='" + location.hash + "']").click();
  }

  AloCfg.setPrefix("gamecalc").setValues().bind();
});