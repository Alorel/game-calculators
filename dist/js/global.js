define(["jquery","bootstrap"],function(t){var o="localStorage"in window?o:null;Math.roundToTwo=function(t){return+(Math.round(t+"e+2")+"e-2")},Number.prototype.format=function(){var t=this,o=t<0?"-":"",n=parseInt(t=Math.abs(+this||0).toFixed(0))+"",e=n.length;return e=e>3?e%3:0,o+(e?n.substr(0,e)+",":"")+n.substr(e).replace(/(\d{3})(?=\d)/g,"$1,")},window.async=function(t){setTimeout(t,0)},window.parseGET=function(){var t,o={},n=location.search.split("&"),e=0;if(n.length)for(n[0]=n[0].substr(1,n[0].length);e<n.length;e++)t=n[e].split("="),o[decodeURIComponent(t[0])]=decodeURIComponent(t[1]);return o},t("[data-tooltip]").tooltip({container:"body",html:!0}),t(".nav-tabs [data-toggle=tab]").click(function(){location.hash=t(this).attr("href")}),location.hash&&t("a[href='"+location.hash+"']").click(),AloCfg.setPrefix("gamecalc").setValues().bind()});