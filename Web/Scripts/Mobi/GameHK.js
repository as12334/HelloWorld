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
var __intervalHkTime, ___upodds, ___myoddsList;
function loadData(type, t) {
    var _type = type;
    $.ajax({
        type: 'post',
        url: '/TotalData/Action.ashx',
        data: { __: "membergamedata", t: t, type: type, gameIndex: 1, mobi: "1" },
        dataType: 'json',
        success: function (msg) {
            clearInterval(__intervalHkTime);
            setparint(msg, type, t);
        },
        error: function () {
            clearInterval(__intervalHkTime);
            alert("Error：the options for this ajax request");
            window.top.location = "/Mobi/Login/?e=" + +new Date();
        }
    });
}
function setparint(data, type, t) {
    ___upodds = data.upodds;

    //設置賠率
    setodds(data.oddsList);

    //設置長龍排行
    //setcl(data.clList);

    //今天輸贏
    $("#t_amt span.yellow").html(data.win);
    
    //賬戶餘額
    $("#t_credit span.yellow").html(data.usableCredit);

    //開獎期數及號碼
    var newnumber = data.openNumList.newnumber || "NO";
    var numList = data.openNumList.numList || [];
    var result = ["<b style='float:left;'>" + newnumber + "期</b>"];
    for (var i = 0; i < numList.length; i++) {
        result.push("<span class='s_" + numList[i] + "'>" + numList[i] + "</span>");
    }
    $("#draw_result").html(result.join(""));

    //開盤期數
    var number = data.openDateList.number || "NO";
    $("#t_qs").html(number);

    //封盤時間
    var closeTime = type == 1 || type == 2 ? data.openDateList.trayTeMaNo : data.openDateList.endTime;

    //開獎時間
    var lotteryTime = data.openDateList.lotteryTime;

    var time = closeTime == 0 && lotteryTime == 0 ? 0 : closeTime > 0 ? closeTime : lotteryTime > 0 ? lotteryTime : 0;
    var closeText = closeTime == 0 && lotteryTime == 0 || closeTime > 0 ? "距封盤:" : "距開獎:";
    $("#c_time").html(closeText + G.settimer(time));

    var countdown = 66;
    $("#up_countdown").html(countdown + "秒");

    if (!closeTime || !closeTime || (closeTime == 0 && lotteryTime == 0)) {
        return false;
    }

    __intervalHkTime = setInterval(function () {
        if (time > 0) {
            time--;
            $("#c_time").html(closeText + G.settimer(time));
        } else {
            clearInterval(__intervalHkTime);
            loadData(type, t);
        }

        countdown--;
        if (countdown > 1) {
            $("#up_countdown").html(countdown + "秒");
        } else {
            clearInterval(__intervalHkTime);
            loadData(type, t);
        }
    }, 1000);

    //綁定選擇號碼
    var data_min = $("#sltDate").attr("data-min");
    var data_max = $("#sltDate").attr("data-max");
    bindPanOn({ max: data_max, min: data_min });
}
function setodds(oddsList) {
    var obj = $("#gameall"), mythis, myodds;
    if (oddsList) {
        for (var i in oddsList) {
            mythis = obj.find(".WFbox .box li[data-sort='" + i + "']");
            myodds = oddsList[i];
            /*if (i == 154 || (parseInt(i) >= 684 && parseInt(i) <= 732)) {
                if (!___myoddsList)
                    ___myoddsList = oddsList;
                myodds = hxodds(myodds);
            }*/
            if (myodds != mythis.find("label").html()) {
                mythis.find("label").html(myodds);
                if ((parseInt(i) >= 844 && parseInt(i) <= 892) || (parseInt(i) >= 942 && parseInt(i) <= 990)) {
                    mythis.find("b").html(oddsList[parseInt(i) + 49]);
                }
            }
            if (!G.DecimalSign(myodds)) {
                mythis.find(".liBox").removeClass("on").addClass("closePan");
                if ((parseInt(i) >= 844 && parseInt(i) <= 892) || (parseInt(i) >= 942 && parseInt(i) <= 990)) {
                    mythis.find("b").html("");
                }
            }
        }
    }
}
function hxodds(odds) { //合肖賠率計算
    var upodds = ___upodds;
    var data_max = parseInt($("#sltDate").attr("data-type"));
    if (G.DecimalSign(odds)) {
        for (var i = 2; i < data_max; i++) {
            odds = odds * upodds;
        }
        return G.forDight(odds, 2);
    }
    return odds;
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
            clAry.push("<li>" + key[0].replace(' ',' - ') + ":<b class='lan'>" + key[1] + "期</b></li>");
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
        setodds(___myoddsList);
        bindPanOn({ max: data_max, min: data_min });
    }
}
