function gametop(gameIndex, isNumTo) {
    for (var i in __sysinfo.data.gameList) {
        if (i == gameIndex) {
            showgametop({ gameIndex: i, isNumTo: isNumTo, gameList: __sysinfo.data.gameList[i] });
        }
    }
}
function showgametop(msg) {
    if (msg.gameIndex == 1) {
        $(".game_pic #game_logo").attr("src", "/Images/Member/HK.png");
        $(".game_pic a").attr("href", "http://www.hkjc.com/home/chinese/index.asp");
        $("#game_name p[name='row_small']").html("每周二、四、六 <b><span id='begintime'></span>-<span id='endtime'></span></b>開盤");
    } else {
        $("#game_name p[name='row_small']").html("<b><span id='intervaltime'></span></b>一期，每天<b><span id='begintime'></span>-<span id='endtime'></span></b>銷售");
        if (msg.gameIndex == 2) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/KLC.png");
            $(".game_pic a").attr("href", "http://www.gdfc.org.cn/play_list_game_9.html");
        } else if (msg.gameIndex == 3) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/SSC.png");
            $(".game_pic a").attr("href", "http://www.cqcp.net/game/ssc/");
        } else if (msg.gameIndex == 4) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/PK.png");
            $(".game_pic a").attr("href", "http://www.bwlc.net/bulletin/trax.html");
        } else if (msg.gameIndex == 5) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/KS.png");
            $(".game_pic a").attr("href", "http://www.jslottery.com/Lottery/LotteryInfo_Fast3?PlayType=7");
        } else if (msg.gameIndex == 6) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/KLB.png");
            $(".game_pic a").attr("href", "http://www.bwlc.net/bulletin/keno.html");
        } else if (msg.gameIndex == 7) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/NC.png");
            $(".game_pic a").attr("href", "http://www.cqcp.net/game/xync/");
        } else if (msg.gameIndex == 8) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/FT.png");
            $(".game_pic a").attr("href", "http://www.lucky.cn/");
        } else if (msg.gameIndex == 10) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/GX.png");
            $(".game_pic a").attr("href", "http://www.gxcaipiao.com.cn/notice/notice_12.html");
        } else if (msg.gameIndex == 13) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/KS.png");
            $(".game_pic a").attr("href", "http://www.lucky.cn/");
        } else if (msg.gameIndex == 14) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/pkjs.png");
            $(".game_pic a").attr("href", "https://1680268.com/html/jisusaiche/pk10kai.html");
        } else if (msg.gameIndex == 15) {
            $(".game_pic #game_logo").attr("src", "/Images/Member/SSCJS.png");
            $(".game_pic a").attr("href", "https://1680268.com/html/shishicai_jisu/ssc_index.html");
        }
    }

    var boxList = [], active;
    for (var i = 0; i < msg.gameList.length; i++) {
        active = i == 0 ? "active" : "";
        for (var n in msg.gameList[i]) {
            //去掉牛牛Tab
            if (msg.gameList[i][n] != '牛牛') {
                boxList.push("<li class='subBtn " + active + "'><a href='javascript:void(0)' data-action='" + n + "'>" + msg.gameList[i][n] + "</a></li>");
            }
        }
    }
    $("#closedTime").html("").addClass("time_loading");
    $("#updateTime").html("...");
    $("#cqlResult").html("");
    $("#hot_Cool").html("");
    $("#game_box_title ul").html(boxList.join(""));
    var data_action = $("#game_box_title li.active a[data-action]").attr("data-action");
    if (msg.isNumTo) {
        data_action = data_action + "&isNumTo=1";
    }
    middleBind({ data_action: data_action });
}

//数据加载（调用方法前已中断所有连接及时间轴）
var heartbeattime;
setInterval('heartBeat()', 30000);
function heartBeat() {
    S.request = G.ajax("heartbeat", function (json) {
    });
}

var checkgamedatatime;

