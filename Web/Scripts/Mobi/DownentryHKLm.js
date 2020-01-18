$(function () {
    var obj = $("#gameall");
    //下註
    var atime, btime, ctime;
    obj.find(".rightBtn").unbind("touchstart").touchstart(function (e) {
        atime = e.timeStamp;
    });
    obj.find(".rightBtn").on("touchmove", function (e) {
        ctime = e.timeStamp;
    });
    obj.find(".rightBtn").unbind("touchend").touchend(function (e) {
        btime = e.timeStamp;
        if ((ctime - atime) > 0) return; //判斷滑動中的誤選

        var dataAry = [], nameAry = [], odds = 0, odds2 = 0, count = 0;
        var data_sort = $("#sltDate").attr("data-sort");
        var data_min = $("#sltDate").attr("data-min");
        var data_max = $("#sltDate").attr("data-max");
        //var data_cycle = $("#sltDate").attr("data-type");
        var myLi, data_title, data_odds;
        obj.find(".WFbox .box li div.on").each(function () {
            myLi = $(this).parent("li");
            if (G.DecimalSign(myLi.find("label").html())) {
                data_title = myLi.attr("data-type");
                nameAry.push(myLi.find("span").html());
                odds += parseFloat(myLi.find("label").html());
                if (G.DecimalSign(myLi.find("b").html()))
                    odds2 += parseFloat(myLi.find("b").html());
                count++;
            }
        });
        if (nameAry.length < data_min || nameAry.length > data_max) {
            alert("勾選組合必須 " + data_min + "-" + data_max + " 個球號");
            return false;
        }
        data_odds = G.forDight(odds / count, 3);
        if (odds2 > 0)
            data_odds += "/" + G.forDight(odds2 / count, 3);
        dataAry.push(data_sort + ":" + data_title + ":" + nameAry.join(",") + ":" + data_odds);
        mySubmit(obj, dataAry, nameAry, data_min, data_sort);
    });
});
function mySubmit(obj, dataAry, nameAry, cycle, sort) {
    obj.find("#BetPage").css("display", "block");
    obj.find("#myMask").remove();
    obj.append("<div class='mask' id='myMask'></div>");
    obj.find("#betClose").unbind("click").click(function () {
        obj.find(".mask").remove();
        obj.find("#BetPage").css("display", "none");
        obj.find("#txtMomey").val("");
    });
    obj.find("#btnSubmitBet").unbind("touchend").touchend(function () {
        var myhtml = [], key;
        var number = obj.find("#t_qs").html();
        var txtMomey = obj.find("#txtMomey");
        if (txtMomey.val() == "" || !G.NumberSign(txtMomey.val())) {
            alert("請填寫有效金額。");
            txtMomey.focus();
            return false;
        }
        for (var i = 0; i < dataAry.length; i++) {
            key = dataAry[i].split(":");
            myhtml.push("<li data-sort='" + key[0] + "'>");
            myhtml.push("<p class='lv w1'>" + number + "</p>");
            myhtml.push("<label class='w1'><span>" + key[1] + "</span> @ <span class='hong'>" + key[3] + "</span><br>[<span class='lan'>" + key[2] + "</span>]</label>");
            myhtml.push("<p class='w2'><input type='tel' name='uPI_M' class='m_sum txt-money' value='" + txtMomey.val() + "'></p>");
            myhtml.push("<a href='javascript:void(0);'  class='operate'><p class='w2'>刪除</p></a>");
            myhtml.push("</li>");
        }

        //複試計算，獲取總註數
        var duplex = G.DuplexSum(cycle, nameAry);
        obj.find("#mingx").remove();
        obj.find("#dataPage").append(addMingxi(myhtml.join("")));
        obj.find("#tz_count").html(duplex.count);
        obj.find("#tz_sum").html(parseInt(duplex.count) * parseInt(txtMomey.val()));
        obj.find("#betClose").click();
        obj.find(".WFbox").css("display", "none");
        obj.find(".Clbox").css("display", "none");
        obj.find(".rightBtn").css("display", "none");
        obj.find(".WFbox .box li div.on").removeClass("on");

        var _eachCount = function () {
            var money = 0;
            var _dataAry = [];
            obj.find(".DDbox li").each(function () {
                if (!$(this).hasClass("liBg")) {
                    money = parseInt($(this).find("input[name='uPI_M']").val()) || 0;
                    for (var i = 0; i < duplex.list.length; i++) {
                        _dataAry.push(1 + ":" + duplex.list[i] + ":" + money);
                    }
                }
            });
            obj.find("#tz_count").html(duplex.count);
            obj.find("#tz_sum").html(parseInt(duplex.count) * money);
            return _dataAry;
        };
        //刪除、恢復
        var atime, btime, ctime;
        obj.find(".DDbox li a.operate p.w2").touchstart(function (e) {
            atime = e.timeStamp;
        });
        obj.find(".DDbox li a.operate p.w2").on("touchmove", function (e) {
            ctime = e.timeStamp;
        });
        obj.find(".DDbox li a.operate p.w2").touchend(function (e) {
            btime = e.timeStamp;
            if ((ctime - atime) > 0) return; //判斷滑動中的誤選

            var myLi = $(this).parent().parent("li");
            if (myLi.hasClass("liBg")) {
                myLi.removeClass("liBg");
                myLi.find(".deleLing").removeClass("deleLing");
                myLi.find("input").removeClass("deleLing").attr("disabled", false);
                $(this).html("刪除");
            } else {
                myLi.addClass("liBg");
                myLi.find("p.lv").addClass("deleLing");
                myLi.find("label").addClass("deleLing");
                myLi.find("input").addClass("deleLing").attr("disabled", true);
                $(this).html("恢復");
            }
            _eachCount();
        });
        obj.find(".DDbox li input[name='uPI_M']").change(function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
            _eachCount();
        });
        //取消
        obj.find("#remove").touchstart(function (e) {
            atime = e.timeStamp;
        });
        obj.find("#remove").on("touchmove", function (e) {
            ctime = e.timeStamp;
        });
        obj.find("#remove").unbind("touchend").touchend(function (e) {
            btime = e.timeStamp;
            if ((ctime - atime) > 0) return; //判斷滑動中的誤選
            myremove(obj);
        });
        //確認
        obj.find("#submit").touchstart(function (e) {
            atime = e.timeStamp;
        });
        obj.find("#submit").on("touchmove", function (e) {
            ctime = e.timeStamp;
        });
        obj.find("#submit").unbind("touchend").touchend(function (e) {
            btime = e.timeStamp;
            if ((ctime - atime) > 0) return; //判斷滑動中的誤選
            
            dataAry = _eachCount();
            if (dataAry.length == 0) {
                alert('至少選擇1注以上注單！');
                return false;
            } else {
                $(".ui-loader").css("display", "block");
                $(".ui-panel-dismiss").css("display", "block");
                var myCursor = encodeURIComponent(nameAry.join("、"));
                var gameIndex = $("#gameall #lottery_type").attr("data-index");
                dataSubmit({ __: "DownEntryLm", t: ___t, sort: sort, gameIndex: gameIndex, myCursor: myCursor, number: number, sortAry: dataAry.join("|") }, function (msg) {
                    $(".ui-loader").removeAttr("style");
                    $(".ui-panel-dismiss").removeAttr("style");
                    obj.find("#mingx").remove();
                    var img = "success";
                    var clas = "tGreen";
                    var display = "";
                    var content = "恭喜您！您的投注已成功！";
                    if (msg.error) {
                        display = "none";
                        img = "error";
                        clas = "tYellow";
                        content = msg.error;
                    }
                    obj.find("#mxcontent").remove();
                    obj.find("#dataPage").append(addmxResutl({ img: img, clas: clas, display: display, content: content }));
                    obj.find("#remove").touchstart(function (e) {
                        atime = e.timeStamp;
                    });
                    obj.find("#remove").on("touchmove", function (e) {
                        ctime = e.timeStamp;
                    });
                    obj.find("#remove").touchend(function (e) {
                        btime = e.timeStamp;
                        if ((ctime - atime) > 0) return; //判斷滑動中的誤選
                        myremove(obj);
                        newGameData(msg);
                    });
                });
            }
        });
    });
}
function newGameData(msg) {
    $("#t_credit span").html(msg.usableCredit);
}
function dataSubmit(data, callBack) {
    $.ajax({
        type: 'post',
        url: '/TotalData/Action.ashx',
        data: data,
        dataType: 'json',
        success: function (msg) {
            if (callBack) { callBack(msg); }
        },
        error: function () {
            if (callBack) {
                callBack();
            }
            alert("Error：the options for this ajax request");
        }
    });
}
function myremove(obj) {
    obj.find(".WFbox").removeAttr("style");
    obj.find(".Clbox").removeAttr("style");
    obj.find(".rightBtn").removeAttr("style");
    obj.find("#mingx").remove();
    obj.find("#mxcontent").remove();
}
function addMingxi(str) {
    return "<div class='DDbox' id='mingx'>"
			+ "<div class='DDtitle'>合計:<b class='hong' id='tz_sum'>0</b> <b class='f10' >[共<b id='tz_count' class='hong'>0</b>注]</b></div>"
			+ "<div class='box'>"
				+ "<b class='w1'>期數</b><b class='w1'>玩法</b><b class='w2'>金額</b><b class='w2'>操作</b>"
				+ "<ul>" + str + "</ul>"
			+ "<div class='clear'></div>"
		    + "</div>"
		    + "<div class='clear'></div>"
            + "<div id='alert_show' style='display:none;'></div>"
		    + "<div class='btnBox'>"
			    + "<a href='javascript:void(0);' data-transition='slide' id='submit'><div class='QDbtn'>確定</div></a>"
			    + "<a href='javascript:void(0);' data-transition='slide' id='remove' data-direction='reverse'><div class='QXbtn'>取消</div></a>"
		    + "</div>"
		+ "</div>";
}
function addmxResutl(msg) {
    return "<div data-role='content' class='pm' style='padding-bottom:10px;' id='mxcontent'>"
		    + "<div class='DDtitle'>系統提示</div>"
		    + "<div class='DDbox'>"
			    + "<div class='tipsBox'>"
				    + "<div class='" + msg.img + "'></div>"
				    + "<span class='" + msg.clas + "'>" + msg.content + "</span>"
                    + "<span style='display:" + msg.display + "'><a href='javascript:void(0);' onclick=\"location.href='/Mobi/Status.aspx?t=" + ___t + "'\">>>查看下註明細</a></span>"
			    + "</div>"
		    + "</div>"
		    + "<div class='btnBox1'>"
		    + "<a href='javascript:void(0);' id='remove' data-transition='slide' data-direction='reverse'><div class='FHbtn'>返回</div></a>"
		    + "</div>"
		    + "</div>";
}