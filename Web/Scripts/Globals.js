Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "H+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


var S = {
    request: null,
    intervalTime: null,
    intervalOpenTime: null,
    initialization: null,
    scrollinterval: null,
    stop: true,
    lineStop: true,
    loadingWrap: true,
    backList: [],
    action: "/totaldata/action.ashx",
    loginDefautl: "/Agent/Login/?e=" + +new Date()
};

var _INI_ = {

    //弹出对话框容器
    alertHtm: "<div id='myWarpr'>"
    + "<table class='myLayer' cellspacing='0' cellpadding='0' border='0'>"
    + "<tbody>"
    + "<tr>"
    + "<td>"
    + "<div class='myLayerOn'></div>"
    + "<div class='myLayerTitle'><h3></h3><a href='javascript:;' class='myLayerClose' title='關閉'></a></div>"
    + "<div class='myLayerContent' style='width:auto;height:auto;'></div>"
    + "<div class='myLayerFooter'><a href='javascript:;' class='btn grayBtn myLayerCancel' title='取消'>取消</a><a href='javascript:;' class='btn hotBtn myLayerOk' title='確認'>確認</a></div><div class='myLayerLoading'></div>"
    + "</td></tr></tbody></table></div>"

};

var G = {
    alert: function (msg) {
        $("#myWarpr").remove();
        $("body").append(_INI_.alertHtm);
        var myobj = $("#myWarpr");
        var title = msg.title || "提示";
        var content = msg.content || "";
        var width = msg.width || "auto";
        var height = msg.height || "auto";
        var initialize = msg.initialize || false;
        var cancel = msg.cancel || false;
        var ok = msg.ok || false;
        var close = msg.close || false;
        var okVal = msg.okVal || "確認";
        var cancelVal = msg.cancelVal || "取消";
        var lock = true;
        var top, left;

        myobj.find(".myLayerTitle h3").html(title);
        myobj.find(".myLayerContent").html(content);
        myobj.find(".myLayerFooter").hide();
        myobj.find(".myLayerFooter a.myLayerCancel").html(cancelVal).attr("title", cancelVal).hide();
        myobj.find(".myLayerFooter a.myLayerOk").html(okVal).attr("title", okVal).hide();

        if (lock) { //遮罩层
            $("#mymask").remove();
            $("body").append("<div class='myLayerLoading' id='mymask'></div>");
            $("#mymask").show();
        }
        if (msg.obj) {
            var obj = msg.obj;
            var elmOffset = obj.offset();
            top = elmOffset.top + obj.height() + 10; //控件top坐標
            left = elmOffset.left + 10; //控件left坐標
        } else {
            myobj.find(".myLayerOn").hide();
            myobj.find(".myLayerContent").css({ "width": width, "height": height, "overflow-y": "auto" });
            var myWidth = myobj.find(".myLayerContent").width();
            var myHieht = myobj.find(".myLayerContent").height();
            top = ($(window).height() - myHieht) / 2.8;
            left = ($(window).width() - myWidth) / 2;
            $(window).resize(function () {
                myobj.find(".myLayer").css({ "left": ($(window).width() - myWidth) / 2, "top": ($(window).height() - myHieht) / 2.8 });
                $("#mymask").css("height", $(window).height());
            });
        }
        myobj.find(".myLayer").css({ "top": top, "left": left });
        window.scrollTo(0, 0);

        if (ok) {
            myobj.find(".myLayerFooter").show();
            myobj.find(".myLayerFooter a.myLayerOk").show().focus();
        }
        if (cancel) {
            myobj.find(".myLayerFooter").show();
            myobj.find(".myLayerFooter a.myLayerCancel").show();
        }
        if (initialize) {
            initialize();
        }
        myobj.find(".myLayerClose").unbind("click").click(function () {
            if (close) { close(); }
            G.alertClose();
        });
        myobj.find(".myLayerCancel").unbind("click").click(function () {
            if (close) { close(); }
            if (!cancel()) {
                G.alertClose();
            }
        });
        myobj.find(".myLayerOk").unbind("click").click(function () {
            if (ok()) { G.alertClose(); }
            if (close) { close(); }
        });
    },
    alertClose: function () {
        $("#myWarpr").remove();
        $("#mymask").remove();
    },

    mask: function () {
        $("#mask-eah").remove();
        $("#myLayerImg").remove();
        $("body").append("<div class='myLayerLoading' id='mask-eah'></div>");
        $("body").append("<div class='myLayerImg' id='myLayerImg'></div>");
        $("#mask-eah").show();
    },
    maskClose: function () {
        $("#mask-eah").remove();
        $("#myLayerImg").remove();
    },
    myLayerImg: function () {
        $("#myLayerImg").remove();
        $("body").append("<div class='myLayerImg' id='myLayerImg'></div>");
    },
    myLayerImgClose: function () {
        $("#myLayerImg").remove();
    },

    isAction: function (msg) {
        for (var i = 0; i < msg.ary.length; i++) {
            if (msg.key === msg.ary[i]) {
                return true;
                break;
            }
        }
    },
    strToObj: function (str) {
        var mystr = str.split("&"), s;
        var data = ["\"__\":\"" + mystr[0] + "\""];
        for (var i = 1; i < mystr.length; i++) {
            if (mystr[i]) {
                s = mystr[i].split("=");
                data.push("\"" + s[0] + "\":\"" + s[1] + "\"");
            }
        }
        return eval("({" + data.join(",") + "})");
    },

    myTips: function (msg) {
        var content = msg.content;
        var elmOffset = msg.obj.offset();
        var _top = msg.top || 3;
        var _left = msg.left || 10;
        var top = msg.top || elmOffset.top - _top; //控件top坐標
        var left = msg.left || elmOffset.left + msg.obj.width() + _left; //控件left坐標
        var myDiv = "<div id='myxTips' style='left:" + left + "px; top:" + top + "px;'><div id='myxTipsLeft'></div><div id='myxTipsContent'>" + content + "</div></div>";
        $("#myxTips").remove();
        $("body").append(myDiv);
        if (msg.myclick) {
            var count = 0;
            $("body").unbind("click").click(function () {
                count++;
                if (count > 1) {
                    $("#myxTips").remove();
                    $("body").unbind("click");
                }
            });
        }
    },
    removeTips: function () {
        $("#myxTips").remove();
    },

    ajax: function (data_action, callBack, errorBack) {
        return $.ajax({
            type: "post",
            url: S.action,
            cache: false,
            timeout: 1000 * 30,
            dataType: 'json',
            data: G.strToObj(data_action + "&t=" + __sysinfo.autoTid),
            success: function (msg) {
                try {
                    if (msg.error) {
                        if (msg.error == "SystemMaintenance") {
                            location.href = S.loginDefautl;
                        } else {
                            if (errorBack) errorBack();
                            G.alert({ content: msg.error, ok: function () { return true; } });
                        }
                    } else {
                        if (callBack) {
                            callBack(msg);
                        }
                    }
                } catch (e) { if (errorBack) errorBack(); }
            }, error: function () {
                if (errorBack) errorBack();
                //G.alert({ content: "Error：the options for this ajax request", ok: function () { return true; } });
            }
        });
    },

    //鼠标经过方法
    mouseover: function (str, hover) {
        var obj = $(str);
        $(obj).mouseover(function () {
            var _hover = hover || "myqhs";
            $(this).addClass(_hover).mouseout(function () {
                $(this).removeClass(_hover);
            });
        });
    },

    //Url参数替换
    urlReplace: function (msg) {
        var oUrl = msg.url || "";
        var paramName = msg.paramName || "page";
        var val = msg.val || "";
        var pad = msg.pad;
        var re = new RegExp("(/\?|&)" + paramName + "=([^&]+$)|" + paramName + "=[^&]+&", "i");
        var nUrl = oUrl.replace(re, '');
        if (pad == true) { //替换原有参数
            var _a = nUrl.indexOf("?") === -1 ? "?" : "&";
            return nUrl + _a + paramName + "=" + val;
        } else { //删除原有参数并返回
            return nUrl;
        }
    },
    //解析Url参数
    query: function (name, referrer) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var _referrer = referrer || location.href;
        var r = decodeURI(_referrer).split("?")[1].match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    },

    //Dight 格式化浮点数 How 保留位数
    forDight: function (Dight, How) {
        Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
        return parseFloat(Dight);
    },

    //强制保留小数 How保留位数
    toDecimal: function (Dight, How) {
        if (isNaN(parseFloat(Dight))) {
            return false;
        }
        var f = Math.round(Dight * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + How) {
            s += '0';
        }
        return s;
    },

    //写cookies
    setCookie: function (name, value) {
        var Days = 10;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    //读cookies
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },

    //删cookies
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = comm.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },

    //浮点数或正整数
    DecimalSign: function (str) {
        return /^[0-9]+(\.[0-9]+)?$/.test(str);
    },

    //正整数
    NumberSign: function (str) {
        return /^[0-9]+$/.test(str);
    },

    //可带正负号的正整数
    NumberSignt: function (str) {
        return /^[+-]?[0-9]+$/.test(str);
    },

    //中文或字符串或数字
    ChznSign: function (str) {
        return /^[a-zA-Z0-9-\u4e00-\u9fa5]+$/.test(str);
    },

    //是否是英文字母或数字或_的字符串{0,50}（不允许下划线开始）
    StringSign: function (str) {
        return /^[a-z0-9A-Z][a-z0-9A-Z_]{0,50}$/.test(str);
    },

    //移除數組中的重複值
    AryMethod: function (ary) {
        var h = {};    //定义一个hash表  
        var arr = [];  //定义一个临时数组  
        for (var i = 0; i < ary.length; i++) {    //循环遍历当前数组  
            //对元素进行判断，看是否已经存在表中，如果存在则跳过，否则存入临时数组  
            if (!h[ary[i]]) {
                //存入hash表  
                h[ary[i]] = true;
                //把当前数组元素存入到临时数组中  
                arr.push(ary[i]);
            }
        }
        return arr;
    },

    //滾動軸DIV
    overflowDiv: function (msg) {
        var id = msg.id || +new Date();
        var height = msg.height || 280;
        var content = msg.content || "加載中...";
        return "<div id='" + id + "' style='max-height:" + height + "px; overflow-y:auto;'>" + content + "</div>";
    },

    //分页查询
    searchPage: function ($this, currentPage, totalPage) {
        var pageIndex = false;
        var id = $this.attr("id");
        var current_page = currentPage || parseInt($("#shell_pageControl .pager #currentPage").html()); //当前第几页
        var total_page = totalPage || parseInt($("#shell_pageControl .pager #totalPage").html()); //总页数
        if (id == "first" && current_page > 1) { //第一页
            pageIndex = 1;
        } else if (id == "previous" && current_page > 1) { //上一页
            pageIndex = current_page - 1;
        } else if (id == "next" && total_page > current_page) { //下一页
            pageIndex = current_page + 1;
        } else if (id == "last" && total_page > current_page) { //最后一页
            pageIndex = total_page;
        }
        return pageIndex;
    },

    //分页查询
    searchPageNew: function ($this, currentPage, totalPage) {
        var pageIndex = $this.attr("data-page");
        return pageIndex;
    },

    //时间戳转换HH:mm:ss
    settimes: function (time) {
        if (time > 0 && G.NumberSign(time)) {
            time = parseInt(time);
            var MinutesRound = Math.floor(time / 60);
            var SecondsRound = Math.floor(time - (60 * MinutesRound));
            var Minutes = MinutesRound.toString().length <= 1 ? "0" + MinutesRound : MinutesRound;
            var Seconds = SecondsRound.toString().length <= 1 ? "0" + SecondsRound : SecondsRound;
            var strtime = Minutes + ":" + Seconds;
            return strtime;
        } else {
            return "00:00";
        }
    },
    settimer: function (time) {
        if (time > 0 && G.NumberSign(time)) {
            var days = Math.floor(time / 1440 / 60);
            var hours = Math.floor((time - days * 1440 * 60) / 3600);
            var minutes = Math.floor((time - days * 1440 * 60 - hours * 3600) / 60);
            var seconds = (time - days * 1440 * 60 - hours * 3600 - minutes * 60);
            hours = hours.toString().length == 1 ? "0" + hours : hours;
            minutes = minutes.toString().length == 1 ? "0" + minutes : minutes;
            seconds = seconds.toString().length == 1 ? "0" + seconds : seconds;
            return hours + ":" + minutes + ":" + seconds;
        } else {
            return "00:00:00";
        }
    },

    //加载条
    scrollLoad: function (msg) {
        var defaults = {
            top: msg.top || "98px",
            left: msg.left || "0",
            backColor: msg.backColor || "blue",
            width: msg.width || "0px",
            height: msg.height || "5px",
            display: msg.display || "block",
            scrollStart: msg.scrollStart || 0,
            scrollLneght: msg.scrollLneght || $(window).width() - 10,
            second: msg.second || 1,
            increase: msg.increase || 0.7,
            addDiv: msg.addDiv || "Yes"
        };
        if (defaults.addDiv == "Yes") {
            (function () {
                var newDiv = "<div class='loadScroll' id='LoadScroll'";
                newDiv += "style='";
                newDiv += "position:absolute;";
                newDiv += "top:" + defaults.top + ";";
                newDiv += "left:" + defaults.left + ";";
                newDiv += "width:" + defaults.width + ";";
                newDiv += "max-width:" + (defaults.scrollLneght - 20) + "px;";
                newDiv += "height:" + defaults.height + ";";
                newDiv += "'></div>";
                $("body").append(newDiv);
            })();
        }
        var scrollStart = defaults.scrollStart;
        var scrollLneght = defaults.scrollLneght;
        var resize;
        clearInterval(S.scrollinterval);
        S.scrollinterval = setInterval(function () {
            scrollStart = scrollStart + defaults.increase;
            scrollLneght = scrollLneght - defaults.increase;
            if (!msg.back) //递增
                $("#LoadScroll").css("width", scrollStart + "px");
            else //递减
                $("#LoadScroll").css("width", scrollLneght + "px");

            if ((!msg.back && scrollStart > defaults.scrollLneght) || (msg.back && scrollLneght < 0)) {
                clearInterval(S.scrollinterval);
                if (msg.remove) {
                    setTimeout(function () { $("#LoadScroll").remove(); }, 300);
                }
            }
        }, defaults.second);
    },
    //加载数据异常，数据回滚
    rollBack: function () {
        var scrollLneght = $("#LoadScroll").width();
        var increase = 50;
        var second = 10;
        setTimeout(function () {
            G.scrollLoad({ scrollLneght: scrollLneght, increase: increase, second: second, addDiv: "No", back: true, remove: true });
        }, 500);
    },

    //加载完成
    loadEnd: function () {
        var scrollStart = $("#LoadScroll").width();
        var increase = 90;
        G.scrollLoad({ scrollStart: scrollStart, increase: increase, addDiv: "No", remove: true });
    },

    //驗證密碼
    safety: function (pwd) {
        //判斷密碼是是否合法（合法返回True）
        var Num1 = '123456789';
        var Num2 = '987654321';
        var rex1 = /[0-9]+/g;
        var rex2 = /[a-z]+/g;
        var t_PWD = pwd;
        var PWD_Legality = true;
        var t_PWD_str = t_PWD.toLowerCase();

        var resx1 = /^[0-9]+$/g;
        if (resx1.test(t_PWD_str)) PWD_Legality = false;
        resx1 = /^[a-z]+$/g;
        if (resx1.test(t_PWD_str)) PWD_Legality = false;

        var strs1 = t_PWD_str.match(rex1);
        if (strs1 != null) {
            for (var i = 0; i < strs1.length; i++) {
                if (strs1[i].length > 3) {
                    if (Num1.indexOf(strs1[i]) != -1)
                        PWD_Legality = false; //数字顺序
                    if (Num2.indexOf(strs1[i]) != -1)
                        PWD_Legality = false; //数字倒序
                }
            }
        }
        strs1 = t_PWD_str.match(rex2);
        if (strs1 != null) {
            if (strs1.length == 1) {
                if (strs1[0].length == 1)
                    PWD_Legality = false;
            } //只有一个字母
        }

        for (var i = 0; i < t_PWD_str.length - 2; i++) {
            if (t_PWD_str.charAt(i) == t_PWD_str.charAt(i + 1)) {
                if (t_PWD_str.charAt(i) == t_PWD_str.charAt(i + 2)) {
                    PWD_Legality = false;
                }
            }
        }

        if (__sysinfo != undefined && __sysinfo.PwdUpperID != undefined && __sysinfo.PwdUpperID == 1) {
            var Str = 'Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,Z,X,C,V,B,N,M'.split(",");
            PWD_Legality = false;
            for (var i = 0; i < Str.length; i++) {
                if (t_PWD.indexOf(Str[i]) != -1)
                    PWD_Legality = true;
            }
        }

        if (t_PWD == "aa11aa11") PWD_Legality = false;
        if (t_PWD == "aa22aa22") PWD_Legality = false;
        if (t_PWD == "aa33aa33") PWD_Legality = false;
        if (t_PWD == "Aa11aa11") PWD_Legality = false;
        if (t_PWD == "Aa22aa22") PWD_Legality = false;
        if (t_PWD == "Aa33aa33") PWD_Legality = false;
        if (t_PWD == "Abcd1234") PWD_Legality = false;
        if (t_PWD == "Abcd1357") PWD_Legality = false;
        if (t_PWD == "Asdf123") PWD_Legality = false;
        if (t_PWD == "123Asdf") PWD_Legality = false;
        if (t_PWD == "qwer1234") PWD_Legality = false;
        if (t_PWD == "Qwer1234") PWD_Legality = false;
        if (t_PWD == "1234qwer") PWD_Legality = false;
        if (t_PWD == "Qwer123") PWD_Legality = false;
        if (t_PWD == "123Qwer") PWD_Legality = false;
        if (t_PWD == "Zxcv123") PWD_Legality = false;
        if (t_PWD == "123Zxcv") PWD_Legality = false;
        if (t_PWD == "123abc") PWD_Legality = false;
        if (t_PWD == "abc123") PWD_Legality = false;
        if (t_PWD == "aaa111") PWD_Legality = false;
        if (t_PWD == "aaa123") PWD_Legality = false;
        if (t_PWD == "a11111") PWD_Legality = false;
        if (t_PWD == "aa1122") PWD_Legality = false;
        if (t_PWD == "qaz123") PWD_Legality = false;
        if (t_PWD == "qwe123") PWD_Legality = false;
        if (t_PWD == "123qaz") PWD_Legality = false;
        if (t_PWD == "123qwe") PWD_Legality = false;
        if (t_PWD == "1qaz2wsx") PWD_Legality = false;
        if (t_PWD == "1q2w3e") PWD_Legality = false;
        return PWD_Legality;
    },

    //驗證密碼
    safety: function (pwd) {
        var t_PWD_str = pwd.toLowerCase();
        var rex1 = /[a-z][a-z0-9]{5,19}/g;
        return rex1.test(t_PWD_str);
    },

    //RMB显示中文
    toRmb: function (value) {
        var whole = value || $("#Credits").val(), num, dig;
        if (!/^[0-9]*[1-9][0-9]+$/.test(whole) && whole != "") return;
        if (whole.indexOf(".") == -1) {
            num = whole;
            dig = "";
        }
        else {
            num = whole.substr(0, whole.indexOf("."));
            dig = whole.substr(whole.indexOf(".") + 1, whole.length);
        }

        var i = 1;
        var len = num.length;
        var dw2 = new Array("", "萬", "億");
        var dw1 = new Array("十", "百", "千");
        var dw = new Array("", "一", "二", "三", "四", "五", "六", "七", "八", "九");
        var k1 = k2 = 0, str = "";

        for (i = 1; i <= len; i++) {
            var n = num.charAt(len - i);
            if (n == "0") {
                if (k1 != 0)
                    str = str.substr(1, str.length - 1);
            }

            str = dw[Number(n)].concat(str);

            if (len - i - 1 >= 0) {
                if (k1 != 3) {
                    str = dw1[k1].concat(str);
                    k1++;
                }
                else {
                    k1 = 0;
                    var temp = str.charAt(0);
                    if (temp == "萬" || temp == "億")
                        str = str.substr(1, str.length - 1);
                    str = dw2[k2].concat(str);
                }
            }
            if (k1 == 3)
                k2++;
        }
        if (str.length >= 2)
            if (str.substr(0, 2) == "一十") str = str.substr(1, str.length - 1);
        //document.getElementById(sName).innerHTML = str;
        return str;
    },

    //HK 3色球
    contains: function (num) {
        var red = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46];
        var blue = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48];
        var green = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49];
        for (var i = 0; i < red.length; i++) {
            if (red[i] == num) {
                return "red";
            }
        }
        for (var i = 0; i < blue.length; i++) {
            if (blue[i] == num) {
                return "bluer";
            }
        }
        for (var i = 0; i < green.length; i++) {
            if (green[i] == num) {
                return "green";
            }
        }
    },

    //GX 3色球
    contains_gx: function (num) {
        var red = [1, 4, 7, 10, 13, 16, 19];
        var blue = [2, 5, 8, 11, 14, 17, 20];
        var green = [3, 6, 9, 12, 15, 18, 21];
        for (var i = 0; i < red.length; i++) {
            if (red[i] == num) {
                return "red";
            }
        }
        for (var i = 0; i < blue.length; i++) {
            if (blue[i] == num) {
                return "bluer";
            }
        }
        for (var i = 0; i < green.length; i++) {
            if (green[i] == num) {
                return "green";
            }
        }
    },

    /// <summary>
    /// 复式计算，0返回总列表List、1总组数
    /// </summary>
    /// <param name="cycle">循环次数</param>
    /// <param name="ary">循环数组</param>
    /// <returns>{list:数组,count:总组数}</returns>
    DuplexSum: function (cycle, ary) {
        var list = [];
        var len = ary.length, _count = 0;
        for (var a = 0; a < len; a++) {
            var _a = a + 1;
            for (var b = _a; b < len; b++) {
                if (cycle == 2) {
                    _count++;
                    list.push(ary[a] + "," + ary[b]);
                    continue;
                }
                var _b = b + 1;
                for (var c = _b; c < len; c++) {
                    if (cycle == 3) {
                        _count++;
                        list.push(ary[a] + "," + ary[b] + "," + ary[c]);
                        continue;
                    }
                    var _c = c + 1;
                    for (var d = _c; d < len; d++) {
                        if (cycle == 4) {
                            _count++;
                            list.push(ary[a] + "," + ary[b] + "," + ary[c] + "," + ary[d]);
                            continue;
                        }
                        var _d = d + 1;
                        for (var e = _d; e < len; e++) {
                            if (cycle == 5) {
                                _count++;
                                list.push(ary[a] + "," + ary[b] + "," + ary[c] + "," + ary[d] + "," + ary[e]);
                                continue;
                            }
                            var _e = e + 1;
                            for (var f = _e; f < len; f++) {
                                if (cycle == 6) {
                                    _count++;
                                    list.push(ary[a] + "," + ary[b] + "," + ary[c] + "," + ary[d] + "," + ary[e] + "," + ary[f]);
                                    continue;
                                }
                                var _f = f + 1;
                                for (var g = _f; g < len; g++) {
                                    if (cycle == 7) {
                                        _count++;
                                        list.push(ary[a] + "," + ary[b] + "," + ary[c] + "," + ary[d] + "," + ary[e] + "," + ary[f] + "," + ary[g]);
                                        continue;
                                    }
                                    var _g = g + 1;
                                    for (var h = _g; h < len; h++) {
                                        if (cycle == 8) {
                                            _count++;
                                            list.push(ary[a] + "," + ary[b] + "," + ary[c] + "," + ary[d] + "," + ary[e] + "," + ary[f] + "," + ary[g] + "," + ary[h]);
                                            continue;
                                        }
                                        var _h = h + 1;
                                        for (var y = _h; y < len; y++) {
                                            if (cycle == 9) {
                                                _count++;
                                                list.push(ary[a] + "," + ary[b] + "," + ary[c] + "," + ary[d] + "," + ary[e] + "," + ary[f] + "," + ary[g] + "," + ary[h] + "," + ary[y]);
                                                continue;
                                            }
                                            var _y = y + 1;
                                            for (var z = _y; z < len; z++) {
                                                if (cycle == 10) {
                                                    _count++;
                                                    list.push(ary[a] + "," + ary[b] + "," + ary[c] + "," + ary[d] + "," + ary[e] + "," + ary[f] + "," + ary[g] + "," + ary[h] + "," + ary[y] + "," + ary[z]);
                                                    continue;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return { list: list, count: _count };
    }
};

function forceMiddle(msg) {
    var id = msg.id || +new Date();
    var title = msg.title || "";
    var title_nav = msg.titleNav || "";
    var theadAry = msg.thead || [];
    var tbodyAry = msg.tbody || [];

    if (title) {
        $("#shell_title").html(title);
    }

    if (title_nav && title_nav != "") {
        $("#shell_top").append("<div id='title-nav'>" + title_nav + "</div>");
    }

    var mythead = ["<tr>"];
    for (var i = 0; i < theadAry.length; i++) {
        mythead.push("<th>" + theadAry[i] + "</th>");
    }
    mythead.push("</tr>");
    if (msg.eachThead) {
        mythead = [msg.eachThead];
    }

    var fonDiv = "";
    if (msg.fonDiv) {
        fonDiv = "<div id='fondiv' style='text-align:center;padding:5px 0;margin-top:2px;' class='bc'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>";
    }
    var _html="<div id='" + id + "'><table class='middle-table'><thead>" + mythead.join("") + "</thead><tbody>" + tbodyAry.join("") + "</tbody></table>" + fonDiv + "</div>";
    return _html;
}



function forceMiddle2(msg) {
    var id = msg.id || +new Date();
    var title = msg.title || "";
    var title_nav = msg.titleNav || "";
    var theadAry = msg.thead || [];
    var tbodyAry = msg.tbody || [];

    if (title) {
        $("#shell_title").html(title);
    }

    if (title_nav && title_nav != "") {
        $("#shell_top").append("<div id='title-nav'>" + title_nav + "</div>");
    }

    var mythead = ["<tr>"];
    for (var i = 0; i < theadAry.length; i++) {
        mythead.push("<th>" + theadAry[i] + "</th>");
    }
    mythead.push("</tr>");
    if (msg.eachThead) {
        mythead = [msg.eachThead];
    }

    var fonDiv = "";
    if (msg.fonDiv) {
        fonDiv = "<div id='fondiv' style='text-align:center;padding:5px 0;margin-top:2px;' class='bc'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>";
    }
    return "<div id='" + id + "'><span class=\"text-btn\" style=\"text-align:center\" id=\"btndellogin\">删除</span><table class='middle-table'><thead>" + mythead.join("") + "</thead><tbody>" + tbodyAry.join("") + "</tbody></table>" + fonDiv + "</div>";
}


function pageMiddleNew(msg, callBack) {
    var currentPage = msg.currentPage || 0;
    currentPage = parseInt(currentPage);
    var totalPage = msg.totalPage || 0;
    totalPage = parseInt(totalPage);
    var ltArr = [];
    var gtArr = [];
    var isF = false, isL = false;
    var start = currentPage - 5;
    var end = currentPage + 5;
    for (var i = start; i < currentPage; i++) {
        if (i > 0) {
            ltArr.push(i);
        }
    }
    for (var i = currentPage + 1; i <= end; i++) {
        if (i <= totalPage) {
            gtArr.push(i);
        }
    }
    isF = currentPage == 1;
    isL = currentPage == totalPage;


    var middle = "<div class='pager' id='data-page'>"
        + "共 " + msg.totalRecord + " 條記錄  分頁：" + currentPage + "/" + totalPage + "頁&nbsp;&nbsp;&nbsp;";
    if (!isF) {
        middle = middle + "<a class='redLink cursor' data-page='1'>首頁</a>&nbsp;&nbsp;";
    }

    if (isF) {
        middle = middle + "上一頁...『&nbsp;";
    } else {
        middle = middle + "<a class='redLink cursor' data-page='" + (currentPage - 1) + "'>上一頁</a>...『&nbsp;";
    }

    for (var i = 0; i < ltArr.length; i++) {
        middle = middle + "<a class='redLink cursor' data-page='" + ltArr[i] + "' title='第" + ltArr[i]+"頁'>"+ltArr[i]+"</a>&nbsp;";
    }

    middle = middle + "<span class='font_c'>" + currentPage + "</span>&nbsp;";

    for (var i = 0; i < gtArr.length; i++) {
        middle = middle + "<a class='redLink cursor' data-page='" + gtArr[i] + "' title='第" + gtArr[i] + "頁'>" + gtArr[i] + "</a>&nbsp;";
    }

    middle = middle + "』...";
    if (isL) {
        middle = middle + "下一頁&nbsp;&nbsp;";
    } else {
        middle = middle + "<a class='redLink cursor' data-page='" + (currentPage + 1) + "'>下一頁</a>&nbsp;&nbsp;";
    }

    if (!isL) {
        middle = middle + "<a class='redLink cursor' data-page='" + totalPage + "'>尾頁</a>&nbsp;&nbsp;";
    }

    middle = middle + "<input type='text' value='" + currentPage+"' name='txtPager' id='txtPager' class='GOtext' onkeydown='javascript: if (event.keyCode ==13){ var txtPagerValue=document.getElementById('txtPager').value; var regs = /^\d+$/; if(!regs.test(txtPagerValue)){alert('輸入錯誤');document.getElementById('txtPager').focus();return false;};var hdnPStringValue=document.getElementById('hdnPString').value; location.href='?page='+txtPagerValue+hdnPStringValue;};' style='display:inline-block;vertical-align:middle;margin-bottom:2px;'>"
        + "<input type='button' class='GObtn' onclick='javascript:  var txtPagerValue=document.getElementById('txtPager').value; var regs = /^\d+$/; if(!regs.test(txtPagerValue)){alert('輸入錯誤');document.getElementById('txtPager').focus();return false;};var hdnPStringValue=document.getElementById('hdnPString').value; location.href='?page='+txtPagerValue+hdnPStringValue;' id='btnPager' style='display:inline-block;vertical-align:middle;margin-bottom:2px;'>"
        + "</div>";
    if (msg.obj) {
        if ($("#data-page").length == 0) {
            msg.obj.html(middle);
        }
        //绑定分页事件
        $("#shell_pageControl #data-page a.cursor").unbind("click").click(function () {
            var page = G.searchPageNew($(this));
            if (page && callBack) {
                if (callBack) {
                    callBack(G.urlReplace({ url: "?" + msg.referrer, paramName: "page", val: page, pad: true }).replace("?", ""));
                }
            }
        });
        $("#shell_pageControl #data-page .GObtn").unbind("click").click(function () {
            var page = $("#shell_pageControl #data-page .GOtext").val();
            if (page && callBack) {
                if (callBack) {
                    callBack(G.urlReplace({ url: "?" + msg.referrer, paramName: "page", val: page, pad: true }).replace("?", ""));
                }
            }
        });
    }
}

function pageMiddle(msg, callBack) {
    var currentPage = msg.currentPage || 0;
    var totalPage = msg.totalPage || 0;
    var middle = "<div class='pager' id='data-page'>"
        + "<span class='first cursor' id='first'>首頁</span>"
        + "<span class='previous cursor' id='previous'>上一頁</span>"
        + "<span class='current_page'>第<b id='currentPage'>" + currentPage + "</b>頁</span>"
        + "<span class='total_page'>共<b class='total' id='totalPage'>" + totalPage + "</b>頁</span>"
        + "<span class='next cursor' id='next'>下一頁</span>"
        + "<span class='last cursor' id='last'>尾頁</span>"
        + "</div>";
    if (msg.obj) {
        if ($("#data-page").length == 0) {
            msg.obj.html(middle);
        }
        //绑定分页事件
        $("#shell_pageControl #data-page span.cursor").unbind("click").click(function () {
            var page = G.searchPage($(this));
            if (page && callBack) {
                if (callBack) {
                    callBack(G.urlReplace({ url: "?" + msg.referrer, paramName: "page", val: page, pad: true }).replace("?", ""));
                }
            }
        });
    }
}
//模拟测速
function SelectBoxSet(n) {
    S.lineStop = false;
    $("#lineching input[type='text']").eq(n).val("响应時間:測速中");
    var ma = (Math.random() + '').replace('0.', '').substr(0, 4);
    setTimeout(function () {
        var data = __sysinfo.ipJoin || __sysinfo.data.ipJson;
        if (n < data.length) {
            $("#lineching input[type='text']").eq(n).val("响应時間:" + (ma / 15).toFixed(2) + "毫秒");
            n++;
            SelectBoxSet(n);
        } else {
            S.lineStop = true;
        }
    }, 700);
}