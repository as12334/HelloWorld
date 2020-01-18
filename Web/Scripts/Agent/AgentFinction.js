//全局返回前一頁數據
var __backList = [];

//全局彩種賬單備份
function myBak(obj) {
    var href = $(obj).attr("linet");
    $("body").append("<a href='" + href + "' class='hidden' id='myBak-a'><span></span></a>");
    $("#myBak-a span").click();
    $("#myBak-a").remove();
}

function dataJson(msg) {
    $("#game-seet").remove();
    if (msg.total === "GameData" || msg.total === "Singlenote") {
        var myMsg = GameData(msg);
        msg.title = myMsg.title;
        msg.table = myMsg.table;
    } else {
        //移除即時註單的CSS
        var shell = $("#shell_top");
        shell.removeClass("shell-top-game");
        shell.find(".shell-top-left").removeClass("shell-top-left-game");
        shell.find(".shell-top-right").removeClass("shell-top-right-game");
        clearInterval(__intervalTime);
        clearInterval(__timeout);
    }
    //$("#middleContent").html(_ordinaryMiddle(msg));
    _ordinaryMiddle(msg);
    _selectMiddle(msg);
    comm.mouseover("#middleContent");

    if (__info.first == "0")
        comm.loadEnd();
}

//一級下拉選擇欄模塊
var _selectMiddle = function (msg) {
    //移除控件
    $("#selectsAll").remove();
    $("#userSubmit").remove();
    $("#btn-back").remove();
    $(".shell-title-icon").removeAttr("style");

    //創建返回控件
    if (msg.back == 1) {
        $("#shell_top").append("<span id='btn-back' title='返回' class='btn-back btn-icon'>返回</span>");
    } else {
        __backList = []; //移除前導頁數據
    }
    //返回上一頁
    if (__backList.length > 0) {
        $("#shell_top #btn-back").unbind("click").click(function () {
            var referrer = __backList.shift();
            comm.scrollLoad({});
            _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
        });
    }

    if (msg.total) {
        var _callBack, _paramName;
        var _referrer = $("#shell_pageControl #totalPage").attr("referrer");
        _referrer = comm.urlReplace({ url: _referrer, paramName: "page", pad: false });
        var gameDefaultText = msg.selectIndex != undefined ? msg.selectIndex.text : "";
        var gameDefaultVal = msg.selectIndex != undefined ? msg.selectIndex.value : "";
        if (msg.total === "Result") {
            var gameList = $("#gameList ul").html();
            $("#shell_top").append(_addselect("select-right"));
            $("#selectsAll").find("span").html(gameDefaultText).attr("value", gameDefaultVal);
            $("#selects ul").html(gameList);
            _paramName = "gameIndex";
        } else if (msg.total === "ChangePassword") {
            loginUserChangePwd();
        } else if (msg.total === "UserList") {
            UserList({ text: gameDefaultText, value: gameDefaultVal, title: msg.title, referrer: _referrer, magDel: msg.magDel, back: msg.back, addUrl: "/Agent/JsonData/UserAdd.aspx" });
            _paramName = "state";
        } else if (msg.total === "Rebate") {
            upRebate({ referrer: msg.referrer, DetailsDay: msg.DetailsDay, parnInt: msg.parnInt, memberInt: msg.memberInt, defaultIndex: msg.defaultIndex });
        } else if (msg.total === "Manager") {
            Manager({ text: gameDefaultText, value: gameDefaultVal, referrer: _referrer, magDel: msg.magDel, addUrl: "/Agent/JsonData/ManagerAdd.aspx" });
            _paramName = "state";
        } else if (msg.total === "Shipments") {
            _paramName = "gameIndex";
            ShipmentsSubmit({ referrer: msg.referrer, DetailsDay: msg.DetailsDay });
        } else if (msg.total === "Datnm") {
            DatnmSubmit({ referrer: msg.referrer });
        } else if (msg.total === "Globalr") {
            GlobalrSubmit({ referrer: msg.referrer });
        } else if (msg.total === "Opening") {
            OpeningSubmit({ referrer: msg.referrer });
        } else if (msg.total === "Online") {
            OnlineSubmit({ referrer: msg.pageControl.referrer });
        } else if (msg.total === "OperatingLog") {
            $("#shell_top").append(_addselect("select-right"));
            $("#selectsAll").find("span").html(gameDefaultText).attr("value", gameDefaultVal);
            $("#selects ul").html("<li><a index='2' href='javascript:void(0);'>賠率設置</a></li><li><a index='3' href='javascript:void(0);'>自動跳水</a><li><a index='5' href='javascript:void(0);'>開盤設置</a></li></li>");
            _paramName = "index";
        } else if (msg.total === "NewsInfo") {
            NewsInfoSubmit({ referrer: msg.pageControl.referrer });
        } else if (msg.total === "AutoOdds") {
            AutoOddsSubmit({ referrer: msg.referrer, DetailsDay: msg.DetailsDay, mydata: msg.mydata });
        } else if (msg.total === "LmAutoOdds") {
            LmAutoOddsSubmit({ referrer: msg.referrer, TongLuOdds: msg.TongLuOdds, oddsData: msg.oddsData });
        } else if (msg.total === "SetOdds") {
            SetOddsSubmit({ referrer: msg.referrer, mydata: msg.mydata });
        } else if (msg.total === "MsgLottery") {
            MsgLotterySubmit({ referrer: msg.referrer });
        } else if (msg.total === "Lottery") {
            LotterySubmit({ referrer: msg.referrer });
        } else if (msg.total === "OpenNum") {
            OpenNumSubmit({ referrer: msg.pageControl.referrer });
        } else if (msg.total === "ReportForm") {
            ReportFormSubmit({ referrer: msg.referrer });
        } else if (msg.total === "ReportList") {
            ReportListSubmit({ referrer: msg.referrer, nextUrl: msg.nextUrl });
        } else if (msg.total === "ReportData") {
            _paramName = "entVal";
            ReportDataSubmit({ referrer: msg.referrer, selectIndex: msg.selectIndex, listVal: msg.listVal });
        } else if (msg.total === "GameData" || msg.total === "Singlenote") {
            GameDataSubmit(msg);
        } else if (msg.total === "FromMesg") {
            FromMesgSubmit(msg);
        }


        _callBack = function (val) {
            _referrer = comm.urlReplace({ url: _referrer, paramName: _paramName, val: val, pad: true });

            //連碼類型參數調整
            if (_paramName == "entVal") {
                var detailsType = comm.query("detailsType", _referrer);
                if ((detailsType == "1" && val == "5") || (detailsType == "2" && val == "3") || (detailsType == "7" && val == "3")) {
                    _referrer = comm.urlReplace({ url: _referrer, paramName: "md", val: "3", pad: true });
                } else {
                    _referrer = comm.urlReplace({ url: _referrer, paramName: "md", val: "2", pad: true });
                }
            }
            comm.scrollLoad({});
            _ajax({ type: 'get', url: _referrer, data: null }, dataJson, comm.rollBack);
        };

        //下拉框效果
        (function () {
            $("#selectsAll span").click(function () {
                $("#selects").slideDown(150);
            });
            $("#selectsAll i").click(function () {
                $("#selects").slideDown(150);
            });
            $("#selectsAll").mouseleave(function () {
                $("#selects").hide();
            });
        })();
        //下拉框觸發
        $("#selects li").click(function () {
            var gameIndex = $(this).find("a").attr("index");
            var gameDefaultText = $(this).find("a").html();
            $("#selectsAll").find("span").html(gameDefaultText).attr("value", gameIndex);
            $("#selects").css("display", "none");
            if (_callBack)
                _callBack(gameIndex);
        });
    }
}

