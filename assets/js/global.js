(function (Math, localStorage, location) {
    var PAGES = [
        "felspire-pet-feed",
        "felspire-healing-pct",
        "felspire-perk-calculator"
    ];
    Math.roundToTwo = function (num) {
        return +(Math.round(num + "e+2") + "e-2");
    };

    Number.prototype.format = function () {
        var n = this,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+this || 0).toFixed(0)) + "",
            j = i.length;
        j = j > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",")
    };

    window.async = function (cb) {
        setTimeout(cb, 0);
    };

    function loadPages(pageArray, callback) {
        var tabContainer = $("#tabs-container"),
            pagesLoaded = 0,
            i = 0,
            cb = function (html) {
                async(function () {
                    tabContainer.append(html);
                    pagesLoaded++;
                    if (pagesLoaded == pageArray.length) {
                        async(callback);
                    }
                });
            };

        for (; i < pageArray.length; i++) {
            $.get("tabs/" + pageArray[i] + ".html", null, cb);
        }
    }

    loadPages(PAGES, function () {
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

        if (localStorage) {
            $("[data-value-setting]").on("change keyup", function () {
                localStorage.setItem($(this).data("value-setting"), $(this).val());
            }).each(function () {
                var val = localStorage.getItem($(this).data("value-setting"));
                if (val !== null) {
                    $(this).val(val);
                }
            }).change();

            $("[data-radio-setting]").change(function () {
                localStorage.setItem($(this).data("radio-setting"), $(this).val());
            }).each(function () {
                var selected = localStorage.getItem($(this).data("radio-setting"));

                if (selected !== null && $(this).attr("value") === selected) {
                    $(this).prop("checked", true);
                }
            }).change();

            $("[data-checkbox-setting]").change(function () {
                localStorage.setItem($(this).data("checkbox-setting"), $(this).is(":checked") ? 1 : 0);
            }).each(function () {
                var checked = localStorage.getItem($(this).data("checkbox-setting")) == 1;

                if (checked != null) {
                    $(this).prop("checked", !!checked);
                }
            }).change();
        }
    });
})(Math, typeof localStorage !== "undefined" ? localStorage : null, location);