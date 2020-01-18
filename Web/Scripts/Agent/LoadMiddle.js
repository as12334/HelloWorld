//用户列表模块
function userlist(msg) {
    var title, data_bc;
    var queryId = G.query("queryId", "?" + msg.data_action);
    var state = G.query("state", "?" + msg.data_action);
    //var thead = ["<input name='all' type='checkbox'>", "在線"];
    var thead = ["在線"];
    if (queryId == 1) {
        title = "總監";
        //thead = ["<input name='all' type='checkbox'>", "在線", "上級賬號", "占成", "總監", "暱稱", "限占", "分公司", "股東", "總代理", "代理", "會員", "信用額度", "可用額度", "註冊日期", "補貨", "狀態", "功能"];
    } else if (queryId == 2) {
        title = "分公司";
        //thead = ["<input name='all' type='checkbox'>", "在線", "上級賬號", "占成", "分公司", "暱稱", "限占", "股東", "總代理", "代理", "會員", "信用額度", "可用額度", "註冊日期", "占餘歸", "總賬", "補貨", "狀態", "功能"];
    } else if (queryId == 3) {
        title = "股東";
        //thead = ["<input name='all' type='checkbox'>", "在線", "上級賬號", "占成", "股東", "暱稱", "限占", "總代理", "代理", "會員", "信用額度", "可用額度", "註冊日期", "補貨", "狀態", "功能"];
    } else if (queryId == 4) {
        title = "總代";
        //thead = ["<input name='all' type='checkbox'>", "在線", "上級賬號", "占成", "總代理", "暱稱", "限占", "代理", "會員", "信用額度", "可用額度", "註冊日期", "補貨", "狀態", "功能"];
    } else if (queryId == 5) {
        title = "代理";
        //thead = ["<input name='all' type='checkbox'>", "在線", "上級賬號", "占成", "代理", "暱稱", "限占", "會員", "信用額度", "可用額度", "註冊日期", "補貨", "類型", "狀態", "功能"];
    } else if (queryId == 6) {
        title = "會員";
        //thead = ["<input name='all' type='checkbox'>", "在線", "上級賬號", "占成", "會員級別", "會員", "暱稱", "信用額度", "可用額度", "註冊日期", "盤口", "類型", "狀態", "功能"];
    }
    if (queryId != 6) {
        thead.push("上級賬號");
        thead.push("占成");
    }
    if (queryId == 6) {
        thead.push("會員級別");
    }
    thead.push(title);
    thead.push("暱稱");
    if (queryId < 6) {
        thead.push("限占");
    }
    if (queryId <= 1 || queryId == 6 && __sysinfo.level <= 2) {
        thead.push("分公司");
    }
    if (queryId <= 2 || queryId == 6 && __sysinfo.level <= 3) {
        thead.push("股東");
    }
    if (queryId <= 3 || queryId == 6 && __sysinfo.level <= 4) {
        thead.push("總代理");
    }
    if (queryId <= 4 || queryId == 6) {
        thead.push("代理");
    }
    if (queryId <= 5) {
        thead.push("會員");
    }
    thead.push("信用額度");
    thead.push("可用額度");
    thead.push("註冊日期");
    if (queryId == 6) {
        thead.push("盤口");
    }
    if (queryId == 2) {
        thead.push("占餘歸");
        thead.push("總賬");
    }
    if (queryId < 6) {
        thead.push("補貨");
    }
    if (queryId >= 2) {
        thead.push("信用/現金");
    }
    if (queryId == 6) {
        thead.push("盈利回收");
    }
    thead.push("狀態");
    thead.push("功能");


    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();

        $("#navListBox a.onBtn").removeClass("onBtn");
        $("#navListBox a").each(function () {
            if (G.query("queryId", "?" + $(this).attr("data-action")) == queryId) {
                $(this).addClass("onBtn");
                return false;
            }
        });

        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定titleNav
        var magDelText = __sysinfo.level == 0 ? "<span class='text-btn-s' id='magDel'>刪除</span>" : "";
        var titleNav = "<select id='state'><option value='0'>停用</option><option value='1'>凍結</option><option value='2'>啟用</option></select>"
            + "賬號：<input type='text' id='seachName' autocomplete='off' maxlength='15' class='text-input sw90' />"
            + "<span class='text-btn-s' id='search'>查詢</span>"
            + "<span class='text-btn-s' id='magAdd'>新增</span>" + magDelText;

        //绑定数据
        var table = [];
        if (json.table && json.table.length > 0) {
            var ary = json.table;
            var online, uName, val;
            for (var i = 0; i < ary.length; i++) {
                table.push("<tr>");
                for (var n = 0; n < ary[i].length; n++) {
                    for (var m in ary[i][n]) {
                        if (m == "id") {
                            //table.push("<td class='sw30'><input name='" + ary[i][n][m] + "' type='checkbox'></td>");
                        } else if (m == "out") {
                            online = ary[i][n][m] == 1 ? "online" : "offline";
                            table.push("<td class='" + online + " sw50'></td>");
                        } else if (m == "mid") {
                            val = ary[i][n][m];
                            val = val == 2 ? "直屬分公司" : val == 3 ? "直屬股東" : val == 4 ? "直屬總代" : "普通會員";
                            table.push("<td>" + val + "</td>");
                        } else if (m == "uName") {
                            uName = ary[i][n][m];
                            table.push("<td data-name='" + uName + "'>" + uName + "</td>");
                        } else if (m == "c2" || m == "c3" || m == "c4" || m == "c5" || m == "c6") {
                            if (!G.NumberSign(ary[i][n][m])) {
                                table.push("<td class='w5 txt-right'>" + ary[i][n][m] + "</td>");
                            } else if (ary[i][n][m] == 0) {
                                table.push("<td class='w5'>" + ary[i][n][m] + "</td>");
                            } else {
                                table.push("<td class='w5'><a href='javascript:void(0)' data-name='" + uName + "' data-level='" + m.replace("c", "") + "'>" + ary[i][n][m] + "</a></td>");
                            }
                        } else if (m == "cds" || m == "kyr") {
                            table.push("<td class='txt-right'>" + ary[i][n][m] + "</td>");
                        } else if (m == "brk") {
                            val = ary[i][n][m] == 2 ? "gon" : "gun";
                            table.push("<td><p class='fgs " + val + "'>" + ary[i][n][m] + "</p></td>");
                        } else if (m == "genr") {
                            val = ary[i][n][m] == 1 || ary[i][n][m] == 2 ? "zon" : "zun";
                            table.push("<td><p class='fgs " + val + "'>" + ary[i][n][m] + "</p></td>");
                        } else if (m == "manu") {
                            val = ary[i][n][m] == 1 ? "bon" : "zun";
                            table.push("<td><p class='fgs " + val + "'>" + ary[i][n][m] + "</p></td>");
                        } else if (m == "reb") {
                            val = ary[i][n][m] == 1 ? "A" : ary[i][n][m] == 2 ? "B" : "C";
                            table.push("<td>" + val + "</td>");
                        } else if (m == "mode") {
                            val = ary[i][n][m] == 0 ? "信用" : "<span class='green'>現金</span>";
                            table.push("<td>" + val + "</td>");
                        } else if (m == "state") {
                            val = ary[i][n][m] == 2 ? "啟用" : ary[i][n][m] == 1 ? "凍結" : "停用";
                            table.push("<td><a href='javascript:void(0)' data-state='" + ary[i][n][m] + "' data-name='" + uName + "'>" + val + "</a></td>");
                        } else if (m == "sup") {
                            table.push("<td class='txt-left txt-fhs'>" + ary[i][n][m] + "</td>");
                        } else if (m == "ylhs") {
                            table.push("<td><a href='javascript:void(0)' data-type='ylhs' data-name='" + uName + "'>盈利回收</a></td>");
                        } else {
                            table.push("<td>" + ary[i][n][m] + "</td>");
                        }
                    }
                }
                table.push("<td class='sw100'><span class='sp s-22' data-rec='userrebate' data-name='" + uName + "'>退水</span><span class='sp s-44' data-up='userupdate' data-name='" + uName + "'>修改</span><span class='sp s-55' data-fid='login' data-name='" + uName + "'>日誌</span><span class='sp s-99' data-fid='record' data-name='" + uName + "'>記錄</span></td>");
                table.push("</tr>");
            }
        }
        $("#load-middle").html(forceMiddle({ title: title + "管理", thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定事件
        $("#state").val(state).unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "state", val: $(this).val() }) });
        });
        $("#search").unbind("click").click(function () {
            var seachName = $("#seachName").val();
            if (!G.StringSign(seachName)) {
                G.alert({
                    content: "請輸入有效的賬號！",
                    ok: function () {
                        $("#seachName").focus();
                        return true;
                    }
                });
            } else {
                middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "seachName", val: seachName }) });
            }
        });
        $("#load-middle thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#load-middle tbody td input[type='checkbox']").attr("checked", checked);
        });
        var data_stop = true;
        $("#magDel").unbind("click").click(function () {
            var idAry = [];
            $("#load-middle tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾選1個需要“刪除”的賬號！", ok: function () { return true; } });
            } else {
                G.alert({
                    content: "警告：賬號刪除后不可逆，確定刪除嗎？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax("del_user&data=" + idAry.join(","), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    middleBind({ data_action: msg.data_action });
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
        });
        $("#magAdd").unbind("click").click(function () {
            G.mask();
            var data_json;
            G.ajax("adduser&queryId=" + queryId, function (json) {
                G.maskClose();
                data_json = json;
                if (json.result) {
                    alert(json.result);
                } else {
                    table = [];
                    if (queryId == 6) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>選擇上級:</td>");
                        table.push("<td class='txt-left'>");
                        if (__sysinfo.level <= 2) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='2' />分公司</label> "); }
                        if (__sysinfo.level <= 3) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='3' />股東</label> "); }
                        if (__sysinfo.level <= 4) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='4' />總代理</label> "); }
                        if (__sysinfo.level <= 5) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='5' />代理</label>"); }
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>上級<span name='shareRole'></span>:</td>");
                    table.push("<td class='txt-left'><select name='shareName'></select> 餘額:<span name='shareCredits'></span></td>");
                    table.push("</tr>");

                    if (queryId == 6) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>會員盤口:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='rebate' checked='checked' data-value='1' />A盤</label> ");
                        table.push("<label class='label-box'><input type='radio' name='rebate' data-value='2' />B盤</label> ");
                        table.push("<label class='label-box'><input type='radio' name='rebate' data-value='3' />C盤</label>");
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>用戶暱稱:</td>");
                    table.push("<td class='txt-left'><input type='text' name='fatherName' autocomplete='off' maxlength='12' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹個漢字2位字符)、字母、數字、下劃線組成，長度不超過12個英文字符或8個漢字！' /></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>登錄賬號:</td>");
                    table.push("<td class='txt-left'><input type='text' name='userName' autocomplete='off' maxlength='12' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z_]{0,12}$/' mesg='“賬號”由1-12位英文字母、數字、下劃線組成，且第壹位不能是下劃線！' /></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>登錄密碼:</td>");
                    table.push("<td class='txt-left'><input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密碼”必需包含字母、小寫字母和數字組成，長度6-20位！' /></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>信用額度:</td>");
                    table.push("<td class='txt-left'><input type='text' name='credits' autocomplete='off' maxlength='9' value='0' class='text-input sw90' reg='/^[0-9]{1,9}$/' mesg='“信用額度” 由1-9位正整数组成。' /> <span class='red' id='up-rmb'></span></td>");
                    table.push("</tr>");


                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>信用/現金:</td>");
                    table.push("<td class='txt-left'>");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' checked='checked' data-value='0' />信用</label> ");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' data-value='1' />現金</label> ");
                    table.push("</td>");
                    table.push("</tr>");

                    if (queryId == 2) {

                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>试玩帐户:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='testAccountID' checked='checked' data-value='0' />否</label> ");
                        table.push("<label class='label-box'><input type='radio' name='testAccountID' data-value='1' />是</label> ");
                        table.push("</td>");
                        table.push("</tr>");


                        table.push("<tr style='display:" + (__sysinfo.YaoQingID == 0 ? ";" : "none") + "' >");
                        table.push("<td class='w25 bc txt-right'>邀请码:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='YaoQingID' checked='checked' data-value='0' />是</label> ");
                        table.push("<label class='label-box'><input type='radio' name='YaoQingID' data-value='1' />否</label> ");
                        table.push("</td>");
                        table.push("</tr>");

                    }

                    if (queryId != 6) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>補貨設定:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='shipments' checked='checked' data-value='1' />啟用</label> ");
                        table.push("<label class='label-box'><input type='radio' name='shipments' data-value='0' />禁用</label> ");
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    if (queryId == 2) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>剩餘成數:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' checked='checked' data-value='1' />總監</label> ");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' data-value='2' />分公司</label> ");
                        table.push("</td>");
                        table.push("</tr>");

                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>總賬報表:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='generalId' data-value='1' />總賬(非明细)</label> ");
                        table.push("<label class='label-box'><input type='radio' name='generalId' data-value='2' />總賬(包括明細)</label> ");
                        table.push("<label class='label-box'><input type='radio' name='generalId' checked='checked' data-value='0' />關閉</label> ");
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    if (queryId != 1) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'><span name='shareRole'></span>占成:</td>");
                        table.push("<td class='txt-left'><input type='text' name='superior' autocomplete='off' maxlength='3' value='0' class='text-input sw50' reg='/^[0-9]{1,3}$/' mesg='“上级占成” 由1-3位正整数组成。' /> <span name='shareSuperior'></span>%</td>");
                        table.push("</tr>");

                        if (queryId != 6) {
                            table.push("<tr>");
                            table.push("<td class='w25 bc txt-right'>下級限占:</td>");
                            table.push("<td class='txt-left'>");
                            table.push("<label class='label-box'><input type='radio' name='stintId' checked='checked' data-value='yes' />占餘成數下線任占</label> ");
                            table.push("<label class='label-box'><input type='radio' name='stintId' data-value='no' />限制下線占成</label> ");
                            table.push("<input type='text' name='stint' autocomplete='off' maxlength='3' value='-1' class='text-input sw50 hiden' reg='/^[-]?[0-9]+$/' mesg='“下級限占” 由1-3位正整数组成。' />");
                            table.push("</td>");
                            table.push("</tr>");
                        }

                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>退水設定:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<select name='set_water'><option value='0'>全退到底</option><option value='100'>全部賺取</option><option value='0.1'>0.1</option><option value='0.3'>0.3</option><option value='0.5'>0.5</option></select> ");
                        table.push("<input type='text' name='water' autocomplete='off' maxlength='5' value='0' class='text-input sw40' reg='/^[0-9.]+$/' mesg='“自定退水” 0-100之间，允许4位小数组成。' /> 自定設置");
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    var obj, data_stop = true;
                    var role = $("#shell_title").html().replace("管理", "");
                    var content = forceMiddle({ id: "add-user", tbody: table });
                    G.alert({
                        title: "新增" + role, content: content, width: 450,
                        initialize: function () {
                            obj = $("#add-user");
                            rowdata();
                            obj.find("select[name='shareName'] option").remove();
                            for (var i = 0; i < data_json.shareList.length; i++) {
                                for (var n in data_json.shareList[i]) {
                                    obj.find("select[name='shareName']").append("<option value='" + data_json.shareList[i][n] + "'>" + n + "</option>");
                                }
                            }

                            obj.find("input[name='stintId']").unbind("change").change(function () {
                                if ($(this).attr("data-value") == "yes") {
                                    obj.find("input[name='stint']").val("-1").hide();
                                } else {
                                    obj.find("input[name='stint']").val("").show().focus();
                                }
                            });

                            obj.find("select[name='set_water']").unbind("change").change(function () {
                                obj.find("input[name='water']").val($(this).val());
                            });

                            obj.find("input[name='credits']").keyup(function () {
                                $(this).val($(this).val().replace(/[^0-9]/g, ''));
                                $("#up-rmb").html(G.toRmb($(this).val()) || "");
                            });

                            obj.find("select[name='shareName']").unbind("change").change(function () {
                                G.myLayerImg();
                                G.ajax("adduser&queryId=" + queryId + "&shareName=" + $(this).val(), function (myjson) {
                                    G.myLayerImgClose();
                                    data_json = myjson;
                                    rowdata();
                                }, function () { G.myLayerImgClose(); });
                            });

                            obj.find("input[name='radioshareName'][data-value='" + data_json.shareCompId + "']").attr("checked", true);
                            obj.find("input[name='radioshareName']").unbind("change").change(function () {
                                G.myLayerImg();
                                G.ajax("adduser&queryId=" + queryId + "&level=" + $(this).attr("data-value"), function (myjson) {
                                    G.myLayerImgClose();
                                    data_json = myjson;
                                    rowdata(true);
                                }, function () { G.myLayerImgClose(); });
                            });
                            var cheName, mythis;
                            obj.find("input[name='userName']").blur(function () {
                                mythis = $(this);
                                if ($(this).val() != "" && cheName != $(this).val()) {
                                    cheName = $(this).val();
                                    G.ajax("isUserName&name=" + cheName, function (json) {
                                        if (json.result == 1) {
                                            G.myTips({ content: "賬號：" + cheName + " 已註冊使用，請更換其他字母組合！", obj: mythis, myclick: true });
                                        }
                                    });
                                }
                            });

                            function rowdata(mycha) {
                                if (data_json.shareModeSelection == 0) {
                                    obj.find("input[name='modeSelection']").attr("disabled", true);
                                    if (queryId > 2) {
                                        obj.find("input[name='modeSelection']").attr("disabled", true);
                                        obj.find("input[name='modeSelection'][data-value='0']").attr("checked", true);
                                    }
                                } else {
                                    obj.find("input[name='modeSelection']").attr("disabled", false);
                                    if (queryId > 2) {
                                        obj.find("input[name='modeSelection']").attr("disabled", true);
                                        obj.find("input[name='modeSelection'][data-value='1']").attr("checked", true);
                                    }
                                }
                                for (var i in data_json) {
                                    obj.find("span[name='" + i + "']").html(data_json[i]);
                                }
                                if (mycha) {
                                    obj.find("select[name='shareName'] option").remove();
                                    for (var i = 0; i < data_json.shareList.length; i++) {
                                        for (var n in data_json.shareList[i]) {
                                            obj.find("select[name='shareName']").append("<option value='" + data_json.shareList[i][n] + "'>" + n + "</option>");
                                        }
                                    }
                                }
                            }
                        },
                        ok: function () {
                            var a, reg, mesg, value, data = [];
                            obj.find("input").each(function () {
                                if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                    data.push($(this).attr("name") + ":" + $(this).attr("data-value"));
                                } else if ($(this).attr("type") == "text") {
                                    reg = eval($(this).attr("reg"));
                                    value = $(this).val();
                                    data.push($(this).attr("name") + ":" + value);
                                    if ($(this).attr("name") == "pwd") {
                                        if (!G.safety(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    } else if ($(this).attr("name") == "credits" && parseInt(value) > data_json.shareCredits) {
                                        G.myTips({ content: "上级可用餘額：" + data_json.shareCredits, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "credits" && parseInt(value) < data_json.maxCredits) {
                                        G.myTips({ content: "可“回收”剩餘額度：" + data_json.maxCredits, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "superior" && parseInt(value) > data_json.stintOccupyMax) {
                                        G.myTips({ content: "上級最高可設占成：" + data_json.stintOccupyMax + "%", obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "stint" && value != "-1" && parseInt(value) < data_json.stintOccupyMin) {
                                        G.myTips({ content: "下级已分配占成" + data_json.stintOccupyMin + "，可回收占成不可低于" + data_json.stintOccupyMin, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "stint" && value != "-1" && parseInt(value) > parseInt($("span[name='shareSuperior']").text())) {
                                        G.myTips({ content: "上级最高分配占成" + $("span[name='shareSuperior']").text() + "，限制占成不可高于" + $("span[name='shareSuperior']").text(), obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    }
                                    else if (reg) {
                                        if (!reg.test(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    }
                                }
                            });

                            if (data && data.length > 0 && data_stop) {
                                data_stop = false;
                                G.mask();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax("adduser&queryId=" + queryId + "&shareName=" + obj.find("select[name='shareName']").val() + "&data=" + data.join(","), function (json) {
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({
                                            content: "新增成功。",
                                            ok: function () {
                                                return true;
                                            },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });
                                    } else {
                                        G.alert({ content: json.result, ok: function () { return true; } });
                                    }
                                }, function () { G.maskClose(); });
                            }
                        },
                        cancel: function () { }
                    });
                }
            }, function () { G.maskClose(); });


        });
        $("#load-middle tbody a").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_level = $(this).attr("data-level");
            var data_state = $(this).attr("data-state");
            var data_type = $(this).attr("data-type");
            var data_stop = true;
            if (G.NumberSign(data_level)) { //下级查询
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                var referrer = _a({ data_action: msg.data_action, paramName: "nextName", val: data_name });
                referrer = _a({ data_action: referrer, paramName: "queryId", val: data_level });
                referrer = _a({ data_action: referrer, paramName: "black", val: 1 });
                middleBind({ data_action: referrer });
            } else if (G.NumberSign(data_state)) { //修改状态
                var content = "<div id='mystate'>"
                    + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='2' /> 啟用</label>"
                    + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='1' /> 凍結</label>"
                    + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='0' /> 停用</label>"
                    + "</div>";
                G.alert({
                    title: "賬號:" + data_name, content: content,
                    initialize: function () {
                        $("#mystate").find("input[name='state'][value='" + data_state + "']").attr("checked", "checked");
                    },
                    ok: function () {
                        var mystate = $("#mystate").find("input[name='state']:checked").val();
                        if (mystate != data_state && data_stop) {
                            data_stop = false;
                            G.mask();
                            G.ajax("faststate_user&name=" + data_name + "&state=" + mystate, function (json) {
                                G.maskClose();
                                if (json.result == 1) {
                                    $("#load-middle tbody tr td[data-name='" + data_name + "']").parent("tr").html("");
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_type == "ylhs" && data_stop) { //盈利回收
                data_stop = false;
                G.mask();
                S.request = G.ajax("creditschange&name=" + data_name, function (json) {
                    data_stop = true;
                    G.maskClose();
                    var table = [];
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>會員賬號: </td>");
                    table.push("<td class='txt-left'>" + json.userName + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>會員暱稱: </td>");
                    table.push("<td class='txt-left'>" + json.fatherName + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>信用額度:</td>");
                    table.push("<td class='txt-left'>" + json.credits + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>可用額度:</td>");
                    table.push("<td class='txt-left'>" + json.ky + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>盈利額度:</td>");
                    table.push("<td class='txt-left'>" + json.yl + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>回收盈利:</td>");
                    table.push("<td class='txt-left'><input type='text' class='text-input sw70' name='yl'></td>");
                    table.push("</tr>");
                    var content = forceMiddle({ id: "credits-change", tbody: table });
                    G.alert({
                        title: "盈利回收", content: content, width: 280,
                        initialize: function () {
                            $("#credits-change input[name='yl']").keyup(function () {
                                $(this).val($(this).val().replace(/[^0-9]/g, ''));
                            });
                        },
                        ok: function () {
                            var yl = parseInt($("#credits-change input[name='yl']").val());
                            if (G.NumberSign(yl)) {
                                if (yl > parseFloat(json.yl)) {
                                    G.myTips({ content: "回收盈利必須小於盈利額度:" + json.yl, obj: $("#credits-change input[name='yl']"), myclick: true });
                                    return false;
                                } else if (yl <= 0) {
                                    G.myTips({ content: "回收盈利餘額必須大於: 0", obj: $("#credits-change input[name='yl']"), myclick: true });
                                    return false;
                                } else if (data_stop) {
                                    G.mask();
                                    data_stop = false;
                                    S.request = G.ajax("creditschange&name=" + data_name + "&data=" + yl, function (json) {
                                        data_stop = true;
                                        G.maskClose();
                                        if (json.result == 1) {
                                            G.alert({
                                                content: "保存成功。",
                                                ok: function () { return true; },
                                                close: function () { middleBind({ data_action: msg.data_action }); }
                                            });
                                        } else {
                                            G.alert({ content: json.result, ok: function () { return true; } });
                                        }
                                    }, function () { data_stop = true; G.maskClose(); });
                                }
                                return true;
                            }
                        },
                        cancel: function () { }
                    });

                }, function () { G.maskClose(); data_stop = true; });
            }
        });
        $("#load-middle tbody span").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_fid = $(this).attr("data-fid");
            var data_rec = $(this).attr("data-rec");
            var data_up = $(this).attr("data-up");
            if (data_fid) { //日志、记录
                G.mask();
                var data_width;
                var my_action = data_fid + "&name=" + data_name;
                G.ajax(my_action, function (json) {
                    G.maskClose();
                    if (data_fid == "login") {
                        data_width = 500;
                        title = "登錄日誌：" + data_name;
                        thead = ["<input name=\"dellogall\" type=\"checkbox\">", "ID", "登錄時間", "IP地址", "IP歸屬"];
                    } else if (data_fid == "record") {
                        data_width = 890;
                        title = "更變記錄：" + data_name;
                        thead = ["<input name=\"dellogall\" type=\"checkbox\">", "ID", "操作時間", "更變說明", "原始值", "更變值", "操作者", "級別", "IP地址", "IP歸屬"];
                    }
                    table = [];
                    if (json && json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            table.push("<tr>");
                            table.push("<td><input name=\"dellog\" value=\"" + json[i][0] + "\" type=\"checkbox\"></td>");
                            for (var n = 0; n < json[i].length; n++) {
                                table.push("<td>" + json[i][n] + "</td>");
                            }
                            table.push("</tr>");
                        }
                    }
                    var content = G.overflowDiv({ id: "data-login", height: 470, content: (__sysinfo.level == 0 ? forceMiddle2({ thead: thead, tbody: table, fonDiv: true }) : forceMiddle({ thead: thead, tbody: table, fonDiv: true })) });
                    var generatedCount = 1;
                    G.alert({
                        title: title, content: content, width: data_width,
                        initialize: function () {
                            $("#data-login #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + my_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                                appendHtm();
                            });

                            $("#data-login input[name='dellogall']").unbind("change").change(function () {

                                if (!$("#data-login input[name='dellogall']").is(":checked")) {
                                    $("input[name='dellog']").removeAttr("checked");
                                } else {
                                    $("input[name='dellog']").attr("checked", "true");
                                }

                            });

                            $("#data-login #btndellogin").unbind("click").click(function () {

                                var ids = "";

                                $("input[name='dellog']").each(function (idx, ele) {
                                    if ($(ele).is(":checked")) {
                                        ids += $(ele).val() + ",";
                                    }
                                });

                                if (ids == "") {
                                    alert("请选择要删除的记录。");
                                    return;
                                }

                                ids = ids.substring(0, ids.length - 1);


                                G.myLayerImg();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax("dellogin&type=" + (data_fid == "login" ? 0 : 1) + "&ids=" + ids, function (json) {
                                    G.myLayerImgClose();
                                    if (json.result == "1") {

                                        var idsarr = ids.split(',');
                                        for (var idsarrindex = 0; idsarrindex < idsarr.length; idsarrindex++) {
                                            $("#data-login input[value='" + idsarr[idsarrindex] + "']").parent().parent().remove();
                                        }

                                    } else {
                                        alert(json.result);
                                    }
                                }, function () { G.myLayerImgClose(); });

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
                                            table.push("<td><input name=\"dellog\" value=\"" + json[i][0] + "\" type=\"checkbox\"></td>");
                                            for (var n = 0; n < json[i].length; n++) {
                                                table.push("<td>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#data-login tbody").append(table.join(""));
                                    } else {
                                        $("#data-login #fondiv").find("a").hide();
                                        $("#data-login #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () {
                            return true;
                        }
                    });
                }, function () { G.maskClose(); });
            } else if (data_rec) { //修改退水
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                middleBind({ data_action: data_rec + "&name=" + data_name + "&black=1" });
            } else if (data_up) { //修改用户
                G.mask();
                G.ajax(data_up + "&name=" + data_name, function (json) {
                    G.maskClose();
                    table = [];
                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>上級<span name='shareRole'></span>:</td>");
                    table.push("<td class='txt-left'><span name='shareName'></span> 餘額:<span name='shareCredits'></span></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>賬號狀態:</td>");
                    table.push("<td class='txt-left'>");
                    table.push("<label class='label-box'><input type='radio' name='status' data-value='0' />停用</label> ");
                    table.push("<label class='label-box'><input type='radio' name='status' data-value='1' />凍結</label> ");
                    table.push("<label class='label-box'><input type='radio' name='status' data-value='2' />啟用</label>");
                    table.push("</td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>用戶暱稱:</td>");
                    table.push("<td class='txt-left'><input type='text' name='fatherName' autocomplete='off' maxlength='12' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹個漢字2位字符)、字母、數字、下劃線組成，長度不超過12個英文字符或8個漢字！' /></td>");
                    table.push("</tr>");

                    /*table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>登錄賬號:</td>");
                    table.push("<td class='txt-left'><input type='text' name='userName' autocomplete='off' maxlength='12' class='text-input sw90' disabled='disabled' /></td>");
                    table.push("</tr>");*/

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>登錄密碼:</td>");
                    table.push("<td class='txt-left'><input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密碼”必需包含字母、和數字組成，長度6-20位！' /></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>信用額度:</td>");
                    table.push("<td class='txt-left'><input type='text' name='credits' autocomplete='off' maxlength='9' class='text-input sw90' reg='/^[0-9]{1,9}$/' mesg='“信用額度” 由1-9位正整数组成。' /> 可“回收”餘額:<span name='maxCredits'></span><span>&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;");

                    if (__sysinfo.ChongZhiID == 1) {
                        table.push("<a class=\"red\" href=\"javascript:void(0);\" id=\"czbtn\">充值</a>&nbsp;&nbsp;");


                    }
                    if (__sysinfo.TiXianID == 1) {
                        table.push("|&nbsp;&nbsp;<a class=\"red\" href=\"javascript:void(0);\" id=\"txbtn\">提现</a>&nbsp;&nbsp;");

                    }

                    if ((__sysinfo.TiXianID == 1 || __sysinfo.ChongZhiID == 1)) {
                        table.push("<a href=\"javascript:void(0);\" class=\"blue\" id=\"ctbtn\">充提记录</a>");
                    }

                    table.push("&nbsp;&nbsp;]&nbsp;&nbsp;</span></td>");
                    table.push("</tr>");

                    table.push("<tr style='display:none' id='updateuser_tx'>");
                    table.push("<td class='w25 bc txt-right'>提现:</td>");
                    table.push("<td class='txt-left'><input type='text' id='txt_tixian' name='txt_tixian' autocomplete='off' maxlength='20' class='text-input sw90' /><span><input type=\"button\" class=\"d-button d-state-highlight\" id=\"czsubmit_tixian\" value=\"確認\"></span></td>");
                    table.push("</tr>");

                    table.push("<tr style='display:none' id='updateuser_cz'>");
                    table.push("<td class='w25 bc txt-right'>充值:</td>");
                    table.push("<td class='txt-left'><input type='text' id='txt_chongzhi' name='txt_chongzhi' autocomplete='off' maxlength='20' class='text-input sw90' /><span><input type=\"button\" class=\"d-button d-state-highlight\" id=\"czsubmit_chongzhi\" value=\"確認\"></span></td>");
                    table.push("</tr>");


                    if (queryId == 6) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>盤口:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box' name='box-rebate'><input type='radio' name='rebate' data-value='1' />A盤</label> ");
                        table.push("<label class='label-box' name='box-rebate'><input type='radio' name='rebate' data-value='2' />B盤</label> ");
                        table.push("<label class='label-box' name='box-rebate'><input type='radio' name='rebate' data-value='3' />C盤</label>");
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>信用/現金:</td>");
                    table.push("<td class='txt-left'>");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' data-value='0' />信用</label> ");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' data-value='1' />現金</label> ");
                    table.push("</td>");
                    table.push("</tr>");

                    if (queryId == 2) {

                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>试玩帐户:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='testAccountID' data-value='0' />否</label> ");
                        table.push("<label class='label-box'><input type='radio' name='testAccountID' data-value='1' />是</label> ");
                        table.push("</td>");
                        table.push("</tr>");


                        table.push("<tr style='display:" + (__sysinfo.YaoQingID == 0 ? ";" : "none") + "' >");
                        table.push("<td class='w25 bc txt-right'>邀请码:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='YaoQingID' data-value='0' />是</label> ");
                        table.push("<label class='label-box'><input type='radio' name='YaoQingID' data-value='1' />否</label> ");
                        table.push("</td>");
                        table.push("</tr>");

                    }

                    /*if (queryId == 6) {
                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>賬戶盈利:</td>");
                    table.push("<td class='txt-left'><input type='text' name='cashCredits' class='text-input sw90' maxlength='9'  reg='/^[0-9-.]+$/' mesg='“賬戶盈利” 由1-9位正整数或浮点数组成。' /> <span>已回收<span name='cashCreditsBak'></span>盈利</span><p style='margin:2px 0;color:red;'>當天輸贏次日凌晨06:30后與賬戶合併。</p></td>");
                    table.push("</tr>");
                    }*/

                    if (queryId < 6) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>補貨設定:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='shipments' data-value='1' />啟用</label> ");
                        table.push("<label class='label-box'><input type='radio' name='shipments' data-value='0' />禁用</label> ");
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    if (queryId == 2) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>剩餘成數:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' data-value='1' />總監</label> ");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' data-value='2' />分公司</label> ");
                        table.push("</td>");
                        table.push("</tr>");

                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>總賬報表:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='generalId' data-value='1' />總賬(非明细)</label> ");
                        table.push("<label class='label-box'><input type='radio' name='generalId' data-value='2' />總賬(包括明細)</label> ");
                        table.push("<label class='label-box'><input type='radio' name='generalId' data-value='0' />關閉</label> ");
                        table.push("</td>");
                        table.push("</tr>");



                    }

                    if (queryId > 1) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'><span name='shareRole'></span>占成:</td>");
                        table.push("<td class='txt-left'><input type='text' name='superior' autocomplete='off' maxlength='3' class='text-input sw50' reg='/^[0-9]{1,3}$/' mesg='“上级占成” 由1-3位正整数组成。' /> <span name='stintOccupyMax'></span>%</td>");
                        table.push("</tr>");

                        if (queryId < 6) {
                            table.push("<tr>");
                            table.push("<td class='w25 bc txt-right'>下級限占:</td>");
                            table.push("<td class='txt-left'>");
                            table.push("<label class='label-box'><input type='radio' name='stintId' data-value='yes' />占餘成數下線任占</label> ");
                            table.push("<label class='label-box'><input type='radio' name='stintId' data-value='no' />限制下線占成</label> ");
                            table.push("<input type='text' name='stint' autocomplete='off' maxlength='3' class='text-input sw50 hiden' reg='/^[-]?[0-9]+$/' mesg='“下級限占” 由1-3位正整数组成。' />");
                            table.push("</td>");
                            table.push("</tr>");
                        }
                    }

                    if (__sysinfo.uname == "adgues") {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>IP:</td>");
                        table.push("<td class='txt-left'><input type='text' name='IPLocation2' autocomplete='off' maxlength='20' class='text-input sw90' /></td>");
                        table.push("</tr>");
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>地址:</td>");
                        table.push("<td class='txt-left'><input type='text' name='InternetIP2' autocomplete='off' maxlength='12' class='text-input sw90' /></td>");
                        table.push("</tr>");
                    }

                    var obj, data_stop = true;
                    var content = forceMiddle({ id: "up-user", tbody: table });
                    G.alert({
                        title: "修改賬戶：" + data_name, content: content, width: 550,
                        initialize: function () {
                            obj = $("#up-user");
                            obj.find("input[name='userName']").val(data_name);
                            /*if (json.cashCredits < 0 && json.dayDetails == 1) {
                            obj.find("input[name='cashCredits']").attr("disabled", true);
                            }*/
                            for (var i in json) {
                                obj.find("span[name='" + i + "']").html(json[i]);
                                obj.find("input[name='" + i + "'][data-value='" + json[i] + "']").attr("checked", true);
                                obj.find("input[name='" + i + "']").val(json[i]);
                            }
                            if (json.dayDetails == 1) {
                                obj.find("label[name='box-rebate']").hide();
                                obj.find("input[name='rebate'][data-value='" + json.rebate + "']").parent("label").show();
                                obj.find("input[name='superior']").attr("disabled", true);
                            }
                            if (json.isSuperior == 1) { //后台允许无限修改占成
                                obj.find("input[name='superior']").attr("disabled", false);
                            }
                            //不允许修改 账户类型，现金或信用
                            obj.find("input[name='modeSelection']").attr("disabled", true);

                            //信用余额回收计算
                            var creditsCount = parseInt(json.maxCredits) > parseInt(json.credits) ? json.credits : parseInt(json.credits) - parseInt(json.maxCredits);
                            obj.find("span[name='maxCredits']").html(creditsCount);
                            if (json.stint > -1) { //已限占
                                obj.find("input[name='stintId'][data-value='no']").attr("checked", true);
                                obj.find("input[name='stint']").show();
                            } else { //下線任占
                                obj.find("input[name='stintId'][data-value='yes']").attr("checked", true);
                                obj.find("input[name='stint']").hide();
                            }
                            obj.find("input[name='stintId']").unbind("change").change(function () {
                                if ($(this).attr("data-value") == "yes") {
                                    obj.find("input[name='stint']").val("-1").hide();
                                } else {
                                    var value = json.stint == -1 ? "" : json.stint;
                                    obj.find("input[name='stint']").val(value).show().focus();
                                }
                            });

                            obj.find("#czbtn").click(function () {

                                $("#updateuser_tx").hide();
                                $("#updateuser_cz").show();

                            });

                            obj.find("#txbtn").click(function () {

                                $("#updateuser_tx").show();
                                $("#updateuser_cz").hide();

                            });

                            obj.find("#czsubmit_tixian").click(function () {

                                var tixian = $("#txt_tixian");
                                if (tixian.val() == "") {

                                    G.myTips({ content: "請填寫提现金额", obj: tixian, myclick: true });
                                    return;

                                }


                                var priceReg = /^\d+(\.\d+)?$/;
                                if (!priceReg.test(tixian.val())) {
                                    G.myTips({ content: "請填寫正确的金额", obj: tixian, myclick: true });
                                    return;
                                }


                                var maxCredits2 = $("[name='maxCredits']").text();

                                if (parseFloat(maxCredits2) < parseFloat(tixian.val())) {
                                    G.myTips({ content: "提现金额不能大于" + maxCredits2, obj: tixian, myclick: true });
                                    return;
                                }


                                G.mask();
                                var data = [];
                                data.push("username:" + data_name);
                                data.push("jine:" + tixian.val());

                                G.ajax("posttixian&data=" + data.join(","), function (json) {
                                    data_stop = true;
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({
                                            content: "提交成功。", ok: function () { return true; },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });

                                    } else {
                                        alert(json.result);
                                    }
                                }, function () {
                                    G.maskClose();
                                });


                            });


                            obj.find("#czsubmit_chongzhi").click(function () {

                                var chongzhi = $("#txt_chongzhi");
                                if (chongzhi.val() == "") {

                                    G.myTips({ content: "請填寫充值金额", obj: chongzhi, myclick: true });
                                    return;

                                }

                                var priceReg = /^\d+(\.\d+)?$/;
                                if (!priceReg.test(chongzhi.val())) {
                                    G.myTips({ content: "請填寫正确的金额", obj: chongzhi, myclick: true });
                                    return;
                                }

                                if (parseFloat(json.shareCredits2) < parseFloat(chongzhi.val())) {
                                    G.myTips({ content: "充值金额不能大于上级真实余额：" + json.shareCredits2, obj: chongzhi, myclick: true });
                                    return;
                                }


                                G.mask();
                                var data = [];
                                data.push("username:" + data_name);
                                data.push("jine:" + chongzhi.val());

                                G.ajax("postchongzhi&data=" + data.join(","), function (json) {
                                    data_stop = true;
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({
                                            content: "提交成功。", ok: function () { return true; },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });

                                    } else {
                                        alert(json.result);
                                    }
                                }, function () {
                                    G.maskClose();
                                });


                            });


                            obj.find("#ctbtn").click(function () {


                                G.mask();
                                G.ajax("userrechargelog&username=" + data_name, function (json) {
                                    G.maskClose();
                                    var data_table2 = ["<div id='result'>"];
                                    data_table2.push("<div class='history_wrap'>");
                                    data_table2.push("<table class='middle-table'>");
                                    data_table2.push("<thead><tr><th>序号</th><th>操作时间</th><th>操作类型</th><th>金额</th><th>金额变更</th><th>操作者</th><th>IP地址</th><th>IP归属</th></tr></thead>");
                                    data_table2.push("<tbody>");
                                    if (json && json.length > 0) {
                                        var txt_right;
                                        for (var i = 0; i < json.length; i++) {
                                            data_table2.push("<tr>");
                                            for (var n = 0; n < json[i].length; n++) {

                                                data_table2.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                                            }
                                            data_table2.push("</tr>");
                                        }
                                    } else {
                                        data_table2.push("<tr><td colspan='8'>無提充記錄！</td></tr>");
                                    }
                                    data_table2.push("</tbody>");
                                    data_table2.push("</table>");
                                    data_table2.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>");
                                    data_table2.push("</div>");
                                    data_table2.push("</div>");
                                    var content = G.overflowDiv({ content: data_table2.join(""), height: 520 });
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
                                                my_action = G.urlReplace({ url: "?" + "userrechargelog&username=" + data_name, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                }, function () {
                                    G.maskClose();
                                });


                            });
                        },
                        ok: function () {
                            var a, reg, mesg, value, data = [];
                            obj.find("input").each(function () {
                                if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                    data.push($(this).attr("name") + ":" + $(this).attr("data-value"));
                                } else if ($(this).attr("type") == "text" && $(this).attr("name") != "userName") {
                                    reg = eval($(this).attr("reg"));
                                    value = $(this).val();
                                    data.push($(this).attr("name") + ":" + value);
                                    if ($(this).attr("name") == "pwd") {
                                        if (value != "" && !G.safety(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    } else if ($(this).attr("name") == "credits" && parseInt(value) > json.shareCredits) {
                                        G.myTips({ content: "上级可用餘額：" + json.shareCredits, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "credits" && parseInt(value) < json.maxCredits) {
                                        G.myTips({ content: "可“回收”剩餘額度：" + json.maxCredits, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "superior" && parseInt(value) > json.stintOccupyMax) {
                                        G.myTips({ content: "上級最高可設占成：" + json.stintOccupyMax + "%", obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "stint" && value != "-1" && parseInt(value) < json.stintOccupyMin) {
                                        G.myTips({ content: "下级已分配占成" + json.stintOccupyMin + "，可回收占成不可低于" + json.stintOccupyMin, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "stint" && value != "-1" && parseInt(value) > json.stintOccupyMax) {
                                        G.myTips({ content: "上级最高分配占成" + json.stintOccupyMax + "，限制占成不可高于" + json.stintOccupyMax, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    }
                                    else if (reg) {
                                        if (!reg.test(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    }
                                }
                            });

                            if (data && data.length > 0 && data_stop) {
                                data_stop = false;
                                G.mask();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax(data_up + "&name=" + data_name + "&data=" + data.join(","), function (json) {
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({
                                            content: "保存成功。",
                                            ok: function () {
                                                return true;
                                            },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });
                                    } else {
                                        alert(json.result);
                                        data_stop = true;
                                        //G.alert({ content: json.result, ok: function () { return true; } });
                                    }
                                }, function () { G.maskClose(); });
                            }
                        },
                        cancel: function () { }
                    });
                }, function () { G.maskClose(); });
            }
        });

    }, function () {
        G.maskClose();
        G.rollBack();
    });
}

function msglist(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var html = "<table class='middle-table'><thead><tr><th class='w10'>新增日期</th><th>内容</th></tr></thead><tbody>"
            + "<tr><td>2016-09-10 18:02:50</td><td class='txt-left'><b>當您加入本公司成為管理層時，您必須清楚了解及遵從本公司的所有條例。您在本公司網站開出的第壹個下線時，就代表您已同意及接受所有本公司的<a id='notice_rule' style='color: #f00; font-weight: 700;' href='javascript:'>《規則及條例》</a>。</b></td></tr>";
        $.each(json, function (i, o) {
            html += "<tr class='" + (i % 2 == 1 ? "eachColor" : "") + "'><td>" + o.time + "</td><td class='txt-left'>" + o.msg + "</td></tr>";
        });
        html += "</tbody></table>";

        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });
    }, function () {
        G.maskClose();
        G.rollBack();
    });
}

function _a(msg) {
    var page = G.query("page", "?" + msg.data_action);
    var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: page });
    return referrer = G.urlReplace({ url: referrer, paramName: msg.paramName, val: msg.val, pad: true }).replace("?", "");
}

function _f2(v) {
    var v1 = v + "";
    if (v1.indexOf('.') >= 0) {
        var v2 = v1.substring(0, v1.indexOf('.') + 3);
        var i = 0;
        while (i < 3) {
            var pi = v2.substring(v2.length - 1, v2.length);
            if (pi != "0" && pi != ".") {
                break;
            }
            v2 = v2.substring(0, v2.length - 1);
            i++;
        }
        return v2;
    } else {
        return v1;
    }
}

//退水模块
function userrebate(msg) {
    G.scrollLoad({});
    if (S.request) { S.request.abort(); }
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var obj = $("#middleContent #load-middle");
        var name = G.query("name", "?" + msg.data_action);
        var autoGame = G.query("autoGame", "?" + msg.data_action) || json.autoGame;
        var data_stop = true;
        /*if (!autoGame) {
            autoGame = __sysinfo.gameIndex == 1 || __sysinfo.gameIndex == 13 ? 1 : 2;
        }*/
        if (autoGame == 1) { //加载hk and qxc模板
            obj.html(appendMiddle(1, json)).show();
        }
        else { //加载kc模板
            obj.html(appendMiddle(2, json)).show();
        }

        obj.find("em.addBtns").unbind("click").click(function () {
            var av = parseFloat(obj.find("#kc_plwt").val()) * 100;
            obj.find("table[name='data-content'] input[data-a=''],table[name='data-content'] input[data-b=''],table[name='data-content'] input[data-c='']").each(function () {
                var v = $(this).val();
                var v0 = isNaN(v) ? 0 : parseFloat(v) * 100;
                $(this).val(_f2((v0 + av) / 100));
            });
        });

        obj.find("i.minBtns").unbind("click").click(function () {
            var sv = parseFloat(obj.find("#kc_plwt").val()) * 100;
            obj.find("table[name='data-content'] input[data-a=''],table[name='data-content'] input[data-b=''],table[name='data-content'] input[data-c='']").each(function () {
                var v = $(this).val();
                var v0 = isNaN(v) ? 0 : parseFloat(v) * 100;
                $(this).val(v0 - sv > 0 ? _f2((v0 - sv) / 100) : 0);
            });
        });

        obj.find(".btnBS").unbind("click").click(function () {
            var sid = $(this).attr("data-sid");
            var btr = $(this).parent().parent();
            var arrT = ['a', 'b', 'c', 'd', 'e', 'f'];
            $.each(arrT, function (i, t) {
                obj.find("table[name='data-content'] tr[data-sid=" + sid + "] input[data-" + t + "='']").each(function () {
                    $(this).val($(btr).find("input[data-" + t + "='']").val());
                });
            });
        });


        G.mouseover("#load-middle table[name='data-content'] tbody tr");
        var nameStr = name ? "退水盤：" + name : "退水盤 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
        $("#shell_title").html(nameStr);
        if (autoGame == 1) {
            obj.find("#load-userrebate-game-hk #kj #myAutoGame input[name='autoGame'][value='1']").attr("checked", "checked");
        } else {
            obj.find("#load-userrebate-game-kc #kj #myAutoGame input[name='autoGame'][value='2']").attr("checked", "checked");
        }
        obj.find("#kj #myAutoGame input[name='autoGame']").unbind("change").change(function () {
            msg.data_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "autoGame", val: $(this).val(), pad: true }).replace("?", "");
            middleBind({ data_action: msg.data_action });
        });
        if (json.myAutoGame && json.myAutoGame != 0) {
            obj.find("#kj #myAutoGame").remove();
        }
        if (json.rebate) {
            for (var i = 0; i < json.rebate.length; i++) {
                obj.find("table[name='data-content'] div[data-close='0'] input[data-" + json.rebate[i] + "]").attr("disabled", false);
            }
        }
        //提示最高设置值
        obj.find("table[name='data-content'] tbody tr input[type='text']").unbind("focus").focus(function () {
            if (json.parnInt == 1) {
                G.myTips({ obj: $(this), content: "設置範圍:" + $(this).attr("data-minvalue") + "~" + $(this).attr("data-maxvalue") });
            }
        });
        obj.find("table[name='data-content'] tbody tr input[type='text']").unbind("blur").blur(function () {
            G.removeTips();
        });
        obj.find("table[name='data-content'] input[data-number='']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
            if (json.parnInt == 1 && G.NumberSign($(this).val())) {
                if (parseInt($(this).val()) > parseInt($(this).attr("data-maxvalue"))) {
                    $(this).val($(this).attr("data-maxvalue"));
                } else if (parseInt($(this).val()) < parseInt($(this).attr("data-minvalue"))) {
                    $(this).val($(this).attr("data-minvalue"));
                }
            }
        });
        obj.find("table[name='data-content'] input[data-numbertodouble='']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
            if (json.parnInt == 1 && G.DecimalSign($(this).val())) {
                if (parseFloat($(this).val()) > parseFloat($(this).attr("data-maxvalue"))) {
                    $(this).val($(this).attr("data-maxvalue"));
                } else if (parseFloat($(this).val()) < parseFloat($(this).attr("data-minvalue"))) {
                    $(this).val($(this).attr("data-minvalue"));
                }
            }
        });
        //單選玩法類型
        obj.find("table[name='data-content'] input[type='checkbox']").click(function () {
            var objtr = $(this).parent().parent("tr");
            if (objtr.attr("lock") == "") {
                objtr.removeAttr("lock").removeClass("qhs");
            } else {
                objtr.attr("lock", "").addClass("qhs");
            }
        });
        //全選玩法類型
        obj.find("#kj #all").unbind("click").click(function () {
            obj.find("table[name='data-content'] tbody tr").attr("lock", "").addClass("qhs");
            obj.find("table[name='data-content'] tbody input[type='checkbox']").attr("checked", true);
        });
        //重置玩法類型
        obj.find("#kj #reset").unbind("click").click(function () {
            obj.find("table[name='data-content'] tbody tr[lock='']").removeAttr("lock").removeClass("qhs");
            obj.find("table[name='data-content'] tbody td :checked").attr("checked", false);
        });
        //快捷设置参数
        obj.find("#kj #gopart").unbind("click").click(function () {
            var val;
            obj.find("#kj :text").each(function (i) {
                val = $(this).val();
                if (val != "") {
                    val = parseFloat(val);
                    if (i === 0) {
                        obj.find("table[name='data-content'] tr[lock=''] input[data-d='']").each(function () {
                            _isValue($(this), val);
                        });
                    } else if (i === 1) {
                        obj.find("table[name='data-content'] tr[lock=''] input[data-e='']").each(function () {
                            _isValue($(this), val);
                        });
                    } else if (i === 2) {
                        obj.find("table[name='data-content'] tr[lock=''] input[data-f='']").each(function () {
                            _isValue($(this), val);
                        });
                    } else if (i === 3) {
                        obj.find("table[name='data-content'] tr[lock=''] input[data-a='']").each(function () {
                            _isValue($(this), val);
                        });
                    } else if (i === 4) {
                        obj.find("table[name='data-content'] tr[lock=''] input[data-b='']").each(function () {
                            _isValue($(this), val);
                        });
                    } else if (i === 5) {
                        obj.find("table[name='data-content'] tr[lock=''] input[data-c='']").each(function () {
                            _isValue($(this), val);
                        });
                    }
                }
            });
            function _isValue($this, value) {
                var disabled = $this.attr("disabled");
                var minvalue = parseFloat($this.attr("data-minvalue"));
                var maxvalue = parseFloat($this.attr("data-maxvalue"));
                if (!disabled) {
                    if (json.parnInt == 1) {
                        if (value < minvalue) {
                            $this.val(minvalue);
                        } else if (value > maxvalue) {
                            $this.val(maxvalue);
                        } else {
                            $this.val(value);
                        }
                    } else {
                        $this.val(value);
                    }
                }
            }
        });
        //提交参数
        obj.find("#kj #submit").unbind("click").click(function () {
            if (!data_stop) { return false; }
            data_stop = false;
            var index, sort, a, b, c, d, e, f, ary1, ary2 = [];
            obj.find("table[name='data-content'] div[data-close='0']").each(function () {
                ary1 = [];
                index = $(this).attr("data-index");
                $(this).find("tbody tr").each(function () {
                    sort = $(this).attr("data-sort");
                    d = $(this).find("input[data-d='']").val();
                    e = $(this).find("input[data-e='']").val();
                    f = $(this).find("input[data-f='']").val();
                    a = $(this).find("input[data-a='']").val();
                    b = $(this).find("input[data-b='']").val();
                    c = $(this).find("input[data-c='']").val();
                    if (sort && d && e && f && a && b && c)
                        ary1.push(sort + ":" + a + ":" + b + ":" + c + ":" + d + ":" + e + ":" + f);
                });
                if (ary1.length > 0)
                    ary2.push(_indexToString(index, ary1));
            });
            G.mask();
            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "autoGame", val: autoGame, pad: true }).replace("?", "");
            if (S.request) { S.request.abort(); }
            S.request = G.ajax(referrer + "&data=true&" + ary2.join("&"), function (json) {
                data_stop = true;
                G.maskClose();
                if (json.result == 1) {
                    G.alert({
                        content: "保存成功。",
                        ok: function () { return true; },
                        close: function () {
                            if (S.backList) {
                                $("#shell_top #btn-back").click();
                            }
                        }
                    });
                } else {
                    G.alert({ content: json.result, ok: function () { return true; } });
                }
            }, function () { G.maskClose(); });

            function _indexToString(index, ary) {
                return index + "Data=" + ary.join(",");
            }
        });



    }, function () {
        G.maskClose();
        G.rollBack();
    });


    function appendMiddle(int, msg) {
        var htm = [], data_sort, data_val, data_shaer;
        if (int == 1) {
            htm.push("<div id='load-userrebate-game-hk'>");
            htm.push(_kj(msg.settings));
            htm.push("<table border='0'cellpadding='0' cellspacing='0' width='100%' name='data-content'><thead><tr><td>");

            if (msg.hk) {
                htm.push("<div data-close='" + msg.hk.close + "' data-index='hk' class='acion'>"); //●●香港樂透(HK) start●●
                htm.push("<table class='middle-table'><thead><tr><th>香港樂透(HK)</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 29; i++) {
                    data_sort = i + 1;
                    data_val = msg.hk.row[i];
                    data_shaer = msg.hk.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsHK(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 29; i < 57; i++) {
                    data_sort = i + 1;
                    data_val = msg.hk.row[i];
                    data_shaer = msg.hk.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsHK(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●香港樂透(HK) end●●
            }

            htm.push("</td></tr></thead></table>");
            htm.push("</div>");
        } else if (int == 2) {
            htm.push("<div id='load-userrebate-game-kc'>" + _kj(msg.settings));
            htm.push("<table border='0'cellpadding='0' cellspacing='0' width='100%' name='data-content'><thead><tr><td>");
            if (msg.klc) {
                htm.push("<div data-close='" + msg.klc.close + "' data-index='klc' class='acion'>"); //●●廣東快樂十分 start●●
                htm.push("<table class='middle-table'><thead><tr><th>廣東快樂十分</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 7; i++) {
                    data_sort = i + 1;
                    data_val = msg.klc.row[i];
                    data_shaer = msg.klc.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsKLC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 7; i < 14; i++) {
                    data_sort = i + 1;
                    data_val = msg.klc.row[i];
                    data_shaer = msg.klc.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsKLC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●廣東快樂十分 end●●
            }

            if (msg.ssc) {
                htm.push("<div data-close='" + msg.ssc.close + "' data-index='ssc' class='acion'>"); //●●重慶時時彩 start●●
                htm.push("<table class='middle-table'><thead><tr><th>重慶時時彩</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 5; i++) {
                    data_sort = i + 1;
                    data_val = msg.ssc.row[i];
                    data_shaer = msg.ssc.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsSSC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 5; i < 9; i++) {
                    data_sort = i + 1;
                    data_val = msg.ssc.row[i];
                    data_shaer = msg.ssc.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsSSC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●重慶時時彩 end●●
            }

            if (msg.sscjs) {
                htm.push("<div data-close='" + msg.sscjs.close + "' data-index='sscjs' class='acion'>"); //●●重慶時時彩 start●●
                htm.push("<table class='middle-table'><thead><tr><th>极速時時彩</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 5; i++) {
                    data_sort = i + 1;
                    data_val = msg.sscjs.row[i];
                    data_shaer = msg.sscjs.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsSSC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 5; i < 9; i++) {
                    data_sort = i + 1;
                    data_val = msg.sscjs.row[i];
                    data_shaer = msg.sscjs.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsSSC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●重慶時時彩 end●●
            }


            if (msg.pk) {
                htm.push("<div data-close='" + msg.pk.close + "' data-index='pk' class='acion'>"); //●●北京賽車(PK10) start●●
                htm.push("<table class='middle-table'><thead><tr><th>北京賽車(PK10)</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 3; i++) {
                    data_sort = i + 1;
                    data_val = msg.pk.row[i];
                    data_shaer = msg.pk.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsPK(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 3; i < 6; i++) {
                    data_sort = i + 1;
                    data_val = msg.pk.row[i];
                    data_shaer = msg.pk.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsPK(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●北京賽車(PK10) end●●
            }


            if (msg.pkjs) {
                htm.push("<div data-close='" + msg.pkjs.close + "' data-index='pkjs' class='acion'>"); //●●极速賽車 start●●
                htm.push("<table class='middle-table'><thead><tr><th>极速賽車</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 3; i++) {
                    data_sort = i + 1;
                    data_val = msg.pkjs.row[i];
                    data_shaer = msg.pkjs.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsPKJS(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 3; i < 6; i++) {
                    data_sort = i + 1;
                    data_val = msg.pkjs.row[i];
                    data_shaer = msg.pkjs.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsPKJS(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●极速賽車 end●●
            }

            if (msg.ks) {
                htm.push("<div data-close='" + msg.ks.close + "' data-index='ks' class='acion'>"); //●●江蘇骰寶(快3) start●●
                htm.push("<table class='middle-table'><thead><tr><th>江蘇骰寶(快3)</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 4; i++) {
                    data_sort = i + 1;
                    data_val = msg.ks.row[i];
                    data_shaer = msg.ks.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsKS(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 4; i < 7; i++) {
                    data_sort = i + 1;
                    data_val = msg.ks.row[i];
                    data_shaer = msg.ks.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsKS(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●江蘇骰寶(快3) end●●
            }


            if (msg.gxks) {
                htm.push("<div data-close='" + msg.gxks.close + "' data-index='gxks' class='acion'>"); //●●江蘇骰寶(快3) start●●
                htm.push("<table class='middle-table'><thead><tr><th>广西快3</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 4; i++) {
                    data_sort = i + 1;
                    data_val = msg.gxks.row[i];
                    data_shaer = msg.gxks.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsGXKS(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 4; i < 7; i++) {
                    data_sort = i + 1;
                    data_val = msg.gxks.row[i];
                    data_shaer = msg.gxks.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsGXKS(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●广西快3 end●●
            }


            if (msg.klb) {
                htm.push("<div data-close='" + msg.klb.close + "' data-index='klb' class='acion'>"); //●●北京快樂8 start●●
                htm.push("<table class='middle-table'><thead><tr><th>北京快樂8</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 4; i++) {
                    data_sort = i + 1;
                    data_val = msg.klb.row[i];
                    data_shaer = msg.klb.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsKLB(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 4; i < 8; i++) {
                    data_sort = i + 1;
                    data_val = msg.klb.row[i];
                    data_shaer = msg.klb.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsKLB(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●北京快樂8 end●●
            }

            if (msg.nc) {
                htm.push("<div data-close='" + msg.nc.close + "' data-index='nc' class='acion'>"); //●●重慶幸運農場 start●●
                htm.push("<table class='middle-table'><thead><tr><th>重慶幸運農場</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 7; i++) {
                    data_sort = i + 1;
                    data_val = msg.nc.row[i];
                    data_shaer = msg.nc.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsNC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 7; i < 14; i++) {
                    data_sort = i + 1;
                    data_val = msg.nc.row[i];
                    data_shaer = msg.nc.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsNC(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●重慶幸運農場 end●●
            }

            if (msg.ft) {
                htm.push("<div data-close='" + msg.ft.close + "' data-index='ft' class='acion'>"); //●●幸运飞艇 start●●
                htm.push("<table class='middle-table'><thead><tr><th>幸運飛艇</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 3; i++) {
                    data_sort = i + 1;
                    data_val = msg.ft.row[i];
                    data_shaer = msg.ft.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsPK(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 3; i < 6; i++) {
                    data_sort = i + 1;
                    data_val = msg.ft.row[i];
                    data_shaer = msg.ft.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsPK(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●幸运飞艇 end●●
            }

            if (msg.gx) {
                htm.push("<div data-close='" + msg.gx.close + "' data-index='gx' class='acion'>"); //●●廣西快樂十分 start●●
                htm.push("<table class='middle-table'><thead><tr><th>廣西快樂十分</th></tr></thead></table>");
                htm.push("<div style='float:left;width:49.9%'><table class='middle-table bor-top'><tbody>");  //●●left start●●
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 0; i < 3; i++) {
                    data_sort = i + 1;
                    data_val = msg.gx.row[i];
                    data_shaer = msg.gx.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsGX(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●left end●●
                //●●right start●●
                htm.push("<div style='float:right;width:49.9%'><table class='middle-table bor-top'><tbody>");
                htm.push("<tr class='bc'><td class='w15'>類型</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤</td><td>B盤</td><td>C盤</td></tr>");
                for (var i = 3; i < 6; i++) {
                    data_sort = i + 1;
                    data_val = msg.gx.row[i];
                    data_shaer = msg.gx.shaerRow[i];
                    htm.push("<tr data-sid='" + data_shaer[6] + "' data-sort='" + data_sort + "'>");
                    htm.push("<td class='bc'><label class='lBg" + data_shaer[6] + "'></label>" + FormatTsGX(data_sort) + "</td>");
                    htm.push("<td><input type='text' data-d='' class='text-input sw70' data-number='' maxlength='3' data-maxvalue='100' data-minvalue='" + data_shaer[0] + "' data-sort='" + data_sort + "' value='" + data_val[0] + "' /></td>");
                    htm.push("<td><input type='text' data-e='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[1] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[1] + "' /></td>");
                    htm.push("<td><input type='text' data-f='' class='text-input sw70' data-number='' maxlength='7' data-maxvalue='" + data_shaer[2] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[2] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-a='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[3] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[3] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-b='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[4] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[4] + "' /></td>");
                    htm.push("<td><input disabled='' type='text' data-c='' class='text-input sw50' data-numbertodouble='' maxlength='5' data-maxvalue='" + data_shaer[5] + "' data-minvalue='0' data-sort='" + data_sort + "' value='" + data_val[5] + "' /></td>");

                    htm.push("</tr>");
                }
                htm.push("</tbody></table><div class='clear'></div></div>"); //●●right end●●
                htm.push("</div>"); //●●廣西快樂十分 end●●
            }
            htm.push("</td></tr></thead></table>");
            htm.push("</div>");
        }

        function _kj(ss) {
            var ch = [{ key: "tm", num: 1, name: "特碼類(第一球、第二球、冠軍 …)" }, { key: "lmp", num: 2, name: "兩面類(單雙、大小、龍虎 …)" }, { key: "lm", num: 3, name: "連碼類(任選二、任選三 …)" }];

            var _kjHtml = "<table class='t_list' style='margin-bottom:3px'><tbody class='list_hover'><tr class='tractive'><td width='130'>退水微調</td>"
                + "<td width='150'><em class='addBtns'></em><i class='minBtns'></i><input type='text' value='0.1' id='kc_plwt' class='text zk plNumber w80'></td>"
                + "<td style='text-align:left;padding-left:5px;'>在這裏對全局退水進行統壹微調</td></tr></tbody></table>";

            _kjHtml = _kjHtml + "<table class='t_list' ><tbody><tr><th colspan='8'>大項快速設置【<b class='red'>註意：設置高於上級最高限制時按最高可調</b>】</th></tr>"
                + "<tr><td class='tdbg1'>調整項目</td> <td class='tdbg1' style=''>A盤</td> <td class='tdbg1' style=''>B盤</td> <td class='tdbg1' style=''>C盤</td>"
                + "<td class='tdbg1'>單注限額</td><td class='tdbg1'>單期限額</td><td class='tdbg1'>最小單注</td><td class='tdbg1'>操作</td></tr></tbody>";
            for (var ii = 0; ii < ss.length; ii++) {
                _kjHtml = _kjHtml + "<tbody class='list_hover' ><tr style='' class=''><td>" + ch[ii].name + "</td><td style=''><label class='lBg" + ch[ii].num + "'></label>"
                    + "<input type='text' name='" + ch[ii].key + "_pk_a' id='" + ch[ii].key + "_pk_a' data-a class='text zk plNumber w80' value='" + ss[ii][4] + "'></td><td style=''>"
                    + "<input type='text' name='" + ch[ii].key + "_pk_b' id='" + ch[ii].key + "_pk_b' data-b class='text zk plNumber w80' value= '" + ss[ii][5] + "'></td >"
                    + "<td style=''><input type='text' name='" + ch[ii].key + "_pk_c' data-c id='" + ch[ii].key + "_pk_c' class='text zk plNumber w80' value='" + ss[ii][6] + "'></td>"
                    + "<td><input type='text' name='" + ch[ii].key + "_max_amount' data-e id='" + ch[ii].key + "_max_amount' class='text zk onlyNum w80' value='" + ss[ii][2] + "'></td>"
                    + "<td><input type='text' name='" + ch[ii].key + "_phase_amount' data-f id='" + ch[ii].key + "_phase_amount' class='text zk onlyNum w80' value='" + ss[ii][3] + "'></td>"
                    + "<td><input type='text' name='" + ch[ii].key + "_single_min_amount' data-d id='" + ch[ii].key + "_single_min_amount' class='text zk onlyNum w80' value='" + ss[ii][1] + "'></td>"
                    + "<td><label class='lBg" + ch[ii].num + "'></label><button type='button' name='btn" + ch[ii].key.toUpperCase() + "' id='btn" + ch[ii].key.toUpperCase() + "' data-sid='" + ch[ii].num + "' class='btn btntb btnBS'>修改</button></td></tr></tbody>";
            }

            _kjHtml = _kjHtml + "</table > "
                + "<table class='middle-table' id='kj'>"
                + "<tfoot>"
                + "<tr>"
                + "<td colspan='6' style='height:30px;'>"
                + "<span class='text-btn' id='submit'>保存設置</span>"
                + "<span class='text-btn' id='gopart'>送出</span>"
                //+ "<span class='text-btn' id='reset'>重置</span>"
                //+ "<span class='text-btn' id='all'>全選</span>"
                + "<div id='myAutoGame' style='float:right;margin-right:10px;'><label class='cursor'>一般彩<input type='radio' name='autoGame' value='1' /></label>&nbsp;&nbsp;<label class='cursor'>快彩<input type='radio' name='autoGame' value='2' /></label></div>"
                + "</td>"
                + "</tr>"
                + "</tfoot>"
                + "</table>";
            return _kjHtml;
        }
        return htm.join("");
    }
}

//子账户模块
function manager(msg) {
    var title, data_bc;
    var state = G.query("state", "?" + msg.data_action);
    title = "子賬管理";
    var thead = ["<input name='all' type='checkbox'>", "在線", "賬號", "暱稱", "註冊日期", "狀態", "功能"];
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();

        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定titleNav
        var magDelText = __sysinfo.level == 0 ? "<span class='text-btn-s' id='magDel'>刪除</span>" : "";
        var titleNav = "<select id='state'><option value='0'>停用</option><option value='1'>凍結</option><option value='2'>啟用</option></select>"
            + "賬號：<input type='text' id='seachName' autocomplete='off' maxlength='15' class='text-input sw90' />"
            + "<span class='text-btn-s' id='search'>查詢</span>"
            + "<span class='text-btn-s' id='magAdd'>新增</span>"
            + "<span class='text-btn-s' id='magDel'>刪除</span>";

        //绑定数据
        var table = [];
        if (json.table && json.table.length > 0) {
            var ary = json.table;
            var online, uName, val, bc;
            for (var i = 0; i < ary.length; i++) {
                bc = i % 2 == 0 ? "" : "bc";
                table.push("<tr class='" + bc + "'>");
                for (var n = 0; n < ary[i].length; n++) {
                    for (var m in ary[i][n]) {
                        if (m == "id") {
                            table.push("<td class='sw30'><input name='" + ary[i][n][m] + "' type='checkbox'></td>");
                        } else if (m == "out") {
                            online = ary[i][n][m] == 1 ? "online" : "offline";
                            table.push("<td class='" + online + " sw50'></td>");
                        } else if (m == "uName") {
                            uName = ary[i][n][m];
                            table.push("<td data-name='" + uName + "'>" + uName + "</td>");
                        } else if (m == "state") {
                            val = ary[i][n][m] == 2 ? "啟用" : ary[i][n][m] == 1 ? "凍結" : "停用";
                            table.push("<td class='sw70'><a href='javascript:void(0)' data-state='" + ary[i][n][m] + "' data-name='" + uName + "'>" + val + "</a></td>");
                        }
                        else {
                            table.push("<td>" + ary[i][n][m] + "</td>");
                        }
                    }
                }
                table.push("<td class='w15'><span class='sp s-44' data-up='managerupdate' data-name='" + uName + "'>修改</span><span class='sp s-55' data-fid='login' data-name='" + uName + "'>日誌</span><span class='sp s-99' data-fid='record' data-name='" + uName + "'>記錄</span></td>");
                table.push("</tr>");
            }
        }
        $("#load-middle").html(forceMiddle({ title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定事件
        $("#state").val(state).unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "state", val: $(this).val() }) });
        });
        $("#search").unbind("click").click(function () {
            var seachName = $("#seachName").val();
            if (!G.StringSign(seachName)) {
                G.alert({
                    content: "請輸入有效的賬號！",
                    ok: function () {
                        $("#seachName").focus();
                        return true;
                    }
                });
            } else {
                middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "seachName", val: seachName }) });
            }
        });
        $("#load-middle thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#load-middle tbody td input[type='checkbox']").attr("checked", checked);
        });
        $("#magDel").unbind("click").click(function () {
            var idAry = [];
            $("#load-middle tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾選1個需要“刪除”的賬號！", ok: function () { return true; } });
            } else {
                G.alert({
                    content: "警告：賬號刪除后不可逆，確定刪除嗎？",
                    ok: function () {
                        G.mask();
                        G.ajax("del_manager&data=" + idAry.join(","), function (json) {
                            G.maskClose();
                            if (json.result == 1) {
                                middleBind({ data_action: msg.data_action });
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); });
                        return true;
                    },
                    cancel: function () { }
                });
            }
        });
        $("#magAdd").unbind("click").click(function () {
            G.mask();
            G.ajax("manageradd", function (json) {
                G.maskClose();
                var htm = [];
                 htm.push("<div id='manageradd'>");
                htm.push("<table class='middle-table'>");
                htm.push("<tbody>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>賬戶狀態:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<label class='label-box'><input type='radio' name='state' value='0'>停用</label>");
                htm.push("<label class='label-box'><input type='radio' name='state' value='1'>凍結</label>");
                htm.push("<label class='label-box'><input type='radio' name='state' value='2' checked='checked'>啟用</label>");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>用戶暱稱:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<input type='text' name='fatherName' autocomplete='off' maxlength='9' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹個漢字2位字符)、字母、數字、下劃線組成，長度不超過12個英文字符或8個漢字！' />");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>登錄賬號:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<input type='text' name='userName' maxlength='12' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z_]{0,12}$/' mesg='“賬號”由1-12位英文字母、數字、下劃線組成，且第壹位不能是下劃線！' />");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>登錄密碼:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密碼”必需包含字母、和數字組成，長度6-20位！' />");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("</tbody>");
                htm.push("</table>");
                htm.push("<div class='clear'></div>");
                htm.push("<table class='middle-table'>");
                htm.push("<thead><tr><th colspan='4'>權限設置</th></tr></thead>");
                htm.push("<tbody>");

                htm.push("<tr>");
                htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='userManageId'>賬戶管理</label></td>");
                htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='gameInfoId'>即時注單</label></td>");
                htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='detailsId'>報表查詢</label></td>");
               // htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='shipmentsId'>補貨設定</label></td>");
				 htm.push("<td><label class='label-box'><input type='checkbox'  name='shipmentsId'>補貨設定</label></td>");
                htm.push("</tr>");
                if (__sysinfo.level <= 1) {
                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='newsInfoId'>公告管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='setOddsId'>賠率設置</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='autoOddsId'>自動跳水</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='onLineId'>在線查詢</label></td>");
                    htm.push("</tr>");



                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoId'>註單管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='GlobalrID'>系统设置</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='UserRebateID'>水位设置</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='SetNumberID'>快彩封盤設置</label></td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                    htm.push("<td></td>");
                    htm.push("<td></td>");
                    htm.push("</tr>");

                }
                if (__sysinfo.level == 0) {
                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='operatingLogId'>操作日誌</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='openNumberId'>開獎管理</label></td>");
                    //htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoId'>註單管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoAllId'>后台設置</label></td>");
                    htm.push("</tr>");

                    //htm.push("<tr>");
                    //htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                    //htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                    //htm.push("<td></td>");
                    //htm.push("<td></td>");
                    //htm.push("</tr>");
                }



                htm.push("</tbody>");
                htm.push("</table>");
                htm.push("</div>");
                var content = htm.join("");
                var obj, data_stop = true;
                G.alert({
                    title: "新增子賬", content: content, width: 450,
                    initialize: function () {
                        obj = $("#manageradd");
                        for (var i in json) {
                            if (json[i] && json[i] == 1) {
                                obj.find("input[name='" + i + "']").attr({ "disabled": false, "checked": true });
                            }
                        }
                        var cheName, mythis;
                        obj.find("input[name='userName']").blur(function () {
                            mythis = $(this);
                            if ($(this).val() != "" && cheName != $(this).val()) {
                                cheName = $(this).val();
                                G.ajax("isUserName&name=" + cheName, function (json) {
                                    if (json.result == 1) {
                                        G.myTips({ content: "賬號：" + cheName + " 已註冊使用，請更換其他字母組合！", obj: mythis, myclick: true });
                                    }
                                });
                            }
                        });
                    },
                    ok: function () {
                        var data = [], checked, mesg, reg, value;
                        obj.find("input").each(function () {
                            if ($(this).attr("type") == "text") {
                                value = $(this).val();
                                data.push($(this).attr("name") + ":" + value);
                                reg = eval($(this).attr("reg"));
                                mesg = $(this).attr("mesg");
                                if ($(this).attr("name") == "pwd" && !G.safety(value)) {
                                    if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                    data = false;
                                    return false;
                                } else if (reg && !reg.test(value)) {
                                    if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                    data = false;
                                    return false;
                                }
                            } else if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                data.push($(this).attr("name") + ":" + $(this).val());
                            } else if ($(this).attr("type") == "checkbox") {
                                checked = $(this).attr("checked") ? 1 : 0;
                                data.push($(this).attr("name") + ":" + checked);
                            }
                        });
                        if (data && data.length > 0 && data_stop) {
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            G.mask();
                            S.request = G.ajax("manageradd&data=" + data.join(","), function (json) {
                                G.maskClose();
                                if (json.result == 1) {
                                    G.alert({
                                        content: "新增成功。",
                                        ok: function () { return true; },
                                        close: function () {
                                            middleBind({ data_action: msg.data_action });
                                        }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); });
                        }
                    },
                    cancel: function () { }
                });
            }, function () { G.maskClose(); });
        });
        $("#load-middle tbody a").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_state = $(this).attr("data-state");
            var data_stop = true;
            var content = "<div id='mystate'>"
                + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='2' /> 啟用</label>"
                + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='1' /> 凍結</label>"
                + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='0' /> 停用</label>"
                + "</div>";
            G.alert({
                title: "賬號:" + data_name, content: content,
                initialize: function () {
                    $("#mystate").find("input[name='state'][value='" + data_state + "']").attr("checked", "checked");
                },
                ok: function () {
                    var mystate = $("#mystate").find("input[name='state']:checked").val();
                    if (mystate != data_state && data_stop) {
                        data_stop = false;
                        G.mask();
                        G.ajax("faststate_manager&name=" + data_name + "&state=" + mystate, function (json) {
                            G.maskClose();
                            if (json.result == 1) {
                                $("#load-middle tbody tr td[data-name='" + data_name + "']").parent("tr").html("");
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); });
                    }
                    return true;
                },
                cancel: function () { }
            });
        });
        $("#load-middle tbody span").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_fid = $(this).attr("data-fid");
            var data_up = $(this).attr("data-up");
            if (data_fid) { //日志、记录
                G.mask();
                var data_width;
                var my_action = data_fid + "&name=" + data_name;
                G.ajax(my_action, function (json) {
                    G.maskClose();
                    if (data_fid == "login") {
                        data_width = 500;
                        title = "登錄日誌：" + data_name;
                        thead = ["ID編號", "登錄時間", "IP地址", "IP歸屬"];
                    } else if (data_fid == "record") {
                        data_width = 890;
                        title = "更變記錄：" + data_name;
                        thead = ["ID", "操作時間", "更變說明", "原始值", "更變值", "操作者", "級別", "IP地址", "IP歸屬"];
                    }
                    table = [];
                    if (json && json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            table.push("<tr>");
                            for (var n = 0; n < json[i].length; n++) {
                                table.push("<td>" + json[i][n] + "</td>");
                            }
                            table.push("</tr>");
                        }
                    }
                    var content = G.overflowDiv({ id: "data-login", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
                    var generatedCount = 1;
                    G.alert({
                        title: title, content: content, width: data_width,
                        initialize: function () {
                            $("#data-login #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + my_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                                table.push("<td>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#data-login tbody").append(table.join(""));
                                    } else {
                                        $("#data-login #fondiv").find("a").hide();
                                        $("#data-login #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () {
                            return true;
                        }
                    });
                }, function () { G.maskClose(); });
            } else if (data_up) { //修改
                G.mask();
                G.ajax(data_up + "&name=" + data_name, function (json) {
                    G.maskClose();
                    var htm = [];
                     htm.push("<div id='managerupdate'>");
                    htm.push("<table class='middle-table'>");
                    htm.push("<tbody>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>賬戶狀態2:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<label class='label-box'><input type='radio' name='state' value='0'>停用</label>");
                    htm.push("<label class='label-box'><input type='radio' name='state' value='1'>凍結</label>");
                    htm.push("<label class='label-box'><input type='radio' name='state' value='2'>啟用</label>");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>用戶暱稱:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<input type='text' name='fatherName' autocomplete='off' maxlength='9' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹個漢字2位字符)、字母、數字、下劃線組成，長度不超過12個英文字符或8個漢字！' />");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>登錄賬號:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<input type='text' name='userName' disabled='disabled' class='text-input sw90' />");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>登錄密碼:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密碼”必需包含字母、和數字組成，長度6-20位！' />");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("</tbody>");
                    htm.push("</table>");
                    htm.push("<div class='clear'></div>");
                    htm.push("<table class='middle-table'>");
                    htm.push("<thead><tr><th colspan='4'>權限設置</th></tr></thead>");
                    htm.push("<tbody>");

                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' name='userManageId'>賬戶管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' name='gameInfoId'>即時注單</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' name='detailsId'>報表查詢</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' name='shipmentsId'>補貨設定</label></td>");
                    htm.push("</tr>");
                    if (__sysinfo.level <= 1) {
                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='newsInfoId'>公告管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='setOddsId'>賠率設置</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='autoOddsId'>自動跳水</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='onLineId'>在線查詢</label></td>");
                        htm.push("</tr>");



                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoId'>註單管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='GlobalrID'>系统设置</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='UserRebateID'>水位设置</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='SetNumberID'>快彩封盤設置</label></td>");
                        htm.push("</tr>");

                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                        htm.push("<td></td>");
                        htm.push("<td></td>");
                        htm.push("</tr>");

                    }
                    if (__sysinfo.level == 0) {
                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='operatingLogId'>操作日誌</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='openNumberId'>開獎管理</label></td>");
                       //htm.push("<td><label class='label-box'><input type='checkbox' name='reportInfoId'>註單管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='reportInfoAllId'>后台設置</label></td>");
                        htm.push("</tr>");

                        //htm.push("<tr>");
                        //htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                        //htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                        //htm.push("<td></td>");
                        //htm.push("<td></td>");
                        //htm.push("</tr>");
                    }

                    htm.push("</tbody>");
                    htm.push("</table>");
                    htm.push("</div>");
                    var content = htm.join("");
                    var obj, data_stop = true;
                    G.alert({
                        title: "修改子賬：" + data_name, content: content, width: 450,
                        initialize: function () {
                            obj = $("#managerupdate");
                            obj.find("input[name='fatherName']").val(json.fatherName);
                            obj.find("input[name='userName']").val(json.userName);
                            obj.find("input[name='state'][value='" + json.state + "']").attr("checked", "checked");
                            for (var i in json) {
                                if (typeof json[i] == "object") {
                                    obj.find("input[name='" + i + "']").attr({
                                        "checked": json[i][0] == 1 ? true : false,
                                        "disabled": json[i][1] == 0 ? true : false
                                    });
                                }
                            }
                        },
                        ok: function () {
                            var data = [], checked, mesg, reg, value;
                            obj.find("input").each(function () {
                                if ($(this).attr("type") == "text") {
                                    value = $(this).val();
                                    data.push($(this).attr("name") + ":" + value);
                                    reg = eval($(this).attr("reg"));
                                    mesg = $(this).attr("mesg");
                                    if ($(this).attr("name") == "pwd") {
                                        if (value != "" && !G.safety(value)) {
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    } else if (reg && !reg.test(value)) {
                                        if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                        data = false;
                                        return false;
                                    }
                                } else if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                    data.push($(this).attr("name") + ":" + $(this).val());
                                } else if ($(this).attr("type") == "checkbox") {
                                    checked = $(this).attr("checked") ? 1 : 0;
                                    data.push($(this).attr("name") + ":" + checked);
                                }
                            });
                            if (data && data.length > 0 && data_stop) {
                                data_stop = false;
                                if (S.request) { S.request.abort(); }
                                G.mask();
                                S.request = G.ajax(data_up + "&name=" + data_name + "&data=" + data.join(","), function (json) {
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({
                                            content: "保存成功。",
                                            ok: function () { return true; },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });
                                    } else {
                                        G.alert({ content: json.result, ok: function () { return true; } });
                                    }
                                }, function () { G.maskClose(); });
                            }
                        },
                        cancel: function () { }
                    });

                }, function () { G.maskClose(); });
            }
        });
    }, function () {
        G.maskClose();
        G.rollBack();
    });
}

//历史开奖模块
function result(msg) {
    //加载数据
    G.scrollLoad({});
    if (S.request) { S.request.abort(); }
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        var title = "歷史開獎", data_thead, data_width, data_bc;
        switch (gameIndex) {
            case 1: //香港HK
                data_width = 890;
                data_thead = "<tr><th class='w15'>期號</th><th class='w15'>期數日期</th><th colspan='14' width='392'>開獎號碼</th><th colspan='3'>總和</th><th>7色波</th><th colspan='6'>特碼兩面</th></tr>";
                break;
            case 7:
            case 2: //广东快乐十分
                data_width = 890;
                data_thead = "<tr><th class='w15'>期號</th><th class='w15'>期數日期</th><th colspan='8' width='224'>開獎號碼</th><th colspan='4'>總和</th><th colspan='4'>1-4龍虎</th></tr>";
                break;
            case 3: //重庆时时彩
            case 15:
                data_width = 800;
                data_thead = "<tr><th class='w15'>期號</th><th>期數日期</th><th colspan='5'  width='140'>開獎號碼</th><th colspan='3'>總和</th><th>龍虎</th><th>前三</th><th>中三</th><th>后三</th></tr>";
                break;
            case 4: //北京赛车PK10
            case 14: //极速赛车
            case 8:
                data_width = 950;
                data_thead = "<tr><th class='w15'>期號</th><th class='w15'>期數日期</th><th  colspan='10' width=280'>開獎號碼</th><th colspan='3'>冠亞軍和</th><th colspan='5'>1~5龍虎</th></tr>";
                break;
            case 5: //江苏快3
                data_width = 320;
                data_thead = "<tr><th>期號</th><th class='w15'>期數日期</th><th  colspan='3' width='84'>開獎號碼</th><th colspan='2'>總和</th></tr>";
                break;
            case 6: //北京快乐8
                data_width = 1100;
                data_thead = "<tr><th>期號</th><th class='w15'>期數日期</th><th  colspan='20'  width='560'>開獎號碼</th><th colspan='4'>總和</th><th colspan='2'>比數量</th></tr>";
                break;
            case 10: //广西快乐十分
                data_width = 500;
                data_thead = "<tr><th class='w25'>期號</th><th class='w15'>期數日期</th><th  colspan='5'  width='140'>開獎號碼</th><th colspan='4'>總和</th><th>龍虎</th></tr>";
                break;
            case 13: //广西快3
                data_width = 320;
                data_thead = "<tr><th>期號</th><th class='w15'>期數日期</th><th  colspan='3' width='84'>開獎號碼</th><th colspan='2'>總和</th></tr>";
                //data_width = 825;
                //data_thead = "<tr><th class='w12'>期數日期</th><th>開獎號碼</th><th colspan='2'>千百</th><th colspan='2'>千拾</th><th colspan='2'>千个</th><th colspan='2'>百拾</th><th colspan='2'>百个</th><th colspan='2'>拾个</th></tr>";
                break;
        }

        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定titleNav
        var titleNavAry = ["<select data-id='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select>");
        $("#load-middle").html("<div style='margin: 0 auto;width:" + data_width + "px;' id='result'>" + forceMiddle({ title: title, titleNav: titleNavAry.join(""), eachThead: data_thead, tbody: json.table }) + "</div>").show();
        $("#title-nav").addClass("title-nav-right");
        $("select[data-id='gameIndex']").val(gameIndex);
        G.mouseover("#load-middle tbody tr");

        $("select[data-id]").unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

    }, function () {
        G.maskClose();
        G.rollBack();
    });
}


//历史开奖模块
function openbak(msg) {
    //加载数据
    G.scrollLoad({});
    if (S.request) { S.request.abort(); }

    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    if (gameIndex != undefined) {
        if (gameIndex != 14 && gameIndex != 15) {
            gameIndex = 14;
        }
    } else {
        gameIndex = 14;
    }

    msg.data_action = G.urlReplace({ url: msg.data_action, paramName: "gameIndex", val: gameIndex, pad: true }).replace("?", "&");


    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();

        var title = "开奖通知", data_thead, data_width, data_bc;
        switch (parseInt(gameIndex)) {

            case 15:
                data_width = 780;
                data_thead = "<tr><th class='w15'>期數日期</th><th>開獎號碼</th><th colspan='3'>總和</th><th>龍虎</th><th>前三</th><th>中三</th><th>后三</th></tr>";
                break;
            case 14:
                data_width = 750;
                data_thead = "<tr><th class='w15'>期數日期</th><th>開獎號碼</th><th colspan='3'>冠亞軍和</th><th colspan='5'>1~5龍虎</th></tr>";
                break;
        }

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定titleNav
        var titleNavAry = ["<select data-id='gameIndex'>"];
        titleNavAry.push("<option value='14'>极速賽車</option>");
        titleNavAry.push("<option value='15'>极速時時彩</option>");
        titleNavAry.push("</select>");
        $("#load-middle").html("<div style='margin: 0 auto;width:" + data_width + "px;' id='result'>" + forceMiddle({ title: title, titleNav: titleNavAry.join(""), eachThead: data_thead, tbody: json.table }) + "</div>").show();
        $("#title-nav").addClass("title-nav-right");
        $("select[data-id='gameIndex']").val(gameIndex);
        G.mouseover("#load-middle tbody tr");

        $("select[data-id]").unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

    }, function () {
        G.maskClose();
        G.rollBack();
    });
}



//个人登录日志
function mylogin(msg) {
    G.mask();
    if (S.request) { S.request.abort(); }
    var table = [];
    var data_name = $("#myRoleName").html().split(":")[1];
    var title = "登錄日誌：" + data_name;
    var thead = ["ID編號", "登錄時間", "IP地址", "IP歸屬"];
    msg.data_action = "login&name=" + data_name;
    S.request = G.ajax(msg.data_action, function (json) {
        G.maskClose();
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    table.push("<td>" + json[i][n] + "</td>");
                }
                table.push("</tr>");
            }
        }
        var content = G.overflowDiv({ id: "data-login", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
        var generatedCount = 1;
        G.alert({
            title: title, content: content, width: 500,
            initialize: function () {
                $("#data-login #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                    table.push("<td>" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#data-login tbody").append(table.join(""));
                        } else {
                            $("#data-login #fondiv").find("a").hide();
                            $("#data-login #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () {
                return true;
            }
        });
    }, function () { G.maskClose(); });
}

//修改个人密码
function changepwd(msg) {
    var data_stop = true;
    var content = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tbody>"
        + "<tr>"
        + "<td valign='top'>"
        + "<table id='changepwd'>"
        + "<tbody>"
        + "<tr>"
        + "<td height='30' width='100' align='right'>原始密碼&nbsp;</td>"
        + "<td height='30'>&nbsp;<input name='voldpassword' class='text-input sw120' autocomplete='off' type='password'></td>"
        + "</tr>"
        + "<tr>"
        + "<td height='30' align='right'>新設密碼&nbsp;</td>"
        + "<td height='30' align='left'>&nbsp;<input name='vnewpassword' autocomplete='off' class='text-input sw120' type='password'></td>"
        + "</tr>"
        + "<tr>"
        + "<td height='30' align='right'>確認密碼&nbsp;</td>"
        + "<td height='30' align='left'>&nbsp;<input name='vrenewpassword' autocomplete='off' class='text-input sw120' type='password'></td>"
        + "</tr>"
        + "</tbody>"
        + "</table>"
        + "</td>"
        + "</tr>"
        + "</tbody>"
        + "</table>";
    G.alert({
        title: "變更密碼", content: content, width: 450, okVal: "確定修改", cancelVal: "重填",
        cancel: function () {
            $("#changepwd input[type='password']").val("");
            return true;
        },
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
                if (S.request) { S.request.abort(); }
                S.request = G.ajax("cheangepwd&data=" + data.join(","), function (json) {
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
        close: function () { }
    });
}


//修改个人密码
function pwdupper(msg) {
    var data_stop = true;



    G.mask();
    G.ajax("pwdupperinfo", function (json) {
        G.maskClose();

        var content = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
            + "<tbody>"
            + "<tr>"
            + "<td valign='top'>"
            + "<table id='pwdupper'>"
            + "<tbody>"
            + "<tr>"
            + "<td height='30' width='100' align='right'>密碼大写&nbsp;</td>"
            + "<td height='30'>&nbsp;<label class='label-box'><input type='radio' " + (json.PwdUpperID == "0" ? "checked='checked'" : "") + " name='PwdUpperID' value='0' />禁用</label> <label class='label-box'><input type='radio' " + (json.PwdUpperID == "1" ? "checked='checked'" : "") + " name='PwdUpperID' value='1' />啟用</label></td>"
            + "</tr>"
            + "</tbody>"
            + "</table>"
            + "</td>"
            + "</tr>"
            + "</tbody>"
            + "</table>";
        G.alert({
            title: "密碼大写设置", content: content, width: 400, okVal: "確定修改", cancelVal: "重填",
            cancel: function () {
                return true;
            },
            ok: function () {
                var PwdUpperID = $("input[name='PwdUpperID']:checked").val();
                if (data_stop) {
                    data_stop = false;
                    G.mask();
                    var data = [];
                    data.push("PwdUpperID:" + PwdUpperID);
                    if (S.request) { S.request.abort(); }
                    S.request = G.ajax("pwdupper&data=" + data.join(","), function (json) {
                        data_stop = true;
                        G.maskClose();
                        if (json.result == 1) {
                            G.alert({ content: "更改成功。", ok: function () { return true; } });
                        } else {
                            alert(json.result);
                            data_stop = true;
                        }
                    }, function () { G.maskClose(); });
                }
            },
            close: function () { }
        });

    }, function () { G.maskClose(); });
}



//个人信息
function myinfo(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
        var titleNavAry = ["<select data-id='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select>");
        forceMiddle({ titleNav: titleNavAry.join("") });
        $("#title-nav").addClass("title-nav-right");
        $("select[data-id='gameIndex']").val(gameIndex);
        $("select[data-id]").unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

        var table = [
            "<div id='myinfo'>",
            "<table class='middle-table'><thead><tr><th colspan='6'>基本信息</th></tr></thead>",
            "<tbody>",
            "<tr><td class='w25 txt-right bc'>用戶賬號:</td><td class='txt-left'>" + json.userName + " (" + json.state + ")</td></tr>",
            "<tr><td class='w25 txt-right bc'>用戶暱稱:</td><td class='txt-left'>" + json.fatherName + "</td></tr>",
            "<tr><td class='w25 txt-right bc'>信用額度:</td><td class='txt-left'>" + json.credits + "</td></tr>",
            "<tr><td class='w25 txt-right bc'>可用額度:</td><td class='txt-left'>" + json.yuer + "</td></tr>",
            "<tr><td class='w25 txt-right bc'>占成分配:</td><td class='txt-left'>" + json.stintOccupy + "</td></tr>",
            "</tbody>",
            "</table>",
            "<div class='clear eachWid'></div>",
            "<table border='0'cellpadding='0' cellspacing='0' width='100%' class='eachWid'>",
            "<thead>",
            "<tr>",
            "<td>",
            "<table class='middle-table'><thead><tr><th>" + $("select[data-id='gameIndex']").find("option:selected").text() + "</th></tr></thead></table>",
            "<div style=' float:left; width:49.9%'>",
            "<table class='middle-table bor-top'>",
            "<tbody id='info-left'>",
            "<tr class='bc'><td class='w15'>項目</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤%</td><td>B盤%</td><td>C盤%</td></tr>",

            "</tbody>",
            "</table>",
            "</div>",
            "<div style=' float:right; width:49.9%'>",
            "<table class='middle-table bor-top'>",
            "<tbody id='info-right'>",
            "<tr class='bc'><td class='w15'>項目</td><td>單註最低</td><td>單註最高</td><td>單項最高</td><td>A盤%</td><td>B盤%</td><td>C盤%</td></tr>",

            "</tbody>",
            "</table>",
            "</div>",
            "</td>",
            "</tr>",
            "</thead>",
            "</table>",
            "</div>"
        ];
        var content = table.join("");
        $("#load-middle").html(content).show();
        $("#shell_title").html("信用資料");

        if (gameIndex == 3 || gameIndex == 15) {
            while (json.list[9]) {
                json.list.splice(9, 1);
            }
        }

        var len = json.list.length % 2 != 0 ? parseInt(json.list.length / 2 + 1) : parseInt(json.list.length / 2);
        if (json.list.length == 0) {
            $("#myinfo").find(".eachWid").hide();
        } else {
            var leftAry = [];
            var rightAry = [];
            for (var i = 0; i < len; i++) {
                leftAry.push("<tr>");
                leftAry.push("<td class='bc'>" + FormatTs(gameIndex, json.list[i][0]) + "</td>");
                leftAry.push("<td>" + json.list[i][1] + "</td>");
                leftAry.push("<td>" + json.list[i][2] + "</td>");
                leftAry.push("<td>" + json.list[i][3] + "</td>");
                leftAry.push("<td>" + json.list[i][4] + "</td>");
                leftAry.push("<td>" + json.list[i][5] + "</td>");
                leftAry.push("<td>" + json.list[i][6] + "</td>");
                leftAry.push("</tr>");

                if (json.list[len + i]) {
                    rightAry.push("<tr>");
                    rightAry.push("<td class='bc'>" + FormatTs(gameIndex, json.list[len + i][0]) + "</td>");
                    rightAry.push("<td>" + json.list[len + i][1] + "</td>");
                    rightAry.push("<td>" + json.list[len + i][2] + "</td>");
                    rightAry.push("<td>" + json.list[len + i][3] + "</td>");
                    rightAry.push("<td>" + json.list[len + i][4] + "</td>");
                    rightAry.push("<td>" + json.list[len + i][5] + "</td>");
                    rightAry.push("<td>" + json.list[len + i][6] + "</td>");
                    rightAry.push("</tr>");
                }
            }
            $("#myinfo").find("#info-left").append(leftAry.join(""));
            $("#myinfo").find("#info-right").append(rightAry.join(""));
            G.mouseover("#myinfo .eachWid tbody tr");
        }

    }, function () {
        G.rollBack();
    });
}

//自动补货设置
function shipments(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
        var titleNavAry = ["<select data-id='gameIndex'>"];
        //$("#gameList li a").each(function () {
        //    titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        //});

        titleNavAry.push("<option value='0'>" + "快彩" + "</option>");
        titleNavAry.push("<option value='1'>" + $("#gameList li a[data-index='1']").html() + "</option>");
        titleNavAry.push("</select>");

        forceMiddle({ titleNav: titleNavAry.join("") });
        $("#title-nav").addClass("title-nav-right");
        $("select[data-id='gameIndex']").val(gameIndex);
        $("select[data-id]").unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

        var table = [
            "<div id='shipments'>",
            "<table border='0'cellpadding='0' cellspacing='0' width='100%'>",
            "<thead>",
            "<tr>",
            "<td id='shipments_td'>",

            "</td>",
            "</tr>",
            "<tr>",
            "<td id='shipments_td2'>",
            "<table class='middle-table'><tfoot><tr><td style='padding-top:20px;'><span class='text-btn' id='submit'>確定保存</span></td></tr></tfoot></table>",
            "</td>",
            "</tr>",
            "</thead>",
            "</table>",
            "</div>"
        ];
        var content = table.join("");
        $("#load-middle").html(content).show();
        $("#shell_title").html("自動補貨設定");
        var data_stop = true;
        var jl = json.shipments;
        $.each(jl, function (idx, o) {
            var vt = shipmentsTable(o.gameIndex);
            $("#shipments_td").append(vt).show();
            var obj = o.data;
            var len = obj.list.length % 2 != 0 ? parseInt(obj.list.length / 2 + 1) : parseInt(obj.list.length / 2);
            if (obj.list.length > 0) {
                var leftAry = [];
                var rightAry = [];
                var selected = [];
                var disstr = '';
                var chkstr = '';
                for (var i = 0; i < len; i++) {
                    if (obj.list[i][2] == '0') {
                        disstr = " disabled='disabled' ";
                        chkstr = "";
                    } else {
                        chkstr = " checked='checked' ";
                        disstr = "";
                    }
                    leftAry.push("<tr class='bbc' data-gameindex='" + o.gameIndex + "' data-daydetails='" + obj.dayDetails + "' data-sort='" + obj.list[i][0] + "'>");
                    leftAry.push("<td class='bc'>" + FormatTs(o.gameIndex, obj.list[i][0]) + "</td>");
                    leftAry.push("<td><input type='text' " + disstr + " class='text-input sw70' number='' maxlength='7' value='" + obj.list[i][1] + "' /></td>");
                    leftAry.push("<td><select " + disstr + "><option value='0'>單筆統計</option></select></td>");
                    leftAry.push("<td>2</td>");
                    //selected = ["", ""];
                    //obj.list[i][2] == 0 ? selected[0] = "selected='selected'" : selected[1] = "selected='selected'";
                    //leftAry.push("<td><select name='select'><option value='0' " + selected[0] + ">關閉</option><option value='1' " + selected[1] + ">啟用</option></select></td>");
                    leftAry.push("<td><input type='checkbox' " + chkstr + " value='" + obj.list[i][2] + "' ></td > ");
                    leftAry.push("</tr>");

                    if (obj.list[len + i]) {
                        if (obj.list[len + i][2] == '0') {
                            disstr = " disabled='disabled' ";
                            chkstr = "";
                        } else {
                            chkstr = " checked='checked' ";
                            disstr = "";
                        }
                        rightAry.push("<tr class='bbc' data-gameindex='" + o.gameIndex + "' data-daydetails='" + obj.dayDetails + "' data-sort='" + obj.list[len + i][0] + "'>");
                        rightAry.push("<td class='bc'>" + FormatTs(o.gameIndex, obj.list[len + i][0]) + "</td>");
                        rightAry.push("<td><input type='text' " + disstr + " class='text-input sw70' number='' maxlength='7' value='" + obj.list[len + i][1] + "' /></td>");
                        rightAry.push("<td><select " + disstr + " ><option value='0'>單筆統計</option></select></td>");
                        rightAry.push("<td>2</td>");
                        //obj.list[len + i][2] == 0 ? selected[0] = "selected='selected'" : selected[1] = "selected='selected'";
                        //rightAry.push("<td><select name='select'><option value='0' " + selected[0] + ">關閉</option><option value='1' " + selected[1] + ">啟用</option></select></td>");
                        rightAry.push("<td><input type='checkbox' " + chkstr + " value='" + obj.list[len + i][2] + "'></td>");
                        rightAry.push("</tr>");
                    }
                }

                $("#shipments").find("#info-left" + o.gameIndex).append(leftAry.join(""));
                $("#shipments").find("#info-right" + o.gameIndex).append(rightAry.join(""));
                G.mouseover("#shipments tbody tr");
                if (obj.dayDetails == 1) {
                    $("#shipments #info-left" + o.gameIndex + " input").attr("disabled", "disabled");
                    $("#shipments #info-right" + o.gameIndex + " select").attr("disabled", "disabled");
                }
            }
        });
        $("#shipments .totalcheck").unbind("change").change(function () {
            var v = $(this).attr("checked");
            if (v) {
                $(this).parent().parent().parent().find("tr.bbc input[type='checkbox']").attr("checked", v);
                $(this).parent().parent().parent().find("tr select").removeAttr("disabled");
                $(this).parent().parent().parent().find("tr input[type='text']").removeAttr("disabled");
            } else {
                $(this).parent().parent().parent().find("tr.bbc input[type='checkbox']").removeAttr("checked");
                $(this).parent().parent().parent().find("tr select").attr("disabled", "disabled");
                $(this).parent().parent().parent().find("tr input[type='text']").attr("disabled", "disabled");
            }
        });

        $("#shipments tr.bbc input[type='checkbox']").unbind("change").change(function () {
            var v = $(this).attr("checked");
            if (v) {
                $(this).parent().parent().find("select").removeAttr("disabled");
                $(this).parent().parent().find("input[type='text']").removeAttr("disabled");
            } else {
                $(this).parent().parent().find("select").attr("disabled", "disabled");
                $(this).parent().parent().find("input[type='text']").attr("disabled", "disabled");
            }
        });

        $("#shipments .totalinput").unbind("change").change(function () {
            var v = $(this).val();
            if (!isNaN(v) && v != "") {
                $(this).parent().parent().parent().find("tr.bbc input[type='text']").val(v);
            }
        });

        //全选
        $("#shipments select[name='data-right']").unbind("change").change(function () {
            if ($(this).val() != "") {
                $("#shipments #info-right select").val($(this).val());
            }
        });
        $("#shipments select[name='data-left']").unbind("change").change(function () {
            if ($(this).val() != "") {
                $("#shipments #info-left select").val($(this).val());
            }
        });
        $("#shipments tbody input[type='text']").focus(function () {
            if (!$(this).hasClass('totalinput')) {
                G.myTips({ content: "自動補貨說明：起補金額必須大於或等於2元，<br />計算方式按單筆註單的“總實際占成”計算。", obj: $(this), myclick: true });
            }
        });
        $("#shipments #submit").unbind("click").click(function () {
            var data = [];
            var saveValid = true;
            $("#shipments tbody tr[data-daydetails='0']").each(function () {
                if ($(this).attr("data-sort") && G.NumberSign($(this).attr("data-sort"))) {
                    if (!G.NumberSign($(this).find("input[type='text']").val())) {
                        G.alert({ content: "“補貨金額”由1-9位正整數組成！", ok: function () { return true; } });
                        data = false;
                        return false;
                    } else {
                        if ($(this).find("input[type='text']").val() == "0" && $(this).find("input[type='checkbox']").is(':checked')) {
                            G.myTips({ content: "自動補貨說明：开启自動補貨金額需要大于0，否则不能保存。", obj: $(this).find("input[type='text']"), myclick: true });
                            saveValid = false;
                            return false;
                        } else {
                            data.push($(this).attr("data-gameindex") + ":" + $(this).attr("data-sort") + ":" + $(this).find("input[type='text']").val() + ":" + ($(this).find("input[type='checkbox']").attr("checked") ? "1" : "0"));
                        }
                    }
                }
            });
            if (saveValid) {
                if (data && data.length > 0 && data_stop) {
                    data_stop = false;
                    G.mask();
                    if (S.request) { S.request.abort(); }
                    S.request = G.ajax(msg.data_action + "&data=" + data.join(","), function (json) {
                        G.maskClose();
                        setTimeout(function () { data_stop = true; }, 3000);
                        if (json.count > 0) {
                            if (json.count > 0 && json.shipments[0].data.result == 1) {
                                G.alert({ content: "保存成功。", ok: function () { return true; } });
                            } else {
                                G.alert({ content: json.shipments[0].data.result, ok: function () { return true; } });
                            }
                        } else {
                            G.alert({ content: "出现系统错误！", ok: function () { return true; } });
                        }
                    }, function () {
                        G.maskClose();
                        setTimeout(function () { data_stop = true; }, 3000);
                    });
                }
            } else {
                G.alert({ content: "开启自動補貨金額需要大于0，否则不能保存!", ok: function () { return true; } });
            }
        });
    }, function () {
        G.rollBack();
    });
}

function shipmentsTable(gi) {
    var table = [
        "<table data-index='" + gi + "' id='shipments" + gi + "' class='middle-table'><thead><tr><th>" + $("#gameList li a[data-index='" + gi + "']").html() + "</th></tr></thead></table>",

        "<div style=' float:left; width:49.9%'>",
        "<table class='middle-table bor-top'>",
        "<tbody id='info-left" + gi + "'>",
        "<tr class='bc' style='line-height:22px;'><td>项目類型<br>(總控)</td><td>實占註額<br><input type='text' value='0' class='text onlyNum totalinput' disabled='disabled'></td><td>補貨計算<br><select class='totalSelect' disabled='disabled'><option>自動</option></select></td><td>起補金額</td><td>啟用<br><input type='checkbox' value='0' class='totalcheck'></td></tr>",
        "</tbody>",
        "</table>",
        "</div>",

        "<div style=' float:right; width:49.9%'>",
        "<table class='middle-table bor-top'>",
        "<tbody id='info-right" + gi + "'>",
        "<tr class='bc' style='line-height:22px;'><td>项目類型<br>(總控)</td><td>實占註額<br><input type='text' value='0' class='text onlyNum totalinput' disabled='disabled'></td><td>補貨計算<br><select class='totalSelect' disabled='disabled'><option>自動</option></select></td><td>起補金額</td><td>啟用<br><input type='checkbox' value='0' class='totalcheck'></td></tr>",
        "</tbody>",
        "</table>",
        "</div>",
        "<div style='float:right; width:100%;height:3px;'></div>"
    ];
    var content = table.join("");
    return content;
}

//自动补货更改记录
function shipmentslog(msg) {
    G.mask();
    var table = [];
    //var data_name = $("#myRoleName").html().split(":")[1];
    var title = "自動補貨更變記錄：";
    var thead = ["ID編號", "操作時間", "更變類型", "更變前值", "更變后值", "操作者", "級別", "IP地址", "IP歸屬"];
    if (S.request) { S.request.abort(); }
    S.request = G.ajax(msg.data_action, function (json) {
        G.maskClose();
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    table.push("<td>" + json[i][n] + "</td>");
                }
                table.push("</tr>");
            }
        }
        var content = G.overflowDiv({ id: "data-shipmentslog", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
        var generatedCount = 1;
        G.alert({
            title: title, content: content, width: 830,
            initialize: function () {
                $("#data-shipmentslog #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                    table.push("<td>" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#data-shipmentslog tbody").append(table.join(""));
                        } else {
                            $("#data-shipmentslog #fondiv").find("a").hide();
                            $("#data-shipmentslog #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () {
                return true;
            }
        });
    }, function () { G.maskClose(); });
}

//报表查询
function reportform(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var detailsTypeAry = [];
        $("#gameList li a").each(function () {
            detailsTypeAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        var beifen = "";
        if (json.beifenid == "1") {
            beifen = "<tr>";
            beifen += "<td class='w25 txt-right bc'>自动备份:</td>";
            beifen += "<td class='txt-left'>";
            beifen += "<a target='_blank' style='color:blue' href='/autobak.rar'>自动备份软件-点击下载</a>";
            beifen += "</td>";
            beifen += "</tr>";
        }
        var table = [
            "<div id='report-form'>",
            "<table class='middle-table reportForm'><thead><tr><th colspan='2'>報表查詢</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>彩種類型:</td>",
            "<td class='txt-left'>",
            "<select name='detailsType'>",
            "<option value='-1' selected=''>全部</option>" + detailsTypeAry.join(""),
            "</select>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>選擇日期:</td>",
            "<td class='txt-left'>",
            "<input type='text' class='text-input sw70' name='beforeDate' value='" + json.seachDate[0] + "' />&nbsp;—&nbsp<input type='text' class='text-input sw70' name='laterDate' value='" + json.seachDate[0] + "' />",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[0] + "' laterdate='" + json.seachDate[0] + "'>今天</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[1] + "' laterdate='" + json.seachDate[1] + "'>昨天</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[2] + "' laterdate='" + json.seachDate[3] + "'>本星期</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[4] + "' laterdate='" + json.seachDate[5] + "'>上星期</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[6] + "' laterdate='" + json.seachDate[7] + "'>本月</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[8] + "' laterdate='" + json.seachDate[9] + "'>上月</span></span>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>選擇期數:</td>",
            "<td class='txt-left'><select name='timesNum'><option value='-1' selected=''>全部</option></select></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>歷史報表範圍:</td>",
            "<td class='txt-left'><span>" + json.reportDate[0] + "</span> — <span>" + json.reportDate[1] + "</span></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>賬戶說明:</td>",
            "<td class='txt-left txt-paddin-left green'>“當天報表”將在次日凌晨6點半后與“歷史報表”合併</td>",
            "</tr>",
            "<tr id='generalId' class='hiden'>",
            "<td class='w25 txt-right bc'>報表類型:</td>",
            "<td class='txt-left'>",
            "<label class='label-box'><input type='radio' name='GeneralID' value='" + json.myGeneralId + "' />總監</label>&nbsp",
            "<label class='label-box'><input type='radio' name='GeneralID' checked='' value='0' />分公司</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>選擇類別:</td>",
            "<td class='txt-left'>",
            "<label class='label-box'><input type='radio' name='type' checked='' value='1' />總賬</label>&nbsp",
            "<label class='label-box'><input type='radio' name='type' value='0' />分類賬</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>結算狀態:</td>",
            "<td class='txt-left'>",
            "<label class='label-box'><input type='radio' name='settlement' checked='' value='1' />已結算</label>&nbsp",
            "<label class='label-box'><input type='radio' name='settlement' value='0' />未結算</label>",
            "</td>",
            "</tr>",

            beifen,

            "</tbody>",
            "</table>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding-top:10px;'><span class='text-btn' id='submit'>查 詢</span></td></tr></tfoot>",
            "</table>",
            "</div>"
        ];
        var content = table.join("");
        $("#load-middle").html(content).show();
        $("#shell_title").html("報表查詢");
        $("#report-form input[type='text']").datepicker();
        if (json.generalId == 0) {
            $("#report-form #generalId").remove();
        } else if (json.generalId == 1) {
            $("#report-form #generalId").show();
        }
        $("#report-form span[fin='']").unbind("click").click(function () {
            var beforedate = $(this).attr("beforedate");
            var laterdate = $(this).attr("laterdate");
            $("#report-form input[name='beforeDate']").val(beforedate);
            $("#report-form input[name='laterDate']").val(laterdate);
        });
        $("#report-form select[name='detailsType']").unbind("change").change(function () {
            var gameIndex = $(this).val();
            if (gameIndex == -1) {
                $("#report-form select[name='timesNum'] option").remove();
                $("#report-form select[name='timesNum']").append("<option value='-1'>全部</option>");
            } else {
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&gameIndex=" + gameIndex, function (json) {
                    $("#report-form select[name='timesNum'] option").remove();
                    $("#report-form select[name='timesNum']").append("<option value='-1'>全部</option>");
                    if (json && json.numlist.length > 0) {
                        for (var i = 0; i < json.numlist.length; i++) {
                            $("#report-form select[name='timesNum']").append("<option value='" + json.numlist[i] + "'>" + json.numlist[i] + "期</option>");
                        }
                    }
                });
            }
        });
        $("#report-form #submit").click(function () {
            var detailsType = $("#report-form select[name='detailsType']").val();
            var beforeDate = $("#report-form input[name='beforeDate']").val();
            var laterDate = $("#report-form input[name='laterDate']").val();
            var timesNum = $("#report-form select[name='timesNum']").val();
            var type = $("#report-form input[name='type']:checked").val();
            var settlement = $("#report-form input[name='settlement']:checked").val();
            var settGeneralID = $("#report-form input[name='GeneralID']:checked").val() || 0;
            if (detailsType != "" && beforeDate != "") {
                var hrefAry = [];
                hrefAry.push("detailsType=" + detailsType);
                hrefAry.push("beforeDate=" + beforeDate);
                hrefAry.push("laterDate=" + laterDate);
                hrefAry.push("timesNum=" + timesNum);
                hrefAry.push("type=" + type);
                hrefAry.push("settlement=" + settlement);
                hrefAry.push("settGeneralID=" + settGeneralID);
                G.mask();
                middleBind({ data_action: "reportlist&" + hrefAry.join("&") });
            }
        });

    }, function () { G.rollBack(); });
}

//报表列表
function reportlist(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        $("#shell_pageControl").html('');
        G.maskClose();
        G.loadEnd();
        var table = [
            "<div id='report-list'>",
            "<table class='middle-table'>",
            "<thead>",
            "<tr>",
            "<th>" + json.data_yishourole + "</th>",
            "<th>名稱</th>",
            "<th><b class='both' title='排序' data-sort='2'></b>筆數</th>",
            "<th>有效金額</th>",
            "<th><b class='both' title='排序' data-sort='4'></b>輸贏結果</th>",
            "<th><b class='both' title='排序' data-sort='5'></b>應收下線</th>",
            "<th>占成%</th>",
            "<th>實占註額</th>",
            "<th>占貨比</th>",
            "<th>實占輸贏</th>",
            "<th>實占退水</th>",
            "<th>實占結果</th>",
            "<th>賺取退水</th>",
            "<th><b class='both' title='排序' data-sort='13'></b>" + json.data_role + "結果</th>",
            "<th class='my-ea'>貢獻上級</th>",
            "<th class='my-ea'>應付上級</th>",
            "</tr>",
            "</thead>",
            "<tbody id='list'>",
            "</tbody>",
            "<tr class='foot bcg' id='listCount'><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td class='my-ea'>-</td><td class='my-ea'>-</td></tr>",
            "</table>",
            "<div style='width:750px;height:26px;line-height:26px; font-weight:700; text-align:center; margin:0 auto'>",
            "<span>占成結果：<span class='red'>" + json.allCount[0] + "</span></span>&nbsp;&nbsp;&nbsp;&nbsp;",
            "<span>賺取退水：<span>" + json.allCount[1] + "</span></span>&nbsp;&nbsp;&nbsp;&nbsp;",
            "<span>抵扣補貨及賺水后結果：<span class='blue'>" + json.allCount[2] + "</span></span>&nbsp;&nbsp;&nbsp;&nbsp;",
            "<span class='my-ea'>應付上級：<span class='green'>" + json.allCount[3] + "</span></span>",
            "</div>",
            "<div id='buhuoList' style='margin-top:10px;'>",
            "<div class='clear'></div>",
            "<table class='middle-table' style='width:550px;margin:0 auto'>",
            "<thead>",
            "<tr>",
            "<th>筆數</th>",
            "<th>補貨金額</th>",
            "<th>補貨輸贏</th>",
            "<th>退水</th>",
            "<th>退水后結果</th>",
            "</tr>",
            "</thead>",
            "<tbody>",
            "</tbody>",
            "</table>",
            "</div>",
            "</div>"
        ];
        var content = table.join("");
        $("#load-middle").html(content).show();
        $(".shell-title-icon").css("width", "50%");
        $("#shell_title").html("[<span class='green'>" + json.data_detailsType + "</span>] <span>" + json.data_date + "</span> <span class='blue'>" + json.data_type + ": </span>-&gt; " + json.data_name);
        var jsonCount;
        if (json.list && json.list.length > 0) {
            jsonCount = json.list.pop();
            json.list.sort(function (x, y) {
                return x[0] - y[0];
            });
        }

        var ary = [], up;
        //注单列表
        myappend();
        function myappend() {
            if (json.list && json.list.length > 0) {
                var txt_right, uc, bc, ea;
                ary = [];
                for (var i = 0; i < json.list.length; i++) {
                    ary.push("<tr>");
                    for (var n = 1; n < json.list[i].length; n++) {
                        uc = n == 1 ? "data-uc=''" : "";
                        up = n == 4 ? "data-up=''" : "";
                        bc = n == 6 || n == 14 ? "bc bold" : "";
                        ea = n == 15 || n == 16 ? "my-ea" : "";
                        txt_right = n == 1 && i < json.list.length ? "" : n == 2 ? "" : "txt-right";

                        var v = "";
                        switch (n) {
                            case 6: v = "<span class='tip' tips-title='應收<a class=\"red\">ls1111</a>明細' tips='&nbsp;輸贏：10574.6<br>&nbsp;退水：1671.7'>" + json.list[i][n] + "</span>"; break;
                            case 16: v = "<span class=\"tip\" tips-title=\"應付上級明細\" tips=\"&nbsp;實占成數：5.375%<br>&nbsp;實占註額：3221.7<br>&nbsp;實占輸贏：-336.5<br>&nbsp;實占退水：96.7\">" + json.list[i][n] + "</span>"; break;
                            default: v = json.list[i][n]; break;
                        }


                        ary.push("<td class='" + ea + " " + bc + " " + txt_right + "' " + uc + " " + up + ">" + v + "</td>");
                    }
                    ary.push("</tr>");
                }

                var aryCount = [];
                for (var i = 1; i < jsonCount.length; i++) {
                    ea = i == 14 || i == 15 ? "my-ea" : "";
                    txt_right = i >= 2 ? "txt-right" : "";
                    aryCount.push("<td " + (i == 1 ? "colspan='2'" : "") + " class='" + ea + " " + txt_right + "'>" + jsonCount[i] + "</td>");
                }
                $("#report-list #listCount").html(aryCount.join(""));
            } else {
                ary = ["<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td class='my-ea'>-</td><td class='my-ea'>-</td></tr>"];
            }

            $("#report-list #list").html(ary.join(""));
            if (json.data_role == "\u7e3d\u516c\u53f8" || json.data_role == "\u7e3d\u76e3") {
                $("#report-list .my-ea").remove();
            }

            //补货单
            if (json.buList && json.buList.length > 0) {
                ary = [];
                ary.push("<tr>");
                for (var i = 0; i < json.buList.length; i++) {
                    up = i == 1 ? "data-up=''" : "";
                    ary.push("<td " + up + ">" + json.buList[i] + "</td>");
                }
                ary.push("</tr>");
                $("#report-list #buhuoList tbody").html(ary.join(""));
            } else {
                $("#report-list #buhuoList").remove();
            }
            myevent();
        }

        function myevent() {
            G.mouseover("#report-list tbody tr", "myqhs");
            $("#report-list tbody tr").unbind("click").click(function () {
                if (!$(this).hasClass("bc")) {
                    $(this).addClass("bc");
                } else {
                    $(this).removeClass("bc");
                }
            });
            //排序
            $("#report-list thead b.both").unbind("click").click(function () {
                var data_sort = $(this).attr("data-sort"), data_both;
                if (data_sort && json.list) {
                    if ($(this).attr("data-name") == "desc") {
                        data_both = "asc";
                    } else {
                        data_both = "desc";
                    }
                    $(this).attr("data-name", data_both);
                    json.list.sort(function (x, y) {
                        return data_both == "asc" ? x[data_sort] - y[data_sort] : y[data_sort] - x[data_sort];
                    });
                    myappend();
                }
            });
            //下级查询
            $("#report-list #list td[data-uc=''] a").unbind("click").click(function () {
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "setUserName", val: $(this).attr("data-name"), pad: true });
                mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
                middleBind({ data_action: mydata_action });
            });
            //查询明细
            $("#report-list tbody td[data-up=''] a").unbind("click").click(function () {
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                var mydata_action = msg.data_action.replace("reportlist", "reportdata") + "&md=2&vtype=" + $(this).attr("data-type");
                mydata_action = G.urlReplace({ url: "?" + mydata_action, paramName: "setUserName", val: $(this).attr("data-name"), pad: true });
                mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
                middleBind({ data_action: mydata_action });
            });
        }

    }, function () {
        G.maskClose();
        G.rollBack();
    });
}

//报表明细
function reportdata(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var title, thead, last, table = [];
        var md = G.query("md", "?" + msg.data_action);
        var beforeDate = G.query("beforeDate", "?" + msg.data_action);
        var laterDate = G.query("laterDate", "?" + msg.data_action); //FormatDetailsType
        if (md == 0) {
            last = 3;
            title = "[<span class='green'>報表明細</span>] 日期範圍:" + beforeDate + "~" + laterDate;
            thead = ["日期", "總筆", "有效註額", "輸贏結果", "退水", "實際結果"];
        } else if (md == 1) {
            last = 3;
            title = "[<span class='green'>報表明細</span>] 日期:" + beforeDate;
            thead = ["彩種", "總筆", "有效註額", "輸贏結果", "退水", "實際結果"];
        } else if (md == 2) {
            last = 0;
            //title = "[<span class='green'>報表明細</span>] 日期範圍:" + beforeDate + " <span class='blue'>彩種:</span>" + FormatDetailsType(parseInt(G.query("detailsType", "?" + msg.data_action)));
            title = "[<span class='green'>報表明細</span>] 日期範圍:" + beforeDate + "~" + laterDate;;
            thead = ["註單號/時間", "下註賬號", "彩種/期數", "玩法明細", "盤口/賠率", "下註金額", "輸贏結果", "代理"];
            var mylevelAry = [];
            if (__sysinfo.level == 0 || __sysinfo.level == 1) {
                mylevelAry = ["總代理", "股東", "分公司", "總監"];
            } else if (__sysinfo.level == 2) {
                mylevelAry = ["總代理", "股東", "分公司"];
            } else if (__sysinfo.level == 3) {
                mylevelAry = ["總代理", "股東"];
            } else if (__sysinfo.level == 4) {
                mylevelAry = ["總代理"];
            }
            mylevelAry.push("您的結果");
            thead = thead.concat(mylevelAry);
            //绑定分页
            pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
                middleBind({ data_action: myPage });
            });
        }

        if (json.list && json.list.length > 0) {
            var myCount = [0, 0, 0, 0, 0], cursor, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                if (md == 2) {
                    cursor = i % 2 != 0 ? "class='bc'" : "";
                } else {
                    cursor = "class='cursor' data-date='" + json.list[i][6] + "' data-md='" + json.list[i][7] + "' data-gameIndex='" + json.list[i][8] + "'";
                }
                table.push("<tr " + cursor + ">");
                for (var n = 0; n < json.list[i].length - last; n++) {
                    if (n > 0 && md != 2) {
                        myCount[n - 1] += parseFloat(json.list[i][n]);
                    } else if (n == 5 && md == 2) {
                        myCount[0] += parseFloat(json.list[i][n]);
                    } else if (n == 6 && md == 2) {
                        myCount[1] += parseFloat(json.list[i][n]);
                    } else if (n == json.list[i].length - 1 && md == 2) {
                        myCount[2] += parseFloat(json.list[i][n]);
                    }
                    txt_right = md == 2 && n >= 5 ? "txt-right" : md == 2 ? "" : "txt-right w15";
                    table.push("<td class='" + txt_right + "'>" + json.list[i][n] + "</td>");
                }
                table.push("</tr>");
            }
            if (md != 2) {
                table.push("<tr class='foot bcg'><td class='txt-right'>本頁合計:</td><td class='txt-right'>" + myCount[0] + "</td><td class='txt-right'>" + myCount[1] + "</td><td class='txt-right'>" + G.toDecimal(myCount[2], 1) + "</td><td class='txt-right'>" + G.toDecimal(myCount[3], 2) + "</td><td class='txt-right'>" + G.toDecimal(myCount[4], 1) + "</td></tr>");
            }
        }

        //绑定数据
        $("#load-middle").html(forceMiddle({ id: "report-data", title: title, thead: thead, tbody: table })).show();
        $(".shell-title-icon").css("width", "50%");
        G.mouseover("#report-data tbody tr", "myqhs");

        //彩种明细
        $("#report-data tbody tr.cursor").unbind("click").click(function () {
            S.backList.unshift(msg.data_action); //保存前導頁的地址
            var mydate = $(this).attr("data-date");
            var data_md = $(this).attr("data-md");
            var data_gameIndex = $(this).attr("data-gameIndex");
            var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "beforeDate", val: mydate, pad: true });
            if (data_gameIndex && G.NumberSign(data_gameIndex)) {
                mydata_action = G.urlReplace({ url: mydata_action, paramName: "detailsType", val: data_gameIndex, pad: true });
            }
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "laterDate", val: mydate, pad: true });
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "md", val: data_md, pad: true }).replace("?", "");
            middleBind({ data_action: mydata_action });
        });

    }, function () {
        G.rollBack();
    });
}

//--------------后台管理-----------------

//全局设置
function parameter(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var title = "全局參數";
        var table = [
            "<div id='parameter'>",
            "<table class='middle-table'><thead><tr><th colspan='2'>全局參數</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>系統維護時間:</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<input type='text' class='text-input sw70' name='maintain' value='" + json.maintain + "' />&nbsp;&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='30' />30分鐘</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='45' />45分鐘</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='60' />60分鐘</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='90' />90分鐘</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='180' />180分鐘</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>(樂透HK)今年生肖:</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<label class='label-box'><input type='radio' name='animals' value='1' />鼠</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='2' />牛</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='3' />虎</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='4' />兔</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='5' />龍</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='6' />蛇</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='7' />馬</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='8' />羊</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='9' />猴</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='10' />雞</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='11' />狗</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='12' />猪</label>",
            "</td>",
            "</tr>",
            "</tbody>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存設置</span></td></tr></tfoot>",
            "</table>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();
        if (json.list && json.list.length > 0) {
            table = [];
            var ckOpen, ckClose, ckDefault;
            for (var i = 0; i < json.list.length; i++) {
                if (json.list[i][2] == 1) {
                    ckOpen = "checked='checked'";
                    ckClose = "";
                } else {
                    ckClose = "checked='checked'";
                    ckOpen = "";
                }
                ckDefault = json.list[i][3] == 1 ? "checked='checked'" : "";
                table.push("<tr data-gameIndex='" + json.list[i][0] + "'>");
                table.push("<td class='w30 bc txt-right'>" + json.list[i][1] + ":</td>");
                table.push("<td class='txt-left'>");
                table.push("<input type='text' class='text-input sw70' name='GameStartTime' value='" + json.list[i][4] + "' />&nbsp;—&nbsp;");
                table.push("<input type='text' class='text-input sw70' name='GameEndTime' value='" + json.list[i][5] + "' />&nbsp;&nbsp;");
                table.push("<label class='label-box'><input type='radio' name='GameClose-" + json.list[i][0] + "' " + ckClose + " value='0' />關閉</label>&nbsp;");
                table.push("<label class='label-box'><input type='radio' name='GameClose-" + json.list[i][0] + "' " + ckOpen + " value='1' />開啟</label>&nbsp;");
                table.push("<label class='label-box'><input type='radio' name='GameDefault' " + ckDefault + " value='1' />默認</label>");
                table.push("</td>");
                table.push("</tr>");
            }
            $("#parameter tbody").append(table.join(""));
        }
        $("#parameter input[name='minute'][value='" + json.minute + "']").attr("checked", "checked");
        $("#parameter input[name='animals'][value='" + json.animals + "']").attr("checked", "checked");

        //保存数据
        $("#parameter #submit").unbind("click").click(function () {
            var obj = $("#parameter"), data_stop = true;
            var mydata = [], ary = [], index, time, time2, closer, defaultr;
            var maintain = obj.find("input[name='maintain']").val();
            var minute = obj.find("input[name='minute']:checked").val();
            var animals = obj.find("input[name='animals']:checked").val();
            mydata.push("maintain=" + maintain);
            mydata.push("minute=" + minute);
            mydata.push("animals=" + animals);
            obj.find("tbody tr").each(function () {
                if ($(this).attr("data-gameIndex")) {
                    index = $(this).attr("data-gameIndex");
                    time = $(this).find("input[name='GameStartTime']").val();
                    time2 = $(this).find("input[name='GameEndTime']").val();
                    closer = $(this).find("input[name='GameClose-" + index + "']:checked").val();
                    defaultr = $(this).find("input[name='GameDefault']:checked").val() || 0;
                    ary.push(index + "," + time + "," + closer + "," + defaultr + "," + time2);
                }
            });
            mydata.push("gameAll=" + ary.join("|"));
            if (mydata && mydata.length > 0 & data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&" + mydata.join("&"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });
            }

        });

    }, function () {
        G.rollBack();
    });
}


//全局设置
function delreport(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var title = "报表删除";
        var table = [
            "<div id='delreport'>",
            "<table class='middle-table'><thead><tr><th colspan='2'>报表删除</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>开始日期:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opStartDate' value=''></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>结束日期:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opEndDate' value=''></td>",
            "</tr>",
            "</tbody>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>确认删除</span></td></tr></tfoot>",
            "</table>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();

        if (json) {
            for (var i in json) {
                $("#delreport input[name='" + i + "']").val(json[i]);
            }
        }

        //保存数据
        $("#delreport #submit").unbind("click").click(function () {

            if (!confirm("确认要删除报表吗？")) {
                return;
            }

            var mydata = [];
            var obj = $("#delreport"), data_stop = true;
            var opStartDate = obj.find("input[name='opStartDate']").val();
            var opEndDate = obj.find("input[name='opEndDate']").val();
            mydata.push("opStartDate=" + opStartDate);
            mydata.push("opEndDate=" + opEndDate);
            if (mydata && mydata.length > 0 & data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&" + mydata.join("&"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });
            }

        });

    }, function () {
        G.rollBack();
    });
}



//全局开盘
function lottery(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
        var titleNavAry = ["<select data-id='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select>");
        forceMiddle({ titleNav: titleNavAry.join("") });
        $("#title-nav").addClass("title-nav-right");
        $("select[data-id='gameIndex']").val(gameIndex);
        $("select[data-id]").unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

        var title = "全局開盤";
        var table = [
            "<div id='lottery'>",
            "<table class='middle-table'><thead><tr><th colspan='2'>" + $("#gameList li a[data-index='" + gameIndex + "']").html() + "</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>開獎期數:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opNum'></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>開獎日期:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opDate' value=''></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>開獎時間:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opTime' value=''></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>連續開出:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw30' name='opCount' value=''>&nbsp;期</td>",
            "</tr>",
            "</tbody>",
            "</table>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding:10px 0 10px 0;'><span class='text-btn' id='submit'>保存設置</span></td></tr></tfoot>",
            "</table>",
            "<div class='clear'></div>",
            "<table class='middle-table'><thead><tr><th>序號</th><th>開獎期數</th><th>開獎日期</th><th>開獎時間</th><th>狀態</th><th>功能</th></tr></thead>",
            "<tbody id='list'>",
            "</tbody>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();

        table = [];
        if (json) {
            var w;
            for (var i in json) {
                $("#lottery input[name='" + i + "']").val(json[i]);
                if (i == "list") {
                    for (var n = 0; n < json[i].length; n++) {
                        table.push("<tr data-id='" + json[i][n][0] + "'>");
                        for (var m = 0; m < json[i][n].length; m++) {
                            w = m == 0 ? "w10" : "w15";
                            table.push("<td class='" + w + "'>" + json[i][n][m] + "</td>");
                        }
                        table.push("<td class='w10'><a href='javascript:void(0)' data-number='" + json[i][n][1] + "'>設置開盤</a> / <a href='javascript:void(0)' data-id='" + json[i][n][0] + "'>修改開盤</a></td>");
                        table.push("<tr>");
                    }
                }
            }
        }
        $("#lottery #list").html(table.join(""));
        G.mouseover("#lottery #list tr");


        var obj = $("#lottery");
        obj.find("#list a").unbind("click").click(function () {
            var data_stop = true;
            var data_opNum = $(this).attr("data-number");
            var data_id = $(this).attr("data-id");
            if (data_opNum && data_stop) { //設置開盤
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&data=1&opNum=" + data_opNum, function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({
                            content: "保存成功。",
                            ok: function () {
                                return true;
                            },
                            close: function () {
                                middleBind({ data_action: msg.data_action });
                            }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });

            } else if (data_id) { //修改
                obj.find("input[name='opCount']").addClass("bold").val("0");
                obj.find("tbody tr[data-id='" + data_id + "'] td").each(function (i) {
                    if (i == 1) {
                        obj.find("input[name='opNum']").addClass("bold").val($(this).html());
                    } else if (i == 2) {
                        obj.find("input[name='opDate']").addClass("bold").val($(this).html());
                    } else if (i == 3) {
                        obj.find("input[name='opTime']").addClass("bold").val($(this).html());
                    }
                });
                setTimeout(function () { obj.find("input").removeClass("bold"); }, 700);
            }
        });

        obj.find("tbody input[type='text']").keydown(function (e) {
            var curKey = e.which;
            if (curKey == 13) {
                obj.find("#submit").click();
                return false;
            }
        });
        obj.find("#submit").unbind("click").click(function () {
            var data_stop = true;
            var opNum = obj.find("input[name='opNum']").val();
            var opDate = obj.find("input[name='opDate']").val() + " " + obj.find("input[name='opTime']").val();
            var opCount = obj.find("input[name='opCount']").val();
            if (!G.NumberSign(opNum)) {
                G.alert({ content: "開盤期數有誤！", ok: function () { return true; } });
            } else if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&data=2&opNum=" + opNum + "&opDate=" + opDate + "&opCount=" + opCount, function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({
                            content: "保存成功。",
                            ok: function () {
                                return true;
                            },
                            close: function () {
                                middleBind({ data_action: msg.data_action });
                            }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });
            }
        });


    }, function () {
        G.rollBack();
    });
}

