function DatnmSubmit(msg) {
    var obj = $("#datnm");
    var submit = true;
    var stop = false;
    obj.find("#bakOdds").click(function () {
        var mythis;
        art.dialog({ content: "正在寫入數據，請稍後...",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'get', dataType: 'text', url: msg.referrer, data: {bakodds:1} }, function (text) {
                    stop = true;
                    mythis.close();
                    if (text == "1") {
                        art.dialog({ content: "保存成功。", ok: function () { } });
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                }, function () { mythis.close(); });
            },
            beforeunload: function () { return stop; }
        });
    });
    obj.keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        obj.find("#jiben input[type='text']").each(function () {
            if ($(this).val() == "") {
                art.dialog({ content: "請填寫有效參數", ok: function () { } });
                submit = false;
                return false;
            }
        });
        if (submit) {
            var dataAry = [], data = [], ipset = [];
            //dataAry.push("\"WebTitle\":\"" + obj.find("input[name='WebTitle']").val() + "\"");
            //dataAry.push("\"WebCode\":\"" + obj.find("input[name='WebCode']").val() + "\"");
            dataAry.push("\"MaxOnline\":\"" + obj.find("input[name='MaxOnline']").val() + "\"");
            dataAry.push("\"WebUID\":\"" + obj.find("select[name='WebUID']").val() + "\"");
            obj.find("#quanx :radio").each(function () {
                if ($(this).attr("checked"))
                    data.push($(this).attr("name") + ":" + $(this).val());
            });
            dataAry.push("\"data\":\"" + data.join(",") + "\"");
            for (var i = 1; i <= 8; i++) {
                ipset.push(obj.find("#ipset input[name='IP_" + i + "']").val() + "|" + obj.find("#ipset input[name='IP_" + i + "_S']:checked").val());
            }

            dataAry.push("\"ipset\":\"" + ipset.join(",") + "\"");
            var myData = eval('(' + "{" + dataAry + "}" + ')');
            var mythis, stop = false;
            art.dialog({ content: "正在寫入數據，請稍後...",
                initialize: function () {
                    mythis = this;
                    _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: myData }, function (text) {
                        stop = true;
                        mythis.close();
                        if (text == "1") {
                            art.dialog({ content: "保存成功。", ok: function () { } });
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    }, function () { stop = true; mythis.close(); });
                },
                beforeunload: function () { return stop; }
            });
        }
    });
}

function GlobalrSubmit(msg) {
    var obj = $("#globalr");
    obj.find("input[number='']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
    obj.find("#all1").click(function () {
        obj.find("#all input[value='0']").attr("checked", "checked");
    });
    obj.find("#all2").click(function () {
        obj.find("#all input[value='1']").attr("checked", "checked");
    });
    var dataAry, ary;
    obj.keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        dataAry = [];

        dataAry.push("\"IsSuperior\":" + "\"" + obj.find("input[name='IsSuperior']:checked").val() + "\"");

        dataAry.push("\"PageType\":" + "\"" + obj.find("input[name='PageType']:checked").val() + "\"");
        dataAry.push("\"IsAutoShipments\":" + "\"" + obj.find("input[name='IsAutoShipments']:checked").val() + "\"");
        dataAry.push("\"detailsBak\":" + "\"" + obj.find("input[name='detailsBak']:checked").val() + "\"");
        dataAry.push("\"clindex\":" + "\"" + obj.find("select[name='clindex']").val() + "\"");
        dataAry.push("\"maxPayout\":" + "\"" + obj.find("input[name='maxPayout']").val() + "\"");
        dataAry.push("\"HeXiao\":" + "\"" + obj.find("input[name='HeXiao']").val() + "\"");
        dataAry.push("\"BuZhong\":" + "\"" + obj.find("input[name='BuZhong']").val() + "\"");

        dataAry.push("\"WebTitle\":" + "\"" + obj.find("input[name='WebTitle']").val() + "\"");
        var WebCode = obj.find("input[name='WebCode']").val();
        if (!comm.NumberSign(obj.find("input[name='WebCode']").val()) || WebCode.length < 4 || WebCode.length > 6) {
            art.dialog({ content: "導航驗證碼为4-6位数字组合。", ok: function () { } });
            return false;
        }
        dataAry.push("\"WebCode\":" + "\"" + WebCode + "\"");

        obj.find(".middle-table tbody").each(function () {
            if ($(this).attr("gameIndex")) {
                ary = [];
                $(this).find("input[type='radio']:checked").each(function () {
                    ary.push($(this).val());
                });
                dataAry.push("\"" + $(this).attr("gameIndex") + "\":\"" + ary.join(",") + "\"");
            }
        });
        var myData = eval('({' + dataAry.join(",") + '})');
        var mythis;
        art.dialog({ content: "正在寫入數據，請稍後...",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: myData }, function (text) {
                    stop = true;
                    mythis.close();
                    if (text == "1") {
                        art.dialog({ content: "保存成功。", ok: function () { } });
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                }, function () { stop = true; mythis.close(); });
            },
            beforeunload: function () { return stop; }
        });
    });
}

function OpeningSubmit(msg) {
    var obj = $("#opening");
    obj.find("input[type='text']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        var data = [], submit = true;
        obj.find("input[type='text']").each(function () {
            data.push("\"" + $(this).attr("name") + "\":\"" + $(this).val() + "\"");
        });
        if (submit) {
            var myData = eval('({' + data.join(",") + '})');
            var mythis;
            art.dialog({ content: "正在寫入數據，請稍後...",
                initialize: function () {
                    mythis = this;
                    _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: myData }, function (text) {
                        stop = true;
                        mythis.close();
                        if (text == "1") {
                            art.dialog({ content: "保存成功。",
                                ok: function () { },
                                beforeunload: function () {
                                    comm.scrollLoad({});
                                    _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                                }
                            });
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    }, function () { stop = true; mythis.close(); });
                }
            });
        }
    });
    obj.find("#list td a").click(function () {
        var name = $(this).attr("name");
        var number = $(this).attr("number");
        if (name === "up") {
            var data = eval('(' + $(this).attr("data") + ')');
            obj.find("input[name='number']").val(data[0]);
            obj.find("input[name='stratDate']").val(data[1]);
            obj.find("input[name='stratTime']").val(data[2]);
            obj.find("input[name='endTime']").val(data[3]);
            obj.find("input[name='trayTeMaNo']").val(data[4]);
            obj.find("#hk-set input[type='text']").css({ "font-weight": "bold" });
            setTimeout(function () { obj.find("#hk-set input[type='text']").removeAttr("style") }, 1000);
        } else {
            var content = "確認" + $(this).html() + "嗎？";
            var mythis;
            art.dialog({ content: content,
                ok: function () {
                    _ajax({ type: 'get', dataType: 'text', url: msg.referrer, data: { id: name, number: number} }, function () {
                        comm.scrollLoad({});
                        _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                    });
                },
                cancel: function () { }
            });
        }
    });
}

