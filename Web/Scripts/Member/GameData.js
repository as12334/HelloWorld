function game_box_title(msg) {
    clearInterval(__intervalTime);
    clearInterval(__kctimeout);
    var boxAry, type, activeClass, activeUrl;
    var boxList = [];
    var info = msg.info;
    var gameIndex = msg.gameIndex;
    if (gameIndex == 1) {
        boxAry = info.hk;
        activeUrl = "Game_HK.aspx";
        $(".game_pic #game_logo").attr("src", "/Images/Member/HK.png");
        $(".game_pic a").attr("href", "http://www.hkjc.com/home/chinese/index.asp");
        $("p[name='game_kc_row']").css("display", "none");
        $("p[name='game_hk_row']").css("display", "");
    } else {
        activeUrl = "Game_KC.aspx";
        $("p[name='game_kc_row']").css("display", "");
        $("p[name='game_hk_row']").css("display", "none");
        if (gameIndex == 2) {
            boxAry = info.klc;
            $(".game_pic #game_logo").attr("src", "/Images/Member/KLC.png");
            $(".game_pic a").attr("href", "http://www.gdfc.org.cn/play_list_game_9.html");
        } else if (gameIndex == 3) {
            boxAry = info.ssc;
            $(".game_pic #game_logo").attr("src", "/Images/Member/SSC.png");
            $(".game_pic a").attr("href", "http://www.cqcp.net/game/ssc/");
        } else if (gameIndex == 15) {
            boxAry = info.sscjs;
            $(".game_pic #game_logo").attr("src", "/Images/Member/SSCJS.png");
            $(".game_pic a").attr("href", "https://1680268.com/html/shishicai_jisu/ssc_index.html");
        } else if (gameIndex == 4) {
            boxAry = info.pk;
            $(".game_pic #game_logo").attr("src", "/Images/Member/PK.png");
            $(".game_pic a").attr("href", "http://www.bwlc.net/bulletin/trax.html");
        } else if (gameIndex == 14) {
            boxAry = info.pkjs;
            $(".game_pic #game_logo").attr("src", "/Images/Member/pkjs.png");
            $(".game_pic a").attr("href", "https://1680268.com/html/jisusaiche/pk10kai.html");
        } else if (gameIndex == 5) {
            boxAry = info.ks;
            $(".game_pic #game_logo").attr("src", "/Images/Member/KS.png");
            $(".game_pic a").attr("href", "http://www.jslottery.com/Lottery/LotteryInfo_Fast3?PlayType=7");
        } else if (gameIndex == 6) {
            boxAry = info.klb;
            $(".game_pic #game_logo").attr("src", "/Images/Member/KLB.png");
            $(".game_pic a").attr("href", "http://www.bwlc.net/bulletin/keno.html");
        } else if (gameIndex == 7) {
            boxAry = info.nc;
            $(".game_pic #game_logo").attr("src", "/Images/Member/NC.png");
            $(".game_pic a").attr("href", "http://www.cqcp.net/game/xync/");
        } else if (gameIndex == 10) {
            boxAry = info.gx;
            $(".game_pic #game_logo").attr("src", "/Images/Member/GX.png");
            $(".game_pic a").attr("href", "http://www.gxcaipiao.com.cn/notice/notice_12.html");
        }
    }
    for (var i = 0; i < boxAry.length; i++) {
        if (i == 0) {
            activeClass = "active";
            type = boxAry[i].dataType;
        } else {
            activeClass = '';
        }
        boxList.push("<li class='subBtn " + activeClass + "' data-type='" + boxAry[i].dataType + "'><a href='javascript:void(0)'>" + boxAry[i].dataTxt + "</a></li>");
    }
    $("#cqlResult").html("");
    $("#hot_Cool").html("");
    $("#game_box_title ul").html(boxList.join(""));
    gameBoxTitleClick({ gameIndex: gameIndex, activeUrl: activeUrl });
    loadGameData({ gameIndex: gameIndex, type: type, activeUrl: activeUrl, data: { t: info.autoTid, gameIndex: gameIndex, type: type} });
}