function gamedata(msg) {

    clearTimeout(checkgamedatatime);

    game_loading_wrap(true);
    var data_action = "member" + msg.data_action;
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var type = G.query("type", "?" + msg.data_action);

    var my_type = type;
    if (gameIndex == 1) {
        if (type == 1 || type == 2) {
            my_type = 1;
        } else if (type >= 5 && type <= 10) {
            my_type = 5;
        } else if (type >= 16 && type <= 21) {
            my_type = 16;
        } else if (type >= 22 && type <= 28) {
            my_type = 22;
        } else if (type >= 29 && type <= 34) {
            my_type = 29;
        }
    }
    $("#game_box_title li").removeClass("active");
    $("#game_box_title li a[data-action='gamedata&gameIndex=" + gameIndex + "&type=" + my_type + "']").parent("li").addClass("active");
    $("#game_big_name").html($("#menuText span").html());
    if (gameIndex != 1) {
        $(".rightBox div.left li").addClass("active");
        $(".rightBox div.right ul").addClass("active");
        $(".rightBox div.left li[name='lmResult']").css("display", "block");
        $(".rightBox div.left li[name='putResult']").removeClass("active");
        $(".rightBox div.right #putResult").removeClass("active");
    }
    $(".rightBox div.left li[name='knResult']").remove();
    $(".rightBox div.right #knResult").remove();
    S.request = G.ajax(data_action, function (json) {
        $("#game_small_name").html($("#game_box_title li.active a").html());
        $("#profit").html(json.win) //今天输赢
        $("#usableCreditSpan").html(json.usableCredit); //可用额
        $("#phase1").html(json.phase[0]);
        $("#phase2").html(json.phase[1]);
        if (gameIndex == 14 || gameIndex == 15) {
            $("#intervaltime").html(json.phase[2] + "秒");
        } else {
            $("#intervaltime").html(json.phase[2] + "分鐘");
        }
        $("#begintime").html(json.phase[3]);
        $("#endtime").html(json.phase[4]);
        $("#newPhase").html(json.openNumList.newnumber);
        var numList = json.openNumList.numList;
        var No = function () { if (gameIndex == 1) return "HK"; else if (gameIndex == 2) return "KLC"; else if (gameIndex == 3 || gameIndex == 15) return "SSC"; else if (gameIndex == 4 || gameIndex == 8 || gameIndex == 14) return "PK"; else if (gameIndex == 5) return "KS"; else if (gameIndex == 6) return "KLB"; else if (gameIndex == 7) return "NC"; else if (gameIndex == 10) return "GX"; else if (gameIndex == 13) return "KS"; };
        for (var i = 0; i < numList.length; i++) {
            numList[i] = "<i class='" + No() + "No_" + numList[i] + "'></i>";
        }
        $("#prevBall").html(numList.join(""));
        $("#NowJq").html(json.openDateList.number || "NO");
        var closeTime = json.openDateList.endTime;
        var lotteryTime = json.openDateList.lotteryTime;
        var time = closeTime == 0 && lotteryTime == 0 ? 0 : closeTime > 0 ? closeTime : lotteryTime > 0 ? lotteryTime : 0;
        var closeText = closeTime == 0 && lotteryTime == 0 || closeTime > 0 ? "封盤" : "開獎";
        $("#closeText").html(closeText);

        //球號冷熱、遺漏排列
        if (((gameIndex == 2 || gameIndex == 7) && type >= 3 && type <= 10) || ((gameIndex == 3 || gameIndex == 10 || gameIndex == 15) && type >= 3 && type <= 7)) {
            //addHotCool({ yilou: data.yilou, lengm: data.lengm });
        }
        //兩面显示排行
        addCqlResult({ trendLi: json.trendLi, trendContent: json.trendContent });

        //长龙排行
        clsort(json.clList);

        //最新5期开奖
        var data_thead = [];
        if (json.resultList) {
            data_thead.push("<thead>");
            switch (parseInt(gameIndex)) {
                case 1:
                    data_thead.push("<tr><th>期數</th><th>開獎日期</th><th>開獎號碼</th><th colspan='3'>總和</th><th>7色波</th><th colspan='6'>特碼兩面</th></tr>");
                    break;
                case 7:
                case 2: //广东快乐十分
                    data_thead.push("<tr><th>期數</th><th>開獎日期</th><th>開獎號碼</th><th colspan='4'>總和</th><th colspan='4'>1-4龍虎</th></tr>");
                    break;
                case 15:
                case 3: //重庆时时彩
                    data_thead.push("<tr><th>期數</th><th>開獎日期</th><th>開獎號碼</th><th colspan='3'>總和</th><th colspan='3'>牛牛</th><th>龍虎</th><th>前三</th><th>中三</th><th>后三</th></tr>");
                    break;
                case 4:
                case 8: //北京赛车PK10
                case 14: //极速赛车
                    data_thead.push("<tr><th>期數</th><th>開獎日期</th><th>開獎號碼</th><th colspan='3'>冠亞軍和</th><th colspan='5'>1~5龍虎</th></tr>");
                    break;
                case 5: //江苏快3
                    data_thead.push("<tr><th>期數</th><th>開獎日期</th><th>開獎號碼</th><th colspan='2'>總和</th></tr>");
                    break;
                case 6: //北京快乐8
                    data_thead.push("<tr><th>期數</th><th>開獎日期</th><th>開獎號碼</th><th colspan='4'>總和</th><th colspan='2'>比數量</th></tr>");
                    break;
                case 10: //广西快乐十分
                    data_thead.push("<tr><th>期數</th><th>開獎日期</th><th>開獎號碼</th><th colspan='4'>總和</th><th>龍虎</th></tr>");
                    break;
            }
            data_thead.push("</thead>");
            data_thead.push("<tbody>");
            for (var i = 0; i < json.resultList.length; i++) {
                data_thead.push(json.resultList[i]);
            }
            data_thead.push("</tbody>");
            $("#history").html(data_thead.join(""));
        }

        //最新5笔下注
        if (json.putResult) {
            var result = [], on;
            for (var i = 0; i < json.putResult.length; i++) {
                on = i % 2 == 0 ? "on" : "";
                result.push("<li class='" + on + "'>" + json.putResult[i] + "</li>");
            }
            if (result.length > 0) {
                $("#putResult").html(result.join(""));
            }
        }

        //加载对应模板
        GameMiddle({ gameIndex: gameIndex, type: type, data: json });

        //倒计时
        if ((closeTime == 0 && lotteryTime == 0) || (!closeTime || !lotteryTime)) {
            $("#updateTime").html("...");
            $("#closedTime").removeClass("time_loading").html("<span>0</span><span>0</span>分<span>0</span><span>0</span>秒");

            checkgamedatatime = setTimeout(function () {

                var myaction = G.urlReplace({ url: "?" + msg.data_action, paramName: "isCl", val: "1", pad: true });
                myaction = G.urlReplace({ url: myaction, paramName: "isNumto" }).replace("?", "");
                middleBind({ data_action: myaction });
            }, 10000);

            return;
        }
        var updateTime = 93, timeAry;
        S.intervalTime = setInterval(function () {
            time--;
            if (time > 0) {
                if (gameIndex == 1) {
                    settimer = G.settimer(time).replace(/:/g, '');
                } else {
                    settimer = G.settimes(time).replace(/:/g, '');
                }
                timeAry = [];
                for (var n = 0; n < settimer.length; n++) {
                    timeAry.push(settimer.substring(n, n + 1));
                }
                if (gameIndex == 1) {
                    $("#closedTime").removeClass("time_loading").html("<span>" + timeAry[0] + "</span><span>" + timeAry[1] + "</span>時<span>" + timeAry[2] + "</span><span>" + timeAry[3] + "</span>分<span>" + timeAry[4] + "</span><span>" + timeAry[5] + "</span>秒");
                } else {
                    $("#closedTime").removeClass("time_loading").html("<span>" + timeAry[0] + "</span><span>" + timeAry[1] + "</span>分<span>" + timeAry[2] + "</span><span>" + timeAry[3] + "</span>秒");
                }
            } else { //封盘或开奖时间结束
                clearInterval(S.intervalTime);
                S.loadingWrap = false;
                $("#closedTime").html("").addClass("time_loading");
                $("#updateTime").html("...");
                var myaction = G.urlReplace({ url: "?" + msg.data_action, paramName: "isCl", val: "1", pad: true });
                myaction = G.urlReplace({ url: myaction, paramName: "isNumto" }).replace("?", "");
                middleBind({ data_action: myaction });
            }

            updateTime--;
            if (updateTime < 0) {
                $("#updateTime").html("...");
                //只读取时间戳
                G.ajax(G.urlReplace({ url: "?" + data_action, paramName: "isCl", val: "0", pad: true }).replace("?", ""), function (json) {
                    updateTime = 93;
                    closeTime = json.openDateList.endTime;
                    lotteryTime = json.openDateList.lotteryTime;
                    time = closeTime == 0 && lotteryTime == 0 ? 0 : closeTime > 0 ? closeTime : lotteryTime > 0 ? lotteryTime : 0;
                    if ((closeTime == 0 && lotteryTime == 0) || (!closeTime || !lotteryTime)) {
                        clearInterval(S.intervalTime);
                        $("#updateTime").html("...");
                        $("#closedTime").removeClass("time_loading").html("<span>0</span><span>0</span>分<span>0</span><span>0</span>秒");
                        return;
                    }
                });
            } else {
                $("#updateTime").html(updateTime + "秒");
            }
        }, 1000);

        //读取最新开奖
        (function () {
            if (S.intervalOpenTime) {
                clearInterval(S.intervalOpenTime);
            }
            var _continueNum = function () {
                var newnumber = json.openNumList.newnumber || 0;
                G.ajax("AutoNewNumber&gameIndex=" + gameIndex, function (json) {
                    var m = json.result;
                    if (m == "continue") {
                        S.intervalOpenTime = setTimeout(_continueNum, 5000);
                    } else if (newnumber > 0 && G.NumberSign(m) && parseInt(m) > parseInt(newnumber)) {
                        setTimeout(function () {
                            if (__sysinfo.voice == 1) {
                                if ($("#Sound").length == 0) {
                                    $("body").append("<div id='Sound'><embed src='/images/ClewSound.swf' loop='false' autostart='false' mastersound='' width='0' hidden='true' height='0'></div>");
                                    setTimeout(function () { $("#Sound").remove(); }, 5000);
                                }
                            }
                            S.loadingWrap = false;
                            var myaction = G.urlReplace({ url: "?" + msg.data_action, paramName: "isCl" });
                            myaction = G.urlReplace({ url: myaction, paramName: "isNumto", val: "1", pad: true }).replace("?", "");
                            middleBind({ data_action: myaction });
                        }, 2000);
                    }
                }, function () {
                    if (S.intervalOpenTime) {
                        clearInterval(S.intervalOpenTime);
                    }
                });
            };
            _continueNum();
        })();
    });
}

