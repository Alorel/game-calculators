require(['jquery', 'jquery.tablesorter.min'], function () {
  var expRequired       = [
        null, //lvl 0
        0,
        83,
        174,
        276,
        388,
        512,
        650,
        801,
        969,
        1154,
        1358,
        1584,
        1833,
        2107,
        2411,
        2746,
        3115,
        3523,
        3973,
        4470,
        5018,
        5624,
        6291,
        7028,
        7842,
        8740,
        9730,
        10824,
        12031,
        13363,
        14833,
        16456,
        18247,
        20224,
        22406,
        24815,
        27473,
        30408,
        33648,
        37224,
        41171,
        45529,
        50339,
        55649,
        61512,
        67983,
        75127,
        83014,
        91721,
        101333,
        111945,
        123660,
        136594,
        150872,
        166636,
        184040,
        203254,
        224466,
        247886,
        273742,
        302288,
        333804,
        368599,
        407015,
        449428,
        496254,
        547953,
        605032,
        668051,
        737627,
        814445,
        899257,
        992895,
        1096278,
        1210421,
        1336443,
        1475581,
        1629200,
        1798808,
        1986068,
        2192818,
        2421087,
        2673114,
        2951373,
        3258594,
        3597792,
        3972294,
        4385776,
        4842295,
        5346332,
        5902831,
        6517253,
        7195629,
        7944614,
        8771558,
        9684577,
        10692629,
        11805606,
        13034431
      ],
      gameModes         = {
        150: "Extreme",
        50 : "Legend",
        10 : "Immortal",
        2  : "Grand Master"
      },
      skills            = [
        'Attack',
        'Strength',
        'Defence',
        'Ranged',
        'Prayer',
        'Magic',
        'Runecrafting',
        'Construction',
        'Dungeoneering',
        'Hitpoints',
        'Agility',
        'Herblore',
        'Thieving',
        'Crafting',
        'Fletching',
        'Slayer',
        'Hunter',
        'Mining',
        'Smithing',
        'Fishing',
        'Cooking',
        'Firemaking',
        'Woodcutting',
        'Farming',
        'Summoning'
      ],
      recommendedLevels = {
        Attack       : 99,
        Strength     : 99,
        Defence      : 85,
        Ranged       : 99,
        Prayer       : 95,
        Magic        : 99,
        Runecrafting : 90,
        Construction : 78,
        Dungeoneering: 1,
        Hitpoints    : 99,
        Agility      : 52,
        Herblore     : 92,
        Thieving     : 92,
        Crafting     : 55,
        Fletching    : 85,
        Slayer       : 99,
        Hunter       : 91,
        Mining       : 90,
        Smithing     : 92,
        Fishing      : 90,
        Cooking      : 93,
        Firemaking   : 85,
        Woodcutting  : 85,
        Farming      : 85,
        Summoning    : 99
      },
      multiplyBy        = 1,
      MAX_EXP           = 200000000,
      levelFromExp      = function (exp) {
        exp = parseInt(exp);
        for (var i = expRequired.length - 1; i > 0; i--) {
          if (expRequired[i] <= exp) {
            return i;
          }
        }
        return 0;
      },
      recalculate       = function () {
        multiplyBy = parseFloat($currMode.val()) / parseFloat($targetMode.val());
        $convTrs.each(recalculateTrow);
      },
      recalculateTrow   = function () {
        var $tr      = $(this),
            postLvl  = $tr.find("[data-id=postlvl]").val(),
            postExp  = expRequired[postLvl],
            preExp   = postExp * multiplyBy,
            preLevel = levelFromExp(preExp);

        if (preExp > MAX_EXP) {
          preExp = "Over " + MAX_EXP.format();
        }

        $tr.find("[data-id=postexp]").text(postExp.format());
        $tr.find("[data-id=currlvl]").text(preLevel);
        $tr.find("[data-id=currexp]").text(preExp.format());
      },
      recalculateTd     = function () {
        $(this).closest("tr").each(recalculateTrow);
      },
      $currMode         = $("#curr_mode").change(recalculate),
      $targetMode       = $("#target_mode").change(recalculate),
      $convTbody        = $("#conv-tbody"),
      $thead            = $convTbody.closest('table').find("thead"),
      $th               = $thead.find("th").first(),
      $convTrs,
      $option,
      i;

  skills.sort();

  //Populate <select>s
  for (var multiplier in gameModes) {
    if (gameModes.hasOwnProperty(multiplier)) {
      $option = $('<option/>').val(multiplier).text(gameModes[multiplier] + " (x" + multiplier + ")");
      $currMode.prepend($option);
      $targetMode.prepend($option.clone());
    }
  }

  for (i = 0; i < skills.length; i++) {
    $convTbody.append($('<tr/>').append(
      '<td>' + skills[i] + '</td>',
      '<td data-id="currexp">0</td>',
      '<td data-id="currlvl">1</td>',
      '<td data-id="postexp">1</td>',
      $('<td/>')
      .html(
        $('<input data-cfg="postlvl-' +
          skills[i] +
          '" data-id="postlvl" class="form-control" type="number" min="1" max="99" style="max-width:130px"/>')
        .val(recommendedLevels[skills[i]])
        .on('change keyup', recalculateTd)
      )
    ));
  }
  $convTrs = $convTbody.find(">tr");

  setTimeout(recalculate, 1000);
  $convTbody.closest('table').tablesorter();

  function applyIcons() {
    var glyph;
    console.log($th.attr("class"));

    if ($th.hasClass("headerSortUp")) {
      glyph = "glyphicon-chevron-up";
    } else if ($th.hasClass("headerSortDown")) {
      glyph = "glyphicon-chevron-down";
    } else {
      glyph = "glyphicon-sort";
    }

    $th.find(".glyphicon").removeClass("glyphicon-sort glyphicon-chevron-down glyphicon-chevron-up").addClass(glyph);
  }

  try {
    document.getElementById("conv-head").addEventListener('click', applyIcons, true);
    applyIcons();
  } catch (e) {
    console.error(e);
  }
});