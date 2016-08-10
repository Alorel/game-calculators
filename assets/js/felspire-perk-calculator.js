(function (Object, parseInt) {
    function perk(name, maxLevel, effect) {
        return {
            name: name,
            max: maxLevel,
            effect: effect
        };
    }

    var PERKS = {
            saint: {
                Damage: {
                    0: [
                        {name: "Soaring Skyhawk", lvl: 25, desc: "Permanently increases Skyhawk's ATK by 3000"},
                        {
                            name: "Brutal Strike",
                            lvl: 25,
                            desc: "When attacking deals 250% extra skill damage on enemies below 30%"
                        },
                        {name: "Holylight", lvl: 25, desc: "Permanently increases Hit by 100%"}
                    ],
                    20: [
                        {name: "Aspire", lvl: 15, desc: "When attacking, damage dealt by Skyhawk will be increased by 30%"},
                        {
                            name: "Virtuosity",
                            lvl: 10,
                            desc: "When using Divine Spark, it will deal 113% extra skill damage"
                        },
                        {
                            name: "Earthquake",
                            lvl: 20,
                            desc: "When using Earth Rift, it has a 40% to deal 300% extra skill damage"
                        }
                    ],
                    40: [
                        {name: "Ruinous", lvl: 15, desc: "When attacking, Skyhawk has a 30% chance to deal double damage"},
                        {
                            name: "Chain of Light",
                            lvl: 10,
                            desc: "When equipped with a necklace that is refined to +60 or higher, the basic ATK of the M.H. weapon will be increased by 35%"
                        },
                        {
                            name: "Daze Rift",
                            lvl: 20,
                            desc: "When the target's HP is higher than 70%, using Earth Rift grants a 40% chance to extend the duration of stunning effect to 2 seconds (Takes effect when mount reaches T6)"
                        }
                    ]
                }
                // ,
                // Defence: {
                //     0: [{}, {}, {}, {}]
                // },
                // Support: {
                //     0: [{}, {}, {}, {}]
                // }
            }
        },
        CLASSES = Object.keys(PERKS),
        TOOLTIP_SETTINGS = {
            container: '#felspire-perks',
            html: true
        },
        clickPlus = function () {
            clickPlusMinus($(this), true);
        },
        clickMinus = function () {
            clickPlusMinus($(this), false);
        },
        clickPlusMinus = function ($this, inc) {
            $this = $this.closest("[data-req]");
            var $counter = $this.find("[data-counter]"),
                perkAllocated = parseInt($counter.attr("data-curr")),
                $class = $this.closest(".tab-pane"),
                perkMax = parseInt($counter.attr("data-max"));

            if (inc && perkAllocated < perkMax) {
                $counter.attr("data-curr", ++perkAllocated);
                recalculate($class);
            } else if (!inc && perkAllocated > 0) {
                $counter.attr("data-curr", --perkAllocated);
                recalculate($class);
            }
        },
        getAllocatedInPreviousTiers = function (allTierAllocations, currentTier) {
            switch (currentTier) {
                case "20":
                    return allTierAllocations[0];
                case "40":
                    return allTierAllocations[0] + allTierAllocations[20];
                case "80":
                    return allTierAllocations[0] + allTierAllocations[20] + allTierAllocations[40];
                case "120":
                    return allTierAllocations[0] + allTierAllocations[20] + allTierAllocations[40] + allTierAllocations[80];
                case "160":
                    return allTierAllocations[0] + allTierAllocations[20] + allTierAllocations[40] + allTierAllocations[80] + allTierAllocations[120];
                default:
                    return 0;
            }
        },
        getTreeAllocated = function (allTierAllocations) {
            var r = 0,
                keys = Object.keys(allTierAllocations),
                i = 0;

            for (; i < keys.length; i++) {
                r += allTierAllocations[keys[i]];
            }

            return r;
        },
        recalculate = function ($class, anotherRecalcRequired) {
            var totalPoints = 0,
                lvReq;

            if (typeof anotherRecalcRequired === "undefined") {
                anotherRecalcRequired = true;
            }

            //cycle each tree
            $class.find(">div").each(function () {
                var $tree = $(this),
                    $treeAllocated = $tree.find("[data-allocated-points]"),
                    treeAllocated,
                    tierAllocated = {
                        0: 0,
                        20: 0,
                        40: 0,
                        80: 0,
                        120: 0,
                        160: 0
                    };


                //first let's calculate treeAllocated
                $tree.find("[data-counter]").each(function () {
                    treeAllocated += parseInt($(this).attr("data-curr"))
                });

                $tree.find("[data-req]").each(function () { // Calculate how many points are allocated on each tier
                    tierAllocated[$(this).attr("data-req")] += parseInt($(this).find("[data-counter]").attr("data-curr"));
                }).each(function () { // Now we can unlock tiers
                    var $perk = $(this),
                        $buttons = $perk.find("button"),
                        $counter = $perk.find("[data-counter]"),
                        perkAllocated = parseInt($counter.attr("data-curr"));
                    if (parseInt($perk.attr("data-req")) > getAllocatedInPreviousTiers(tierAllocated, $perk.attr("data-req"))) {
                        $buttons.prop("disabled", true);

                        if (perkAllocated > 0) {
                            $counter.attr("data-curr", 0);
                            console.log($counter);
                            anotherRecalcRequired = true;
                        }
                    } else {
                        $buttons.prop("disabled", false);
                    }
                });

                treeAllocated = getTreeAllocated(tierAllocated);
                $treeAllocated.text(treeAllocated === 0 ? "" : treeAllocated);
                totalPoints += treeAllocated;
            });

            //calculate level required
            if (totalPoints <= 10) {
                lvReq = "[R] 350";
            } else if (totalPoints <= 160) {
                lvReq = "[R] " + (340 + totalPoints);
            } else {
                lvReq = "[2R] " + (240 + totalPoints)
            }

            $class.find("[data-total-lvl]").text(lvReq);

            if (anotherRecalcRequired) {
                recalculate($class, false);
            }
        };

    for (var class_i = 0; class_i < CLASSES.length; class_i++) {
        var $container = $("#felspire-perks-" + CLASSES[class_i]),
            obj = PERKS[CLASSES[class_i]],
            trees = Object.keys(obj);

        for (var tree_i = 0; tree_i < trees.length; tree_i++) {
            var $tree = $("<div class='col-md-4'><h4><span>" + trees[tree_i] + "</span> <span data-allocated-points></span></h4></div>"),
                currTree = obj[trees[tree_i]];

            for (var pointsRequired in currTree) {
                if (currTree.hasOwnProperty(pointsRequired)) {
                    var perks = currTree[pointsRequired];

                    for (var i = 0; i < perks.length; i++) {
                        var $outer = $("<div class='col-xs-3' data-req='" + pointsRequired + "'></div>"),
                            $perkHeader = $("<strong class='show'>" + perks[i].name + "</strong>"),
                            counter = $('<div data-counter data-curr="0" data-max="' + perks[i].lvl + '"/>'),
                            plus = $("<button class='btn btn-sm btn-success' disabled>+</button>").click(clickPlus),
                            minus = $("<button class='btn btn-sm btn-danger' disabled>-</button>").click(clickMinus),
                            title = '<strong class="show">' + perks[i].name + '</strong><hr><strong>Max level effect: </strong><span>' + perks[i].desc
                                + '</span>';

                        if (pointsRequired !== 0) {
                            title += '<hr><small>Requires ' + pointsRequired + ' points to be allocated in the '
                                + trees[tree_i] + ' tree</small>';
                        }

                        if (perks[i].pvp) {
                            title += '<hr><span style="color:#ff0000">PvP-only perk!</span>'
                        }

                        $perkHeader.attr("title", title).tooltip(TOOLTIP_SETTINGS);

                        $tree.append($outer.append($perkHeader, counter, plus, minus));
                    }
                }
                $tree.append("<div style='clear:both'/>");
            }

            $container.append($tree);
        }

        $container.append('<hr style="clear:both"/><span>Level required: </span><strong data-total-lvl>350</strong>');
    }

    $("[id^=felspire-perks-]").each(function () {
        recalculate($(this));
    });
})(Object, parseInt);