function OnlineSubmit(msg) {
    var obj = $("#online-id");
    obj.find("td.cursor").click(function () {
        var id = $(this).attr("vid");
        art.dialog({ content: "確定將用戶登出系統嗎？",
            ok: function () {
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { id: id} }, function () {
                    comm.scrollLoad({});
                    _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                });
            }, cancel: function () {
            }
        });
    });
}
function OnlineDetails(obj) {
    var t = __info.autoTid;
    var userName = $(obj).attr("data-name");
    var fid = $(obj).attr("data-fid");
    var money = parseFloat($(obj).find("span").html());
    var mythis;
    if (money && money != 0) {
        art.dialog({ title: "賬單明細", padding: "5px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'get', dataType: 'text', url: '/Agent/JsonData/DetailsDayLm.aspx', data: { t: t, myOnline: 1, userName: userName, fid: fid} }, function (text) {
                    mythis.content(comm.overflowDiv({ content: text, width: 580, height: 350 }));
                    actionPage();
                }, function () { mythis.close(); });
            },
            ok: function () { }
        });
        function actionPage() {
            var obj = $("#pager");
            obj.find("li").click(function () {
                var currentPage = parseInt(obj.find("#current_page").val());
                var totalPage = parseInt(obj.find("#total_page").html());
                var page = comm.searchPage($(this), currentPage, totalPage);
                if (page) {
                    _ajax({ type: 'get', dataType: 'text', url: '/Agent/JsonData/DetailsDayLm.aspx', data: { t: t, myOnline: 1, userName: userName, fid: fid, page: page} }, function (text) {
                        mythis.content(comm.overflowDiv({ content: text, width: 580, height: 350 }));
                        actionPage();
                    }, function () { mythis.close(); });
                }
            });
        }
    }
}
function myOnlieLevel(level) {
    var referrer = $("#totalPage").attr("referrer");
    referrer = comm.urlReplace({ url: referrer, paramName: "page", pad: false });
    referrer = comm.urlReplace({ url: referrer, paramName: "level", val: level, pad: true });
    if (__request) { __request.abort(); }
    comm.scrollLoad({});
    _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
}

function NewsInfoSubmit(msg) {
    var obj = $("#news-info");
    obj.find("#submit").click(function () {
        var type = $(this).attr("types") || "";
        var newsContent = obj.find("textarea[name='newsContent']").val();
        var visibleId = obj.find("select[name='visibleId']").val();
        if (newsContent == "") {
            art.dialog({ content: "請填寫公告內容。", ok: function () { } });
        } else {
            art.dialog({ content: "確定保存嗎？",
                ok: function () {
                    _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { type: type, newsContent: newsContent, visibleId: visibleId} }, function (text) {
                        if (text == "1") {
                            comm.scrollLoad({});
                            _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    });
                },
                cancel: function () { }
            });
        }
    });
    obj.find("tbody a[up='']").click(function () {
        var id = $(this).attr("name");
        var visibleId = $(this).attr("visibleId");
        var content = obj.find("td[content='" + id + "']").html();
        obj.find("#submit").attr("types", id);
        obj.find("textarea[name='newsContent']").val(content);
        obj.find("select[name='visibleId']").val(visibleId);
    });
    obj.find("tbody a[del='']").click(function () {
        var vname = $(this).attr("name");
        art.dialog({ content: "確定刪除公告嗎？",
            ok: function () {
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { vname: vname} }, function (text) {
                    if (text == "1") {
                        comm.scrollLoad({});
                        _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                });
            },
            cancel: function () { }
        });
    });
}

function AutoOddsSubmit(msg) {
    var obj = $("#auto-odds");
    //賠率排列
    for (var i in msg.mydata) {
        obj.find("tbody tr[sort='" + i + "'] input[type='text']").each(function (n) {
            $(this).val(msg.mydata[i][n]);
        });
        obj.find("tbody tr[sort='" + i + "'] select").each(function () {
            $(this).val(msg.mydata[i][3]);
        });
    }
    if (msg.DetailsDay == "1") {
        obj.find("input").attr("disabled", "disabled");
        obj.find("select").attr("disabled", "disabled");
    } else {
        obj.find("#all1").click(function () {
            obj.find("select").val("0");
        });
        obj.find("#all2").click(function () {
            obj.find("select").val("1");
        });
        obj.find("input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });
        obj.keydown(function (e) {
            var curKey = e.which;
            if (curKey == 13) {
                obj.find("#submit").click();
                return false;
            }
        });
        obj.find("#submit").click(function () {
            var data = [], ary, sort, submit = true, lock = false;
            obj.find("tbody tr").each(function () {
                sort = $(this).attr("sort");
                ary = [];
                $(this).find("input[type='text']").each(function () {
                    if (!comm.DecimalSign($(this).val())) {
                        art.dialog({ content: "請填寫有效參數值。", ok: function () { } });
                        submit = false;

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
                art.dialog({ content: "两面联动同路号码跳水比例范围为大于等于0小于等于100的整数", ok: function () { } });
                return false;
            }

            var mydata = ["\"data\":\"" + data.join("|") + "\""];
            mydata.push("\"TongLuOdds\":\"" + TongLuOdds + "\"");
            mydata = eval('({' + mydata.join(",") + '})');
            if (submit) {
                var mythis;
                art.dialog({ content: "正在寫入數據，請稍後...",
                    initialize: function () {
                        mythis = this;
                        _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: mydata }, function (text) {
                            lock = true;
                            mythis.close();
                            if (text == "1") {
                                art.dialog({ content: "保存成功。", ok: function () { } });
                            } else {
                                art.dialog({ content: text, ok: function () { } });
                            }
                        });
                    },
                    beforeunload: function () {
                        return lock;
                    }
                });
            }
        });
    }
}

function LmAutoOddsSubmit(msg) {
    var obj = $("#lmAuto-odds");
    obj.find("input[name='TongLuOdds']").val(msg.TongLuOdds);
    for (var i in msg.oddsData) {
        obj.find("input[name='A_" + i + "']").val(msg.oddsData[i][0]);
        obj.find("input[name='B_" + i + "']").val(msg.oddsData[i][1]);
    }
    obj.find("tbody input[type='text']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    });

    obj.find("input[type='text']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        var a, b, dataOdds = [];
        var tongLuOdds = obj.find("input[name='TongLuOdds']").val();
        if (!comm.NumberSign(tongLuOdds) || parseInt(tongLuOdds) < 0 || parseInt(tongLuOdds) > 100) {
            art.dialog({ content: "同路“号码”随大路降赔率比例：0-100之间", ok: function () { } });
            return false;
        }
        for (var i = 1; i <= 25; i++) {
            a = obj.find("input[name='A_" + i + "']").val();
            b = obj.find("input[name='B_" + i + "']").val();
            if (parseFloat(a) < 0 || parseFloat(a) > 1 || parseFloat(b) < 0 || parseFloat(b) > 1) {
                art.dialog({ content: "输入数字大于等于0~小于1，允许四位小数", ok: function () { } });
                return false;
            } else {
                dataOdds.push(i + ":" + a + ":" + b);
            }
        }

        art.dialog({ content: "確定保存嗎？",
            ok: function () {
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { tongLuOdds: tongLuOdds, dataOdds: dataOdds.join(",")} }, function (text) {
                    if (text == "1") {
                        art.dialog({ content: "保存成功。", ok: function () { } });
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                });
            },
            cancel: function () { }
        });
    });
}

function SetOddsSubmit(msg) {
    var obj = $("#set-Odds");
    obj.find("tbody input[type='text']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    });
    //賠率排列
    for (var i in msg.mydata) {
        obj.find("tbody tr[sort='" + i + "'] input[type='text']").each(function (n) {
            $(this).val(msg.mydata[i][n]);
        });
    }
    obj.find("td input[type='checkbox']").change(function () {
        if ($(this).attr("checked")) {
            $(this).parent().parent("tr").addClass("bc");
        } else {
            $(this).parent().parent("tr").removeClass("bc");
        }
    });
    obj.find("#all").click(function () {
        obj.find("td tbody input[type='checkbox']").attr("checked", "checked");
        obj.find("tbody tr").addClass("bc");
    });
    obj.find("#reset").click(function () {
        obj.find("tr.bc").removeClass("bc");
        obj.find("td input[type='checkbox']").attr("checked","");
    });

    //快捷設置賠率
    obj.find("#od-set .odds-kj span").click(function () {
        var value = parseFloat($(this).html());
        var od_a = obj.find("input[name='od-a']").attr("checked");
        var od_b = obj.find("input[name='od-b']").attr("checked");
        var od_c = obj.find("input[name='od-c']").attr("checked");
        var od_max = obj.find("input[name='od-max']").attr("checked");
        var dow;
        obj.find("tbody tr.bc").each(function () {
            $(this).find("input[type='text']").each(function (i) {
                dow = value + parseFloat($(this).val());
                if (i == 0) {
                    if (od_a && dow >= 0) {
                        $(this).val(comm.forDight(dow, 4));
                    } else if (od_a) {
                        $(this).val("0");
                    }
                } else if (i == 1) {
                    if (od_b && dow >= 0) {
                        $(this).val(comm.forDight(dow, 4));
                    } else if (od_b) {
                        $(this).val("0");
                    }
                } else if (i == 2) {
                    if (od_c && dow >= 0) {
                        $(this).val(comm.forDight(dow, 4));
                    } else if (od_c) {
                        $(this).val("0");
                    }
                } else if (i == 3) {
                    if (od_max && dow >= 0) {
                        $(this).val(comm.forDight(dow, 4));
                    } else if (od_max) {
                        $(this).val("0");
                    }
                }
            });
        });
    });
    obj.find("tbody input[type='text']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        var data = [], ary, sort, submit = true, lock = false;
        obj.find("tbody tr").each(function () {
            sort = $(this).attr("sort");
            ary = [];
            $(this).find("input[type='text']").each(function () {
                if (!comm.DecimalSign($(this).val())) {
                    art.dialog({ content: "請填寫有效參數值。", ok: function () { } });
                    submit = false;

                    return false;
                } else {
                    ary.push($(this).val());
                }
            });
            data.push(sort + ":" + ary.join(","));
        });
        if (submit) {
            var mythis;
            art.dialog({ content: "正在寫入數據，請稍後...",
                initialize: function () {
                    mythis = this;
                    _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { data: data.join("|")} }, function (text) {
                        lock = true;
                        mythis.close();
                        if (text == "1") {
                            art.dialog({ content: "保存成功。", ok: function () { } });
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    });
                },
                beforeunload: function () {
                    return lock;
                }
            });
        }
    });
}

function MsgLotterySubmit(msg) {
    var obj = $("#msg-lottery");
    obj.find("tbody input").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        var mydata = [], ary = [], index, time,time2, closer, defaultr;
        var maintain = obj.find("input[name='maintain']").val();
        var minute = obj.find("input[name='minute']:checked").val();
        var animals = obj.find("input[name='animals']:checked").val();
        mydata.push("\"maintain\":\"" + maintain + "\"");
        mydata.push("\"minute\":\"" + minute + "\"");
        mydata.push("\"animals\":\"" + animals + "\"");
        obj.find("tbody tr").each(function () {
            if ($(this).attr("GameIndex")) {
                index = $(this).attr("GameIndex");
                time = $(this).find("input[name='GameStartTime']").val();
                time2 = $(this).find("input[name='GameEndTime']").val();
                closer = $(this).find("input[name='GameClose-" + index + "']:checked").val();
                defaultr = $(this).find("input[name='GameDefault']:checked").val() || 0;
                ary.push(index + "," + time + "," + closer + "," + defaultr + "," + time2);
            }
        });
        mydata.push("\"gameAll\":\"" + ary.join("|") + "\"");
        mydata = eval('({' + mydata + '})');
        var mythis;
        art.dialog({ content: "正在寫入數據，請稍後...",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: mydata }, function (text) {
                    lock = true;
                    mythis.close();
                    if (text == "1") {
                        art.dialog({ content: "保存成功。", ok: function () { } });
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                });
            },
            beforeunload: function () {
                return lock;
            }
        });
    });

}

