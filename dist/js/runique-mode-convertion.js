require(["jquery","global"],function(){var t,n,e,i=[null,0,83,174,276,388,512,650,801,969,1154,1358,1584,1833,2107,2411,2746,3115,3523,3973,4470,5018,5624,6291,7028,7842,8740,9730,10824,12031,13363,14833,16456,18247,20224,22406,24815,27473,30408,33648,37224,41171,45529,50339,55649,61512,67983,75127,83014,91721,101333,111945,123660,136594,150872,166636,184040,203254,224466,247886,273742,302288,333804,368599,407015,449428,496254,547953,605032,668051,737627,814445,899257,992895,1096278,1210421,1336443,1475581,1629200,1798808,1986068,2192818,2421087,2673114,2951373,3258594,3597792,3972294,4385776,4842295,5346332,5902831,6517253,7195629,7944614,8771558,9684577,10692629,11805606,13034431],r={150:"Extreme",50:"Legend",10:"Immortal",2:"Grand Master"},a=["Attack","Strength","Defence","Ranged","Prayer","Magic","Runecrafting","Construction","Dungeoneering","Hitpoints","Agility","Herblore","Thieving","Crafting","Fletching","Slayer","Hunter","Mining","Smithing","Fishing","Cooking","Firemaking","Woodcutting","Farming","Summoning"],o={Attack:99,Strength:99,Defence:85,Ranged:99,Prayer:95,Magic:99,Runecrafting:90,Construction:78,Dungeoneering:1,Hitpoints:99,Agility:52,Herblore:92,Thieving:92,Crafting:55,Fletching:85,Slayer:99,Hunter:91,Mining:90,Smithing:92,Fishing:90,Cooking:93,Firemaking:85,Woodcutting:85,Farming:85,Summoning:99},d=1,g=2e8,l=function(t){t=parseInt(t);for(var n=i.length-1;n>0;n--)if(i[n]<=t)return n;return 0},c=function(){d=parseFloat(s.val())/parseFloat(f.val()),t.each(u)},u=function(){var t=$(this),n=t.find("[data-id=postlvl]").val(),e=i[n],r=e*d,a=l(r);r>g&&(r="Over "+g.format()),t.find("[data-id=postexp]").text(e.format()),t.find("[data-id=currlvl]").text(a),t.find("[data-id=currexp]").text(r.format())},p=function(){$(this).closest("tr").each(u)},s=$("#curr_mode").change(c),f=$("#target_mode").change(c),m=$("#conv-tbody");a.sort();for(var h in r)r.hasOwnProperty(h)&&(n=$("<option/>").val(h).text(r[h]+" (x"+h+")"),s.prepend(n),f.prepend(n.clone()));for(e=0;e<a.length;e++)m.append($("<tr/>").append("<td>"+a[e]+"</td>",'<td data-id="currexp">0</td>','<td data-id="currlvl">1</td>','<td data-id="postexp">1</td>',$("<td/>").html($('<input data-cfg="postlvl-'+a[e]+'" data-id="postlvl" class="form-control" type="number" min="1" max="99" style="max-width:130px"/>').val(o[a[e]]).on("change keyup",p))));t=m.find(">tr"),setTimeout(c,1e3),m.closest("table").tablesorter()});