function game_loading_wrap(stop) {
    if (S.loadingWrap) {
        if (stop) {
            $(".game_loading_wrap").css("display", "block");
            $("#gameBox").css("display", "none");
        } else {
            $(".game_loading_wrap").css("display", "none");
            $("#gameBox").css("display", "block");
        }
    }
}

//Game一級導航
function gameBoxTitleClick() {
    $("#game_box_title a[data-action]").unbind("click").click(function () {
        S.loadingWrap = true;
        var data_action = $(this).attr("data-action");
        middleBind({ data_action: data_action });
    });
}
function gameTitleClick() {
    $("#gameTitle li").unbind("click").click(function () {
        if (!S.stop) {
            return false;
        }
        $("#gameBox li span.in a.radioSim").removeClass("radioPoint");
        $("#gameTitle li").removeClass("active");
        $(this).addClass("active");
        if ($(this).attr("data-mysort")) {
            var sort, myodds;
            var data_dow = $(this).attr("data-dow");
            var mystr = $(this).find("h3").html();
            var data_mysort = parseInt($(this).attr("data-mysort"));
            var gameIndex = $("#menuText").attr("data-index");
            if (gameIndex == 1) {
                if (data_mysort == 154 || data_mysort >= 676 && data_mysort <= 679) {
                    myodds = $(this).find("h4").html();
                    if (!G.DecimalSign(myodds)) {
                        myodds = "-";
                        $("#gameBox li span.in a.radioSim").addClass("radiodsable");
                    } else {
                        $("#gameBox li span.in a.radioSim").removeClass("radiodsable");
                    }
                    $("#gameBox li span.p a.red").html(myodds);
                }
            } else if (gameIndex == 2) {
                if (data_mysort == 323 || data_mysort == 324 || data_mysort == 325 || data_mysort == 326 || data_mysort == 327 || data_mysort == 328 || data_mysort == 329) {
                    myodds = $(this).find("h4").html();
                    if (!G.DecimalSign(myodds)) {
                        $("#gameBox li span.in a.radioSim").addClass("radiodsable");
                    } else {
                        $("#gameBox li span.in a.radioSim").removeClass("radiodsable");
                    }
                    $("#gameBox legend").html(mystr);
                }
            } else if (gameIndex == 13) {
                if (data_mysort == -1) {
                    $("#gameBox li.auto").addClass("hiden");
                    $("#gameBox li." + data_dow).removeClass("hiden");
                    $("#clearBtn").click();
                }
            }
        }
        var data_action = $(this).attr("data-action"); //參數判斷是否重新加載數據
        if (data_action) {
            S.loadingWrap = true;
            middleBind({ data_action: data_action });
        }
    });
}

