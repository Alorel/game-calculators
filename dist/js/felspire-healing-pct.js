require(["jquery","global"],function(t){var a=t("#_hpt-hpmax"),r=t("#_hpt-hpplus"),e=t("[name=pack]"),o=t("[name=no-waste]"),i=t("#_res-autodrink-L"),n=t("#_res-autodrink-M"),l=t("#_res-autodrink-S"),u=function(){var t=parseFloat(a.val()),u=parseFloat(r.val()),d=16*(100+u),p=80*(100+u),h=200*(100+u);if(o.is(":checked")){var s=parseFloat(e.filter(":checked").val());d+=s,p+=s,h+=s}i.text(Math.roundToTwo((t-h)/t*100)+"%").attr("data-original-title",(t-h).format()+" HP"),n.text(Math.roundToTwo((t-p)/t*100)+"%").attr("data-original-title",(t-p).format()+" HP"),l.text(Math.roundToTwo((t-d)/t*100)+"%").attr("data-original-title",(t-d).format()+" HP")};t("input").on("change keyup",u),setTimeout(u,10)});