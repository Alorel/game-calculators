(function () {
    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    Number.prototype.format = function () {
        var n = this,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+this || 0).toFixed(0)) + "",
            j = i.length;
        j = j > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",")
    };

    // GLOBAL
    (function () {
        $("[data-tooltip]").tooltip({
            container: 'body',
            html: true
        });

        $(".nav-tabs [data-toggle=tab]").click(function () {
            location.hash = $(this).attr("href");
        });

        if (location.hash) {
            $("a[href='" + location.hash + "']").click();
        }

        if (typeof localStorage !== "undefined") {
            $("[data-value-setting]").on("change keyup", function () {
                localStorage.setItem($(this).data("value-setting"), $(this).val());
            }).each(function () {
                var val = localStorage.getItem($(this).data("value-setting"));
                if (val !== null) {
                    $(this).val(val);
                }
            });

            $("[data-radio-setting]").change(function () {
                localStorage.setItem($(this).data("radio-setting"), $(this).val());
            }).each(function () {
                var selected = localStorage.getItem($(this).data("radio-setting"));

                if (selected !== null && $(this).attr("value") === selected) {
                    $(this).prop("checked", true);
                }
            });

            $("[data-checkbox-setting]").change(function () {
                localStorage.setItem($(this).data("checkbox-setting"), $(this).is(":checked") ? 1 : 0);
            }).each(function () {
                var checked = localStorage.getItem($(this).data("checkbox-setting")) == 1;

                if (checked != null) {
                    $(this).prop("checked", !!checked);
                }
            });
        }
    })();

//Felspire healing PCT
    (function () {
        var $container = $("#felspire-healing-pct"),
            $maxHP = $("#_hpt-hpmax"),
            $hpPlus = $("#_hpt-hpplus"),
            $hpPack = $container.find("[name=pack]"),
            $noWaste = $container.find("[name=no-waste]"),
            $autodrinkL = $("#_res-autodrink-L"),
            $autodrinkM = $("#_res-autodrink-M"),
            $autodrinkS = $("#_res-autodrink-S"),
            recalculate = function () {
                var maxHP = parseFloat($maxHP.val()),
                    hpPlus = parseFloat($hpPlus.val()),
                    healS = 800 / 100 * (100 + hpPlus),
                    healM = 2000 / 100 * (100 + hpPlus),
                    healL = 8000 / 100 * (100 + hpPlus);

                if ($noWaste.is(":checked")) {
                    var hpPack = parseFloat($hpPack.filter(":checked").val());
                    healS += hpPack;
                    healM += hpPack;
                    healL += hpPack;
                }

                $autodrinkL.text(roundToTwo((maxHP - healL) / maxHP * 100) + "%").attr("data-original-title", (maxHP - healL).format() + " HP");
                $autodrinkM.text(roundToTwo((maxHP - healM) / maxHP * 100) + "%").attr("data-original-title", (maxHP - healM).format() + " HP");
                $autodrinkS.text(roundToTwo((maxHP - healS) / maxHP * 100) + "%").attr("data-original-title", (maxHP - healS).format() + " HP");
            };

        $container.find("input").on("change keyup", recalculate);
        recalculate();
    })();

// Felspire pet feed
    (function () {
        var $outerContainer = $("#felspire-pet-feed"),
            $feedRequired = $outerContainer.find("[name=felsppet-reqfeed]"),
            $expRequired = $("#felsppet-req-exp"),
            $currentExp = $("#felsppet-curr-exp"),
            $f1 = $("#felsppet-feed1"),
            $f2 = $("#felsppet-feed2"),
            $g2 = $("#felsppet-gold2"),
            $f3 = $("#felsppet-feed3"),
            $g3 = $("#felsppet-gold3"),
            $f4 = $("#felsppet-feed4"),
            $g4 = $("#felsppet-gold4"),
            $gtotal = $("#felsppet-gold-total"),
            recalculate = function () {
                var expPerFeed = parseInt($feedRequired.filter(":checked").val()),
                    expRequired = parseInt($expRequired.val()) - parseInt($currentExp.val()),
                    f4 = 0,
                    f3 = 0,
                    f2 = 0,
                    f1 = 0;

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

        $outerContainer.find("input").on("change keyup", recalculate);

        recalculate();
    })();
})();