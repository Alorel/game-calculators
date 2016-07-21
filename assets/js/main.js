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

            $autodrinkL.text(Math.round((maxHP - healL) / maxHP * 100) + "%").attr("data-original-title", (maxHP - healL) + " HP");
            $autodrinkM.text(Math.round((maxHP - healM) / maxHP * 100) + "%").attr("data-original-title", (maxHP - healM) + " HP");
            $autodrinkS.text(Math.round((maxHP - healS) / maxHP * 100) + "%").attr("data-original-title", (maxHP - healS) + " HP");
        };

    $container.find("input").on("change keyup", recalculate);
    recalculate();
})();