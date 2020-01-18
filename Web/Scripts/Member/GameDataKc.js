var __kctimeout;
function kcBoxTop(msg, stop) {
    clearInterval(__intervalTime);
    $("#closedTime").html("").addClass("time_loading");
    $("#updateTime").html("...");
    $("#cqlResult").html("");
    $("#hot_Cool").html("");
    var data = msg.data;
    var gameIndex = msg.gameIndex;
    var type = msg.type;
    var activeUrl = msg.activeUrl;
    var game_big_name = $("#menuText span").html();
    $("#game_big_name").html(game_big_name);
    var game_box_title = $("#game_box_title li.active a").html();
    $("#game_small_name").html(game_box_title);
    $("#profit").html(data.win);
    $("#usableCreditSpan").html(data.usableCredit);
    var openNumList = data.openNumList;
    $("#newPhase").html(openNumList.newnumber);
    var numList = data.openNumList.numList;
    var No = function () { if (gameIndex == 2) return "KLC"; else if (gameIndex == 3 || gameIndex == 15) return "SSC"; else if (gameIndex == 4 || gameIndex == 8 || gameIndex == 14) return "PK"; else if (gameIndex == 5) return "KS"; else if (gameIndex == 6) return "KLB"; else if (gameIndex == 7) return "NC"; else if (gameIndex == 10) return "GX"; else if (gameIndex == 13) return "KS"; };
    for (var i = 0; i < numList.length; i++) {
        numList[i] = "<i class='" + No() + "No_" + numList[i] + "'></i>";
    }
    $("#prevBall").html(numList.join(""));
    var openDateList = data.openDateList;
    $("#NowJq").html(openDateList.number || "NO");
    var closeTime = openDateList.endTime;
    var lotteryTime = openDateList.lotteryTime;
    var time = closeTime == 0 && lotteryTime == 0 ? 0 : closeTime > 0 ? closeTime : lotteryTime > 0 ? lotteryTime : 0;
    var closeText = closeTime == 0 && lotteryTime == 0 || closeTime > 0 ? "封盤" : "開獎";
    $("#closeText").html(closeText);
    (function () {
        $("#phase1").html(data.phase[0]);
        $("#phase2").html(data.phase[1]);
        $("#intervaltime").html(data.phase[2] + "分鐘");
        $("#begintime").html(data.phase[3]);
        $("#endtime").html(data.phase[4]);
    })();


    if (((gameIndex == 2 || gameIndex == 7) && type >= 3 && type <= 10) || ((gameIndex == 3 || gameIndex == 10 || gameIndex == 15) && type >= 3 && type <= 7)) //球號冷熱、遺漏排列
        addHotCool({ yilou: data.yilou, lengm: data.lengm });

    //兩面的
    addCqlResult({ trendLi: data.trendLi, trendContent: data.trendContent });  

    var _loadData = function (stop, clstop) {
        _ajax({ type: 'post', url: activeUrl, data: { t: __info.autoTid, gameIndex: gameIndex, type: type} }, function (mydata) {
            if (clstop) {
                //兩面長龍
                var key, val, on, lmResult = [], vak;
                if (mydata.clList) {
                    mydata.clList.sort(function (a, b) {
                        var _a = a.split(":")[1], _b = b.split(":")[1];
                        return parseInt(_b) - parseInt(_a);
                    });
                    for (var i = 0; i < mydata.clList.length; i++) {
                        key = mydata.clList[i].split(":");
                        val = key[0].split(" ");
                        on = i % 2 != 0 ? "on" : "";
                        vak = val[1] ? " - <b class='red'> " + val[1] + "</b>" : "";
                        lmResult.push("<li class='" + on + "'><span>" + key[1] + "期</span>" + val[0] + vak + "</b></li>");
                    }
                    if (lmResult.length > 0) {
                        $("#lmResult").html(lmResult.join(""));
                    } else {
                        $("#lmResult").html("");
                    }
                } else {
                    $("#lmResult").html("");
                }
                if (__info.voice == 1) {
                    $("body").append("<div id='Sound'><embed src='/images/ClewSound.swf' loop='false' autostart='false' mastersound='' width='0' hidden='true' height='0'></div>");
                    setTimeout(function () { $("#Sound").remove(); }, 5000);
                }
                _ajax({ type: 'get', dataType: 'text', url: 'Default.aspx', data: { history: "1", gameIndex: gameIndex} }, function (text) {
                    $("#history").html(text);
                });
            }
            kcBoxTop({ data: mydata, gameIndex: gameIndex, type: type, activeUrl: activeUrl }, stop);
            loadOdds(mydata.oddsList);
        });
    };

    if ((closeTime == 0 && lotteryTime == 0) || (!closeTime || !lotteryTime)) {
        $("#updateTime").html("...");
        $("#closedTime").removeClass("time_loading").html("<span>0</span><span>0</span>分<span>0</span><span>0</span>秒");
        return;
    } else {
        var updateTime = gameIndex == 2 && type == 12 ? 182 : 92;
        var _time = time, timeAry, settimer;
        __intervalTime = setInterval(function () {
            updateTime--;
            if (updateTime < 0) {
                //加載
                clearInterval(__intervalTime);
                $("#updateTime").html("...");
                _loadData(true);
            } else {
                $("#updateTime").html(updateTime + "秒");
            }

            if (_time > 0) {
                _time--;
                settimer = comm.settimes(_time).replace(/:/g, '');
                timeAry = [];
                for (var n = 0; n < settimer.length; n++) {
                    timeAry.push(settimer.substring(n, n + 1));
                }
                $("#closedTime").removeClass("time_loading").html("<span>" + timeAry[0] + "</span><span>" + timeAry[1] + "</span>分<span>" + timeAry[2] + "</span><span>" + timeAry[3] + "</span>秒");
            } else {
                clearInterval(__intervalTime);
                $("#closedTime").html("").addClass("time_loading");
                $("#updateTime").html("...");
                setTimeout(function () {
                    loadGameData({ stop: true, gameIndex: gameIndex, type: type, activeUrl: activeUrl, data: { t: __info.autoTid, gameIndex: gameIndex, type: type} }); 
                },800);
            }

        }, 1000);

        //正在等待開獎
        if (!stop) {
            (function () {
                clearInterval(__kctimeout);
                var _continueNum = function () {
                    var newnumber = msg.data.openNumList.newnumber || 0;
                    _ajax({ type: 'get', dataType: "text", url: "/Agent/AutoNewNumber.aspx", data: { gameIndex: gameIndex} }, function (m) {
                        if (m == "continue") {
                            __kctimeout = setTimeout(_continueNum, 5000);
                        } else if (newnumber > 0 && comm.NumberSign(m) && parseInt(m) > parseInt(newnumber)) {
                            setTimeout(function () {
                                _loadData(true, true);
                            }, 2000);
                        }
                    });
                };
                _continueNum();
            })();
        }
    }
}