var cleartisautoopen;
var curopenpage = 1;
function checkisautoopen() {
    try {
        if ($(".onBtn").attr("data-action") == "opnum") {

            var gameindex = $("select[data-id]").val();
            S.request = G.ajax("opnum&gameIndex=" + gameindex + "&page=" + curopenpage, function (json) {

                var table = [];
                if (json.list && json.list.length > 0) {
                    var bc;
                    for (var i = 0; i < json.list.length; i++) {
                        bc = i % 2 != 0 ? "bc" : "";
                        table.push("<tr data-num='" + json.list[i][0] + "' class='" + bc + "'>");
                        for (var n = 0; n < json.list[i].length; n++) {
                            table.push("<td>" + json.list[i][n] + "</td>");
                        }
                        if (__sysinfo.KaiJiangID != "" && __sysinfo.KaiJiangID != "0" && __sysinfo.level == 1) {
                            table.push("<td><a href='javascript:void(0)' data-name='acc'>結算</a> / <a href='javascript:void(0)' data-name='up'>修改</a> </td>");
                        } else {
                            table.push("<td><a href='javascript:void(0)' data-name='acc'>結算</a> / <a href='javascript:void(0)' data-name='up'>修改</a> / <a href='javascript:void(0)' data-name='del'>刪除</a></td>");
                        }
                        table.push("</tr>");
                    }
                }
                $("#open-num #list").html(table.join(""));


                cleartisautoopen = setTimeout("checkisautoopen()", 10000);

            }, function () {
                G.rollBack();
                cleartisautoopen = setTimeout("checkisautoopen()", 10000);
            });


        }
    } catch (e) {
        alert(e);
    }

}