function LotterySubmit(msg) {
    var obj = $("#lottery");
    //讀取
    obj.find("tbody a[name='ext']").click(function () {
        var opNum = $(this).attr("number");
        _ajax({ type: 'get', dataType: 'text', url: msg.referrer, data: { opNum: opNum} }, function () {
            comm.scrollLoad({});
            _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
        });
    });
    //修改
    obj.find("tbody a[name='up']").click(function () {
        var id = $(this).attr("data");
        obj.find("input[name='opCount']").val("0");
        obj.find("tbody #" + id + " td").each(function (i) {
            if (i == 1) {
                obj.find("input[name='opNum']").val($(this).html());
            } else if (i == 2) {
                obj.find("input[name='opDate']").val($(this).html());
            } else if (i == 3) {
                obj.find("input[name='opTime']").val($(this).html());
            }
        });

    });
    obj.find("tbody input[type='text']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        var mydata = [];
        var opNum = obj.find("input[name='opNum']").val();
        var opDate = obj.find("input[name='opDate']").val() + " " + obj.find("input[name='opTime']").val();
        var opCount = obj.find("input[name='opCount']").val();
        if (opNum == "") {
            art.dialog({ content: "請填寫有效參數。", ok: function () { } });
            return;
        } else {
            mydata.push("\"opNum\":\"" + opNum + "\"");
            mydata.push("\"opDate\":\"" + opDate + "\"");
            mydata.push("\"opCount\":\"" + opCount + "\"");
            mydata = eval('({' + mydata + '})');
            var mythis;
            art.dialog({ content: "正在寫入數據，請稍後...",
                initialize: function () {
                    mythis = this;
                    _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: mydata }, function (text) {
                        lock = true;
                        mythis.close();
                        if (text == "1") {
                            art.dialog({ content: "保存成功。", ok: function () { } ,
                            beforeunload: function () {
                                comm.scrollLoad({});
                                _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                            }
                            });
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    });
                },
                beforeunload: function () {
                    return lock;
                }
            });
        }
    });
}

function OpenNumSubmit(msg) {
    var obj = $("#open-num");
    obj.find("tbody a").click(function () {
        var name = $(this).attr("name");
        if (name == "acc") {
            var number = $(this).attr("number");
            art.dialog({ content: "確定結算嗎？", ok: function () {
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { id: "settlement", opNum: number} }, function (text) {
                    art.dialog({ content: text, ok: function () { } });
                });
            }, cancel: function () { }
            });
        } else if (name == "up") {
            var number = $(this).attr("number");
            var time = $(this).attr("time");
            var numAry = $(this).attr("numAry").split(",");
            obj.find("#submit").attr("vname", "yes");
            obj.find("input[name='opNum']").val(number);
            obj.find("input[name='opDate']").val(time);
            obj.find("input[num='']").each(function (i) {
                $(this).val(numAry[i]);
            });
        } else if (name == "del") {
            var id = $(this).attr("vname");
            art.dialog({ content: "確定刪除嗎？", ok: function () {
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: { id: id} }, function () {
                    comm.scrollLoad({});
                    _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                });
            }, cancel: function () { }
            });
        }
    });
    obj.find("tbody input[type='text']").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            obj.find("#submit").click();
            return false;
        }
    });
    obj.find("#submit").click(function () {
        var mydata = [], bal = [];
        if ($(this).attr("vname"))
            mydata.push("\"id\":\"" + $(this).attr("vname") + "\"");
        mydata.push("\"opNum\":\"" + obj.find("input[name='opNum']").val() + "\"");
        mydata.push("\"opDate\":\"" + obj.find("input[name='opDate']").val() + "\"");
        obj.find("input[num='']").each(function () {
            bal.push($(this).val());
        });
        mydata.push("\"opBallAry\":\"" + bal.join(",") + "\"");
        mydata = eval('({' + mydata + '})');
        var mythis;
        art.dialog({ content: "正在寫入數據，請稍後...",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', dataType: 'text', url: msg.referrer, data: mydata }, function (text) {
                    lock = true;
                    mythis.close();
                    if (text == "1") {
                        art.dialog({ content: "保存成功。", ok: function () { },
                            beforeunload: function () {
                                comm.scrollLoad({});
                                _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                            }
                        });
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                }, function () {
                    lock = true;
                    mythis.close();
                });
            },
            beforeunload: function () {
                return lock;
            }
        });
    });
}

