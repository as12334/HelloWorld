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

        var dataAry = [];
        var myLi, data_sort, data_title, data_name, data_odds;
        obj.find(".WFbox .box li div.on").each(function () {
            myLi = $(this).parent("li");
            data_sort = myLi.attr("data-sort");
            data_title = myLi.attr("data-title");
            data_name = myLi.attr("data-name");
            data_odds = myLi.find("label").html();
            if (G.DecimalSign(data_odds)) {
                dataAry.push(data_sort + ":" + data_title + ":" + data_name + ":" + data_odds);
            }
        });
        if (dataAry.length == 0) {
            alert("請選擇球號。");
            return false;
        }
        mySubmit(obj, dataAry);
    });
});

function mySubmit(obj, dataAry) {
    obj.find("#BetPage").css("display","block");
    obj.find("#myMask").remove();
    obj.append("<div class='mask' id='myMask'></div>");
    obj.find("#betClose").unbind("click").click(function () {
        obj.find("#myMask").remove();
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
            myhtml.push("<label class='w1'><span>" + key[1] + " [<span class='lan'>" + key[2] + "</span>]</span><br><span class='hong'>" + key[3] + "</span></label>");
            myhtml.push("<p class='w2'><input type='tel' name='uPI_M' class='m_sum txt-money' value='" + txtMomey.val() + "'></p>");
            myhtml.push("<a href='javascript:void(0);'  class='operate'><p class='w2'>刪除</p></a>");
            myhtml.push("</li>");
        }
        obj.find("#mingx").remove();
        obj.find("#dataPage").append(addMingxi(myhtml.join("")));
        obj.find("#tz_count").html(dataAry.length);
        obj.find("#tz_sum").html(parseInt(dataAry.length) * parseInt(txtMomey.val()));
        obj.find("#betClose").click();
        obj.find(".WFbox").css("display", "none");
        obj.find(".Clbox").css("display", "none");
        obj.find(".rightBtn").css("display", "none");
        obj.find(".WFbox .box li div.on").removeClass("on");

        var _eachCount = function () {
            var count = 0, money = 0, m;
            var _dataAry = [];
            obj.find(".DDbox li").each(function () {
                if (!$(this).hasClass("liBg")) {
                    m = parseInt($(this).find("input[name='uPI_M']").val()) || 0;
                    money += m;
                    count++;
                    _dataAry.push("1:" + $(this).attr("data-sort") + ":" + m);
                }
            });
            obj.find("#tz_count").html(count);
            obj.find("#tz_sum").html(money);
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
        obj.find("#remove").touchend(function (e) {
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
        obj.find("#submit").touchend(function (e) {
            btime = e.timeStamp;
            if ((ctime - atime) > 0) return; //判斷滑動中的誤選

            dataAry = _eachCount();
            if (dataAry.length == 0) {
                alert('至少選擇1注以上注單！');
                return false;
            } else {
                obj.find("#submit").hide();
                $(".ui-loader").css("display", "block");
                $(".ui-panel-dismiss").css("display", "block");
                var gameIndex = $("#gameall #lottery_type").attr("data-index");
                dataSubmit({ __: "DownEntry", t: ___t, gameIndex: gameIndex, number: number, sortAry: dataAry.join(",") }, function (msg) {
                    obj.find("#submit").show();
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
    if (msg.oddsList) {
        for (var i in msg.oddsList) {
            $("#gameall .WFbox .box li[data-sort='" + i + "'] label").html(msg.oddsList[i]);
        }
    }
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