//賠率數據加載
//var __myrequest;
function loadGameData(msg) {
    if (!msg.stop) {
        game_loading_wrap(true);
    }
    //if (__myrequest) { __myrequest.abort(); }
    _ajax({ type: 'post', url: msg.activeUrl, data: msg.data }, function (mydata) {
        $(".rightBox div.left li").removeClass("active").removeAttr("style");
        $(".rightBox div.right ul").removeClass("active");
        $(".rightBox div.left li[name='lmResult']").addClass("active");
        $(".rightBox div.right #lmResult").addClass("active");
        oddsDataLoad(msg.gameIndex, msg.type, mydata, msg.activeUrl);
        if (!msg.stop) {
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
        } else {
            //comm.loadEnd();
        }
    }, function () {
        //if (msg.stop)
            //comm.rollBack();
    });

    if (!msg.stop) {
        //最新下注明細加載
        var user = $("#myname").html();
        _ajax({ type: 'post', url: '/Member/CursorDay.aspx', data: { UserName: user, gameIndex: msg.gameIndex} }, function (msg) {
            var putResult = [], on;
            for (var i = 0; i < msg.putResult.length; i++) {
                on = i % 2 == 0 ? "on" : "";
                putResult.push("<li class='" + on + "'>" + msg.putResult[i] + "</li>");
            }
            if (putResult.length > 0) {
                $("#putResult").html(putResult.join(""));
            } else {
                $("#putResult").html("");
            }
        });
    }
}
//Game一級導航觸發
function gameBoxTitleClick(msg) {
    $("#game_box_title li").click(function () {
        $("#game_box_title li").removeClass("active");
        $(this).addClass("active");
        var data_type = $(this).attr("data-type");
        //comm.scrollLoad({ top: "158px", height: "2px" });
        loadGameData({ stop: false, gameIndex: msg.gameIndex, type: data_type, activeUrl: msg.activeUrl, data: { t: __info.autoTid, gameIndex: msg.gameIndex, type: data_type} });
    });
}
//Game二級導航觸發
var __hkLmOdds;
function gameTitleClick(msg) {
    $("#gameTitle li").click(function () {
        $("#gameBox li span.in a.radioSim").removeClass("radioPoint");
        $("#gameTitle li").removeClass("active");
        $(this).addClass("active");
        if ($(this).attr("data-mysort")) {
            var sort, myodds;
            var data_dow = $(this).attr("data-dow");
            var mystr = $(this).find("h3").html();
            var data_mysort = parseInt($(this).attr("data-mysort"));
            var gameIndex = $("#menuText").attr("index");
            if (gameIndex == 1) {
                if (data_mysort == 154) {
                    myodds = $(this).find("h4").html();
                    if (!comm.DecimalSign(myodds))
                        myodds = "-";
                    $("#gameBox li span.p a.red").html(myodds);

                    var data_name = $("#gameBox li[data-sort='" + __info.animalsIndex + "']").attr("data-name");
                    var anumals = __animalsAry[__info.animalsIndex];
                    if (data_dow == 6)
                        anumals = anumals.replace(",49", "");
                    $("#gameBox li[data-sort='" + __info.animalsIndex + "'] span.name").html(data_name + " [" + anumals + "]");

                } else if (data_mysort == 610 || data_mysort == 622 || data_mysort == 634 || data_mysort == 1187 || data_mysort == 646 || data_mysort == 656 || data_mysort == 666) {
                    for (var i = 1; i <= 12; i++) {
                        sort = i + data_mysort - 1;
                        $("#gameBox li[index='" + i + "'] span.p a.red").html(__hkLmOdds[sort]);
                    }
                    $("#gameBox legend").html(mystr);
                } else if (data_mysort == 746 || data_mysort == 795 || data_mysort == 844 || data_mysort == 942 || data_mysort == 1040 || data_mysort == 1089) {
                    $("#gameBox legend").html(mystr);
                    $("#gameBox div[name='xpx'] legend").html("肖碰肖");
                }
            } else if (gameIndex == 2) {
                if (data_mysort == 323 || data_mysort == 324 || data_mysort == 325 || data_mysort == 326 || data_mysort == 327 || data_mysort == 328 || data_mysort == 329) {
                    myodds = $(this).find("h4").html();
                    if (!comm.DecimalSign(myodds)) {
                        $("#gameBox li span.in a.radioSim").addClass("radiodsable");
                    } else {
                        $("#gameBox li span.in a.radioSim").removeClass("radiodsable");
                    }
                    $("#gameBox legend").html(mystr);
                }
            }
        }
        var data_type = $(this).attr("data-type"); //參數判斷是否重新加載數據
        if (data_type) {
            //comm.scrollLoad({ top: "158px", height: "2px" });
            loadGameData({ stop: false, gameIndex: msg.gameIndex, type: data_type, activeUrl: msg.activeUrl, data: { t: __info.autoTid, gameIndex: msg.gameIndex, type: data_type} });
        }
    });
    //肖碰肖
    $("#gameBox div[name='xpx'] li").click(function () {
        var animals = __animalsAry[$(this).attr("index")].split(",");
        var num, myobj, maxLen = 8, count = 0;
        (function(){
            $("#gameBox li span.in a.radioPoint").each(function (i) { count++; });
        })();
        for (var i = 0; i < animals.length; i++) {
            num = animals[i] < 10 ? "0" + animals[i] : animals[i];
            myobj = $("#gameBox li[data-name='" + num + "'] span.in a.radioSim");
            if (myobj.attr("class").indexOf("radiodsable") == -1 && count < maxLen)
                myobj.addClass("radioPoint");
        }
    });
}

//加載模板
function oddsDataLoad(gameIndex, type, data, activeUrl) {
    $(".rightBox div.left li[name='knResult']").remove();
    $(".rightBox div.right #knResult").remove();
    if (gameIndex == 1) { //HK
        hkBoxTop({ data: data, gameIndex: gameIndex, type: type, activeUrl: activeUrl });
        hkGameMiddle({ data: data, gameIndex: gameIndex, type: type, activeUrl: activeUrl });
    } else {
        //快彩
        kcBoxTop({ data: data, gameIndex: gameIndex, type: type, activeUrl: activeUrl });
        kcGameMiddle({ data: data, gameIndex: gameIndex, type: type, activeUrl: activeUrl });
    }
}

