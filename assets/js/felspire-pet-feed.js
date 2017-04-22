require(['jquery', 'global'], function ($) {
  var $feedRequired = $("[name=felsppet-reqfeed]"),
      $expRequired  = $("#felsppet-req-exp"),
      $currentExp   = $("#felsppet-curr-exp"),
      $f1           = $("#felsppet-feed1"),
      $f2           = $("#felsppet-feed2"),
      $g2           = $("#felsppet-gold2"),
      $f3           = $("#felsppet-feed3"),
      $g3           = $("#felsppet-gold3"),
      $f4           = $("#felsppet-feed4"),
      $g4           = $("#felsppet-gold4"),
      $gtotal       = $("#felsppet-gold-total"),
      recalculate   = function () {
        var expPerFeed  = parseInt($feedRequired.filter(":checked").val()),
            expRequired = parseInt($expRequired.val()) - parseInt($currentExp.val()),
            f4          = 0,
            f3          = 0,
            f2          = 0,
            f1          = 0;

        switch (expPerFeed) {
          case 80:
            f4 = Math.ceil(expRequired / expPerFeed);
            f3 = f4 * 2;
            f2 = f3 * 2;
            f1 = f2 * 2;
            break;
          case 40:
            f3 = Math.ceil(expRequired / expPerFeed);
            f2 = f3 * 2;
            f1 = f2 * 2;
            break;
          case 20:
            f2 = Math.ceil(expRequired / expPerFeed);
            f1 = f2 * 2;
            break;
          default:
            f1 = Math.ceil(expRequired / expPerFeed);
        }

        var g2 = f2 * 150000,
            g3 = f3 * 300000,
            g4 = f4 * 450000;

        $f1.text(f1);
        $f2.text(f2);
        $g2.text(g2.format());
        $f3.text(f3);
        $g3.text(g3.format());
        $f4.text(f4);
        $g4.text(g4.format());
        $gtotal.text((g2 + g3 + g4).format());
      };

  $("input").on("change keyup", recalculate);

  setTimeout(recalculate, 10);
});