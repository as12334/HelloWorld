var O = {
    sort: null,
    type: null,
    name: null,
    num: null,
    numClass: null,
    title: null
};

//--------------六合彩-------------
function game_1_1() {
    return game_hk_1_3();
} 
function game_1_2() {
    return game_hk_1_3(2);
} 
function game_1_3() {
    return game_hk_1_3();
}
function game_1_4() {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>紅波</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 115; i <= 123; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc red'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>藍波</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 124; i <= 132; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc blue'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>綠波</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 133; i <= 141; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc green'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>頭數</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 155; i <= 159; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>尾數</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 160; i <= 169; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>特肖</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 142; i <= 153; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>五行</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 741; i <= 745; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

function game_1_6() {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='width:580px;margin:0 auto;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>類型</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th><th class='w10'>勾選</th></tr></thead><tbody>");
    for (var i = 679; i >= 676; i--) {
        O.sort = i;
        O.type = _num1(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name=''>");
        table.push("<td class='bc'>" + O.type + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("<td><input type='radio' value='" + i + "' name='radio'></td>");
        table.push("</tr>");
    }
    for (var i = 154; i <= 154; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name=''>");
        table.push("<td class='bc'>" + O.type + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("<td><input type='radio' value='154' name='radio'></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table' name='game-count'><thead><tr><th class='w15'>生肖</th><th class='w30'>總註</th><th class='w15'>生肖</th><th class='w30'>總註</th></tr></thead><tbody>");
    for (var i = 1; i <= 6; i++) {
        O.sort = i + 141;
        O.name = _num2(O.sort);
        table.push("<tr>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><a class='sup-line' data-index='" + i + "'>-</a></td>");
        table.push("<td class='bc'>" + _num2(O.sort + 6) + "</td>");
        table.push("<td><a class='sup-line' data-index='" + (i + 6) + "'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");

    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_1_808() {
    return game_hk_1_8();
}
function game_1_88() {
    return game_hk_1_8(2);
}
function game_1_8() {
    return game_hk_1_8();
}
function game_1_10() {
    return game_hk_1_10();
}
function game_1_11() {
    return game_hk_1_10(2);
}
function game_1_12() {
    return game_hk_1_10(3);
}
function game_1_13() {
    return game_hk_1_10(4);
}
function game_1_14() {
    return game_hk_1_10(5);
}
function game_1_15() {
    return game_hk_1_10(6);
}
function game_1_16() {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:49.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>平特一肖</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 571; i <= 582; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:49.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>平特尾數</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 583; i <= 592; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_1_17() {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>正肖</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 593; i <= 604; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>總肖</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 733; i <= 740; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>七色波</th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 605; i <= 608; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_1_18() {
    return game_hk_1_18();
}
function game_1_181() {
    return game_hk_1_18(6);
}
function game_1_182() {
    return game_hk_1_18(7);
}
function game_1_183() {
    return game_hk_1_18(8);
}
function game_1_184() {
    return game_hk_1_18(9);
}
function game_1_185() {
    return game_hk_1_18(10);
}
function game_1_28() {
    return game_hk_1_18(28);
}
function game_1_29() {
    return game_hk_1_18(29);
}
function game_1_30() {
    return game_hk_1_30();
}
function game_1_31() {
    return game_hk_1_30(31);
}
function game_1_32() {
    return game_hk_1_18(32);
}
function game_1_33() {
    return game_hk_1_18(33);
}
function game_1_19() {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:17.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>二連肖 <input type='radio' checked='checked' name='radio' value='610'></th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>總註</td></tr>");
    for (var i = 610; i <= 621; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:17.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>三連肖 <input type='radio' name='radio' value='622'></th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>總註</td></tr>");
    for (var i = 622; i <= 633; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:17.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>四連肖 <input type='radio' name='radio' value='634'></th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>總註</td></tr>");
    for (var i = 634; i <= 645; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:17.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>五連肖 <input type='radio' name='radio' value='1187'></th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>總註</td></tr>");
    for (var i = 1187; i <= 1198; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:right;width:28%;max-height:485px;overflow-y:auto;' name='lm-sortNum'>");
    table.push("<table class='middle-table'><thead><tr><th class='sw50'>排名</th><th>組合</th><th class='w20'>註額</th><th class='w20'>派彩額</th></tr></thead><tbody>");

    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_1_22() {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:21.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>二連尾 <input type='radio' checked='checked' name='radior' value='646'></th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>總註</td></tr>");
    for (var i = 646; i <= 655; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:21.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>三連尾 <input type='radio' name='radior' value='656'></th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>總註</td></tr>");
    for (var i = 656; i <= 665; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:21.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>四連尾 <input type='radio' name='radior' value='666'></th></tr></thead><tbody>");
    table.push("<tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>總註</td></tr>");
    for (var i = 666; i <= 675; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:right;width:34%;max-height:485px;overflow-y:auto;' name='lm-sortNum'>");
    table.push("<table class='middle-table'><thead><tr><th class='sw50'>排名</th><th>組合</th><th class='w20'>註額</th><th class='w20'>派彩額</th></tr></thead><tbody>");

    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_1_1828() {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table' data-hknum='sort'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
    for (var i = 1; i <= 35; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold w15 " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table bor-left' data-hknum='sort'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
    for (var i = 36; i <= 49; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold w15 " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<table class='middle-table bor-left bor-top-game'><thead><tr><th colspan='4'>單雙、大小 總額：<span class='green' sort-tb='1'>0</span></th></tr></thead><tbody>");
    for (var i = 50; i <= 65; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15 " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj); //號碼總投統計
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th colspan='4'>紅波 總額：<span class='bold green' sort-tb='2'>0</span></th></tr></thead><tbody>");
    for (var i = 115; i <= 123; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15 red'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<table class='middle-table bor-left bor-top-game'><thead><tr><th colspan='4'>藍波 總額：<span class='bold green' sort-tb='3'>0</span></th></tr></thead><tbody>");
    for (var i = 124; i <= 132; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15 blue'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<table class='middle-table bor-left bor-top-game'><thead><tr><th colspan='4'>綠波 總額：<span class='bold green' sort-tb='4'>0</span></th></tr></thead><tbody>");
    for (var i = 133; i <= 141; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15 green'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th colspan='4'>特肖 總額：<span class='green' sort-tb='5'>0</span></th></tr></thead><tbody>");
    for (var i = 142; i <= 153; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15 " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<table class='middle-table bor-left bor-top-game'><thead><tr><th colspan='4'>頭數 總額：<span class='green' sort-tb='6'>0</span></th></tr></thead><tbody>");
    for (var i = 155; i <= 159; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<table class='middle-table bor-left bor-top-game'><thead><tr><th colspan='4'>尾數 總額：<span class='green' sort-tb='7'>0</span></th></tr></thead><tbody>");
    for (var i = 160; i <= 169; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<table class='middle-table bor-top-game'><thead><tr><th colspan='4'>五行 總額：<span class='green' sort-tb='8'>0</span></th></tr></thead><tbody>");
    for (var i = 741; i <= 745; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc w15'>" + O.name + "</td>");
        table.push("<td class='w30'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20'><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td class='w20'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_hk_1_30(type) {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>類型</th><th>賠率</th><th class='w30'>總註</th></tr></thead><tbody>");
    var index = 843;
    if (type == 31) {
        index = 941;
    }
    for (var i = 1; i <= 17; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td>");
        table.push("<div style='float:left;width:49.9%;'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line' data-sort='" + O.sort + "'>-</a></div>");
        table.push("<div style='float:right;width:49.9%;'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line' data-sort='" + (O.sort + 49) + "'>-</a></div>");
        table.push("</td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>類型</th><th>賠率</th><th class='w30'>總註</th></tr></thead><tbody>");
    for (var i = 18; i <= 34; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td>");
        table.push("<div style='float:left;width:49.9%;'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line' data-sort='" + O.sort + "'>-</a></div>");
        table.push("<div style='float:right;width:49.9%;'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line' data-sort='" + (O.sort + 49) + "'>-</a></div>");
        table.push("</td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>類型</th><th>賠率</th><th class='w30'>總註</th></tr></thead><tbody>");
    for (var i = 35; i <= 49; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td>");
        table.push("<div style='float:left;width:49.9%;'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line' data-sort='" + O.sort + "'>-</a></div>");
        table.push("<div style='float:right;width:49.9%;'><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line' data-sort='" + (O.sort + 49) + "'>-</a></div>");
        table.push("</td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;max-height:485px;overflow-y:auto;' name='lm-sortNum'>");
    table.push("<table class='middle-table'><thead><tr><th class='sw50'>排名</th><th>組合</th><th class='w20'>註額</th><th class='w20'>派彩額</th></tr></thead><tbody>");

    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_hk_1_18(type) {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>類型</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
    var index = 683;
    if (type == 6) {
        index = 1198;
    } else if (type == 7) {
        index = 1247;
    } else if (type == 8) {
        index = 1296;
    } else if (type == 9) {
        index = 1345;
    } else if (type == 10) {
        index = 1394;
    } else if (type == 28) {
        index = 745;
    } else if (type == 29) {
        index = 794;
    } else if (type == 32) {
        index = 1040;
    } else if (type == 33) {
        index = 1089;
    }
    for (var i = 1; i <= 17; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>類型</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
    for (var i = 18; i <= 34; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>類型</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
    for (var i = 35; i <= 49; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:39.8%;max-height:485px;overflow-y:auto;' name='lm-sortNum'>");
    table.push("<table class='middle-table'><thead><tr><th class='sw50'>排名</th><th>組合</th><th class='w20'>註額</th><th class='w20'>派彩額</th></tr></thead><tbody>");

    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_hk_1_10(type) {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
    var index = 222;
    if (type == 2) {
        index = 280;
    } else if (type == 3) {
        index = 338;
    } else if (type == 4) {
        index = 396;
    } else if (type == 5) {
        index = 454;
    } else if (type == 6) {
        index = 512;
    }
    for (var i = 1; i <= 18; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 19; i <= 36; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 37; i <= 49; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj); //號碼總投統計
    table.push("</div>");

    table.push("<div style='float:right;width:24.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 50; i <= 58; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_hk_1_8(type) {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
    var index = 169;
    if (type == 2) {
        index = 1137;
    }
    for (var i = 1; i <= 18; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 19; i <= 36; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 37; i <= 49; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj); //號碼總投統計
    table.push("</div>");

    table.push("<div style='float:right;width:24.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 219; i <= 222; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.type + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_hk_1_3(type) {
    var rightObj = new htmlAll();
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    table.push("<div style='float:left;width:85.5%;' id='game-row'>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
    var index = 0;
    if (type == 2) {
        index = 65;
    }
    for (var i = 1; i <= 18; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 19; i <= 36; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:25%;' name='game-row' data-hknum='sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 37; i <= 49; i++) {
        O.sort = i + index;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + G.contains(O.name) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj); //號碼總投統計
    table.push("</div>");

    table.push("<div style='float:right;width:24.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

    for (var i = 50; i <= 65; i++) {
        O.sort = i;
        O.type = _num1(O.sort);
        O.name = _num2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a><span class='line4 sup-line'></span></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("</div>");
    //-------------end 85.5-------------

    //-------------14.2-------------
    table.push("<div style='float:right;width:14.2%;'>");
    table.push(rightObj.tongji); //註額統計
    table.push("</div>");
    //-------------end 14.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

//--------------广东快乐十分-------------
function game_2_1() {
    return game_klc_1_8(1);
}
function game_2_2() {
    return game_klc_1_8(2);
}
function game_2_3() {
    return game_klc_1_8(3);
}
function game_2_4() {
    return game_klc_1_8(4);
}
function game_2_5() {
    return game_klc_1_8(5);
}
function game_2_6() {
    return game_klc_1_8(6);
}
function game_2_7() {
    return game_klc_1_8(7);
}
function game_2_8() {
    return game_klc_1_8(8);
}
function game_2_9() {
    return game_klc_1_8(9);
}
function game_2_10() {
    var rightObj = new klchtmlAll({ clList: [], yilou: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------75.5-------------
    table.push("<div style='float:left;width:75.5%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='width:800px;margin:0 auto' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w25'>連碼</th><th class='w25'>賠率</th><th class='w25'>註額</th><th class='w25'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 323; i <= 329; i++) {
        O.sort = i;
        O.name = _klcnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='連碼' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 75.5-------------

    //-------------24.2-------------
    table.push("<div style='float:right;width:24.2%;'>");
    table.push(rightObj.tongji);
    table.push(rightObj.yilou);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 24.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
//-----------广东快乐十分1-8球、正码模板
function game_klc_1_8(type) {
    var rightObj = new klchtmlAll({ clList: [], yilou: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
    var endIndex = type >= 1 && type <= 4 ? 37 : type >= 5 && type <= 8 ? 35 : 26;
    var myStr;
    var index = 0;
    if (type == 2) {
        index = 37;
    } else if (type == 3) {
        index = 37 * 2;
    } else if (type == 4) {
        index = 37 * 3;
    } else if (type == 5) {
        index = 37 * 4;
    } else if (type == 6) {
        index = 37 * 5;
    } else if (type == 7) {
        index = 37 * 6;
    } else if (type == 8) {
        index = 37 * 7;
    } else if (type == 9) {
        index = 296;
    }
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------75.5-------------
    table.push("<div style='float:left;width:75.5%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:33.3%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 1; i <= 20; i++) {
        O.sort = i + index;
        O.type = _klcnum1(O.sort);
        O.name = _klcnum2(O.sort);
        O.num = i < 10 ? "0" + i : i;
        O.numClass = i == 19 || i == 20 ? "red" : "blue";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + O.numClass + "'>" + O.num + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:33.3%;' id='fz-sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th colspan='4'>虧損額負值排列</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 1; i <= 20; i++) {
        O.sort = i + index;
        O.type = _klcnum1(O.sort);
        O.name = _klcnum2(O.sort);
        O.num = i < 10 ? "0" + i : i;
        O.numClass = i == 19 || i == 20 ? "red" : "blue";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold w15 " + O.numClass + "'>" + O.num + "</td>");
        table.push("<td class='w30 qhs'><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20 qhs'><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td class='w20 qhs'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:33.3%;' name='game-row'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
    for (var i = 21; i <= endIndex; i++) {
        O.sort = i + index;
        O.type = _klcnum1(O.sort);
        O.name = _klcnum2(O.sort);
        myStr = type == 9 ? "總和" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + myStr + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push(rightObj.zttj); //号码总统计

    table.push("</div>");
    //-------------end 75.5-------------

    //-------------24.2-------------
    table.push("<div style='float:right;width:24.2%;'>");
    table.push(rightObj.tongji);
    table.push(rightObj.yilou);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 24.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

//--------------重庆时时彩-------------
function game_3_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:93%;' id='game-row'>");
    
    //-------------75-------------
    table.push("<div style='float:left;width:75%;'>");

    //-------------33-------------
    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第一球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 1; i <= 14; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第二球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 15; i <= 28; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 29; i <= 42; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 43; i <= 56; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 57; i <= 70; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    //table.push("<div style='float:left;width:33%;' name='game-row'>");
    //table.push("<div class='clear'></div>");
    //table.push("<table class='middle-table'><thead><tr><th colspan='4'>牛牛</th></tr></thead>");
    //table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    //for (var i = 93; i <= 107; i++) {
    //    O.sort = i;
    //    O.type = _sscnum1(O.sort);
    //    O.name = _sscnum2(O.sort);
    //    table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
    //    table.push("<td class='bc'>" + O.name + "</td>");
    //    table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
    //    table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
    //    table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
    //    table.push("</tr>");
    //}
    //table.push("</tbody></table>");
    //table.push("</div>");
    //-------------end 33-------------

    table.push("</div>");
    //-------------end 75-------------

    //-------------25-------------
    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>兩面</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 71; i <= 77; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");

    table.push("<table class='middle-table'><thead><tr><th colspan='4'>前三</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 78; i <= 82; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");

    table.push("<table class='middle-table'><thead><tr><th colspan='4'>中三</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 83; i <= 87; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");

    table.push("<table class='middle-table'><thead><tr><th colspan='4'>后三</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 88; i <= 92; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");

    table.push("</div>");
    //-------------end 25-------------
    
    table.push("</div>");
    //-------------end 93-------------

    //-------------6.8-------------
    table.push("<div style='float:right;width:6.8%;'>");
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 6.8-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}


//--------------极速时时彩-------------
function game_15_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:93%;' id='game-row'>");

    //-------------75-------------
    table.push("<div style='float:left;width:75%;'>");

    //-------------33-------------
    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第一球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 1; i <= 14; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第二球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 15; i <= 28; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 29; i <= 42; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 43; i <= 56; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33%;' name='game-row'>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 57; i <= 70; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.3%'>&nbsp;</div>");

    //table.push("<div style='float:left;width:33%;' name='game-row'>");
    //table.push("<div class='clear'></div>");
    //table.push("<table class='middle-table'><thead><tr><th colspan='4'>牛牛</th></tr></thead>");
    //table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    //for (var i = 93; i <= 107; i++) {
    //    O.sort = i;
    //    O.type = _sscnum1(O.sort);
    //    O.name = _sscnum2(O.sort);
    //    table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
    //    table.push("<td class='bc'>" + O.name + "</td>");
    //    table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
    //    table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
    //    table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
    //    table.push("</tr>");
    //}
    //table.push("</tbody></table>");
    //table.push("</div>");
    //-------------end 33-------------

    table.push("</div>");
    //-------------end 75-------------

    //-------------25-------------
    table.push("<div style='float:left;width:25%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>兩面</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 71; i <= 77; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");

    table.push("<table class='middle-table'><thead><tr><th colspan='4'>前三</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 78; i <= 82; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");

    table.push("<table class='middle-table'><thead><tr><th colspan='4'>中三</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 83; i <= 87; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");

    table.push("<table class='middle-table'><thead><tr><th colspan='4'>后三</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 88; i <= 92; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");

    table.push("</div>");
    //-------------end 25-------------

    table.push("</div>");
    //-------------end 93-------------

    //-------------6.8-------------
    table.push("<div style='float:right;width:6.8%;'>");
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 6.8-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}



//--------------北京赛车PK10-------------
function game_4_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和指定</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 1; i <= 17; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和兩面</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 18; i <= 21; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj);
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 22; i <= 37; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 38; i <= 53; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_4_2() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 54; i <= 69; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 70; i <= 85; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 86; i <= 101; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 102; i <= 115; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_4_3() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 118; i <= 131; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 134; i <= 147; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 150; i <= 163; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 166; i <= 179; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_4_4() {
    var rightObj = new klchtmlAll({ clList: [], pklen: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------92-------------
    table.push("<div style='float:left;width:92%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 22; i <= 37; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 102; i <= 115; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 38; i <= 53; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 118; i <= 131; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 54; i <= 69; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 134; i <= 147; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 70; i <= 85; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 150; i <= 163; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 86; i <= 101; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 166; i <= 179; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");
    //-------------end 33.3-------------
    table.push("</div>");
    //-------------end 90-------------

    //-------------10-------------
    table.push("<div style='float:right;width:8%;'>");
    table.push(rightObj.pktongji);
    //table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 10-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}


//--------------极速赛车-------------
function game_14_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和指定</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 1; i <= 17; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和兩面</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 18; i <= 21; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj);
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 22; i <= 37; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 38; i <= 53; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_14_2() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 54; i <= 69; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 70; i <= 85; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 86; i <= 101; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 102; i <= 115; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_14_3() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 118; i <= 131; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 134; i <= 147; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 150; i <= 163; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 166; i <= 179; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_14_4() {
    var rightObj = new klchtmlAll({ clList: [], pklen: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------92-------------
    table.push("<div style='float:left;width:92%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 22; i <= 37; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 102; i <= 115; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 38; i <= 53; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 118; i <= 131; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 54; i <= 69; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 134; i <= 147; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 70; i <= 85; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 150; i <= 163; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 86; i <= 101; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 166; i <= 179; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");
    //-------------end 33.3-------------
    table.push("</div>");
    //-------------end 90-------------

    //-------------10-------------
    table.push("<div style='float:right;width:8%;'>");
    table.push(rightObj.pktongji);
    //table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 10-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}


//------------江苏快3----------------
function game_5_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:90%;' id='game-row'>");

    //-------------33-------------
    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>三軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 3; i <= 8; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td style='text-align:left;padding-left:10px;'>");
        table.push("一骰 <a class='line3 sup-line cursor'>-</a><br/>");
        table.push("二骰 <a class='line3 sup-line cursor to2'>-</a><br/>");
        table.push("三骰 <a class='line3 sup-line cursor to3'>-</a>");
        table.push("</td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>大小</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 1; i <= 2; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>圍骰</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 9; i <= 14; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>全骰</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 15; i <= 15; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>點數</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 16; i <= 29; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>長牌</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 30; i <= 44; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>短牌</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 45; i <= 50; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33-------------

    table.push("</div>");
    //-------------end 90-------------

    //-------------10-------------
    table.push("<div style='float:right;width:10%;'>");
    table.push(rightObj.ksNum);
    table.push("</div>");
    //-------------end 10-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

//------------北京快乐8----------------
function game_6_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:93%;' id='game-row'>");

    //-------------33-------------
    table.push("<div style='float:left;width:49.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>總和</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 81; i <= 85; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>總和過關</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 86; i <= 89; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:49.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>前后和</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 90; i <= 92; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>單雙和</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 93; i <= 95; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>五行</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 96; i <= 100; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33-------------

    table.push("</div>");
    //-------------end 93-------------

    //-------------7-------------
    table.push("<div style='float:right;width:7%;'>");
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 7-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_6_2() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:93%;' id='game-row'>");

    //-------------33-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 1; i <= 20; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        O.num = O.name < 10 ? "0" + O.name : O.name;
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.num + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 21; i <= 40; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 41; i <= 60; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 61; i <= 80; i++) {
        O.sort = i;
        O.type = _klbnum1(O.sort);
        O.name = _klbnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33-------------

    table.push("</div>");
    //-------------end 93-------------

    //-------------7-------------
    table.push("<div style='float:right;width:7%;'>");
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 7-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

//--------------重庆幸运农场-------------
function game_7_1() {
    return game_klc_1_8(1);
}
function game_7_2() {
    return game_klc_1_8(2);
}
function game_7_3() {
    return game_klc_1_8(3);
}
function game_7_4() {
    return game_klc_1_8(4);
}
function game_7_5() {
    return game_klc_1_8(5);
}
function game_7_6() {
    return game_klc_1_8(6);
}
function game_7_7() {
    return game_klc_1_8(7);
}
function game_7_8() {
    return game_klc_1_8(8);
}
function game_7_9() {
    return game_klc_1_8(9);
}
function game_7_10() {
    var rightObj = new klchtmlAll({ clList: [], yilou: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------75.5-------------
    table.push("<div style='float:left;width:75.5%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='width:800px;margin:0 auto' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w25'>連碼</th><th class='w25'>賠率</th><th class='w25'>註額</th><th class='w25'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 323; i <= 329; i++) {
        O.sort = i;
        O.name = _klcnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='連碼' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 75.5-------------

    //-------------24.2-------------
    table.push("<div style='float:right;width:24.2%;'>");
    table.push(rightObj.tongji);
    table.push(rightObj.yilou);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 24.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

//--------------幸运飞艇-------------
function game_8_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和指定</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 1; i <= 17; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和兩面</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 18; i <= 21; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj);
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 22; i <= 37; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 38; i <= 53; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_8_2() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 54; i <= 69; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 70; i <= 85; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 86; i <= 101; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 102; i <= 115; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_8_3() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 118; i <= 131; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 134; i <= 147; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 150; i <= 163; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 166; i <= 179; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_8_4() {
    var rightObj = new klchtmlAll({ clList: [], pklen: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------92-------------
    table.push("<div style='float:left;width:92%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 22; i <= 37; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 102; i <= 115; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 38; i <= 53; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 118; i <= 131; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 54; i <= 69; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 134; i <= 147; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 70; i <= 85; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 150; i <= 163; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 86; i <= 101; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 166; i <= 179; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");
    //-------------end 33.3-------------
    table.push("</div>");
    //-------------end 90-------------

    //-------------10-------------
    table.push("<div style='float:right;width:8%;'>");
    table.push(rightObj.pktongji);
    //table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 10-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

//------------广西快乐十分-----------------
function game_10_1() {
    return game_gx_1_5(1);
}
function game_10_2() {
    return game_gx_1_5(2);
}
function game_10_3() {
    return game_gx_1_5(3);
}
function game_10_4() {
    return game_gx_1_5(4);
}
function game_10_5() {
    return game_gx_1_5(5);
}
function game_10_6() {
    return game_gx_1_5(6);
}
//-----------广西快乐十分1-5球、正码模板
function game_gx_1_5(type) {
    var rightObj = new klchtmlAll({ clList: [], yilou: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
    var myStr;
    var index = 0;
    if (type == 2) {
        index = 36;
    } else if (type == 3) {
        index = 36 * 2;
    } else if (type == 4) {
        index = 36 * 3;
    } else if (type == 5) {
        index = 36 * 4;
    } else if (type == 6) {
        index = 180;
    }
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------75.5-------------
    table.push("<div style='float:left;width:75.5%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:33.3%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 1; i <= 21; i++) {
        O.sort = i + index;
        O.type = _gxnum1(O.sort);
        O.name = _gxnum2(O.sort);
        O.num = i < 10 ? "0" + i : i;
        O.numClass = G.contains_gx(O.num);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold " + O.numClass + "'>" + O.num + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:33.3%;' id='fz-sort'>");
    table.push("<table class='middle-table bor-left'><thead><tr><th colspan='4'>虧損額負值排列</th></tr></thead>");
    table.push("<tbody>");
    for (var i = 1; i <= 21; i++) {
        O.sort = i + index;
        O.type = _gxnum1(O.sort);
        O.name = _gxnum2(O.sort);
        O.num = i < 10 ? "0" + i : i;
        O.numClass = G.contains_gx(O.num);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold w15 " + O.numClass + "'>" + O.num + "</td>");
        table.push("<td class='w30 qhs'><a class='line1 sup-line'>-</a></td>");
        table.push("<td class='w20 qhs'><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td class='w20 qhs'><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    if (type < 6) {
        table.push("<div style='float:left;width:33.3%;' name='game-row'>");
        table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        for (var i = 22; i <= 36; i++) {
            O.sort = i + index;
            O.type = _gxnum1(O.sort);
            O.name = _gxnum2(O.sort);
            table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
            table.push("<td class='bc'>" + O.name + "</td>");
            table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
            table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
            table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
            table.push("</tr>");
        }
        table.push("</tbody></table>");
        table.push("</div>");
    } else {
        table.push("<div style='float:left;width:33.3%;' name='game-row'>");
        table.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        for (var i = 202; i <= 209; i++) {
            O.sort = i;
            O.type = _gxnum1(O.sort);
            O.name = _gxnum2(O.sort);
            myStr = i == 208 || i == 209 ? "" : "總和";
            table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
            table.push("<td class='bc'>" + myStr + O.name + "</td>");
            table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
            table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
            table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
            table.push("</tr>");
        }
        table.push("</tbody></table>");
        table.push("</div>");
    }
    //-------------end 33.3-------------

    table.push(rightObj.zttj); //号码总统计

    table.push("</div>");
    //-------------end 75.5-------------

    //-------------24.2-------------
    table.push("<div style='float:right;width:24.2%;'>");
    table.push(rightObj.gxtongji);
    table.push(rightObj.yilou);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 24.2-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}





//------------广西快3----------------
function game_13_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:90%;' id='game-row'>");

    //-------------33-------------
    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>三軍</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 3; i <= 8; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td style='text-align:left;padding-left:10px;'>");
        table.push("一骰 <a class='line3 sup-line cursor'>-</a><br/>");
        table.push("二骰 <a class='line3 sup-line cursor to2'>-</a><br/>");
        table.push("三骰 <a class='line3 sup-line cursor to3'>-</a>");
        table.push("</td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>大小</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 1; i <= 2; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>圍骰</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 9; i <= 14; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>全骰</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 15; i <= 15; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>點數</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 16; i <= 29; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:33.1%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>長牌</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 30; i <= 44; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>短牌</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
    for (var i = 45; i <= 50; i++) {
        O.sort = i;
        O.type = _ksnum1(O.sort);
        O.name = _ksnum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33-------------

    table.push("</div>");
    //-------------end 90-------------

    //-------------10-------------
    table.push("<div style='float:right;width:10%;'>");
    table.push(rightObj.ksNum);
    table.push("</div>");
    //-------------end 10-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
