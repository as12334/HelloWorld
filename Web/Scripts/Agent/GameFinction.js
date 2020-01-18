function GameData(msg) {
    var shell = $("#shell_top");
    shell.addClass("shell-top-game");
    shell.find(".shell-top-left").addClass("shell-top-left-game");
    shell.find(".shell-top-right").addClass("shell-top-right-game");
    shell.find(".shell-title-icon").addClass("shell-title-icon-game");

    var gameIndex = comm.query("gameIndex", msg.referrer);
    var type = comm.query("type", msg.referrer);
    var number = msg.data.openDateList.number || "NO";
    var win = msg.data.win || 0;
    var _getTime = function (endTime, trayTeMaNo) { if (gameIndex == "1" && parseInt(type) <= 3) return trayTeMaNo; else return endTime };
    var endTime = _getTime(msg.data.openDateList.endTime, msg.data.openDateList.trayTeMaNo) || 0;
    var lotteryTime = msg.data.openDateList.lotteryTime || 0;

    var newnumber = msg.data.openNumList.newnumber || "NO";
    var numList = msg.data.openNumList.numList || [];
    var mc = gameIndex == 1 ? "HKNo_" : gameIndex == 2 ? "KLCNo_" : (gameIndex == 3 || gameIndex == 15) ? "SSCNo_" : (gameIndex == 4 || gameIndex == 14) ? "PKNo_" : gameIndex == 5 ? "KSNo_" : gameIndex == 6 ? "KLBNo_" : gameIndex == 7 ? "NCNo_" : gameIndex == 10 ? "GXNo_" : "";
    for (var i = 0; i < numList.length; i++) {
        numList[i] = "<i class='" + mc + numList[i] + "'></i>";
    }
    numList = numList.join("");

    var myobj = gettype(gameIndex, type);
    shell.append("<div id='game-seet'>" + gameTitle(myobj.op, myobj.vtype) + "</div>");

    return {
        title: "<table style='width:100%;' border='0' cellpadding='0' cellspacing='0'>"
        + "<tr>"
        + "<td style='width:370px;height:15px;'><span class='bold' AutoShipmentsID='" + msg.data.AutoShipmentsID + "' OddsSet='" + msg.data.OddsSet + "' gameIndex='" + gameIndex + "' id='mytype'>" + myobj.type + "</span> 【第 <span class='bold green' name='number'>" + number + "</span> 期】</td>"
        + "<td>第 <span class='bold blue' name='newnumber'>" + newnumber + "</span> 期賽果:</td>"
        + "</tr>"
        + "<tr>"
        + "<td style='height:35px;'>距封盤：<span class='bold' name='endTime' value='" + endTime + "'>" + comm.settimes(endTime) + "</span>&nbsp;&nbsp;&nbsp;距開獎：<span class='bold red' name='lotteryTime' value='" + lotteryTime + "'>" + comm.settimes(lotteryTime) + "</span>&nbsp;&nbsp;&nbsp;&nbsp;今天輸贏：<span class='bold red' name='win'>" + win + "</span></td>"
        + "<td><span name='numList' style='height:30px;overflow:hidden;display:inline-block;'>" + numList + "</span></td>"
        + "</tr>"
        + "</table>",
        table: gameTable(gameIndex, type, msg)
    };
}