//一般数据模块
var _ordinaryMiddle = function (msg) {
    try {
        var _msg = msg || {};
        var _pageControl = _msg.pageControl || false;
        var _title = _msg.title || "标题";                                    //标题
        var _table = _msg.table.join("") || "";                               //内容
        //var _currentPage = _pageControl.currentPage || 1;                   //当前第几页                 
        //var _totalPage = _pageControl.totalPage || 0;                       //总页码
        //var _referrer = _pageControl.referrer || "";                        //请求地址
        //$("#shell_title").html(_title);
        //$("#middleContent").html(_table);
        document.getElementById("shell_title").innerHTML = _title;
        document.getElementById("middleContent").innerHTML = _table;
        if (_msg.pageControl) {
            //$("#shell_pageControl").html(_pageControlHtml(_pageControl.currentPage, _pageControl.totalPage, _pageControl.referrer));
            document.getElementById("shell_pageControl").innerHTML = _pageControlHtml(_pageControl.currentPage, _pageControl.totalPage, _pageControl.referrer);

            //绑定分页事件
            $("#shell_pageControl div.pager span").bind("click", function () {
                var page = comm.searchPage($(this));
                if (page) {
                    var referrer = $("#shell_pageControl #totalPage").attr("referrer");
                    referrer = comm.urlReplace({ url: referrer, paramName: "page", val: page, pad: true });
                    comm.scrollLoad({});
                    _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
                }
            });
        } else {
            $("#shell_pageControl").html("");
        }
    } catch (e) {
        art.dialog({ content: "Error：ordinaryMiddle", ok: function () { } });
    }
}

//下拉框控件
var _addselect = function (clas) {
    var _clas = clas || "";
    return "<div class='navBox-select " + _clas + "' id='selectsAll'><i class='up'></i><b class='down'></b><span></span><div class='navList' id='selects'><ul></ul></div></div>";
}


//分页控件
var _pageControlHtml = function (currentPage, totalPage, referrer) {
    return ""
        + "<div class='pager'>"
            + "<span class='first cursor' id='first'>首頁</span>"
            + "<span class='previous cursor' id='previous'>上一頁</span>"
            + "<span class='current_page'>第<b id='currentPage'>" + currentPage + "</b>頁</span>"
            + "<span class='total_page'>共<b class='total' referrer='" + referrer + "' id='totalPage'>" + totalPage + "</b>頁</span>"
            + "<span class='next cursor' id='next'>下一頁</span>"
            + "<span class='last cursor' id='last'>尾頁</span>"
        + "</div>";
}

//登錄用戶密碼修改
function loginUserChangePwd() {
    $("input[name='voldpassword']").focus();

    //重置
    $("#changpwd #reset").click(function () {
        $("#changpwd :password").val("");
    });

    $("#changpwd :password").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $("#submit").click();
            return false;
        }
    });

    //驗證密碼
    $("#changpwd #submit").click(function () {
        if (!$(this).attr("disabled")) {
            var voldpassword = $("#changpwd input[name='voldpassword']").val();
            var vnewpassword = $("#changpwd input[name='vnewpassword']").val();
            var vrenewpassword = $("#changpwd input[name='vrenewpassword']").val();

            if (voldpassword.length < 6 || voldpassword.length > 12) {
                art.dialog({ content: "原始密码长度为6-20位，必须包含大小寫字母和数字", ok: function () { } });
            } else if (vnewpassword.length < 6 || vnewpassword.length > 12) {
                art.dialog({ content: "新設密码长度为6-20位，必须包含大小寫字母和数字", ok: function () { } });
            } else if (vrenewpassword != vnewpassword) {
                art.dialog({ content: "兩次如數密碼不一致，請核實后重新輸入", ok: function () { } });
            } else if (voldpassword == vnewpassword) {
                art.dialog({ content: "舊密碼與新密碼一致，請更換新密碼。", ok: function () { } });
            } else if (!comm.safety(vnewpassword)) {
                art.dialog({ content: comm.errorPwd().replace(/\n\n/g,'<br /><br />'), width: 470, ok: function () { } });
            } else {
                $(this).attr("disabled", "true");
                _ajax({ type: 'post', url: 'JsonData/ChangePassword.aspx?t=' + __info.autoTid, data: { voldpassword: voldpassword, vnewpassword: vnewpassword} }, function (msg) {
                    if (msg.result === "1") {
                        art.dialog({ content: "密碼修改成功，請重新登錄系統。",
                            ok: function () {
                                location.href = location.href + "?t=" + __info.autoTid;
                            }
                        });
                    } else {
                        art.dialog({ content: msg.result, ok: function () { } });
                    }
                    $("#changpwd #submit").removeAttr("disabled");
                }, function () {
                    $("#changpwd #submit").removeAttr("disabled");
                });
            }

        }
    });
}

//--------------自動補貨設置------------
function ShipmentsSubmit(msg) {
    var obj = $("#shipments");
    //是否允許修改
    if (msg.DetailsDay == 1) {
        obj.find("input").attr("disabled", "disabled");
        obj.find("select").attr("disabled", "disabled");
    }

    //全選開啟、關閉
    obj.find("thead input[name='all']").click(function () {
        var val = $(this).val();
        obj.find("tbody td[name='auto'] select").val(val);
    });
    obj.find("tbody input[type='text']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    obj.keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });

    obj.find("#submit").click(function () {
        if (msg.DetailsDay == 0) {
            var data = [], sort, mythis;
            obj.find("tbody tr td input[number='']").each(function () {
                sort = $(this).attr("sort");
                data.push(sort + ":" + $(this).val() + ":" + obj.find("select[sort='" + sort + "']").val());
            });
            art.dialog({
                initialize: function () {
                    mythis = this;
                    _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { data: data.join(",")} }, function (text) {
                        if (text == "1") {
                            mythis.content("保存成功。");
                        } else {
                            mythis.content(text);
                        }
                    });
                },
                ok: function () { }
            });
        }
    });
}


