//账单备份
function gamebak(msg) {
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var href = "../gamebak.aspx?t=" + __sysinfo.autoTid + "&gameIndex=" + gameIndex;
    $("body").append("<a href='" + href + "' class='hidden' id='myBak-a'><span></span></a>");
    $("#myBak-a span").click();
    $("#myBak-a").remove();
}

var checkgamedatatime;

//即时盘口
function gamedata(msg) {

    clearTimeout(checkgamedatatime);

    var shell = $("#shell_top");
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var type = G.query("type", "?" + msg.data_action);
    var isCl = G.query("isCl", "?" + msg.data_action);
    var timeValue = G.query("timeValue", "?" + msg.data_action) || 20;
    var huoStatus = G.query("huoStatus", "?" + msg.data_action) || 1;
    var rebate = G.query("rebate", "?" + msg.data_action) || 0;
    var reload = G.query("reload", "?" + msg.data_action);
    var sortId = G.query("sortId", "?" + msg.data_action);
    var obj = appenGameData({ gameIndex: gameIndex, type: type, reload: reload });
    var autoType = type;
    if (gameIndex == 1) {
        if (type == 1 || type == 2 || type == 3) {
            autoType = 3;
        } else if (type == 8 || type == 88 || type == 808) {
            autoType = 808;
        } else if (type >= 10 && type <= 15) {
            autoType = 10;
        } else if (type == 18 || type >= 181 && type <= 185) {
            autoType = 18;
            shell.find("#huoStatus").hide();
        } else if (type >= 28 && type <= 33) {
            autoType = 28;
            shell.find("#huoStatus").hide();
        } else if (type == 19 || type == 22) {
            shell.find("#huoStatus").hide();
        }
    }
    $("#navListBox a").removeClass("onBtn");
    $("#navListBox a[data-action='gamedata&gameIndex=" + gameIndex + "&type=" + autoType + "']").addClass("onBtn");

    //设定表格样式
    obj.addClass("game-heiht");

    //绑定选项参数
    shell.find("#timeValue").val(timeValue);
    shell.find("#huoStatus").val(huoStatus);
    shell.find("#rebate").val(rebate);
    shell.find("#type").val(type);
    //赔率调整可见
    if (__sysinfo.level == 1 && __sysinfo.setodds == 1) {
        $("#setAll-game").removeClass("hidden");
        $("div[name='game-row'] .odd_set").removeClass("hidden");
        $("div[name='game-row'] a.line1").addClass("cursor");
    }
    //六合彩-盈亏排列控件
    if (gameIndex == 1 && (type == 1 || type == 2 || type == 3 || type == 8 || type == 88 || type == 808 || type >= 10 && type <= 15 || type == 1828)) {
        shell.find("#myGameSort").show();
    } else {
        shell.find("#myGameSort").hide();
    }
    if (gameIndex == 1 && !reload && type != 6 && __sysinfo.shipments == 1 && __sysinfo.level != 0) {
        //平均虧損:<input type='text' id='data-average' class='text-input sw90' value='10000000'><span class='text-span' id='data-sum'>計算補貨</span>
        $("#shell_pageControl").html("<div id='data-page' class='fast-buhuo'><span class='text-span' id='fast-buhuo'>快速補貨</span></div>");
    } else if ((gameIndex == 4 || gameIndex == 3) && !reload && __sysinfo.shipments == 1 && __sysinfo.level != 0) {
        $("#shell_pageControl").html("<div id='data-page' class='fast-buhuo'><span class='text-span' id='fast-buhuo'>快速補貨</span></div>");
    }
    //六合彩-总注数
    if (gameIndex == 1 && type == 6 && sortId == null) {
        obj.find("tr[data-sort] input[type='radio']").attr("checked", false);
        obj.find("[name='game-count'] tbody a[data-index]").html("-");
    }
    if (__sysinfo.level == 0) {
        shell.find("#huoStatus").hide();
    }

    if (isCl == null) { G.scrollLoad({}); }
    S.request = G.ajax(msg.data_action, function (json) {
        if (isCl == null) { G.loadEnd(); }

        //今天输赢
        shell.find("span[name='win']").html(json.win);

        //开盘信息、开盘期数、封盘时间、开奖时间
        var opNum = json.openDateList.number || "NO";
        var endTime = parseInt(json.openDateList.endTime) || 0;
        var lotteryTime = parseInt(json.openDateList.lotteryTime) || 0;
        shell.find("span[name='number']").html(opNum);

        var closeTime = endTime > 0 ? endTime : lotteryTime;
        var closeTime_txt;
        if (endTime > 0 || endTime == 0 && lotteryTime == 0) {
            closeTime_txt = "距封盤：";
            shell.find("span[name='closeTime']").removeClass("red");
        } else {
            closeTime_txt = "距開獎：";
            shell.find("span[name='closeTime']").addClass("red");
        }
        shell.find("span[name='closeTime-txt']").html(closeTime_txt);
        shell.find("span[name='closeTime']").html(G.settimes(closeTime));

        //开奖信息
        var newnumber = json.openNumList.newnumber || "on";
        shell.find("span[name='newnumber']").html(newnumber);
        var numList = json.openNumList.numList || [];
        var mc = gameIndex == 1 ? "HKNo_" : gameIndex == 2 ? "KLCNo_" : gameIndex == 3 || gameIndex == 15 ? "SSCNo_" : gameIndex == 4 || gameIndex == 8 || gameIndex == 14 ? "PKNo_" : gameIndex == 5 ? "KSNo_" : gameIndex == 6 ? "KLBNo_" : gameIndex == 7 ? "NCNo_" : gameIndex == 10 ? "GXNo_" : gameIndex == 13 ? "KSNo_" : "";
        for (var i = 0; i < numList.length; i++) {
            numList[i] = "<i class='" + mc + numList[i] + "'></i>";
        }
        shell.find("span[name='numList']").html(numList.join(""));
        //O.title = $("#shell_title").html();

        //赔率、注额、盈亏（包括总投）
        var line1, line2, line3, line1_1;
        var data_count = [0, 0, 0], tjlen = obj.find("#total_tongji").length, my_count = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var i in json.detailsList) {
            line2 = obj.find("[data-sort='" + i + "'] a.line2");
            line3 = obj.find("[data-sort='" + i + "'] a.line3");
            if (gameIndex == 1 && (type == 30 || type == 31)) {
                line1 = obj.find("a[data-sort='" + i + "']").html(json.oddsList[i]);
                line1_1 = obj.find("a[data-sort='" + (parseInt(i) + 49) + "']").html(json.oddsList[parseInt(i) + 49]);
            } else {
                line1 = obj.find("[data-sort='" + i + "'] a.line1");
                if (line1.html() != json.oddsList[i]) {
                    line1.html(json.oddsList[i]);
                }
            }
            if (json.detailsList && json.detailsList[i][1] == 0 && json.detailsList[i][0] == 0) {
                json.detailsList[i][1] = "-";
            }
            if (json.detailsList && json.detailsList[i][0] == 0 && (json.detailsList[i][1] >= 0 || json.detailsList[i][1] == "-")) {
                json.detailsList[i][0] = "-";
            }
            if (json.detailsList && line2.html() != json.detailsList[i][0]) { //注额
                line2.html(json.detailsList[i][0]);
            }
            if (json.detailsList && line3.html() != json.detailsList[i][1]) { //盈亏
                if (G.NumberSignt(json.detailsList[i][1]) && json.detailsList[i][1] > 0) {
                    line3.addClass("red");
                } else {
                    line3.removeClass("red");
                }
                line3.html(json.detailsList[i][1]);
                if (gameIndex == 5 && parseInt(i) >= 3 && parseInt(i) <= 8) {
                    if (json.detailsList[i][0] > 0 && json.detailsList[i][1] < 0) {
                        obj.find("tr[data-sort='" + i + "']").find("a.to2").html(parseInt(json.detailsList[i][1]) * 2);
                        obj.find("tr[data-sort='" + i + "']").find("a.to3").html(parseInt(json.detailsList[i][1]) * 3);
                    }
                }
            }
            if (tjlen > 0 && json.detailsList) {
                if (G.NumberSign(json.detailsList[i][0])) {
                    data_count[0] += parseInt(json.detailsList[i][0]);
                    if (gameIndex == 1 && type == 1828) {
                        if (parseInt(i) >= 50 && parseInt(i) <= 65) {
                            my_count[0] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 115 && parseInt(i) <= 123) {
                            my_count[1] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 124 && parseInt(i) <= 132) {
                            my_count[2] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 133 && parseInt(i) <= 141) {
                            my_count[3] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 142 && parseInt(i) <= 153) {
                            my_count[4] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 155 && parseInt(i) <= 159) {
                            my_count[5] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 160 && parseInt(i) <= 169) {
                            my_count[6] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 741 && parseInt(i) <= 745) {
                            my_count[7] += parseInt(json.detailsList[i][0]);
                        }
                    }
                }
                if (G.NumberSignt(json.detailsList[i][1])) {
                    if (json.detailsList[i][1] < data_count[1]) {
                        data_count[1] = json.detailsList[i][1];
                    }
                    if (json.detailsList[i][1] > data_count[2]) {
                        data_count[2] = json.detailsList[i][1];
                    }
                }
            }
        }
        if (tjlen > 0) {
            obj.find("#total_tongji p").each(function (i) {
                $(this).find("b").html(data_count[i]);
            });
        }
        if (gameIndex == 1 && type == 1828) {
            for (var i = 0; i < my_count.length; i++) {
                obj.find("span[sort-tb='" + (i + 1) + "']").html(my_count[i]);
            }
        }

        //负值排列
        if (obj.find("#fz-sort").length > 0) {
            var mySort = [], dow, num;
            obj.find("#fz-sort tbody tr").each(function () {
                dow = $(this).find("td").eq(3).find("a").html();
                if (G.NumberSignt(dow)) {
                    mySort.push(dow + "|<tr data-sort='" + $(this).attr("data-sort") + "' data-type='" + $(this).attr("data-type") + "' data-name='" + $(this).attr("data-name") + "'>" + $(this).html() + "</tr>");
                } else {
                    num = $(this).find("td").eq(0).html();
                    mySort.push(num + "|<tr data-sort='" + $(this).attr("data-sort") + "' data-type='" + $(this).attr("data-type") + "' data-name='" + $(this).attr("data-name") + "'>" + $(this).html() + "</tr>");
                }
            });
            mySort.sort(function (a, b) {
                var _a = a.split("|")[0], _b = b.split("|")[0];
                return parseInt(_a) - parseInt(_b);
            });
            for (var i = 0; i < mySort.length; i++) {
                mySort[i] = mySort[i].split("|")[1];
            }
            if (mySort.length > 0) {
                obj.find("#fz-sort tbody").html(mySort.join(""));
            }
        }
        //六合彩-特码盘亏损或球号排行
        if (gameIndex == 1 && (type == 1 || type == 2 || type == 3 || type == 8 || type == 88 || type == 808 || type >= 10 && type <= 15 || type == 1828)) {
            var myGameSort = shell.find("#myGameSort").val();
            var mySortHtm = [], mySort, a3, htmNum = ["", "", ""];
            obj.find("[data-hknum='sort'] tbody tr").each(function (i) {
                if (myGameSort == 0) {
                    a3 = $(this).find("td").eq(3).find("a").html();
                    mySort = a3 == "-" ? i + 99999999 : a3;
                } else {
                    mySort = $(this).find("td").eq(0).html();
                }
                mySortHtm.push(mySort + ":<tr data-sort='" + $(this).attr("data-sort") + "' data-type='" + $(this).attr("data-type") + "' data-name='" + $(this).attr("data-name") + "'>" + $(this).html() + "</tr>");
            });
            if (mySortHtm.length > 0) {
                mySortHtm.sort(function (a, b) {
                    var _a = parseInt(a.split(":")[0]), _b = parseInt(b.split(":")[0]);
                    return _a - _b;
                });
                for (var i = 0; i < mySortHtm.length; i++) {
                    mySortHtm[i] = mySortHtm[i].split(":")[1];
                    if (type == 1828) {
                        if (i <= 35) {
                            htmNum[0] += mySortHtm[i];
                        } else {
                            htmNum[1] += mySortHtm[i];
                        }
                    } else {
                        if (i <= 17) {
                            htmNum[0] += mySortHtm[i];
                        } else if (i >= 18 && i <= 35) {
                            htmNum[1] += mySortHtm[i];
                        } else {
                            htmNum[2] += mySortHtm[i];
                        }
                    }
                }
                for (var i = 0; i < htmNum.length; i++) {
                    obj.find("[data-hknum='sort']").eq(i).find("tbody").html(htmNum[i]);
                }
            }
        }

        if (json.zhuCount) {
            for (var i in json.zhuCount) {
                obj.find("[name='game-count'] tbody a[data-index='" + i + "']").html(json.zhuCount[i][0]);
            }
        }

        //单组明细列表
        if (json.rowList) {
            var table = [], data_bc;
            if (json.rowList.length == 0) {
                table.push("<tr>");
                table.push("<td colspan='4'>暫無數據...</td>");
                table.push("</tr>");
            } else {
                json.rowList.sort(function (x, y) { return x[0].length - y[0].length; });
                for (var i = 0; i < json.rowList.length; i++) {
                    data_bc = i % 2 != 0 ? "bc" : "";
                    table.push("<tr class='" + data_bc + "'>");
                    table.push("<td>" + (i + 1) + "</td>");
                    table.push("<td>" + json.rowList[i][0] + "</td>");
                    table.push("<td>" + json.rowList[i][1] + "</td>");
                    table.push("<td class='red'>-" + json.rowList[i][2] + "</td>");
                    table.push("</tr>");
                }
            }
            obj.find("[name='lm-sortNum'] tbody").html(table.join(""));
            G.mouseover(obj.find("[name='lm-sortNum'] tbody tr"));
        }

        //补货计算
        if ($("#data-sum").length > 0) {
            $("#data-average").unbind("keyup").keyup(function () {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
            $("#data-sum").unbind("click").click(function () {
                sumAverage();
            });
        }
        //sumAverage();
        function sumAverage() {
            var average = parseInt($("#data-average").val());
            var sumVal;
            if (G.NumberSign(average)) {
                for (var i in json.oddsList) {
                    if (G.DecimalSign(json.oddsList[i]) && G.NumberSign(json.detailsList[i][0]) && json.detailsList[i][0] > 0) {
                        sumVal = parseInt(average / (parseFloat(json.oddsList[i]) - 1));
                        sumVal = parseInt(json.detailsList[i][0]) - sumVal;
                        if (sumVal > 0) {
                            obj.find("[data-sort='" + i + "'] td").eq(2).find("span.line4").html(sumVal.toString().split(".")[0]);
                        } else {
                            obj.find("[data-sort='" + i + "'] td").eq(2).find("span.line4").html("");
                        }
                    } else {
                        obj.find("[data-sort='" + i + "'] td").eq(2).find("span.line4").html("");
                    }
                }
            }
        }

        //总额显示
        if (json.countList && json.countList.length > 0) {
            data_count = 0;
            if (gameIndex == 1) {
                for (var i = 0; i < json.countList.length; i++) {
                    data_count += parseInt(json.countList[i]);
                    obj.find("#count-ary tr td[sort-tb='" + i + "']").find("span").html(json.countList[i]);
                }
            } else {
                for (var i = 0; i < json.countList.length; i++) {
                    data_count += parseInt(json.countList[i]);
                    obj.find("#count-ary tr").eq(i).find("span").html(json.countList[i]);
                }
            }
            obj.find("#count-bt").html(data_count);
            obj.find("#count-ary tr td").unbind("click").click(function () {
                var data_type = $(this).attr("my-type");
                msg.data_action = ["gamedata", "gameIndex=" + gameIndex, "type=" + data_type].join("&");
                middleBind({ data_action: msg.data_action });
            });
        }

        //遗漏
        if (json.yilou) {
            for (var i = 0; i < json.yilou.length; i++) {
                obj.find("#yl-count tr").eq(i).find("td[index]").html(json.yilou[i]);
            }
        }

        //两面长龙
        var table = [], key, num;
        if (isCl == null) {
            if (json.clList && json.clList.length > 0) {
                json.clList.sort(function (a, b) {
                    var _a = a.split(":")[1], _b = b.split(":")[1];
                    return parseInt(_b) - parseInt(_a);
                });
                for (var i = 0; i < json.clList.length; i++) {
                    key = json.clList[i].split(":");
                    table.push("<tr><td class='bc txt-left txt-paddin-left'>" + key[0] + "</td><td class='fff red'>" + key[1] + "期</td></tr>");
                }
            } else if (json.clListr && json.clListr.length > 0) {
                for (var i = 0; i < json.clListr.length; i++) {
                    key = json.clListr[i].split(":");
                    num = key[1].split("|");
                    table.push("<tr><td class='bc'>" + key[0] + "期</td><td class='fff red'><i class='KSNo_" + num[0] + "'></i><i class='KSNo_" + num[1] + "'></i><i class='KSNo_" + num[2] + "'></i></td><td class='sw25'>" + key[2] + "</td><td class='sw25'>" + key[3] + "</td></tr>");
                }
            } else {
                table = ["<tr><td>暫無數據</td></tr>"];
            }
            obj.find("#cl-count").html(table.join(""));
        }


        //绑定选项事件
        shell.find("#selcheng select").unbind("change").change(function () {
            var myId = $(this).attr("id");
            if (myId != "type" && myId != "myGameSort") {
                reloadData();
            } else if (myId == "type") {
                var mytype = $(this).val();
                middleBind({ data_action: "gamedata&gameIndex=" + gameIndex + "&type=" + mytype });
            } else if (myId == "myGameSort") {
                reloadData();
            }
        });

        var data_stop = true;
        //允许修改赔率、封盘
        if (__sysinfo.level == 1 && __sysinfo.setodds == 1) {
            shell.find("#setAll-game input[type='button']").unbind("click").click(function () {
                var data_name = $(this).attr("name");
                var name_txt = $(this).attr("value").replace("快速", "").replace("賠", "");
                var data_upOdds = parseFloat(shell.find("#upodds").val());
                var data_oddsk = shell.find("#odds_k").val();
                var oddsk_txt = shell.find("#odds_k").find("option:selected").text();
                var type_txt = shell.find("#type").find("option:selected").text();
                var rebate = shell.find("#rebate").val();
                var data_sort = [], data_action, content;
                if (data_name == "up" || data_name == "down") {
                    content = "【" + type_txt + " " + oddsk_txt + "】 <span class='blue'>" + name_txt + data_upOdds + "</span> 確定操作嗎？";
                } else if (data_name == "open" || data_name == "close") {
                    if (endTime <= 0) {
                        G.alert({ content: "后台尚未开盘，请在开盘后操作！", ok: function () { return true; } });
                        return false;
                    } else {
                        content = "【" + type_txt + " " + oddsk_txt + "】 <span class='blue'>" + name_txt + "</span> 確定操作嗎？";
                    }
                }
                if (data_oddsk == -1) {
                    obj.find("div[name='game-row'] tr[data-sort]").each(function () {
                        data_sort.push($(this).attr("data-sort"));
                    });
                } else { //部分索引
                    var myanimalsAry = __sysinfo.animalsAry[data_oddsk].split(",");
                    var mynum;
                    for (var i = 0; i < myanimalsAry.length; i++) {
                        mynum = myanimalsAry[i].length == 1 ? "0" + myanimalsAry[i] : myanimalsAry[i];
                        data_sort.push(obj.find("div[name='game-row'] tr[data-name='" + mynum + "']").attr("data-sort"));
                    }
                }
                if (data_stop) {
                    data_stop = false;
                    data_action = ["gamedata", "rebate=" + rebate, "gameIndex=" + gameIndex, "type=" + type, "auto=" + data_name, "upodds=" + data_upOdds, "data=" + data_sort.join(",")];
                    G.alert({ content: content,
                        ok: function () {
                            G.mask();
                            G.ajax(data_action.join("&"), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    reloadData();
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                            return true;
                        },
                        cancel: function () { },
                        close: function () { data_stop = true; }
                    });
                }
            });
            obj.find("div[name='game-row'] span.odd_set").unbind("click").click(function () {
                var data_name = $(this).attr("name");
                var data_upOdds = parseFloat(shell.find("#upodds").val());
                var data_sort = $(this).siblings("a").attr("data-sort") || $(this).parents("tr").attr("data-sort");
                var rebate = shell.find("#rebate").val();
                var data_action = ["gamedata", "rebate=" + rebate, "gameIndex=" + gameIndex, "type=" + type, "auto=" + data_name, "upodds=" + data_upOdds, "data=" + data_sort];
                if (data_stop) {
                    data_stop = false;
                    G.mask();
                    G.ajax(data_action.join("&"), function (json) {
                        data_stop = true;
                        G.maskClose();
                        if (G.DecimalSign(json.result)) {
                            if (gameIndex == 1 && (type == 30 || type == 31)) {
                                obj.find("a[data-sort='" + data_sort + "']").html(G.forDight(json.result, 4));
                            } else {
                                obj.find("tr[data-sort='" + data_sort + "'] a.line1").html(G.forDight(json.result, 4));
                            }
                        } else {
                            G.alert({ content: json.result, ok: function () { return true; } });
                        }
                    }, function () { G.maskClose(); data_stop = true; });
                }
            });
            obj.find("div[name='game-row'] a.line1").unbind("click").click(function () {
                var data_type = $(this).parents("tr").attr("data-type");
                var data_name = $(this).parents("tr").attr("data-name");
                var data_sort = $(this).attr("data-sort") || $(this).parents("tr").attr("data-sort");
                var data_odds = $(this).html();
                var rebate = shell.find("#rebate").val();
                if (G.DecimalSign(data_odds)) {
                    if (gameIndex == 1 && (type == 3 || type == 6 || type == 808)) {

                    } else if (gameIndex == 1 && type == 1828 && data_sort <= 49) {

                    } else {
                        var content = "<div class='bold' style='margin:5px 5px;'>" + data_type + "[<span class='blue'>" + data_name + "</span>] <span class='red'>" + data_odds + "</span></div>";
                        content += "<div style='margin:3px 5px;'>賠率设置：<input type='text' id='auto-set-odds' class='text-input sw70' value='" + data_odds + "'></div>";
                        G.alert({ title: "賠率設定", content: content, obj: $(this),
                            ok: function () {
                                var data_upOdds = $("#auto-set-odds").val();
                                if (G.DecimalSign(data_upOdds) && data_upOdds != data_odds && data_stop) {
                                    var data_action = ["gamedata", "rebate=" + rebate, "gameIndex=" + gameIndex, "type=" + type, "auto=auto", "upodds=" + data_upOdds, "data=" + data_sort];
                                    data_stop = false;
                                    G.mask();
                                    G.ajax(data_action.join("&"), function (json) {
                                        data_stop = true;
                                        G.maskClose();
                                        if (G.DecimalSign(json.result)) {
                                            if (gameIndex == 1 && (type == 30 || type == 31)) {
                                                obj.find("a[data-sort='" + data_sort + "']").html(G.forDight(json.result, 4));
                                            } else {
                                                obj.find("tr[data-sort='" + data_sort + "'] a.line1").html(G.forDight(json.result, 4));
                                            }
                                        } else {
                                            G.alert({ content: json.result, ok: function () { return true; } });
                                        }
                                    }, function () { G.maskClose(); data_stop = true; });
                                }
                                return true;
                            },
                            cancel: function () { }
                        });
                    }
                }
            });
        }

        //允许补货
        if (__sysinfo.shipments == 1) {
            //快速补货
            $("#fast-buhuo").unbind("click").click(function () {
                if (!endTime || endTime <= 0) {
                    G.alert({ content: "后台尚未开盘，请在开盘后操作！", ok: function () { return true; } });
                    return false;
                } else if (gameIndex == 1 && (type == 18 || type == 19 || type == 22 || type >= 28 && type <= 33 || type >= 181 && type <= 185)) {
                    G.mask();
                    data_stop = false;
                    var data_sort = type == 18 ? 684 : type == 181 ? 1199 : type == 182 ? 1248 : type == 183 ? 1297 : type == 184 ? 1346 : type == 185 ? 1395 : type == 28 ? 746 : type == 29 ? 795 : type == 30 ? 844 : type == 31 ? 942 : type == 32 ? 1040 : type == 33 ? 1089 : 0;
                    if (type == 19 || type == 22) {
                        data_sort = obj.find("input[type='radio']:checked").val();
                    }
                    var data_number = json.openDateList.number;
                    var data_action = ["detailsbuhuolm", "type=" + type, "gameIndex=" + gameIndex, "number=" + data_number, "sortId=" + data_sort];
                    G.ajax(data_action.join("&"), function (json) {
                        data_stop = true;
                        G.maskClose(); //:<input type='text' style='height:14px;' class='text-input sw40'>
                        var thead = ["排名", "組合", "賠率", "退水", "補貨額", "派彩額", "<input type='checkbox'>"];
                        var table = [];
                        if (json && json.length > 0) {
                            json.sort(function (x, y) { return y[4] - x[4]; });
                            for (var i = 0; i < json.length; i++) {
                                table.push("<tr data-sort='" + json[i][0] + "'>");
                                table.push("<td class='w7'>" + (i + 1) + "</td>");
                                table.push("<td class='w25'>" + json[i][1] + "</td>"); //组合
                                if (gameIndex == 1 && (type == 30 || type == 31)) {
                                    table.push("<td class='w15'><input type='text' class='text-input sw40' name='bh-odds' value='" + json[i][2] + "'>/<input type='text' class='text-input sw40' name='bh-odds-2' value='" + json[i][5] + "'></td>"); //赔率
                                } else {
                                    table.push("<td class='w15'><input type='text' class='text-input sw50' name='bh-odds' value='" + json[i][2] + "'></td>"); //赔率
                                }
                                table.push("<td class='w15'><input type='text' class='text-input sw50' name='bh-rebate' value='" + json[i][3] + "'></td>"); //退水
                                table.push("<td class='w15'><input type='text' class='text-input sw50' name='bh-money' data-max='" + json[i][4] + "' value='" + json[i][4] + "'></td>"); //补货
                                table.push("<td class='w15 red'>" + G.forDight(((parseFloat(json[i][4]) * parseFloat(json[i][2])) - parseFloat(json[i][4])) + ((parseFloat(json[i][3]) / 100) * parseFloat(json[i][4])), 1) + "</td>");
                                table.push("<td class='w7'><input type='checkbox'></td>");
                                table.push("</tr>");
                            }
                        }
                        var content = G.overflowDiv({ id: "day-buhuodan-lm", height: 470, content: forceMiddle({ thead: thead, tbody: table }) });
                        G.alert({ title: "補貨單", content: content, width: 720,
                            initialize: function () {
                                if (__sysinfo.level > 1) {
                                    $("#day-buhuodan-lm input[name='bh-odds']").attr("disabled", "disabled");
                                    $("#day-buhuodan-lm input[name='bh-odds-2']").attr("disabled", "disabled");
                                    $("#day-buhuodan-lm input[name='bh-rebate']").attr("disabled", "disabled");
                                }
                                G.mouseover("#day-buhuodan-lm tbody tr");
                                $("#day-buhuodan-lm thead input[type='checkbox']").unbind("change").change(function () {
                                    var checked = $(this).attr("checked") ? true : false;
                                    if (checked) {
                                        $("#day-buhuodan-lm tbody tr").addClass("qhs");
                                    } else {
                                        $("#day-buhuodan-lm tbody tr").removeClass("qhs");
                                    }
                                    $("#day-buhuodan-lm tbody input[type='checkbox']").attr("checked", checked);
                                });
                                $("#day-buhuodan-lm tbody input[type='checkbox']").unbind("change").change(function () {
                                    if ($(this).attr("checked")) {
                                        $(this).parent().parent("tr").addClass("qhs");
                                    } else {
                                        $(this).parent().parent("tr").removeClass("qhs");
                                    }
                                });
                                $("#day-buhuodan-lm thead input[type='text']").unbind("keyup").keyup(function () {
                                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                                    if (G.NumberSign($(this).val()) || $(this).val() == "") {
                                        var data_sort, money_max, bh_money = parseInt($(this).val()) || 0;
                                        $("#day-buhuodan-lm tbody input[name='bh-money']").each(function () {
                                            data_sort = $(this).parent().parent("tr").attr("data-sort");
                                            money_max = parseInt($(this).attr("data-max"));
                                            if (bh_money > money_max) {
                                                $(this).val(money_max);
                                            } else {
                                                $(this).val(bh_money);
                                            }
                                            $(this).parent().next("td.red").html(mypaic(data_sort));
                                        });
                                    }
                                });
                                $("#day-buhuodan-lm tbody input[name='bh-money']").unbind("keyup").keyup(function () {
                                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                                    if (G.NumberSign($(this).val()) || $(this).val() == "") {
                                        var data_sort = $(this).parent().parent("tr").attr("data-sort");
                                        var bh_money = parseInt($(this).val()) || 0;
                                        var money_max = parseInt($(this).attr("data-max"));
                                        if (bh_money > money_max) {
                                            $(this).val(money_max);
                                        } else {
                                            $(this).val(bh_money);
                                        }
                                        $(this).parent().next("td.red").html(mypaic(data_sort));
                                    }
                                });
                            },
                            ok: function () {
                                var dataAry = [], my_sort, my_odds, my_odds2, my_rebate, my_money, myvalue;
                                $("#day-buhuodan-lm tbody tr[data-sort]").each(function () {
                                    if ($(this).find("input[type='checkbox']").attr("checked")) {
                                        my_sort = $(this).attr("data-sort");
                                        my_odds = $(this).find("input[name='bh-odds']").val();
                                        my_odds2 = $(this).find("input[name='bh-odds-2']").val();
                                        my_rebate = $(this).find("input[name='bh-rebate']").val();
                                        my_money = $(this).find("input[name='bh-money']").val();
                                        myvalue = my_sort + ":" + my_odds + ":" + my_rebate + ":" + my_money;
                                        if (my_odds2) {
                                            myvalue += ":" + my_odds2;
                                        }
                                        dataAry.push(myvalue);
                                    }
                                });
                                if (data_stop && dataAry.length > 0) {
                                    G.mask();
                                    G.ajax(data_action.join("&") + "&data=" + dataAry.join(","), function (json) {
                                        data_stop = true;
                                        G.maskClose();
                                        if (json.result == 1) {
                                            G.alert({ content: "補貨成功。",
                                                ok: function () { return true; },
                                                close: function () { reloadData(); }
                                            });
                                        } else {
                                            G.alert({ content: json.result, ok: function () { return true; } });
                                        }
                                    }, function () { G.maskClose(); data_stop = true; });
                                    return true;
                                } else {
                                    alert("請勾選補貨“組合”");
                                }
                            },
                            cancel: function () { }
                        });

                        //派彩计算
                        function mypaic(data_sort) {
                            var odds = parseFloat($("#day-buhuodan-lm tbody tr[data-sort='" + data_sort + "']").find("input[name='bh-odds']").val()) || 0;
                            var rebate = parseFloat($("#day-buhuodan-lm tbody tr[data-sort='" + data_sort + "']").find("input[name='bh-rebate']").val()) || 0;
                            var money = parseFloat($("#day-buhuodan-lm tbody tr[data-sort='" + data_sort + "']").find("input[name='bh-money']").val()) || 0;
                            return G.forDight(((money * odds) - money) + ((rebate / 100) * money), 1);
                        }

                    }, function () { G.maskClose(); data_stop = true; });
                } else {
                    G.mask();
                    data_stop = false;
                    var data_sort = [];
                    obj.find("div[name='game-row'] tbody tr[data-sort]").each(function () {
                        if (G.NumberSign($(this).find("td").eq(2).find("a.line2").html())) {
                            data_sort.push($(this).attr("data-sort"));
                        }
                    });
                    var data_number = json.openDateList.number;
                    var data_action = ["fastbuhuo", "type=" + type, "gameIndex=" + gameIndex, "number=" + data_number, "sortAry=" + data_sort.join(",")];
                    G.ajax(data_action.join("&"), function (json) {
                        data_stop = true;
                        G.maskClose();
                        if (!json || json.length == 0) {
                            G.alert({ content: "暂未有符合补货项目！", ok: function () { return true; } });
                        } else {
                            var thead = ["序號", "玩法", "賠率", "退水", "補貨額", "操作"];
                            var table = [], data_maxjr;
                            //json.sort(function (x, y) { return y[3] - x[3]; });
                            for (var i = 0; i < json.length; i++) {
                                data_maxjr = obj.find("div[name='game-row'] tbody tr[data-sort='" + json[i][0] + "']").find("td").eq(2).find("span.line4").html();
                                if (!G.NumberSign(data_maxjr) || parseInt(data_maxjr) > parseInt(json[i][3])) {
                                    data_maxjr = json[i][3];
                                }
                                table.push("<tr data-sort='" + json[i][0] + "'>");
                                table.push("<td class='sw70'>" + (i + 1) + "</td>");
                                table.push("<td>" + obj.find("div[name='game-row'] tbody tr[data-sort='" + json[i][0] + "']").attr("data-type") + "[<span class='blue'>" + obj.find("div[name='game-row'] tbody tr[data-sort='" + json[i][0] + "']").attr("data-name") + "</span>]</td>");
                                table.push("<td class='sw70'><input type='text' class='text-input sw50' name='bh-odds' value='" + json[i][1] + "'></td>");
                                table.push("<td class='sw70'><input type='text' class='text-input sw50' name='bh-rebate' value='" + json[i][2] + "'></td>");
                                table.push("<td class='sw70'><input type='text' class='text-input sw50' name='bh-money' data-max='" + json[i][3] + "' value='" + data_maxjr + "'></td>");
                                table.push("<td class='sw70'><a class='cursor'>刪除</a></td>");
                                table.push("</tr>");
                            }
                            var content = G.overflowDiv({ id: "day-buhuodan-fast", height: 470, content: forceMiddle({ thead: thead, tbody: table }) });
                            G.alert({ title: "快速補貨", content: content, width: 560,
                                initialize: function () {
                                    if (__sysinfo.level > 1) {
                                        $("#day-buhuodan-fast input[name='bh-odds']").attr("disabled", "disabled");
                                        $("#day-buhuodan-fast input[name='bh-rebate']").attr("disabled", "disabled");
                                    }
                                    G.mouseover("#day-buhuodan-fast tbody tr");
                                    $("#day-buhuodan-fast a.cursor").unbind("click").click(function () {
                                        if ($(this).html() == "刪除") {
                                            $(this).parent().parent("tr").find("td").eq(1).addClass("buhuo-del");
                                            $(this).addClass("buhuo-del").html("恢復");
                                        } else {
                                            $(this).parent().parent("tr").find("td").eq(1).removeClass("buhuo-del");
                                            $(this).removeClass("buhuo-del").html("刪除");
                                        }
                                    });
                                },
                                cancel: function () { },
                                ok: function () {
                                    var dataAry = [], my_sort, my_odds, my_rebate, my_money;
                                    $("#day-buhuodan-fast tbody tr[data-sort]").each(function () {
                                        if (G.NumberSign($(this).find("input[name='bh-money']").val()) && !$(this).find("td").eq(1).hasClass("buhuo-del")) {
                                            my_sort = $(this).attr("data-sort");
                                            my_odds = $(this).find("input[name='bh-odds']").val();
                                            my_rebate = $(this).find("input[name='bh-rebate']").val();
                                            my_money = $(this).find("input[name='bh-money']").val();
                                            dataAry.push(my_sort + ":" + my_odds + ":" + my_rebate + ":" + my_money);
                                        }
                                    });
                                    if (dataAry.length > 0 && data_stop) {
                                        data_action[4] = "sortAry=" + dataAry.join(",");
                                        data_stop = false;
                                        G.mask();
                                        G.ajax(data_action.join("&"), function (json) {
                                            G.maskClose();
                                            data_stop = true;
                                            if (json && json.length > 0) {
                                                var thead = ["序號", "玩法", "賠率", "退水", "補貨額", "可贏額", "結果"];
                                                var table = [];
                                                for (var i = 0; i < json.length; i++) {
                                                    table.push("<tr data-sort='" + json[i][0] + "'>");
                                                    table.push("<td class='sw50'>" + (i + 1) + "</td>");
                                                    table.push("<td>" + obj.find("div[name='game-row'] tbody tr[data-sort='" + json[i][0] + "']").attr("data-type") + "[<span class='blue'>" + obj.find("div[name='game-row'] tbody tr[data-sort='" + json[i][0] + "']").attr("data-name") + "</span>]</td>");
                                                    table.push("<td class='sw50 red'>" + json[i][1] + "</td>");
                                                    table.push("<td class='sw50'>" + json[i][2] + "</td>");
                                                    table.push("<td class='sw70'>" + json[i][3] + "</td>");
                                                    table.push("<td class='sw70'>" + json[i][4] + "</td>");
                                                    table.push("<td class='sw50 green'>成功</td>");
                                                    table.push("</tr>");
                                                }
                                                var content = G.overflowDiv({ id: "day-buhuodan-fast", height: 470, content: forceMiddle({ thead: thead, tbody: table }) });
                                                G.alert({ title: "補貨結果", content: content, width: 560,
                                                    initialize: function () {
                                                        G.mouseover("#day-buhuodan-fast tbody tr");
                                                    },
                                                    ok: function () { return true; },
                                                    close: function () { reloadData(); }
                                                });
                                            }
                                        }, function () { G.maskClose(); data_stop = true; });
                                        return true;
                                    }
                                },
                                cancel: function () { }
                            });
                        }
                    }, function () { G.maskClose(); data_stop = true; });
                }
            });
            obj.find("#game-row a.line3").unbind("click").click(function () {
                var data_type = $(this).parents("tr").attr("data-type");
                var data_name = $(this).parents("tr").attr("data-name");
                var data_sort = $(this).parents("tr").attr("data-sort");
                var data_maxjr = $(this).parents("tr").find("td").eq(2).find("span.line4").html();
                var data_txt = $(this).html();
                var data_number = json.openDateList.number;
                var data_action = ["detailsbuhuo", "type=" + type, "gameIndex=" + gameIndex, "number=" + data_number, "sortId=" + data_sort];
                if (!endTime || endTime <= 0) {
                    G.alert({ content: "后台尚未开盘，请在开盘后操作！", ok: function () { return true; } });
                    return false;
                } else if (data_stop && G.NumberSignt(data_txt) && json.detailsList[data_sort][0] != "-") {
                    G.mask();
                    data_stop = false;
                    if ((gameIndex == 1 && type == 6) || ((gameIndex == 2 || gameIndex == 7) && type == 10)) { // 连码补货单
                        data_action[0] = "detailsbuhuolm";
                        G.ajax(data_action.join("&"), function (json) {
                            data_stop = true;
                            G.maskClose(); //:<input type='text' style='height:14px;' class='text-input sw40'>
                            var thead = ["排名", "組合", "賠率", "退水", "補貨額", "派彩額", "<input type='checkbox'>"];
                            var table = [];
                            if (json && json.length > 0) {
                                json.sort(function (x, y) { return y[4] - x[4]; });
                                for (var i = 0; i < json.length; i++) {
                                    table.push("<tr data-sort='" + json[i][0] + "'>");
                                    table.push("<td class='w7'>" + (i + 1) + "</td>");
                                    table.push("<td class='w25'>" + json[i][1] + "</td>"); //组合
                                    table.push("<td class='w15'><input type='text' class='text-input sw50' name='bh-odds' value='" + json[i][2] + "'></td>"); //赔率
                                    table.push("<td class='w15'><input type='text' class='text-input sw50' name='bh-rebate' value='" + json[i][3] + "'></td>"); //退水
                                    table.push("<td class='w15'><input type='text' class='text-input sw50' name='bh-money' data-max='" + json[i][4] + "' value='" + json[i][4] + "'></td>"); //补货
                                    table.push("<td class='w15 red'>" + G.forDight(((parseFloat(json[i][4]) * parseFloat(json[i][2])) - parseFloat(json[i][4])) + ((parseFloat(json[i][3]) / 100) * parseFloat(json[i][4])), 1) + "</td>");
                                    table.push("<td class='w7'><input type='checkbox'></td>");
                                    table.push("</tr>");
                                }
                            }
                            var content = G.overflowDiv({ id: "day-buhuodan-lm", height: 470, content: forceMiddle({ thead: thead, tbody: table }) });
                            G.alert({ title: "補貨單", content: content, width: 720,
                                initialize: function () {
                                    if (__sysinfo.level > 1) {
                                        $("#day-buhuodan-lm input[name='bh-odds']").attr("disabled", "disabled");
                                        $("#day-buhuodan-lm input[name='bh-rebate']").attr("disabled", "disabled");
                                    }
                                    G.mouseover("#day-buhuodan-lm tbody tr");
                                    $("#day-buhuodan-lm thead input[type='checkbox']").unbind("change").change(function () {
                                        var checked = $(this).attr("checked") ? true : false;
                                        if (checked) {
                                            $("#day-buhuodan-lm tbody tr").addClass("qhs");
                                        } else {
                                            $("#day-buhuodan-lm tbody tr").removeClass("qhs");
                                        }
                                        $("#day-buhuodan-lm tbody input[type='checkbox']").attr("checked", checked);
                                    });
                                    $("#day-buhuodan-lm tbody input[type='checkbox']").unbind("change").change(function () {
                                        if ($(this).attr("checked")) {
                                            $(this).parent().parent("tr").addClass("qhs");
                                        } else {
                                            $(this).parent().parent("tr").removeClass("qhs");
                                        }
                                    });
                                    $("#day-buhuodan-lm thead input[type='text']").unbind("keyup").keyup(function () {
                                        $(this).val($(this).val().replace(/[^0-9]/g, ''));
                                        if (G.NumberSign($(this).val()) || $(this).val() == "") {
                                            var data_sort, money_max, bh_money = parseInt($(this).val()) || 0;
                                            $("#day-buhuodan-lm tbody input[name='bh-money']").each(function () {
                                                data_sort = $(this).parent().parent("tr").attr("data-sort");
                                                money_max = parseInt($(this).attr("data-max"));
                                                if (bh_money > money_max) {
                                                    $(this).val(money_max);
                                                } else {
                                                    $(this).val(bh_money);
                                                }
                                                $(this).parent().next("td.red").html(mypaic(data_sort));
                                            });
                                        }
                                    });
                                    $("#day-buhuodan-lm tbody input[name='bh-money']").unbind("keyup").keyup(function () {
                                        $(this).val($(this).val().replace(/[^0-9]/g, ''));
                                        if (G.NumberSign($(this).val()) || $(this).val() == "") {
                                            var data_sort = $(this).parent().parent("tr").attr("data-sort");
                                            var bh_money = parseInt($(this).val()) || 0;
                                            var money_max = parseInt($(this).attr("data-max"));
                                            if (bh_money > money_max) {
                                                $(this).val(money_max);
                                            } else {
                                                $(this).val(bh_money);
                                            }
                                            $(this).parent().next("td.red").html(mypaic(data_sort));
                                        }
                                    });
                                },
                                ok: function () {
                                    var dataAry = [], my_sort, my_odds, my_rebate, my_money;
                                    $("#day-buhuodan-lm tbody tr[data-sort]").each(function () {
                                        if ($(this).find("input[type='checkbox']").attr("checked")) {
                                            my_sort = $(this).attr("data-sort");
                                            my_odds = $(this).find("input[name='bh-odds']").val();
                                            my_rebate = $(this).find("input[name='bh-rebate']").val();
                                            my_money = $(this).find("input[name='bh-money']").val();
                                            dataAry.push(my_sort + ":" + my_odds + ":" + my_rebate + ":" + my_money);
                                        }
                                    });
                                    if (data_stop && dataAry.length > 0) {
                                        G.mask();
                                        G.ajax(data_action.join("&") + "&data=" + dataAry.join(","), function (json) {
                                            data_stop = true;
                                            G.maskClose();
                                            if (json.result == 1) {
                                                G.alert({ content: "補貨成功。",
                                                    ok: function () { return true; },
                                                    close: function () { reloadData(); }
                                                });
                                            } else {
                                                G.alert({ content: json.result, ok: function () { return true; } });
                                            }
                                        }, function () { G.maskClose(); data_stop = true; });
                                        return true;
                                    } else {
                                        alert("請勾選補貨“組合”");
                                    }
                                },
                                cancel: function () { }
                            });

                            //派彩计算
                            function mypaic(data_sort) {
                                var odds = parseFloat($("#day-buhuodan-lm tbody tr[data-sort='" + data_sort + "']").find("input[name='bh-odds']").val()) || 0;
                                var rebate = parseFloat($("#day-buhuodan-lm tbody tr[data-sort='" + data_sort + "']").find("input[name='bh-rebate']").val()) || 0;
                                var money = parseFloat($("#day-buhuodan-lm tbody tr[data-sort='" + data_sort + "']").find("input[name='bh-money']").val()) || 0;
                                return G.forDight(((money * odds) - money) + ((rebate / 100) * money), 1);
                            }

                        }, function () { G.maskClose(); data_stop = true; });
                    } else { //单笔补货单
                        G.ajax(data_action.join("&"), function (json) {
                            data_stop = true;
                            G.maskClose();
                            var table = [];
                            table.push("<tr><td class='bc w40 txt-right'>補貨類型:</td><td class='txt-left'>" + data_type + "</td></tr>");
                            table.push("<tr><td class='bc w40 txt-right'>補貨內容:</td><td class='txt-left'>" + data_name + "</td></tr>");
                            table.push("<tr><td class='bc w40 txt-right'>補貨賠率:</td><td class='txt-left'><input type='text' class='text-input sw70' name='bh-odds'></td></tr>");
                            table.push("<tr><td class='bc w40 txt-right'>實際退水:</td><td class='txt-left'><input type='text' class='text-input sw70' name='bh-rebate'></td></tr>");
                            table.push("<tr><td class='bc w40 txt-right'>補出金額:</td><td class='txt-left'><input type='text' class='text-input sw70' name='bh-money' data-max='' data-min='10'></td></tr>");
                            var content = forceMiddle({ id: "day-buhuodan", tbody: table });
                            G.alert({ title: "補貨單", content: content, width: 220,
                                initialize: function () {
                                    $("#day-buhuodan input[name='bh-money']").focus();
                                    if (__sysinfo.level > 1) {
                                        $("#day-buhuodan input[name='bh-odds']").attr("disabled", "disabled");
                                        $("#day-buhuodan input[name='bh-rebate']").attr("disabled", "disabled");
                                    }
                                    if (json) {
                                        for (var i in json) {
                                            if (i == "bh-money") {
                                                if (G.NumberSign(data_maxjr) && parseInt(data_maxjr) < parseInt(json[i])) {
                                                    $("#day-buhuodan input[name='" + i + "']").val(data_maxjr);
                                                } else {
                                                    $("#day-buhuodan input[name='" + i + "']").val(json[i]);
                                                }
                                                $("#day-buhuodan input[name='" + i + "']").attr("data-max", json[i]);
                                            } else {
                                                $("#day-buhuodan input[name='" + i + "']").val(json[i]);
                                            }
                                        }
                                    }
                                },
                                ok: function () {
                                    var odds = $("#day-buhuodan input[name='bh-odds']").val();
                                    var rebate = $("#day-buhuodan input[name='bh-rebate']").val();
                                    var money = parseInt($("#day-buhuodan input[name='bh-money']").val());
                                    var money_min = parseInt($("#day-buhuodan input[name='bh-money']").attr("data-min"));
                                    var money_max = parseInt($("#day-buhuodan input[name='bh-money']").attr("data-max"));
                                    if (!G.NumberSign(money)) {
                                        G.myTips({ content: "請輸入有效的補貨金額！", obj: $("#day-buhuodan input[name='bh-money']"), myclick: true });
                                        return false;
                                    } else if (money < money_min) {
                                        G.myTips({ content: "最低起補金額：" + money_min, obj: $("#day-buhuodan input[name='bh-money']"), myclick: true });
                                        return false;
                                    } else if (money > money_max && __sysinfo.level > 1) {
                                        G.myTips({ content: "補貨金額必須小於實際占成額度：" + money_max, obj: $("#day-buhuodan input[name='bh-money']"), myclick: true });
                                        return false;
                                    } else if (data_stop) {
                                        var data = odds + ":" + rebate + ":" + money;
                                        var data_action = ["detailsbuhuo", "type=" + type, "gameIndex=" + gameIndex, "number=" + data_number, "sortId=" + data_sort, "data=" + data];
                                        G.mask();
                                        data_stop = false;
                                        G.ajax(data_action.join("&"), function (json) {
                                            data_stop = true;
                                            G.maskClose();
                                            if (json.result == 1) {
                                                var thead = ["補貨類型", "賠率", "金額", "退水", "可贏", "結果"];
                                                table = [];
                                                table.push("<tr>");
                                                table.push("<td>" + data_type + "『<span class='blue'>" + data_name + "</span>』</td>");
                                                table.push("<td><span class='red'>" + odds + "</span></td>");
                                                table.push("<td>" + money + "</td>");
                                                table.push("<td>" + rebate + "</td>");
                                                table.push("<td>" + G.forDight(((parseFloat(money) * parseFloat(odds)) - parseFloat(money)) + parseFloat(rebate), 1) + "</td>");
                                                table.push("<td class='green'>補貨成功</td>");
                                                table.push("</tr>");
                                                content = forceMiddle({ thead: thead, tbody: table });
                                                G.alert({ title: "補貨明細", content: content, width: 570,
                                                    ok: function () { return true; },
                                                    close: function () { reloadData(); }
                                                });
                                            }
                                        }, function () { G.maskClose(); data_stop = true; });
                                    }
                                    return true;
                                },
                                cancel: function () { }
                            });
                        }, function () { G.maskClose(); data_stop = true; });
                    }
                }
            });
        }

        //注单明细
        obj.find("#game-row a.line2").unbind("click").click(function () {
            if (json.openDateList.number && data_stop) {
                G.mask();
                data_stop = false;
                var data_sort = $(this).parents("tr").attr("data-sort");
                var data_rebate = shell.find("#rebate").val();
                var data_action = ["daydetails", "gameIndex=" + gameIndex, "type=" + type, "number=" + json.openDateList.number, "sortId=" + data_sort, "rebate=" + data_rebate];
                G.ajax(data_action.join("&"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    var thead = ["註單號", "下註會員", "玩法", "盤口/賠率", "下註金額", "退水(%)"];
                    if (__sysinfo.level <= 5) { thead.push("代理"); }
                    if (__sysinfo.level <= 4) { thead.push("總代理"); }
                    if (__sysinfo.level <= 3) { thead.push("股東"); }
                    if (__sysinfo.level <= 2) { thead.push("分公司"); }
                    if (__sysinfo.level <= 1) { thead.push("總監"); }
                    thead.push("占成收入");
                    var table = [], txt_right;
                    for (var i = 0; i < json.length; i++) {
                        table.push("<tr>");
                        for (var n = 0; n < json[i].length; n++) {
                            txt_right = n >= 4 ? "txt-right" : "";
                            table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                        }
                        table.push("</tr>");
                    }
                    var content = G.overflowDiv({ id: "day-details", height: 570, content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
                    var generatedCount = 1;
                    G.alert({ title: "註單明細", content: content, width: 930,
                        initialize: function () {
                            $("#day-details #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + data_action.join("&"), paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                                appendHtm();
                            });
                            function appendHtm() {
                                G.myLayerImg();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax(my_action, function (json) {
                                    G.myLayerImgClose();
                                    if (json && json.length > 0) {
                                        table = [];
                                        for (var i = 0; i < json.length; i++) {
                                            table.push("<tr>");
                                            for (var n = 0; n < json[i].length; n++) {
                                                txt_right = n >= 4 ? "txt-right" : "";
                                                table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#day-details tbody").append(table.join(""));
                                    } else {
                                        $("#day-details #fondiv").find("a").hide();
                                        $("#day-details #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () {

                            return true;
                        }
                    });
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

        //全部封盘状态
        G.mouseover(obj.find("div[name='game-row'] tbody tr"));
        if (!G.NumberSign(endTime) && !G.NumberSign(lotteryTime) || (endTime == 0 && lotteryTime == 0)) {
            obj.find("#game-row tbody tr").attr("style", "background: none repeat scroll 0% 0% rgb(230, 230, 230)");
            $("#autoRefresh").html(timeValue + "秒");

            checkgamedatatime = setTimeout(function () { reloadData(); }, 10000);

            return false;
        } else if (endTime <= 0) {
            shell.find("span[name='endTime']").html("00:00");
            obj.find("#game-row tbody tr").attr("style", "background: none repeat scroll 0% 0% rgb(230, 230, 230)");
        } else {
            obj.find("#game-row tbody tr").removeAttr("style");
        }

        //倒计时函数
        S.intervalTime = setInterval(function () {
            if (closeTime > 0) {
                closeTime--;
                shell.find("span[name='closeTime']").html(G.settimes(closeTime));
            } else {
                shell.find("span[name='closeTime']").html("加載中...");
                timeValue = 0;
            }

            timeValue--;
            if (timeValue <= 0) {
                O.title = $("#shell_title").html();
                $("#autoRefresh").html("load...");
                clearInterval(S.intervalTime);
                setTimeout(function () { reloadData(); }, 1000);
            } else {
                $("#autoRefresh").html(timeValue + "秒");
            }
        }, 1000);

        obj.find("tr[data-sort] input[type='radio']").unbind("click").click(function () {
            reloadData();
        });

        //重新加载数据
        function reloadData() {
            var action = [
                "gamedata",
                "gameIndex=" + gameIndex,
                "type=" + shell.find("#type").val(),
                "timeValue=" + shell.find("#timeValue").val(),
                "huoStatus=" + shell.find("#huoStatus").val(),
                "rebate=" + shell.find("#rebate").val(),
                "isCL=1",
                "reload=true"
            ];
            if (gameIndex == 1 && type == 6) {
                var sortId = obj.find("tr[data-sort] input[type='radio']:checked").val() || -1;
                action.push("sortId=" + sortId);
            }
            middleBind({ data_action: action.join("&") });
        }

    }, function () {
        if (isCl == null) { G.rollBack(); }
    });
}

function appenGameData(msg) {
    var gameIndex = msg.gameIndex;
    var type = msg.type;
    var reload = msg.reload;
    var myId = ["game", gameIndex, type].join("_");
    if (!reload) {
        var table = eval(myId + '()');

        closeMiddleAll(null, true);
        var shell = $("#shell_top");
        shell.addClass("shell-top-game");
        shell.find(".shell-top-left").addClass("shell-top-left-game");
        shell.find(".shell-top-right").addClass("shell-top-right-game");
        shell.find(".shell-title-icon").addClass("shell-title-icon-game");

        //右侧条件选择，包括总监赔率调整选择
        var myobj = gettype(gameIndex, type);
        shell.append("<div id='game-seet'>" + gameTitle(myobj.op, myobj.vtype) + "</div>");
        var mytitle = "<table style='width:100%;' border='0' cellpadding='0' cellspacing='0'>"
        + "<tr>"
        + "<td style='width:370px;height:15px;'><span class='bold' id='mytype'></span> 【第<span class='bold green' name='number'></span>期】</td>"
        + "<td>第<span class='bold blue' name='newnumber'></span>期賽果:</td>"
        + "</tr>"
        + "<tr>"
        + "<td style='height:35px;'><span name='closeTime-txt'>距封盤：</span><span class='bold' name='closeTime'>00:00</span>&nbsp;&nbsp;&nbsp;&nbsp;今天輸贏：<span class='bold red' name='win'>0</span></td>"
        + "<td><span name='numList' style='height:30px;overflow:hidden;display:inline-block;'></span></td>"
        + "</tr>"
        + "</table>";
        $("#shell_title").html(mytitle);
        $("#mytype").html(myobj.type);
        if ($("#middleContent #" + myId).length == 0) {
            table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
            $("#middleContent").append(table).show();
        } else {
            $("#middleContent #" + myId).show();
        }
    }
    return $("#" + myId);
}
function gameTitle(optAry, vtype) {
    var op = optAry.join("");
    var _vtype = vtype;
    var title = "<table style='width:100%;' border='0' cellpadding='0' cellspacing='0'>"
        + "<tr>"
        + "<td style='height:15px;' id='selcheng'>"
        + "更新：<select id='timeValue'><option value='10'>10秒</option><option value='20'>20秒</option><option value='30' selected=''>30秒</option></select>"
        + "<select id='myGameSort' class='hiden'><option value='0'>按虧損排列</option><option value='1'>按球號排列</option></select>"
        + "<select id='type'>" + _vtype + "</select>"
        + "<select id='huoStatus'><option value='1' selected=''>實占</option><option value='0'>虛貨</option></select>"
        + "<select id='rebate'><option value='0'>全部</option><option value='1'>A盤</option><option value='2'>B盤</option><option value='3'>C盤</option></select>"
        + "&nbsp;<span><span id='autoRefresh'>20秒</span>后更新數據</span>"
        + "</td>"
        + "</tr>"
        + "<tr id='setAll-game' class='hidden'>"
        + "<td style='height:30px;'>"
        + "<select id='upodds'><option value='0.001'>0.001</option><option value='0.003'>0.003</option><option value='0.005'>0.005</option><option value='0.01' selected=''>0.01</option><option value='0.03'>0.03</option><option value='0.05'>0.05</option><option value='0.1'>0.1</option><option value='0.3'>0.3</option><option value='0.5'>0.5</option><option value='1'>1</option><option value='3'>3</option><option value='5'>5</option></select>"
        + "<select id='odds_k'><option value='-1'>全部</option>" + op + "</select>"
        + "&nbsp;<input type='button' name='up' value='升賠'>"
        + "&nbsp;<input type='button' name='down' value='降賠'>"
        + "&nbsp;<input type='button' name='close' value='快速封盤'>"
        + "&nbsp;<input type='button' name='open' value='快速開盤'>"
        + "</td>"
        + "</tr>"
        + "</table>";
    return title;
}
function gettype(gameIndex, typeid) {
    if (gameIndex == "1") {
        if (typeid <= 3) {
            return { 
                type: "特碼",
                vtype: "<option value='1'>特碼A</option><option value='2'>特碼B</option><option value='3' selected=''>特碼AB</option>",
                op: getop()
            };
        } else if (typeid == 4) {
            return {
                type: "色波、特肖、頭尾數、五行",
                vtype: "<option value='4' selected=''>全部</option>",
                op: []
            };
        } else if (typeid == 6) {
            return {
                type: "合肖",
                vtype: "<option value='6' selected=''>合肖</option>",
                op: []
            };
        } else if (typeid == 8 || typeid == 88 || typeid == 808) {
            return {
                type: "正碼、總和",
                vtype: "<option value='808'>正碼AB</option><option value='8' selected=''>正碼A</option><option value='88'>正碼B</option>",
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
                type: "一肖尾數",
                vtype: "<option value='16' selected=''>一肖、尾數</option>",
                op: []
            };
        } else if (typeid == 17) {
            return {
                type: "正肖、總肖、七色波",
                vtype: "<option value='17' selected=''>正肖、總肖、七色波</option>",
                op: []
            };
        } else if (typeid == 18 || typeid == 181 || typeid == 182 || typeid == 183 || typeid == 184 || typeid == 185) {
            return {
                type: "不中",
                vtype: "<option value='18' selected=''>五不中</option><option value='181' selected=''>六不中</option><option value='182' selected=''>七不中</option><option value='183' selected=''>八不中</option><option value='184' selected=''>九不中</option><option value='185' selected=''>十不中</option>",
                op: getop()
            };
        } else if (typeid >= 19 && typeid <= 21 || typeid == 212) {
            return {
                type: "生肖連",
                vtype: "<option value='19' selected=''>生肖連</option>",
                op: []
            };
        } else if (typeid >= 22 && typeid <= 24) {
            return {
                type: "尾數連",
                vtype: "<option value='22' selected=''>尾數連</option>",
                op: []
            };
        } else if (typeid >= 28 && typeid <= 33) {
            return {
                type: "連碼",
                vtype: "<option value='28' selected=''>二全中</option><option value='29'>三全中</option><option value='30'>三中二</option><option value='31'>二中特</option><option value='32'>特串</option><option value='33'>四全中</option>",
                op: getop()
            };
        } else if (typeid == 1828) {
            return {
                type: "特碼總匯",
                vtype: "<option value='1828' selected=''>特碼總匯</option>",
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
    } else if (gameIndex == "4" || gameIndex == "8" || gameIndex == "14") {
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
        } else if (typeid == 4) {
            return {
                type: "1~10名總匯",
                vtype: "<option value='4' selected=''>全部</option>",
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
    } else if (gameIndex == "11") {

    } else if (gameIndex == "12") {

    } else if (gameIndex == "13") {

        return {
            type: "總項盤口",
            vtype: "<option value='1' selected=''>總項盤口</option>",
            op: []
        };

        //if (typeid == 1) {
        //    return {
        //        type: "一字、一定位",
        //        vtype: "<option value='1' selected=''>一字、一定位</option>",
        //        op: []
        //    };
        //} else if (typeid == 2) {
        //    return {
        //        type: "二字",
        //        vtype: "<option value='2' selected=''>二字</option>",
        //        op: []
        //    };
        //} else if (typeid >= 3 && typeid <= 5) {
        //    return {
        //        type: "三字",
        //        vtype: "<option value='3' selected=''>000~248</option><option value='4'>249~999</option>",
        //        op: []
        //    };
        //} else if (typeid >= 6 && typeid <= 11) {
        //    return {
        //        type: "四字",
        //        vtype: "<option value='6' selected=''>0000~0248</option><option value='7'>0249~1135</option><option value='8'>1136~1577</option><option value='9'>1578~2577</option><option value='10'>2578~4459</option><option value='11'>4466~9999</option>",
        //        op: []
        //    };
        //} else if (typeid >= 12 && typeid <= 17) {
        //    return {
        //        type: "二定位",
        //        vtype: "<option value='12' selected=''>千百定</option><option value='13'>千拾定</option><option value='14'>千个定</option><option value='15'>百拾定</option><option value='16'>百个定</option><option value='17'>拾个定</option>",
        //        op: []
        //    };
        //}
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
    ];
}