function gameTitle(optAry, vtype) {
    var op = optAry.join("");
    var _vtype = vtype;
    var title = "<table style='width:100%;' border='0' cellpadding='0' cellspacing='0'>"
        + "<tr>"
        + "<td style='height:15px;' id='selcheng'>"
        + "更新：<select id='timeValue'><option value='10'>10秒</option><option value='20'>20秒</option><option value='30' selected=''>30秒</option></select>"
        + "<select id='type'>" + _vtype + "</select>"
        + "<select id='bucangValue' class='hidden'><option value='0' selected=''>總賬明細</option><option value='1'>補貨明細</option></select>"
        + "<select id='huoStatus'><option value='1' selected=''>實占</option><option value='0'>虛貨</option></select>"
        + "<select id='rebate'><option value='1'>A盤</option><option value='2'>B盤</option><option value='3'>C盤</option></select>"
        + "&nbsp;<span><span id='autoRefresh'>30</span>秒后更新數據</span>"
        + "</td>"
        + "</tr>"
        + "<tr id='setAll-game' class='hidden'>"
        + "<td style='height:30px;'>"
        + "<select id='upodds'><option value='0.001'>0.001</option><option value='0.003'>0.003</option><option value='0.005'>0.005</option><option value='0.01' selected=''>0.01</option><option value='0.03'>0.03</option><option value='0.05'>0.05</option><option value='0.1'>0.1</option><option value='0.3'>0.3</option><option value='0.5'>0.5</option><option value='1'>1</option><option value='3'>3</option><option value='5'>5</option></select>"
        + "<select id='odds_k'><option value='-1'>全部</option>" + op + "</select>"
        + "&nbsp;<input type='button' name='up' onclick='setOdds(this)' value='升賠'>"
        + "&nbsp;<input type='button' name='down' onclick='setOdds(this)' value='降賠'>"
        + "&nbsp;<input type='button' name='close' onclick='setOdds(this)' value='快速封盤'>"
        + "&nbsp;<input type='button' name='open' onclick='setOdds(this)' value='快速開盤'>"
        + "</td>"
        + "</tr>"
        + "</table>";
    return title;
}