//------------- 用戶管理 -----------------
function Manager(msg) {
    var setName = comm.query("setName", msg.referrer) || "";
    var magDelText = msg.magDel == 1 ? "<span class='text-btn-s' id='magDel'>刪除</span>" : "";
    $("#shell_top").append(_addselect("select-user"));
    $("#shell_top").append("<div class='userSubmit' id='userSubmit'>賬號:<input type='text' id='seachName' value='" + setName + "' autocomplete='off' maxlength='15' class='text-input sw90' /><span class='text-btn-s' id='search'>查詢</span><span class='text-btn-s' id='magAdd'>新增</span>" + magDelText + "</div>");
    $("#selectsAll").find("span").html(msg.text).attr("value", msg.value);
    $("#selects ul").html("<li><a index='0' href='javascript:void(0);'>停用</a></li><li><a index='1' href='javascript:void(0);'>凍結</a><li><a index='2' href='javascript:void(0);'>啟用</a></li>");
    //新增子賬戶
    $("#userSubmit #magAdd").click(function (mythis) {
        var mythis, exvthis, obj, ckbox;
        var t = comm.query("t", msg.referrer);
        var _submit = function () {
            var data = false, reg, mesg, val;
            obj.find(":text").each(function (i) {
                reg = eval($(this).attr("reg"));
                mesg = $(this).attr("mesg");
                val = $(this).val();
                if (!reg.test(val)) {
                    data = false;
                } else {
                    data = true;
                }
            });

            var pwdObj = obj.find(":password");
            val = pwdObj.val();
            reg = eval(pwdObj.attr("reg"));
            if (!reg.test(val) || !comm.safety(val)) {
                data = false;
            } else {
                data = true;
            }

            if (data) {
                data = [];
                data.push("Password:" + obj.find(":password").val());
                obj.find(":text").each(function () {
                    data.push($(this).attr("name") + ":" + $(this).val());
                });
                obj.find("input[name='status']").each(function () {
                    if ($(this).attr("checked")) {
                        data.push($(this).attr("name") + ":" + $(this).val());
                        return false;
                    }
                });
                obj.find("input[type='checkbox']").each(function () {
                    ckbox = $(this).attr("checked") ? 1 : 0;
                    data.push($(this).attr("name") + ":" + ckbox);
                });
                mythis.close();
                art.dialog({ content: "正在寫入數據，請稍後...",
                    initialize: function () {
                        exvthis = this;
                        _ajax({ type: 'post', dataType: 'text', url: msg.addUrl + "?t=" + t, data: { data: data.join(",")} }, function (text) {
                            if (text == "1") {
                                exvthis.content("賬號新增成功。");
                            } else {
                                exvthis.content(text);
                            }
                        });
                    },
                    ok: function () { },
                    beforeunload: function () {
                        comm.scrollLoad({});
                        _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                    }
                });
            }
        };
        art.dialog({ title: "新增子賬戶", id: "addUser-id", padding: "5px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'get', dataType: 'text', url: msg.addUrl, data: { t: t} }, function (text) {
                    mythis.content(text);
                    (function () {
                        obj = $("#add-user");
                        obj.find(":text").change(function () {
                            var reg = eval($(this).attr("reg"));
                            var mesg = $(this).attr("mesg");
                            var val = $(this).val();
                            if (reg) {
                                if (!reg.test(val)) {
                                    if (mesg) {
                                        $(this).siblings("div").removeClass("title-succeed").attr("title", mesg).addClass("title-error");
                                    }
                                } else {
                                    $(this).siblings("div").removeClass("title-error").removeAttr("title").addClass("title-succeed");
                                }
                            }
                            if ($(this).attr("name") === "UserName" && reg.test(val)) {
                                var _this = $(this);
                                _ajax({ type: 'get', dataType: 'text', url: "/Agent/JsonData/UserAdd.aspx", data: { userName: val} }, function (text) {
                                    if (text != "0") {
                                        var g = "賬號:" + val + " 已註冊使用，請更改其他字符串組合。";
                                        _this.siblings("div").removeClass("title-succeed").attr("title", g).addClass("title-error");
                                    }
                                });
                            }
                        });

                        obj.find(":password").change(function () {
                            var reg = eval($(this).attr("reg"));
                            var val = $(this).val();
                            if (!reg.test(val) || !comm.safety(val)) {
                                $(this).siblings("div").removeClass("title-succeed").attr("title", comm.errorPwd()).addClass("title-error");
                            } else {
                                $(this).siblings("div").removeClass("title-error").removeAttr("title").removeAttr("style").addClass("title-succeed");
                            }
                        });
                    })();
                    $("#add-user").find("input").keydown(function (e) {
                        var curKey = e.which;
                        if (curKey == 13) {
                            _submit(mythis);
                            return false;
                        }
                    });
                }, function () { mythis.close(); });
            },
            ok: function () {
                _submit(mythis);
                return false;

            },
            cancel: function () { }
        });
    });

    //修改子賬戶
    $("#manager span[up='']").click(function () {
        var name = $(this).parents("td").attr("name");
        var url = "/Agent/JsonData/" + $(this).attr("ref") + ".aspx?t=" + comm.query("t", msg.referrer) + "&setName=" + name;
        var mythis, obj, stop = false;
        var t = comm.query("t", msg.referrer);
        //var queryId = comm.query("queryId", msg.referrer);
        var _submit = function () {
            var data = false, reg, mesg, val;
            obj.find(":text").each(function (i) {
                reg = eval($(this).attr("reg"));
                mesg = $(this).attr("mesg");
                val = $(this).val();
                if (!reg.test(val)) {
                    data = false;
                } else {
                    data = true;
                }
            });

            var pwdObj = obj.find(":password");
            val = pwdObj.val();
            reg = eval(pwdObj.attr("reg"));
            if (val != "") {
                if (!reg.test(val) || !comm.safety(val)) {
                    data = false;
                } else {
                    data = true;
                }
            }

            if (data) {
                data = [];
                if (obj.find(":password").val() != "") {
                    data.push("Password:" + obj.find(":password").val());
                }
                obj.find(":text").each(function () {
                    data.push($(this).attr("name") + ":" + $(this).val());
                });
                obj.find("input[name='status']").each(function () {
                    if ($(this).attr("checked")) {
                        data.push($(this).attr("name") + ":" + $(this).val());
                        return false;
                    }
                });
                obj.find("input[type='checkbox']").each(function () {
                    ckbox = $(this).attr("checked") ? 1 : 0;
                    data.push($(this).attr("name") + ":" + ckbox);
                });
                art.dialog({ content: "正在寫入數據，請稍後...",
                    initialize: function () {
                        exvthis = this;
                        _ajax({ type: 'post', dataType: 'text', url: url, data: { data: data.join(",")} }, function (text) {
                            if (text == "1") {
                                stop = true;
                                exvthis.content("保存成功。");
                                mythis.close();
                            } else {
                                exvthis.content(text);
                            }
                        });
                    },
                    ok: function () { },
                    beforeunload: function () {
                        if (stop) {
                            comm.scrollLoad({});
                            _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                        }
                    }
                });
            }
        };

        art.dialog({ title: "修改子賬戶", padding: "10px 5px", id: "upUser-id",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'get', dataType: 'text', url: url, data: null }, function (text) {
                    mythis.content(text);
                    (function () {
                        obj = $("#up-user");
                        obj.find(":text").change(function () {
                            var reg = eval($(this).attr("reg"));
                            var mesg = $(this).attr("mesg");
                            var val = $(this).val();
                            if (reg) {
                                if (!reg.test(val)) {
                                    if (mesg) {
                                        $(this).siblings("div").removeClass("title-succeed").attr("title", mesg).addClass("title-error");
                                    }
                                } else {
                                    $(this).siblings("div").removeClass("title-error").removeAttr("title").addClass("title-succeed");
                                }
                            }
                        });

                        obj.find(":password").change(function () {
                            var reg = eval($(this).attr("reg"));
                            var val = $(this).val();
                            if (val != "") {
                                if (!reg.test(val) || !comm.safety(val)) {
                                    $(this).siblings("div").removeClass("title-succeed").attr("title", comm.errorPwd()).addClass("title-error");
                                } else {
                                    $(this).siblings("div").removeClass("title-error").removeAttr("title").removeAttr("style").addClass("title-succeed");
                                }
                            } else {
                                $(this).siblings("div").removeClass().removeAttr("title").removeAttr("style");
                            }
                        });
                    })();


                    $("#up-user").find("input").keydown(function (e) {
                        var curKey = e.which;
                        if (curKey == 13) {
                            _submit(mythis);
                            return false;
                        }
                    });
                }, function () { mythis.close(); });
            },
            ok: function () {
                _submit(mythis);
                return false;
            },
            cancel: function () { }
        });
    });

    //刪除用戶
    $("#manager input[name='all']").change(function () {
        var ckbox = $(this).attr("checked");
        $("#manager tbody :checkbox").attr("checked", ckbox);
    });
    $("#userSubmit #magDel").click(function () {
        var detAll = [];
        $("#manager tbody input").each(function () {
            if ($(this).attr("checked")) {
                detAll.push($(this).attr("name"));
            }
        });
        if (detAll.length == 0) {
            art.dialog({ content: "請勾選需要刪除的賬號！", ok: function () { } });
        } else {
            art.dialog({ content: "確認刪除賬號嗎？",
                ok: function () {
                    var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
                    _ajax({ type: 'post', url: referrer, data: { data: detAll.join(",")} }, function (m) {
                        if (m == "1") {
                            comm.scrollLoad({});
                            _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
                        } else {
                            art.dialog({ content: "-2511 錯誤代碼", ok: function () { } });
                        }
                    });
                }, cancel: function () {
                    $("#manager :checkbox").attr("checked", "");
                }
            });
        }
    });

    //快速修改賬號狀態
    $("#manager a[state='']").click(function () {
        var data = eval('(' + $(this).attr("data") + ')');
        var stateAry = ["", "", ""];
        stateAry[data.state] = "checked='checked'";
        var title = "修改“" + data.name + "”賬號狀態";
        var content = "<table class='middle-table' style='width:200px;' id='name-state'>";
        content += "<thead>";
        content += "<tr><th>停用</th><th>凍結</th><th>啟用</th></tr>";
        content += "</thead>";
        content += "<tbody>";
        content += "<tr>"
        content += "<td><label class='label-box' style='display:block;width:100%;'><input type='radio' name='state' " + stateAry[0] + " value='0'></label></td>";
        content += "<td><label class='label-box' style='display:block;width:100%;'><input type='radio' name='state' " + stateAry[1] + " value='1'></label></td>";
        content += "<td><label class='label-box' style='display:block;width:100%;'><input type='radio' name='state' " + stateAry[2] + " value='2'></label></td>";
        content += "</tbody>";
        content += "</table>";
        art.dialog({ title: title, content: content, padding: "10px 5px",
            ok: function () {
                var disable = $("#name-state :checked").val();
                var setName = data.value;
                if (disable != data.state) {
                    var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
                    referrer = comm.urlReplace({ url: referrer, paramName: "disable", val: disable, pad: true });
                    referrer = comm.urlReplace({ url: referrer, paramName: "setName", val: setName, pad: true });
                    _ajax({ type: 'get', url: referrer, data: null }, function (m) {
                        if (m == "1") {
                            comm.scrollLoad({});
                            _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                        } else {
                            art.dialog({ content: m, ok: function () { } });
                        }
                    });
                }
            },
            cancel: function () { }
        });
    });

    //登錄、修改日誌
    $("#manager span[fid='']").click(function () {
        var name = $(this).parents("td").attr("name");
        var url = "/Agent/JsonData/" + $(this).attr("ref") + ".aspx?t=" + comm.query("t", msg.referrer) + "&setName=" + name;
        var mythis;
        art.dialog({ padding: "10px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', url: url, data: null }, function (msg) {
                    mythis.title(msg.title);
                    mythis.content(comm.overflowDiv({ content: msg.table.join(""), width: 730, height: 320 }));

                }, function () { mythis.close(); });
            }, ok: function () { }
        });
    });

    //用戶查詢
    $("#userSubmit #seachName").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $("#userSubmit #search").click();
            return false;
        }
    });
    $("#userSubmit #search").click(function () {
        var setName = $("#userSubmit #seachName").val();
        if (comm.StringSign(setName)) {
            var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
            referrer = comm.urlReplace({ url: msg.referrer, paramName: "setName", val: setName, pad: true });
            comm.scrollLoad({});
            _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
        }
    });

}
function UserList(msg) {
    var setName = comm.query("setName", msg.referrer) || "";
    var magDelText = msg.magDel == 1 ? "<span class='text-btn-s' id='magDel'>刪除</span>" : "";
    $("#shell_top").append(_addselect("select-user"));
    $("#shell_top").append("<div class='userSubmit' id='userSubmit'>賬號:<input type='text' id='seachName' value='" + setName + "' autocomplete='off' maxlength='15' class='text-input sw90' /><span class='text-btn-s' id='search'>查詢</span><span class='text-btn-s' id='magAdd'>新增</span>" + magDelText + "</div>");
    $("#selectsAll").find("span").html(msg.text).attr("value", msg.value);
    $("#selects ul").html("<li><a index='0' href='javascript:void(0);'>停用</a></li><li><a index='1' href='javascript:void(0);'>凍結</a><li><a index='2' href='javascript:void(0);'>啟用</a></li></li>");

    var shaerName = msg.title.replace("管理", "");
    $("#navListBox a").removeClass("onBtn");
    $("#navListBox a").each(function () {
        if ($(this).html() == shaerName) {
            $(this).addClass("onBtn");
            return false;
        }
    });

    //新增用戶 art.dialog({ content: msg.result, ok: function () { } });
    $("#userSubmit #magAdd").click(function () {
        var mythis;// stop = false;
        var t = comm.query("t", msg.referrer);
        var queryId = comm.query("queryId", msg.referrer);
        art.dialog({ title: "新增" + shaerName, id: "addUser-id", padding: "5px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'get', dataType: 'text', url: msg.addUrl, data: { t: t, queryId: queryId} }, function (text) {
                    mythis.content(text);
                    addUserChang(t,queryId);
                    $("#add-user").find("input").keydown(function (e) {
                        var curKey = e.which;
                        if (curKey == 13) {
                            addUserSubmit({ t: t, queryId: queryId, mythis: mythis, referrer: msg.referrer, addUrl: msg.addUrl });
                            return false;
                        }
                    });
                }, function () { mythis.close(); });
            },
            ok: function () {
                addUserSubmit({ t: t, queryId: queryId, mythis: mythis, referrer: msg.referrer, addUrl: msg.addUrl });
                return false;

            },
            cancel: function () { }
        });
    });

    //修改用戶
    $("#userList span[up='']").click(function () {
        var name = $(this).parents("td").attr("name");
        var url = "/Agent/JsonData/" + $(this).attr("ref") + ".aspx?t=" + comm.query("t", msg.referrer) + "&setName=" + name;
        var mythis;
        var t = comm.query("t", msg.referrer);
        var queryId = comm.query("queryId", msg.referrer);
        art.dialog({ title: "修改" + shaerName, padding: "10px 5px", id: "upUser-id",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'get', dataType: 'text', url: url, data: null }, function (text) {
                    mythis.content(text);
                    upUserChang();
                    $("#up-user").find("input").keydown(function (e) {
                        var curKey = e.which;
                        if (curKey == 13) {
                            upUserSubmit({ t: t, queryId: queryId, mythis: mythis, referrer: msg.referrer });
                            return false;
                        }
                    });
                }, function () { mythis.close(); });
            },
            ok: function () {
                //確認修改
                upUserSubmit({ t: t, queryId: queryId, mythis: mythis, referrer: msg.referrer });
                return false;
            },
            cancel: function () { }
        });
    });

    //刪除用戶
    $("#userList input[name='all']").change(function () {
        var ckbox = $(this).attr("checked");
        $("#userList tbody :checkbox").attr("checked", ckbox);
    });
    $("#userSubmit #magDel").click(function () {
        var detAll = [];
        $("#userList tbody input").each(function () {
            if ($(this).attr("checked")) {
                detAll.push($(this).attr("name"));
            }
        });
        if (detAll.length == 0) {
            art.dialog({ content: "請勾選需要刪除的賬號！", ok: function () { } });
        } else {
            art.dialog({ content: "確認刪除賬號嗎？",
                ok: function () {
                    var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
                    _ajax({ type: 'post', url: referrer, data: { data: detAll.join(",")} }, function (m) {
                        if (m == "1") {
                            comm.scrollLoad({});
                            _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
                        } else {
                            art.dialog({ content: "-2511 錯誤代碼", ok: function () { } });
                        }
                    });
                }, cancel: function () {
                    $("#userList :checkbox").attr("checked", "");
                }
            });
        }
    });

    //快速修改賬號狀態
    $("#userList a[state='']").click(function () {
        var data = eval('(' + $(this).attr("data") + ')');
        var stateAry = ["", "", ""];
        stateAry[data.state] = "checked='checked'";
        var title = "修改“" + data.name + "”賬號狀態";
        var content = "<table class='middle-table' style='width:200px;' id='name-state'>";
        content += "<thead>";
        content += "<tr><th>停用</th><th>凍結</th><th>啟用</th></tr>";
        content += "</thead>";
        content += "<tbody>";
        content += "<tr>"
        content += "<td><label class='label-box' style='display:block;width:100%;'><input type='radio' name='state' " + stateAry[0] + " value='0'></label></td>";
        content += "<td><label class='label-box' style='display:block;width:100%;'><input type='radio' name='state' " + stateAry[1] + " value='1'></label></td>";
        content += "<td><label class='label-box' style='display:block;width:100%;'><input type='radio' name='state' " + stateAry[2] + " value='2'></label></td>";
        content += "</tbody>";
        content += "</table>";
        art.dialog({ title: title, content: content, padding: "10px 5px",
            ok: function () {
                var disable = $("#name-state :checked").val();
                var setName = data.value;
                if (disable != data.state) {
                    var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
                    referrer = comm.urlReplace({ url: referrer, paramName: "disable", val: disable, pad: true });
                    referrer = comm.urlReplace({ url: referrer, paramName: "setName", val: setName, pad: true });
                    _ajax({ type: 'get', url: referrer, data: null }, function (m) {
                        if (m == "1") {
                            comm.scrollLoad({});
                            _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                        } else {
                            art.dialog({ content: m, ok: function () { } });
                        }
                    });
                }
            },
            cancel: function () { }
        });
    });

    //用戶退水盤
    $("#userList span[rec='']").click(function () {
        var name = $(this).parents("td").attr("name");
        var defaultIndex = $("#gameDefault").attr("value");
        var url = "/Agent/JsonData/" + $(this).attr("ref") + ".aspx?t=" + comm.query("t", msg.referrer) + "&setName=" + name + "&defaultIndex=" + defaultIndex;
        comm.scrollLoad({});
        _ajax({ type: 'get', url: url, data: null }, dataJson, comm.rollBack);
        
        //保存前導頁的地址
        __backList.unshift(msg.referrer);
    });

    //登錄、修改日誌
    $("#userList span[fid='']").click(function () {
        var name = $(this).parents("td").attr("name");
        var url = "/Agent/JsonData/" + $(this).attr("ref") + ".aspx?t=" + comm.query("t", msg.referrer) + "&setName=" + name;
        var mythis;
        art.dialog({ padding: "10px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', url: url, data: null }, function (msg) {
                    mythis.title(msg.title);
                    mythis.content(comm.overflowDiv({ content: msg.table.join(""), width: 730, height: 320 }));

                }, function () { mythis.close(); });
            }, ok: function () { }
        });
    });

    //用戶查詢
    $("#userSubmit #seachName").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $("#userSubmit #search").click();
            return false;
        }
    });
    $("#userSubmit #search").click(function () {
        var setName = $("#userSubmit #seachName").val();
        if (comm.StringSign(setName)) {
            var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
            referrer = comm.urlReplace({ url: msg.referrer, paramName: "setName", val: setName, pad: true });
            comm.scrollLoad({});
            _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
        }
    });
    //查詢下級用戶
    $("#userList a[vname='search']").click(function () {
        var queryId = $(this).attr("ct");
        var searchName = $(this).attr("name");
        var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
        referrer = comm.urlReplace({ url: referrer, paramName: "setName", val: setName, pad: false });
        referrer = comm.urlReplace({ url: referrer, paramName: "queryId", val: queryId, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "searchName", val: searchName, pad: true });
        comm.scrollLoad({});
        _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
        
        //保存前導頁的地址
        __backList.unshift(msg.referrer);
    });
}