//赔率刷新加载
function loadOdds(oddsList) {
    var gameBox = $("#gameBox");
    var gameIndex = $("#menuText").attr("index");
    var oddsEvent, inputEvent;
    for (var i in oddsList) {
        if (gameIndex == 1 && i == 154) {
            //hxOddsSum({ odds: oddsList[i], duplex: 6, upodds: __info.autoOdds[0] });
        } else if (gameIndex == 1 && (parseInt(i) >= 684 && parseInt(i) <= 732 || parseInt(i) >= 610 && parseInt(i) <= 675 || parseInt(i) >= 1187 && parseInt(i) <= 1198 || parseInt(i) >= 746 && parseInt(i) <= 1137)) {
            //hxOddsSum({ odds: oddsList[i], duplex: 7, upodds: __info.autoOdds[1] });
        } else if (gameIndex == 2 && parseInt(i) >= 323 && parseInt(i) <= 329) {

        } else {
            oddsEvent = gameBox.find("li[data-sort='" + i + "'] span.p a.oddsEvent");
            inputEvent = gameBox.find("li[data-sort='" + i + "'] span.in input[type='text']");
            if (G.DecimalSign(oddsList[i])) {
                inputEvent.attr("disabled", "");
                if (oddsEvent.html() != oddsList[i])
                    oddsEvent.html(oddsList[i]);
            } else {
                inputEvent.attr("disabled", "disabled").val("");
                oddsEvent.html("-");
            }
        }
    }
}

