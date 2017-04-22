require(['jquery'], function ($) {
  var $maxHP      = $("#_hpt-hpmax"),
      $hpPlus     = $("#_hpt-hpplus"),
      $hpPack     = $("[name=pack]"),
      $noWaste    = $("[name=no-waste]"),
      $autodrinkL = $("#_res-autodrink-L"),
      $autodrinkM = $("#_res-autodrink-M"),
      $autodrinkS = $("#_res-autodrink-S"),
      recalculate = function () {
        var maxHP  = parseFloat($maxHP.val()),
            hpPlus = parseFloat($hpPlus.val()),
            healS  = 1600 / 100 * (100 + hpPlus),
            healM  = 8000 / 100 * (100 + hpPlus),
            healL  = 20000 / 100 * (100 + hpPlus);

        if ($noWaste.is(":checked")) {
          var hpPack = parseFloat($hpPack.filter(":checked").val());
          healS += hpPack;
          healM += hpPack;
          healL += hpPack;
        }

        $autodrinkL.text(Math.roundToTwo((maxHP - healL) / maxHP * 100) + "%")
                   .attr("data-original-title", (maxHP - healL).format() + " HP");
        $autodrinkM.text(Math.roundToTwo((maxHP - healM) / maxHP * 100) + "%")
                   .attr("data-original-title", (maxHP - healM).format() + " HP");
        $autodrinkS.text(Math.roundToTwo((maxHP - healS) / maxHP * 100) + "%")
                   .attr("data-original-title", (maxHP - healS).format() + " HP");
      };

  $("input").on("change keyup", recalculate);
  setTimeout(recalculate, 10);
});