var __intervalTime;
function hkBoxTop(msg) {
    clearInterval(__intervalTime);
    clearInterval(__kctimeout);
    $("#hk-intervaltime").html(msg.data.phase[0] + "-" + msg.data.phase[1]);
    $("#closedTime").html("").addClass("time_loading");
    $("#updateTime").html("...");
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
    for (var i = 0; i < numList.length; i++) {
        numList[i] = "<i class='HKNo_" + numList[i] + "'></i>";
    }
    $("#prevBall").html(numList.join(""));
    var openDateList = data.openDateList;
    $("#NowJq").html(openDateList.number || "NO");
    var closeTime = type == 1 || type == 2 ? openDateList.trayTeMaNo : openDateList.endTime;
    var lotteryTime = openDateList.lotteryTime;
    var time = closeTime == 0 && lotteryTime == 0 ? 0 : closeTime > 0 ? closeTime : lotteryTime > 0 ? lotteryTime : 0;
    var closeText = closeTime == 0 && lotteryTime == 0 || closeTime > 0 ? "封盤" : "開獎";
    $("#closeText").html(closeText);

    var _loadData = function () {
        _ajax({ type: 'post', url: activeUrl, data: { t: __info.autoTid, gameIndex: gameIndex, type: type} }, function (mydata) {
            hkBoxTop({ data: mydata, gameIndex: gameIndex, type: type, activeUrl: activeUrl });
            loadOdds(mydata.oddsList);
        });
    };

    if (!closeTime || !closeTime || (closeTime == 0 && lotteryTime == 0)) {
        $("#updateTime").html("...");
        $("#closedTime").removeClass("time_loading").html("<span>0</span><span>0</span>時<span>0</span><span>0</span>分<span>0</span><span>0</span>秒");
        return;
    } else {
        var updateTime = type == 22 || type == 23 || type == 26 || type == 29 ? 180 : 90;
        var _time = time, timeAry, settimer;
        __intervalTime = setInterval(function () {
            updateTime--;
            if (updateTime <= 0) {
                //加載
                clearInterval(__intervalTime);
                $("#updateTime").html("...");
                _loadData();
            } else {
                $("#updateTime").html(updateTime + "秒");
            }

            if (_time > 0) {
                _time--;
                settimer = comm.settimer(_time).replace(/:/g, '');
                timeAry = [];
                for (var n = 0; n < settimer.length; n++) {
                    timeAry.push(settimer.substring(n, n + 1));
                }
                $("#closedTime").removeClass("time_loading").html("<span>" + timeAry[0] + "</span><span>" + timeAry[1] + "</span>時<span>" + timeAry[2] + "</span><span>" + timeAry[3] + "</span>分<span>" + timeAry[4] + "</span><span>" + timeAry[5] + "</span>秒");
            } else {
                _loadData();
            }

        }, 1000);
    }
}
function loadOdds(oddsList) {
    var gameBox = $("#gameBox");
    var gameIndex = $("#menuText").attr("index");
    var oddsEvent, inputEvent;
    for (var i in oddsList) {
        if (gameIndex==1 && i == 154) {
            hxOddsSum({ odds: oddsList[i], duplex: 6, upodds: __info.autoOdds[0] });
        } else if (gameIndex == 1 && (parseInt(i) >= 684 && parseInt(i) <= 732 || parseInt(i) >= 610 && parseInt(i) <= 675 || parseInt(i) >= 1187 && parseInt(i) <= 1198 || parseInt(i) >= 746 && parseInt(i) <= 1137)) {
            hxOddsSum({ odds: oddsList[i], duplex: 7, upodds: __info.autoOdds[1] });
        } else if (gameIndex == 2 && parseInt(i) >= 323 && parseInt(i) <= 329) {

        } else {
            oddsEvent = gameBox.find("li[data-sort='" + i + "'] span.p a.oddsEvent");
            inputEvent = gameBox.find("li[data-sort='" + i + "'] span.in input[type='text']");
            if (comm.DecimalSign(oddsList[i])) {
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


function hkGameMiddle(msg) {
    var num, sort, str, sortIndex;
    var type = msg.type;
    var data = msg.data;
    var disabled = "";
    var data_type = [];
    var oddsList = data.oddsList;
    var htmlData = ["<div class='game_ball_wrap game_item_wrap base-clear'>"];
    if (type == 1 || type == 2) {
        knResult(); //創建快捷下註模塊
        if (type == 1) {
            str = "特碼A";
            sortIndex = 0;
            data_type[0] = "active";
            data_type[1] = "";
        } else if (type == 2) {
            str = "特碼B";
            sortIndex = 65;
            data_type[0] = "";
            data_type[1] = "active";
        }

        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='" + data_type[0] + "' data-type='1'><h3>特碼A</h3></li>");
        htmlData.push("<li class='" + data_type[1] + "' data-type='2'><h3>特碼B</h3></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>" + str + "</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 10; n++) {
            for (var i = n; i <= 49; i = i + 10) {
                num = i < 10 ? "0" + i : i;
                sort = i + sortIndex;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
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
        htmlData.push("<legend>特碼</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 4; n++) {
            for (var i = n; i <= 16; i = i + 4) {
                sort = i + 49;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 4) {
        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='active' data-type='4'><h3>色波</h3></li>");
        htmlData.push("<li class='' data-type='5'><h3>特肖、頭尾數、五行</h3></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>色波</legend>");
        htmlData.push("<ul>");
        for (var i = 115; i <= 133; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>半波</legend>");
        htmlData.push("<ul>");
        for (var i = 116; i <= 134; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        for (var i = 117; i <= 135; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        for (var i = 118; i <= 136; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        for (var i = 119; i <= 137; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box gameBox col_3 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>半半波</legend>");
        htmlData.push("<ul>");
        for (var i = 120; i <= 138; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        for (var i = 121; i <= 139; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        for (var i = 122; i <= 140; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        for (var i = 123; i <= 141; i = i + 9) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 5) {
        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='' data-type='4'><h3>色波</h3></li>");
        htmlData.push("<li class='active' data-type='5'><h3>特肖、頭尾數、五行</h3></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_22 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>特肖</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 6; n++) {
            for (var i = n; i <= 12; i = i + 6) {
                sort = i + 141;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + " [" + __animalsAry[i] + "]</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>頭數</legend>");
        htmlData.push("<ul>");
        for (var i = 155; i <= 159; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>尾數</legend>");
        htmlData.push("<ul>");
        for (var i = 160; i <= 169; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>五行</legend>");
        htmlData.push("<ul>");
        for (var i = 741; i <= 745; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 6) {
        var radiodsable = "";
        var hxOdds = ["-", "-", "-", "-", "-"];
        var odds = oddsList[154];
        var myodds;
        var upodds = __info.autoOdds[0];
        if (comm.DecimalSign(odds)) {
            for (var i = 0; i <= 4; i++) {
                if (i > 0)
                    odds = odds * upodds;
                hxOdds[i] = comm.forDight(odds, 2);
            }
        } else {
            radiodsable = "radiodsable";
        }
        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='' data-mysort='154' data-dow='2' data-min='2' data-max='2'><h3>2肖</h3><h4>" + hxOdds[0] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='154' data-dow='3' data-min='3' data-max='3'><h3>3肖</h3><h4>" + hxOdds[1] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='154' data-dow='4' data-min='4' data-max='4'><h3>4肖</h3><h4>" + hxOdds[2] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='154' data-dow='5' data-min='5' data-max='5'><h3>5肖</h3><h4>" + hxOdds[3] + "</h4></li>");
        htmlData.push("<li class='active' data-mysort='154' data-dow='6' data-min='6' data-max='6'><h3>6肖</h3><h4>" + hxOdds[4] + "</h4></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_22 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>合肖</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 6; n++) {
            for (var i = n; i <= 12; i = i + 6) {
                sort = i + 141;
                myodds = comm.DecimalSign(hxOdds[4]) ? hxOdds[4] : "-";
                htmlData.push("<li data-sort='" + i + "' data-title='合肖' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + " [" + __animalsAry[i].replace(",49", "") + "]</span>");
                htmlData.push("<span class='p'><a class='red'>" + myodds + "</a></span>");
                htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type >= 10 && type <= 15) {
        knResult(); //創建快捷下註模塊
        if (type == 10) {
            str = "正一";
            sortIndex = 222;
            data_type[0] = "active";
        } else if (type == 11) {
            str = "正二";
            sortIndex = 280;
            data_type[1] = "active";
        } else if (type == 12) {
            str = "正三";
            sortIndex = 338;
            data_type[2] = "active";
        } else if (type == 13) {
            str = "正四";
            sortIndex = 396;
            data_type[3] = "active";
        } else if (type == 14) {
            str = "正五";
            sortIndex = 454;
            data_type[4] = "active";
        } else if (type == 15) {
            str = "正六";
            sortIndex = 512;
            data_type[5] = "active";
        }

        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='" + data_type[0] + "' data-type='10'><h3>正1特</h3></li>");
        htmlData.push("<li class='" + data_type[1] + "' data-type='11'><h3>正2特</h3></li>");
        htmlData.push("<li class='" + data_type[2] + "' data-type='12'><h3>正3特</h3></li>");
        htmlData.push("<li class='" + data_type[3] + "' data-type='13'><h3>正4特</h3></li>");
        htmlData.push("<li class='" + data_type[4] + "' data-type='14'><h3>正5特</h3></li>");
        htmlData.push("<li class='" + data_type[5] + "' data-type='15'><h3>正6特</h3></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>" + str + "特</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 10; n++) {
            for (var i = n; i <= 49; i = i + 10) {
                num = i < 10 ? "0" + i : i;
                sort = i + sortIndex;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
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
        htmlData.push("<legend>" + str + "</legend>");
        htmlData.push("<ul>");
        sort = 56 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 50 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 52 + sortIndex;
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 54 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 57 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 51 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 53 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 55 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        sort = 58 + sortIndex;
        disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
        htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
        htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
        htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
        htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
        htmlData.push("</li>");
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 16) {
        var s, e;
        for (var i = 1; i <= 6; i++) {
            if (i == 1) {
                s = 272;
                e = 280;
                str = "一";
            } else if (i == 2) {
                s = 330;
                e = 338;
                str = "二";
            } else if (i == 3) {
                s = 388;
                e = 396;
                str = "三";
            } else if (i == 4) {
                s = 446;
                e = 454;
                str = "四";
            } else if (i == 5) {
                s = 504;
                e = 512;
                str = "五";
            } else if (i == 6) {
                s = 562;
                e = 570;
                str = "六";
            }
            htmlData.push("<div class='game_box gameBox col_33 base-clear'>");
            htmlData.push("<div class='game_con'>");
            htmlData.push("<fieldset>");
            htmlData.push("<legend>正" + str + "</legend>");
            htmlData.push("<ul>");
            for (var n = s; n <= e; n++) {
                sort = n;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
            htmlData.push("</ul>");
            htmlData.push("</fieldset>");
            htmlData.push("</div>");
            htmlData.push("</div>");
        }
    } else if (type == 9 || type == 89) {
        knResult(); //創建快捷下註模塊
        if (type == 9) {
            str = "正碼A";
            sortIndex = 169;
            data_type[0] = "active";
            data_type[1] = "";
        } else if (type == 89) {
            str = "正碼B";
            sortIndex = 1137;
            data_type[0] = "";
            data_type[1] = "active";
        }

        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='" + data_type[0] + "' data-type='9'><h3>正碼A</h3></li>");
        htmlData.push("<li class='" + data_type[1] + "' data-type='89'><h3>正碼B</h3></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>" + str + "</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 10; n++) {
            for (var i = n; i <= 49; i = i + 10) {
                num = i < 10 ? "0" + i : i;
                sort = i + sortIndex;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
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
        htmlData.push("<legend>總和</legend>");
        htmlData.push("<ul>");
        for (var i = 219; i <= 222; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 17) {
        htmlData.push("<div class='game_box gameBox col_22 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>平特一肖</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 6; n++) {
            for (var i = n; i <= 12; i = i + 6) {
                sort = i + 570;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + " [" + __animalsAry[i] + "]</span>");
                htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>平特尾數</legend>");
        htmlData.push("<ul>");
        for (var i = 583; i <= 592; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 19) {
        htmlData.push("<div class='game_box gameBox col_22 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>正肖</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 6; n++) {
            for (var i = n; i <= 12; i = i + 6) {
                sort = i + 592;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + " [" + __animalsAry[i] + "]</span>");
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
        htmlData.push("<legend>總肖</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 2; n++) {
            for (var i = n; i <= 8; i = i + 2) { //740
                sort = i + 732;
                disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
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
        htmlData.push("<legend>七色波</legend>");
        htmlData.push("<ul>");
        for (var i = 605; i <= 608; i++) {
            sort = i;
            disabled = comm.DecimalSign(oddsList[sort]) ? "" : "disabled='disabled'";
            htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + _num2(sort) + "'>");
            htmlData.push("<span class='name'>" + _num2(sort) + "</span>");
            htmlData.push("<span class='p'><a class='oddsEvent' title='點擊下注' href='javascript:;'>" + oddsList[sort] + "</a></span>");
            htmlData.push("<span class='in'><input class='input onlyNum orderInput' type='text' " + disabled + " maxlength='7'></span>");
            htmlData.push("</li>");
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 22) {
        __hkLmOdds = oddsList;
        var radiodsable = "";
        var hxOdds = ["-", "-", "-", "-", "-", "-"];
        var odds = oddsList[684] > oddsList[686] ? oddsList[684] : oddsList[686];
        var upodds = __info.autoOdds[1];
        var myodds;
        if (comm.DecimalSign(odds)) {
            for (var i = 0; i <= 5; i++) {
                if (i > 0)
                    odds = odds * upodds;
                hxOdds[i] = comm.forDight(odds, 2);
            }
        } else {
            radiodsable = "radiodsable";
        }
        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='active' data-mysort='684' data-dow='7' data-min='5' data-max='8'><h3>5不中</h3><h4>" + hxOdds[5] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='684' data-dow='6' data-min='6' data-max='10'><h3>6不中</h3><h4>" + hxOdds[4] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='684' data-dow='5' data-min='7' data-max='10'><h3>7不中</h3><h4>" + hxOdds[3] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='684' data-dow='4' data-min='8' data-max='10'><h3>8不中</h3><h4>" + hxOdds[2] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='684' data-dow='3' data-min='9' data-max='10'><h3>9不中</h3><h4>" + hxOdds[1] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='684' data-dow='2' data-min='10' data-max='10'><h3>10不中</h3><h4>" + hxOdds[0] + "</h4></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>自選不中</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 10; n++) {
            for (var i = n; i <= 49; i = i + 10) {
                num = i < 10 ? "0" + i : i;
                sort = i + 683;
                htmlData.push("<li data-sort='" + sort + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 23) {
        __hkLmOdds = oddsList;
        var radiodsable = "";
        var hxOdds = ["-", "-", "-", "-"];
        if (comm.DecimalSign(oddsList[610]) || comm.DecimalSign(oddsList[622]) || comm.DecimalSign(oddsList[634]) || comm.DecimalSign(oddsList[1187])) {
            hxOdds[0] = oddsList[610] > oddsList[611] ? oddsList[610] : oddsList[611];
            hxOdds[1] = oddsList[622] > oddsList[623] ? oddsList[622] : oddsList[623];
            hxOdds[2] = oddsList[634] > oddsList[635] ? oddsList[634] : oddsList[635];
            hxOdds[3] = oddsList[1187] > oddsList[1188] ? oddsList[1187] : oddsList[1188];
        } else {
            radiodsable = "radiodsable";
        }

        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='active' data-mysort='610' data-dow='2' data-min='2' data-max='10'><h3>2連肖</h3><h4>" + hxOdds[0] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='622' data-dow='3' data-min='3' data-max='10'><h3>3連肖</h3><h4>" + hxOdds[1] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='634' data-dow='4' data-min='4' data-max='10'><h3>4連肖</h3><h4>" + hxOdds[2] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='1187' data-dow='5' data-min='5' data-max='10'><h3>5連肖</h3><h4>" + hxOdds[3] + "</h4></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_22 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>2連肖</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 6; n++) {
            for (var i = n; i <= 12; i = i + 6) {
                sort = i + 609;
                htmlData.push("<li index='" + i + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + " [" + __animalsAry[i] + "]</span>");
                htmlData.push("<span class='p'><a class='red'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 26) {
        __hkLmOdds = oddsList;
        var radiodsable = "";
        var hxOdds = ["-", "-", "-"];
        if (comm.DecimalSign(oddsList[646]) || comm.DecimalSign(oddsList[656]) || comm.DecimalSign(oddsList[666])) {
            hxOdds[0] = oddsList[646] < oddsList[647] ? oddsList[646] : oddsList[647];
            hxOdds[1] = oddsList[656] < oddsList[657] ? oddsList[656] : oddsList[657];
            hxOdds[2] = oddsList[666] < oddsList[667] ? oddsList[666] : oddsList[667];
        } else {
            radiodsable = "radiodsable";
        }
        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='active' data-mysort='646' data-dow='2' data-min='2' data-max='8'><h3>2連尾</h3><h4>" + hxOdds[0] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='656' data-dow='3' data-min='3' data-max='8'><h3>3連尾</h3><h4>" + hxOdds[1] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='666' data-dow='4' data-min='4' data-max='8'><h3>4連尾</h3><h4>" + hxOdds[2] + "</h4></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_22 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>2連尾</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 5; n++) {
            for (var i = n; i <= 10; i = i + 5) {
                sort = i + 645;
                htmlData.push("<li index='" + i + "' data-name='" + _num2(sort) + "'>");
                htmlData.push("<span class='name'>" + _num2(sort) + "尾 [" + __animalsAry[i + 53] + "]</span>");
                htmlData.push("<span class='p'><a class='red'>" + oddsList[sort] + "</a></span>");
                htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");
    } else if (type == 29) {
        __hkLmOdds = oddsList;
        var radiodsable = "";
        var hxOdds = ["-", "-", "-", "-", "-", "-"];
        if (comm.DecimalSign(oddsList[746]) || comm.DecimalSign(oddsList[795]) || comm.DecimalSign(oddsList[844]) || comm.DecimalSign(oddsList[942]) || comm.DecimalSign(oddsList[942]) || comm.DecimalSign(oddsList[1089])) {
            hxOdds[0] = oddsList[746];
            hxOdds[1] = oddsList[795];
            if (comm.DecimalSign(oddsList[844]))
                hxOdds[2] = oddsList[844] + "/" + oddsList[893];
            else
                hxOdds[2] = oddsList[844];

            if (comm.DecimalSign(oddsList[942]))
                hxOdds[3] = oddsList[942] + "/" + oddsList[991];
            else
                hxOdds[2] = oddsList[942];

            hxOdds[4] = oddsList[1040];
            hxOdds[5] = oddsList[1089];
        } else {
            radiodsable = "radiodsable";
        }
        htmlData.push("<div class='game_lm_title kc_lm_title'>");
        htmlData.push("<ul id='gameTitle' class='base-clear'>");
        htmlData.push("<li class='active' data-mysort='746' data-min='2' data-max='10'><h3>二全中</h3><h4>" + hxOdds[0] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='795' data-min='3' data-max='10'><h3>三全中</h3><h4>" + hxOdds[1] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='844' data-min='3' data-max='10'><h3>三中二</h3><h4>" + hxOdds[2] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='942' data-min='2' data-max='10'><h3>二中特</h3><h4>" + hxOdds[3] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='1040' data-min='2' data-max='10'><h3>特串</h3><h4>" + hxOdds[4] + "</h4></li>");
        htmlData.push("<li class='' data-mysort='1089' data-min='4' data-max='10'><h3>四全中</h3><h4>" + hxOdds[5] + "</h4></li>");
        htmlData.push("</ul>");
        htmlData.push("</div>"); //game_lm_title end

        htmlData.push("<div class='game_box gameBox col_5 base-clear'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>二全中</legend>");
        htmlData.push("<ul>");
        for (var n = 1; n <= 10; n++) {
            for (var i = n; i <= 49; i = i + 10) {
                num = i < 10 ? "0" + i : i;
                sort = i + 745;
                htmlData.push("<li data-sort='" + i + "' data-title='" + _num1(sort) + "' data-name='" + num + "'>");
                htmlData.push("<span class='name'><i class='HKNo_" + i + "'></i></span>");
                htmlData.push("<span class='in'><a href='javascript:;' class='radioSim " + radiodsable + "'></a></span>");
                htmlData.push("</li>");
            }
        }
        htmlData.push("</ul>");
        htmlData.push("</fieldset>");
        htmlData.push("</div>");
        htmlData.push("</div>");

        htmlData.push("<div class='game_box gameBox col_12 base-clear' name='xpx'>");
        htmlData.push("<div class='game_con'>");
        htmlData.push("<fieldset>");
        htmlData.push("<legend>肖碰肖</legend>");
        htmlData.push("<ul>");
        for (var i = 1; i <= 12; i++) {
            htmlData.push("<li index='" + i + "'>");
            htmlData.push("<span class='name'>" + _num2((i+609)) + "</span>");
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
    //loadOdds(oddsList);
    bindGameFun(); //註冊相關函數，單筆下注，多筆下注，重置，提交下注
    gameTitleClick(msg);
}

function bindGameFun() {
    var obj = $("#gameBox");
    obj.find("input[type='text']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
    obj.find("input[type='text']").focus(function () {
        $(this).val($("#tool_ys_input").val());
    });
    obj.find("li span.p a.oddsEvent").click(function () {
        var n1 = $(this).parents("li").attr("data-title");
        var n2 = $(this).parents("li").attr("data-name");
        var sort = $(this).parents("li").attr("data-sort");
        var odds = $(this).html();
        myWarp({ odds: odds, n1: n1, n2: n2, sort: sort, obj: $(this) });
    });
    //勾選項
    obj.find("li span.in a").click(function () {
        var myclass = $(this).attr("class");
        var mymax = parseInt($("#gameTitle li.active").attr("data-max"));
        var _radioPoint = function (myobj) {
            var count = 0;
            $("#gameBox li a.radioPoint").each(function () {
                count++;
            });
            if (count > mymax) {
                myobj.removeClass("radioPoint");
            }
        };
        if (myclass.indexOf("radiodsable") == -1) {
            if (myclass.indexOf("radioPoint") == -1) {
                $(this).addClass("radioPoint");
                _radioPoint($(this));
            } else {
                $(this).removeClass("radioPoint");
            }
        }
    });

    $("#clearBtn").unbind();
    $("#clearBtn").click(function () {
        obj.find("input[type='text']").val("");
        $("#gameBox li span.in a.radioSim").removeClass("radioPoint");
    });
    var data_type = $("#game_box_title li.active").attr("data-type");
    var gameIndex = $("#menuText").attr("index");
    $("#gameSubmit").unbind();
    $("#gameSubmit").click(function () {
        if (gameIndex == 1 && (data_type == 6 || data_type == 22 || data_type == 23 || data_type == 26 || data_type == 29)) {
            gameHxSubmit();
        } else if ((gameIndex == 2 || gameIndex == 7) && data_type == 12) {
            gameHxSubmit();
        } else {
            gameSubmit();
        }
    });
    $("#gameBox input[type='text']").keydown(function (e) {
        if (e.which == 13) {
            gameSubmit();
            return false;
        }
    });
}

function myWarp(msg) {
    var maxPayout = parseInt(__info.maxPayout);
    var odds = parseFloat(msg.odds);
    var sort = msg.sort;
    var title = msg.n1 + "【" + msg.n2 + "】";
    var warp = "<div class='myLayerBox' id='myWarp' data-sort='" + sort + "'>";
    warp += "<p>賠率：<em name='odds_pl'>" + odds + "</em>下註金額：<input name='uPI_M' class='input onlyNum' type='text' maxlength='7'></p>";
    warp += "<p>可赢金额：<em name='valueOdds' class='blue'>0</em></p>";
    warp += "<p>最高派彩：<i>" + maxPayout + "</i></p>";
    warp += "</div>";
    if (comm.DecimalSign(odds)) {
        var content = warp, _submit, mythis;
        comm.alert({ content: warp, title: title, myLayerOn: true, myLayerFooter: true, obj: msg.obj,
            initialize: function () {
                mythis = this;
                $("#myWarp input[name='uPI_M']").focus();
                $("#myWarp input[name='uPI_M']").keyup(function () {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                    var m = parseInt($(this).val());
                    m = m * odds - m;
                    m = m > maxPayout ? maxPayout : m;
                    if (comm.DecimalSign(m)) {
                        $("#myWarp em[name='valueOdds']").html(comm.ForDight(m, 1));
                    }
                });
                _submit = function () {
                    var objM = $("#myWarp input[name='uPI_M']:enabled");
                    if (objM.val() == "") {
                        myTips({ content: "下註金額不能為空!", obj: objM });
                        objM.focus();
                        return false;
                    } else if (!comm.NumberSign(objM.val()) || parseInt(objM.val()) < 1) {
                        myTips({ content: "下注金額不能小於單注最小下注額度：1", obj: objM });
                        objM.focus();
                        return false;
                    } else {
                        var gameIndex = $("#menuText").attr("index");
                        var opNum = $("#NowJq").html();
                        var type = 1;
                        var data = [type + ":" + sort + ":" + objM.val()];
                        objM.val("").attr("disabled", "disabled");
                        dataSubmit({ gameIndex: gameIndex, number: opNum, sortAry: data.join(",") }, false);
                        return true;
                    }
                };
                $("#myWarp input[name='uPI_M']").keydown(function (e) {
                    if (e.which == 13) {
                        _submit();
                        return false;
                    }
                });
            },
            ok: function () {
                _submit(); 
            }
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
        if ($(this).attr("data-sort") && comm.NumberSign($(this).find("span.in input[type='text']").val()) && comm.DecimalSign($(this).find("span.p a.oddsEvent").html())) {
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
        var orderWrap = "<div class='tpl_order' id='orderWrap'>";
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
        orderWrap += "</div>";
        //var content = comm.overflowDiv({ content: orderWrap, width: 450, height: 220 });
        var mythis, _submit;
        comm.alert({ content: orderWrap, title: "確認下單", myLayerOn: false, cancel: true, myLayerFooter: true,width:450,height:220,
            initialize: function () {
                $("#orderWrap input[type='text']").eq(0).focus();
                var _myeach = function (stop) {
                    var mycount = [0, 0];
                    $("#orderWrap input[type='text']").each(function () {
                        if (comm.DecimalSign($(this).val())) {
                            mycount[0]++;
                            mycount[1] += parseInt($(this).val());
                        }
                    });
                    if (mycount[0] == 0 && stop) {
                        comm.myWarprClose();
                    } else {
                        $("#zj").html(mycount[0]);
                        $("#zjm").html(mycount[1]);
                    }
                };

                _submit = function () {
                    var dataAry = [];
                    var printAry = [];
                    var objM;
                    $("#orderWrap tbody tr").each(function () {
                        if ($(this).attr("data-sort")) {
                            objM = $(this).find("input[type='text']:enabled");
                            if (objM.val() == "") {
                                dataAry = [];
                                myTips({ content: "下註金額不能為空!", obj: objM });
                                objM.focus();
                                return false;
                            } else if (!comm.NumberSign(objM.val()) || parseInt(objM.val()) < 1) {
                                dataAry = [];
                                myTips({ content: "下注金額不能小於單注最小下注額度：1", obj: objM });
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
                    if (dataAry.length > 0) {
                        var gameIndex = $("#menuText").attr("index");
                        var opNum = $("#NowJq").html();
                        dataAry.sort(function (a, b) {
                            var _a = a.split(":")[1], _b = b.split(":")[1];
                            return parseInt(_b) - parseInt(_a);
                        });
                        $("#orderWrap tbody tr input[type='text']").val("").attr("disabled", "disabled");
                        dataSubmit({ gameIndex: gameIndex, number: opNum, sortAry: dataAry.join(",") }, false, mythis, printAry);
                    } else {
                        return false;
                    }
                };

                $("#orderWrap thead th.cursor").click(function () {
                    if (!$(this).attr("print")) {
                        $("#orderWrap tbody tr input[name='print']").attr("checked", "checked");
                        $(this).attr("print", "1");
                    } else {
                        $("#orderWrap tbody tr input[name='print']").attr("checked", "");
                        $(this).removeAttr("print");
                    }
                });

                $("#orderWrap input[type='text']").keyup(function () {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                    _myeach(false);
                });
                $("#orderWrap a.deleteOrder").click(function () {
                    $(this).parents("tr[data-sort='" + $(this).attr("mysort") + "']").remove();
                    _myeach(true);
                });
                $("#orderWrap input[type='text']").keydown(function (e) {
                    if (e.which == 13) {
                        if (_submit()) {
                            //mythis.close();
                        }
                        return false;
                    }
                });
            },
            ok: function () {
                 _submit();
            }
        });
    }
}
function gameHxSubmit() {
    var data_type = $("#game_box_title li.active").attr("data-type");
    var data_min = parseInt($("#gameTitle li.active").attr("data-min"));
    var data_max = parseInt($("#gameTitle li.active").attr("data-max"));
    var sort = $("#gameTitle li.active").attr("data-mysort");
    var dataAry = [], dataName = [];
    var cycle;
    if (data_type == 6) {
        cycle = data_max;
        var a, b, index;
        var odds = $("#gameTitle li.active h4").html();
        $("#gameBox li span.in a.radioPoint").each(function () {
            dataName.push($(this).parents("li").attr("data-name"));
            index = parseInt($(this).parents("li").attr("data-sort"));
            index % 2 == 0 ? a = true : b = true;
        });

        if ((!a || !b) && dataName.length == 6) {
            comm.alert({ content: "6肖勾選排列不允許 “全單” 或 “全雙” 組合！", cancel: true });
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
    } else if (data_type == 22 || data_type == 23 || data_type == 26 || data_type == 29 || data_type == 12) {
        cycle = data_min;
        var odds = $("#gameTitle li.active h4").html();
        $("#gameBox li span.in a.radioPoint").each(function () {
            dataName.push($(this).parents("li").attr("data-name"));
        });

        dataName.sort(function (a, b) {
            var _a = a, _b = b;
            return parseInt(_a) - parseInt(_b);
        });

        if (dataName.length == data_min && data_type == 23) {
            var minodds;
            for (var i = 0; i < dataName.length; i++) {
                minodds = parseFloat($("#gameBox li[data-name='" + dataName[i] + "'] span.p a.red").html());
                if (minodds < odds) {
                    odds = minodds;
                }
            }
        }

        if (dataName.length == data_min && data_type == 26) {
            var maxodds;
            for (var i = 0; i < dataName.length; i++) {
                maxodds = parseFloat($("#gameBox li[data-name='" + dataName[i] + "'] span.p a.red").html());
                if (maxodds > odds) {
                    odds = maxodds;
                }
            }
        }

        if (dataName.length >= data_min && dataName.length <= data_max) {
            var n1 = $("#gameBox legend").html();
            var money = $("#tool_ys_input").val();
            dataAry.push(sort);
            dataAry.push(n1);
            dataAry.push(dataName);
            dataAry.push(odds);
        } else {
            comm.alert({ content: "組合最高可選 " + data_min + "~" + data_max + " 個號碼", cancel: true });
            return false;
        }
    }
    if (dataAry && dataAry.length > 0) {
        var mythis;
        var DuplexObj = comm.DuplexSum(cycle, dataAry[2]);
        var orderWrap = "<div class='lmSubmitWrap' id='lmSubmitWrap'>";
        orderWrap += "<div class='lsw_top'><p>下注號碼明細</p><p class='myNos'>" + dataAry[2].join("、") + "</p></div>";
        orderWrap += "<div id='wtWrapLm'></div>";
        orderWrap += "<div>您共選擇了<span>" + dataAry[2].length + "</span>個號碼 “復式” 共分為<span>" + DuplexObj.count + "</span>組</div>";
        orderWrap += "<div><em>" + dataAry[1] + " @</em><strong id='lmPl'>" + dataAry[3] + "</strong> 單註金額：<input id='odds_lm_pl' class='input onlyNum' type='text' maxlength='7'></div>";
        orderWrap += "<div>總金額：<span id='sumCount'>0</span></div>";
        orderWrap += "</div>";
        comm.alert({ content: orderWrap, title: "確認下單", myLayerOn: false, cancel: true, myLayerFooter: true,
            initialize: function () {
                //mythis = this;
                $("#lmSubmitWrap #odds_lm_pl").focus();
                $("#lmSubmitWrap #odds_lm_pl").keyup(function () {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                    var sumCount = parseInt($(this).val()) * parseInt(DuplexObj.count) || 0;
                    $("#sumCount").html(sumCount);
                });
            },
            ok: function () {
                var objM = $("#lmSubmitWrap #odds_lm_pl:enabled");
                if (objM.val() == "") {
                    myTips({ content: "下註金額不能為空!", obj: objM });
                    objM.focus();
                    return false;
                } else if (!comm.NumberSign(objM.val()) || parseInt(objM.val()) < 1) {
                    myTips({ content: "下注金額不能小於單注最小下注額度：1", obj: objM });
                    objM.focus();
                    return false;
                } else {
                    var gameIndex = $("#menuText").attr("index");
                    var opNum = $("#NowJq").html();
                    var mydata = [];
                    var myCursor = encodeURIComponent(dataAry[2].join("、"));
                    for (var i = 0; i < DuplexObj.list.length; i++) {
                        mydata.push("1:" + DuplexObj.list[i] + ":" + objM.val());
                    }
                    $("#gameBox li span.in a.radioSim").removeClass("radioPoint");
                    objM.val("").attr("disabled", "disabled");
                    dataSubmit({ sort: dataAry[0], gameIndex: gameIndex, number: opNum, myCursor: myCursor, sortAry: mydata.join("|") }, "DownEntryLm", mythis);
                }
            }
        });
    }
}
function dataSubmit(data, myurl, objthis, printAry) {
    $("#gameBox input[type='text']").val("");
    var url = myurl || "DownEntry";
    comm.myWarprClose();
    var content = "<div class='game_loading_wrap'><p>正在寫入註單<span>请稍后</span></p><p class='game_loding' style='width:180px;'></p></div>";
    comm.alert({ content: content, cancel: false });
    _ajax({ type: 'post', url: "/Member/" + url + ".aspx?t=" + __info.autoTid, data: data }, function (msg) {
        if (msg.error) {
            comm.alert({ content: msg.error });
        } else {
            comm.myWarprClose();
            newGameData(msg, printAry);
        }
    }, function () { comm.myWarprClose(); });
}
function newGameData(msg, printAry) {
    $("#usableCreditSpan").html(msg.usableCredit);
    if (msg.oddsList) {
        for (var i in msg.oddsList) {
            $("#gameBox li[data-sort='" + i + "'] span.p a.oddsEvent").html(msg.oddsList[i]);
        } 
    }
    var result = [], on;
    for (var i = 0; i < msg.putResult.length; i++) {
        on = i % 2 == 0 ? "on" : "";
        result.push("<li class='" + on + "'>" + msg.putResult[i] + "</li>");
    }
    if (result.length > 0)
        $("#putResult").html(result.join(""));
    container(printAry);
}

function game_loading_wrap(stop) {
    if (stop) {
        $(".game_loading_wrap").css("display", "block");
        $("#gameBox").css("display", "none");
    } else {
        $(".game_loading_wrap").css("display", "none");
        $("#gameBox").css("display", "block");
    }
}

function myTips(msg) {
    try {
        var content = msg.content;
        var elmOffset = msg.obj.offset();
        var _top = msg.top || 3;
        var _left = msg.left || 10;
        var top = msg.top || elmOffset.top - _top; //控件top坐標
        var left = msg.left || elmOffset.left + msg.obj.width() + _left; //控件left坐標
        var myDiv = "<div id='myxTips' style='left:" + left + "px; top:" + top + "px;'><div id='myxTipsLeft'></div><div id='myxTipsContent'>" + content + "</div></div>";
        $("#myxTips").remove();
        $("body").append(myDiv);
        setTimeout(function () { $("#myxTips").remove(); }, 1000);
    } catch (e) {}
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
    $(".rightBox div.left li").removeClass("active").removeAttr("style");
    $(".rightBox div.right ul").removeClass("active");
    $(".rightBox div.left li[name='putResult']").addClass("active");
    $(".rightBox div.right #putResult").addClass("active");
}
function knResult() {
    $(".rightBox div.left").append("<li name='knResult' class='tab_btn'>快<br />捷<br />下<br />註</li>");
    var myknResult = "<ul id='knResult' class='tab_item base-clear'>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='1'>鼠</td><td index='2'>牛</td><td index='3'>虎</td><td index='4'>兔</td><td index='5'>龍</td><td index='6'>蛇</td></tr>";
    myknResult += "<tr><td index='7'>馬</td><td index='8'>羊</td><td index='9'>猴</td><td index='10'>雞</td><td index='11'>狗</td><td index='12'>猪</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='49'>0頭</td><td index='50'>1頭</td><td index='51'>2頭</td><td index='52'>3頭</td><td index='53'>4頭</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='54'>0尾</td><td index='55'>1尾</td><td index='56'>2尾</td><td index='57'>3尾</td><td index='58'>4尾</td></tr>";
    myknResult += "<tr><td index='59'>5尾</td><td index='60'>6尾</td><td index='61'>7尾</td><td index='62'>8尾</td><td index='63'>9尾</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='13' class='red'>紅波</td><td index='22' class='blue'>藍波</td><td index='31' class='green'>綠波</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='14' class='red'>紅單</td><td index='15' class='red'>紅雙</td><td index='16' class='red'>紅大</td><td index='17' class='red'>紅小</td></tr>";
    myknResult += "<tr><td index='23' class='blue'>藍單</td><td index='24' class='blue'>藍雙</td><td index='25' class='blue'>藍大</td><td index='26' class='blue'>藍小</td></tr>";
    myknResult += "<tr><td index='32' class='green'>綠單</td><td index='33' class='green'>綠雙</td><td index='34' class='green'>綠大</td><td index='35' class='green'>綠小</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "<li>";
    myknResult += "<table><tbody>";
    myknResult += "<tr><td index='18' class='red'>紅大單</td><td index='19' class='red'>紅大雙</td><td index='20' class='red'>紅小單</td><td index='21' class='red'>紅小雙</td></tr>";
    myknResult += "<tr><td index='27' class='blue'>藍大單</td><td index='28' class='blue'>藍大雙</td><td index='29' class='blue'>藍小單</td><td index='30' class='blue'>藍小雙</td></tr>";
    myknResult += "<tr><td index='36' class='green'>綠大單</td><td index='37' class='green'>綠大雙</td><td index='38' class='green'>綠小單</td><td index='39' class='green'>綠小雙</td></tr>";
    myknResult += "</tbody></table>";
    myknResult += "</li>";
    myknResult += "</ul>";
    $(".rightBox div.right").append(myknResult);

    $(".rightBox div.left li").removeClass("active");
    $(".rightBox div.right ul").removeClass("active");
    $(".rightBox div.left li[name='knResult']").addClass("active");
    $(".rightBox div.right #knResult").addClass("active");

    $(".rightBox div.left li").unbind();
    $(".rightBox div.left li").click(function () {
        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(this).addClass("active");
        var name = $(this).attr("name");
        $("#" + name).addClass("active");
    });
    $("#knResult tbody td").click(function () {
        var ys = $("#tool_ys_input").val();
        var index = $(this).attr("index");
        var ary = __animalsAry[index].split(",");
        var s, odds;
        for (var i = 0; i < ary.length; i++) {
            s = parseInt(ary[i]) < 10 ? "0" + ary[i] : ary[i];
            odds = $("#gameBox .game_con li[data-name='" + s + "']").find("span.p a.oddsEvent").html();
            if (comm.DecimalSign(odds) && comm.NumberSign(ys)) {
                $("#gameBox .game_con li[data-name='" + s + "']").find("span.in input[type='text']").val(ys);
            }
        }
    });
}
//合肖赔率计算
function hxOddsSum(msg) {
    var odds = msg.odds;
    var duplex = msg.duplex;
    var upodds = msg.upodds;
    if (comm.DecimalSign(odds)) {
    } else {
        $("#gameBox li span.in a.radioSim").removeClass("radioPoint").addClass("radiodsable");
    }
}