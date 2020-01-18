$(function () {
    //初始模板样式
    var defaultSkin = G.getCookie("skin") || "Blue";
    $("#skinBox a[data-skin='" + defaultSkin + "']").addClass("on");
    _setSkin(defaultSkin);
    //切換模板
    $("#skinChange").mouseover(function () {
        $(this).unbind("mouseout");
        $(this).find("#skinBox a").unbind("click");
        $(this).find("#skinBox").addClass("active");
        $(this).find("#skinBox a").click(function () {
            var skin = $(this).attr("data-skin");
            _setSkin(skin);
            G.setCookie("skin", skin);
            $("#skinBox a").removeClass("on");
            $(this).addClass("on");
            $("#skinBox").removeClass("active");
        });
        $(this).mouseout(function () {
            $(this).find("#skinBox").removeClass("active");
        });
    });
    function _setSkin(skin) {
        var skinClass = skin == "Violet" ? "Yellow" : skin;
        $("#skinClass").attr("href", "/skin/member" + skin + ".css");
    }
    //开奖声音
    $("#soundSwitch").unbind("click").click(function () {
        var myClass = $(this).attr("class");
        $(this).removeClass();
        if (myClass == "lbOn") {
            $(this).addClass("lbOff");
            __sysinfo.voice = 0;
        } else {
            $(this).addClass("lbOn");
            __sysinfo.voice = 1;
        }
    });
    //最新開獎顯示或隱藏
    $("#look_history").unbind("click").click(function () {
        if ($("#history").html().length > 50) {
            if ($(this).attr("class").indexOf("active") == -1) {
                $(this).addClass("active");
                $(".history_wrap").animate({ "height": "+=165px" });
            } else {
                $(this).removeClass("active");
                $(".history_wrap").animate({ "height": "-=165px" });
            }
        }
    });
    //rightBox事件
    $(".rightBox div.left li").unbind("click").click(function () {
        $(".rightBox div.left li").removeClass("active");
        $(".rightBox div.right ul").removeClass("active");
        $(this).addClass("active");
        var name = $(this).attr("name");
        $("#" + name).addClass("active");
    });
    //快捷下注金額
    $("#tool_ys_wrap input[type='text']").focus(function () {
        $(this).val("");
    });
    $("#tool_ys_wrap input[type='text']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        /*if ($(this).attr("id") == "tool_ys_input") {
        $("#gameBox input.check").val($(this).val()); //改变下注金额盘
        }*/
    });
    $("#tool_ys_wrap span a").unbind("click").click(function () {
        var val = $(this).html();
        var mycheck = $("#gameBox input.check");
        $("#tool_ys_input").val(val);
        mycheck.each(function () {
            if ($(this).val() == "") {
                $(this).val(val);
            }
        });
    });
    $("#tool_ys_wrap em b").unbind("click").click(function () {
        var ary = [];
        $("#tool_ys_wrap span a").each(function (i) {
            ary[i] = $(this).html();
        });
        $("#tool_ys_wrap em strong input[type='text']").each(function (i) {
            $(this).val(ary[i]);
        });
        $("#tool_ys_wrap em strong").css("display", "block");
    });
    $("#tool_ys_wrap em strong input[type='button']").unbind("click").click(function () {
        var ary = [];
        $("#tool_ys_wrap em strong input[type='text']").each(function (i) {
            ary[i] = $(this).val();
        });
        $("#tool_ys_wrap span a").each(function (i) {
            $(this).html(ary[i]);
        });
        $("#tool_ys_wrap em strong").css("display", "none");
    });
    //navText事件
    $("#navText a").unbind("click").click(function () {
        var data_title = $(this).find("span").html();
        if ($(this).attr("id") == "quit") {
            G.alert({ content: "確定退出系統嗎？",
                ok: function () {
                    location = "/Member/Login/?t=" + __sysinfo.autoTid;
                    return true;
                },
                cancel: function () { }
            });
        } else if ($(this).attr("id") == "lineching") {
            var table = ["<div id='result'><div id='lineching' class='history_wrap'><table class='infoList'><tbody>"];
            for (var i = 0; i < __sysinfo.data.ipJson.length; i++) {
                table.push("<tr>");
                table.push("<td style='width:40px;height:30px;' class='bcg'>線路" + (i + 1) + ":</td><td style='height:30px;text-align:left;'><input type='text' class='input' style='width:120px;height:14px;' disabled='disabled' value='响应時間:測速中'> <input type='radio' style='vertical-align:middle' name='radio' value='" + __sysinfo.data.ipJson[i] + "'></td>");
                table.push("</tr>");
            }
            table.push("</tbody></table></div></div>");
            var content = table.join("");
            G.alert({ title: "切換線路", content: content, width: 230, cancelVal: "測速",
                initialize: function () {
                    SelectBoxSet(0);
                },
                ok: function () {
                    if (S.lineStop) {
                        var urlval = $("#lineching input[type='radio']:checked").val();
                        if (urlval) {
                            G.mask();
                            urlval = urlval + "Member/?autoTid=" + __sysinfo.autoTid;
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
            var data_mesg = $(this).attr("data-mesg");
            if (data_mesg === "Introduction") {
                G.mask();
                $.ajax({
                    type: "get",
                    url: "/Member/Introduction.htm",
                    cache: true,
                    dataType: 'text',
                    data: null,
                    success: function (text) {
                        G.maskClose();
                        G.alert({ title: data_title, content: text, width: 820, height: 680,
                            initialize: function () {
                                var titleNavAry = ["<select data-id='gameIndex'>"];
                                $("#menuList li a").each(function () {
                                    titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
                                });
                                titleNavAry.push("</select>");
                                $("#introduction .MenuBox2 label").html(titleNavAry.join(""));
                                var data_index = $("#menuText").attr("data-index");
                                $("#introduction #conNode_" + data_index).show();
                                $("#introduction select[data-id='gameIndex']").val(data_index).unbind("change").change(function () {
                                    $("#introduction .contentNode").hide();
                                    $("#introduction #conNode_" + $(this).val()).show();
                                });
                            },
                            ok: function () { return true; }
                        });
                    }, error: function () { G.maskClose(); }
                });
            } else {
                //加载模块
                var actionAry = data_mesg.split("&");
                var data_action = data_mesg;
                if ((G.isAction({ key: "Result", ary: actionAry }) || G.isAction({ key: "UserInfo", ary: actionAry })) && !G.query("gameIndex", "?" + data_action)) {
                    data_action = data_action + "&gameIndex=" + $("#menuText").attr("data-index");
                }
                try {
                    eval(actionAry[0] + '({data_action: data_action})');
                } catch (e) { }
            }
        }
    });


    $("#ppurl a").click(function () {

        var data_mesg = $(this).attr("data-mesg");

        if (data_mesg == "Tx1") {

            YuETiXian("");

        } else if (data_mesg == "Status1") {
            UserRecharge("");
        } else if (data_mesg == "Pay2") {
            ChongZhi("");
        }
    });



    S.loginDefautl = "/Member/Login/?e=" + +new Date();
    //初始化页面信息
    G.ajax("membergamedefault", function (json) {
        __sysinfo.data = json;
        if (json) {
            $("#userName").html(json.userName);
            $("#creditSpan").html(json.credits);
            $("#usableCreditSpan").html(json.ky);
            if (json.state) {
                $("#state").html("(" + json.state + ")");
            }
            //可选彩种列表
            var len = 0, data_menuList = [], data_ary;
            for (var i in json.gameList) {
                data_ary = getSwitch(i);
                if (len == 0) { //默认彩种
                    $("#menuText").attr("data-index", data_ary[1]).find("span").html(data_ary[0]);
                    S.loadingWrap = true;
                    gametop(data_ary[1], true); //加载彩种玩法盘
                }
                
                data_menuList.push("<li><a href='javascript:void(0)' data-index='" + data_ary[1] + "'>" + data_ary[0] + "</a></li>");
                len++;
            }
            $("#menuList").html(data_menuList.join(""));
            gamechangeevent();
        }
    });
});

//彩种事件
function gamechangeevent() {
    //彩種選項
    $(".menu").mouseenter(function () {
        $(this).find("div").show();
    });
    $(".menu").mouseleave(function () {
        $(this).find("div").hide();
    });
    $("#menuList a").click(function () {
        var gameIndex = $(this).attr("data-index");
        var data_txt = $(this).html();
        var defaultIndex = $("#menuText").attr("data-index");
        $("#menuText").attr("data-index", gameIndex).find("span").html(data_txt);
        $(".menu").find("div").hide();
        if (defaultIndex != gameIndex) {
            S.loadingWrap = true;
            gametop(gameIndex, true);
        }
    });
}

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
        if (S.intervalOpenTime) {
            clearInterval(S.intervalOpenTime);
        }

        //加载模块
        var actionAry = msg.data_action.split("&");
        if ((G.isAction({ key: "Result", ary: actionAry }) || G.isAction({ key: "UserInfo", ary: actionAry })) && !G.query("gameIndex", "?" + msg.data_action)) {
            msg.data_action = msg.data_action + "&gameIndex=" + $("#menuText").attr("data-index");
        }
        try {
            eval(actionAry[0] + '({data_action: msg.data_action})');
        } catch (e) { }
        S.intervalTime = setTimeout(function () { S.stop = true; }, 700);
    }
}

function getSwitch(i) {
    var ary = [];
    switch (i) {
        case "1":
            ary[0] = "香港樂透(HK)";
            ary[1] = "1";
            break;
        case "2":
            ary[0] = "廣東快樂十分";
            ary[1] = "2";
            break;
        case "3":
            ary[0] = "重慶時時彩";
            ary[1] = "3";
            break;
        case "15":
            ary[0] = "极速時時彩";
            ary[1] = "15";
            break;
        case "4":
            ary[0] = "北京賽車(PK10)";
            ary[1] = "4";
            break;
        case "14":
            ary[0] = "极速賽車";
            ary[1] = "14";
            break;
        case "5":
            ary[0] = "江蘇骰寶(快3)";
            ary[1] = "5";
            break;
        case "6":
            ary[0] = "北京快乐8";
            ary[1] = "6";
            break;
        case "7":
            ary[0] = "重慶幸運農場";
            ary[1] = "7";
            break;
        case "8":
            ary[0] = "幸運飛艇";
            ary[1] = "8";
            break;
        case "10":
            ary[0] = "廣西快樂十分";
            ary[1] = "10";
            break;
        case "13":
            ary[0] = "广西快3";
            ary[1] = "13";
            break;
    }
    return ary;
}

function GameHall(msg) {
    var content = "<iframe id='hallIframe' src='/member/GameHall.aspx' width='100%' height='100%' allowtransparency='yes' frameborder='no' scrolling='no'></iframe>";
    G.alert({ title: "遊戲大廳", content: content, width: 300, height: 200 });
}

//历史开奖
function Result(msg) {
    G.mask();
    G.ajax(msg.data_action, function (json) {
        G.maskClose();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        var data_thead, data_width, data_table = ["<div id='result'>"];
        data_table.push("<div class='MenuBox2'><label></label></div>");
        data_table.push("<div class='history_wrap MenuPadding-top'>");
        switch (gameIndex) {
            case 1: //香港HK
                data_width = 910;
                data_thead = "<tr><th class='w12'>期數日期</th><th>開獎號碼</th><th colspan='3'>總和</th><th>7色波</th><th colspan='6'>特碼兩面</th></tr>";
                break;
            case 7:
            case 2: //广东快乐十分
                data_width = 690;
                data_thead = "<tr><th class='w15'>期數日期</th><th>開獎號碼</th><th colspan='4'>總和</th><th colspan='4'>1-4龍虎</th></tr>";
                break;
            case 15:
            case 3: //重庆时时彩
                data_width = 780;
                data_thead = "<tr><th class='w15'>期數日期</th><th>開獎號碼</th><th colspan='3'>總和</th><th>龍虎</th><th>前三</th><th>中三</th><th>后三</th></tr>";
                break;
            case 4:
            case 8: //北京赛车PK10
            case 14: //极速赛车
                data_width = 750;
                data_thead = "<tr><th class='w15'>期數日期</th><th>開獎號碼</th><th colspan='3'>冠亞軍和</th><th colspan='5'>1~5龍虎</th></tr>";
                break;
            case 5: //江苏快3
                data_width = 320;
                data_thead = "<tr><th>期數日期</th><th>開獎號碼</th><th colspan='2'>總和</th></tr>";
                break;
            case 6: //北京快乐8
                data_width = 970;
                data_thead = "<tr><th class='w10'>期數日期</th><th>開獎號碼</th><th colspan='4'>總和</th><th colspan='2'>比數量</th></tr>";
                break;
            case 10: //广西快乐十分
                data_width = 500;
                data_thead = "<tr><th class='w25'>期數日期</th><th>開獎號碼</th><th colspan='4'>總和</th><th>龍虎</th></tr>";
                break;
            case 13: //广西快3
                data_width = 320;
                data_thead = "<tr><th>期數日期</th><th>開獎號碼</th><th colspan='2'>總和</th></tr>";
                //data_width = 825;
                //data_thead = "<tr><th class='w12'>期數日期</th><th>開獎號碼</th><th colspan='2'>千百</th><th colspan='2'>千拾</th><th colspan='2'>千个</th><th colspan='2'>百拾</th><th colspan='2'>百个</th><th colspan='2'>拾个</th></tr>";
                break;
        }
        data_table.push("<table><thead>" + data_thead + "</thead>");
        data_table.push("<tbody>");
        data_table.push(json.table.join(""));
        data_table.push("</tbody></table>");
        data_table.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>");
        data_table.push("</div>");
        data_table.push("</div>");
        var content = G.overflowDiv({ content: data_table.join(""), height: 590 });
        var generatedCount = 1, my_action;
        G.alert({ title: "歷史開獎", content: content, width: data_width,
            initialize: function () {
                $("#result tbody tr.bc").removeClass("bc");
                $("#result tbody tr:odd").addClass("bc");
                var titleNavAry = ["<select data-id='gameIndex'>"];
                $("#menuList li a").each(function () {
                    titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
                });
                titleNavAry.push("</select>");
                $("#result .MenuBox2 label").html(titleNavAry.join(""));
                var data_index = G.query("gameIndex", "?" + msg.data_action);
                $("#result select[data-id='gameIndex']").val(data_index).unbind("change").change(function () {
                    Result({ data_action: "Result&gameIndex=" + $(this).val() });
                });
                $("#result #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                    appendHtm();
                });
                function appendHtm() {
                    G.myLayerImg();
                    G.ajax(my_action, function (json) {
                        G.myLayerImgClose();
                        if (json && json.table.length > 0) {
                            $("#result tbody").append(json.table.join(""));
                            $("#result tbody tr.bc").removeClass("bc");
                            $("#result tbody tr:odd").addClass("bc");
                        } else {
                            $("#result #fondiv").find("a").hide();
                            $("#result #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () { return true; }
        });

    }, function () { G.maskClose(); });
}

//登录日志
function LoginLog(msg) {
    G.mask();
    G.ajax(msg.data_action + "&name=" + __sysinfo.data.userName, function (json) {
        G.maskClose();
        var data_table = ["<div id='result'>"];
        data_table.push("<div class='history_wrap'>");
        data_table.push("<table>");
        data_table.push("<thead><tr><th>ID編號</th><th>登錄時間</th><th>IP地址</th><th>IP歸屬</th></tr></thead>");
        data_table.push("<tbody>");
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                data_table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    data_table.push("<td>" + json[i][n] + "</td>");
                }
                data_table.push("</tr>");
            }
        }
        data_table.push("</tbody>");
        data_table.push("</table>");
        data_table.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>");
        data_table.push("</div>");
        data_table.push("</div>");
        var content = G.overflowDiv({ content: data_table.join("") });
        var generatedCount = 1, my_action;
        G.alert({ title: "登錄日誌", content: content, width: 470,
            initialize: function () {
                $("#result tbody tr:odd").addClass("bc");
                $("#result #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                    appendHtm();
                });
                function appendHtm() {
                    G.myLayerImg();
                    G.ajax(my_action, function (json) {
                        G.myLayerImgClose();
                        if (json && json.length > 0) {
                            var table = [];
                            for (var i = 0; i < json.length; i++) {
                                table.push("<tr>");
                                for (var n = 0; n < json[i].length; n++) {
                                    table.push("<td>" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#result tbody").append(table.join(""));
                            $("#result tbody tr:odd").addClass("bc");
                        } else {
                            $("#result #fondiv").find("a").hide();
                            $("#result #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () { return true; }
        });

    }, function () { G.maskClose(); });
}



//公告列表
function NewsList(msg) {
    G.mask();
    G.ajax(msg.data_action + "&name=" + __sysinfo.data.userName, function (json) {
        G.maskClose();
        var data_table = ["<div id='result'>"];
        data_table.push("<div class='history_wrap'>");
        data_table.push("<table>");
        data_table.push("<thead><tr><th>发布時間</th><th>公告内容</th></tr></thead>");
        data_table.push("<tbody>");
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                data_table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    data_table.push("<td>" + json[i][n] + "</td>");
                }
                data_table.push("</tr>");
            }
        }
        data_table.push("</tbody>");
        data_table.push("</table>");
        data_table.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>");
        data_table.push("</div>");
        data_table.push("</div>");
        var content = G.overflowDiv({ content: data_table.join("") });
        var generatedCount = 1, my_action;
        G.alert({
            title: "站内消息", content: content, width: 870,
            initialize: function () {
                $("#result tbody tr:odd").addClass("bc");
                $("#result #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                    appendHtm();
                });
                function appendHtm() {
                    G.myLayerImg();
                    G.ajax(my_action, function (json) {
                        G.myLayerImgClose();
                        if (json && json.length > 0) {
                            var table = [];
                            for (var i = 0; i < json.length; i++) {
                                table.push("<tr>");
                                for (var n = 0; n < json[i].length; n++) {
                                    table.push("<td>" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#result tbody").append(table.join(""));
                            $("#result tbody tr:odd").addClass("bc");
                        } else {
                            $("#result #fondiv").find("a").hide();
                            $("#result #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () { return true; }
        });

    }, function () { G.maskClose(); });
}




function ChongZhi(msg) {

    G.mask();
    G.ajax("chongzhi", function (json) {
        G.maskClose();
        var content = "";
        content += '<div id="result" style="width:780px;">';
    
        content += '<div class="game_box tab_box">';
        content += '<div class="game_box_title" id="game_box_title">';
        content += '<ul class="base-clear">';
                
        content += '<li class="subBtn active" id="tab1" data-type="1"><a href="javascript:void(0)">微信转帐</a></li>';
                
        content += '<li class="subBtn" id="tab2" data-type="2"><a href="javascript:void(0)">支付宝转帐</a></li>';
                
        content += '<li class="subBtn" id="tab3" data-type="3"><a href="javascript:void(0)">银行转帐</a></li>';
                
        content += '</ul>';
        content += '</div>';
        content += '<div class="game_box_con">';
            
        content += '<div class="game_item_warp history_wrap pBox" id="con1" style="padding: 0px !important;">';
        content += '<table>';
        content += '<thead>';
        content += '<tr>';
        content += '<th><font color="red">请用微信客户端扫描二维码</font> </th>';
        content += '</tr>';
        content += '</thead>';
        content += '<tbody>';
                
        content += '<tr>';
        content += '<td style="text-align:center;padding-left:10px;">';
        content += '<img src="' + __sysinfo.WeiXinImg + '" width="200" height="200">';
        content += '</td>';
        content += '</tr>';
        content += '<tr>';
        content += '<th><font color="red">请认真填写以下充值申请单</font> </th>';
        content += '</tr>';
               
        content += '</tbody>';

        content += '</table>';
        content += '<table>';
        content += '<tbody><tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">用户账号: </td>';
        content += '<td style="text-align:left;padding-left:10px;color:blue;"><span id="uname1">' + json.userName + '</span> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">微信号: </td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="realname1" id="realname1" class="input" type="text"> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">转帐金额: </td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="cjine1" id="cjine1" class="input" type="text"> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">转帐日期: </td>';
        content += '<td style="text-align:left;padding-left:10px;">';
                        
        content += '<input name="hdate1" value="' + json.datenow + '" id="hdate1" class="input" type="text"> 时间:';
        content += '<select name="hhour1" id="hhour1" class="input" style="width:50px;">';
        for(var i = 0; i < 24;i++){
            if(i < 10){
                content += '<option value="0'+ i +'">0'+ i +'</option>';
            }else{
                content += '<option value="'+ i +'">'+ i +'</option>';
            }
        }
        content += '</select>时';
        content += '<select name="hmin1" id="hmin1" class="input" style="width:50px;">';

        for(var i = 0; i < 60;i++){
            if(i < 10){
                content += '<option value="0'+ i +'">0'+ i +'</option>';
            }else{
                content += '<option value="'+ i +'">'+ i +'</option>';
            }
        }
        content += '</select>分';
        content += '<select name="hmiao1" id="hmiao1" class="input" style="width:50px;">';
    
        for(var i = 0; i < 60;i++){
            if(i < 10){
                content += '<option value="0'+ i +'">0'+ i +'</option>';
            }else{
                content += '<option value="'+ i +'">'+ i +'</option>';
            }
        }
    
        content += '</select>秒';
        content += '</td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td colspan="2" style="text-align:center">';
        content += '<input name="btn1" value="提交" id="btn1" class="btn hotBtn disSubmit" style="height:30px;width:200px;" type="submit">';

        content += '</td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td colspan="2" style="text-align:left">';
        content += '微信转帐：提交申请单后需等待人工审核';
        content += '</td>';
        content += '</tr>';
        content += '</tbody></table>';
        content += '<div style="clear:both;margin-top:5px;"></div>';
        content += '</div>';
            
        content += '<div class="game_item_warp history_wrap pBox" id="con2" style="padding: 0px !important; display: none;">';
        content += '<table>';
        content += '<thead>';
        content += '<tr>';
        content += '<th><font color="red">请用支付宝客户端扫描二维码</font> </th>';
        content += '</tr>';
        content += '</thead>';
        content += '<tbody>';
                
        content += '<tr>';
        content += '<td style="text-align:center;padding-left:10px;">';
        content += '<img src="' + __sysinfo.AlipayImg + '" width="200" height="200">';
        content += '</td>';
        content += '</tr>';
        content += '<tr>';
        content += '<th><font color="red">请认真填写以下充值申请单</font> </th>';
        content += '</tr>';
        content += '</tbody>';
        content += '</table>';
        content += '<table>';
        content += '<tbody><tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">用户账号: </td>';
        content += '<td style="text-align:left;padding-left:10px;color:blue;"><span id="uname2">' + json.userName + '</span> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">支付宝帐号: </td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="realname2" id="realname2" class="input" type="text"> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">转帐金额: </td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="cjine2" id="cjine2" class="input" type="text"> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">转帐日期: </td>';
        content += '<td style="text-align:left;padding-left:10px;">';
                        
        content += '<input name="hdate2" value="' + json.datenow + '" id="hdate2" class="input" type="text"> 时间:';
        content += '<select name="hhour2" id="hhour2" class="input" style="width:50px;">';
            
        for(var i = 0; i < 24;i++){
            if(i < 10){
                content += '<option value="0'+ i +'">0'+ i +'</option>';
            }else{
                content += '<option value="'+ i +'">'+ i +'</option>';
            }
        }

        content += '</select>时';
        content += '<select name="hmin2" id="hmin2" class="input" style="width:50px;">';
    
        for(var i = 0; i < 60;i++){
            if(i < 10){
                content += '<option value="0'+ i +'">0'+ i +'</option>';
            }else{
                content += '<option value="'+ i +'">'+ i +'</option>';
            }
        }

        content += '</select>分';
        content += '<select name="hmiao2" id="hmiao2" class="input" style="width:50px;">';
    for(var i = 0; i < 60;i++){
        if(i < 10){
            content += '<option value="0'+ i +'">0'+ i +'</option>';
        }else{
            content += '<option value="'+ i +'">'+ i +'</option>';
        }
    }

    content += '</select>秒';
    content += '</td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td colspan="2" style="text-align:center">';
    content += '<input name="btn2" value="提交" id="btn2" class="btn hotBtn disSubmit" style="height:30px;width:200px;" type="submit">';

    content += '</td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td colspan="2" style="text-align:left">';
    content += '支付宝转帐：提交申请单后需等待人工审核';
    content += '</td>';
    content += '</tr>';
    content += '</tbody></table>';
    content += '<div style="clear:both;margin-top:5px;"></div>';
    content += '</div>';
            
    content += '<div class="game_item_warp history_wrap pBox" id="con3" style="padding: 0px !important; display: none;">';
    content += '<span id="Label2" style="color:#CC3300;"></span>';
    content += '<table>';
    content += '<thead>';
    content += '<tr>';
    content += '<th colspan="6"><font color="red">请选择以下公司账号进行转账汇款</font> </th>';
    content += '</tr>';
    content += '</thead>';
    content += '<tbody>';
                
    content += '<tr>';
    content += '<td class="bcg" style="width:120px;text-align:center; padding-right:10px;">' + __sysinfo.bankName + ':</td>';
    content += '<td style="text-align:center;padding-left:10px;">' + __sysinfo.bankAccountNO + '</td>';
    content += '<td class="bcg" style="width:120px;text-align:center; padding-right:10px;">开户名:</td>';
    content += '<td style="text-align:center;padding-left:10px;">' + __sysinfo.BankAccountRealName + '</td>';
    content += '<td class="bcg" style="width:120px;text-align:center; padding-right:10px;">开户行所在城市:</td>';
    content += '<td style="text-align:center;padding-left:10px;">' + __sysinfo.BankAccountCity + '</td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td colspan="6" style="text-align:left;padding-left:10px;">';
    content += '温馨提示：<br>';
    content += '一、在金额转出之后请务必填写该页下方的汇款信息表格，以便财务系统能够及时的为您确认并添加金额到您的会员帐户中。<br>';
    content += '二、本公司最低存款金额为100元，公司财务系统将对银行存款的会员按实际存款金额实行返利派送。<br>';
    content += '三、跨行转帐请您使用跨行快汇。。<br> </td>';
    content += '</tr>';
    content += '<tr>';
    content += '<th colspan="6"><font color="red">请认真填写以下汇款单</font> </th>';
    content += '</tr>';
               
    content += '</tbody>';

    content += '</table>';
    content += '<table>';
    content += '<tbody><tr>';
    content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">用户账号: </td>';
    content += '<td style="text-align:left;padding-left:10px;color:blue;"><span id="uname">' + json.userName + '</span> </td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">汇款人: </td>';
    content += '<td style="text-align:left;padding-left:10px;"><input name="realname" value="' + json.userName + '" id="realname" class="input" type="text"> </td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">存款金额: </td>';
    content += '<td style="text-align:left;padding-left:10px;"><input name="cjine" id="cjine" class="input" type="text"> </td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">汇款银行: </td>';
    content += '<td style="text-align:left;padding-left:10px;"> ';
    content += '<select name="BANKNAME" id="BANKNAME" class="input">';
    content += '<option value="工商银行">工商银行</option>';
    content += '<option value="农业银行">农业银行</option>';
    content += '<option value="建设银行">建设银行</option>';
    content += '<option value="交通银行">交通银行</option>';
    content += '<option value="邮政储蓄银行">邮政储蓄银行</option>';
    content += '<option value="兴业银行">兴业银行</option>';
    content += '<option value="民生银行">民生银行</option>';
    content += '<option value="浦发银行">浦发银行</option>';
    content += '<option value="华夏银行">华夏银行</option>';
    content += '<option value="招商银行">招商银行</option>';
    content += '<option value="平安银行">平安银行</option>';
    content += '<option value="广发银行">广发银行</option>';
    content += '<option value="中国银行">中国银行</option>';
    content += '<option value="光大银行">光大银行</option>';
    content += '<option value="中信银行">中信银行</option>';
    content += '<option value="农村信用社">农村信用社</option>';

    content += '</select> </td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">汇款日期: </td>';
    content += '<td style="text-align:left;padding-left:10px;">';
                        
    content += '<input name="hdate" value="' + json.datenow + '" id="hdate" class="input" type="text"> 时间:';
    content += '<select name="hhour" id="hhour" class="input" style="width:50px;">';

    for(var i = 0; i < 24;i++){
        if(i < 10){
            content += '<option value="0'+ i +'">0'+ i +'</option>';
        }else{
            content += '<option value="'+ i +'">'+ i +'</option>';
        }
    }
    content += '</select>时';
    content += '<select name="hmin" id="hmin" class="input" style="width:50px;">';
    
        for(var i = 0; i < 60;i++){
            if(i < 10){
                content += '<option value="0'+ i +'">0'+ i +'</option>';
            }else{
                content += '<option value="'+ i +'">'+ i +'</option>';
            }
        }

        content += '</select>分';
        content += '<select name="hmiao" id="hmiao" class="input" style="width:50px;">';
        for(var i = 0; i < 60;i++){
            if(i < 10){
                content += '<option value="0'+ i +'">0'+ i +'</option>';
            }else{
                content += '<option value="'+ i +'">'+ i +'</option>';
            }
        }

        content += '</select>秒';
        content += '</td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">汇款方式: </td>';
        content += '<td style="text-align:left;padding-left:10px;"> ';
                       
        content += '<select name="htype" id="htype" class="input">';
        content += '<option value="银行柜台">银行柜台</option>';
        content += '<option value="ATM现金">ATM现金</option>';
        content += '<option value="ATM卡转">ATM卡转</option>';
        content += '<option value="网银转账">网银转账</option>';
        content += '<option value="其它[手动输入]">其它[手动输入]</option>';

        content += '</select> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">汇款地点: </td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="haddr" id="haddr" class="input" type="text"> </td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td colspan="2" style="text-align:center">';
        content += '<input name="btn" value="提交" id="btn" class="btn hotBtn disSubmit" style="height:30px;width:200px;" type="submit">';

        content += '</td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td colspan="2" style="text-align:left">';
        content += '银行转帐：提交申请单后需等待人工审核';
        content += '</td>';
        content += '</tr>';
        content += '</tbody></table>';
        content += '<div style="clear:both;margin-top:5px;"></div>';
        
        content += '</div>';
            
            
        content += '</div>';
        content += '</div>';

   
        content += '</div>';


        var content = G.overflowDiv({ content: content, height: 590 });
        G.alert({ title: "线上充值", content: content, width: 780,
            initialize: function (json) {

                

                $("#result li.subBtn").click(function () {
                    var curTab = $("#result li.subBtn.active").attr("data-type");
                    if ($(this).attr("data-type") != curTab) {
                        $("#con" + curTab).hide();
                        $("#tab" + curTab).removeClass("active");
                        curTab = $(this).attr("data-type");
                        $("#con" + curTab).show();
                        $("#tab" + curTab).addClass("active");
                    }
                });

                $("#result #btn1").click(function () {

                    var realname1 = $("#realname1").val();
                    var cjine1 = $("#cjine1").val();
                    var hdate1 = $("#hdate1").val();
                    var hhour1 = $("#hhour1").val();
                    var hmin1 = $("#hmin1").val();
                    var hmiao1 = $("#hmiao1").val();

                    if (realname1 == "") {
                        G.myTips({ content: "請填寫微信号", obj: $("#realname1"), myclick: true });
                        return;
                    }

                    if (cjine1 == "") {
                        G.myTips({ content: "請填寫转账金额", obj: $("#cjine1"), myclick: true });
                        return;
                    }

                    if (hdate1 == "") {
                        G.myTips({ content: "請填寫转账日期", obj: $("#hdate1"), myclick: true });
                        return;
                    }
                    var data = [];

                    data.push("realname1:" + realname1);
                    data.push("cjine1:" + cjine1);
                    data.push("hdate1:" + hdate1);
                    data.push("hhour1:" + hhour1);
                    data.push("hmin1:" + hmin1);
                    data.push("hmiao1:" + hmiao1);

                    G.myLayerImg();
                    G.ajax("chongzhi_weixin&data=" + data.join(","), function (json) {
                        G.myLayerImgClose();
                        
                        if (json.result == 1) {
                            G.alert({ content: "提交成功。", ok: function () { return true; } });
                        } else {
                            alert(json.result);
                        }

                    }, function () { G.myLayerImgClose(); });

                });


                $("#result #btn2").click(function () {

                    var realname2 = $("#realname2").val();
                    var cjine2 = $("#cjine2").val();
                    var hdate2 = $("#hdate2").val();
                    var hhour2 = $("#hhour2").val();
                    var hmin2 = $("#hmin2").val();
                    var hmiao2 = $("#hmiao2").val();

                    if (realname2 == "") {
                        G.myTips({ content: "請填寫支付宝账号", obj: $("#realname2"), myclick: true });
                        return;
                    }

                    if (cjine2 == "") {
                        G.myTips({ content: "請填寫转账金额", obj: $("#cjine2"), myclick: true });
                        return;
                    }

                    if (hdate2 == "") {
                        G.myTips({ content: "請填寫转账日期", obj: $("#hdate2"), myclick: true });
                        return;
                    }
                    var data = [];

                    data.push("realname2:" + realname2);
                    data.push("cjine2:" + cjine2);
                    data.push("hdate2:" + hdate2);
                    data.push("hhour2:" + hhour2);
                    data.push("hmin2:" + hmin2);
                    data.push("hmiao2:" + hmiao2);

                    G.myLayerImg();
                    G.ajax("chongzhi_alipay&data=" + data.join(","), function (json) {
                        G.myLayerImgClose();

                        if (json.result == 1) {
                            G.alert({ content: "提交成功。", ok: function () { return true; } });
                        } else {
                            alert(json.result);
                        }

                    }, function () { G.myLayerImgClose(); });

                });



                $("#result #btn").click(function () {

                    var realname = $("#realname").val();
                    var cjine = $("#cjine").val();
                    var BANKNAME = $("#BANKNAME").val();

                    var hdate = $("#hdate").val();
                    var hhour = $("#hhour").val();
                    var hmin = $("#hmin").val();
                    var hmiao = $("#hmiao").val();

                    var htype = $("#htype").val();
                    var haddr = $("#haddr").val();


                    if (realname == "") {
                        G.myTips({ content: "請填寫汇款人", obj: $("#realname"), myclick: true });
                        return;
                    }

                    if (cjine == "") {
                        G.myTips({ content: "請填寫存款金额", obj: $("#cjine"), myclick: true });
                        return;
                    }

                    if (hdate == "") {
                        G.myTips({ content: "請填寫汇款日期", obj: $("#hdate"), myclick: true });
                        return;
                    }

                    if (haddr == "") {
                        G.myTips({ content: "請填寫汇款地点", obj: $("#haddr"), myclick: true });
                        return;
                    }

                    var data = [];

                    data.push("realname:" + realname);
                    data.push("cjine:" + cjine);
                    data.push("hdate:" + hdate);
                    data.push("hhour:" + hhour);
                    data.push("hmin:" + hmin);
                    data.push("hmiao:" + hmiao);
                    data.push("BANKNAME:" + BANKNAME);
                    data.push("htype:" + htype);
                    data.push("haddr:" + haddr);


                    G.myLayerImg();
                    G.ajax("chongzhi_bank&data=" + data.join(","), function (json) {
                        G.myLayerImgClose();

                        if (json.result == 1) {
                            G.alert({ content: "提交成功。", ok: function () { return true; } });
                        } else {
                            alert(json.result);
                        }

                    }, function () { G.myLayerImgClose(); });

                });


            }

        });

    }, function () { G.maskClose(); });

}


//余额提现
function YuETiXian(msg) {
    var data_stop = true;


    G.mask();
    G.ajax("yuetixianinfo", function (json) {
        G.maskClose();

        var content = '<table width="100%" cellspacing="0" cellpadding="0" border="0">';
        content += '<tbody>';
        content += '<tr>';
        content += '<td valign="top">';
        content += '<table id="yuetixian" class="infoList">';
        content += '<tbody>';
        content += '<tr>';
        content += '<td class="bcg" style="text-align:right; padding-right:10px;width:40%">选择银行</td>';
        content += '<td style="text-align:left;padding-left:10px;">';
        content += '<select style="width:auto" name="BANKNAME" id="BANKNAME" class="input">';

        content += '<option ' + (json.bank == '工商银行' || json.bank == '' ? 'selected="selected"' : "") + ' value="工商银行">工商银行</option>';
        content += '<option ' + (json.bank == '农业银行' ? 'selected="selected"' : "") + ' value="农业银行">农业银行</option>';
        content += '<option ' + (json.bank == '建设银行' ? 'selected="selected"' : "") + ' value="建设银行">建设银行</option>';
        content += '<option ' + (json.bank == '交通银行' ? 'selected="selected"' : "") + ' value="交通银行">交通银行</option>';
        content += '<option ' + (json.bank == '邮政储蓄银行' ? 'selected="selected"' : "") + ' value="邮政储蓄银行">邮政储蓄银行</option>';
        content += '<option ' + (json.bank == '兴业银行' ? 'selected="selected"' : "") + ' value="兴业银行">兴业银行</option>';
        content += '<option ' + (json.bank == '民生银行' ? 'selected="selected"' : "") + ' value="民生银行">民生银行</option>';
        content += '<option ' + (json.bank == '浦发银行' ? 'selected="selected"' : "") + ' value="浦发银行">浦发银行</option>';
        content += '<option ' + (json.bank == '华夏银行' ? 'selected="selected"' : "") + ' value="华夏银行">华夏银行</option>';
        content += '<option ' + (json.bank == '招商银行' ? 'selected="selected"' : "") + ' value="招商银行">招商银行</option>';
        content += '<option ' + (json.bank == '平安银行' ? 'selected="selected"' : "") + ' value="平安银行">平安银行</option>';
        content += '<option ' + (json.bank == '广发银行' ? 'selected="selected"' : "") + ' value="广发银行">广发银行</option>';
        content += '<option ' + (json.bank == '中国银行' ? 'selected="selected"' : "") + ' value="中国银行">中国银行</option>';
        content += '<option ' + (json.bank == '光大银行' ? 'selected="selected"' : "") + ' value="光大银行">光大银行</option>';
        content += '<option ' + (json.bank == '中信银行' ? 'selected="selected"' : "") + ' value="中信银行">中信银行</option>';
        content += '<option ' + (json.bank == '农村信用社' ? 'selected="selected"' : "") + ' value="农村信用社">农村信用社</option>';
        content += '<option ' + (json.bank == '微信' ? 'selected="selected"' : "") + ' value="微信">微信</option>';
        content += '<option ' + (json.bank == '支付宝' ? 'selected="selected"' : "") + ' value="支付宝">支付宝</option>';

        content += '</select>';
        content += '</td>';
        content += '</tr>';
        content += '<tr id="tr_tixian_province" style="display:' + (json.bank == '支付宝' || json.bank == '微信' ? 'none' : "") + ';" >';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">所属省份</td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="PROVINCE" value="' + json.province + '" id="PROVINCE" class="input" style="width:150px;" type="text"></td>';
        content += '</tr>';
        content += '<tr id="tr_tixian_city" style="display:' + (json.bank == '支付宝' || json.bank == '微信' ? 'none' : "") + ';" >';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">所属城市</td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="CITY" value="'+ json.city +'" id="CITY" class="input" style="width:150px;" type="text"></td>';
        content += '</tr>';
        content += '<tr id="tr_tixian_address" style="display:' + (json.bank == '支付宝' || json.bank == '微信' ? 'none' : "") + ';" >';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">开户网点</td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="BANKWD" value="'+ json.address +'" id="BANKWD" class="input" style="width:150px;" type="text"></td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">银行账号</td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="ACCNO" value="'+ json.accountNO +'" id="ACCNO" class="input" style="width:150px;" type="text"></td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">开户姓名</td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="ACCNAME" value="'+ json.realName +'" id="ACCNAME" class="input" style="width:150px;" type="text"></td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">提现金额</td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="MONEY1" value="" id="MONEY1" class="input" style="width:150px;" type="text"></td>';
        content += '</tr>';
        content += '<tr>';
        content += '<td class="bcg" style="width:35%;text-align:right; padding-right:10px;">手机号码</td>';
        content += '<td style="text-align:left;padding-left:10px;"><input name="Phone" value="'+ json.phone +'" id="Phone" class="input" style="width:150px;" type="text"></td>';
        content += '</tr>';
        content += '</tbody>';
        content += '</table>';
        content += '</td>';
        content += '</tr>';
        content += '</tbody>';
        content += '</table>';


        G.alert({
            title: "余额提现", content: content, width: 380,
            okVal: "提交",
            ok: function () {
                var BANKNAME = $("#BANKNAME");
                var PROVINCE = $("#PROVINCE");
                var CITY = $("#CITY");
                var BANKWD = $("#BANKWD");
                var ACCNO = $("#ACCNO");
                var ACCNAME = $("#ACCNAME");
                var MONEY1 = $("#MONEY1");
                var Phone = $("#Phone");

                if (BANKNAME == "微信" || BANKNAME == "支付宝") {
                    $("#CITY").val("");
                    $("#PROVINCE").val("");
                    $("#BANKWD").val("");
                } else {
                    if (PROVINCE.val() == "") {
                        G.myTips({ content: "請填寫所属省份", obj: PROVINCE, myclick: true });
                        return;
                    }
                    if (CITY.val() == "") {
                        G.myTips({ content: "請填寫所属城市", obj: CITY, myclick: true });
                        return;
                    }
                    if (BANKWD.val() == "") {
                        G.myTips({ content: "請填寫开户网点", obj: BANKWD, myclick: true });
                        return;
                    }
                }
                if (ACCNO.val() == "") {
                    G.myTips({ content: "請填寫银行账号", obj: ACCNO, myclick: true });
                    return;
                }
                if (ACCNAME.val() == "") {
                    G.myTips({ content: "請填寫开户姓名", obj: ACCNAME, myclick: true });
                    return;
                }
                if (MONEY1.val() == "") {
                    G.myTips({ content: "請填寫提现金额", obj: MONEY1, myclick: true });
                    return;
                }
                if (Phone.val() == "") {
                    G.myTips({ content: "請填寫手机号码", obj: Phone, myclick: true });
                    return;
                }

                if (data_stop) {
                    data_stop = false;
                    G.mask();
                    var data = [];

                    data.push("BANKNAME:" + BANKNAME.val());
                    data.push("PROVINCE:" + PROVINCE.val());
                    data.push("CITY:" + CITY.val());
                    data.push("BANKWD:" + BANKWD.val());
                    data.push("ACCNO:" + ACCNO.val());
                    data.push("ACCNAME:" + ACCNAME.val());
                    data.push("MONEY1:" + MONEY1.val());
                    data.push("Phone:" + Phone.val());

                    G.ajax("yuetixian&data=" + data.join(","), function (json) {
                        data_stop = true;
                        G.maskClose();
                        if (json.result == 1) {
                            G.alert({ content: "提交成功。", ok: function () { return true; } });
                        } else {
                            alert(json.result);
                            data_stop = true;
                        }
                    }, function () { G.maskClose(); });
                }

            }
        });


        $("#BANKNAME").change(function (ele, idx) {
            if ($(this).val() == "微信" || $(this).val() == "支付宝") {
                $("#tr_tixian_province").css("display", "none");
                $("#tr_tixian_city").css("display", "none");
                $("#tr_tixian_address").css("display", "none");
            } else {
                $("#tr_tixian_province").css("display", "");
                $("#tr_tixian_city").css("display", "");
                $("#tr_tixian_address").css("display", "");
            }

        });


    }, function () { G.maskClose(); });
}


//充提记录
function UserRecharge(msg) {
    G.mask();
    G.ajax("userrecharge", function (json) {
        G.maskClose();
        var data_table = ["<div id='result'>"];
        data_table.push("<div class='history_wrap'>");
        data_table.push("<table>");
        data_table.push("<thead><tr><th>类型</th><th>用户名</th><th>单号</th><th>金额</th><th>操作时间</th><th>状态</th></tr></thead>");
        data_table.push("<tbody>");
        if (json && json.length > 0) {
            var txt_right;
            for (var i = 0; i < json.length; i++) {
                data_table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    
                    data_table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                }
                data_table.push("</tr>");
            }
        } else {
            data_table.push("<tr><td colspan='6'>無提充記錄！</td></tr>");
        }
        data_table.push("</tbody>");
        data_table.push("</table>");
        data_table.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>");
        data_table.push("</div>");
        data_table.push("</div>");
        var content = G.overflowDiv({ content: data_table.join(""), height: 520 });
        var generatedCount = 1, my_action;
        G.alert({
            title: "充提记录", content: content, width: 870,
            initialize: function () {
                $("#result tbody tr:odd").addClass("bc");
                if (json.length == 0) {
                    $("#result #fondiv").remove();
                }
                $("#result #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + "userrecharge", paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                    appendHtm();
                });
                function appendHtm() {
                    G.myLayerImg();
                    G.ajax(my_action, function (json) {
                        G.myLayerImgClose();
                        if (json && json.length > 0) {
                            var table = [], txt_right;
                            for (var i = 0; i < json.length; i++) {
                                table.push("<tr>");
                                for (var n = 0; n < json[i].length; n++) {
                                    
                                    table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#result tbody").append(table.join(""));
                            $("#result tbody tr:odd").addClass("bc");
                        } else {
                            $("#result #fondiv").find("a").hide();
                            $("#result #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () { return true; }
        });
    }, function () { G.maskClose(); });
}



//修改密码
function ChangePwd(msg) {
    var data_stop = true;
    var content = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
    + "<tbody>"
    + "<tr>"
    + "<td valign='top'>"
    + "<table id='changepwd' class='infoList'>"
    + "<tbody>"
    + "<tr>"
    + "<td height='30' width='100' align='right'>原始密碼&nbsp;</td>"
    + "<td height='30'>&nbsp;<input name='voldpassword' class='input' style='width:130px;' autocomplete='off' type='password'></td>"
    + "</tr>"
    + "<tr>"
    + "<td height='30' align='right'>新設密碼&nbsp;</td>"
    + "<td height='30' align='left'>&nbsp;<input name='vnewpassword' autocomplete='off' class='input' style='width:130px;' type='password'></td>"
    + "</tr>"
    + "<tr>"
    + "<td height='30' align='right'>確認密碼&nbsp;</td>"
    + "<td height='30' align='left'>&nbsp;<input name='vrenewpassword' autocomplete='off' class='input' style='width:130px;' type='password'></td>"
    + "</tr>"
    + "</tbody>"
    + "</table>"
    + "</td>"
    + "</tr>"
    + "</tbody>"
    + "</table>";
    G.alert({ title: "修改密碼", content: content,width:380,
        okVal: "確定修改",
        cancelVal:"重置",
        ok: function () {
            var voldpassword = $("input[name='voldpassword']");
            var vnewpassword = $("input[name='vnewpassword']");
            var vrenewpassword = $("input[name='vrenewpassword']");
            if (voldpassword.val() == "") {
                G.myTips({ content: "請填寫原始密碼", obj: voldpassword, myclick: true });
            } else if (voldpassword.val().length < 6 || voldpassword.val().length > 20 || !G.StringSign(voldpassword.val())) {
                G.myTips({ content: "密碼 6-20位,且必需包含字母、和数字！", obj: voldpassword, myclick: true });
            } else if (vnewpassword.val() == "") {
                G.myTips({ content: "請填寫新密碼", obj: voldpassword, myclick: true });
            } else if (vnewpassword.val().length < 6 || vnewpassword.val().length > 20 || !G.safety(vnewpassword.val())) {
                G.myTips({ content: "密碼 6-20位,且必需包含字母、和数字！", obj: vnewpassword, myclick: true });
            } else if (vnewpassword.val() != vrenewpassword.val()) {
                G.myTips({ content: "兩次如數密碼不一致，請核實后重新輸入！", obj: vrenewpassword, myclick: true });
            } else if (vnewpassword.val() == voldpassword.val()) {
                G.myTips({ content: "舊密碼與新密碼一致，請更換新密碼。", obj: vnewpassword, myclick: true });
            } else if (data_stop) {
                data_stop = false;
                G.mask();
                var data = [];
                data.push("voldpassword:" + voldpassword.val());
                data.push("vnewpassword:" + vnewpassword.val());
                G.ajax("cheangepwd&data=" + data.join(","), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "密碼更改成功。", ok: function () { return true; } });
                    } else {
                        alert(json.result);
                        data_stop = true;
                    }
                }, function () { G.maskClose(); });
            }
        },
        cancel: function () { $("#changepwd input[type='password']").val(""); return true; }
    });
}

//个人信息
function UserInfo(msg) {
    G.mask();
    G.ajax(msg.data_action, function (json) {
        G.maskClose();
        var rebateStr = json.rebateId == 1 ? "A" : json.rebateId == 2 ? "B" : "C";
        var len = json.list.length % 2 != 0 ? parseInt(json.list.length / 2 + 1) : parseInt(json.list.length / 2);
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        var leftAry = [];
        var rightAry = [];
        for (var i = 0; i < len; i++) {
            leftAry.push("<tr>");
            leftAry.push("<td class='bcg'>" + FormatTs(gameIndex, json.list[i][0]) + "</td>");
            leftAry.push("<td>" + json.list[i][1] + "</td>");
            leftAry.push("<td>" + json.list[i][2] + "</td>");
            leftAry.push("<td>" + json.list[i][3] + "</td>");
            leftAry.push("<td>" + json.list[i][4] + "</td>");
            leftAry.push("</tr>");

            if (json.list[len + i]) {
                rightAry.push("<tr>");
                rightAry.push("<td class='bcg'>" + FormatTs(gameIndex, json.list[len + i][0]) + "</td>");
                rightAry.push("<td>" + json.list[len + i][1] + "</td>");
                rightAry.push("<td>" + json.list[len + i][2] + "</td>");
                rightAry.push("<td>" + json.list[len + i][3] + "</td>");
                rightAry.push("<td>" + json.list[len + i][4] + "</td>");
                rightAry.push("</tr>");
            }
        }

        var data_table = ["<div id='result'>"];
        data_table.push("<div class='history_wrap'>");
        data_table.push("<table>");
        data_table.push("<thead><tr><th colspan='2'>基本信息</th></tr></thead>");
        data_table.push("<tbody>");
        data_table.push("<tr><td class='bcg' style='width:40%;text-align:right; padding-right:5px;'>會員賬戶:</td><td style='text-align:left;padding-left:10px;'>" + json.userName + "</td></tr>");
        data_table.push("<tr><td class='bcg' style='width:40%;text-align:right; padding-right:5px;'>會員盤口:</td><td style='text-align:left;padding-left:10px;'>" + rebateStr + "盤</td></tr>");
        data_table.push("<tr><td class='bcg' style='width:40%;text-align:right; padding-right:5px;'>信用額度:</td><td style='text-align:left;padding-left:10px;'>" + json.credits + "</td></tr>");
        data_table.push("<tr><td class='bcg' style='width:40%;text-align:right; padding-right:5px;'>可用額度:</td><td style='text-align:left;padding-left:10px;'>" + json.yuer + "</td></tr>");
        data_table.push("</tbody>");
        data_table.push("</table>");
        data_table.push("<div style='clear:both;margin-top:5px;'></div>");

        data_table.push("<div style='width:49.9%;float:left;'>");
        data_table.push("<table>");
        data_table.push("<thead><tr><th>項目類型</th><th>單註最低</th><th>單註最高</th><th>單項最高</th><th>退水%</th></tr></thead>");
        data_table.push("<tbody>" + leftAry.join("") + "</tbody>");
        data_table.push("</table>");
        data_table.push("</div>");

        data_table.push("<div style='width:49.9%;float:right;'>");
        data_table.push("<table>");
        data_table.push("<thead><tr><th>項目類型</th><th>單註最低</th><th>單註最高</th><th>單項最高</th><th>退水%</th></tr></thead>");
        data_table.push("<tbody>" + rightAry.join("") + "</tbody>");
        data_table.push("</table>");
        data_table.push("</div>");

        data_table.push("</div>");
        data_table.push("</div>");
        var content = G.overflowDiv({ content: data_table.join(""), height: 590 });
        G.alert({ title: "信用資料", content: content, width: 810,

            ok: function () { return true; }

        });

    }, function () { G.maskClose(); });
}

//未结明细
function Status(msg) {
    G.mask();
    G.ajax(msg.data_action, function (json) {
        G.maskClose();
        var data_table = ["<div id='result'>"];
        var my_count = [0, 0, 0];
        data_table.push("<div class='history_wrap'>");
        data_table.push("<table>");
        data_table.push("<thead><tr><th>註單號/時間</th><th>彩種類型</th><th>註單明細</th><th>賠率</th><th>下註額</th><th>可贏額</th></tr></thead>");
        data_table.push("<tbody>");
        if (json && json.length > 0) {
            var txt_right;
            for (var i = 0; i < json.length; i++) {
                data_table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    if (n == 4 || n == 5) {
                        txt_right = "style='text-align:right;padding-right:5px;'";
                        if (n == 4) {
                            my_count[0]++;
                            my_count[1] += parseFloat(json[i][n]);
                        } else if (n == 5) {
                            my_count[2] += parseFloat(json[i][n]);
                        }
                    } else {
                        txt_right = "";
                    }
                    data_table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                }
                data_table.push("</tr>");
            }
        } else {
            data_table.push("<tr><td colspan='6'>無未結算記錄！</td></tr>");
        }
        data_table.push("</tbody>");
        data_table.push("<tfoot>");
        data_table.push("<tr>");
        data_table.push("<th colspan='4'>當前頁合計：<span name='data-count'>0</span>筆</th>");
        data_table.push("<th style='text-align:right;padding-right:5px;'><span name='data-z'>0</span></th>");
        data_table.push("<th style='text-align:right;padding-right:5px;'><span name='data-w'>0</span></th>");
        data_table.push("</tr>");
        data_table.push("</tfoot>");
        data_table.push("</table>");
        data_table.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>");
        data_table.push("</div>");
        data_table.push("</div>");
        var content = G.overflowDiv({ content: data_table.join(""), height: 520 });
        var generatedCount = 1, my_action;
        G.alert({ title: "未結明細", content: content, width: 870,
            initialize: function () {
                $("#result tbody tr:odd").addClass("bc");
                $("#result tfoot span[name='data-count']").html(my_count[0]);
                $("#result tfoot span[name='data-z']").html(my_count[1]);
                $("#result tfoot span[name='data-w']").html(G.forDight(my_count[2], 1));
                if (json.length == 0) {
                    $("#result #fondiv").remove();
                }
                $("#result #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                    appendHtm();
                });
                function appendHtm() {
                    G.myLayerImg();
                    G.ajax(my_action, function (json) {
                        G.myLayerImgClose();
                        if (json && json.length > 0) {
                            var table = [], txt_right;
                            var my_count = parseInt($("#result tfoot span[name='data-count']").html());
                            var my_z = parseFloat($("#result tfoot span[name='data-z']").html());
                            var my_w = parseFloat($("#result tfoot span[name='data-w']").html());
                            for (var i = 0; i < json.length; i++) {
                                table.push("<tr>");
                                for (var n = 0; n < json[i].length; n++) {
                                    if (n == 4 || n == 5) {
                                        txt_right = "style='text-align:right;padding-right:5px;'";
                                        if (n == 4) {
                                            my_count++;
                                            my_z += parseFloat(json[i][n]);
                                        } else if (n == 5) {
                                            my_w += parseFloat(json[i][n]);
                                        }
                                    } else {
                                        txt_right = "";
                                    }
                                    table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#result tbody").append(table.join(""));
                            $("#result tbody tr:odd").addClass("bc");
                            $("#result tfoot span[name='data-count']").html(my_count);
                            $("#result tfoot span[name='data-z']").html(my_z);
                            $("#result tfoot span[name='data-w']").html(G.forDight(my_w, 1) || 0);
                        } else {
                            $("#result #fondiv").find("a").hide();
                            $("#result #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () { return true; }
        });
    }, function () { G.maskClose(); });
}

//结算报表-日期查询
function History(msg) {
    G.mask();
    G.ajax(msg.data_action, function (json) {
        G.maskClose();
        var txt_right, data_cunt = [0, 0, 0, 0];
        var data_table = ["<div id='result'>"];
        data_table.push("<div class='history_wrap'>");
        data_table.push("<table>");
        data_table.push("<thead>");
        data_table.push("<tr>");
        data_table.push("<th rowspan='2' width='170'>交易日期</th>");
        data_table.push("<th colspan='3' style='text-align:right;font-weight:normal;' id='myche'>");
        //data_table.push("<label style='margin:0 12px;'>普通<input type='radio' name='che' value='1' style='position:absolute; margin-top:3px; margin-left:2px;' /></label>");
        //data_table.push("<label style='margin:0 12px;'>快彩<input type='radio' name='che' value='2' style='position:absolute; margin-top:3px; margin-left:2px;' /></label>");
        data_table.push("<label style='margin:0 12px;'>總項<input type='radio' name='che' value='0' checked='checked' style='position:absolute; margin-top:3px; margin-left:2px;' /></label>");
        data_table.push("</th>");
        data_table.push("<th rowspan='2' width='170'>實際結果</th>");
        data_table.push("</tr>");
        data_table.push("<tr>");
        data_table.push("<td class='bcg'>註單數</td>");
        data_table.push("<td class='bcg'>下註金額</td>");
        data_table.push("<td class='bcg'>退水後結果</td>");
        data_table.push("</tr>");
        data_table.push("</thead>");
        data_table.push("<tbody>");
        for (var i = 0; i < 7; i++) {
            data_table.push("<tr data-date='" + json[i][0] + "' class='cursor'>");
            for (var n = 1; n < json[i].length; n++) {
                txt_right = n == 3 ? "style='text-align:right;padding-right:5px;'" : n >= 4 ? "style='text-align:right;padding-right:5px;color:red;'" : "";
                data_table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                if (n > 1) {
                    data_cunt[n - 2] += parseFloat(json[i][n]);
                }
            }
            data_table.push("</tr>");
        }
        data_table.push("<tr>");
        data_table.push("<td class='bcg bold'>上周</td>");
        data_table.push("<td class='bcg bold'>" + data_cunt[0] + "</td>");
        data_table.push("<td class='bcg bold' style='text-align:right;padding-right:5px;'>" + data_cunt[1] + "</td>");
        data_table.push("<td class='bcg bold' style='text-align:right;padding-right:5px;color:red;'>" + G.forDight(data_cunt[2], 1) + "</td>");
        data_table.push("<td class='bcg bold' style='text-align:right;padding-right:5px;color:red;'>" + G.forDight(data_cunt[3], 1) + "</td>");
        data_table.push("</tr>");
        data_table.push("</tbody>");
        data_table.push("</table>");
        data_table.push("<div style='clear:both;margin-top:10px;'></div>");
        data_table.push("<table>");
        data_table.push("<thead>");
        data_table.push("<tr>");
        data_table.push("<th rowspan='2' width='170'>交易日期</th>");
        data_table.push("<th colspan='3' style='text-align:right;font-weight:normal;'>&nbsp</th>");
        data_table.push("<th rowspan='2' width='170'>實際結果</th>");
        data_table.push("</tr>");
        data_table.push("<tr>");
        data_table.push("<td class='bcg'>註單數</td>");
        data_table.push("<td class='bcg'>下註金額</td>");
        data_table.push("<td class='bcg'>退水後結果</td>");
        data_table.push("</tr>");
        data_table.push("</thead>");
        data_table.push("<tbody>");
        data_cunt = [0, 0, 0, 0];
        for (var i = 7; i < json.length; i++) {
            data_table.push("<tr data-date='" + json[i][0] + "' class='cursor'>");
            for (var n = 1; n < json[i].length; n++) {
                txt_right = n == 3 ? "style='text-align:right;padding-right:5px;'" : n >= 4 ? "style='text-align:right;padding-right:5px;color:red;'" : "";
                data_table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                if (n > 1) {
                    data_cunt[n - 2] += parseFloat(json[i][n]);
                }
            }
            data_table.push("</tr>");
        }
        data_table.push("<tr>");
        data_table.push("<td class='bcg bold'>本周</td>");
        data_table.push("<td class='bcg bold'>" + data_cunt[0] + "</td>");
        data_table.push("<td class='bcg bold' style='text-align:right;padding-right:5px;'>" + data_cunt[1] + "</td>");
        data_table.push("<td class='bcg bold' style='text-align:right;padding-right:5px;color:red;'>" + G.forDight(data_cunt[2], 1) + "</td>");
        data_table.push("<td class='bcg bold' style='text-align:right;padding-right:5px;color:red;'>" + G.forDight(data_cunt[3], 1) + "</td>");
        data_table.push("</tr>");
        data_table.push("</tbody>");
        data_table.push("</table>");

        data_table.push("</div>");
        data_table.push("</div>");
        var content = data_table.join("");
        var data_stop = true;
        G.alert({ title: "結算報表", content: content, width: 750,
            initialize: function () {
                $("#result tr.cursor").unbind("click").click(function () {
                    var mydate = $(this).attr("data-date");
                    var myIndex = $("#result #myche input[name='che']:checked").val();
                    if (data_stop) {
                        data_stop = false;
                        G.mask();
                        $("#myWarpr").remove();
                        $("#mymask").remove();
                        var data_action = msg.data_action + "&mydate=" + mydate + "&myIndex=" + myIndex;
                        G.ajax(data_action, function (json) {
                            G.maskClose();
                            HistoryGame(json, msg.data_action, data_action);
                        }, function () { G.maskClose(); });
                    }
                });
            },
            ok: function () { return true; }
        });
    }, function () { G.maskClose(); });
}
function HistoryGame(json, data_action, myaction) {
    var data_cunt = [0, 0, 0, 0, 0];
    var data_table = ["<div id='result'>"];
    data_table.push("<div class='MenuBox1'><label class='cursor'><<返回</label></div>");
    data_table.push("<div class='history_wrap MenuPadding-top'>");
    data_table.push("<table>");
    data_table.push("<thead><tr><th>彩種類型</th><th>註單筆數</th><th>下註總額</th><th>結果</th><th>退水</th><th>實際結果</th></tr></thead>");
    data_table.push("<tbody>");
    if (json && json.length > 0) {
        var txt_right;
        for (var i = 0; i < json.length; i++) {
            data_table.push("<tr class='cursor' mystate='" + json[i][0] + "'>");
            for (var n = 1; n < json[i].length; n++) {
                txt_right = n >= 3 && n <= 5 ? "style='text-align:right;padding-right:5px;'" : n == 6 ? "style='text-align:right;padding-right:5px;color:red;'" : "";
                data_table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                if (n > 1) {
                    data_cunt[n - 2] += parseFloat(json[i][n]);
                }
            }
            data_table.push("</tr>");
        }
    } else {
        data_table.push("<tr><td colspan='6'>無未結算記錄！</td></tr>");
    }
    data_table.push("<tr class='bc bold'><td>當前頁合計</td><td>" + data_cunt[0] + "</td><td style='text-align:right;padding-right:5px;'>" + data_cunt[1] + "</td><td style='text-align:right;padding-right:5px;'>" + G.forDight(data_cunt[2], 1) + "</td><td style='text-align:right;padding-right:5px;'>" + G.forDight(data_cunt[3], 1) + "</td><td style='text-align:right;padding-right:5px;color:red;'>" + G.forDight(data_cunt[4], 1) + "</td></tr>");
    data_table.push("</tbody>");
    data_table.push("</table>");
    data_table.push("</div>");
    data_table.push("</div>");
    var content = data_table.join("");
    var data_stop = true;
    G.alert({ title: "結算報表", content: content, width: 750,
        initialize: function () {
            $("#result label.cursor").unbind("click").click(function () {
                if (data_stop) {
                    data_stop = false;
                    $("#myWarpr").remove();
                    $("#mymask").remove();
                    History({ data_action: data_action });
                }
            });
            $("#result tr.cursor").unbind("click").click(function () {
                if (data_stop) {
                    var action = myaction + "&mystate=" + $(this).attr("mystate");
                    G.mask();
                    G.ajax(action, function (json) {
                        G.maskClose();
                        $("#myWarpr").remove();
                        $("#mymask").remove();
                        HistoryList(json, data_action, action);
                    }, function () { G.maskClose(); });
                }
            });
        },
        ok: function () { return true; }

    });
}
function HistoryList(json, myaction, action) {
    var data_table = ["<div id='result'>"];
    var my_count = [0, 0, 0, 0];
    data_table.push("<div class='MenuBox1'><label class='cursor'><<返回</label></div>");
    data_table.push("<div class='history_wrap MenuPadding-top'>");
    data_table.push("<table>");
    data_table.push("<thead><tr><th>註單號/時間</th><th>彩種類型</th><th>註單明細</th><th>賠率</th><th>下註金額</th><th>結果</th><th>退水</th><th>退水后結果</th></tr></thead>");
    data_table.push("<tbody>");
    if (json && json.length > 0) {
        var txt_right;
        for (var i = 0; i < json.length; i++) {
            data_table.push("<tr>");
            for (var n = 0; n < json[i].length; n++) {
                if (n >= 4 && n <= 6) {
                    txt_right = "style='text-align:right;padding-right:5px;'";
                    if (n == 4) {
                        my_count[0]++;
                        my_count[1] += parseFloat(json[i][n]);
                    } else if (n == 5) {
                        my_count[2] += parseFloat(json[i][n]);
                    } else if (n == 6) {
                        my_count[3] += parseFloat(json[i][n]);
                    }
                } else if (n == 7) {
                    txt_right = "style='text-align:right;padding-right:5px;color:red;'";
                    //my_count[4] += parseFloat(json[i][n]);
                } else {
                    txt_right = "";
                }
                data_table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
            }
            data_table.push("</tr>");
        }
    } else {
        data_table.push("<tr><td colspan='8'>無未結算記錄！</td></tr>");
    }
    data_table.push("</tbody>");
    data_table.push("<tfoot>");
    data_table.push("<tr>");
    data_table.push("<th colspan='4'>當前頁合計：<span name='data-count'>0</span>筆</th>");
    data_table.push("<th style='text-align:right;padding-right:5px;'><span name='data-a'>0</span></th>");
    data_table.push("<th style='text-align:right;padding-right:5px;'><span name='data-b'>0</span></th>");
    data_table.push("<th style='text-align:right;padding-right:5px;'><span name='data-c'>0</span></th>");
    data_table.push("<th style='text-align:right;padding-right:5px;color:red;'><span name='data-d'>0</span></th>");
    data_table.push("</tr>");
    data_table.push("</tfoot>");
    data_table.push("</table>");
    data_table.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>");
    data_table.push("</div>");
    data_table.push("</div>");
    var content = G.overflowDiv({ content: data_table.join(""), height: 520 });
    var data_stop = true;
    var generatedCount = 1;
    G.alert({ title: "結算報表", content: content, width: 950,
        initialize: function () {
            $("#result tbody tr:odd").addClass("bc");
            $("#result tfoot span[name='data-count']").html(my_count[0]);
            $("#result tfoot span[name='data-a']").html(my_count[1]);
            $("#result tfoot span[name='data-b']").html(G.forDight(my_count[2], 1));
            $("#result tfoot span[name='data-c']").html(G.forDight(my_count[3], 1));
            $("#result tfoot span[name='data-d']").html(G.forDight(my_count[2] + my_count[3], 1));

            if (json.length == 0) {
                $("#result #fondiv").remove();
            }
            $("#result label.cursor").unbind("click").click(function () {
                if (data_stop) {
                    data_stop = false;
                    $("#myWarpr").remove();
                    $("#mymask").remove();
                    History({ data_action: myaction });
                }
            });
            $("#result #fondiv").find("a").unbind("click").click(function () {
                generatedCount++;
                my_action = G.urlReplace({ url: "?" + action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                appendHtm();
            });
            function appendHtm() {
                G.myLayerImg();
                G.ajax(my_action, function (json) {
                    G.myLayerImgClose();
                    if (json && json.length > 0) {
                        var table = [], txt_right;
                        var my_count = parseInt($("#result tfoot span[name='data-count']").html());
                        var my_a = parseFloat($("#result tfoot span[name='data-a']").html());
                        var my_b = parseFloat($("#result tfoot span[name='data-b']").html());
                        var my_c = parseFloat($("#result tfoot span[name='data-c']").html());
                        for (var i = 0; i < json.length; i++) {
                            table.push("<tr>");
                            for (var n = 0; n < json[i].length; n++) {
                                //txt_right = n >= 4 && n <= 6 ? "style='text-align:right;padding-right:5px;'" : n == 7 ? "style='text-align:right;padding-right:5px;color:red;'" : "";
                                if (n >= 4 && n <= 6) {
                                    txt_right = "style='text-align:right;padding-right:5px;'";
                                    if (n == 4) {
                                        my_count++;
                                        my_a += parseFloat(json[i][n]);
                                    } else if (n == 5) {
                                        my_b += parseFloat(json[i][n]);
                                    } else if (n == 6) {
                                        my_c += parseFloat(json[i][n]);
                                    }
                                } else if (n == 7) {
                                    txt_right = "style='text-align:right;padding-right:5px;color:red;'";
                                } else {
                                    txt_right = "";
                                }
                                table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                            }
                            table.push("</tr>");
                        }
                        $("#result tbody").append(table.join(""));
                        $("#result tbody tr:odd").addClass("bc");
                        $("#result tfoot span[name='data-count']").html(my_count);
                        $("#result tfoot span[name='data-a']").html(my_a);
                        $("#result tfoot span[name='data-b']").html(G.forDight(my_b, 1));
                        $("#result tfoot span[name='data-c']").html(G.forDight(my_c, 1));
                        $("#result tfoot span[name='data-d']").html(G.forDight(my_b + my_c, 1));
                    } else {
                        $("#result #fondiv").find("a").hide();
                        $("#result #fondiv").find("span").show();
                    }
                }, function () { G.myLayerImgClose(); });
            }
        },
        ok: function () { return true; }
    });
}