function gameTable(gameIndex, type, msg) {
    if (gameIndex == 1) {
        return gameHK(type, msg);
    } else if (gameIndex >= 2) {
        return gameKc(gameIndex, type, msg);
    }
}
function gameHK(type, msg) {
    var htmlall;
    var html, num, sort, line1, line2, line3;
    var oddsList = msg.data.oddsList || {};
    var detailsList = msg.data.detailsList || {};
    var detailsListCount = msg.data.detailsListCount || {};

    if (type <= 3 || type == 8 || type == 88 || (type >= 10 && type <= 15)) {
        htmlall = new htmlAll();
        html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:69.5%;' id='game-row'>"];
        html.push("<div style='float:left;width:33.3%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        for (var i = 1; i <= 25; i++) {
            num = i < 10 ? "0" + i : i;
            if (type == 2)
                sort = i + 65;
            else if (type == 8)
                sort = i + 169;
            else if (type == 88)
                sort = i + 1137;
            else if (type == 10)
                sort = i + 222;
            else if (type == 11)
                sort = i + 280;
            else if (type == 12)
                sort = i + 338;
            else if (type == 13)
                sort = i + 396;
            else if (type == 14)
                sort = i + 454;
            else if (type == 15)
                sort = i + 512;
            else
                sort = i;

            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33.3%;'>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        for (var i = 26; i <= 49; i++) {
            num = i;
            if (type == 2)
                sort = i + 65;
            else if (type == 8)
                sort = i + 169;
            else if (type == 88)
                sort = i + 1137;
            else if (type == 10)
                sort = i + 222;
            else if (type == 11)
                sort = i + 280;
            else if (type == 12)
                sort = i + 338;
            else if (type == 13)
                sort = i + 396;
            else if (type == 14)
                sort = i + 454;
            else if (type == 15)
                sort = i + 512;
            else
                sort = i;

            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33.3%;'>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        if (type <= 3) {
            for (var i = 50; i <= 65; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
                html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
        } else if (type == 8 || type == 88) {
            for (var i = 219; i <= 222; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
                html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
        } else if (type >= 10 && type <= 15) {
            var s = 272, e = 280;
            if (type == 11) {
                s = 330, e = 338;
            } else if (type == 12) {
                s = 388, e = 396;
            } else if (type == 13) {
                s = 446, e = 454;
            } else if (type == 14) {
                s = 504, e = 512;
            } else if (type == 15) {
                s = 562, e = 570;
            }
            for (var i = s; i <= e; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
                html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
        }

        html.push("</tbody></table>");
        html.push("</div>");

        html.push(htmlall.zttj); //號碼總投統計

        html.push("</div>");

        html.push(htmlall.ksph); //虧損排行

        html.push(htmlall.tongji); //註額統計

        html.push("</div>");

        html.push("</td></tr></thead></table>");

        html.push(htmlall.ksbh); //快速補貨

        html.push("</div>");
    } else if (type == 4) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='float:left;width:33.3%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        for (var i = 115; i <= 123; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold red'>" + _num2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33.3%;'>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        for (var i = 124; i <= 132; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold bluer'>" + _num2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33.3%;'>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
        for (var i = 133; i <= 141; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold green'>" + _num2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 5) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:1080px;margin:0 auto'>");
        html.push("<div style='float:left;width:50%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>生肖</th><th class='w20'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 142; i <= 147; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 141] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>生肖</th><th class='w20'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 148; i <= 153; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 141] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 6) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>類型</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");

        sort = 154;
        html.push("<tr sort='" + sort + "' num1='合肖'>");
        html.push("<td class='bc bold'>合肖</td>");
        html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
        html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
        html.push("<td><a class='line3 sup-line cursor' onclick='buhuoHxDetail(this)'>" + detailsList[sort][1] + "</a></td>");
        html.push("</tr>");

        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>生肖</th><th class='w20'>號碼</th><th class='w15'>總註</th></tr></thead><tbody>");
        for (var i = 610; i <= 615; i++) {
            sort = i;
            html.push("<tr>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 609] + "</td>");
            html.push("<td><a class='line2 sup-line'>" + detailsListCount[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>生肖</th><th class='w20'>號碼</th><th class='w15'>總註</th></tr></thead><tbody>");

        var no_49;
        for (var i = 616; i <= 621; i++) {
            sort = i;
            no_49 = __animalsAry[i - 609];
            if (no_49.indexOf(",49") > -1) {
                no_49 = no_49.replace(",49", "");
            }

            html.push("<tr>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + no_49 + "</td>");
            html.push("<td><a class='line2 sup-line'>" + detailsListCount[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 7) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:1080px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>頭數</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 155; i <= 159; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 106] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>尾數</th><th class='w20'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 160; i <= 164; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 106] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>尾數</th><th class='w20'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 165; i <= 169; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 106] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 27) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>頭數</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 741; i <= 745; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + msg.data.wx[(i - 740)] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 16) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:50%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>一肖</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 571; i <= 576; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 570] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>一肖</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 577; i <= 582; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 570] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>尾數</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 583; i <= 587; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 529] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>尾數</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 588; i <= 592; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 529] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 17) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>七色波</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 605; i <= 608; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>正肖</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 593; i <= 598; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 592] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>正肖</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 599; i <= 604; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i - 592] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 26) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>七色波</th><th class='w20'>賠率</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");
        for (var i = 733; i <= 740; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 18) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;' name='lm-st'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>類型</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");

        sort = 684;
        html.push("<tr sort='" + sort + "' num1='自選不中'>");
        html.push("<td class='bc bold'>自選不中</td>");
        html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsListCount[sort][0] + "</a></td>");
        html.push("<td><a class='line3 sup-line cursor' onclick='buhuoHxDetail(this)'>" + detailsListCount[sort][1] + "</a></td>");
        html.push("</tr>");

        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
        for (var i = 1; i <= 17; i++) {
            num = i < 10 ? "0" + i : i;
            sort = i + 683;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
        for (var i = 18; i <= 34; i++) {
            num = i;
            sort = i + 683;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
        for (var i = 35; i <= 49; i++) {
            num = i;
            sort = i + 683;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type >= 19 && type <= 21 || type == 212) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;' name='lm-st'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>類型</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");

        var strtype = type == 19 ? "二連肖" : type == 20 ? "三連肖" : type == 21 ? "四連肖" : type == 212 ? "五連肖" : "";
        var _sort = type == 19 ? 610 : type == 20 ? 622 : type == 21 ? 634 : type == 212 ? 1187 : 0;
        html.push("<tr sort='" + _sort + "' num1='" + strtype + "'>");
        html.push("<td class='bc bold'>" + strtype + "</td>");
        html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsListCount[_sort][0] + "</a></td>");
        html.push("<td><a class='line3 sup-line cursor' onclick='buhuoHxDetail(this)'>" + detailsListCount[_sort][1] + "</a></td>");
        html.push("</tr>");

        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;' name='lm-so'><div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th class='w15'>生肖</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
        for (var i = 1; i <= 6; i++) {
            sort = i + _sort - 1;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;' name='lm-so'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>生肖</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
        for (var i = 7; i <= 12; i++) {
            sort = i + _sort - 1;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type >= 22 && type <= 24) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;' name='lm-st'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>類型</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");

        var strtype = type == 22 ? "二連尾" : type == 23 ? "三連尾" : type == 24 ? "四連尾" : "";
        var _sort = type == 22 ? 646 : type == 23 ? 656 : type == 24 ? 666 : 0;
        html.push("<tr sort='" + _sort + "' num1='" + strtype + "'>");
        html.push("<td class='bc bold'>" + strtype + "</td>");
        html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsListCount[_sort][0] + "</a></td>");
        html.push("<td><a class='line3 sup-line cursor' onclick='buhuoHxDetail(this)'>" + detailsListCount[_sort][1] + "</a></td>");
        html.push("</tr>");

        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;' name='lm-so'><div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th class='w15'>尾數</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
        for (var i = 1; i <= 5; i++) {
            sort = i + _sort - 1;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[(i + 53)] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:50%;' name='lm-so'><div class='clear'></div>");
        html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>生肖</th><th class='w25'>號碼</th><th class='w20'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
        for (var i = 6; i <= 10; i++) {
            sort = i + _sort - 1;
            html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + _num2(sort) + "'>");
            html.push("<td class='bc bold'>" + _num2(sort) + "</td>");
            html.push("<td>" + __animalsAry[i + 53] + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type >= 28 && type <= 33) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        html.push("<div style='width:1080px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;' name='lm-st'>");
        html.push("<table class='middle-table'><thead><tr><th class='w10'>類型</th><th class='w15'>註額</th><th class='w15'>盈虧</th></tr></thead><tbody>");

        var strtype = type == 28 ? "二全中" : type == 29 ? "三全中" : type == 30 ? "三中二" : type == 31 ? "二中特" : type == 32 ? "特串" : type == 33 ? "四全中" : "";
        var _sort = type == 28 ? 746 : type == 29 ? 795 : type == 30 ? 844 : type == 31 ? 942 : type == 32 ? 1040 : 1089;
        html.push("<tr sort='" + _sort + "' num1='" + strtype + "'>");
        html.push("<td class='bc bold'>" + strtype + "</td>");
        html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsListCount[_sort][0] + "</a></td>");
        html.push("<td><a class='line3 sup-line cursor' onclick='buhuoHxDetail(this)'>" + detailsListCount[_sort][1] + "</a></td>");
        html.push("</tr>");

        html.push("</tbody></table>");
        html.push("</div>");

        if (type == 28 || type == 29 || type == 32 || type == 33) {
            html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
            html.push("<table class='middle-table'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
            for (var i = 1; i <= 17; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + _sort - 1;
                html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + num + "'>");
                html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
            html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
            for (var i = 18; i <= 34; i++) {
                num = i;
                sort = i + _sort - 1;
                html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + num + "'>");
                html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
            html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
            for (var i = 35; i <= 49; i++) {
                num = i;
                sort = i + _sort - 1;
                html.push("<tr sort='" + sort + "' num1='" + _num1(sort) + "' num2='" + num + "'>");
                html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line'>" + detailsList[sort][0] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

        } else {
            html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
            html.push("<table class='middle-table'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
            for (var i = 1; i <= 17; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + _sort - 1;
                html.push("<tr num1='" + _num1(sort) + "' num2='" + num + "'>");
                html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
                html.push("<td name='ct'>");
                html.push("<div style='float:left;width:49%;'><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)' sort='" + sort + "'>" + oddsList[sort] + "</a></div>");
                html.push("<div style='float:right;width:49%;'><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)' sort='" + (sort + 49) + "'>" + oddsList[sort + 49] + "</a></div>");
                html.push("</td>");

                html.push("<td name='cr'><a class='line2 sup-line' sort='" + sort + "'>" + detailsList[sort][0] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
            html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
            for (var i = 18; i <= 34; i++) {
                num = i;
                sort = i + _sort - 1;
                html.push("<tr num1='" + _num1(sort) + "' num2='" + num + "'>");
                html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
                html.push("<td name='ct'>");
                html.push("<div style='float:left;width:49%;'><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)' sort='" + sort + "'>" + oddsList[sort] + "</a></div>");
                html.push("<div style='float:right;width:49%;'><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)' sort='" + (sort + 49) + "'>" + oddsList[sort + 49] + "</a></div>");
                html.push("</td>");

                html.push("<td name='cr'><a class='line2 sup-line' sort='" + sort + "'>" + detailsList[sort][0] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;' name='lm-so'><div class='clear'></div>");
            html.push("<table class='middle-table bor-left'><thead><tr><th class='w10'>號碼</th><th class='w30'>賠率</th><th class='w20'>總註</th></tr></thead><tbody>");
            for (var i = 35; i <= 49; i++) {
                num = i;
                sort = i + _sort - 1;
                html.push("<tr num1='" + _num1(sort) + "' num2='" + num + "'>");
                html.push("<td class='bc bold " + comm.contains(num) + "'>" + num + "</td>");
                html.push("<td name='ct'>");
                html.push("<div style='float:left;width:49%;'><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)' sort='" + sort + "'>" + oddsList[sort] + "</a></div>");
                html.push("<div style='float:right;width:49%;'><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)' sort='" + (sort + 49) + "'>" + oddsList[sort + 49] + "</a></div>");
                html.push("</td>");

                html.push("<td name='cr'><a class='line2 sup-line' sort='" + sort + "'>" + detailsList[sort][0] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        }

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    } else if (type == 1000) {
        var html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:87%;' id='game-row'>"];
        //html.push("<div style='width:980px;margin:0 auto'>");
        html.push("<div style='float:left;width:100%;' name='lm-st'>");
        html.push("<table class='middle-table'><thead><tr><th>類型</th><th>平均賠率</th><th>總筆</th><th>下注金額</th><th>退水</th><th>總占成</th><th>占成退水</th><th>占成收入</th><th>補貨</th></tr></thead><tbody id='list'>");

        html.push("<tr>");
        html.push("<td class='bc'></td>");
        html.push("<td>-</td>");
        html.push("<td>-</td>");
        html.push("<td>-</td>");
        html.push("<td>-</td>");
        html.push("<td>-</td>");
        html.push("<td>-</td>");
        html.push("<td>-</td>");
        html.push("</tr>");
        html.push("</tbody>");

        html.push("<tr class='bc bold'>");
        html.push("<td class='hidden'></td>");
        html.push("<td></td>");
        html.push("<td>總計</td>");
        html.push("<td id='total'>0</td>");
        html.push("<td id='sum'>0</td>");
        html.push("<td id='buhuots'>0</td>");
        html.push("<td id='share'>0</td>");
        html.push("<td id='comm'>0</td>");
        html.push("<td id='shouru'>0</td>");
        html.push("<td></td>");
        html.push("</tr>");

        html.push("</tbody></table>");

        //html.push("</div>");

        html.push("</div>");
        html.push("</div>");
        htmlall = new htmlAll(12.8);
        html.push(htmlall.tongji); //註額統計
    }
    return html;
}

function htmlAll(width) {
    var html = [];
    var _width = width || 45;
    html.push("<div style='float:right;width:" + _width + "%;'>");
    html.push("<table class='middle-table'><thead><tr><th class='txt-left' colspan='2'>&nbsp;總額:<span id='count-bt' class='green'>0</span></th></tr></thead>");
    html.push("<tbody id='count-ary' class='bc'>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='1' my-type='1' sort-tb='0'>特碼A:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='8' my-type='8' sort-tb='9'>正碼A:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='1' my-type='2' sort-tb='1'>特碼B:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='8' my-type='88' sort-tb='10'>正碼B:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='1' my-type='1' sort-tb='2'>特碼:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='16' my-type='16' sort-tb='24'>一肖:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='4' my-type='4' sort-tb='3'>色波:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='16' my-type='16' sort-tb='25'>尾數:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='5' my-type='5' sort-tb='4'>特肖:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='17' my-type='17' sort-tb='26'>正肖:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='6' my-type='6' sort-tb='5'>合肖:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='17' my-type='17' sort-tb='27'>七色波:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='27' my-type='27' sort-tb='6'>五行:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='26' my-type='26' sort-tb='28'>總肖:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='7' my-type='7' sort-tb='7'>頭數:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='18' my-type='18' sort-tb='29'>不中:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='7' my-type='7' sort-tb='8'>尾數:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='19' my-type='19' sort-tb='30'>二連肖:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='10' sort-tb='12'>正一特:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='19' my-type='20' sort-tb='31'>三連肖:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='11' sort-tb='13'>正二特:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='19' my-type='21' sort-tb='32'>四連肖:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='12' sort-tb='14'>正三特:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='19' my-type='212' sort-tb='33'>五連肖:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='13' sort-tb='15'>正四特:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='22' my-type='22' sort-tb='34'>二連尾:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='14' sort-tb='16'>正五特:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='22' my-type='23' sort-tb='35'>三連尾:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='15' sort-tb='17'>正六特:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='22' my-type='24' sort-tb='36'>四連尾:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='10' sort-tb='18'>正一:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='28' my-type='28' sort-tb='37'>二全中:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='11' sort-tb='19'>正二:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='28' my-type='29' sort-tb='38'>三全中:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='12' sort-tb='20'>正三:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='28' my-type='30' sort-tb='39'>三中二:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='13' sort-tb='21'>正四:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='28' my-type='31' sort-tb='40'>二中特:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='14' sort-tb='22'>正五:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='28' my-type='32' sort-tb='41'>特串:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='10' my-type='15' sort-tb='23'>正六:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left cursor' index='28' my-type='33' sort-tb='42'>四全中:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='w50 txt-left txt-paddin-left cursor' index='8' my-type='8' sort-tb='11'>總和:<span class='green'>0</span></td><td class='w50 txt-left txt-paddin-left'></td></tr>");
    html.push("</tbody>");
    html.push("</table>");
    html.push("</div>");
    return {
        tongji: html.join(""),
        ksph: "<div style='float:right;width:30.2%;'><div style='float:left;width:54%;'><table class='middle-table'><thead><tr><th colspan='4'>虧損額負值排列</th></tr></thead><tbody id='fz-sort'></tbody></table></div>",
        zttj: "<div style='float:left;width:33.3%;' id='total_tongji'><p>總投註額：<b class='green'>0</b></p><p>最高虧損：<b class='red'>0</b></p><p>最高盈利：<b>0</b></p></div>",
        ksbh: "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;' id='foot'><tfoot><tr><td style='padding-top:5px;'><span class='text-btn' onclick='numBuHuo()'>快速補貨</span></td></tr></tfoot></table>"
    };
}

function gettype(gameIndex, typeid) {
    if (gameIndex == "1") {
        if (typeid <= 3) {
            return { type: "特碼",
                vtype: "<option value='1' selected=''>特碼A</option><option value='2'>特碼B</option><option value='3'>特碼AB</option>",
                op: getop()
            };
        } else if (typeid == 4) {
            return {
                type: "色波",
                vtype: "<option value='4' selected=''>特碼色波</option>",
                op: []
            };
        } else if (typeid == 5) {
            return {
                type: "特肖",
                vtype: "<option value='5' selected=''>特碼生肖</option>",
                op: []
            };
        } else if (typeid == 6) {
            return {
                type: "合肖",
                vtype: "<option value='6' selected=''>合肖</option>",
                op: []
            };
        } else if (typeid == 7) {
            return {
                type: "頭尾數",
                vtype: "<option value='7' selected=''>特碼頭尾數</option>",
                op: []
            };
        } else if (typeid == 27) {
            return {
                type: "五行",
                vtype: "<option value='27' selected=''>特碼五行</option>",
                op: []
            };
        } else if (typeid == 8 || typeid == 88) {
            return {
                type: "正碼、總和",
                vtype: "<option value='8' selected=''>正碼A</option><option value='88'>正碼B</option>",
                op: getop()
            };
        } else if (typeid >= 10 && typeid <= 15) {
            return {
                type: "正碼特",
                vtype: "<option value='10' selected=''>正一</option><option value='11'>正二</option><option value='12'>正三</option><option value='13'>正四</option><option value='14'>正五</option><option value='15'>正六</option>",
                op: getop()
            };
        } else if (typeid == 16) {
            return {
                type: "肖尾",
                vtype: "<option value='16' selected=''>一肖尾數</option>",
                op: []
            };
        } else if (typeid == 17) {
            return {
                type: "七色波",
                vtype: "<option value='17' selected=''>正肖、七色波</option>",
                op: []
            };
        } else if (typeid == 26) {
            return {
                type: "總肖",
                vtype: "<option value='26' selected=''>總肖</option>",
                op: []
            };
        } else if (typeid == 18) {
            return {
                type: "不中",
                vtype: "<option value='18' selected=''>自選不中</option>",
                op: getop()
            };
        } else if (typeid >= 19 && typeid <= 21 || typeid == 212) {
            return {
                type: "連肖",
                vtype: "<option value='19' selected=''>二連肖</option><option value='20'>三連肖</option><option value='21'>四連肖</option><option value='212'>五連肖</option>",
                op: []
            };
        } else if (typeid >= 22 && typeid <= 24) {
            return {
                type: "連尾",
                vtype: "<option value='22' selected=''>二連尾</option><option value='23'>三連尾</option><option value='24'>四連尾</option>",
                op: []
            };
        } else if (typeid >= 28 && typeid <= 33) {
            return {
                type: "連碼",
                vtype: "<option value='28' selected=''>二全中</option><option value='29'>三全中</option><option value='30'>三中二</option><option value='31'>二中特</option><option value='32'>特串</option><option value='33'>四全中</option>",
                op: getop()
            };
        } else if (typeid == 1000) {
            return {
                type: "總賬明細",
                vtype: "<option value='1000' selected=''>總賬</option>",
                op: []
            };
        }
    } else if (gameIndex == "2" || gameIndex == "7") {
        if (typeid == 1) {
            return {
                type: "第一球",
                vtype: "<option value='1' selected=''>第一球</option>",
                op: []
            };
        } else if (typeid == 2) {
            return {
                type: "第二球",
                vtype: "<option value='2' selected=''>第二球</option>",
                op: []
            };
        } else if (typeid == 3) {
            return {
                type: "第三球",
                vtype: "<option value='3' selected=''>第三球</option>",
                op: []
            };
        } else if (typeid == 4) {
            return {
                type: "第四球",
                vtype: "<option value='4' selected=''>第四球</option>",
                op: []
            };
        } else if (typeid == 5) {
            return {
                type: "第五球",
                vtype: "<option value='5' selected=''>第五球</option>",
                op: []
            };
        } else if (typeid == 6) {
            return {
                type: "第六球",
                vtype: "<option value='6' selected=''>第六球</option>",
                op: []
            };
        } else if (typeid == 7) {
            return {
                type: "第七球",
                vtype: "<option value='7' selected=''>第七球</option>",
                op: []
            };
        } else if (typeid == 8) {
            return {
                type: "第八球",
                vtype: "<option value='8' selected=''>第八球</option>",
                op: []
            };
        } else if (typeid == 9) {
            return {
                type: "正碼、總和",
                vtype: "<option value='9' selected=''>正碼、總和</option>",
                op: []
            };
        } else if (typeid == 10) {
            return {
                type: "連碼",
                vtype: "<option value='10' selected=''>連碼</option>",
                op: []
            };
        }
    } else if (gameIndex == "3" || gameIndex == "15") {
        return {
            type: "總項盤口",
            vtype: "<option value='1' selected=''>總項盤口</option>",
            op: []
        };
    } else if (gameIndex == "4" || gameIndex == "14") {
        if (typeid == 1) {
            return {
                type: "冠、亞軍 組合",
                vtype: "<option value='1' selected=''>冠、亞軍 組合</option>",
                op: []
            };
        } else if (typeid == 2) {
            return {
                type: "三、四、五、六名",
                vtype: "<option value='2' selected=''>三、四、五、六名</option>",
                op: []
            };
        } else if (typeid == 3) {
            return {
                type: "七、八、九、十名",
                vtype: "<option value='3' selected=''>七、八、九、十名</option>",
                op: []
            };
        }
    } else if (gameIndex == "5") {
        return {
            type: "總項盤口",
            vtype: "<option value='1' selected=''>總項盤口</option>",
            op: []
        };
    } else if (gameIndex == "6") {
        if (typeid == 1) {
            return {
                type: "總和、比分、五行",
                vtype: "<option value='1' selected=''>總和、比分、五行</option>",
                op: []
            };
        } else if (typeid == 2) {
            return {
                type: "正碼",
                vtype: "<option value='2' selected=''>正碼</option>",
                op: []
            };
        }
    } else if (gameIndex == "8") {

    } else if (gameIndex == "9") {

    } else if (gameIndex == "10") {
        if (typeid == 1) {
            return {
                type: "第一球",
                vtype: "<option value='1' selected=''>第一球</option>",
                op: []
            };
        } else if (typeid == 2) {
            return {
                type: "第二球",
                vtype: "<option value='2' selected=''>第二球</option>",
                op: []
            };
        } else if (typeid == 3) {
            return {
                type: "第三球",
                vtype: "<option value='3' selected=''>第三球</option>",
                op: []
            };
        } else if (typeid == 4) {
            return {
                type: "第四球",
                vtype: "<option value='4' selected=''>第四球</option>",
                op: []
            };
        } else if (typeid == 5) {
            return {
                type: "第五球",
                vtype: "<option value='5' selected=''>第五球</option>",
                op: []
            };
        } else if (typeid == 6) {
            return {
                type: "正碼",
                vtype: "<option value='6' selected=''>正碼</option>",
                op: []
            };
        } else if (typeid == 7) {
            return {
                type: "總和、龍虎",
                vtype: "<option value='7' selected=''>總和、龍虎</option>",
                op: []
            };
        }
    } else if (typeid == 13) {

        return {
            type: "總項盤口",
            vtype: "<option value='1' selected=''>總項盤口</option>",
            op: []
        };

    }
}
function getop() {
    return [
            "<optgroup label='生肖'>",
            "<option value='1'>鼠</option>",
            "<option value='2'>牛</option>",
            "<option value='3'>虎</option>",
            "<option value='4'>兔</option>",
            "<option value='5'>龍</option>",
            "<option value='6'>蛇</option>",
            "<option value='7'>馬</option>",
            "<option value='8'>羊</option>",
            "<option value='9'>猴</option>",
            "<option value='10'>雞</option>",
            "<option value='11'>狗</option>",
            "<option value='12'>猪</option>",
            "</optgroup>",
            "<optgroup label='色波'>",
            "<option value='13' style='color:red'>紅波</option>",
            "<option value='22' style='color:blue'>藍波</option>",
            "<option value='31' style='color:green'>綠波</option>",
            "</optgroup>",
            "<optgroup label='半波'>",
            "<option value='14' style='color:red'>紅單</option>",
            "<option value='15' style='color:red'>紅雙</option>",
            "<option value='16' style='color:red'>紅大</option>",
            "<option value='17' style='color:red'>紅小</option>",
            "<option value='23' style='color:blue'>藍單</option>",
            "<option value='24' style='color:blue'>藍雙</option>",
            "<option value='25' style='color:blue'>藍大</option>",
            "<option value='26' style='color:blue'>藍小</option>",
            "<option value='32' style='color:green'>綠單</option>",
            "<option value='33' style='color:green'>綠雙</option>",
            "<option value='34' style='color:green'>綠大</option>",
            "<option value='35' style='color:green'>綠小</option>",
            "</optgroup>",
            "<optgroup label='半半波'>",
            "<option value='18' style='color:red'>紅大單</option>",
            "<option value='19' style='color:red'>紅大雙</option>",
            "<option value='20' style='color:red'>紅小單</option>",
            "<option value='21' style='color:red'>紅小雙</option>",
            "<option value='27' style='color:blue'>藍大單</option>",
            "<option value='28' style='color:blue'>藍大雙</option>",
            "<option value='29' style='color:blue'>藍小雙</option>",
            "<option value='30' style='color:blue'>藍小單</option>",
            "<option value='36' style='color:green'>綠大單</option>",
            "<option value='37' style='color:green'>綠大雙</option>",
            "<option value='38' style='color:green'>綠小單</option>",
            "<option value='39' style='color:green'>綠小雙</option>",
            "</optgroup>",
            "<optgroup label='頭數'>",
            "<option value='49'>0頭</option>",
            "<option value='50'>1頭</option>",
            "<option value='51'>2頭</option>",
            "<option value='52'>3頭</option>",
            "<option value='53'>4頭</option>",
            "</optgroup>",
            "<optgroup label='尾數'>",
            "<option value='54'>0尾</option>",
            "<option value='55'>1尾</option>",
            "<option value='56'>2尾</option>",
            "<option value='57'>3尾</option>",
            "<option value='58'>4尾</option>",
            "<option value='59'>5尾</option>",
            "<option value='60'>6尾</option>",
            "<option value='61'>7尾</option>",
            "<option value='62'>8尾</option>",
            "<option value='63'>9尾</option>",
            "</optgroup>"
        ]
}