function ReportFormSubmit(msg) {
    var obj = $("#report-form");
    obj.find("input[type='text']").datepicker();
    obj.find("span[fin='']").click(function () {
        obj.find("input[name='beforeDate']").val($(this).attr("beforeDate"));
        obj.find("input[name='laterDate']").val($(this).attr("laterDate"));
    });
    obj.find("select[name='detailsType']").change(function () {
        var detailsType = $(this).val();
        _ajax({ type: 'post', url: msg.referrer, data: { detailsType: detailsType} }, function (m) {
            obj.find("select[name='timesNum'] option").remove();
            obj.find("select[name='timesNum']").append("<option value='-1'>全部</option>");
            for (var i = 0; i < m.length; i++) {
                obj.find("select[name='timesNum']").append("<option value='" + m[i] + "'>" + m[i] + "期</option>");
            }
        });
    });
    obj.find("#submit").click(function () {
        var detailsType = obj.find("select[name='detailsType']").val();
        var beforeDate = obj.find("input[name='beforeDate']").val();
        var laterDate = obj.find("input[name='laterDate']").val();
        var timesNum = obj.find("select[name='timesNum']").val();
        var type = obj.find("input[name='type']:checked").val();
        var settlement = obj.find("input[name='settlement']:checked").val();
        var settGeneralID = obj.find("input[name='GeneralID']:checked").val() || 0;
        if (detailsType != "" && beforeDate != "") {
            var hrefAry = [];
            hrefAry.push("t=" + comm.query("t", msg.referrer));
            hrefAry.push("detailsType=" + detailsType);
            hrefAry.push("beforeDate=" + beforeDate);
            hrefAry.push("laterDate=" + laterDate);
            hrefAry.push("timesNum=" + timesNum);
            hrefAry.push("type=" + type);
            hrefAry.push("settlement=" + settlement);
            hrefAry.push("settGeneralID=" + settGeneralID);
            var referrer = "JsonData/ReportList.aspx?" + hrefAry.join("&");
            $(this).hide();
            obj.find("#load").show();
            comm.scrollLoad({});
            _ajax({ type: 'get', url: referrer, data: null }, dataJson, function () {
                obj.find("#submit").show();
                obj.find("#load").hide();
                comm.rollBack();
            });
        }
    });
}

function ReportListSubmit(msg) {
    $(".shell-title-icon").css("width", "50%");
    var obj = $("#report-list");
    obj.find("tbody a").click(function () {
        var comp = $(this).attr("comp");
        var name = encodeURIComponent($(this).attr("name"));
        var vtype = $(this).attr("vtype");
        var url = $(this).attr("url");
        var referrer;
        if (comp) {
            if (comp != 6) {
                referrer = comm.urlReplace({ url: msg.referrer, paramName: "setUserName", val: name, pad: true });
            } else {
                referrer = "JsonData/ReportData.aspx" + msg.nextUrl + "&setUserName=" + name + "&vtype=" + vtype + "&md=0";
            }
        } else if (url) {
            referrer = "JsonData/" + url;
        }
        __backList.unshift(msg.referrer);
        comm.scrollLoad({});
        _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);

    });
}

function ReportDataSubmit(msg) {
    var obj = $("#report-data");
    var md = comm.query("md", msg.referrer);
    obj.find("tr.cursor").click(function () {
        var date = $(this).attr("date");
        var md = $(this).attr("md");
        var gameindex = $(this).attr("gameindex");
        var referrer = comm.urlReplace({ url: msg.referrer, paramName: "beforeDate", val: date, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "laterDate", val: date, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "md", val: md, pad: true });
        if (gameindex)
            referrer = comm.urlReplace({ url: referrer, paramName: "detailsType", val: gameindex, pad: true });
        __backList.unshift(msg.referrer);
        comm.scrollLoad({});
        _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
    });
    /*obj.find("tbody span.cursor").click(function () {
        var lmindex = $(this).attr("lmindex");
        var sttsel = $(this).attr("sttsel");
        var referrer = comm.urlReplace({ url: msg.referrer, paramName: "md", val: "2", pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "lmindex", val: lmindex, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "sttSel", val: sttsel, pad: true });
        __backList.unshift(msg.referrer);
        comm.scrollLoad({});
        _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
    });*/
}
function myLmAction(lmIndex) {
    var t = __info.autoTid;
    var referrer = $("#totalPage").attr("referrer");
    var beforeDate = comm.query("beforeDate", referrer);
    var mythis;
    art.dialog({title:"單組明細", padding: "5px 5px",
        initialize: function () {
            mythis = this;
            _ajax({ type: 'get', dataType: 'text', url: '/Agent/JsonData/DetailsDayLm.aspx', data: { t: t, lmIndex: lmIndex, beforeDate: beforeDate} }, function (text) {
                mythis.content(comm.overflowDiv({ content: text, width: 580 }));
            }, function () { mythis.close(); });

        },
        ok: function () { }
    });
}