//兩面長龍
function clsort(clList) {
    var key, val, on, lmResult = [], vak;
    if (clList) {
        clList.sort(function (a, b) {
            var _a = a.split(":")[1], _b = b.split(":")[1];
            return parseInt(_b) - parseInt(_a);
        });
        for (var i = 0; i < clList.length; i++) {
            key = clList[i].split(":");
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
    }
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
        $("#cqlResult div.trend_title li.tab_btn").unbind("click").click(function () {
            $("#cqlResult div.trend_title li.tab_btn").removeClass("active");
            var index = $(this).addClass("active").attr("index");
            $("#cqlResult div.trend_con li.tab_item").removeClass("active");
            $("#cqlResult div.trend_con li:eq(" + index + ")").addClass("active");
        });
    }
}
function bindGameFun() {
    var gameIndex = $("#menuText").attr("data-index");
    var obj = $("#gameBox");
    obj.find("input[type='text']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
    obj.find("input[type='text']").focus(function () {
        if (!$(this).hasClass("check")) {
            $(this).val($("#tool_ys_input").val());
            $(this).addClass("check");
        } else {
            $(this).val("");
            $(this).removeClass("check");
        }
    });
    obj.find("li span.p a.oddsEvent").unbind("click").click(function () {
        var n1 = $(this).parents("li").attr("data-title");
        var n2 = $(this).parents("li").attr("data-name");
        var sort = $(this).parents("li").attr("data-sort");
        var odds = $(this).html();
        myWarp({ gameIndex: gameIndex, odds: odds, n1: n1, n2: n2, sort: sort, obj: $(this) });
    });
    //勾選項
    obj.find("li span.in a").unbind("click").click(function () {
        var myclass = $(this).attr("class");
        var mymax = parseInt($("#gameTitle li.active").attr("data-max"));
        if (myclass.indexOf("radiodsable") == -1) {
            if (myclass.indexOf("radioPoint") == -1) {
                $(this).addClass("radioPoint");
                enachRadioPoint($(this), mymax);
            } else {
                $(this).removeClass("radioPoint");
            }
        }
    });

    $("#clearBtn").unbind("click").click(function () {
        obj.find("input[type='text']").val("").removeClass("check");
        $("#gameBox li span.in a.radioSim").removeClass("radioPoint");
    });
    var data_type = parseInt(G.query("type", "?" + $("#game_box_title li.active a").attr("data-action")));
    $("#gameSubmit").unbind("click").click(function () {
        if (gameIndex == 1 && (data_type == 4 || data_type == 16 || data_type == 22 || data_type == 29)) {
            gameHxSubmit(data_type);
        } else if ((gameIndex == 2 || gameIndex == 7) && data_type == 12) {
            gameHxSubmit(data_type);
        } else {
            gameSubmit();
        }
    });
    obj.find("input[type='text']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $("#gameSubmit").click();
            return false;
        }
    });
}
function enachRadioPoint(myobj, max) {
    var count = 0;
    $("#gameBox li a.radioPoint").each(function () {
        count++;
    });
    if (count > max) {
        myobj.removeClass("radioPoint");
        G.alert({ content: "組合最高可選" + max + "個號碼！", ok: function () { return true; } });
    }
}
function myWarp(msg) {
    var maxPayout = parseInt(__sysinfo.data.maxPayout);
    var odds = parseFloat(msg.odds);
    var sort = msg.sort;
    var title = msg.n1 + "【" + msg.n2 + "】";
    var warp = "<div class='myLayerBox' id='myWarp' data-sort='" + sort + "'>";
    warp += "<p>賠率：<em name='odds_pl'>" + odds + "</em>下註金額：<input name='uPI_M' class='input onlyNum' type='text' maxlength='5'></p>";
    warp += "<p>可赢金额：<em name='valueOdds' class='blue'>0</em></p>";
    warp += "<p>最高派彩：<i>" + maxPayout + "</i></p>";
    warp += "</div>";
    if (G.DecimalSign(odds)) {
        var content = warp, _submit, data_stop = true;
        G.alert({ content: warp, title: title, obj: msg.obj,
            initialize: function () {
                $("#myWarp input[name='uPI_M']").focus();
                $("#myWarp input[name='uPI_M']").keyup(function () {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                    var m = parseInt($(this).val());
                    m = m * odds - m;
                    m = m > maxPayout ? maxPayout : m;
                    if (G.DecimalSign(m)) {
                        $("#myWarp em[name='valueOdds']").html(G.forDight(m, 1));
                    }
                });
            },
            ok: function () {
                var objM = $("#myWarp input[name='uPI_M']:enabled");
                if (objM.val() == "") {
                    G.myTips({ content: "下註金額不能為空!", obj: objM, myclick: true });
                    objM.focus();
                    return false;
                } else if (!G.NumberSign(objM.val()) || parseInt(objM.val()) < 1) {
                    G.myTips({ content: "下注金額不能小於單注最小下注額度：1", obj: objM, myclick: true });
                    objM.focus();
                    return false;
                } else if (data_stop) {
                    data_stop = false;
                    var opNum = $("#NowJq").html();
                    var type = 1;
                    var data = [type + ":" + sort + ":" + objM.val()];
                    objM.val("").attr("disabled", "disabled");
                    dataSubmit({ gameIndex: msg.gameIndex, number: opNum, sortAry: data.join(",") }, false);
                    return true;
                }
            }, 
            cancel: function () { }
        });
    }
}
function gameHxSubmit(data_type) {
    var data_min = parseInt($("#gameTitle li.active").attr("data-min"));
    var data_max = parseInt($("#gameTitle li.active").attr("data-max"));
    var sort = $("#gameTitle li.active").attr("data-mysort");
    var dataAry = [], dataName = [];
    var cycle;
    if (data_type == 4) {
        cycle = data_max;
        var a, b, index;
        var odds = $("#gameTitle li.active h4").html();
        $("#gameBox li span.in a.radioPoint").each(function () {
            dataName.push($(this).parents("li").attr("data-name"));
            index = parseInt($(this).parents("li").attr("data-sort"));
            index % 2 == 0 ? a = true : b = true;
        });

        if ((!a || !b) && dataName.length == 6) {
            G.alert({ content: "6肖勾選排列不允許 “全單” 或 “全雙” 組合！", ok: function () { return true; } });
            return false;
        }
        if (dataName.length == data_max) {
            var n1 = $("#gameBox legend").html();
            var money = $("#tool_ys_input").val();
            dataAry.push(sort);
            dataAry.push(n1);
            dataAry.push(dataName);
            dataAry.push(odds);
        }
    } else if (data_type == 16 || data_type == 22 || data_type == 29 || data_type == 12) {
        cycle = data_min;
        var odds = $("#gameTitle li.active h4").html();
        $("#gameBox li span.in a.radioPoint").each(function () {
            dataName.push($(this).parents("li").attr("data-name"));
        });

        dataName.sort(function (a, b) {
            var _a = a, _b = b;
            return parseInt(_a) - parseInt(_b);
        });

        if (dataName.length >= data_min && dataName.length <= data_max) {
            var n1 = $("#gameBox legend").html();
            var money = $("#tool_ys_input").val();
            dataAry.push(sort);
            dataAry.push(n1);
            dataAry.push(dataName);
            dataAry.push(odds);
        } else {
            G.alert({ content: "組合最高可選 " + data_min + "~" + data_max + " 個號碼", ok: function () { return true; } });
            return false;
        }
    }
    if (dataAry && dataAry.length > 0) {
        var data_stop = true;
        var DuplexObj = G.DuplexSum(cycle, dataAry[2]);
        var orderWrap = "<div class='lmSubmitWrap' id='lmSubmitWrap'>";
        orderWrap += "<div class='lsw_top'><p>下注號碼明細</p><p class='myNos'>" + dataAry[2].join("、") + "</p></div>";
        orderWrap += "<div id='wtWrapLm'></div>";
        orderWrap += "<div>您共選擇了<span>" + dataAry[2].length + "</span>個號碼 “復式” 共分為<span>" + DuplexObj.count + "</span>組</div>";
        orderWrap += "<div><em>" + dataAry[1] + " </em>";
        if (dataAry[3]) {
            orderWrap += "@<strong id='lmPl'>" + dataAry[3] + "</strong> ";
        }
        orderWrap += "單註金額：<input id='odds_lm_pl' class='input onlyNum' type='text' maxlength='7'></div>";
        orderWrap += "<div>總金額：<span id='sumCount'>0</span></div>";
        orderWrap += "</div>";
        G.alert({ content: orderWrap, title: "確認下單",
            initialize: function () {
                $("#lmSubmitWrap #odds_lm_pl").focus();
                $("#lmSubmitWrap #odds_lm_pl").keyup(function () {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                    var sumCount = parseInt($(this).val()) * parseInt(DuplexObj.count) || 0;
                    $("#sumCount").html(sumCount);
                });
            },
            ok: function () {
                if (data_stop) {
                    data_stop = false;
                    var objM = $("#lmSubmitWrap #odds_lm_pl:enabled");
                    if (objM.val() == "") {
                        G.myTips({ content: "下註金額不能為空!", obj: objM, myclick: true });
                        objM.focus();
                        return false;
                    } else if (!G.NumberSign(objM.val()) || parseInt(objM.val()) < 1) {
                        G.myTips({ content: "下注金額不能小於單注最小下注額度：1", obj: objM, myclick: true });
                        objM.focus();
                        return false;
                    } else {
                        var gameIndex = $("#menuText").attr("data-index");
                        var opNum = $("#NowJq").html();
                        var mydata = [];
                        var myCursor = encodeURIComponent(dataAry[2].join("、"));
                        for (var i = 0; i < DuplexObj.list.length; i++) {
                            mydata.push("1:" + DuplexObj.list[i] + ":" + objM.val());
                        }
                        $("#gameBox li span.in a.radioSim").removeClass("radioPoint");
                        objM.val("").attr("disabled", "disabled");
                        dataSubmit({ sort: dataAry[0], gameIndex: gameIndex, number: opNum, myCursor: myCursor, sortAry: mydata.join("|") }, "DownEntryLm");
                        return true;
                    }
                }
            },
            cancel: function () { }
        });
    }
}
function gameSubmit() {
    var obj = $("#gameBox");
    var odds, money, n1, n2, sort, dataAry = [];
    var data_type = $("#game_box_title li.active").attr("data-type");
    var data_number = $("#NowJq").html();
    var gameIndexStr = $("#menuText").find("span").html();
    $("#gameSubmit").focus();
    obj.find("li").each(function () {
        if ($(this).attr("data-sort") && G.NumberSign($(this).find("span.in input[type='text']").val()) && G.DecimalSign($(this).find("span.p a.oddsEvent").html())) {
            sort = $(this).attr("data-sort");
            n1 = $(this).attr("data-title");
            n2 = $(this).attr("data-name");
            odds = $(this).find("span.p a.oddsEvent").html();
            money = $(this).find("span.in input[type='text']").val();
            dataAry.push(sort + ":" + n1 + ":" + n2 + ":" + odds + ":" + money + ":" + gameIndexStr + ":" + data_number);
        }
    });
    if (dataAry && dataAry.length > 0) {
        dataAry.sort(function (a, b) {
            var _a = a.split(":")[0], _b = b.split(":")[0];
            return parseInt(_a) - parseInt(_b);
        });
        var k, count = [0, 0];
        var orderWrap = "";
        orderWrap += "<table class='order' style='width:100%'><thead><tr><th width='150'>註單明細</th><th width='120'>賠率</th><th width='80'>下註金額</th><th width='60'>操作</th><th width='60' class='cursor'>打印</th></tr></thead>";
        orderWrap += "<tbody>";
        for (var i = 0; i < dataAry.length; i++) {
            k = dataAry[i].split(":");
            orderWrap += "<tr data-sort='" + k[0] + "' data-ary='" + dataAry[i] + "'>";
            orderWrap += "<td width='150'>" + k[1] + "【" + k[2] + "】</td>";
            orderWrap += "<td width='120'><div class='plShow'>" + k[3] + "</div></td>";
            orderWrap += "<td width='80'><input class='input onlyNum orderLayerInput' value='" + k[4] + "' type='text'></td>";
            orderWrap += "<td width='60'><a class='deleteOrder deleteIcon' mysort='" + k[0] + "' title='删除' href='javascript:void(0)'></a></td>";
            orderWrap += "<td width='60'><input type='checkbox' name='print' /></td>";
            orderWrap += "</tr>";
            count[0]++;
            count[1] += parseInt(k[4]);
        }
        orderWrap += "</tbody>";
        orderWrap += "<tfoot class='zjWrap'><tr><th colspan='5'>";
        orderWrap += "總註：<span id='zj'>" + count[0] + "</span> 筆&nbsp;&nbsp;&nbsp;&nbsp;合計金額：<span id='zjm' class='blue'>" + count[1] + "</span>";
        orderWrap += "</th></tr></tfoot>";
        orderWrap += "</table>";
        var content = G.overflowDiv({ id: "orderWrap", content: orderWrap });
        var data_stop = true;
        G.alert({ content: content, title: "確認下單", width: 450,
            initialize: function () {
                var _myeach = function (stop) {
                    var mycount = [0, 0];
                    $("#orderWrap input[type='text']").each(function () {
                        if (G.DecimalSign($(this).val())) {
                            mycount[0]++;
                            mycount[1] += parseInt($(this).val());
                        }
                    });
                    if (mycount[0] == 0 && stop) {
                        $("#myWarpr").remove();
                        $("#mymask").remove();
                        return false;
                    } else {
                        $("#zj").html(mycount[0]);
                        $("#zjm").html(mycount[1]);
                    }
                };

                $("#orderWrap thead th.cursor").unbind("click").click(function () {
                    if (!$(this).attr("print")) {
                        $("#orderWrap tbody tr input[name='print']").attr("checked", "checked");
                        $(this).attr("print", "1");
                    } else {
                        $("#orderWrap tbody tr input[name='print']").attr("checked", false);
                        $(this).removeAttr("print");
                    }
                });

                $("#orderWrap input[type='text']").keyup(function () {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                    _myeach(false);
                });
                $("#orderWrap a.deleteOrder").unbind("click").click(function () {
                    $(this).parents("tr[data-sort='" + $(this).attr("mysort") + "']").remove();
                    _myeach(true);
                });
            },
            ok: function () {
                var dataAry = [];
                var printAry = [];
                var objM;
                $("#orderWrap tbody tr").each(function () {
                    if ($(this).attr("data-sort")) {
                        objM = $(this).find("input[type='text']:enabled");
                        if (objM.val() == "") {
                            dataAry = [];
                            G.myTips({ content: "下註金額不能為空!", obj: objM, myclick: true });
                            objM.focus();
                            return false;
                        } else if (!G.NumberSign(objM.val()) || parseInt(objM.val()) < 1) {
                            dataAry = [];
                            G.myTips({ content: "下注金額不能小於單注最小下注額度：1", obj: objM, myclick: true });
                            objM.focus();
                            return false;
                        } else {
                            dataAry.push(1 + ":" + $(this).attr("data-sort") + ":" + objM.val());
                            if ($(this).find("input[name='print']").attr("checked")) {
                                printAry.push($(this).attr("data-ary"));
                            }
                        }
                    }
                });
                if (dataAry.length > 0 && data_stop) {
                    data_stop = false;
                    var gameIndex = $("#menuText").attr("data-index");
                    var opNum = $("#NowJq").html();
                    dataAry.sort(function (a, b) {
                        var _a = a.split(":")[1], _b = b.split(":")[1];
                        return parseInt(_b) - parseInt(_a);
                    });
                    $("#orderWrap tbody tr input[type='text']").val("").attr("disabled", "disabled");
                    dataSubmit({ gameIndex: gameIndex, number: opNum, sortAry: dataAry.join(",") }, false, null, printAry);
                    return true;
                }
                return false;
            },
            cancel: function () { }
        });
    }
}
function dataSubmit(data, myurl, objthis, printAry) {
    $("#gameBox input[type='text']").removeClass("check").val("");
    var url = myurl || "DownEntry";
    var mydata = [];
    for (var i in data) {
        mydata.push(i + "=" + data[i]);
    }
    var data_action = [url, mydata.join("&")];
    G.mask();
    G.ajax(data_action.join("&"), function (json) {
        G.maskClose();
        newGameData(json, printAry);
    }, function () { G.maskClose(); });
}
function newGameData(msg, printAry) {
    if (msg.usableCredit) {
        $("#usableCreditSpan").html(msg.usableCredit);
    }
    if (msg.oddsList) {
        for (var i in msg.oddsList) {
            $("#gameBox li[data-sort='" + i + "'] span.p a.oddsEvent").html(msg.oddsList[i]);
        }
    }
    if (msg.putResult) {
        var result = [], on;
        for (var i = 0; i < msg.putResult.length; i++) {
            on = i % 2 == 0 ? "on" : "";
            result.push("<li class='" + on + "'>" + msg.putResult[i] + "</li>");
        }
        if (result.length > 0) {
            $("#putResult").html(result.join(""));
        } 
    }
    container(printAry);
}
function container(printAry) {
    var myDiv = "<div id='tip_container' class='container tip_container' style='margin-left:-55px; margin-top:55px;display:block'><div id='tip' class='success mtip'><i class='micon'></i><span id='tsc'>下註成功！</span><i id='mclose' class='mclose'></i></div></div>";
    $("#tip_container").remove();
    $("body").append(myDiv);
    setTimeout(function () {
        $("#tip_container").remove();
        if (printAry && printAry.length > 0) {
            var ary = [], key;
            for (var i = 0; i < printAry.length; i++) {
                key = printAry[i].split(":");
                ary.push(encodeURI("【" + key[5] + "】<br />【第" + key[6] + "期】<br />" + key[1] + "【" + key[2] + "】 @ <strong class=\"red\"> " + key[3] + "</strong><br />下注金额：<strong class=\"blue\">" + key[4] + "</strong>"));
            }
            myPrint(null, ary.join("êêê"));
        }
    }, 500);
    $(".rightBox div.left li").removeClass("active");//.removeAttr("style");
    $(".rightBox div.right ul").removeClass("active");
    $(".rightBox div.left li[name='putResult']").addClass("active");
    $(".rightBox div.right #putResult").addClass("active");
}
function myPrint(obj, ary) {
    var p = ary == undefined ? encodeURI($(obj).parent("p").find("label").html()) : ary;
    var content = "<iframe class='lineMain' style='width:280px;height:320px;' scrolling='auto' frameborder='0' src='/Member/Print.htm?data=" + p + "'></iframe>";
    G.alert({ title: "賬單打印", content: content, ok: function () { return true; } });
}