//退水设置
function upRebate(msg) {
    var obj = $("#rebatedata");
    var referrer = msg.referrer;
    obj.find("#content tbody input[a='']").attr("disabled", "disabled");
    obj.find("#content tbody input[b='']").attr("disabled", "disabled");
    obj.find("#content tbody input[c='']").attr("disabled", "disabled");

    //是否允許修改退水項
    if (msg.DetailsDay == "0") {
        obj.find("#content tbody input[a='']").removeAttr("disabled");
        obj.find("#content tbody input[b='']").removeAttr("disabled");
        obj.find("#content tbody input[c='']").removeAttr("disabled");

        //會員可設置退水盤
        for (var i = 0; i < msg.memberInt.length; i++) {
            obj.find("tbody input[" + msg.memberInt[i] + "='']").attr("disabled", "disabled");
        }
    }

    //退水数据切换
    obj.find("#kj input[type='radio']").change(function () {
        referrer = comm.urlReplace({ url: referrer, paramName: "autoGame", val: $(this).val(), pad: true });
        comm.scrollLoad({});
        _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
    });

    //提交参数
    obj.find("#content input[type='text']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            submitRebate();
            return false;
        }
    });
    obj.find("#submit").unbind("click").click(function () {
        submitRebate();
    });

    obj.find("#content input[number='']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        if (msg.parnInt == "1" && comm.NumberSign($(this).val())) {
            if (parseInt($(this).val()) > parseInt($(this).attr("maxvalue"))) {
                $(this).val($(this).attr("maxvalue"));
            } else if (parseInt($(this).val()) < parseInt($(this).attr("minvalue"))) {
                $(this).val($(this).attr("minvalue"));
            }
        }
    });

    obj.find("#content input[numbertodouble='']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        if (msg.parnInt == "1" && comm.DecimalSign($(this).val())) {
            if (parseFloat($(this).val()) > parseFloat($(this).attr("maxvalue"))) {
                $(this).val($(this).attr("maxvalue"));
            } else if (parseFloat($(this).val()) < parseFloat($(this).attr("minvalue"))) {
                $(this).val($(this).attr("minvalue"));
            }
        }
    });
    //單選玩法類型
    obj.find("tbody input[type='checkbox']").click(function () {
        var objtr = $(this).parent().parent("tr");
        if (objtr.attr("lock") == "") {
            objtr.removeAttr("lock").removeClass("qhs");
        } else {
            objtr.attr("lock", "").addClass("qhs");
        }
    });
    //全選玩法類型
    obj.find("#all").unbind("click").click(function () {
        obj.find("#content tbody tr").attr("lock", "").addClass("qhs");
        obj.find("#content tbody input[type='checkbox']").attr("checked", true);
    });
    //重置玩法類型
    obj.find("#reset").unbind("click").click(function () {
        obj.find("#content tbody tr[lock='']").removeAttr("lock").removeClass("qhs");
        obj.find("#content tbody td :checked").attr("checked", false);
    });
    //提示最高设置值
    obj.find("#content tbody tr input[type='text']").unbind("focus").focus(function () {
        if (parseInt(msg.parnInt) > 0) {
            comm.myTips({ obj: $(this), content: "設置範圍:" + $(this).attr("minvalue") + "~" + $(this).attr("maxvalue") });
        }
    });
    obj.find("#content tbody tr input[type='text']").unbind("blur").blur(function () {
        comm.removeTips();
    });
    //快捷设置参数
    obj.find("#gopart").unbind("click").click(function () {
        var _isValue = function ($this, value) {
            var disabled = $this.attr("disabled");
            var minvalue = parseFloat($this.attr("minvalue"));
            var maxvalue = parseFloat($this.attr("maxvalue"));
            if (!disabled) {
                if (parseInt(msg.parnInt) > 0) {
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
        };

        var val;
        obj.find("#kj :text").each(function (i) {
            val = $(this).val();
            if (val != "") {
                val = parseFloat(val);
                if (i === 0) {
                    obj.find("tr[lock=''] input[d='']").each(function () {
                        _isValue($(this), val);
                    });
                } else if (i === 1) {
                    obj.find("tr[lock=''] input[e='']").each(function () {
                        _isValue($(this), val);
                    });
                } else if (i === 2) {
                    obj.find("tr[lock=''] input[f='']").each(function () {
                        _isValue($(this), val);
                    });
                } else if (i === 3) {
                    obj.find("tr[lock=''] input[a='']").each(function () {
                        _isValue($(this), val);
                    });
                } else if (i === 4) {
                    obj.find("tr[lock=''] input[b='']").each(function () {
                        _isValue($(this), val);
                    });
                } else if (i === 5) {
                    obj.find("tr[lock=''] input[c='']").each(function () {
                        _isValue($(this), val);
                    });
                }
            }
        });
    });

    function submitRebate() {
        var _indexToString = function (index, ary) {
            var str;
            switch (index) {
                case 1: str = "hkData"; break;
                case 2: str = "klcData"; break;
                case 3: str = "sscData"; break;
                case 4: str = "pkData"; break;
                case 5: str = "ksData"; break;
                case 6: str = "klbData"; break;
                case 7: str = "ncData"; break;
                case 10: str = "gxData"; break;
                case 14: str = "pkjsData"; break;
                case 15: str = "sscjsData"; break;
            }
            return "\"" + str + "\":\"" + ary.join(",") + "\"";
        };
        var index, sort, a, b, c, d, e, f, ary1, ary2 = [];
        for (var i = 0; i < msg.defaultIndex.length; i++) {
            ary1 = [];
            index = msg.defaultIndex[i];
            obj.find("#content div[index='" + index + "'] tbody tr").each(function () {
                sort = $(this).attr("sort");
                d = $(this).find("input[d='']").val();
                e = $(this).find("input[e='']").val();
                f = $(this).find("input[f='']").val();
                a = $(this).find("input[a='']").val();
                b = $(this).find("input[b='']").val();
                c = $(this).find("input[c='']").val();
                if (sort && d && e && f && a && b && c)
                    ary1.push(sort + ":" + a + ":" + b + ":" + c + ":" + d + ":" + e + ":" + f);
            });
            if (ary1.length > 0)
                ary2.push(_indexToString(index, ary1));
        }
        comm.mask({});
        var data = eval('(' + "{" + ary2.join(",") + "}" + ')');
        _ajax({ type: 'post', dataType: 'text', url: referrer, data: data }, function (text) {
            comm.removeMask();
            if (text == "1") {
                art.dialog({ content: "保存成功。", ok: function () { },
                    beforeunload: function () {
                        //if (__backList.length > 0) { $("#shell_top #btn-back").click(); }
                    } 
                });
                
            } else {
                art.dialog({ content: text, ok: function () { } });
            }
        }, function () { comm.removeMask(); });
    }
}


function addUserSubmit(msg) {
    var data = addUserData() || false;
    var t = msg.t;
    var queryId = msg.queryId;
    var mythis = msg.mythis;
    if (data && data.length > 0) {
        mythis.close();
        var shareNames, setName;
        for (var i = 0; i < data.length; i++) {
            if (data[i].indexOf("shareName:") > -1) {
                shareNames = data[i].split(":")[1];
                break;
            }
        }
        //alert(shareNames); return false;
        art.dialog({ content: "正在寫入數據，請稍後...",
            initialize: function () {
                mythis = this;
                stop = false;
                _ajax({ type: 'post', dataType: 'text', url: msg.addUrl + "?t=" + t + "&queryId=" + queryId + "&shareName=" + shareNames, data: { data: data.join(",")} }, function (state) {
                    stop = true;
                    if (state == "1") {
                        //text = "賬號新增完成，請设置退水项。";
                        setName = state.split(":")[1];
                        mythis.close();
                        art.dialog({ content: "賬號新增成功。",
                            ok: function () {
                                //comm.scrollLoad({});
                                //_ajax({ type: 'get', url: "/Agent/JsonData/UserRebate.aspx", data: { t: t, queryId: queryId, setName: setName} }, dataJson, comm.rollBack);
                            },
                            /*cancel: function () {
                                //comm.scrollLoad({});
                                //_ajax({ type: 'get', url: "/Agent/JsonData/UserList.aspx", data: { t: t, queryId: queryId, state: 2} }, dataJson, comm.rollBack);
                            },*/
                            beforeunload: function () {
                                comm.scrollLoad({});
                                _ajax({ type: 'get', url: "/Agent/JsonData/UserList.aspx", data: { t: t, queryId: queryId, state: 2} }, dataJson, comm.rollBack);
                            }
                        });
                    } else {
                        mythis.content(state);
                    }
                }, function () { stop = true; mythis.close(); comm.rollBack });
            },
            beforeunload: function () { return stop; }
        });
    }
}
function addUserData() {
    var data = [];
    var obj = $("#add-user");
    obj.find(":text").each(function () {
        var reg = eval($(this).attr("reg"));
        var val = $(this).val();
        var name = $(this).attr("name");
        data.push(name + ":" + val);
        if (reg) {
            if (!reg.test(val)) {
                data = false;
                return false;
            }
        }
    });
    if (data != false) {
        var objPwd = obj.find(":password");
        reg = eval(objPwd.attr("reg"));
        val = objPwd.val();
        name = objPwd.attr("name");
        data.push(name + ":" + val);
        if (reg) {
            if (!reg.test(val)) {
                data = false;
                return false;
            }
        }
    }
    if (data != false) {
        data.push("shareName:" + obj.find("select[name='shareName']").val());
        obj.find(":radio").each(function () {
            if ($(this).attr("checked") && $(this).attr("name") != "StintID" && $(this).attr("name") != "Generalall" && $(this).attr("name") != "GeneralID") {
                data.push($(this).attr("name") + ":" + $(this).val());
            }
        });

        //总账报表
        if (obj.find("input[vname='ral-general']").attr("checked")) {
            obj.find("input[name='GeneralID']").each(function () {
                if ($(this).attr("checked"))
                    data.push($(this).attr("name") + ":" + $(this).val());
            });
        } else {
            data.push("GeneralID:0");
        }

    }
    if (obj.attr("disabled"))
        data = false;
    return data;
}
function addUserChang(t, queryId) {
    var obj = $("#add-user");
    var _url = "/Agent/JsonData/UserAdd.aspx";
    var data = eval('(' + obj.find("input[name='data']").val() + ')') || {};
    obj.find("span[name='shareCredits']").html(data.shareCredits);
    obj.find("span[name='shareTotal']").html(data.shareTotal);
    for (var i in data.shareNames) {
        obj.find("select[name='shareName']").append("<option value='" + data.shareNames[i] + "'>" + i + "</option>");
    }

    //選擇上級賬號
    obj.find("select[name='shareName']").change(function () {
        var _shareName = $(this).val();
        _ajax({ type: 'get', url: _url, data: { t: t, queryId: queryId, shareName: _shareName} }, function (msg) {
            data.shareCredits = msg.shareCredits;
            data.shareTotal = msg.shareTotal;
            data.shareModeSelection = msg.shareModeSelection;
            obj.find("span[name='shareCredits']").html(data.shareCredits);
            obj.find("span[name='shareTotal']").html(data.shareTotal);
            obj.find("#up-rmb").html("");
            obj.find("input[name='Credits']").val("");
            obj.find("input[name='Superior']").val("0");
            obj.find("input=[name='ModeSelection']").each(function () {
                if ($(this).val() == data.shareModeSelection) {
                    $(this).attr("checked", "checked");
                }
            });
        });
    });

    //選擇直屬級別
    obj.find("input[name='radioshareName']").click(function () {
        var chkbox = $(this).attr("checked");
        if (chkbox) {
            var radios = $(this).val();
            var level = obj.find("span[level='" + radios + "']").html();
            obj.find("span[name='shareRole']").html(level);
            _ajax({ type: 'get', url: _url, data: { t: t, queryId: queryId, radios: radios} }, function (msg) {
                obj.find("select[name='shareName'] option").remove();
                for (var i in msg) {
                    obj.find("select[name='shareName']").append("<option value='" + msg[i] + "'>" + i + "</option>");
                }
                obj.find("select[name='shareName']").change();
            });
        }
    });

    //是否開啟現金模式
    if (data.shareModeSelection == 1 && queryId == 5) {
        obj.find("input=[name='ModeSelection']").removeAttr("disabled");
    } else if (queryId == 6) {
        obj.find("input=[name='ModeSelection']").each(function () {
            if ($(this).val() == data.shareModeSelection) {
                $(this).attr("checked", "checked");
            }
        });
    }

    obj.find("input[number='']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        if ($(this).attr("name") === "Credits") {
            if (parseInt($(this).val()) > parseInt(data.shareCredits)) {
                $(this).val(data.shareCredits);
            }
            $("#up-rmb").html(comm.toRmb($(this).val()) || "");
        }
        if ($(this).attr("name") === "Superior") {
            if (parseInt($(this).val()) > parseInt(data.shareTotal)) {
                $(this).val(data.shareTotal);
            }
        }
    });

    obj.find("input[numbertodouble='']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    });

    obj.find(":text").change(function () {
        var reg = eval($(this).attr("reg"));
        var mesg = $(this).attr("mesg");
        var val = $(this).val();
        if (reg) {
            if (!reg.test(val)) {
                if (mesg)
                    $(this).siblings("div").removeClass("title-succeed").attr("title", mesg).addClass("title-error");
            } else {
                $(this).siblings("div").removeClass("title-error").removeAttr("title").addClass("title-succeed");
            }
        }
        if ($(this).attr("name") === "UserName" && reg.test(val)) {
            var _this = $(this);
            _ajax({ type: 'get', dataType: 'text', url: _url, data: { userName: val} }, function (text) {
                if (text != "0") {
                    var g = "賬號:" + val + " 已註冊使用，請更改其他字符串組合。";
                    _this.siblings("div").removeClass("title-succeed").attr("title", g).addClass("title-error");
                    //obj.attr("disabled", "disabled");
                } else {
                    //obj.removeAttr("disabled");
                }
            }, function () { /*obj.removeAttr("disabled");*/ });
        }
    });

    obj.find(":password").change(function () {
        var reg = eval($(this).attr("reg"));
        var val = $(this).val();
        if (!reg.test(val) || !comm.safety(val)) {
            $(this).siblings("div").removeClass("title-succeed").attr("title", comm.errorPwd()).addClass("title-error");
        } else {
            $(this).siblings("div").removeClass("title-error").removeAttr("title").addClass("title-succeed");
        }
    });

    obj.find("input[name='StintID']").click(function () {
        if ($(this).val() === "yes") {
            obj.find("input[name='Stint']").val("-1").addClass("hiden");
        } else {
            obj.find("input[name='Stint']").val("").removeClass("hiden").focus();
        }
    });

    obj.find("select[name='set_water']").change(function () {
        obj.find("input[name='water']").val($(this).val());
    });
}