var __timeout, __intervalTime, __referrer, __animalsAry = [];
function GameDataSubmit(msg, loadOdds) {
    clearInterval(__intervalTime);
    if (__animalsAry.length == 0)
        comm.animalsSort(msg.data.animalsIndex);
    __referrer = msg.referrer;
    var obj = $("#game-data");
    var gameIndex = comm.query("gameIndex", msg.referrer);
    var type = comm.query("type", msg.referrer);
    var _loadOdds = loadOdds || false;
    if (type == 1000)
        _loadOdds = false;

    var endTime = parseInt($("span[name='endTime']").attr("value"));
    var lotteryTime = parseInt($("span[name='lotteryTime']").attr("value"));
    var nextNumber = msg.data.openDateList.nextNumber || 0;

    if (!comm.NumberSign(endTime) || endTime <= 0) { //封盤時間未設定
        obj.find("#game-row tbody tr").attr("style", "background: none repeat scroll 0% 0% rgb(230, 230, 230)");
    } else {
        obj.find("#game-row tbody tr").removeAttr("style");
    }

    if (endTime == 0 && lotteryTime == 0 && gameIndex > 1) {
        return false;
    }

    //是否允許修改賠率
    if (msg.data.OddsSet == 1) {
        if (comm.query("gameIndex", msg.referrer) == "1" && comm.query("type", msg.referrer) == "3") {
            $("#setAll-game").addClass("hidden");
        } else {
            obj.find("#game-row span.odd_set").removeClass("hidden");
            $("#setAll-game").removeClass("hidden");
        }
    }

    $("#timeValue").val(comm.query("timeValue", msg.referrer) || 30);
    $("#type").val(comm.query("type", msg.referrer));
    $("#huoStatus").val(comm.query("huoStatus", msg.referrer) || 1);
    $("#rebate").val(comm.query("rebate", msg.referrer) || 1);

    //加載數據
    var _load = function (heavy) {
        var type = $("#type").val();
        var huoStatus = $("#huoStatus").val();
        var rebate = $("#rebate").val();
        var timeValue = $("#timeValue").val();
        var referrer = comm.urlReplace({ url: msg.referrer, paramName: "type", val: type, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "huoStatus", val: huoStatus, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "rebate", val: rebate, pad: true });
        referrer = comm.urlReplace({ url: referrer, paramName: "timeValue", val: timeValue, pad: true });
        if (type == 1000) {
            var bucangValue = $("#bucangValue").val();
            referrer = comm.urlReplace({ url: referrer, paramName: "bucangValue", val: bucangValue, pad: true });
        }
        if (heavy) {
            comm.scrollLoad({});
            _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
        } else {
            refreshData(referrer);
        }
    };

    //倒計時刷新
    var timeValue = parseInt($("#timeValue").val());
    __intervalTime = setInterval(function () {
        timeValue--;
        if (timeValue < 1) {
            _load();
        }
        if (timeValue <= 0) {
            clearInterval(__intervalTime); //關閉計時器
        }
        $("#autoRefresh").html(timeValue);

        if (endTime >= 0) {
            endTime--;
            $("span[name='endTime']").html(comm.settimes(endTime));
        }

        if (lotteryTime >= 0) {
            lotteryTime--;
            $("span[name='lotteryTime']").html(comm.settimes(lotteryTime));
        } else if (nextNumber == 1) {
            _load(true);
        }

    }, 1000);


    //加載賠率
    if (_loadOdds) {
        (function () {
            var line1, line2, line3, li_1;
            var type = comm.query("type", msg.referrer);
            var gameIndex = comm.query("gameIndex", msg.referrer);
            var oddsList = msg.data.oddsList || {};
            var detailsList = msg.data.detailsList || {};
            var detailsListCount = msg.data.detailsListCount || {};
            for (var i in detailsList) {
                if (gameIndex == 1 && (type >= 18 && type <= 24 || type == 212 || type == 28 || type == 29 || type == 32 || type == 33)) {
                    line1 = obj.find("div[name='lm-so'] tr[sort='" + i + "']").find("a.line1");
                    line2 = obj.find("div[name='lm-so'] tr[sort='" + i + "']").find("a.line2");
                } else if (gameIndex == 1 && (type == 30 || type == 31)) {
                    line1 = obj.find("div[name='lm-so'] td[name='ct'] a[sort='" + i + "']");
                    line2 = obj.find("div[name='lm-so'] td[name='cr'] a[sort='" + i + "']");
                    li_1 = obj.find("div[name='lm-so'] td[name='ct'] a[sort='" + (parseInt(i) + 49) + "']");
                    if (li_1.html() != oddsList[(parseInt(i) + 49)])
                        li_1.html(oddsList[(parseInt(i) + 49)]);
                } else {
                    line1 = obj.find("tr[sort='" + i + "']").find("a.line1");
                    line2 = obj.find("tr[sort='" + i + "']").find("a.line2");
                    line3 = obj.find("tr[sort='" + i + "']").find("a.line3");
                }

                if (oddsList[i] != line1.html())
                    line1.html(oddsList[i]);

                if (detailsList[i][0] != line2.html())
                    line2.html(detailsList[i][0]);

                if (line3 && detailsList[i][1] != line3.html()) {
                    line3.html(detailsList[i][1]);

                    if (gameIndex == 5 && parseInt(i) >= 3 && parseInt(i) <= 8) {
                        if (detailsList[i][0] > 0 && detailsList[i][1] < 0) {
                            obj.find("tr[sort='" + i + "']").find("a.to2").html(parseInt(detailsList[i][1]) * 2);
                            obj.find("tr[sort='" + i + "']").find("a.to3").html(parseInt(detailsList[i][1]) * 3);
                        }
                    }
                }
            }

            for (var i in detailsListCount) {
                line2 = obj.find("div[name='lm-st'] tr[sort='" + i + "']").find("a.line2");
                line3 = obj.find("div[name='lm-st'] tr[sort='" + i + "']").find("a.line3");
                if (detailsListCount[i][0] != line2.html()) {
                    line2.html(detailsListCount[i][0]);
                    line3.html(detailsListCount[i][1]);
                }
            }

        })();
    } else {
        //正在等待開獎
        (function () {
            clearInterval(__timeout);
            var _continueNum = function () {
                var newnumber = msg.data.openNumList.newnumber || 0;
                _ajax({ type: 'get', dataType: "text", url: "/Agent/AutoNewNumber.aspx", data: { gameIndex: gameIndex} }, function (m) {
                    if (m == "continue") {
                        __timeout = setTimeout(_continueNum, 5000);
                    } else if (comm.NumberSign(m) && parseInt(m) > parseInt(newnumber)) {
                        setTimeout(function () {
                            comm.scrollLoad({});
                            _ajax({ type: 'get', url: msg.referrer, data: null }, dataJson, comm.rollBack);
                        },3000);
                    }
                });
            };
            _continueNum();
        })();
    }

    //總賬數據
    if (type == 1000) {
        $("#huoStatus").addClass("hidden");
        $("#rebate").addClass("hidden");
        $("#type").addClass("hidden");
        $("#bucangValue").removeClass("hidden");
        (function () {
            var list = [], bc;
            var myList = msg.data.detailsList.list || [];
            var _obj = msg.data.detailsList || {};
            if (myList.length > 0) {
                for (var i = 0; i < myList.length; i++) {
                    list.push("<tr sort='" + i + "' " + bc + ">");
                    list.push("<td class='hidden'>" + (i + 1) + "</td>");
                    list.push("<td>" + myList[i][0] + "</td>");
                    list.push("<td>" + myList[i][1] + "</td>");
                    list.push("<td>" + myList[i][2] + "</td>");
                    list.push("<td>" + myList[i][3] + "</td>");
                    list.push("<td>" + myList[i][7] + "</td>");
                    list.push("<td>" + myList[i][4] + "</td>");
                    list.push("<td>" + myList[i][5] + "</td>");
                    list.push("<td>" + myList[i][6] + "</td>");
                    list.push("<td>-</td>");
                    list.push("</tr>");
                }
                $("#total").html(_obj.count[0]);
                $("#sum").html(_obj.count[1]);
                $("#share").html(_obj.count[2]);
                $("#comm").html(_obj.count[3]);
                $("#shouru").html(_obj.count[4]);
                $("#buhuots").html(_obj.count[5]);
            } else {
                list.push("<tr>");
                list.push("<td class='hidden'>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("<td>-</td>");
                list.push("</tr>");
                $("#total").html("0");
                $("#sum").html("0");
                $("#share").html("0");
                $("#comm").html("0");
                $("#shouru").html("0");
                $("#buhuots").html("0");
            }
            $("#list").html(list.join(""));

            var sortHtml = [], htmlstr = [];
            var html, sort;
            var index;
            $("#list tr").each(function (i) {
                sort = parseInt($(this).attr("sort"));
                index = $(this).find("span.cursor").attr("sort");
                html = "<tr sort='" + sort + "'>" + $(this).html() + "</tr>";
                sortHtml.push(index + "@" + html);
            });
            sortHtml.sort(function (a, b) {
                var _a = a.split("@")[0], _b = b.split("@")[0];
                return parseInt(_a) - parseInt(_b);
            });
            for (var i = 0; i < sortHtml.length; i++) {
                htmlstr.push(sortHtml[i].split("@")[1]);
            }
            $("#list").html(htmlstr.join(""));
            comm.mouseover("#middleContent");
        })();
    }

    //負值排列
    var count = [0, 0, 0], s = 0;
    var index, num, line1, line2, line3, mysort = [];
    var _type = parseInt(comm.query("type", msg.referrer));
    var _gameIndex = parseInt(comm.query("gameIndex", msg.referrer));
    if (_gameIndex == 1 && (_type <= 3 || _type == 8 || _type == 88)) {
        obj.find("#game-row tbody tr").each(function (i) {
            index = i + 1;
            line2 = parseInt($(this).find("a.line2").html());
            if (index <= 49 && comm.NumberSign(line2)) {
                num = $(this).find("td.bc").html();
                line1 = $(this).find("a.line1").html();
                line3 = $(this).find("a.line3").html();
                if (line2 > 0) {
                    mysort.push(num + ":" + line1 + ":" + line2 + ":" + line3);
                }
                count[0] += parseInt(line2);
                s = parseInt(line3);
                if (count[1] > s) count[1] = s;
                if (count[2] < s) count[2] = s;
            }
        });
        mysort.sort(function (a, b) {
            var _a = a.split(":")[3], _b = b.split(":")[3];
            return parseInt(_a) - parseInt(_b);
        });
        var htmldata = [],key;
        for (var i = 0; i < mysort.length; i++) {
            key = mysort[i].split(":");
            htmldata.push("<tr><td class='bold w20 bc'>" + key[0] + "</td><td class='blue bold w25'>" + key[1] + "</td><td class='w25'>" + key[2] + "</td><td class='w25'>" + key[3] + "</td></tr>");
        }
        $("#fz-sort").html(htmldata.join(""));

        $("#total_tongji b").each(function (i) {
            $(this).html(count[i]);
        });
    } else if ((_gameIndex == 2 || _gameIndex == 7) && _type >= 1 && _type <= 9) {
        var _a = [];
        obj.find("#fz-sort tbody tr").each(function () {
            _a[0] = $(this).attr("sort");
            _a[1] = $(this).attr("num1");
            _a[2] = $(this).attr("num2");
            num = "<tr sort='" + _a[0] + "' num1='" + _a[1] + "' num2='" + _a[2] + "'>" + $(this).html() + "</tr>";
            line2 = parseInt($(this).find("a.line2").html());
            line3 = $(this).find("a.line3").html();
            count[0] += parseInt(line2);
            s = parseInt(line3);
            if (count[1] > s) count[1] = s;
            if (count[2] < s) count[2] = s;
            mysort.push(line3 + ":" + num);
        });
        mysort.sort(function (a, b) {
            var _a = a.split(":")[0], _b = b.split(":")[0];
            return parseInt(_a) - parseInt(_b);
        });
        var htmldata = [], key;
        for (var i = 0; i < mysort.length; i++) {
            key = mysort[i].split(":");
            htmldata.push(key[1]);
        }
        obj.find("#fz-sort tbody").html(htmldata.join(""));
        $("#total_tongji b").each(function (i) {
            $(this).html(count[i]);
        });
    } else if (_gameIndex == 4 && _type == 1) {
        obj.find("#game-row .middle-table tbody tr").each(function () {
            line2 = $(this).find("a.line2").html();
            line3 = $(this).find("a.line3").html();
            if (comm.NumberSign(line2)) {
                count[0] += parseInt(line2);
                s = parseInt(line3);
                if (count[1] > s) count[1] = s;
                if (count[2] < s) count[2] = s;
            }
        });
        $("#total_tongji b").each(function (i) {
            $(this).html(count[i]);
        });
    } else if (_gameIndex == 14 && _type == 1) {
        obj.find("#game-row .middle-table tbody tr").each(function () {
            line2 = $(this).find("a.line2").html();
            line3 = $(this).find("a.line3").html();
            if (comm.NumberSign(line2)) {
                count[0] += parseInt(line2);
                s = parseInt(line3);
                if (count[1] > s) count[1] = s;
                if (count[2] < s) count[2] = s;
            }
        });
        $("#total_tongji b").each(function (i) {
            $(this).html(count[i]);
        });
    }

    $("#selcheng select").unbind("change").change(function () {
        var heavy = $(this).attr("id") == "type" ? true : false;
        _load(heavy);
    });

    $("#count-ary td.cursor").unbind("click").click(function () {
        //var index = $(this).attr("index");
        var index = $(this).attr("my-type");
        var referrer = comm.urlReplace({ url: msg.referrer, paramName: "type", val: index, pad: true });
        if (type == 1000)
            referrer = referrer.replace('HK/Singlenote', 'GameData');
        $("#navListBox a").removeClass("onBtn");
        $("#navListBox a[index='" + index + "']").addClass("onBtn");
        comm.scrollLoad({});
        _ajax({ type: 'get', url: referrer, data: null }, dataJson, comm.rollBack);
    });

    //玩法總投額
    (function () {
        var _count = 0;
        if (gameIndex == 1) {
            for (var i = 0; i < msg.data.countList.length; i++) {
                _count += parseInt(msg.data.countList[i]);
                $("#count-ary tr td[sort-tb='" + i + "']").find("span").html(msg.data.countList[i]);
            }
        } else {
            $("#count-ary tr").each(function (i) {
                _count += parseInt(msg.data.countList[i]);
                $(this).find("span").html(msg.data.countList[i]);
            });
        }
        if (comm.NumberSign(_count))
            $("#count-bt").html(_count);
    })();

}
//赔率上下调整
function oddsset(obj) {
    var odds = parseFloat($(obj).siblings("a").html());
    if (comm.DecimalSign(odds)) {
        var sortId = $(obj).parents("tr").attr("sort") || $(obj).siblings("a").attr("sort");
        //var gameIndex = $("#mytype").attr("gameIndex");
        var setodds = parseFloat($("#upodds").val());
        var name = $(obj).attr("name");
        if (name == "up") {
            odds = odds + setodds;
        } else if (name == "down") {
            odds = odds - setodds;
        }
        var mydata = { valname: name, oddsValue: setodds, sortAry: sortId };
        _ajax({ type: 'post', dataType: "text", url: __referrer, data: mydata }, function (text) {
            if (text == "1") {
                $(obj).siblings("a").html(comm.ForDight(odds, 4)).addClass("backred");
                setTimeout(function () { $(obj).siblings("a").removeClass("backred") }, 500);
            } else {
                art.dialog({ content: text, ok: function () { } });
            }
        });
    }
}
//全局設置賠率或封盤開盤
function setOdds(obj) {
    var type = parseInt($("#type").val());
    var setodds = parseFloat($("#upodds").val());
    var odds_k = $("#odds_k").val();
    var name = $(obj).attr("name");
    var sortAry = [], sort;
    if (odds_k == "-1") { //全部
        $("#game-row tr").each(function () {
            if (type == 30 || type == 31) {
                $(this).find("td[name='ct'] a.line1").each(function () {
                    sortAry.push($(this).attr("sort"));
                });
            } else if ($(this).attr("sort")) {
                sortAry.push($(this).attr("sort"));
            }
        });
    } else { //部分
        var num = __animalsAry[odds_k].split(","), ak;
        for (var i = 0; i < num.length; i++) {
            ak = parseInt(num[i]) < 10 ? "0" + num[i] : num[i];
            if (type == 30 || type == 31) {
                $("#game-row tr[num2='" + ak + "']").find("td[name='ct'] a.line1").each(function () {
                    sortAry.push($(this).attr("sort"));
                });
            } else {
                sort = $("#game-row tr[num2='" + ak + "']").attr("sort");
                sortAry.push(sort);
            }
        }
    }
    sortAry = comm.AryMethod(sortAry); //移除重複值
    var mydata = { valname: name, oddsValue: setodds, sortAry: sortAry.join(",") };
    _ajax({ type: 'post', dataType: "text", url: __referrer, data: mydata }, function (text) {
        if (text == "1") {
            var myobj, odds;
            for (var i = 0; i < sortAry.length; i++) {
                myobj = type != 30 && type != 31 ? $("#game-row tr[sort='" + sortAry[i] + "']").find("a.line1") : $("#game-row td[name='ct'] a[sort='" + sortAry[i] + "']");
                odds = parseFloat(myobj.html());
                if (name == "up" || name == "down") {
                    if (name == "up") {
                        odds = odds + setodds;
                    } else if (name == "down") {
                        odds = odds - setodds;
                    }
                    myobj.html(comm.ForDight(odds, 4)).addClass("backred");
                }
            }
            if (name == "up" || name == "down") {
                setTimeout(function () { $("#game-row tr a.line1").removeClass("backred") }, 500);
            } else {
                comm.scrollLoad({});
                _ajax({ type: 'get', url: __referrer, data: null }, dataJson, comm.rollBack);
            }
        } else {
            art.dialog({ content: text, ok: function () { } });
        }
    });
}
//自定降賠率
function oddssetAuto(obj) {
    var OddsSet = $("#mytype").attr("OddsSet");
    var gameIndex = comm.query("gameIndex", __referrer);
    if (OddsSet == "1") {
        var num1 = $(obj).parents("tr").attr("num1");
        var num2 = $(obj).parents("tr").attr("num2");
        var sort = $(obj).parents("tr").attr("sort") || $(obj).attr("sort");
        var title = num1 + "[" + num2 + "]";
        if ((gameIndex == 1 && sort == 154) || (gameIndex == 2 && sort >= 323 && sort<=329))
            title = num1;
        var odds = $(obj).html();
        var content = " <input type='text' id='auto-odds' class='text-input sw70' value='" + odds + "'>";
        art.dialog({ title: title, content: content, follow: obj, padding: "5px 5px",
            ok: function () {
                var setodds = parseFloat($("#auto-odds").val());
                if (comm.DecimalSign(setodds) && setodds != odds) {
                    var mydata = { valname: "auto", oddsValue: setodds, sortAry: sort };
                    _ajax({ type: 'post', dataType: "text", url: __referrer, data: mydata }, function (text) {
                        if (comm.DecimalSign(text)) {
                            $(obj).html(comm.ForDight(text, 4)).addClass("backred");
                            setTimeout(function () { $(obj).removeClass("backred") }, 500);
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    });
                } else {
                    return false;
                }
            },
            cancel: function () { }
        });
    }
}
//單筆補貨
function buhuoDetail(obj) {
    var autoshipmentsid = $("#mytype").attr("autoshipmentsid");
    if (autoshipmentsid == "1") {
        var mythis, h;
        var gameIndex = comm.query("gameIndex", __referrer);
        var sortId = $(obj).parents("tr").attr("sort");
        var number = $("span[name=number]").html();
        h = gameIndex == 1 ? "HK" : "KC";
        var href = "JsonData/" + h + "/BuHuoDetailsDay.aspx";
        var mydata = { t: comm.query("t", __referrer), sortId: sortId, number: number, gameIndex: gameIndex };
        art.dialog({ title: "補貨單", padding: "10px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', dataType: "text", url: href, data: mydata }, function (text) {
                    mythis.content(text);
                    var num1 = $(obj).parents("tr").attr("num1");
                    var num2 = $(obj).parents("tr").attr("num2");
                    var num = "<span class='bold'>" + num1 + " <span class='blue'>" + num2 + "</span></span>";
                    $("#buhuo-day #numBal").html(num);
                }, function () { mythis.close(); });
            },
            ok: function () {
                var moneyValue = $("#buhuo-day #moneyValue").val();
                var oddsint = $("#buhuo-day #oddsint").val();
                var rebate = 1;
                var value = oddsint + ":" + rebate + ":" + moneyValue;
                mydata = { t: comm.query("t", __referrer), sortId: sortId, number: number, gameIndex: gameIndex, value: value };
                _ajax({ type: 'post', dataType: "text", url: href, data: mydata }, function (text) {
                    if (text == "1") {
                        art.dialog({ content: "補貨成功。", ok: function () { }, beforeunload: function () { refreshData(__referrer); } });
                    } else {
                        art.dialog({ content: text, ok: function () { } });
                    }
                });
            },
            cancel: function () { }
        });
    }
}
//合肖、不中、連碼補貨
function buhuoHxDetail(obj) {
    var autoshipmentsid = $("#mytype").attr("autoshipmentsid");
    if (autoshipmentsid == "1") {
        var mythis, h;
        var gameIndex = comm.query("gameIndex", __referrer);
        var type = comm.query("type", __referrer);
        var sortId = $(obj).parents("tr").attr("sort");
        var number = $("span[name=number]").html();
        h = gameIndex == 1 ? "HK" : "KC";
        var href = (gameIndex == 1 && type >= 18 && type <= 24 || type == 212 || type >= 28 && type <= 33)
        ? "JsonData/" + h + "/BuHuoDetailsDayLMa.aspx"
        : "JsonData/" + h + "/BuHuoDetailsDayLM.aspx";
        var mydata = { t: comm.query("t", __referrer), sortId: sortId, number: number, gameIndex: gameIndex, type: type };
        art.dialog({ title: "補貨單", padding: "5px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', dataType: "text", url: href, data: mydata }, function (text) {
                    mythis.content(comm.overflowDiv({ width: 480, height: 220, content: text }));
                    //var dataMoney = $("#buhuoLm #data").val().split(",");
                    var sortHtml = [];
                    var dataMoney, hidden;
                    $("#buhuoLm tbody tr").each(function (i) {
                        dataMoney = $(this).find("input[name='money']").val();
                        if (comm.NumberSign(dataMoney)) {
                            if (dataMoney <= 0) {
                                //$(this).addClass("hidden");
                                hidden = "hidden";
                            } else {
                                hidden = "";
                            }
                            if (sortId == 844 || sortId == 942) {
                                $("#buhuoLm #odds_2").css("display", "");
                            }
                            sortHtml.push(dataMoney + "#<tr sort='" + $(this).attr("sort") + "' class='" + hidden + "'>" + $(this).html() + "</tr>");
                        }
                    });
                    if (sortHtml.length > 0) {
                        sortHtml.sort(function (a, b) {
                            var _a = a.split("#")[0], _b = b.split("#")[0];
                            return parseInt(_b) - parseInt(_a);
                        });
                        $("#buhuoLm tbody").html(sortHtml.join(""));
                    }
                    $("#buhuoLm thead #all").unbind("click").click(function () {
                        $("#buhuoLm tbody input[type='checkbox']").attr("checked", $(this).attr("checked"));
                    });
                    if (__info.state > 1) {
                        $("#buhuoLm tbody input[name='odds']").attr("disabled", "disabled");
                        $("#buhuoLm tbody input[name='odds_2']").attr("disabled", "disabled");
                    }
                }, function () { mythis.close(); });
            },
            ok: function () {
                var sortAry = [], odds_2, cheStop;
                $("#buhuoLm tbody tr input[name='money']").each(function () {
                    cheStop = $(this).parents("tr").find("input[type='checkbox']").attr("checked");
                    if (comm.NumberSign($(this).val()) && parseInt($(this).val()) > 0 && cheStop) {
                        odds_2 = $(this).parents("tr").find("input[name='odds_2']").val() || 0;
                        sortAry.push($(this).parents("tr").find("input[name='odds']").val() + ":" + 1 + ":" + $(this).val() + ":" + $(this).parents("tr").attr("sort") + ":" + odds_2);
                    }
                });
                if (sortAry.length > 0) {
                    mydata = { t: comm.query("t", __referrer), sortId: sortId, number: number, gameIndex: gameIndex, type: type, value: sortAry.join("|") };
                    _ajax({ type: 'post', dataType: "text", url: href, data: mydata }, function (text) {
                        if (text == "1") {
                            art.dialog({ content: "補貨成功。", ok: function () { },
                                beforeunload: function () {
                                    comm.scrollLoad({});
                                    _ajax({ type: 'get', url: __referrer, data: null }, dataJson, comm.rollBack);
                                }
                            });
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    });
                } else {
                    return false;
                }
            },
            cancel: function () { }
        });
    }
}
//快速補貨
function numBuHuo() {
    var autoshipmentsid = $("#mytype").attr("autoshipmentsid");
    if (autoshipmentsid == "1") {
        var mythis;
        var gameIndex = comm.query("gameIndex", __referrer);
        var type = $("#type").val();
        var number = $("span[name=number]").html();
        var mydata = { t: comm.query("t", __referrer), number: number, gameIndex: gameIndex, oddsIndex: type };
        var href = "JsonData/HK/BuHuoDetailsDayNum.aspx";
        art.dialog({ title: "快速補貨單", padding: "10px 5px",
            initialize: function () {
                mythis = this;
                _ajax({ type: 'post', dataType: "text", url: href, data: mydata }, function (text) {
                    mythis.content(text);
                    var key, num;
                    var oddsData = $("#buhuoNum #oddsData").val().split(",");
                    var moneyData = $("#buhuoNum #moneyData").val().split(",");
                    $("#buhuoNum tbody tr").each(function (i) {
                        num = $(this).find("td.bc").html();
                        $(this).find("td.bc").addClass(comm.contains(num));
                        key = oddsData[i].split(":");
                        $(this).attr("sort", key[0]);
                        $(this).find("input[name='odds']").val(key[1]);
                    });
                    for (var i = 0; i < moneyData.length; i++) {
                        key = moneyData[i].split(":");
                        $("#buhuoNum tbody tr[sort='" + key[0] + "']").find("input[name='money']").val(key[1]);
                    }
                    if (__info.state > 1) {
                        $("#buhuoNum tbody input[name='odds']").attr("disabled", "disabled");
                    }
                }, function () { mythis.close(); });
            },
            ok: function () {
                var sortAry = [];
                $("#buhuoNum tbody tr input[name='money']").each(function () {
                    if (comm.NumberSign($(this).val()) && parseInt($(this).val()) > 0) {
                        sortAry.push($(this).parents("tr").find("input[name='odds']").val() + ":" + 1 + ":" + $(this).val() + ":" + $(this).parents("tr").attr("sort"));
                    }
                });
                if (sortAry.length > 0) {
                    mydata = { t: comm.query("t", __referrer), number: number, gameIndex: gameIndex, oddsIndex: type, value: sortAry.join(",") };
                    _ajax({ type: 'post', dataType: "text", url: href, data: mydata }, function (text) {
                        if (text == "1") {
                            art.dialog({ content: "補貨成功。", ok: function () { }, beforeunload: function () { refreshData(__referrer); } });
                        } else {
                            art.dialog({ content: text, ok: function () { } });
                        }
                    });
                } else {
                    return false;
                }
            },
            cancel: function () { }
        });
    }
}
//註單明細
function searchDetail(obj) {
    if (comm.NumberSign($(obj).html())) {
        var href,mythis;
        var t = comm.query("t", __referrer);
        var gameIndex = comm.query("gameIndex", __referrer);
        var type = parseInt(comm.query("type", __referrer));
        var sort = $(obj).parents("tr").attr("sort");
        var opNum = $("span[name='number']").html();
        href = "JsonData/DetailsDay.aspx?t=" + t + "&type=" + type + "&sortId=" + sort + "&number=" + opNum + "&gameIndex=" + gameIndex;
        /*if ((gameIndex == 1 && type >= 18 && type <= 24 || type >= 28 && type <= 33 || type == 212) || (gameIndex == 2 && type == 10)) {
            href = "JsonData/DetailsDayLm.aspx?t=" + t + "&type=" + type + "&sortId=" + sort + "&number=" + opNum + "&gameIndex=" + gameIndex;
        } else {
            href = "JsonData/DetailsDay.aspx?t=" + t + "&type=" + type + "&sortId=" + sort + "&number=" + opNum + "&gameIndex=" + gameIndex;
        }*/
        art.dialog({ title: "註單明細", padding: "10px 5px",
            initialize: function () {
                mythis = this;
                var _lmclick = function () {
                    $("#details-day tbody td span.cursor").click(function () {
                        var LmIndex = $(this).attr("LmIndex");
                        href = "JsonData/DetailsDay.aspx?t=" + t + "&type=" + type + "&sortId=" + sort + "&number=" + opNum + "&gameIndex=" + gameIndex + "&LmIndex=" + LmIndex;
                        _ajax({ type: 'post', dataType: "text", url: href, data: null }, function (text) {
                            mythis.content(comm.overflowDiv({ width: 880, height: 380, content: text }));
                            _pageclick();
                        });
                    });
                };
                var _pageclick = function () {
                    $("#details-day ul.pager-t li").click(function () {
                        var currentPage = parseInt($("#details-day #current_page").val());
                        var totalPage = parseInt($("#details-day #total_page").html());
                        var page = comm.searchPage($(this), currentPage, totalPage);
                        if (page) {
                            href = comm.urlReplace({ url: href, paramName: "page", val: page, pad: true });
                            _ajax({ type: 'post', dataType: "text", url: href, data: null }, function (text) {
                                mythis.content(comm.overflowDiv({ width: 880, height: 380, content: text }));
                                _pageclick();
                                _lmclick();
                            });
                        }
                    });
                };
                _ajax({ type: 'post', dataType: "text", url: href, data: null }, function (text) {
                    mythis.content(comm.overflowDiv({ width: 880, height: 380, content: text }));
                    _pageclick();
                    _lmclick();

                }, function () { mythis.close(); });
            },
            ok: function () { }
        });
    }
}
//總賬明細
function singlenoteDay(obj) {
    var mythis;
    var t = comm.query("t", __referrer);
    var gameIndex = comm.query("gameIndex", __referrer);
    var oddsIndexStr = encodeURIComponent($(obj).html());
    var opNum = $("span[name='number']").html();
    var bucang = $("#bucangValue").val() || 0;
    var href = "JsonData/HK/SinglenoteDay.aspx?t=" + t + "&oddsIndexStr=" + oddsIndexStr + "&number=" + opNum + "&gameIndex=" + gameIndex + "&bucangValue=" + bucang;
    art.dialog({ title: "註單明細", padding: "10px 5px",
        initialize: function () {
            mythis = this;
            var _pageclick = function () {
                $("#details-day ul.pager-t li").click(function () {
                    var currentPage = parseInt($("#details-day #current_page").val());
                    var totalPage = parseInt($("#details-day #total_page").html());
                    var page = comm.searchPage($(this), currentPage, totalPage);
                    if (page) {
                        href = comm.urlReplace({ url: href, paramName: "page", val: page, pad: true });
                        _ajax({ type: 'get', dataType: "text", url: href, data: null }, function (text) {
                            mythis.content(comm.overflowDiv({ width: 880, height: 380, content: text }));
                            _pageclick();
                        });
                    }
                });
            };
            _ajax({ type: 'get', dataType: "text", url: href, data: null }, function (text) {
                mythis.content(comm.overflowDiv({ width: 880, height: 380, content: text }));
                _pageclick();
            }, function () { mythis.close(); });
        },
        ok: function () { }
    });
}
function refreshData(referrer) {
    _ajax({ type: 'get', url: referrer, data: null }, function (objVal) {
        var gameIndex = comm.query("gameIndex", objVal.referrer);
        var _type = comm.query("type", objVal.referrer);
        var _getTime = function (endTime, trayTeMaNo) { if (gameIndex == "1" && parseInt(_type) <= 3) return trayTeMaNo; else return endTime };
        var endTime = _getTime(objVal.data.openDateList.endTime, objVal.data.openDateList.trayTeMaNo) || 0;
        var lotteryTime = objVal.data.openDateList.lotteryTime || 0;
        $("span[name='endTime']").attr("value", endTime);
        $("span[name='lotteryTime']").attr("value", lotteryTime);
        GameDataSubmit(objVal, true);
    });
}
