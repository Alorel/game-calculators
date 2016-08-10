(function (Object, parseInt) {
    function perk(name, maxLevel, effect) {
        return {
            name: name,
            max: maxLevel,
            effect: effect
        };
    }

    var PERKS = {
            // template: {name: "XXXXXXXXXX", lvl: 999, desc: "XXXXXXXXXXXXXX"},
            saint: {
                Damage: {
                    0: [
                        {name: "Soaring Skyhawk", lvl: 25, desc: "Permanently increases Skyhawk's ATK by 3000"},
                        {
                            name: "Brutal Strike",
                            lvl: 25,
                            desc: "When attacking deals 250% extra skill damage on enemies below 30%"
                        },
                        {name: "Holylight", lvl: 25, desc: "Permanently increases Hit by 100%"},
                        null
                    ],
                    20: [
                        {name: "Aspire", lvl: 15, desc: "When attacking, damage dealt by Skyhawk will be increased by 30%"},
                        {
                            name: "Virtuosity",
                            lvl: 10,
                            desc: "When using Divine Spark, it will deal 113% extra skill damage"
                        },
                        null,
                        {
                            name: "Earthquake",
                            lvl: 20,
                            desc: "When using Earth Rift, it has a 40% to deal 300% extra skill damage"
                        }
                    ],
                    40: [
                        {
                            name: "Ruinous",
                            lvl: 15,
                            desc: "When attacking, Skyhawk has a 30% chance to deal double damage. Takes effect when Skyhawk reaches lvl60."
                        },
                        null,
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
                    ],
                    80: [
                        {
                            name: "Divine Hawk",
                            lvl: 5,
                            desc: "When HP is less than 30%, Skyhawk has a 15% chance to stun the target for 1 sec with each attack. Takes effect when Skyhawk reaches lvl 100.",
                            pvp: true
                        },
                        {
                            name: "Roaring Soul",
                            lvl: 5,
                            desc: "When there is no ally within 20 slots around you, your skill damage will be increased by 75%.",
                            pvp: true
                        },
                        {
                            name: "Chain of Light",
                            lvl: 5,
                            desc: "After activating 5 T5+ sets, it will increase your skill damage by 100%."
                        },
                        null
                    ],
                    120: [
                        null,
                        {
                            name: "Phantom Strike",
                            lvl: 10,
                            desc: "When HP is less than 50%, if you use Fire Whirl, the target lose HP that is equal to 63% of PATK over 3 secs"
                        },
                        {
                            name: "Degeneration",
                            lvl: 5,
                            desc: "When in PvP, damage dealt will be increased by 66.6% while damage received will be increased by 33.2%.",
                            pvp: true
                        },
                        {
                            name: "Last Stand",
                            lvl: 10,
                            desc: "When HP is less than 50%, every time you hit your target, you will have a 10% chance to increase Deadly Hit Rate by up to 100% over 10 secs.",
                            pvp: true
                        }
                    ],
                    160: [
                        {
                            name: "Bloodbath",
                            lvl: 1,
                            desc: "Every time Skyhawk attacks, it has a 5% chance to deal 500% extra skill damage. Takes effect when Skyhawk reaches lvl 150.",
                            pvp: true
                        },
                        {
                            name: "Divine Might",
                            lvl: 1,
                            desc: "When HP is less than 30%, every time you hit your target, your ATK will be increased by 10% over 3 secs. It can be stacked up to 5 times.",
                            pvp: true
                        },
                        {
                            name: "Upheaval",
                            lvl: 5,
                            desc: "When you are equipped with lv3 wings, your ASPD will be increased by 17.5"
                        },
                        {
                            name: "Crushing",
                            lvl: 5,
                            desc: "When hitting your target, you will have a 12.5% chance to deal 500% extra skill damage.",
                            pvp: true
                        }
                    ]
                },
                Defence: {
                    0: [
                        {
                            name: "Eagle Eye",
                            lvl: 20,
                            desc: "When Skyhawk hits the target, it can decrease the target's ATK by 8% over 3 secs. CD: 5 secs."
                        },
                        {
                            name: "Confine",
                            lvl: 25,
                            desc: "Being hit by Divine Spark, the target's ATK will be decreased by 100% over 3 secs."
                        },
                        {name: "Condor Guardian", lvl: 25, desc: "Equip Skyhawk to increase your Dodge by 45%."},
                        {
                            name: "Holy Aegis",
                            lvl: 25,
                            desc: "When HP is less than 30% you will have a 25% chance to resist damage when being attacked"
                        }
                    ],
                    20: [
                        null,
                        {
                            name: "Guardian Saint",
                            lvl: 20,
                            desc: "When there is no ally within 20 surrounding slots, your def will be increased by 18% over 10 secs when being attacked."
                        },
                        {
                            name: "Holy Buffer",
                            lvl: 20,
                            desc: "When you are equipped with armor that is refined to +90 or higher, it increase the basic DEF of the armor by 18%"
                        },
                        {
                            name: "Prayer of Life",
                            lvl: 20,
                            desc: "When HP is less than 50%, you will have a 30% chance to increase DEF by 20% over 3 secs."
                        }
                    ],
                    40: [
                        {
                            name: "Frost Bound",
                            lvl: 10,
                            desc: "If the target's HP is higher than 50%, every time Skyhawk attacks the target, it can decrease the target's MSPD by 50% over 3 secs. Takes effect when Skyhawk reaches lvl 50."
                        },
                        {
                            name: "Bless Guard",
                            lvl: 1,
                            desc: "When HP is less than 30%, you can be immune to all deceleration and stun effects (Except Divine Spark)"
                        },
                        {
                            name: "Divine Spur",
                            lvl: 5,
                            desc: "When mount reaches T4+, it can decrease your received skill damage by 62.5%"
                        },
                        null
                    ],
                    80: [
                        {
                            name: "Rift Shield",
                            lvl: 1,
                            desc: "When hitting the target with Earth Rift, the target's ATK will be decreased from the MAX value to the MIN value over 3 secs",
                            pvp: true
                        },
                        null,
                        {
                            name: "Void Shield",
                            lvl: 10,
                            desc: "When in PvP, damage dealt will be decreased by 20% while damage received will be decreased by 10%",
                            pvp: true
                        },
                        {
                            name: "Spiritual Aegis",
                            lvl: 15,
                            desc: "When there is no ally within 25 surrounding slots, you will have a 15% chance to increase Dodge by 10%*Hit over 5 secs (CD: 10 secs)."
                        }
                    ],
                    120: [
                        {
                            name: "Rampant",
                            lvl: 5,
                            desc: "When using Mount Guard, it will restore 7.5% of your max HP (takes effect when mount reaches T10)"
                        },
                        {
                            name: "Shadow Defence",
                            lvl: 1,
                            desc: "After using Dark Force, you will be immune to all debuffs for 3 secs"
                        },
                        {
                            name: "Illusive Mirage",
                            lvl: 1,
                            desc: "When your mount reaches T9+, it will permanently increase your MSPD by 20."
                        },
                        null
                    ],
                    160: [
                        {
                            name: "Stonewall",
                            lvl: 1,
                            desc: "When HP is less than 30%, Skyhawk's attack will decrease the target's ASPD down to 100 for 3 secs (Takes effect when Skyhawk reaches lvl 120).",
                            pvp: true
                        },
                        {
                            name: "Desperate Fight",
                            lvl: 1,
                            desc: "When you receive a deadly attack, it can resist the attack and grant you invincible status for 5 secs. CD: 60 secs.",
                            pvp: true
                        },
                        {
                            name: "Shield of Light",
                            lvl: 5,
                            desc: "After you activate 5 T9 sets, you will gain an extra 25% damage absorbtion."
                        },
                        {
                            name: "Requiem Bless",
                            lvl: 5,
                            desc: "When HP is less than 20% and every time you are attacked, you will have a 10% chance to restore HP that is equal to 10% of your max HP per sec for 5 secs. CD: 3 secs.",
                            pvp: true
                        }
                    ]
                },
                Support: {
                    0: [
                        {
                            name: "Restrain",
                            lvl: 5,
                            desc: "When attacking the target, Skyhawk has a 100% to decelerate the target by 2% over 2 secs."
                        },
                        {
                            name: "Miracle",
                            lvl: 10,
                            desc: "When HP is less than 20%, your received skill damage will be decreased by 10%."
                        },
                        {name: "Heavenly Force", lvl: 20, desc: "Increased skill damage by 80%."},
                        {
                            name: "Dark Apparition",
                            lvl: 20,
                            desc: "If you kill a target with Fire Whirl, you have a 80% chhance to restore HP equivalent to damage dealt."
                        }
                    ],
                    20: [
                        {
                            name: "Piercing Strike",
                            lvl: 25,
                            desc: "When Skyhawk attacks, it can ignore 23.4% of target's defence (Activates when Skyhawk reaches lvl 80)."
                        },
                        {
                            name: "Recover",
                            lvl: 20,
                            desc: "When HP is less than 50%, the effect of HP potion will be increased by 100%."
                        },
                        {
                            name: "Divine Sheath",
                            lvl: 10,
                            desc: "When equipped with boosted lv5 or above gear, your EXP gained by killing monsters will be increased by 50%."
                        },
                        null
                    ],
                    40: [
                        {name: "Condor Radiance", lvl: 10, desc: "Decreases the CD of Skyhawk Boost by 7.5 sec."},
                        {
                            name: "Divine Mark",
                            lvl: 5,
                            desc: "When releasing Fatal Seal, its duration will be increased by 3.75 sec."
                        },
                        {name: "Arcane Dance", lvl: 10, desc: "Permanently increases your ASPD by 15"},
                        {
                            name: "Glutton",
                            lvl: 10,
                            desc: "If the target's HP is higher than 50%, every time you hit you have a 20% chance to clear the target's MP."
                        }
                    ],
                    80: [
                        null,
                        {
                            name: "Sacred Protection",
                            lvl: 1,
                            desc: "When in Fatal Seal status, you can resist all poisoned effect except Poison Arrow"
                        },
                        {name: "Condor Might", lvl: 5, desc: "Increases Skyhawl's skill damage by 75%"},
                        null
                    ],
                    120: [
                        null,
                        {
                            name: "Breath of Enmity",
                            lvl: 15,
                            desc: "When HP is less than 30%, the DEF of enemies in the surrounding 25 slots will be decreased by 22.5% over 5 secs.",
                            pvp: true
                        },
                        {
                            name: "Imperial Defence",
                            lvl: 10,
                            desc: "When you are equipped with lv3 wings that are boosted to lv5 or higher, your max HP will be increased by 13%."
                        },
                        {
                            name: "Death Bound",
                            lvl: 5,
                            desc: "When being hit or hitting your target, you have a 10% chance to reset CD of all skills.",
                            pvp: true
                        }
                    ],
                    160: [
                        {
                            name: "Oracle Strike",
                            lvl: 5,
                            desc: "When HP is less than 50%, every time Skyhawk attacks, it has a 50% chance to increase your ATK by 20% over 30 secs. CD: 120 secs (Takes effect when Skyhawk reaches lvl 180).",
                            pvp: true
                        },
                        {
                            name: "Phantasm",
                            lvl: 1,
                            desc: "When using Fire Whirl, you will release 1 bleed debuff and the target will lose HP equal to 5% of max HP per sec over 5 secs. After 5 secs the final effect will deal out 1000% skill damage. CD: 60 secs.",
                            pvp: true
                        },
                        {
                            name: "Meat Shield",
                            lvl: 5,
                            desc: "When your mount reaches T7+ it will permanently increase damage dealt by 25%."
                        },
                        {
                            name: "Undead Curse",
                            lvl: 10,
                            desc: "if you are killed by other players, you will have a 50% chance to delay death by 10 secs. Within these 10 secs your HP will be full and you will have a chance to increase your Deadly Hit Rate up to 100%. CD: 120 secs.",
                            pvp: true
                        }
                    ]
                }
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
            $this = $this.closest("td");
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
                var $container = $(this),
                    $treeAllocated = $container.find("[data-allocated-points]"),
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
                $container.find("[data-counter]").each(function () {
                    treeAllocated += parseInt($(this).attr("data-curr"))
                });

                $container.find("tr").each(function () { // Calculate how many points are allocated on each tier
                    var tier = $(this).attr("data-req");
                    $(this).find(">td:not(:empty)").each(function () {
                        tierAllocated[tier] += parseInt($(this).find("[data-counter]").attr("data-curr"));
                    });
                }).find("td").each(function () { // Now we can unlock tiers
                    var $perk = $(this),
                        $buttons = $perk.find("button"),
                        $counter = $perk.find("[data-counter]"),
                        perkAllocated = parseInt($counter.attr("data-curr")),
                        previousPointsRequired = $perk.parent().attr("data-req");

                    if (parseInt(previousPointsRequired) > getAllocatedInPreviousTiers(tierAllocated, previousPointsRequired)) {
                        $buttons.prop("disabled", true);

                        if (perkAllocated > 0) {
                            $counter.attr("data-curr", 0);
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
            var $wrapper = $("<div class='col-md-4'>\
            <h4><span>" + trees[tree_i] + "</span> <span data-allocated-points></span></h4>\
            <table class='table table-condensed table-bordered table-hover'>\
           <tbody></tbody>\
           </table>\
           </div>"),
                $tbody = $wrapper.find("tbody"),
                currTree = obj[trees[tree_i]];

            for (var pointsRequired in currTree) {
                if (currTree.hasOwnProperty(pointsRequired)) {
                    var $tr = $("<tr data-req='" + pointsRequired + "'/>"),
                        perks = currTree[pointsRequired];

                    for (var i = 0; i < perks.length; i++) {
                        var $td = $("<td></td>");

                        if (perks[i]) {
                            var $perkHeader = $("<strong class='show'>" + perks[i].name + "</strong>"),
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

                            $tr.append($td.append($perkHeader, counter, $("<div style='white-space:nowrap'/>").append(plus, minus)));
                        } else {
                            $tr.append($td);
                        }
                    }

                    $tbody.append($tr);
                }
            }

            $container.append($wrapper);
        }

        $container.append('<hr style="clear:both"/><span>Level required: </span><strong data-total-lvl>350</strong>');
    }

    $("[id^=felspire-perks-]").each(function () {
        recalculate($(this));
    });
})(Object, parseInt);