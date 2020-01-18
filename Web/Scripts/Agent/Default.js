$(function () {
    $("#myRoleName").html(__sysinfo.myRoleName);
    //账号是否冻结状态
    if (__sysinfo.state === 1) {
        G.alert({ content: "您的賬號已凍結！",
            ok: function () {
                return true;
            }
        });
    }

    //初始化事件
    navListBoxSwitch();
    onlineandnews();
    setInterval(function () { onlineandnews(); }, 1000 * 20); //秒计算

    //变动赔率滚动
    setInterval(function () {
        $("#scrollDiv").find("ul:first").animate({
            marginTop: "-22px"
        }, 350, function () {
            $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
        });
    }, 1000 * 5);

    //初始模板样式
    var _defaultSkin = G.getCookie("skin") || "Green";
    $("body").removeClass().addClass("skin" + _defaultSkin);
    $("#skinBox a[data-skin='" + _defaultSkin + "']").addClass("active");

    //切换模板
    $("#skinBox a").unbind("click").click(function () {
        var skin = $(this).attr("data-skin").replace("skin", "");
        G.setCookie("skin", skin);
        $("body").removeClass().addClass("skin" + skin);
        $(this).addClass("active").siblings().removeClass("active");
    });

    //开奖声音
    $("#voice").unbind("click").click(function () {
        if ($(this).attr("class").indexOf("off") === -1) {
            $(this).addClass("off");
            __sysinfo.voice = 0;
        } else {
            $(this).removeClass("off");
            __sysinfo.voice = 1;
        }
    });

    //彩种事件处理
    $("#gameAll").unbind("mouseenter").mouseenter(function () {
        $("#gameList").show();
        $(this).find("b").css("display", "block");
        $(this).find("i").css("display", "none");
    });
    $("#gameAll").unbind("mouseleave").mouseleave(function () {
        $("#gameList").hide();
        $(this).find("i").css("display", "block");
        $(this).find("b").css("display", "none");
    });

    //选择彩种触发
    $("#gameList a").unbind("click").click(function () {
        var gameIndex = $(this).attr("data-index");
        var gameDefaultStr = $(this).html();
        var data_text = $("#gameDefault").attr("data-text");
        $("#gameDefault").html(gameDefaultStr).attr("data-text", gameIndex);
        $("#gameList").css("display", "none");
        var action = $("#navListBox a.onBtn").attr("action");
        if (gameIndex != data_text && $("#menuUl li[data-action]").attr("data-action") === "immediate") {
            var data_action = gameIndex;
            var objAry = __sysinfo.gameRows;
            $("#menuUl li").removeClass("on");
            $("#menuUl li[data-action='immediate']").addClass("on");
            addEnd(data_action, objAry);
            navListBoxSwitch();
            data_action = $("#navListBox a:eq(0)").addClass("onBtn").attr("data-action");
            middleBind({ data_action: data_action });
        }
    });

    //一级导航切换
    $("#menuUl li").unbind("click").click(function () {
        if (S.stop) {
            var data_action = $(this).attr("data-action");
            if (data_action === "out") {
                G.alert({ content: "確認退出系統嗎？",
                    ok: function () {
                        location.href = location.href + "?t=" + __sysinfo.autoTid;
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_action === "lineching") {
                var table = ["<div id='lineching'><table class='middle-table'><tbody>"];
                for (var i = 0; i < __sysinfo.ipJoin.length; i++) {
                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>線路" + (i + 1) + ":</td><td class='txt-left'><input type='text' class='text-input sw120' disabled='disabled' value='响应時間:測速中'> <input type='radio' style='vertical-align:middle' name='radio' value='" + __sysinfo.ipJoin[i] + "'></td>");
                    table.push("</tr>");
                }
                table.push("</tbody></table></div>");
                var content = table.join("");
                G.alert({ title: "切換線路", content: content, width: 220, cancelVal: "測速",
                    initialize: function () {
                        SelectBoxSet(0);
                    },
                    ok: function () {
                        if (S.lineStop) {
                            var urlval = $("#lineching input[type='radio']:checked").val();
                            if (urlval) {
                                G.mask();
                                urlval = urlval + "Agent/?autoTid=" + __sysinfo.autoTid;
                                location.href = urlval;
                                return true;
                            }
                        }
                    },
                    cancel: function () {
                        if (S.lineStop) {
                            SelectBoxSet(0);
                        }
                        return true;
                    }
                });
            } else {
                var objAry, data_action;
                if (data_action === "immediate") {
                    data_action = $("#gameDefault").attr("data-text");
                    objAry = __sysinfo.gameRows;
                } else {
                    data_action = $(this).attr("data-action");
                    objAry = __sysinfo.navList;
                }
                $("#menuUl li").removeClass("on");
                $(this).addClass("on");
                addEnd(data_action, objAry);
                navListBoxSwitch();
                data_action = $("#navListBox a:eq(0)").addClass("onBtn").attr("data-action");
                middleBind({ data_action: data_action });
            }
        }
    });
    //二级导航切换
    function navListBoxSwitch() {
        $("#navListBox a").unbind("click").click(function () {
            if (S.stop) {
                $("#navListBox a.onBtn").removeClass("onBtn");
                $(this).addClass("onBtn");
                middleBind({ data_action: $(this).attr("data-action") });
            }
        });
    }

    $(".skinTb").mouseover(function () {
        $("#skinBox").show();
    }).mouseout(function () {
        $("#skinBox").hide();
        });
    $("#menuUl li[data-action='8']").addClass("on");
});

//绑定模块
function middleBind(msg) {
    if (msg.data_action && S.stop) {
        S.stop = false;
        if (S.request) { //中断AJAX连接
            S.request.abort();
        }
        if (S.intervalTime) { //关闭setInterval
            clearInterval(S.intervalTime);
        }
        $("#navListBox").show();
        $("#btn-back").remove();
        if (G.query("black", "?" + msg.data_action) == 1) {//創建返回控件
            $("#shell_top").append("<span id='btn-back' title='返回' class='btn-back btn-icon'>返回</span>");
            if (S.backList.length > 0) { //返回上一頁
                $("#shell_top #btn-back").unbind("click").click(function () {
                    var referrer = S.backList.shift();
                    middleBind({ data_action: referrer });
                });
            }
        } else {
            S.backList = [];  //移除前導頁數據
        }

        //加载模块
        var actionAry = msg.data_action.split("&");
        if ((G.isAction({ key: "result", ary: actionAry }) || G.isAction({ key: "openbak", ary: actionAry }) || G.isAction({ key: "myinfo", ary: actionAry }) || G.isAction({ key: "shipments", ary: actionAry }) || G.isAction({ key: "lottery", ary: actionAry }) || G.isAction({ key: "opnum", ary: actionAry }) || G.isAction({ key: "setodds", ary: actionAry }) || G.isAction({ key: "autoodds", ary: actionAry }) || G.isAction({ key: "lmautoodds", ary: actionAry })) && !G.query("gameIndex", "?" + msg.data_action)) {
            if (msg.data_action == "shipments") {
                msg.data_action = msg.data_action + "&gameIndex=0";
            } else {
                msg.data_action = msg.data_action + "&gameIndex=" + $("#gameDefault").attr("data-text");
            }
        }
        try {
            eval(actionAry[0] + '({data_action: msg.data_action})');
        } catch (e) { }
        S.intervalTime = setTimeout(function () { S.stop = true; }, 700);
    }
}

function closeMiddleAll(closePage, closeTitle) {
    var shell = $("#shell_top");
    shell.removeClass("shell-top-game");
    shell.find(".shell-top-left").removeClass("shell-top-left-game");
    shell.find(".shell-top-right").removeClass("shell-top-right-game");
    shell.find(".shell-title-icon").removeClass("shell-title-icon-game");
    $("#game-seet").remove();
    $("#title-nav").remove();
    $(".shell-title-icon").removeAttr("style");
    $("#middleContent .acion").hide();
    if (!closePage) {
        $("#data-page").remove();
    }
    if (!closeTitle) {
        $("#shell_title").html("");
    }
}

//在线人数、最新公告
function onlineandnews() {
    G.ajax("onlineandnews", function (json) {
        if (json) {
            for (var i in json) {
                if (i != "list") {
                    $("#" + i).html(json[i]);
                } else if (json[i].length > 0) {
                    var list = [];
                    for (var n = 0; n < json[i].length; n++) {
                        list.push("<li>" + json[i][n] + "</li>");
                    }
                    $("#autoOddsList").html(list.join(""));
                }
            }
        }
    });
}

//连码查询单组明细
function myLmAction(id) {
    if (S.stop) {
        S.stop = false;
        G.mask();
        if (S.request) { //中断AJAX连接
            S.request.abort();
        }
        S.request = G.ajax("lmaction&id=" + id, function (json) {
            G.maskClose();
            var thead = ["單組明細", "賠率", "金額", "退水", "結果"];
            var table = [], txt_right;
            if (json && json.length > 0) {
                for (var i = 0; i < json.length; i++) {
                    table.push("<tr>");
                    for (var n = 0; n < json[i].length; n++) {
                        txt_right = n >= 2 ? "txt-right" : "";
                        table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                    }
                    table.push("</tr>");
                }
            }
            var content = G.overflowDiv({ id: "lm-action", content: forceMiddle({ thead: thead, tbody: table }) });
            G.alert({ title: "單組明細", content: content, width: 450, ok: function () { return true; } });

        }, function () { G.maskClose(); });
        S.intervalTime = setTimeout(function () { S.stop = true; }, 700);
    }
}