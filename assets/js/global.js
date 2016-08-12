(function (Math, localStorage, location, window, decodeURIComponent, document) {
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

    window.parseGET = function () {
        var ret = {},
            search = location.search.split("&"),
            i = 0,
            item;

        if (search.length) {
            search[0] = search[0].substr(1, search[0].length);

            for (; i < search.length; i++) {
                item = search[i].split("=");
                ret[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
            }
        }

        return ret;
    };

    $.get("https://cdn.rawgit.com/Alorel/game-calculators/gh-pages/assets/css/bootstrap-theme.min.css", {}, function (r) {
        $(document.body).append('<style>' + r + '</style>');
    });

    $(document).ready(function () {
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
    });
})(Math, typeof localStorage !== "undefined" ? localStorage : null, location, window, decodeURIComponent, document);