function resetcheckisauto(page) {

    clearTimeout(cleartisautoopen);
    curopenpage = page;
    checkisautoopen();


}


//全局开奖
function opnum(msg) {
    G.scrollLoad({});

    if (__sysinfo.KaiJiangID != "" && __sysinfo.KaiJiangID != "0" && __sysinfo.level == 1) {

        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        if (gameIndex != undefined) {
            var isexitskjid = false;
            var kjids = __sysinfo.KaiJiangID.split(',');
            for (var ki = 0; ki < kjids.length; ki++) {
                if (kjids[ki] == gameIndex) {
                    isexitskjid = true;
                    break;
                }
            }
            if (isexitskjid) {
                msg.data_action = "opnum&gameIndex=" + gameIndex + "&page=" + curopenpage;
            } else {
                msg.data_action = "opnum&gameIndex=" + __sysinfo.KaiJiangID.split(',')[0] + "&page=" + curopenpage;
            }

        } else {
            msg.data_action = "opnum&gameIndex=" + __sysinfo.KaiJiangID.split(',')[0] + "&page=" + curopenpage;
        }


    }
    S.request = G.ajax(msg.data_action, function (json) {

        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
        var titleNavAry = ["<select data-id='gameIndex'>"];

        if (__sysinfo.KaiJiangID != "" && __sysinfo.KaiJiangID != "0" && __sysinfo.level == 1) {

            var kaijiangdata = __sysinfo.KaiJiangID.split(',');
            for (var ki = 0; ki < kaijiangdata.length; ki++) {

                $("#gameList li a").each(function () {
                    if (kaijiangdata[ki] == $(this).attr("data-index")) {
                        titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
                    }
                });

            }


        } else {
            $("#gameList li a").each(function () {
                titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
            });
        }

        titleNavAry.push("</select>");
        forceMiddle({ titleNav: titleNavAry.join("") });
        $("#title-nav").addClass("title-nav-right");
        $("select[data-id='gameIndex']").val(gameIndex);
        $("select[data-id]").unbind("change").change(function () {

            resetcheckisauto(1);

            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {

            resetcheckisauto(myPage);

            middleBind({ data_action: myPage });

        });

        var txtInput, colspan;
        switch (gameIndex) {
            case 1:
            case 13: colspan = 7;
                txtInput = addInput(7);
                break;
            case 2:
            case 7: colspan = 8;
                txtInput = addInput(8);
                break;
            case 15:
            case 3:
            case 10: colspan = 5;
                txtInput = addInput(5);
                break;
            case 14:
            case 4:
            case 8: colspan = 10;
                txtInput = addInput(10);
                break;
            case 5: colspan = 3;
                txtInput = addInput(3);
                break;
            case 6: colspan = 20;
                txtInput = addInput(20);
                break;
        }

        var title = "全局開獎";
        var table = [
            "<div id='open-num'>",
            "<table class='middle-table'><thead><tr><th>開獎期數</th><th>開獎日期</th><th colspan='" + colspan + "'>開獎號碼</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td><input type='text' name='opNum' class='text-input sw90' /></td>",
            "<td><input type='text' name='opDate' class='text-input sw120' /></td>",
            "" + txtInput + "",
            "</tr>",
            "</tbody>",
            "</table>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding:10px 0 10px 0;'><span class='text-btn' id='submit'>保存設置</span>",
            "</table>",
            "<table class='middle-table cellpadding='0' cellspacing='0'>",
            "<thead><tr><th colspan='2'>开奖设置</th></tr></thead>",
            "<tbody>",
            "<tr><td style='text-align:right;width:40%;'>开奖读取参数：</td><td style='text-align:left;'><input name='cbisauto' type='radio' value='0' " + (json.isauto == "0" ? "checked='true'" : "") + " >",
            ((gameIndex == 14 || gameIndex == 15) ? "读取官方168kai.com" : "读取官网"),
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name='cbisauto' type='radio' value='1' " + (json.isauto == "1" ? "checked='true'" : "") + " >手动开奖",

            "</td></tr>",

            "<tr style='display:" + ((gameIndex == 14 || gameIndex == 15) ? ";" : "none") + "' ><td style='text-align:right;'>",

            ((gameIndex == 14 || gameIndex == 15) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;精确设置-随机开出多少组号码进行对比[建议100-500]：<input id='randomnum' class='text-input sw30' type='text' value='" + json.randomnum + "' >" : ""),



            "</td><td style='text-align:left;'>",

            ((gameIndex == 14 || gameIndex == 15) ? "<input name='cbisauto' type='radio' value='2' " + (json.isauto == "2" ? "checked='true'" : "") + " >本地智能计算" : ""),
            ((gameIndex == 14 || gameIndex == 15) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name='cbisauto' type='radio' value='3' " + (json.isauto == "3" ? "checked='true'" : "") + " >按照赢最多开出" : ""),
            ((gameIndex == 14 || gameIndex == 15) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name='cbisauto' type='radio' value='4' " + (json.isauto == "4" ? "checked='true'" : "") + " >按照赢最少开出" : ""),
            ((gameIndex == 14 || gameIndex == 15) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name='cbisauto' type='radio' value='5' " + (json.isauto == "5" ? "checked='true'" : "") + " >按照输最多开出" : ""),
            ((gameIndex == 14 || gameIndex == 15) ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name='cbisauto' type='radio' value='6' " + (json.isauto == "6" ? "checked='true'" : "") + " >按照输最少开出" : ""),


            "</td></tr>",

            "<tr><td></td><td style='text-align:left;'>",
            "<span class='text-btn' style='text-align:center;' id='submitAuto'>开奖设置</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
            "</td></tr>",

            "<tr style='display:" + ((gameIndex == 14 || gameIndex == 15) ? ";" : "none") + "' ><td style='text-align:right;'>智能开奖说明：</td><td style='text-align:left;'>",
            "赢最多开出指：庄家赢最多开奖，输最多开出指：庄家输最多开奖；<br />随机开多少组号码对比指：（例如选择了'按照赢最多开出'的选项，精确设置填写了100）那么就是在100组号码里面挑选一组庄家赢最多的号码去做开奖号码。",
            "</td></tr>",

            "</tbody></table>",
            "<div class='clear'></div>",
            "<table class='middle-table' style='width:730px;margin:0 auto'><thead><tr><th class='w20'>開獎期數</th><th class='w20'>開獎日期</th><th>開獎號碼</th><th class='w20'>功能</th></tr></thead>",
            "<tbody id='list'>",

            "</tbody>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();


        $("#submitAuto").unbind("click").click(function () {

            var isauto = $("input[name='cbisauto']:checked").val();
            var randomnum = "0";
            if ($("#randomnum") != undefined) {
                randomnum = $("#randomnum").val();
            }


            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax("isauto&gameindex=" + $("select[data-id]").val() + "&data=" + isauto + "," + randomnum, function (json) {
                    data_stop = true;
                    G.maskClose();

                    G.alert({ content: "更改成功", ok: function () { return true; } });

                }, function () { G.maskClose(); data_stop = true; });
            }


        });


        table = [];
        if (json.list && json.list.length > 0) {
            var bc;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr data-num='" + json.list[i][0] + "' class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length; n++) {
                    table.push("<td>" + json.list[i][n] + "</td>");
                }
                if (__sysinfo.KaiJiangID != "" && __sysinfo.KaiJiangID != "0" && __sysinfo.level == 1) {
                    table.push("<td><a href='javascript:void(0)' data-name='acc'>結算</a> / <a href='javascript:void(0)' data-name='up'>修改</a> </td>");
                } else {
                    table.push("<td><a href='javascript:void(0)' data-name='acc'>結算</a> / <a href='javascript:void(0)' data-name='up'>修改</a> / <a href='javascript:void(0)' data-name='del'>刪除</a></td>");
                }
                table.push("</tr>");
            }
        }
        $("#open-num #list").html(table.join(""));
        G.mouseover("#open-num #list tr");

        var data_stop = true;

        $("body").delegate("#open-num #list td a", "click", function () {

            var data_name = $(this).attr("data-name");
            var mytr = $(this).parents("tr");
            var data_num = mytr.attr("data-num");
            var txt = $(this).html();
            if (data_name == "up") { //修改
                $("#open-num input[name='opNum']").val(mytr.find("td:eq(0)").html());
                $("#open-num input[name='opDate']").val(mytr.find("td:eq(1)").html());
                mytr.find("td:eq(2) i").each(function (i) {
                    $("#open-num input[name='no-" + (i + 1) + "']").val($(this).attr("data-num"));
                });
            } else { //结算、删除
                G.alert({
                    content: "確定" + txt + "嗎？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&data=" + data_name + "&opNum=" + data_num, function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    G.alert({
                                        content: txt + "成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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

        });


        //$("").unbind("click").click(function () {

        //});


        $("#open-num #submit").unbind("click").click(function () {
            var mydata = [], bal = [];
            mydata.push("opNum=" + $("#open-num input[name='opNum']").val());
            mydata.push("opDate=" + $("#open-num input[name='opDate']").val());
            $("#open-num input[num='']").each(function () {
                bal.push($(this).val());
            });
            mydata.push("opBalAry=" + bal.join(","));
            if (S.request) { S.request.abort(); }
            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&data=add&" + mydata.join("&"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({
                            content: "保存成功。",
                            ok: function () { return true; },
                            close: function () { middleBind({ data_action: msg.data_action }); }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });



        resetcheckisauto(json.currentPage);


    }, function () {
        G.rollBack();
    });
    function addInput(index) {
        var list = [];
        for (var i = 1; i <= index; i++) {
            list.push("<td><input type='text' name='no-" + i + "' class='text-input sw30' num='' /></td>");
        }
        return list.join("");
    }
}

//註单管理
function frommesg(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var settlementAry = "";
        var title = "註單管理";
        var thead = ["註單号/日期", "賬號", "彩種/期數", "玩法明細", "賠率/盤口", "下註金額", "輸贏結果", "代理", "代理商", "股東", "分公司", "總監", "補貨"];
        var mysettlement = G.query("settlement", "?" + msg.data_action) || 1;
        if (mysettlement == 2 || mysettlement == 3 || mysettlement == 4) {
            thead.push("操作者");
        }
        if ((mysettlement == 0 || mysettlement == 1 || mysettlement == 2 || mysettlement == 3 || mysettlement == 4) && (__sysinfo.level == 0 || (__sysinfo.operateOrderID == 1 && __sysinfo.level == 1))) {
            if (mysettlement == 4 && __sysinfo.level != 0) {

            } else {
                thead.push("功能设置");
            }

            settlementAry = "<option value='3'>删除單</option><option value='4'>修改單</option>";
        }

        var titleNavAry = ["<label>彩種:<select name='gameIndex'><option value='-1'>全部</option>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");

        //绑定titleNav
        var titleNav = titleNavAry.join("")
            + "<label>狀態:<select name='settlement'><option value='0'>未结算</option><option selected='selected' value='1'>已结算</option><option value='2'>取消單</option>" + settlementAry + "</select></label>"
            + "<label>日期:<select name='beforeDate'></select></label>"
            + "<label>期数:<select name='timesNum'><option value='-1'>全部</option></select></label>"
            + "<label>總監~會員賬號：<input type='text' class='text-input sw90' name='searchname' />&nbsp;&nbsp;<a href='javascript:void(0);' name='search'>查詢</a>&nbsp;&nbsp;<a href='javascript:void(0);' name='refresh'>刷新</a></label>";

        var table = [];
        if (json.list) {
            var bc, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                var isupdate = true;
                for (var n = 0; n < json.list[i].length; n++) {
                    txt_right = n >= 5 && n <= 11 ? "txt-right" : "";
                    if (json.list[i][n].indexOf("×") != -1) {
                        if (json.list[i][n].indexOf("×1註") == -1) {
                            isupdate = false;
                        }
                    }
                    table.push("<td class='" + txt_right + "'>" + json.list[i][n] + "</td>");
                }
                if (__sysinfo.level == 0 || (__sysinfo.operateOrderID == 1 && __sysinfo.level == 1)) {
                    if (mysettlement == 4 && __sysinfo.level != 0) {

                    } else {
                        table.push("<td class='sw120'>");
                    }
                    if (mysettlement == 0 || mysettlement == 1) {
                        table.push("<a href='javascript:void(0);' class='black' data-auto='1'>取消</a> / ");
                        if (isupdate) {
                            table.push("<a href='javascript:void(0);' class='black' data-auto='2'>修改</a> / ");
                        }
                        table.push("<a href='javascript:void(0);' class='black' data-auto='3'>刪除</a>");
                    } else if (mysettlement == 2) {
                        table.push("<a href='javascript:void(0);' class='black' data-auto='1'>恢復</a> / ");
                        table.push("<span>修改</span> / ");
                        table.push("<span>刪除</span>");
                    } else if (mysettlement == 3) {
                        table.push("<span>取消</span> / ");
                        table.push("<span>修改</span> / ");
                        table.push("<a href='javascript:void(0);' class='black' data-auto='3'>恢復</a>");
                    } else if (mysettlement == 4 && __sysinfo.level == 0) {
                        table.push("<a href='javascript:void(0);' class='black' data-auto='3'>刪除</a>");
                    }
                    if (mysettlement == 4 && __sysinfo.level != 0) {

                    } else {
                        table.push("</td>");
                    }
                }
                table.push("</tr>");
            }
        }
        $("#load-middle").html(forceMiddle({ id: "frommesg", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //加载日期列表
        if (json.dateAry) {
            for (var i = 0; i < json.dateAry.length; i++) {
                $("#title-nav select[name='beforeDate']").append("<option value='" + json.dateAry[i] + "'>" + json.dateAry[i] + "</option>");
            }
        }
        //加载期数列表
        if (json.numAry) {
            for (var i = 0; i < json.numAry.length; i++) {
                $("#title-nav select[name='timesNum']").append("<option value='" + json.numAry[i] + "'>" + json.numAry[i] + "期</option>");
            }
        }

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定默认选中值=彩种
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }
        //绑定默认选中值=状态
        var settlement = G.query("settlement", "?" + msg.data_action);
        if (settlement) {
            $("#title-nav select[name='settlement']").val(settlement);
        }
        //绑定默认选中值=日期
        var beforeDate = G.query("beforeDate", "?" + msg.data_action);
        if (beforeDate) {
            $("#title-nav select[name='beforeDate']").val(beforeDate);
        }
        //绑定默认选中值=期数
        var timesNum = G.query("timesNum", "?" + msg.data_action);
        if (timesNum) {
            $("#title-nav select[name='timesNum']").val(timesNum);
        }
        //select选中获取数据
        $("#title-nav select").unbind("change").change(function () {
            fromMesgAction();
        });
        //刷新数据
        $("#title-nav a[name='refresh']").unbind("click").click(function () {
            fromMesgAction();
        });
        $("#title-nav a[name='search']").unbind("click").click(function () {
            var searchname = $("#title-nav input[name='searchname']").val();
            if (!G.StringSign(searchname)) {
                G.alert({ content: "請“填寫”有效的賬號！", ok: function () { return true; } });
            } else {
                fromMesgAction();
            }
        });
        //取消、修改、删除
        $("#frommesg tbody td a").unbind("click").click(function () {
            if ($(this).attr("data-auto")) {
                var data_stop = true;
                var data_auto = $(this).attr("data-auto");
                var data_id = $(this).parents("tr").find("td:eq(0) span").html();
                var data_txt = $(this).html();
                if (data_auto == 1 || data_auto == 2 || data_auto == 3) {
                    var content = "註單號#" + data_id + " 您確定 “" + data_txt + "” 嗎？";
                    G.alert({
                        content: content,
                        ok: function () {
                            if (data_stop) {
                                data_stop = false;
                                G.mask();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax(msg.data_action + "&id=" + data_id + "&auto=" + data_auto, function (json) {
                                    G.maskClose();

                                    if (json.result == 1 && data_auto != 2) {
                                        G.alert({
                                            content: "註單號#" + data_id + " " + data_txt + "成功。",
                                            ok: function () { return true; },
                                            close: function () { middleBind({ data_action: msg.data_action }); }
                                        });
                                    } else if (data_auto == 2) {

                                        if (json.danhao != undefined) {
                                            var table = [];
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\"><span name='shareRole'></span>注单号:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>" + json.danhao + "");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">賬號:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.zhanghao);
                                            table.push("<div class='user-div hiden'></div>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注类型:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.DetailsType);
                                            table.push("<div class='user-div'></div>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注期数:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.NumberDate);
                                            table.push("<span class='red' id='up-rmb'></span>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注明细:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.Details1 + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注内容:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.optneirong + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">赔率:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.Odds);
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注金额:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.Money + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">输赢结果:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.DetailsWin + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");



                                            var content = forceMiddle({ id: "credits-change", tbody: table });
                                            G.alert({
                                                title: "注单修改", content: content, width: 280,
                                                initialize: function () {

                                                },
                                                ok: function () {


                                                    if (json.Details2 == $("#selcheck").val()) {
                                                        G.myTips({ content: "未做任何修改", obj: $("#selcheck"), myclick: true });
                                                        return false;
                                                    }

                                                    S.request = G.ajax(msg.data_action + "&id=" + data_id + "&detail2=" + $("#selcheck").val(), function (json) {
                                                        data_stop = true;
                                                        G.maskClose();
                                                        if (json.result == 1) {
                                                            G.alert({
                                                                content: "保存成功。",
                                                                ok: function () { return true; },
                                                                close: function () { middleBind({ data_action: msg.data_action }); }
                                                            });
                                                        } else {
                                                            G.alert({ content: json.result, ok: function () { return true; } });
                                                        }
                                                    }, function () { data_stop = true; G.maskClose(); });

                                                    return true;

                                                },
                                                cancel: function () { }
                                            });
                                        } else {
                                            G.alert({ content: json.result, ok: function () { return true; } });
                                        }


                                    } else {
                                        G.alert({ content: json.result, ok: function () { return true; } });
                                    }

                                }, function () { G.maskClose(); });
                            }
                            return true;
                        },
                        cancel: function () { }
                    });
                }
            }
        });
        function fromMesgAction() {
            var gameIndex = $("#title-nav select[name='gameIndex']").val();
            var settlement = $("#title-nav select[name='settlement']").val();
            var beforeDate = $("#title-nav select[name='beforeDate']").val();
            var timesNum = $("#title-nav select[name='timesNum']").val();
            var searchname = $("#title-nav input[name='searchname']").val();
            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "settlement", val: settlement, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "beforeDate", val: beforeDate, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "timesNum", val: timesNum, pad: true });
            if (G.StringSign(searchname))
                referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        }
    }, function () {
        G.rollBack();
    });
}

//总监参数设置
function datum(msg) {
    if (!msg.action) { //选择总监
        $("#navListBox").hide();
        G.mask();
        if (S.request) { S.request.abort(); }
        S.request = G.ajax("searchdirector", function (json) {
            G.maskClose();
            var table = ["<div id='my-zj' style='margin:10px;'>總監賬號：<select id='setName-zj'>"];
            for (var i in json) {
                table.push("<option value='" + json[i] + "'>" + i + "</option>");
            }
            table.push("</select></div>");

            var content = table.join("");
            G.alert({
                title: "選擇總監", content: content,
                ok: function () {
                    var zjUser = $("#my-zj #setName-zj").val();
                    var zjtxt = $("#my-zj #setName-zj").find("option:selected").text();
                    if (zjUser && zjUser != "") {
                        __sysinfo.myName = zjUser;
                        __sysinfo.myRoleName = zjtxt;
                        $("#navListBox").show();
                        datum({ data_action: msg.data_action, action: true });
                        return true;
                    }
                },
                close: function () { }
            });

        }, function () { G.maskClose(); });
    } else {
        G.scrollLoad({});
        var obj = appenDatum(msg);
        S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
            G.loadEnd();
            for (var i in json) {
                obj.find("input[type='text'][name='" + i + "']").val(json[i]);
                obj.find("input[type='radio'][name='" + i + "'][value='" + json[i] + "']").attr("checked", "checked");

                if (i == "KaiJiangID") {

                    var kaijiangdata = json[i].split(',');
                    for (var ki = 0; ki < kaijiangdata.length; ki++) {

                        obj.find("input[type='checkbox'][name='" + i + "'][value='" + kaijiangdata[ki] + "']").attr("checked", "checked");
                    }

                }
            }



            if (json.ipPort && json.ipPort.length > 0) {
                //for (var i = 0; i < json.ipPort.length; i++) {
                //    obj.find("select[name='ipPort']").append("<option value='" + json.ipPort[i] + "'>" + json.ipPort[i] + "</option>");
                //}
                //obj.find("select[name='ipPort']").val(json.port);
                obj.find("input[type='text'][name='ipPort']").val(json.port);
            }
            //数据提交
            var data_stop = true;
            obj.find("#submit").unbind("click").click(function () {
                var dataAry = [], data = [], ipset = [];
                dataAry.push("maxOnline=" + obj.find("input[name='maxOnline']").val());
                dataAry.push("ipPort=" + obj.find("input[name='ipPort']").val());
                obj.find("#quanx :radio").each(function () {
                    if ($(this).attr("checked"))
                        data.push($(this).attr("name") + ":" + $(this).val());
                });

                var kaijiang = "";
                var kaijiangdata = [];
                obj.find("#quanx input[name='KaiJiangID']").each(function () {
                    if ($(this).is(":checked"))
                        kaijiangdata.push($(this).val());
                });

                dataAry.push("kaijiang=" + "" + kaijiangdata.join(","));

                dataAry.push("data=" + data.join(","));
                for (var i = 1; i <= 8; i++) {
                    ipset.push(obj.find("#ipset input[name='IP_" + i + "']").val() + "|" + obj.find("#ipset input[name='IP_" + i + "_S']:checked").val());
                }
                dataAry.push("ipset=" + ipset.join(","));
                if (data_stop) {
                    data_stop = false;
                    G.mask();
                    if (S.request) { S.request.abort(); }
                    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&" + dataAry.join("&"), function (json) {
                        G.maskClose();
                        data_stop = true;
                        if (json.result == 1) {
                            G.alert({ content: "保存成功。", ok: function () { return true; } });
                        } else {
                            G.alert({ content: json.result, ok: function () { return true; } });
                        }
                    }, function () { G.maskClose(); data_stop = true; });
                }
            });
            //设置默认赔率
            obj.find("#bakOdds").unbind("click").click(function () {
                G.alert({
                    content: "將當前總監所有賠率設為新增默認值，確定嗎？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&bakodds=1", function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({ content: "保存成功。", ok: function () { return true; } });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            });

        }, function () {
            G.rollBack();
        });
    }
}

//系统设置
function globalr(msg) {
    G.scrollLoad({});
    var obj = appenGglobalr(msg);
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        for (var i = 0; i < json.opGame.length; i++) {
            if (json.opGame[i] == 1) {
                obj.find("table[data-index='" + i + "']").show();
            } else {
                obj.find("table[data-index='" + i + "']").hide();
            }
        }
        for (var i in json) {
            obj.find("input[type='radio'][name='" + i + "'][value='" + json[i] + "']").attr("checked", "checked");
            obj.find("input[type='text'][name='" + i + "']").val(json[i]);
        }
        obj.find("select[name='clindex']").val(json.IndexCL);

        obj.find("select[name='bankname']").val(json.BankName);
        obj.find("input[name='bankaccountno']").val(json.BankAccountNO);
        obj.find("input[name='bankaccountrealname']").val(json.BankAccountRealName);
        obj.find("input[name='bankaccountcity']").val(json.BankAccountCity);

        obj.find("input[name='contactqq']").val(json.ContactQQ);
        obj.find("input[name='contactphone']").val(json.ContactPhone);


        obj.find("input[type='text']").focus(function () {
            if ($(this).attr("msg")) {
                G.myTips({ content: $(this).attr("msg"), obj: $(this), myclick: true });
            }
        });
        //数据提交
        obj.find("#submit").unbind("click").click(function () {
            var dataAry = [], data_stop = true;
            obj.find("input").each(function () {
                if ($(this).attr("type") == "text") {
                    dataAry.push($(this).attr("name") + ":" + $(this).val());
                } else if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                    dataAry.push($(this).attr("name") + ":" + $(this).val());
                }
            });
            dataAry.push("clindex:" + obj.find("select[name='clindex']").val());
            dataAry.push("bankname:" + obj.find("select[name='bankname']").val());
            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&data=" + dataAry.join(","), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//赔率设置
function setodds(msg) {
    G.scrollLoad({});
    var obj = appendSetOdds(msg);
    G.mouseover(obj.find("tbody tr"), "bc");
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        if (json.animalrIndex) {
            for (var i = 0; i < json.animalrIndex.length; i++) {
                obj.find("tr[data-animalr='" + i + "']").attr("sort", json.animalrIndex[i]);
            }
        }
        if (json.animalr) {
            obj.find("span[name='animalr']").html(json.animalr);
        }
        for (var i in json) {
            for (var n = 0; n < 4; n++) {
                obj.find("tr[sort='" + i + "'] input[type='text']").eq(n).val(json[i][n]);
            }
        }
        obj.find("#reset").click();
        obj.find("tbody input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });
        obj.find("td input[type='checkbox']").unbind("change").change(function () {
            if ($(this).attr("checked")) {
                $(this).parent().parent("tr").addClass("myqhs");
            } else {
                $(this).parent().parent("tr").removeClass("myqhs");
            }
        });
        obj.find("#all").unbind("click").click(function () {
            obj.find("td tbody input[type='checkbox']").attr("checked", true);
            obj.find("tbody tr").addClass("myqhs");
        });
        obj.find("#reset").unbind("click").click(function () {
            obj.find("tr.myqhs").removeClass("myqhs");
            obj.find("td input[type='checkbox']").attr("checked", false);
        });
        //快捷設置賠率
        obj.find("#od-set .odds-kj span").unbind("click").click(function () {
            var value = parseFloat($(this).html());
            var od_a = obj.find("input[name='od-a']").attr("checked");
            var od_b = obj.find("input[name='od-b']").attr("checked");
            var od_c = obj.find("input[name='od-c']").attr("checked");
            var od_max = obj.find("input[name='od-max']").attr("checked");
            var dow;
            obj.find("tbody tr.myqhs").each(function () {
                $(this).find("input[type='text']").each(function (i) {
                    dow = value + parseFloat($(this).val());
                    if (i == 0) {
                        if (od_a && dow >= 0) {
                            $(this).val(G.forDight(dow, 4));
                        } else if (od_a) {
                            $(this).val("0");
                        }
                    } else if (i == 1) {
                        if (od_b && dow >= 0) {
                            $(this).val(G.forDight(dow, 4));
                        } else if (od_b) {
                            $(this).val("0");
                        }
                    } else if (i == 2) {
                        if (od_c && dow >= 0) {
                            $(this).val(G.forDight(dow, 4));
                        } else if (od_c) {
                            $(this).val("0");
                        }
                    } else if (i == 3) {
                        if (od_max && dow >= 0) {
                            $(this).val(G.forDight(dow, 4));
                        } else if (od_max) {
                            $(this).val("0");
                        }
                    }
                });
            });
        });
        //数据提交
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            var data = [], ary, sort, locks = true;
            obj.find("tbody tr").each(function () {
                sort = $(this).attr("sort");
                ary = [];
                $(this).find("input[type='text']").each(function () {
                    if (!G.DecimalSign($(this).val())) {
                        G.alert({ content: "請填寫有效參數值。", ok: function () { return true; } });
                        locks = false;
                        return false;
                    } else {
                        ary.push($(this).val());
                    }
                });
                data.push(sort + ":" + ary.join(","));
            });
            if (data_stop && locks) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&data=" + data.join("|"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//自动跳水
function autoodds(msg) {
    G.scrollLoad({});
    var obj = appendAutoOdds(msg);
    G.mouseover(obj.find("tbody tr"));
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        for (var i in json) {
            for (var n = 0; n < 3; n++) {
                obj.find("tr[sort='" + i + "'] input[type='text']").eq(n).val(json[i][n]);
            }
            obj.find("tr[sort='" + i + "'] select").val(json[i][3]);
        }
        obj.find("input[name='TongLuOdds']").val(json.TongLuOdds);
        obj.find("#all1").unbind("click").click(function () {
            obj.find("select").val("0");
        });
        obj.find("#all2").unbind("click").click(function () {
            obj.find("select").val("1");
        });
        obj.find("input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            var data = [], ary, sort, locks = true;
            obj.find("tbody tr").each(function () {
                sort = $(this).attr("sort");
                ary = [];
                $(this).find("input[type='text']").each(function () {
                    if (!G.DecimalSign($(this).val())) {
                        G.alert({ content: "請填寫有效參數值。", ok: function () { return true; } });
                        locks = false;
                        return false;
                    } else {
                        ary.push($(this).val());
                    }
                });
                ary.push($(this).find("select").val());
                data.push(sort + ":" + ary.join(","));
            });

            var TongLuOdds = parseInt(obj.find("input[name='TongLuOdds']").val()) || 0;
            if (TongLuOdds < 0 || TongLuOdds > 100) {
                G.alert({ content: "两面联动同路号码跳水比例范围为大于等于0小于等于100的整数", ok: function () { return true; } });
                return false;
            }
            if (data_stop && locks) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&TongLuOdds=" + TongLuOdds + "&data=" + data.join("|"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });
    }, function () {
        G.rollBack();
    });
}

//两面跳水
function lmautoodds(msg) {
    G.scrollLoad({});
    var obj = appendLmAutoOdds(msg);
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        obj.find("input[name='TongLuOdds']").val(json.TongLuOdds);
        for (var i in json) {
            if (i != "TongLuOdds") {
                obj.find("input[name='A_" + i + "']").val(json[i][0]);
                obj.find("input[name='B_" + i + "']").val(json[i][1]);
            }
        }
        obj.find("tbody input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            var a, b, data = [];
            var tongLuOdds = obj.find("input[name='TongLuOdds']").val();
            if (!G.NumberSign(tongLuOdds) || parseInt(tongLuOdds) < 0 || parseInt(tongLuOdds) > 100) {
                G.alert({ content: "同路“号码”随大路降赔率比例：0-100之间", ok: function () { return true; } });
                return false;
            }
            for (var i = 1; i <= 25; i++) {
                a = obj.find("input[name='A_" + i + "']").val();
                b = obj.find("input[name='B_" + i + "']").val();
                if (parseFloat(a) < 0 || parseFloat(a) > 1 || parseFloat(b) < 0 || parseFloat(b) > 1) {
                    G.alert({ content: "输入数字大于等于0~小于1，允许四位小数", ok: function () { return true; } });
                    return false;
                } else {
                    data.push(i + ":" + a + ":" + b);
                }
            }
            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&TongLuOdds=" + tongLuOdds + "&data=" + data.join(","), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//乐透HK开盘
function openinghk(msg) {
    G.scrollLoad({});
    var obj = appendOpeningHk(msg);
    obj.find("input[name='stratDate']").val(new Date().Format("yyyy-MM-dd"));
    obj.find("input[name='stratTime']").val("16:00:00");
    obj.find("input[name='endTime']").val("21:30:00");
    obj.find("input[name='trayTeMaNo']").val("21:31:00");
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        var table = [];
        for (var i = 0; i < json.length; i++) {
            table.push("<tr>");
            for (var n = 0; n < json[i].length; n++) {
                table.push("<td>" + json[i][n] + "</td>");
            }
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        obj.find("input[name='number']").focus(function () {
            G.myTips({ content: "格式：2016001", obj: $(this), myclick: true });
        });
        var data_stop = true;
        obj.find("#list a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).attr("data-id");
            var data_txt = $(this).html();
            if (data_name == "off" || data_name == "del") {
                G.alert({
                    content: "確定 “" + data_txt + "” 嗎？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&auto=" + data_name + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: data_txt + "成功。",
                                        ok: function () { return true; },
                                        close: function () {
                                            middleBind({ data_action: msg.data_action });
                                        }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "up") {
                obj.find("input[name='number']").val($(this).parents("tr").find("td").eq(1).html());
                obj.find("input[name='stratDate']").val($(this).parents("tr").find("td").eq(2).html());
                obj.find("input[name='stratTime']").val($(this).parents("tr").find("td").eq(3).html());
                obj.find("input[name='endTime']").val($(this).parents("tr").find("td").eq(4).html());
                obj.find("input[name='trayTeMaNo']").val($(this).parents("tr").find("td").eq(5).html());
                obj.find("input").addClass("bold");
                setTimeout(function () { obj.find("input").removeClass("bold") }, 500);
            }
        });
        obj.find("#submit").unbind("click").click(function () {
            var number = obj.find("input[name='number']");
            if (!G.NumberSign(number.val())) {
                number.focus();
                return false;
            }
            var dataAry = [
                number.val(),
                obj.find("input[name='stratDate']").val(),
                obj.find("input[name='stratTime']").val(),
                obj.find("input[name='endTime']").val(),
                obj.find("input[name='trayTeMaNo']").val()
            ];
            if (data_stop) {
                G.mask();
                data_stop = false;
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&auto=up" + "&data=" + dataAry.join(","), function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({
                            content: "保存成功。",
                            ok: function () { return true; },
                            close: function () {
                                obj.find("input[name='number']").val("");
                                obj.find("input[name='stratDate']").val(new Date().Format("yyyy-MM-dd"));
                                middleBind({ data_action: msg.data_action });
                            }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//七星彩开盘
function openingqxc(msg) {
    G.scrollLoad({});
    var obj = appendOpeningQXC(msg);
    obj.find("input[name='stratDate']").val(new Date().Format("yyyy-MM-dd"));
    obj.find("input[name='stratTime']").val("14:00:00");
    obj.find("input[name='endTime']").val("20:30:00");
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        var table = [];
        for (var i = 0; i < json.length; i++) {
            table.push("<tr>");
            for (var n = 0; n < json[i].length; n++) {
                table.push("<td>" + json[i][n] + "</td>");
            }
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        obj.find("input[name='number']").focus(function () {
            G.myTips({ content: "格式：16001", obj: $(this), myclick: true });
        });
        var data_stop = true;
        obj.find("#list a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).attr("data-id");
            var data_txt = $(this).html();
            if (data_name == "off" || data_name == "del") {
                G.alert({
                    content: "確定 “" + data_txt + "” 嗎？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&auto=" + data_name + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: data_txt + "成功。",
                                        ok: function () { return true; },
                                        close: function () {
                                            middleBind({ data_action: msg.data_action });
                                        }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "up") {
                obj.find("input[name='number']").val($(this).parents("tr").find("td").eq(1).html());
                obj.find("input[name='stratDate']").val($(this).parents("tr").find("td").eq(2).html());
                obj.find("input[name='stratTime']").val($(this).parents("tr").find("td").eq(3).html());
                obj.find("input[name='endTime']").val($(this).parents("tr").find("td").eq(4).html());
                obj.find("input").addClass("bold");
                setTimeout(function () { obj.find("input").removeClass("bold") }, 500);
            }
        });
        obj.find("#submit").unbind("click").click(function () {
            var number = obj.find("input[name='number']");
            if (!G.NumberSign(number.val())) {
                number.focus();
                return false;
            }
            var dataAry = [
                number.val(),
                obj.find("input[name='stratDate']").val(),
                obj.find("input[name='stratTime']").val(),
                obj.find("input[name='endTime']").val()
            ];
            if (data_stop) {
                G.mask();
                data_stop = false;
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&auto=up" + "&data=" + dataAry.join(","), function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({
                            content: "保存成功。",
                            ok: function () { return true; },
                            close: function () {
                                obj.find("input[name='number']").val("");
                                obj.find("input[name='stratDate']").val(new Date().Format("yyyy-MM-dd"));
                                middleBind({ data_action: msg.data_action });
                            }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//快彩提前封盘设置
function openingkc(msg) {
    G.scrollLoad({});
    var obj = appendOpeningKC(msg);
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        for (var i in json) {
            obj.find("input[name='" + i + "']").val(json[i]);
        }
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            if (data_stop) {
                var dataAry = [];
                obj.find("input").each(function () {
                    if (G.NumberSign($(this).val())) {
                        dataAry.push($(this).attr("name") + ":" + $(this).val());
                    }
                });
                G.mask();
                data_stop = false;
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&data=" + dataAry.join(","), function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });
    }, function () {
        G.rollBack();
    });
}

//公告管理
function newsinfo(msg) {
    G.scrollLoad({});
    var obj = appendNewsInfo(msg);

    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        $("#shell_pageControl").html("");
        json.totalRecord = parseInt(json.totalRecord);
        json.currentPage = parseInt(json.currentPage);
        json.totalPage = parseInt(json.totalPage);
        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });
        var table = [], txt_left, txt, bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");
            for (var n = 0; n < json.list[i].length; n++) {
                txt_left = n == 2 ? "txt-left" : "";
                if (n == 4) {
                    txt = json.list[i][n] == 0 ? "全部显示" : json.list[i][n] == 1 ? "后台显示" : "會員显示";
                    table.push("<td data-visible='" + json.list[i][n] + "'>" + txt + "</td>");
                } else {
                    table.push("<td class='" + txt_left + "'>" + json.list[i][n] + "</td>");
                }
            }
            table.push("<td><a href='javascript:void(0)' name='up'>修改</a> / <a href='javascript:void(0)' name='del'>删除</a></td>");
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        var data_stop = true;
        $("#newsAdd").unbind("click").click(function () {
            var content = "<div id='news-add'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='newsContent'></textarea></div><div>可见级别:<select name='visibleId'><option value='0'>全部</option><option value='1'>代理</option><option value='2'>會員</option></select></div></div>";
            G.alert({
                title: "新增公告", content: content,
                ok: function () {
                    var newsContent = $("#news-add textarea[name='newsContent']").val();
                    var visibleId = $("#news-add select[name='visibleId']").val();
                    if (newsContent == "") {
                        alert("請填寫公告內容");
                        return false;
                    } else if (newsContent.length > 200) {
                        alert("公告內容最高可输入200個字符。");
                        return false;
                    }

                    if (data_stop) {
                        G.mask();
                        data_stop = false;
                        if (S.request) { S.request.abort(); }
                        S.request = G.ajax(msg.data_action + "&auto=add&newsContent=" + newsContent + "&visibleId=" + visibleId, function (json) {
                            G.maskClose();
                            data_stop = true;
                            if (json.result == 1) {
                                G.alert({
                                    content: "保存成功。",
                                    ok: function () { return true; },
                                    close: function () { middleBind({ data_action: msg.data_action }); }
                                });
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); data_stop = true; });
                    }
                    return true;
                },
                cancel: function () { }
            });
        });
        obj.find("#list tbody td a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).parents("tr").find("td").eq(0).html();
            if (data_name == "del") {
                G.alert({
                    content: "確定刪除嗎？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=del&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "删除成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "up") {
                var content = "<div id='news-up'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='newsContent'></textarea></div><div>可见级别:<select name='visibleId'><option value='0'>全部</option><option value='1'>代理</option><option value='2'>會員</option></select></div></div>";
                var mythis = $(this), data_id;
                G.alert({
                    title: "修改公告", content: content,
                    initialize: function () {
                        data_id = mythis.parents("tr").find("td").eq(0).html();
                        var newsContent = mythis.parents("tr").find("td").eq(2).html();
                        var visibleId = mythis.parents("tr").find("td").eq(4).attr("data-visible");
                        $("#news-up textarea[name='newsContent']").val(newsContent);
                        $("#news-up select[name='visibleId']").val(visibleId);
                    },
                    ok: function () {
                        var newsContent = $("#news-up textarea[name='newsContent']").val();
                        var visibleId = $("#news-up select[name='visibleId']").val();
                        if (newsContent == "") {
                            alert("請填寫公告內容");
                            return false;
                        } else if (newsContent.length > 100) {
                            alert("公告內容最高可输入100個字符。");
                            return false;
                        }

                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=up&newsContent=" + newsContent + "&visibleId=" + visibleId + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "保存成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });

    }, function () {
        G.rollBack();
    });
}

function newsinfo2(msg) {
    G.scrollLoad({});
    var obj = appendNewsInfo2(msg);

    S.request = G.ajax(msg.data_action.replace("newsinfo2","newsinfo2") + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        $("#shell_pageControl").html("");
        json.totalRecord = parseInt(json.totalRecord);
        json.currentPage = parseInt(json.currentPage);
        json.totalPage = parseInt(json.totalPage);
        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage.replace("newsinfo2", "newsinfo2") });
        });
        var table = [], txt_left, txt, bc;
        table.push("<tr><td>2016-09-10 18:02</td><td class='txt-left'><b>當您加入本公司成為管理層時，您必須清楚了解及遵從本公司的所有條例。您在本公司網站開出的第壹個下線時，就代表您已同意及接受所有本公司的<a id='notice_rule' style='color: #f00; font-weight: 700;' href='javascript:'>《規則及條例》</a>。</b></td></tr>");
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");
            table.push("<td>" + json.list[i][1] + "</td><td class='txt-left'>" + json.list[i][2]+"</td>");
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        var data_stop = true;

    }, function () {
        G.rollBack();
    });
}


//充值管理
function setchongzhi(msg) {
    if (msg.State == undefined) {
        msg.State = 0;
    }
    if (msg.Date == undefined) {
        msg.Date = "";
    }
    if (msg.Key == undefined) {
        msg.Key = "";
    }

    G.scrollLoad({});
    var obj = appendChongZhi(msg);
    //绑定分页
    pageMiddle({ obj: $("#shell_pageControl"), currentPage: 0, totalPage: 0, referrer: msg.data_action }, function (myPage) {
        middleBind({ data_action: myPage });
    });

    S.request = G.ajax(msg.data_action + "&state=" + msg.State + "&date=" + msg.Date + "&key=" + msg.Key, function (json) {
        G.loadEnd();
        $("#currentPage").html(json.currentPage);
        $("#totalPage").html(json.totalPage);
        var table = [], txt_left, txt, bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");

            table.push("<td><input type='checkbox' name='" + json.list[i][0] + "' ></td>");

            for (var n = 0; n < json.list[i].length; n++) {

                table.push("<td>" + json.list[i][n] + "</td>");

            }
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        var data_stop = true;

        $("#chongzhi_date").datepicker();

        $("#chongzhi_state").change(function () {
            msg.State = $("#chongzhi_state").val();
            setchongzhi(msg);
        });

        $("#chongzhi_search").click(function () {
            msg.State = $("#chongzhi_state").val();
            msg.Date = $("#chongzhi_date").val();
            msg.Key = $("#chongzhi_key").val();
            setchongzhi(msg);
        });


        obj.find("#list tbody td a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).parents("tr").find("td").eq(1).html();
            if (data_name == "up") {
                G.alert({
                    content: "確定通过审核嗎？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=up&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "del") {
                var content = "<div id='news-up'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='desc'></textarea></div></div>";
                var mythis = $(this), data_id;
                G.alert({
                    title: "拒绝说明", content: content,
                    initialize: function () {
                        data_id = mythis.parents("tr").find("td").eq(1).html();
                    },
                    ok: function () {
                        var desc = $("#news-up textarea[name='desc']").val();
                        if (desc == "") {
                            alert("請填寫拒绝说明");
                            return false;
                        } else if (desc.length > 100) {
                            alert("拒绝说明最高可输入100個字符。");
                            return false;
                        }

                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=del&desc=" + desc + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });

        $("#chongzhi thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#chongzhi tbody td input[type='checkbox']").attr("checked", checked);
        });

        var data_stop = true;
        $("#chongzhi_delete").unbind("click").click(function () {
            var idAry = [];
            $("#chongzhi tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾選1個需要“刪除”的记录！", ok: function () { return true; } });
            } else {
                G.alert({
                    content: "警告：记录刪除后不可逆，確定刪除嗎？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax("del_chongzhi&data=" + idAry.join(","), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {

                                    msg.State = $("#chongzhi_state").val();
                                    msg.Date = $("#chongzhi_date").val();
                                    msg.Key = $("#chongzhi_key").val();

                                    middleBind(msg);
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
        });



    }, function () {
        G.rollBack();
    });
}


//充值管理
function settixian(msg) {
    if (msg.State == undefined) {
        msg.State = 0;
    }
    if (msg.Date == undefined) {
        msg.Date = "";
    }
    if (msg.Key == undefined) {
        msg.Key = "";
    }

    G.scrollLoad({});
    var obj = appendTiXian(msg);
    //绑定分页
    pageMiddle({ obj: $("#shell_pageControl"), currentPage: 0, totalPage: 0, referrer: msg.data_action }, function (myPage) {
        middleBind({ data_action: myPage });
    });

    S.request = G.ajax(msg.data_action + "&state=" + msg.State + "&date=" + msg.Date + "&key=" + msg.Key, function (json) {
        G.loadEnd();
        $("#currentPage").html(json.currentPage);
        $("#totalPage").html(json.totalPage);
        var table = [], txt_left, txt, bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");


            table.push("<td><input type='checkbox' name='" + json.list[i][0] + "' ></td>");


            for (var n = 0; n < json.list[i].length; n++) {

                table.push("<td>" + json.list[i][n] + "</td>");

            }
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        var data_stop = true;

        $("#tixian_date").datepicker();

        $("#tixian_state").change(function () {
            msg.State = $("#tixian_state").val();
            settixian(msg);
        });

        $("#tixian_search").click(function () {
            msg.State = $("#tixian_state").val();
            msg.Date = $("#tixian_date").val();
            msg.Key = $("#tixian_key").val();
            settixian(msg);
        });


        obj.find("#list tbody td a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).parents("tr").find("td").eq(1).html();
            if (data_name == "up") {
                G.alert({
                    content: "確定通过审核嗎？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=up&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "del") {
                var content = "<div id='news-up'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='desc'></textarea></div></div>";
                var mythis = $(this), data_id;
                G.alert({
                    title: "拒绝说明", content: content,
                    initialize: function () {
                        data_id = mythis.parents("tr").find("td").eq(1).html();
                    },
                    ok: function () {
                        var desc = $("#news-up textarea[name='desc']").val();
                        if (desc == "") {
                            alert("請填寫拒绝说明");
                            return false;
                        } else if (desc.length > 100) {
                            alert("拒绝说明最高可输入100個字符。");
                            return false;
                        }

                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=del&desc=" + desc + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });


        $("#tixian thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#tixian tbody td input[type='checkbox']").attr("checked", checked);
        });

        var data_stop = true;
        $("#tixian_delete").unbind("click").click(function () {
            var idAry = [];
            $("#tixian tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾選1個需要“刪除”的记录！", ok: function () { return true; } });
            } else {
                G.alert({
                    content: "警告：记录刪除后不可逆，確定刪除嗎？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax("del_chongzhi&data=" + idAry.join(","), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {

                                    msg.State = $("#tixian_state").val();
                                    msg.Date = $("#tixian_date").val();
                                    msg.Key = $("#tixian_key").val();
                                    settixian(msg);

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
        });


    }, function () {
        G.rollBack();
    });
}


//在线统计
function online(msg) {
    G.scrollLoad({});
    var obj = appendOnline(msg);

    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        $("#shell_pageControl").html("");
        json.totalRecord = parseInt(json.totalRecord);
        json.currentPage = parseInt(json.currentPage);
        json.totalPage = parseInt(json.totalPage);
        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        var level = G.query("level", "?" + msg.data_action) || 6;
        if (level == 6) {
            obj.find("#list thead th[data-level='6']").show();
        } else {
            obj.find("#list thead th[data-level='6']").hide();
        }

        var table = [], txt_left, txt;
        for (var i = 0; i < json.list.length; i++) {
            table.push("<tr>");
            for (var n = 0; n < json.list[i].length; n++) {
                if (n == 0) {
                    table.push("<td class='online cursor' data-id='" + json.list[i][n] + "'></td>");
                } else {
                    table.push("<td>" + json.list[i][n] + "</td>");
                }
            }
            table.push("</tr>");
        }
        for (var i = 0; i < json.onlineCount.length; i++) {
            obj.find("tbody[data-onlineCount=''] td").eq(i).html(json.onlineCount[i]);
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));

        obj.find("tbody[data-onlineCount=''] td.pointer").unbind("click").click(function () {
            var data_level = $(this).attr("data-level");
            middleBind({ data_action: "online&level=" + data_level });
        });
        var data_stop = true;
        obj.find("#list tbody td.online").unbind("click").click(function () {
            var data_id = $(this).attr("data-id");
            G.alert({
                content: "確定將此賬號踢出系統嗎？",
                ok: function () {
                    if (data_stop) {
                        G.mask();
                        data_stop = false;
                        if (S.request) { S.request.abort(); }
                        S.request = G.ajax(msg.data_action + "&id=" + data_id, function (json) {
                            G.maskClose();
                            data_stop = true;
                            if (json.result == 1) {
                                G.alert({
                                    content: "操作成功。",
                                    ok: function () { return true; },
                                    close: function () { middleBind({ data_action: msg.data_action }); }
                                });
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); data_stop = true; });
                    }
                    return true;
                },
                cancel: function () { }
            });
        });
        obj.find("#list td span.pointer").unbind("click").click(function () {
            if (data_stop) {
                var data_name = $(this).attr("data-name");
                var data_fid = $(this).attr("data-fid");
                G.mask();
                data_stop = false;
                if (S.request) { S.request.abort(); }
                S.request = G.ajax("online&name=" + data_name + "&fid=" + data_fid, function (json) {
                    G.maskClose();
                    data_stop = true;
                    var thead = ["彩種", "明細", "賠率", "金額", "退水", "結果"];
                    var table = [], txt_right;
                    if (json && json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            table.push("<tr>");
                            for (var n = 0; n < json[i].length; n++) {
                                txt_right = n >= 3 ? "txt-right w12" : "";
                                table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                            }
                            table.push("</tr>");
                        }
                    }
                    var content = G.overflowDiv({ id: "my-action", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
                    var generatedCount = 1;
                    var my_action = "online&name=" + data_name + "&fid=" + data_fid;
                    G.alert({
                        title: "註單明細", content: content, width: 580,
                        initialize: function () {
                            $("#my-action #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + my_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                                txt_right = n >= 3 ? "txt-right w12" : "";
                                                table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#my-action tbody").append(table.join(""));
                                    } else {
                                        $("#my-action #fondiv").find("a").hide();
                                        $("#my-action #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () { return true; }
                    });
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//日志查询
function operatinglog(msg) {
    G.scrollLoad({});
    var obj = appendOperatingLog(msg);
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        $("#shell_pageControl").html("");
        json.totalRecord = parseInt(json.totalRecord);
        json.currentPage = parseInt(json.currentPage);
        json.totalPage = parseInt(json.totalPage);
        //绑定分页
        pageMiddleNew({ obj: $("#shell_pageControl"), totalRecord: json.totalRecord, currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });
        var table = [], bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");
            for (var n = 0; n < json.list[i].length; n++) {
                table.push("<td>" + json.list[i][n] + "</td>");
            }
            table.push("</tr>");
        }
        obj.find("tbody").html(table.join(""));
        G.mouseover(obj.find("tbody tr"));

    }, function () {
        G.rollBack();
    });
}