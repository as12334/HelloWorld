$(function () {
    jQuery.mobile.ajaxEnabled = false;
    $("#lottery_type").click(function () {
        if ($("#lottery_box").hasClass('active')) {
            setParentCss(false);
            $("#lottery_box").removeClass('active');
        } else {
            setParentCss(true);
            $("#lottery_box").addClass('active');
        }
        $("#player_box").removeClass('active');
        $("#sltDate_box").removeClass('active');
    });
    $("#player_type").click(function () {
        if ($("#player_box").hasClass('active')) {
            setParentCss(false);
            $("#player_box").removeClass('active');
        } else {
            setParentCss(true);
            $("#player_box").addClass('active');
        }
        $("#lottery_box").removeClass('active');
        $("#sltDate_box").removeClass('active');
    });
    $("#sltDate").click(function () {
        if ($("#sltDate_box").hasClass('active')) {
            setParentCss(false);
            $("#sltDate_box").removeClass('active');
        } else {
            setParentCss(true);
            $("#sltDate_box").addClass('active');
        }
        $("#lottery_box").removeClass('active');
        $("#player_box").removeClass('active');
    });
    function setParentCss(isShow) {
        if (isShow) {
            $(".ui-header").removeClass('ui-panel-fixed-toolbar');
        } else {
            $(".ui-header").addClass('ui-panel-fixed-toolbar');
        }
    }
    $("#lottery_box a").click(function () {
        changeValue($(this));
    });
    $("#player_box a").click(function () {
        changeValue($(this));
    });
    $("#sltDate_box a").click(function () {
        changeValue($(this));
    });
});
var __intervalKCTime, __intervalOpenNumTime, ___data;
function loadData(gameIndex, type, t, stop) {
    $.ajax({
        type: 'post',
        url: '/TotalData/Action.ashx',
        data: { __: "membergamedata", t: t, type: type, gameIndex: gameIndex, mobi: "1" },
        dataType: 'json',
        success: function (msg) {
            clearInterval(__intervalKCTime);
            setparint(msg, gameIndex, type, t, stop);
        },
        error: function () {
            clearInterval(__intervalKCTime);
            clearInterval(__intervalOpenNumTime);
            alert("Error：the options for this ajax request");
            window.top.location = "/Mobi/Login/?e=" + +new Date();
        }
    });
}
function setparint(data, gameIndex, type, t, stop) {
    ___upodds = data.upodds;

    //設置賠率
    setodds(data);

    //設置長龍排行
    setcl(data.clList);

    //今天輸贏
    $("#t_amt span.yellow").html(data.win);

    //賬戶餘額
    $("#t_credit span.yellow").html(data.usableCredit);

    //開獎期數及號碼
    var newnumber = data.openNumList.newnumber || "NO";
    var numList = data.openNumList.numList || [];
    var result = ["<b style='float:left;'>" + newnumber + "期</b>"];
    var data_index = $("#gameall #lottery_type").attr("data-index");
    var n = data_index == 2 || data_index == 3 || data_index == 15 ? "num_" : data_index == 4 || data_index == 8 || data_index == 14 ? "pk_" : data_index == 5 ? "KSNo_" : data_index == 6 ? "kl8" : data_index == 7 ? "nc_" : data_index == 10 ? "gx_" : data_index == 13 ? "KSNo_" : "";
    for (var i = 0; i < numList.length; i++) {
        if (data_index == 5 || data_index == 7 || data_index == 13)
            result.push("<span class='" + n + numList[i] + "'></span>");
        else if (data_index == 6)
            result.push("<label class='" + n + "'>" + numList[i] + "</label>");
        else
            result.push("<span class='" + n + numList[i] + "'>" + numList[i] + "</span>");
    }
    $("#draw_result").html(result.join("") + "<div class='clear'></div>");

    //開盤期數
    var number = data.openDateList.number || "NO";
    $("#t_qs").html(number);

    //封盤時間
    var closeTime = data.openDateList.endTime || 0;

    //開獎時間
    var lotteryTime = data.openDateList.lotteryTime || 0;

    var time = closeTime == 0 && lotteryTime == 0 ? 0 : closeTime > 0 ? closeTime : lotteryTime > 0 ? lotteryTime : 0;
    var closeText = closeTime == 0 && lotteryTime == 0 || closeTime > 0 ? "距封盤:" : "距開獎:";
    $("#c_time").html(closeText + G.settimes(time));


    var countdown = 68;
    if (gameIndex == 15 || gameIndex == 14) {
        countdown = 10;
    }

    $("#up_countdown").html(countdown + "秒");

    if (!closeTime || !closeTime || (closeTime == 0 && lotteryTime == 0)) {

        setTimeout(function () { loadData(gameIndex, type, t, true) }, 10000);
        return false;
    }

    __intervalKCTime = setInterval(function () {
        if (time >= 0) {
            time--;
            $("#c_time").html(closeText + G.settimes(time));
        } else {
            clearInterval(__intervalKCTime);
            loadData(gameIndex, type, t, true);
            //開獎或封盤結束
        }

        countdown--;
        if (countdown > 1) {
            $("#up_countdown").html(countdown + "秒");
        } else {
            clearInterval(__intervalKCTime);
            loadData(gameIndex, type, t, false);
        }
    }, 1000);
    
    //正在等待開獎
    if (stop) {
        (function () {
            clearInterval(__intervalOpenNumTime);
            var _continueNum = function () {
                var newnumber = data.openNumList.newnumber || 0;
                $.ajax({
                    type: 'get',
                    url: '/TotalData/Action.ashx',
                    data: { __: "AutoNewNumber", gameIndex: gameIndex },
                    dataType: 'text',
                    success: function (m) {
                        if (m == "continue") {
                            __intervalOpenNumTime = setTimeout(_continueNum, 3000);
                        } else if (newnumber > 0 && G.NumberSign(m) && parseInt(m) > parseInt(newnumber)) {
                            setTimeout(function () { loadData(gameIndex, type, t, false); }, 2000);
                        }
                    },
                    error: function () {
                        clearInterval(__intervalKCTime);
                        clearInterval(__intervalOpenNumTime);
                        alert("Error：the options for this ajax request");
                    }
                });
            };
            _continueNum();
        })();
    }

    //綁定選擇號碼
    var data_min = $("#sltDate").attr("data-min");
    var data_max = $("#sltDate").attr("data-max");
    bindPanOn({ max: data_max, min: data_min });
}
function setodds(data) {
    var oddsList = data.oddsList;
    var yilou = data.yilou || [];
    var lengm = data.lengm || [];
    var obj = $("#gameall"), mythis, myodds, len;
    if (oddsList) {
        for (var i in oddsList) {
            if (parseInt(i) >= 323 && parseInt(i) <= 329) {
                if (!___data)
                    ___data = data;
                obj.find(".WFbox .box li").attr("data-sort", obj.find("#sltDate").attr("data-sort"));
            }
            mythis = obj.find(".WFbox .box li[data-sort='" + i + "']");
            myodds = oddsList[i];
            if (myodds != mythis.find("label").html()) {
                mythis.find(".liBox").removeClass("closePan");
                mythis.find("label").html(myodds);
            }
            if (!G.DecimalSign(myodds)) {
                mythis.find(".liBox").removeClass("on").addClass("closePan");
            }
            len = parseInt(mythis.attr("data-name")) - 1;
            if (G.NumberSign(len) && G.NumberSign(yilou[len]) && G.NumberSign(lengm[len])) {
                mythis.find("p").html("热:" + lengm[len] + " 漏:" + yilou[len]);
            }
        }
    }
}
function setcl(data) {
    var clAry = [], key;
    if (data && data.length > 0) {
        data.sort(function (a, b) {
            var _a = a.split(":")[1], _b = b.split(":")[1];
            return parseInt(_b) - parseInt(_a);
        });
        clAry.push("<ul>");
        for (var i = 0; i < data.length; i++) {
            key = data[i].split(":");
            clAry.push("<li>" + key[0].replace(' ', ' - ') + ":<b class='lan'>" + key[1] + "期</b></li>");
        }
        clAry.push("</ul>");
    }
    $("#gameall #t_long").html(clAry.join(""));
}
function bindPanOn(msg) {
    var obj = $("#gameall");
    var data_max = msg.max;
    var data_min = msg.min;
    var atime, btime, ctime;
    obj.find(".WFbox .box li .liBox").unbind("touchstart").touchstart(function (e) {
        atime = e.timeStamp;
    });
    obj.find(".WFbox .box li .liBox").on("touchmove", function (e) {
        ctime = e.timeStamp;
    });
    obj.find(".WFbox .box li .liBox").unbind("touchend").touchend(function (e) {
        btime = e.timeStamp;
        if ((ctime - atime) > 0) return; //判斷滑動中的誤選
        
        if (!$(this).hasClass("closePan")) {
            if (!$(this).hasClass("on")) {
                $(this).addClass("on");
                if (data_max && data_min) { //最大、最小選擇
                    if (!sumMaxOn(data_max)) {
                        $(this).removeClass("on");
                    }
                }
            } else {
                $(this).removeClass("on");
            } 
        }
    });
    function sumMaxOn(max) {
        var count = 0;
        obj.find(".WFbox .box li .on").each(function () {
            count++;
        });
        if (count <= max) {
            return true;
        }
    }
}

function changeValue(obj) {
    if (obj.attr('data-url')) {
        window.location.href = obj.attr('data-url');
    } else if (obj.attr('data-sort')) {
        $("#sltDate_box").removeClass('active');
        $("#sltDate_box a").removeClass("active");
        obj.addClass("active");
        var data_sort = obj.attr("data-sort");
        var data_min = obj.attr("data-min");
        var data_max = obj.attr("data-max");
        var data_type = obj.attr("data-type");
        $("#gameall .WFbox .box li .on").removeClass("on");
        $("#sltDate").attr({ "data-sort": data_sort, "data-min": data_min, "data-max": data_max, "data-type": data_type }).html(obj.html());
        $("#gameall #myWFtitle").html(obj.html());
        $("#gameall .WFbox .box li").attr("data-type", obj.html());
        setodds(___data);
        bindPanOn({ max: data_max, min: data_min });
    }
}