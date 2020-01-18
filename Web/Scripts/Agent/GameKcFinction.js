function gameKc(gameIndex, type, msg) {
    var html, num, sort, redr, line1, line2, line3, klchtml, mycount;
    var oddsList = msg.data.oddsList || {};
    var detailsList = msg.data.detailsList || {};
    var detailsListCount = msg.data.detailsListCount || {};
    if (gameIndex == 2 || gameIndex == 7) {
        klchtml = new klchtmlAll({ clList: msg.data.clList, yilou: msg.data.yilou });
        if (type >= 1 && type <= 9) {
            html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:75.5%;' id='game-row'>"];
            html.push("<div style='float:left;width:33.3%;'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

            var index = 0;
            if (type == 2)
                index = 37;
            else if (type == 3)
                index = 37 * 2;
            else if (type == 4)
                index = 37 * 3;
            else if (type == 5)
                index = 37 * 4;
            else if (type == 6)
                index = 37 * 5;
            else if (type == 7)
                index = 37 * 6;
            else if (type == 8)
                index = 37 * 7;
            else if (type == 9)
                index = 296;

            for (var i = 1; i <= 20; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + index;
                redr = i == 19 || i == 20 ? "red" : "blue";
                html.push("<tr sort='" + sort + "' num1='" + _klcnum1(sort) + "' num2='" + _klcnum2(sort) + "'>");
                html.push("<td class='bc bold " + redr + "'>" + num + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;' id='fz-sort'>");
            html.push("<table class='middle-table bor-left'><thead><tr><th colspan='4'>虧損額負值排列</th></tr></thead><tbody>");

            for (var i = 1; i <= 20; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + index;
                redr = i == 19 || i == 20 ? "red" : "blue";
                html.push("<tr sort='" + sort + "' num1='" + _klcnum1(sort) + "' num2='" + _klcnum2(sort) + "'>");
                html.push("<td class='bc bold w15 " + redr + "'>" + num + "</td>");
                html.push("<td class='w30 qhs'><a class='line1 sup-line'>" + oddsList[sort] + "</a></td>");
                html.push("<td class='w20 qhs'><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td class='w20 qhs'><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;'>");
            html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
            var e = type >= 1 && type <= 4 ? 37 : type >= 5 && type <= 8 ? 35 : 26;
            for (var i = 21; i <= e; i++) {
                sort = i + index;
                html.push("<tr sort='" + sort + "' num1='" + _klcnum1(sort) + "' num2='" + _klcnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klcnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push(klchtml.zttj);

            html.push("</div>");
            html.push("</div>"); //75.5 end

            html.push("<div style='float:right;width:24.2%;'>");

            html.push(klchtml.tongji);
            html.push(klchtml.yilou);
            html.push(klchtml.cl);
            html.push("</div>"); //30 end
        } else if (type == 10) {
            html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:75.5%;' id='game-row'>"];
            html.push("<div style='width:750px;margin:0 auto'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15'>類型</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

            for (var i = 323; i <= 329; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klcnum1(sort) + "' num2=''>");
                html.push("<td class='bc bold'>" + _klcnum1(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoHxDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            //html.push(klchtml.zttj);

            html.push("</div>");
            html.push("</div>"); //75.5 end

            html.push("<div style='float:right;width:24.2%;'>");

            html.push(klchtml.tongji);
            html.push(klchtml.yilou);
            html.push(klchtml.cl);
            html.push("</div>"); //30 end
        }
    } else if (gameIndex == 3 || gameIndex == 15) {
        klchtml = new klchtmlAll({ clList: msg.data.clList, clwidth: 100 });
        html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:93%;' id='game-row'>"];
        html.push("<div style='float:left;width:75%;'>");

        html.push("<div style='float:left;width:33%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>第一球</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 1; i <= 14; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("<div style='float:left;width:0.3%'>&nbsp;</div>");
        html.push("<div style='float:left;width:33%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>第二球</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 15; i <= 28; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("<div style='float:left;width:0.3%'>&nbsp;</div>");
        html.push("<div style='float:left;width:33%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>第三球</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 29; i <= 42; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");

        html.push("<div style='float:left;width:33%;'>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>第四球</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 43; i <= 56; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("<div style='float:left;width:0.3%'>&nbsp;</div>");
        html.push("<div style='float:left;width:33%;'>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>第五球</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 57; i <= 70; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("<div style='float:left;width:0.3%'>&nbsp;</div>");
        html.push("<div style='float:left;width:33%;'>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>牛牛</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 93; i <= 107; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("</div>"); //75 end

        html.push("<div style='float:left;width:25%'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>兩面</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 71; i <= 77; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum1(sort) + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>前三</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 78; i <= 82; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>中三</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 83; i <= 87; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>后三</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 88; i <= 92; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _sscnum1(sort) + "' num2='" + _sscnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _sscnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>"); //25 end
        html.push("</div>"); //93 end

        html.push("<div style='float:right;width:6.8%;background:red;'>");
        html.push(klchtml.cl);
        html.push("</div>"); //6.9 end

        html.push("</thead></table>");
        html.push("</div>");
    } else if (gameIndex == 4) {
        klchtml = new klchtmlAll({ clList: msg.data.clList, clwidth: 49 });
        html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:85%;' id='game-row'>"];
        if (type == 1) {
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和指定</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 1; i <= 17; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和兩面</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 18; i <= 21; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push(klchtml.zttj);
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 22; i <= 37; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 21) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 38; i <= 53; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 37) + "''>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        } else if (type == 2) {
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 54; i <= 69; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 53) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 70; i <= 85; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 69) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 86; i <= 101; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 85) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 102; i <= 115; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 101) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        } else if (type == 3) {
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 118; i <= 131; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 117) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 134; i <= 147; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 133) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 150; i <= 163; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 149) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 166; i <= 179; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 165) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        }

        html.push("</div>"); //85 end
        html.push("<div style='float:right;width:15%'>");
        html.push(klchtml.pktongji);
        html.push(klchtml.cl);
        html.push("</div>"); //15 end
        html.push("</thead></table>");
        html.push("</div>");
    } else if (gameIndex == 14) {
        klchtml = new klchtmlAll({ clList: msg.data.clList, clwidth: 49 });
        html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:85%;' id='game-row'>"];
        if (type == 1) {
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和指定</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 1; i <= 17; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亞軍和兩面</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 18; i <= 21; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push(klchtml.zttj);
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>冠軍</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 22; i <= 37; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 21) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>亞軍</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 38; i <= 53; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 37) + "''>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        } else if (type == 2) {
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 54; i <= 69; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 53) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 70; i <= 85; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 69) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 86; i <= 101; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 85) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 102; i <= 115; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 101) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        } else if (type == 3) {
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 118; i <= 131; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 117) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 134; i <= 147; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 133) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 150; i <= 163; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 149) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 166; i <= 179; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _pknum1(sort) + "' num2='" + _pknum2(sort) + "'>");
                html.push("<td class='bc bold F_Ball_" + (i - 165) + "'>" + _pknum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        }

        html.push("</div>"); //85 end
        html.push("<div style='float:right;width:15%'>");
        html.push(klchtml.pktongji);
        html.push(klchtml.cl);
        html.push("</div>"); //15 end
        html.push("</thead></table>");
        html.push("</div>");
    } else if (gameIndex == 5) {
        klchtml = new klchtmlAll({ clListr: msg.data.clListr, clwidth: 100 });
        html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:90%;' id='game-row'>"];

        html.push("<div style='float:left;width:33.1%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>三軍</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 3; i <= 8; i++) {
            sort = i;
            num = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 2 : detailsList[sort][1];
            redr = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 3 : detailsList[sort][1];
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td style='text-align:left;padding-left:10px;'>");
            html.push("一骰 <a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a><br/>");
            html.push("二骰 <a class='line3 sup-line cursor to2' onclick='buhuoDetail(this)'>" + num + "</a><br/>");
            html.push("三骰 <a class='line3 sup-line cursor to3' onclick='buhuoDetail(this)'>" + redr + "</a>");
            html.push("</td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>大小</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 1; i <= 2; i++) {
            sort = i;
            num = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 2 : detailsList[sort][1];
            redr = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 3 : detailsList[sort][1];
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");

        html.push("</div>");
        html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

        html.push("<div style='float:left;width:33.1%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>圍骰</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 9; i <= 14; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>全骰</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        sort = 15;
        html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
        html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
        html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
        html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
        html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
        html.push("</tr>");
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>點數</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 16; i <= 29; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");
        html.push("<div style='float:left;width:33.1%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>長牌</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 30; i <= 44; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>短牌</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 45; i <= 50; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("</div>"); //90 end

        html.push("<div style='float:right;width:10%'>");
        html.push(klchtml.ksNum);
        html.push("</div>"); //10 end
        html.push("</thead></table>");
        html.push("</div>");

    } else if (gameIndex == 6) {
        klchtml = new klchtmlAll({ clList: msg.data.clList, clwidth: 100 });
        html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:93%;' id='game-row'>"];
        if (type == 1) {
            html.push("<div style='float:left;width:49.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>總和</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 81; i <= 85; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum1(sort) + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("<div class='clear'></div>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>總和過關</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 86; i <= 89; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

            html.push("<div style='float:left;width:49.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>前后和</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 90; i <= 92; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("<div class='clear'></div>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>單雙和</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 93; i <= 95; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("<div class='clear'></div>");
            html.push("<table class='middle-table'><thead><tr><th colspan='4'>五行</th></tr></thead>");
            html.push("<tbody><tr><td class='w15 bc'>類型</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
            for (var i = 96; i <= 100; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        } else if (type == 2) {
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
            html.push("<tbody>");
            for (var i = 1; i <= 20; i++) {
                sort = i;
                num = i < 10 ? "0" + i : i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + num + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
            html.push("<tbody>");
            for (var i = 21; i <= 40; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
            html.push("<tbody>");
            for (var i = 41; i <= 60; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
            html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");
            html.push("<div style='float:left;width:24.8%;'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15 bc'>號碼</th><th class='w30 bc'>賠率</th><th class='w20 bc'>註額</th><th class='w20 bc'>盈虧</th></tr></thead>");
            html.push("<tbody>");
            for (var i = 61; i <= 80; i++) {
                sort = i;
                html.push("<tr sort='" + sort + "' num1='" + _klbnum1(sort) + "' num2='" + _klbnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _klbnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");
        }
        html.push("</div>"); //93 end

        html.push("<div style='float:right;width:7%'>");
        html.push(klchtml.cl);
        html.push("</div>"); //7 end
        html.push("</thead></table>");
        html.push("</div>");

    } else if (gameIndex == 8) {

    } else if (gameIndex == 9) {

    } else if (gameIndex == 10) {
        klchtml = new klchtmlAll({ clList: msg.data.clList, yilou: msg.data.yilou });
        if (type >= 1 && type <= 5) {
            html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:75.5%;' id='game-row'>"];
            html.push("<div style='float:left;width:33.3%;'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");

            var index = 0;
            if (type == 2)
                index = 36;
            else if (type == 3)
                index = 36 * 2;
            else if (type == 4)
                index = 36 * 3;
            else if (type == 5)
                index = 36 * 4;
            else if (type == 6)
                index = 180;

            for (var i = 1; i <= 21; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + index;
                html.push("<tr sort='" + sort + "' num1='" + _gxnum1(sort) + "' num2='" + _gxnum2(sort) + "'>");
                html.push("<td class='bc bold " + comm.contains_gx(num) + "'>" + num + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;' id='fz-sort'>");
            html.push("<table class='middle-table bor-left'><thead><tr><th colspan='4'>虧損額負值排列</th></tr></thead><tbody>");

            for (var i = 1; i <= 21; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + index;
                html.push("<tr sort='" + sort + "' num1='" + _gxnum1(sort) + "' num2='" + _gxnum2(sort) + "'>");
                html.push("<td class='bc bold w15 " + comm.contains_gx(num) + "'>" + num + "</td>");
                html.push("<td class='w30 qhs'><a class='line1 sup-line'>" + oddsList[sort] + "</a></td>");
                html.push("<td class='w20 qhs'><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td class='w20 qhs'><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;'>");
            html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
            for (var i = 22; i <= 36; i++) {
                sort = i + index;
                html.push("<tr sort='" + sort + "' num1='" + _gxnum1(sort) + "' num2='" + _gxnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + _gxnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push(klchtml.zttj);

            html.push("</div>");
            html.push("</div>"); //75.5 end

            html.push("<div style='float:right;width:24.2%;'>");

            html.push(klchtml.gxtongji);
            html.push(klchtml.yilou);
            html.push(klchtml.cl);
            html.push("</div>"); //30 end
        } else if (type == 6) {
            html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:75.5%;' id='game-row'>"];
            html.push("<div style='float:left;width:33.3%;'>");
            html.push("<table class='middle-table'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
            for (var i = 1; i <= 21; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + 180;
                html.push("<tr sort='" + sort + "' num1='" + _gxnum1(sort) + "' num2='" + _gxnum2(sort) + "'>");
                html.push("<td class='bc bold " + comm.contains_gx(num) + "'>" + num + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;' id='fz-sort'>");
            html.push("<table class='middle-table bor-left'><thead><tr><th colspan='4'>虧損額負值排列</th></tr></thead><tbody>");

            for (var i = 1; i <= 21; i++) {
                num = i < 10 ? "0" + i : i;
                sort = i + 180;
                html.push("<tr sort='" + sort + "' num1='" + _gxnum1(sort) + "' num2='" + _gxnum2(sort) + "'>");
                html.push("<td class='bc bold w15 " + comm.contains_gx(num) + "'>" + num + "</td>");
                html.push("<td class='w30 qhs'><a class='line1 sup-line'>" + oddsList[sort] + "</a></td>");
                html.push("<td class='w20 qhs'><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td class='w20 qhs'><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push("<div style='float:left;width:33.3%;'>");
            html.push("<table class='middle-table bor-left'><thead><tr><th class='w15'>號碼</th><th class='w30'>賠率</th><th class='w20'>註額</th><th class='w20'>盈虧</th></tr></thead><tbody>");
            for (var i = 202; i <= 209; i++) {
                sort = i;
                str = i == 208 || i == 209 ? "" : "總和";
                html.push("<tr sort='" + sort + "' num1='" + _gxnum1(sort) + "' num2='" + _gxnum2(sort) + "'>");
                html.push("<td class='bc bold'>" + str + _gxnum2(sort) + "</td>");
                html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
                html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
                html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
                html.push("</tr>");
            }
            html.push("</tbody></table>");
            html.push("</div>");

            html.push(klchtml.zttj);

            html.push("</div>");
            html.push("</div>"); //75.5 end

            html.push("<div style='float:right;width:24.2%;'>");

            html.push(klchtml.gxtongji);
            html.push(klchtml.yilou);
            html.push(klchtml.cl);
            html.push("</div>"); //30 end
        }
    } else if (gameIndex == 13) {

        klchtml = new klchtmlAll({ clListr: msg.data.clListr, clwidth: 100 });
        html = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td><div style='float:left;width:90%;' id='game-row'>"];

        html.push("<div style='float:left;width:33.1%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>三軍</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 3; i <= 8; i++) {
            sort = i;
            num = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 2 : detailsList[sort][1];
            redr = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 3 : detailsList[sort][1];
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td style='text-align:left;padding-left:10px;'>");
            html.push("一骰 <a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a><br/>");
            html.push("二骰 <a class='line3 sup-line cursor to2' onclick='buhuoDetail(this)'>" + num + "</a><br/>");
            html.push("三骰 <a class='line3 sup-line cursor to3' onclick='buhuoDetail(this)'>" + redr + "</a>");
            html.push("</td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>大小</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 1; i <= 2; i++) {
            sort = i;
            num = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 2 : detailsList[sort][1];
            redr = detailsList[sort][0] > 0 && detailsList[sort][1] < 0 ? parseInt(detailsList[sort][1]) * 3 : detailsList[sort][1];
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");

        html.push("</div>");
        html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

        html.push("<div style='float:left;width:33.1%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>圍骰</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 9; i <= 14; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>全骰</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        sort = 15;
        html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
        html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
        html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
        html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
        html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
        html.push("</tr>");
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>點數</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 16; i <= 29; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("<div style='float:left;width:0.2%'>&nbsp;</div>");
        html.push("<div style='float:left;width:33.1%;'>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>長牌</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 30; i <= 44; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("<div class='clear'></div>");
        html.push("<table class='middle-table'><thead><tr><th colspan='4'>短牌</th></tr></thead>");
        html.push("<tbody><tr><td class='w15 bc'>號碼</td><td class='w30 bc'>賠率</td><td class='w20 bc'>註額</td><td class='w20 bc'>盈虧</td></tr>");
        for (var i = 45; i <= 50; i++) {
            sort = i;
            html.push("<tr sort='" + sort + "' num1='" + _ksnum1(sort) + "' num2='" + _ksnum2(sort) + "'>");
            html.push("<td class='bc bold'>" + _ksnum2(sort) + "</td>");
            html.push("<td><span name='up' class='odd_set up fl cursor hidden' onclick='oddsset(this)'></span><span name='down' class='odd_set down fr cursor hidden' onclick='oddsset(this)'></span><a class='line1 sup-line cursor' onclick='oddssetAuto(this)'>" + oddsList[sort] + "</a></td>");
            html.push("<td><a class='line2 sup-line cursor' onclick='searchDetail(this)'>" + detailsList[sort][0] + "</a></td>");
            html.push("<td><a class='line3 sup-line cursor' onclick='buhuoDetail(this)'>" + detailsList[sort][1] + "</a></td>");
            html.push("</tr>");
        }
        html.push("</tbody></table>");
        html.push("</div>");
        html.push("</div>"); //90 end

        html.push("<div style='float:right;width:10%'>");
        html.push(klchtml.ksNum);
        html.push("</div>"); //10 end
        html.push("</thead></table>");
        html.push("</div>");

    }
    return html;
}

function klchtmlAll(msg) {
    var html = [];
    html.push("<div style='float:left;width:50%;'>");
    html.push("<table class='middle-table'><thead><tr><th class='txt-left'>&nbsp;總額:<span id='count-bt' class='green'>0</span></th></tr></thead>");
    html.push("<tbody id='count-ary'>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='1'>第一球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='2'>第二球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='3'>第三球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='4'>第四球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='5'>第五球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='6'>第六球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='7'>第七球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='8'>第八球 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='9'>正&nbsp;碼&nbsp;&nbsp; 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='9'>總&nbsp;和&nbsp;&nbsp; 總:<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='10'>任&nbsp;選&nbsp;二:&nbsp;&nbsp;<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='10'>選二連直:&nbsp;<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='10'>選二連組:&nbsp;<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='10'>任&nbsp;選&nbsp;三:&nbsp;&nbsp;<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='10'>選三前組:&nbsp;<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='10'>任&nbsp;選四&nbsp;:&nbsp;&nbsp;<span class='green'>0</span></td></tr>");
    html.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='10'>任&nbsp;選&nbsp;五:&nbsp;&nbsp;<span class='green'>0</span></td></tr>");
    html.push("</tbody>");
    html.push("</table>");
    html.push("</div>");

    var pkHtml = [];
    pkHtml.push("<div style='float:left;width:50%;'>");
    pkHtml.push("<table class='middle-table'><thead><tr><th class='txt-left'>&nbsp;總額:<span id='count-bt' class='green'>0</span></th></tr></thead>");
    pkHtml.push("<tbody id='count-ary'>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='1'>冠亞軍和:&nbsp;<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='1'>冠亞兩面:&nbsp;<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='1'>冠&nbsp;軍&nbsp;&nbsp;&nbsp;總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='1'>亞&nbsp;軍&nbsp;&nbsp;&nbsp;總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='2'>第三名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='2'>第四名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='2'>第五名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='2'>第六名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='3'>第七名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='3'>第八名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='3'>第九名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='3'>第十名 總:<span class='green'>0</span></td></tr>");
    pkHtml.push("</tbody>");
    pkHtml.push("</table>");
    pkHtml.push("</div>");

    var gxhtml = [];
    gxhtml.push("<div style='float:left;width:50%;'>");
    gxhtml.push("<table class='middle-table'><thead><tr><th class='txt-left'>&nbsp;總額:<span id='count-bt' class='green'>0</span></th></tr></thead>");
    gxhtml.push("<tbody id='count-ary'>");
    gxhtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='1'>第一球 總:<span class='green'>0</span></td></tr>");
    gxhtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='2'>第二球 總:<span class='green'>0</span></td></tr>");
    gxhtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='3'>第三球 總:<span class='green'>0</span></td></tr>");
    gxhtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='4'>第四球 總:<span class='green'>0</span></td></tr>");
    gxhtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='5'>第五球 總:<span class='green'>0</span></td></tr>");

    gxhtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='6'>正&nbsp;碼&nbsp;&nbsp; 總:<span class='green'>0</span></td></tr>");
    gxhtml.push("<tr><td class='bc txt-left txt-paddin-left cursor' my-type='6'>總和&nbsp;龍虎:<span class='green'>0</span></td></tr>");
    
    gxhtml.push("</tbody>");
    gxhtml.push("</table>");
    gxhtml.push("</div>");


    var ylhtml = [];
    ylhtml.push("<div style='float:left;width:15%;margin-left:5px;'>");
    ylhtml.push("<table class='middle-table'><thead><tr><th colspan='2'>遺漏</th></tr></thead>");
    ylhtml.push("<tbody id='yl-count'>");
    if (msg.yilou && msg.yilou.length > 0) {
        var num,index,cla;
        for (var i = 0; i < msg.yilou.length; i++) {
            index = i + 1;
            num = index < 10 ? "0" + index : index;
            //cla = index == 19 || index == 20 ? "red" : "blue";
            ylhtml.push("<tr><td class='w50 bold fff " + cla + "'>" + num + "</td><td class='w50 fff' index='" + index + "'>" + msg.yilou[i] + "</td></tr>");
        }
    }
    ylhtml.push("</tbody>");
    ylhtml.push("</table>");
    ylhtml.push("</div>");

    var clhtml = [];
    var clwidth = msg.clwidth || 33;
    clhtml.push("<div style='float:right;width:" + clwidth + "%;'>");
    clhtml.push("<table class='middle-table'><thead><tr><th colspan='2'>兩面長龍排行</th></tr></thead>");
    clhtml.push("<tbody id='cl-count'>");
    if (msg.clList && msg.clList.length > 0) {
        msg.clList.sort(function (a, b) {
            var _a = a.split(":")[1], _b = b.split(":")[1];
            return parseInt(_b) - parseInt(_a);
        });
        var key;
        for (var i = 0; i < msg.clList.length; i++) {
            key = msg.clList[i].split(":");
            clhtml.push("<tr><td class='bc txt-left txt-paddin-left'>" + key[0] + "</td><td class='fff red'>" + key[1] + "期</td></tr>");
        }
    } else {
        clhtml.push("<tr><td class='fff'>暫無數據</td></tr>");
    }
    clhtml.push("</tbody>");
    clhtml.push("</table>");
    clhtml.push("</div>");

    var kshtml = [];
    var clwidth = msg.clwidth || 33;
    kshtml.push("<div style='float:right;width:" + clwidth + "%;'>");
    kshtml.push("<table class='middle-table'><thead><tr><th colspan='4'>近期開獎結果</th></tr></thead>");
    kshtml.push("<tbody id='cl-count'>");
    if (msg.clListr && msg.clListr.length > 0) {
        var key, num;
        for (var i = 0; i < msg.clListr.length; i++) {
            key = msg.clListr[i].split(":");
            num = key[1].split("|");
            kshtml.push("<tr><td class='bc sw35'>" + key[0] + "期</td><td class='fff red'><i class='KSNo_" + num[0] + "'></i><i class='KSNo_" + num[1] + "'></i><i class='KSNo_" + num[2] + "'></i></td><td class='sw30'>" + key[2] + "</td><td class='sw30'>" + key[3] + "</td></tr>");
        }
    } else {
        kshtml.push("<tr><td class='fff'>暫無數據</td></tr>");
    }
    kshtml.push("</tbody>");
    kshtml.push("</table>");
    kshtml.push("</div>");

    return {
        tongji: html.join(""),
        gxtongji: gxhtml.join(""),
        pktongji:pkHtml.join(""),
        yilou: ylhtml.join(""),
        cl: clhtml.join(""),
        ksNum: kshtml.join(""),
        ksph: "<div style='float:right;width:30.2%;'><div style='float:left;width:66%;'><table class='middle-table'><thead><tr><th colspan='4'>虧損額負值排列</th></tr></thead><tbody id='fz-sort'></tbody></table></div>",
        zttj: "<div style='float:left;width:33.3%;' id='total_tongji'><p>總投註額：<b class='green'>0</b></p><p>最高虧損：<b class='red'>0</b></p><p>最高盈利：<b>0</b></p></div>",
        ksbh: "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;' id='foot'><tfoot><tr><td style='padding-top:5px;'><span class='text-btn' onclick='numBuHuo()'>快速補貨</span></td></tr></tfoot></table>"
    };
}