function kcGameMiddle(msg) {
    var num, sort, str, sortIndex;
    var gameIndex = msg.gameIndex;
    var type = msg.type;
    var data = msg.data;
    var disabled = "";
    var data_type = [];
    var oddsList = data.oddsList;
    var htmlData = ["<div class='game_ball_wrap game_item_wrap base-clear'>"];
    var _dx = function (index) { switch (index) { case 1: return "一"; case 2: return "二"; case 3: return "三"; case 4: return "四"; case 5: return "五"; case 6: return "六"; case 7: return "七"; case 8: return "八"; } };
    if (gameIndex == 2 || gameIndex == 7) { //KLC
        var myNum = gameIndex == 2 ? "KLC" : "NC";
        if (type == 1) {
            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 6; n = n + 2) {
                    sort = n + 316;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum1(sort) + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
            for (var i = 0; i < 8; i++) {
                if (i > 0)
                    sortIndex = i * 37;
                else
                    sortIndex = 0;

                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con game_con_s'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 21 + sortIndex; n <= 28 + sortIndex; n++) {
                    sort = n;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                if (i < 4) {
                    for (var n = 36 + sortIndex; n <= 37 + sortIndex; n++) {
                        sort = n;
                        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                        htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 2) {
            htmlData.push("<table class='t_d1_8'>");
            htmlData.push("<thead><tr><th>號</th><th>第一球</th><th>第二球</th><th>第三球</th><th>第四球</th><th>第五球</th><th>第六球</th><th>第七球</th><th>第八球</th></tr></thead>");
            htmlData.push("<tbody class='d1_8'>");
            htmlData.push("<tr>");
            htmlData.push("<td width='27'>" + klcToHaoMaPan(1, false, false, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 1, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 38, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 75, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 112, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 149, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 186, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 223, oddsList, myNum) + "</td>");
            htmlData.push("<td class='game_box'>" + klcToHaoMaPan(2, 260, oddsList, myNum) + "</td>");
            htmlData.push("</tr>");
            htmlData.push("</tbody>");
            htmlData.push("</table>");
        } else if (type >= 3 && type <= 10) {
            var box = "", len = 8;
            if (type == 3) {
                str = "一";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 0;
            } else if (type == 4) {
                str = "二";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 37;
            } else if (type == 5) {
                str = "三";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 74;
            } else if (type == 6) {
                str = "四";
                box = "gameBox col_5";
                len = 10;
                sortIndex = 111;
            } else if (type == 7) {
                str = "五";
                sortIndex = 148;
            } else if (type == 8) {
                str = "六";
                sortIndex = 185;
            } else if (type == 9) {
                str = "七";
                sortIndex = 222;
            } else if (type == 10) {
                str = "八";
                sortIndex = 259;
            }

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>第" + str + "球</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='" + myNum + "No_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box " + box + " base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>兩面</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 2; n++) {
                for (var i = n; i <= len; i = i + 2) {
                    sort = i + 20 + sortIndex;
                    sort = i == 9 || i == 10 ? sort + 7 : sort;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>方位</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 7; i++) {
                sort = i + 28 + sortIndex;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klcnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 11) {
            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正碼</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + 296;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='" + myNum + "No_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 6; n = n + 2) {
                    sort = n + 316;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _klcnum1(sort) + _klcnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 12) {
            var radiodsable = "";
            if (!comm.DecimalSign(oddsList[323]) && !comm.DecimalSign(oddsList[324]) && !comm.DecimalSign(oddsList[325]) && !comm.DecimalSign(oddsList[326]) && !comm.DecimalSign(oddsList[327]) && !comm.DecimalSign(oddsList[328]) && !comm.DecimalSign(oddsList[329])) {
                radiodsable = "radiodsable";
            }

            htmlData.push("<div class='game_lm_title kc_lm_title'>");
            htmlData.push("<ul id='gameTitle' class='base-clear'>");
            htmlData.push("<li class='active' data-mysort='323' data-min='2' data-max='8'><h3>任選二</h3><h4>" + oddsList[323] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='324' data-min='2' data-max='8'><h3>選二連直</h3><h4>-</h4></li>");
            htmlData.push("<li class='' data-mysort='325' data-min='2' data-max='8'><h3>選二連組</h3><h4>" + oddsList[325] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='326' data-min='3' data-max='8'><h3>任選三</h3><h4>" + oddsList[326] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='327' data-min='3' data-max='8'><h3>選三前組</h3><h4>" + oddsList[327] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='328' data-min='4' data-max='8'><h3>任選四</h3><h4>" + oddsList[328] + "</h4></li>");
            htmlData.push("<li class='' data-mysort='329' data-min='5' data-max='8'><h3>任選五</h3><h4>" + oddsList[329] + "</h4></li>");
            htmlData.push("</ul>");
            htmlData.push("</div>"); //game_lm_title end

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>任選二</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + 322;
                    htmlData.push("<li data-sort='" + i + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='" + myNum + "No_" + i + "'></i></span>");
                    htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        }
    } else if (gameIndex == 3 || gameIndex == 15) { //SSC
        if (type == 1) {
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 14;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 11; n <= 14; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }

            //去掉时时彩的牛牛
            //htmlData.push("<div class='game_box base-clear'>");
            //htmlData.push("<div class='game_con'>");
            //htmlData.push("<fieldset>");
            //htmlData.push("<legend>牛牛兩面</legend>");
            //htmlData.push("<ul>");
            //for (var i = 104; i <= 107; i++) {
            //    sort = i;
            //    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            //    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
            //    htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
            //    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            //    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            //    htmlData.push("</li>");
            //}
            //htmlData.push("</ul>");
            //htmlData.push("</fieldset>");
            //htmlData.push("</div>");
            //htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎和</legend>");
            htmlData.push("<ul>");
            for (var i = 71; i <= 77; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 14;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 10; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='SSCNo_" + (n - 1) + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type >= 3 && type <= 7) {
            var box = "", len = 8;
            if (type == 3) {
                str = "一";
                len = 10;
                sortIndex = 0;
            } else if (type == 4) {
                str = "二";
                len = 10;
                sortIndex = 14;
            } else if (type == 5) {
                str = "三";
                len = 10;
                sortIndex = 28;
            } else if (type == 6) {
                str = "四";
                len = 10;
                sortIndex = 42;
            } else if (type == 7) {
                str = "五";
                sortIndex = 56;
            }

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>第" + str + "球</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 2; n++) {
                for (var i = n; i <= 10; i = i + 2) {
                    num = i - 1;
                    sort = i + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='SSCNo_" + num + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙大小</legend>");
            htmlData.push("<ul>");
            for (var i = 11; i <= 14; i++) {
                sort = i + sortIndex;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎和</legend>");
            htmlData.push("<ul>");
            for (var i = 71; i <= 77; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_33 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>前三</legend>");
            htmlData.push("<ul>");
            for (var i = 78; i <= 82; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_33 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>中三</legend>");
            htmlData.push("<ul>");
            for (var i = 83; i <= 87; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_33 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>后三</legend>");
            htmlData.push("<ul>");
            for (var i = 88; i <= 92; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 8) {
            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>牛牛</legend>");
            htmlData.push("<ul>");
            for (var i = 93; i <= 103; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _sscnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            
            //htmlData.push("<div class='game_box base-clear'>");
            //htmlData.push("<div class='game_con'>");
            //htmlData.push("<fieldset>");
            //htmlData.push("<legend>牛牛兩面</legend>");
            //htmlData.push("<ul>");
            //for (var i = 104; i <= 107; i++) {
            //    sort = i;
            //    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            //    htmlData.push("<li data-sort='" + sort + "' data-title='" + _sscnum1(sort) + "' data-name='" + _sscnum2(sort) + "'>");
            //    htmlData.push("<span class='name'>" + _sscnum1(sort) + _sscnum2(sort) + "</span>");
            //    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            //    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            //    htmlData.push("</li>");
            //}
            //htmlData.push("</ul>");
            //htmlData.push("</fieldset>");
            //htmlData.push("</div>");
            //htmlData.push("</div>");
        }
    } else if (gameIndex == 4) { //PK10
        var _dpk = function (index) { switch (index) { case 1: return "冠軍"; case 2: return "亞軍"; case 3: return "第三名"; case 4: return "第四名"; case 5: return "第五名"; case 6: return "第六名"; case 7: return "第七名"; case 8: return "第八名"; case 9: return "第九名"; case 10: return "第十名"; } };
        if (type == 1) {
            var len;
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                len = i < 5 ? 37 : 35;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 32; n <= len; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _pknum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 22; n <= 31; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='PKNo_" + (n - 21) + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 3) {
            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 17; n++) {
                sort = n;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name bf_14'>" + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙、大小</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            for (var m = 1; m <= 2; m++) {
                if (m == 2) sortIndex = 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 22; n <= 34; n = n + 4) {
                        sort = n + i;
                        sort = sort == 32 ? 36 : sort == 33 ? 37 : sort == 36 ? 32 : sort == 37 ? 33 : sort;
                        sort = sort + sortIndex;
                        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (comm.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                        htmlData.push("<span class='name'>" + str + "</span>");
                        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 4) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 3) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 54; n <= 69; n = n + 4) {
                        sort = n + i;
                        sort = sort == 64 ? 68 : sort == 65 ? 69 : sort == 68 ? 64 : sort == 69 ? 65 : sort;
                        sort = sort + sortIndex;
                        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (comm.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 5) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 7) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 118; n <= 133; n = n + 4) {
                        sort = n + i;
                        sort = sort == 128 ? 132 : sort == 129 ? 133 : sort == 132 ? 128 : sort == 133 ? 129 : sort;
                        sort = sort + sortIndex;
                        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (comm.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        }
    } else if (gameIndex == 14) { //PK10
        var _dpk = function (index) { switch (index) { case 1: return "冠軍"; case 2: return "亞軍"; case 3: return "第三名"; case 4: return "第四名"; case 5: return "第五名"; case 6: return "第六名"; case 7: return "第七名"; case 8: return "第八名"; case 9: return "第九名"; case 10: return "第十名"; } };
        if (type == 1) {
            var len;
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                len = i < 5 ? 37 : 35;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 32; n <= len; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _pknum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            for (var i = 0; i < 10; i++) {
                if (i > 0)
                    sortIndex = i * 16;
                else
                    sortIndex = 0;
                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk((i + 1)) + "</legend>");
                htmlData.push("<ul>");
                for (var n = 22; n <= 31; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='PKNo_" + (n - 21) + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 3) {
            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>冠、亞軍和</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 17; n++) {
                sort = n;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name bf_14'>" + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙、大小</legend>");
            htmlData.push("<ul>");
            for (var n = 18; n <= 21; n++) {
                sort = n;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _pknum1(sort) + _pknum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            for (var m = 1; m <= 2; m++) {
                if (m == 2) sortIndex = 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 22; n <= 34; n = n + 4) {
                        sort = n + i;
                        sort = sort == 32 ? 36 : sort == 33 ? 37 : sort == 36 ? 32 : sort == 37 ? 33 : sort;
                        sort = sort + sortIndex;
                        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (comm.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                        htmlData.push("<span class='name'>" + str + "</span>");
                        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                        htmlData.push("</li>");
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 4) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 3) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 54; n <= 69; n = n + 4) {
                        sort = n + i;
                        sort = sort == 64 ? 68 : sort == 65 ? 69 : sort == 68 ? 64 : sort == 69 ? 65 : sort;
                        sort = sort + sortIndex;
                        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (comm.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 5) {
            for (var m = 0; m < 4; m++) {
                if (m > 0) sortIndex = m * 16; else sortIndex = 0;
                htmlData.push("<div class='game_box base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>" + _dpk(m + 7) + "</legend>");
                htmlData.push("<ul>");
                for (var i = 0; i < 4; i++) {
                    for (var n = 118; n <= 133; n = n + 4) {
                        sort = n + i;
                        sort = sort == 128 ? 132 : sort == 129 ? 133 : sort == 132 ? 128 : sort == 133 ? 129 : sort;
                        sort = sort + sortIndex;
                        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                        str = _pknum2(sort);
                        if (comm.DecimalSign(str))
                            str = "<i class='PKNo_" + str + "'></i>";
                        if (str == "-1") {
                            htmlData.push("<li>");
                            htmlData.push("<span class='name'></span>");
                            htmlData.push("<span class='p'></span>");
                            htmlData.push("<span class='in'></span>");
                            htmlData.push("</li>");
                        } else {
                            htmlData.push("<li data-sort='" + sort + "' data-title='" + _pknum1(sort) + "' data-name='" + _pknum2(sort) + "'>");
                            htmlData.push("<span class='name'>" + str + "</span>");
                            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                            htmlData.push("</li>");
                        }
                    }
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        }
    }
    else if (gameIndex == 5) { //KS
        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(".rightBox div.left li[name='lmResult']").css("display", "none");
        $(".rightBox div.left li[name='putResult']").addClass("active");
        $(".rightBox div.right #putResult").addClass("active");
        var bf_14;
        var _subNum = function (str) {
            var timeAry = [];
            for (var n = 0; n < str.length; n++) {
                timeAry.push("<i class='KSNo_" + str.substring(n, n + 1) + "'></i>");
            }
            return timeAry.join("");
        };
        htmlData.push("<div class='game_box base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>三軍、大小</legend>");
        htmlData.push("<ul>");
        for (var i = 3; i <= 10; i++) {
            sort = i;
            sort = sort == 9 ? 1 : sort == 10 ? 2 : sort;
            sort = sort == 6 ? 1 : sort == 1 ? 6 : sort;
            sort = sort == 7 ? 8 : sort == 8 ? 7 : sort;
            sort = sort == 8 ? 6 : sort == 6 ? 8 : sort;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            str = _ksnum2(sort);
            if (comm.DecimalSign(str)) str = "<i class='KSNo_" + str + "'></i>";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>圍骰、全骰</legend>");
        htmlData.push("<ul>");
        for (var i = 9; i <= 15; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            bf_14 = "";
            str = _ksnum2(sort);
            if (comm.DecimalSign(str)) { str = _subNum(str); bf_14 = "bf_14"; }
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name " + bf_14 + "'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>點數</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n < 4; n++) {
            for (var i = n; i <= 14; i = i + 3) {
                sort = i + 15;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _ksnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>長牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var n = 1; n < 6; n++) {
            for (var i = n; i <= 15; i = i + 5) {
                sort = i + 29;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>短牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var i = 45; i <= 50; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

    } else if (gameIndex == 6) { //KLB
        if (type == 1) {
            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、總和過關</legend>");
            htmlData.push("<ul>");
            for (var i = 81; i <= 84; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum1(sort) + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            for (var i = 86; i <= 89; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum1(sort) + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            sort = 85;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + _klbnum1(sort) + _klbnum2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_3 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>前后和</legend>");
            htmlData.push("<ul>");
            for (var i = 90; i <= 92; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_3 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>單雙和</legend>");
            htmlData.push("<ul>");
            for (var i = 93; i <= 95; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>五行</legend>");
            htmlData.push("<ul>");
            for (var i = 96; i <= 100; i++) {
                sort = i;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _klbnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }

            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 2) {
            htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正碼</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 16; n++) {
                for (var i = n; i <= 80; i = i + 16) {
                    sort = i;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _klbnum1(sort) + "' data-name='" + _klbnum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='KLBNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        }
    } else if (gameIndex == 8) {

    } else if (gameIndex == 9) {

    } else if (gameIndex == 10) {
        if (type == 1) {
            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 8; n = n + 2) {
                    sort = n + 201;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    str = sort == 208 || sort == 209 ? "" : _gxnum1(sort);
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + str + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 36;
                else
                    sortIndex = 0;

                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 22; n <= 29; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type == 2) {
            for (var i = 0; i < 5; i++) {
                if (i > 0)
                    sortIndex = i * 36;
                else
                    sortIndex = 0;

                htmlData.push("<div class='game_box col_1 gameBox base-clear'>");
                htmlData.push("<div class='game_con'>");
                htmlData.push("<fieldset>");
                htmlData.push("<legend>第" + _dx((i + 1)) + "球</legend>");
                htmlData.push("<ul>");
                for (var n = 1; n <= 21; n++) {
                    sort = n + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'><i class='GXNo_" + n + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
                htmlData.push("</ul>");
                htmlData.push("</fieldset>");
                htmlData.push("</div>");
                htmlData.push("</div>");
            }
        } else if (type >= 3 && type <= 7) {
            if (type == 3) {
                str = "一";
                sortIndex = 0;
            } else if (type == 4) {
                str = "二";
                sortIndex = 36;
            } else if (type == 5) {
                str = "三";
                sortIndex = 72;
            } else if (type == 6) {
                str = "四";
                sortIndex = 108;
            } else if (type == 7) {
                str = "五";
                sortIndex = 144;
            }

            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>第" + str + "球</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + sortIndex;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='GXNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            sort = 21 + sortIndex;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='21'>");
            htmlData.push("<span class='name'><i class='GXNo_21'></i></span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");

            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>兩面</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 15; i = i + 4) {
                    sort = i + 21 + sortIndex;
                    //sort = i == 9 || i == 10 ? sort + 7 : sort;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 8) {
            htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正碼</legend>");
            htmlData.push("<ul>");
            for (var n = 1; n <= 4; n++) {
                for (var i = n; i <= 20; i = i + 4) {
                    num = i < 10 ? "0" + i : i;
                    sort = i + 180;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + num + "'>");
                    htmlData.push("<span class='name'><i class='GXNo_" + i + "'></i></span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            sort = 201;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='21'>");
            htmlData.push("<span class='name'><i class='GXNo_21'></i></span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        } else if (type == 9) {
            htmlData.push("<div class='game_box base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>總和、龍虎</legend>");
            htmlData.push("<ul>");
            for (var i = 1; i <= 2; i++) {
                for (var n = i; n <= 8; n = n + 2) {
                    sort = n + 201;
                    disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                    str = sort == 208 || sort == 209 ? "" : _gxnum1(sort);
                    htmlData.push("<li data-sort='" + sort + "' data-title='" + _gxnum1(sort) + "' data-name='" + _gxnum2(sort) + "'>");
                    htmlData.push("<span class='name'>" + str + _gxnum2(sort) + "</span>");
                    htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                    htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                    htmlData.push("</li>");
                }
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        }
    } else if (gameIndex == 13) {

        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(".rightBox div.left li[name='lmResult']").css("display", "none");
        $(".rightBox div.left li[name='putResult']").addClass("active");
        $(".rightBox div.right #putResult").addClass("active");
        var bf_14;
        var _subNum = function (str) {
            var timeAry = [];
            for (var n = 0; n < str.length; n++) {
                timeAry.push("<i class='KSNo_" + str.substring(n, n + 1) + "'></i>");
            }
            return timeAry.join("");
        };
        htmlData.push("<div class='game_box base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>三軍、大小</legend>");
        htmlData.push("<ul>");
        for (var i = 3; i <= 10; i++) {
            sort = i;
            sort = sort == 9 ? 1 : sort == 10 ? 2 : sort;
            sort = sort == 6 ? 1 : sort == 1 ? 6 : sort;
            sort = sort == 7 ? 8 : sort == 8 ? 7 : sort;
            sort = sort == 8 ? 6 : sort == 6 ? 8 : sort;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            str = _ksnum2(sort);
            if (comm.DecimalSign(str)) str = "<i class='KSNo_" + str + "'></i>";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>圍骰、全骰</legend>");
        htmlData.push("<ul>");
        for (var i = 9; i <= 15; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            bf_14 = "";
            str = _ksnum2(sort);
            if (comm.DecimalSign(str)) { str = _subNum(str); bf_14 = "bf_14"; }
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name " + bf_14 + "'>" + str + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_5 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>點數</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n < 4; n++) {
            for (var i = n; i <= 14; i = i + 3) {
                sort = i + 15;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _ksnum2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>長牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var n = 1; n < 6; n++) {
            for (var i = n; i <= 15; i = i + 5) {
                sort = i + 29;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
                htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box col_3_3 gameBox base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>短牌</legend>");
        htmlData.push("<ul class='k3_2'>");
        for (var i = 45; i <= 50; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _ksnum1(sort) + "' data-name='" + _ksnum2(sort) + "'>");
            htmlData.push("<span class='name'>" + _subNum(_ksnum2(sort)) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

    }

    htmlData.push("</div>"); //game_ball_wrap end
    game_loading_wrap(false);
    $("#gameBox").html(htmlData.join(""));
    bindGameFun(); //註冊相關函數，單筆下注，多筆下注，重置，提交下注
    gameTitleClick(msg);
}
function klcToHaoMaPan(str, s_sort, oddsList, myNum) {
    var _oddsList = oddsList || [];
    var _s_sort = s_sort - 1 || 0;
    var disabled;
    var NumAry = ["<ul class='lineHover'>"];
    for (var i = 1; i <= 20; i++) {
        if (str == 1) {
            NumAry.push("<li class='" + myNum + "No_" + i + "'></li>");
        } else if (str == 2) {
            sort = _s_sort + i;
            disabled = comm.DecimalSign(_oddsList[sort]) ? "" : "disabled='disabled'";
            NumAry.push("<li data-sort='" + sort + "' data-title='" + _klcnum1(sort) + "' data-name='" + _klcnum2(sort) + "'>");
            NumAry.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + _oddsList[sort] + "</a></span>");
            NumAry.push("<span class='in'><input class='input onlyNum orderInput' " + disabled + " type='text' maxlength='7'></span>");
            NumAry.push("</li>");
        }
    }
    NumAry.push("</ul>");
    return NumAry.join("");
}

function addHotCool(msg) {
    var count = msg.lengm.length; 
    var result = ["<table id='lrylResult' class='active'>"], num;
    result.push("<thead><tr><th width='80'>類型</th>");
    for (var i = 1; i <= count; i++) {
        if (count == 20 || count == 21)
            num = i < 10 ? "0" + i : i;
        else if (count == 10)
            num = i - 1;
        result.push("<th>" + num + "</th>");
    }
    result.push("</thead>");
    result.push("<tbody>");

    result.push("<tr><td>冷熱</td>");
    for (var i = 0; i < msg.lengm.length; i++) {
        result.push("<td>" + msg.lengm[i] + "</td>");
    }

    result.push("<tr><td>遺漏</td>");
    for (var i = 0; i < msg.yilou.length; i++) {
        result.push("<td>" + msg.yilou[i] + "</td>");
    }
    result.push("</tbody>");

    result.push("</table>");
    $("#hot_Cool").html(result.join(""));
}

function addCqlResult(msg) {
    if (msg.trendLi) {
        var dib, s;
        var count = msg.trendLi.length;
        var result = "<div class='trend_title'><ul class='base-clear'>";
        for (var i = 0; i < count; i++) {
            s = i == 0 ? "active" : "";
            result += "<li index='" + i + "' class='tab_btn " + s + "'><a href='javascript:void(0)'>" + msg.trendLi[i] + "</a></li>";
        }
        result += "</ul></div>";

        result += "<div class='trend_con'><ul class='base-clear'>";
        for (var i = 0; i < count; i++) {
            s = i == 0 ? "active" : "";
            dib = [];
            if (msg.trendContent[i]) {
                for (var k = 0; k < msg.trendContent[i].length; k++) {
                    dib.push("<span class='dib'>");
                    dib.push("<em>" + msg.trendContent[i][k] + "</em>");
                    for (var n = k + 1; n < msg.trendContent[i].length; n++) {
                        if (msg.trendContent[0][n] && msg.trendContent[i][n] == msg.trendContent[i][k]) {
                            dib.push("<em>" + msg.trendContent[i][n] + "</em>");
                            k++;
                        } else {
                            break;
                        }
                    }
                    dib.push("</span>,");
                }
            }
            var jon = dib.join("").split(",");
            dib = [];
            for (var q = 0; q < 25; q++) {
                if (jon[q] && jon[q] != "")
                    dib.unshift(jon[q]);
            }
            result += "<li class='tab_item " + s + " dib-wrap'>" + dib.join("") + "</li>";
        }
        result += "</ul></div>";
        $("#cqlResult").html(result);
        $("#cqlResult div.trend_title li.tab_btn").click(function () {
            $("#cqlResult div.trend_title li.tab_btn").removeClass("active");
            var index = $(this).addClass("active").attr("index");
            $("#cqlResult div.trend_con li.tab_item").removeClass("active");
            $("#cqlResult div.trend_con li:eq(" + index + ")").addClass("active");
        });
    }
}