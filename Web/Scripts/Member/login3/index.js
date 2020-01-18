if(!IsPC() && confirm("系统判断您是手机访问,是否切换到手机版?")){
		location.href="/login/m_jump";
	}
	function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function get_loginpwd() {
        layer.open({
		type: 2,
		title:'找回密码',
		area: ['370px', '300px'],
		content: ['/regad/get_loginpwd', 'no']
	});
}
function autostartslider() {
    slider.startAuto()
}
function clearallbox() {
    $(".itms").css("border", "1px solid #999"),
    $(".itms").css("z-index", "1"),
    $(".sprite").removeClass("icon1"),
    $(".sprite").removeClass("icon2"),
    $(".sprite").removeClass("icon3"),
    $(".sprite").removeClass("icon4"),
    $(".sprite").removeClass("icon5"),
    $(".itms").css("color", "#666"),
    $(".col2").css("display", "none")
}
function scrolltop() {
    $(window).scrollTop(0)
}
function socialpanel() {
    0 == $(window).scrollTop() ? $(".scrolltop").css("display", "none") : $(".scrolltop").css("display", "block")
}
function tick() {
    $("#ticker1 li:first").slideUp(function() {
        $(this).appendTo($("#ticker1")).slideDown()
    }),
    $("#ticker2 li:first").slideUp(function() {
        $(this).appendTo($("#ticker2")).slideDown()
    })
}
function countUp1() {
    var t = stat1 * animationspd / animationtime * timer1,
    t = Math.floor(t);
    $("#count1").text(t),
    timer1 == timerend ? clearInterval(stat1_ani) : timer1 += 1
}
function converTime(t) {
    var n = t % 60;
    return ret = "",
    ret += ~~ (t / 60) + "&lsquo;" + (10 > n ? "0": ""),
    ret += "" + n
}
function countUp2() {
    var t = stat2 * animationspd / animationtime * timer2,
    t = Math.floor(t),
    t = converTime(t);
    $("#count2").html(t),
    timer2 == timerend ? clearInterval(stat2_ani) : timer2 += 1
}
function countUp3() {
    var t = stat3 * animationspd / animationtime * timer3,
    t = Math.floor(t);
    $("#count3").text(t),
    timer3 == timerend ? clearInterval(stat3_ani) : timer3 += 1
}
function progressbar1() {
    var t = statprogress1 / 100 * barwidth;
    $("#bar1").animate({
        right: "-=" + t
    },
    animationtime)
}
function progressbar2() {
    var t = statprogress2 / 100 * barwidth;
    $("#bar2").animate({
        right: "-=" + t
    },
    animationtime)
}
var stat1 = 25,
statprogress1 = 25,
stat2 = 120,
statprogress2 = 65,
stat3 = 34,
affType = 0;
$(".main-info-ad").slide({
    interTime: 5e3,
    effect: "left",
    mainCell: ".bd ul",
    autoPlay: !0
});
var panelstatus = !0,
slider = $(".bxslider").bxSlider({
    controls: !1,
    auto: !0,
    onSlideAfter: function() {
        autostartslider()
    }
});
$(".bxslider2").bxSlider({
    controls: !1,
    auto: !0,
    mode: "fade"
}),
$(".bxslider3").bxSlider({
    controls: !1,
    auto: !0,
    mode: "fade"
}),
$(".bxslider4").bxSlider({
    controls: !1,
    auto: !0,
    mode: "fade"
}),
$(".btnclose").click(function() {
    1 == panelstatus ? ($(".prizeinfo").animate({
        height: "41px"
    },
    700,
    function() {
        $(".btnclose").css("background-position", "0 104px")
    }), panelstatus = !1) : ($(".prizeinfo").animate({
        height: "360px"
    },
    700,
    function() {
        $(".btnclose").css("background-position", "0 0")
    }), panelstatus = !0)
}),
$(".promobanner").click(function() {
    var t = $(this).parent().find(".contentbody");
    "block" == $(t).css("display") ? $(t).fadeOut(500) : $(t).fadeIn(500)
}),
$(".contentbody").each(function(t, n) {
    0 == t ? $(this).css("display", "block") : $(this).css("display", "none")
}),
$(".itms").click(function() {
    clearallbox(),
    $(this).css("border", "1px solid #1f5fb2"),
    $(this).css("border-right", "1px solid #fff"),
    $(this).css("z-index", "9"),
    $(this).css("color", "#1f5fb2");
    var t = $(this).index() + 1;
    $("#content" + t).css("display", "block"),
    $(this).find(".sprite").addClass("icon" + t)
}),
$(".wechat").hover(function() {
    $(".wechatqr").stop(!0, !0).fadeIn(500)
},
function() {
    $(".wechatqr").stop(!0, !0).fadeOut(200)
}),
$(".download").hover(function() {
    $(".downloadqr").stop(!0, !0).fadeIn(500)
},
function() {
    $(".downloadqr").stop(!0, !0).fadeOut(200)
}),
socialpanel(),
setInterval(function() {
    tick()
},
4e3);
var animationtime = 1700,
animationspd = 50,
timerend = animationtime / 50,
timer1 = 0,
timer2 = 0,
timer3 = 0,
barwidth = 200,
stat1_ani, stat2_ani, stat3_ani, bodyheight = $("body").height(),
scrollY = $(window).height();
$(window).resize(function() {
    scrollY = $(window).height()
});
var runonce1 = !0,
runonce2 = !0,
runonce3 = !0;
$(window).scroll(function(t) {
    socialpanel(),
    t = $(window).scrollTop() + scrollY,
    1450 < t && 1 == runonce1 && (stat1_ani = setInterval(function() {
        countUp1()
    },
    animationspd), progressbar1(), runonce1 = !1),
    1550 < t && 1 == runonce2 && (stat2_ani = setInterval(function() {
        countUp2()
    },
    animationspd), progressbar2(), runonce2 = !1),
    1650 < t && 1 == runonce3 && (stat3_ani = setInterval(function() {
        countUp3()
    },
    animationspd), runonce3 = !1)
});