function upUserChang() {
    var obj = $("#up-user");
    var _url = "/Agent/JsonData/UserAdd.aspx";
    var data = eval('(' + obj.find("input[name='data']").val() + ')') || {};

    //設置賬號
    obj.find("input[name='UserName']").attr("setName", data.setName);

    //可回收餘額提示
    var _count = parseInt(obj.find("input[name='Credits']").val()) - parseInt(data.MaxCredits);
    obj.find("#maxCredits").html(_count);

    //是否限占
    obj.find("input[name='StintID']").each(function () {
        if (data.parentStint == "-1") {
            if ($(this).val() == "yes") {
                $(this).attr("checked", "checked");
            }
        } else if ($(this).val() == "no") {
            $(this).attr("checked", "checked");
            obj.find("#Stint").removeClass("hiden").val(data.parentStint);
        }
    });

    //限占控件觸發
    obj.find("input[name='StintID']").click(function () {
        $(this).attr("checked", "checked");
        if ($(this).val() == "yes") {
            obj.find("#Stint").addClass("hiden").val("-1");
        } else if ($(this).val() == "no") {
            obj.find("#Stint").val("").removeClass("hiden").focus();
            if (data.parentStint != "-1")
                obj.find("#Stint").val(data.parentStint);
        }
    });

    obj.find("input[number='']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        /*if ($(this).attr("name") === "Credits") {
            if (parseInt($(this).val()) > parseInt(data.shareCredits)) {
                $(this).val(data.shareCredits);
            } else if (parseInt($(this).val()) < parseInt(data.MaxCredits)) {
                $(this).val(data.MaxCredits);
            }
        }*/
    });

    obj.find("input[number='']").blur(function () {
        if ($(this).attr("name") === "Superior") {
            //最高可設占成
            if (parseInt($(this).val()) > parseInt(data.StintOccupyMax)) {
                $(this).val(data.StintOccupyMax);
            }
        }
        if ($(this).attr("name") === "Stint") {
            //可回收占成
            if (parseInt($(this).val()) < parseInt(data.StintOccupyMin)) {
                $(this).val(data.StintOccupyMin);
            }
        }
    });

    obj.find("input[numbertodouble='']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    });

    obj.find(":text").change(function () {
        var reg = eval($(this).attr("reg"));
        var mesg = $(this).attr("mesg");
        var val = $(this).val();
        if (reg) {
            if (!reg.test(val)) {
                if (mesg)
                    $(this).siblings("div").removeClass("title-succeed").attr("title", mesg).addClass("title-error");
            } else {
                $(this).siblings("div").removeClass("title-error").removeAttr("title").addClass("title-succeed");
            }
        }
    });

    obj.find(":password").change(function () {
        var reg = eval($(this).attr("reg"));
        var val = $(this).val();
        if (val != "") {
            if (!reg.test(val) || !comm.safety(val)) {
                $(this).siblings("div").removeClass("title-succeed").attr("title", comm.errorPwd()).addClass("title-error");
            } else {
                $(this).siblings("div").removeClass("title-error").removeAttr("title").removeAttr("style").addClass("title-succeed");
            }
        } else {
            $(this).siblings("div").removeClass().removeAttr("title").removeAttr("style").addClass("hiden");
        }
    });
}
function upUserData() {
    var data = [];
    var obj = $("#up-user");
    obj.find(":text").each(function () {
        var reg = eval($(this).attr("reg"));
        var val = $(this).val();
        var name = $(this).attr("name");
        if (name != "UserName") {
            data.push(name + ":" + val);
            if (reg) {
                if (!reg.test(val)) {
                    data = false;
                    return false;
                }
            }
        } else {
            data.push("setName:" + $(this).attr("setName"));
        }
    });
    if (data != false) {
        var objPwd = obj.find(":password");
        reg = eval(objPwd.attr("reg"));
        val = objPwd.val();
        if (val != "") {
            name = objPwd.attr("name");
            data.push(name + ":" + val);
            if (reg) {
                if (!reg.test(val)) {
                    data = false;
                    return false;
                }
            } 
        }
    }
    if (data != false) {
        obj.find(":radio").each(function () {
            if ($(this).attr("checked") && $(this).attr("name") != "StintID" && $(this).attr("name") != "Generalall" && $(this).attr("name") != "GeneralID") {
                data.push($(this).attr("name") + ":" + $(this).val());
            }
        });

        //总账报表
        if (obj.find("input[vname='ral-general']").attr("checked")) {
            obj.find("input[name='GeneralID']").each(function () {
                if ($(this).attr("checked"))
                    data.push($(this).attr("name") + ":" + $(this).val());
            });
        } else {
            data.push("GeneralID:0");
        }

    }
    if (obj.attr("disabled"))
        data = false;
    return data;
}
function upUserSubmit(msg) {
    var data = upUserData() || false;
    var t = msg.t;
    var queryId = msg.queryId;
    var setName;
    var mythis = msg.mythis;
    for (var i = 0; i < data.length; i++) {
        if (data[i].indexOf("setName:") > -1) {
            setName = data[i].split(":")[1];
            break;
        }
    }
    if (data && data.length > 0) {
        var evsthis;
        art.dialog({ content: "正在寫入數據，請稍後...",
            initialize: function () {
                evsthis = this;
                stop = false;
                _ajax({ type: 'post', dataType: 'text', url: "/Agent/JsonData/UserUpdate.aspx?t=" + t + "&setName=" + setName, data: { data: data.join(",")} }, function (state) {
                    stop = true;
                    evsthis.close();
                    if (state.indexOf("newsuccess") > -1) {
                        mythis.close();
                        art.dialog({ content: "賬號修改成功。",
                            ok: function () {

                            },
                            beforeunload: function () {
                                var referrer = comm.urlReplace({ url: msg.referrer, paramName: "page", pad: false });
                                comm.scrollLoad({});
                                _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
                            }
                        });
                    } else {
                        art.dialog({ content: state, ok: function () { } });
                    }
                }, function () { stop = true; mythis.close(); });
            },
            beforeunload: function () { return stop; }
        });
    }
}
//------------- 用戶管理end -----------------

