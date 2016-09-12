(function (parseInt) {
    var lapisRequired = [
            0, //0
            2, //1
            2, //2
            4, //3
            8, //4
            14, //5
            30, //6
            40, //7
            50, //8
            70, //9
            90 //10
        ],
        enhanceRequired = [
            [0, 0], //0
            [2, 3], //1
            [2, 2], //2
            [4, 5], //3
            [8, 12], //4
            [14, 23], //5
            [30, 35], //6
            [40, 50], //7
            [50, 70], //8
            [70, 90], //9
            [90, 110] //10
        ],
        $slots = $("#slots"),
        slots = ['Head', 'Body', 'Legs', 'Feet', 'Arms'],
        slotShardCost = {
            Head: 31,
            Body: 52,
            Legs: 31,
            Feet: 15,
            Arms: 15
        };

    for (var i = 0; i < slots.length; i++) {
        var $tr = $("<tr data-slot='" + slots[i] + "'/>"),
            $lapisLevel = $('<select data-id="lapis_curr" data-cfg="lapis_curr_' + slots[i] + '"/>'),
            $enhanceLevel = $('<select data-id="enhance_curr" data-cfg="enhance_curr_' + slots[i] + '"/>'),
            $lapisTarget = $('<select data-id="lapis_target" data-cfg="lapis_target_' + slots[i] + '"/>'),
            $enhanceTarget = $('<select data-id="enhance_target" data-cfg="enhance_target_' + slots[i] + '"/>');

        for (var j = 0; j < lapisRequired.length; j++) {
            $lapisLevel.append($('<option value="' + j + '">T' + j + '</option>'));
            $enhanceLevel.append($('<option value="' + j + '">+' + j + '</option>'));
            $lapisTarget.append($('<option value="' + j + '">T' + j + '</option>'));
            $enhanceTarget.append($('<option value="' + j + '">+' + j + '</option>'));
        }

        $tr.append(
            $('<td/>').text(slots[i]),
            $('<td/>').append($lapisLevel, $enhanceLevel),
            $('<td/>').append($lapisTarget, $enhanceTarget),
            $('<td data-id="lapis-req"/>').text('Calculating...'),
            $('<td data-id="enhance-req"/>').text('Calculating...'),
            $('<td data-id="shard-req"/>').text('Calculating...')
        );

        $slots.append($tr);
    }

    var $trs = $slots.find('tr'),
        $totals = $("#totals").find("th:not([colspan])"),
        $refreshCallback = function () {
            $trs.each(function () {
                //Only trigger initial calculations once per row
                $(this).find('select:first').change();
            });
        },
        updateTotals = function () {
            var lapisTotal = 0,
                enhTotal = 0,
                shardTotal = 0,
                $this;

            $trs.each(function () {
                $this = $(this);

                lapisTotal += parseInt($this.find("[data-id='lapis-req']").text());
                enhTotal += parseInt($this.find("[data-id='enhance-req']").text());
                shardTotal += parseInt($this.find("[data-id='shard-req']").text());
            });

            $totals.filter("[data-id='total-lapis']").text(lapisTotal);
            $totals.filter("[data-id='total-enh']").text(enhTotal);
            $totals.filter("[data-id='total-shards']").text(shardTotal);
        };

    $slots.find('select').change(function () {
        var $tr = $(this).closest('tr'),
            lapisLevel = parseInt($tr.find('[data-id=lapis_curr]').val()),
            enhanceLevel = parseInt($tr.find('[data-id=enhance_curr]').val()),
            lapisTarget = parseInt($tr.find('[data-id=lapis_target]').val()),
            enhanceTarget = parseInt($tr.find('[data-id=enhance_target]').val()),
            enhanceReqd = 0,
            lapisReqd = 0;

        for (var i = enhanceLevel + 1; i <= enhanceTarget; i++) {
            enhanceReqd += enhanceRequired[i][1];
            lapisReqd += enhanceRequired[i][0];
        }

        for (i = lapisLevel + 1; i <= lapisTarget; i++) {
            lapisReqd += lapisRequired[i];
        }

        if (enhanceReqd < 0) {
            enhanceReqd = 0;
        }
        if (lapisReqd < 0) {
            lapisReqd = 0;
        }

        $tr.find("[data-id='lapis-req']").text(lapisReqd);
        $tr.find("[data-id='enhance-req']").text(enhanceReqd);
        $tr.find("[data-id='shard-req']").text(lapisReqd * slotShardCost[$tr.attr("data-slot")]);

        updateTotals();
    });

    setTimeout($refreshCallback, 300);
    $("#refresh-btn").click($refreshCallback);
})(parseInt);