function FromMesgSubmit(msg) {
    $("#shell_top").append(msg.selectsAll);
    
    //绑定默认选中值=彩种
    var gameIndex = comm.query("gameIndex", msg.pageControl.referrer);
    if (gameIndex) {
        $("#selectsAll select[name='gameIndex']").val(gameIndex);
    }
    //绑定默认选中值=状态
    var settlement = comm.query("settlement", msg.pageControl.referrer);
    if (settlement) {
        $("#selectsAll select[name='settlement']").val(settlement);
    }
    //绑定默认选中值=日期
    var beforeDate = comm.query("beforeDate", msg.pageControl.referrer);
    if (beforeDate) {
        $("#selectsAll select[name='beforeDate']").val(beforeDate);
    }
    //绑定默认选中值=期数
    var timesNum = comm.query("timesNum", msg.pageControl.referrer);
    if (timesNum) {
        $("#selectsAll select[name='timesNum']").val(timesNum);
    }
    //select选中获取数据
    $("#selectsAll select").change(function () {
        fromMesgAction();
    });
    //刷新数据
    $("#selectsAll a[name='refresh']").unbind("click").click(function () {
        fromMesgAction();
    });
    $("#selectsAll a[name='search']").unbind("click").click(function () {
        var searchname = $("#selectsAll input[name='searchname']").val();
        if (!comm.StringSign(searchname)) {
            art.dialog({ content: "請“填寫”有效的賬號！", ok: function () { } });
        } else {
            fromMesgAction();
        }
    });
    $("#selectsAll input[name='searchname']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            fromMesgAction();
            return false;
        }
    });
    //查看连码明细
    $("#fromMesg tbody td span.cursor").unbind("click").click(function () {
        var beforeDate = $("#selectsAll select[name='beforeDate']").val();

    });
    //取消、修改、删除操作
    $("#fromMesg tbody td a").unbind("click").click(function () {
        var data_auto = $(this).attr("data-auto");
        var data_id = $(this).attr("data-id");
        var data_str = $(this).html();
        var content = "註單號#" + data_id + " 您確定 “" + data_str + "” 嗎？";
        art.dialog({ content: content,
            ok: function () {
                dataAuto({ id: data_id, auto: data_auto });
                this.close();
            },
            cancel: function () { }
        });
        function dataAuto(data) {
            _ajax({ type: 'post', dataType: 'text', url: msg.pageControl.referrer, data: data }, function (text) {
                if (data_auto == "1" || data_auto == "3") {
                    if (text == "true") {
                        comm.scrollLoad({});
                        _ajax({ type: 'get', url: msg.pageControl.referrer, data: null }, dataJson, comm.rollBack);
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                } else {
                    art.dialog({ content: text, padding: "5px,10px",
                        ok: function () { },
                        cancel: function () { }
                    });
                }
            });
        }
    });

    function fromMesgAction() {
        var gameIndex = $("#selectsAll select[name='gameIndex']").val();
        var settlement = $("#selectsAll select[name='settlement']").val();
        var beforeDate = $("#selectsAll select[name='beforeDate']").val();
        var timesNum = $("#selectsAll select[name='timesNum']").val();
        var searchname = $("#selectsAll input[name='searchname']").val();
        var referrer = comm.urlReplace({ url: msg.pageControl.referrer, paramName: "page", pad: false });
        referrer = comm.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "settlement", val: settlement, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "beforeDate", val: beforeDate, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "timesNum", val: timesNum, pad: true });
        if (comm.StringSign(searchname))
            referrer = comm.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
        comm.scrollLoad({});
        _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
    }
}